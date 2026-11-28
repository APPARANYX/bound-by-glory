/* Who are the two writers behind each order-writer conflict the benchmark counts? Observe only.

   The standard benchmark's `writerConflicts` is module 36's list (BattleOrderProvenance.conflicts):
   a `writer-ping-pong` (owner A, B, A on one field within 8 s) or `writer-churn` (three owners, three
   switches). Module 36 labels each write with the owner context it ran in, which names a layer, not
   the code. This probe joins every write module 36 records, on every field it tracks (squad
   commandPhase, targetObjective, objective, orderAnchor, rally; soldier _fireteamDestination,
   _preparedDefensePost, _defensePost, orderDestination, destination), to:
     - the calling site (the first non-probe stack frames, file:function:line), and
     - the command state at the moment of the write: squad phase/state, controller mode, the
       General's mission version, the man's published/adopted movement key and envelope, his
       survival key, the resolver's winning owner/kind/reason, his Engagement state and the
       squad's transport phase.
   When module 36 raises a conflict the probe also freezes the controller's live actions for that
   squad. The report lists each conflict with its last five events so the competing writers, the
   field, the ownership transition and the command generation can be read directly.

   Use (Muse/Kit): PROBE=writer-conflict-sites PROBE_CONTROL=1
     PROBE_BATTLES=us-defend:815-accept-20261110-0008,... PROBE_URL=...battle_sim_local.php?strategicInterception=0
   The probe wraps module 36's setters and calls them unchanged; it draws no RNG and writes no
   simulation state, so PROBE_CONTROL=1 must report sameBattle true. */
