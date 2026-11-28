#!/usr/bin/env node
'use strict';
/* The s1-skill-episodes probe (scripts/probes/s1-skill-episodes.js) against a stubbed march-provider
   summary: a squad whose provider runs `defense` then `retreat` yields two episodes split at the change,
   with the men who held a controller key, how far they moved and whether they ended on their adopted
   destination; a squad that leaves the controller ends its episode; a non-skill kind or an uncontrolled
   squad opens none. The probe reads only the summary and the men (never a plan or a lease), so a battle
   is unchanged; its live answer comes from Muse running it on natural battles. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const H = require('./harness');

const root = { window: null };
root.window = root;
new Function('window', fs.readFileSync(path.join(H.REPO, 'scripts/probes/s1-skill-episodes.js'), 'utf8'))(
  root
);
const probe = root.BattleProbes['s1-skill-episodes'];

function man(id, x, z) {
  return { id, root: { position: { x, z } }, dead: false, isPlayer: false };
}
const a = man(1, 0, 0),
  b = man(2, 0, 0),
  c = man(3, 0, 0);
const sq = {
  id: 'us-0',
  faction: 'us',
  commandPhase: 'defend',
  state: 'advance',
  inContact: false,
  members: [a, b, c]
};
const sim = { time: 0, factions: { us: { squads: [sq] }, ge: { squads: [] } } };
let row = { squad: 'us:us-0', controlled: true, squadSkill: { kind: 'defense', actions: 2, stopped: {} } };
root.BattleTacticalMarchProvider = { summary: () => [row] };

probe.start(sim);
a._fireteamPublishKey = 'controller:post-1';
b._fireteamPublishKey = 'controller:post-2';
c._fireteamPublishKey = 'formation';
a._fireteamDestination = { x: 10, z: 0 };
b._fireteamDestination = { x: 0, z: 20 };
probe.sample(sim);
for (let t = 1; t <= 10; t++) {
  sim.time = t;
  a.root.position.x = t; // walks onto his post
  b.root.position.z = t; // still on the way
  probe.sample(sim);
}
sim.time = 11;
sq.state = 'retreat';
row = {
  squad: 'us:us-0',
  controlled: true,
  squadSkill: { kind: 'retreat', actions: 3, stopped: { 'refused:x': 1 } }
};
probe.sample(sim);
sim.time = 15;
row = { squad: 'us:us-0', controlled: false, squadSkill: { kind: 'retreat', actions: 0, stopped: {} } };
probe.sample(sim);
sim.time = 16;
row = { squad: 'us:us-0', controlled: true, squadSkill: { kind: null, actions: 0, stopped: {} } };
probe.sample(sim);
const rep = probe.report(sim);

assert.equal(rep.schema, 's1-skill-episodes-v1');
assert.equal(rep.episodes.length, 2, JSON.stringify(rep.episodes));
const [d, r] = rep.episodes;
assert.equal(d.kind, 'defense');
assert.equal(d.startPhase, 'defend');
assert.equal(d.endedBy, 'skill:retreat');
assert.equal(d.seconds, 11);
assert.equal(d.men, 2, 'only the men holding a controller key are counted');
assert.equal(d.menMoved, 2);
assert.equal(d.menArrived, 1, 'one man ended on his adopted post, the other short of it');
assert.equal(d.maxActions, 2);
assert.equal(r.kind, 'retreat');
assert.equal(r.endedBy, 'left-controller', 'leaving the controller ends the episode');
assert.equal(r.stopped['refused:x'], 1);
assert.deepEqual(rep.byKind.defense, {
  episodes: 1,
  squads: 1,
  seconds: 11,
  withMovement: 1,
  withArrival: 1
});
assert.equal(rep.byKind.regroup.episodes, 0);
console.log(
  'PASS s1-skill-episodes: episodes split at a skill change, physical movement and arrival per man'
);
