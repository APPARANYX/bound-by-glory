'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { loadSource, quietConsole } = require('./module-loader');
const file = 'battle/modules/13g-tactical-contact-route.js';
const source = fs.readFileSync(path.resolve(__dirname, '../..', file), 'utf8');
// Same search and budgets, with only memo hits disabled: this is a geometry
// fixture, not a battle A/B or an assertion that legacy tactics must match.
const hit = 'if (column.has(at.z)) return column.get(at.z);';
assert.equal(source.split(hit).length, 2, 'uncached control must disable exactly one cache read');
const uncached = source.replace(hit, '/* Deliberately query every sample in the control. */');
const clearance = '!direct && !N.movementClear(cursor, p)';
assert.equal(source.split(clearance).length, 2, 'control restores exactly one duplicate clearance');
const rechecking = source.replace(clearance, '!N.movementClear(cursor, p)');
function world(text, exposure, detour, coverOverride, mathCounts) {
  let calls = 0,
    nativeCalls = 0;
  const nativeTrace = [];
  const root = {
    SquadAI: {
      hasLineOfSight: (a, b) => {
        calls++;
        return exposure(a.root.position, b.root.position);
      }
    },
    BattleNavigation: {
      movementClear: (a, b) => {
        nativeCalls++;
        const clear = !detour || a.x === b.x || a.z === b.z;
        nativeTrace.push([a.x, a.z, b.x, b.z, clear]);
        return clear;
      },
      findPath: (a, b) => [
        { x: a.x, z: b.z },
        { x: b.x, z: b.z }
      ]
    },
    BattleEngagement: { underFireNow: () => false },
    BattleCoverPositions: {
      routeCandidates: (_s, _sim, _threat, _radius, pointAllowed) =>
        cover.filter(p => (!pointAllowed || pointAllowed(p)) && root.BattleNavigation.movementClear(p, p)),
      candidates: () => cover
    }
  };
  const cover = [];
  for (let x = -16; x <= 16; x += 8)
    for (let z = 8; z <= 64; z += 8) cover.push({ x, z, slotId: `${x}:${z}`, quality: 0.1 });
  if (coverOverride) cover.splice(0, cover.length, ...coverOverride);
  const math = Object.create(Math);
  if (mathCounts)
    math.hypot = (...args) => {
      mathCounts.hypot++;
      return Math.hypot(...args);
    };
  loadSource(root, text, { console: quietConsole, Math: math }, file);
  return {
    root,
    soldier: { root: { position: { x: 0, z: 0 } }, suppressedUntil: 0 },
    sim: { time: 5, obstacles: [], heightAt: (x, z) => Math.sin(x / 20) + Math.cos(z / 20) },
    calls: () => calls,
    nativeCalls: () => nativeCalls,
    nativeTrace: () => nativeTrace,
    reset: () => {
      calls = 0;
    }
  };
}
const reports = [
  { x: 0, z: 90 },
  { x: 32, z: 100 }
];
const goal = { x: 0, z: 70 };
// Restore the original comparator-only rank calculation as a geometry control.
// Sorting is synchronous: candidate coordinates/endpoints do not change, and
// equal ranks must still use the original slot-ID ordering and stable ties.
const rankedPush =
    /order\.push\(chosen\.length\);\s*ranks\.push\(crossTrack\(p, here, target\) \+ 0\.12 \* distance\(p, here\)\);\s*chosen\.push\(p\);/,
  rankedSort = /order\.sort\(function \(a, b\) \{[\s\S]*?\n    \}\);/,
  rankedNodes = /order\.map\(function \(index\) \{\s*return chosen\[index\];\s*\}\)/,
  rankedCap = 'order.length = Math.min(order.length, MAX_NODES);';
