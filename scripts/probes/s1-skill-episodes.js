/* Do the five S1 squad skills (defensive posts, regroup, recon, structure clearing, retreat) run on
   their own in natural battles under the controller, and do the men physically carry them out?
   Observe only.

   The march provider (13c) records which retained skill it ran for each squad on its last dispatch
   (`summary(sim)[i].squadSkill.kind`: defense, regroup, recon, structure, retreat) and how many
   personal `movement.move` actions it holds. This probe turns that into episodes: when a squad's
   kind changes, the old episode ends and a new one starts. For each episode it keeps the squad's
   phase and state at the start, how long it lasted, the most men it moved at once, the stop reasons
   the provider counted, and physical evidence from the men themselves: every man whose published
   movement key was a controller key during the episode, how far he actually moved, and whether he
   ended within 1.5 m of his adopted destination. Staged drills prove a skill can run; this asks
   whether it does, unprompted. `selected` is not arrival: only the displacement and the end distance
   are physical evidence.

   Use (Muse/Kit): PROBE=s1-skill-episodes PROBE_CONTROL=1 on any natural battles (all three types).
   The probe reads provider and controller summaries, which change nothing (13a, 13c). */
(function (root) {
  'use strict';
  var KINDS = ['defense', 'regroup', 'recon', 'structure', 'retreat'];
  var ARRIVED = 1.5,
    MAX_EPISODES = 400;
  var open, episodes, totals, samples;

  function pos(s) {
    return s && s.root && s.root.position ? { x: +s.root.position.x, z: +s.root.position.z } : null;
  }
  function dist(a, b) {
    return a && b ? Math.hypot(a.x - b.x, a.z - b.z) : Infinity;
  }
  function squadOf(sim, key) {
    var f = key.split(':')[0],
      id = key.slice(f.length + 1),
      a = (sim.factions && sim.factions[f] && sim.factions[f].squads) || [];
    for (var i = 0; i < a.length; i++) if (String(a[i].id) === id) return a[i];
    return null;
  }
  function controllerKey(s) {
    return !!(
      s &&
      typeof s._fireteamPublishKey === 'string' &&
      s._fireteamPublishKey.indexOf('controller:') === 0
    );
  }
  function track(ep, sq) {
    (sq.members || []).forEach(function (s) {
      if (!s || s.dead || s.isPlayer || !controllerKey(s)) return;
      var id = String(s.id),
        m = ep.men[id];
      if (!m) m = ep.men[id] = { from: pos(s), last: pos(s), path: 0 };
      var p = pos(s);
      m.path += dist(m.last, p) < 50 ? dist(m.last, p) : 0;
      m.last = p;
      m.dest = s._fireteamDestination
        ? { x: +s._fireteamDestination.x, z: +s._fireteamDestination.z }
        : m.dest;
    });
  }
  function close(sim, key, reason) {
    var ep = open[key];
    if (!ep) return;
    delete open[key];
    var sq = squadOf(sim, key);
    if (sq) track(ep, sq);
    var men = Object.keys(ep.men).map(function (id) {
        var m = ep.men[id],
          s =
            sq &&
            (sq.members || []).filter(function (x) {
              return x && String(x.id) === id;
            })[0];
        return {
          id: id,
          dead: !!(s && s.dead),
          moved: +dist(m.from, m.last).toFixed(1),
          path: +m.path.toFixed(1),
          endToDest: m.dest ? +dist(m.last, m.dest).toFixed(2) : null
        };
      }),
      arrived = men.filter(function (m) {
        return m.endToDest != null && m.endToDest <= ARRIVED;
      }).length,
      moved = men.filter(function (m) {
        return m.path >= 2;
      }).length;
    var row = {
      squad: key,
      kind: ep.kind,
      startedAt: ep.at,
      endedAt: +(+sim.time).toFixed(2),
      seconds: +(+sim.time - ep.at).toFixed(2),
      endedBy: reason,
      startPhase: ep.phase,
      startState: ep.state,
      inContactAtStart: ep.inContact,
      maxActions: ep.maxActions,
      stopped: ep.stopped,
      men: men.length,
      menMoved: moved,
      menArrived: arrived
    };
    var t = totals[ep.kind];
    t.episodes++;
    t.seconds += row.seconds;
    t.withMovement += moved > 0 ? 1 : 0;
    t.withArrival += arrived > 0 ? 1 : 0;
    t.squads[key] = true;
    if (episodes.length < MAX_EPISODES) episodes.push(row);
  }
  (root.BattleProbes = root.BattleProbes || {})['s1-skill-episodes'] = {
    every: 0.45,
    start: function () {
      open = {};
      episodes = [];
      samples = 0;
      totals = {};
      KINDS.forEach(function (k) {
        totals[k] = { episodes: 0, seconds: 0, withMovement: 0, withArrival: 0, squads: {} };
      });
    },
    sample: function (sim) {
      var MP = root.BattleTacticalMarchProvider;
      if (!MP || !MP.summary) return;
      samples++;
      var rows = MP.summary(sim) || [],
        seen = {};
      rows.forEach(function (row) {
        var key = row.squad,
          kind = row.squadSkill && row.squadSkill.kind,
          sq = squadOf(sim, key);
        seen[key] = true;
        var ep = open[key];
        if (ep && (ep.kind !== kind || !row.controlled))
          close(sim, key, !row.controlled ? 'left-controller' : kind ? 'skill:' + kind : 'no-skill');
        if (!kind || !row.controlled || KINDS.indexOf(kind) < 0 || !sq) return;
        ep = open[key];
        if (!ep)
          ep = open[key] = {
            kind: kind,
            at: +(+sim.time).toFixed(2),
            phase: sq.commandPhase || null,
            state: sq.state || null,
            inContact: !!sq.inContact,
            maxActions: 0,
            stopped: {},
            men: {}
          };
        ep.maxActions = Math.max(ep.maxActions, +row.squadSkill.actions || 0);
        Object.keys(row.squadSkill.stopped || {}).forEach(function (why) {
          ep.stopped[why] = Math.max(ep.stopped[why] || 0, row.squadSkill.stopped[why]);
        });
        track(ep, sq);
      });
      Object.keys(open).forEach(function (key) {
        if (!seen[key]) close(sim, key, 'squad-gone');
      });
    },
    report: function (sim) {
      Object.keys(open).forEach(function (key) {
        close(sim, key, 'battle-end');
      });
      var byKind = {};
      KINDS.forEach(function (k) {
        var t = totals[k];
        byKind[k] = {
          episodes: t.episodes,
          squads: Object.keys(t.squads).length,
          seconds: +t.seconds.toFixed(1),
          withMovement: t.withMovement,
          withArrival: t.withArrival
        };
      });
      return { schema: 's1-skill-episodes-v1', samples: samples, byKind: byKind, episodes: episodes };
    }
  };
})(window);
