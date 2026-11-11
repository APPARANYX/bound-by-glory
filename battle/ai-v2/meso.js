/* AI V2 meso: schedules the native march core (13c) without duplicating tactical skills. */
(function (root) {
  'use strict';
  var ON = root.BattleAIV2 && root.BattleAIV2.on;
  var ID = 'ai-v2';

  function core() {
    return root.BattleTacticalMarchCore;
  }

  function executeMission(ctx) {
    if (!ON) return;
    var K = root.BattleAIV2,
      C = core();
    if (!C) return;
    K.noteDispatch(ctx.sim, ctx.squad, 'executeMission');
    K.ingestSquadContext(ctx);
    if (!K.shouldRun(ctx.sim, ctx.squad, 'mission')) return;
    C.executeMission(ctx);
    K.markRan(ctx.sim, ctx.squad, 'mission');
    K.forceDirty(ctx.sim, ctx.squad, ['formation']);
  }

  function squadCommand(ctx) {
    if (!ON) return;
    var K = root.BattleAIV2,
      C = core();
    if (!C) return;
    K.noteDispatch(ctx.sim, ctx.squad, 'squadCommand');
    K.ingestSquadContext(ctx);
    /* Formation is never fully suppressed: march core's st.check / yield path must run every squad tick. */
    C.squadCommand(ctx);
    if (K.shouldRun(ctx.sim, ctx.squad, 'formation')) K.markRan(ctx.sim, ctx.squad, 'formation');
  }

  function fireAndMovement(ctx) {
    if (!ON) return;
    var K = root.BattleAIV2,
      C = core();
    if (!C) return;
    K.noteDispatch(ctx.sim, ctx.squad, 'fireAndMovement');
    K.ingestEngagementFacts(ctx);
    if (K.shouldRun(ctx.sim, ctx.squad, 'contact')) {
      if (C.fireAndMovementContact) C.fireAndMovementContact(ctx);
      K.markRan(ctx.sim, ctx.squad, 'contact');
    }
    if (K.shouldRun(ctx.sim, ctx.squad, 'maneuver')) {
      if (C.fireAndMovementManeuver) C.fireAndMovementManeuver(ctx);
      K.markRan(ctx.sim, ctx.squad, 'maneuver');
    }
  }

  function takeAll(sim) {
    var TC = root.BattleTacticalController;
    if (!TC || !sim || !sim.factions || !root.BattleTacticalContactSkills) return;
    ['us', 'ge'].forEach(function (f) {
      var a = (sim.factions[f] && sim.factions[f].squads) || [];
      for (var i = 0; i < a.length; i++) if (!TC.controls(sim, a[i])) TC.requestMode(sim, a[i], 'new', ID);
      var G = root.BattleTacticalGeneral,
        unit = G && G.on && TC.commandUnit ? TC.commandUnit(sim, f, true) : null;
      if (unit && !TC.controls(sim, unit)) TC.requestMode(sim, unit, 'new', ID);
    });
  }

  function skillOn(kind) {
    var C = core();
    return !!(C && C.skillOn && C.skillOn(kind));
  }

  root.BattleAIV2Meso = {
    on: ON,
    id: ID,
    executeMission: executeMission,
    squadCommand: squadCommand,
    fireAndMovement: fireAndMovement,
    takeAll: takeAll,
    skillOn: skillOn,
    leg: function (sq) {
      var C = core();
      return C && C.leg ? C.leg(sq) : null;
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
