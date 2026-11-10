/* Per-step geometry query cache (spec 001). Scoped to one simulation AI tick; cleared when the
   step index or nav/obstacle version changes. Enabled under ?tacticalController=new unless
   ?controllerGeometryCache=0. */
(function (root) {
  'use strict';

  var SEARCH =
    (root.location && root.location.search) ||
    (typeof location !== 'undefined' ? location.search || '' : '');
  var ENABLED =
    /[?&]tacticalController=new(?:&|#|$)/i.test(SEARCH) &&
    !/[?&]controllerGeometryCache=0(?:&|#|$)/i.test(SEARCH);

  var state = {
    step: -1,
    navVer: '',
    entries: null,
    hits: 0,
    misses: 0
  };

  function roundCm(v) {
    return Math.round(+v * 100);
  }

  function navVersion(obstacles) {
    var nav = root.BattleNavigation ? root.BattleNavigation.version : 0;
    var phys = obstacles && obstacles.__physicalVersion ? obstacles.__physicalVersion : 0;
    var dyn = obstacles && obstacles.__dynamicFootprints;
  var dynStamp = '0';
    if (dyn && dyn.length) {
      var parts = [];
      for (var i = 0; i < dyn.length; i++) {
        var o = dyn[i];
        parts.push(
          roundCm(o.x) +
            ',' +
            roundCm(o.z) +
            ',' +
            roundCm(o.y != null ? o.y : 0) +
            ',' +
            String(o.id != null ? o.id : i)
        );
      }
      dynStamp = parts.join(';');
    }
    return nav + '|' + phys + '|' + dynStamp;
  }

  function orderEndpoints(a, b) {
    var ax = roundCm(a.x),
      az = roundCm(a.z),
      ay = roundCm(a.y != null ? a.y : 0),
      bx = roundCm(b.x),
      bz = roundCm(b.z),
      by = roundCm(b.y != null ? b.y : 0);
    if (ax > bx || (ax === bx && (az > bz || (az === bz && ay > by))))
      return { ax: bx, ay: by, az: bz, bx: ax, by: ay, bz: az };
    return { ax: ax, ay: ay, az: az, bx: bx, by: by, bz: bz };
  }

  function keyEndpoints(a, b, ver) {
    var o = orderEndpoints(a, b);
    return ver + ':' + o.ax + ',' + o.ay + ',' + o.az + '>' + o.bx + ',' + o.by + ',' + o.bz;
  }

  function keyMovement(a, b, ver) {
    var ax = roundCm(a.x),
      az = roundCm(a.z),
      bx = roundCm(b.x),
      bz = roundCm(b.z);
    if (ax > bx || (ax === bx && az > bz)) {
      var t = ax;
      ax = bx;
      bx = t;
      t = az;
      az = bz;
      bz = t;
    }
    return ver + ':' + ax + ',' + az + '>' + bx + ',' + bz;
  }

  function keyLosBlocked(a, b, ay, by, ver) {
    return (
      ver +
      ':' +
      roundCm(a.x) +
      ',' +
      roundCm(a.z) +
      ',' +
      roundCm(ay) +
      '>' +
      roundCm(b.x) +
      ',' +
      roundCm(b.z) +
      ',' +
      roundCm(by)
    );
  }

  function keySoldierPair(a, b, ver) {
    var idA = a && a.id != null ? a.id : 0;
    var idB = b && b.id != null ? b.id : 0;
    if (idA > idB) {
      var t = idA;
      idA = idB;
      idB = t;
    }
    return ver + ':' + idA + '>' + idB;
  }

  function beginStep(sim, stepIndex) {
    if (!ENABLED) return;
    var nv = navVersion(sim && sim.obstacles);
    if (state.step !== stepIndex || state.navVer !== nv) {
      state.step = stepIndex;
      state.navVer = nv;
      state.entries = new Map();
    }
  }

  function memo(kind, key, compute) {
    if (!ENABLED) return compute();
    if (!state.entries) state.entries = new Map();
    var full = kind + ':' + key;
    if (state.entries.has(full)) {
      state.hits++;
      return state.entries.get(full);
    }
    var result = compute();
    state.entries.set(full, result);
    state.misses++;
    return result;
  }

  root.BattleGeometryStepCache = {
    get enabled() {
      return ENABLED;
    },
    beginStep: beginStep,
    memo: memo,
    navVersion: navVersion,
    keyEndpoints: keyEndpoints,
    keyMovement: keyMovement,
    keyLosBlocked: keyLosBlocked,
    keySoldierPair: keySoldierPair,
    stats: function () {
      return {
        enabled: ENABLED,
        step: state.step,
        navVer: state.navVer,
        entries: state.entries ? state.entries.size : 0,
        hits: state.hits,
        misses: state.misses
      };
    },
    resetStats: function () {
      state.hits = 0;
      state.misses = 0;
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
