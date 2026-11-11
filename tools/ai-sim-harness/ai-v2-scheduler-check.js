#!/usr/bin/env node
'use strict';
/* AI V2 scheduler: consumer independence, timed wakeups, provenance, offline performance proxy. */
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

test('mission and formation channels are independent', () => {
  const r = boot();
  const K = r.BattleAIV2;
  const sim = { time: 1, factions: {} };
  const sq = {
    id: 'us-0',
    faction: 'us',
    route: [
      { x: 0, z: 40 },
      { x: 0, z: 80 }
    ],
    routeIndex: 0
  };
  K.markRan(sim, sq, 'mission');
  assert.equal(K.shouldRun(sim, sq, 'mission'), false);
  assert.equal(K.shouldRun(sim, sq, 'formation'), true);
  K.ingestSquadContext({ sim, squad: sq, token: { rosterRevision: 1, missionVersion: 1 } });
  assert.equal(K.shouldRun(sim, sq, 'formation'), true);
});

test('timed contact reconciliation without new contact event', () => {
  const r = boot();
  const K = r.BattleAIV2;
  const sim = { time: 0, factions: {} };
  const sq = { id: 'us-0', faction: 'us', inContact: true };
  K.ingestEngagementFacts({
    sim,
    squad: sq,
    facts: { contactStarted: false, underFire: 1, effective: 1, pinned: 0 }
  });
  assert.equal(K.shouldRun(sim, sq, 'contact'), true);
  K.markRan(sim, sq, 'contact');
  assert.equal(K.shouldRun(sim, sq, 'contact'), false);
  sim.time = 0.3;
  assert.equal(K.shouldRun(sim, sq, 'contact'), true);
});

test('wakeup deadlines use earliest-wins (later ingest cannot postpone)', () => {
  const r = boot();
  const K = r.BattleAIV2;
  const sim = { time: 0, factions: {} };
  const sq = { id: 'us-0', faction: 'us', inContact: true };
  var facts = { underFire: 1, effective: 1, pinned: 0, contactStarted: false };
  K.ingestEngagementFacts({ sim, squad: sq, facts });
  var snap = K.squadSnapshot(sim, sq);
  assert.equal(snap.wakeAt.contact, 0.25);
  sim.time = 0.05;
  K.ingestEngagementFacts({ sim, squad: sq, facts });
  snap = K.squadSnapshot(sim, sq);
  assert.equal(snap.wakeAt.contact, 0.25);
  sim.time = 0.26;
  assert.equal(K.shouldRun(sim, sq, 'contact'), true);
});

test('urgent invalidation runs before scheduled wakeup', () => {
  const r = boot();
  const K = r.BattleAIV2;
  const sim = { time: 0, factions: {} };
  const sq = { id: 'us-0', faction: 'us', inContact: true };
  K.ingestEngagementFacts({
    sim,
    squad: sq,
    facts: { underFire: 1, effective: 0, pinned: 0, contactStarted: false }
  });
  K.markRan(sim, sq, 'contact');
  assert.equal(K.shouldRun(sim, sq, 'contact'), false);
  K.forceDirty(sim, sq, ['contact']);
  assert.equal(K.shouldRun(sim, sq, 'contact'), true);
});

test('contact loss invalidates consumer even when underFire key is unchanged', () => {
  const r = boot();
  const K = r.BattleAIV2;
  const sim = { time: 1, factions: {} };
  const sq = { id: 'us-0', faction: 'us', inContact: true };
  const facts = { underFire: 0, effective: 0, pinned: 0, contactStarted: false };
  K.ingestEngagementFacts({ sim, squad: sq, facts });
  K.markRan(sim, sq, 'contact');
  assert.equal(K.shouldRun(sim, sq, 'contact'), false);
  sq.inContact = false;
  K.ingestEngagementFacts({ sim, squad: sq, facts });
  assert.equal(K.shouldRun(sim, sq, 'contact'), true);
  assert.equal(K.shouldRun(sim, sq, 'maneuver'), true);
});

test('engagement facts drive invalidation without parallel contact store', () => {
  const r = boot();
  const K = r.BattleAIV2;
  const sim = { time: 2, factions: {} };
  const sq = { id: 'us-0', faction: 'us', inContact: false };
  K.ingestEngagementFacts({ sim, squad: sq, facts: { underFire: 0 } });
  K.ingestEngagementFacts({ sim, squad: sq, facts: { underFire: 2, effective: 1 } });
  const snap = K.squadSnapshot(sim, sq);
  assert.ok(snap.dirty.includes('contact'));
  assert.ok(snap.tactical.underFire === 2);
});

test('march core delegation preserves executeMission and squadCommand entry points', () => {
  const r = boot();
  assert.ok(r.BattleTacticalMarchCore);
  assert.equal(typeof r.BattleTacticalMarchCore.executeMission, 'function');
  assert.equal(typeof r.BattleAIV2Meso.fireAndMovement, 'function');
  assert.equal(r.BattleTacticalMarchProvider.id, 'ai-v2');
});

test('leg advance re-invalidates mission independently of formation', () => {
  const r = boot();
  const K = r.BattleAIV2;
  const sim = { time: 1, factions: {} };
  const sq = {
    id: 'us-0',
    faction: 'us',
    route: [
      { x: 0, z: 40 },
      { x: 0, z: 80 }
    ],
    routeIndex: 0
  };
  K.markRan(sim, sq, 'mission');
  assert.equal(K.shouldRun(sim, sq, 'mission'), false);
  sq.routeIndex = 1;
  K.ingestSquadContext({ sim, squad: sq, token: { missionVersion: 1, rosterRevision: 1 } });
  assert.equal(K.shouldRun(sim, sq, 'mission'), true);
  assert.equal(K.shouldRun(sim, sq, 'formation'), true);
});

test('offline performance proxy: scheduler reduces redundant contact runs', () => {
  const rOn = boot('?tacticalController=new&aiV2=1');
  const rOff = boot('?tacticalController=new&aiV2=1&aiV2Schedule=0');
  const sim = { time: 0, factions: {} };
  const sq = { id: 'us-0', faction: 'us', inContact: true };
  const facts = { underFire: 0, effective: 1, pinned: 0, contactStarted: false };
  function burst(r) {
    const K = r.BattleAIV2,
      M = r.BattleAIV2Meso;
    for (var i = 0; i < 12; i++) {
      sim.time = i * 0.05;
      M.fireAndMovement({ sim, squad: sq, facts: facts });
    }
    return K.compareHint(sim);
  }
  const off = burst(rOff);
  const on = burst(rOn);
  assert.ok((off.runs.contact || 0) >= 12);
  assert.ok((on.skips.contact || 0) > 0);
  assert.ok((on.runs.contact || 0) < (off.runs.contact || 0));
  assert.ok((on.runs.contact || 0) > 0);
});

console.log('\n' + n + ' tests passed');
