#!/usr/bin/env node
'use strict';
const { loadModule, quietConsole } = require('./module-loader');
/* Controller cover cache (?tacticalController=new, off switch ?controllerCoverCache=0).
   The controller's contact route planner (13g) asks module 19 for every cover slot within up to
   450 m (~400 per call), then throws away the ~60% outside its detour corridor. Under the
   controller, candidatesWhere(s, battle, threat, range, keep) skips building the slots the caller
   would discard, and each slot's nine claim-cell keys and its prone cover quality are computed once.
   This file pins:

     - parity: the same candidates (ids, distances, qualities, order), reservations, refusals and
       dead-claim drops with the cache on, with ?controllerCoverCache=0, and with the controller off;
     - a refused slot still runs the claim scan, so a stale claim near it is dropped exactly when
       the full scan would have dropped it;
     - the skip is real: refused slots cost no stand check under the controller, and the off switch
       or the controller off ignore `keep` entirely;
     - a slot object whose coordinates change is re-keyed, never read from stale cells. */
const assert = require('node:assert/strict'),
  H = require('./harness');
let n = 0;
function test(name, fn) {
  fn();
  n++;
  console.log('PASS ' + name);
}
function hedge() {
  return {
    id: 'hedge',
    physicalId: 'hedge',
    shape: 'obb',
    type: 'hedge',
    x: 0,
    z: 0,
    hx: 14,
    hz: 1,
    ux: 1,
    uz: 0,
    vx: 0,
    vz: 1,
    radius: 1,
    y: 0,
    height: 2,
    cover: 0.62
  };
}
function fixture(search) {
  H.resetIds();
  const r = H.bootstrap({ modules: false, search });
  r.BattleModules = { registerSystem() {}, unitsFor: b => b._roster.us.concat(b._roster.ge) };
  [
    'battle/battle-navigation.js',
    'battle/movement-resolver.js',
    'battle/modules/39-navigation-physicality-debug.js'
  ].forEach(p => loadModule(r, p, { console: quietConsole }));
  const b = H.makeBattle(r);
  b.obstacles = [hedge()];
  b.obstacles.__physicalFootprints = b.obstacles;
  b.obstacles.__physicalVersion = 1;
  const scenario = { buildings: [] };
  b.scene = { metadata: { battleScenario: scenario } };
  r.__battle__ = b;
  r.BattleNavigation.installScenario(scenario);
  const q = H.addSquad(r, b, {
    id: 'us-0',
    faction: 'us',
    x: 0,
    z: -8,
    objective: { x: 0, z: 50 },
    composition: ['rifleman', 'rifleman', 'rifleman', 'rifleman']
  });
  q.commandPhase = 'support-hold';
  q.state = 'engaged';
  q.inContact = true;
  q.members.forEach((s, i) => {
    s.root.position.x = i * 2;
    s.root.position.z = -8;
  });
  return { r, b, men: q.members, C: r.BattleCoverPositions };
}
const THREAT = { x: 0, z: 60 },
  WEST = slot => slot.x <= 0;
function ids(list) {
  return list.map(p => p.slotId + '@' + p.distance.toFixed(4) + '/' + p.quality.toFixed(4));
}
/* One scripted sequence of cover traffic; the record is what any caller could observe. */
function script(search) {
  const { b, men, C } = fixture(search),
    record = [],
    // What 13g keeps: candidatesWhere's answer, filtered by the same corridor test it passes.
    where = s => ids(C.candidatesWhere(s, b, THREAT, 26, WEST).filter(WEST));
  record.push(ids(C.candidates(men[0], b, THREAT, 26)), where(men[0]));
  const first = C.candidates(men[1], b, THREAT, 26);
  const a = C.reserve(men[1], b, first[0].slot, 'engagement'),
    bClaim = C.reserve(men[2], b, first[3].slot, 'engagement');
  record.push(!!a, !!bClaim);
  record.push(!!C.reserve(men[3], b, first[0].slot, 'engagement'));
  record.push(ids(C.candidates(men[0], b, THREAT, 26)), where(men[0]));
  // A body standing on a slot blocks it for everyone else.
  men[3].root.position.x = first[6].x;
  men[3].root.position.z = first[6].z;
  b.time += 0.15;
  record.push(ids(C.candidates(men[0], b, THREAT, 26)), where(men[0]));
  // A dead claimant's claim is dropped on the next scan and the slot frees.
  men[1].dead = true;
  b.time += 0.15;
  record.push(where(men[0]), ids(C.candidates(men[0], b, THREAT, 26)));
  record.push(C.current(men[1], b) ? 'dead claim kept' : 'dead claim dropped');
  record.push(
    C.snapshot(b)
      .map(p => p.id + ':' + p.status)
      .join(' ')
  );
  return record;
}
/* A route claim that goes stale (its man is down) on a slot the corridor refuses, then would be live
   again: whether it survives tells whether the corridor-aware scan still swept it. */
