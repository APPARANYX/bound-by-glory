#!/usr/bin/env node
'use strict';
/* K1: a squad's contact memory must not learn that an enemy died unless one of its own men saw him fall.

   SquadAI.squadContact() used to cut the memory of a contact to a third the moment `contact.unit.dead`
   became true, whoever (if anyone) saw it. A death behind a ridge, or one inflicted by another squad,
   therefore erased the last-known position from the squad's picture eight seconds early, and every reader
   of that picture (Squad Leader skills, the controller's contact skill, the General's reported contacts)
   changed its decision on a fact nobody had observed.

   The fixture drives the real Perception entry (SquadAI.perceive) on a squad the real tactical controller
   owns. Sight is cut with a terrain ridge, never by editing knowledge records. The strongest claim is the
   twin test: two identical worlds that differ only in whether the unseen enemy dies must leave the squad
   with the same knowledge at every tick.

   Fails on the code before the fix: 'unseen death', the twin test, the neighbour squad and the
   'others remain nearby' case all lose the contact at 4 s instead of 12 s. */
const assert = require('node:assert/strict');
const H = require('./harness');
const { loadModule } = require('./module-loader');
const CONTRACT = require('../../battle/tactical-capability-contract');

let checks = 0,
  failures = 0;
function test(name, fn) {
  try {
    fn();
    checks++;
    console.log('PASS ' + name);
  } catch (error) {
    failures++;
    console.error('FAIL ' + name + ': ' + error.message);
  }
}
const TICK = 0.15,
  MEMORY = 12,
  SEEN_DOWN = MEMORY / 3;

/* A complete no-op provider, so the squad is owned through the controller's real switch. */
function provider(TC) {
  const p = { id: 'k1-fixture', policies: {}, adapters: {}, lifecycle: {} };
  TC.points.forEach(point => (p.policies[point] = () => {}));
  Object.keys(CONTRACT.capabilities).forEach(cap => (p.adapters[cap] = () => true));
  p.lifecycle.cancel = () => true;
  p.lifecycle.release = () => true;
  p.lifecycle.stage = () => ({ stage: 'accepted', reason: 'fixture', at: 0 });
  return p;
}
/* us-0 (A looks north at the enemy, B looks south and never sees him) at z=0; the enemy 40 m north.
   `ridge` raises the ground between them: nobody on either side can see across it. */
function world(opts = {}) {
  H.resetIds();
  const r = H.bootstrap({ search: opts.search == null ? '?callouts=0' : opts.search });
  r.BattleTacticalCapabilityContract = CONTRACT;
  loadModule(r, 'battle/modules/13a-tactical-controller.js', { location: r.location });
  const w = { r, S: r.SquadAI, TC: r.BattleTacticalController, ridge: false };
  w.b = H.makeBattle(r, {
    seed: 815,
    heightAt: (x, z) => (w.ridge && z > 8 && z < 32 ? 8 : 0)
  });
  w.us = H.addSquad(r, w.b, {
    id: 'us-0',
    faction: 'us',
    x: 0,
    z: 0,
    objective: { x: 0, z: 200 },
    composition: ['rifleman', 'rifleman']
  });
  w.ge = H.addSquad(r, w.b, {
    id: 'ge-0',
    faction: 'ge',
    x: 0,
    z: 40,
    objective: { x: 0, z: -200 },
    composition: opts.enemies || ['rifleman'],
    facing: Math.PI
  });
  w.A = w.us.members[0];
  w.B = w.us.members[1];
  w.enemy = w.ge.members[0];
  w.other = w.ge.members[1] || null;
  place(w.A, 0, 0, 0);
  place(w.B, 3, 0, Math.PI);
  place(w.enemy, 0, 40, Math.PI);
  if (w.other) place(w.other, 6, 44, Math.PI);
  w.squads = [w.us];
  if (opts.neighbour) {
    /* A second squad 20 m east whose men all look away: it knows only what it is told. */
    w.us1 = H.addSquad(r, w.b, {
      id: 'us-1',
      faction: 'us',
      x: 20,
      z: 0,
      objective: { x: 20, z: 200 },
      composition: ['rifleman', 'rifleman'],
      facing: Math.PI
    });
    w.us1.members.forEach((s, i) => place(s, 20 + i * 3, 0, Math.PI));
    w.squads.push(w.us1);
  }
  if (opts.owned !== false) {
    assert.equal(w.TC.registerProvider(provider(w.TC)).ok, true);
    w.squads.forEach(sq => {
      assert.equal(w.TC.requestMode(w.b, sq, 'new', 'k1-fixture').ok, true);
      assert.equal(w.TC.controls(w.b, sq), true, 'the real controller owns ' + sq.id);
    });
  }
  return w;
}
function place(s, x, z, yaw) {
  s.root.position.x = x;
  s.root.position.z = z;
  s.root.rotation.y = yaw;
  s.moving = false;
}
/* One AI tick of Perception for every living US man, in roster order, as updateSoldier runs it. */
function tick(w, onTick) {
  w.b.time = +(w.b.time + TICK).toFixed(6);
  if (onTick) onTick(w);
  w.b._roster.us.forEach(s => {
    if (!s.dead) w.S.perceive(s, w.b);
  });
}
function runTo(w, t, onTick) {
  while (w.b.time < t - 1e-9) tick(w, onTick);
}
function held(w, sq) {
  return w.S.squadContact(sq || w.us, w.b);
}
/* What the squad knows, with nothing of the enemy's live state in it. */
function knowledge(w) {
  const row = c =>
    c
      ? {
          id: c.unit ? c.unit.id : c.knownUnitId == null ? null : c.knownUnitId,
          x: +(+c.x).toFixed(3),
          z: +(+c.z).toFixed(3),
          at: +(+c.at).toFixed(3),
          heard: !!c.heard,
          relayed: c.relayedFrom == null ? null : c.relayedFrom,
          source: c.source || null
        }
      : null;
  return {
    t: w.b.time,
    squads: w.squads.map(sq => row(held(w, sq))),
    men: w.b._roster.us.map(s => row(w.S.soldierContact(s, w.b))),
    targets: w.b._roster.us.map(s => (s.target ? s.target.id : null))
  };
}
function kill(w, unit, killer) {
  w.b.killSoldier(unit, killer || null);
}
/* A sees the enemy for one second, then the ridge comes up and nobody sees him again. */
function sightThenHide(w) {
  runTo(w, 1);
  assert.strictEqual(w.A.target, w.enemy, 'A has eyes on the enemy');
  assert.strictEqual(w.us.contact.unit, w.enemy);
  assert.equal(w.B.target, null, 'B, looking away, never sees him');
  w.ridge = true;
  tick(w);
  assert.equal(w.A.target, null, 'the ridge breaks A’s sight');
  return w.us.contact.at;
}

