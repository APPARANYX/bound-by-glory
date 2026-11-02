#!/usr/bin/env node
'use strict';
/* A3 of the 2026-10-20 architecture audit: the composed physicality/OBB geometry contract. Loads the
   real obstacle-field, base navigation and the physicality layer (module 39) that replaces
   N.movementClear/findPath at load time, then pins what they promise together: moving and static
   OBBs, move versus sight query modes, the truck self-ignore, and replay determinism. */
const assert = require('node:assert/strict'),
  fs = require('node:fs'),
  path = require('node:path'),
  H = require('./harness'),
  { loadModule, loadSource, quietConsole } = require('./module-loader');
let n = 0;
function test(name, fn) {
  fn();
  n++;
  console.log('PASS ' + name);
}
function world(opts) {
  opts = opts || {};
  const r = H.bootstrap({ modules: false });
  loadModule(r, 'battle/modules/14-z-ballistic-raycast.js', { console: quietConsole });
  r.BattleModules = { registerSystem() {}, unitsFor: () => [] };
  loadModule(r, 'battle/battle-navigation.js', { console: quietConsole });
  const file = 'battle/modules/39-navigation-physicality-debug.js';
  const source = fs
    .readFileSync(path.join(H.REPO, file), 'utf8')
    .replace(
      'var id = bucket[j];',
      'root._physicalBucketVisits = (root._physicalBucketVisits || 0) + 1; var id = bucket[j];'
    )
    .replace(
      'function shapeHit(a, b, fp, margin) {',
      'function shapeHit(a, b, fp, margin) { root._physicalShapeTests = (root._physicalShapeTests || 0) + 1;'
    );
  loadSource(r, source, { console: quietConsole, ...opts.bindings }, file);
  assert.ok(r.BattleNavigationPhysicality, 'physicality layer installed');
  const obstacles = [];
  obstacles.__physicalFootprints = opts.statics || [];
  obstacles.__physicalVersion = 1;
  obstacles.__dynamicFootprints = [];
  const sim = H.makeBattle(r, { obstacles });
  r.__battle__ = sim;
  return { r, N: r.BattleNavigation, F: r.BattleObstacleField, sim, obstacles };
}
function wall(id, x, z, hx, hz, angle) {
  const c = Math.cos(angle || 0),
    s = Math.sin(angle || 0);
  return { id, type: 'wall', shape: 'obb', x, z, hx, hz, ux: c, uz: s, vx: -s, vz: c, y: 0, height: 2 };
}
/* Same shape the transport fleet publishes: position and heading are live getters over a vehicle. */
function truckFootprint(v) {
  const fp = { id: v.id, type: 'truck', shape: 'obb', hx: 1.25, hz: 3.1, height: 2.8 };
  Object.defineProperties(fp, {
    x: { enumerable: true, get: () => v.position.x },
    z: { enumerable: true, get: () => v.position.z },
    y: { enumerable: true, get: () => 0 },
    ux: { enumerable: true, get: () => v.heading.z },
    uz: { enumerable: true, get: () => -v.heading.x },
    vx: { enumerable: true, get: () => v.heading.x },
    vz: { enumerable: true, get: () => v.heading.z }
  });
  return fp;
}
const P = (x, z) => ({ x, z });

test('obstacle sight reuses unchanged axes without caching ray answers', () => {
  const r = { GTMath: { clamp: (v, lo, hi) => Math.max(lo, Math.min(hi, v)) }, GTLog() {} },
    countedMath = Object.create(Math);
  let normalizations = 0;
  countedMath.hypot = (...args) => {
    normalizations++;
    return Math.hypot(...args);
  };
  loadModule(r, 'battle/obstacle-field.js', { Math: countedMath, console: quietConsole });
  const F = r.BattleObstacleField,
    ob = { ...wall('slope', 0, 0, 5, 0.4, 0.3), y0: 0, y1: 0.7 },
    keys = Object.keys(ob),
    a = { x: -9, z: 0, y: 1 },
    b = { x: 9, z: 0, y: 1 };
  const hit = F.sightHitT(ob, a, b);
  assert.notEqual(hit, null, 'real sloped prism ray intersects');
  assert.equal(normalizations, 2, 'one normalization for each of the two axes');
  for (let i = 0; i < 500; i++) assert.equal(F.sightHitT(ob, a, b), hit);
  assert.equal(normalizations, 2, 'identical axis inputs never repeat normalization');
  assert.equal(F.sightHitT(ob, { ...a, y: 10 }, { ...b, y: 10 }), null, 'new ray still tested');
  ob.height = 20;
  assert.notEqual(F.sightHitT(ob, { ...a, y: 10 }, { ...b, y: 10 }), null, 'height remains live');
  ob.x = 50;
  assert.equal(F.sightHitT(ob, a, b), null, 'translation remains live');
  assert.deepEqual(Object.keys(ob), keys, 'cache adds no obstacle fields');
});

