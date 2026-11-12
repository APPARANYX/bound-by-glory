/* AI V2 individual layer: the soldier's brain (see 11v for the architecture).

   What a man knows: what Perception gave him (his own sight, what he heard, what he was told) and
   the threat point his squad leader attached to the task he adopted. Nothing else: this file never
   reads an enemy roster, an enemy position or another squad's state.

   What a man owns: his body. He holds exactly one adopted task; from it and from his own situation he
   derives one movement command (the Movement Resolver writes the destination from it), his stance
   and his trigger. A task is the leader's intent, not a remote control: a pinned man goes to ground
   and says so, a man who meets an enemy on the march halts and reports, a broken man runs for the
   rally point and tells his leader he is out of the fight.

   Two rates: the reflex pass (arrival, stance, trigger, going to ground) runs every AI tick and is
   O(1); deliberation (which post, which cover, whether to report) runs on an event or a slow
   staggered heartbeat, and the cover search it may need is cached by position cell and threat sector. */
(function (root) {
  'use strict';
  var K = root.BattleAIV2;
  if (!K || K.soldierTick) return;

  var THINK = 2.4,
    REPORT_EVERY = 5,
    REPORT_MOVE = 14,
    PIN_AFTER = 1.1,
    BREAK = 0.9,
    RECOVER = 0.45,
    STANCE_HOLD = 1.1,
    PRONE_HOLD = 2.2,
    POST_REACH = 1.4,
    MOVE_REACH = 2.6,
    COVER_CAP = 14,
    MG_SETUP = 2.5,
    MOVE_KINDS = { move: 1, bound: 1, fallback: 1 },
    STANCES = ['prone', 'crouch', 'stand'],
    NO_COVER_RETRY = 6,
    FLAG_SIGHT = 120,
    FLAG_HEIGHT = 4,
    FLAG_REPORT = 15;

  function brain(w, s) {
    var b = s._v2;
    if (!b || b.epoch !== w.epoch)
      b = s._v2 = {
        epoch: w.epoch,
        task: null,
        mode: 'calm',
        goal: null,
        move: null,
        moveDirty: true,
        resolveAt: 0,
        cover: null,
        threat: null,
        thinkAt: 0,
        dirty: true,
        at: null,
        hp: s.hp,
        fear: 0,
        hadTarget: false,
        wasSuppressed: false,
        suppressedSince: 0,
        stanceAt: 0,
        reportAt: -1e9,
        reported: null,
        pinnedTask: 0,
        brokeAt: 0,
        ground: null,
        rise: 0,
        stance: null,
        seenId: 0,
        flag: null,
        flagAt: -1e9
      };
    return b;
  }

  /* ---- reports upward: only what he himself saw, heard or did ---- */
  function leaderDistance(s) {
    var L = root.SquadAI.leaderOf(s.squad);
    if (!L || L === s) return L ? 0 : 60;
    return K.dist(s.root.position, L.root.position);
  }
  function report(w, s, kind, data) {
    var msg = data || {};
    msg.to = 'squad';
    msg.squad = s.squad;
    msg.kind = kind;
    msg.by = s.id;
    w.stats.reports++;
    K.send(w, msg, K.voiceDelay(leaderDistance(s)));
  }

  /* ---- adoption: he holds his own copy of the task that reached him; a newer brief replaces it, a
     cancellation ends it, and until either arrives he keeps working the one he has ---- */
  K.handlers.soldier = function (w, msg) {
    var s = msg.soldier,
      br = msg.brief;
    if (!s || s.dead || !s.squad || !br) return false;
    var b = brain(w, s);
    if (br.cancel) {
      if (b.task && b.task.id === br.id) {
        K.advance(w, b.task, 'cancelled', br.why || 'cancelled');
        b.task = null;
        b.dirty = true;
      }
      return true;
    }
    if (br.id <= b.seenId) return true; // an older order that arrived late
    b.seenId = br.id;
    if (b.mode === 'broken') {
      report(w, s, 'refused', { task: br.id });
      return true;
    }
    if (K.live(b.task)) K.advance(w, b.task, 'superseded', 'new-task');
    b.task = K.hold(w, br);
    b.dirty = true;
    report(w, s, 'ack', { task: br.id });
    return true;
  };

  /* ---- cover: a post on the far side of something solid, cached until the picture changes ---- */
  function cell(v, size) {
    return Math.round(v.x / size) + ':' + Math.round(v.z / size);
  }
  function obKey(ob) {
    return Math.round(ob.x * 2) + ':' + Math.round(ob.z * 2);
  }
  /* A piece of cover is one man's. A claim lapses by itself when its holder is dead, belongs to an
     older battle or has moved on to other cover, so nothing has to remember to release it. */
  function claimFree(w, key, s) {
    var h = w.claims[key];
    return (
      !h ||
      h === s ||
      h.dead ||
      !h._v2 ||
      h._v2.epoch !== w.epoch ||
      !h._v2.cover ||
      h._v2.cover.claim !== key
    );
  }
  function releaseClaim(w, b, s) {
    if (b.cover && b.cover.claim && w.claims[b.cover.claim] === s) delete w.claims[b.cover.claim];
  }
  function geometryStamp(obstacles) {
    return (obstacles.length || 0) + ':' + (obstacles.__physicalVersion || 0);
  }
  function findCover(w, s, b, battle, near, threat, leash) {
    /* Cover is good against a direction, so the cache is keyed by the threat's bearing (30 degree sectors),
       not by where exactly the enemy was last put. A cached post is reused only while the obstacle set is
       the one it was found in and the cover is still his; a cached "nothing here" is retried after a while. */
    var obstacles = battle.obstacles || [],
      t = battle.time,
      stamp = geometryStamp(obstacles),
      key =
        cell(near, 5) +
        '|' +
        Math.round(Math.atan2(threat.x - near.x, threat.z - near.z) / (Math.PI / 6)) +
        '|' +
        leash,
      old = b.cover;
    if (
      !K.ablate.cover &&
      old &&
      old.key === key &&
      old.stamp === stamp &&
      (old.point ? claimFree(w, old.claim, s) : t < old.until)
    ) {
      w.stats.coverCacheHits++;
      if (old.point) w.claims[old.claim] = s;
      return old.point ? old : null;
    }
    releaseClaim(w, b, s);
    w.stats.coverSearches++;
    var F = root.BattleObstacleField,
      S = root.SquadAI,
      list = F && F.nearby ? F.nearby(obstacles, near.x, near.z, leash) : obstacles,
      p = s.root.position,
      best = null,
      bestScore = -Infinity,
      seen = 0;
    for (var i = 0; i < list.length && seen < COVER_CAP; i++) {
      var ob = list[i];
      if (!ob || ob.dynamic || !(ob.cover < 0.95)) continue;
      var dx = ob.x - threat.x,
        dz = ob.z - threat.z,
        dl = Math.sqrt(dx * dx + dz * dz);
      if (dl < 6) continue; // on top of the threat is not cover
      dx /= dl;
      dz /= dl;
      var x = ob.x,
        z = ob.z,
        ok = false;
      if (F && F.horizontalDistance) {
        for (var k = 0; k < 14; k++) {
          x += dx * 0.6;
          z += dz * 0.6;
          if (F.horizontalDistance(ob, x, z) >= 0.7) {
            ok = true;
            break;
          }
        }
      } else {
        var r = (+ob.radius || 1) + 0.8;
        x = ob.x + dx * r;
        z = ob.z + dz * r;
        ok = true;
      }
      if (!ok) continue;
      var off = Math.sqrt((x - near.x) * (x - near.x) + (z - near.z) * (z - near.z));
      if (off > leash) continue;
      seen++;
      var claim = obKey(ob);
      if (!claimFree(w, claim, s)) continue;
      var mult = S.coverMultiplierAt(x, z, obstacles, 'crouch');
      if (!(mult < 0.97)) continue;
      var score =
        (1 - mult) * 30 - Math.sqrt((x - p.x) * (x - p.x) + (z - p.z) * (z - p.z)) * 0.5 - off * 0.2;
      if (score > bestScore) {
        bestScore = score;
        best = { key: key, stamp: stamp, point: { x: x, z: z }, claim: claim, quality: 1 - mult };
      }
    }
    b.cover = best || { key: key, stamp: stamp, point: null, until: t + NO_COVER_RETRY };
    if (best) w.claims[best.claim] = s;
    return best;
  }

  /* ---- stance and trigger: the only writers of these fields under V2 ---- */
  function setStance(s, b, t, want, crawl) {
    /* Engagement's stance effector is the one writer of the stance fields; V2 decides, it applies. */
    var E = root.BattleEngagement,
      cur = s.prone ? 'prone' : s.tacticalCrouch ? 'crouch' : 'stand',
      to = cur;
    if (cur !== want && t >= b.stanceAt) {
      to = want;
      b.stanceAt = t + (want === 'prone' || cur === 'prone' ? PRONE_HOLD : STANCE_HOLD);
    }
    var label = to === 'prone' && crawl ? 'crawl' : to;
    if (label !== b.stance) {
      E.applyStance(s, label);
      b.stance = label;
    }
  }

  /* Who holds an objective is something a man sees: the flag on its pole, in range and in plain sight. */
  function flagSeen(s, battle, at) {
    var p = s.root.position;
    if (K.dist(p, at) > FLAG_SIGHT) return false;
    var F = root.BattleObstacleField,
      N = root.BattleNavigation,
      ay = battle.heightAt(p.x, p.z) + root.SquadAI.eyeHeight(s),
      by = battle.heightAt(at.x, at.z) + FLAG_HEIGHT;
    if (F && F.sightBlocked(battle.obstacles, { x: p.x, z: p.z, y: ay }, { x: at.x, z: at.z, y: by }))
      return false;
    if (N && N.lineOfSightBlocked({ x: p.x, z: p.z }, { x: at.x, z: at.z }, ay, by)) return false;
    return true;
  }

  function deliberate(w, s, b, battle, mind, unit, suppressed, stress) {
    var S = root.SquadAI,
      t = battle.time,
      p = s.root.position,
      task = K.live(b.task) ? b.task : (b.task = null);
    w.stats.deliberations++;
    b.dirty = false;
    b.thinkAt = t + THINK + ((+s.id || 0) % 7) * 0.13;

    /* What he believes about the enemy, best evidence first. */
    var c = null;
    if (unit) c = { x: unit.root.position.x, z: unit.root.position.z, at: t, source: 'seen' };
    else {
      var belief = S.soldierContact(s, battle);
      if (belief && isFinite(+belief.x))
        c = {
          x: +belief.x,
          z: +belief.z,
          at: +belief.at || t,
          source: belief.source || (belief.heard ? 'heard' : belief.told ? 'told' : 'seen')
        };
    }
    var firstHand = !!(c && c.source !== 'told');
    if (!c && task && task.threat)
      c = { x: task.threat.x, z: task.threat.z, at: task.threat.at, source: 'order' };
    b.threat = c;
    if (
      firstHand &&
      t - c.at < 8 &&
      (t - b.reportAt >= REPORT_EVERY || !b.reported || K.dist(b.reported, c) > REPORT_MOVE)
    ) {
      b.reportAt = t;
      b.reported = { x: c.x, z: c.z };
      report(w, s, 'contact', { x: c.x, z: c.z, at: c.at, source: c.source });
    }

    /* The flag over the objective his task told him to watch. */
    if (task && task.watch && flagSeen(s, battle, task.watch)) {
      var oc = battle.objectiveControl,
        st = oc && oc.objectives && oc.objectives[task.watch.id];
      if (st) {
        var flag = task.watch.id + ':' + (st.owner || '');
        if (flag !== b.flag || t - b.flagAt >= FLAG_REPORT) {
          b.flag = flag;
          b.flagAt = t;
          report(w, s, 'objective', { id: task.watch.id, owner: st.owner || null, at: t });
        }
      }
    }

    /* Morale: a man past his limit is out of the chain of command until he recovers. */
    if (b.mode === 'broken') {
      if (stress < RECOVER && t - b.brokeAt > 8) {
        b.mode = 'calm';
        report(w, s, 'status', { what: 'recovered' });
      }
    } else if (stress >= BREAK) {
      b.mode = 'broken';
      b.brokeAt = t;
      if (task) K.advance(w, task, 'failed', 'man-broke');
      task = b.task = null;
      releaseClaim(w, b, s);
      b.cover = null;
      report(w, s, 'status', { what: 'broke' });
    }

    var here = { x: p.x, z: p.z },
      goal;
    if (b.mode === 'broken') {
      var rally = (mind && mind.rallyPoint) || s.squad.home || here;
      goal = {
        point: { x: rally.x, z: rally.z },
        pace: 'run',
        post: false,
        fire: false,
        reason: 'broken-to-rally'
      };
    } else if (task && MOVE_KINDS[task.kind] && task.status === 'adopted') {
      var far = K.dist(p, task.point) > 8,
        pinned = suppressed && t - b.suppressedSince >= PIN_AFTER && far && task.kind !== 'fallback',
        /* On the march he stops for an enemy he can actually fight; one out of reach he reports and keeps moving. */
        halt =
          task.kind === 'move' && unit && !pinned && K.dist(p, unit.root.position) <= S.engageRange(s) * 0.9;
      if (pinned || halt) {
        /* Safety first: he goes to ground where he is (or behind something a few steps away) and
           tells the leader; the task stays his and he resumes it when he can. */
        /* Where he first went to ground anchors the search, so crawling to cover does not start another. */
        if (!b.ground) b.ground = here;
        var near = c ? findCover(w, s, b, battle, b.ground, c, 9) : null;
        goal = {
          point: near ? near.point : here,
          pace: 'crawl',
          post: true,
          fire: true,
          reason: pinned ? 'pinned' : 'halt-contact'
        };
        b.mode = pinned ? 'pinned' : 'halted';
        if (b.pinnedTask !== task.id) {
          b.pinnedTask = task.id;
          report(w, s, 'status', { what: pinned ? 'pinned' : 'halted', task: task.id });
        }
      } else {
        b.mode = 'calm';
        b.ground = null;
        releaseClaim(w, b, s);
        b.cover = null;
        goal = {
          point: task.point,
          pace: task.pace || 'walk',
          post: false,
          fire: task.kind !== 'bound' && task.kind !== 'fallback',
          reason: task.kind
        };
      }
    } else if (task) {
      /* A post: his own choice of cover inside the leash the leader gave him. */
      b.mode = 'calm';
      b.ground = null;
      var leash = task.leash || 10,
        cov = c ? findCover(w, s, b, battle, task.point, c, leash) : null;
      goal = {
        point: cov ? cov.point : task.point,
        pace: suppressed ? 'crawl' : 'walk',
        post: true,
        fire: task.roe !== 'hold-fire',
        suppress: task.kind === 'suppress',
        reason: task.kind + (cov ? '-cover' : '')
      };
    } else {
      b.mode = 'calm';
      if (!b.ground) b.ground = here;
      var own = c && t - c.at < 12 ? findCover(w, s, b, battle, b.ground, c, 8) : null;
      goal = { point: own ? own.point : here, pace: 'crawl', post: true, fire: true, reason: 'no-task' };
    }
    var old = b.goal;
    if (!old || K.dist(old.point, goal.point) > 0.3 || old.post !== goal.post) {
      b.moveDirty = true;
      b.rise = 0;
    }
    /* The lowest stance he can shoot from: at his post with a threat he cannot reach from where he
       lies or kneels, he comes up one level; fire that pins him puts him back down. */
    if (suppressed) b.rise = 0;
    else if (
      goal.post &&
      goal.fire &&
      c &&
      !unit &&
      b.rise < 2 &&
      K.dist(p, goal.point) <= POST_REACH &&
      t - c.at < 20
    ) {
      if (!S.canSuppress(s, c, battle, true) && K.dist(p, c) <= S.engageRange(s)) b.rise++;
    }
    b.goal = goal;
  }

  function soldierTick(s, battle) {
    var S = root.SquadAI,
      w = K.begin(battle),
      b = brain(w, s),
      t = battle.time,
      p = s.root.position,
      sq = s.squad,
      mind = sq && sq._v2 && sq._v2.epoch === w.epoch ? sq._v2 : null;
    w.stats.soldierTicks++;

    /* Sense: cheap edges that wake deliberation. */
    var unit = s.target && S.threatDisposition(s.target).combatThreat ? s.target : null,
      suppressed = s.suppressedUntil > t,
      dt = b.at == null ? 0 : Math.max(0, t - b.at);
    b.at = t;
    if (s.hp < b.hp) {
      b.fear = Math.min(1, b.fear + 0.3);
      b.dirty = true;
    }
    b.hp = s.hp;
    b.fear = Math.max(0, Math.min(1, b.fear + (suppressed ? 0.05 : -0.03) * dt));
    var M = root.BattleSoldierMind,
      stress = Math.max(b.fear, M ? +M.stress(s) || 0 : 0);
    if (!!unit !== b.hadTarget) {
      b.hadTarget = !!unit;
      b.dirty = true;
    }
    if (suppressed !== b.wasSuppressed) {
      b.wasSuppressed = suppressed;
      b.suppressedSince = t;
      b.dirty = true;
    }
    if (
      suppressed &&
      b.mode === 'calm' &&
      t - b.suppressedSince >= PIN_AFTER &&
      t - b.suppressedSince < PIN_AFTER + 0.2
    )
      b.dirty = true;
    if (b.task && !K.live(b.task)) b.dirty = true;
    if (stress >= BREAK !== (b.mode === 'broken') && (b.mode !== 'broken' || stress < RECOVER))
      b.dirty = true;
    if (b.dirty || t >= b.thinkAt || K.ablate.think)
      deliberate(w, s, b, battle, mind, unit, suppressed, stress);

    /* Reflex: arrival, stance, trigger, movement command. */
    var g = b.goal,
      task = b.task,
      d = K.dist(p, g.point),
      arrived = d <= (g.post ? POST_REACH : MOVE_REACH);
    if (
      task &&
      task.status === 'adopted' &&
      (MOVE_KINDS[task.kind] ? K.dist(p, task.point) <= MOVE_REACH : arrived && b.mode === 'calm')
    ) {
      K.advance(w, task, 'arrived');
      b.dirty = true; // a finished move becomes a post next tick
      report(w, s, 'arrived', { task: task.id }); // the leader knows when he is told
    }
    if (task && task.status === 'arrived' && MOVE_KINDS[task.kind] && !g.post) {
      /* He holds where the move ended, as a post with a short leash, until the next task. */
      g = b.goal = {
        point: { x: p.x, z: p.z },
        pace: 'crawl',
        post: true,
        fire: true,
        reason: task.kind + '-arrived'
      };
      b.moveDirty = true;
      arrived = true;
    }
    var threat = unit ? unit.root.position : b.threat,
      range = threat ? K.dist(p, threat) : Infinity;
    if (!arrived) {
      if (g.pace === 'run' || g.pace === 'walk') setStance(s, b, t, 'stand', false);
      else if (g.pace === 'stalk') setStance(s, b, t, 'crouch', false);
      else if (d <= 9 && (suppressed || s.prone)) setStance(s, b, t, 'prone', true);
      else setStance(s, b, t, 'crouch', false);
    } else if (b.mode === 'broken') setStance(s, b, t, 'crouch', false);
    else if (suppressed) setStance(s, b, t, 'prone', false);
    else if (!threat) setStance(s, b, t, 'stand', false);
    else setStance(s, b, t, STANCES[Math.min(2, (b.cover && b.cover.point ? 1 : 0) + (b.rise || 0))], false);

    var fired = false,
      steady = (s.moveSpeed || 0) < 0.6 && t >= b.stanceAt - PRONE_HOLD + 0.45;
    if (g.fire && steady && s.weapon) {
      if (unit && range <= S.engageRange(s)) {
        fired = S.tryFire(s, battle);
        if (fired) w.stats.aimedTriggers++;
      } else if (
        !unit &&
        arrived &&
        threat &&
        s.fireCooldown <= 0 &&
        (g.suppress || (b.threat && b.threat.source !== 'order' && t - b.threat.at < 6))
      ) {
        if (S.canSuppress(s, threat, battle, true)) {
          S.areaFire(s, threat, battle);
          w.stats.areaTriggers++;
          fired = true;
        }
      }
    }
    if (S.isMachineGun(s)) {
      if (arrived && !s.moving) {
        if (!s.setUpSince) s.setUpSince = t;
        s.setUp = t - s.setUpSince > MG_SETUP;
      } else {
        s.setUp = false;
        s.setUpSince = 0;
      }
    }
    s._faceHint = threat ? { x: threat.x, z: threat.z } : null;
    s.state =
      b.mode === 'broken' || (task && task.kind === 'fallback')
        ? 'retreat'
        : unit || fired
          ? 'engage'
          : 'advance';

    /* One movement command; the Resolver writes the destination from it. It is consulted when the
       command changed, while he is on the move, and on a slow refresh otherwise. */
    var mv = b.move;
    if (!mv || b.moveDirty || mv.point !== g.point || mv.taskId !== (task ? task.id : null)) {
      b.move = {
        point: g.point,
        kind: g.post ? 'v2-post' : 'v2-move',
        reason: g.reason,
        taskId: task ? task.id : null
      };
      if (!mv || mv.point !== g.point) b.moveDirty = true; // the same place under a new task needs no new destination
    }
    var resolver = root.BattleMovementResolver;
    if (!resolver || !root.BattleEngagement)
      throw new Error(
        'AI V2 needs the Movement Resolver and Engagement: they write the destination and the stance'
      );
    {
      if (b.moveDirty || s.moving || t >= b.resolveAt || K.ablate.resolve) {
        if (b.lastDestination && s.destination !== b.lastDestination && s._movementProposalOwner !== 'ai-v2')
          w.stats.foreignDestinationWrites++;
        resolver.resolve(s, battle);
        b.lastDestination = s.destination;
        b.moveDirty = false;
        b.resolveAt = t + 1 + ((+s.id || 0) % 5) * 0.06;
        w.stats.resolves++;
      } else w.stats.resolveSkips++;
    }
  }

  K.soldierTick = soldierTick;
  /* Test hooks: the two perception helpers, callable on a staged man. */
  K.coverFor = function (battle, s, near, threat, leash) {
    var w = K.world(battle);
    return findCover(w, s, brain(w, s), battle, near, threat, leash);
  };
  K.flagSeen = flagSeen;
  K.brainOf = function (battle, s) {
    return brain(K.world(battle), s);
  };
})(typeof window !== 'undefined' ? window : globalThis);