test('an enemy who dies unseen, unheard and unreported stays in the squad’s memory for its full term', () => {
  const w = world(),
    at = sightThenHide(w);
  runTo(w, 2);
  kill(w, w.enemy);
  runTo(w, at + SEEN_DOWN + 1);
  const c = held(w);
  assert.ok(c, 'the squad was told nothing: it still holds his last-known position');
  assert.equal(c.at, at);
  assert.deepEqual({ x: c.x, z: c.z }, { x: 0, z: 40 });
  assert.equal(c.seenDownAt == null, true, 'no man saw him fall');
  runTo(w, at + MEMORY - TICK);
  assert.ok(held(w), 'still held just inside the memory term');
  runTo(w, at + MEMORY + 2 * TICK);
  assert.equal(held(w), null, 'and it expires on the ordinary clock');
  assert.equal(w.us.contact, null);
});

test('twin worlds: an unseen death changes nothing the squad knows, at any tick', () => {
  function trace(dies) {
    const w = world({ neighbour: true, enemies: ['rifleman', 'rifleman'] }),
      rows = [];
    sightThenHide(w);
    runTo(w, 16, x => {
      if (dies && Math.abs(x.b.time - 2.1) < 1e-6) {
        kill(x, x.enemy);
        kill(x, x.other);
      }
      rows.push(JSON.stringify(knowledge(x)));
    });
    return rows;
  }
  const alive = trace(false),
    dead = trace(true);
  assert.equal(alive.length, dead.length);
  for (let i = 0; i < alive.length; i++)
    assert.equal(dead[i], alive[i], 'knowledge diverged at tick ' + i + ' on hidden truth alone');
  assert.ok(
    alive.some(row => JSON.parse(row).squads[0]),
    'the trace is not vacuous: the squad held a contact'
  );
  assert.equal(JSON.parse(alive[alive.length - 1]).squads[0], null, 'and both worlds forget him in the end');
});

test('a death one of its men watches is confirmed: the record decays fast but is not wiped', () => {
  const w = world();
  runTo(w, 1);
  assert.strictEqual(w.A.target, w.enemy);
  kill(w, w.enemy, w.A);
  tick(w);
  const c = held(w),
    at = c && c.at;
  assert.ok(c, 'one kill does not blind the squad');
  assert.equal(c.seenDownAt, w.b.time, 'A was watching him when he went down');
  assert.equal(w.A.target, null);
  runTo(w, at + SEEN_DOWN - TICK);
  assert.ok(held(w), 'held through the short term');
  runTo(w, at + SEEN_DOWN + 2 * TICK);
  assert.equal(held(w), null, 'a confirmed casualty is dropped after a third of the memory');
});