assert.ok(rankedPush.test(source), 'one search-local primitive rank construction');
assert.ok(rankedSort.test(source), 'one original-order index comparator');
assert.ok(rankedNodes.test(source), 'select only the capped original graph points');
assert.equal(source.split(rankedCap).length, 2, 'the existing cap applies to sorted indices');
const repeatedRank = source
  .replace(rankedPush, 'chosen.push(p);')
  .replace(
    rankedSort,
    'chosen.sort(function (a, b) { return crossTrack(a, here, target) + 0.12 * distance(a, here) - ' +
      '(crossTrack(b, here, target) + 0.12 * distance(b, here)) || ' +
      'String(a.slotId).localeCompare(String(b.slotId)); });'
  )
  .replace(rankedCap, 'chosen.length = Math.min(chosen.length, MAX_NODES);')
  .replace(rankedNodes, 'chosen');
let rankHypotBefore = 0,
  rankHypotAfter = 0;
for (const detour of [false, true]) {
  // More than MAX_NODES, equal-rank mirrored points, duplicate IDs, missing
  // IDs and tiny perturbations exercise ordering, stability and graph clipping.
  const cover = Array.from({ length: 192 }, (_, i) => ({
    x: (i % 2 ? -1 : 1) * ((Math.floor(i / 2) % 11) + 1) * 1.01,
    z: 3 + Math.floor(i / 22) * 2.04 + (Math.floor(i / 2) % 17 === 0 ? 1e-9 : 0),
    slotId: i % 19 === 0 ? undefined : 'rank-' + (i % 181),
    quality: [0, 0.1, -0.2, '0.3'][i % 4]
  }));
  const before = { hypot: 0 },
    after = { hypot: 0 },
    fast = world(source, p => p.x > 8, detour, cover, after),
    control = world(repeatedRank, p => p.x > 8, detour, cover, before),
    original = JSON.stringify(cover),
    run = w => w.root.BattleTacticalContactRoute.pick(w.soldier, w.sim, reports, goal, []);
  assert.deepEqual(run(fast), run(control), 'rank reuse preserves full routes, ties, exposure and budgets');
  assert.deepEqual(fast.nativeTrace(), control.nativeTrace(), 'same ordered live physical queries');
  assert.equal(fast.calls(), control.calls(), 'same ordered-search sight workload');
  assert.equal(JSON.stringify(cover), original, 'candidate records are not decorated or mutated');
  assert.ok(after.hypot < before.hypot, 'the complete search makes fewer real hypot calls');
  rankHypotBefore += before.hypot;
  rankHypotAfter += after.hypot;
}
// Restoring exposure on every physical edge is the pre-optimization control.
// This must retain physical checks and their detour budgets, even when an
// already-known route makes the edge incapable of improving a node's cost.
const boundedExposure = /\bvisibility,\s*cannotImprove\s*\n/g;
assert.equal((source.match(boundedExposure) || []).length, 1, 'one graph-only lower-bound gate');
const fullExposure = source.replace(boundedExposure, 'visibility\n');
let dominatedSightSaved = 0,
  dominatedSightBefore = 0;
