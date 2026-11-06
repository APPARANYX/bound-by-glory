#!/usr/bin/env node
/* ?controllerFastChecks: the controller's cheaper collision and contract checks must give the same answer
   as the full checks. Two copies of the navigation layer (building walls + module 39 footprints) and of the
   capability contract are loaded, one with `?tacticalController=new` and one with
   `?tacticalController=new&controllerFastChecks=0`, then asked the same questions on a random town:
   movementClear, findPath, nextWaypoint (rolling plans) and resolveStep, with and without a moving truck,
   and the contract's validateRequest / resourceConflicts on valid, stale and malformed requests.
   It also checks the fast path is in use: re-validating a normalized request returns the cached result. */
'use strict';
const assert = require('node:assert/strict'),
  fs = require('fs'),
  path = require('path');
const REPO = path.resolve(__dirname, '../..');
const quiet = { log() {}, warn() {}, error() {} };

function load(root, rel, search) {
  const c = fs.readFileSync(path.join(REPO, rel), 'utf8');
  new Function(
    'window',
    'globalThis',
    'console',
    'BABYLON',
    'location',
    'module',
    c + '\n//# sourceURL=' + rel
  )(root, root, quiet, root.BABYLON, { search }, undefined);
}
function rng(seed) {
  let s = seed >>> 0;
  return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
}
function town(seed) {
  const R = rng(seed),
    buildings = [],
    physical = [];
  for (let i = 0; i < 14; i++) {
    const w = 6 + R() * 10,
      d = 6 + R() * 8,
      openings = [];
    ['north', 'south', 'east', 'west'].forEach(side => {
      const len = side === 'north' || side === 'south' ? w : d;
      if (R() < 0.7)
        openings.push({
          side,
          type: R() < 0.5 ? 'door' : 'window',
          offset: (R() - 0.5) * (len - 2),
          width: 1.2
        });
    });
    buildings.push({
      id: 'b' + i,
      x: (R() - 0.5) * 220,
      z: (R() - 0.5) * 220,
      w,
      d,
      rot: R() * Math.PI,
      openings
    });
  }
  for (let i = 0; i < 160; i++) {
    const x = (R() - 0.5) * 260,
      z = (R() - 0.5) * 260;
    if (R() < 0.55) {
      const rot = R() * Math.PI;
      physical.push({
        id: 'p' + i,
        type: ['hedge', 'wall', 'log'][i % 3],
        shape: 'obb',
        x,
        z,
        hx: 1 + R() * 9,
        hz: 0.25 + R() * 0.6,
        ux: Math.cos(rot),
        uz: -Math.sin(rot),
        vx: Math.sin(rot),
        vz: Math.cos(rot)
      });
    } else
      physical.push({
        id: 'p' + i,
        type: i % 2 ? 'tree' : 'rock',
        shape: 'circle',
        x,
        z,
        radius: 0.3 + R() * 1.5
      });
  }
  return { buildings, physical };
}
function world(search, seed) {
  const r = { console: quiet };
  r.window = r;
  r.BABYLON = {
    Color3: function () {},
    MeshBuilder: {
      CreateLines: () => ({ dispose() {} }),
      CreateSphere: () => ({ position: { set() {} }, dispose() {} })
    },
    StandardMaterial: function () {}
  };
  r.BattleModules = {
    systems: {},
    registerSystem(id, s) {
      s.id = id;
      this.systems[id] = s;
    },
    getSystem(id) {
      return this.systems[id];
    },
    listSystems() {
      return Object.values(this.systems);
    }
  };
  load(r, 'battle/core-runtime.js', search);
  load(r, 'battle/battle-navigation.js', search);
  load(r, 'battle/modules/39-navigation-physicality-debug.js', search);
  load(r, 'battle/tactical-capability-contract.js', search);
  const t = town(seed),
    scenario = { buildings: t.buildings },
    obstacles = [];
  obstacles.__physicalFootprints = t.physical;
  obstacles.__physicalVersion = 4;
  obstacles.__dynamicFootprints = [];
  r.BattleNavigation.installScenario(scenario);
  const sim = {
    time: 0,
    heightAt: () => 0,
    obstacles,
    _roster: { us: [], ge: [] },
    scene: { metadata: { battleScenario: scenario } }
  };
  r.__battle__ = sim;
  r.BattleModules.getSystem('navigation-physicality-debug').onBattleStart(sim);
  return { r, N: r.BattleNavigation, C: r.BattleTacticalCapabilityContract, sim };
}
function round(v) {
  return JSON.stringify(v, (k, x) => (typeof x === 'number' ? +x.toFixed(9) : x));
}

