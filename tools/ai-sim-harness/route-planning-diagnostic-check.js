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

// Repetition is evidence about explicit inputs, never permission to skip native
// calls. Include contradictory results, options, signed zero and source identity.
const geometry = [],
  otherGeometry = [];
let nativeCalls = 0,
  pickCalls = 0;
const ordinaryResult = { point: null, stats: {} };
const Q = {
  performance: { now: () => ++ticks },
  BattleObstacleField: {
    sightBlocked() {
      nativeCalls++;
      return false;
    }
  },
  BattleNavigation: {
    movementClear(a, b) {
      nativeCalls++;
      return nativeCalls % 2 === 0;
    },
    findPath(a, b) {
      Q.BattleNavigation.movementClear(a, b);
      return [];
    }
  },
  BattleTacticalContactRoute: {
    pick() {
      pickCalls++;
      const a = { x: 1, z: 2 },
        b = { x: 3, z: 4 },
        eye = { ...a, y: 1 },
        target = { ...b, y: 2 };
      Q.BattleNavigation.movementClear(a, b);
      Q.BattleNavigation.movementClear(a, b); // contradictory same inputs
      Q.BattleNavigation.findPath(a, b); // cross-producer repeat
      Q.BattleNavigation.movementClear(a, b, { ignoreDynamicId: 'carrier' });
      Q.BattleNavigation.movementClear(a, b, { unknown: true });
      Q.BattleNavigation.movementClear({ x: 0, z: 2 }, b);
      Q.BattleNavigation.movementClear({ x: -0, z: 2 }, b);
      Q.BattleObstacleField.sightBlocked(geometry, eye, target);
      Q.BattleObstacleField.sightBlocked(geometry, eye, target);
      Q.BattleObstacleField.sightBlocked(otherGeometry, eye, target);
      Q.BattleObstacleField.sightBlocked(geometry, { ...eye, y: 1.1 }, target);
      return ordinaryResult;
    }
  }
};
loadModule(Q, 'scripts/battle-hotpath-profiler.cjs');
for (let i = 0; i < 2; i++) {
  assert.equal(Q.BattleTacticalContactRoute.pick(s, sim, reports, { x: 0, z: 8 }, []), ordinaryResult);
}
assert.equal(nativeCalls, 22, 'every native query executes, including every repeated query');
const repeats = Q.BattleHotpathProfiler.snapshot().routePlanning.queryRepetition;
assert.equal(repeats.movementClear.calls, 14);
assert.equal(repeats.movementClear.repeated, 4, 'counts reset between individual picks');
assert.equal(repeats.movementClear.distinctTracked, 8, 'options and signed zero remain distinct');
assert.equal(repeats.movementClear.untracked, 2, 'unsupported options are explicit omissions');
assert.equal(repeats.movementClear.resultDisagreements, 2, 'same inputs can still have changed results');
assert.equal(repeats.movementClear.byProducer['navigation.findPath'].repeated, 2);
assert.equal(repeats.sightBlocked.calls, 8);
assert.equal(repeats.sightBlocked.repeated, 2);
assert.equal(repeats.sightBlocked.distinctTracked, 6, 'height and obstacle source identity remain distinct');
assert.equal(repeats.sightBlocked.resultDisagreements, 0);
repeats.movementClear.calls = -1;
assert.equal(
  Q.BattleHotpathProfiler.snapshot().routePlanning.queryRepetition.movementClear.calls,
  14,
  'diagnostic snapshots are detached'
);
Q.BattleHotpathProfiler.reset();
assert.deepEqual(Q.BattleHotpathProfiler.snapshot().routePlanning.queryRepetition, {});
Q.BattleHotpathProfiler.restore();
Q.BattleTacticalContactRoute.pick();
assert.equal(nativeCalls, 33);
assert.equal(pickCalls, 3);
assert.deepEqual(Q.BattleHotpathProfiler.snapshot().routePlanning.queryRepetition, {});
console.log('PASS exact per-pick query repetitions, producer attribution, disagreements and restore');
