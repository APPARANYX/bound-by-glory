/* Owner adapters for the tactical controller (13a). One adapter per capability of the #656 contract:
   a thin bridge from an already validated request to the existing owner call, plus a read-only stage
   projection from that owner's own state and the owner's cancel and release. Adapters decide nothing:
   the provider chooses the man, the point, the station and the stance. They add no squad or soldier
   field, timer, lease or movement writer; per-action handles live in a WeakMap keyed by the frozen
   request the controller hands to both the adapter and the lifecycle callbacks. */
(function (root) {
  'use strict';
  var handles = new WeakMap();

  function dist(a, b) {
    return !a || !b ? Infinity : Math.hypot(a.x - b.x, a.z - b.z);
  }
  function now(sim) {
    return +(sim && sim.time) || 0;
  }
  function squadOf(sim, req) {
    var f = sim && sim.factions && sim.factions[req.faction],
      list = (f && f.squads) || [];
    for (var i = 0; i < list.length; i++) if (list[i] && list[i].id === req.squadId) return list[i];
    return null;
  }
  function manOf(sq, req) {
    var a = (sq && sq.members) || [];
    for (var i = 0; i < a.length; i++) if (a[i] && String(a[i].id) === req.actorId) return a[i];
    return null;
  }
  function keep(req, sim, h) {
    h.sim = sim;
    h.capability = req.capability;
    h.stage = 'accepted';
    h.reason = 'owner-accepted';
    h.at = h.requestedAt = now(sim);
    handles.set(req, h);
    return true;
  }
  /* `at` is the owner's own time for the change; only an owner that keeps none falls back to the read. */
  function mark(h, stage, reason, at) {
    if (h.stage === stage && h.reason === reason) return;
    h.stage = stage;
    h.reason = reason;
    h.at = Number.isFinite(at) ? at : now(h.sim);
  }
  function stanceAt(s, stance) {
    var trail = (s.eng && s.eng.stanceTrail) || [],
      last = trail[trail.length - 1];
    return last && last.to === stance ? last.at : null;
  }
  function mission(sq, req) {
    var m = sq && sq._macroMission;
    return m && m.version === req.missionVersion ? m : null;
  }
  function ride(sq, req) {
    var t = sq && sq._transport;
    return t && t.missionVersion === req.missionVersion ? t : null;
  }

  function rideEnded(h) {
    var t = h.squad._transport;
    return t !== h.ride || ['boarding', 'embarked', 'disembarking'].indexOf(t.phase) < 0;
  }

  function here(s) {
    var p = s && s.root && s.root.position;
    return p ? { x: +p.x, z: +p.z } : null;
  }
  /* Execution outcome (18a) states for a Meso order, in the contract's movement.move stage names. */
  var MOVE_STAGE = {
    pending: 'published',
    adopted: 'adopted',
    held: 'applied',
    executing: 'resolved',
    blocked: 'resolved',
    completed: 'arrived'
  };

  /* Ending is the same at cancel and at release: a finished action is released without a cancel, so
     each ends only its own claim, order or hold at the owner and then confirms it is gone. */
  function endStation(h, reason) {
    var P = root.BattleTacticalPositions;
    if (P && P.current(h.man) === h.task) P.release(h.man, h.sim, 'controller:' + reason);
    return !P || P.current(h.man) !== h.task;
  }
  function endOrder(h) {
    return root.BattleSquadStability.controllerMovement.end(h.man, h.order);
  }
  function endHold(h) {
    var st = h.man._movementResolver;
    if (st && st.combat === h.proposal) root.BattleMovementResolver.clearCombat(h.man);
    return !st || st.combat !== h.proposal;
  }

  var CAPS = {
    'maneuver.cover': {
      request: function (req, sim) {
        var sq = squadOf(sim, req),
          Q = root.BattleSquadStability,
          task = Q && Q.controllerBound && Q.controllerBound.begin(sq, sim, req.params);
        return !!task && keep(req, sim, { squad: sq, task: task });
      },
      stage: function (h) {
        var live = root.BattleSquadStability.controllerBound.current(h.squad, h.sim) === h.task;
        mark(h, live ? 'executing' : 'cancelled', live ? 'covering-window' : 'bound-window-ended');
      },
      cancel: function (h) {
        return root.BattleSquadStability.controllerBound.end(h.squad, h.sim, h.task);
      },
      release: function (h) {
        return root.BattleSquadStability.controllerBound.end(h.squad, h.sim, h.task);
      }
    },
    'fire.control': {
      request: function (req, sim) {
        var Q = root.BattleSquadStability,
          sq = squadOf(sim, req),
          order = Q && Q.controllerFireControl && Q.controllerFireControl.publish(sq, sim, req.params);
        return !!order && keep(req, sim, { squad: sq, order: order });
      },
      stage: function (h) {
        mark(
          h,
          h.squad.fireControl === h.order ? 'published' : 'cancelled',
          h.squad.fireControl === h.order ? 'published:await-personal-adoption' : 'owner:ended',
          h.order.since
        );
      },
      cancel: function (h) {
        return root.BattleSquadStability.controllerFireControl.end(h.squad, h.sim, h.order);
      },
      release: function (h) {
        return root.BattleSquadStability.controllerFireControl.end(h.squad, h.sim, h.order);
      }
    },
    'combat.contact': {
      request: function (req, sim) {
        var E = root.BattleEngagement,
          s = manOf(squadOf(sim, req), req),
          task =
            s &&
            E &&
            E.controllerCombat &&
            (req.capability === 'combat.bound'
              ? E.controllerCombat.bound(s, sim, req.params.point, req.actionId)
              : E.controllerCombat.start(
                  s,
                  sim,
                  req.capability === 'combat.march' ? 'march' : req.params.drill,
                  req.params.point
                ));
        return !!task && keep(req, sim, { man: s, task: task });
      },
      stage: function (h) {
        var stage = root.BattleEngagement.controllerCombat.stage(h.man, h.sim, h.task);
        mark(h, stage.stage, stage.reason, stage.at);
      },
      cancel: function (h) {
        return root.BattleEngagement.controllerCombat.end(h.man, h.sim, h.task);
      },
      release: function (h) {
        return root.BattleEngagement.controllerCombat.end(h.man, h.sim, h.task);
      }
    },
    /* Meso (module 16) publishes the man's personal order; Command Reception adopts it, Squad Command
       applies it to the resolver and the execution outcome reader says how far it got. */
    'movement.move': {
      request: function (req, sim) {
        var M = root.BattleSquadStability && root.BattleSquadStability.controllerMovement,
          sq = squadOf(sim, req),
          s = manOf(sq, req);
        if (!s || !M) return false;
        var order = M.publish(sq, sim, s, req.params.point, req.actionId, req.params.skill);
        if (!order) return false;
        return keep(req, sim, { man: s, order: order });
      },
      stage: function (h) {
        var M = root.BattleSquadStability.controllerMovement,
          CR = root.BattleCommandReception,
          X = root.BattleExecutionOutcome,
          s = h.man;
        if (s.dead) return mark(h, 'cancelled', 'actor-dead');
        if (s.isPlayer) return mark(h, 'cancelled', 'player-owned');
        if (!M.current(s, h.order)) return mark(h, 'cancelled', 'owner:ended');
        /* Without personal adoption Squad Command applies the order at once; there is no envelope. */
        if (!(CR && CR.movementEnabled && CR.movementEnabled()))
          return mark(h, 'applied', 'adoption-off', h.order.publishedAt);
        var o = X && X.man(s, h.sim);
        if (!o || o.publishKey !== h.order.key) return;
        var rec = CR.peek(s, h.sim, 'movement', 'soldier:' + String(s.id)),
          stage = MOVE_STAGE[o.state];
        if (!stage) return;
        var reason = o.why || (o.by ? 'held:' + o.by : o.terminal ? 'blocked-terminal' : o.state),
          at = stage === 'published' ? rec.issuedAt : stage === 'adopted' ? rec.adoptedAt : null;
        mark(h, stage, reason, at);
      },
      cancel: endOrder,
      release: endOrder
    },
    /* The resolver owns arbitration: a hold is one native `hold` proposal with no expiry of its own. The
       resolver ends it when the squad's phase, plan or retreat changes or a higher authority replaces it. */
    'movement.hold': {
      request: function (req, sim) {
        var R = root.BattleMovementResolver,
          sq = squadOf(sim, req),
          s = manOf(sq, req);
        if (!s || !R || !R.proposeCombat) return false;
        var p = R.proposeCombat(s, req.params.point, sim, 'hold', Infinity, {
          source: 'tactical-controller',
          reason: 'controller hold'
        });
        if (!p || p.owner !== 'tactical-controller' || s._movementResolver.combat !== p) return false;
        return keep(req, sim, { man: s, proposal: p });
      },
      stage: function (h) {
        var R = root.BattleMovementResolver,
          s = h.man,
          st = s._movementResolver,
          p = h.proposal,
          last = st && st.last;
        if (s.dead) mark(h, 'cancelled', 'actor-dead');
        else if (!st || st.combat !== p) mark(h, 'cancelled', 'owner:replaced');
        else if (!last || last.owner !== p.owner || last.issuedAt !== p.issuedAt)
          mark(h, 'accepted', last ? 'outranked:' + last.kind : 'owner-accepted');
        else if (dist(here(s), p.point) <= R.arrival) mark(h, 'holding', 'holding');
        else mark(h, 'resolved', 'resolved');
      },
      cancel: endHold,
      release: endHold
    },
    /* Engagement is the one stance writer; its request only lowers, for the owner's own hold time. */
    'posture.lower': {
      request: function (req, sim) {
        var E = root.BattleEngagement,
          sq = squadOf(sim, req),
          s = manOf(sq, req),
          T = E && E.tuning;
        if (!s || !E || !E.requestStance || !T) return false;
        var hold = req.params.stance === 'crouch' ? T.STANCE_HOLD : T.PRONE_HOLD;
        if (!E.requestStance(s, sim, req.params.stance, hold)) return false;
        return keep(req, sim, { man: s, stance: req.params.stance });
      },
      stage: function (h) {
        var e = h.man.eng;
        if (h.man.dead) mark(h, 'cancelled', 'actor-dead');
        else if (e && e.stance === h.stance) mark(h, 'committed', 'committed', stanceAt(h.man, h.stance));
      },
      cancel: function () {
        return true;
      },
      release: function () {
        return true;
      }
    },
    /* Module 20 owns reservation, ingress and release; the claim names the canonical station by id. */
    'station.claim': {
      request: function (req, sim) {
        var P = root.BattleTacticalPositions,
          sq = squadOf(sim, req),
          s = manOf(sq, req);
        if (!s || !P || !P.claim || !P.current || P.current(s)) return false;
        var task = P.claim(s, sim, { id: req.params.stationId }, req.params.threat);
        if (!task || P.current(s) !== task) return false;
        return keep(req, sim, { man: s, task: task });
      },
      stage: function (h) {
        var P = root.BattleTacticalPositions;
        var t = h.task;
        if (!P || P.current(h.man) !== t)
          mark(h, 'cancelled', t.releaseReason ? 'owner:' + t.releaseReason : 'cancelled', t.releasedAt);
        else if (t.occupiedAt != null) mark(h, 'occupied', 'occupied', t.occupiedAt);
        else mark(h, 'assigned', 'assigned', t.assignedAt);
      },
      cancel: endStation,
      release: endStation
    },
    /* Meso commits the selected mission state; release never rolls a brief back. */
    'mission.execute': {
      request: function (req, sim) {
        var sq = squadOf(sim, req),
          M = root.BattleSquadStability && root.BattleSquadStability.controllerMission;
        return !!(M && M.publish(sim, sq, req.missionVersion, req.params)) && keep(req, sim, { squad: sq });
      },
      stage: function (h, req) {
        var sq = h.squad,
          p = req.params;
        if (sq.routeIndex === p.leg && sq.commandPhase === p.phase && dist(sq.objective, p.point) < 1e-6)
          mark(h, 'applied', 'mission-state-applied');
        else mark(h, 'cancelled', 'mission-state-changed');
      },
      cancel: function () {
        return true;
      },
      release: function () {
        return true;
      }
    },
    /* The Commander owns mission status; acceptance is a transition it makes or refuses. */
    'mission.accept': {
      request: function (req, sim) {
        var C = root.BattleCommanderAI,
          sq = squadOf(sim, req),
          m = mission(sq, req);
        if (!m || !C || !C.acceptMission) return false;
        if (m.status !== 'executing') C.acceptMission(sim, sq);
        if (m.status !== 'executing') return false;
        return keep(req, sim, { squad: sq });
      },
      stage: function (h, req) {
        var m = mission(h.squad, req),
          next = h.squad._macroMission;
        if (!m) mark(h, 'cancelled', 'mission-superseded', next && next.issuedAt);
        else if (m.status === 'executing') mark(h, 'executing', 'executing', m.acceptedAt);
      },
      cancel: function () {
        return true;
      },
      release: function () {
        return true;
      }
    },
    /* Module 58 owns the journey: quote, seats, boarding, travel and dismount. */
    'transport.consider': {
      request: function (req, sim) {
        var T = root.BattleSquadTransport,
          sq = squadOf(sim, req),
          m = mission(sq, req);
        if (!m || !T || !T.considerMission || !T.considerMission(sim, sq, m)) return false;
        /* A ride the owner started for another brief is not this action's: end it, never leave it untracked. */
        if (!ride(sq, req)) {
          if (T.finish) T.finish(sim, sq, 'controller:untracked');
          return false;
        }
        return keep(req, sim, { squad: sq, ride: sq._transport });
      },
      stage: function (h) {
        var t = h.squad._transport,
          r = h.ride;
        if (t !== r) mark(h, 'cancelled', 'owner:' + (r.endReason || 'ended'), r.endedAt);
        else if (t.phase === 'embarked') mark(h, 'embarked', 'embarked', t.embarkedAt);
        else if (t.phase === 'boarding') mark(h, 'boarding', 'boarding', h.requestedAt);
        else mark(h, 'cancelled', 'owner:' + (t.endReason || t.phase), t.endedAt);
      },
      cancel: function (h, reason) {
        var T = root.BattleSquadTransport,
          t = h.squad._transport;
        if (T && T.finish && t === h.ride) T.finish(h.sim, h.squad, 'controller:' + reason);
        return true;
      },
      /* Released once the owner no longer carries or seats the squad for this ride. */
      release: rideEnded
    },
    'transport.cancel': {
      request: function (req, sim) {
        var T = root.BattleSquadTransport,
          sq = squadOf(sim, req),
          t = ride(sq, req);
        if (!t || !T || !T.finish || (t.phase !== 'boarding' && t.phase !== 'embarked')) return false;
        T.finish(sim, sq, 'controller:cancel');
        return keep(req, sim, { squad: sq, ride: t });
      },
      stage: function (h) {
        if (rideEnded(h)) mark(h, 'released', 'released', h.ride.endedAt);
      },
      cancel: function () {
        return true;
      },
      /* A dismounting squad still holds its team, locomotion and weapons; release waits for the end. */
      release: rideEnded
    }
  };

  /* Macro (roadmap section 8 slice M1). The General's reconstitution owner (22) forms the group, briefs
     the rally and later merges or dissolves it; the adapter only bridges and projects. */
  function recon() {
    var C = root.BattleCommanderAI;
    return C && C.reconstitution ? C.reconstitution() : null;
  }
  function squadNamed(sim, faction, id) {
    var R = recon();
    return R && R.squadById ? R.squadById(sim, faction, id) : null;
  }
  CAPS['command.reconstitute'] = {
    request: function (req, sim) {
      var R = recon(),
        squads = req.params.squadIds.map(function (id) {
          return squadNamed(sim, req.faction, id);
        });
      if (
        !R ||
        squads.some(function (sq) {
          return !sq || sq.disbanded || sq._reconGroup || sq.state !== 'retreat';
        })
      )
        return false;
      return keep(req, sim, { group: R.formGroup(sim, req.faction, squads) });
    },
    stage: function (h) {
      var g = h.group;
      if (g.status === 'merged') mark(h, 'merged', 'reconstituted', g.endedAt);
      else if (g.status === 'dissolved') mark(h, 'cancelled', 'owner:' + g.endReason, g.endedAt);
      else mark(h, 'briefed', 'assembling', g.formedAt);
    },
    /* A group still assembling is dissolved through its owner, which ends every member's rally brief. */
    cancel: function (h, reason) {
      var R = recon();
      if (h.group.status === 'assembling' && R) R.dissolveGroup(h.sim, h.group, null, 'controller:' + reason);
      return true;
    },
    release: function (h) {
      return h.group.status !== 'assembling';
    }
  };
  /* Slice M2. The recovery owner (22a) runs each ladder stage and keeps the episode's state on the
     General; the action is accepted only for the episode that state is on and reports the last stage. */
  function stallState(sim, faction) {
    var C = root.BattleCommanderAI,
      g = C && C.generalFor ? C.generalFor(sim, faction) : null;
    return (g && g.stallRecovery) || null;
  }
  CAPS['command.recover'] = {
    request: function (req, sim) {
      var st = stallState(sim, req.faction);
      if (!st || st.episode !== req.params.episode) return false;
      return keep(req, sim, { faction: req.faction, episode: req.params.episode });
    },
    stage: function (h) {
      var st = stallState(h.sim, h.faction),
        last = st && st.history && st.history[st.history.length - 1];
      if (!st || st.episode !== h.episode) mark(h, 'recovered', 'objective-progress');
      else if (last && last.episode === h.episode) mark(h, 'staged', last.stage, last.time);
    },
    /* Nothing to undo: every brief a stage issued is the General's ordinary mission, with its own lifecycle. */
    cancel: function () {
      return true;
    },
    release: function () {
      return true;
    }
  };
  /* Slice M3. The General's re-selection (22a reconsiderMission) publishes the brief; the action follows
     that brief until the Squad Leader accepts it or it is replaced. A wake that deduped into the brief
     already held is accepted at once with reason `unchanged` (the owner's ineffective-wake record). */
  CAPS['command.brief'] = {
    request: function (req, sim) {
      var C = root.BattleCommanderAI,
        R = C && C.recovery ? C.recovery() : null,
        G = root.BattleTacticalGeneral,
        sq = squadNamed(sim, req.faction, req.params.targetSquadId);
      if (!R || !sq || sq.disbanded) return false;
      var before = sq._macroMission;
      R.reconsiderMission(sim, sq, G && G.townFor ? G.townFor(sim) : null, req.params.reason, null);
      var m = sq._macroMission;
      if (!m) return false;
      return keep(req, sim, { squad: sq, mission: m, fresh: m !== before });
    },
    stage: function (h) {
      var m = h.squad._macroMission;
      if (m !== h.mission) mark(h, 'cancelled', 'superseded', m && m.issuedAt);
      else if (m.status === 'executing')
        mark(h, 'accepted', h.fresh ? 'accepted' : 'unchanged', m.acceptedAt);
      else if (m.status === 'issued') mark(h, 'issued', 'awaiting-acceptance', m.issuedAt);
      else mark(h, 'cancelled', 'owner:' + m.status, m.endedAt);
    },
    cancel: function () {
      return true;
    },
    release: function () {
      return true;
    }
  };
  /* Slice M4. Module 58 grants the truck (considerMission re-quotes and seats the squad) and owns the
     journey; the action follows that ride until it ends. A ride for an older brief is not this one. */
  CAPS['command.transport'] = {
    request: function (req, sim) {
      var T = root.BattleSquadTransport,
        sq = squadOf(sim, { faction: req.faction, squadId: req.params.targetSquadId }),
        m = sq && sq._macroMission;
      if (!T || !T.considerMission || !m || m.status !== 'executing' || !T.considerMission(sim, sq, m))
        return false;
      var t = sq._transport;
      if (!t || t.missionVersion !== m.version) {
        if (T.finish) T.finish(sim, sq, 'controller:untracked');
        return false;
      }
      return keep(req, sim, { squad: sq, ride: t });
    },
    stage: function (h) {
      var t = h.squad._transport,
        r = h.ride;
      if (t !== r || rideEnded(h)) mark(h, 'released', 'owner:' + (r.endReason || r.phase), r.endedAt);
      else if (t.phase === 'embarked' || t.phase === 'disembarking')
        mark(h, 'embarked', t.phase, t.embarkedAt);
      else mark(h, 'boarding', 'boarding', h.requestedAt);
    },
    cancel: function (h, reason) {
      var T = root.BattleSquadTransport,
        t = h.squad._transport;
      if (T && T.finish && t === h.ride) T.finish(h.sim, h.squad, 'controller:' + reason);
      return true;
    },
    release: rideEnded
  };
  CAPS['command.pickup'] = {
    request: function (req, sim) {
      var R = recon(),
        lone = squadNamed(sim, req.faction, req.params.fledSquadId),
        into = squadNamed(sim, req.faction, req.params.intoSquadId),
        pick = R && lone && R.bestPickup(sim, req.faction, lone);
      if (!pick || pick.into !== into || !R.absorbFled(sim, req.faction, lone, into, pick.distance))
        return false;
      return keep(req, sim, {});
    },
    stage: function (h) {
      mark(h, 'absorbed', 'absorbed', h.requestedAt);
    },
    cancel: function () {
      return true;
    },
    release: function () {
      return true;
    }
  };

  CAPS['combat.march'] = CAPS['combat.contact'];
  CAPS['combat.bound'] = CAPS['combat.contact'];
  function request(req, sim) {
    var c = CAPS[req.capability];
    if (!c || handles.has(req)) return false;
    if (!c.request(req, sim)) return false;
    c.stage(handles.get(req), req);
    return true;
  }
  /* The owner's view of how far an action got: the contract stage, why it stands there and since when. */
  function stage(req) {
    var h = handles.get(req);
    if (!h) return null;
    if (h.stage !== 'cancelled' && h.stage !== 'released') CAPS[h.capability].stage(h, req);
    return { stage: h.stage, reason: h.reason, at: h.at };
  }
  function lifecycle(kind) {
    return function (req, reason) {
      var h = handles.get(req);
      if (!h) return true;
      var ok = CAPS[h.capability][kind](h, reason) === true;
      if (ok && kind === 'cancel' && h.stage !== 'released') mark(h, 'cancelled', reason);
      return ok;
    };
  }
  var adapters = {};
  Object.keys(CAPS).forEach(function (cap) {
    adapters[cap] = request;
  });

  root.BattleTacticalOwnerAdapters = {
    version: '1.1-owner-bridges-movement',
    adapters: adapters,
    missing: [],
    stage: stage,
    lifecycle: { cancel: lifecycle('cancel'), release: lifecycle('release'), stage: stage }
  };
})(typeof window !== 'undefined' ? window : globalThis);
