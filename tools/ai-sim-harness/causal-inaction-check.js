/* Pure observer contract: no LOS recompute, no RNG, no command settlement,
 * truthful verified/likely/unknown labels and bounded evidence. */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../../scripts/probes/causal-inaction.cjs'), 'utf8');

function fixture(search, outcomeState) {
  let originalFires = 0,
    mutations = 0,
    randoms = 0,
    reads = 0;
  const sq = { id: 'ge-2', state: 'advance', commandPhase: 'approach', _macroMission: { version: 1 } };
  const target = { id: 99, dead: false, root: { position: { x: 0, z: 30 } } };
  const soldier = {
    id: 76,
    faction: 'ge',
    role: 'gunner',
    squad: sq,
    root: { position: { x: 0, z: 0 } },
    destination: { x: 0, z: 50 },
    dead: false,
    target,
    moveSpeed: 0,
    eng: { state: 'engage' },
    _losBlockedFire: 0,
    _crestBlockedFire: 0,
    _terrainBlockedSuppressiveFire: 0,
    _movementStopReason: 'path-blocked',
    _movementResolver: { last: { owner: 'post', kind: 'firing-station', reason: 'prepared' } }
  };
  const ignored = { ...soldier, id: 77 };
  const state = {
    state: outcomeState,
    envelopeId: 'env-1',
    missionVersion: 1,
    current: true,
    by: outcomeState === 'held' ? 'post' : null,
    why: outcomeState === 'pending' ? 'undeliverable' : null,
    terminal: outcomeState === 'blocked',
    progressing: false
  };
  const root = {
    location: { search },
    BattleProbes: {},
    BattleModules: { unitsFor: () => [soldier, ignored] },
    BattleExecutionOutcome: {
      man: () => {
        reads++;
        return state;
      }
    },
    BattleDirectFireLOSGate: {
      blocked: () => {
        mutations++;
        throw Error('LOS recomputed');
      }
    },
    BattleCommandReception: {
      postureEnabled: () => true,
      adopted: () => {
        mutations++;
        throw Error('command settled');
      }
    }
  };
  const math = Object.create(Math);
  math.random = () => {
    randoms++;
    throw Error('RNG touched');
  };
  vm.runInNewContext(
    source,
    { window: root, URLSearchParams, Math: math, Map },
    { filename: 'causal-inaction.cjs' }
  );
  const probe = root.BattleProbes['causal-inaction'];
  assert.ok(probe, 'probe registered');
  const sim = {
    time: 0,
    onFire: () => {
      originalFires++;
    },
    _commandReception: { adoptedBySoldier: { 76: {} } }
  };
  probe.start(sim);
  return {
    soldier,
    target,
    state,
    sim,
    probe,
    root,
    stats: () => ({ originalFires, mutations, randoms, reads }),
    sample(t) {
      sim.time = t;
      probe.sample(sim);
    }
  };
}

// True firing rejection and an authoritative arbitration hold, not an inferred decision.
const a = fixture('?probeSide=ge&probeRole=gunner&probeIds=76&probeSquads=ge-2', 'held');
for (let t = 0; t <= 13; t++) {
  if (t === 4) {
    a.soldier._losBlockedFire = 2;
    a.sim.time = t;
    a.root.BattleCausalInaction.coverDecision(
      a.soldier,
      a.sim,
      'normal-cover',
      'no-viable-cover',
      { 'no-standing-los': 2, 'path-unreachable': 1 },
      null
    );
  }
  a.sample(t);
}
let report = a.probe.report(a.sim);
assert.equal(report.actorsObserved, 1, 'actor selectors applied');
assert.equal(report.counts['fire-silence'], 1);
assert.equal(report.counts['movement-inaction'], 1);
const fire = report.episodes.find(e => e.kind === 'fire-silence');
const move = report.episodes.find(e => e.kind === 'movement-inaction');
assert.equal(fire.code, 'observed-trigger-rejection');
assert.equal(fire.confidence, 'verified');
assert.equal(fire.scope, 'shot-attempt', 'does not claim entire silence proven');
assert.equal(fire.evidence.triggerRejectDeltas.los, 2);
assert.equal(
  fire.evidence.coverDecisions[0].code,
  'no-viable-cover',
  'direct planner denial is attached to the fire-silence evidence'
);
assert.equal(fire.evidence.coverDecisions[0].rejected['no-standing-los'], 2);
assert.equal(report.coverDecisionCounts['normal-cover:no-viable-cover'], 1);
assert.equal(report.coverRejectCounts['normal-cover:path-unreachable'], 1);
assert.equal(report.coverDecisionsOmitted, 0);
assert.equal(move.code, 'resolver-hold');
assert.equal(move.confidence, 'verified');
assert.equal(move.evidence.order.heldBy, 'post');
assert.equal(move.evidence.order.missionVersion, 1);
assert.ok(move.history.length <= 10, 'bounded history');
assert.ok(a.stats().reads > 0 && a.stats().mutations === 0 && a.stats().randoms === 0);
a.sim.onFire(a.soldier, 0);
for (let t = 14; t <= 18; t++) a.sample(t);
report = a.probe.report(a.sim);
assert.equal(a.stats().originalFires, 1, 'preserve old onFire chain');
assert.equal(report.roundsObserved, 1);
assert.equal(report.counts['fire-silence'], 1, 'shot resets silence clock');

