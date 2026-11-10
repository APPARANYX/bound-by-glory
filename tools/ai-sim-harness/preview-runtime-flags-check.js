#!/usr/bin/env node
'use strict';
/* Exercise the PHP forwarding contract against the shipping strategic owners.
   A forwarded query is insufficient unless fleet/recon/interception actually activate. */
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const { loadModule } = require('./module-loader');
const repo = path.resolve(__dirname, '../..');
const names = ['strategicInterception', 'motorTransport', 'aerialRecon', 'interception', 'truckCollision'];
const skillFlags = [
  'controllerDefensivePosts',
  'controllerRegroup',
  'controllerRecon',
  'controllerStructureClearing',
  'controllerRetreatSkill'
];
const inputs = Array.from({ length: 32 }, (_, mask) =>
  Object.fromEntries(
    names
      .map((name, bit) => [name, mask & (1 << bit) ? '1' : '0'])
      .concat(skillFlags.map((name, bit) => [name, mask & (1 << bit) ? '1' : '0']))
  )
);
inputs.forEach((q, i) => {
  q.controllerGrenadeArea = i % 2 ? '1' : '0';
  q.controllerReleaseFinal = i % 2 ? '1' : '0';
  q.controllerBoundRecovery = i % 2 ? '0' : '1';
});
const microNames = ['controllerStance', 'controllerSoldierFire', 'controllerReactions', 'controllerDrill'];
const microInputs = Array.from({ length: 16 }, (_, mask) =>
  Object.fromEntries(microNames.map((name, bit) => [name, mask & (1 << bit) ? '1' : '0']))
);
const macroNames = ['controllerReconstitution', 'controllerRecovery', 'controllerBriefs', 'controllerTransport'];
const macroInputs = Array.from({ length: 16 }, (_, mask) =>
  Object.fromEntries(macroNames.map((name, bit) => [name, mask & (1 << bit) ? '1' : '0']))
);
const extraInputs = [
  { audioSpatialWrite: 'automation', groundSteps: '48', generalIntel: '0' },
  { audioSpatialWrite: 'direct', groundSteps: '24', generalIntel: '1' }
];
const allQueries = JSON.parse(
  execFileSync(
    'php',
    [
      '-r',
      'require $argv[1]; $out=array(); foreach(json_decode($argv[2],true) as $q) $out[]=http_build_query(grasstex_preview_options($q)); echo json_encode($out);',
      path.join(repo, 'runtime-contract.php'),
      JSON.stringify(inputs.concat(microInputs, macroInputs, extraInputs))
    ],
    { encoding: 'utf8' }
  )
);
const queries = allQueries.slice(0, inputs.length);
for (const profile of ['strategic', 'legacy'])
  queries.forEach((query, index) => {
    const forwarded = new URLSearchParams(query);
    assert.equal(forwarded.get('controllerGrenadeArea'), inputs[index].controllerGrenadeArea);
    assert.equal(forwarded.get('controllerReleaseFinal'), inputs[index].controllerReleaseFinal);
    assert.equal(forwarded.get('controllerBoundRecovery'), inputs[index].controllerBoundRecovery);
    skillFlags.forEach(name =>
      assert.equal(forwarded.get(name), inputs[index][name], 'S1 rollback forwarding: ' + name)
    );
    const hooks = {};
    const root = {
      location: { search: '?' + query },
      GTLog() {},
      BattleModules: {
        registerSystem: (id, api) => {
          hooks[id] = api;
        }
      }
    };
    loadModule(root, 'battle/core-runtime.js');
    for (const name of [
      '58-strategic-abstract-transport',
      '59-strategic-aerial-recon',
      '59b-strategic-interception'
    ])
      loadModule(root, 'battle/modules/' + name + '.js');
    const sim = {
      time: 0,
      obstacles: [],
      factions: { us: { squads: [] }, ge: { squads: [] } },
      scene: {
        metadata: {
          battleScenario: {
            profile,
            spawnZones: {
              us: { bases: [{ id: 'a', objectiveId: 'a', x: 0, z: 0 }] },
              ge: { bases: [{ id: 'b', objectiveId: 'b', x: 0, z: 1000 }] }
            },
            roads: [{ fromObjectiveId: 'a', toObjectiveId: 'b', ax: 0, az: 0, bx: 0, bz: 1000 }]
          }
        }
      }
    };
    hooks['strategic-abstract-transport'].onBattleStart(sim);
    const flags = inputs[index],
      active = profile === 'strategic';
    const expectedFleet = active && flags.motorTransport === '1' ? 4 : 0;
    assert.equal(
      root.BattleSquadTransport.fleetSummary(sim).length,
      expectedFleet,
      'real fleet from forwarded flags'
    );
    assert.equal(
      root.BattleAerialRecon.status(sim, 'us').enabled,
      active && flags.strategicInterception === '1' && flags.aerialRecon === '1',
      'real recon gate from forwarded flags'
    );
    assert.equal(
      root.BattleStrategicInterception.enabled(sim),
      active && names.slice(0, 4).every(name => flags[name] === '1'),
      'real interception prerequisites from forwarded flags'
    );
    assert.equal(
      sim.obstacles.__dynamicFootprints.length,
      flags.truckCollision === '1' ? expectedFleet : 0,
      'real colliders from forwarded flags'
    );
  });