test('cached obstacle axes match fresh inputs across mutation, fallbacks and signed zero', () => {
  const r = { GTMath: { clamp: (v, lo, hi) => Math.max(lo, Math.min(hi, v)) }, GTLog() {} };
  loadModule(r, 'battle/obstacle-field.js', { console: quietConsole });
  const F = r.BattleObstacleField,
    ob = { ...wall('changing', 0, 0, 5, 0.4, 0), y0: 0.1, y1: 0.9 },
    variants = [
      [1, 0, 0, 1],
      [1, 1, -1, 1],
      [2, 1, -1, 1],
      [2, 2, -1, 1],
      [2, 2, -2, 1],
      [2, 2, -2, 2],
      [2, 3, -3, 2],
      [0, 0, 0, 0],
      [undefined, undefined, undefined, undefined],
      [NaN, Infinity, NaN, Infinity],
      ['2', '3', '-3', '2'],
      [null, null, null, null],
      [1, -0, -0, 1],
      [1, 0, 0, 1],
      [1, 0, 1, 1],
      [1, 0, 1, -1]
    ];
  for (const [ux, uz, vx, vz] of variants) {
    Object.assign(ob, { ux, uz, vx, vz });
    for (let i = 0; i < 80; i++) {
      const t = i * 0.31,
        a = { x: Math.sin(t) * 9, z: Math.cos(t) * 9, y: i % 4 },
        b = { x: -a.x, z: -a.z, y: (i + 1) % 4 },
        fresh = { ...ob };
      assert.equal(F.sightHitT(ob, a, b), F.sightHitT(fresh, a, b), 'warm/fresh prism intersection');
      assert.equal(F.horizontalDistance(ob, a.x, a.z), F.horizontalDistance(fresh, a.x, a.z));
      assert.equal(F.obstacleTop(ob, a.x, a.z), F.obstacleTop(fresh, a.x, a.z));
    }
  }
});

test('obstacle axis reuse always reads live truck heading getters', () => {
  const { F, obstacles } = world(),
    vehicle = { id: 'turning-truck', position: { x: 0, z: 0 }, heading: { x: 0, z: 1 } },
    fp = truckFootprint(vehicle),
    a = { x: -5, z: 2, y: 1 },
    b = { x: 5, z: 2, y: 1 };
  obstacles.__dynamicFootprints = [fp];
  assert.equal(F.sightBlocked(obstacles, a, b), true);
  vehicle.heading = { x: 1, z: 0 };
  assert.equal(F.sightBlocked(obstacles, a, b), false, 'same version/time rotated truck no longer blocks');
  vehicle.position.z = 2;
  assert.equal(F.sightBlocked(obstacles, a, b), true, 'same version/time translated truck blocks');
  assert.equal(F.sightBlocked(obstacles, a, b, { ignoreDynamicId: vehicle.id }), false);
  assert.equal(F.sightBlocked(obstacles, a, b), true, 'self-ignore does not cache a visibility answer');
});

test('static OBB blocks a crossing step and honours the 0.45 m body margin', () => {
  const { N } = world({ statics: [wall('w', 0, 0, 5, 0.25, 0)] });
  assert.equal(N.movementClear(P(0, -4), P(0, 4)), false, 'crossing the wall');
  assert.equal(N.movementClear(P(-9, 0.25 + 0.4), P(9, 0.25 + 0.4)), false, 'inside the body margin');
  assert.equal(N.movementClear(P(-9, 0.25 + 0.5), P(9, 0.25 + 0.5)), true, 'just outside the margin');
  assert.equal(N.movementClear(P(5.9, -4), P(5.9, 4)), true, 'past the short end');
});

