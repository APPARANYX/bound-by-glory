/* The General's command policy under the tactical controller (roadmap section 8, slices M0 and M1).

   The controller (13a) holds one command unit per side (`@us`/`@ge`). When this policy owns it, the
   General's reconstitution and fled pickup are decided here, on the existing commander tick
   (`generalTick`, dispatched from commander-ai.js updateFactionCommander), and the legacy calls there
   do not run. The decision reuses the reconstitution owner's own chooser (22 planGroups); each group
   it forms is one `command.reconstitute` action whose stage (briefed, merged, or cancelled with the
   owner's reason) is visible in the controller summary until the group ends. Each pickup is one
   `command.pickup` action. Forming, briefing, merging and dissolving stay with the owner (22) through
   the adapters (13b): no new timer, order writer or movement writer.

   What the General reads is unchanged: his own squads' state, assembly phase and contact, never enemy
   actor truth. ?controllerReconstitution=0 leaves the command units untaken, so the legacy calls run
   under the controller exactly as before this slice. */
(function (root) {
  'use strict';
  var SEARCH = typeof location !== 'undefined' ? location.search || '' : '',
    ON = !/[?&]controllerReconstitution=(?:0|off|false)(?:&|#|$)/i.test(SEARCH),
    units = new WeakMap();

  function stateOf(unit) {
    var st = units.get(unit);
    if (!st)
      units.set(unit, (st = { groups: new Map(), formed: 0, merged: 0, ended: 0, pickups: 0, refused: {} }));
    return st;
  }
  function refuse(st, why) {
    st.refused[why] = (st.refused[why] || 0) + 1;
  }
  function update(ctx) {
    var C = root.BattleCommanderAI,
      R = C && C.reconstitution ? C.reconstitution() : null;
    if (!R) return;
    var sim = ctx.sim,
      unit = ctx.squad,
      f = unit.faction,
      st = stateOf(unit),
      plan = R.planGroups(sim, f);
    plan.candidates.forEach(function (c) {
      var r = ctx.request('command.reconstitute', null, {
        squadIds: c.squads.map(function (sq) {
          return String(sq.id);
        })
      });
      if (!r.ok) return refuse(st, r.reason);
      st.formed++;
      st.groups.set(r.actionId, true);
    });
    R.recordPool(sim, f, plan);
    /* The owner's own step: a group merges when every member is at the rally out of contact, and is
       dissolved below viable strength or when a member rallied. */
    R.progressGroups(sim, f, plan.groups);
    st.groups.forEach(function (_, id) {
      var s = ctx.stage(id);
      if (s && s.stage === 'briefed') return;
      if (s && s.stage === 'merged') st.merged++;
      st.ended++;
      ctx.finish(id, s ? s.stage + ':' + s.reason : 'gone');
      st.groups.delete(id);
    });
    /* Fled pickup, one man at a time in roster order: each pickup changes the taking squad. */
    var squads = sim.factions[f].squads;
    for (var i = 0; i < squads.length; i++) {
      var pick = R.bestPickup(sim, f, squads[i]);
      if (!pick) continue;
      var r = ctx.request('command.pickup', null, {
        fledSquadId: String(pick.lone.id),
        intoSquadId: String(pick.into.id)
      });
      if (!r.ok) {
        refuse(st, r.reason);
        continue;
      }
      st.pickups++;
      ctx.finish(r.actionId, 'absorbed');
    }
  }
  /* Read-only: per side, groups in flight with their stage, and the counters. */
  function summary(sim) {
    var TC = root.BattleTacticalController,
      out = {};
    ['us', 'ge'].forEach(function (f) {
      var unit = TC && TC.commandUnit ? TC.commandUnit(sim, f) : null,
        st = unit && units.get(unit);
      if (!st) return;
      out[f] = {
        controlled: !!TC.controls(sim, unit),
        live: st.groups.size,
        formed: st.formed,
        merged: st.merged,
        ended: st.ended,
        pickups: st.pickups,
        refused: Object.assign({}, st.refused)
      };
    });
    return out;
  }

  root.BattleTacticalGeneral = { on: ON, update: update, summary: summary };
})(typeof window !== 'undefined' ? window : globalThis);
