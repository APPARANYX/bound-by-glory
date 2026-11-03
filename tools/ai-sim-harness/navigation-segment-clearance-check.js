'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const repo = path.resolve(__dirname, '../..');
const quiet = { log() {}, warn() {}, error() {} };
function load(root, file) {
  const source = fs.readFileSync(path.join(repo, file), 'utf8');
  new Function('window', 'globalThis', 'console', 'BABYLON', source)(root, root, quiet, root.BABYLON);
}
const root = { console: quiet };
root.window = root;
root.BABYLON = {
  Color3: function () {},
  MeshBuilder: {
    CreateLines: () => ({ dispose() {} }),
    CreateSphere: () => ({ position: { set() {} }, dispose() {} })
  },
  StandardMaterial: function () {}
};
root.BattleModules = {
  systems: {},
  registerSystem(id, service) {
    this.systems[id] = service;
  },
  getSystem(id) {
    return this.systems[id];
  },
  listSystems() {
    return Object.values(this.systems);
  }
};
load(root, 'battle/core-runtime.js');
load(root, 'battle/battle-navigation.js');
const N = root.BattleNavigation,
  originalClear = N.movementClear;
let checks = 0,
  revision = 0;
N.movementClear = function (a, b) {
  checks++;
  return originalClear(a, b);
};
root.BattleTacticalPositions = { revision: () => revision, station: () => null };
load(root, 'battle/modules/39-navigation-physicality-debug.js');
const scenario = { buildings: [] };
N.installScenario(scenario);
const sim = {
  time: 0,
  obstacles: [],
  _roster: { us: [], ge: [] },
  scene: { metadata: { battleScenario: scenario } }
};
root.BattleModules.getSystem('navigation-physicality-debug').onBattleStart(sim);
const soldier = { id: 'clear-proof', root: { position: { x: 0, y: 0, z: 0 } } },
  goal = { x: 0, z: 180 };
let first = N.nextWaypoint(sim, soldier, goal),
  retained = soldier._physicalPath;
assert.ok(retained && retained.points.length >= 4, 'initial physical queue is populated');
checks = 0;
N.nextWaypoint(sim, soldier, goal);
assert.ok(checks > 0, 'first segment is proven by live clearance before reuse');
checks = 0;
N.nextWaypoint(sim, soldier, goal);
assert.equal(checks, 0, 'same start and waypoint reuse proven clearance without another collision query');
soldier.root.position.z = first.z * 0.5;
checks = 0;
N.nextWaypoint(sim, soldier, goal);
assert.equal(checks, 0, 'collinear forward progress remains within proven clear segment');
soldier.root.position.x = 0.4;
checks = 0;
N.nextWaypoint(sim, soldier, goal);
assert.ok(checks > 0, 'lateral deviation revalidates live clearance');
soldier.root.position.x = 0;
revision++;
checks = 0;
N.nextWaypoint(sim, soldier, goal);
assert.ok(checks > 0, 'station-revision change invalidates the segment proof');
checks = 0;
N.nextWaypoint(sim, soldier, goal);
assert.equal(checks, 0, 'newly proven stationary segment may be reused');
sim.obstacles.__dynamicFootprints = [{ x: 500, z: 500, radius: 1, shape: 'circle' }];
checks = 0;
N.nextWaypoint(sim, soldier, goal);
assert.ok(checks > 0, 'moving geometry always forces live clearance');
delete sim.obstacles.__dynamicFootprints;
soldier.root.position.z = first.z;
checks = 0;
first = N.nextWaypoint(sim, soldier, goal);
assert.ok(first && checks > 0, 'the next real waypoint needs a new clearance proof');
assert.equal(soldier._physicalPath, retained, 'no static proof creates a new physical plan');
console.log('PASS segment proof reuses only collinear static clearance, revokes on deviation, station or dynamic change');
