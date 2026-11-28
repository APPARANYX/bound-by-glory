# Tactical controller: ownership and integration

**Kind:** current implementation contract. **Read when:** changing the tactical controller, its providers (13a-13k), owner adapters, the capability contract, or any switch between controller and legacy policy. Index and layer map: [battle architecture](../agents/battle-architecture.md). 

<!-- Moved verbatim from `docs/agents/battle-architecture.md` at d15687b; edit here, not there. -->

### Tactical controller replacement contract (#602)

The October 25 direction replaces tactical **decisions** while retaining the existing
simulation owners. Since #785 the controller is the default (`?tacticalController=legacy`
rolls a battle back). Closed PR #630 holds the first registry, fact projection, selector
and bounded executor experiments (reference only). The #651 directional-bound findings remain evidence. Its earlier requirement that 15n
score tactics and 15j decide bound leases is superseded for new-controller squads:
the selected controller chooses and commits; an extracted owner service may publish the
native lease. Neither legacy function may independently choose a competing tactic.

One controller owns each squad's ordinary tactical policy: legacy **or** new. Shadow
has no effect authority. A switch must cancel and reconcile old actions and owner-held
resources before activating its replacement. Validate that the replacement supports the
squad's current obligations before disabling legacy. An unsupported mode cannot leave
a squad without a controller; a failed running action cannot silently reactivate a second
policy owner.

`battle/modules/13a-tactical-controller.js` (`BattleTacticalController`) implements this
switch. Every squad starts and restarts on legacy; the six policy entry points
(`squadCommand`, `commanderTick`, `fireAndMovement`, `executeMission`, `engagement`,
`stationSelection`) call `dispatch`/`controls` after their retained services and run the
legacy policy whenever it answers false. `requestMode(sim, squad, 'new', providerId)` is
rejected with a specific reason (`contract-unavailable`, `unknown-provider`,
`missing-policy:<point>`, `missing-adapter:<capability>`, `missing-lifecycle:<cancel|release>`,
`cleanup-pending`, `cancelling`) and the current controller keeps the squad. Leaving a
replacement cancels and releases its actions first; entering one ends, through their owners,
legacy recon, the engagement plan, a regroup (`endRegroup` restores the interrupted phase,
counts the exit and grants the re-entry cooldown), the bound/bound-cycle/regroup-bypass/
route-transition/corner-hold leases, fire control, the tactical posture, the local task, bound
orders, suppressor jobs and automatic stations, while retreat-anchor, rally-recovery and
succession stay. Authority still held after that release (a lease, a station, fire control or a
local task) rejects the switch as `cleanup-pending`, counts `stats.releaseRefused` and is listed
under `summary().refused`; a repeated request skips cleanup while the same holdout objects are
still held, so retries never keep disrupting a squad legacy still commands. A mission or roster
change since the refusal, or a holdout replaced by a new one, earns one more release. Actions are
registered under their issuing provider before its owner adapter runs: lifecycle callbacks go
to that provider, an adapter cannot switch controllers mid-acceptance (`accepting`), a
synchronous completion is honoured, and only a context of the issuing epoch and generation
may finish an action. Module 44 interrupts the man's actions before it publishes urgent cover. Mission and roster
changes cancel old actions before the next policy call, module 44's urgent cover interrupts
the man's actions with a reason, and resources are released once. Unconfirmed cleanup is
retried on the next dispatch (no timer) and blocks the next switch. `battle-sim.js` calls
`beforeRestart` before any `beforeBattleRestart` hook clears legacy squad state; cleanup
still unconfirmed at that point is an accepted loss, counted in `stats.restartDropped` and
logged. A controlled squad sets no `_missionHold`, so Loop Watch still judges its progress. Requests are
validated by the contract below, so a stale tuple or an actor outside the squad is rejected.
The page loads the contract beside the Commander. The only provider is the march provider
(13c), registered only under `?tacticalController=new`. Since #785 the battle page adds that
parameter when the URL names no controller (`?tacticalController=legacy` or `?controllerDefault=0` keeps
legacy); module code still reads only the query, so Node checks without it run legacy. The controller keeps its state in WeakMaps and adds no squad or soldier field.


