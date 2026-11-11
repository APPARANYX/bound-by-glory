/* AI V2 kernel (experimental, `?ai=v2`; absent or any other value: this file is inert).

   One chain of command replaces the Macro / Meso / Engagement decision stack:

     Side command (11y)  --mission-->  Squad mind (11x)  --task-->  Soldier brain (11w)  --move-->  Movement Resolver
            ^------------- sitrep -----------'    ^------- report ---------'

   The kernel owns what the three layers share and nothing else:
     - the per-battle world (`battle._aiV2`): epoch, deterministic serials, statistics, ledger;
     - the mailbox: every order and report is a message with a delivery delay (voice, shout, radio).
       A layer learns what another layer knows only through a delivered message;
     - the order contract: one record per mission/task with an explicit lifecycle
       (issued -> adopted -> arrived -> done | failed | cancelled | superseded | expired);
     - lifecycle: a restart or a rewound clock starts a new epoch; a record or a message of an older
       epoch is dropped where it is read, so nothing stale can be adopted.

   Each layer wakes on events (a delivered message, a casualty, an arrival, a lost target) and on a
   slow staggered heartbeat, never because a tick passed. The soldier's reflex pass (fire, stance,
   going to ground) is the only work done every AI tick. */
(function (root) {
  'use strict';
  if (root.BattleAIV2) return;

  function searchOf() {
    return (
      (root.location && root.location.search) || (typeof location !== 'undefined' && location.search) || ''
    );
  }
  function parse(search) {
    return /[?&]ai=v2(?:&|#|$)/i.test(search || '');
  }
  var ON = parse(searchOf());
  /* Probe only (`scripts/probes/probe_ai_v2_cost.cjs`): `?v2Ablate=think,resolve,cover` switches one
     mechanism off so its cost can be measured in isolation. Never set in play. */
  var ABLATE = {};
  (/[?&]v2Ablate=([\w,]+)/.exec(searchOf()) || ['', ''])[1].split(',').forEach(function (k) {
    if (k) ABLATE[k] = true;
  });

  var TERMINAL = { done: 1, failed: 1, cancelled: 1, superseded: 1, expired: 1 },
    NEXT = {
      issued: { adopted: 1, arrived: 1, done: 1, cancelled: 1, superseded: 1, expired: 1, failed: 1 },
      adopted: { arrived: 1, done: 1, failed: 1, cancelled: 1, superseded: 1 },
      arrived: { done: 1, failed: 1, cancelled: 1, superseded: 1 }
    },
    LEDGER_MAX = 600;

  function fresh(battle) {
    battle._aiV2Epoch = (battle._aiV2Epoch || 0) + 1;
    return {
      battle: battle,
      epoch: battle._aiV2Epoch,
      serial: 0,
      tickAt: -1,
      lastTime: +battle.time || 0,
      mail: [],
      claims: {},
      sides: {},
      ledger: [],
      stats: {
        ticks: 0,
        sent: 0,
        delivered: 0,
        dropped: 0,
        requeued: 0,
        orders: {},
        transitions: {},
        soldierTicks: 0,
        deliberations: 0,
        coverSearches: 0,
        coverCacheHits: 0,
        resolves: 0,
        resolveSkips: 0,
        squadTicks: 0,
        squadThinks: 0,
        sideTicks: 0,
        sidePlans: 0,
        aimedTriggers: 0,
        areaTriggers: 0,
        reports: 0,
        sitreps: 0,
        foreignDestinationWrites: 0
      }
    };
  }
  function world(battle) {
    var w = battle._aiV2;
    /* A clock that ran backwards is a restart the hooks did not announce (the Node harness has none). */
    if (!w || w.battle !== battle || (+battle.time || 0) < w.lastTime - 1e-6)
      w = battle._aiV2 = fresh(battle);
    return w;
  }
  function reset(battle) {
    if (battle) battle._aiV2 = fresh(battle);
  }
  function note(w, type, data) {
    var row = data || {};
    row.t = +(+w.battle.time || 0).toFixed(2);
    row.type = type;
    w.ledger.push(row);
    if (w.ledger.length > LEDGER_MAX) w.ledger.splice(0, w.ledger.length - LEDGER_MAX);
  }

  /* ---- orders ----
     An order exists as three separate things, so that nothing but a delivered message can change what
     an actor knows:
       - the issuer's record (`order`): what he ordered and what he has since been told about it;
       - the brief (`brief`): a frozen copy that travels in the mailbox;
       - the holder's record (`hold`): the receiver's own copy, with the receiver's own lifecycle.
     The issuer learns of adoption and arrival by a report; the holder learns of a retask or a
     cancellation when that message reaches him, and keeps working the old task until it does. */
  function order(w, level, kind, fields) {
    var o = fields || {};
    o.id = ++w.serial;
    o.epoch = w.epoch;
    o.level = level;
    o.kind = kind;
    o.status = 'issued';
    o.issuedAt = +w.battle.time || 0;
    var key = level + ':' + kind;
    w.stats.orders[key] = (w.stats.orders[key] || 0) + 1;
    return o;
  }
  var PRIVATE = { status: 1, issuedAt: 1, reason: 1, held: 1 };
  function copyValue(v, freeze) {
    if (v === null || typeof v !== 'object') return v;
    var out = {};
    for (var k in v) if (Object.prototype.hasOwnProperty.call(v, k)) out[k] = copyValue(v[k], freeze);
    return freeze ? Object.freeze(out) : out;
  }
  function payload(o, freeze) {
    var out = {};
    for (var k in o)
      if (Object.prototype.hasOwnProperty.call(o, k) && !PRIVATE[k] && !/At$/.test(k))
        out[k] = copyValue(o[k], freeze);
    return out;
  }
  function brief(o) {
    return Object.freeze(payload(o, true));
  }
  function hold(w, b) {
    var h = payload(b, false);
    h.held = true;
    h.status = 'adopted';
    h.adoptedAt = +w.battle.time || 0;
    count(w, h, 'adopted');
    if (h.level === 'mission')
      note(w, 'order', { id: h.id, level: h.level, kind: h.kind, to: h.to, status: 'adopted' });
    return h;
  }
  function count(w, o, status) {
    /* The holder's transitions are what physically happened; the issuer's are what he was told. */
    var key = (o.held ? '' : 'issuer:') + o.level + ':' + status;
    w.stats.transitions[key] = (w.stats.transitions[key] || 0) + 1;
  }
  function live(o) {
    return !!(o && !TERMINAL[o.status]);
  }
  function advance(w, o, status, reason) {
    if (!o || o.epoch !== w.epoch) return false;
    if (o.status === status) return false;
    if (TERMINAL[o.status]) return false;
    if (!NEXT[o.status] || !NEXT[o.status][status])
      throw new Error(
        'AI V2 illegal ' + o.level + ' transition ' + o.status + ' -> ' + status + ' (#' + o.id + ')'
      );
    o.status = status;
    o[status + 'At'] = +w.battle.time || 0;
    if (reason) o.reason = reason;
    count(w, o, status);
    if (o.held && (o.level === 'mission' || status === 'failed'))
      note(w, 'order', {
        id: o.id,
        level: o.level,
        kind: o.kind,
        to: o.to,
        status: status,
        reason: reason || null
      });
    return true;
  }

  /* ---- mailbox ---- */
  var handlers = {};
  function send(w, msg, delay) {
    msg.seq = ++w.serial;
    msg.epoch = w.epoch;
    msg.sentAt = +w.battle.time || 0;
    msg.at = msg.sentAt + Math.max(0, +delay || 0);
    msg.tries = 0;
    insert(w.mail, msg);
    w.stats.sent++;
    return msg;
  }
  function insert(mail, msg) {
    var lo = 0,
      hi = mail.length;
    while (lo < hi) {
      var mid = (lo + hi) >> 1,
        m = mail[mid];
      if (m.at < msg.at || (m.at === msg.at && m.seq < msg.seq)) lo = mid + 1;
      else hi = mid;
    }
    mail.splice(lo, 0, msg);
  }
  function pump(w) {
    var t = +w.battle.time || 0,
      mail = w.mail;
    while (mail.length && mail[0].at <= t + 1e-9) {
      var msg = mail.shift(),
        handler = handlers[msg.to];
      if (msg.epoch !== w.epoch || !handler) {
        w.stats.dropped++;
        continue;
      }
      var out = handler(w, msg);
      if (out === 'later' && msg.tries < 8) {
        msg.tries++;
        msg.at = t + 2;
        insert(mail, msg);
        w.stats.requeued++;
      } else if (out === false || out === 'later') {
        /* Lost. The issuer is not told: he finds out the way he would in the field, by hearing nothing. */
        w.stats.dropped++;
      } else w.stats.delivered++;
    }
  }
  /* Once per AI tick, by whichever layer runs first. */
  function begin(battle) {
    var w = world(battle),
      t = +battle.time || 0;
    if (w.tickAt !== t) {
      w.tickAt = t;
      w.lastTime = t;
      w.stats.ticks++;
      pump(w);
    }
    return w;
  }

  /* ---- delays: how long a spoken, shouted or radioed message takes ---- */
  function voiceDelay(d) {
    if (d <= 30) return 0.3;
    if (d <= 90) return 0.8 + d / 60;
    return Math.min(20, 2 + d / 8); // hand signals, then a runner
  }
  function radioDelay(w) {
    return 2.5 + (w.serial % 5) * 0.2;
  }

  function dist(a, b) {
    var dx = a.x - b.x,
      dz = a.z - b.z;
    return Math.sqrt(dx * dx + dz * dz);
  }

  /* ---- the Movement Resolver's one proposal for a V2 soldier ---- */
  function movementProposal(soldier, battle, make) {
    var w = world(battle),
      b = soldier._v2,
      mv = b && b.epoch === w.epoch ? b.move : null,
      here = soldier.root.position,
      pt = mv ? mv.point : here,
      p = make('ai-v2', pt, battle, mv ? mv.kind : 'v2-post', true, Infinity);
    if (!p) return null;
    p.reason = mv ? mv.reason : 'no-command';
    p.intentPoint = { x: +pt.x, z: +pt.z };
    p.taskId = mv ? mv.taskId || null : null;
    return p;
  }

  function summary(battle) {
    var w = battle && battle._aiV2;
    if (!w) return null;
    var out = {
      on: ON,
      epoch: w.epoch,
      time: +w.battle.time || 0,
      pendingMail: w.mail.length,
      stats: w.stats
    };
    out.sides = {};
    Object.keys(w.sides).forEach(function (f) {
      var s = w.sides[f];
      out.sides[f] = {
        posture: s.posture,
        plans: s.plans,
        objectives: Object.keys(s.obj).map(function (id) {
          return { id: id, believedOwner: s.obj[id].owner, at: s.obj[id].at };
        }),
        squads: Object.keys(s.squads).map(function (id) {
          var q = s.squads[id];
          return {
            id: id,
            reported: q.reported,
            mission: q.mission ? { id: q.mission.id, kind: q.mission.kind, believedStatus: q.state } : null
          };
        }),
        contacts: s.contacts.length
      };
    });
    out.squads = [];
    ['us', 'ge'].forEach(function (f) {
      ((battle.factions && battle.factions[f] && battle.factions[f].squads) || []).forEach(function (sq) {
        var m = sq._v2;
        if (!m || m.epoch !== w.epoch) return;
        out.squads.push({
          id: sq.id,
          faction: f,
          phase: m.phase,
          leader: m.leaderId,
          mission: m.mission ? { id: m.mission.id, kind: m.mission.kind, status: m.mission.status } : null,
          contacts: m.book.length,
          bounds: m.bounds,
          boundsArrived: m.boundsArrived
        });
      });
    });
    return out;
  }

  root.BattleAIV2 = {
    version: '0.1-experimental',
    get on() {
      return ON;
    },
    /* Tests and the Node harness set the mode without a page query. */
    configure: function (search) {
      ON = typeof search === 'boolean' ? search : parse(search);
      return ON;
    },
    world: world,
    begin: begin,
    reset: reset,
    note: note,
    order: order,
    brief: brief,
    hold: hold,
    ablate: ABLATE,
    advance: advance,
    live: live,
    send: send,
    handlers: handlers,
    voiceDelay: voiceDelay,
    radioDelay: radioDelay,
    dist: dist,
    movementProposal: movementProposal,
    summary: summary,
    /* Filled by 11w / 11x / 11y. */
    soldierTick: null,
    squadTick: null,
    strategicTick: null
  };

  if (root.BattleModules && root.BattleModules.registerSystem)
    root.BattleModules.registerSystem('ai-v2', {
      version: '0.1',
      beforeBattleRestart: function (sim) {
        if (ON) reset(sim);
      }
    });
  if (ON && typeof root.GTLog === 'function')
    root.GTLog('[AI-V2] experimental chain-of-command AI active (rollback: drop ?ai=v2)');
})(typeof window !== 'undefined' ? window : globalThis);
