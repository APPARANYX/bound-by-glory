/* Causal inaction observer: shipping battle only, no writes to gameplay state.
 * An actual onFire callback and trigger-path reject counter are direct evidence.
 * Fire-control "why" inferred from snapshots is NEVER marked verified.
 * Movement outcomes come from the existing read-only BattleExecutionOutcome join.
 * URL filters: probeSide, probeRole, probeIds, probeSquads. */
(function (root) {
  'use strict';
  var params = new URLSearchParams((root.location && root.location.search) || '');
  function csv(k) {
    return String(params.get(k) || '')
      .split(',')
      .map(function (x) {
        return x.trim();
      })
      .filter(Boolean);
  }
  var options = {
    side: params.get('probeSide') || 'all',
    roles: csv('probeRole'),
    ids: csv('probeIds'),
    squads: csv('probeSquads')
  };
  var MAX_EPISODES = 160,
    MAX_HISTORY = 10,
    MAX_DENIALS = 160,
    MAX_COVER = 320,
    FIRE_SILENCE = 5,
    MOVE_STILL = 12;
  var data, units, originalFire;
  function round(n) {
    return +Number(n || 0).toFixed(2);
  }
  function bump(o, k) {
    o[k] = (o[k] || 0) + 1;
  }
  function chosen(s) {
    return !!(
      s &&
      s.root &&
      s.squad &&
      (options.side === 'all' || options.side === s.faction) &&
      (!options.roles.length ||
        options.roles.indexOf('all') >= 0 ||
        options.roles.indexOf(String(s.role)) >= 0) &&
      (!options.ids.length || options.ids.indexOf(String(s.id)) >= 0) &&
      (!options.squads.length || options.squads.indexOf(String(s.squad.id)) >= 0)
    );
  }
  function key(s) {
    return String(s.faction) + ':' + String(s.id);
  }
  function unit(s) {
    var k = key(s),
      d = units.get(k);
    if (!d) {
      d = {
        lastShot: -Infinity,
        fire: null,
        move: null,
        history: [],
        denials: [],
        coverEvents: [],
        coverLane: null
      };
      units.set(k, d);
    }
    return d;
  }
  function position(v) {
    return v && isFinite(+v.x) && isFinite(+v.z) ? { x: round(v.x), z: round(v.z) } : null;
  }
  function range(a, b) {
    return a && b ? Math.hypot(+a.x - +b.x, +a.z - +b.z) : Infinity;
  }
  function motionOutcome(s, sim) {
    var O = root.BattleExecutionOutcome;
    return O && O.man ? O.man(s, sim) : null;
  }
  function transportEvidence(s, sim) {
    var t = s.squad && s.squad._transport;
    if (!t || ['boarding', 'embarked', 'disembarking'].indexOf(t.phase) < 0) return null;
    return {
      phase: t.phase,
      vehicleId: t.vehicleId || null,
      missionVersion: t.missionVersion == null ? null : t.missionVersion,
      requestedAt: t.requestedAt == null ? null : round(t.requestedAt),
      elapsedSeconds: t.requestedAt == null ? null : round(sim.time - t.requestedAt),
      boardedCount: t.boardedCount == null ? null : t.boardedCount,
      exitedCount: (t.exitedIds || []).length,
      boardTimeoutSeconds: t.boardTimeoutSeconds == null ? null : t.boardTimeoutSeconds,
      travelledMeters: round(t.travelled),
      carrierPosition: position(t.position)
    };
  }
  /* Peek projects timing without settling commands. The canonical adopted slot is read
     directly: adoptedView/snapshot would advance command reception while observing it. */
  function receipt(rec) {
    if (!rec) return null;
    var out = {};
    [
      'envelopeId',
      'signature',
      'sourceId',
      'relayId',
      'channel',
      'phase',
      'issuedAt',
      'receivedAt',
      'processedAt',
      'adoptedAt',
      'unreachable'
    ].forEach(function (k) {
      if (rec[k] == null || ['string', 'number', 'boolean'].indexOf(typeof rec[k]) >= 0)
        out[k] = rec[k] == null ? null : rec[k];
    });
    var d = rec.data || {};
    out.publishKey = d.publishKey == null ? null : String(d.publishKey);
    out.missionVersion = d.missionVersion == null ? null : d.missionVersion;
    out.fireState = d.state || null;
    out.point = position(rec.point);
    return out;
  }
  function commandWitness(s, sim, category, scope) {
    var st = sim._commandReception,
      id = String(s.id),
      slot = category + '|' + scope,
      latest = st && st.bySoldier && st.bySoldier[id] && st.bySoldier[id][slot],
      adopted = st && st.adoptedBySoldier && st.adoptedBySoldier[id] && st.adoptedBySoldier[id][slot],
      CR = root.BattleCommandReception,
      projected = CR && CR.peek ? CR.peek(s, sim, category, scope) : null;
    return {
      latest: receipt(latest),
      projectedPhase: projected ? projected.phase : null,
      adopted: receipt(adopted),
      adoptedIsLatest: latest && adopted ? latest.envelopeId === adopted.envelopeId : null,
      appliedEnvelope: category === 'movement' ? s._fireteamAdoptedEnvelope || null : null,
      appliedPublishKey: category === 'movement' ? s._fireteamPublishKey || null : null
    };
  }
  function controllerWitness(s, summary) {
    function own(row) {
      return String(row.actorId) === String(s.id) && row.squad === s.squad.id;
    }
    var actions = (summary.live || []).filter(own),
      selections = (summary.soldierDecisions || []).filter(own);
    return {
      actionsOmitted: Math.max(0, actions.length - 4),
      selectionsOmitted: Math.max(0, selections.length - 12),
      actions: actions.slice(0, 4).map(function (r) {
        return Object.assign({}, r);
      }),
      /* Selection is context, never evidence of discharge, arrival or grenade release. */
      selections: selections.slice(0, 12).map(function (r) {
        return Object.assign({}, r);
      })
    };
  }
  function grenadeWitness(s, sim) {
    var G = root.BattleGrenades,
      plan = G && G.pendingOf ? G.pendingOf(s, sim) : null;
    return {
      carried: G && G.count ? G.count(s) : null,
      cooldownLeft: G && G.cooldownLeft ? G.cooldownLeft(s, sim) : null,
      pending: plan
        ? { decidedAt: plan.decidedAt, releaseAt: plan.releaseAt, source: plan.source || null }
        : null
    };
  }
  function sampleRow(s, o, sim, summary) {
    var resolver = s._movementResolver && s._movementResolver.last;
    return {
      t: round(sim.time),
      pos: position(s.root.position),
      dest: position(s.destination),
      target: s.target && !s.target.dead ? String(s.target.id) : null,
      engagement: (s.eng && s.eng.state) || null,
      phase: s.squad.commandPhase || null,
      missionVersion: (s.squad._macroMission && s.squad._macroMission.version) || null,
      envelope: (o && o.envelopeId) || null,
      outcome: (o && o.state) || null,
      current: o ? !!o.current : null,
      resolver: resolver
        ? { owner: resolver.owner || null, kind: resolver.kind || null, reason: resolver.reason || null }
        : null,
      stop: s._movementStopReason || null,
      speed: round(s.moveSpeed),
      transport: transportEvidence(s, sim),
      commands: {
        movement: commandWitness(s, sim, 'movement', 'soldier:' + String(s.id)),
        fire: commandWitness(s, sim, 'posture-fire', 'squad')
      },
      controller: controllerWitness(s, summary),
      fireContext: {
        stateSince: s.eng && Number.isFinite(s.eng.since) ? s.eng.since : null,
        stateUntil: s.eng && Number.isFinite(s.eng.until) ? s.eng.until : null,
        fireReadyAt: s.eng && Number.isFinite(s.eng.fireReadyAt) ? s.eng.fireReadyAt : null,
        suppressedUntil: Number.isFinite(s.suppressedUntil) ? s.suppressedUntil : null,
        reloading: !!s.reloading,
        ammo: s.weapon && Number.isFinite(s.weapon.ammo) ? s.weapon.ammo : null,
        reserve: s.weapon && Number.isFinite(s.weapon.reserveAmmo) ? s.weapon.reserveAmmo : null
      },
      grenade: grenadeWitness(s, sim),
      losRejects: +s._losBlockedFire || 0,
      crestRejects: +s._crestBlockedFire || 0,
      terrainRejects: +s._terrainBlockedSuppressiveFire || 0
    };
  }
  function emit(kind, s, since, now, result, evidence, history) {
    bump(data.counts, kind);
    bump(data.reasons, result.code);
    bump(data.confidence, result.confidence);
    if (data.episodes.length >= MAX_EPISODES) {
      data.episodesOmitted++;
      return;
    }
    data.episodes.push({
      kind: kind,
      actor: key(s),
      soldier: String(s.id),
      squad: String(s.squad.id),
      role: s.role,
      start: round(since),
      observedAt: round(now),
      seconds: round(now - since),
      code: result.code,
      confidence: result.confidence,
      scope: result.scope,
      interpretation: result.interpretation,
      evidence: evidence,
      history: history.slice(-MAX_HISTORY)
    });
  }
  // Read canonical adoption directly: calling the native getter would settle reception.
  function fireContext(s, sim) {
    var CR = root.BattleCommandReception,
      st = sim._commandReception,
      by = st && st.adoptedBySoldier && st.adoptedBySoldier[String(s.id)],
      rec = by && by['posture-fire|squad'],
      native = !(CR && CR.postureEnabled && CR.postureEnabled()),
      order = native ? s.squad.fireControl : rec && rec.data,
      state = (order && order.state) || null,
      suppressed = (+s.suppressedUntil || 0) > sim.time;
    if (!native && rec && s.eng && s.eng.retreatEndedAt != null && !(rec.adoptedAt > s.eng.retreatEndedAt))
      state = null;
    return {
      order: state,
      shooterId: order && order.shooterId,
      envelopeId: native ? null : (rec && rec.envelopeId) || null,
      suppressed: suppressed,
      // Incoming fire may override a HOLD. This is context, not an evaluated gate.
      preparing:
        !suppressed &&
        (state === 'hold' || (state === 'precision' && String(order.shooterId) !== String(s.id)))
    };
  }
  function fireClassification(s, sim, f, d) {
    var rejects = {
      los: Math.max(0, (+s._losBlockedFire || 0) - f.los),
      crest: Math.max(0, (+s._crestBlockedFire || 0) - f.crest),
      terrain: Math.max(0, (+s._terrainBlockedSuppressiveFire || 0) - f.terrain)
    };
    var activeContext = fireContext(s, sim),
      order = activeContext.order,
      state = (s.eng && s.eng.state) || null;
    var denials = {};
    d.denials.forEach(function (e) {
      if (e.t >= f.since && e.t <= sim.time && e.target === f.target) bump(denials, e.code);
    });
    var evidence = {
      target: f.target,
      fireOrder: order,
      engagement: state,
      triggerRejectDeltas: rejects,
      directFireDenials: denials,
      roundsFired: 0,
      intervalContext: Object.assign({}, f.context, { orders: Object.assign({}, f.context.orders) }),
      coverDecisions: d.coverEvents
        .filter(function (e) {
          return e.t >= f.since && e.t <= sim.time;
        })
        .slice(-5)
    };
    if (Object.keys(denials).length && (rejects.crest || rejects.los || rejects.terrain))
      return {
        evidence: evidence,
        result: {
          code: 'multiple-observed-fire-blockers',
          confidence: 'verified',
          scope: 'decision-and-shot-attempt',
          interpretation:
            'Both a real Engagement denial and a trigger-path rejection occurred; neither proves the entire silent interval.'
        }
      };
    if (Object.keys(denials).length)
      return {
        evidence: evidence,
        result: {
          code: 'engagement-decision-denied',
          confidence: 'verified',
          scope: 'decision-gate',
          interpretation:
            'The Engagement fire-permission gate actually refused firing for the recorded reasons.'
        }
      };
    if (rejects.crest || rejects.los || rejects.terrain)
      return {
        evidence: evidence,
        result: {
          code: 'observed-trigger-rejection',
          confidence: 'verified',
          scope: 'shot-attempt',
          interpretation:
            'A real trigger-path rejection occurred during silence; this does not prove it explains the entire interval.'
        }
      };
    if (
      order === 'hold' ||
      order === 'reposition' ||
      order === 'suppress' ||
      (order === 'precision' && String(activeContext.shooterId) !== String(s.id))
    )
      return {
        evidence: evidence,
        result: {
          code: 'restrictive-fire-order',
          confidence: 'likely',
          scope: 'state-correlation',
          interpretation: 'A restrictive order was observed, but no firing decision gate was directly traced.'
        }
      };
    if (f.context.preparationSamples > 0)
      return {
        evidence: evidence,
        result: {
          code: 'preparation-observed-during-silence',
          confidence: 'likely',
          scope: 'sampled-interval-context',
          interpretation:
            'A personally adopted preparation order was observed within this silent interval. It may explain part of the interval; no decisive firing gate or continuous coverage is proved.'
        }
      };
    if (f.context.suppressedSamples > 0)
      return {
        evidence: evidence,
        result: {
          code: 'suppression-observed-during-silence',
          confidence: 'likely',
          scope: 'sampled-interval-context',
          interpretation:
            'The native suppression timer was active during this interval. This is inhibition context, not proof that suppression prevented every possible shot.'
        }
      };
    if (state === 'cower' || state === 'freeze' || state === 'flee' || state === 'pinned')
      return {
        evidence: evidence,
        result: {
          code: 'stress-or-pinned',
          confidence: 'likely',
          scope: 'state-correlation',
          interpretation: 'A combat inhibition state was observed; the decisive firing gate was not recorded.'
        }
      };
    return {
      evidence: evidence,
      result: {
        code: 'unexplained-fire-silence',
        confidence: 'unknown',
        scope: 'not-traced',
        interpretation: 'Target was present and no round fired; current observations cannot prove why.'
      }
    };
  }
  function movementClassification(o, transport) {
    if (transport)
      return {
        code: 'transport-owned-movement',
        confidence: 'verified',
        scope: 'transport-ownership',
        interpretation:
          'Transport owns movement during boarding, embarkation or serial exit; infantry order-version checks do not establish a failure. Inspect carrier travel, boarding/exit progress and timeout evidence.'
      };
    if (o.current === false && o.envelopeId)
      return {
        code: 'stale-order-version',
        confidence: 'verified',
        scope: 'order-version',
        interpretation:
          'The adopted/received movement envelope is from a different mission version; investigate order publication and replacement.'
      };
    if (o.state === 'held')
      return {
        code: 'resolver-hold',
        confidence: 'verified',
        scope: 'arbitration',
        interpretation:
          'Movement Resolver chose a different authority. This may be a justified hold, not a defect.'
      };
    if (o.state === 'blocked')
      return {
        code: 'physical-execution-blocked',
        confidence: 'verified',
        scope: 'movement-execution',
        interpretation: 'Movement Execution recorded a blocked order; check its stop/recovery evidence.'
      };
    if (o.state === 'pending')
      return {
        code: o.why === 'undeliverable' ? 'order-undeliverable' : 'order-not-adopted',
        confidence: 'verified',
        scope: 'command-reception',
        interpretation:
          'The order is pending in Command Reception; this does not prove the delay is abnormal.'
      };
    if (o.state === 'adopted')
      return {
        code: 'adopted-not-applied',
        confidence: 'verified',
        scope: 'order-handoff',
        interpretation: 'The order was adopted but not yet applied to Movement Resolver.'
      };
    return {
      code: 'unexplained-movement-stall',
      confidence: 'unknown',
      scope: 'not-traced',
      interpretation:
        'The soldier failed to move toward the assigned goal; no authoritative blocker was identified.'
    };
  }
  function recordFire(s, sim, d) {
    var t = s.target && !s.target.dead && s.target.root ? String(s.target.id) : null;
    if (s.dead || !t) {
      d.fire = null;
      return;
    }
    if (!d.fire || d.fire.target !== t || d.lastShot >= d.fire.since) {
      d.fire = {
        since: sim.time,
        target: t,
        los: +s._losBlockedFire || 0,
        crest: +s._crestBlockedFire || 0,
        terrain: +s._terrainBlockedSuppressiveFire || 0,
        reported: false,
        context: {
          samples: 0,
          preparationSamples: 0,
          suppressedSamples: 0,
          orders: {},
          firstAt: sim.time,
          lastAt: sim.time
        }
      };
    }
    var f = d.fire;
    if (!f.reported) {
      var context = fireContext(s, sim);
      f.context.samples++;
      f.context.lastAt = sim.time;
      if (context.preparing) f.context.preparationSamples++;
      if (context.suppressed) f.context.suppressedSamples++;
      var orderKey =
        ['hold', 'precision', 'open', 'clear', 'suppress', 'reposition'].indexOf(context.order) >= 0
          ? context.order
          : context.order == null
            ? 'absent'
            : 'other';
      bump(f.context.orders, orderKey);
    }
    if (!f.reported && sim.time - f.since >= FIRE_SILENCE) {
      var c = fireClassification(s, sim, f, d);
      emit('fire-silence', s, f.since, sim.time, c.result, c.evidence, d.history);
      f.reported = true;
    }
  }
  function recordMovement(s, sim, d, o) {
    var here = position(s.root.position),
      dest = position(s.destination),
      transport = transportEvidence(s, sim);
    if (
      s.dead ||
      !o ||
      o.state === 'none' ||
      !here ||
      !dest ||
      range(here, dest) < 8 ||
      o.state === 'completed'
    ) {
      d.move = null;
      return;
    }
    var signature =
      String(o.envelopeId || '') +
      '|' +
      String(o.missionVersion || '') +
      '|' +
      round(dest.x) +
      ',' +
      round(dest.z) +
      '|' +
      (transport ? transport.phase + ':' + transport.vehicleId : 'infantry');
    var m = d.move;
    if (!m || m.signature !== signature || range(m.anchor, here) >= 1.5) {
      m = { since: sim.time, anchor: here, signature: signature, reported: false };
      d.move = m;
    }
    if (!m.reported && sim.time - m.since >= MOVE_STILL && (+s.moveSpeed || 0) < 0.35) {
      var result = movementClassification(o, transport);
      emit(
        'movement-inaction',
        s,
        m.since,
        sim.time,
        result,
        {
          order: {
            envelopeId: o.envelopeId || null,
            missionVersion: o.missionVersion || null,
            current: !!o.current,
            state: o.state,
            why: o.why || null,
            heldBy: o.by || null,
            terminal: !!o.terminal,
            progressing: !!o.progressing
          },
          displacementMeters: round(range(m.anchor, here)),
          distanceToDestinationMeters: round(range(here, dest)),
          stopReason: s._movementStopReason || null,
          transport: transport,
          resolver: (d.history[d.history.length - 1] && d.history[d.history.length - 1].resolver) || null,
          coverDecisions: d.coverEvents
            .filter(function (e) {
              return e.t >= m.since && e.t <= sim.time;
            })
            .slice(-5)
        },
        d.history
      );
      m.reported = true;
    }
  }
  (root.BattleProbes = root.BattleProbes || {})['causal-inaction'] = {
    every: 1,
    start: function (sim) {
      data = {
        schema: 'grasstex-causal-inaction-v1',
        classificationVersion: 2,
        config: options,
        counts: {},
        reasons: {},
        confidence: {},
        episodes: [],
        episodesOmitted: 0,
        directDenialsOmitted: 0,
        coverDecisions: [],
        coverDecisionsOmitted: 0,
        coverDecisionCounts: {},
        coverRejectCounts: {},
        coverLaneOutcomes: [],
        roundsObserved: 0,
        actorsObserved: 0
      };
      units = new Map();
      /* Called only from the real Engagement rejection sites, never by sampling a gate. */
      root.BattleCausalInaction = {
        denied: function (s, battle, code) {
          if (!chosen(s) || !battle) return;
          var d = unit(s),
            now = +battle.time || 0;
          d.denials.push({
            t: now,
            code: code,
            target: s.target && !s.target.dead ? String(s.target.id) : null
          });
          while (d.denials.length && d.denials[0].t < now - 10) d.denials.shift();
          if (d.denials.length > MAX_DENIALS) {
            d.denials.shift();
            data.directDenialsOmitted++;
          }
        },
        /* Invoked at the actual slot-ranking branch. Counts are witnesses to
           gate execution, not retrospective guesses that a gate caused all
           inactivity. The collector owns only bounded diagnostic storage. */
        coverDecision: function (s, battle, stage, code, counts, goal) {
          if (!chosen(s) || !battle) return;
          var d = unit(s),
            now = round(battle.time),
            rejected = {},
            event = {
              t: now,
              actor: key(s),
              target: (s.target && String(s.target.id)) || null,
              stage: String(stage),
              code: String(code),
              rejected: rejected
            };
          Object.keys(counts || {}).forEach(function (name) {
            var n = +counts[name] || 0;
            if (n > 0) {
              rejected[name] = n;
              bump(data.coverRejectCounts, String(stage) + ':' + name, n);
            }
          });
          if (goal && isFinite(+goal.x) && isFinite(+goal.z)) event.goal = position(goal);
          bump(data.coverDecisionCounts, event.stage + ':' + event.code);
          d.coverEvents.push(event);
          if (d.coverEvents.length > 12) d.coverEvents.shift();
          if (data.coverDecisions.length < MAX_COVER) data.coverDecisions.push(event);
          else data.coverDecisionsOmitted++;
          if (event.stage === 'firing-lane' && event.code === 'selected' && event.goal) {
            d.coverLane = {
              actor: key(s),
              start: now,
              goal: event.goal,
              status: 'selected',
              arrivedAt: null,
              firedAt: null,
              lastPosition: position(s.root.position),
              nearestMeters: range(position(s.root.position), event.goal),
              observedDeadAt: null,
              atDeathMeters: null,
              lastMovementOwner: null,
              lastStop: null
            };
            if (data.coverLaneOutcomes.length < MAX_COVER) data.coverLaneOutcomes.push(d.coverLane);
          }
        }
      };
      originalFire = sim.onFire;
      sim.onFire = function (s) {
        var result = originalFire && originalFire.apply(this, arguments);
        if (chosen(s)) {
          unit(s).lastShot = sim.time;
          data.roundsObserved++;
          var lane = unit(s).coverLane;
          if (lane && lane.firedAt == null && sim.time >= lane.start) lane.firedAt = round(sim.time);
        }
        return result;
      };
    },
    sample: function (sim) {
      var all = root.BattleModules.unitsFor(sim),
        T = root.BattleTacticalController,
        summary = T && T.summary ? T.summary(sim) : {},
        selected = 0;
      for (var i = 0; i < all.length; i++) {
        var s = all[i];
        if (!chosen(s)) continue;
        var trace = unit(s).coverLane;
        if (trace && trace.goal) {
          var currentPosition = position(s.root.position),
            gap = range(currentPosition, trace.goal),
            resolver = s._movementResolver && s._movementResolver.last;
          trace.lastPosition = currentPosition;
          trace.nearestMeters = Math.min(trace.nearestMeters, gap);
          trace.lastMovementOwner = (resolver && resolver.owner) || null;
          trace.lastStop = s._movementStopReason || null;
          if (s.dead && trace.observedDeadAt == null) {
            trace.observedDeadAt = round(sim.time);
            trace.atDeathMeters = round(gap);
            if (trace.arrivedAt == null)
              trace.status = gap <= 0.6 ? 'killed-at-firing-position' : 'killed-before-arrival';
          }
        }
        if (s.dead) continue;
        selected++;
        var d = unit(s),
          o = motionOutcome(s, sim);
        if (
          d.coverLane &&
          d.coverLane.arrivedAt == null &&
          d.coverLane.goal &&
          range(position(s.root.position), d.coverLane.goal) <= 0.6
        ) {
          d.coverLane.arrivedAt = round(sim.time);
          d.coverLane.status = 'physically-arrived';
        }
        d.history.push(sampleRow(s, o, sim, summary));
        if (d.history.length > MAX_HISTORY) d.history.shift();
        recordFire(s, sim, d);
        recordMovement(s, sim, d, o);
      }
      data.actorsObserved = Math.max(data.actorsObserved, selected);
    },
    report: function () {
      /* Keep the terminal window even if the first episode was emitted 100 seconds ago,
         or the resolver holds at the actor's feet (no distant destination to flag). */
      data.actorTails = [];
      data.actorTailsOmitted = Math.max(0, units.size - MAX_EPISODES);
      units.forEach(function (d, actor) {
        if (data.actorTails.length < MAX_EPISODES)
          data.actorTails.push({ actor: actor, history: d.history.slice() });
      });
      return data;
    }
  };
})(window);
