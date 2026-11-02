'use strict';
/* Benchmark-only route attribution: no battle A/B arms or gameplay source mutation. */
const assert = require('node:assert/strict');
const { loadModule } = require('./module-loader');

let ticks = 0;
const s = { root: { position: { x: 1, z: 2 } }, suppressedUntil: 0 };
const sim = { time: 10 };
const success = { point: { x: 4, z: 6 }, stats: { graphNodes: 5, evaluatedEdges: 9, nativePathQueries: 2 } };
const failed = {
  point: null,
  stats: {
    graphNodes: 5,
    evaluatedEdges: 7,
    nativePathQueries: 1,
    rejected: { 'no-connected-progress-route': 1, 'blocked-physical-segment': 7 },
    terminal: 'none'
  }
};
const reused = { point: { x: 4, z: 6 }, reused: true };
const retained = { cursor: 0, waypoints: [{ x: 4, z: 6, slotId: 'real-cover' }] };
const reports = [{ x: 12, z: 15 }];
const root = {
  performance: { now: () => ++ticks },
  BattleNavigation: { version: 1, movementClear: () => true },
  SquadAI: { hasLineOfSight: () => true },
  BattleCoverPositions: {
    routeCandidates: () => [{ x: 4, z: 6 }],
    candidates: () => [{ x: 4, z: 6 }]
  },
  BattleTacticalContactRoute: {
    pick(actor, battle, contact, goal, taken, keep) {
      assert.equal(this, root.BattleTacticalContactRoute, 'owner this binding retained');
      assert.equal(actor, s);
      if (keep) return reused;
      if (goal.x === 10) return failed;
      root.BattleCoverPositions.routeCandidates(actor, battle, contact[0], 26);
      root.SquadAI.hasLineOfSight(actor, contact[0]);
      root.BattleNavigation.movementClear(actor.root.position, goal);
      return success;
    }
  }
};
const originalPick = root.BattleTacticalContactRoute.pick;
loadModule(root, 'scripts/battle-hotpath-profiler.cjs');
const P = root.BattleHotpathProfiler;
function pick(goal, keep) {
  return root.BattleTacticalContactRoute.pick(s, sim, reports, goal, [], keep);
}
assert.equal(pick({ x: 0, z: 8 }), success);
assert.equal(pick({ x: 0, z: 8 }, retained), reused);
assert.equal(pick({ x: 10, z: 8 }), failed);
assert.equal(pick({ x: 10, z: 8 }), failed);
assert.equal(pick({ x: 0, z: 9 }), success);
const d = P.snapshot().routePlanning;
assert.equal(d.calls, 5);
assert.equal(d.fresh, 3);
assert.equal(d.retained, 1);
assert.equal(d.negativeCache, 1);
assert.equal(d.failedFresh, 1);
assert.equal(d.retainedRejected, 0);
assert.equal(d.freshReasons['first-observation'], 1);
assert.equal(d.freshReasons['goal-changed'], 2);
assert.equal(d.totals.candidateQueries, 2);
assert.equal(d.totals.candidatesReturned, 2);
assert.equal(d.totals.sightQueries, 2);
assert.equal(d.totals.movementQueries, 2);
assert.equal(d.totals.graphNodes, 15, 'only fresh plans contribute graph counters');
assert.equal(d.totals.edgeQueries, 25);
assert.equal(d.totals.detourQueries, 5);
assert.equal(d.failedFinalReasons['no-connected-progress-route'], 1);
assert.equal(d.edgeRejections['blocked-physical-segment'], 7);
assert.equal(d.freshTerminals.none, 1);
reports[0].at = 11;
assert.equal(pick({ x: 0, z: 9 }), success);
reports[0].x = 12.2;
assert.equal(pick({ x: 0, z: 9 }), success);
reports[0].x = 13;
assert.equal(pick({ x: 0, z: 9 }), success);
const refined = P.snapshot().routePlanning;
assert.equal(refined.freshReasons['contact-observation-metadata-changed'], 1);
assert.equal(refined.freshReasons['contact-precise-location-changed'], 1);
assert.equal(refined.freshReasons['contact-rounded-location-changed'], 1);
assert.equal(refined.fresh, 6);
P.reset();
assert.equal(P.snapshot().routePlanning.calls, 0);
assert.equal(P.snapshot().routePlanning.fresh, 0);
P.restore();
assert.equal(root.BattleTacticalContactRoute.pick, originalPick);
assert.equal(pick({ x: 0, z: 8 }), success);
assert.equal(P.snapshot().routePlanning.calls, 0, 'restored calls are no longer instrumented');
console.log(
  'PASS opt-in route planning diagnostic: fresh, retained, negative cache, causes, native checks and restore'
);

