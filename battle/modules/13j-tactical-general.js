/* The General's command policy under the tactical controller (roadmap section 8, slices M0 to M4).

   The controller (13a) holds one command unit per side (`@us`/`@ge`). When this policy owns it, the
   General's reconstitution and fled pickup are decided here, on the existing commander tick
   (`generalTick`, dispatched from commander-ai.js updateFactionCommander), and the legacy calls there
   do not run. The decision reuses the reconstitution owner's own chooser (22 planGroups); each group
   it forms is one `command.reconstitute` action whose stage (briefed, merged, or cancelled with the
   owner's reason) is visible in the controller summary until the group ends. Each pickup is one
   `command.pickup` action. Forming, briefing, merging and dissolving stay with the owner (22) through
   the adapters (13b): no new timer, order writer or movement writer.

   What the General reads is unchanged: his own squads' state, assembly phase and contact, never enemy
   actor truth. ?controllerReconstitution=0 hands reconstitution and the pickup back to the legacy calls.

   Slice M2, strategic recovery: when the side's objective stall crosses a ladder stage, this policy
   opens one `command.recover` action for the stall episode and runs each crossed stage (reconcile,
   release, main effort, reset) and the later review passes through the owner's own stage functions
   (22a runStage, runReviewPass), holding a stage while a brief the previous stage issued is still in
   its adoption window (22a adoptionHold). The action reports the last stage run and ends `recovered`
   when the side makes objective progress (a new episode). ?controllerRecovery=0 hands recovery back to
   the legacy call.

   Slice M3, briefs: on each commander tick the policy asks the General's wake rules (22a wakeReason)
   which squads need a new brief and opens one `command.brief` action per wake; its adapter re-selects
   through the owner (22a reconsiderMission, objective scoring in commander-doctrine) and the brief goes
   out through the ordinary issueMission path. The action stays `issued` until the Squad Leader accepts
   the brief, so a brief nobody adopted is visible instead of silently reissued. ?controllerBriefs=0
   hands the wakes back to the legacy loop.

   Slice M4, transport: after the briefs, the policy asks the transport owner (58 quoteMission, pure)
   whether a truck can serve each squad's executing brief and grants it as one `command.transport`
   action, which follows the ride (boarding, embarked) until it ends. Module 58 keeps the quote, the
   seats and the journey. The reserve commit needs no slice of its own: it is a General wake
   (`reserve-commit`, 22a reserveDue) and so already a `command.brief` since M3. A truck granted with a
   brief at publication stays inside the owner's issueMission. ?controllerTransport=0 hands the per-tick
   allocation back to the legacy loop. With every flag off the command units stay untaken. */