test('rotated OBB is tested as an oriented box, not its bounding box', () => {
  // A thin 10 m wall turned 45 degrees: its AABB is about 7.5 m square, mostly empty.
  const { N } = world({ statics: [wall('d', 0, 0, 5, 0.25, Math.PI / 4)] });
  assert.equal(N.movementClear(P(-4, -4), P(4, 4)), false, 'runs along the long axis, on it');
  assert.equal(N.movementClear(P(-4, -2), P(4, 6)), true, 'parallel 1.4 m off, inside the AABB');
  assert.equal(N.movementClear(P(3, -3), P(3.4, -2.6)), true, 'AABB corner the OBB never reaches');
  assert.equal(N.movementClear(P(-3, 3), P(3, -3)), false, 'crosses the OBB through its middle');
  assert.equal(N.movementClear(P(3.6, -3.6), P(3.6, 3.6)), false, 'clips the OBB end inside the AABB corner');
});

test('empty dynamic list skips filtering while static and subsequently moving geometry stay live', () => {
  const { N, obstacles } = world({ statics: [wall('static', 0, 0, 5, 0.3, 0)] }),
    empty = [],
    vehicle = { id: 'truck-late', position: { x: 10, z: 0 }, heading: { x: 0, z: 1 } };
  empty.filter = () => {
    throw new Error('an empty dynamic set must not be filtered for every query');
  };
  obstacles.__dynamicFootprints = empty;
  assert.equal(N.movementClear(P(0, -4), P(0, 4)), false, 'static footprint still blocks');
  assert.equal(N.movementClear(P(10, -4), P(10, 4)), true, 'empty dynamic set leaves free space');
  obstacles.__dynamicFootprints = [truckFootprint(vehicle)];
  assert.equal(N.movementClear(P(10, -4), P(10, 4)), false, 'newly attached truck blocks immediately');
  vehicle.position.x = 20;
  assert.equal(N.movementClear(P(10, -4), P(10, 4)), true, 'moving truck remains live');
});

test('physical cell collections avoid repeated bucket visits without retaining query answers', () => {
  const statics = [wall('long', 0, 0, 18, 0.3, 0)],
    { r, N, obstacles } = world({ statics }),
    vehicle = { id: 'live-truck', position: { x: 8, z: 4 }, heading: { x: 0, z: 1 } };
  N.movementClear(P(-10, 4), P(10, 4));
  const visits = r._physicalBucketVisits;
  const tests = r._physicalShapeTests;
  for (let i = 0; i < 200; i++) {
    const z = 3 + i / 200;
    assert.equal(N.movementClear(P(-10, z), P(10, z)), true);
  }
  assert.equal(r._physicalBucketVisits, visits, 'warm cell rectangle does not recollect static IDs');
  assert.ok(r._physicalShapeTests >= tests + 200, 'every exact ray still tests current geometry');
  // Replacing an object in the existing list must read the current object at its ID,
  // even without changing the index's version or the list identity/length.
  statics[0] = wall('replacement', 0, 4, 18, 0.3, 0);
  assert.equal(N.movementClear(P(-10, 4), P(10, 4)), false);
  statics[0] = wall('restored', 0, 0, 18, 0.3, 0);
  assert.equal(N.movementClear(P(-10, 4), P(10, 4)), true);
  obstacles.__dynamicFootprints = [truckFootprint(vehicle)];
  assert.equal(N.movementClear(P(-10, 4), P(10, 4)), false, 'new truck enters warmed collection');
  assert.equal(N.movementClear(P(-10, 4), P(10, 4), { ignoreDynamicId: vehicle.id }), true);
  vehicle.position.z = 12;
  assert.equal(N.movementClear(P(-10, 4), P(10, 4)), true, 'same-time live truck movement');
  statics[0] = wall('new-index', 0, 4, 18, 0.3, 0);
  obstacles.__physicalVersion++;
  assert.equal(N.movementClear(P(-10, 4), P(10, 4)), false, 'geometry version replaces collection cache');
  obstacles.__physicalFootprints = [wall('new-list', 0, 0, 18, 0.3, 0)];
  assert.equal(N.movementClear(P(-10, 4), P(10, 4)), true, 'source replacement replaces collection cache');
});

