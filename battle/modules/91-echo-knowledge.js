/* ECHO knowledge tier — personal and squad belief stores for ?aiScratch=1.
   Separates simulation truth from what units legitimately know. No RNG, no movement writers. */
(function (root) {
  'use strict';
  var ON = /[?&]aiScratch=1(?:&|#|$)/i.test(typeof location !== 'undefined' ? location.search || '' : '');
  var personal = new WeakMap();
  var squads = new WeakMap();
  var DECAY = 14;
  var HEARD_DECAY = 8;

  function dist(a, b) {
    return !a || !b ? Infinity : Math.hypot(a.x - b.x, a.z - b.z);
  }
  function here(s) {
    var p = s && s.root && s.root.position;
    return p ? { x: +p.x, z: +p.z } : null;
  }
  function freeze(o) {
    return Object.freeze(JSON.parse(JSON.stringify(o)));
  }

  function personalOf(man) {
    var st = personal.get(man);
    if (!st) {
      st = { tracks: Object.create(null), heard: [], orders: null };
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
        men: new Map()
      };
      squads.set(sq, st);
    }
    return st;
  }

  function decayTracks(st, t) {
    var ids = Object.keys(st.tracks);
    for (var i = 0; i < ids.length; i++) {
      var tr = st.tracks[ids[i]];
      var age = t - tr.at;
      tr.confidence = Math.max(0, tr.confidence - age / DECAY);
      if (tr.confidence <= 0.05) delete st.tracks[ids[i]];
    }
    st.heard = st.heard.filter(function (h) {
      return t - h.at < HEARD_DECAY;
    });
  }

  function ingestSight(man, sim) {
    if (!ON || !man || man.dead) return;
    var st = personalOf(man);
    var t = +(sim && sim.time) || 0;
    decayTracks(st, t);
    if (man.target && !man.target.dead) {
      var p = here(man.target);
      if (p)
        st.tracks[String(man.target.id)] = freeze({
          id: String(man.target.id),
          pos: p,
          at: t,
          confidence: 1,
          source: 'sight'
        });
    }
    if (man.lastSeen && man.lastSeen.pos) {
      var id = man.lastSeen.id != null ? String(man.lastSeen.id) : 'unknown';
      var prev = st.tracks[id];
      var conf = prev && prev.source === 'sight' ? Math.max(prev.confidence, 0.55) : 0.55;
      st.tracks[id] = freeze({
        id: id,
        pos: { x: +man.lastSeen.pos.x, z: +man.lastSeen.pos.z },
        at: t,
        confidence: conf,
        source: 'memory'
      });
    }
  }

  function ingestSquadReport(sq, sim, point, reason) {
    if (!ON || !sq || !point) return;
    var st = squadOf(sq);
    var t = +(sim && sim.time) || 0;
    st.reports.push(freeze({ pos: { x: +point.x, z: +point.z }, at: t, reason: reason || 'contact' }));
    if (st.reports.length > 12) st.reports.shift();
    st.threatAxis = { x: +point.x, z: +point.z };
    var members = sq.members || [];
    for (var i = 0; i < members.length; i++) {
      var m = members[i];
      if (!m || m.dead) continue;
      var ps = personalOf(m);
      decayTracks(ps, t);
      ps.heard.push(freeze({ pos: { x: +point.x, z: +point.z }, at: t, reason: 'squad-report' }));
      ps.tracks['report-' + st.reports.length] = freeze({
        id: 'report-' + st.reports.length,
        pos: { x: +point.x, z: +point.z },
        at: t,
        confidence: 0.72,
        source: 'told'
      });
    }
  }

  function bestThreat(st) {
    var best = null,
      score = -1;
    var ids = Object.keys(st.tracks);
    for (var i = 0; i < ids.length; i++) {
      var tr = st.tracks[ids[i]];
      var s = tr.confidence;
      if (s > score) {
        score = s;
        best = tr;
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
    ingestSquadReport: ingestSquadReport,
    bestThreat: bestThreat,
    decayTracks: decayTracks,
    resetBattle: resetBattle,
    dist: dist,
    here: here
  };
  if (ON && root.BattleModules)
    root.BattleModules.registerSystem('echo-knowledge', {
      version: '1-pulse-lattice',
      onBattleStart: resetBattle,
      beforeBattleRestart: resetBattle
    });
})(typeof window !== 'undefined' ? window : globalThis);
