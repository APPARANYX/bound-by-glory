'use strict';
/* Puts the General's reconstitution and fled pickup under the tactical controller in a harness world
   (roadmap section 8 slice M1): loads the capability contract, the controller (13a), its owner adapters
   (13b) and the command policy (13j), registers a provider that owns only `generalTick`, and returns
   `take(battle)`, which hands both sides' command units to it (what 13c's takeAll does in the page).
   Used by reconstitution-check.js and fled-man-check.js when GENERAL_CONTROLLER=1, and by
   tactical-general-check.js. */
function loadGeneralController(r, load, search) {
  load(r, 'battle/tactical-capability-contract.js', search);
  load(r, 'battle/modules/13a-tactical-controller.js', search);
  load(r, 'battle/modules/13b-tactical-owner-adapters.js', search);
  load(r, 'battle/modules/13j-tactical-general.js', search);
  const TC = r.BattleTacticalController,
    OA = r.BattleTacticalOwnerAdapters,
    policies = {};
  TC.points.forEach(p => (policies[p] = () => {}));
  policies.generalTick = ctx => r.BattleTacticalGeneral.update(ctx);
  const reg = TC.registerProvider({
    id: 'general-fixture',
    policies,
    adapters: OA.adapters,
    lifecycle: OA.lifecycle
  });
  if (!reg.ok && reg.reason !== 'duplicate-provider') throw new Error('provider: ' + reg.reason);
  return function take(b) {
    if (!r.BattleTacticalGeneral.on) return;
    ['us', 'ge'].forEach(f => {
      const unit = TC.commandUnit(b, f, true);
      if (!TC.controls(b, unit)) {
        const out = TC.requestMode(b, unit, 'new', 'general-fixture');
        if (!out.ok) throw new Error('command unit not taken: ' + out.reason);
      }
    });
  };
}
module.exports = { loadGeneralController };
