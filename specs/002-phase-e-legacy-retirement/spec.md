# Feature Specification: Phase E, retire the legacy tactical decision paths

**Feature Branch**: `claude/project-thread-9savpi` (readiness tooling); each retirement slice gets its own branch

**Created**: 2026-11-28

**Status**: Draft

**Input**: User description: "Final V1 controller acceptance: prepare for Phase E. Reconcile #815 and its related PRs, resolve the deterministic writer conflicts, complete the controller ownership audit, investigate the performance gate failure, close the physical acceptance gaps, and prepare the Phase E retirement plan (Meso, then Macro, then Micro) without deleting legacy paths." (Ivan, 2026-11-28)

**Authorization**: none yet for any deletion. This spec asks for the owner's go-ahead (constitution IX). The [Phase E rollback exception](../../docs/agents/spec-kit.md#phase-e-rollback-exception) applies only to slices the owner authorizes one by one. Out of scope throughout: parked PRs #825, #826, #827; Fable's event-driven squad layer and `scanReject`; experimental order-envelope or knowledge architectures; Cursor's ECHO and AI V2 scheduler; the deferred #817 geometry caches.

## Current state (verified 2026-11-28 on `main` `f0e64f5`)

Only one runtime change reached `battle/**` since the #815 campaign source `24a84de5`: #824 (K1 seen-death perception, `battle/squad-ai.js`). Everything else since then is CI, docs, deploy or the grass removal (#828 to #839).

| Item | State | Evidence and what it still proves |
| --- | --- | --- |
| #815 combined acceptance | **CONDITIONAL** on `24a84de5`, Mac and hosted ([verdict](https://github.com/APPARANYX/bound-by-glory/issues/815#issuecomment-6786823216)) | Liveness clean on 120 paired battles (0 errors, 0 movement/route/targetless stalls); causal pack and probe pack PASS; Macro-off and legacy rollback identity PASS (4 meeting seeds each); transport live journey PASS (longest ride 2.8 km). Fails: wall gate on all maps; writer conflicts US 8 / GE 4 on the controller arm; S1b-S1f lack physical receipts; full-off identity (batch 9) open. Gameplay was byte-identical across Mac and hosted, so the conflicts are deterministic. |
| #824 K1 | Merged `13cc6c96` | PR-head CI, Skills Lab and strategic replay green on `9d0a968d`; the 11-11 bounded retest on merged main (K1 physical, six conflict seeds) **never ran**. K1 changes contact knowledge, so every #815 battle result is history for acceptance on current main. |
| #814 | Merged `01466b8d` | Docs only. Superseded in part by this spec and the 2026-11-28 roadmap refresh. |
| #793 M3 briefs and `controllerReleaseFinal` | Merged `b91ceacd` | Merged on the owner's word without a Muse gate; its expected "0 US conflicts" did not hold on the combined head (#815). |
| #799, #808 fire-silence observers | Merged `65fd2236`, `08fb3cef` | Observer tags show which branch decided; not tactical correctness. Runtime unchanged since, so the instrumentation evidence stands. |
| #810 covered-bound recovery | Merged `b47e1b54` | Focused exact-head lab evidence on its head. The post-#810 cancellation path never re-fired in #815 drill traces, so it is not yet shown on the combined head. |
| #798 S1b-S1f | Merged `6f539405` | Merged with an acknowledged mixed lab result; no natural or drill receipts for posts, regroup, recon on the controller (#815). |
| #812 v622 playtest | Open, parked | Observations, not proven defects; triaged under FR-012. |
| #835 early stop | Merged `f0e64f5` | Standard paired benchmarks play 20 seeds first; `early_stop=false` plays every seed. Applies to all gates below. |

