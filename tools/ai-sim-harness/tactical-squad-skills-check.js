'use strict';
/* S1b-f uses shipping skill logic and the real controller/adoption/resolver stack.
   Fixture premises (leases, prepared posts) are explicit; these are not natural battle results. */
const assert = require('node:assert/strict');
const H = require('./harness');
const { loadModule, quietConsole } = require('./module-loader');
const CONTRACT = require('../../battle/tactical-capability-contract');
let checks = 0;
function test(name, fn) {
  fn();
  checks++;
  console.log('PASS ' + name);
}
function world(extra = '', legacy = false) {
  H.resetIds();
  const r = H.bootstrap({
    search:
      '?stressAct=0&commandRelay=0&commandMovement=1&scoutsForward=0' +
      (legacy ? '&tacticalController=legacy' : '&tacticalController=new') +
      extra
  });
  const systems = {};
  r.BattleModules.registerSystem = (id, hooks) => (systems[id] = hooks);
  r.BattleTacticalCapabilityContract = CONTRACT;
  for (const f of [
    'battle/movement-resolver.js',
    'battle/modules/13a-tactical-controller.js',
    'battle/modules/13b-tactical-owner-adapters.js',
    'battle/modules/13c-tactical-march-provider.js',
    'battle/modules/13d-tactical-contact-skills.js'
  ])
    loadModule(r, f, { console: quietConsole, location: r.location });
  r.BattleCommanderAI = { policyFor: () => ({ routeArrivalRadius: 8, cohesionRadius: 34 }) };
  const b = H.makeBattle(r, { seed: +(process.env.HARNESS_SEED || 57) });
  b.time = 10;
  const q = H.addSquad(r, b, { id: 'us-0', faction: 'us', x: 0, z: 0, objective: { x: 0, z: 300 } });
  q._macroMission = { version: 1, status: 'executing', intent: 'capture', point: { x: 0, z: 300 } };
  q.state = 'advance';
  q.commandPhase = 'approach';
  q.home = { x: 0, z: -100 };
  q.orderAnchor = q.rally = { x: 0, z: 0 };
  q.route = [{ x: 0, z: 300 }];
  if (!legacy) systems['tactical-march-provider'].onBattleStart(b);
  return {
    r,
    b,
    q,
    Q: r.BattleSquadStability,
    TC: r.BattleTacticalController,
    MP: r.BattleTacticalMarchProvider,
    C: r.BattleCommandReception,
    L: r.BattleLeases
  };
}
function dispatch(w) {
  w.TC.dispatch(w.b, w.q, 'squadCommand');
  const summary = w.TC.summary(w.b);
  assert.equal(summary.stats.faults, 0);
  assert.equal(summary.pending, 0);
}
function live(w) {
  return (w.TC.summary(w.b).live || []).filter(a => a.capability === 'movement.move');
}
function record(w, s) {
  return w.C.peek(s, w.b, 'movement', 'soldier:' + s.id);
}
function defend(w) {
  w.q.commandPhase = 'defend';
  w.q.members.forEach((s, i) => (s._preparedDefensePost = { x: i * 2, z: 24 }));
}
function regroup(w) {
  w.q.commandPhase = 'regroup';
  return w.L.grant(w.q, 'regroup', 'squad-leader', w.b.time, Infinity, 'fixture dispersion', 'cohesion', {
    anchor: { x: 0, z: 0 },
    missionVersion: 1,
    resumePhase: 'assault',
    forward: { x: 0, z: 1 }
  });
}
function recon(w) {
  assert.equal(
    w.Q.startRecon(w.q, w.b, {
      signature: 's1-recon',
      reason: 'unknown-approach',
      from: { x: 0, z: 0 },
      goal: { x: 0, z: 300 },
      point: { x: 0, z: 60 },
      axis: { x: 0, z: 1 },
      goalDistance: 300
    }),
    true
  );
  return w.q._reconTask;
}

