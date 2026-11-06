'use strict';
/* ?fastRouteChecks: the controller's contact route planner (13g) asks each distinct LOS sample point once
   per plan and does not repeat the straight-leg wall check, and the navigation wall test (blocked) only
   looks at walls from a grid near the query. Both must give the same answers as the full work, with less
   work. Fails on the old code: no grid and no memo means the call counts do not drop.
     node tools/ai-sim-harness/fast-route-checks-check.js */
const assert = require('node:assert/strict');
const { loadModule, quietConsole } = require('./module-loader');

const CONTROLLER = { search: '?tacticalController=new' };
const OFF = { search: '?tacticalController=new&fastRouteChecks=0' };
const LEGACY = { search: '' };

function rng(seed) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}

/* ---------- Navigation wall grid ---------- */
function town(seed) {
  const r = rng(seed),
    buildings = [];
  for (let i = 0; i < 36; i++) {
    const w = 8 + r() * 14,
      d = 8 + r() * 12,
      openings = [];
    ['north', 'south', 'east', 'west'].forEach(side => {
      if (r() < 0.7) openings.push({ side, type: 'door', offset: (r() - 0.5) * 4, width: 1.2 });
      if (r() < 0.6)
        openings.push({ side, type: 'window', offset: (r() - 0.5) * 5, width: 1, sill: 0.9, height: 1.2 });
    });
    buildings.push({
      id: 'b' + i,
      x: -300 + r() * 460,
      z: -200 + r() * 280,
      w,
      d,
      rot: r() * Math.PI,
      openings
    });
  }
  return { buildings, objectives: [], roads: [] };
}
function nav(location, scenario) {
  const root = { GTMath: { clamp: (v, a, b) => Math.max(a, Math.min(b, v)) }, GTLog() {} };
  loadModule(root, 'battle/battle-navigation.js', { console: quietConsole, location });
  root.BattleNavigation.installScenario(scenario);
  return root.BattleNavigation;
}
function wallKey(N, w) {
  return w
    ? N.walls.findIndex(x => x.a.x === w.a.x && x.a.z === w.a.z && x.b.x === w.b.x && x.b.z === w.b.z)
    : -1;
}
for (const seed of [1, 7, 42]) {
  const scenario = town(seed),
    fast = nav(CONTROLLER, scenario),
    full = nav(OFF, scenario),
    legacy = nav(LEGACY, scenario),
    r = rng(seed * 31 + 5);
  assert.deepEqual(
    fast.findPath({ x: -320, z: -220 }, { x: 180, z: 100 }),
    full.findPath({ x: -320, z: -220 }, { x: 180, z: 100 }),
    'graph and path identical'
  );
  let blockedSeen = 0;
  for (let i = 0; i < 6000; i++) {
    /* Mostly short steps and hops (the hot calls), some long sight lines, some off the town. */
    const a = { x: -340 + r() * 520, z: -230 + r() * 340 },
      len = i % 10 === 0 ? r() * 300 : i % 3 === 0 ? r() * 30 : r() * 2,
      h = r() * Math.PI * 2,
      b = { x: a.x + Math.cos(h) * len, z: a.z + Math.sin(h) * len };
    const m = fast.movementClear(a, b);
    assert.equal(m, full.movementClear(a, b), 'movementClear identical');
    assert.equal(m, legacy.movementClear(a, b), 'movementClear identical to legacy');
    assert.equal(
      wallKey(fast, fast.lineOfSightBlocked(a, b, 1, 1)),
      wallKey(full, full.lineOfSightBlocked(a, b, 1, 1)),
      'lineOfSightBlocked returns the same first wall'
    );
    const sf = fast.resolveStep(a, b),
      so = full.resolveStep(a, b);
    assert.deepEqual(sf, so, 'resolveStep slides along the same wall');
    if (!m) blockedSeen++;
  }
  assert.ok(blockedSeen > 200, 'fixture actually hits walls (' + blockedSeen + ')');
}
/* The grid really narrows the scan. */
{
  const r = rng(99),
    queries = [];
  for (let i = 0; i < 2000; i++) {
    const a = { x: -300 + r() * 460, z: -200 + r() * 280 },
      h = r() * Math.PI * 2,
      len = r() * 3;
    queries.push([a, { x: a.x + Math.cos(h) * len, z: a.z + Math.sin(h) * len }]);
  }
  function time(N) {
    const t = process.hrtime.bigint();
    for (let k = 0; k < 20; k++) for (const [a, b] of queries) N.movementClear(a, b);
    return Number(process.hrtime.bigint() - t) / 1e6;
  }
  const fast = nav(CONTROLLER, town(3)),
    full = nav(OFF, town(3));
  time(fast);
  time(full);
  const tf = time(fast),
    to = time(full);
  assert.ok(
    tf < to * 0.6,
    'grid query is clearly faster than the full scan (' + tf.toFixed(1) + ' ms vs ' + to.toFixed(1) + ' ms)'
  );
}

