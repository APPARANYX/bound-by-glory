/* Benchmark-only inclusive wall-time profiler.
   Inject this after the Battle Sim page has loaded. It wraps public runtime entry points and
   registered system hooks without changing their arguments, return values, scheduling or state.
   Production never loads this file. */
(function (root) {
  'use strict';
  if (root.BattleHotpathProfiler) return;

  var clock =
    root.performance && typeof root.performance.now === 'function'
      ? function () {
          return root.performance.now();
        }
      : function () {
          return Date.now();
        };
  var startedAt = clock(),
    stats = Object.create(null),
    wrapped = [],
    scope = [],
    routeActive = null,
    routeLast = new WeakMap(),
    routePlanning = routeStats();

  function blankManeuver() {
    return { calls: 0, basisUsed: 0, basisUnused: 0, totalMs: 0, preludeMs: 0,
      byBranch: Object.create(null), byPhase: Object.create(null),
      byMinute: Object.create(null), byMoverCount: Object.create(null),
      detail: Object.create(null) };
  }
  var maneuver = blankManeuver();
  function blankTriggers() {
    return { decisions: 0, outcomes: Object.create(null),
      basisReasons: Object.create(null), changedParts: Object.create(null),
      exactBasisRepeat: 0, recentStateRepeat: 0, noPrior: 0,
      refills: 0, readyCounts: Object.create(null), readyTwoByPhase: Object.create(null),
      holdersTooFew: 0, noHolderCandidate: 0, holdersTooFewCapable: 0,
      holdersWithCandidate: 0, byMoverCount: Object.create(null),
      byMinute: Object.create(null) };
  }
  var triggers = blankTriggers(), priorDecision = new WeakMap();
  function count(table, label) { table[label] = (table[label] || 0) + 1; }
  function compareBasis(before, after) {
    if (!before) return 'no-prior-failure';
    if (before === after) return 'same-basis-due-cycle';
    var a, b;
    try { a = JSON.parse(before); b = JSON.parse(after); }
    catch (_) { return 'unparseable'; }
    var labels = ['retreat', 'command-phase', 'contact', 'nav-version', 'flank-goal', 'threat-position'];
    var changed = [];
    for (var i = 0; i < 6; i++)
      if (JSON.stringify(a[i]) !== JSON.stringify(b[i])) changed.push(labels[i]);
    var old = a[6] || [], now = b[6] || [];
    if (old.length !== now.length) changed.push('roster');
    else {
      var location = false, viability = false, shot = false, ids = false;
      for (var j = 0; j < now.length; j++) {
        if (old[j][0] !== now[j][0]) ids = true;
        if (old[j][1] !== now[j][1] || old[j][2] !== now[j][2]) location = true;
        if (old[j][3] !== now[j][3]) viability = true;
        if (old[j][4] !== now[j][4]) shot = true;
      }
      if (ids) changed.push('roster');
      if (location) changed.push('soldier-rounded-position');
      if (viability) changed.push('soldier-viability');
      if (shot) changed.push('shot-evidence');
    }
    changed.forEach(function (c) { count(triggers.changedParts, c); });
    if (!changed.length) return 'changed-unknown';
    if (changed.length === 1) return changed[0] + '-only';
    return changed.slice().sort().join('+');
  }
  function refillOpportunity(h, excluded) {
    if (!h || !h.holders) return { total: 0, candidate: false, capable: 0 };
    var A = root.SquadAI, capable = 0, candidate = false;
    for (var i = 0; i < h.holders.length; i++) {
      var man = h.holders[i];
      if (man && !man.dead && !man.incapacitated && man.hp > 0 && man.weapon && !man.outOfAmmo) capable++;
      if (man && (!A || !A.isMachineGun || !A.isMachineGun(man)) &&
          (!excluded || !excluded.has(String(man.id)))) candidate = true;
    }
    return { total: h.holders.length, candidate: candidate, capable: capable };
  }
  function recordManeuver(table, label, ms, prelude, unused) {
    var b = table[label] || (table[label] = { calls: 0, totalMs: 0, preludeMs: 0, basisUnused: 0 });
    b.calls++; b.totalMs += ms; b.preludeMs += prelude;
    if (unused) b.basisUnused++;
  }
  var maneuverProbe = {
    clock: clock,
    decision: function (ctx, st, basis, cycle, newGoal) {
      triggers.decisions++;
      var prior = st.blocked || null,
        reason = compareBasis(prior, basis),
        memory = priorDecision.get(ctx.squad);
      if (!prior) triggers.noPrior++;
      if (prior === basis) triggers.exactBasisRepeat++;
      if (memory && memory.basis === basis) triggers.recentStateRepeat++;
      priorDecision.set(ctx.squad, { basis: basis });
      if (newGoal) reason = 'new-flank-goal:' + reason;
      count(triggers.basisReasons, reason);
    },
    ready: function (ctx, st, ready) {
      count(triggers.readyCounts, String(ready.length));
      if (ready.length === 2) count(triggers.readyTwoByPhase, st.window ? 'active-refill' : 'new-window');
    },
    outcome: function (st) {
      count(triggers.outcomes, st.diagnostic && st.diagnostic.result || 'unknown');
    },
    refill: function (ctx, st, h, active, excluded) {
      triggers.refills++;
      count(triggers.byMoverCount, String(active.length));
      count(triggers.byMinute, String(Math.floor(ctx.sim.time / 60)));
      var o = refillOpportunity(h, excluded);
      if (o.total < 3) triggers.holdersTooFew++;
      if (o.capable < 3) triggers.holdersTooFewCapable++;
      if (!o.candidate) triggers.noHolderCandidate++;
      else triggers.holdersWithCandidate++;
    },
    enter: function () {},
    timed: function (label, fn) {
      var t = clock();
      try { return fn(); } finally { this.detail(label, clock() - t); }
    },
    detail: function (label, ms) {
      var b = maneuver.detail[label] || (maneuver.detail[label] = { calls: 0, totalMs: 0 });
      b.calls++; b.totalMs += ms;
    },
    leave: function (ctx, branch, ms, prelude, used, st) {
      maneuver.calls++; maneuver.totalMs += ms; maneuver.preludeMs += prelude;
      if (used) maneuver.basisUsed++; else maneuver.basisUnused++;
      var sq = ctx.squad, minute = Math.floor(ctx.sim.time / 60),
        movers = st && st.window && st.phase === 'moving'
          ? Math.max(0, st.plan.length - st.arrived.size - st.interrupted.size) : 0;
      recordManeuver(maneuver.byBranch, branch, ms, prelude, !used);
      recordManeuver(maneuver.byPhase, String(sq.commandPhase), ms, prelude, !used);
      recordManeuver(maneuver.byMinute, String(minute), ms, prelude, !used);
      recordManeuver(maneuver.byMoverCount, String(movers), ms, prelude, !used);
    },
    snapshot: function () { return JSON.parse(JSON.stringify({ maneuver: maneuver, triggers: triggers })); },
    reset: function () { maneuver = blankManeuver(); triggers = blankTriggers(); priorDecision = new WeakMap(); }
  };
  root.BattleCoveredManeuverBranchProbe = maneuverProbe;

  function routeStats() {
    return {
      calls: 0,
      fresh: 0,
      retained: 0,
      negativeCache: 0,
      failedFresh: 0,
      retainedRejected: 0,
      missingContact: 0,
      freshReasons: Object.create(null),
      failedFinalReasons: Object.create(null),
      edgeRejections: Object.create(null),
      freshTerminals: Object.create(null),
      totals: {
        candidateQueries: 0,
        candidatesReturned: 0,
        sightQueries: 0,
        movementQueries: 0,
        edgeQueries: 0,
        graphNodes: 0,
        detourQueries: 0
      }
    };
  }
  function routeInputs(s, sim, reports, goal, taken) {
    var p = s && s.root && s.root.position;
    return {
      x: p && p.x,
      z: p && p.z,
      goalX: goal && goal.x,
      goalZ: goal && goal.z,
      reportsExact: (reports || [])
        .map(function (r) {
          return [r.x, r.z].join(',');
        })
        .join(';'),
      reportsRounded: (reports || [])
        .map(function (r) {
          return [Math.round(r.x), Math.round(r.z)].join(',');
        })
        .join(';'),
      reportsMetadata: (reports || [])
        .map(function (r) {
          return [r.at, r.confidence].join(',');
        })
        .join(';'),
      suppressed: !!(s && sim && +s.suppressedUntil > sim.time),
      navVersion: root.BattleNavigation && root.BattleNavigation.version,
      taken: (taken || [])
        .map(function (v) {
          return [v.x, v.z].join(',');
        })
        .join(';')
    };
  }
  function routeReason(prev, now) {
    if (!prev) return 'first-observation';
    if (prev.goalX !== now.goalX || prev.goalZ !== now.goalZ) return 'goal-changed';
    if (prev.reportsRounded !== now.reportsRounded) return 'contact-rounded-location-changed';
    if (prev.reportsExact !== now.reportsExact) return 'contact-precise-location-changed';
    if (prev.reportsMetadata !== now.reportsMetadata) return 'contact-observation-metadata-changed';
    if (prev.navVersion !== now.navVersion) return 'navigation-version-changed';
    if (prev.suppressed !== now.suppressed) return 'suppression-changed';
    if (prev.taken !== now.taken) return 'squad-claims-changed';
    if (prev.x !== now.x || prev.z !== now.z) return 'soldier-moved';
    return 'same-observed-inputs';
  }
  /* Diagnostic-only exact ray-pair census: NEVER short-circuit the native function.
     Direction matters (START_SKIN at the originating wall), hence no reverse dedup. */
  var pairRepeat = { calls: 0, first: 0, repeated: 0, trueRepeated: 0, falseRepeated: 0,
    inconsistent: 0, flushes: 0, maxEntries: 0, distinctVersionChanges: 0 };
  var pairObserved = new Map(), pairVersion = null;
  function inspectRouteMovementClear(args, result) {
    if (!routeActive || !args || !args[0] || !args[1]) return;
    var a = args[0], b = args[1];
    if (![a.x, a.z, b.x, b.z].every(Number.isFinite)) return;
    var v = root.BattleNavigation && root.BattleNavigation.version;
    if (pairVersion !== v) {
      if (pairVersion !== null) pairRepeat.distinctVersionChanges++;
      pairVersion = v;
      pairObserved.clear();
    }
    var key = a.x + ',' + a.z + '>' + b.x + ',' + b.z;
    pairRepeat.calls++;
    if (pairObserved.has(key)) {
      pairRepeat.repeated++;
      if (result) pairRepeat.trueRepeated++;
      else pairRepeat.falseRepeated++;
      if (pairObserved.get(key) !== !!result) pairRepeat.inconsistent++;
    } else {
      pairRepeat.first++;
      if (pairObserved.size >= 32768) {
        pairObserved.clear();
        pairRepeat.flushes++;
      }
      pairObserved.set(key, !!result);
      if (pairObserved.size > pairRepeat.maxEntries) pairRepeat.maxEntries = pairObserved.size;
    }
  }
  function recordRouteCheck(label, result, args) {
    if (!routeActive) return;
    var totals = routeActive.totals;
    if (label === 'cover-positions.candidates' || label === 'cover-positions.routeCandidates') {
      totals.candidateQueries++;
      if (Array.isArray(result)) totals.candidatesReturned += result.length;
    } else if (label === 'squad.hasLineOfSight') totals.sightQueries++;
    else if (label === 'navigation.movementClear') {
      totals.movementQueries++;
      inspectRouteMovementClear(args, result);
    }
  }
  function wrapRoutePick() {
    var obj = root.BattleTacticalContactRoute,
      key = 'pick';
    if (!obj || typeof obj[key] !== 'function') return;
    var fn = obj[key];
    function profiled(s, sim, reports, goal, taken, retained) {
      var prevScope = routeActive,
        previous = s && routeLast.get(s),
        observed = routeInputs(s, sim, reports, goal, taken),
        sample = {
          totals: { candidateQueries: 0, candidatesReturned: 0, sightQueries: 0, movementQueries: 0 }
        },
        start = clock(),
        result;
      routeActive = sample;
      try {
        result = fn.apply(this, arguments);
        return result;
      } finally {
        routeActive = prevScope;
        record('contact-route.pick', clock() - start);
        if (result) {
          routePlanning.calls++;
          var hasRetained = !!(retained && retained.waypoints && retained.waypoints[retained.cursor]),
            negativeCache = previous && previous.result === result && !result.point && previous.negative;
          if (result.reused) routePlanning.retained++;
          else if (negativeCache) routePlanning.negativeCache++;
          else {
            routePlanning.fresh++;
            if (!result.point) routePlanning.failedFresh++;
            if (hasRetained) routePlanning.retainedRejected++;
            if (result.stats) {
              var terminal = result.stats.terminal || 'unknown';
              routePlanning.freshTerminals[terminal] = (routePlanning.freshTerminals[terminal] || 0) + 1;
              var rejected = result.stats.rejected || {};
              Object.keys(rejected).forEach(function (code) {
                routePlanning.edgeRejections[code] =
                  (routePlanning.edgeRejections[code] || 0) + (+rejected[code] || 0);
              });
              if (!result.point) {
                var finalReason = rejected['no-connected-progress-route']
                  ? 'no-connected-progress-route'
                  : rejected['missing-world-or-contact']
                    ? 'missing-world-or-contact'
                    : rejected['invalid-path-chain']
                      ? 'invalid-path-chain'
                      : 'other';
                routePlanning.failedFinalReasons[finalReason] =
                  (routePlanning.failedFinalReasons[finalReason] || 0) + 1;
              }
            }
            var reason = routeReason(previous && previous.inputs, observed);
            routePlanning.freshReasons[reason] = (routePlanning.freshReasons[reason] || 0) + 1;
            if (result.stats && result.stats.rejected && result.stats.rejected['missing-world-or-contact'])
              routePlanning.missingContact++;
          }
          Object.keys(sample.totals).forEach(function (k) {
            routePlanning.totals[k] += sample.totals[k];
          });
          if (!negativeCache && !result.reused && result.stats) {
            routePlanning.totals.edgeQueries += +result.stats.evaluatedEdges || 0;
            routePlanning.totals.graphNodes += +result.stats.graphNodes || 0;
            routePlanning.totals.detourQueries += +result.stats.nativePathQueries || 0;
          }
          if (s) routeLast.set(s, { inputs: observed, result: result, negative: !result.point });
        }
      }
    }
    profiled.__battleHotpathWrapped = true;
    profiled.__battleHotpathOriginal = fn;
    obj[key] = profiled;
    wrapped.push({ obj: obj, key: key, fn: fn });
  }

  function bucket(label) {
    return stats[label] || (stats[label] = { label: label, calls: 0, totalMs: 0, maxMs: 0 });
  }
  function record(label, elapsed) {
    var b = bucket(label);
    b.calls++;
    b.totalMs += elapsed;
    if (elapsed > b.maxMs) b.maxMs = elapsed;
  }
  function recordCount(label) {
    var b = bucket(label);
    b.calls++;
  }
  function safeLabel(v) {
    return String(v == null || v === '' ? 'unknown' : v)
      .replace(/[^a-zA-Z0-9_.:-]+/g, '_')
      .slice(0, 80);
  }
  function movementProducer(soldier) {
    var st = soldier && soldier._movementResolver,
      last = (st && (st.last || st.goal)) || null;
    return {
      owner: safeLabel(last && last.owner),
      kind: safeLabel(last && last.kind),
      reason: safeLabel(last && last.reason),
      tactical: safeLabel(last && last.tacticalReason)
    };
  }
  function recordMovementAttribution(prefix, soldier) {
    var p = movementProducer(soldier);
    recordCount(prefix + '.owner.' + p.owner);
    recordCount(prefix + '.kind.' + p.kind);
    recordCount(prefix + '.owner-kind.' + p.owner + '__' + p.kind);
    if (p.reason !== 'unknown') recordCount(prefix + '.reason.' + p.reason);
    if (p.tactical !== 'unknown') recordCount(prefix + '.tactical.' + p.tactical);
  }
  function wrap(obj, key, label) {
    if (!obj || typeof obj[key] !== 'function') return false;
    var fn = obj[key];
    if (fn.__battleHotpathWrapped) return false;
    function profiled() {
      var start = clock();
      var result;
      try {
        result = fn.apply(this, arguments);
        return result;
      } finally {
        record(label, clock() - start);
        recordRouteCheck(label, result, arguments);
      }
    }
    profiled.__battleHotpathWrapped = true;
    profiled.__battleHotpathOriginal = fn;
    obj[key] = profiled;
    wrapped.push({ obj: obj, key: key, fn: fn });
    return true;
  }
  function wrapScoped(obj, key, label) {
    if (!obj || typeof obj[key] !== 'function') return false;
    var fn = obj[key];
    if (fn.__battleHotpathWrapped) return false;
    function profiled() {
      var start = clock();
      scope.push(label);
      try {
        return fn.apply(this, arguments);
      } finally {
        scope.pop();
        record(label, clock() - start);
      }
    }
    profiled.__battleHotpathWrapped = true;
    profiled.__battleHotpathOriginal = fn;
    obj[key] = profiled;
    wrapped.push({ obj: obj, key: key, fn: fn });
    return true;
  }
  function wrapMany(obj, prefix, names) {
    for (var i = 0; i < names.length; i++) wrap(obj, names[i], prefix + '.' + names[i]);
  }
  function currentScope() {
    return scope.length ? scope[scope.length - 1] : 'unscoped';
  }
  function wrapSightQuery(key) {
    var obj = root.BattleObstacleField;
    if (!obj || typeof obj[key] !== 'function') return false;
    var fn = obj[key];
    if (fn.__battleHotpathWrapped) return false;
    var label = 'obstacle.' + key;
    function profiled() {
      var parent = currentScope(),
        start = clock();
      try {
        return fn.apply(this, arguments);
      } finally {
        var elapsed = clock() - start;
        record(label, elapsed);
        record(label + '@' + parent, elapsed);
      }
    }
    profiled.__battleHotpathWrapped = true;
    profiled.__battleHotpathOriginal = fn;
    obj[key] = profiled;
    wrapped.push({ obj: obj, key: key, fn: fn });
    return true;
  }
  function physicalVersion(sim) {
    var N = root.BattleNavigation,
      o = sim && sim.obstacles;
    if (!N || !o) return null;
    var p = o.__physicalFootprints,
      count;
    if (Array.isArray(p) && p.length) count = p.length;
    else {
      count = 0;
      for (var i = 0; i < o.length; i++)
        if (o[i] && { hedge: 1, tree: 1, log: 1, wall: 1, rock: 1 }[String(o[i].type || '').toLowerCase()])
          count++;
    }
    return String(N.version) + '|' + String(o.__physicalVersion || 0) + '|' + String(count);
  }
  function dist(a, b) {
    return !a || !b ? Infinity : Math.hypot((+a.x || 0) - (+b.x || 0), (+a.z || 0) - (+b.z || 0));
  }
  function baseRebuildReason(sim, soldier, dest, before) {
    if (!before) return 'missing';
    if (root.BattleNavigation && before.version !== root.BattleNavigation.version) return 'version';
    if (
      dest &&
      isFinite(+dest.x) &&
      isFinite(+dest.z) &&
      Math.hypot(+dest.x - (+before.destX || 0), +dest.z - (+before.destZ || 0)) > 2
    )
      return 'goal-shift';
    return 'other';
  }
  function physicalReplanReason(sim, soldier, dest, before) {
    if (!before) return 'missing';
    var pv = physicalVersion(sim);
    if (pv != null && before.version !== pv) return 'version';
    if (
      dest &&
      isFinite(+dest.x) &&
      isFinite(+dest.z) &&
      Math.hypot(+dest.x - (+before.finalGoalX || 0), +dest.z - (+before.finalGoalZ || 0)) > 1.4
    )
      return 'goal-shift';
    var points = before.points || [];
    if (!points.length) {
      if (sim && +sim.time >= (+before.replanAt || Infinity)) return 'empty-timeout';
      if (!before.blocked && soldier && soldier.root && dist(soldier.root.position, before.standGoal) > 0.88)
        return 'empty-active';
      return 'empty-other';
    }
    if (sim && +sim.time >= (+before.replanAt || Infinity)) return 'periodic';
    if (points.length <= 3) return 'low-queue-or-segment';
    return 'first-segment-invalid';
  }
  function wrapNavigationWaypoint() {
    var obj = root.BattleNavigation,
      key = 'nextWaypoint';
    if (!obj || typeof obj[key] !== 'function') return false;
    var fn = obj[key];
    if (fn.__battleHotpathWrapped) return false;
    function profiled(sim, soldier, dest) {
      var beforeNav = soldier && soldier._navCache,
        beforePhysical = soldier && soldier._physicalPath,
        start = clock();
      try {
        return fn.apply(this, arguments);
      } finally {
        var elapsed = clock() - start,
          afterNav = soldier && soldier._navCache,
          afterPhysical = soldier && soldier._physicalPath;
        record('navigation.nextWaypoint', elapsed);
        if (afterNav !== beforeNav) {
          var br = baseRebuildReason(sim, soldier, dest, beforeNav);
          record('navigation.nextWaypoint.baseCacheRebuild', elapsed);
          recordCount('navigation.baseRebuildReason.' + br);
          if (br === 'missing' || br === 'goal-shift')
            recordMovementAttribution('navigation.baseRebuild.' + br, soldier);
        } else record('navigation.nextWaypoint.baseCacheReuse', elapsed);
        if (afterPhysical !== beforePhysical) {
          var pr = physicalReplanReason(sim, soldier, dest, beforePhysical);
          record('navigation.nextWaypoint.physicalReplan', elapsed);
          recordCount('navigation.physicalReplanReason.' + pr);
          if (pr === 'goal-shift' || pr === 'missing')
            recordMovementAttribution('navigation.physicalReplan.' + pr, soldier);
        } else record('navigation.nextWaypoint.physicalReuse', elapsed);
      }
    }
    profiled.__battleHotpathWrapped = true;
    profiled.__battleHotpathOriginal = fn;
    obj[key] = profiled;
    wrapped.push({ obj: obj, key: key, fn: fn });
    return true;
  }
  function wrapSystems() {
    if (!root.BattleModules || !root.BattleModules.listSystems) return;
    var systems = root.BattleModules.listSystems();
    for (var i = 0; i < systems.length; i++) {
      var system = systems[i];
      if (!system || !system.id) continue;
      ['onSimulationStep', 'onCommanderTick'].forEach(function (hook) {
        wrapScoped(system, hook, 'system:' + system.id + '.' + hook);
      });
    }
  }
  function install() {
    /* Parent timings first: these make it possible to reconcile expensive leaves against the
       enclosing simulation/command work without changing production scheduling. */
    wrapMany(root.__battle__, 'simulation', ['step', '_frame', '_checkWinner']);
    wrapScoped(root.BattleCommanderAI, 'update', 'commander.update');
    wrap(root.BattleSquadStability, 'executeMission', 'squad-command.executeMission');
    wrapMany(root.BattleModules, 'modules', ['runHook']);

    /* Separate controller policy, diagnostic copies and native route work without
       changing their calls or choosing a different tactical workload. */
    wrapScoped(root.BattleTacticalController, 'dispatch', 'controller.dispatch');
    wrapScoped(root.BattleTacticalContactSkills, 'update', 'contact-skills.update');
    wrapScoped(root.BattleTacticalCoveredManeuver, 'update', 'covered-maneuver.update');
    wrapMany(root.BattleTacticalCoveredManeuver, 'covered-maneuver', ['summary']);
    wrapScoped(root.BattleTacticalFlankAssault, 'update', 'flank-assault.update');
    wrapRoutePick();
    wrapMany(root.BattleTacticalContactRoute, 'contact-route', ['pickDefense', 'evaluate']);
    wrapMany(root.BattleCoverPositions, 'cover-positions', ['boundThreats', 'candidates', 'routeCandidates']);
    wrapMany(root.BattleGrenades, 'grenades', ['assaultAssessment']);

    wrapSightQuery('sightBlocked');
    wrapSightQuery('sightBlocker');
    wrapMany(root.BattleObstacleField, 'obstacle', ['coverAt', 'coverPotentialAt', 'nearby']);
    wrapNavigationWaypoint();
    wrapMany(root.BattleNavigation, 'navigation', [
      'findPath',
      'movementClear',
      'resolveStep',
      'lineOfSightBlocked'
    ]);
    wrapMany(root.BattleMovementResolver, 'movement-resolver', ['proposeOrder', 'proposeCombat', 'resolve']);
    wrapScoped(root.SquadAI, 'updateSoldier', 'squad.updateSoldier');
    wrapScoped(root.SquadAI, 'updateSquad', 'squad.updateSquad');
    wrapMany(root.SquadAI, 'squad', [
      'hasLineOfSight',
      'findTarget',
      'canSuppress',
      'areaFire',
      'resolveFire'
    ]);
    wrapMany(root.BattleTacticalPositions, 'tactical-position', [
      'claim',
      'release',
      'update',
      'waypoint',
      'assign'
    ]);
    wrapMany(root.BattleCommanderRoutes, 'commander-routes', [
      'ensureAssignments',
      'assignSquad',
      'initForce',
      'routeFor'
    ]);
    wrapMany(root.BattleCommanderDoctrine, 'commander-doctrine', [
      'chooseObjective',
      'buildContext',
      'nearestEnemyToSquad',
      'objectiveValueScore',
      'forceScore'
    ]);
    wrapScoped(root.BattleEngagement, 'updateSoldier', 'engagement.updateSoldier');
    wrapScoped(root.BattleEngagement, 'updateSquad', 'engagement.updateSquad');
    wrapSystems();
  }
  function reset() {
    stats = Object.create(null);
    startedAt = clock();
    scope.length = 0;
    routeActive = null;
    routeLast = new WeakMap();
    routePlanning = routeStats();
    maneuverProbe.reset();
    pairObserved.clear();
    pairVersion = null;
    pairRepeat = { calls: 0, first: 0, repeated: 0, trueRepeated: 0, falseRepeated: 0,
      inconsistent: 0, flushes: 0, maxEntries: 0, distinctVersionChanges: 0 };
  }
  function snapshot(limit) {
    var wallMs = Math.max(0, clock() - startedAt),
      rows = Object.keys(stats).map(function (k) {
        var b = stats[k];
        return {
          label: b.label,
          calls: b.calls,
          totalMs: +b.totalMs.toFixed(3),
          maxMs: +b.maxMs.toFixed(3),
          avgUs: b.calls ? +((b.totalMs * 1000) / b.calls).toFixed(2) : 0,
          wallPct: wallMs ? +((b.totalMs / wallMs) * 100).toFixed(2) : 0
        };
      });
    rows.sort(function (a, b) {
      return b.totalMs - a.totalMs || b.calls - a.calls;
    });
    if (limit > 0) rows = rows.slice(0, limit);
    return {
      version: '1.6',
      wallMs: +wallMs.toFixed(3),
      rows: rows,
      maneuverBranch: maneuverProbe.snapshot(),
      routeMovementPairRepeat: Object.assign({}, pairRepeat),
      routePlanning: {
        calls: routePlanning.calls,
        fresh: routePlanning.fresh,
        retained: routePlanning.retained,
        negativeCache: routePlanning.negativeCache,
        failedFresh: routePlanning.failedFresh,
        retainedRejected: routePlanning.retainedRejected,
        missingContact: routePlanning.missingContact,
        freshReasons: Object.assign({}, routePlanning.freshReasons),
        failedFinalReasons: Object.assign({}, routePlanning.failedFinalReasons),
        edgeRejections: Object.assign({}, routePlanning.edgeRejections),
        freshTerminals: Object.assign({}, routePlanning.freshTerminals),
        totals: Object.assign({}, routePlanning.totals)
      }
    };
  }
  function restore() {
    for (var i = wrapped.length - 1; i >= 0; i--) {
      var w = wrapped[i];
      if (w.obj && w.obj[w.key] && w.obj[w.key].__battleHotpathWrapped) w.obj[w.key] = w.fn;
    }
    wrapped = [];
    scope.length = 0;
  }

  install();
  root.BattleHotpathProfiler = { version: '1.6', reset: reset, snapshot: snapshot, restore: restore };
})(typeof window !== 'undefined' ? window : globalThis);