function staleSweep(search) {
  const { b, men, C } = fixture(search),
    // The easternmost slot: far from every slot the corridor keeps, so only its own scan reaches it.
    east = C.candidates(men[1], b, THREAT, 26)
      .filter(p => !WEST(p.slot))
      .sort((p, q) => q.x - p.x)[0];
  assert.ok(east, 'an east slot exists');
  men[1]._tacticalRoute = { coverSlotId: east.slot.id };
  assert.ok(C.reserve(men[1], b, east.slot, 'route'), 'route claim taken');
  men[1].dead = true;
  b.time += 0.15;
  C.candidatesWhere(men[0], b, THREAT, 26, WEST);
  men[1].dead = false;
  b.time += 0.15;
  return C.current(men[1], b) ? 'claim survived' : 'claim swept';
}
function standChecksOnRefused(search) {
  const { r, b, men, C } = fixture(search);
  C.candidates(men[0], b, THREAT, 26); // build slots
  const N = r.BattleNavigation,
    native = N.movementClear;
  let calls = 0;
  N.movementClear = function (p, q, o) {
    calls++;
    return native.call(this, p, q, o);
  };
  try {
    assert.ok(Array.isArray(C.candidatesWhere(men[0], b, THREAT, 26, () => false)));
  } finally {
    N.movementClear = native;
  }
  return calls;
}
const ON = '?tacticalController=new',
  OFF = '?tacticalController=new&controllerCoverCache=0';

test('the controller cache plays exactly like the full scan and like legacy', () => {
  const on = script(ON),
    off = script(OFF),
    legacy = script('');
  assert.ok(on[0].length >= 8, 'the fixture yields real hedge slots (' + on[0].length + ')');
  assert.ok(on[1].length > 0 && on[1].length < on[0].length, 'the corridor keeps some slots, not all');
  assert.equal(on[2], true, 'first reservation taken');
  assert.equal(on[4], false, 'a claimed slot is refused to another man');
  assert.notDeepEqual(on[5], on[0], 'claims change what is available');
  assert.equal(on[11], 'dead claim dropped');
  assert.deepEqual(on, off, 'cache on equals ?controllerCoverCache=0');
  assert.deepEqual(on, legacy, 'cache on equals the controller off');
});

test('the corridor-aware answer is the full scan minus the refused slots, in order', () => {
  const { b, men, C } = fixture(ON),
    full = ids(C.candidates(men[0], b, THREAT, 26).filter(p => WEST(p.slot))),
    kept = C.candidatesWhere(men[0], b, THREAT, 26, WEST);
  assert.ok(
    kept.every(p => WEST(p.slot)),
    'nothing refused is returned under the controller'
  );
  assert.deepEqual(ids(kept), full);
});

test('a refused slot still sweeps stale claims, as the full scan does', () => {
  assert.equal(staleSweep(OFF), 'claim swept', 'the full scan drops the stale claim');
  assert.equal(staleSweep(ON), 'claim swept', 'the corridor-aware scan drops it too');
  assert.equal(staleSweep(''), 'claim swept', 'legacy drops it');
});

test('refused slots skip the stand check only under the controller', () => {
  const on = standChecksOnRefused(ON),
    off = standChecksOnRefused(OFF),
    legacy = standChecksOnRefused('');
  assert.equal(on, 0, 'no stand check for a slot the caller will discard');
  assert.ok(off > 0, 'the off switch runs the full scan (' + off + ')');
  assert.equal(off, legacy, 'the off switch is the legacy scan');
});

test('a slot whose coordinates move is re-keyed, not read from stale cells', () => {
  const { b, men, C } = fixture(ON),
    probe = { id: 'probe:0', x: 0, z: -6, normalX: 0, normalZ: -1 };
  assert.ok(C.reserve(men[0], b, probe, 'engagement'), 'probe reserved where nobody stands');
  C.release(men[0], b);
  // Move the same object onto another man's body: the stale keys would miss him.
  probe.x = men[2].root.position.x;
  probe.z = men[2].root.position.z;
  b.time += 0.15;
  assert.equal(C.reserve(men[0], b, probe, 'engagement'), null, 'a body on the moved slot blocks it');
});

console.log('PASS ' + n + ' controller cover-cache checks');