console.log('PASS 64 composed PHP-forwarding / strategic-runtime activation cases');

allQueries.slice(inputs.length, inputs.length + microInputs.length).forEach((query, index) => {
  const flags = new URLSearchParams(query);
  for (const name of microNames)
    assert.equal(flags.get(name), microInputs[index][name], name + ' forwarded exactly');
  const root = {
    location: { search: '?' + query },
    BattleTacticalController: { selectSoldier() {}, soldierPolicyAvailable: () => true }
  };
  loadModule(root, 'battle/modules/13k-tactical-soldier-policy.js', { location: root.location });
  const s = { squad: {} };
  for (const [slot, name] of [
    ['posture.commit', 'controllerStance'],
    ['cover.take', 'controllerStance'],
    ['fire.personal', 'controllerSoldierFire'],
    ['weapon.reload', 'controllerSoldierFire'],
    ['stress.react', 'controllerReactions'],
    ['drill.contact', 'controllerDrill']
  ])
    assert.equal(
      root.BattleTacticalSoldierPolicy.enabled(s, {}, slot),
      microInputs[index][name] !== '0',
      slot
    );
});
console.log('PASS 16 PHP-forwarding / independent Micro rollback combinations');

allQueries
  .slice(inputs.length + microInputs.length, inputs.length + microInputs.length + macroInputs.length)
  .forEach((query, index) => {
    const forwarded = new URLSearchParams(query);
    const wanted = macroInputs[index];
    for (const name of macroNames)
      assert.equal(forwarded.get(name), wanted[name], 'Macro rollback forwarded exactly: ' + name);
    const root = { location: { search: '?' + query } };
    loadModule(root, 'battle/modules/13j-tactical-general.js', { location: root.location });
    const general = root.BattleTacticalGeneral;
    for (const [flag, name] of [
      ['reconstitution', 'controllerReconstitution'],
      ['recovery', 'controllerRecovery'],
      ['briefs', 'controllerBriefs'],
      ['transport', 'controllerTransport']
    ])
      assert.equal(general[flag], wanted[name] !== '0', 'actual Macro policy flag: ' + name);
    assert.equal(general.on, macroNames.some(name => wanted[name] !== '0'));
  });
console.log('PASS 16 PHP-forwarding / independent Macro rollback combinations');

allQueries.slice(inputs.length + microInputs.length + macroInputs.length).forEach((query, index) => {
  const forwarded = new URLSearchParams(query);
  for (const [name, value] of Object.entries(extraInputs[index]))
    assert.equal(forwarded.get(name), value, 'diagnostic query forwarded exactly: ' + name);
  assert.equal(forwarded.has('notInPreviewAllowlist'), false);
});
console.log('PASS 2 explicit audio-spatial / ground-stop / intelligence preview forwarding cases');
