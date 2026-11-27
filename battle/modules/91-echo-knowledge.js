/* ECHO knowledge tier — personal and squad belief stores for ?aiScratch=1.
   Sight uses timestamped belief records (or engagement lastSeen), never live enemy transforms. */
(function (root) {
  'use strict';
  var ON = /[?&]aiScratch=1(?:&|#|$)/i.test(typeof location !== 'undefined' ? location.search || '' : '');
  var personal = new WeakMap();
  var squads = new WeakMap();
  var DECAY = 14;
  var HEARD_DECAY = 8;
  var TELL_RANGE = 60;
  var MEMORY_AGE = 14;

  function dist(a, b) {
    return !a || !b ? Infinity : Math.hypot(a.x - b.x, a.z - b.z);
  }
  function here(s) {
    var p = s && s.root && s.root.position;
    return p ? { x: +p.x, z: +p.z } : null;
  }
  function hash01(a, b) {
    var s = String(a) + '|' + String(b),
      h = 2166136261 >>> 0;
    for (var i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return (h >>> 0) / 4294967296;
  }
  function beliefConfidence(rec, t) {
    if (!rec || t >= rec.expiresAt) return 0;
    var span = Math.max(0.001, rec.expiresAt - rec.observedAt);
    var age = Math.max(0, t - rec.observedAt);
    var base = +rec.baseConfidence || 0.55;
    return Math.max(0, Math.min(1, base * (1 - age / span)));
  }
  function confidenceOf(tr, t) {
    if (!tr) return 0;
    var age = Math.max(0, t - tr.peakAt);
    var base = tr.peakConfidence;
    if (tr.source === 'told') base *= 0.92;
    return Math.max(0, base - age / DECAY);
  }
  function snapshot(tr, t) {
    return Object.freeze({
      id: tr.id,
      pos: { x: tr.x, z: tr.z },
      at: tr.peakAt,
      confidence: +confidenceOf(tr, t).toFixed(4),
      source: tr.source,
      reporterId: tr.reporterId || null
    });
  }
  function upsertTrack(st, id, row, t) {
    var cur = st.tracks[id];
    if (!cur) st.tracks[id] = row;
    else if (row.peakAt >= cur.peakAt || confidenceOf(row, t) >= confidenceOf(cur, t)) {
      cur.x = row.x;
      cur.z = row.z;
      cur.peakAt = row.peakAt;
      cur.peakConfidence = row.peakConfidence;
      cur.source = row.source;
      cur.reporterId = row.reporterId || cur.reporterId;
    }
  }
  function pruneTracks(st, t) {
    var ids = Object.keys(st.tracks);
    for (var i = 0; i < ids.length; i++)
      if (confidenceOf(st.tracks[ids[i]], t) <= 0.05) delete st.tracks[ids[i]];
    st.heard = st.heard.filter(function (h) {
      return t - h.at < HEARD_DECAY;
    });
  }

  function personalOf(man) {
    var st = personal.get(man);
    if (!st) {
      st = { tracks: Object.create(null), heard: [] };
      personal.set(man, st);
    }
    return st;
  }
  function squadOf(sq) {
    var st = squads.get(sq);
    if (!st) {
      st = {
        sketch: null,
        reports: [],
        threatAxis: null,
        phase: 'advance',
        boundPulse: 0,
        lastHostileAt: 0,
        contactEnteredAt: 0
      };
      squads.set(sq, st);
    }
    return st;
  }

  function ingestBeliefRecord(man, st, rec, t) {
    if (!rec || rec.combatThreat === false || t >= rec.expiresAt) return;
    var conf = beliefConfidence(rec, t);
    if (conf < 0.12) return;
    var source =
      rec.source === 'seen' ? 'sight' : rec.source === 'told' || rec.source === 'heard' ? 'told' : 'memory';
    var id = rec.targetId != null ? String(rec.targetId) : rec.key || 'unknown';
    upsertTrack(
      st,
      id,
      {
        id: id,
        x: +rec.x,
        z: +rec.z,
        peakAt: +rec.observedAt,
        peakConfidence: conf,
        source: source,
        reporterId: rec.sourceSoldierId != null ? String(rec.sourceSoldierId) : String(man.id)
      },
      t
    );
  }

  function ingestSight(man, sim) {
    if (!ON || !man || man.dead) return;
    var st = personalOf(man);
    var t = +(sim && sim.time) || 0;
    pruneTracks(st, t);
    var SA = root.SquadAI;
    if (SA && SA.soldierBeliefsOn && SA.soldierBeliefsOn() && man._beliefs && man._beliefs.byKey) {
      var keys = Object.keys(man._beliefs.byKey);
      for (var i = 0; i < keys.length; i++) ingestBeliefRecord(man, st, man._beliefs.byKey[keys[i]], t);
      return;
    }
    var e = man.eng;
    if (e && e.lastSeen && Number.isFinite(+e.lastSeenAt) && t - +e.lastSeenAt <= MEMORY_AGE) {
      var lid = e.lastTargetId != null ? String(e.lastTargetId) : 'last-seen';
      upsertTrack(
        st,
        lid,
        {
          id: lid,
          x: +e.lastSeen.x,
          z: +e.lastSeen.z,
          peakAt: +e.lastSeenAt,
          peakConfidence: 0.5,
          source: 'memory',
          reporterId: String(man.id)
        },
        t
      );
    }
  }

  function deliverTold(sim, listener, reporter, fact, t) {
    if (!listener || listener.dead || !reporter || reporter.dead || !fact) return false;
    var lp = here(listener),
      rp = here(reporter);
    if (!lp || !rp) return false;
    var d = dist(lp, rp);
    if (d > TELL_RANGE) return false;
    var pMiss = 0.05 + 0.45 * Math.pow(d / TELL_RANGE, 2);
    if ((+listener.suppressedUntil || 0) > t) pMiss += 0.2;
    if (hash01('echo-tell:' + fact.id, listener.id) < Math.min(0.9, pMiss)) return false;
    var st = personalOf(listener);
    upsertTrack(
      st,
      'told-' + fact.id + ':' + reporter.id,
      {
        id: fact.id,
        x: +fact.x,
        z: +fact.z,
        peakAt: t,
        peakConfidence: 0.72,
        source: 'told',
        reporterId: String(reporter.id)
      },
      t
    );
    st.heard.push({ pos: { x: +fact.x, z: +fact.z }, at: t, from: String(reporter.id) });
    return true;
  }

  function observedThreat(sq, sim) {
    if (!sq) return null;
    var t = +(sim && sim.time) || 0,
      SA = root.SquadAI,
      map = SA && SA.squadContactsMap ? SA.squadContactsMap(sq, sim) : null;
    if (map && map.length) {
      for (var i = 0; i < map.length; i++) {
        var rec = map[i];
        if (rec.source !== 'seen' || rec.confidence < 0.35) continue;
        var rep = null;
        var men = sq.members || [];
        for (var j = 0; j < men.length; j++)
          if (men[j] && String(men[j].id) === String(rec.sourceSoldier)) rep = men[j];
        return {
          id: rec.targetId != null ? String(rec.targetId) : 'seen',
          x: +rec.x,
          z: +rec.z,
          at: +rec.at,
          reporter: rep,
          confidence: rec.confidence
        };
      }
    }
    var men = sq.members || [],
      best = null,
      bestScore = -1;
    for (var k = 0; k < men.length; k++) {
      var m = men[k];
      if (!m || m.dead) continue;
      var st = personalOf(m);
      var ids = Object.keys(st.tracks);
      for (var n = 0; n < ids.length; n++) {
        var tr = st.tracks[ids[n]];
        if (tr.source !== 'sight') continue;
        var conf = confidenceOf(tr, t);
        if (conf > bestScore) {
          bestScore = conf;
          best = {
            id: tr.id,
            x: tr.x,
            z: tr.z,
            at: tr.peakAt,
            reporter: m,
            confidence: conf
          };
        }
      }
    }
    return best;
  }

  function resolveUnit(sim, faction, targetId) {
    if (!sim || targetId == null) return null;
    var f = sim.factions && sim.factions[faction === 'us' ? 'ge' : 'us'];
    var roster = (f && f.squads) || [];
    for (var i = 0; i < roster.length; i++) {
      var mem = roster[i].members || [];
      for (var j = 0; j < mem.length; j++)
        if (mem[j] && String(mem[j].id) === String(targetId)) return mem[j];
    }
    return null;
  }

  function syncSquadThreat(sq, sim) {
    if (!ON || !sq) return null;
    var st = squadOf(sq);
    var t = +(sim && sim.time) || 0;
    var obs = observedThreat(sq, sim);
    if (obs) {
      st.threatAxis = { x: obs.x, z: obs.z };
      st.lastHostileAt = t;
      st.reports.push(
        Object.freeze({
          pos: { x: obs.x, z: obs.z },
          at: t,
          reason: 'observed',
          reporterId: obs.reporter ? String(obs.reporter.id) : null
        })
      );
      if (st.reports.length > 12) st.reports.shift();
      if (obs.reporter) {
        var members = sq.members || [];
        for (var i = 0; i < members.length; i++) {
          var m = members[i];
          if (!m || m.dead || m === obs.reporter) continue;
          deliverTold(sim, m, obs.reporter, { id: obs.id, x: obs.x, z: obs.z }, t);
        }
        var BC = root.BattleCallouts;
        var unit = resolveUnit(sim, sq.faction, obs.id);
        if (BC && BC.report && unit) {
          BC.report(sim, sq, {
            unit: unit,
            x: obs.x,
            z: obs.z,
            at: obs.at,
            stance: (obs.reporter.eng && obs.reporter.eng.stance) || 'crouch',
            seenBy: obs.reporter.id
          });
        }
      }
    }
    return obs;
  }

  function bestThreat(st, t) {
    var best = null,
      score = -1;
    var ids = Object.keys(st.tracks);
    for (var i = 0; i < ids.length; i++) {
      var tr = st.tracks[ids[i]];
      var s = confidenceOf(tr, t);
      if (s > score) {
        score = s;
        best = snapshot(tr, t);
      }
    }
    return best;
  }

  function resetBattle(sim) {
    if (!sim || !sim.factions) return;
    ['us', 'ge'].forEach(function (f) {
      var list = (sim.factions[f] && sim.factions[f].squads) || [];
      for (var i = 0; i < list.length; i++) squads.delete(list[i]);
    });
    personal = new WeakMap();
  }

  root.BattleEchoKnowledge = {
    on: ON,
    personalOf: personalOf,
    squadOf: squadOf,
    ingestSight: ingestSight,
    observedThreat: observedThreat,
    syncSquadThreat: syncSquadThreat,
    deliverTold: deliverTold,
    bestThreat: bestThreat,
    confidenceOf: confidenceOf,
    snapshot: snapshot,
    resetBattle: resetBattle,
    dist: dist,
    here: here,
    beliefConfidence: beliefConfidence
  };
  if (ON && root.BattleModules)
    root.BattleModules.registerSystem('echo-knowledge', {
      version: '3-belief-sight',
      onBattleStart: resetBattle,
      beforeBattleRestart: resetBattle
    });
})(typeof window !== 'undefined' ? window : globalThis);
