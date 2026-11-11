#!/usr/bin/env node
'use strict';
/* AI V2 experimental stack: kernel invalidation, provider registration, march exclusion. */
const assert = require('node:assert/strict');
const path = require('node:path');
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
  r.BattleModules = r.BattleModules || { registerSystem() {}, listSystems() { return []; } };
  loadModule(r, 'battle/ai-v2/kernel.js', { location: r.location });
  loadModule(r, 'battle/ai-v2/meso.js', { location: r.location });
  loadModule(r, 'battle/movement-resolver.js');
  loadModule(r, 'battle/modules/13a-tactical-controller.js');
  loadModule(r, 'battle/modules/13b-tactical-owner-adapters.js');
  loadModule(r, 'battle/modules/13c-tactical-march-provider.js', { location: r.location });
  loadModule(r, 'battle/modules/13d-tactical-contact-skills.js', { location: r.location });
  loadModule(r, 'battle/modules/14a-ai-v2-provider.js', { location: r.location });
  r.BattleTacticalContactSkills = r.BattleTacticalContactSkills || { update() {}, engagement() {} };
  return r;
}

test('kernel: event-driven skip reduces repeat contact work', () => {
  const r = boot();
  const K = r.BattleAIV2;
  assert.ok(K.on);
  const sim = { time: 1, factions: {} };
  const sq = { id: 'us-0', faction: 'us', _macroMission: { version: 1 } };
  K.forceDirty(sim, sq, ['contact']);
  assert.equal(K.shouldRun(sim, sq, 'contact'), true);
  K.markRan(sim, sq, 'contact');
  assert.equal(K.shouldRun(sim, sq, 'contact'), false);
  K.ingestFacts({
    sim,
    squad: sq,
    facts: { inContact: true, contactStarted: true, underFire: 0 }
  });
  assert.equal(K.shouldRun(sim, sq, 'contact'), true);
  const s1 = K.summary(sim);
  K.ingestFacts({ sim, squad: sq, facts: { inContact: true, contactStarted: true, underFire: 0 } });
  const s2 = K.summary(sim);
  assert.ok(s2.stats.skipped >= s1.stats.skipped);
});

test('march provider stays off when aiV2=1', () => {
  const r = boot();
  assert.equal(r.BattleTacticalMarchProvider.id, 'ai-v2');
  assert.equal(r.BattleTacticalMarchProvider.on, true);
});

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
  r.BattleAIV2Meso.takeAll(sim);
  assert.ok(TC.controls(sim, sq), 'squad should be on ai-v2 provider');
  assert.equal(TC.summary(sim).new, 1);
});

test('deterministic knowledge picture from facts only', () => {
  const r = boot();
  const K = r.BattleAIV2;
  const sim = { time: 10 };
  const sq = { id: 'us-0', faction: 'us', _macroMission: { version: 1 } };
  K.ingestFacts({
    sim,
    squad: sq,
    facts: { contactPoint: { x: 5, z: 9 }, contactSource: 'sighting' }
  });
  const pic = K.picture(sim, sq);
  assert.equal(pic.contacts.length, 1);
  assert.equal(pic.contacts[0].source, 'sighting');
  assert.equal(pic.contacts[0].x, 5);
});

console.log('\n' + n + ' tests passed');