test('S1b: each prepared post has one controller action; repeated decisions keep its command envelope', () => {
  const w = world();
  defend(w);
  dispatch(w);
  assert.equal(live(w).length, w.q.members.length);
  const ids = live(w).map(a => a.actionId),
    envelopes = w.q.members.map(s => record(w, s).envelopeId);
  w.q.members.forEach(s => {
    assert.deepEqual(record(w, s).point, s._preparedDefensePost);
    assert.match(record(w, s).data.publishKey, /^controller:/);
  });
  w.b.time += 0.15;
  dispatch(w);
  assert.deepEqual(
    live(w).map(a => a.actionId),
    ids
  );
  assert.deepEqual(
    w.q.members.map(s => record(w, s).envelopeId),
    envelopes
  );
  assert.equal(w.MP.summary(w.b)[0].squadSkill.kind, 'defense');
});

test('S1c: regroup retains its personal rally targets while movement is still pending', () => {
  const w = world();
  w.q.members.forEach((s, i) => {
    s.root.position.x = 50 + i;
    s.root.position.z = 20;
  });
  regroup(w);
  dispatch(w);
  const lease = w.L.get(w.q, 'regroup'),
    targets = JSON.stringify(lease.data.targets);
  assert.equal(live(w).length, w.q.members.length);
  const ids = live(w).map(a => a.actionId);
  w.q.members.forEach(s => {
    s.root.position.x -= 3;
  });
  w.b.time += 0.15;
  dispatch(w);
  assert.equal(JSON.stringify(lease.data.targets), targets);
  assert.deepEqual(
    live(w).map(a => a.actionId),
    ids
  );
  assert.ok(w.q.members.every(s => record(w, s).action === 'regroup'));
});

test('S1d: scouts move and the main body holds at its receipt position without sliding later', () => {
  const w = world(),
    task = recon(w);
  dispatch(w);
  const selected = new Set(task.scoutIds.map(String)),
    body = w.q.members.find(s => !selected.has(String(s.id))),
    id = String(body.id),
    rec = record(w, body);
  assert.equal(rec.action, 'recon-hold');
  assert.equal(rec.reference, 'none');
  assert.ok(rec.adoptedAt > w.b.time);
  for (const scout of w.q.members.filter(s => selected.has(String(s.id))))
    assert.deepEqual(record(w, scout).point, task.destinations[String(scout.id)]);
  body.root.position.z += 6;
  const receipt = { x: body.root.position.x, z: body.root.position.z };
  w.b.time = rec.adoptedAt + 0.001;
  w.r.SquadAI.updateSquad(w.q, w.b);
  assert.deepEqual(task.holdPoints[id], receipt);
  assert.deepEqual(body._fireteamDestination, receipt);
  const key = body._fireteamPublishKey,
    envelope = record(w, body).envelopeId;
  body.root.position.z += 0.4;
  w.b.time += 0.15;
  w.r.SquadAI.updateSquad(w.q, w.b);
  assert.deepEqual(task.holdPoints[id], receipt);
  assert.deepEqual(body._fireteamDestination, receipt);
  assert.equal(body._fireteamPublishKey, key);
  assert.equal(record(w, body).envelopeId, envelope);
});

test('S1f: remnant extraction uses the owned survival exception and releases it at handoff', () => {
  const w = world();
  w.q.members.slice(4).forEach(s => (s.dead = true));
  w.q.state = w.q.commandPhase = 'retreat';
  dispatch(w);
  assert.equal(live(w).length, 4);
  const alive = w.q.members.filter(s => !s.dead);
  alive.forEach(s => {
    assert.match(s._survivalMovementKey, /^controller:/);
    assert.deepEqual(w.r.BattleMovementResolver.resolve(s, w.b).point, w.r.SquadAI.extractionHome(w.q));
  });
  assert.equal(w.TC.requestMode(w.b, w.q, 'legacy').ok, true);
  assert.equal(live(w).length, 0);
  alive.forEach(s => assert.equal(s._survivalMovementKey, null));
});

