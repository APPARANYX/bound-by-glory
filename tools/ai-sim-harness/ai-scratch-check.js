#!/usr/bin/env node
'use strict';
const assert = require('node:assert/strict');
const H = require('./harness');
const { loadModule } = require('./module-loader');
const CONTRACT = require('../../battle/tactical-capability-contract');

function world() {
  H.resetIds();
  const r = H.bootstrap({ search: '?aiScratch=1&stressAct=0&morale=0&perception=1' });
  r.BattleTacticalCapabilityContract = CONTRACT;
  loadModule(r, 'battle/movement-resolver.js');
  loadModule(r, 'battle/modules/13a-tactical-controller.js');
  loadModule(r, 'battle/modules/13b-tactical-owner-adapters.js');
  loadModule(r, 'battle/modules/46-ammunition-stoppages.js');
  const bind = { location: r.location };
  loadModule(r, 'battle/modules/91-echo-knowledge.js', bind);
  loadModule(r, 'battle/modules/92-echo-soldier-policy.js', bind);
  loadModule(r, 'battle/modules/93-echo-squad-coord.js', bind);
  loadModule(r, 'battle/modules/94-ai-scratch-provider.js', bind);
  const b = H.makeBattle(r, { seed: 77 });
  b.time = 5;
  const us = H.addSquad(r, b, {
    id: 'us-0',
    faction: 'us',
    x: 0,
    z: 0,
    objective: { x: 0, z: 90 },
    facing: 0
  });
  us.route = [
    { x: 0, z: 40 },
    { x: 0, z: 90 }
  ];
  us.routeIndex = 0;
  us.commandPhase = 'approach';
  us.orderAnchor = { x: 0, z: 0 };
  us._macroMission = { version: 1, status: 'executing', intent: 'capture', point: { x: 0, z: 90 } };
  H.addSquad(r, b, { id: 'ge-0', faction: 'ge', x: 0, z: 120, objective: { x: 0, z: 0 }, facing: Math.PI });
  r.BattleAIScratch.takeAll(b);
  return { r, b, us, TC: r.BattleTacticalController };
}

const w = world();
const K = w.r.BattleEchoKnowledge;
assert.ok(w.TC.controls(w.b, w.us));

const man = w.us.members[0];
const st = K.personalOf(man);
st.tracks['e1'] = { id: 'e1', x: 40, z: 50, peakAt: 0, peakConfidence: 0.9, source: 'sight' };
assert.doesNotThrow(() => K.confidenceOf(st.tracks['e1'], 5));
assert.ok(K.confidenceOf(st.tracks['e1'], 5) < K.confidenceOf(st.tracks['e1'], 0));

man.target = w.b.factions.ge.squads[0].members[0];
w.b.time = 6;
K.ingestSight(man, w.b);
const obs = K.syncSquadThreat(w.us, w.b);
assert.ok(obs);
const sqst = K.squadOf(w.us);
assert.ok(sqst.threatAxis);
assert.ok(Math.hypot(sqst.threatAxis.x - 0, sqst.threatAxis.z - 120) < 30);

w.us.inContact = true;
sqst.lastHostileAt = 6;
w.b.time = 20;
w.us.inContact = false;
w.r.BattleEchoSquadCoord.updateContactPhase(w.us, w.b);
assert.equal(sqst.phase, 'advance');

H.run(w.r, w.b, 6);
assert.ok(w.r.BattleAIScratch.summary(w.b).squads.length >= 1);

console.log('ai-scratch-check: ok');
