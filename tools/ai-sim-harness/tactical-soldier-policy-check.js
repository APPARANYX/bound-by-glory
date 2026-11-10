#!/usr/bin/env node
'use strict';
/* U0–U4 policy and native-owner checks. These are controlled fixtures, not natural-battle evidence. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const H = require('./harness');
const { loadModule, quietConsole } = require('./module-loader');
const contract = require('../../battle/tactical-capability-contract');
let count = 0;
function test(name, fn) {
  fn();
  count++;
  console.log('PASS ' + name);
}
function world(flags = '', controller = 'new') {
  H.resetIds();
  const r = H.bootstrap({
    search: '?tacticalController=' + controller + '&commandPosture=0&commandRelay=0&stressAct=all' + flags
  });
  const systems = {};
  r.BattleModules.registerSystem = (id, system) => (systems[id] = system);
  r.BattleModules.unitsFor = b => b._roster.us.concat(b._roster.ge);
  r.BattleTacticalCapabilityContract = contract;
  for (const path of [
    'battle/movement-resolver.js',
    'battle/modules/13a-tactical-controller.js',
    'battle/modules/13b-tactical-owner-adapters.js',
    'battle/modules/13c-tactical-march-provider.js',
    'battle/modules/13d-tactical-contact-skills.js',
    'battle/modules/46-ammunition-stoppages.js'
  ])
    loadModule(r, path, { location: r.location, console: quietConsole });
  const b = H.makeBattle(r, { seed: 91 });
  b.time = 10;
  const q = H.addSquad(r, b, {
    id: 'us-0',
    faction: 'us',
    x: 0,
    z: 0,
    objective: { x: 0, z: 300 },
    facing: 0
  });
  const ge = H.addSquad(r, b, {
    id: 'ge-0',
    faction: 'ge',
    x: 0,
    z: 60,
    objective: { x: 0, z: 0 },
    facing: Math.PI
  });
  q._macroMission = { version: 1, intent: 'capture', status: 'executing', owner: 'force-command' };
  q.route = [{ x: 0, z: 300 }];
  q.commandPhase = 'assault';
  systems['tactical-march-provider']?.onBattleStart(b);
  const s = q.members.find(s => s.role === 'rifleman'),
    target = ge.members.find(s => s.role === 'rifleman');
  target.root.position.x = s.root.position.x;
  s.target = target;
  s.moving = false;
  s.moveSpeed = 0;
  s.fireCooldown = 0;
  r.SquadAI.rememberSeen(s, target, b, true, 'micro-fixture');
  const choose = r.BattleTacticalSoldierPolicy.choose,
    calls = [];
  r.BattleTacticalSoldierPolicy.choose = (slot, facts) => {
    assert.ok(Object.isFrozen(facts));
    calls.push(slot);
    return choose(slot, facts);
  };
  return {
    r,
    b,
    q,
    ge,
    s,
    target,
    systems,
    calls,
    E: r.BattleEngagement,
    T: r.BattleTacticalController,
    P: r.BattleTacticalSoldierPolicy,
    choose
  };
}
function ready(w) {
  w.E.commitStance(w.s, w.b, 'crouch', 0.1);
  w.E.stateOf(w.s).fireReadyAt = 0;
  w.s.root.rotation.y = 0;
}
function rows(w) {
  return w.T.summary(w.b).soldierDecisions || [];
}

test('U0 rejects foreign/dead/player/passenger actors and unsupported slots before selecting', () => {
  const w = world();
  assert.equal(w.T.soldierPolicyAvailable(w.b, w.s), true);
  for (const mutate of [s => (s.dead = true), s => (s.isPlayer = true), s => (s.squad = w.ge)]) {
    const prev = { dead: w.s.dead, isPlayer: w.s.isPlayer, squad: w.s.squad };
    mutate(w.s);
    assert.throws(() => w.T.selectSoldier(w.b, w.s, 'posture.commit', {}), /no authority/);
    Object.assign(w.s, prev);
  }
  w.r.BattleSquadTransport = { isPassenger: () => true };
  assert.equal(w.P.enabled(w.s, w.b, 'posture.commit'), false);
  assert.throws(() => w.T.selectSoldier(w.b, w.s, 'posture.commit', {}), /no authority/);
  delete w.r.BattleSquadTransport;
  assert.throws(() => w.T.selectSoldier(w.b, w.s, 'unknown', {}), /unavailable/);
  assert.throws(() => w.T.selectSoldier(w.b, w.s, 'posture.commit', { target: w.target }), /bounded|Invalid/);
});

test('U0 rejects a stale synchronous choice and a policy cannot switch controllers during selection', () => {
  const w = world();
  let switchResult;
  w.P.choose = () => {
    switchResult = w.T.requestMode(w.b, w.q, 'legacy');
    return { value: 'prone', reason: 'reentrant-fixture' };
  };
  w.E.commitStance(w.s, w.b, 'stand', 1);
  assert.equal(switchResult.reason, 'accepting');
  assert.equal(w.T.controls(w.b, w.q), true);
  w.P.choose = () => {
    w.q._macroMission.version++;
    return { value: 'stand', reason: 'stale-fixture' };
  };
  assert.throws(() => w.E.commitStance(w.s, w.b, 'stand', 1), /Stale soldier decision/);
  assert.equal(w.s.prone, true, 'the old tuple cannot apply its selected stance');
});

test('U1 policy owns the committed stance while Engagement remains the stance writer', () => {
  const w = world();
  w.P.choose = (slot, f) =>
    slot === 'posture.commit' ? { value: 'prone', reason: 'policy-fixture' } : w.choose(slot, f);
  w.E.commitStance(w.s, w.b, 'stand', 1, 'owner-fixture');
  assert.equal(w.E.stateOf(w.s).stance, 'prone', 'native legacy choice cannot override the selected pose');
  assert.equal(w.s.prone, true);
  assert.equal(w.E.stateOf(w.s).stanceTrail.at(-1).to, 'prone');
  assert.ok(rows(w).some(r => r.capability === 'posture.set' && r.stage === 'selected'));
  assert.equal(w.T.summary(w.b).actions, 0, 'no competing weapon/posture lease');
  w.P.choose = () => ({ value: 'teleport', reason: 'invalid-fixture' });
  assert.throws(() => w.E.commitStance(w.s, w.b, 'stand', 1), /Invalid soldier decision/);
  assert.equal(w.s.prone, true, 'invalid choice fails closed before the effector');
});

test('U1 fighting and sight choices use physical owner queries, not enemy actors in the policy', () => {
  const w = world(),
    api = w.r._engagementFireStance(w.r._engagementFireStanceCtx());
  assert.equal(api.fightingStance(w.s, w.b, 100, 1), 'prone', 'open rifleman goes down');
  w.s.suppressedUntil = w.b.time + 1;
  assert.equal(api.fightingStance(w.s, w.b, 20, 1), 'prone');
  w.s.suppressedUntil = 0;
  assert.equal(api.seeingStance(w.s, w.b, 'prone'), 'prone', 'flat terrain offers a low line');
  assert.ok(w.calls.includes('posture.fight'));
  assert.ok(w.calls.includes('posture.see'));
});

test('U1 cover policy ranks only native eligible slots and reservations stay with the native owner', () => {
  const w = world();
  w.b.obstacles = [
    {
      x: w.s.root.position.x,
      z: w.s.root.position.z + 6,
      y: 0,
      radius: 1.3,
      height: 1,
      cover: 0.55,
      type: 'rock'
    }
  ];
  const normal = w.E.findCover(w.s, w.b, { evade: true });
  assert.ok(normal, 'physical wall supplies a reachable native cover slot');
  assert.ok(w.calls.includes('cover.score'));
  assert.ok(w.calls.includes('cover.take'));
  w.r.BattleCoverPositions.release(w.s, w.b, 'engagement');
  w.P.choose = (slot, f) =>
    slot === 'cover.take' ? { value: 'none', reason: 'policy-fixture' } : w.choose(slot, f);
  assert.equal(w.E.findCover(w.s, w.b, { evade: true }), null, 'owner obeys no-cover selection');
  assert.equal(w.r.BattleCoverPositions.current(w.s, w.b), null);
});

test('U2 personal fire preserves HOLD, recognition, movement and reload guards', () => {
  const w = world();
  ready(w);
  assert.equal(w.E.fireAllowed(w.s, w.b), true);
  w.q.fireControl = { state: 'hold' };
  assert.equal(w.E.fireAllowed(w.s, w.b), false);
  assert.equal(rows(w).find(r => r.slot === 'fire.personal').reason, 'fire-not-authorized');
  w.q.fireControl = null;
  w.s.moving = true;
  w.s.moveSpeed = 10;
  assert.equal(w.E.fireAllowed(w.s, w.b), false);
  w.s.moving = false;
  w.s.reloading = true;
  assert.equal(w.E.fireAllowed(w.s, w.b), false);
  w.s.reloading = false;
  w.E.stateOf(w.s).fireReadyAt = w.b.time + 2;
  assert.equal(w.E.fireAllowed(w.s, w.b), false);
});

test('U2 allowed fire reaches the real ammunition/ballistics owner, with native discharge evidence', () => {
  const w = world();
  const decisions = [];
  w.r.BattleCausalInaction = { decision: (s, b, code) => decisions.push(code) };
  w.r.BattleAmmunition.initialize(w.s, w.b);
  ready(w);
  for (let i = 0; i < 40 && !w.r.BattleAmmunition.shotEvidence(w.s, w.b); i++) {
    w.b.time += 0.15;
    w.r.SquadAI.tickFireCooldown(w.s, 0.15);
    w.T.dispatch(w.b, w.q, 'engagement', w.s);
    w.E.updateSoldier(w.s, w.b);
  }
  const shot = w.r.BattleAmmunition.shotEvidence(w.s, w.b);
  assert.ok(shot && shot.shots > 0, 'selection alone cannot satisfy this check');
  assert.ok(decisions.includes('firing-path-entered'));
  assert.ok(decisions.includes('weapon-attempt'));
  assert.ok(w.s.weapon.ammo < w.s.weapon.stats.magazineSize || w.s.weapon.ammo < 8);
});

test('U2 reload policy runs at the ammunition owner and a fled man cannot reload', () => {
  const w = world(),
    A = w.r.BattleAmmunition;
  A.initialize(w.s, w.b);
  w.s.weapon.ammo = 0;
  w.s.weapon.reserveAmmo = 20;
  assert.equal(A.startReload(w.s, w.b), true);
  assert.equal(w.s.reloading, true);
  assert.ok(rows(w).some(r => r.slot === 'weapon.reload' && r.value === true));
  const end = w.s.reloadUntil;
  w.b.time = end + 0.15;
  w.systems['ammunition-stoppages'].onSimulationStep(w.b, { dt: 0.15 });
  assert.equal(w.s.reloading, false);
  assert.ok(w.s.weapon.ammo > 0);
  w.s.weapon.ammo = 0;
  w.E.stateOf(w.s).fledPhase = 'run';
  assert.equal(A.startReload(w.s, w.b), false);
  assert.equal(w.s.reloading, false);
});

function broken(w, reaction) {
  const m = w.r.BattleSoldierMind.of(w.s);
  m.stress = m.pub = 0.95;
  m.band = 3;
  m.at = w.b.time;
  m.bandSince = w.b.time;
  m.temper = {
    flee: reaction === 'flee' ? 1 : 0,
    freeze: reaction === 'freeze' ? 1 : 0,
    rage: reaction === 'rage' ? 1 : 0
  };
  m.lastIncomingAt = w.b.time;
  w.target.root.position.z = w.s.root.position.z + 20;
  w.s.suppressedUntil = w.b.time + 2;
}
test('U3 a selected flee releases the rifle/reload and uses the native refuge movement', () => {
  const w = world();
  broken(w, 'flee');
  w.s.reloading = true;
  w.s.reloadUntil = w.b.time + 20;
  w.E.updateSoldier(w.s, w.b);
  assert.equal(w.s.eng.state, 'flee');
  assert.equal(w.s.weapon, null);
  assert.equal(w.s.reloading, false);
  assert.equal(w.E.fledPhase(w.s), 'run');
  assert.equal(rows(w).find(r => r.slot === 'stress.react').value, 'flee');
  assert.equal(w.s._movementResolver.combat.kind, 'flee');
});

test('U3 cower takes actor resources immediately, and rage respects the personally adopted fire permission', () => {
  const w = world();
  ready(w);
  w.T.dispatch(w.b, w.q, 'engagement', w.s);
  assert.ok(w.T.summary(w.b).live.some(a => a.actorId === String(w.s.id)));
  const m = w.r.BattleSoldierMind.of(w.s);
  m.stress = m.pub = 0.7;
  m.band = 2;
  m.at = w.b.time;
  m.lastIncomingAt = w.b.time;
  w.s.suppressedUntil = w.b.time + 2;
  w.E.updateSoldier(w.s, w.b);
  assert.equal(w.s.eng.state, 'cower');
  assert.ok(
    !w.T.summary(w.b).live?.some(a => a.actorId === String(w.s.id)),
    'old controller fire/move action released'
  );
  assert.equal(w.s._movementResolver.combat.kind, 'hold');
  const rage = world();
  broken(rage, 'rage');
  rage.q.fireControl = { state: 'hold' };
  // The mind remembers incoming fire to select the reaction; there is no current return-fire override.
  rage.s.suppressedUntil = 0;
  rage.r.BattleSoldierMind.recentIncoming = () => false;
  rage.E.updateSoldier(rage.s, rage.b);
  assert.equal(rage.s.eng.state, 'rage');
  assert.equal(rows(rage).find(r => r.slot === 'fire.personal').value, false);
  assert.equal(rows(rage).find(r => r.slot === 'fire.personal').reason, 'fire-not-authorized');
});

test('U3 freeze is bounded across persistent broken stress and cannot reenter the same break', () => {
  const w = world();
  broken(w, 'freeze');
  w.E.updateSoldier(w.s, w.b);
  assert.equal(w.s.eng.state, 'freeze');
  const expiry = w.s.eng.freezeUntil;
  assert.ok(expiry > w.b.time);
  w.b.time = expiry + 0.15;
  const m = w.r.BattleSoldierMind.of(w.s);
  m.at = w.b.time;
  m.lastIncomingAt = w.b.time;
  w.E.updateSoldier(w.s, w.b);
  assert.notEqual(w.s.eng.state, 'freeze');
  assert.ok(w.s.eng.freezeExitReason.startsWith('duration-expired-broken:'));
  w.b.time += 0.15;
  m.at = w.b.time;
  w.E.updateSoldier(w.s, w.b);
  assert.notEqual(w.s.eng.state, 'freeze', 'spent spell cannot renew indefinitely');
});

test('U4 the contact slot chooses fire/march from native line observations without suppressor/retreat loss', () => {
  const w = world();
  ready(w);
  w.T.dispatch(w.b, w.q, 'engagement', w.s);
  assert.ok(w.calls.includes('drill.contact'));
  const selected = rows(w).find(r => r.slot === 'drill.contact');
  assert.equal(selected.value, 'fire');
  w.s.suppressedUntil = w.b.time + 3;
  w.T.dispatch(w.b, w.q, 'engagement', w.s);
  assert.equal(rows(w).find(r => r.slot === 'drill.contact').value, 'pinned');
  assert.equal(w.T.summary(w.b).stats.faults, 0);
});

test('all four off flags restore the pre-U controller path and legacy never selects Micro', () => {
  for (const [flags, controller] of [
    ['&controllerStance=0&controllerSoldierFire=0&controllerReactions=0&controllerDrill=0', 'new'],
    ['', 'legacy']
  ]) {
    const w = world(flags, controller);
    ready(w);
    w.E.fireAllowed(w.s, w.b);
    w.T.dispatch(w.b, w.q, 'engagement', w.s);
    w.E.updateSoldier(w.s, w.b);
    assert.deepEqual(w.calls, []);
    assert.deepEqual(rows(w), []);
  }
  for (const [flag, prefix] of [
    ['controllerStance', 'posture.'],
    ['controllerSoldierFire', 'fire.'],
    ['controllerReactions', 'stress.'],
    ['controllerDrill', 'drill.']
  ]) {
    const w = world('&' + flag + '=0');
    ready(w);
    broken(w, 'freeze');
    w.E.fireAllowed(w.s, w.b);
    w.T.dispatch(w.b, w.q, 'engagement', w.s);
    w.E.updateSoldier(w.s, w.b);
    assert.ok(
      !w.calls.some(slot => slot.startsWith(prefix)),
      flag + ' leaves that decision with its pre-U owner'
    );
  }
});

test('selection receipts are immutable snapshots, hidden after rebrief/switch/restart, and never physical-success claims', () => {
  const w = world();
  ready(w);
  const before = rows(w);
  assert.ok(before.length);
  before[0].value = 'corrupt';
  assert.ok(!rows(w).some(r => r.value === 'corrupt'));
  w.q._macroMission.version++;
  assert.deepEqual(rows(w), []);
  ready(w);
  assert.ok(rows(w).length);
  w.T.requestMode(w.b, w.q, 'legacy');
  assert.deepEqual(rows(w), []);
  w.T.beforeRestart(w.b);
  assert.deepEqual(rows(w), []);
  assert.ok(before.every(r => r.stage === 'selected'));
});

test('pure choices are deterministic and cannot read actors, draw RNG, or write effectors', () => {
  const w = world(),
    facts = Object.freeze({ weights: Object.freeze([1, 1, 1]) });
  const old = Math.random;
  Math.random = () => {
    throw new Error('RNG forbidden');
  };
  try {
    assert.deepEqual(w.choose('stress.break', facts), { value: 'flee', reason: 'temper-and-situation' });
  } finally {
    Math.random = old;
  }
  const src = fs.readFileSync(H.REPO + '/battle/modules/13k-tactical-soldier-policy.js', 'utf8');
  const body = src.slice(src.indexOf('function choose('), src.indexOf('root.BattleTacticalSoldierPolicy ='));
  assert.doesNotMatch(
    body,
    /root\.|Math\.random|setTimeout|setInterval|\.target|\.members|\.position|\.weapon/
  );
});
console.log(count + ' soldier policy checks passed');

test('native preparation and pinned branches report decisions without observer authority', () => {
  const w = world();
  const events = [];
  w.r.BattleCausalInaction = { decision: (s, b, code) => events.push(code) };
  w.q.fireControl = { state: 'hold' };
  // The existing preparation effector is called directly, as by the native controller drill.
  const prep = w.E.controllerCombat.start(w.s, w.b, 'prepare');
  assert.ok(prep);
  w.E.updateSoldier(w.s, w.b);
  assert.ok(events.includes('preparation-held-fire'));
  w.E.controllerCombat.end(w.s, w.b, prep);
  w.q.fireControl = { state: 'open' };
  w.s.suppressedUntil = w.b.time + 3;
  const request = w.E.controllerCombat.start(w.s, w.b, 'pinned');
  assert.ok(request);
  w.E.updateSoldier(w.s, w.b);
  assert.ok(events.includes('micro-update'));
  assert.ok(events.includes('suppression-held-fire'));
  w.r.BattleCausalInaction.decision = () => {
    throw Error('observer failure');
  };
  assert.doesNotThrow(() => w.E.updateSoldier(w.s, w.b));
});

test('HOLD without a native combat task is not reported as executed preparation', () => {
  const w = world(),
    events = [];
  w.r.BattleCausalInaction = { decision: (s, b, code) => events.push(code) };
  w.q.fireControl = { state: 'hold' };
  // Isolate the actual no-task return, without letting the provider create a task.
  w.r.BattleTacticalContactSkills.engagement = () => {};
  w.E.updateSoldier(w.s, w.b);
  assert.ok(events.includes('controller-no-combat-task'));
  assert.ok(!events.includes('preparation-held-fire'));
  assert.ok(!events.includes('weapon-attempt'));
});

test('a retained urgent cover bound is traced instead of a missing controller combat task', () => {
  const run = mode => {
    const w = world(),
      events = [],
      e = w.E.stateOf(w.s);
    // Isolate the retained-bound return, without letting the provider create a task.
    w.r.BattleTacticalContactSkills.engagement = () => {};
    // The state module 44 leaves behind when a suppressed man commits to cover.
    e.cover = { x: w.s.root.position.x + 12, z: w.s.root.position.z - 6, distance: 13.4 };
    w.E.requestState(w.s, w.b, 'urgent-cover', 8);
    e.urgentBound = true;
    assert.equal(e.state, 'bound');
    if (mode !== 'absent')
      w.r.BattleCausalInaction = {
        decision: (s, b, code, owner) => {
          if (mode === 'throw') throw Error('observer failure');
          if (code === 'urgent-cover-bound') assert.equal(owner, 'engagement');
          events.push(code);
        }
      };
    let shots = 0;
    w.b.onFire = () => shots++;
    w.E.updateSoldier(w.s, w.b);
    return {
      events,
      outcome: {
        shots,
        state: e.state,
        urgentBound: e.urgentBound,
        cover: e.cover && { x: e.cover.x, z: e.cover.z },
        cooldown: w.s.fireCooldown,
        target: w.s.target && w.s.target.id,
        moving: !!w.s.moving
      }
    };
  };
  const absent = run('absent'),
    recorded = run('record'),
    thrown = run('throw');
  assert.ok(recorded.events.includes('micro-update'));
  assert.ok(recorded.events.includes('urgent-cover-bound'));
  assert.ok(!recorded.events.includes('controller-no-combat-task'));
  assert.equal(recorded.outcome.state, 'bound', 'the bound is still executing');
  assert.equal(recorded.outcome.shots, 0);
  assert.deepEqual(recorded.outcome, absent.outcome);
  assert.deepEqual(thrown.outcome, absent.outcome);
});

test('withdrawal traces only the branch that does not attempt close-target fire', () => {
  const w = world(),
    events = [];
  w.r.BattleCausalInaction = { decision: (s, b, code) => events.push(code) };
  w.q.state = 'retreat';
  w.E.updateSoldier(w.s, w.b);
  assert.ok(events.includes('withdraw-no-close-target'));
  assert.ok(!events.includes('firing-path-entered'));
  events.length = 0;
  w.target.root.position.z = w.s.root.position.z + 20;
  w.E.updateSoldier(w.s, w.b);
  assert.ok(events.includes('firing-path-entered'));
  assert.ok(!events.includes('withdraw-no-close-target'));
});

test('weapon returns preserve gate order, call counts and outcomes with absent/recording/throwing observers', () => {
  const cases = [
    [
      'weapon-missing',
      w => {
        w.s.weapon = null;
      }
    ],
    [
      'weapon-cooldown',
      w => {
        w.s.fireCooldown = 2;
      }
    ],
    [
      'weapon-lab-aimed-blocked',
      w => {
        w.r.PhaseCCombatLab = { blockShot: (s, b, stage) => stage === 'aimed' };
      }
    ],
    [
      'weapon-lab-discharge-blocked',
      w => {
        w.r.PhaseCCombatLab = { blockShot: (s, b, stage) => stage === 'discharge' };
      }
    ],
    [
      'weapon-target-not-threat',
      w => {
        w.target.dead = true;
      }
    ],
    ...['ammunition', 'ballistics', 'direct-fire-los', 'grenades'].map(id => [
      'weapon-gate-' + id,
      w => {
        w.s.fireCooldown = 2; // gates precede cooldown; never report the unexecuted branch
        w.r.SquadAI.extend('fireGate', id, () => {
          w.gates.push(id);
          return false;
        });
      }
    ])
  ];
  for (const [expected, setup] of cases) {
    const outcomes = [];
    for (const mode of ['absent', 'record', 'throw']) {
      const w = world(),
        events = [];
      w.gates = [];
      w.r.BattleAmmunition.initialize(w.s, w.b);
      for (const id of ['ammunition', 'ballistics', 'direct-fire-los', 'grenades'])
        w.r.SquadAI.extend('fireGate', id, () => {
          w.gates.push(id);
          return true;
        });
      let shots = 0;
      w.b.onFire = () => shots++;
      setup(w);
      if (mode !== 'absent')
        w.r.BattleCausalInaction = {
          decision: (s, b, code, owner) => {
            if (mode === 'throw') throw Error('observer failure');
            assert.equal(owner, 'squad-ai');
            events.push(code);
          }
        };
      const returned = w.r.SquadAI.tryFire(w.s, w.b);
      outcomes.push({
        returned,
        shots,
        gates: w.gates,
        cooldown: w.s.fireCooldown,
        ammo: w.s.weapon && w.s.weapon.ammo,
        target: w.s.target && w.s.target.id
      });
      assert.equal(shots, 0);
      if (mode === 'record') assert.deepEqual(events, [expected]);
    }
    assert.deepEqual(outcomes[1], outcomes[0], expected);
    assert.deepEqual(outcomes[2], outcomes[0], expected);
  }
});

test('the ballistics gate names the test that refused without changing its answer', () => {
  const cases = [
    [
      'no-target',
      w => {
        w.s.target = null;
      }
    ],
    [
      'target-dead',
      w => {
        w.target.dead = true;
      }
    ],
    [
      'cooldown',
      w => {
        w.s.fireCooldown = 2;
      }
    ],
    [
      'no-weapon-stats',
      w => {
        w.s.weapon.stats = null;
      }
    ],
    [
      'out-of-range',
      w => {
        w.target.root.position.z = w.s.root.position.z + w.s.weapon.stats.range + 25;
      }
    ],
    [null, () => {}]
  ];
  for (const [why, setup] of cases) {
    const outcomes = [];
    for (const mode of ['absent', 'record', 'throw']) {
      const w = world(),
        events = [];
      w.r.BattleAmmunition.initialize(w.s, w.b);
      // The real ballistics owner supplies the gate; its neighbours are isolated.
      loadModule(w.r, 'battle/modules/14-z-ballistic-raycast.js', {
        location: w.r.location,
        console: quietConsole
      });
      for (const id of ['ammunition', 'direct-fire-los', 'grenades'])
        w.r.SquadAI.extend('fireGate', id, () => true);
      let shots = 0,
        draws = 0;
      const random = w.b.random;
      w.b.random = () => {
        draws++;
        return random.call(w.b);
      };
      w.b.onFire = () => shots++;
      setup(w);
      if (mode !== 'absent')
        w.r.BattleCausalInaction = {
          decision: (s, b, code, owner) => {
            if (mode === 'throw') throw Error('observer failure');
            events.push(owner + ':' + code);
          }
        };
      const returned = w.r.SquadAI.tryFire(w.s, w.b);
      outcomes.push({
        returned,
        shots,
        draws,
        cooldown: w.s.fireCooldown,
        ammo: w.s.weapon && w.s.weapon.ammo,
        target: w.s.target && w.s.target.id
      });
      if (why) {
        assert.equal(returned, false, why);
        assert.equal(shots, 0, why);
        assert.equal(draws, 0, why);
        // The owner's sub-cause first, then the unchanged generic gate tag.
        if (mode === 'record')
          assert.deepEqual(events, [
            'ballistics:weapon-gate-ballistics-' + why,
            'squad-ai:weapon-gate-ballistics'
          ]);
      } else {
        assert.equal(returned, true, 'a live target inside range passes the gate');
        assert.ok(shots > 0);
        assert.ok(!events.some(code => /weapon-gate-ballistics/.test(code)));
      }
    }
    assert.deepEqual(outcomes[1], outcomes[0], String(why));
    assert.deepEqual(outcomes[2], outcomes[0], String(why));
  }
});