**Evidence reuse rule for this project.** A result stays valid for a later head only if the diff between the two heads touches no file the test reads (`battle/**`, `battle_sim*.php`, `runtime-contract.php` for flag forwarding). Under that rule: the causal and probe pack PASS, Macro-off identity and transport PASS on `24a84de5` are **history** for current `main` (K1 touched `battle/squad-ai.js`), but they set the expectation; the next exact-head run re-confirms them rather than re-proving from scratch, and a K1-only regression in them is a K1 finding. Tooling-only heads (#840) leave every battle result valid.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - One writer per field on the defense maps (Priority: P1)

The controller arm raises order-writer conflicts on fixed US and GE defense seeds that the legacy arm never raises. Before legacy code is deleted, each conflict must be traced to its two writers, the root cause fixed at the owning layer, and the six seeds must read 0 conflicts on the controller arm.

**Why this priority**: the single-writer rule is the ownership guarantee Phase E depends on; a conflict that survives into a retirement slice would have no legacy arm to compare against.

**Requirements**: FR-001, FR-002, FR-003

**Owner (layer and capability)**: Meso, Squad Command (module 16) for personal movement publication and `orderDestination`; prepared defense (00-defense-plan, 21) only as the reader of posts; Movement Resolver stays the sole `destination` writer. Exact owner to be confirmed by the #840 probe run.

**Independent Test**: the `writer-conflict-sites` probe on US defense `815-accept-20261110-0008`, `-0010`, `-0011`, `-0018` and GE defense `-0004`, `-0010` names every conflict's writers; after the fix, the same probe and the standard benchmark on those seeds read 0 conflicts, with `sameBattle` probe/control identity.

**Acceptance Scenarios**:

1. **Given** current `main`, **When** the probe runs on the six seeds, **Then** each conflict lists field, soldier, owners, calling sites and command state (phase, controller mode, mission version, publish key, envelope).
2. **Given** the fix, **When** its Node regression replays the traced sequence, **Then** it fails on `main` and passes on the fix, and the fix's off flag restores `main` exactly.
3. **Given** the fix head, **When** the six seeds run paired, **Then** the controller arm reads 0 writer conflicts and no new stall, error or loop class.

---

### User Story 2 - Every capability has one decision owner, and legacy decisions do not run under the controller (Priority: P1)

An audit of every decision entry point names, per capability, the intended owner, the runtime owner, the shared execution owner and the legacy duplicate, and confirms that no legacy decision runs for a controlled squad or soldier. It is the removal and retention contract for each slice.

**Why this priority**: it is what each retirement slice deletes and keeps.

**Requirements**: FR-004, FR-005

**Owner (layer and capability)**: read-only audit; no state changes.

**Independent Test**: the hot-path profile (#840) shows no legacy decision function's time under `controller.dispatch.*` or for controlled squads, and `wire-map-check.js` names no new writer.

**Acceptance Scenarios**:

1. **Given** the audit table below, **When** a reviewer follows a row to the code, **Then** the named dispatch site gates the legacy branch and the shared service runs in both modes.
2. **Given** the controller and legacy profiles on one seed, **When** compared, **Then** any legacy decision function still costing time on the controller arm is either a retained service or a filed duplicate.

---

### User Story 3 - The speed gap is measured, waste is removed, and the rest is a stated owner decision (Priority: P2)

The controller arm ran 1.825x / 1.674x / 1.635x legacy wall (hosted, meeting / US / GE) against the 1.25x gate. The gap is split into legitimate extra tactical work, duplicate processing, decision frequency, repeated geometry and perception, diagnostics, allocation, and conflict churn. Confirmed waste is fixed inside the current architecture; the remainder is quantified for an owner decision. The gate is not waived and tactical activity is not cut to pass it.

**Why this priority**: the owner keeps the 1.25x gate for Phase E too (2026-11-28); retirement itself will remove some cost, so the measurement must also show what retirement saves.

**Requirements**: FR-006, FR-007, FR-008

**Owner (layer and capability)**: each fix at the module that owns the wasted work; profiling tooling is diagnostics only.

**Independent Test**: profiles on the same seed in both arms (#840 Task 2) attribute the extra wall to rows; each waste fix shows same-seed deterministic identity (behavior-preserving) and a lower wall.

**Acceptance Scenarios**:

1. **Given** the two profiles, **When** their rows are differenced, **Then** each extra second is assigned to one of the seven classes in FR-006.
2. **Given** a behavior-preserving waste fix, **When** run on the same seed with its flag on and off, **Then** the final state fingerprint is identical and wall is lower.
3. **Given** the gap left after waste fixes, **When** reported, **Then** the owner gets one decision card with the numbers.

---

### User Story 4 - Physical acceptance on the combined head (Priority: P2)

Real battles show each S1 skill adopted, executed and ended by men who physically move; covered bounds, suppression, transport, retreat/rally/reconstitution, late-battle liveness, fire-silence explanations, K1 boundaries and rollback identity are shown on the exact head that Phase E starts from.

**Why this priority**: #815 left S1b-S1f, post-#810 cancellation, K1 and full-off identity unproven.

**Requirements**: FR-009, FR-010, FR-011, FR-012

**Owner (layer and capability)**: Muse/Kit executes; owners as in the audit.

**Independent Test**: `s1-skill-episodes` on natural battles (#840) plus the existing Skills Lab, drills, transport and 900 s runs, all on one pinned head.

**Acceptance Scenarios**:

1. **Given** ten natural battles, **When** `s1-skill-episodes` runs, **Then** each of the five kinds that the scenarios call for shows episodes with men who moved and arrived, or the absence is a recorded finding with a staged-drill follow-up.
2. **Given** `?tacticalController=legacy`, **When** compared with the same seed on `main` legacy, **Then** every field is identical (this is the full-off identity, FR-011).

---

### User Story 5 - A retirement sequence that can be reviewed slice by slice (Priority: P3)

The plan below names, for Meso, Macro and Micro, exactly what each slice removes and keeps, its prerequisites, flags, rollback, gates, expected simplification and how its speed effect is measured, plus the immutable pre-Phase E reference.

**Requirements**: FR-013, FR-014, FR-015

**Owner (layer and capability)**: each slice removes only legacy decision branches of its own layer.

**Independent Test**: `speckit.analyze` reports no CRITICAL finding; the owner reviews and says go per slice.

**Acceptance Scenarios**:

1. **Given** slice E1, **When** its PR is reviewed, **Then** every removed function is listed here and every kept service is still called.

### Edge Cases

- A conflict seed reads 0 on current main because K1 changed the battle: the probe is re-run at `24a84de5` to name the original writers; the fix is still required if the traced path exists on main.
- A conflict is a diagnostic mislabel (one owner reached through two hook contexts, as #793's rally case was): fix the attribution only if the transitions are valid (project philosophy: never hide a real AI problem).
- A skill kind that a map never calls for (structure clearing on a map with no enterable building in reach): absence is not failure; a staged drill covers it.
- Phase E removes the legacy arm the speed gate is measured against: see FR-008.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Every #815 controller-arm writer conflict MUST be traced to field, soldier, both writers' calling sites, ownership transition, command generation (mission version, publish key, envelope) and lifecycle condition, on current main and, if it no longer reproduces there, on `24a84de5`.
- **FR-002**: The fix MUST be at the owning layer and MUST NOT suppress the diagnostic, add a cooldown or timer, or block a legitimate tactical transition. It ships behind its own off flag; `?tacticalController=legacy` stays identical to `main`.
- **FR-003**: A deterministic Node regression MUST fail on the pre-fix code and pass after it.
- **FR-004**: The ownership audit MUST cover every decision entry point (`squadCommand`, `commanderTick`, `fireAndMovement`, `executeMission`, `engagement`, `stationSelection`, `generalTick`, the Micro soldier slots) and the capabilities listed in the audit table.
- **FR-005**: For each capability the audit MUST distinguish legacy decision code (removal candidate) from shared skills, scorers, effectors and execution services (retained).
- **FR-006**: The wall-time gap MUST be attributed to: legitimate extra tactical work; duplicate legacy/controller processing; decision frequency; repeated geometry and perception queries; diagnostics and telemetry; allocation and copying; conflict-driven churn.
- **FR-007**: Confirmed waste MUST be fixed within the current architecture, each behavior-preserving fix proven by same-seed identity and each behavior-changing fix behind its own flag; none of the excluded experiments may be ported.
- **FR-008**: The speed gate MUST stay 1.25x. Before the first retirement slice, the benchmark MUST be able to run the off arm on the pinned pre-Phase E reference with `?tacticalController=legacy` in the same run as the candidate, so each slice's speed is still judged against legacy on the same runner.
- **FR-009**: Each S1 skill (S1b defensive posts, S1c regroup, S1d recon, S1e structure clearing, S1f retreat) MUST show natural adoption, physical movement, completion or a named termination, on the controller, on the pinned head; absence on natural battles MUST get a staged drill.
- **FR-010**: Physical gates on the pinned head MUST cover: Skills Lab and repeatable reset; covered bounds and the post-#810 undeliverable-order cancellation; multi-leg march into contact; strategic transport (quote, board, ride, dismount, follow-on mission, seat legality, a possessed passenger); retreat, rally, reconstitution; 900 s late recovery; native fire-silence explanations; K1 firsthand versus reported death knowledge.
- **FR-011**: Rollback identity MUST be shown for `?tacticalController=legacy` (the full off, per #815 batch 9) and each Macro, Meso and Micro slice flag independently.
- **FR-012**: #812 and roadmap section 9 items MUST be triaged as before-E only if they reproduce as a safety, authority or liveness fault on the pinned head.
- **FR-013**: The retirement MUST run as three slices in order Meso (E1), Macro (E2), Micro (E3), each its own PR with the owner's word, each listing removals and retentions as below.
- **FR-014**: An immutable annotated tag MUST pin the last accepted `main` where `?tacticalController=legacy` works, before E1 merges.
- **FR-015**: Each slice MUST pass CI, Muse/Kit physical validation and the paired gates on its exact head; rollback is a revert of that slice's PR.

### Key Entities

- **Decision entry point**: a call site where a legacy owner asks `BattleTacticalController.dispatch`/`controls` whether a provider owns the decision.
- **Retained service**: owner code that runs in both modes (casualties, succession, acceptance, transport adoption, physiology, effectors, scorers).
- **Legacy decision branch**: code that runs only when `controls` is false; the removal unit.

## Controller ownership audit (2026-11-28, `main` `f0e64f5`)

Static audit from the dispatch sites; the runtime column is confirmed or corrected by the #840 profiles and probes (T005, T006). "Legacy branch" is what Phase E removes; "shared" stays.

| Capability | Intended owner | Runtime owner under the controller | Shared execution / services (retain) | Legacy decision branch (removal candidate) | Authority transfer | Slice |
| --- | --- | --- | --- | --- | --- | --- |
| Mission choice, briefs, main effort | Macro command policy 13j `command.brief` | 13j (`facts.owned.briefs`) | `commander-doctrine.js` scorers, `issueMission`, `selectMission` as a pure scorer | `commander-ai.js` `wakeReason`/`reconsiderMission` per squad when briefs not owned; 22a `chooseMainEffort` call path | `generalTick` dispatch on the side's command unit each 0.45 s tick | E2 |
| Mission adoption | Meso `mission.accept` (13b adapter on Commander's transition) | Commander transition via adapter | `BattleCommanderAI.acceptMission`, `_macroMission` lifecycle | none (shared) | brief version change cancels old actions | keep |
| Reconstitution, fled pickup | 13j `command.reconstitute`, `command.pickup` | 13j | 22 `chooseGroup`, `formGroup`, `dissolveGroup`, `mergeGroup`, `pickUpFled` effectors | `commander-ai.js` direct `reconstitute`/`pickUpFled` call when not owned | `generalTick` | E2 |
| Strategic recovery | 13j `command.recover` | 13j | 22a stage effectors (release, reset, flank point) | `runStrategicRecovery`/`runReviewPass` direct path | `generalTick` | E2 |
| Transport allocation | 13j `command.transport` | 13j | 58 `quoteMission` (pure), journey, seats, `isPassenger`, boarding/dismount | `considerMission` per-squad call in `updateFactionCommander` when not owned | `generalTick`; passenger lock from boarding to last dismount (13a) | E2 |
| Transport ride and resume | 58 journey | 58 | 15l `adoptTransportArrival` (runs in both modes) | none | embark skips 16 commander tick | keep |
| Command reception, cancellation | 18 Command Reception | 18 | publish, adopt, `executionCurrent`, envelopes | none | n/a | keep |
| Route progression, phase, hold | 13c `mission.execute` | 13c (single writer since `controllerSingleWriter`) | 15l `sq.routeIndex` owner, `setPhase` | 15l `executeMission` uncontrolled branch (route progression, local phase, recon hold) | `executeMission` dispatch | E1 |
| March, anchor, fireteam slots | 13c `movement.move` through 16 | 13c via `controllerMove` | 16 `advanceSquadAnchor` (paced by the provider's leg), `updateFireteams` as skill geometry with an injected publisher, 15g `slotsAt`, 15h fireteams | 16 `squadCommand` legacy tail: `advanceSquadAnchor(sq)` with the legacy target, `updateFireteams` default publisher, `publishForwardLine` | `squadCommand` dispatch | E1 |
| Contact acquisition and loss | Perception (`squad-ai.js`) | Perception | beliefs, `soldierContact`, K1 `seenDeath`, callouts | none (shared) | n/a | keep |
| Contact drills (orient, alert, advance hand-back) | 13d `combat.contact`/`combat.march`, 13k drill slot | 13d, 13k | Engagement recognition, march posture, pinning executors | Engagement `runDrill` switch `orient`/`alert`/`advance` for controlled squads (already skipped via `controllerCombatTick`) | `engagement` dispatch per soldier | E1 (squad drills), E3 (soldier slot fallback) |
| Fire control (HOLD/PRECISION/OPEN) | 13d `fire.control` | 13d | `sq.fireControl` state read by Engagement, 19b `fireAllowed` gates | 15a `updateFireControl` and 15j legacy body | `fireAndMovement` dispatch | E1 |
| Suppression and suppressor jobs | 13d personal suppression | 13d | `areaFire`, ammunition (46) | Engagement `assignSuppressors` (skipped when controlled), 15j suppressor assignment | `fireAndMovement` / Engagement `updateSquad` | E1 |
| Covered bounds | 13e `maneuver.cover`, `combat.bound` | 13e | 16 `controllerBound` lease, cover slot reservation, Engagement `bound` executor | 15j bound selection and cycle, 15n bound tasks, Engagement `decide` cover/assault for controlled squads | `fireAndMovement` | E1 |
| Flank and assault | 13i | 13i | 13e bound, grenade owner `assaultOpportunity`/`assaultThrow` | 16 legacy assault authorization (`controllerAssault` path) | `fireAndMovement` | E1 |
| Recon | S1d through 13c `movement.move` with `skill: recon` | 16 retained skill via provider | 15c scout task, recon lease lifecycle, report delivery | 15j/15l legacy recon start and hold, legacy publisher for recon | lease `recon` | E1 |
| Regroup | S1c | 16 retained skill via provider | 15m `updateCohesion` (review), regroup lease | 16 commander tick `updateCohesion` legacy branch when regroup skill off | lease `regroup` | E1 |
| Defensive posts, stations, structures | S1b posts, S1e structure, 13f `station.claim` | 16 retained skills via provider; 13f | 20 `claim`/`release`/ingress/aperture, 21 engineers, 00-defense-plan posts | 20 automatic station selection (`stationSelection` legacy), 15n/15o local plan and postures | `stationSelection`, commander tick | E1 |
| Grenades | 13d grenade drill, `controllerGrenade` policy | 13d | 23 inventory, arcs, clocks, `assaultOpportunity` | 23 `consider` opportunistic path in Engagement `decide` | Engagement dispatch | E1 |
| Withdrawal, retreat, rally | S1f retreat skill, 15f/15e retained | 16 retained retreat via provider | 15f retreat anchor, 15e morale and rally recovery, survival extraction | Engagement legacy withdrawal drill for controlled squads; 16 legacy retreat publisher | squad state `retreat` | E1 |
| Reconstitution (squad side) | 15k with 13j | 15k | rebuild, merge | none | n/a | keep |
| Stance and personal cover | 13k `posture.set`, `cover.take` | 13k | 19b `applyStance`, 19 `reserveCover`/`releaseCover`, fact projection | inline legacy choosers in 19b (`fightingStance`, `seeingStance`, `suppressionStance`) and 19 `findCover` ranking when the slot is off | soldier slot in the drill tick | E3 |
| Personal fire and reload | 13k `fire.personal` | 13k | 46 ammunition clocks, 47 sidearm, 14-z ballistics, 19b `fireAllowed` gate | inline legacy target/shot/reload choice in 19b and 46 | soldier slot | E3 |
| Stress reactions | 13k `soldier.react` | 13k | 17 stress facts, 19a effectors (`runTo`, `goHome`, `fledTick`), weights | inline argmax in 19a `chooseBreak` and siblings | soldier slot | E3 |
| Leaderless continuation | 15d | 15d (controller-aware) | succession lease | none | n/a | keep |

**Legacy machinery that may still run unnecessarily (to confirm with T005 profiles):** module 16's per-tick `summary(sim)` after every commander tick (diagnostic read model, both arms); `updateCohesion` runs for controlled squads whenever the regroup skill is off; 15j's controlled branch runs `stressReview`/`updateCOA` (intended, `controllerSquadReviews`); the S1 path calls `advanceSquadAnchor` and `updateFireteams` to plan skill geometry every dispatch (reuse by design, but a frequency candidate). None is proven duplicate yet.

## Phase E retirement plan

Order per roadmap section 8: **E0 prerequisites, then E1 Meso, E2 Macro, E3 Micro.** One PR per slice, the owner's word per slice, merged one at a time after its own exact-head gates.

### Pre-Phase E reference (FR-014)

Annotated tag **`baseline/pre-phase-e`** on the `main` squash commit that carries the US 1 fix and the readiness tooling, after the final acceptance verdict, so the tag is the last accepted `main` where `?tacticalController=legacy` and every slice flag work. Message: the acceptance verdict link and the three wall ratios. Until then the candidate is `main` `f0e64f5`. Tags under `archive/branch/*` already exist; `baseline/` keeps the namespace distinct. Never moved or deleted; branch housekeeping must leave it.

### E0, prerequisites (no deletion)

1. US 1 fix merged and the six seeds at 0 conflicts.
2. FR-008: the standard benchmark (and launcher) gains an optional off-arm ref, so `query_off=strategicInterception=0&tacticalController=legacy` can run on `baseline/pre-phase-e` while the on arm runs the slice head, in the same run and runner pool. Without it, every slice's wall ratio would be against itself.
3. The flag inventory below confirmed by a Node check that lists every `controller*` flag with its module and class.
4. Final combined acceptance verdict on the pinned head (US 4) and the speed decision (US 3).

### Flag classes

- **Legacy-selecting flags (removed by the slice that removes their legacy branch):** E1: `controllerDefensivePosts`, `controllerRegroup`, `controllerRecon`, `controllerStructureClearing`, `controllerRetreatSkill` (16 `SKILL_FLAGS`), `controllerSingleWriter` (13c private counter), `controllerPhaseBand`; E2: `controllerReconstitution`, `controllerRecovery`, `controllerBriefs`, `controllerTransport`; E3: `controllerStance`, `controllerSoldierFire`, `controllerReactions`, `controllerDrill`, and finally `tacticalController`/`controllerDefault` themselves.
- **Controller-variant flags (stay; Phase E does not touch them):** flags inside 13a-13k and 39 that choose between two controller behaviours (`controllerCoverCache`, `controllerFastChecks`, `controllerRouteSight`, `controllerRoutePrune`, `controllerLazyBasis`, `controllerStallPace`, `controllerRefillGate`, `controllerReserveShooters`, `controllerCoaGate`, `controllerBoundRecovery`, `controllerSuppressorScan`, `controllerAmbush`, `controllerAmbushRelease`, `controllerClear`, `controllerStructure`, `controllerTransportPassenger`, `rosterKeep`) and controller fixes in shared owners (`controllerReleaseFinal`, `controllerRetreat`, `controllerSquadReviews`, `controllerLeaderless`, `controllerGunner`, `controllerGrenade`, `controllerGrenadeArea`, `controllerAssault`). Each is retired later, by its own small PR, if ever.
- T003 verifies each classification against the code before E1; a flag whose off path is legacy code moves to the first list.

### E1, Meso (Squad Leader decisions)

- **Remove:** in 16, the `squadCommand` legacy tail (legacy-target `advanceSquadAnchor`, `updateFireteams` default publisher, legacy `publishForwardLine` call), the commander-tick `legacy` branch (`_lp.update`, `_postures.update`, `resolveLeaseConflicts`, `updatePlan`) and the regroup-off `updateCohesion` call; the S1 `SKILL_FLAGS` off paths; in 15j, the body after `dispatch('fireAndMovement')` (local plan, postures, recon start, fire control, COA when uncontrolled, suppressor assignment, bound cycle); in 15a, `updateFireControl` as a decider; in 15l, the uncontrolled route/phase/recon/hold branch; in Engagement, the `runDrill` switch and `decide()` choices for squads (cover, assault, withdraw, `ambushPost`, `prepareFireControl` legacy entry, `assignSuppressors`); in 20, automatic station selection; in 44, the ordinary shared-contact halts; in 23, the opportunistic `consider` path; 15n and 15o legacy-only parts (their structure orders stay: S1e reads `currentStructureOrders`); 13c's private leg counter.
- **Keep:** 13a-13k; 16 publication (`publishPersonalMovement`, `controllerMove`, `controllerBound`, `publishAnchor`, roster, casualties, succession, `updateSquadState`), `advanceSquadAnchor` and `updateFireteams` as skill geometry, retreat anchor 15f, morale/COA 15e, buddy pairs 15b, scouts 15c task logic, leaderless 15d, clear contact 15i, formation 15g, fireteams 15h, reconstitution 15k, cohesion 15m; 15l acceptance and `adoptTransportArrival`; Engagement physiology, reactions, stations, effectors, `controllerCombatTick`; module 20 claim/release/ingress; 44 emergency survival interruption; 23 grenade owner; Movement Resolver, Command Reception, Navigation.
- **Dependencies:** E0; `wire-map-baseline.json` entries for removed writers are deleted in the same PR (the ratchet fails otherwise); `tactical-controller-owner-check.js`, `tactical-controller-check.js` legacy-identity cases rewritten to the new invariant (no legacy decision reachable), not deleted.
- **Rollback:** revert the E1 PR. `?tacticalController=legacy` still exists after E1 (E3 removes it) but no longer restores Meso legacy decisions; E1's PR body says so, and the battle page warns when the flag names a removed layer.
- **Gates:** CI; a Node check that no legacy Meso decision function is reachable from a dispatch site; Skills Lab preflight; drills; `s1-skill-episodes` and `writer-conflict-sites` on the ten #840 seeds; standard paired benchmark, three maps, 60 seeds, off arm `baseline/pre-phase-e` legacy, on arm the E1 head; causal and probe packs; 900 s meeting.
- **Expected simplification:** the largest of the three: 15j, 15l, 16, Engagement and 20 lose their dual paths; most `TC.controls` checks in those files go.
- **Speed:** measured as the E1 head with no flags versus `baseline/pre-phase-e` with no flags, same seeds (controller-to-controller, should be equal or faster: deleted code did not run), and versus the baseline's legacy arm for the 1.25x gate.

### E2, Macro (the General)

- **Remove:** in `commander-ai.js` `updateFactionCommander`, the not-owned branches: direct `reconstitute`/`pickUpFled`, direct `runStrategicRecovery`, per-squad `wakeReason`/`reconsiderMission`, per-squad `considerMission`; the four 13j off flags.
- **Keep:** 13j; `commander-doctrine.js` scorers and rules; `commander-routes.js`; `issueMission`, `acceptMission`; 22 and 22a effectors and stage services; 58 `quoteMission` and the journey; scenario rules (21b front lines, 21c/21d reinforcements, 00-defense-plan setup); `?generalIntel`.
- **Dependencies:** E1 merged and its deploy green; `tactical-general-check.js` updated so its legacy cases become owner-only.
- **Rollback:** revert E2.
- **Gates:** as E1, plus the strategic 5 km transport case and 900 s late recovery on meeting and one defense map (Macro acts late).
- **Expected simplification:** `updateFactionCommander` reduces to the `generalTick` dispatch plus scenario hooks.
- **Speed:** small; measured as for E1.

### E3, Micro (the soldier) and the switch itself

- **Remove:** the inline legacy choosers behind each 13k slot (19b stance choosers' final pick, 19 cover ranking fallback, 19b/46 personal fire and reload choice, 19a reaction argmax, Engagement `orient`/`alert`/`advance` soldier fallback); the four 13k flags; then `tacticalController`, `controllerDefault`, the battle-page default script and the legacy registration path in 13a (`legacy` mode answers become unreachable; 13a keeps `new` and `shadow` only if a test needs shadow).
- **Keep:** the fact projections (they feed 13k), 19b `applyStance`, 19 reservations, 46, 47, 14-z, 17, 19a effectors, all physiology.
- **Dependencies:** E2 merged; benchmark and probe scripts no longer pass `tacticalController=legacy` by default (the off arm points at the baseline tag instead).
- **Rollback:** revert E3; the baseline tag is the legacy replay reference from then on.
- **Gates:** as E1; Micro gates read per-soldier receipts (stance trails, cover claims, discharges, reloads, reactions).
- **Speed:** removes per-soldier branch checks; measured as for E1.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 0 writer conflicts on the controller arm on the six #815 defense seeds, and none new on the 60-seed paired run.
- **SC-002**: every extra wall second on the profiled seeds assigned to one FR-006 class; the residual gap stated per map.
- **SC-003**: each of the five S1 kinds shows natural or staged physical completion on the pinned head.
- **SC-004**: `?tacticalController=legacy` identical to `main` in every field on the pinned head; each slice flag independently identical to its documented rollback.
- **SC-005**: after E3, `grep -c "TC.controls\|TC.dispatch"` in legacy owner files drops to the retained-service gates only, and no `?tacticalController` read remains.

## Acceptance Evidence *(mandatory, this repository)*

- **Regression**: US 1 Node replay of the traced conflict (fails before); E1-E3 each a reachability check that no removed decider is callable; existing `writer-conflict-sites-check.js` and `s1-skill-episodes-check.js` for the probes.
- **Deterministic equivalence**: probe runs with `PROBE_CONTROL=1` (`sameBattle`); waste fixes by same-seed fingerprints; E slices controller-to-controller same-seed identity against `baseline/pre-phase-e` where the deleted code was unreachable.
- **Physical validation**: Muse/Kit Skills Lab, drills, natural S1 episodes, transport, retreat and 900 s on each exact head.
- **Paired benchmark**: three-part gate per slice and for US 1; speed gate 1.25x against the baseline legacy arm (FR-008).
- **Rollback**: US 1 and waste fixes by their own off flags; E1-E3 by revert under the approved exception, with `baseline/pre-phase-e` as the legacy reference.

## Assumptions

- The #815 hosted ratios are representative of current main; K1 is not expected to move wall time materially (to be confirmed by the #840 profiles).
- The six seeds still produce conflicts on current main or on `24a84de5`; if neither does, the probe is extended to the 60 #815 seeds before any fix.
- Muse/Kit is available for browser runs; if not, gates wait (Muse unavailability never waives browser QA).
