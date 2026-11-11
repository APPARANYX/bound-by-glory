/* AI V2 kernel: event ledger, provenance knowledge, and invalidation scheduler.
   Experimental architecture (`?aiV2=1`). No squad/soldier fields; WeakMaps only. */
(function (root) {
  'use strict';
  var SEARCH = typeof location !== 'undefined' ? location.search || '' : '';
  var ON = /[?&]aiV2=1(?:&|#|$)/i.test(SEARCH);
  var battles = new WeakMap();
  var squads = new WeakMap();

  function battleState(sim) {
    var st = battles.get(sim);
    if (!st) {
      st = {
        events: [],
        seq: 0,
        lastStrategic: Object.create(null),
        stats: { emitted: 0, skipped: 0, ingested: 0 }
      };
      battles.set(sim, st);
    }
    return st;
  }
  function squadState(sq) {
    var st = squads.get(sq);
    if (!st) {
      st = {
        dirty: new Set(['movement', 'contact', 'maneuver', 'strategic']),
        channels: Object.create(null),
        knowledge: { contacts: [], reports: 0, lastIngest: -1 },
        missionKey: null,
        rosterKey: null,
        contactKey: null,
        lastMovementTick: -1,
        skips: Object.create(null)
      };
      squads.set(sq, st);
    }
    return st;
  }

  function contactKey(facts) {
    if (!facts || typeof facts !== 'object') return '';
    return [
      facts.inContact ? 1 : 0,
      facts.contactStarted ? 1 : 0,
      +(facts.underFire || 0),
      facts.knownContact ? 1 : 0
    ].join(':');
  }

  function emit(sim, type, scope, payload) {
    if (!ON || !sim) return;
    var b = battleState(sim);
    b.seq++;
    b.stats.emitted++;
    var ev = {
      seq: b.seq,
      at: +(sim.time || 0),
      type: type,
      scope: scope || null,
      payload: payload || null
    };
    b.events.push(ev);
    if (b.events.length > 256) b.events.splice(0, b.events.length - 256);
    if (scope && scope.squad) invalidate(sim, scope.squad, type);
  }

  function invalidate(sim, sq, reason) {
    var st = squadState(sq);
    if (reason === 'mission-superseded' || reason === 'roster-changed') {
      st.dirty = new Set(['movement', 'contact', 'maneuver', 'strategic', 'individual']);
      return;
    }
    if (reason === 'contact-changed') {
      st.dirty.add('contact');
      st.dirty.add('maneuver');
      return;
    }
    if (reason === 'leg-advanced') {
      st.dirty.add('movement');
      return;
    }
    st.dirty.add('movement');
    st.dirty.add('contact');
  }

  function ingestFacts(ctx) {
    if (!ON || !ctx || !ctx.squad || !ctx.sim) return;
    var sq = ctx.squad,
      sim = ctx.sim,
      st = squadState(sq),
      facts = ctx.facts,
      b = battleState(sim);
    b.stats.ingested++;
    st.lastIngest = +(sim.time || 0);
    var m = sq._macroMission,
      mKey = m ? [m.version, m.intent, m.status, m.objectiveId || ''].join('|') : 'none';
    if (st.missionKey !== mKey) {
      st.missionKey = mKey;
      emit(sim, 'mission-superseded', { squad: sq }, { key: mKey });
    }
    var ck = contactKey(facts);
    if (st.contactKey !== ck) {
      st.contactKey = ck;
      emit(sim, 'contact-changed', { squad: sq }, { key: ck });
    }
    if (facts && facts.reports && facts.reports.length) st.knowledge.reports += facts.reports.length;
    /* Provenance-only contact memory: never read enemy authoritative state here. */
    if (facts && facts.contactPoint) {
      var p = facts.contactPoint;
      if (p && isFinite(+p.x) && isFinite(+p.z))
        st.knowledge.contacts.push({
          x: +p.x,
          z: +p.z,
          at: +(sim.time || 0),
          source: facts.contactSource || 'squad-fact'
        });
      while (st.knowledge.contacts.length > 8) st.knowledge.contacts.shift();
    }
  }

  function shouldRun(sim, sq, channel) {
    if (!ON) return true;
    var st = squadState(sq);
    if (st.dirty.has(channel)) return true;
    /* Strategic layer: bounded reconsideration without meaningful new information. */
    if (channel === 'strategic') {
      var b = battleState(sim),
        f = sq.faction,
        last = b.lastStrategic[f] || -Infinity,
        t = +(sim.time || 0);
      if (t - last >= 2) {
        b.lastStrategic[f] = t;
        return true;
      }
    }
    st.skips[channel] = (st.skips[channel] || 0) + 1;
    battleState(sim).stats.skipped++;
    return false;
  }

  function markRan(sim, sq, channel) {
    if (!ON || !sq) return;
    var st = squadState(sq);
    st.dirty.delete(channel);
    st.channels[channel] = +(sim.time || 0);
  }

  function forceDirty(sim, sq, channels) {
    var st = squadState(sq);
    (channels || ['movement', 'contact', 'maneuver']).forEach(function (c) {
      st.dirty.add(c);
    });
  }

  function picture(sim, sq) {
    var st = squadState(sq);
    return {
      contacts: st.knowledge.contacts.slice(),
      reports: st.knowledge.reports,
      dirty: Array.from(st.dirty),
      skips: Object.assign({}, st.skips)
    };
  }

  function summary(sim) {
    var b = sim && battles.get(sim);
    if (!b) return null;
    return {
      events: b.events.slice(-16),
      stats: Object.assign({}, b.stats)
    };
  }

  function beforeRestart(sim) {
    if (sim) battles.delete(sim);
  }

  root.BattleAIV2 = {
    on: ON,
    ingestFacts: ingestFacts,
    shouldRun: shouldRun,
    markRan: markRan,
    forceDirty: forceDirty,
    emit: emit,
    picture: picture,
    summary: summary,
    beforeRestart: beforeRestart,
    _squadState: squadState
  };
})(typeof window !== 'undefined' ? window : globalThis);
