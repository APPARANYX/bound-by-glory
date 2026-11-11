#!/usr/bin/env node
'use strict';
/* Mirrors production script order: kernel → meso → numbered modules (14a after 13c). */
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

test('battle page order activates ai-v2 provider', () => {
  const warnings = [];
  const r = H.bootstrap({ search: '?tacticalController=new&aiV2=1' });
  r.BattleTacticalCapabilityContract = CONTRACT;
  r.BattleModules = {
    registerSystem() {},
    listSystems() {
      return [];
    }
  };
  r.BattleTacticalContactSkills = { update() {}, engagement() {} };
  r.BattleTacticalSoldierPolicy = {
    choose() {
      return null;
    }
  };
  const consoleRef = {
    warn(msg) {
      if (typeof msg === 'string' && msg.indexOf('[AI-V2]') >= 0) warnings.push(msg);
    }
  };
  loadModule(r, 'battle/ai-v2/kernel.js', { location: r.location, console: consoleRef });
  loadModule(r, 'battle/ai-v2/meso.js', { location: r.location, console: consoleRef });
  assert.ok(r.BattleAIV2Meso && r.BattleAIV2Meso.on, 'meso must exist before 14a');
  loadModule(r, 'battle/movement-resolver.js');
  loadModule(r, 'battle/modules/13a-tactical-controller.js', { console: consoleRef });
  loadModule(r, 'battle/modules/13b-tactical-owner-adapters.js', { console: consoleRef });
  loadModule(r, 'battle/modules/13c-tactical-march-provider.js', {
    location: r.location,
    console: consoleRef
  });
  loadModule(r, 'battle/modules/14a-ai-v2-provider.js', { location: r.location, console: consoleRef });
  assert.equal(warnings.length, 0, warnings.join('; '));
  assert.ok(r.BattleTacticalMarchCore);
  const TC = r.BattleTacticalController;
  const sim = { time: 1, factions: { us: { squads: [] }, ge: { squads: [] } } };
  const sq = {
    id: 'us-0',
    faction: 'us',
    members: [{ id: 1, dead: false, isPlayer: false }],
    _macroMission: { version: 1, point: { x: 0, z: 40 } },
    route: [{ x: 0, z: 40 }]
  };
  sim.factions.us.squads.push(sq);
  r.BattleAIV2Meso.takeAll(sim);
  assert.ok(TC.controls(sim, sq));
  r.BattleSquadStability = {
    controllerSkills: {
      enabled(kind) {
        return kind === 'recon' || kind === 'regroup';
      }
    }
  };
  assert.equal(r.BattleTacticalMarchCore.skillOn('recon'), true);
  assert.equal(r.BattleTacticalMarchProvider.skillOn('regroup'), true);
});

console.log('\n' + n + ' tests passed');
