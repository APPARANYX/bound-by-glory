#!/usr/bin/env node
'use strict';
/* Defend battles are decided at the time limit by who holds the majority of points
   (battle/commander-ai.js). The full Commander module runs over a fixture sim; objectives,
   roster and scene are controlled. ?defendMajorityWin=0 restores the hold-all early win and the
   objective-score time limit. Fails on the old rules: a defender seeded as owner of every point
   "held all objectives" at 35 s, before the attacker arrived. */
const assert = require('node:assert/strict');
const { loadModule, quietConsole } = require('./module-loader');

function fixture(search, sides) {
  const root = { GTLog() {}, SquadAI: {} };
  function Sim(scene) {
    this.scene = scene;
    this.time = 0;
    this.timeScale = 1;
    this.timeLimit = 600;
    this.factions = { us: { alive: 5, squads: [] }, ge: { alive: 5, squads: [] } };
  }
  Sim.prototype._checkWinner = function () {};
  root.BattleSim = { start: scene => new Sim(scene) };
  root.BattleCommanderRoutes = { initForce() {} };
  root.BattleCommanderDoctrine = {
    policyFor: () => ({ decisionSnapshotSeconds: 5 }),
    forceUnits: (sim, f) => new Array(sim.factions[f].alive).fill({}),
    objectiveValueScore: (sim, f) => sim.objectiveControl.counts[f] || 0,
    forceScore: (sim, f) => sim.factions[f].alive
  };
  /* Three points; owners set by the test. Hold time accrues like objective-system.js. */
  root.BattleObjectiveSystem = {
    definitionsFromTown: () => [],
    attach(sim) {
      sim._objectives = [];
      sim.owners = ['us', 'us', 'us'];
      sim.objectiveHold = { us: 0, ge: 0 };
    },
    reset() {},
    tick(sim, dt) {
      const counts = { us: 0, ge: 0 };
      sim.owners.forEach(o => o && counts[o]++);
      sim.objectiveControl = { counts, total: sim.owners.length, us: counts.us, ge: counts.ge };
      for (const f of ['us', 'ge']) sim.objectiveHold[f] = counts[f] === 3 ? sim.objectiveHold[f] + dt : 0;
    }
  };
  const bindings = { console: quietConsole, location: { search } };
  loadModule(root, 'battle/module-registry.js', bindings);
  loadModule(root, 'battle/commander-ai.js', bindings);
  const scene = {
    metadata: { battleScenario: { id: 't' } },
    onBeforeRenderObservable: { add() {} },
    getEngine: () => ({ getDeltaTime: () => 16 })
  };
  const sim = root.BattleSim.start(scene, { macroCommandEnabled: false });
  sim._sides = sides;
  sim.refresh = () => root.BattleObjectiveSystem.tick(sim, 0);
  return sim;
}
function run(sim, seconds) {
  for (let t = 0; t < seconds && !sim.winner; t += 0.45) {
    sim.time += 0.45;
    sim._liveCommanderTick(0.45);
  }
}
const defendUs = { meeting: false, defender: 'us', attacker: 'ge' };

// A defender owning every point from the start no longer wins at 35 s.
let sim = fixture('?tacticalController=new', defendUs);
run(sim, 120);
assert.equal(sim.winner, undefined, 'a defend battle must not end on the hold-all timer');

// At the time limit the side with the majority of points wins, attacker or defender.
sim.owners = ['ge', 'ge', 'us'];
sim.time = 600;
sim.refresh();
sim._checkWinner();
assert.equal(sim.winner, 'ge');
assert.equal(sim.winReason, 'time limit majority of points');

sim = fixture('', defendUs);
sim.owners = ['us', 'us', 'ge'];
sim.factions.us.alive = 1; // the defender wins on points even with fewer men left
sim.time = 600;
sim.refresh();
sim._checkWinner();
assert.equal(sim.winner, 'us');
assert.equal(sim.winReason, 'time limit majority of points');

// No majority (a point neutral, one each): the old objective-and-force score decides.
sim = fixture('', defendUs);
sim.owners = ['us', 'ge', null];
sim.factions.ge.alive = 9;
sim.time = 600;
sim.refresh();
sim._checkWinner();
assert.equal(sim.winner, 'ge');
assert.equal(sim.winReason, 'time limit objective score');

// Elimination still ends a defend battle.
sim = fixture('', defendUs);
sim.factions.ge.alive = 0;
sim._checkWinner();
assert.equal(sim.winner, 'us');

// Meeting battles keep the hold-all win.
sim = fixture('', { meeting: true, defender: null, attacker: null });
run(sim, 60);
assert.equal(sim.winner, 'us');
assert.equal(sim.winReason, 'held all objectives');

// ?defendMajorityWin=0 restores the old rules in a defend battle.
sim = fixture('?defendMajorityWin=0', defendUs);
run(sim, 60);
assert.equal(sim.winner, 'us');
assert.equal(sim.winReason, 'held all objectives');
assert.ok(sim.time < 40, 'old rule: the seeded defender wins at about 35 s');

console.log(
  'PASS defend battles: majority of points at the time limit, no 35 s hold-all win; meeting and ?defendMajorityWin=0 unchanged'
);