test('bounded physical collections match fresh collection order under eviction pressure', () => {
  let clears = 0,
    maximum = 0;
  class BoundedMap extends Map {
    set(k, v) {
      super.set(k, v);
      maximum = Math.max(maximum, this.size);
      return this;
    }
    clear() {
      clears++;
      super.clear();
    }
  }
  class MissMap extends Map {
    get() {
      return undefined;
    }
  }
  const statics = [wall('south', -600, -600, 3, 2, 0), wall('north', 600, 600, 3, 2, 0)];
  for (let i = 0; i < 75; i++)
    statics.push(wall('ob-' + i, (i % 15) * 50 - 350, Math.floor(i / 15) * 70 - 200, 9, 0.8, i * 0.31));
  const fast = world({ statics, bindings: { Map: BoundedMap } }),
    fresh = world({ statics, bindings: { Map: MissMap } });
  for (let i = 0; i < 1600; i++) {
    const a = P(-500 + (i % 25) * 28, -400 + (Math.floor(i / 25) % 16) * 28),
      b = P(a.x + (Math.floor(i / 400) + 1) * 28, a.z + 12);
    assert.equal(fast.N.movementClear(a, b), fresh.N.movementClear(a, b), 'exact movement query');
    const fa = fast.r.BattleNavigationPhysicality.planLocal(fast.sim, a, b),
      fb = fresh.r.BattleNavigationPhysicality.planLocal(fresh.sim, a, b);
    assert.deepEqual(fa, fb, 'native detour points and encounter order');
  }
  assert.ok(clears > 0, 'retained-collection eviction is exercised');
  assert.ok(maximum <= 1024, 'retained lists remain bounded');
});

test('moving truck OBB follows the live vehicle, with no stale cached volume', () => {
  const { N, obstacles } = world(),
    v = { id: 'truck-1', position: { x: 0, z: 0 }, heading: { x: 0, z: 1 } };
  obstacles.__dynamicFootprints = [truckFootprint(v)];
  assert.equal(N.movementClear(P(-6, 0), P(6, 0)), false, 'crosses the broadside');
  assert.equal(N.movementClear(P(-6, 8), P(6, 8)), true, 'passes beyond the bonnet');
  v.position.z = 8;
  assert.equal(N.movementClear(P(-6, 0), P(6, 0)), true, 'truck has driven off');
  assert.equal(N.movementClear(P(-6, 8), P(6, 8)), false, 'truck now stands there');
  v.heading = { x: 1, z: 0 }; // turn it 90 degrees so the 6.2 m length lies along x
  assert.equal(N.movementClear(P(3, 5), P(3, 11)), false, 'new heading swung the hull across x = 3');
  assert.equal(N.movementClear(P(-3, 5), P(-3, 11)), false, 'and across x = -3');
  assert.equal(N.movementClear(P(5, 5), P(5, 11)), true, 'x = 5 lies beyond its 3.1 m half length');
  v.heading = { x: 0, z: 1 };
  assert.equal(N.movementClear(P(3, 5), P(3, 11)), true, 'turned back, x = 3 is open');
});

test('only the named carrier is ignored, and only for trucks', () => {
  const { N, obstacles } = world({ statics: [wall('w', 0, 20, 5, 0.25, 0)] }),
    a = { id: 'truck-a', position: { x: 0, z: 0 }, heading: { x: 0, z: 1 } },
    b = { id: 'truck-b', position: { x: 0, z: 10 }, heading: { x: 0, z: 1 } };
  obstacles.__dynamicFootprints = [truckFootprint(a), truckFootprint(b)];
  assert.equal(N.movementClear(P(-3, 0), P(3, 0)), false, 'seat step blocked by own truck by default');
  assert.equal(N.movementClear(P(-3, 0), P(3, 0), { ignoreDynamicId: 'truck-a' }), true, 'self ignored');
  assert.equal(
    N.movementClear(P(-3, 10), P(3, 10), { ignoreDynamicId: 'truck-a' }),
    false,
    'other truck not'
  );
  assert.equal(
    N.movementClear(P(0, 17), P(0, 23), { ignoreDynamicId: 'wall' }),
    false,
    'a wall id is never exempt'
  );
  assert.equal(
    N.movementClear(P(0, 17), P(0, 23), { ignoreDynamicId: 'truck-a' }),
    false,
    'nor static walls'
  );
});