// Selected firing-lane arrivals are measured from observed positions and shot callbacks,
// never by re-running LOS, planning a route, or changing Engagement orders.
a.sim.time = 19;
a.root.BattleCausalInaction.coverDecision(a.soldier, a.sim, 'firing-lane', 'selected', {}, { x: 12, z: 0 });
let lane = a.probe.report(a.sim).coverLaneOutcomes[0];
assert.equal(lane.status, 'selected');
assert.equal(lane.arrivedAt, null);
a.soldier.root.position.x = 12; // fixture applies ordinary post-step position, observer reads only
a.sample(20);
assert.equal(lane.status, 'physically-arrived');
assert.equal(lane.arrivedAt, 20);
a.sim.onFire(a.soldier, 0);
assert.equal(lane.firedAt, 20);
assert.equal(a.stats().mutations, 0, 'causal planner observer must never evaluate/mutate the game');

// Near-goal deaths are observable and cannot be mistaken for a pathfinding stall.
const nearDeath = fixture('?probeIds=76', 'executing');
nearDeath.sim.time = 2;
nearDeath.root.BattleCausalInaction.coverDecision(
  nearDeath.soldier,
  nearDeath.sim,
  'firing-lane',
  'selected',
  {},
  { x: 12, z: 0 }
);
nearDeath.soldier.root.position.x = 11.79;
nearDeath.soldier.dead = true; // only the fixture's soldier changes; the probe remains read-only
nearDeath.sample(3);
const killedNear = nearDeath.probe.report(nearDeath.sim).coverLaneOutcomes[0];
assert.equal(killedNear.arrivedAt, null, 'death is not reported as living arrival');
assert.equal(killedNear.status, 'killed-at-firing-position');
assert.equal(killedNear.observedDeadAt, 3);
assert.ok(killedNear.atDeathMeters <= 0.6);
assert.ok(killedNear.nearestMeters <= 0.6);
assert.equal(nearDeath.stats().mutations, 0);

const farDeath = fixture('?probeIds=76', 'executing');
farDeath.sim.time = 2;
farDeath.root.BattleCausalInaction.coverDecision(
  farDeath.soldier,
  farDeath.sim,
  'firing-lane',
  'selected',
  {},
  { x: 12, z: 0 }
);
farDeath.soldier.root.position.x = 5;
farDeath.soldier.dead = true;
farDeath.sample(3);
const killedFar = farDeath.probe.report(farDeath.sim).coverLaneOutcomes[0];
assert.equal(killedFar.status, 'killed-before-arrival');
assert.ok(killedFar.atDeathMeters > 0.6);
assert.equal(farDeath.stats().mutations, 0);

// A stationary executing soldier and a silent gun without call-site evidence are UNKNOWN.
const b = fixture('?probeSide=ge&probeIds=76', 'executing');
for (let t = 0; t <= 13; t++) b.sample(t);
const unknown = b.probe.report(b.sim);
assert.ok(unknown.episodes.some(e => e.code === 'unexplained-fire-silence' && e.confidence === 'unknown'));
assert.ok(unknown.episodes.some(e => e.code === 'unexplained-movement-stall' && e.confidence === 'unknown'));
assert.equal(b.stats().mutations, 0);

