'use strict';
/* One owner for the controlled squad's route leg (?controllerSingleWriter=0 restores the old private leg).
   Squad Leader execution (15l) owns sq.routeIndex and the published objective. The march provider (13c) only
   proposes the next leg through mission.execute; its target, and so every man's march order, is the leg the
   owner holds. Fails on code where the provider keeps its own leg counter: a squad taken mid-route walks
   back to leg 0, and a refused publication still moves the men to a leg the owner never recorded. */
const assert = require('node:assert/strict');
const H = require('./harness');
const { loadModule } = require('./module-loader');
const CONTRACT = require('../../battle/tactical-capability-contract');
let checks = 0;
let failures = 0;
function test(name, fn) {
  try {
    fn();
    checks++;
    console.log('PASS ' + name);
  } catch (error) {
    failures++;
    console.error('FAIL ' + name + ': ' + error.message);
  }
}
const ROUTE = [
  { x: 0, z: 60 },
  { x: 0, z: 140 },
  { x: 0, z: 220 }
];
function world(flags = '', take = true) {
  H.resetIds();
  const r = H.bootstrap({
    search:
      '?tacticalController=new&commandMovement=1&commandRelay=0&stressAct=0&scoutsForward=0&reconLedger=0' +
      flags
  });
  const systems = {};
  r.BattleModules.registerSystem = (id, hooks) => (systems[id] = hooks);
  r.BattleTacticalCapabilityContract = CONTRACT;
  for (const file of [
    'battle/movement-resolver.js',
    'battle/modules/13a-tactical-controller.js',
    'battle/modules/13b-tactical-owner-adapters.js',
    'battle/modules/13c-tactical-march-provider.js',
    'battle/modules/13d-tactical-contact-skills.js'
  ])
    loadModule(r, file, { location: r.location });
  r.BattleCommanderAI = {
    policyFor: () => ({
      routeArrivalRadius: 8,
      cohesionRadius: 34,
      captureCommitRatio: 0.82,
      supportDelay: 0
    })
  };
  r.BattleObjectiveSystem = { get: () => ({ def: { radius: 30 } }) };
  const b = H.makeBattle(r, { seed: +(process.env.HARNESS_SEED || 57) });
  b.time = 10;
  const q = H.addSquad(r, b, { id: 'us-0', faction: 'us', x: 0, z: 0, objective: { x: 0, z: 300 } });
  q.commandPhase = 'approach';
  q.state = 'advance';
  q.orderAnchor = { x: 0, z: 0 };
  q._macroMission = {
    version: 1,
    status: 'executing',
    intent: 'capture',
    objectiveId: 'objective-1',
    point: { x: 0, z: 300 },
    route: ROUTE.map(p => ({ ...p })),
    observations: { squad: { position: { x: 0, z: 0 } } }
  };
  const w = {
    r,
    b,
    q,
    Q: r.BattleSquadStability,
    TC: r.BattleTacticalController,
    MP: r.BattleTacticalMarchProvider,
    take: () => systems['tactical-march-provider'].onBattleStart(b)
  };
  if (take) w.take();
  return w;
}
function tick(w) {
  w.Q.executeMission(w.b, w.q, null);
  w.r.SquadAI.updateSquad(w.q, w.b);
  const stats = w.TC.summary(w.b).stats;
  assert.equal(stats ? stats.faults : 0, 0);
}
function placeAll(w, z) {
  w.q.members.forEach(s => {
    s.root.position.x = 0;
    s.root.position.z = z;
  });
}
function legs(w) {
  return w.q.route.map(p => ({ x: p.x, z: p.z }));
}

test('a squad the controller takes mid-route keeps the leg its Squad Leader holds', () => {
  const w = world('', false);
  /* Legacy execution marches the brief: the squad reaches legs 0 and 1 before the controller takes it. */
  tick(w);
  placeAll(w, 60);
  w.b.time += 0.45;
  tick(w);
  placeAll(w, 140);
  w.b.time += 0.45;
  tick(w);
  assert.equal(w.TC.controls(w.b, w.q), false, 'legacy still owns the squad');
  assert.equal(w.q.routeIndex, 2, 'legacy advanced the route');
  placeAll(w, 180);
  w.take();
  assert.equal(w.TC.controls(w.b, w.q), true);
  w.b.time += 0.45;
  tick(w);
  assert.equal(w.q.routeIndex, 2, 'the provider does not publish leg 0 again');
  assert.deepEqual(w.MP.target(w.q), legs(w)[2], 'the march goes on to the owner leg, not back to leg 0');
  assert.deepEqual(w.q.objective, legs(w)[2]);
});

test('a refused publication leaves the march on the leg the owner holds', () => {
  const w = world();
  tick(w);
  assert.equal(w.q.routeIndex, 0);
  const M = w.Q.controllerMission,
    publish = M.publish;
  let refused = 0;
  M.publish = () => (refused++, false);
  placeAll(w, 60);
  w.b.time += 0.45;
  tick(w);
  assert.ok(refused > 0, 'the provider asked the owner');
  assert.equal(w.q.routeIndex, 0, 'the owner kept leg 0');
  assert.equal(w.MP.leg(w.q).index, 0, 'the provider reports the owner leg');
  assert.deepEqual(w.MP.target(w.q), legs(w)[0], 'no man is sent to a leg the owner never recorded');
  M.publish = publish;
  w.b.time += 0.45;
  tick(w);
  assert.equal(w.q.routeIndex, 1, 'the next accepted proposal advances through the owner');
  assert.deepEqual(w.MP.target(w.q), legs(w)[1]);
});

test('a leg change made by the owner itself is the leg the march resumes on', () => {
  const w = world();
  tick(w);
  /* Stands for the owner's own route writes (transport-arrival adoption): the provider reads, never overwrites. */
  placeAll(w, 150);
  w.q.routeIndex = 2;
  w.b.time += 0.45;
  tick(w);
  assert.equal(w.q.routeIndex, 2);
  assert.deepEqual(w.MP.target(w.q), legs(w)[2]);
});

test('?controllerSingleWriter=0 restores the private leg counter', () => {
  const w = world('&controllerSingleWriter=0');
  tick(w);
  const M = w.Q.controllerMission,
    publish = M.publish;
  M.publish = () => false;
  placeAll(w, 60);
  w.b.time += 0.45;
  tick(w);
  M.publish = publish;
  assert.equal(w.q.routeIndex, 0);
  assert.deepEqual(w.MP.target(w.q), legs(w)[1], 'old behaviour: the provider marches ahead of the owner');
});

console.log(checks + ' controller single-writer checks passed');
process.exitCode = failures ? 1 : 0;