Micro U0–U4 uses the same active provider's `soldierPolicy` slot (13k). Owners project only detached
facts to `BattleTacticalController.selectSoldier`; `tactical-capability-contract.js` declares the
synchronous decision slots and validates their results. This slot is inside an existing soldier drill,
not an additional resource-holding action: Engagement still applies stance, reserves/releases cover
and executes reactions; 46 still owns ammunition and reload clocks; the resolver alone commits
movement. Each on slice bypasses its pre-U chooser. Independent rollback flags are `controllerStance`,
`controllerSoldierFire`, `controllerReactions` and `controllerDrill` (`=0`). Latest per-actor selections
are in `summary().soldierDecisions`, stamped by mission/epoch/generation. They say `selected`, not
fired/arrived: native owner evidence remains the execution oracle. Reactions interrupt only their
actor's existing controller actions before taking over; no dosage or suppression-stress cap changes.

Slice 4 (`13e-tactical-covered-maneuver.js`) chooses forward/back cover points and native
actors under the same opt-in provider. `maneuver.cover` asks Meso's `controllerBound` to
lease the existing `bound` kind for up to three independent personal movers. These flexible
windows end on physical arrival/check-in or genuine interruption, never on a timer.
`combat.bound` reserves a canonical cover slot,
publishes through Meso/Command Reception, then executes only after personal adoption.
Engagement reports actual arrival within 0.45 m; publication/readiness cannot finish it.
The first move requires actual qualified Ammunition discharge evidence; further enrollments
retain two capable supporters and fresh native fire evidence. A recent shooter may become a
mover while other actual shooters remain. Retained C/D hops survive B arrivals inside a
defended perimeter; only the last checked-in post stabilizes that defender. Cover routes
are revalidated against detached perceived threats; no exposed/objective-rush fallback.

Close assault finishes with an explicit `combat.contact` `grenade` drill, selected by the
contact skill for one eligible non-moving rifleman per squad. The grenade owner's read-only
`assaultOpportunity` checks personally known fresh contact, 30 m range, inventory/cooldown,
fire permission, a clear physical throw arc and native friendly clearance. Engagement calls
`assaultThrow` to revalidate and commit; the native grenade clock alone releases and detonates.
A usable rifle line does not veto this explicitly requested finisher. A live squad grenade
prevents another finisher until it bursts. The controller's grenade policy (on under the
controller, `?controllerGrenade=0` restores the finisher alone) carries the legacy reason for a
grenade into that one choice: among the eligible men, the one whose rifle cannot reach his
contact (`SquadAI.canSuppress`, read-only) throws first, then the nearest to his aim; a man walking
on the march may stop to throw (the windup holds him; a covered-bound or urgent mover still
finishes his hop); and a man's own fresh sighting is still a grenade decision after the squad's
contact clears. The grenade owner's gates, the one-per-squad rule and the gunner's exclusion are
unchanged. Legacy opportunistic grenade policy is unchanged for squads the controller does not own.
The Skills Lab assault objective is at the target line, with actual final physical shelters;
capturing a midpoint must not turn the unfinished assault into a defensive deployment.

A retreat window is an explicit Meso-owned exception to ordinary all-member withdrawal,
queried by Engagement, cover reservations and the resolver. It preserves retreat state and
never changes the retreat anchor or fire permission. Fewer than four living, extraction,
failed support, pinning/reaction, player takeover, scene/navigation/leader/roster/mission
change revoke the affected authority; ordinary retreat remains available.
The module's read-only summary/history and benchmark `coveredBounds.controller` distinguish
started, arrived and aborted episodes by direction. This is an opt-in implementation;
controlled harness success does not establish natural battle tactical-quality acceptance.

Effect requests and receipts correlate the full tuple `battleId`, `generation`, `faction`, `squadId`,
`actorId` (when applicable), `missionVersion`, `rosterRevision`, `controllerEpoch`, `mode`
and `actionId`. Reconstitution, member detachment, mission supersession, controller
switch and restart invalidate the relevant old tuple. Actor IDs alone are insufficient;
opposing factions and independent battles can reuse them. `battleId` distinguishes
independent sessions even when their numeric generations match. The new contract
does not add fields to authoritative soldiers or squads. Future adapters must obtain
these values from their lifecycle owners.

