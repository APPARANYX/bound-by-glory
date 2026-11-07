#!/usr/bin/env node
'use strict';
/* Classic defend battles: both sides get fresh squads after losses, the defender more
   (battle/modules/21c-strategic-reinforcements.js). The pool is one squad per sector the defender
   prepared for the defender and one fewer for the attacker; squads enter at their own spawn edge,
   rotating across lanes, never into enemy soldiers. Meeting battles get none, and
   ?defendReinforcements=0 turns it off. Fails on the old module: classic battles never reinforce. */
const assert = require('node:assert/strict');
const { loadModule, quietConsole } = require('./module-loader');
const SIZE = 10,
  LANES = [-700, -350, 0, 350, 700];

function world(
  search = '',
  sides = { meeting: false, defender: 'us', attacker: 'ge', heldSectors: [1, 2, 3] }
) {
  const hooks = {},
    spawned = [],
    roster = { us: [], ge: [] };
  const town = {
    id: 'scn-test',
    spawnZones: { us: { z: -510, lanes: LANES.slice() }, ge: { z: 510, lanes: LANES.slice() } }
  };
  const sim = {
    time: 100,
    winner: null,
    scene: { metadata: { battleScenario: town } },
    _sides: sides,
    _roster: roster,
    factions: { us: { squads: [] }, ge: { squads: [] } }
  };
  const root = {
    location: { search },
    SquadAI: { COMPOSITION: new Array(SIZE).fill('rifleman') },
    BattleModules: {
      registerSystem: (id, api) => {
        hooks[id] = api;
      },
      spawnUnitType: (id, s, faction, opts) => {
        const sq = { id: faction + '-inf-' + s.factions[faction].squads.length, faction, members: [] };
        for (let i = 0; i < SIZE; i++) {
          const man = { dead: false, root: { position: { x: opts.x, z: opts.z } } };
          sq.members.push(man);
          roster[faction].push(man);
        }
        s.factions[faction].squads.push(sq);
        spawned.push({ faction, opts, squad: sq });
        return { squad: sq, count: SIZE };
      }
    },
    BattleTelemetry: { record() {} }
  };
  loadModule(root, 'battle/core-runtime.js', { console: quietConsole });
  loadModule(root, 'battle/modules/21c-strategic-reinforcements.js');
  hooks['strategic-reinforcements'].onBattleStart(sim);
  const kill = (faction, n) => {
    for (let i = 0; i < n; i++) roster[faction].push({ dead: true });
  };
  const tick = () => hooks['strategic-reinforcements'].onCommanderTick(sim, {});
  return { sim, spawned, kill, tick, roster, R: root.BattleStrategicReinforcements };
}
const of = (w, f) => w.spawned.filter(s => s.faction === f);

// Both sides reinforce after a full squad of losses; the defender's pool is larger.
{
  const w = world();
  w.kill('us', SIZE - 1);
  w.kill('ge', SIZE - 1);
  w.tick();
  assert.equal(w.spawned.length, 0, 'nine dead is not yet a squad');
  w.kill('us', 1);
  w.kill('ge', 1);
  w.tick();
  assert.equal(of(w, 'us').length, 1, 'the defender gets a fresh squad after ten dead');
  assert.equal(of(w, 'ge').length, 1, 'the attacker gets one too');
  const d = of(w, 'us')[0].opts,
    a = of(w, 'ge')[0].opts;
  assert.deepEqual(
    [d.x, d.z],
    [LANES[0], -510],
    'the defender enters at its own spawn edge, behind the fight'
  );
  assert.deepEqual([a.x, a.z], [LANES[0], 510], 'the attacker enters at its own spawn edge');
  w.kill('us', 60);
  w.kill('ge', 60);
  for (let i = 0; i < 8; i++) w.tick();
  const s = w.R.summary(w.sim);
  assert.equal(s.us.pool, 3, 'defender: one squad per prepared sector');
  assert.equal(s.ge.pool, 2, 'attacker: one fewer');
  assert.equal(of(w, 'us').length, 3);
  assert.equal(of(w, 'ge').length, 2);
  assert.deepEqual(
    of(w, 'us').map(x => x.opts.x),
    [LANES[0], LANES[1], LANES[2]],
    'waves rotate across lanes, entering spread apart'
  );
}

// Never into enemy soldiers: a lane with an enemy within half the lane spacing is skipped.
{
  const w = world();
  w.roster.ge.push({ dead: false, root: { position: { x: LANES[0] + 100, z: -500 } } });
  w.kill('us', SIZE);
  w.tick();
  assert.equal(of(w, 'us')[0].opts.x, LANES[1], 'the occupied lane is skipped');
}

// Meeting battles and ?defendReinforcements=0 get none.
for (const w of [
  world('', { meeting: true, defender: null, attacker: null }),
  world('?defendReinforcements=0')
]) {
  w.kill('us', 40);
  w.kill('ge', 40);
  w.tick();
  assert.equal(w.spawned.length, 0);
  assert.equal(w.R.summary(w.sim), null);
}

console.log(
  'PASS classic defend reinforcements: both sides after losses, defender pool larger, own spawn edge, lanes rotate, enemy lanes skipped; meeting and ?defendReinforcements=0 inert'
);
