/* Offline shipping-module regression: event occurrence time must survive delayed UI polling. */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../../battle/skills-lab.js'), 'utf8');
function fixture() {
  function element() {
    const children = new Map();
    return {
      style: {},
      hidden: false,
      textContent: '',
      innerHTML: '',
      appendChild() {},
      setAttribute() {},
      addEventListener() {},
      focus() {},
      querySelector(key) {
        if (!children.has(key)) children.set(key, element());
        return children.get(key);
      }
    };
  }
  const doc = { head: element(), body: element(), createElement: element };
  let history = [];
  const squad = { id: 's', members: [] };
  const window = {
    SKILLS_LAB: true,
    PHASE_C_COMBAT_LAB: true,
    BATTLE_PREVIEW: true,
    location: { search: '?skillsLab=1&labDistance=120&labMove=autonomous&tacticalController=new' },
    BattleTacticalCoveredManeuver: {
      summary() {
        return { history };
      }
    }
  };
  const sim = {
    time: 0,
    paused: true,
    scene: null,
    factions: { us: { squads: [squad] }, ge: { squads: [] } },
    _roster: { us: [], ge: [] },
    pause() {
      this.paused = true;
    },
    setTimeScale() {}
  };
  vm.runInNewContext(source, {
    window,
    location: window.location,
    document: doc,
    URLSearchParams,
    setInterval() {
      return 1;
    }
  });
  window.BattleSkillsLab.attachBattle(sim, null);
  return {
    sim,
    read(events) {
      history = events;
      return JSON.parse(JSON.stringify(window.BattleSkillsLab.snapshot().events));
    }
  };
}
const f = fixture();
f.sim.time = 20;
const event = { token: 1, at: 1.234, phase: 'bound', team: 'A', reason: 'supported' };
let rows = f.read([event]);
assert.equal(
  rows.find(e => e.kind === 'maneuver bound').t,
  1.23,
  'retain native occurrence time instead of the later polling time'
);
f.sim.time = 30;
assert.deepEqual(f.read([event]), rows, 'repeated snapshots do not duplicate the same native event');
rows = f.read([{ ...event, token: 2, at: 0, phase: 'zero' }]);
assert.equal(rows.find(e => e.kind === 'maneuver zero').t, 0, 'zero is a valid occurrence time');
for (const [i, at] of [undefined, NaN, Infinity, '2'].entries()) {
  rows = f.read([{ ...event, token: 3 + i, at, phase: 'fallback' + i }]);
  assert.equal(
    rows.find(e => e.kind === 'maneuver fallback' + i).t,
    30,
    'unknown/nonfinite/non-numeric event time falls back to current simulation time'
  );
}
f.sim.time = 40;
f.sim.onFire({ faction: 'us', id: 1 });
assert.equal(
  f.read([]).find(e => e.kind === 'discharge').t,
  40,
  'synchronous fire callbacks still use current simulation time'
);
rows = f.read(
  Array.from({ length: 130 }, (_, i) => ({
    token: 100 + i,
    at: i / 10,
    phase: 'bounded',
    team: 'A',
    reason: 'test'
  }))
);
assert.equal(rows.length, 120, 'existing event storage bound remains');
assert.equal(rows[0].t, 1);
assert.equal(rows.at(-1).t, 12.9);
console.log('Skills Lab event-clock contracts PASS (shipping module; offline DOM fixture).');