test('line of sight uses the same truck shape, with its height and without the body margin', () => {
  const { F, N, obstacles } = world(),
    v = { id: 'truck-1', position: { x: 0, z: 0 }, heading: { x: 0, z: 1 } };
  obstacles.__dynamicFootprints = [truckFootprint(v)];
  assert.equal(
    F.sightBlocked(obstacles, { x: -6, y: 1.5, z: 0 }, { x: 6, y: 1.5, z: 0 }),
    true,
    'sight at 1.5 m'
  );
  assert.equal(
    F.sightBlocked(obstacles, { x: -6, y: 4, z: 0 }, { x: 6, y: 4, z: 0 }),
    false,
    'over the 2.8 m roof'
  );
  assert.equal(
    F.sightBlocked(
      obstacles,
      { x: -6, y: 1.5, z: 0 },
      { x: 6, y: 1.5, z: 0 },
      { ignoreDynamicId: 'truck-1' }
    ),
    false,
    'the carrier sees out of itself'
  );
  assert.equal(
    F.sightBlocked(
      obstacles,
      { x: -6, y: 1.5, z: 0 },
      { x: 6, y: 1.5, z: 0 },
      { ignoreDynamicId: 'truck-2' }
    ),
    true,
    'another truck id does not'
  );
  // 0.3 m beyond the hull edge (hx = 1.25 along x for a z-facing truck): a body cannot step there, a bullet passes.
  const edge = 1.25 + 0.3;
  assert.equal(N.movementClear(P(edge, -8), P(edge, 8)), false, 'move query keeps the body margin');
  assert.equal(
    F.sightBlocked(obstacles, { x: edge, y: 1.5, z: -8 }, { x: edge, y: 1.5, z: 8 }),
    false,
    'sight query has none'
  );
  const hit = F.sightBlocker(obstacles, { x: -6, y: 1.5, z: 0 }, { x: 6, y: 1.5, z: 0 });
  assert.equal(hit && hit.id, 'truck-1', 'sightBlocker names the dynamic truck');
});

test('a shot is stopped by the truck through the rebuilt ballistic obstacle list', () => {
  // A static footprint forces ballisticObstacles to rebuild (and re-attach) the dynamic set.
  const { r, obstacles, sim } = world({ statics: [wall('far', 80, 80, 1, 1, 0)] }),
    B = r.BattleBallistics,
    v = { id: 'truck-1', position: { x: 0, z: 0 }, heading: { x: 0, z: 1 } };
  obstacles.__dynamicFootprints = [truckFootprint(v)];
  assert.equal(B.ballisticObstacles(obstacles).__dynamicFootprints, obstacles.__dynamicFootprints);
  assert.equal(
    B.environmentLineBlocked({ x: -6, y: 1.5, z: 0 }, { x: 6, y: 1.5, z: 0 }, sim),
    true,
    'through the hull'
  );
  assert.equal(
    B.environmentLineBlocked({ x: -6, y: 4, z: 0 }, { x: 6, y: 4, z: 0 }, sim),
    false,
    'over the roof'
  );
  v.position.z = 20;
  assert.equal(
    B.environmentLineBlocked({ x: -6, y: 1.5, z: 0 }, { x: 6, y: 1.5, z: 0 }, sim),
    false,
    'truck moved on'
  );
  assert.equal(
    B.environmentLineBlocked({ x: -6, y: 1.5, z: 20 }, { x: 6, y: 1.5, z: 20 }, sim),
    true,
    'and blocks there'
  );
});

test('paths route around a truck and stay legal', () => {
  const { N, obstacles } = world(),
    v = { id: 'truck-1', position: { x: 0, z: 0 }, heading: { x: 0, z: 1 } };
  obstacles.__dynamicFootprints = [truckFootprint(v)];
  const path = N.findPath(P(-12, 0), P(12, 0));
  assert.ok(path.length >= 2, 'detour has bends: ' + JSON.stringify(path));
  let prev = P(-12, 0);
  for (const p of path) {
    assert.equal(N.movementClear(prev, p), true, 'leg to ' + p.x + ',' + p.z + ' is clear');
    prev = p;
  }
  assert.ok(Math.hypot(prev.x - 12, prev.z) < 0.5, 'ends at the goal');
});

test('the same query sequence replays identically', () => {
  function run() {
    const { N, F, obstacles } = world({
        statics: [wall('w', 3, 3, 4, 0.3, 0.6), wall('x', -6, 2, 2, 0.3, 2.1)]
      }),
      v = { id: 'truck-1', position: { x: 0, z: 0 }, heading: { x: 0, z: 1 } },
      out = [];
    obstacles.__dynamicFootprints = [truckFootprint(v)];
    for (let i = 0; i < 40; i++) {
      v.position.x = Math.sin(i * 0.7) * 6;
      v.position.z = i * 0.5 - 10;
      v.heading = { x: Math.sin(i * 0.3), z: Math.cos(i * 0.3) };
      const a = P(-10 + (i % 7), -9 + (i % 5)),
        b = P(10 - (i % 3), 9 - (i % 4));
      out.push(
        N.movementClear(a, b),
        F.sightBlocked(obstacles, { ...a, y: 1.5 }, { ...b, y: 1.5 }),
        JSON.stringify(N.findPath(a, b))
      );
    }
    return out;
  }
  assert.deepEqual(run(), run());
});

console.log('geometry contract: ' + n + ' passed');