(function (root) {
  'use strict';
  var SQUAD_FIELDS = ['commandPhase', 'targetObjective', 'objective', 'orderAnchor', 'rally'];
  var SOLDIER_FIELDS = [
    '_fireteamDestination',
    '_preparedDefensePost',
    '_defensePost',
    'orderDestination',
    'destination'
  ];
  var KEEP_EVENTS = 6000,
    MAX_CONFLICTS = 120,
    FRAMES = 6;
  var byId, hooked, seenConflicts, conflicts, writes, steps, hookFailures;

  function bump(map, key) {
    map[key] = (map[key] || 0) + 1;
  }
  function pt(v) {
    return v && isFinite(+v.x) && isFinite(+v.z) ? { x: +(+v.x).toFixed(2), z: +(+v.z).toFixed(2) } : null;
  }
  /* The first FRAMES stack frames outside this probe and module 36, as file:function:line. V8 keeps
     10 frames by default; that is enough for the writer and its caller. */
  function sites() {
    var lines = String(new Error().stack || '').split('\n'),
      out = [];
    for (var i = 1; i < lines.length && out.length < FRAMES; i++) {
      var m = /at (?:(.*?) \()?(.*?):(\d+):\d+\)?\s*$/.exec(lines[i]);
      if (!m) continue;
      var fn = m[1] || '(anonymous)',
        file = m[2].split('?')[0].split('/').pop();
      /* Skip this probe and module 36 (its setter, withOwner and hook wrappers are not the writer). */
      if (/^writer-conflict-sites\.js$|36-order-provenance|<anonymous>/.test(file) || /\bwrapped\b/.test(fn))
        continue;
      out.push(file + ':' + fn + ':' + m[3]);
    }
    return out;
  }
  function controllerMode(sim, sq) {
    var TC = root.BattleTacticalController;
    try {
      return TC && TC.mode ? TC.mode(sim, sq) : 'none';
    } catch (_) {
      return 'error';
    }
  }
  function missionVersion(sq) {
    var m = sq && sq._macroMission;
    return m && isFinite(+m.version) ? +m.version : null;
  }
  function context(sim, target, kind) {
    var sq = kind === 'squad' ? target : target && target.squad;
    var out = {
      phase: (sq && sq.commandPhase) || null,
      state: (sq && sq.state) || null,
      controller: sq ? controllerMode(sim, sq) : null,
      mission: missionVersion(sq),
      objective: (sq && sq.targetObjective) || null,
      inContact: !!(sq && sq.inContact),
      transport: (sq && sq._transport && sq._transport.phase) || null
    };
    if (kind === 'soldier' && target) {
      var r = target._movementResolver,
        last = r && (r.last || r.goal);
      out.publishKey = target._fireteamPublishKey || null;
      out.envelope = target._fireteamAdoptedEnvelope != null ? String(target._fireteamAdoptedEnvelope) : null;
      out.survivalKey = target._survivalMovementKey || null;
      out.resolver = last ? [last.owner || '-', last.kind || '-', last.reason || '-'].join('/') : null;
      out.proposalOwner = target._movementProposalOwner || null;
      out.eng = (target.eng && target.eng.state) || target.state || null;
      out.prepared = !!target._preparedDefensePost;
      out.player = !!target.isPlayer;
    }
    return out;
  }
  function hook(sim, target, kind, fields) {
    fields.forEach(function (field) {
      var d = Object.getOwnPropertyDescriptor(target, field);
      if (!d || !d.set || d.set.__writerSitesProbe) return;
      var set = d.set;
      var wrapped = function (v) {
        var store = root.__battle__ && root.__battle__._orderProvenance,
          seq = store ? store.seq : 0;
        set.call(this, v);
        if (!store || store.seq <= seq) return;
        /* Module 36 recorded this write: name its caller and freeze the command state. */
        var at = sites();
        bump(writes, field + ' ' + (at[0] || 'unknown'));
        for (var id = seq + 1; id <= store.seq; id++)
          byId[id] = { sites: at, ctx: context(root.__battle__, this, kind) };
        var floor = store.seq - KEEP_EVENTS;
        if (floor > 0 && byId[floor] !== undefined) delete byId[floor];
      };
      wrapped.__writerSitesProbe = true;
      try {
        Object.defineProperty(target, field, {
          enumerable: d.enumerable,
          configurable: true,
          get: d.get,
          set: wrapped
        });
      } catch (_) {
        hookFailures++;
      }
    });
  }
  function hookAll(sim) {
    ['us', 'ge'].forEach(function (f) {
      var squads = (sim.factions && sim.factions[f] && sim.factions[f].squads) || [];
      for (var i = 0; i < squads.length; i++) {
        var sq = squads[i];
        if (!hooked.has(sq) && sq.__orderProvenance) {
          hook(sim, sq, 'squad', SQUAD_FIELDS);
          hooked.add(sq);
        }
        var m = sq.members || [];
        for (var j = 0; j < m.length; j++)
          if (m[j] && !hooked.has(m[j]) && m[j].__orderProvenance) {
            hook(sim, m[j], 'soldier', SOLDIER_FIELDS);
            hooked.add(m[j]);
          }
      }
    });
  }
  function findSquad(sim, faction, id) {
    var a = (sim.factions && sim.factions[faction] && sim.factions[faction].squads) || [];
    for (var i = 0; i < a.length; i++) if (String(a[i].id) === String(id)) return a[i];
    return null;
  }
  function liveActions(sim, squadId) {
    var TC = root.BattleTacticalController;
    if (!TC || !TC.summary) return null;
    try {
      return (TC.summary(sim).live || [])
        .filter(function (a) {
          return String(a.squad) === String(squadId);
        })
        .map(function (a) {
          return [a.capability, a.actorId, a.stage, a.reason, a.cleanupPending ? 'cleanup' : ''].join('/');
        });
    } catch (_) {
      return ['summary-fault'];
    }
  }
  function collect(sim) {
    var P = root.BattleOrderProvenance;
    if (!P || !P.conflicts) return;
    var list = P.conflicts(sim);
    for (var i = list.length - 1; i >= 0; i--) {
      var c = list[i];
      if (seenConflicts.has(c)) continue;
      seenConflicts.add(c);
      if (conflicts.length >= MAX_CONFLICTS) continue;
      var sq = findSquad(sim, c.faction, c.squad);
      conflicts.push({
        time: c.time,
        kind: c.kind,
        field: c.field,
        squad: c.faction + ':' + c.squad,
        soldier: c.soldier,
        owners: c.owners,
        controllerLive: liveActions(sim, c.squad),
        squadNow: sq ? context(sim, sq, 'squad') : null,
        events: (c.events || []).map(function (e) {
          var j = byId[e.id] || {};
          return {
            id: e.id,
            t: e.time,
            owner: e.owner,
            ownerSite: e.site,
            reason: e.reason,
            from: pt(e.from) || e.from,
            to: pt(e.to) || e.to,
            phase: e.phase,
            rule: e.rule,
            sites: j.sites || ['(not hooked: in-place or before hook)'],
            ctx: j.ctx || null
          };
        })
      });
    }
  }
  (root.BattleProbes = root.BattleProbes || {})['writer-conflict-sites'] = {
    every: 0,
    start: function () {
      byId = Object.create(null);
      hooked = new WeakSet();
      seenConflicts = new WeakSet();
      conflicts = [];
      writes = {};
      steps = 0;
      hookFailures = 0;
    },
    sample: function (sim) {
      steps++;
      hookAll(sim);
      collect(sim);
    },
    report: function (sim) {
      collect(sim);
      var bySignature = {};
      conflicts.forEach(function (c) {
        var tail = c.events.slice(-3);
        bump(
          bySignature,
          [
            c.kind,
            c.field,
            tail
              .map(function (e) {
                return e.owner + '@' + (e.sites[0] || '?');
              })
              .join(' > ')
          ].join(' | ')
        );
      });
      return {
        schema: 'writer-conflict-sites-v1',
        steps: steps,
        hookFailures: hookFailures,
        benchmarkConflicts: root.BattleOrderProvenance
          ? root.BattleOrderProvenance.conflicts(sim).length
          : null,
        captured: conflicts.length,
        bySignature: bySignature,
        conflicts: conflicts,
        topWriteSites: Object.keys(writes)
          .sort(function (a, b) {
            return writes[b] - writes[a];
          })
          .slice(0, 40)
          .map(function (k) {
            return k + ' x' + writes[k];
          })
      };
    }
  };
})(window);
