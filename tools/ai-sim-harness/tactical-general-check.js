#!/usr/bin/env node
'use strict';
/* The General under the tactical controller (roadmap section 8, slices M0, M1 and M2): the command scope in
   the capability contract, the per-side command unit in the controller (13a), and reconstitution and the
   fled pickup decided by the command policy (13j) through `command.reconstitute` / `command.pickup`
   (adapters in 13b, owner 22). The scenario checks are reconstitution-check.js and fled-man-check.js run
   again with GENERAL_CONTROLLER=1, which also asserts that every group and pickup went through an action. */
const assert = require('node:assert/strict'),
  fs = require('node:fs'),
  path = require('node:path'),
  { execFileSync } = require('node:child_process'),
  H = require('./harness'),
  C = require('../../battle/tactical-capability-contract.js');
let n = 0;
function test(name, fn) {
  fn();
  n++;
  console.log('PASS ' + name);
}
function load(r, p, search) {
  new Function('window', 'globalThis', 'console', 'location', fs.readFileSync(path.join(H.REPO, p), 'utf8'))(
    r,
    r,
    { log() {}, warn() {} },
    search == null ? undefined : { search }
  );
}
const token = {
  battleId: 'battle-1',
  generation: 0,
  faction: 'us',
  squadId: '@us',
  missionVersion: 0,
  rosterRevision: 0,
  controllerEpoch: 1,
  mode: 'new'
};
const context = Object.assign({ now: 1, actors: [] }, token);
function req(capability, params, over) {
  return Object.assign(
    {},
    token,
    { actionId: 'generalTick-1', actorId: null, capability, params },
    over || {}
  );
}

test('the contract names the command capabilities with the Macro owner', () => {
  ['command.reconstitute', 'command.pickup', 'command.recover'].forEach(cap => {
    assert.equal(C.capabilities[cap].scope, 'command');
    assert.equal(C.capabilities[cap].owner, 'Macro');
  });
});
test('a command request is valid only on the side command unit, with no actor', () => {
  assert.equal(
    C.validateRequest(req('command.reconstitute', { squadIds: ['us-0', 'us-1'] }), context).ok,
    true
  );
  assert.equal(
    C.validateRequest(req('command.pickup', { fledSquadId: 'us-0-fled-3', intoSquadId: 'us-1' }), context).ok,
    true
  );
  const squadCtx = Object.assign({}, context, { squadId: 'us-0' });
  assert.equal(
    C.validateRequest(req('command.reconstitute', { squadIds: ['us-0'] }, { squadId: 'us-0' }), squadCtx)
      .reason,
    'wrong-squad',
    'a squad cannot issue a command request'
  );
  assert.equal(
    C.validateRequest(req('command.reconstitute', { squadIds: ['us-0'] }, { faction: 'ge' }), context).reason,
    'wrong-squad',
    "the US unit is not the German General's"
  );
  assert.equal(
    C.validateRequest(req('command.reconstitute', { squadIds: ['us-0'] }, { actorId: '7' }), context).reason,
    'invalid-actor'
  );
  assert.equal(
    C.validateRequest(req('mission.execute', { leg: 0, phase: 'approach', point: { x: 0, z: 0 } }), context)
      .reason,
    'wrong-squad',
    'a squad capability is never issued on the command unit'
  );
});
test('command parameters are checked', () => {
  [{ squadIds: [] }, { squadIds: ['a', 'a'] }, { squadIds: 'us-0' }, { squadIds: [3] }].forEach(p =>
    assert.equal(C.validateRequest(req('command.reconstitute', p), context).reason, 'invalid-parameters')
  );
  assert.equal(C.validateRequest(req('command.recover', { episode: '0' }), context).ok, true);
  [{}, { episode: '' }, { episode: 0 }].forEach(p =>
    assert.equal(C.validateRequest(req('command.recover', p), context).reason, 'invalid-parameters')
  );
  [{ fledSquadId: 'a', intoSquadId: 'a' }, { fledSquadId: 'a' }].forEach(p =>
    assert.equal(C.validateRequest(req('command.pickup', p), context).reason, 'invalid-parameters')
  );
  const ok = C.validateRequest(req('command.reconstitute', { squadIds: ['us-0', 'us-1'] }), context);
  assert.deepEqual(ok.request.params.squadIds, ['us-0', 'us-1'], 'the id list survives normalization');
});
test('a legacy battle gains no controller state: commandUnit only reads unless the taker creates it', () => {
  const r = {};
  load(r, 'battle/modules/13a-tactical-controller.js');
  const TC = r.BattleTacticalController,
    sim = { time: 0, factions: { us: { squads: [] }, ge: { squads: [] } } };
  assert.equal(TC.commandUnit(sim, 'us'), null);
  assert.equal(TC.summary(sim).battleId, undefined, 'no battle record was made');
  assert.equal(
    TC.dispatch(sim, { faction: 'us', id: '@us', members: [], commandUnit: true }, 'generalTick'),
    false
  );
  const u = TC.commandUnit(sim, 'us', true);
  assert.equal(u.id, '@us');
  assert.equal(TC.commandUnit(sim, 'us'), u, 'one unit per side');
  assert.equal(TC.controls(sim, u), false, 'and it starts legacy');
});
test('each Macro slice has its own off flag; with both off 13c never takes the command unit', () => {
  function owned(search) {
    const r = {};
    load(r, 'battle/modules/13j-tactical-general.js', '?tacticalController=new' + search);
    const facts = { squads: [], town: null, owned: {}, recoveryWoke: false };
    r.BattleTacticalGeneral.update({ sim: {}, squad: { faction: 'us', id: '@us' }, facts });
    return { on: r.BattleTacticalGeneral.on, owned: facts.owned };
  }
  assert.deepEqual(owned(''), { on: true, owned: { reconstitution: true, recovery: true } });
  assert.deepEqual(owned('&controllerReconstitution=0'), { on: true, owned: { recovery: true } });
  assert.deepEqual(owned('&controllerRecovery=0'), { on: true, owned: { reconstitution: true } });
  assert.deepEqual(owned('&controllerReconstitution=0&controllerRecovery=0'), { on: false, owned: {} });
  const src = fs.readFileSync(path.join(H.REPO, 'battle/modules/13c-tactical-march-provider.js'), 'utf8');
  assert.match(src, /G && G\.on && TC\.commandUnit \? TC\.commandUnit\(sim, f, true\)/);
});
test('commander-ai runs each legacy Macro decision unless the General tick marked it owned', () => {
  const src = fs.readFileSync(path.join(H.REPO, 'battle/commander-ai.js'), 'utf8');
  assert.match(
    src,
    /if \(!owned \|\| !facts\.owned\.reconstitution\) \{\s*reconstitute\(sim, faction\);\s*pickUpFled\(sim, faction\);\s*\}/
  );
  assert.match(
    src,
    /owned && facts\.owned\.recovery \? facts\.recoveryWoke : runStrategicRecovery\(sim, faction, squads, town\)/
  );
});
['reconstitution-check.js', 'fled-man-check.js', 'strategic-recovery-review-check.js'].forEach(file =>
  test(file + ' passes with the General under the controller', () => {
    const out = execFileSync(process.execPath, [path.join(__dirname, file)], {
      env: Object.assign({}, process.env, { GENERAL_CONTROLLER: '1' }),
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024
    });
    assert.match(out, /PASS controller: /);
  })
);
console.log(n + ' tactical General checks passed');
