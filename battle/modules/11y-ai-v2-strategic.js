/* AI V2 strategic layer: one side command per faction (see 11v for the architecture).

   What a commander knows: the briefing (where the objectives are, who held them at the start, his own
   order of battle) and what his squads have radioed since: where they said they were, their strength,
   their phase, the contacts they reported, and who holds an objective they are standing on. A squad
   that has been silent too long is presumed lost. He never reads a squad, a soldier or an enemy.

   What a commander owns: one mission per squad. He plans when the picture changes (an objective
   changed hands, a mission ended, a squad broke, went silent or reported) and on a slow heartbeat. A
   plan keeps every assignment that is still valid, so replanning does not reshuffle the force:
     - a squad that takes an objective holds it (a garrison stays while the objective is on the front
       line, is threatened or was just taken);
     - the main effort is massed on the nearest objective he does not hold; one squad is kept in
       reserve when the force allows; a depleted squad is given ground to hold, not an attack;
     - the first move on an objective nobody has reported on is a reconnaissance. */
(function (root) {
  'use strict';
  var K = root.BattleAIV2;
  if (!K || K.strategicTick) return;

  var HEARTBEAT = 20,
    SILENT = 120,
    CONSOLIDATE = 90,
    THREAT_KEEP = 90,
    THREAT_NEAR = 220,
    DEPLETED = 0.45,
    RECON_SHORT = 150;

  function objectives(sim) {
    var out = [],
      list = sim._objectives || [],
      control = (sim.objectiveControl && sim.objectiveControl.objectives) || {};
    for (var i = 0; i < list.length; i++) {
      var o = list[i],
        def = o.def || o,
        st = control[o.id] || {};
      if (!isFinite(+def.x) || !isFinite(+def.z)) continue;
      out.push({
        id: String(o.id),
        x: +def.x,
        z: +def.z,
        radius: +def.radius || 20,
        owner: st.owner || null
      });
    }
    return out;
  }
  function sideOf(w, sim, f) {
    var side = w.sides[f];
    if (side) return side;
    /* The briefing: the only moment the commander is handed facts he did not get by radio. */
    var t = +sim.time || 0,
      obj = {},
      owned = 0,
      list = objectives(sim);
    list.forEach(function (o) {
      obj[o.id] = { id: o.id, x: o.x, z: o.z, radius: o.radius, owner: o.owner, at: t, briefed: o.owner };
      if (o.owner === f) owned++;
    });
    side = w.sides[f] = {
      faction: f,
      obj: obj,
      order: list.map(function (o) {
        return o.id;
      }),
      squads: {},
      roster: [],
      contacts: [],
      posture: owned > 0 && owned * 2 >= list.length ? 'defend' : 'attack',
      main: null,
      plans: 0,
      dirty: true,
      thinkAt: 0
    };
    ((sim.factions[f] && sim.factions[f].squads) || []).forEach(function (sq) {
      enrol(side, sq, t);
    });
    return side;
  }
  function enrol(side, sq, t) {
    if (side.squads[sq.id]) return;
    var est = root.SquadAI.establishment(sq);
    side.squads[sq.id] = {
      id: sq.id,
      ref: sq, // the radio link to this squad's leader: messages are addressed with it, state is never read from it
      home: { x: sq.home.x, z: sq.home.z },
      reported: { x: sq.home.x, z: sq.home.z, strength: est, establishment: est, phase: 'idle', at: t },
      mission: null, // the last order he issued to it
      state: null, // that order's status as last radioed back; his own order object is never read for it
      lost: false
    };
    side.roster.push(sq.id);
    side.dirty = true;
  }

  var ENDED = { done: 1, failed: 1, cancelled: 1, superseded: 1, expired: 1 };
  /* The mission he believes the squad is on: issued by him and not yet reported finished. */
  function believed(q) {
    return q.mission && !ENDED[q.state] ? q.mission : null;
  }

  K.handlers.side = function (w, msg) {
    var side = w.sides[msg.faction];
    if (!side) return false;
    var q = side.squads[msg.squad];
    if (!q) return false;
    var t = +w.battle.time || 0,
      before = q.reported,
      wasDepleted = before.strength / before.establishment < DEPLETED;
    q.reported = {
      x: msg.x,
      z: msg.z,
      strength: msg.strength,
      establishment: msg.establishment,
      phase: msg.phase,
      at: t
    };
    if (q.lost) {
      q.lost = false;
      side.dirty = true;
    }
    if (wasDepleted !== msg.strength / msg.establishment < DEPLETED) side.dirty = true;
    if (msg.phase !== before.phase && (msg.phase === 'rally' || msg.phase === 'withdraw')) side.dirty = true;
    if (q.mission && msg.mission && msg.mission.id === q.mission.id && q.state !== msg.mission.status) {
      q.state = msg.mission.status;
      if (ENDED[q.state]) side.dirty = true;
    }
    if (msg.event === 'objective-secured' || msg.event === 'recon-report') side.dirty = true;
    (msg.contacts || []).forEach(function (c) {
      var hit = null;
      for (var i = 0; i < side.contacts.length; i++)
        if (Math.abs(side.contacts[i].x - c.x) < 30 && Math.abs(side.contacts[i].z - c.z) < 30)
          hit = side.contacts[i];
      if (!hit) {
        side.contacts.push({ x: c.x, z: c.z, at: c.at, by: msg.squad });
        side.dirty = true;
      } else if (c.at > hit.at) {
        hit.x = c.x;
        hit.z = c.z;
        hit.at = c.at;
      }
    });
    if (msg.objective && side.obj[msg.objective.id]) {
      var o = side.obj[msg.objective.id];
      if (o.owner !== msg.objective.owner) {
        if (msg.objective.owner === side.faction) o.consolidateUntil = t + CONSOLIDATE;
        o.owner = msg.objective.owner;
        side.dirty = true;
        K.note(w, 'objective-belief', { faction: side.faction, id: o.id, owner: o.owner, by: msg.squad });
      }
      o.at = t;
      o.reconAt = t;
    }
    if (msg.event === 'recon-report' && q.mission && side.obj[q.mission.objectiveId])
      side.obj[q.mission.objectiveId].reconAt = t;
    return true;
  };

  function near(a, b) {
    return K.dist(a, b);
  }
  function threatened(side, o, t) {
    for (var i = 0; i < side.contacts.length; i++)
      if (t - side.contacts[i].at <= THREAT_KEEP && near(side.contacts[i], o) <= THREAT_NEAR) return true;
    return false;
  }

  function plan(w, side, sim) {
    var t = +sim.time || 0,
      f = side.faction,
      i;
    side.plans++;
    w.stats.sidePlans++;
    side.dirty = false;
    side.thinkAt = t + HEARTBEAT + (f === 'us' ? 0 : 0.45);
    for (i = side.contacts.length - 1; i >= 0; i--)
      if (t - side.contacts[i].at > THREAT_KEEP) side.contacts.splice(i, 1);

    var squads = [];
    side.roster.forEach(function (id) {
      var q = side.squads[id];
      if (!q.lost && t - q.reported.at > SILENT && t > SILENT) {
        q.lost = true;
        K.note(w, 'squad-presumed-lost', { faction: f, squad: id });
        /* Ground a silent garrison was holding can no longer be assumed held. */
        if (q.mission && q.mission.kind === 'defend' && side.obj[q.mission.objectiveId]) {
          var held = side.obj[q.mission.objectiveId];
          if (held.owner === f) {
            held.owner = null;
            held.at = t;
          }
        }
      }
      if (!q.lost && q.reported.strength > 0) squads.push(q);
    });
    if (!squads.length) return;
    var cx = 0,
      cz = 0;
    squads.forEach(function (q) {
      cx += q.reported.x / squads.length;
      cz += q.reported.z / squads.length;
    });
    var force = { x: cx, z: cz },
      ours = [],
      targets = [];
    side.order.forEach(function (id) {
      (side.obj[id].owner === f ? ours : targets).push(side.obj[id]);
    });
    targets.sort(function (a, b) {
      return near(a, force) - near(b, force) || (a.id < b.id ? -1 : 1);
    });
    /* The main effort stays where it is until that objective is taken. */
    var main = null;
    for (i = 0; i < targets.length; i++) if (targets[i].id === side.main) main = targets[i];
    if (!main) main = targets[0] || null;
    side.main = main ? main.id : null;

    var want = {},
      free = [],
      garrison = {},
      seize = {};
    function assign(q, kind, o, point) {
      want[q.id] = { kind: kind, obj: o || null, point: point || (o ? { x: o.x, z: o.z } : q.home) };
      if (kind === 'defend' && o && q.reported.strength / q.reported.establishment >= DEPLETED)
        garrison[o.id] = (garrison[o.id] || 0) + 1; // a remnant sheltering there is not a garrison
      if ((kind === 'seize' || kind === 'recon') && o) seize[o.id] = (seize[o.id] || 0) + 1;
    }
    function nearestTo(list, p) {
      var best = null;
      list.forEach(function (o) {
        if (!best || near(o, p) < near(best, p)) best = o;
      });
      return best;
    }
    var front = main && ours.length ? nearestTo(ours, main) : null,
      massCap = squads.length >= 6 ? 3 : 2;
    function needs(o) {
      if (side.posture === 'defend' || !targets.length) return 1;
      return o === front || threatened(side, o, t) || (o.consolidateUntil || 0) > t ? 1 : 0;
    }

    /* 1. Depleted squads hold ground. 2. Valid assignments are kept. */
    squads.forEach(function (q) {
      var r = q.reported,
        m = believed(q),
        o = m && m.objectiveId ? side.obj[m.objectiveId] : null;
      if (r.strength / r.establishment < DEPLETED) {
        var hold = nearestTo(ours, r);
        if (hold) assign(q, 'defend', hold);
        else assign(q, 'reserve', null, q.home);
        return;
      }
      if (m && m.kind === 'defend' && o && o.owner === f && needs(o) > (garrison[o.id] || 0))
        return assign(q, 'defend', o);
      if (
        m &&
        (m.kind === 'seize' || m.kind === 'recon') &&
        o &&
        o.owner !== f &&
        (seize[o.id] || 0) < massCap
      )
        return assign(
          q,
          m.kind === 'recon' && o.reconAt == null ? 'recon' : 'seize',
          o,
          m.kind === 'recon' && o.reconAt == null ? m.point : null
        );
      free.push(q);
    });
    function take(p) {
      var best = -1;
      for (var k = 0; k < free.length; k++)
        if (best < 0 || near(free[k].reported, p) < near(free[best].reported, p)) best = k;
      return best < 0 ? null : free.splice(best, 1)[0];
    }
    /* 3. Garrisons: the nearest free squad, which after a capture is the squad that took the place. */
    ours.forEach(function (o) {
      while (needs(o) > (garrison[o.id] || 0) && free.length) assign(take(o), 'defend', o);
    });
    /* 4. The rest attack, counterattack or wait in reserve. */
    var q;
    if (targets.length && side.posture === 'defend') {
      var lost = targets.filter(function (o) {
        return o.briefed === f;
      });
      if (lost.length && free.length >= 2) {
        var back = nearestTo(lost, force);
        while (free.length && (seize[back.id] || 0) < 2) assign(take(back), 'seize', back);
      }
    } else if (main) {
      if (free.length >= 3 && squads.length >= 4) {
        /* Reserve: the free squad farthest from the main effort. */
        var far = 0;
        for (i = 1; i < free.length; i++)
          if (near(free[i].reported, main) > near(free[far].reported, main)) far = i;
        q = free.splice(far, 1)[0];
        var behind = front || { x: q.home.x, z: q.home.z };
        assign(q, 'reserve', null, { x: behind.x, z: behind.z });
      }
      var known = main.reconAt != null || threatened(side, main, t);
      while (free.length && (seize[main.id] || 0) < massCap) {
        q = take(main);
        if (!known && !seize[main.id] && free.length >= 1) {
          var dx = q.reported.x - main.x,
            dz = q.reported.z - main.z,
            dl = Math.sqrt(dx * dx + dz * dz) || 1,
            short = Math.min(RECON_SHORT, dl * 0.5);
          assign(q, 'recon', main, { x: main.x + (dx / dl) * short, z: main.z + (dz / dl) * short });
        } else assign(q, 'seize', main);
      }
      if (free.length && targets.length > 1) {
        var second = targets[0] === main ? targets[1] : targets[0];
        assign(take(second), 'seize', second);
      }
    }
    free.forEach(function (rest) {
      var hold = nearestTo(ours, rest.reported);
      assign(rest, 'reserve', null, hold ? { x: hold.x, z: hold.z } : rest.home);
    });

    /* Issue only what changed. */
    squads.forEach(function (row) {
      var d = want[row.id],
        m = believed(row);
      if (!d) return;
      var objId = d.obj ? d.obj.id : null;
      if (m && m.kind === d.kind && (m.objectiveId || null) === objId && near(m.point, d.point) < 25) return;
      /* A squad sitting in reserve or holding with nothing new to do is not re-briefed. */
      if (
        !m &&
        row.last &&
        row.last.kind === d.kind &&
        row.last.objectiveId === objId &&
        d.kind !== 'seize' &&
        d.kind !== 'recon' &&
        near(row.last.point, d.point) < 25
      )
        return;
      if (m && row.state === 'issued') K.advance(w, m, 'cancelled', 'replanned'); // his own order, not yet acknowledged
      var o = K.order(w, 'mission', d.kind, {
        to: row.id,
        faction: f,
        objectiveId: objId,
        point: { x: d.point.x, z: d.point.z },
        radius: d.obj ? d.obj.radius : 20
      });
      row.mission = o;
      row.state = 'issued';
      row.last = o;
      K.note(w, 'mission', { faction: f, squad: row.id, id: o.id, kind: d.kind, objective: objId });
      K.send(w, { to: 'squad', squad: row.ref, kind: 'mission', brief: K.brief(o) }, K.radioDelay(w));
    });
  }

  function strategicTick(sim) {
    var w = K.begin(sim),
      t = +sim.time || 0;
    w.stats.sideTicks++;
    ['us', 'ge'].forEach(function (f) {
      if (!sim.factions || !sim.factions[f]) return;
      var side = sideOf(w, sim, f),
        squads = sim.factions[f].squads;
      /* Reinforcements join the order of battle when they are raised. */
      if (squads.length !== side.roster.length)
        for (var i = 0; i < squads.length; i++) enrol(side, squads[i], t);
      if (side.dirty || t >= side.thinkAt) plan(w, side, sim);
    });
  }

  K.strategicTick = strategicTick;
})(typeof window !== 'undefined' ? window : globalThis);
