'use strict';
/* Controller route planner (13g) work reuse, under ?tacticalController=new:
   - ?controllerRouteSight: a sample point's line of sight to a reported position is kept (terrain and
     static obstacles only) and reused by later plans, by every squadmate's plan and by the next plan; it
     is dropped when the static geometry changes, not used while a vehicle footprint is on the map, and
     the store starts over at its bound (25k answers, about 4 MB).
   - ?controllerRoutePrune: Dijkstra does not walk an edge whose cheapest possible cost cannot lower the
     node's distance, but still spends the edge and detour budgets it would have spent.
   Both must plan exactly the same routes with less work. Fails on the old code: no store and no pruning
   means the line-of-sight and edge counts do not drop.
     node tools/ai-sim-harness/controller-route-reuse-check.js */
const assert = require('node:assert/strict');
const { loadModule, quietConsole } = require('./module-loader');

const ON = '?tacticalController=new';
const SIGHT_OFF = ON + '&controllerRouteSight=0';
const PRUNE_OFF = ON + '&controllerRoutePrune=0';
const BOTH_OFF = ON + '&controllerRouteSight=0&controllerRoutePrune=0';

function rng(seed) {
  let s = seed >>> 0;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}
const cover = [];
{
  const r = rng(5);
  for (let i = 0; i < 90; i++)
    cover.push({ x: -60 + r() * 110, z: -10 + r() * 100, quality: r() * 0.3, slotId: 's' + i });
}
/* A wall along z = 20 east of x = -25: legs across it need a native detour (findPath), so the plan's
   detour budget (20) is spent and runs out. Masks hide some sample points from the reported enemy. */
function world(search, sight) {
  const counts = { los: 0, clear: 0, paths: 0 };
  const root = {
    BattleNavigation: {
      movementClear(from, to) {
        counts.clear++;
        const crossed = (from.z < 20 && to.z >= 20) || (to.z < 20 && from.z >= 20);
        return !(crossed && Math.min(from.x, to.x) > -25);
      },
      findPath(from, to) {
        counts.paths++;
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
        return (root.sight || sight)(a.root.position, b.root.position, a.crouching);
      }
    },
    BattleCoverPositions: {
      candidates: (s, _sim, _threat, radius) =>
        cover.filter(p => Math.hypot(p.x - s.root.position.x, p.z - s.root.position.z) <= radius),
      routeCandidates: () => cover
    }
  };
  loadModule(root, 'battle/modules/13g-tactical-contact-route.js', {
    console: quietConsole,
    location: { search }
  });
  const obstacles = [{ x: 0, z: 20 }];
  obstacles.__physicalVersion = 1;
  return {
    root,
    counts,
    R: root.BattleTacticalContactRoute,
    sim: { time: 5, obstacles, heightAt: (x, z) => 0.01 * x + 0.02 * z }
  };
}
const sight = (a, b, low) => !(Math.sin(a.x * 0.21) + Math.cos(a.z * 0.17) > (low ? 0.4 : 0.8)) && b.z > a.z;
const reports = [
  { x: 5, z: 140, at: 5, confidence: 1 },
  { x: -30, z: 130, at: 5, confidence: 1 }
];
const men = [
  { x: 0, z: 0 },
  { x: -8, z: 3 },
  { x: 12, z: -2 },
  { x: 4, z: 6 }
].map((p, i) => ({ id: 'rifle-' + i, suppressedUntil: 0, root: { position: { x: p.x, y: 0, z: p.z } } }));
const goals = [
  { x: 0, z: 80 },
  { x: -40, z: 70 },
  { x: 20, z: 60 }
];
/* A squad's planning pass: every man toward every goal, twice (the next step plans again). */
function plans(w) {
  const out = [];
  for (let pass = 0; pass < 2; pass++)
    for (const goal of goals)
      for (const s of men) {
        out.push(w.R.pick(s, w.sim, reports, goal, []));
        w.sim.time += 0.15;
      }
  return out;
}
/* The planner's audit counts edges it rejected or admitted; pruned edges are neither. */
function route(p) {
  const { rejected, safe, admittedDetours, pruned, ...stats } = p.stats;
  return { point: p.point, waypoints: p.waypoints, score: p.score, exposure: p.exposure, stats };
}