for (const detour of [false, true]) {
  for (const exposure of [() => false, p => p.x > 7 && p.z < 48, p => p.z > 25 && p.z < 35]) {
    const fast = world(source, exposure, detour),
      control = world(fullExposure, exposure, detour),
      run = w => w.root.BattleTacticalContactRoute.pick(w.soldier, w.sim, reports, goal, []);
    assert.deepEqual(
      run(fast),
      run(control),
      'dominated-edge pruning preserves full result and graph counters'
    );
    assert.equal(
      fast.nativeCalls(),
      control.nativeCalls(),
      'all live physical queries and detour work remain'
    );
    assert.deepEqual(
      fast.nativeTrace(),
      control.nativeTrace(),
      'ordered live physical arguments and answers'
    );
    dominatedSightBefore += control.calls();
    dominatedSightSaved += control.calls() - fast.calls();
  }
}
assert.ok(dominatedSightSaved > 0, 'non-improving edges must avoid actual native sight work');
// Dense graphs reach the existing edge/detour budgets. Mixed numeric quality
// and tiny coordinate changes exercise floating cost ties without a new epsilon.
for (const detour of [false, true]) {
  const dense = Array.from({ length: 170 }, (_, i) => ({
    x: (i % 13) * 2.01 - 12.06,
    z: Math.floor(i / 13) * 2.03 + 2,
    slotId: 'dense-' + i,
    quality: [0, 0.1, -0.2, 0.00001, '0.3', NaN, Infinity][i % 7]
  }));
  const fast = world(source, p => p.x > 9, detour, dense),
    control = world(fullExposure, p => p.x > 9, detour, dense),
    run = w => w.root.BattleTacticalContactRoute.pick(w.soldier, w.sim, reports, goal, []);
  assert.deepEqual(run(fast), run(control), 'dense graph selection, rejection counts and native budgets');
  assert.equal(fast.nativeCalls(), control.nativeCalls(), 'dense graph physical work is unchanged');
  assert.deepEqual(fast.nativeTrace(), control.nativeTrace(), 'dense graph live physical transcript');
}
// A straight leg has already passed its native clearance query. Rechecking
// that identical segment during this synchronous evaluation buys no safety.
const direct = world(source, () => false, false);
let clearCalls = 0;
direct.root.BattleNavigation.movementClear = () => {
  clearCalls++;
  return true;
};
const directResult = direct.root.BattleTacticalContactRoute.evaluate(
  direct.soldier,
  direct.sim,
  { x: 8, z: 12 },
  reports,
  false
);
assert.equal(directResult.eligible, true);
assert.equal(clearCalls, 1, 'one clear straight segment needs one native query');
// No result is reused for another request, even at the same simulation time.
direct.root.BattleNavigation.movementClear = () => false;
direct.root.BattleNavigation.findPath = null;
assert.equal(
  direct.root.BattleTacticalContactRoute.evaluate(direct.soldier, direct.sim, { x: 8, z: 12 }, reports, false)
    .eligible,
  false,
  'live validation sees a newly blocked segment'
);
const detoured = world(source, () => false, true);
let detourChecks = 0;
detoured.root.BattleNavigation.movementClear = (a, b) => {
  detourChecks++;
  return a.x === b.x || a.z === b.z;
};
assert.equal(
  detoured.root.BattleTacticalContactRoute.evaluate(
    detoured.soldier,
    detoured.sim,
    { x: 8, z: 12 },
    reports,
    false
  ).eligible,
  true
);
assert.equal(detourChecks, 3, 'blocked direct leg plus both native detour segments are checked');
detoured.root.BattleNavigation.movementClear = (a, b) => a.x === b.x;
assert.equal(
  detoured.root.BattleTacticalContactRoute.evaluate(
    detoured.soldier,
    detoured.sim,
    { x: 8, z: 12 },
    reports,
    false
  ).reason,
  'blocked-physical-segment',
  'a navigator path cannot bypass segment clearance'
);
// The native candidate owner can skip a stand query only for points the
// existing exact route filters discard. Control restores those queries and
// leaves every subsequent graph decision, budget and diagnostic intact.
const admissionCall = 'C.routeCandidates(s, sim, threat, horizon, routePointAllowed)';
assert.equal(source.split(admissionCall).length, 2, 'control restores one route-only admission boundary');
const unfiltered = source.replace(admissionCall, 'C.routeCandidates(s, sim, threat, horizon)'),
  filteredCover = [
    { x: 0, z: 12, slotId: 'taken', quality: 0.1 },
    { x: -12, z: 8, slotId: 'first', quality: 0.1 },
    { x: -8, z: 28, slotId: 'middle', quality: 0.1 },
    { x: 0, z: 48, slotId: 'last', quality: 0.1 },
    ...Array.from({ length: 40 }, (_, i) => ({
      x: (i % 2 ? -1 : 1) * (112 + (i % 8)),
      z: (i % 6) * 3,
      slotId: 'outside-corridor:' + i,
      quality: 0.1
    }))
  ];
