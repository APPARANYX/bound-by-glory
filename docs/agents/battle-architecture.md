# Battle architecture index (M3C: Macro / Meso / Micro Combat)

**Kind:** current implementation contract (index). Read this page, then only the subsystem page your task touches. Planned evolution lives in the [AI Skills roadmap](../architecture/AI_SKILLS_ROADMAP.md) (sections 7 to 9 are current); outstanding work lives in GitHub issues.

**Prime rule: one owner per responsibility.** Fix a bad behaviour at the layer that owns it. Don't
stack cooldowns, blockers, retries or extra movement writers to make one counter improve. A fix is
good if the system is easier to explain afterwards. `wire-map-check.js` holds the rule: every squad,
soldier or Engagement-record field that more than one file writes is listed, with a role and a reason,
in `tools/ai-sim-harness/fixtures/wire-map-baseline.json`, and the list only shrinks. A new writer
file needs an entry there, which a reviewer sees; a fix that removes a writer must remove its entry.

`General (Macro) → Squad Leader (Meso) → Engagement → Movement Resolver → Movement Execution → Navigation`.
Intent flows down and status flows up. No layer rewrites another's state.

The tactical controller is the default since #785 (`?tacticalController=legacy` or `?controllerDefault=0` rolls a battle back). Legacy retirement (Phase E) waits on the owner's word and runs as a [full spec-driven project](development-workflows.md#a-full-spec-driven-development).

## Subsystem pages

| Subsystem | Page | Read when you change |
| --- | --- | --- |
| Controller ownership and integration | [controller.md](../architecture/controller.md) | providers 13a-13k, owner adapters, the capability contract, controller/legacy switching, movement through the two movement owners, transport boarding |
| Macro command (the General) | [macro-command.md](../architecture/macro-command.md) | objectives, main effort, briefs, strategic recovery, reconstitution |
| Meso tactical coordination (Squad Leader) | [meso-squad-leader.md](../architecture/meso-squad-leader.md) | squad phases, morale and COA, buddy pairs, scouts and recon, leaderless continuation |
| Command Reception and order lifecycle | [command-reception.md](../architecture/command-reception.md) | how a published order reaches, is adopted and executed by each man |
| Perception and knowledge | [perception-knowledge.md](../architecture/perception-knowledge.md) | ranks, perception, beliefs, contact memory, callouts |
| Micro soldier condition | [soldier-condition.md](../architecture/soldier-condition.md) | stress, reactions, soldier events and stats |
| Engagement and physical execution | [engagement-execution.md](../architecture/engagement-execution.md) | Engagement states, stance, fire, stations, window port, loadouts, weapons, wounds, frozen physical rules |
| Runtime lifecycle, restart, registry hooks | [runtime-contracts.md](runtime-contracts.md) | module registry, restart order, required hooks, clocks |
| Movement and navigation | [controller.md](../architecture/controller.md) (movement owners), [engagement-execution.md](../architecture/engagement-execution.md) (window port, frozen path rules), [world placement](world-placement-grounding.md) | the resolver, navigation, placement |
| Transport | [controller.md](../architecture/controller.md) (boarding) and [macro-command.md](../architecture/macro-command.md) (reserves); seats in [`german_transport-seats.json`](../reference/german_transport-seats.json) | trucks, boarding, dismount |
| Tunable numbers | [TUNABLES.md](../reference/TUNABLES.md) | any constant or genome parameter |
| Long-range tactical design (not implemented) | [AI_TACTICS_OUTLINE.md](../reference/AI_TACTICS_OUTLINE.md) | new tactics before they are specified |

## Owners by layer

