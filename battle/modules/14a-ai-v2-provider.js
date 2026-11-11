/* Experimental AI V2 tactical provider (`?aiV2=1`). Uses the event-driven kernel (battle/ai-v2)
   and meso executor instead of the march provider (13c). Legacy and `?tacticalController=legacy`
   are unchanged. Requires the tactical controller (`?tacticalController=new` or default). */
(function (root) {
  'use strict';
  var SEARCH = typeof location !== 'undefined' ? location.search || '' : '',
    ON = /[?&]aiV2=1(?:&|#|$)/i.test(SEARCH),
    TC_ON = /[?&]tacticalController=new(?:&|#|$)/i.test(SEARCH);
  if (!ON) return;
  var M = root.BattleAIV2Meso,
    K = root.BattleAIV2;
  if (!M || !M.on || !K || !K.on) {
    if (typeof console !== 'undefined' && console.warn)
      console.warn('[AI-V2] kernel/meso not loaded; enable ai-v2 scripts before 14a provider');
    return;
  }
  if (!TC_ON) {
    if (typeof console !== 'undefined' && console.warn)
      console.warn('[AI-V2] requires ?tacticalController=new (or battle default); staying off');
    return;
  }
  var TC = root.BattleTacticalController,
    OA = root.BattleTacticalOwnerAdapters;
  if (!TC || !OA) throw new Error('AI V2 provider needs tactical controller and owner adapters');
  if (!root.BattleTacticalCapabilityContract)
    throw new Error('AI V2 provider needs tactical-capability-contract.js');

  function engagement(ctx) {
    if (root.BattleTacticalCoveredManeuver && root.BattleTacticalCoveredManeuver.engagement(ctx)) return;
    if (root.BattleTacticalContactSkills) root.BattleTacticalContactSkills.engagement(ctx);
  }

  var reg = TC.registerProvider({
    id: M.id,
    policies: {
      squadCommand: M.squadCommand,
      commanderTick: function (ctx) {
        var C = root.BattleTacticalMarchCore;
        if (C && C.commanderTick) C.commanderTick(ctx);
      },
      fireAndMovement: M.fireAndMovement,
      executeMission: M.executeMission,
      engagement: engagement,
      stationSelection: function (ctx) {
        if (root.BattleTacticalStationSkill) root.BattleTacticalStationSkill.update(ctx);
      },
      generalTick: function (ctx) {
        if (!K.shouldRun(ctx.sim, ctx.squad, 'strategic')) return;
        if (root.BattleTacticalGeneral) root.BattleTacticalGeneral.update(ctx);
        K.markRan(ctx.sim, ctx.squad, 'strategic');
      }
    },
    soldierPolicy: function (slot, facts) {
      if (!root.BattleTacticalSoldierPolicy) throw new Error('Micro soldier policy is missing');
      return root.BattleTacticalSoldierPolicy.choose(slot, facts);
    },
    adapters: OA.adapters,
    lifecycle: OA.lifecycle
  });
  if (!reg.ok) throw new Error('AI V2 provider rejected: ' + reg.reason);

  var C = root.BattleTacticalMarchCore;
  if (C) {
    root.BattleTacticalMarchProvider = {
      on: true,
      id: M.id,
      structure: C.structure,
      clear: C.clear,
      singleWriter: C.singleWriter,
      skillOn: M.skillOn,
      leg: C.leg,
      ownsSkill: C.ownsSkill,
      release: C.release,
      releaseMan: C.releaseMan,
      target: C.target
    };
  }

  if (root.BattleModules)
    root.BattleModules.registerSystem('ai-v2-provider', {
      version: '0.1-event-kernel',
      onBattleStart: M.takeAll,
      onCommanderTick: M.takeAll,
      beforeBattleRestart: function (sim) {
        if (K.beforeRestart) K.beforeRestart(sim);
      }
    });
  if (root.GTLog)
    root.GTLog('[AI-V2] experimental provider registered (?aiV2=1): event kernel + gated meso skills');
})(typeof window !== 'undefined' ? window : globalThis);