test('a man who had already lost sight of him does not become a witness when he dies', () => {
  const w = world(),
    at = sightThenHide(w);
  /* The stale pointer a hook could leave behind: he is still "the target" but the ridge is in the way. */
  w.A.target = w.enemy;
  kill(w, w.enemy);
  tick(w);
  assert.equal(w.A.target, null);
  assert.equal(w.us.contact.seenDownAt == null, true, 'no line of sight to the body, no confirmation');
  runTo(w, at + SEEN_DOWN + 1);
  assert.ok(held(w));
});

test('word of the death reaches a squadmate through the squad’s own record, not a neighbour squad', () => {
  const w = world({ neighbour: true });
  runTo(w, 1.5);
  const relayed = w.us1.contact;
  assert.ok(relayed, 'the sighting was passed to the neighbour squad');
  assert.strictEqual(relayed.unit, w.enemy);
  assert.equal(relayed.relayedFrom, 'us-0');
  assert.deepEqual({ x: relayed.x, z: relayed.z }, { x: 0, z: 40 });
  kill(w, w.enemy, w.A);
  tick(w);
  const at = w.us.contact.at,
    relayedAt = w.us1.contact.at;
  assert.equal(w.B.target, null, 'B never saw the enemy himself');
  assert.equal(w.us.contact.seenDownAt, w.b.time, 'B’s squad record carries what A saw');
  assert.equal(w.us1.contact.seenDownAt == null, true, 'nobody told the neighbour squad he is down');
  runTo(w, at + SEEN_DOWN + 2 * TICK);
  assert.equal(held(w, w.us), null, 'the squad that saw it has dropped him');
  const far = held(w, w.us1);
  assert.ok(far, 'the squad that only heard of him still holds the report');
  assert.deepEqual({ x: far.x, z: far.z, at: far.at }, { x: 0, z: 40, at: relayedAt });
  runTo(w, relayedAt + MEMORY + 2 * TICK);
  assert.equal(held(w, w.us1), null, 'and the report ends when the sighting it carries is too old');
});

test('a delivered callout still propagates; a death the callers never saw does not shorten it', () => {
  const w = world({ neighbour: true, search: '' });
  assert.equal(w.r.BattleCallouts.enabled(), true, 'the shipping callout channel');
  runTo(w, 3);
  const told = w.us1.contact;
  assert.ok(told && told.callout != null, 'a real call was heard and applied');
  assert.strictEqual(told.unit, w.enemy);
  assert.equal(told.relayedFrom, 'us-0');
  const toldAt = told.at;
  w.ridge = true;
  tick(w);
  kill(w, w.enemy);
  runTo(w, toldAt + SEEN_DOWN + 1);
  assert.ok(held(w, w.us1), 'the told squad keeps the report');
  assert.ok(held(w, w.us), 'so does the squad that saw him and then lost him');
  runTo(w, w.b.time + MEMORY + 2);
  assert.equal(held(w, w.us1), null);
  assert.equal(held(w, w.us), null);
});

test('a living enemy who is no longer visible is remembered where he was last seen, then forgotten', () => {
  const w = world(),
    at = sightThenHide(w);
  runTo(w, 5, x => {
    x.enemy.root.position.x += 1.5;
  });
  const c = held(w);
  assert.ok(c);
  assert.deepEqual({ x: c.x, z: c.z, at: c.at }, { x: 0, z: 40, at }, 'memory does not follow the live man');
  const own = w.S.soldierContact(w.A, w.b);
  assert.deepEqual({ x: own.x, z: own.z, unit: own.unit }, { x: 0, z: 40, unit: null });
  runTo(w, at + MEMORY + 2 * TICK);
  assert.equal(held(w), null);
  assert.equal(w.S.soldierContact(w.A, w.b), null, 'the man’s own belief ends on the same clock');
});

test('memory is bounded exactly: held at the limit, gone one tick past it, never immortal', () => {
  const w = world();
  runTo(w, 1);
  w.ridge = true;
  tick(w);
  const at = w.us.contact.at;
  w.b.time = at + MEMORY;
  assert.ok(held(w), 'held at exactly the memory term');
  w.b.time = at + MEMORY + 1e-6;
  assert.equal(held(w), null);
  assert.equal(w.us.contact, null, 'the expired record is removed, not hidden');
  kill(w, w.enemy);
  runTo(w, w.b.time + 3);
  assert.equal(w.us.contact, null, 'a later death does not bring it back');
});