// An adopted HOLD is a state correlation, never a verified direct firing gate.
const c = fixture('?probeSide=ge&probeIds=76', 'pending');
c.sim._commandReception.adoptedBySoldier[76]['posture-fire|squad'] = { data: { state: 'hold' } };
for (let t = 0; t <= 13; t++) c.sample(t);
const correlated = c.probe.report(c.sim);
assert.ok(correlated.episodes.some(e => e.code === 'restrictive-fire-order' && e.confidence === 'likely'));
assert.ok(correlated.episodes.some(e => e.code === 'order-undeliverable' && e.confidence === 'verified'));

// Actual Engagement denial instrumentation is VERIFIED, unlike a HOLD snapshot.
const e = fixture('?probeSide=ge&probeIds=76', 'executing');
for (let t = 0; t <= 6; t++) {
  e.sim.time = t;
  if (t >= 1 && t <= 4) e.root.BattleCausalInaction.denied(e.soldier, e.sim, 'fire-not-authorized');
  e.sample(t);
}
const denied = e.probe.report(e.sim).episodes.find(x => x.kind === 'fire-silence');
assert.equal(denied.code, 'engagement-decision-denied');
assert.equal(denied.confidence, 'verified');
assert.equal(denied.scope, 'decision-gate');
assert.equal(denied.evidence.directFireDenials['fire-not-authorized'], 4);

// The production firing gate must emit directly at the actual denial branch.
const fireSource = fs.readFileSync(
  path.join(__dirname, '../../battle/modules/19b-engagement-fire-stance.js'),
  'utf8'
);
assert.ok(fireSource.includes("return reportFireDenial(s, battle, 'fire-not-authorized')"));
assert.ok(fireSource.includes("return reportFireDenial(s, battle, 'mg-not-setup')"));

// Bounded storage reports how many direct decisions could not be retained.
const f = fixture('?probeIds=76', 'executing');
for (let k = 0; k < 325; k++) {
  f.sim.time = k / 10;
  f.root.BattleCausalInaction.coverDecision(f.soldier, f.sim, 'normal-cover', 'no-viable-cover', {
    'no-standing-los': 1
  });
}
assert.equal(f.probe.report(f.sim).coverDecisions.length, 320);
assert.equal(f.probe.report(f.sim).coverDecisionsOmitted, 5);
assert.equal(f.probe.report(f.sim).coverRejectCounts['normal-cover:no-standing-los'], 325);

// The production cover gate must report the decision exactly where it was rejected.
const coverSource = fs.readFileSync(
  path.join(__dirname, '../../battle/modules/19-engagement-cover-positions.js'),
  'utf8'
);
assert.ok(coverSource.includes("rejected('no-standing-los')"));
assert.ok(coverSource.includes("observed(best ? 'selected' : 'no-viable-cover', best)"));

// No target is not a silent-fire incident.
const d = fixture('?probeSide=ge&probeIds=76', 'none');
d.soldier.target = null;
for (let t = 0; t <= 30; t++) d.sample(t);
assert.equal(d.probe.report(d.sim).episodes.length, 0);
console.log(
  'PASS causal inaction: verified vs inferred evidence, firing + movement, purity, bounds and filters'
);

// Retain transport episodes, but never interpret suspended infantry orders as walking failures.
for (const phase of ['boarding', 'embarked', 'disembarking']) {
  const w = fixture('?probeIds=76', 'executing');
  w.state.current = false;
  w.soldier.squad._transport = {
    phase,
    vehicleId: 'truck-1',
    missionVersion: 2,
    requestedAt: 0,
    boardedCount: 3,
    boardTimeoutSeconds: 45,
    travelled: 15,
    position: { x: 4, z: 8 }
  };
  w.soldier._movementStopReason = phase === 'boarding' ? 'transport-boarding' : 'embarked-passenger';
  for (let t = 0; t <= 13; t++) w.sample(t);
  const e = w.probe.report(w.sim).episodes.find(e => e.kind === 'movement-inaction');
  assert.equal(e.code, 'transport-owned-movement');
  assert.equal(e.scope, 'transport-ownership');
  assert.equal(e.evidence.order.current, false, 'stale order evidence is preserved');
  assert.equal(e.evidence.transport.boardedCount, 3);
  assert.equal(e.evidence.transport.travelledMeters, 15);
  assert.equal(e.evidence.transport.elapsedSeconds, 12);
  assert.equal(w.stats().mutations, 0);
  // A stale stop string after release cannot hide a real infantry failure.
  w.soldier.squad._transport.phase = 'dismounted';
  for (let t = 14; t <= 27; t++) w.sample(t);
  const infantry = w.probe
    .report(w.sim)
    .episodes.filter(e => e.kind === 'movement-inaction')
    .at(-1);
  assert.equal(infantry.code, 'stale-order-version');
  assert.equal(infantry.evidence.transport, null);
}
console.log('PASS transport ownership classification retains boarding evidence and dismount failures');

