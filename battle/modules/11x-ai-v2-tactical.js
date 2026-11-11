/* AI V2 tactical layer: the squad mind (see 11v for the architecture).

   What the squad leader knows: the contact book (reports his men delivered to him, each a position at
   a time with its source; never a live enemy reference), which of his own men he has lost, the tasks he
   issued and whether they were adopted and reached, and the mission his commander's message carried.

   What the squad leader owns: the squad's phase (one explicit state machine) and one task per man.
   He issues tasks when the phase or the picture changes, not every tick, and each task travels to
   its man by voice. He reports upward (sitrep) on events and on a slow heartbeat.

     idle -> march -> contact -> assault (alternating fireteam bounds) -> secure
                         \-> withdraw -> rally          march -> defend | observe | hold

   A withdrawal fixes its rally point when it starts and keeps it until the squad has rallied; a
   secured objective is held until a new mission arrives. Succession: when the leader falls the next
   senior man takes over after a short gap in which the men keep the tasks they have. */
(function (root) {
  'use strict';
  var K = root.BattleAIV2;
  if (!K || K.squadTick) return;

  var THINK = 2.0,
    SITREP_EVERY = 25,
    CONTACT_FRESH = 22,
    CONTACT_KEEP = 50,
    CONTACT_RANGE = 240,
    ASSESS = 4,
    LEG = 70,
    BOUND = 22,
    BOUND_TIMEOUT = 14,
    BOUND_QUORUM = 0.6,
    SUPPORT_WAIT = 10,
    STANDOFF = 30,
    WITHDRAW_RATIO = 0.45,
    SUCCESSION = 3,
    RALLY_BACK = 140,
    REARGUARD_HOLD = 6,
    RALLY_HOLD = 10,
    UNDER_FIRE = 0.2;

  function mindOf(w, sq, battle) {
    var m = sq._v2;
    if (!m || m.epoch !== w.epoch) {
      var c = centre(sq) || sq.home;
      m = sq._v2 = {
        epoch: w.epoch,
        squad: sq,
        leaderId: null,
        successionAt: 0,
        mission: null,
        phase: 'idle',
        phaseSince: +battle.time || 0,
        route: [],
        leg: 0,
        legAt: 0,
        centreAt: { x: c.x, z: c.z },
        rallyPoint: { x: sq.home.x, z: sq.home.z },
        book: [],
        threat: null,
        firstContactAt: null,
        known: {},
        alive: 0,
        tasks: {},
        pinned: {},
        broken: {},
        teams: null,
        mover: 0,
        boundAt: 0,
        boundWaitSince: 0,
        bounds: 0,
        boundsArrived: 0,
        boundsOverwatch: 0,
        rearguardUntil: 0,
        thinkAt: 0,
        dirty: true,
        sitrepAt: -1e9,
        sitrepKey: '',
        secured: false,
        event: null
      };
    }
    return m;
  }
  function living(sq) {
    var out = [];
    for (var i = 0; i < sq.members.length; i++) if (!sq.members[i].dead) out.push(sq.members[i]);
    return out;
  }
  function centre(sq) {
    var x = 0,
      z = 0,
      n = 0;
    for (var i = 0; i < sq.members.length; i++) {
      var s = sq.members[i];
      if (s.dead) continue;
      x += s.root.position.x;
      z += s.root.position.z;
      n++;
    }
    return n ? { x: x / n, z: z / n } : null;
  }
  function unit(a, b) {
    var dx = b.x - a.x,
      dz = b.z - a.z,
      l = Math.sqrt(dx * dx + dz * dz);
    return l > 1e-6 ? { x: dx / l, z: dz / l, l: l } : { x: 0, z: 1, l: 0 };
  }
  function fit(m, s) {
    return !s.dead && !s.isPlayer && !m.broken[s.id];
  }

  /* ---- messages in ---- */
  K.handlers.squad = function (w, msg) {
    var sq = msg.squad;
    if (!sq || !sq._v2 || sq._v2.epoch !== w.epoch) return false;
    var m = sq._v2,
      t = +w.battle.time || 0;
    if (msg.kind === 'mission') {
      var br = msg.brief;
      if (!br || br.id <= (m.seenMission || 0)) return true; // an older brief that arrived late
      if (!leader(w, m, sq, t)) return 'later'; // nobody to take the brief yet
      if (K.live(m.mission)) K.advance(w, m.mission, 'superseded', 'new-mission');
      var o = (m.mission = K.hold(w, br)); // the squad's own copy; the commander's record is his
      m.seenMission = br.id;
      m.event = 'mission-adopted';
      /* A squad that is pulling back finishes pulling back: the new brief is taken up from the rally point. */
      if (m.phase !== 'withdraw' && m.phase !== 'rally') {
        enter(w, m, 'march', 'mission ' + o.kind);
        planRoute(m, o);
      }
      m.secured = false;
      m.dirty = true;
      publish(m, sq, t);
      /* The existing transport owner decides whether this brief earns a truck; it reads the published record. */
      var T = root.BattleSquadTransport;
      if (T && T.considerMission && sq._macroMission && sq._macroMission.owner === 'ai-v2')
        T.considerMission(w.battle, sq, sq._macroMission);
      return true;
    }
    if (msg.kind === 'contact') {
      var book = m.book,
        hit = null;
      for (var i = 0; i < book.length; i++)
        if (Math.abs(book[i].x - msg.x) < 15 && Math.abs(book[i].z - msg.z) < 15) {
          hit = book[i];
          break;
        }
      if (!hit) {
        hit = { x: msg.x, z: msg.z, at: msg.at, source: msg.source, by: msg.by, reports: 0 };
        book.push(hit);
        m.dirty = true;
      } else if (msg.at >= hit.at) {
        if (t - hit.at > 6) m.dirty = true;
        hit.x = msg.x;
        hit.z = msg.z;
        hit.at = msg.at;
        hit.source = msg.source === 'seen' ? 'seen' : hit.source;
        hit.by = msg.by;
      }
      hit.reports++;
      if (m.firstContactAt == null) m.firstContactAt = t;
      return true;
    }
    var mine = m.tasks[msg.by];
    if (msg.kind === 'status') {
      if (msg.what === 'pinned') m.pinned[msg.by] = t;
      else if (msg.what === 'broke') {
        m.broken[msg.by] = t;
        if (K.live(mine)) K.advance(w, mine, 'failed', 'man-broke');
      } else if (msg.what === 'recovered') delete m.broken[msg.by];
      m.dirty = true;
      return true;
    }
    /* What his men tell him about the tasks he gave: until then his record says only 'issued'. */
    if (msg.kind === 'ack' || msg.kind === 'arrived' || msg.kind === 'refused') {
      if (mine && mine.id === msg.task && K.live(mine)) {
        if (msg.kind === 'ack') {
          if (mine.status === 'issued') K.advance(w, mine, 'adopted'); // a man who ran in can report arrival first
        } else if (msg.kind === 'arrived') {
          K.advance(w, mine, 'arrived');
          m.dirty = true;
        } else K.advance(w, mine, 'failed', 'refused');
      }
      return true;
    }
    /* A man who can see the flag says who holds the objective. */
    if (msg.kind === 'objective') {
      var seen = m.observedObjective,
        mission = K.live(m.mission) ? m.mission : null;
      if (!seen || seen.id !== msg.id || seen.owner !== msg.owner) m.dirty = true;
      m.observedObjective = { id: msg.id, owner: msg.owner, at: msg.at, by: msg.by };
      if (
        mission &&
        mission.kind === 'seize' &&
        mission.objectiveId === msg.id &&
        msg.owner === sq.faction &&
        !m.secured
      ) {
        m.secured = true;
        K.advance(w, mission, 'done', 'objective secured');
        m.event = 'objective-secured';
      }
      return true;
    }
    return true;
  };

  function leader(w, m, sq, t) {
    var S = root.SquadAI,
      L = S.leaderOf(sq);
    if (L && !L.isPlayer) {
      m.leaderId = L.id;
      m.successionAt = 0;
      return L;
    }
    /* The named leader is down (or possessed by the player): the next senior man takes over. */
    var next = S.mostSenior(
      sq.members.filter(function (s) {
        return !s.dead && !s.isPlayer;
      })
    );
    if (!next) return null;
    if (L && L.isPlayer) return next;
    if (!m.successionAt) {
      m.successionAt = t + SUCCESSION;
      K.note(w, 'succession-start', { squad: sq.id });
      return null;
    }
    if (t < m.successionAt) return null;
    sq.leaderId = next.id;
    m.leaderId = next.id;
    K.note(w, 'succession', { squad: sq.id, leader: next.id });
    m.successionAt = 0;
    m.dirty = true;
    m.event = 'new-leader';
    return next;
  }

  /* ---- tasks out ---- */
  function issue(w, m, L, s, kind, fields) {
    var old = m.tasks[s.id],
      th = fields.threat;
    if (
      K.live(old) &&
      old.kind === kind &&
      K.dist(old.point, fields.point) <= 1.5 &&
      !!old.threat === !!th &&
      (!th || K.dist(old.threat, th) <= 20)
    ) {
      if (th) old.threat.at = th.at;
      return old;
    }
    if (K.live(old)) K.advance(w, old, old.status === 'arrived' ? 'done' : 'superseded', 'leader-retask');
    fields.to = s.id;
    fields.squad = m.squad.id;
    fields.mission = m.mission ? m.mission.id : null;
    var o = K.order(w, 'task', kind, fields);
    m.tasks[s.id] = o;
    K.send(
      w,
      { to: 'soldier', soldier: s, brief: K.brief(o) },
      s === L ? 0 : K.voiceDelay(K.dist(L.root.position, s.root.position))
    );
    return o;
  }
  function cancelTasks(w, m, reason) {
    /* His own records end now; each man learns of it when the word reaches him. */
    m.squad.members.forEach(function (s) {
      var o = m.tasks[s.id];
      if (!K.live(o)) return;
      K.advance(w, o, 'cancelled', reason);
      if (!s.dead)
        K.send(
          w,
          { to: 'soldier', soldier: s, brief: Object.freeze({ id: o.id, cancel: true, why: reason }) },
          K.voiceDelay(20)
        );
    });
    m.tasks = {};
  }
  function enter(w, m, phase, why) {
    if (m.phase === phase) return;
    K.note(w, 'phase', { squad: m.squad.id, from: m.phase, to: phase, why: why || null });
    m.phase = phase;
    m.phaseSince = +w.battle.time || 0;
    m.teams = null;
    m.legAt = 0;
    m.boundAt = 0;
    m.boundWaitSince = 0;
    m.dirty = true;
    m.event = m.event || 'phase-' + phase;
  }

  /* Wedge slots around a point, leader at the tip. */
  function slot(i, c, h, spacing) {
    var rank = (i + 1) >> 1,
      side = i % 2 ? 1 : -1,
      lat = rank * spacing * side,
      back = rank * spacing * 0.7;
    return { x: c.x + h.z * lat - h.x * back, z: c.z - h.x * lat - h.z * back };
  }
  function line(i, n, c, h, spacing) {
    var lat = (i - (n - 1) / 2) * spacing;
    return { x: c.x + h.z * lat, z: c.z - h.x * lat };
  }
  function ring(i, n, c, r, facing) {
    var a = facing + ((i + 0.5) / n - 0.5) * Math.PI * 1.5;
    return { x: c.x + Math.sin(a) * r, z: c.z + Math.cos(a) * r };
  }

  function planRoute(m, o) {
    var from = centre(m.squad) || m.centreAt,
      u = unit(from, o.point),
      n = Math.max(1, Math.ceil(u.l / LEG)),
      route = [];
    for (var i = 1; i <= n; i++)
      route.push({ x: from.x + (u.x * u.l * i) / n, z: from.z + (u.z * u.l * i) / n });
    m.route = route;
    m.leg = 0;
    m.legAt = 0;
    m.origin = { x: from.x, z: from.z };
  }

  function arrivedShare(m, men) {
    var n = 0,
      ok = 0;
    for (var i = 0; i < men.length; i++) {
      var o = m.tasks[men[i].id];
      if (!o) continue;
      n++;
      if (o.status === 'arrived' || o.status === 'done') ok++;
    }
    return n ? ok / n : 1;
  }

  /* The squad's picture of the enemy: the freshest reported position near enough to matter. */
  function assess(m, t, c) {
    var book = m.book,
      best = null;
    for (var i = book.length - 1; i >= 0; i--) {
      var e = book[i];
      if (t - e.at > CONTACT_KEEP) {
        book.splice(i, 1);
        continue;
      }
      if (t - e.at > CONTACT_FRESH || K.dist(c, e) > CONTACT_RANGE) continue;
      if (!best || e.at > best.at || (e.at === best.at && K.dist(c, e) < K.dist(c, best))) best = e;
    }
    m.threat = best ? { x: best.x, z: best.z, at: best.at } : null;
    return m.threat;
  }

  function teams(m, men) {
    /* Two fireteams by slot; the machine gun stays with the first base of fire. */
    var S = root.SquadAI,
      a = [],
      b = [];
    men
      .slice()
      .sort(function (x, y) {
        return x.slotIndex - y.slotIndex;
      })
      .forEach(function (s, i) {
        (S.isMachineGun(s) ? b : i % 2 ? b : a).push(s.id);
      });
    if (!a.length && b.length > 1) a.push(b.pop());
    m.teams = [a, b];
    m.mover = 0;
  }
  function supportReady(m, sq, ids, threat, battle) {
    var S = root.SquadAI,
      n = 0,
      able = 0;
    for (var i = 0; i < sq.members.length; i++) {
      var s = sq.members[i];
      if (ids.indexOf(s.id) < 0 || !fit(m, s)) continue;
      n++;
      if (s.suppressedUntil > battle.time && s.prone && !s.target) continue;
      if (s.target || S.canSuppress(s, threat, battle, true)) able++;
    }
    return able >= Math.min(2, n) && able > 0;
  }

  function think(w, m, sq, battle, L) {
    var t = battle.time,
      men = living(sq).filter(function (s) {
        return fit(m, s);
      }),
      c = centre(sq) || m.centreAt,
      est = root.SquadAI.establishment(sq),
      ratio = m.alive / est,
      mission = K.live(m.mission) ? m.mission : null,
      threat = assess(m, t, c),
      fireSupport = false,
      i;
    w.stats.squadThinks++;
    m.dirty = false;
    m.thinkAt = t + THINK + (Math.abs(hash(sq.id)) % 7) * 0.11;
    m.centreAt = { x: c.x, z: c.z };
    men.sort(function (a, b) {
      return a === L ? -1 : b === L ? 1 : a.slotIndex - b.slotIndex;
    });
    Object.keys(m.pinned).forEach(function (id) {
      if (t - m.pinned[id] > 8) delete m.pinned[id];
    });
    var goal = mission ? mission.point : m.centreAt,
      face = threat || goal,
      h = unit(c, face);
    /* How far the squad can fight: the leader knows his own weapons. */
    var ranges = men
      .map(function (s) {
        return root.SquadAI.engageRange(s) || 0;
      })
      .sort(function (a, b) {
        return a - b;
      });
    m.reach = (ranges[ranges.length >> 1] || 150) * 0.85;
    var inReach = !!threat && K.dist(c, threat) <= m.reach;

    /* -- transitions -- */
    var pinnedShare = men.length ? Object.keys(m.pinned).length / men.length : 0;
    if (m.phase !== 'withdraw' && m.phase !== 'rally' && m.phase !== 'idle') {
      if (
        ratio < (mission && mission.kind === 'defend' ? WITHDRAW_RATIO * 0.55 : WITHDRAW_RATIO) &&
        (threat || m.phase === 'contact' || m.phase === 'assault') &&
        /* A squad that has already pulled back and rallied goes again only if it has lost more men since. */
        (m.rallyStrength == null || m.alive < m.rallyStrength)
      ) {
        /* The rally point is chosen once, behind the squad along the way it came, and kept. */
        var back = unit(threat || goal, m.origin || sq.home),
          from = c,
          away = threat ? unit(threat, c) : back;
        m.rallyPoint = { x: from.x + away.x * RALLY_BACK, z: from.z + away.z * RALLY_BACK };
        if (K.dist(m.rallyPoint, sq.home) > K.dist(c, sq.home) + 20)
          m.rallyPoint = { x: sq.home.x, z: sq.home.z };
        m.rearguardUntil = t + REARGUARD_HOLD;
        enter(w, m, 'withdraw', 'strength ' + m.alive + '/' + est);
        if (mission) K.advance(w, mission, 'failed', 'combat-ineffective');
        mission = null;
      }
    }
    /* A reported enemy beyond the squad's reach is approached, not stared at. */
    if (m.phase === 'march' && (inReach || (threat && pinnedShare >= UNDER_FIRE)))
      enter(w, m, 'contact', inReach ? 'contact in reach' : 'under fire');
    if (m.phase === 'contact') {
      if (mission && mission.kind === 'recon') {
        /* The reconnaissance found what it was sent to find. */
        K.advance(w, mission, 'done', 'contact observed');
        m.event = 'recon-report';
        mission = null;
      }
      if (!threat && t - m.phaseSince > ASSESS) enter(w, m, mission ? 'march' : 'idle', 'contact lost');
      else if (
        mission &&
        mission.kind === 'seize' &&
        t - m.phaseSince >= ASSESS &&
        men.length >= 4 &&
        pinnedShare < 0.6 &&
        K.dist(c, threat || goal) > STANDOFF
      )
        enter(w, m, 'assault', 'base of fire set');
    }
    if (m.phase === 'assault') {
      if (!mission || mission.kind !== 'seize') enter(w, m, 'contact', 'mission changed');
      else if (!threat) enter(w, m, 'march', 'contact lost');
      else if (men.length < 4 || pinnedShare >= 0.75) enter(w, m, 'contact', 'cannot manoeuvre');
    }
    if (m.phase === 'march' && mission && m.route.length && m.leg >= m.route.length) {
      enter(
        w,
        m,
        { seize: 'secure', defend: 'defend', recon: 'observe', reserve: 'hold', withdraw: 'rally' }[
          mission.kind
        ] || 'hold',
        'route complete'
      );
    }
    if (m.phase === 'withdraw' && K.dist(c, m.rallyPoint) <= 14 && t >= m.rearguardUntil) {
      enter(w, m, 'rally', 'reached rally');
      m.rallyStrength = m.alive;
    }
    if (m.phase === 'rally' && mission && t - m.phaseSince >= RALLY_HOLD) {
      if (ratio < WITHDRAW_RATIO && (mission.kind === 'seize' || mission.kind === 'recon')) {
        /* A remnant does not go back in: it declines the attack, says why, and holds the rally point. */
        K.advance(w, mission, 'failed', 'combat-ineffective');
        m.event = 'mission-declined';
        mission = null;
      } else {
        enter(w, m, 'march', 'rallied, mission ' + mission.kind);
        planRoute(m, mission);
      }
    }

    /* -- tasks for the phase -- */
    var th = threat ? { x: threat.x, z: threat.z, at: threat.at } : null;
    if (m.phase === 'march' && mission) {
      var target = m.route[m.leg],
        quorum = arrivedShare(m, men);
      if (m.legAt && (quorum >= BOUND_QUORUM || t - m.legAt > LEG / 1.2 + 12)) {
        m.leg++;
        m.legAt = 0;
        target = m.route[m.leg];
        if (!target) {
          m.dirty = true;
          return;
        }
      }
      if (!m.legAt) {
        m.legAt = t;
        var hh = unit(c, target),
          pace = mission.kind === 'recon' ? 'stalk' : 'walk';
        for (i = 0; i < men.length; i++)
          issue(w, m, L, men[i], 'move', { point: slot(i, target, hh, 4.5), pace: pace });
      }
    } else if (m.phase === 'contact' || m.phase === 'observe') {
      var roe = m.phase === 'observe' && (!threat || K.dist(c, threat) > 70) ? 'hold-fire' : null;
      for (i = 0; i < men.length; i++) {
        var cur = m.tasks[men[i].id],
          at = K.live(cur) && !cur.pace ? cur.point : men[i].root.position;
        issue(w, m, L, men[i], roe ? 'hold' : 'cover', {
          point: { x: at.x, z: at.z },
          leash: 12,
          threat: th,
          roe: roe
        });
      }
      if (m.phase === 'observe' && mission && (threat || t - m.phaseSince > 60)) {
        K.advance(w, mission, 'done', threat ? 'contact observed' : 'nothing seen');
        m.event = 'recon-report';
      }
    } else if (m.phase === 'assault') {
      if (!m.teams) teams(m, men);
      var movers = men.filter(function (s) {
          return m.teams[m.mover].indexOf(s.id) >= 0;
        }),
        support = m.teams[1 - m.mover],
        share = arrivedShare(m, movers);
      if (!m.boundAt || share >= BOUND_QUORUM || t - m.boundAt > BOUND_TIMEOUT) {
        if (m.boundAt) {
          if (share >= BOUND_QUORUM) m.boundsArrived++;
          m.mover = 1 - m.mover;
          movers = men.filter(function (s) {
            return m.teams[m.mover].indexOf(s.id) >= 0;
          });
          support = m.teams[1 - m.mover];
          m.boundAt = 0;
        }
        if (!movers.length) {
          m.teams = null;
          m.dirty = true;
        } else if (
          /* A bound needs a real base of fire when the enemy is within the squad's reach. Beyond it nobody
             can suppress, and the squad closes by bounding overwatch; the same when no base of fire can be
             had from here and the enemy is not hurting the squad. */
          (fireSupport = supportReady(m, sq, support, threat, battle)) ||
          !inReach ||
          (m.boundWaitSince && t - m.boundWaitSince > SUPPORT_WAIT && pinnedShare < UNDER_FIRE)
        ) {
          var mc = { x: 0, z: 0 };
          movers.forEach(function (s) {
            mc.x += s.root.position.x / movers.length;
            mc.z += s.root.position.z / movers.length;
          });
          var u = unit(mc, threat),
            step = Math.min(BOUND, Math.max(0, u.l - STANDOFF)),
            bp = { x: mc.x + u.x * step, z: mc.z + u.z * step };
          if (step < 4) {
            /* Close enough: the squad fights from where it is until the contact breaks. */
            enter(w, m, 'contact', 'at standoff');
          } else {
            m.boundAt = t;
            m.boundWaitSince = 0;
            m.bounds++;
            if (!fireSupport) m.boundsOverwatch++;
            K.note(w, 'bound', {
              squad: sq.id,
              team: m.mover,
              men: movers.length,
              step: +step.toFixed(1),
              support: fireSupport ? 'fire' : 'overwatch'
            });
            for (i = 0; i < movers.length; i++)
              issue(w, m, L, movers[i], 'bound', {
                point: line(i, movers.length, bp, u, 5),
                pace: 'run',
                threat: th
              });
            men.forEach(function (s) {
              if (support.indexOf(s.id) < 0) return;
              var cur = m.tasks[s.id],
                at = K.live(cur) && !cur.pace ? cur.point : s.root.position;
              issue(w, m, L, s, 'suppress', { point: { x: at.x, z: at.z }, leash: 6, threat: th });
            });
          }
        } else {
          /* No real base of fire: nobody moves. */
          if (!m.boundWaitSince) m.boundWaitSince = t;
          else if (t - m.boundWaitSince > SUPPORT_WAIT) enter(w, m, 'contact', 'no base of fire');
        }
      }
    } else if (m.phase === 'secure' || m.phase === 'defend' || m.phase === 'hold') {
      var r = Math.min(16, Math.max(8, ((mission && mission.radius) || 20) * 0.6)),
        posts = stablePosts(
          m,
          men,
          goal,
          r,
          threat || (m.origin ? { x: 2 * goal.x - m.origin.x, z: 2 * goal.z - m.origin.z } : goal)
        );
      for (i = 0; i < men.length; i++)
        issue(w, m, L, men[i], 'defend', {
          point: posts[men[i].id],
          leash: 9,
          threat: th,
          watch:
            mission && mission.objectiveId
              ? { id: mission.objectiveId, x: mission.point.x, z: mission.point.z }
              : null
        });
    } else if (m.phase === 'withdraw') {
      var guard = t < m.rearguardUntil && threat,
        hb = unit(m.rallyPoint, c);
      for (i = 0; i < men.length; i++) {
        var holds = guard && (root.SquadAI.isMachineGun(men[i]) || i === 0);
        if (holds)
          issue(w, m, L, men[i], 'suppress', {
            point: { x: men[i].root.position.x, z: men[i].root.position.z },
            leash: 5,
            threat: th
          });
        else
          issue(w, m, L, men[i], 'fallback', {
            point: line(i, men.length, m.rallyPoint, hb, 4),
            pace: 'run'
          });
      }
      if (guard) m.thinkAt = Math.min(m.thinkAt, m.rearguardUntil + 0.05);
    } else if (m.phase === 'rally') {
      var rp = stablePosts(m, men, m.rallyPoint, 7, threat || goal);
      for (i = 0; i < men.length; i++)
        issue(w, m, L, men[i], 'defend', { point: rp[men[i].id], leash: 8, threat: th });
    }
  }
  /* Posts around a point, facing a direction: laid out once and kept while the place, the facing sector
     and the men are the same, so a wake does not re-task anyone. */
  function stablePosts(m, men, at, r, toward) {
    var h = unit(at, toward),
      sector = h.l > 1 ? Math.round(Math.atan2(h.x, h.z) / (Math.PI / 4)) : 0,
      key = [m.phase, Math.round(at.x), Math.round(at.z), r, sector, men.length].join('|');
    if (m.posts && m.posts.key === key) {
      var all = true;
      for (var k = 0; k < men.length; k++) if (!m.posts.points[men[k].id]) all = false;
      if (all) return m.posts.points;
    }
    var points = {};
    for (var i = 0; i < men.length; i++)
      points[men[i].id] = ring(i, men.length, at, r, sector * (Math.PI / 4));
    m.posts = { key: key, points: points };
    return points;
  }
  function hash(id) {
    var s = String(id),
      h = 0;
    for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return h;
  }

  function sitrep(w, m, sq, L, t) {
    var key = [
      m.phase,
      m.alive,
      m.mission ? m.mission.id + m.mission.status : '',
      m.threat ? 1 : 0,
      m.event || ''
    ].join('|');
    if (!m.event && key === m.sitrepKey && t - m.sitrepAt < SITREP_EVERY) return;
    if (!m.event && t - m.sitrepAt < 3) return;
    m.sitrepKey = key;
    m.sitrepAt = t;
    var p = L.root.position,
      contacts = m.book
        .filter(function (e) {
          return t - e.at <= CONTACT_FRESH;
        })
        .slice(-3)
        .map(function (e) {
          return { x: e.x, z: e.z, at: e.at, source: e.source };
        });
    w.stats.sitreps++;
    K.send(
      w,
      {
        to: 'side',
        faction: sq.faction,
        kind: 'sitrep',
        squad: sq.id,
        x: p.x,
        z: p.z,
        strength: m.alive,
        establishment: root.SquadAI.establishment(sq),
        phase: m.phase,
        event: m.event,
        mission: m.mission
          ? { id: m.mission.id, status: m.mission.status, reason: m.mission.reason || null }
          : null,
        contacts: contacts,
        objective: m.observedObjective && t - m.observedObjective.at < 30 ? m.observedObjective : null
      },
      K.radioDelay(w)
    );
    m.event = null;
  }

  /* The read model other systems look at (overlays, transport, perception's contact call). The squad
     mind is its only writer under V2. */
  function publish(m, sq, t) {
    var mission = m.mission;
    sq.aliveCount = m.alive;
    sq.state = m.phase === 'withdraw' || m.phase === 'rally' ? 'retreat' : m.threat ? 'engaged' : 'advance';
    sq.inContact = !!m.threat;
    sq.contactSince = m.threat ? (sq.contactSince == null ? t : sq.contactSince) : null;
    /* The anchor pair has one writer (the retreat-anchor owner's publisher); V2 hands it the point. */
    var A = root.BattleSquadStability;
    if (A && A.publishAnchor) {
      var at = m.phase === 'withdraw' || m.phase === 'rally' ? m.rallyPoint : m.centreAt;
      if (!sq.orderAnchor || sq.orderAnchor.x !== at.x || sq.orderAnchor.z !== at.z) A.publishAnchor(sq, at);
    }
    if (mission) {
      sq.objective = mission.point;
      sq.targetObjective = mission.objectiveId || null;
    }
    sq.v2Phase = m.phase;
    /* The mission record the transport owner and the overlays read keeps its one writer file
       (commander-ai.js); the squad mind hands it the mission it adopted. */
    var C = root.BattleCommanderAI;
    if (mission && C && C.publishAdoptedMission) {
      var rec = sq._macroMission,
        status = K.live(mission)
          ? 'executing'
          : mission.status === 'done'
            ? 'complete'
            : mission.status === 'failed'
              ? 'failed'
              : 'superseded';
      if (!rec || rec.owner !== 'ai-v2' || rec.version !== mission.id || rec.status !== status)
        C.publishAdoptedMission(sq, {
          version: mission.id,
          owner: 'ai-v2',
          status: status,
          intent: mission.kind,
          action: mission.kind,
          objectiveId: mission.objectiveId || null,
          point: { x: mission.point.x, z: mission.point.z },
          route: m.route.slice(),
          role: mission.kind,
          acceptedAt: mission.adoptedAt,
          key: 'ai-v2:' + mission.id
        });
    }
  }

  function squadTick(sq, battle) {
    var w = K.begin(battle),
      m = mindOf(w, sq, battle),
      t = battle.time,
      alive = 0,
      i;
    w.stats.squadTicks++;
    /* Own casualties: the leader notices a man down (cheap sweep; the rest waits for a wake). */
    for (i = 0; i < sq.members.length; i++) {
      var s = sq.members[i];
      if (s.dead) {
        if (!m.known[s.id]) {
          m.known[s.id] = t;
          m.dirty = true;
          m.event = m.event || 'casualty';
          var o = m.tasks[s.id];
          if (K.live(o)) K.advance(w, o, 'failed', 'man-down');
          delete m.tasks[s.id];
          delete m.pinned[s.id];
          delete m.broken[s.id];
        }
      } else alive++;
    }
    m.alive = alive;
    if (!alive) {
      if (K.live(m.mission)) K.advance(w, m.mission, 'failed', 'squad-destroyed');
      cancelTasks(w, m, 'squad-destroyed');
      publish(m, sq, t);
      return;
    }
    /* A carrier owns the men while they board, ride and dismount; the squad mind hands them over
       whole and takes them back whole. */
    var tr = sq._transport;
    if (tr && (tr.phase === 'boarding' || tr.phase === 'embarked' || tr.phase === 'disembarking')) {
      if (m.phase !== 'transport') {
        cancelTasks(w, m, 'transport');
        enter(w, m, 'transport', tr.phase);
      }
      publish(m, sq, t);
      return;
    }
    if (m.phase === 'transport') {
      enter(w, m, K.live(m.mission) ? 'march' : 'idle', 'dismounted');
      if (K.live(m.mission)) planRoute(m, m.mission);
    }
    var L = leader(w, m, sq, t);
    if (L && (m.dirty || t >= m.thinkAt)) {
      think(w, m, sq, battle, L);
      if (m.dirty) think(w, m, sq, battle, L); // a phase change plans its first tasks in the same wake
    }
    if (L) sitrep(w, m, sq, L, t);
    publish(m, sq, t);
  }

  K.squadTick = squadTick;
  K.mindOf = function (battle, sq) {
    return mindOf(K.world(battle), sq, battle);
  };
})(typeof window !== 'undefined' ? window : globalThis);