/* ---------- sight store ---------- */
{
  const on = world(PRUNE_OFF, sight),
    off = world(BOTH_OFF, sight);
  const a = plans(on),
    b = plans(off);
  assert.deepEqual(a, b, 'same routes, scores, exposures and full stats with the sight store');
  assert.ok(
    a.filter(p => p.point).length >= 12,
    'fixture plans real routes (' + a.filter(p => p.point).length + ')'
  );
  assert.ok(
    on.counts.los < off.counts.los * 0.35,
    'later plans reuse stored lines (' + on.counts.los + ' vs ' + off.counts.los + ')'
  );
  /* The static geometry changes: the stored answers are dropped and the new picture is used. */
  const moved = (p, q, low) => sight(p, q, low) && Math.abs(p.x - 2) > 9;
  for (const w of [on, off]) {
    w.sim.obstacles.__physicalVersion = 2;
    w.root.sight = moved;
  }
  assert.deepEqual(plans(on), plans(off), 'a new physical version re-asks every line');
  /* A vehicle footprint on the map: nothing is stored or reused. */
  for (const w of [on, off]) w.sim.obstacles.__dynamicFootprints = [{ id: 'truck-1', x: 30, z: 40 }];
  const losOn = on.counts.los,
    losOff = off.counts.los;
  assert.deepEqual(plans(on), plans(off), 'same routes with a vehicle on the map');
  assert.equal(on.counts.los - losOn, off.counts.los - losOff, 'no stored line is used beside a vehicle');
}
/* ---------- the sight store is bounded (about 4 MB) ---------- */
{
  const w = world(PRUNE_OFF, sight),
    limit = w.R.tuning.sightStoreAnswers;
  assert.ok(limit > 0 && limit <= 25000, 'the sight store keeps at most 25k answers (' + limit + ')');
  const ask = rs => {
    const before = w.counts.los;
    w.R.pick(men[0], w.sim, rs, goals[0], []);
    return w.counts.los - before;
  };
  const first = [reports[0]],
    cold = ask(first);
  assert.ok(cold > 0, 'fixture asks lines');
  assert.equal(ask(first), 0, 'a repeated plan reads every line from the store');
  /* Each plan toward a new reported position stores the lines it had to ask, until the store starts
     over and the first plan's lines are asked again. */
  let kept = cold,
    most = cold;
  for (let i = 1; ask(first) === 0; i++) {
    const n = ask([{ ...reports[0], x: reports[0].x + i / 64 }]);
    kept += n;
    most = Math.max(most, n);
    assert.ok(kept <= limit + most, 'the store starts over at its bound (' + kept + ' lines kept)');
  }
  assert.ok(kept > limit, 'and not before it (' + kept + ' of ' + limit + ')');
}
/* ---------- edge pruning ---------- */
{
  const on = world(SIGHT_OFF, sight),
    off = world(BOTH_OFF, sight);
  const a = plans(on),
    b = plans(off);
  assert.deepEqual(a.map(route), b.map(route), 'same routes, scores, budgets and search with pruning');
  assert.ok(
    a.some(p => p.stats.nativePathQueries >= 20),
    'fixture spends the whole native-detour budget in a plan'
  );
  assert.ok(
    a.some(p => p.stats.pruned > 0),
    'fixture prunes edges (' + a.map(p => p.stats.pruned).join(',') + ')'
  );
  assert.ok(
    on.counts.los < off.counts.los * 0.7,
    'pruned edges are not sampled (' + on.counts.los + ' vs ' + off.counts.los + ')'
  );
  assert.ok(on.counts.paths <= off.counts.paths, 'no extra native detours');
}
/* ---------- both, and the legacy page ---------- */
{
  const on = world(ON, sight),
    off = world(BOTH_OFF, sight),
    legacy = world('', sight),
    full = world(BOTH_OFF + '&fastRouteChecks=0', sight);
  assert.deepEqual(plans(on).map(route), plans(off).map(route), 'same routes with both on');
  assert.deepEqual(plans(legacy), plans(full), 'legacy page: same plans and full stats');
  assert.equal(legacy.counts.los, full.counts.los, 'legacy page keeps the full work');
  assert.ok(
    on.counts.los < off.counts.los * 0.3,
    'both together (' + on.counts.los + ' vs ' + off.counts.los + ')'
  );
}
console.log('controller-route-reuse-check: ok');