const FAST = '?tacticalController=new',
  FULL = '?tacticalController=new&controllerFastChecks=0';
let compared = 0;
for (const seed of [1, 7, 42]) {
  const fast = world(FAST, seed),
    full = world(FULL, seed),
    R = rng(seed * 977 + 3);
  function both(fn) {
    const a = fn(fast),
      b = fn(full);
    assert.equal(round(a), round(b), 'fast and full checks disagree');
    compared++;
    return a;
  }
  function pt(spread) {
    return { x: (R() - 0.5) * spread, z: (R() - 0.5) * spread };
  }
  let blocked = 0;
  for (let i = 0; i < 4000; i++) {
    const a = pt(260),
      len = [0, 0.1, 0.6, 3, 12, 40, 250][i % 7],
      h = R() * Math.PI * 2,
      b = { x: a.x + Math.cos(h) * len, z: a.z + Math.sin(h) * len };
    if (!both(w => w.N.movementClear(a, b))) blocked++;
    if (i % 4 === 0) both(w => w.N.resolveStep(a, b));
  }
  assert(blocked > 200 && blocked < 3800, 'the random town must block some but not all moves: ' + blocked);
  /* A truck footprint that moves and turns between queries: the axes cache must follow it. */
  const truck = {
    id: 'truck-1',
    type: 'truck',
    shape: 'obb',
    x: 0,
    z: 0,
    hx: 3.2,
    hz: 1.2,
    ux: 1,
    uz: 0,
    vx: 0,
    vz: 1
  };
  fast.sim.obstacles.__dynamicFootprints = [truck];
  full.sim.obstacles.__dynamicFootprints = [Object.assign({}, truck)];
  for (let i = 0; i < 600; i++) {
    const rot = R() * Math.PI,
      x = (R() - 0.5) * 60,
      z = (R() - 0.5) * 60;
    [fast, full].forEach(w => {
      Object.assign(w.sim.obstacles.__dynamicFootprints[0], {
        x,
        z,
        ux: Math.cos(rot),
        uz: -Math.sin(rot),
        vx: Math.sin(rot),
        vz: Math.cos(rot)
      });
    });
    const a = { x: x + (R() - 0.5) * 20, z: z + (R() - 0.5) * 20 },
      b = { x: x + (R() - 0.5) * 20, z: z + (R() - 0.5) * 20 };
    both(w => w.N.movementClear(a, b));
    both(w => w.N.movementClear(a, b, { ignoreDynamicId: 'truck-1' }));
  }
  /* Rolling physical plans: the same waypoints for men walking the same routes. */
  for (let m = 0; m < 12; m++) {
    const start = pt(200),
      goal = pt(200),
      men = [fast, full].map(() => ({ id: 'm' + m, root: { position: { x: start.x, y: 0, z: start.z } } }));
    both(w => w.N.findPath(start, goal));
    for (let step = 0; step < 40; step++) {
      const wps = [fast, full].map((w, k) => {
        w.sim.time += 0.45;
        return w.N.nextWaypoint(w.sim, men[k], goal);
      });
      assert.equal(round(wps[0]), round(wps[1]), 'rolling waypoint differs');
      compared++;
      men.forEach((s, k) => {
        const p = s.root.position,
          wp = wps[k],
          dx = wp.x - p.x,
          dz = wp.z - p.z,
          d = Math.hypot(dx, dz) || 1,
          stepLen = Math.min(d, 2.5);
        p.x += (dx / d) * stepLen;
        p.z += (dz / d) * stepLen;
      });
    }
  }
}