| Layer | Owner (file) | Owns | Must not |
| --- | --- | --- | --- |
| Macro: Force Command | `commander-ai.js`, `commander-doctrine.js`, `commander-routes.js` | `_macroMission` brief {intent, action, objectiveId, point, flank leg, status}, `targetObjective`, `commandRole`, force allocation, reserves | write `commandPhase`/`objective`/route legs, cover, slots or soldier destinations |
| Meso: Squad Leader / Squad Command | `modules/16-squad-plan-stability.js` (`executeMission`, `fireAndMovement`; SquadAI's `squadCommand` owner) | stable squad plan: fireteams, formation, order anchor, fire and movement (assault authorisation, bound cycle and team), corner pauses, defensive posts, regroup, the forward line (`sq._forwardLine`), objective phase; the only writer of `commandPhase` (setup states it through `initialPhase`); the only publisher of the anchor pair `orderAnchor` + `rally` (`BattleSquadStability.publishAnchor`: its advance, its regroup, the General's merge and the garrison setup all call it); the roster (`squad.members`, `soldier.squad`: `reform` and `disband` for a merge, `detachFled` for a man who has fled, `absorb` for one a retreating squad takes in) and the squad's `safePoint` | do obstacle avoidance; republish orders every tick |
| Micro: Engagement | `engagement.js` (+ `modules/44-combat-urgency.js` drills on its `afterDrill` slot) | per-soldier state machine, stance (`prone`/`crawling`/`tacticalCrouch`), permission to fire, combat proposals to the resolver, the squad contact report (`inContact`, base of fire, pinned, and the men reacting to stress), the stress reactions (`cower`, `flee`, `freeze`, `rage`, behind `?stressAct=`), the fled man's phases and the decision to leave his weapons (`BattleWeapons.abandon`) and take a new one at base (`SquadAI.rearm`); reads each man's Perception-owned picture through `SquadAI.soldierContact` | write final destination; pick objectives; decide squad bounds; promote squad aggregate contact into personal truth |
| Perception + shared primitives | `squad-ai.js` | who sees whom (view cones), per-man `soldier._beliefs` (seen/told/heard facts with provenance, confidence and expiry), the aggregate upward `squad.contact`, gunfire memory, shot resolution and `areaFire` suppression; `SquadAI.soldierContact` is the personal read API and `resetPerceptionBattleState` owns battle-lifecycle cleanup; hosts the declared extension points (`SquadAI.extend`) and `BattleLeases`; a status-only squad update when no `squadCommand` owner is loaded | set stance/destination in combat; let presentation or hidden truth validate/upgrade a belief |
| Soldier condition | `modules/17-soldier-mind.js` | `soldier.mind` (stress, band, shock) and the `squad.mind` roll-up: what suppression, wounds, casualties, leadership and company do to a man; the four modifiers Engagement and the shot model read | write stance, destination, target or another layer's timer; draw the combat RNG |
| Soldier stats | `modules/10-soldier-stats.js` (`BattleSoldierStats`) | `soldier.stats` (six hash rolls of faction and id) and `squad.stats` (means over the living): the numbers the reading layers price, and the ranks the General reads | write any timer, stance, destination or another layer's state; draw the combat RNG |
| Tactical positions | `modules/20-building-hardpoints.js` (`BattleTacticalPositions`: `claim`/`current`/`station`/`release`) | window/hardpoint reservations `assigned→ingress→occupying→holding→released`, committed ingress route |  |
| Window firing port | `battle-navigation.js` (`station.port`, `aperture`, `inSector`, `rejectedWindows`) with Engagement's `station` | the aperture geometry (sill, head, jambs, the anchor, the stance the sill fits, the exterior sector) and the per-tick question of whether his eye and his bore pass through it; the post itself, its bounded local pose (`t.pose`) and the aperture report (`t.aperture`) are the Tactical positions manager's record | assign or release a window, pick a destination, write another layer's state; bypass the wall (LOS elsewhere is unchanged) |
| Tactical routing | `modules/52-survival-tactical-route.js` | safe ingress, suppressed cover detours | resurrect an obsolete objective |
| Movement Resolver | `movement-resolver.js` | **sole normal-runtime writer of `soldier.destination`**; coalesces Engagement's per-tick combat requests and arbitrates Meso vs Micro proposals | act as a garbage collector for redundant producers |
| Diagnostics | `modules/36-order-provenance.js` (writer provenance, fast setters, 1.6 s in-place sampler), `32` Loop Watch, `43` forward progress, `99` the one diagnostics exporter (full, loops and orders via `BattleDiagnosticsExport.snapshot(kind)`; `38` only adds its AI Graph buttons) | observe only: removing them leaves a battle identical (~4% wall time); Loop Watch evaluates squad order churn only within one movement authority, so phase/recon/mission-hold handoffs and retreat ownership are not stitched into a false command loop | change gameplay |
| Navigation | `battle-navigation.js`, `modules/39-navigation-physicality-debug.js` | doors, stations, pathfinding, 0.45 m body legality | assign or release tasks |
| Personal space | `modules/51-soldier-personal-space.js` | local physical correction | own commands |
## Where the rest went (2026-11-28 split)

- The evidence-first regression workflow and the rules for behavior slices are in [development workflows](development-workflows.md#b-lightweight-defect-or-improvement).
- Performance gate, change discipline and benchmark statistics are in [acceptance and rollback](testing/acceptance.md).
- Deferred and watch-only items (dated 2026-09-29) are in the [future design backlog](../plans/future-design-backlog.md#deferred-2026-09-29-from-the-battle-architecture-page).
- Closed campaign notes (AI polish, stabilization phases, soldier-level continuation, stress rollout) were removed; they stay in git history: `git show d15687b:docs/agents/battle-architecture.md` and in their carrying PRs.
