#!/usr/bin/env node
'use strict';
/* Loop Watch order churn measures moved destinations, not men gaining or losing an order.
   Under the tactical controller a man without a personal target stands down on squad contact
   (13c 'unconfirmed-personal-contact'), and one man's covered bound can be the only order left.
   The squad's mean order then jumps every time the set of men holding an order changes, though
   no order moved. The old whole-population mean (and an empty set read as an infinite move)
   counted each of those handoffs as a destination change and raised order churn on a squad
   whose orders never moved. ?orderChurnSameMen=0 restores the old count. */

const assert = require('node:assert/strict'),
  fs = require('node:fs'),
  path = require('node:path'),
  H = require('./harness');

function world(search) {
  H.resetIds();
  const r = H.bootstrap({ search: '?stressAct=0&commandPosture=0' + (search || '') });
  new Function(
    'window',
    'globalThis',
    'console',
    fs.readFileSync(path.join(H.REPO, 'battle/modules/32-ai-loop-watch.js'), 'utf8')
  )(r, r, { log() {}, warn() {} });
  const b = H.makeBattle(r, { seed: 505 });
  const sq = H.addSquad(r, b, {
    id: 'us-churn',
    faction: 'us',
    x: 0,
    z: 0,
    objective: { x: 0, z: 100 },
    facing: 0
  });
  b.factions.ge.squads = [];
  sq.commandPhase = 'assault';
  r.BattleAILoopWatch.clear(b);
  return { r, b, sq };
}

/* The squad shuffles 1 m per sample (travel without progress); `orderAt(i, man, k)` sets each
   man's order (or null) for sample i. */
function run(search, orderAt) {
  const w = world(search),
    men = w.sq.members;
  men.forEach((s, k) => {
    s._fireteamDestination = null;
    s.orderDestination = null;
    s.destination = null;
    s._slotX = s.root.position.x;
  });
  for (let i = 0; i < 16; i++) {
    w.b.time = 1 + i;
    men.forEach((s, k) => {
      s.root.position.x = s._slotX + (i % 2 ? 1 : 0);
      s._fireteamDestination = orderAt(i, s, k);
    });
    w.r.BattleAILoopWatch.sample(w.b);
  }
  return w.r.BattleAILoopWatch.alerts(w.b).filter(a => a.kind === 'order-churn');
}

/* Fixed slot orders 40 m ahead; men 1.. drop their order on odd samples (contact stand-down and
   resume) while man 0 keeps a far covered-bound point. No man's order ever moves. */
const handoffs = (i, s, k) => (k === 0 ? { x: 30, z: -20 } : i % 2 ? null : { x: k * 2, z: 40 });
/* The whole squad also passes through samples with no order at all. */
const emptyGaps = (i, s, k) => (i % 3 === 0 ? null : { x: k * 2, z: 40 });
/* Real churn: every man's order flips between two points 10 m apart. */
const flipping = (i, s, k) => ({ x: k * 2 + (i % 2 ? 10 : 0), z: 40 });

assert.ok(run('&orderChurnSameMen=0', handoffs).length >= 1, 'old count: order handoffs read as churn');
assert.ok(
  run('&orderChurnSameMen=0', emptyGaps).length >= 1,
  'old count: an empty order set reads as a move'
);
assert.equal(run('', handoffs).length, 0, 'men gaining and losing an order is not order churn');
assert.equal(run('', emptyGaps).length, 0, 'samples with no order are not destination changes');

const real = run('', flipping);
assert.ok(real.length >= 1, 'orders that really move are still order churn');
assert.ok(real[0].destinationChanges >= 4);
assert.equal(real[0].orderPopulationChanges, 0);
assert.ok(run('&orderChurnSameMen=0', flipping).length >= 1, 'old count sees the real churn too');

/* Mixed: real flips plus handoffs; the alert reports both counts, so the handoffs stay visible. */
const mixed = run('', (i, s, k) => (k > 5 && i % 4 === 1 ? null : flipping(i, s, k)));
assert.ok(mixed.length >= 1);
assert.ok(mixed[0].orderPopulationChanges >= 1, 'population changes are reported, not hidden');

console.log('PASS order churn counts moved orders on the same men; order handoffs are reported apart');
