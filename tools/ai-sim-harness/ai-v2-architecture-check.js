#!/usr/bin/env node
'use strict';
/* AI V2 stack smoke: provider registration and march-core wiring. */
const assert = require('node:assert/strict');
const H = require('./harness');
const { loadModule } = require('./module-loader');
const CONTRACT = require('../../battle/tactical-capability-contract');

let n = 0;
function test(name, fn) {
  fn();
  n++;
  console.log('PASS ' + name);
}

function boot(search) {
  const r = H.bootstrap({ search: search || '?tacticalController=new&aiV2=1' });
  r.BattleTacticalCapabilityContract = CONTRACT;
  r.BattleModules = r.BattleModules || {
    registerSystem() {},
    listSystems() {
      return [];
    }
  };
  loadModule(r, 'battle/ai-v2/kernel.js', { location: r.location });
  loadModule(r, 'battle/movement-resolver.js');
  loadModule(r, 'battle/modules/13a-tactical-controller.js');
  loadModule(r, 'battle/modules/13b-tactical-owner-adapters.js');
  r.BattleTacticalContactSkills = { update() {}, engagement() {} };
  r.BattleTacticalSoldierPolicy = {
    choose() {
      return null;
    }
  };
  loadModule(r, 'battle/modules/13c-tactical-march-provider.js', { location: r.location });
  loadModule(r, 'battle/ai-v2/meso.js', { location: r.location });
  loadModule(r, 'battle/modules/14a-ai-v2-provider.js', { location: r.location });
  return r;
}

test('provider controls squads under aiV2', () => {
  const r = boot();
  const TC = r.BattleTacticalController;
  const sim = { time: 3, factions: { us: { squads: [] }, ge: { squads: [] } } };
  const sq = {
    id: 'us-0',
    faction: 'us',
    members: [{ id: 1, dead: false, isPlayer: false }],
    _macroMission: { version: 2, intent: 'capture', point: { x: 0, z: 40 } },
    route: [{ x: 0, z: 40 }],
    routeIndex: 0,
    state: 'advance',
    commandPhase: 'approach'
  };
  sim.factions.us.squads.push(sq);
  var sw = TC.requestMode(sim, sq, 'new', 'ai-v2');
  assert.equal(sw.ok, true, sw.reason || '');
  assert.ok(TC.controls(sim, sq));
  assert.equal(TC.summary(sim).new, 1);
});

test('march provider does not register when aiV2=1', () => {
  const r = boot();
  assert.equal(r.BattleTacticalMarchProvider.id, 'ai-v2');
  assert.ok(r.BattleTacticalMarchCore);
});

console.log('\n' + n + ' tests passed');
