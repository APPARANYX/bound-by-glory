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
assert.ok(w.TC.controls(w.b, w.us));
assert.equal(
  w.r.BattleEchoSoldierPolicy.choose('fire.personal', {
    threat: true,
    settled: true,
    stationary: true,
    facing: true,
    authorized: true,
    reloading: false,
    shock: false
  }).value,
  true
);
H.run(w.r, w.b, 8);
assert.ok(w.b.time > 7);
assert.ok(w.TC.summary(w.b).new >= 2);
assert.ok(w.TC.dispatch(w.b, w.us, 'fireAndMovement'));

console.log('ai-scratch-check: ok');