// Native-style candidate pipeline: observe actual gates without rerunning a
// predicate, substituting results, or turning a discarded point into movement.
const slots = [
  { id: 'shelter', x: 1, z: 1, shelter: false },
  { id: 'occupied', x: 2, z: 2, occupied: true },
  { id: 'route', x: 3, z: 3, routeRejected: true },
  { id: 'blocked', x: 4, z: 4, blocked: true },
  { id: 'first', x: 5, z: 5 },
  { id: 'second', x: 6, z: 6 }
];
const receiver = {},
  token = {};
let shapes = 0,
  clearances = 0,
  predicates = 0;
const D = {
  performance: { now: () => ++ticks },
  BattleNavigationPhysicality: {
    shapeHit(slot) {
      assert.equal(this, D.BattleNavigationPhysicality);
      shapes++;
      return slot.shelter === false ? null : { obstacle: slot };
    }
  },
  BattleNavigation: {
    movementClear(a, b) {
      assert.equal(this, D.BattleNavigation);
      assert.equal(a, b);
      clearances++;
      return !a.blocked;
    }
  },
  BattleCoverPositions: {
    routeCandidates(actor, battle, threat, radius, predicate) {
      assert.equal(this, D.BattleCoverPositions);
      const out = [];
      for (const slot of slots) {
        if (!D.BattleNavigationPhysicality.shapeHit(slot)) continue;
        if (slot.occupied) continue;
        if (!predicate.call(receiver, slot, token)) continue;
        if (!D.BattleNavigation.movementClear(slot, slot)) continue;
        out.push(slot);
      }
      return out;
    }
  },
  BattleTacticalContactRoute: {
    pick(actor, battle) {
      const choices = D.BattleCoverPositions.routeCandidates(actor, battle, {}, 100, function (slot, value) {
        assert.equal(this, receiver, 'predicate receiver retained');
        assert.equal(value, token, 'all predicate arguments retained');
        predicates++;
        return !slot.routeRejected;
      });
      return { point: choices[0], stats: { total: choices.length, graphNodes: 1 } };
    }
  }
};
const plain = D.BattleTacticalContactRoute.pick(s, sim);
assert.equal(shapes, 6);
assert.equal(clearances, 3);
assert.equal(predicates, 4);
loadModule(D, 'scripts/battle-hotpath-profiler.cjs');
const observed = D.BattleTacticalContactRoute.pick(s, sim);
assert.deepEqual(observed, plain, 'same candidate identities and complete result');
assert.equal(observed.point, slots[4]);
assert.equal(shapes, 12, 'no native geometry query suppressed or duplicated');
assert.equal(clearances, 6, 'no native clearance query suppressed or duplicated');
assert.equal(predicates, 8, 'each predicate runs exactly once');
const stages = D.BattleHotpathProfiler.snapshot().routePlanning.candidateStages;
for (const [name, expected] of Object.entries({
  'shelter-tested': 6,
  'shelter-rejected': 1,
  'ownership-or-occupancy-rejected': 1,
  'route-filter-tested': 4,
  'route-filter-rejected': 1,
  'point-clearance-tested': 3,
  'point-clearance-rejected': 1,
  returned: 2,
  'graph-eligible': 2,
  'graph-admitted': 1,
  'graph-rank-discarded': 1,
  'rejected-prefix-span': 1,
  'rejected-prefix-shelter': 1
}))
  assert.equal(stages[name].count, expected, name);
assert.ok(
  stages['rejected-prefix-span'].measuredMs >= stages['rejected-prefix-shelter'].measuredMs,
  'span includes the native shelter test; overlapping timings must not be summed'
);
stages.returned.count = -1;
assert.equal(D.BattleHotpathProfiler.snapshot().routePlanning.candidateStages.returned.count, 2);
D.BattleHotpathProfiler.reset();
assert.deepEqual(D.BattleHotpathProfiler.snapshot().routePlanning.candidateStages, {});
D.BattleHotpathProfiler.restore();
assert.deepEqual(D.BattleTacticalContactRoute.pick(s, sim), plain);
assert.deepEqual(D.BattleHotpathProfiler.snapshot().routePlanning.candidateStages, {});
console.log('PASS discard-stage observations preserve native gates, predicate calls, state and restoration');
