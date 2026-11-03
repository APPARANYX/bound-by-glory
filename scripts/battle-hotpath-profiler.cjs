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
    routePlanning = routeStats(),
    navigationPlanning = navigationStats();

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
  function navigationStats() {
    return {
      requests: 0,
      nearGoalRequests: 0,
      nearGoalPhysicalReuses: 0,
      nearGoalPhysicalReplans: 0,
      nearGoalRouteStates: Object.create(null),
      nearGoalStandStates: Object.create(null),
      nearGoalGoalStates: Object.create(null),
      stoppedRequests: 0,
      stoppedPhysicalReuses: 0,
      physicalReplans: 0,
      physicalReuses: 0,
      replanReasons: Object.create(null),
      replanByOwnerKind: Object.create(null),
      reuseWithPoints: 0,
      reusedSameWaypoint: 0,
      reusedAdvancedWaypoint: 0,
      reusedQueueExtended: 0,
      reuseWithMovingFootprints: 0,
      priorSegmentClearanceChecks: 0
    };
  }
  function bump(o, key) {
    o[key] = (o[key] || 0) + 1;
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
        beforeFirst = beforePhysical && beforePhysical.points && beforePhysical.points[0],
        beforeTail =
          beforePhysical && beforePhysical.points && beforePhysical.points[beforePhysical.points.length - 1],
        at = soldier && soldier.root && soldier.root.position,
        nearGoal = !!(at && dest && Math.hypot(+dest.x - at.x, +dest.z - at.z) <= 0.35),
        stopped = !!(soldier && soldier.moving === false),
        start = clock();
      try {
        return fn.apply(this, arguments);
      } finally {
        var elapsed = clock() - start,
          afterNav = soldier && soldier._navCache,
          afterPhysical = soldier && soldier._physicalPath;
        record('navigation.nextWaypoint', elapsed);
        // Inclusive, mutually exclusive timing buckets. These are benchmark-only observations:
        // they include caller overhead and cannot isolate private clearance helpers.
        var timingClass = 'other';
        if (afterPhysical !== beforePhysical) timingClass = 'physical-rebuild';
        else if (beforePhysical && beforePhysical.points && beforePhysical.points.length) {
          timingClass = beforeFirst === beforePhysical.points[0]
            ? 'populated-same-waypoint'
            : 'populated-advanced-waypoint';
        } else if (beforePhysical && beforePhysical.blocked) timingClass = 'blocked-empty-reuse';
        else if (beforePhysical) timingClass = 'unblocked-empty-reuse';
        record('navigation.nextWaypoint.class.' + timingClass, elapsed);
        navigationPlanning.requests++;
        if (nearGoal) {
          navigationPlanning.nearGoalRequests++;
          bump(
            navigationPlanning.nearGoalRouteStates,
            !beforePhysical
              ? 'no-plan'
              : beforePhysical.blocked
                ? 'blocked'
                : beforePhysical.points && beforePhysical.points.length
                  ? 'populated'
                  : 'empty-unblocked'
          );
          if (beforePhysical && beforePhysical.standGoal) {
            var standDistance = Math.hypot(
              at.x - beforePhysical.standGoal.x,
              at.z - beforePhysical.standGoal.z
            );
            bump(
              navigationPlanning.nearGoalStandStates,
              standDistance <= 0.35 ? 'physically-at-stand-goal' : 'stand-goal-different'
            );
          }
          if (beforePhysical && sim) {
            var currentGoal =
              Math.hypot(+dest.x - beforePhysical.finalGoalX, +dest.z - beforePhysical.finalGoalZ) <=
              1.4;
            bump(
              navigationPlanning.nearGoalGoalStates,
              !currentGoal
                ? 'destination-changed'
                : beforePhysical.version !== physicalVersion(sim)
                  ? 'geometry-changed'
                  : sim.time >= beforePhysical.replanAt
                    ? 'periodic-refresh-due'
                    : 'goal-and-version-stable'
            );
          }
        }
        if (stopped) navigationPlanning.stoppedRequests++;
        if (
          beforePhysical &&
          beforePhysical.points &&
          beforePhysical.points.length &&
          sim &&
          beforePhysical.version === physicalVersion(sim) &&
          dest &&
          Math.hypot(+dest.x - beforePhysical.finalGoalX, +dest.z - beforePhysical.finalGoalZ) <= 1.4
        )
          navigationPlanning.priorSegmentClearanceChecks++;
        if (afterNav !== beforeNav) {
          var br = baseRebuildReason(sim, soldier, dest, beforeNav);
          record('navigation.nextWaypoint.baseCacheRebuild', elapsed);
          recordCount('navigation.baseRebuildReason.' + br);
          if (br === 'missing' || br === 'goal-shift')
            recordMovementAttribution('navigation.baseRebuild.' + br, soldier);
        } else record('navigation.nextWaypoint.baseCacheReuse', elapsed);
        if (afterPhysical !== beforePhysical) {
          navigationPlanning.physicalReplans++;
          if (nearGoal) navigationPlanning.nearGoalPhysicalReplans++;
          var pr = physicalReplanReason(sim, soldier, dest, beforePhysical);
          bump(navigationPlanning.replanReasons, pr);
          var origin = movementProducer(soldier);
          bump(navigationPlanning.replanByOwnerKind, origin.owner + '__' + origin.kind);
          record('navigation.nextWaypoint.physicalReplan', elapsed);
          recordCount('navigation.physicalReplanReason.' + pr);
          if (pr === 'goal-shift' || pr === 'missing')
            recordMovementAttribution('navigation.physicalReplan.' + pr, soldier);
        } else {
          record('navigation.nextWaypoint.physicalReuse', elapsed);
          navigationPlanning.physicalReuses++;
          if (nearGoal) navigationPlanning.nearGoalPhysicalReuses++;
          if (stopped) navigationPlanning.stoppedPhysicalReuses++;
          if (beforePhysical && beforePhysical.points && beforePhysical.points.length) {
            navigationPlanning.reuseWithPoints++;
            if (beforeFirst === beforePhysical.points[0]) navigationPlanning.reusedSameWaypoint++;
            else navigationPlanning.reusedAdvancedWaypoint++;
            if (beforeTail && beforeTail !== beforePhysical.points[beforePhysical.points.length - 1])
              navigationPlanning.reusedQueueExtended++;
            if (
              sim &&
              sim.obstacles &&
              sim.obstacles.__dynamicFootprints &&
              sim.obstacles.__dynamicFootprints.length
            )
              navigationPlanning.reuseWithMovingFootprints++;
          }
        }
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
    navigationPlanning = navigationStats();
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
      navigationPlanning: {
        requests: navigationPlanning.requests,
        nearGoalRequests: navigationPlanning.nearGoalRequests,
        nearGoalPhysicalReuses: navigationPlanning.nearGoalPhysicalReuses,
        nearGoalPhysicalReplans: navigationPlanning.nearGoalPhysicalReplans,
        nearGoalRouteStates: Object.assign({}, navigationPlanning.nearGoalRouteStates),
        nearGoalStandStates: Object.assign({}, navigationPlanning.nearGoalStandStates),
        nearGoalGoalStates: Object.assign({}, navigationPlanning.nearGoalGoalStates),
        stoppedRequests: navigationPlanning.stoppedRequests,
        stoppedPhysicalReuses: navigationPlanning.stoppedPhysicalReuses,
        physicalReplans: navigationPlanning.physicalReplans,
        physicalReuses: navigationPlanning.physicalReuses,
        replanReasons: Object.assign({}, navigationPlanning.replanReasons),
        replanByOwnerKind: Object.assign({}, navigationPlanning.replanByOwnerKind),
        reuseWithPoints: navigationPlanning.reuseWithPoints,
        reusedSameWaypoint: navigationPlanning.reusedSameWaypoint,
        reusedAdvancedWaypoint: navigationPlanning.reusedAdvancedWaypoint,
        reusedQueueExtended: navigationPlanning.reusedQueueExtended,
        reuseWithMovingFootprints: navigationPlanning.reuseWithMovingFootprints,
        priorSegmentClearanceChecks: navigationPlanning.priorSegmentClearanceChecks
      },
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