// Scheduled timing, canonical adoption and controller selection are distinct witnesses.
// Any settling/planning API is deliberately poisoned; sampling may only observe.
const witness = fixture('?probeIds=76', 'none');
const latest = {
  envelopeId: 'env-new',
  signature: 'move:new',
  sourceId: 'leader-1',
  relayId: 'relay-2',
  channel: 'mixed-relay',
  phase: 'received',
  issuedAt: 80,
  receivedAt: 81,
  processedAt: 82,
  adoptedAt: 83,
  data: { publishKey: 'new-key', missionVersion: 2 },
  point: { x: 4, z: 20 }
};
const old = {
  ...latest,
  envelopeId: 'env-old',
  phase: 'adopted',
  data: { publishKey: 'old-key', missionVersion: 1 }
};
witness.sim._commandReception.bySoldier = { 76: { 'movement|soldier:76': latest } };
witness.sim._commandReception.adoptedBySoldier[76]['movement|soldier:76'] = old;
let peeks = 0;
witness.root.BattleCommandReception.peek = () => {
  peeks++;
  return { ...latest, phase: 'adopted' };
};
witness.root.BattleCommandReception.adoptedView = () => {
  throw Error('settling read');
};
witness.root.BattleCommandReception.snapshot = () => {
  throw Error('settling snapshot');
};
const action = {
  squad: 'ge-2',
  actorId: '76',
  actionId: 'bound-9',
  capability: 'combat.bound',
  stage: 'accepted',
  reason: 'published:await-personal-adoption',
  since: 89.4
};
const selection = {
  squad: 'ge-2',
  actorId: '76',
  slot: 'fire.personal',
  stage: 'selected',
  value: false,
  reason: 'movement',
  at: 90
};
witness.root.BattleTacticalController = {
  summary: () => ({ live: [action], soldierDecisions: [selection] })
};
witness.soldier._fireteamAdoptedEnvelope = 'env-old';
witness.soldier._fireteamPublishKey = 'old-key';
witness.soldier.weapon = { ammo: 0, reserveAmmo: 16 };
witness.soldier.eng.fireReadyAt = 200;
witness.soldier.destination = { x: 0, z: 0 }; // at-feet hold must still retain the terminal witness
witness.root.BattleGrenades = {
  pendingOf: () => ({ decidedAt: 198, releaseAt: 201, source: 'contact-policy' }),
  count: () => 2,
  cooldownLeft: () => 0,
  assaultAssessment: () => {
    throw Error('grenade gate reevaluated');
  },
  assaultOpportunity: () => {
    throw Error('grenade planner reevaluated');
  }
};
const before = JSON.stringify(witness.sim._commandReception);
for (let t = 190; t <= 210; t++) witness.sample(t);
const tail = witness.probe.report(witness.sim).actorTails[0];
assert.equal(tail.actor, 'ge:76');
assert.equal(tail.history.length, 10);
assert.equal(tail.history.at(-1).t, 210);
const row = tail.history.at(-1);
assert.equal(row.commands.movement.latest.phase, 'received', 'stored phase retained');
assert.equal(row.commands.movement.projectedPhase, 'adopted', 'clock projection is separate');
assert.equal(row.commands.movement.adopted.envelopeId, 'env-old', 'scheduled time is not adoption');
assert.equal(row.commands.movement.adoptedIsLatest, false);
assert.equal(row.commands.movement.latest.publishKey, 'new-key');
assert.equal(row.commands.movement.appliedEnvelope, 'env-old');
assert.equal(row.commands.movement.appliedPublishKey, 'old-key');
assert.equal(row.commands.movement.latest.relayId, 'relay-2');
assert.equal(row.controller.actions[0].since, 89.4);
assert.equal(row.controller.selections[0].stage, 'selected', 'selection never becomes discharge');
assert.equal(row.fireContext.fireReadyAt, 200);
assert.equal(row.fireContext.ammo, 0);
assert.equal(row.grenade.pending.releaseAt, 201, 'pending is not a native release receipt');
assert.equal(JSON.stringify(witness.sim._commandReception), before, 'no command settlement or writes');
assert.ok(peeks > 0);
latest.data.publishKey = 'later';
latest.point.x = 99;
action.reason = 'later';
selection.reason = 'later';
assert.equal(row.commands.movement.latest.publishKey, 'new-key', 'receipt data detached');
assert.equal(row.commands.movement.latest.point.x, 4, 'receipt position detached');
assert.equal(row.controller.actions[0].reason, 'published:await-personal-adoption');
assert.equal(row.controller.selections[0].reason, 'movement');
assert.equal(witness.stats().mutations, 0);
assert.equal(witness.stats().randoms, 0);
console.log(
  'PASS causal witnesses: adoption vs projection, terminal hold, detached bounded evidence, no settlement/planning'
);

