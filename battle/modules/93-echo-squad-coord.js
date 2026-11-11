/* ECHO squad coordination — maneuver sketches and formation geometry (scratch-only). */
(function (root) {
  'use strict';
  var ON = /[?&]aiScratch=1(?:&|#|$)/i.test(typeof location !== 'undefined' ? location.search || '' : '');
  var K = function () {
    return root.BattleEchoKnowledge;
  };

  function unit(v) {
    var d = Math.hypot(v.x, v.z) || 1;
    return { x: v.x / d, z: v.z / d };
  }
  function add(a, b, s) {
    return { x: a.x + b.x * (s || 1), z: a.z + b.z * (s || 1) };
  }
  function perp(f) {
    return { x: f.z, z: -f.x };
  }
  function centroid(members) {
    var n = 0,
      x = 0,
      z = 0;
    for (var i = 0; i < members.length; i++) {
      var h = K().here(members[i]);
      if (!h) continue;
      x += h.x;
      z += h.z;
      n++;
    }
    return n ? { x: x / n, z: z / n } : { x: 0, z: 0 };
  }
  function living(sq) {
    return (sq.members || []).filter(function (m) {
      return m && !m.dead && !m.isPlayer;
    });
  }
  function forwardToObjective(sq, sim) {
    var goal =
      (sq.route && sq.route.length && sq.route[Math.min(sq.route.length - 1, Math.max(0, sq.routeIndex || 0))]) ||
      sq.objective ||
      sq.orderAnchor;
    var here = centroid(living(sq));
    if (!goal) return { x: 0, z: 1 };
    return unit({ x: goal.x - here.x, z: goal.z - here.z });
  }
  function formationSlots(sq, anchor, fwd) {
    var men = living(sq),
      right = perp(fwd),
      out = [];
    for (var i = 0; i < men.length; i++) {
      var row = Math.floor(i / 2),
        side = i % 2 === 0 ? -1 : 1;
      out.push({
        man: men[i],
        point: add(add(anchor, fwd, -1.2 * row), right, side * 2.8)
      });
    }
    return out;
  }
  function boundPoint(sq, sim, role) {
    var here = centroid(living(sq));
    var fwd = forwardToObjective(sq, sim);
    var hop = role === 'mover' ? 22 : 0;
    var st = K().squadOf(sq);
    if (st.threatAxis) {
      if (role === 'watcher') return here;
      var blend = unit({ x: fwd.x * 0.65 + (here.x - st.threatAxis.x) * 0.35, z: fwd.z * 0.65 + (here.z - st.threatAxis.z) * 0.35 });
      return add(here, blend, hop);
    }
    return add(here, fwd, hop);
  }
  function refreshSketch(sq, sim) {
    var Kb = K();
    if (!Kb.on) return;
    var st = Kb.squadOf(sq);
    var t = +(sim.time) || 0;
    var men = living(sq);
    for (var i = 0; i < men.length; i++) Kb.ingestSight(men[i], sim);
    if (sq.inContact) {
      var anchor = sq.orderAnchor || centroid(men);
      if (anchor) Kb.ingestSquadReport(sq, sim, anchor, 'in-contact');
      if (st.phase === 'advance') {
        st.phase = 'contact';
        st.boundPulse = 0;
      }
    } else if (st.phase === 'contact' && t - (st.sketch && st.sketch.since || 0) > 10) {
      st.phase = 'advance';
    }
    st.sketch = {
      since: t,
      phase: st.phase,
      pulse: st.boundPulse,
      forward: forwardToObjective(sq, sim)
    };
  }

  root.BattleEchoSquadCoord = {
    on: ON,
    living: living,
    centroid: centroid,
    formationSlots: formationSlots,
    boundPoint: boundPoint,
    forwardToObjective: forwardToObjective,
    refreshSketch: refreshSketch
  };
})(typeof window !== 'undefined' ? window : globalThis);
