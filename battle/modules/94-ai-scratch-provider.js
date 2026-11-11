/* Independent battlefield AI (?aiScratch=1) — ECHO provider on the tactical controller.
   Does not call legacy Squad Leader tactical skills or BattleTacticalSoldierPolicy. */
(function (root) {
  'use strict';
  var SEARCH = typeof location !== 'undefined' ? location.search || '' : '';
  var ON = /[?&]aiScratch=1(?:&|#|$)/i.test(SEARCH);
  if (!ON) return;
  var ID = 'echo-scratch';
  var squads = new WeakMap();

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
        (st = { men: new Map(), leg: 0, nextWake: 0, holds: new Map() })
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
    } else st.holds.set(id, (res && res.reason) || 'refused');
  }
  function releaseAll(ctx, st, why) {
    st.men.forEach(function (cur) {
      ctx.finish(cur.actionId, why);
    });
    st.men.clear();
    st.holds.clear();
  }

  function squadCommand(ctx) {
    var sq = ctx.squad,
      sim = ctx.sim,
      st = stateOf(sq);
    C().refreshSketch(sq, sim);
    if (sq.state === 'retreat' || sq.commandPhase === 'retreat') return releaseAll(ctx, st, 'retreat');
    var kb = K().squadOf(sq);
    var legs = sq.route || [];
    if (!legs.length) return;
    var leg = ownerLeg(sq);
    var target = point(legs[leg]);
    if (!target) return;
    var fwd = C().forwardToObjective(sq, sim);
    var anchor = point(sq.orderAnchor) || C().centroid(C().living(sq));
    var slots = C().formationSlots(sq, anchor || target, fwd);
    if (kb.phase === 'contact' && kb.boundPulse % 2 === 1) {
      for (var i = 0; i < slots.length; i++) {
        var role = i % 2 === 0 ? 'mover' : 'watcher';
        var dest = C().boundPoint(sq, sim, role);
        ask(ctx, st, slots[i].man, role === 'watcher' ? 'movement.hold' : 'movement.move', dest);
      }
      return;
    }
    for (var j = 0; j < slots.length; j++) {
      var s = slots[j].man;
      var cur = st.men.get(String(s.id));
      var stage = cur && ctx.stage(cur.actionId);
      if (cur && stage && stage.stage === 'arrived' && leg === legs.length - 1) {
        ctx.finish(cur.actionId, 'arrived');
        st.men.delete(String(s.id));
        ask(ctx, st, s, 'movement.hold', slots[j].point);
      } else if (!cur || stage && stage.stage === 'cancelled') {
        ask(ctx, st, s, 'movement.move', slots[j].point);
      }
    }
    if (C().centroid(C().living(sq)) && dist(C().centroid(C().living(sq)), target) < 18 && leg < legs.length - 1)
      st.leg = leg + 1;
  }

  function fireAndMovement(ctx) {
    var sq = ctx.squad,
      sim = ctx.sim,
      st = stateOf(sq);
    var kb = K().squadOf(sq);
    var t = +(sim.time) || 0;
    if (t < st.nextWake) return;
    st.nextWake = t + 0.45;
    C().refreshSketch(sq, sim);
    if (sq.inContact && kb.phase === 'contact') {
      kb.boundPulse++;
      kb.sketch = Object.assign({}, kb.sketch, { pulse: kb.boundPulse, since: t });
    }
    var threat = kb.threatAxis;
    if (threat && sq.leader && !sq.leader.dead) {
      var SA = root.SquadAI;
      if (SA && SA.reportContact && sq.faction)
        SA.reportContact(sq, sim, threat, 'echo-sketch');
    }
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
  if (!reg.ok && reg.reason !== 'duplicate-provider') throw new Error('ECHO provider rejected: ' + reg.reason);

  root.BattleAIScratch = {
    on: true,
    id: ID,
    takeAll: takeAll,
    reset: reset,
    summary: function () {
      return { provider: ID, squads: squads };
    }
  };

  if (root.BattleModules)
    root.BattleModules.registerSystem('ai-scratch-echo', {
      version: '1-vertical-slice',
      onBattleStart: function (sim) {
        reset(sim);
        takeAll(sim);
      },
      onCommanderTick: takeAll,
      beforeBattleRestart: reset
    });
  if (root.GTLog) root.GTLog('[ECHO] aiScratch provider registered (?aiScratch=1)');
})(typeof window !== 'undefined' ? window : globalThis);