const bounded = fixture('?probeSide=ge', 'none');
bounded.root.BattleModules.unitsFor = () =>
  Array.from({ length: 171 }, (_, i) => ({
    ...bounded.soldier,
    id: 1000 + i
  }));
bounded.sample(0);
const boundedReport = bounded.probe.report(bounded.sim);
assert.equal(boundedReport.actorTails.length, 160);
assert.equal(boundedReport.actorTailsOmitted, 11);
console.log('PASS causal terminal witnesses retain explicit actor-cap omissions');

function fireOrder(f, state, shooterId) {
  f.sim._commandReception.adoptedBySoldier[76]['posture-fire|squad'] = {
    envelopeId: 'fire-' + state,
    adoptedAt: f.sim.time,
    data: { state, shooterId }
  };
}
const preparation = fixture('?probeIds=76', 'none');
for (let t = 0; t <= 5; t++) {
  fireOrder(preparation, t < 3 ? 'hold' : 'open');
  preparation.sample(t);
}
let episode = preparation.probe.report(preparation.sim).episodes[0];
assert.equal(episode.code, 'preparation-observed-during-silence');
assert.equal(episode.confidence, 'likely');
assert.equal(episode.evidence.fireOrder, 'open');
assert.equal(episode.evidence.intervalContext.preparationSamples, 3);
assert.equal(episode.evidence.intervalContext.orders.hold, 3);
assert.equal(episode.evidence.intervalContext.orders.open, 3);
assert.equal(preparation.stats().mutations, 0);
assert.equal(preparation.stats().randoms, 0);

const suppressed = fixture('?probeIds=76', 'none');
suppressed.soldier.eng.state = 'station';
suppressed.soldier.suppressedUntil = 3;
for (let t = 0; t <= 5; t++) suppressed.sample(t);
episode = suppressed.probe.report(suppressed.sim).episodes[0];
assert.equal(episode.code, 'suppression-observed-during-silence');
assert.equal(episode.evidence.intervalContext.suppressedSamples, 3);
assert.equal(episode.confidence, 'likely', 'suppression context is not a traced denial');

for (const state of ['clear', 'open', 'precision']) {
  const f = fixture('?probeIds=76', 'none');
  fireOrder(f, state, '76');
  for (let t = 0; t <= 5; t++) f.sample(t);
  assert.equal(
    f.probe.report(f.sim).episodes[0].code,
    'unexplained-fire-silence',
    'clear/open and the designated marksman cannot invent a preparation explanation'
  );
}
const reset = fixture('?probeIds=76', 'none');
fireOrder(reset, 'hold');
reset.sample(0);
reset.sample(1);
reset.sim.onFire(reset.soldier);
fireOrder(reset, 'open');
for (let t = 2; t <= 7; t++) reset.sample(t);
assert.equal(
  reset.probe.report(reset.sim).episodes[0].code,
  'unexplained-fire-silence',
  'a shot starts a fresh interval without carrying old preparation forward'
);
const superseded = fixture('?probeIds=76', 'none');
fireOrder(superseded, 'hold');
superseded.soldier.eng.retreatEndedAt = 1;
for (let t = 0; t <= 5; t++) superseded.sample(t);
assert.equal(
  superseded.probe.report(superseded.sim).episodes[0].evidence.intervalContext.preparationSamples,
  0
);
console.log(
  'PASS temporal fire context: HOLD-to-OPEN, expired suppression, honest unknowns, shot reset and stale orders'
);

