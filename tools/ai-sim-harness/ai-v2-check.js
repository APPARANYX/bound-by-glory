#!/usr/bin/env node
/* AI V2 (`?ai=v2`) invariants, on the shipping perception, weapons, movement integrator and Movement
   Resolver (fixture: ai-v2-fixture.js). Run: node tools/ai-sim-harness/ai-v2-check.js

   Success criteria, stated before the implementation was tuned:
     1. Off is inert: without the flag no V2 state exists and the shipping squad command runs.
     2. Vertical slice: a commander's mission reaches a squad by radio, becomes tasks by voice, becomes
        physical movement through the Movement Resolver, contact is reported upward, men fire.
     3. Knowledge travels only by message (and cover is searched on events and reused, not per tick): a squad's contact book is empty until a report is delivered,
        the commander's picture lags the squad's by the radio delay, records hold positions and never
        unit references, and no V2 file reads a roster.
     4. One owner: every destination a V2 man walks to was proposed by his own brain ('ai-v2'), he
        holds at most one adopted task, and the commander has at most one believed mission per squad.
     5. Coordinated bounds are physical: movers arrive while a real base of fire shoots.
     6. A withdrawal keeps one rally point until the squad has rallied, whatever arrives meanwhile.
     7. Command continuity: a dead leader is replaced after a gap; the mission survives.
     8. A captured objective is held by the squad that took it; the rest of the force moves on.
     9. A possessed soldier is never tasked.
    11. An order is three things (issuer record, frozen brief in the mail, holder's copy): a retask, a
        cancellation or an edit by the issuer changes nothing for the holder until a message arrives,
        and the issuer learns of adoption and arrival only by a report. (Added after review.)
    12. A cached cover post is dropped when another man has taken it or the geometry changed; who
        holds an objective is something a man sees (the flag, in range, in line of sight) and reports.
        (Added after review.)
    10. Same seed, same battle. A restart starts a new epoch and nothing stale is adopted.
   Staged premises (casualties inflicted by the check) are labelled where they are used; they test
   command behaviour, not combat outcome. */
'use strict';
const fs = require('fs');
const path = require('path');
const F = require('./ai-v2-fixture.js');

let failures = 0,
  checks = 0;
function check(name, ok, detail) {
  checks++;
  const line = (ok ? '  PASS  ' : '  FAIL  ') + name + (detail ? '  (' + detail + ')' : '');
  console.log(line);
  if (!ok) {
    failures++;
    console.error(line);
  }
}
function section(name) {
  console.log('\n== ' + name + ' ==');
}
const quiet = fn => {
  const log = console.log;
  console.log = () => {};
  try {
    return fn();
  } finally {
    console.log = log;
  }
};
const SEED = +(process.env.HARNESS_SEED || 4242);
const OBJ_A = { id: 'obj-a', x: 0, z: 0, radius: 25 };
function slice(extra) {
  return quiet(() =>
    F.build(
      Object.assign(
        {
          seed: SEED,
          objectives: [Object.assign({ owner: 'ge' }, OBJ_A)],
          squads: [
            { id: 'us-0', faction: 'us', x: -30, z: -230 },
            { id: 'us-1', faction: 'us', x: 30, z: -230 },
            { id: 'ge-0', faction: 'ge', x: 0, z: 10 }
          ]
        },
        extra || {}
      )
    )
  );
}
function stage(w, sq, keep, label) {
  /* PREMISE: casualties inflicted by the check, not by combat. */
  let n = 0;
  sq.members.forEach(s => {
    if (!s.dead && n++ >= keep) w.battle.killSoldier(s, null);
  });
  return label;
}

/* ---- 1. off is inert ---- */
section('1. flag off: V2 inert, shipping squad command runs');
{
  const w = quiet(() =>
    F.build({
      ai: 'legacy',
      seed: SEED,
      squads: [
        { id: 'us-0', faction: 'us', x: 0, z: -120 },
        { id: 'ge-0', faction: 'ge', x: 0, z: 0 }
      ]
    })
  );
  const start = F.centre(w.squads['us-0']);
  quiet(() => F.run(w, 30));
  check('BattleAIV2.on is false without ?ai=v2', w.K.on === false);
  check(
    'no V2 world, brain or mind was created',
    !w.battle._aiV2 && !w.battle._roster.us[0]._v2 && !w.squads['us-0']._v2
  );
  const moved = Math.hypot(F.centre(w.squads['us-0']).x - start.x, F.centre(w.squads['us-0']).z - start.z);
  check(
    'the shipping squad command still drives the squad',
    moved > 1 || w.battle.events.fired > 0,
    'moved ' + moved.toFixed(1) + ' m, fired ' + w.battle.events.fired
  );
}

