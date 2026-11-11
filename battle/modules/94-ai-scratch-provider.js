/* Independent battlefield AI (?aiScratch=1) — ECHO provider on the tactical controller.
   Does not call legacy Squad Leader tactical skills or BattleTacticalSoldierPolicy. */
(function (root) {
  'use strict';
  var SEARCH = typeof location !== 'undefined' ? location.search || '' : '';
  var ON = /[?&]aiScratch=1(?:&|#|$)/i.test(SEARCH);
  if (!ON) return;
  var ID = 'echo-scratch';
  var squads = new WeakMap();
  var WAKE = 0.45;
  var BOUND_TIMEOUT = 28;

  function K() {
    return root.BattleEchoKnowledge;
  }
  function C() {
    return root.BattleEchoSquadCoord;
  }
  function dist(a, b) {
    return K().dist(a, b);
  }
  function stateOf(sq) {
    var st = squads.get(sq);
    if (!st)
      squads.set(
        sq,
        (st = {
          men: new Map(),
          leg: 0,
          nextWake: 0,
          holds: new Map(),
          bound: null,
          scheduler: {
            sightIngests: 0,
            boundCompletes: 0,
            boundWaits: 0,
            boundAborts: 0,
            boundArmed: 0
          }
        })
      );
    return st;
  }
  function point(obj) {
    return obj && Number.isFinite(obj.x) && Number.isFinite(obj.z) ? { x: +obj.x, z: +obj.z } : null;
  }
  function ownerLeg(sq) {
    var legs = sq.route || [];
    return Math.max(0, Math.min(legs.length - 1, Math.floor(+sq.routeIndex) || 0));
  }
  function ask(ctx, st, man, cap, at) {
    var id = String(man.id);
    var params = cap === 'movement.hold' ? {} : { point: at };
    var res = ctx.request(cap, id, params);
    if (res && res.ok) {
      st.men.set(id, { actionId: res.actionId, kind: cap, point: at, man: man });
      st.holds.delete(id);
      return res.actionId;
    }
    st.holds.set(id, (res && res.reason) || 'refused');
    return null;
  }
  function releaseAll(ctx, st, why) {
    st.men.forEach(function (cur) {
      ctx.finish(cur.actionId, why);
    });
    st.men.clear();
    st.holds.clear();
    st.bound = null;
  }
  function shotBaseline(squad, sim) {
    var A = root.BattleAmmunition,
      out = Object.create(null);
    if (!A || !A.shotEvidence) return out;
    var men = C().living(squad);
    for (var i = 0; i < men.length; i++) {
      var ev = A.shotEvidence(men[i], sim);
      out[String(men[i].id)] = ev ? ev.shots : 0;
    }
    return out;
  }
  function supportDelivered(st, sim, since) {
    var A = root.BattleAmmunition;
    if (!A || !st.bound || !st.bound.watchers) return false;
    for (var i = 0; i < st.bound.watchers.length; i++) {
      var id = st.bound.watchers[i];
      var man = st.bound.men[id];
      if (!man) continue;
      var ev = A.shotEvidence(man, sim);
      var base = st.bound.shots[id] || 0;
      if (ev && ev.at >= since - 0.05 && ev.shots > base) return true;
    }
    return false;
  }
  function moversArrived(ctx, st) {
    if (!st.bound || !st.bound.movers) return false;
    for (var i = 0; i < st.bound.movers.length; i++) {
      var id = st.bound.movers[i];
      var cur = st.men.get(id);
      if (!cur || cur.kind !== 'movement.move') return false;
      var stage = ctx.stage(cur.actionId);
      if (!stage || stage.stage !== 'arrived') return false;
    }
    return st.bound.movers.length > 0;
  }
  function abortBound(ctx, st, why) {
    if (!st.bound) return;
    st.bound.movers.concat(st.bound.watchers).forEach(function (id) {
      var cur = st.men.get(id);
      if (cur) ctx.finish(cur.actionId, why);
      st.men.delete(id);
    });
    st.bound = null;
    st.scheduler.boundAborts++;
  }
  function boundStalled(ctx, st, b, sim) {
    var t = +sim.time || 0;
    if (t - b.startedAt > BOUND_TIMEOUT) return 'bound-timeout';
    var dead = false;
    b.movers.concat(b.watchers).forEach(function (id) {
      var man = b.men[id];
      if (!man || man.dead) dead = true;
    });
    if (dead) return 'bound-casualty';
    for (var i = 0; i < b.movers.length; i++) {
      var id = b.movers[i],
        cur = st.men.get(id);
      if (!cur) return 'bound-lost-order';
      var stage = ctx.stage(cur.actionId);
      if (stage && stage.stage === 'cancelled') return 'bound-cancelled:' + (stage.reason || 'cancelled');
    }
    return null;
  }
  function tryCompleteBound(ctx, st, kb, sim, sq) {
    var b = st.bound;
    if (!b || b.done) return;
    var stall = boundStalled(ctx, st, b, sim);
    if (stall) {
      abortBound(ctx, st, stall);
      return;
    }
    if (sq && (sq.state === 'retreat' || sq.commandPhase === 'retreat')) {
      abortBound(ctx, st, 'retreat');
      return;
    }
    if (!moversArrived(ctx, st)) {
      st.scheduler.boundWaits++;
      return;
    }
    if (!supportDelivered(st, sim, b.startedAt)) {
      st.scheduler.boundWaits++;
      return;
    }
    b.done = true;
    kb.boundPulse++;
    st.scheduler.boundCompletes++;
    st.bound = null;
  }
  function armBound(ctx, sq, st, kb, sim) {
    if (st.bound || kb.phase !== 'contact') return;
    var men = C().living(sq);
    if (men.length < 2) return;
    var movers = [],
      watchers = [],
      menMap = Object.create(null);
    for (var i = 0; i < men.length; i++) {
      var id = String(men[i].id);
      menMap[id] = men[i];
      if (i % 2 === 0) movers.push(id);
      else watchers.push(id);
    }
    st.bound = {
      pulse: kb.boundPulse,
      startedAt: +sim.time || 0,
      movers: movers,
      watchers: watchers,
      men: menMap,
      shots: shotBaseline(sq, sim),
      done: false
    };
    st.scheduler.boundArmed++;
    var fwd = C().forwardToObjective(sq, sim);
    var anchor = point(sq.orderAnchor) || C().centroid(men);
    var slots = C().formationSlots(sq, anchor, fwd);
    for (var j = 0; j < slots.length; j++) {
      var role = j % 2 === 0 ? 'mover' : 'watcher';
      var dest = C().boundPoint(sq, sim, role);
      var cap = role === 'watcher' ? 'movement.hold' : 'movement.move';
      var cur = st.men.get(String(slots[j].man.id));
      if (cur) {
        var stage = ctx.stage(cur.actionId);
        if (stage && stage.stage !== 'cancelled' && stage.stage !== 'arrived') continue;
        if (cur) ctx.finish(cur.actionId, 'bound-rearm');
        st.men.delete(String(slots[j].man.id));
      }
      ask(ctx, st, slots[j].man, cap, dest);
    }
  }

  function squadCommand(ctx) {
    var sq = ctx.squad,
      sim = ctx.sim,
      st = stateOf(sq);
    C().refreshSketch(sq, sim, { ingestSights: false });
    if (sq.state === 'retreat' || sq.commandPhase === 'retreat') return releaseAll(ctx, st, 'retreat');
    var kb = K().squadOf(sq);
    if (kb.phase === 'contact' && st.bound) return;
    var legs = sq.route || [];
    if (!legs.length) return;
    var leg = ownerLeg(sq);
    var target = point(legs[leg]);
    if (!target) return;
    var fwd = C().forwardToObjective(sq, sim);
    var anchor = point(sq.orderAnchor) || C().centroid(C().living(sq));
    var slots = C().formationSlots(sq, anchor || target, fwd);
    for (var j = 0; j < slots.length; j++) {
      var s = slots[j].man;
      var cur = st.men.get(String(s.id));
      var stage = cur && ctx.stage(cur.actionId);
      if (cur && stage && stage.stage === 'arrived' && leg === legs.length - 1) {
        ctx.finish(cur.actionId, 'arrived');
        st.men.delete(String(s.id));
        ask(ctx, st, s, 'movement.hold', slots[j].point);
      } else if (!cur || (stage && stage.stage === 'cancelled')) {
        ask(ctx, st, s, 'movement.move', slots[j].point);
      }
    }
    if (
      C().centroid(C().living(sq)) &&
      dist(C().centroid(C().living(sq)), target) < 18 &&
      leg < legs.length - 1
    )
      st.leg = leg + 1;
  }

  function fireAndMovement(ctx) {
    var sq = ctx.squad,
      sim = ctx.sim,
      st = stateOf(sq);
    var kb = K().squadOf(sq);
    var t = +sim.time || 0;
    if (t < st.nextWake) return;
    st.nextWake = t + WAKE;
    C().refreshSketch(sq, sim, { ingestSights: true });
    st.scheduler.sightIngests++;
    tryCompleteBound(ctx, st, kb, sim, sq);
    var obs = K().observedThreat(sq, sim);
    if (kb.phase === 'contact' && obs && !st.bound) armBound(ctx, sq, st, kb, sim);
  }

  function executeMission(ctx) {
    var sq = ctx.squad,
      st = stateOf(sq),
      legs = sq.route || [];
    if (!legs.length) return;
    var leg = Math.max(st.leg, ownerLeg(sq));
    var target = point(legs[leg]);
    if (!target) return;
    var here = C().centroid(C().living(sq));
    var phase = dist(here, target) < 35 && leg === legs.length - 1 ? 'assault' : 'approach';
    var res = ctx.request('mission.execute', null, { leg: leg, phase: phase, point: target });
    if (res.ok) ctx.finish(res.actionId, 'completed');
  }

  function commanderTick() {}

  function engagement() {}

  function stationSelection() {}

  function generalTick(ctx) {
    var unit = ctx.squad;
    var fac = unit && unit.faction;
    if (!fac || !unit.commandUnit) return;
    var sim = ctx.sim;
    var squadsList = (sim.factions[fac] && sim.factions[fac].squads) || [];
    for (var i = 0; i < squadsList.length; i++) {
      var sq = squadsList[i];
      if (!sq || !root.BattleTacticalController.controls(sim, sq)) continue;
      if (sq._macroMission && sq._macroMission.version > 0) continue;
      ctx.request('command.brief', null, { targetSquadId: String(sq.id), reason: 'echo-initial' });
    }
  }

  function soldierPolicy(slot, facts) {
    return root.BattleEchoSoldierPolicy.choose(slot, facts);
  }

  function takeAll(sim) {
    var TC = root.BattleTacticalController;
    if (!TC || !sim || !sim.factions || !root.BattleTacticalOwnerAdapters) return;
    if (!root.BattleTacticalCapabilityContract) {
      if (typeof console !== 'undefined' && console.warn)
        console.warn('[ECHO] capability contract missing; aiScratch inactive');
      return;
    }
    ['us', 'ge'].forEach(function (f) {
      var list = (sim.factions[f] && sim.factions[f].squads) || [];
      for (var i = 0; i < list.length; i++) TC.requestMode(sim, list[i], 'new', ID);
      var unit = TC.commandUnit(sim, f, true);
      if (unit) TC.requestMode(sim, unit, 'new', ID);
    });
  }

  function reset(sim) {
    squads = new WeakMap();
    if (K().resetBattle) K().resetBattle(sim);
  }

  var TC = root.BattleTacticalController;
  var OA = root.BattleTacticalOwnerAdapters;
  if (!TC || !OA) {
    if (typeof console !== 'undefined' && console.warn)
      console.warn('[ECHO] controller/adapters required for aiScratch');
    return;
  }
  var reg = TC.registerProvider({
    id: ID,
    policies: {
      squadCommand: squadCommand,
      commanderTick: commanderTick,
      fireAndMovement: fireAndMovement,
      executeMission: executeMission,
      engagement: engagement,
      stationSelection: stationSelection,
      generalTick: generalTick
    },
    soldierPolicy: soldierPolicy,
    adapters: OA.adapters,
    lifecycle: OA.lifecycle
  });
  if (!reg.ok && reg.reason !== 'duplicate-provider')
    throw new Error('ECHO provider rejected: ' + reg.reason);

  root.BattleAIScratch = {
    on: true,
    id: ID,
    takeAll: takeAll,
    reset: reset,
    summary: function (sim) {
      var rows = [];
      if (sim && sim.factions)
        ['us', 'ge'].forEach(function (f) {
          var list = (sim.factions[f] && sim.factions[f].squads) || [];
          for (var i = 0; i < list.length; i++) {
            var st = squads.get(list[i]);
            if (st) rows.push({ squad: list[i].id, scheduler: st.scheduler, bound: !!st.bound });
          }
        });
      return { provider: ID, squads: rows };
    }
  };

  if (root.BattleModules)
    root.BattleModules.registerSystem('ai-scratch-echo', {
      version: '2-receipt-gated',
      onBattleStart: function (sim) {
        reset(sim);
        takeAll(sim);
      },
      onCommanderTick: takeAll,
      beforeBattleRestart: reset
    });
  if (root.GTLog) root.GTLog('[ECHO] aiScratch provider registered (?aiScratch=1)');
})(typeof window !== 'undefined' ? window : globalThis);