/* ---------- 13g contact route: one LOS question per distinct sample point ---------- */
function route(location, cover, losFn) {
  const counts = { los: 0, clear: 0 };
  const root = {
    BattleNavigation: {
      movementClear(from, to) {
        counts.clear++;
        const crossed = (from.z < 20 && to.z >= 20) || (to.z < 20 && from.z >= 20);
        return !(crossed && Math.min(from.x, to.x) > -25);
      },
      findPath(from, to) {
        return [
          { x: -26, z: 20 },
          { x: to.x, z: to.z }
        ];
      },
      version: 1
    },
    BattleEngagement: { underFireNow: () => false },
    SquadAI: {
      hasLineOfSight(a, b) {
        counts.los++;
        return losFn(a.root.position, b.root.position);
      }
    },
    BattleCoverPositions: {
      candidates: (_s, _sim, _threat, radius) =>
        cover.filter(
          p => Math.hypot(p.x - root.soldier.root.position.x, p.z - root.soldier.root.position.z) <= radius
        ),
      routeCandidates: () => cover
    }
  };
  loadModule(root, 'battle/modules/13g-tactical-contact-route.js', { console: quietConsole, location });
  root.soldier = { id: 'rifle-1', suppressedUntil: 0, root: { position: { x: 0, y: 0, z: 0 } } };
  return { root, counts, sim: { time: 5, obstacles: [], heightAt: (x, z) => 0.01 * x + 0.02 * z } };
}
const cover = [];
{
  const r = rng(5);
  for (let i = 0; i < 70; i++)
    cover.push({ x: -60 + r() * 100, z: -10 + r() * 95, quality: r() * 0.3, slotId: 's' + i });
}
/* A sight picture with real structure: a few "masks" hide the man from the reported enemy. */
const los = (a, b) => !(Math.sin(a.x * 0.21) + Math.cos(a.z * 0.17) > 0.6) && b.z > a.z;
const reports = [
  { x: 5, z: 140, at: 5, confidence: 1 },
  { x: -30, z: 130, at: 5, confidence: 1 }
];
for (const goal of [
  { x: 0, z: 80 },
  { x: -40, z: 70 },
  { x: 20, z: 60 }
]) {
  const fast = route(CONTROLLER, cover, los),
    full = route(OFF, cover, los);
  const a = fast.root.BattleTacticalContactRoute.pick(fast.root.soldier, fast.sim, reports, goal, []),
    b = full.root.BattleTacticalContactRoute.pick(full.root.soldier, full.sim, reports, goal, []);
  assert.deepEqual(a, b, 'same route, score, exposure and stats');
  assert.ok(a.point, 'fixture plans a real route');
  assert.ok(
    fast.counts.los < full.counts.los * 0.8,
    'repeat sample points are asked once (' + fast.counts.los + ' vs ' + full.counts.los + ')'
  );
  assert.ok(
    fast.counts.clear < full.counts.clear,
    'straight legs are not wall-checked twice (' + fast.counts.clear + ' vs ' + full.counts.clear + ')'
  );
  /* Single live check (Engagement's bound start) is never memoized across calls. */
  const ea = fast.root.BattleTacticalContactRoute.evaluate(
      fast.root.soldier,
      fast.sim,
      a.point,
      reports,
      false
    ),
    eb = full.root.BattleTacticalContactRoute.evaluate(full.root.soldier, full.sim, a.point, reports, false);
  assert.deepEqual(ea, eb, 'evaluate identical');
}
/* Legacy page never takes the fast path, even in 13g. */
{
  const legacy = route(LEGACY, cover, los),
    full = route(OFF, cover, los);
  legacy.root.BattleTacticalContactRoute.pick(legacy.root.soldier, legacy.sim, reports, { x: 0, z: 80 }, []);
  full.root.BattleTacticalContactRoute.pick(full.root.soldier, full.sim, reports, { x: 0, z: 80 }, []);
  assert.equal(legacy.counts.los, full.counts.los, 'legacy page keeps the full LOS work');
}
console.log('fast-route-checks-check: ok');