let admissionSaved = 0;
for (const detour of [false, true]) {
  const fast = world(source, () => false, detour, filteredCover),
    control = world(unfiltered, () => false, detour, filteredCover),
    taken = [{ x: 0, z: 12 }],
    run = w => w.root.BattleTacticalContactRoute.pick(w.soldier, w.sim, reports, goal, taken),
    actual = run(fast);
  assert.deepEqual(actual, run(control), 'admission preserves complete route, score, exposure and counters');
  assert.equal(
    control.nativeCalls() - fast.nativeCalls(),
    41,
    '40 outside-corridor and one taken point query removed'
  );
  admissionSaved += control.nativeCalls() - fast.nativeCalls();
}

let saved = 0,
  total = 0,
  nativeBefore = 0,
  nativeSaved = 0;
for (const detour of [false, true]) {
  for (const exposure of [() => false, p => p.x > 7 && p.z < 48, p => p.z > 25 && p.z < 35]) {
    const a = world(source, exposure, detour),
      b = world(uncached, exposure, detour),
      c = world(rechecking, exposure, detour);
    const run = w => w.root.BattleTacticalContactRoute.pick(w.soldier, w.sim, reports, goal, []);
    const actual = run(a),
      control = run(b);
    assert.deepEqual(
      actual,
      control,
      'cache preserves full plan, exposure, score, budgets and rejection counters'
    );
    assert.ok(a.calls() < b.calls(), 'shared graph samples must reduce actual sight calls');
    assert.deepEqual(actual, run(c), 'single clearance preserves plans, exposures, scores and budgets');
    assert.ok(a.nativeCalls() <= c.nativeCalls());
    nativeBefore += c.nativeCalls();
    nativeSaved += c.nativeCalls() - a.nativeCalls();
    total += b.calls();
    saved += b.calls() - a.calls();
  }
}
assert.ok(nativeSaved > 0, 'duplicate direct-leg checks are removed from graph searches');
// Visibility changes between successful searches even without advancing time.
// A search-local cache must not retain old geometry or old report coordinates.
let visible = false;
const live = world(source, () => visible, false);
const route = live.root.BattleTacticalContactRoute;
const first = route.pick(live.soldier, live.sim, reports, goal, []);
assert.ok(first.point);
live.reset();
visible = true;
assert.equal(
  route.evaluate(live.soldier, live.sim, first.point, reports, false).eligible,
  false,
  'execution validation cannot reuse the planning result'
);
assert.ok(live.calls() > 0);
assert.equal(
  route.pick(live.soldier, live.sim, reports, goal, []).point,
  null,
  'next search at the same simulated instant sees changed visibility'
);
visible = false;
live.sim.time += 3; // Expire the existing negative-plan cache, independent of this change.
const newReports = [{ x: -40, z: 110 }];
live.reset();
assert.ok(route.pick(live.soldier, live.sim, newReports, goal, []).point);
assert.ok(live.calls() > 0, 'new search and report need fresh rays');
console.log(
  'TACTICAL_CONTACT_ROUTE_COST_CHECK passed',
  JSON.stringify({
    fixtures: 6,
    totalUncachedSightCalls: total,
    avoidedSightCalls: saved,
    avoidedPercent: +((saved / total) * 100).toFixed(1),
    nativeClearanceQueriesBefore: nativeBefore,
    avoidedNativeClearanceQueries: nativeSaved,
    avoidedIrrelevantStandQueries: admissionSaved,
    rankHypotBefore,
    rankHypotAfter,
    dominatedEdgeSightQueriesBefore: dominatedSightBefore,
    avoidedDominatedEdgeSightQueries: dominatedSightSaved
  })
);
