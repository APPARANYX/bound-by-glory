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
    admissionActive = null,
    routeLast = new WeakMap(),
    routePlanning = routeStats();

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
      candidateStages: Object.create(null),
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
  function recordRouteCheck(label, result) {
    if (!routeActive) return;
    var totals = routeActive.totals;
    if (label === 'cover-positions.candidates' || label === 'cover-positions.routeCandidates') {
      totals.candidateQueries++;
      if (Array.isArray(result)) totals.candidatesReturned += result.length;
    } else if (label === 'squad.hasLineOfSight') totals.sightQueries++;
    else if (label === 'navigation.movementClear') totals.movementQueries++;
  }
  function candidateStage(name, count, elapsed) {
    var rows = routePlanning.candidateStages,
      row = rows[name] || (rows[name] = { count: 0, measuredMs: 0 });
    row.count += count;
    row.measuredMs += elapsed || 0;
  }
  function finishCandidate() {
    if (!admissionActive || !admissionActive.pending) return;
    // In the native owner, between a successful shelter test and the route
    // predicate, the only rejecting gate is live claim/body availability.
    candidateStage(
      admissionActive.pending.filterSeen
        ? 'unclassified-after-route-filter'
        : 'ownership-or-occupancy-rejected',
      1
    );
    admissionActive.pending = null;
  }
  function wrapCandidateShelter() {
    var obj = root.BattleNavigationPhysicality,
      fn = obj && obj.shapeHit;
    if (typeof fn !== 'function') return;
    function profiled(slot) {
      if (!admissionActive) return fn.apply(this, arguments);
      finishCandidate();
      var start = clock(),
        result = fn.apply(this, arguments),
        elapsed = clock() - start;
      candidateStage('shelter-tested', 1, elapsed);
      if (!result) candidateStage('shelter-rejected', 1, elapsed);
      else admissionActive.pending = { slot: slot, startedAt: start, shelterMs: elapsed };
      return result;
    }
    profiled.__battleHotpathWrapped = true;
    profiled.__battleHotpathOriginal = fn;
    obj.shapeHit = profiled;
    wrapped.push({ obj: obj, key: 'shapeHit', fn: fn });
  }
  function recordCandidateClearance(args, result, elapsed) {
    var pending = admissionActive && admissionActive.pending;
    if (!pending || args[0] !== pending.slot || args[1] !== pending.slot) return;
    if (typeof result !== 'boolean') {
      candidateStage('point-clearance-no-boolean-result', 1, elapsed);
      admissionActive.pending = null;
      return;
    }
    candidateStage('point-clearance-tested', 1, elapsed);
    if (!result) candidateStage('point-clearance-rejected', 1, elapsed);
    admissionActive.pending = null;
  }
  function wrapRouteCandidates() {
    var obj = root.BattleCoverPositions,
      fn = obj && obj.routeCandidates;
    if (typeof fn !== 'function') return;
    function profiled() {
      var start = clock(),
        prior = admissionActive,
        args = arguments,
        result;
      if (routeActive && typeof args[4] === 'function') {
        admissionActive = { pending: null };
        args = Array.prototype.slice.call(args);
        var predicate = args[4];
        args[4] = function () {
          var at = clock(),
            allowed = predicate.apply(this, arguments),
            elapsed = clock() - at;
          candidateStage('route-filter-tested', 1, elapsed);
          if (admissionActive.pending) admissionActive.pending.filterSeen = true;
          if (!allowed) {
            candidateStage('route-filter-rejected', 1, elapsed);
            var pending = admissionActive.pending;
            if (pending && pending.slot === arguments[0]) {
              candidateStage('rejected-prefix-span', 1, clock() - pending.startedAt);
              candidateStage('rejected-prefix-shelter', 1, pending.shelterMs);
              admissionActive.pending = null;
            }
          }
          return allowed;
        };
      }
      try {
        result = fn.apply(this, args);
        return result;
      } finally {
        if (admissionActive !== prior) {
          finishCandidate();
          if (Array.isArray(result)) candidateStage('returned', result.length);
        }
        admissionActive = prior;
        record('cover-positions.routeCandidates', clock() - start);
        recordRouteCheck('cover-positions.routeCandidates', result);
      }
    }
    profiled.__battleHotpathWrapped = true;
    profiled.__battleHotpathOriginal = fn;
    obj.routeCandidates = profiled;
    wrapped.push({ obj: obj, key: 'routeCandidates', fn: fn });
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
            if (Number.isFinite(result.stats.total) && Number.isFinite(result.stats.graphNodes)) {
              candidateStage('graph-eligible', result.stats.total);
              candidateStage('graph-admitted', result.stats.graphNodes);
              candidateStage(
                'graph-rank-discarded',
                Math.max(0, result.stats.total - result.stats.graphNodes)
              );
            }
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
        var elapsed = clock() - start;
        record(label, elapsed);
        if (label === 'navigation.movementClear') recordCandidateClearance(arguments, result, elapsed);
        recordRouteCheck(label, result);
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
    wrapMany(root.BattleCoverPositions, 'cover-positions', ['boundThreats', 'candidates']);
    wrapRouteCandidates();
    wrapCandidateShelter();
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
    admissionActive = null;
    routeLast = new WeakMap();
    routePlanning = routeStats();
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
      version: '1.8',
      wallMs: +wallMs.toFixed(3),
      rows: rows,
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
        candidateStages: JSON.parse(JSON.stringify(routePlanning.candidateStages)),
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
  root.BattleHotpathProfiler = { version: '1.8', reset: reset, snapshot: snapshot, restore: restore };
})(typeof window !== 'undefined' ? window : globalThis);