/* ---- 2-4. vertical slice with per-tick invariants ---- */
section('2-4. vertical slice: mission -> task -> movement; knowledge by message; one owner');
{
  const w = slice(),
    b = w.battle,
    us = [w.squads['us-0'], w.squads['us-1']];
  let firstSeen = null,
    firstBook = null,
    firstSide = null,
    foreign = 0,
    multi = 0,
    badMove = 0,
    refInBook = 0,
    start = us.map(F.centre),
    peak = [0, 0];
  quiet(() =>
    F.run(w, 150, () => {
      const world = b._aiV2;
      b._roster.us.forEach(s => {
        if (s.dead) return;
        if (firstSeen == null && s.target) firstSeen = b.time;
        const br = s._v2;
        if (s._movementProposalOwner && s._movementProposalOwner !== 'ai-v2') foreign++;
        if (br && br.task && w.K.live(br.task) && br.move && br.move.taskId !== br.task.id) badMove++;
        /* The task he holds is his own copy, and never newer than the last one his leader issued him. */
        const mine = s.squad._v2 && s.squad._v2.tasks[s.id];
        if (br && br.task && mine && (mine === br.task || br.task.id > mine.id)) multi++;
      });
      us.forEach((sq, i) => {
        const m = sq._v2,
          c = F.centre(sq);
        if (c) peak[i] = Math.max(peak[i], Math.hypot(c.x - start[i].x, c.z - start[i].z));
        if (!m) return;
        if (firstBook == null && m.book.length) firstBook = b.time;
        m.book.forEach(e =>
          Object.keys(e).forEach(k => {
            if (e[k] !== null && typeof e[k] === 'object') refInBook++;
          })
        );
      });
      if (firstSide == null && world.sides.us && world.sides.us.contacts.length) firstSide = b.time;
    })
  );
  const st = b._aiV2.stats,
    missions = b._aiV2.ledger.filter(
      r => r.type === 'order' && r.level === 'mission' && r.status === 'adopted'
    ),
    moved = peak;
  check(
    'missions were issued by the commander and adopted by squads',
    missions.length >= 3,
    missions.length + ' adopted'
  );
  const delays = us.concat([w.squads['ge-0']]).map(sq => sq._macroMission && sq._macroMission.acceptedAt);
  check(
    'a mission takes the radio delay to reach its squad',
    st.transitions['mission:adopted'] >= 3 &&
      b._aiV2.ledger.filter(r => r.type === 'phase' && r.from === 'idle').every(r => r.t >= 2.5),
    'first phases at ' +
      b._aiV2.ledger
        .filter(r => r.type === 'phase' && r.from === 'idle')
        .map(r => r.t)
        .join(', ') +
      ' s; ' +
      delays.length +
      ' records'
  );
  check(
    'tasks were adopted and physically reached',
    (st.transitions['task:adopted'] || 0) > 20 && (st.transitions['task:arrived'] || 0) > 10,
    'adopted ' + st.transitions['task:adopted'] + ', arrived ' + st.transitions['task:arrived']
  );
  check(
    'squads physically advanced',
    Math.max.apply(null, moved) > 60,
    moved.map(m => m.toFixed(0) + ' m').join(', ')
  );
  check(
    'men fired aimed and suppressive fire',
    st.aimedTriggers > 0 && b.events.fired > 0,
    'aimed ' + st.aimedTriggers + ', area ' + st.areaTriggers + ', rounds ' + b.events.fired
  );
  check(
    'a squad learned of the enemy only after one of its men saw him',
    firstSeen != null && firstBook != null && firstBook >= firstSeen,
    'first sighting ' +
      (firstSeen || 0).toFixed(2) +
      ' s, first book entry ' +
      (firstBook || 0).toFixed(2) +
      ' s'
  );
  check(
    'the commander learned later, by the radio delay',
    firstSide != null && firstSide >= firstBook + 2.5 - 1e-6,
    'squad ' + (firstBook || 0).toFixed(2) + ' s, commander ' + (firstSide || 0).toFixed(2) + ' s'
  );
  check(
    'contact records hold positions, never unit references',
    refInBook === 0,
    refInBook + ' object fields'
  );
  check(
    "every destination came from the man's own brain",
    foreign === 0 && st.foreignDestinationWrites === 0,
    foreign + ' foreign proposals, ' + st.foreignDestinationWrites + ' foreign writes'
  );
  check(
    'one adopted task per man; his movement command belongs to it',
    multi === 0 && badMove === 0,
    multi + ' shared or out-of-order tasks, ' + badMove + ' orphan moves'
  );
  check(
    'deliberation is event-driven, not per tick',
    st.deliberations < st.soldierTicks * 0.2 &&
      st.squadThinks < st.squadTicks * 0.2 &&
      st.sidePlans < st.sideTicks * 0.05,
    'soldier ' +
      st.deliberations +
      '/' +
      st.soldierTicks +
      ', squad ' +
      st.squadThinks +
      '/' +
      st.squadTicks +
      ', side ' +
      st.sidePlans +
      '/' +
      st.sideTicks
  );
  check(
    'cover is searched on events and reused, not every tick',
    st.coverSearches < st.soldierTicks * 0.05 && st.coverCacheHits > st.coverSearches * 0.5,
    st.coverSearches +
      ' searches and ' +
      st.coverCacheHits +
      ' cache hits in ' +
      st.soldierTicks +
      ' soldier ticks'
  );
  const srcs = F.V2_FILES.map(f => fs.readFileSync(path.join(F.H.REPO, f), 'utf8')).join('\n');
  check('no V2 file reads a roster', !/rosterOf\s*\(|_roster\b/.test(srcs));
}

/* ---- 5. coordinated bounds ---- */
section('5. bounds: movers arrive while a real base of fire shoots');
{
  const w = quiet(() =>
    F.build({
      seed: SEED + 5,
      objectives: [Object.assign({ owner: 'ge' }, OBJ_A)],
      squads: [
        { id: 'us-0', faction: 'us', x: 0, z: -125 },
        { id: 'ge-0', faction: 'ge', x: 0, z: 6 }
      ]
    })
  );
  const premise = stage(w, w.squads['ge-0'], 5, 'PREMISE: defenders reduced to 5 men before the battle');
  let firedDuringBound = 0,
    wasBounding = false,
    firedAtStart = 0;
  quiet(() =>
    F.run(w, 200, () => {
      const m = w.squads['us-0']._v2,
        bounding = !!(m && m.phase === 'assault' && m.boundAt);
      if (bounding && !wasBounding) firedAtStart = w.battle.events.fired + w.battle.events.suppressiveShots;
      if (!bounding && wasBounding)
        firedDuringBound += w.battle.events.fired + w.battle.events.suppressiveShots - firedAtStart;
      wasBounding = bounding;
    })
  );
  const m = w.squads['us-0']._v2,
    c = F.centre(w.squads['us-0']);
  console.log('  ' + premise);
  check(
    'the squad leader ordered alternating bounds',
    m.bounds >= 2,
    m.bounds + ' bounds, ' + m.boundsOverwatch + ' of them by overwatch only'
  );
  check(
    'bounds were physically completed by a quorum of the movers',
    m.boundsArrived >= 1,
    m.boundsArrived + ' of ' + m.bounds
  );
  check(
    'the base of fire shot while the others moved',
    firedDuringBound > 0,
    firedDuringBound + ' trigger pulls during bounds'
  );
  check(
    'the squad closed with the enemy',
    c && c.z > -95,
    c ? 'centre z ' + c.z.toFixed(0) + ' from -125' : 'squad destroyed'
  );
}

/* ---- 6. withdrawal keeps its rally point ---- */
section('6. withdraw: one rally point until rallied');
{
  const w = slice({ seed: SEED + 6 }),
    sq = w.squads['us-1'];
  let staged = false,
    withdrew = false,
    rally = null,
    changed = 0,
    illegal = [],
    last = null,
    reached = null,
    missionDuring = 0;
  quiet(() =>
    F.run(w, 260, b => {
      const m = sq._v2;
      if (!m) return;
      if (!staged && m.phase === 'contact') {
        staged = true;
        stage(w, sq, 4);
      }
      if (m.phase === 'withdraw') {
        withdrew = true;
        if (!rally) rally = { x: m.rallyPoint.x, z: m.rallyPoint.z };
        else if (Math.hypot(m.rallyPoint.x - rally.x, m.rallyPoint.z - rally.z) > 0.01) changed++;
        if (m.mission && m.mission.adoptedAt > m.phaseSince) missionDuring++;
      }
      if (last === 'withdraw' && m.phase !== 'withdraw' && m.phase !== 'rally') illegal.push(m.phase);
      if (m.phase !== 'withdraw' && m.phase !== 'rally' && reached != null) rally = null; // a later withdrawal picks its own
      if (last === 'withdraw' && m.phase === 'rally') {
        const c = F.centre(sq);
        if (reached == null) reached = c ? Math.hypot(c.x - rally.x, c.z - rally.z) : null;
      }
      last = m.phase;
    })
  );
  console.log('  PREMISE: squad cut to 4 men by the check once it is in contact');
  check('a combat-ineffective squad withdraws', withdrew, staged ? 'staged' : 'never reached contact');
  check('the rally point never changed during the withdrawal', changed === 0, changed + ' changes');
  check(
    'the only way out of a withdrawal is the rally',
    illegal.length === 0,
    illegal.join(',') || 'withdraw -> rally'
  );
  check(
    'the survivors physically reached the rally point',
    reached != null ? reached <= 16 : F.centre(sq) == null,
    reached != null ? reached.toFixed(1) + ' m from it' : 'no survivors'
  );
  console.log(
    '  info: a new mission adopted during the withdrawal on ' + missionDuring + ' ticks did not interrupt it'
  );
}

/* ---- 7. succession ---- */
section('7. succession: the mission survives the leader');
{
  const w = slice({ seed: SEED + 7 }),
    sq = w.squads['us-0'];
  let killedAt = null,
    ordersAt = 0,
    during = 0,
    old = null,
    next = null,
    nextAt = null,
    before = null,
    kept = false;
  quiet(() =>
    F.run(w, 60, b => {
      const m = sq._v2,
        st = b._aiV2.stats.orders,
        issued = Object.keys(st)
          .filter(k => k.indexOf('task:') === 0)
          .reduce((n, k) => n + st[k], 0);
      if (killedAt == null && b.time >= 12 && m && m.leaderId != null) {
        old = sq.members.find(s => s.id === m.leaderId);
        before = m.mission;
        /* PREMISE: the leader is killed by the check. */
        b.killSoldier(old, null);
        killedAt = b.time;
        ordersAt = null;
      } else if (killedAt != null && nextAt == null) {
        if (ordersAt == null) ordersAt = issued;
        if (m.leaderId !== old.id) {
          next = m.leaderId;
          nextAt = b.time;
          kept = m.mission === before && w.K.live(m.mission);
        } else during = issued - ordersAt;
      }
    })
  );
  console.log('  PREMISE: squad leader killed by the check at ' + (killedAt || 0).toFixed(1) + ' s');
  const others = ['us-1', 'ge-0'].map(id => w.squads[id]._v2.leaderId);
  check(
    'the next senior man took command after the gap',
    next != null && nextAt - killedAt >= 3 - 0.16,
    next != null ? 'soldier ' + next + ' after ' + (nextAt - killedAt).toFixed(2) + ' s' : 'no successor'
  );
  check(
    'the new leader inherited the same live mission',
    kept,
    before ? before.kind + ' #' + before.id : 'none'
  );
  check(
    'the squad kept acting under the new leader',
    sq._v2.phase !== 'idle' && others.length === 2,
    'phase ' + sq._v2.phase
  );
  console.log('  info: tasks issued by this side during the gap (other squad included): ' + during);
}

/* ---- 8. hold what you take ---- */
section('8. a captured objective is held by the squad that took it');
{
  const w = quiet(() =>
    F.build({
      seed: SEED + 8,
      objectives: [
        Object.assign({ owner: null }, OBJ_A),
        { id: 'obj-b', x: 0, z: 330, radius: 25, owner: 'ge' }
      ],
      squads: [
        { id: 'us-0', faction: 'us', x: -25, z: -150 },
        { id: 'us-1', faction: 'us', x: 25, z: -150 },
        { id: 'ge-0', faction: 'ge', x: 0, z: 335 }
      ]
    })
  );
  let capturedAt = null,
    holder = null,
    left = 0,
    onward = false;
  quiet(() =>
    F.run(w, 330, b => {
      if (capturedAt == null && b.objectiveControl.objectives['obj-a'].owner === 'us') capturedAt = b.time;
      if (capturedAt != null && !holder) {
        ['us-0', 'us-1'].forEach(id => {
          const m = w.squads[id]._v2;
          if (
            !holder &&
            m.mission &&
            m.mission.kind === 'defend' &&
            m.mission.objectiveId === 'obj-a' &&
            w.K.live(m.mission)
          )
            holder = id;
        });
      }
      if (holder) {
        const c = F.centre(w.squads[holder]);
        if (c && Math.hypot(c.x, c.z) > 45) left++;
        const other = w.squads[holder === 'us-0' ? 'us-1' : 'us-0']._v2;
        if (other.mission && other.mission.objectiveId === 'obj-b') onward = true;
      }
    })
  );
  const belief = w.battle._aiV2.sides.us.obj['obj-a'],
    learned = w.battle._aiV2.ledger.find(
      r => r.type === 'objective-belief' && r.faction === 'us' && r.id === 'obj-a'
    ) || { t: -1 };
  check(
    'the objective was physically captured',
    capturedAt != null,
    capturedAt != null ? 'at ' + capturedAt.toFixed(1) + ' s' : 'never'
  );
  check(
    'the commander learned of it from a squad on the spot',
    belief.owner === 'us' && learned.t >= (capturedAt || 0) + 2.5,
    'reported by ' + learned.by + ', believed from ' + learned.t + ' s'
  );
  check(
    'one squad was ordered to hold it and stayed',
    !!holder && left === 0,
    holder ? holder + ', ' + left + ' ticks away from it' : 'no garrison'
  );
  check('the rest of the force moved on to the next objective', onward);
}

/* ---- 9. player boundary ---- */
section('9. a possessed soldier is never tasked');
{
  const w = slice({ seed: SEED + 9 }),
    sq = w.squads['us-0'],
    player = sq.members[3];
  player.isPlayer = true;
  let tasked = 0;
  quiet(() =>
    F.run(w, 60, () => {
      if (sq._v2 && sq._v2.tasks[player.id]) tasked++;
      if (player._v2 && player._v2.task) tasked++;
    })
  );
  check(
    "no task was issued to or adopted by the player's soldier",
    tasked === 0,
    tasked + ' ticks with a task'
  );
  check(
    'his squad still operates',
    sq._v2.phase !== 'idle' && Object.keys(sq._v2.tasks).length >= 5,
    'phase ' + sq._v2.phase + ', ' + Object.keys(sq._v2.tasks).length + ' tasked men'
  );
}

/* ---- 10. determinism and lifecycle ---- */
section('10. determinism and restart');
{
  const fp = seed => {
    const w = slice({ seed: seed });
    quiet(() => F.run(w, 120));
    return F.fingerprint(w.battle);
  };
  const a = fp(SEED),
    b = fp(SEED),
    c = fp(SEED + 1);
  check('same seed, same battle (positions, wounds, every V2 counter)', a === b);
  check('a different seed is a different battle', a !== c);
  const w = slice();
  quiet(() => F.run(w, 40));
  const world = w.battle._aiV2,
    oldEpoch = world.epoch,
    man = w.battle._roster.us.find(s => !s.dead && s._v2 && s._v2.task),
    oldTask = man._v2.task,
    oldMission = w.squads['us-0']._v2.mission,
    mail = world.mail.length;
  w.K.reset(w.battle); // what the beforeBattleRestart hook does in the page
  const fresh = w.K.world(w.battle);
  check(
    'a restart starts a new epoch with an empty mailbox',
    fresh.epoch === oldEpoch + 1 && fresh.mail.length === 0,
    'epoch ' + oldEpoch + ' -> ' + fresh.epoch + ', ' + mail + ' undelivered messages dropped'
  );
  check(
    'an order of the old epoch cannot advance',
    w.K.advance(fresh, oldTask, 'done') === false && w.K.advance(fresh, oldMission, 'done') === false
  );
  quiet(() => F.run(w, 0.3));
  check(
    'brains and squad minds of the old epoch are discarded',
    man._v2.epoch === fresh.epoch &&
      man._v2.task !== oldTask &&
      w.squads['us-0']._v2.epoch === fresh.epoch &&
      w.squads['us-0']._v2.mission !== oldMission
  );
  w.battle.time = 0; // a rewound clock without the hook (the Node harness has none)
  check('a rewound clock is treated as a restart', w.K.world(w.battle).epoch === fresh.epoch + 1);
  /* A task in flight to a man who dies is never adopted; the leader's record ends when he sees the man down. */
  const w2 = slice();
  let victim = null,
    record = null;
  quiet(() =>
    F.run(w2, 30, bt => {
      if (victim) return;
      const pending = bt._aiV2.mail.find(
        m => m.to === 'soldier' && m.brief && !m.brief.cancel && !m.soldier.dead
      );
      if (pending) {
        victim = pending.soldier;
        record = victim.squad._v2.tasks[victim.id];
        bt.killSoldier(victim, null); // PREMISE: killed while the order travels
      }
    })
  );
  check(
    'a task in flight to a man who died is never adopted',
    !!record &&
      record.status === 'failed' &&
      !(victim._v2 && victim._v2.task && victim._v2.task.id === record.id),
    record
      ? 'task #' + record.id + ' ended ' + record.status + ' (' + record.reason + ')'
      : 'no task was ever in flight'
  );
}

/* ---- 11. authority: what an actor knows about an order changes only when a message reaches him ---- */
section('11. order authority: issuer record, frozen brief, holder copy');
{
  const w = slice({ seed: SEED + 11 }),
    b = w.battle,
    held = new Map();
  let shared = 0,
    thawed = 0,
    inFlight = 0,
    leaked = 0,
    mutated = 0,
    earlyAck = 0,
    acks = 0;
  quiet(() =>
    F.run(w, 150, () => {
      b._aiV2.mail.forEach(m => {
        if (m.brief && !Object.isFrozen(m.brief)) thawed++;
        if (m.brief && m.brief.threat && !Object.isFrozen(m.brief.threat)) thawed++;
      });
      ['us', 'ge'].forEach(f =>
        b._roster[f].forEach(s => {
          if (s.dead || !s._v2 || !s.squad._v2) return;
          const mine = s._v2.task,
            his = s.squad._v2.tasks[s.id];
          if (mine && his && mine === his) shared++;
          if (his && his.status === 'adopted') {
            acks++;
            if (his.adoptedAt - his.issuedAt < 0.3 - 1e-6) earlyAck++;
          }
          if (mine) {
            const snap = JSON.stringify([mine.kind, mine.point, mine.threat, mine.leash, mine.pace]),
              seen = held.get(mine);
            if (seen == null) held.set(mine, snap);
            else if (seen !== snap) mutated++;
          }
          /* The leader has already replaced this man's task; the replacement is still in the air. */
          if (mine && his && his.id > mine.id && his.status === 'issued') {
            inFlight++;
            if (!w.K.live(mine)) leaked++;
          }
        })
      );
    })
  );
  check('a brief in the mailbox is frozen', thawed === 0, thawed + ' mutable briefs seen');
  check('issuer record and holder copy are never the same object', shared === 0, shared + ' shared');
  check(
    'a man keeps working his task until the replacement reaches him',
    inFlight > 0 && leaked === 0,
    inFlight + ' man-ticks with a retask in flight, ' + leaked + ' where his task had already ended'
  );
  check(
    'nothing the leader does to his record changes the copy a man holds',
    mutated === 0,
    mutated + ' held copies changed after adoption'
  );
  check(
    'the leader learns of adoption only by the acknowledgement',
    acks > 0 && earlyAck === 0,
    acks + ' acknowledged record-ticks, ' + earlyAck + ' sooner than a spoken reply'
  );
}

/* ---- 12. cover cache invalidation and the flag as an observation ---- */
section('12. cover cache validity; objective ownership is seen, not read');
{
  const w = quiet(() =>
      F.build({
        seed: SEED + 12,
        obstacles: [F.cover(0, 0, 'rock'), F.cover(6, 1, 'wall')],
        objectives: [Object.assign({ owner: 'us' }, OBJ_A)],
        squads: [{ id: 'us-0', faction: 'us', x: 0, z: -6 }]
      })
    ),
    K = w.K,
    st = () => K.world(w.battle).stats,
    [a, c] = w.squads['us-0'].members,
    near = { x: 1, z: -2 },
    threat = { x: 0, z: 80 };
  const first = K.coverFor(w.battle, a, near, threat, 12),
    n1 = st().coverSearches;
  const again = K.coverFor(w.battle, a, near, threat, 12);
  check(
    'an unchanged picture reuses the cached post',
    !!first && again === first && st().coverSearches === n1,
    first ? 'post ' + first.point.x.toFixed(1) + ',' + first.point.z.toFixed(1) : 'no cover found'
  );
  /* Another man takes that cover (he found it for a different spot). */
  const world = K.world(w.battle);
  K.brainOf(w.battle, c).cover = { claim: first.claim, point: first.point };
  world.claims[first.claim] = c;
  const moved = K.coverFor(w.battle, a, near, threat, 12);
  check(
    'cover another man has taken is not reused',
    st().coverSearches === n1 + 1 && (!moved || moved.claim !== first.claim),
    moved ? 'moved to ' + moved.point.x.toFixed(1) + ',' + moved.point.z.toFixed(1) : 'no free cover left'
  );
  const n2 = st().coverSearches;
  w.battle.obstacles.push(F.cover(2, -1, 'wall')); // the ground changed: a new obstacle
  K.coverFor(w.battle, a, near, threat, 12);
  check('a change of geometry invalidates the cache', st().coverSearches === n2 + 1);
  c.dead = true; // the claimant falls: the claim lapses without anyone releasing it
  const back = K.coverFor(w.battle, a, { x: 1.2, z: -2.1 }, { x: 40, z: 70 }, 12);
  check("a dead man's claim lapses by itself", !!back, back ? 'claim ' + back.claim : 'none');
  c.dead = false;
  /* The flag. */
  const man = a,
    place = (x, z) => {
      man.root.position.x = x;
      man.root.position.z = z;
    };
  w.battle.obstacles.length = 0;
  place(0, -60);
  const clear = K.flagSeen(man, w.battle, OBJ_A);
  place(0, -130);
  const far = K.flagSeen(man, w.battle, OBJ_A);
  place(0, -60);
  w.battle.obstacles.push({ x: 0, z: -30, y: 0, radius: 4, cover: 0.2, height: 9, type: 'wall' });
  const masked = K.flagSeen(man, w.battle, OBJ_A);
  check(
    'the flag is seen in range and in plain sight only',
    clear === true && far === false && masked === false,
    'clear ' + clear + ', beyond range ' + far + ', behind a tall wall ' + masked
  );
  const src = f => fs.readFileSync(path.join(F.H.REPO, 'battle/modules', f), 'utf8'),
    reads = f => (src(f).match(/objectiveControl/g) || []).length,
    strategic = src('11y-ai-v2-strategic.js'),
    briefing = strategic.slice(
      strategic.indexOf('function objectives(sim)'),
      strategic.indexOf('function sideOf(')
    ),
    outside = reads('11y-ai-v2-strategic.js') - (briefing.match(/objectiveControl/g) || []).length;
  check(
    'the squad mind never reads objective ownership; the commander reads it once, for the briefing',
    reads('11x-ai-v2-tactical.js') === 0 && outside === 0 && briefing.length > 0,
    'tactical ' +
      reads('11x-ai-v2-tactical.js') +
      ' reads; strategic ' +
      outside +
      ' outside objectives(), which runs when the side is created'
  );
}

console.log(
  '\n' + (checks - failures) + '/' + checks + ' checks passed' + (failures ? ', ' + failures + ' FAILED' : '')
);
process.exit(failures ? 1 : 0);
