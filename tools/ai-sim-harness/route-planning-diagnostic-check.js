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