/* Capability contract. */
const fast = world(FAST, 1).C,
  full = world(FULL, 1).C;
const base = {
  battleId: 'battle-1',
  generation: 0,
  faction: 'us',
  squadId: 'us-1',
  missionVersion: 3,
  rosterRevision: 2,
  controllerEpoch: 1,
  mode: 'new'
};
const context = Object.assign({}, base, {
  now: 10,
  actors: [
    { id: 's1', dead: false, player: false, transportLocked: false },
    { id: 's2', dead: true, player: false, transportLocked: false }
  ]
});
const requests = [
  Object.assign({}, base, {
    actionId: 'a-1',
    actorId: 's1',
    capability: 'movement.move',
    params: { point: { x: 1, z: 2 } }
  }),
  Object.assign({}, base, {
    actionId: 'a-2',
    actorId: 's1',
    capability: 'movement.hold',
    params: { point: { x: 1, z: 2 } }
  }),
  Object.assign({}, base, {
    actionId: 'a-3',
    actorId: null,
    capability: 'fire.control',
    params: { state: 'hold', targetId: null, shooterId: null }
  }),
  Object.assign({}, base, {
    actionId: 'a-4',
    actorId: 's2',
    capability: 'combat.contact',
    params: { drill: 'fire' }
  }),
  Object.assign({}, base, {
    actionId: 'a-5',
    actorId: 's1',
    capability: 'station.claim',
    params: { stationId: 'w1', threat: { x: 0, z: 9 } }
  }),
  Object.assign({}, base, {
    actionId: 'a-6',
    actorId: 's1',
    capability: 'station.claim',
    params: { stationId: 'w1', threat: { x: 3, z: 9 } }
  }),
  Object.assign({}, base, {
    actionId: 'a-7',
    actorId: 's1',
    capability: 'movement.move',
    params: { point: { x: NaN, z: 2 } }
  }),
  Object.assign({}, base, { actionId: 'a-8', actorId: 's1', capability: 'no.such', params: {} }),
  Object.assign({}, base, {
    actionId: 'a-1',
    actorId: 's1',
    capability: 'movement.move',
    params: { point: { x: 5, z: 2 } }
  }),
  Object.assign({}, base, {
    rosterRevision: 9,
    actionId: 'a-9',
    actorId: 's1',
    capability: 'movement.move',
    params: { point: { x: 1, z: 2 } }
  })
];
function normalized(C) {
  return requests.map(q => C.validateRequest(q, context));
}
const nf = normalized(fast),
  nl = normalized(full);
assert.equal(round(nf), round(nl), 'validateRequest differs');
const heldF = nf.filter(v => v.ok).map(v => v.request),
  heldL = nl.filter(v => v.ok).map(v => v.request);
const pool = (held, raw) => held.concat(raw);
const poolF = pool(heldF, requests),
  poolL = pool(heldL, requests);
for (let i = 0; i < poolF.length; i++)
  for (let j = 0; j < poolF.length; j++) {
    assert.equal(
      round(fast.resourceConflicts(poolF[i], poolF[j])),
      round(full.resourceConflicts(poolL[i], poolL[j]))
    );
    compared++;
  }
for (let i = 0; i < heldF.length; i++) {
  assert.equal(
    round(fast.validateRequest(heldF[i], context)),
    round(full.validateRequest(heldL[i], context))
  );
  /* The fast path is live: a normalized request revalidates to itself, the full path rebuilds a copy. */
  assert.equal(
    fast.validateRequest(heldF[i], context).request,
    heldF[i],
    'fast contract did not reuse the normalized request'
  );
  assert.notEqual(full.validateRequest(heldL[i], context).request, heldL[i]);
}
console.log('PASS: controller fast checks agree with the full checks (' + compared + ' comparisons)');
