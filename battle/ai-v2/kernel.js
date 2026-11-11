/* AI V2 kernel: per-consumer invalidation, timed wakeups, and dispatch instrumentation.
   Experimental (`?aiV2=1`). Optional bypass: `?aiV2Schedule=0` runs every consumer every dispatch. */
(function (root) {
  'use strict';
  var SEARCH = typeof location !== 'undefined' ? location.search || '' : '';
  var ON = /[?&]aiV2=1(?:&|#|$)/i.test(SEARCH);
  var SCHEDULE_ON = ON && !/[?&]aiV2Schedule=0(?:&|#|$)/i.test(SEARCH);
  var CONSUMERS = ['mission', 'formation', 'contact', 'maneuver', 'skills', 'strategic'];
  var battles = new WeakMap();
  var squads = new WeakMap();

  function battleState(sim) {
    var st = battles.get(sim);
    if (!st) {
      st = {
        events: [],
        seq: 0,
        lastStrategic: Object.create(null),
        stats: {
          emitted: 0,
          ingested: 0,
          dispatches: Object.create(null),
          runs: Object.create(null),
          skips: Object.create(null),
          wakeups: 0
        }
      };
      battles.set(sim, st);
    }
    return st;
  }
  function squadState(sq) {
    var st = squads.get(sq);
    if (!st) {
      st = {
        dirty: new Set(CONSUMERS),
        channels: Object.create(null),
        wakeAt: Object.create(null),
        tactical: { inContact: false, underFire: 0 },
        missionKey: null,
        contactKey: null,
        rosterKey: null,
        legKey: null,
        routeActive: false
      };
      squads.set(sq, st);
    }
    return st;
  }

  function engagementKey(facts, sq) {
    if (!facts || typeof facts !== 'object') return 'none';
    return [
      sq && sq.inContact ? 1 : 0,
      facts.contactStarted ? 1 : 0,
      +(facts.underFire || 0),
      +(facts.effective || 0),
      +(facts.pinned || 0)
    ].join(':');
  }

  function noteDispatch(sim, sq, entryPoint) {
    if (!ON || !sim) return;
    var b = battleState(sim);
    b.stats.dispatches[entryPoint] = (b.stats.dispatches[entryPoint] || 0) + 1;
  }

  function emit(sim, type, scope, payload) {
    if (!ON || !sim) return;
    var b = battleState(sim);
    b.seq++;
    b.stats.emitted++;
    b.events = b.events || [];
    b.events.push({
      seq: b.seq,
      at: +(sim.time || 0),
      type: type,
      scope: scope || null,
      payload: payload || null
    });
    if (b.events.length > 256) b.events.splice(0, b.events.length - 256);
    if (scope && scope.squad) invalidate(sim, scope.squad, type);
  }

  function invalidate(sim, sq, reason) {
    var st = squadState(sq);
    if (reason === 'mission-superseded' || reason === 'roster-changed') {
      st.dirty = new Set(CONSUMERS);
      st.legKey = null;
      return;
    }
    if (reason === 'contact-changed') {
      st.dirty.add('contact');
      st.dirty.add('maneuver');
      return;
    }
    if (reason === 'leg-advanced') {
      st.dirty.add('mission');
      st.dirty.add('formation');
      return;
    }
    if (reason === 'formation-refresh') {
      st.dirty.add('formation');
    }
  }

  /* Earliest-deadline wins: a later reconciliation request cannot postpone an already-promised
     wakeup. Urgent events should use invalidate()/forceDirty() or pass at <= current wakeAt. */
  function scheduleWakeup(sim, sq, consumer, at, why) {
    if (!ON || !sq) return;
    var st = squadState(sq),
      t = +(sim.time || 0),
      next = +at || t,
      cur = st.wakeAt[consumer];
    if (cur == null || next < cur) st.wakeAt[consumer] = next;
    battleState(sim).stats.wakeups++;
    if (why) emit(sim, 'wakeup:' + why, { squad: sq }, { consumer: consumer, at: st.wakeAt[consumer] });
  }

  function ingestEngagementFacts(ctx) {
    if (!ON || !ctx || !ctx.squad || !ctx.sim) return;
    var sq = ctx.squad,
      sim = ctx.sim,
      facts = ctx.facts,
      st = squadState(sq),
      b = battleState(sim);
    b.stats.ingested++;
    var wasContact = st.tactical.inContact;
    st.tactical.inContact = !!(sq.inContact || (facts && facts.underFire > 0));
    st.tactical.underFire = facts ? +(facts.underFire || 0) : 0;
    var ek = engagementKey(facts, sq);
    if (st.contactKey !== ek) {
      st.contactKey = ek;
      emit(sim, 'contact-changed', { squad: sq }, { key: ek });
    }
    var nowContact = st.tactical.inContact;
    if (nowContact !== wasContact) {
      st.dirty.add('contact');
      st.dirty.add('maneuver');
      emit(sim, 'contact-presence', { squad: sq }, { inContact: nowContact });
    }
    if (nowContact) {
      scheduleWakeup(sim, sq, 'contact', (+sim.time || 0) + 0.25, 'in-contact');
      scheduleWakeup(sim, sq, 'maneuver', (+sim.time || 0) + 0.35, 'in-contact');
    } else if (wasContact) {
      delete st.wakeAt.contact;
      delete st.wakeAt.maneuver;
    }
  }

  function ingestSquadContext(ctx) {
    if (!ON || !ctx || !ctx.squad || !ctx.sim) return;
    var sq = ctx.squad,
      sim = ctx.sim,
      st = squadState(sq),
      token = ctx.token;
    var m = sq._macroMission,
      mKey = m ? [m.version, m.intent, m.status, m.objectiveId || ''].join('|') : 'none';
    if (st.missionKey !== mKey) {
      st.missionKey = mKey;
      emit(sim, 'mission-superseded', { squad: sq }, { key: mKey });
    }
    var rKey = token
      ? [token.rosterRevision, token.missionVersion].join(':')
      : String(sq.members && sq.members.length);
    if (st.rosterKey !== rKey) {
      st.rosterKey = rKey;
      emit(sim, 'roster-changed', { squad: sq }, { key: rKey });
    }
    var leg = +(sq.routeIndex || 0);
    var legKey = ((sq.route && sq.route.length) || 0) + ':' + leg;
    if (st.legKey !== legKey) {
      st.legKey = legKey;
      emit(sim, 'leg-advanced', { squad: sq }, { leg: leg });
    }
    st.routeActive = !!(sq.route && sq.route.length);
    if (st.routeActive) scheduleWakeup(sim, sq, 'mission', (+sim.time || 0) + 1, 'route-active');
    if (token && token.missionVersion != null) st.dirty.add('formation');
  }

  function shouldRun(sim, sq, consumer) {
    if (!ON || !SCHEDULE_ON) return true;
    var st = squadState(sq),
      t = +(sim.time || 0);
    if (st.dirty.has(consumer)) return true;
    if (st.wakeAt[consumer] != null && t + 1e-6 >= st.wakeAt[consumer]) return true;
    if (consumer === 'strategic') {
      var b = battleState(sim),
        f = sq.faction,
        last = b.lastStrategic[f] || -Infinity;
      if (t - last >= 2) return true;
    }
    if (consumer === 'contact' && st.tactical.inContact) {
      var lc = st.channels.contact;
      if (lc == null) lc = -Infinity;
      if (t - lc >= 0.25) return true;
    }
    if (consumer === 'maneuver' && (st.tactical.inContact || st.tactical.underFire > 0)) {
      var lm = st.channels.maneuver;
      if (lm == null) lm = -Infinity;
      if (t - lm >= 0.35) return true;
    }
    if (consumer === 'mission' && st.routeActive) {
      var lmi = st.channels.mission;
      if (lmi == null) lmi = -Infinity;
      if (t - lmi >= 1) return true;
    }
    var b = battleState(sim);
    b.stats.skips[consumer] = (b.stats.skips[consumer] || 0) + 1;
    return false;
  }

  function markRan(sim, sq, consumer) {
    if (!ON || !sq) return;
    var st = squadState(sq),
      t = +(sim.time || 0);
    st.dirty.delete(consumer);
    st.channels[consumer] = t;
    var b = battleState(sim);
    b.stats.runs[consumer] = (b.stats.runs[consumer] || 0) + 1;
    if (consumer === 'strategic') b.lastStrategic[sq.faction] = t;
    if (consumer === 'contact' && st.tactical.inContact)
      scheduleWakeup(sim, sq, 'contact', t + 0.25, 'reconcile');
    if (consumer === 'maneuver' && (st.tactical.inContact || st.tactical.underFire > 0))
      scheduleWakeup(sim, sq, 'maneuver', t + 0.35, 'reconcile');
    if (consumer === 'mission' && st.routeActive) scheduleWakeup(sim, sq, 'mission', t + 1, 'reconcile');
    else if (st.wakeAt[consumer] != null && t >= st.wakeAt[consumer]) delete st.wakeAt[consumer];
  }

  function forceDirty(sim, sq, channels) {
    var st = squadState(sq);
    (channels || CONSUMERS).forEach(function (c) {
      st.dirty.add(c);
    });
  }

  function squadSnapshot(sim, sq) {
    var st = squadState(sq);
    return {
      dirty: Array.from(st.dirty),
      wakeAt: Object.assign({}, st.wakeAt),
      tactical: Object.assign({}, st.tactical),
      channels: Object.assign({}, st.channels)
    };
  }

  function summary(sim) {
    var b = sim && battles.get(sim);
    if (!b) return null;
    return {
      events: (b.events || []).slice(-16),
      stats: Object.assign({}, b.stats)
    };
  }

  function beforeRestart(sim) {
    if (sim) battles.delete(sim);
  }

  function compareHint(sim) {
    var b = sim && battles.get(sim);
    if (!b) return null;
    return {
      scheduleOn: SCHEDULE_ON,
      runs: Object.assign({}, b.stats.runs),
      skips: Object.assign({}, b.stats.skips),
      dispatches: Object.assign({}, b.stats.dispatches)
    };
  }

  root.BattleAIV2 = {
    on: ON,
    scheduleOn: SCHEDULE_ON,
    noteDispatch: noteDispatch,
    ingestEngagementFacts: ingestEngagementFacts,
    ingestSquadContext: ingestSquadContext,
    shouldRun: shouldRun,
    markRan: markRan,
    forceDirty: forceDirty,
    emit: emit,
    squadSnapshot: squadSnapshot,
    summary: summary,
    compareHint: compareHint,
    beforeRestart: beforeRestart,
    _squadState: squadState
  };
})(typeof window !== 'undefined' ? window : globalThis);