test('a fresh sighting supersedes the old record and carries none of its confirmation', () => {
  const w = world({ enemies: ['rifleman', 'rifleman'] });
  /* The second enemy starts out of sight behind the first man's ridge line: far east, beyond the cone. */
  place(w.other, 300, 40, Math.PI);
  runTo(w, 1);
  assert.strictEqual(w.us.contact.unit, w.enemy);
  kill(w, w.enemy, w.A);
  tick(w);
  assert.equal(w.us.contact.seenDownAt, w.b.time);
  place(w.other, 4, 42, Math.PI);
  runTo(w, w.b.time + 1);
  const c = w.us.contact;
  assert.strictEqual(c.unit, w.other, 'the new man replaces the fallen one');
  assert.equal(c.seenDownAt == null, true, 'the confirmation belonged to the old record only');
  w.ridge = true;
  tick(w);
  const at = w.us.contact.at;
  runTo(w, at + SEEN_DOWN + 1);
  assert.ok(held(w), 'a living, hidden enemy gets the full memory');
  runTo(w, at + MEMORY + 2 * TICK);
  assert.equal(held(w), null);
});

test('one enemy falls in view while another stands beside him: the squad turns to the survivor', () => {
  const w = world({ enemies: ['rifleman', 'rifleman'] });
  runTo(w, 1);
  const first = w.A.target,
    second = first === w.enemy ? w.other : w.enemy;
  assert.ok(first);
  kill(w, first, w.A);
  runTo(w, w.b.time + 0.6);
  assert.strictEqual(w.A.target, second, 'A picks up the man still standing');
  assert.strictEqual(w.us.contact.unit, second);
  assert.equal(w.us.contact.seenDownAt == null, true);
  assert.ok(w.b.time - w.us.contact.at <= TICK + 1e-9, 'and the record is current');
});

test('one enemy dies unseen while others may remain nearby: the squad keeps watching that ground', () => {
  const w = world({ enemies: ['rifleman', 'rifleman'] }),
    at = sightThenHide(w),
    seen = w.us.contact.unit,
    survivor = seen === w.enemy ? w.other : w.enemy;
  runTo(w, 2);
  kill(w, seen);
  runTo(w, at + SEEN_DOWN + 1);
  const c = held(w);
  assert.ok(c, 'the last-known position is still worth fire and a look');
  assert.equal(!!survivor.dead, false);
  assert.equal(w.S.threatDisposition(survivor).combatThreat, true);
  assert.ok(Math.hypot(c.x - survivor.root.position.x, c.z - survivor.root.position.z) < 10);
});

test('rollback: a legacy squad and ?seenDeath=0 keep the previous live-state decay', () => {
  [world({ owned: false }), world({ search: '?callouts=0&seenDeath=0' })].forEach((w, i) => {
    const at = sightThenHide(w);
    runTo(w, 2);
    kill(w, w.enemy);
    runTo(w, at + SEEN_DOWN - TICK);
    assert.ok(held(w), 'arm ' + i + ' holds through the short term');
    runTo(w, at + SEEN_DOWN + 2 * TICK);
    assert.equal(held(w), null, 'arm ' + i + ' is the unchanged pre-fix read');
  });
  const S = world().S;
  assert.equal(S.parseSeenDeath('?seenDeath=0'), false);
  assert.equal(S.parseSeenDeath('?tacticalController=new&seenDeath=off'), false);
  assert.equal(S.parseSeenDeath('?seenDeath=1'), true);
  assert.equal(S.parseSeenDeath(''), true);
  assert.equal(S.seenDeathOn(), true);
});

test('confirming a death draws no combat RNG and adds no knowledge store', () => {
  const w = world();
  let draws = 0;
  const real = w.b.random;
  w.b.random = () => {
    draws++;
    return real.call(w.b);
  };
  runTo(w, 1);
  kill(w, w.enemy, w.A);
  runTo(w, 8);
  assert.equal(draws, 0);
  /* The control: the same eight seconds with the enemy alive and hidden. */
  const c = world();
  sightThenHide(c);
  runTo(c, 8);
  const keys = o => Object.keys(o).sort().join(',');
  assert.equal(keys(w.us), keys(c.us), 'no new squad field');
  assert.equal(keys(w.A), keys(c.A), 'no new soldier field');
  assert.equal(keys(w.b), keys(c.b), 'no new battle-wide store');
});

console.log(
  checks + ' contact-death-provenance checks passed' + (failures ? ', ' + failures + ' FAILED' : '')
);
if (failures) process.exit(1);
