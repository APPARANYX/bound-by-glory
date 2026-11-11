/* AI V2 meso executor: route march through owner adapters with explicit leg state.
   Reuses formation and mission helpers from existing owners; does not write movement directly. */
(function (root) {
  'use strict';
  var SEARCH = typeof location !== 'undefined' ? location.search || '' : '';
  var ON = root.BattleAIV2 && root.BattleAIV2.on;
  var ID = 'ai-v2';
  var squads = new WeakMap();
  var skillSquads = new WeakMap();

  function point(v) {
    return v && isFinite(+v.x) && isFinite(+v.z) ? { x: +v.x, z: +v.z } : null;
  }
  function dist(a, b) {
    return !a || !b ? Infinity : Math.hypot(a.x - b.x, a.z - b.z);
  }
  function men(sq) {
    return (sq.members || []).filter(function (s) {
      return s && !s.dead && !s.isPlayer;
    });
  }
  function centroid(list) {
    var x = 0,
      z = 0,
      n = 0;
    list.forEach(function (s) {
      var p = s.root && s.root.position;
      if (!p) return;
      x += +p.x;
      z += +p.z;
      n++;
    });
    return n ? { x: x / n, z: z / n } : null;
  }
  function unit(from, to) {
    var dx = to.x - from.x,
      dz = to.z - from.z,
      l = Math.hypot(dx, dz);
    return l > 1e-6 ? { x: dx / l, z: dz / l } : { x: 0, z: 1 };
  }
  function legRadius(sim, sq) {
    var C = root.BattleCommanderAI;
    var cfg = C && C.policyFor ? C.policyFor(sim, sq.faction) : null;
    return +(cfg && cfg.routeArrivalRadius) || 8;
  }
  function stateOf(sq) {
    var st = squads.get(sq);
    if (!st)
      squads.set(
        sq,
        (st = {
          mission: null,
          leg: 0,
          target: null,
          forward: { x: 0, z: 1 },
          men: new Map(),
          stopped: new Map(),
          check: true,
          retry: true,
          final: false
        })
      );
    return st;
  }
  function aim(st, legs, here) {
    var target = point(legs[st.leg]);
    if (!target) return;
    if (!st.target || dist(st.target, target) > 1e-6) {
      var from = st.leg > 0 ? point(legs[st.leg - 1]) : here;
      st.forward = (from && unit(from, target)) || st.forward;
      st.target = target;
      st.final = st.leg === legs.length - 1;
      st.stopped = new Map();
    }
  }
  function standDown(ctx, st, reason) {
    st.men.forEach(function (cur) {
      ctx.finish(cur.actionId, reason);
    });
    st.men.clear();
    if (st.stopped) st.stopped.clear();
  }
  function yields(sq, s, sim) {
    var P = root.BattleTacticalPositions,
      C = root.BattleTacticalContactSkills,
      M = root.BattleTacticalCoveredManeuver;
    if (P && P.current(s)) return 'station-claimed';
    if ((M && M.wants(s, sim)) || (C && C.wants(s, sim))) return 'contact-skill';
    return null;
  }
  function ask(ctx, st, man, capability, at) {
    var id = String(man.id),
      res = ctx.request(capability, id, { point: at });
    if (res && res.ok) {
      st.stopped.delete(id);
      st.men.set(id, {
        man: man,
        actionId: res.actionId,
        kind: capability === 'movement.hold' ? 'hold' : 'move',
        point: at
      });
    } else {
      st.men.delete(id);
      st.stopped.set(id, 'refused:' + ((res && res.reason) || 'unknown'));
    }
  }
  function skillOn(kind) {
    var Q = root.BattleSquadStability;
    return !!(ON && Q && Q.controllerSkills && Q.controllerSkills.enabled(kind));
  }
  function ownerLeg(sq, last) {
    return Math.max(0, Math.min(last, Math.floor(+sq.routeIndex) || 0));
  }

  function executeMission(ctx) {
    if (!ON) return;
    root.BattleAIV2.ingestFacts(ctx);
    if (!root.BattleAIV2.shouldRun(ctx.sim, ctx.squad, 'movement')) return;
    var sq = ctx.squad,
      sim = ctx.sim,
      st = stateOf(sq);
    st._sim = sim;
    st._sq = sq;
    var legs = sq.route || [],
      m = sq._macroMission || null;
    if (st.mission !== m) {
      st.mission = m;
      st.leg = 0;
      st.target = null;
    }
    if (!legs.length) {
      st.target = null;
      root.BattleAIV2.markRan(sim, sq, 'movement');
      return;
    }
    var last = legs.length - 1,
      here = centroid(men(sq)),
      r = legRadius(sim, sq);
    var prevLeg = st.leg;
    st.leg = ownerLeg(sq, last);
    while (st.leg < last && dist(here, point(legs[st.leg])) <= r) st.leg++;
    if (st.leg !== prevLeg && root.BattleAIV2)
      root.BattleAIV2.emit(sim, 'leg-advanced', { squad: sq }, { leg: st.leg });
    aim(st, legs, here);
    var Q = root.BattleSquadStability,
      M = Q && Q.controllerMission;
    if (M && here && m && point(m.point) && sq.state !== 'retreat' && sq.commandPhase !== 'regroup') {
      var res = ctx.request('mission.execute', null, {
        leg: st.leg,
        phase: st.final ? 'hold' : 'approach',
        point: st.target
      });
      if (res.ok) ctx.finish(res.actionId, 'completed');
    }
    root.BattleAIV2.markRan(sim, sq, 'movement');
  }

  function squadCommand(ctx) {
    if (!ON) return;
    root.BattleAIV2.ingestFacts(ctx);
    if (!root.BattleAIV2.shouldRun(ctx.sim, ctx.squad, 'movement')) return;
    var sq = ctx.squad,
      st = stateOf(sq),
      Q = root.BattleSquadStability;
    st._sim = ctx.sim;
    st._sq = sq;
    if (sq.state === 'retreat' || sq.commandPhase === 'retreat') {
      standDown(ctx, st, 'retreat');
      root.BattleAIV2.markRan(ctx.sim, sq, 'movement');
      return;
    }
    if (!st.target || !Q || !Q.formationSlots) {
      root.BattleAIV2.markRan(ctx.sim, sq, 'movement');
      return;
    }
    if (!st.check) {
      st.men.forEach(function (cur, id) {
        var why = yields(sq, cur.man, ctx.sim);
        if (!why) return;
        ctx.finish(cur.actionId, why);
        st.men.delete(id);
      });
      return;
    }
    st.check = false;
    var anchor = point(sq.orderAnchor) || st.target;
    var slots = Q.formationSlots(sq, anchor, st.forward);
    for (var i = 0; i < slots.length; i++) {
      var s = slots[i].man;
      if (s.dead || s.isPlayer) continue;
      var id = String(s.id),
        slot = slots[i].point,
        why = yields(sq, s, ctx.sim);
      if (why) continue;
      if (!st.men.has(id)) ask(ctx, st, s, 'movement.move', slot);
    }
    st.retry = false;
    root.BattleAIV2.markRan(ctx.sim, sq, 'movement');
  }

  function fireAndMovement(ctx) {
    if (!ON) return;
    root.BattleAIV2.ingestFacts(ctx);
    var sim = ctx.sim,
      sq = ctx.squad;
    var Q = root.BattleSquadStability;
    if (Q && Q.noteControllerSuccession) Q.noteControllerSuccession(sim, sq, ctx.facts);
    if (root.BattleAIV2.shouldRun(sim, sq, 'contact') && root.BattleTacticalContactSkills)
      root.BattleTacticalContactSkills.update(ctx);
    if (root.BattleAIV2.shouldRun(sim, sq, 'maneuver')) {
      if (root.BattleTacticalFlankAssault) root.BattleTacticalFlankAssault.update(ctx);
      if (root.BattleTacticalCoveredManeuver) root.BattleTacticalCoveredManeuver.update(ctx);
      if (root.BattleTacticalAmbushSkill) root.BattleTacticalAmbushSkill.update(ctx);
    }
    root.BattleAIV2.markRan(sim, sq, 'contact');
    root.BattleAIV2.markRan(sim, sq, 'maneuver');
  }

  function takeAll(sim) {
    var TC = root.BattleTacticalController;
    if (!TC || !sim || !sim.factions || !root.BattleTacticalContactSkills) return;
    ['us', 'ge'].forEach(function (f) {
      var a = (sim.factions[f] && sim.factions[f].squads) || [];
      for (var i = 0; i < a.length; i++) if (!TC.controls(sim, a[i])) TC.requestMode(sim, a[i], 'new', ID);
      var G = root.BattleTacticalGeneral,
        unit = G && G.on && TC.commandUnit ? TC.commandUnit(sim, f, true) : null;
      if (unit && !TC.controls(sim, unit)) TC.requestMode(sim, unit, 'new', ID);
    });
  }

  root.BattleAIV2Meso = {
    on: ON,
    id: ID,
    executeMission: executeMission,
    squadCommand: squadCommand,
    fireAndMovement: fireAndMovement,
    takeAll: takeAll,
    skillOn: skillOn,
    leg: function (sq) {
      var st = squads.get(sq);
      return st && st.target ? { point: st.target, final: !!st.final, index: st.leg } : null;
    },
    skillSquads: skillSquads
  };

  /* Compatibility surface used by Squad Leader retention paths when the march provider is off. */
  if (ON) {
    root.BattleTacticalMarchProvider = {
      on: true,
      id: ID,
      structure: true,
      clear: true,
      singleWriter: true,
      skillOn: skillOn,
      leg: root.BattleAIV2Meso.leg,
      ownsSkill: function () {
        return false;
      },
      release: function () {},
      releaseMan: function () {},
      target: function (sq) {
        var st = squads.get(sq);
        return st && st.target;
      }
    };
  }
})(typeof window !== 'undefined' ? window : globalThis);
