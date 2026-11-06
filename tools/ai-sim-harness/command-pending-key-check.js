#!/usr/bin/env node
'use strict';
/* The movement publisher asks, once per man per Meso tick, whether his movement slot still holds a
   pending order with the same publish key. It used to read that from snapshot(), which copies every
   record of the man; under the tactical controller that copy was the largest Command Reception cost.
   pendingKey() answers from the one slot in place and must give exactly the snapshot's answer in
   every phase. ?pendingKeyRead=0 removes it so the publisher reads the snapshot again. */
const assert = require('node:assert/strict');
const H = require('./harness');

function setup(search) {
  H.resetIds();
  const r = H.bootstrap(search ? { search } : undefined);
  const b = H.makeBattle(r, { seed: 41 });
  const sq = H.addSquad(r, b, {
    id: 'us-0',
    faction: 'us',
    x: 0,
    z: 0,
    objective: { x: 0, z: 120 },
    facing: 0
  });
  return { r, b, sq, C: r.BattleCommandReception };
}

const { b, sq, C } = setup();
assert.equal(typeof C.pendingKey, 'function');
const s = sq.members[1],
  far = sq.members[2],
  scope = 'soldier:' + s.id;
/* What publishPersonalMovement read before: the snapshot slot, unless adopted, unreachable or dataless. */
function fromSnapshot(man, sc) {
  const view = C.snapshot(man, b),
    p = view && view.records && view.records['movement|' + sc];
  return p && p.phase !== 'adopted' && p.phase !== 'unreachable' && p.data
    ? String(p.data.publishKey || '')
    : null;
}
const same = (man, sc, label) =>
  assert.equal(C.pendingKey(man, b, 'movement', sc), fromSnapshot(man, sc), label);
const issue = (man, sc, data) =>
  C.publish(sq, b, 'movement', [man], {
    scope: sc,
    action: 'move',
    signature: JSON.stringify(data),
    point: { x: 25, z: 40 },
    data
  });

b.time = 1;
assert.equal(C.pendingKey(s, b, 'movement', scope), null, 'empty slot');
same(s, scope, 'empty slot');
issue(s, scope, { publishKey: 'slot-a', urgent: false });
assert.equal(C.pendingKey(s, b, 'movement', scope), 'slot-a', 'just issued');
same(s, scope, 'just issued, same tick as publish');
let seen = new Set();
for (let t = 1; t <= 6; t += 0.05) {
  b.time = +t.toFixed(2);
  same(s, scope, 'phase at ' + b.time);
  seen.add(C.peek(s, b, 'movement', scope).phase);
}
assert.ok(seen.has('adopted') && seen.size >= 3, 'walked through several phases: ' + [...seen]);
assert.equal(C.pendingKey(s, b, 'movement', scope), null, 'adopted is not pending');

/* A replacement published in the same tick as a settle keeps the phase settle stored, as the copy did. */
b.time = 7;
C.settle(b);
issue(s, scope, { publishKey: 'slot-b', urgent: true });
same(s, scope, 'replacement in a settled tick');
issue(s, scope, { publishKey: 7 });
same(s, scope, 'numeric key');
issue(s, scope, { publishKey: { nested: true } });
same(s, scope, 'object key is dropped by the copy');
assert.equal(C.pendingKey(s, b, 'movement', scope), '');
issue(s, scope, { urgent: true });
same(s, scope, 'no key');

/* Out of voice and sight: unreachable is not pending. */
far.root.position.x = 5000;
far.root.position.z = 5000;
const farScope = 'soldier:' + far.id;
b.time = 8;
issue(far, farScope, { publishKey: 'far' });
same(far, farScope, 'unreachable recipient');
assert.equal(C.peek(far, b, 'movement', farScope).phase, 'unreachable');
assert.equal(C.pendingKey(far, b, 'movement', farScope), null);

/* Other slots of the man do not leak in. */
same(s, 'soldier:other', 'unrelated slot');
assert.equal(C.pendingKey(null, b, 'movement', scope), null);

assert.equal(setup('?pendingKeyRead=0').C.pendingKey, null, 'control arm reads the snapshot');
console.log(
  'PASS pendingKey matches the snapshot slot in every phase; ?pendingKeyRead=0 restores the snapshot read'
);
