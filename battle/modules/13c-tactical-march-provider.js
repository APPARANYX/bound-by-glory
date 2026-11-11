/* Foundational provider (slices 2/3 of the legacy replacement, `?tacticalController=new`). It takes
   every squad on both sides. Each squad walks
   its brief's route legs in Meso's formation layout and holds at the last leg; acceptance, transport,
   casualties, succession, retreat, rally recovery, physiology and reactions stay with their owners.
   The independent contact module (13d) chooses fire discipline and contact roles. Station selection
   and coordinated covered bounds remain later skills.

   It decides and asks; it writes nothing. Every effect is a capability request through the owner
   adapters (13b), and every man's progress is the stage his owner reports. A man the provider
   stopped asking for says why in summary(). State lives in a WeakMap keyed by the squad; no squad or
   soldier field, timer, RNG draw or movement writer is added. Without the flag the module does
   nothing, so a default battle is unchanged. */
(function (root) {
  'use strict';
  var SEARCH = typeof location !== 'undefined' ? location.search || '' : '',
    AIV2 = /[?&]aiV2=1(?:&|#|$)/i.test(SEARCH),
    ON = /[?&]tacticalController=new(?:&|#|$)/i.test(SEARCH) && !AIV2,
    /* ?supportWait=0 restores the controller marching support squads at once (no staged wait). */
    SUPPORT_WAIT = !/[?&]supportWait=0(?:&|#|$)/i.test(SEARCH),
    /* ?controllerStructure=0: a leg inside a building no longer waits for the structure chain. */
    STRUCTURE = !/[?&]controllerStructure=0(?:&|#|$)/i.test(SEARCH),
    /* ?controllerClear=0: a quiet contact no longer sends the controlled squad up on the last place the enemy was seen. */
    CLEAR = !/[?&]controllerClear=0(?:&|#|$)/i.test(SEARCH),
    /* ?controllerSingleWriter=0: the march keeps its own private leg counter again. With it on, the leg is
       the one Squad Leader execution (15l) holds in sq.routeIndex; the march proposes the next leg through
       mission.execute and follows only what the owner recorded. */
    SINGLE = !/[?&]controllerSingleWriter=0(?:&|#|$)/i.test(SEARCH),
    /* ?controllerPhaseBand=0: the objective phase flips again at the commit radius in both directions.
       With it on, a squad already in the objective's inside phase (defend, capture) keeps it until it
       leaves the objective's own radius, so a centroid hovering at the commit edge no longer flickers
       assault/defend (us-defend #793 seed -0011: 0.45 s of defend handed the squad to the Squad
       Leader's defense skill and back). The band is the objective's radius, not a tuned constant. */
    PHASE_BAND = !/[?&]controllerPhaseBand=0(?:&|#|$)/i.test(SEARCH),
    ID = 'march';
  var squads = new WeakMap(),
    skillSquads = new WeakMap(),
    warned = false;

  function skillState(sq) {
    var st = skillSquads.get(sq);
    if (!st) skillSquads.set(sq, (st = { kind: null, token: null, men: new Map(), stopped: new Map() }));
    return st;
  }
  function releaseSkill(ctx, reason) {
    var st = skillState(ctx.squad);
    st.men.forEach(function (cur) {
      ctx.finish(cur.id, reason);
    });
    st.men.clear();
    st.stopped.clear();
  }
  function sameSkillOrder(a, b) {
    var S = root.BattleSquadStability.controllerSkills;
    return a.key === b.key && (a.receipt || dist(a.point, b.point) <= S.epsilon);
  }
  /* S1b-f: select the retained skill, reuse its native geometry, then ask for each man's
     movement through the contract. No legacy fireteam publisher executes for a ported skill. */
  function squadSkill(ctx) {
    var Q = root.BattleSquadStability,
      S = Q && Q.controllerSkills,
      kind = S && S.kind(ctx.squad, ctx.sim),
      st = skillState(ctx.squad),
      token =
        ctx.token &&
        [
          ctx.token.generation,
          ctx.token.controllerEpoch,
          ctx.token.missionVersion,
          ctx.token.rosterRevision
        ].join(':');
    if (!kind || !S.enabled(kind)) kind = null;
    st.battle = ctx.sim;
    st.at = ctx.sim.time;
    if (kind !== st.kind || token !== st.token) {
      releaseSkill(ctx, 'squad-skill-changed');
      st.kind = kind;
      st.token = token;
    }
    if (!kind) return false;
    standDown(ctx, stateOf(ctx.squad), 'squad-skill:' + kind);
    var orders = S.plan(ctx.squad, ctx.sim, kind),
      seen = new Set();
    orders.forEach(function (o) {
      var id = String(o.man.id),
        cur = st.men.get(id),
        intent = { key: o.key, point: o.point, receipt: !!(o.options && o.options.adoptHere) };
      /* Native stations, covered bounds and personal combat retain their own locomotion.
         Retreat and regroup keep their native urgent precedence in the resolver. */
      var why = kind !== 'retreat' && kind !== 'regroup' && yields(ctx.squad, o.man, ctx.sim);
      if (why) {
        if (cur) ctx.finish(cur.id, why);
        st.men.delete(id);
        st.stopped.set(id, Object.assign({}, intent, { reason: why, retry: true }));
        return;
      }
      seen.add(id);
      if (cur && !sameSkillOrder(cur, intent)) {
        ctx.finish(cur.id, 'squad-skill-order-changed');
        st.men.delete(id);
        cur = null;
      }
      if (cur) {
        var stage = ctx.stage(cur.id);
        if (stage && stage.stage !== 'cancelled') return;
        ctx.finish(cur.id, 'squad-skill-owner-ended');
        st.men.delete(id);
        st.stopped.set(
          id,
          Object.assign({}, intent, { reason: stage ? stage.reason : 'interrupted', retry: false })
        );
      }
      var stopped = st.stopped.get(id);
      if (stopped && sameSkillOrder(stopped, intent) && !stopped.retry) return;
      var res = ctx.request('movement.move', id, { point: o.point, skill: kind });
      if (res.ok) {
        st.men.set(id, Object.assign({}, intent, { id: res.actionId }));
        st.stopped.delete(id);
      } else st.stopped.set(id, Object.assign({}, intent, { reason: 'refused:' + res.reason, retry: true }));
    });
    st.men.forEach(function (cur, id) {
      if (!seen.has(id)) {
        ctx.finish(cur.id, 'squad-skill-order-ended');
        st.men.delete(id);
      }
    });
    return true;
  }

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
    return l > 1e-6 ? { x: dx / l, z: dz / l } : null;
  }
  /* The leg arrival radius is the doctrine's own (the radius Squad Leader execution uses on a route leg). */
  function legCfg(sim, sq) {
    var C = root.BattleCommanderAI;
    return C && C.policyFor ? C.policyFor(sim, sq.faction) : null;
  }
  function legRadius(sim, sq) {
    var cfg = legCfg(sim, sq);
    return +(cfg && cfg.routeArrivalRadius) || 8;
  }
  /* The Squad Leader's own staging rule, reused as it is: a support squad that has reached its second
     leg waits there until the doctrine's support delay ends or another squad of its side has committed. */
  function supportWaiting(sim, sq, cfg) {
    var Q = root.BattleSquadStability,
      M = Q && Q.controllerMission,
      m = sq._macroMission;
    return !!(
      SUPPORT_WAIT &&
      M &&
      M.assaultCommitted &&
      sq.commandRole === 'support' &&
      !(m && /^(screen|intercept|reserve|hold)$/.test(m.intent || '')) &&
      +sim.time < (+(cfg && cfg.supportDelay) || 0) &&
      !M.assaultCommitted(sim, sq)
    );
  }
  function stateOf(sq) {
    var st = squads.get(sq);
    if (!st) squads.set(sq, (st = { mission: null, leg: 0, target: null, forward: null, men: new Map() }));
    return st;
  }

  /* The structure security chain (local plan, 15n) is the one owner of "entered and accepted": a leg that
     ends inside a building is not left until it says so, exactly as Squad Leader execution (15l) gates it.
     Without the chain's flags it never requires an entry, so the march is unchanged. */
  function entryState(sim, sq, p) {
    var LP = STRUCTURE && root.BattleSquadStability && root.BattleSquadStability.localPlan;
    if (!LP || !LP.entryRequired || !LP.entryRequired(sim, sq, p)) return 'none';
    return LP.entrySatisfied && LP.entrySatisfied(sim, sq, p) ? 'accepted' : 'pending';
  }

  /* executeMission: route progression. The squad moves to its next leg once its centre is within the
     leg radius; the last leg is where it holds. The brief's legs are the retained `sq.route`. */
  function executeMission(ctx) {
    var sq = ctx.squad,
      sim = ctx.sim,
      st = stateOf(sq),
      legs = sq.route || [],
      m = sq._macroMission || null;
    var Q = root.BattleSquadStability,
      M = Q && Q.controllerMission,
      skillLegBefore = +sq.routeIndex || 0;
    var held = M && M.heldBy && M.heldBy(sq);
    if (held && held !== 'recon') {
      st.idle = 'yield:' + held;
      return;
    }
    if (
      skillOn('recon') &&
      M &&
      M.reconHeld &&
      sq.state !== 'retreat' &&
      sq.commandPhase !== 'retreat' &&
      M.reconHeld(sim, sq)
    ) {
      st.idle = 'yield:recon';
      return;
    }
    held = M && M.heldBy && M.heldBy(sq);
    if (held) {
      st.idle = 'yield:' + held;
      return;
    }
    if (st.mission !== m) {
      st.mission = m;
      st.leg = 0;
      st.target = null;
      st.transportHandoff = null;
    }
    if (!legs.length) {
      st.target = null;
      st.idle = 'no-route';
      return;
    }
    /* The owner never records a leg for a brief without a point (publishMission skips it), so with one writer the
       march stays on the owner's leg; say why instead of marching where nobody recorded. */
    st.idle = SINGLE && m && !point(m.point) ? 'brief-without-point' : null;
    st.retry = true; // refusals are asked again once per mission tick, not every squad tick
    st.check = true; // so are the men's stages and the slots: Squad Command runs every step, the march does not
    var last = legs.length - 1,
      here = centroid(men(sq)),
      r = legRadius(sim, sq);
    /* Consume the retained owner's once-only route/anchor adoption, including a reset on the
       same leg. Resolver resets do not end Meso handles; finish our own move AND hold actions. */
    var ex = sq._missionExecution;
    if (ex && ex.mission === m && ex.transportHandoff && st.transportHandoff !== ex) {
      standDown(ctx, st, 'transport-handoff');
      st.leg = Math.max(0, Math.min(last, +sq.routeIndex || 0));
      st.target = null;
      st.transportHandoff = ex;
    }
    /* One writer: the leg is the owner's. A squad taken mid-route, a refused publication or the owner's own
       adoption all start from what the owner holds, never from a counter only this provider keeps. */
    if (SINGLE) st.leg = ownerLeg(sq, last);
    st.leg = Math.min(st.leg, last);
    /* A leg inside a building waits for the chain, but only for the General's own stall-replan budget (the
       one the legacy route-transition lease uses); the wait says why, and a timeout moves on. */
    /* Waiting support squads do not advance past leg 1; the legs themselves stay the brief's. */
    st.supportWaiting = supportWaiting(sim, sq, legCfg(sim, sq));
    var ceiling = st.supportWaiting ? Math.min(1, last) : last,
      budget = (root.BattleCommanderAI && +root.BattleCommanderAI.strategicStallReplan) || Infinity;
    st.entryWait = null;
    while (st.leg < ceiling) {
      var legPoint = point(legs[st.leg]),
        gate = entryState(sim, sq, legPoint);
      /* The chain accepting a crossing is the leg reached: the squad's centre can stay outside the walls while
         its guards hold the doorway. */
      if (gate !== 'accepted') {
        if (dist(here, legPoint) > r) break;
        if (gate === 'pending') {
          if (st.waitLeg !== st.leg) {
            st.waitLeg = st.leg;
            st.waitSince = +sim.time || 0;
          }
          if ((+sim.time || 0) - st.waitSince < budget) {
            st.entryWait = 'entry-pending';
            break;
          }
          st.timedOut = st.leg;
        }
      }
      st.leg++;
    }
    if (!st.entryWait) st.waitLeg = null; // a wait that was left starts afresh when the squad is back
    aim(st, legs, here);
    publishMission(ctx, st, here);
    /* The proposal is only a proposal: the men march to the leg the owner recorded after it answered. */
    if (SINGLE && st.leg !== ownerLeg(sq, last)) {
      st.leg = ownerLeg(sq, last);
      aim(st, legs, here);
    }
    if (M && M.skills) M.skills(sim, sq, skillLegBefore, skillOn('recon'), skillOn('structure'));
  }
  function ownerLeg(sq, last) {
    return Math.max(0, Math.min(last, Math.floor(+sq.routeIndex) || 0));
  }
  function aim(st, legs, here) {
    var target = point(legs[st.leg]);
    if (!st.target || dist(st.target, target) > 1e-6) {
      var from = st.leg > 0 ? point(legs[st.leg - 1]) : here;
      st.forward = (from && unit(from, target)) || st.forward || { x: 0, z: 1 };
      st.target = target;
      st.final = st.leg === legs.length - 1;
      st.stopped = new Map();
    }
  }

  function publishMission(ctx, st, here) {
    var sq = ctx.squad,
      sim = ctx.sim,
      m = sq._macroMission,
      Q = root.BattleSquadStability,
      M = Q && Q.controllerMission;
    if (!M || !here || (m && !point(m.point)) || sq.state === 'retreat' || sq.commandPhase === 'regroup')
      return;
    var phase = 'approach',
      objective = st.target,
      legs = sq.route,
      C = root.BattleCommanderAI,
      cfg = C && C.policyFor ? C.policyFor(sim, sq.faction) : {},
      ex = sq._missionExecution;
    if ((m && m.intent === 'reserve') || (!m && sq.commandRole === 'reserve')) {
      phase = 'reserve';
      objective = point(legs[legs.length - 1]);
    } else if (m && m.intent === 'hold') {
      phase = 'hold';
      objective = point(legs[legs.length - 1]);
    } else if (st.supportWaiting && st.leg >= 1) {
      phase = 'support-hold';
      objective = point(legs[Math.min(1, legs.length - 1)]);
    } else if (m && (m.intent === 'screen' || m.intent === 'intercept') && st.final) {
      phase = dist(here, st.target) <= 38 ? 'hold' : 'approach';
    } else if (m && m.objectiveId && st.final) {
      if (m.action === 'hold' || m.action === 'regroup' || m.action === 'support') {
        phase = m.action === 'support' ? 'support-hold' : 'hold';
        objective = point(ex && ex.holdPoint) || here;
      } else if (m.point) {
        phase = M.objectivePhase(sim, sq, m, cfg, here);
        var inside = m.intent === 'defend' ? 'defend' : 'capture';
        if (PHASE_BAND && phase === 'assault' && sq.commandPhase === inside) {
          var O = root.BattleObjectiveSystem && root.BattleObjectiveSystem.get(sim, m.objectiveId),
            radius = +(O && O.def && O.def.radius) || 30;
          if (dist(here, m.point) <= radius) phase = inside;
        }
      }
    } else if (m && m.action === 'flank' && st.leg === (m.route || []).length - 1) phase = 'flank';
    if (sq.commandPhase === phase && sq.routeIndex === st.leg && dist(sq.objective, objective) < 1e-6) return;
    var res = ctx.request('mission.execute', null, { leg: st.leg, phase: phase, point: objective });
    if (res.ok) ctx.finish(res.actionId, 'completed');
  }

  /* squadCommand: each man walks to his formation slot around the leg point, then holds there on the
     last leg. An accepted order is asked for once per leg; one the owner ended is not asked for again
     on the same leg, and the man is listed as stopped with the owner's reason. A refusal changed
     nothing, so it is asked again after the next mission tick (a rider still seated, a cleanup still
     pending) and listed as stopped while it lasts. Retreat is a retained service and wins: on a retreat every
     order and hold is finished at its owner, and the men are asked again once the retreat ends. */
  function squadCommand(ctx) {
    var sq = ctx.squad,
      st = stateOf(sq),
      Q = root.BattleSquadStability;
    if (squadSkill(ctx)) {
      st.idle = 'skill:' + skillState(sq).kind;
      return;
    }
    /* The resolver treats either as retreat; so does the provider. */
    if (sq.state === 'retreat' || sq.commandPhase === 'retreat') return standDown(ctx, st, 'retreat');
    /* Recon and regroup are the Squad Leader's own skills, reused as they are: while one holds the
       squad the march stands down and that skill's fireteam orders move the men. */
    var retained =
      Q &&
      ((Q.retainedSkill && Q.retainedSkill(sq, ctx.sim)) ||
        (Q.defensivePhase && Q.defensivePhase(sq) ? 'defense' : null));
    if (retained) {
      st.idle = 'yield:' + retained;
      st.check = true; // the men are asked again on the first step after the lease ends
      return standDown(ctx, st, 'yield:' + retained);
    }
    if (!st.target || !Q || !Q.formationSlots) return;
    if (!st.check) {
      /* Between mission ticks only the yields run, so a skill that takes a man over is never late. */
      st.men.forEach(function (cur, id) {
        var why = yields(sq, cur.man, ctx.sim);
        if (!why) return;
        ctx.finish(cur.actionId, why);
        st.men.delete(id);
        if (st.stopped) st.stopped.delete(id);
      });
      return;
    }
    st.check = false;
    /* Men walk to slots around the Squad Leader's paced anchor (it strides toward the leg as the squad
       arrives), not the far end of the leg: the pacing skill is reused, not replaced. */
    var anchor = point(sq.orderAnchor) || st.target;
    if (!st.slotAnchor || dist(st.slotAnchor, anchor) > 1) st.slotAnchor = anchor;
    var atGoal = dist(st.slotAnchor, st.target) <= 3,
      slots = Q.formationSlots(sq, st.slotAnchor, st.forward);
    for (var i = 0; i < slots.length; i++) {
      var s = slots[i].man;
      if (s.dead || s.isPlayer) continue;
      var id = String(s.id),
        slot = slots[i].point,
        cur = st.men.get(id),
        why = yields(sq, s, ctx.sim);
      if (why) {
        if (cur) ctx.finish(cur.actionId, why);
        st.men.delete(id);
        st.stopped.delete(id);
        continue;
      }
      var stage = cur && ctx.stage(cur.actionId);
      if (cur && !stage) cur = null; // the controller ended it (mission, roster, interrupt)
      if (cur && cur.target !== st.slotAnchor) {
        ctx.finish(cur.actionId, 'superseded');
        cur = null;
      }
      if (cur) {
        if (stage.stage === 'cancelled') {
          ctx.finish(cur.actionId, 'cancelled');
          st.men.delete(id);
          st.stopped.set(id, stage.reason);
        } else if (cur.kind === 'move' && st.final && atGoal && stage.stage === 'arrived') {
          ctx.finish(cur.actionId, 'completed');
          ask(ctx, st, s, 'movement.hold', cur.point);
        }
        continue;
      }
      st.men.delete(id);
      var stopped = st.stopped.get(id);
      if (!stopped || (st.retry && stopped.indexOf('refused:') === 0)) ask(ctx, st, s, 'movement.move', slot);
    }
    st.retry = false;
  }
  function standDown(ctx, st, reason) {
    st.men.forEach(function (cur) {
      ctx.finish(cur.actionId, reason);
    });
    st.men.clear();
    if (st.stopped) st.stopped.clear();
  }
  /* Who else has the man: a claimed native station owns locomotion; contact by another man is not a
     personal permission to march into a distant route leg; a covered-bound role or soldier combat
     decision belongs to its own skill. The first reason that applies releases only this man's order. */
  function yields(sq, s, sim) {
    var P = root.BattleTacticalPositions,
      C = root.BattleTacticalContactSkills,
      M = root.BattleTacticalCoveredManeuver,
      K = root.BattleTacticalAmbushSkill;
    if (P && P.current(s)) return 'station-claimed';
    if (K && K.wants(s)) return 'ambush-post';

    /* The Squad Leader's clearing order (15i) is the one contact state in which the squad moves up on a point nobody
       has confirmed, so a man without a personal target follows the march then. */
    if (sq.inContact && !s.target && !(CLEAR && sq.clearContact)) return 'unconfirmed-personal-contact';
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
        point: at,
        target: st.slotAnchor
      });
    } else {
      st.men.delete(id);
      st.stopped.set(id, 'refused:' + ((res && res.reason) || 'unknown'));
    }
  }
  function noop() {}
  function skillOn(kind) {
    var Q = root.BattleSquadStability;
    return !!((ON || AIV2) && Q && Q.controllerSkills && Q.controllerSkills.enabled(kind));
  }

  /* Take every squad on both sides; a refused switch is retried by the controller's own backoff. */
  function takeAll(sim) {
    var TC = root.BattleTacticalController;
    if (!TC || !sim || !sim.factions) return;
    /* A page that did not load the contract cannot hand over a squad; say so instead of marching nobody. */
    if (!root.BattleTacticalCapabilityContract && !warned) {
      warned = true;
      if (typeof console !== 'undefined' && console.warn)
        console.warn(
          '[TACTICAL] ?tacticalController=new but the capability contract is not loaded: legacy keeps every squad'
        );
    }
    if (!root.BattleTacticalContactSkills) {
      if (typeof console !== 'undefined' && console.warn)
        console.warn('[TACTICAL] contact skills missing: legacy keeps every squad');
      return;
    }
    ['us', 'ge'].forEach(function (f) {
      var a = (sim.factions[f] && sim.factions[f].squads) || [];
      for (var i = 0; i < a.length; i++) if (!TC.controls(sim, a[i])) TC.requestMode(sim, a[i], 'new', ID);
      /* The General's command unit (13j, roadmap section 8 slice M1); ?controllerReconstitution=0 leaves it legacy. */
      var G = root.BattleTacticalGeneral,
        unit = G && G.on && TC.commandUnit ? TC.commandUnit(sim, f, true) : null;
      if (unit && !TC.controls(sim, unit)) TC.requestMode(sim, unit, 'new', ID);
    });
  }
  /* Per squad: the leg it is on, and each man's action with the stage its owner reports, or why the
     provider stopped asking for him. */
  function summary(sim) {
    var TC = root.BattleTacticalController,
      live = (TC && TC.summary(sim).live) || [],
      byId = {},
      out = [];
    live.forEach(function (a) {
      byId[a.actionId] = a;
    });
    ['us', 'ge'].forEach(function (f) {
      var a = (sim.factions && sim.factions[f] && sim.factions[f].squads) || [];
      for (var i = 0; i < a.length; i++) {
        var st = squads.get(a[i]);
        if (!st) continue;
        var row = {
          squad: f + ':' + a[i].id,
          controlled: !!(TC && TC.controls(sim, a[i])),
          leg: st.leg,
          legs: (a[i].route || []).length,
          idle: st.idle || null,
          entryWait: st.entryWait || null,
          entryTimedOut: st.timedOut === undefined ? null : st.timedOut,
          stages: {},
          stopped: {}
        };
        if (root.BattleTacticalContactSkills) row.contact = root.BattleTacticalContactSkills.summary(a[i]);
        if (root.BattleTacticalCoveredManeuver)
          row.maneuver = root.BattleTacticalCoveredManeuver.summary(a[i]);
        if (root.BattleTacticalAmbushSkill) row.ambush = root.BattleTacticalAmbushSkill.summary(a[i]);
        if (root.BattleTacticalFlankAssault) row.flank = root.BattleTacticalFlankAssault.summary(a[i]);
        var skill = skillState(a[i]);
        row.squadSkill = { kind: skill.kind, actions: skill.men.size, stopped: {} };
        skill.stopped.forEach(function (s) {
          row.squadSkill.stopped[s.reason] = (row.squadSkill.stopped[s.reason] || 0) + 1;
        });
        st.men.forEach(function (cur) {
          var l = byId[cur.actionId],
            key = cur.kind + ':' + (l ? l.stage : 'gone');
          row.stages[key] = (row.stages[key] || 0) + 1;
        });
        (st.stopped || new Map()).forEach(function (why) {
          row.stopped[why] = (row.stopped[why] || 0) + 1;
        });
        out.push(row);
      }
    });
    return out;
  }

  function fireAndMovementContact(ctx) {
    var Q = root.BattleSquadStability;
    if (Q && Q.noteControllerSuccession) Q.noteControllerSuccession(ctx.sim, ctx.squad, ctx.facts);
    var LP = Q && Q.localPlan;
    if (skillOn('structure') && STRUCTURE && LP && LP.structuresOn) LP.update(ctx.sim, ctx.squad, ctx.facts);
    root.BattleTacticalContactSkills.update(ctx);
  }
  function fireAndMovementManeuver(ctx) {
    if (root.BattleTacticalFlankAssault) root.BattleTacticalFlankAssault.update(ctx);
    if (root.BattleTacticalCoveredManeuver) root.BattleTacticalCoveredManeuver.update(ctx);
    if (root.BattleTacticalAmbushSkill) root.BattleTacticalAmbushSkill.update(ctx);
  }
  function fireAndMovementAll(ctx) {
    fireAndMovementContact(ctx);
    fireAndMovementManeuver(ctx);
  }
  root.BattleTacticalMarchCore = {
    id: ID,
    skillOn: skillOn,
    structure: STRUCTURE,
    clear: CLEAR,
    singleWriter: SINGLE,
    executeMission: executeMission,
    squadCommand: squadCommand,
    fireAndMovementContact: fireAndMovementContact,
    fireAndMovementManeuver: fireAndMovementManeuver,
    fireAndMovement: fireAndMovementAll,
    commanderTick: function (ctx) {
      var Q = root.BattleSquadStability;
      if (skillOn('regroup')) Q.controllerSkills.review(ctx.sim, ctx.squad);
    },
    takeAll: takeAll,
    ownsSkill: function (sq, sim) {
      var st = skillSquads.get(sq);
      return !!(st && st.kind && st.battle === sim && st.at === sim.time);
    },
    leg: function (sq) {
      var st = squads.get(sq);
      return st && st.target ? { point: st.target, final: !!st.final, index: st.leg } : null;
    },
    target: function (sq) {
      return stateOf(sq).target;
    },
    release: function (ctx) {
      standDown(ctx, stateOf(ctx.squad), 'covered-maneuver');
    }
  };
  root.BattleTacticalMarchCore.releaseMan = function (ctx, man) {
    var skill = skillState(ctx.squad),
      personal = skill.men.get(String(man.id));
    if (personal) ctx.finish(personal.id, 'squad-skill-handoff');
    skill.men.delete(String(man.id));
    skill.stopped.delete(String(man.id));
    var st = stateOf(ctx.squad),
      id = String(man.id),
      cur = st.men.get(id);
    if (cur) ctx.finish(cur.actionId, 'station-selection');
    st.men.delete(id);
    if (st.stopped) st.stopped.delete(id);
  };

  if (AIV2) return;
  root.BattleTacticalMarchProvider = {
    on: ON,
    structure: STRUCTURE,
    clear: CLEAR,
    singleWriter: SINGLE,
    skillOn: skillOn,
    ownsSkill: function (sq, sim) {
      var st = skillSquads.get(sq);
      return !!(st && st.kind && st.battle === sim && st.at === sim.time);
    },
    id: ID,
    summary: summary,
    target: function (sq) {
      return stateOf(sq).target;
    },
    /* The leg the march is on, for the Squad Leader's retained recon decision. */
    leg: function (sq) {
      var st = squads.get(sq);
      return st && st.target ? { point: st.target, final: !!st.final, index: st.leg } : null;
    },
    release: function (ctx) {
      standDown(ctx, stateOf(ctx.squad), 'covered-maneuver');
    },
    releaseMan: function (ctx, man) {
      var skill = skillState(ctx.squad),
        personal = skill.men.get(String(man.id));
      if (personal) ctx.finish(personal.id, 'squad-skill-handoff');
      skill.men.delete(String(man.id));
      skill.stopped.delete(String(man.id));
      var st = stateOf(ctx.squad),
        id = String(man.id),
        cur = st.men.get(id);
      if (cur) ctx.finish(cur.actionId, 'station-selection');
      st.men.delete(id);
      if (st.stopped) st.stopped.delete(id);
    }
  };
  if (!ON) return;
  var TC = root.BattleTacticalController,
    OA = root.BattleTacticalOwnerAdapters;
  if (!TC || !OA) throw new Error('The march provider needs the tactical controller and its owner adapters');
  var reg = TC.registerProvider({
    id: ID,
    policies: {
      squadCommand: squadCommand,
      commanderTick: function (ctx) {
        var Q = root.BattleSquadStability;
        if (skillOn('regroup')) Q.controllerSkills.review(ctx.sim, ctx.squad);
      },
      fireAndMovement: fireAndMovementAll,
      executeMission: executeMission,
      engagement: function (ctx) {
        if (root.BattleTacticalCoveredManeuver && root.BattleTacticalCoveredManeuver.engagement(ctx)) return;
        root.BattleTacticalContactSkills.engagement(ctx);
      },
      stationSelection: function (ctx) {
        if (root.BattleTacticalStationSkill) root.BattleTacticalStationSkill.update(ctx);
      },
      generalTick: function (ctx) {
        if (root.BattleTacticalGeneral) root.BattleTacticalGeneral.update(ctx);
      }
    },
    soldierPolicy: function (slot, facts) {
      if (!root.BattleTacticalSoldierPolicy) throw new Error('Micro soldier policy is missing');
      return root.BattleTacticalSoldierPolicy.choose(slot, facts);
    },
    adapters: OA.adapters,
    lifecycle: OA.lifecycle
  });
  if (!reg.ok) throw new Error('March provider rejected: ' + reg.reason);
  if (root.BattleModules)
    root.BattleModules.registerSystem('tactical-march-provider', {
      version: '2-march-contact',
      onBattleStart: takeAll,
      onCommanderTick: takeAll
    });
  if (root.GTLog)
    root.GTLog('[TACTICAL] foundational provider on (?tacticalController=new): march and contact skills');
})(typeof window !== 'undefined' ? window : globalThis);
