/* ECHO knowledge tier — personal and squad belief stores for ?aiScratch=1.
   Mutable internal records; confidence is derived from timestamps, never written on frozen objects. */
(function (root) {
  'use strict';
  var ON = /[?&]aiScratch=1(?:&|#|$)/i.test(typeof location !== 'undefined' ? location.search || '' : '');
  var personal = new WeakMap();
  var squads = new WeakMap();
  var DECAY = 14;
  var HEARD_DECAY = 8;
  var TELL_RANGE = 60;

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
    else {
      if (row.peakConfidence >= confidenceOf(cur, t)) {
        cur.x = row.x;
        cur.z = row.z;
        cur.peakAt = row.peakAt;
        cur.peakConfidence = row.peakConfidence;
        cur.source = row.source;
        cur.reporterId = row.reporterId || cur.reporterId;
      }
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

  function ingestSight(man, sim) {
    if (!ON || !man || man.dead) return;
    var st = personalOf(man);
    var t = +(sim && sim.time) || 0;
    pruneTracks(st, t);
    if (man.target && !man.target.dead) {
      var p = here(man.target);
      if (p)
        upsertTrack(
          st,
          String(man.target.id),
          {
            id: String(man.target.id),
            x: p.x,
            z: p.z,
            peakAt: t,
            peakConfidence: 1,
            source: 'sight',
            reporterId: String(man.id)
          },
          t
        );
    }
    if (man.lastSeen && man.lastSeen.pos) {
      var lid = man.lastSeen.id != null ? String(man.lastSeen.id) : 'unknown';
      upsertTrack(
        st,
        lid,
        {
          id: lid,
          x: +man.lastSeen.pos.x,
          z: +man.lastSeen.pos.z,
          peakAt: t,
          peakConfidence: 0.55,
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
      men = sq.members || [],
      best = null,
      bestScore = -1;
    for (var i = 0; i < men.length; i++) {
      var m = men[i];
      if (!m || m.dead) continue;
      var st = personalOf(m);
      var ids = Object.keys(st.tracks);
      for (var j = 0; j < ids.length; j++) {
        var tr = st.tracks[ids[j]];
        if (tr.source !== 'sight') continue;
        var conf = confidenceOf(tr, t);
        if (conf < 0.45) continue;
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
      if (m.target && !m.target.dead) {
        var p = here(m.target);
        if (p && 1 > bestScore)
          best = { id: String(m.target.id), x: p.x, z: p.z, at: t, reporter: m, confidence: 1 };
      }
    }
    return best;
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
          reporterId: String(obs.reporter.id)
        })
      );
      if (st.reports.length > 12) st.reports.shift();
      if (sq.leader && !sq.leader.dead && obs.reporter) {
        var members = sq.members || [];
        for (var i = 0; i < members.length; i++) {
          var m = members[i];
          if (!m || m.dead || m === obs.reporter) continue;
          deliverTold(sim, m, obs.reporter, { id: obs.id, x: obs.x, z: obs.z }, t);
        }
      }
      var BC = root.BattleCallouts;
      if (BC && BC.report && obs.reporter && obs.reporter.target) {
        BC.report(sim, sq, {
          unit: obs.reporter.target,
          x: obs.x,
          z: obs.z,
          at: obs.at,
          stance: (obs.reporter.eng && obs.reporter.eng.stance) || 'crouch',
          seenBy: obs.reporter.id
        });
      }
    }
    if (sq.inContact) st.lastHostileAt = t;
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
    here: here
  };
  if (ON && root.BattleModules)
    root.BattleModules.registerSystem('echo-knowledge', {
      version: '2-mutable-tracks',
      onBattleStart: resetBattle,
      beforeBattleRestart: resetBattle
    });
})(typeof window !== 'undefined' ? window : globalThis);