const executed = fixture('?probeIds=76', 'none');
function decision(f, t, code) {
  f.sim.time = t;
  f.root.BattleCausalInaction.decision(f.soldier, f.sim, code, 'engagement', 'bound-1');
}
executed.sample(0);
decision(executed, 1, 'micro-update');
decision(executed, 1, 'preparation-held-fire');
decision(executed, 2, 'micro-update');
decision(executed, 2, 'firing-path-entered');
decision(executed, 2, 'weapon-attempt');
decision(executed, 3, 'micro-update'); // entered Micro, no traced terminal branch
executed.sample(5);
const traced = executed.probe.report(executed.sim).episodes[0];
assert.equal(traced.code, 'executed-nonfiring-decision');
assert.equal(traced.confidence, 'verified');
assert.equal(traced.scope, 'decision-branch', 'only actual branch execution is verified');
assert.equal(traced.evidence.decisions.coverage.updateTicks, 3);
assert.equal(traced.evidence.decisions.coverage.blockedUpdateTicks, 1);
assert.equal(traced.evidence.decisions.coverage.weaponAttemptTicks, 1);
assert.equal(traced.evidence.decisions.coverage.otherUpdateTicks, 1);
assert.equal(traced.evidence.roundsFired, 0, 'attempt is not a discharge');
assert.equal(traced.evidence.decisions.events[0].actionId, 'bound-1');
assert.equal(executed.stats().randoms, 0);
assert.equal(executed.stats().mutations, 0);

const oldTarget = fixture('?probeIds=76', 'none');
decision(oldTarget, 0, 'suppression-held-fire');
oldTarget.target.id = 100;
for (let t = 1; t <= 6; t++) oldTarget.sample(t);
assert.equal(
  oldTarget.probe.report(oldTarget.sim).episodes[0].code,
  'unexplained-fire-silence',
  'a decision for a different target never explains a new interval'
);
const eventCap = fixture('?probeIds=76', 'none');
for (let i = 0; i < 600; i++) decision(eventCap, i / 1000, i % 2 ? 'micro-update' : 'bound-await-adoption');
eventCap.sample(1);
eventCap.sample(6);
const capped = eventCap.probe.report(eventCap.sim);
assert.equal(capped.decisionEventsOmitted, 88);
assert.equal(
  capped.episodes[0].code,
  'unexplained-fire-silence',
  'old events before interval start excluded'
);
assert.equal(capped.episodes[0].evidence.decisions.omittedLifetime, 88);
console.log(
  'PASS executed decisions: partial tick coverage, attempts vs rounds, target isolation and explicit caps'
);

for (const code of [
  'controller-no-combat-task',
  'urgent-cover-bound',
  'withdraw-no-close-target',
  'advance-shock-hold',
  'advance-no-target',
  'weapon-cooldown',
  'weapon-lab-aimed-blocked',
  'weapon-lab-discharge-blocked',
  'weapon-target-not-threat',
  'weapon-burst-target-not-threat',
  'weapon-gate-ammunition',
  'weapon-gate-ballistics',
  'weapon-gate-ballistics-no-target',
  'weapon-gate-ballistics-target-dead',
  'weapon-gate-ballistics-cooldown',
  'weapon-gate-ballistics-no-weapon-stats',
  'weapon-gate-ballistics-out-of-range',
  'weapon-gate-direct-fire-los',
  'weapon-gate-grenades'
]) {
  const f = fixture('?probeSide=ge&probeIds=76', 'resolved');
  f.sample(0);
  decision(f, 1, 'micro-update');
  decision(f, 1, code);
  decision(f, 2, 'micro-update');
  f.sample(5);
  const e = f.probe.report(f.sim).episodes[0];
  assert.equal(e.code, 'executed-nonfiring-decision');
  assert.equal(e.scope, 'decision-branch');
  assert.equal(e.evidence.decisions.counts[code], 1);
  assert.equal(e.evidence.decisions.coverage.otherUpdateTicks, 1);
  assert.equal(e.evidence.roundsFired, 0);
}
console.log('PASS native return vocabulary retains partial coverage and zero-discharge distinction');