(function (root) {
  'use strict';
  var SEARCH = typeof location !== 'undefined' ? location.search || '' : '',
    RECON_ON = !/[?&]controllerReconstitution=(?:0|off|false)(?:&|#|$)/i.test(SEARCH),
    RECOVERY_ON = !/[?&]controllerRecovery=(?:0|off|false)(?:&|#|$)/i.test(SEARCH),
    BRIEFS_ON = !/[?&]controllerBriefs=(?:0|off|false)(?:&|#|$)/i.test(SEARCH),
    TRANSPORT_ON = !/[?&]controllerTransport=(?:0|off|false)(?:&|#|$)/i.test(SEARCH),
    ON = RECON_ON || RECOVERY_ON || BRIEFS_ON || TRANSPORT_ON,
    units = new WeakMap(),
    towns = new WeakMap();

  function stateOf(unit) {
    var st = units.get(unit);
    if (!st)
      units.set(
        unit,
        (st = {
          groups: new Map(),
          formed: 0,
          merged: 0,
          ended: 0,
          pickups: 0,
          refused: {},
          recover: null,
          episodes: 0,
          recovered: 0,
          stages: 0,
          held: 0,
          briefs: new Map(),
          briefed: 0,
          accepted: 0,
          unchanged: 0,
          superseded: 0,
          rides: new Map(),
          granted: 0,
          rideEnds: {}
        })
      );
    return st;
  }
  function refuse(st, why) {
    st.refused[why] = (st.refused[why] || 0) + 1;
  }
  function update(ctx) {
    var owned = ctx.facts && ctx.facts.owned;
    if (RECON_ON) {
      if (owned) owned.reconstitution = true;
      reconstitution(ctx);
    }
    if (RECOVERY_ON && ctx.facts) {
      owned.recovery = true;
      ctx.facts.recoveryWoke = recovery(ctx, ctx.facts);
    }
    if (BRIEFS_ON && ctx.facts) {
      owned.briefs = true;
      briefs(ctx, ctx.facts);
    }
    if (TRANSPORT_ON && ctx.facts) {
      owned.transport = true;
      transport(ctx, ctx.facts);
    }
  }
  /* M4. After the briefs, one command.transport per squad on an executing brief that the transport owner
     quotes a truck for (58 quoteMission is pure; considerMission re-quotes and grants in the adapter). */
  function transport(ctx, facts) {
    var T = root.BattleSquadTransport;
    if (!T || !T.quoteMission) return;
    var sim = ctx.sim,
      st = stateOf(ctx.squad),
      squads = facts.squads || [];
    st.rides.forEach(function (_, id) {
      var s = ctx.stage(id);
      if (s && (s.stage === 'boarding' || s.stage === 'embarked')) return;
      var why = s ? s.reason : 'gone';
      st.rideEnds[why] = (st.rideEnds[why] || 0) + 1;
      ctx.finish(id, s ? s.stage + ':' + s.reason : 'gone');
      st.rides.delete(id);
    });
    for (var i = 0; i < squads.length; i++) {
      var sq = squads[i],
        m = sq._macroMission;
      if (!m || m.status !== 'executing') continue;
      /* The owner's own guard: an ended ride on this brief is not a new opportunity. */
      if (sq._transport && sq._transport.missionVersion === m.version) continue;
      var quote = T.quoteMission(sim, sq, m);
      if (!quote) continue;
      var r = ctx.request('command.transport', null, {
        targetSquadId: String(sq.id),
        reason: 'truck ' + quote.vehicle.id
      });
      if (!r.ok) {
        refuse(st, r.reason);
        continue;
      }
      st.granted++;
      st.rides.set(r.actionId, String(sq.id));
    }
  }
  /* M3. One command.brief per General wake; the wake reasons go back to the commander tick's readout. */
  function briefs(ctx, facts) {
    var C = root.BattleCommanderAI,
      R = C && C.recovery ? C.recovery() : null;
    if (!R) return;
    var sim = ctx.sim,
      st = stateOf(ctx.squad),
      squads = facts.squads || [];
    towns.set(sim, facts.town || null);
    st.briefs.forEach(function (_, id) {
      var s = ctx.stage(id);
      if (s && s.stage === 'issued') return;
      if (s && s.stage === 'accepted') st[s.reason === 'unchanged' ? 'unchanged' : 'accepted']++;
      else st.superseded++;
      ctx.finish(id, s ? s.stage + ':' + s.reason : 'gone');
      st.briefs.delete(id);
    });
    for (var i = 0; i < squads.length; i++) {
      var sq = squads[i],
        reason = R.wakeReason(sim, sq);
      if (!reason) continue;
      facts.wakeReasons[sq.id] = reason;
      var r = ctx.request('command.brief', null, { targetSquadId: String(sq.id), reason: reason });
      if (!r.ok) {
        refuse(st, r.reason);
        continue;
      }
      st.briefed++;
      st.briefs.set(r.actionId, String(sq.id));
    }
  }
  /* M2. Returns whether a stage or review pass ran (the General's strategic-recovery wake). */
  function recovery(ctx, facts) {
    var C = root.BattleCommanderAI,
      R = C && C.recovery ? C.recovery() : null;
    if (!R) return false;
    var sim = ctx.sim,
      f = ctx.squad.faction,
      st = stateOf(ctx.squad),
      squads = facts.squads || [],
      plan = R.planRecovery(sim, f, squads),
      episode = String(plan.recovery.episode),
      ran = 0;
    if (st.recover && st.recover.episode !== episode) {
      st.recovered++;
      ctx.finish(st.recover.id, 'recovered');
      st.recover = null;
    }
    /* One action per stall episode, opened when the first stage or review is due. */
    function open() {
      if (st.recover) return true;
      var r = ctx.request('command.recover', null, { episode: episode });
      if (!r.ok) {
        refuse(st, r.reason);
        return false;
      }
      st.episodes++;
      st.recover = { id: r.actionId, episode: episode };
      return true;
    }
    for (var i = 0; i < plan.crossed.length; i++) {
      if (R.adoptionHold(sim, f, plan, plan.crossed[i])) {
        st.held++;
        break;
      }
      if (!open()) break;
      R.runStage(sim, f, squads, facts.town, plan, plan.crossed[i]);
      st.stages++;
      ran++;
    }
    var reviewed = R.reviewDue(plan) && open() && R.runReviewPass(sim, f, squads, facts.town, plan.info);
    return ran > 0 || !!reviewed;
  }
  function reconstitution(ctx) {
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
        briefs: {
          live: st.briefs.size,
          briefed: st.briefed,
          accepted: st.accepted,
          unchanged: st.unchanged,
          superseded: st.superseded
        },
        transport: {
          live: st.rides.size,
          granted: st.granted,
          ended: Object.assign({}, st.rideEnds)
        },
        recovery: {
          live: st.recover ? st.recover.episode : null,
          episodes: st.episodes,
          recovered: st.recovered,
          stages: st.stages,
          held: st.held
        },
        refused: Object.assign({}, st.refused)
      };
    });
    return out;
  }

  root.BattleTacticalGeneral = {
    on: ON,
    reconstitution: RECON_ON,
    recovery: RECOVERY_ON,
    briefs: BRIEFS_ON,
    transport: TRANSPORT_ON,
    update: update,
    /* The town the commander tick is running with, for the brief adapter (13b); scenario data, not a decision. */
    townFor: function (sim) {
      return towns.get(sim) || null;
    },
    summary: summary
  };
})(typeof window !== 'undefined' ? window : globalThis);
