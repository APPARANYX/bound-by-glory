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
  const ge = H.addSquad(r, b, {
    id: 'ge-0',
    faction: 'ge',
    x: 0,
    z: 120,
    objective: { x: 0, z: 0 },
    facing: Math.PI
  });
  r.BattleAIScratch.takeAll(b);
  return { r, b, us, ge, TC: r.BattleTacticalController };
}

const w = world();
const K = w.r.BattleEchoKnowledge;
const SA = w.r.SquadAI;
assert.ok(w.TC.controls(w.b, w.us));

const observer = w.us.members[0];
const enemy = w.ge.members[0];
assert.ok(SA.rememberSeen(observer, enemy, w.b, true, 'harness-sight'));
const before = K.observedThreat(w.us, w.b);
assert.ok(before);
const savedX = before.x;
enemy.root.position.x = 999;
enemy.root.position.z = 999;
observer.target = enemy;
const twin = K.observedThreat(w.us, w.b);
assert.ok(twin);
assert.ok(Math.abs(twin.x - savedX) < 2, 'threat must not chase live transform');

const listener = w.us.members[1];
const tracksBefore = Object.keys(K.personalOf(listener).tracks).length;
const farReporter = w.us.members[2];
farReporter.root.position.z = 500;
const heard = K.deliverTold(w.b, listener, farReporter, { id: 'ghost', x: 1, z: 1 }, w.b.time);
assert.equal(heard, false);
assert.equal(Object.keys(K.personalOf(listener).tracks).length, tracksBefore);

w.us.inContact = true;
const sqst = K.squadOf(w.us);
sqst.lastHostileAt = 6;
w.b.time = 20;
w.us.inContact = false;
w.r.BattleEchoSquadCoord.updateContactPhase(w.us, w.b);
assert.equal(sqst.phase, 'advance');

w.b.time = 7;
w.TC.dispatch(w.b, w.us, 'fireAndMovement');
assert.ok(w.r.BattleAIScratch.summary(w.b).squads[0].scheduler.sightIngests >= 1);

console.log('ai-scratch-check: ok');
