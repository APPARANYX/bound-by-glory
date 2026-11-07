#!/usr/bin/env node
'use strict';
/* A controlled squad keeps the Squad Leader's course of action and stress review (15e, 15j): under the
   controller the squad's fireAndMovement dispatch returns early, which used to skip both. Default on;
   ?controllerSquadReviews=0 restores the skip, ?controllerCoaGate=0 lets covered bounds ignore the COA. */
const assert = require('node:assert/strict'),
  H = require('./harness');
const { loadSquadPlan } = require('./squad-plan-fixture');
const log = console.log;
console.log = (...a) => (typeof a[0] === 'string' && a[0][0] === '[' ? undefined : log(...a));
let n = 0;
function test(name, fn) {
  fn();
  n++;
  console.log('PASS ' + name);
}
function world(search) {
  H.resetIds();
  const r = H.bootstrap({ modules: false });
  r.BattleModules = {
    registerSystem() {},
    registerUnitType() {},
    registerObjectiveType() {},
    runHook() {},
    unitsFor() {
      return [];
    }
  };
  r.BattleCommanderDoctrine = {
    policyFor() {
      return { cohesionRadius: 34, captainlessCohesion: 26 };
    }
  };
  r.BattleTelemetry = { record() {} };
  r.BattleSoldierMind = {
    squadStress: sq => (sq.mind && sq.mind.mean) || 0,
    leadStress: sq => (sq.mind && sq.mind.mean) || 0,
    teamStress: () => 0
  };
  /* The controller owns every squad: dispatch swallows the legacy bound selection. */
  r.BattleTacticalController = { controls: () => true, dispatch: () => true };
  loadSquadPlan(r, {
    withFireAndMovement: true,
    stabilityConsole: { log() {}, warn() {} },
    stabilityLocation: { search },
    submoduleLocation: { search }
  });
  const b = H.makeBattle(r, { seed: 12345 });
  r.BattleEngagement.updateSquad = function (sq) {
    sq.inContact = true;
    return { contactStarted: false, effective: 4, pinned: 0, fireSupport: sq.members.filter(s => !s.dead) };
  };
  return { r, b, S: r.BattleSquadStability };
}
function shaken(w) {
  const sq = H.addSquad(w.r, w.b, { id: 'us-0', faction: 'us', x: 0, z: 0, objective: { x: 0, z: 100 } });
  for (let i = 0; i < 5; i++) sq.members[9 - i].dead = true;
  sq.mind = { mean: 0.9, n: 10 };
  w.S.initialPhase(sq, 'assault');
  return sq;
}
function run(w, sq, seconds) {
  for (let t = 0; t < seconds; t += 0.15) {
    w.b.time += 0.15;
    w.S.fireAndMovement(sq, w.b);
  }
}
test('a controlled squad in contact keeps its course of action (defend when shaken)', () => {
  const w = world('?tacticalController=new'),
    sq = shaken(w);
  run(w, sq, 1);
  assert.equal(sq.coa, 'defend');
  assert.equal(w.S.coaHolds(sq), true);
});
test('?controllerSquadReviews=0 restores the skip: no course of action under the controller', () => {
  const w = world('?tacticalController=new&controllerSquadReviews=0'),
    sq = shaken(w);
  run(w, sq, 1);
  assert.equal(sq.coa, undefined);
  assert.equal(w.S.coaHolds(sq), false);
});
test('a calm squad scores assault and holds nothing', () => {
  const w = world('?tacticalController=new'),
    sq = H.addSquad(w.r, w.b, { id: 'us-1', faction: 'us', x: 0, z: 0, objective: { x: 0, z: 100 } });
  w.S.initialPhase(sq, 'assault');
  run(w, sq, 1);
  assert.equal(sq.coa, 'assault');
  assert.equal(w.S.coaHolds(sq), false);
});
test('sustained stress asks the General to review the brief', () => {
  const w = world('?tacticalController=new'),
    sq = H.addSquad(w.r, w.b, { id: 'us-2', faction: 'us', x: 0, z: 0, objective: { x: 0, z: 100 } }),
    T = w.S.tuning.lead;
  sq.mind = { mean: 0.9, n: 10 };
  w.S.initialPhase(sq, 'assault');
  sq._macroMission = { action: 'hold', version: 1 };
  run(w, sq, T.reviewAfter + 2);
  assert.ok(sq._slStressSince != null, 'the stress clock runs under the controller');
  assert.equal(sq._macroMissionRequest && sq._macroMissionRequest.why, 'squad stress');
});
console.log('controller squad reviews: ' + n + ' passed');