test('skill movement rejects an unplanned point or wrong skill instead of granting urgent authority', () => {
  const w = world();
  defend(w);
  dispatch(w);
  const s = w.q.members[0],
    M = w.Q.controllerMovement;
  assert.equal(M.publish(w.q, w.b, s, { x: 999, z: 999 }, 'forged', 'defense'), null);
  assert.equal(M.publish(w.q, w.b, s, s._preparedDefensePost, 'forged', 'retreat'), null);
  w.b.time += 1;
  assert.equal(M.publish(w.q, w.b, s, s._preparedDefensePost, 'stale-plan', 'defense'), null);
});

test('emergency interruption cannot resurrect a cancelled post on the same intent', () => {
  const w = world();
  defend(w);
  dispatch(w);
  const s = w.q.members[0];
  w.TC.interrupt(w.b, w.q, s.id, 'urgent-cover');
  for (let i = 0; i < 3; i++) {
    w.b.time += 0.15;
    dispatch(w);
  }
  assert.equal(
    live(w).some(a => a.actorId === String(s.id)),
    false
  );
  s._preparedDefensePost = { x: 1, z: 25 };
  w.b.time += 0.15;
  dispatch(w);
  assert.equal(
    live(w).some(a => a.actorId === String(s.id)),
    true,
    'a changed owner intent can be selected'
  );
});

test('a refused skill move stays refused until its survival owner releases the man', () => {
  const w = world();
  defend(w);
  const s = w.q.members[2];
  s._survivalMovementKey = 'fixture-survival-owner';
  w.r.SquadAI.updateSquad(w.q, w.b);
  assert.equal(
    live(w).some(a => a.actorId === String(s.id)),
    false
  );
  assert.equal(record(w, s), null, 'no retained fireteam publication after refusal');
  assert.equal(s._survivalMovementKey, 'fixture-survival-owner');
  s._survivalMovementKey = null;
  w.b.time += 0.15;
  dispatch(w);
  assert.equal(
    live(w).some(a => a.actorId === String(s.id)),
    true
  );
});

test('death, possession and mission supersession cancel the old tuple; restart leaves no actions', () => {
  const w = world();
  defend(w);
  dispatch(w);
  const ids = live(w).map(a => a.actionId);
  w.q.members[w.q.members.length - 1].dead = true;
  w.q.members[1].isPlayer = true;
  w.q._macroMission = { ...w.q._macroMission, version: 2 };
  w.b.time += 0.15;
  dispatch(w);
  assert.equal(live(w).length, w.q.members.length - 2);
  assert.ok(live(w).every(a => !ids.includes(a.actionId)));
  w.TC.beforeRestart(w.b);
  assert.equal(w.TC.summary(w.b).actions, 0);
  w.q.members.filter(s => !s.dead).forEach(s => assert.equal(w.Q.controllerMovement.current(s, null), false));
});

for (const [kind, flag, setup] of [
  ['defense', 'controllerDefensivePosts', defend],
  ['regroup', 'controllerRegroup', regroup],
  ['recon', 'controllerRecon', recon],
  [
    'retreat',
    'controllerRetreatSkill',
    w => {
      w.q.state = w.q.commandPhase = 'retreat';
    }
  ]
])
  test(`${flag}=0 restores only the ${kind} retained publisher`, () => {
    const w = world('&' + flag + '=0');
    setup(w);
    w.r.SquadAI.updateSquad(w.q, w.b);
    assert.equal(live(w).length, 0);
    const records = w.q.members.map(s => record(w, s)).filter(Boolean);
    assert.ok(records.length > 0);
    assert.ok(records.every(rec => !rec.data.publishKey.startsWith('controller:')));
    assert.equal(w.Q.controllerSkills.enabled(kind), false);
    const other = kind === 'defense' ? 'regroup' : 'defense';
    assert.equal(w.Q.controllerSkills.enabled(other), true);
  });

test('legacy controller publishes its original posts without creating skill actions', () => {
  const w = world('', true);
  defend(w);
  w.r.SquadAI.updateSquad(w.q, w.b);
  assert.equal(live(w).length, 0);
  assert.ok(w.q.members.every(s => !record(w, s).data.publishKey.startsWith('controller:')));
});
console.log(checks + ' tactical squad skill checks passed');