| Entry point | Retained service / safety responsibility | Tactical policy to isolate |
| --- | --- | --- |
| Module 16 `squadCommand` | Casualties, succession, assembly and survival lifecycle | Fire-and-movement, anchor advancement, fireteam choice and forward-line decisions |
| Module 16 commander tick | Transport exclusion, lifecycle cleanup and native lease expiry | Local plan/posture, regroup choice, mission-route/phase and engagement-plan selection |
| 15j `fireAndMovement` | Contact reporting and fled-member detachment | Recon, fire control, COA, suppressor assignment and bound selection/commitment |
| 15l `executeMission` | Macro acceptance/supersession and transport-arrival adoption | Route progression, local phase, recon and hold decisions |
| Engagement `runDrill` / `updateSquad` | Physiology, reactions, pending grenade completion, station execution, stance/fire/weapon authority and upward facts | Ordinary cover/assault/withdrawal decisions and automatic suppressor assignment |
| Module 20 hardpoints | Reservation, ingress, aperture, maintenance and release | Automatic station selection/claim; an explicit request may use the owner's claim service |
| Module 44 `afterDrill` | Explicitly classified emergency survival interruption | Ordinary shared-contact halts and autonomous cover choices |

Gate both Meso paths and the ordinary Micro/positional policies through the same
authority. Do not skip entire mixed functions: retaining all of `executeMission` leaves
legacy decisions active, while skipping it loses Macro acceptance and dismount adoption.
The same separation is needed between Engagement's contact reporting and its suppressor
assignment. Keep SquadAI's passenger/player gates and its perception → Engagement →
resolver pipeline. Emergency survival remains owner-mediated and must cancel or suspend
an affected skill explicitly, with a reason, rather than masquerade as utility selection.

| Capability | Existing authority / interface | Remaining adapter boundary |
| --- | --- | --- |
| Movement / hold | Meso personal publication, Command Reception, Movement Resolver, Navigation and `BattleExecutionOutcome.man` | Publication is currently private to 16. Expose a guarded owner request; do not reuse fireteam policy merely to publish or add a destination writer. |
| Posture / fire | Engagement and 19b | `requestStance` only lowers posture; `requestState` exposes specific requests, not a generic tactical move/fire API. Keep adopted ROE, weapon, ammo, settling, range and geometry checks. |
| Cover / station | Engagement cover owner and module 20 `claim` / `release` | Selection/claims can mutate. Owner acceptance and release must be explicit; a fact projection cannot call these as pure readers. |
| Mission / transport | Commander `acceptMission`, Meso adoption and module 58 journey lifecycle | Preserve supersession, boarding/dismount and restored route adoption; skills never write mission status, seats or physical passenger state. |
| Resources / outcomes | Existing native leases/claims and 18a execution outcomes | Arbitrate squad/member requests without a second priority table or outcome tracker. Preserve player, reload, reaction, retreat and station obligations. |

Movement evidence has separate publication, personal adoption, Meso application,
resolver selection and physical arrival stages. A request passing validation establishes
none of them. Correlate owner evidence with the same command envelope and full action
tuple; a different mission's arrival cannot finish the current action. Real support fire
also needs independent qualified shooters and actual owner-reported discharge/continuity;
an accepted fire request or support count alone does not prove covering fire.

`battle/tactical-capability-contract.js` and its focused harness define detached,
executable request/receipt validation only. The two loaders (`battle_sim.php`,
`battle_sim_local.php`) and the deploy plan load it as a plain runtime beside the Commander;
module discovery does not, and it registers no system. It supplies no live adapter, controller, lease
manager, firing permission or proof that supplied evidence is true. Existing owners must
produce the evidence in a later runtime integration; no gameplay acceptance is implied.

`battle/modules/13b-tactical-owner-adapters.js` (`BattleTacticalOwnerAdapters`) is that
integration for every capability. A provider passes `adapters` and
`lifecycle` from it to `registerProvider`. Each adapter only bridges a validated request to
the owner call named in the contract: Engagement `requestStance` (lowering only, for the
owner's `STANCE_HOLD`/`PRONE_HOLD`), module 20 `claim`/`release`, Commander `acceptMission`,
module 58 `considerMission`/`finish`. `stage(request)` reads the owner's own state and returns
`{stage, reason, at}` in the contract's stage names (`committed`, `assigned`/`occupied`,
`executing`, `boarding`/`embarked`, `released`, or `cancelled` with the owner's reason). Every
provider must supply that `stage` with its `cancel` and `release` (`missing-lifecycle:stage`
otherwise), and the controller's `summary().live` lists each live or cleanup-pending action with
its stage, reason and `since` (the owner's own time for that change), so a stalled action names where it stopped; a report that
throws reads as `unknown: stage-fault`. A dismounting squad keeps `transport.*` unreleased, so a
switch waits for the dismount to end. Handles live in a WeakMap keyed by the request
object; the module adds no field, timer, lease or writer.

Movement goes through the two existing movement owners. `movement.move` calls module 16's owner
entry `BattleSquadStability.controllerMovement.publish(sq, sim, man, point, key)`, which publishes
the man's personal order through the same `publishPersonalMovement` path as a fireteam slot
(publish key `controller:<actionId>`), so Command Reception adoption and resolver arbitration are
unchanged. Under the controller `updateFireteams` does not run for the squad, so Squad Command
carries these orders on its own tick until the controller ends them (`controllerMovement.end`);
the orders live in a WeakMap in module 16. A man in survival movement is refused. The stage is
the execution outcome reader's (18a) state for that publish key: `published` (pending, at the
envelope's `issuedAt`), `adopted` (at `adoptedAt`), `applied` (held by a higher authority, reason
`held:<by>`), `resolved` (executing or blocked), `arrived`; with `?commandMovement=0` it is
`applied: adoption-off` at once. `movement.hold` is one native resolver `hold` proposal from
source `tactical-controller` with no expiry of its own (`ttl` Infinity), so nothing refreshes it:
the resolver ends it when the squad's phase, plan or retreat changes or a higher authority
replaces it (`cancelled: owner:replaced`). Its stage is `resolved` when it wins arbitration,
`holding` within the resolver's `arrival` distance, or `accepted: outranked:<kind>` while a post
or other authority wins. Cancel withdraws only that proposal. The resolver keeps no time for
selection or arrival, so those stages carry the first read that saw them.

S1b–S1f selects the remaining Squad Leader skills in provider 13c. Module 16's
`controllerSkills.plan` reuses the native defensive-post, stable-regroup, scout/hold,
structure-order and retreat geometry, collecting personal intents instead of publishing
legacy fireteam slots or team movement envelopes. Each intent becomes `movement.move`
with an optional `skill` label. The movement adapter accepts that label only against the
same-tick owner plan, current skill, actor, mission and point; urgency, non-spatial recon
holds and survival exceptions are derived by the owner, never supplied by the caller.
Command Reception and the resolver still own adoption and physical movement. A main-body
recon hold latches its receipt position once. Structure observation recognizes the adopted
controller action by its native order key. Cancellation never resurrects the same intent;
a changed native intent or a new mission/roster/controller tuple permits a new selection.
The summary's `squadSkill` reports the selected skill, live action count and refusal/stop reasons.

Regroup review runs at the provider's commander tick; recon selection and structure-leg
handoffs run in its mission policy; structure-plan review runs in its fire-and-movement
policy. Native recon lease reconciliation, retreat/rally/succession lifecycle, geometry,
leases, post claims, physiology and transport adoption remain with their existing owners.
`controllerDefensivePosts=0`, `controllerRegroup=0`, `controllerRecon=0`,
`controllerStructureClearing=0` and `controllerRetreatSkill=0` independently restore those
retained paths. Legacy mode stays on the original publishers. The earlier
`controllerRetreat=0` control keeps its original meaning. These switches are forwarded by
the preview launcher. Offline coverage does not establish browser/battle acceptance.

`battle/modules/13c-tactical-march-provider.js` (`BattleTacticalMarchProvider`) is slice 2 of the
replacement: the first provider, on only under `?tacticalController=new` (one flag for both sides).
It takes every squad at battle start and on each commander tick through `requestMode`, and runs foundational march/contact skills. `executeMission` advances its own leg index along the retained `sq.route` once the
squad's centre is within the doctrine's `routeArrivalRadius`; `squadCommand` asks each man once
per leg for `movement.move` to his slot in Meso's formation layout (`BattleSquadStability.
formationSlots`, the pure form of 15g's team offsets and in-team slots) around the leg point,
finishes the old leg's orders when the leg changes, and on the last leg turns an `arrived` move
into a `movement.hold` at the slot. It reads each action's stage through the dispatch context's
`stage(actionId)`, the same owner read as `summary().live`. An order the owner ended is not asked
for again on that leg, and the man is listed as stopped with the owner's reason; a refusal changed
nothing, so it is asked again after the next mission tick and listed as stopped while it lasts. Retreat (squad state or command phase) wins:
on a retreat the provider finishes every order and hold at its owner and asks again once the retreat
ends. The preview launcher forwards the flag; with the flag but no contract on the page, the
provider warns and legacy keeps every squad. Mission acceptance, transport, casualties, succession, retreat, rally
recovery, physiology and reactions stay with their owners.

The provider converts reserve/hold and final-objective capture/defend intents through
`mission.execute`, a squad capability with no retained resource. Its selected leg, phase and point
go to `controllerMission.publish` in the existing mission-execution owner (15l); phase changes still
use 16's transition machine, and the owner checks controller authority, mission version and route
bounds. An `applied` receipt means that owner state matches the request, not that soldiers arrived.
Completion/release does not roll back the mission. Macro acceptance and retained transport adoption
still precede dispatch. On the owner's once-only transport handoff, the provider consumes the adopted
route index, ends its own old move/hold actions and republishes through normal personal adoption,
including when the carrier finishes on the same leg. Other cancelled actions remain terminal.

Ending an owned Meso movement proposal retires its `orderDestination` rather than retaining the man's
release position as a command. With no remaining squad order, the resolver's formation fallback is
the current physical position; a later combat bound therefore cannot revive that released point.
Live combat, player, retreat, station and fresh Meso intents keep their existing arbitration.

Slice 3 adds the independent `13d-tactical-contact-skills.js` module. It selects HOLD, PRECISION,
OPEN and personal suppressor roles without calling legacy `updateFireControl`, `assignSuppressors`
or `decide`. Target changes preserve the current preparation episode clock; HOLD and PRECISION
end at the existing `maxHold` deadline. A missing firing line releases locomotion to the route
provider. This is foundational firing, not coordinated covered-bound acceptance.
After OPEN, the readiness/marksman preparation scan is skipped; targetless suppression candidates
also skip personal-target observation. `readinessAt` dates the last preparation sample. Live target,
suppression and native firing gates continue to run, and shared eyewitness sectors remain valid
position-only intelligence.

`13h-tactical-ambush-skill.js` (`BattleTacticalAmbushSkill`, `?controllerAmbush=0` turns it off) carries
the legacy concealed firing line (15o, `?localPlan=1&localAmbush=1`, which never ran under a controller)
through capability requests. From fresh own-faction reports, with no contact and no pressure, each
uncommitted rifleman takes the first post that `BattleCoverPositions.maskedPost`/`maskedApproach` accept
(three men minimum): `movement.move`, then `movement.hold` on arrival, `minimumHold` 4 s, then the line is
ready and the contact skills fire on first-hand contact. The march and the station skill yield to a man it
holds. Contact before ready, pressure, a lost threat or masking, a retained skill, a retreat, an owner
ending a man's action, or the 12 s preparation/observation budgets release every man through his owner. A casualty
anywhere in the squad changes the controller's roster revision; the controller keeps the survivors' actions
(`rosterKeep`), so the skill ends the line as a `casualty` and releases them before its state is reset
(`?controllerAmbushRelease=0` restores the old reset that left the survivors on posts nobody released).

`13i-tactical-flank-assault.js` (`BattleTacticalFlankAssault`, `?controllerAssault=0` turns it off) is the
Squad Leader's flank and assault decision. Legacy 15j only bounded a team frontally and labelled the
fireteams' flank tasks (16 `tasksFor`). In contact on an assault or flank brief (approach, assault or flank
phase), with the Squad Leader's own bound-threat reports between one covered hop and 160 m away, bravo
(charlie if bravo cannot go; two movers and two supporters minimum) heads for a point 60 degrees round the
reported enemy on its own side, at the squad's current range; at a 45 degree crossing angle (or on that
point) it assaults the reported position. It moves nobody: the covered-bound skill (13e,
execute-covered-bound) reads `goal()` for its hop goal and drafts only that team, so the rest of the squad
is the base of fire, and Meso's `controllerBound` accepts the skill's goal as a forward window. Retreat, a
retained skill, a mission change, lost contact, a depleted team or base of fire, a new 13e no-hop stall, the
flank budget (its length at 0.6 m/s) or closing to 8 m ends it with a reason in `summary()` (also
`BattleTacticalMarchProvider.summary()[].flank`), and the frontal hop is the answer again.

`13j-tactical-general.js` (`BattleTacticalGeneral`, `?controllerReconstitution=0` turns it off) is the
first Macro slice (roadmap `docs/architecture/AI_SKILLS_ROADMAP.md` section 8, M0 and M1). The controller
keeps one command unit per side (`TC.commandUnit(sim, faction)`, id `@us`/`@ge`, no men) taken by 13c's
`takeAll`; commander-ai's `updateFactionCommander` dispatches `generalTick` on it and skips its legacy
`reconstitute`/`pickUpFled` when the policy owns it. The policy reuses 22's chooser (`planGroups`), asks
`command.reconstitute` for each group (adapter: 22 `formGroup`; stage `briefed`, then `merged` or cancelled
with the owner's dissolve reason), runs 22's own merge/dissolve step (`progressGroups`) and asks
`command.pickup` for each fled pickup (`bestPickup`/`absorbFled`). A cancel (restart, switch) dissolves an
assembling group through its owner. Slice M2 (`?controllerRecovery=0`): the policy also runs the
strategic recovery ladder. 22a exposes `planRecovery`, `adoptionHold`, `runStage`, `reviewDue` and
`runReviewPass`; the policy opens one `command.recover` action per stall episode (`episode` = the side's
last objective-progress time) before the first stage or review it runs, and finishes it `recovered`
when the episode changes. Slice M3 (`?controllerBriefs=0`): the
policy runs the General's per-squad wake rules (22a `wakeReason`) and opens one `command.brief` per wake;
its adapter re-selects through 22a `reconsiderMission` and the brief goes out through `issueMission`. The
action stays `issued` until the Squad Leader accepts it (`accepted`, or `unchanged` when the wake deduped)
or the brief is replaced. Slice M4 (`?controllerTransport=0`): after the briefs the policy asks 58
`quoteMission` (pure) whether a truck can serve each squad's executing brief and opens one
`command.transport` per grant (adapter: 58 `considerMission`; stages `boarding`, `embarked`, released
when the ride ends; a cancel calls 58 `finish`). The reserve commit is a wake (`reserve-commit`) and so a
`command.brief` since M3; a truck granted at publication stays inside `issueMission`. Each slice marks what it owns in the dispatch facts (`facts.owned`), and
commander-ai runs every Macro decision not marked there as before. Readout:
`BattleTacticalGeneral.summary(sim)` and `TC.summary(sim).commanders`.

`fire.control` asks `controllerFireControl.publish` in Meso to use 15a's existing publisher;
`published` explicitly does not imply personal adoption. Engagement still uses each man's adopted
order and retains immediate return fire. `combat.contact` holds locomotion/posture/weapon resources
and executes native recognition, preparation, firing, suppression or pinning through Engagement.
`combat.march` holds only posture/weapon resources and reuses native transit posture while Meso
owns locomotion. Native recognition, march posture and pinning executors are shared with legacy;
controlled firing never invokes legacy cover/assault selection. The contact module releases a
changed role before the route provider can acquire its locomotion. Survival bounds keep their
native execution, while subsequent ordinary choices return to the controller. All three capabilities
release only their own owner handles on cancellation; mission, roster, retreat, possession and
restart preserve the controller lifecycle contract. No automatic station selection or directional
covered bounds are introduced.
`BattleTacticalMarchProvider.summary(sim)` lists per squad the leg, each man's action and owner
stage, and why any man was stopped. Without the flag the module registers nothing.

Before activation, prove exclusive dispatch in both Meso paths and ordinary Micro/station
policy, retained safety/adoption/transport, and cancellation on mission, membership,
possession, transport, mode and generation changes. Then validate foundational skills,
one directional covered-bound skill and a second independently registered complex skill.
Use pinned equal-force 2 km/5 km normal/dense natural battles, actual shots, rotations,
arrivals, mover/holder casualties, retreat completion, objectives, kills and CPU. Existing
fixture success and #646–#653 gate experiments do not constitute this acceptance.

In the opt-in front-lines scenario, `BattleFrontLines.garrisonFor` is a read-only
request for one present squad to secure the exposed held line; Force Command
issues and releases the ordinary defense brief. Macro also considers nearby
free transport for an existing accepted foot mission. Transport invalidates the
suspended infantry navigation cache through Navigation, and the Squad Leader
resumes its own route segment after either arrival or an interrupted ride.
Capture zones count deployed infantry only: boarding/embarked passengers cannot
capture, neutralize, or contest a flag while a truck crosses it. Screen transport
keeps the secured objective as an explicit road junction before the forward post.
`BattleSquadTransport` owns journey occupancy reads: `isPassenger(s)` is the active boarding/ride/dismount commitment used by movement and capture; `carrierId(s)` grants own-carrier LOS exclusion only to admitted, unexited occupants (or the legacy fully embarked task); `seatedIds(squad)` is a detached presentation projection of admitted minus exited IDs, retaining the historical boarding-prefix fallback. These queries read the current task without a cache. Fleet/journey mutation, positions and boarding policy retain their existing owner.

Boarding requests an upright stance through Engagement before physically walking;
Engagement retains HOLD/PRECISION preparation posture when another movement plan
supersedes its hold proposal. Repeated fled detachments have distinct identities,
including against retained empty squads in command history and diagnostics.
