# GRASSTEX AI Skills V1 — Architecture Roadmap and Evidence Register

**Status snapshot:** 2026-11-07. **Read sections 7 to 9 first.** Sections 2 to 6 are the 2026-10-25 record of the #630 integration attempt, kept as history; #630 was not merged.

**Where we are:** the guarded tactical controller (Meso layer, `?tacticalController=new`) is on `main` with every pre-takeover item done, and the controller is the default since #785 (main aed0165, rollback `?tacticalController=legacy`). Next phase: port the Macro and Micro layers onto the same controller so all three M3C layers have one owner per decision (section 8 has the ordered slice plan). Follow-ups and known issues parked for later: section 9.

**Track:** [Issue #602 — AI Skills V1](https://github.com/APPARANYX/grasstex/issues/602) · tracker #786 (was PR #299, record in `docs/reference/AI_TACTICS_CAMPAIGN_V1_PR299_RECORD.md`) · switch #785.
**Decision rule (unchanged):** do **not** merge, deploy, or enable new gameplay by default solely because an implementation or unit test exists. Separate *implemented*, *natural-battle validated*, *accepted*, and *merged*.

> This document is a point-in-time status and forward roadmap. Check linked PRs and benchmark artifacts when updating it. The architectural A/B/C phase names in sections 2 to 6 are different from the older #299 tactical "Phase C" label.

## 1. Target architecture and non-negotiable boundaries

Introduce a **modular hierarchical Utility AI + bounded Behavior Tree skill system + existing authoritative effectors**, preserving the current Macro → Meso → Micro command chain rather than replacing it wholesale.

- **Scoped, immutable facts / blackboards:** an individual sees personal observations and properly received reports; a squad sees legitimately transmitted/adopted information; command sees upward reports. Never hand a skill hidden enemy transforms.
- **Utility selector:** deterministic, pure, bounded eligibility/score/reason computation. Hard authority, mission, ROE, freshness and safety guards cannot be overridden by utility scores.
- **Behavior Tree executor and lifecycle:** committed skill runs in bounded steps with receipts, cancellation, suspension, resource conflicts, timeouts and restart isolation; no new sprawling global state machine.
- **Shared effectors and owner seams:** Squad Leader/Meso owns squad plans and native bound leases; Engagement owns stance, fire and physical cover decisions; Movement Resolver remains the sole normal destination writer; Navigation, transport, communications and per-person Command Reception retain their owners.
- **Skill modularity contract:** ideally add one descriptor/module, one focused test, and one central manifest/config entry to introduce a skill. Skills request existing owner actions instead of modifying many unrelated owner state machines. No new parallel leases, hidden writers, flag parsers, timers or mirrored global state.
- **Modes/rollback:** legacy default; shadow evaluation changes no gameplay; narrowly scoped pilots are opt-in. Unsupported features fail closed. An off/rollback configuration must restore legacy behavior and pass deterministic comparisons.

See the detailed [AI skills contract on #630's branch](https://github.com/APPARANYX/grasstex/blob/work/ai-rearch-consolidated-20261022/docs/architecture/ai-skills-v1.md).

## 2. Phase status (implementation is not acceptance)

| Architectural phase | Code status | Evidence/status as of snapshot | Acceptance / merge status |
| --- | --- | --- | --- |
| **A — contract and ownership map** | **Implemented** in #613; consolidated into #630 | Architecture contract, loader/lifecycle, owner/provenance and invariant tests; passing checks reported by #613 | Original PR closed unmerged; consolidated stack is **draft, not on main** |
| **B — registry, immutable facts, Utility AI shadow selector** | **Implemented** in #614; consolidated into #630 | Exact legacy/shadow gameplay + complete command-history parity at one 600-s seed for meeting, US defend, GE defend; hosted restart/observer checks passed | Strong foundational evidence, but **not independently released to main** |
| **C — bounded BT scheduler and soldier pilot** | **Implemented** in #615; consolidated into #630 | Scoped soldier.crouch-on-warning actually requested one Engagement-owned crouch; local/hosted/paired checks; default-mode comparisons passed | Narrow soldier pilot validated, **not a proof of squad fire-and-maneuver**; draft |
| **D — squad skills / tactical Phase C migration** | **Implemented experimentally** in #616 plus #626–#628 and later tactical drafts | Controlled tests demonstrate firing lines, real supporters, owned bounds, arrivals and alternating teams; natural battles show *very few or zero* adopted coordinated bounds | **BLOCKED** pending representative natural same-squad chains and acceptable results |
| **E — measurable replacement and retirement of legacy decision paths** | **Not started** | No qualifying D sign-off or migration/parity gate | **BLOCKED on D**; separate approval required |

**PR lineage:** #613–#616 and #626–#628 were closed without merging because their history was consolidated into **open draft #630**. No claim that those earlier PRs or #630 are on main. #527 remains parked. #299's separate tactics work must not be implicitly declared accepted by an architectural pilot.

## 3. Evidence register — what has actually happened

### Proven platform capabilities (A–C)

- #614 reports exact shadow-versus-legacy equality for **three 600-s scenarios** with complete contiguous command publication histories. Hosted observer/read neutrality, restarts, stale actor rejection and default rollback passed. This is **one seed per scenario**, not a broad tactical performance result.
- #615 reports the native soldier posture request (US31 at 549.00 simulated seconds in one natural meeting battle), with opt-in side effects traced and unchanged Macro mission history. The pilot only exposes a limited stance effector; movement/fire/orders/vehicles are not thereby ported.
- #616 composes squad preparation, support and covered-bound skill descriptors using Meso authority, but its own acceptance notes explicitly state natural tactical completion is not established.

### Phase D: controlled success has not turned into reliable natural behavior

- #626 controlled fixtures execute native supported moves and rotation; its revised **100 paired-seed / 200 natural-battle** comparison recorded **zero authorized, adopted or physically completed reactive bounds**. Runtime gate and default-off checks passed, but tactical success did not.
- #627 recorded real preparation progress in **100-pair comparisons**: the ON arm had two verified supporters in 94/100 battles and a settled squad plus supporters in 88/100; **natural reactive bound authorizations remained zero**. Natural cover arrivals and actual prone shots were observed. This narrowed the downstream blockage to authorization/handoff rather than simply inability to take cover.
- #628 added leader-assigned firing positions behind safe cover and fixed an Engagement firing-line API arity mismatch. Its local controlled fixture demonstrates assignment, native walking and re-measured line; no standalone natural maneuver acceptance.
- #630 is the consolidated, opt-in integration candidate, not a completed end-to-end benchmark. Its description notes verify-contact only saw an enemy in **21 of 74 arrivals** and flat outcomes at 100 pairs; known lease timing/stale-versus-blocked/confidence review remains.
- #635 instrumentation identifies short squad contact episodes (median **3.4–3.9 s**) and short gaps (median **2.6–3.2 s**); fire control clears on every gap in the measured samples, then HOLD starts over. In #630 comparisons there were only **2–3 bound authorizations per 100 natural battles, with zero adoptions**. The relevant gate chain remains fire control → support/readiness → phase/task → Meso lease → command adoption → cover route/physical arrival.

### New October 25 probe pack (2 km / 5 km)

The [coordinated-bound design snapshot in #651](https://github.com/APPARANYX/grasstex/blob/work/advance-retreat-design-20261025/docs/plans/coordinated-advance-and-retreat.md) and associated probe drafts #645–#649 report:

| Contact-time / movement observation | Approximate measured result | Interpretation |
| --- | --- | --- |
| Squad-time already retreating | **35%** | Forward assault-only tactics exclude much of contact time |
| Fire control HOLD/PRECISION | **34%** | A major pre-lease gate |
| Phase/COA/task not authorized | **28%** | Maneuver cannot be selected just by adding a movement skill |
| Leader-ordered bound open | **0.09%** | End-to-end authorization remains the bottleneck |
| Already-authorized observations waiting on bound-cycle | **98.7%** of the applicable samples | Existing 7-s lease/cadence needs a precise ownership-aware investigation; do not simply delete it |
| Bound episodes that are *individual* cover moves | **~90%** | Observed movement is largely not alternating fireteam maneuver |
| Arrival at cover during these movements | **44–73%** depending on scenario | A command/target alone cannot count as successful movement |
| Casualties among moving men in meeting engagements | **~25%** | Prioritize physical survival and movement exposure |

These percentages are from particular configurations/probe windows, **not** universal probabilities or acceptance results. The categories do not form an exact 100% exhaustive partition. Retain seeds, controls, effective flags, map, combat clock and source SHA with subsequent measurements.

### Experimental findings to carry forward, not prematurely merge

| PR | Finding / test | Status and caution |
| --- | --- | --- |
| [#646 — heard cover-fire relay](https://github.com/APPARANYX/grasstex/pull/646) | Support counted only from authentic delivered fire reports | Draft; #651's evidence summary reports neutral 2-km outcomes and ~11% fewer US kills at 5 km: **not accepted as universally better** |
| [#647 — peel-back](https://github.com/APPARANYX/grasstex/pull/647) | Proposed backward covered movement using the existing bound author | Draft; often inert because pre-authority gates prevent entering it |
| [#648 — maneuver-first](https://github.com/APPARANYX/grasstex/pull/648) | Exposes a utility score competition that favors support even when maneuver is eligible | Draft; removes confidence sensitivity from that contest, which could authorize low-quality contact; requires outcome tests |
| [#649 — cover stagger](https://github.com/APPARANYX/grasstex/pull/649) | Prevents non-pinned individual moves without two heard shooters | Draft; #651 summary reports ~60% fewer individual cover moves without gain. Holding exposed men may worsen losses |
| [#650 — retreat teams](https://github.com/APPARANYX/grasstex/pull/650) | Alternating fireteam hold-and-withdraw can occur under a retreat order | Draft; #651 snapshot reports **638 holds in 60 two-km battles**, 2,646 holder-man-seconds and 66 holder deaths, with little outcome change. The PR itself still marks its paired benchmarks pending; confirm artifact provenance before claiming acceptance |
| [#651 — unified directional design](https://github.com/APPARANYX/grasstex/pull/651) | **Decision:** one execute-covered-bound skill, with forward/back direction, not separate independent algorithms | Design only; no runtime change |
| [#652 — PRECISION release](https://github.com/APPARANYX/grasstex/pull/652) | PRECISION could indefinitely block maneuver. Opt-in gate release after the existing 6-s maxHold while preserving the shooting order | Targeted local harness passed; **2-km/5-km paired battles pending** |
| [#653 — retain HOLD clock](https://github.com/APPARANYX/grasstex/pull/653) | Target change could restart the 6-s HOLD clock repeatedly; opt-in fix preserves elapsed preparation | Targeted local harness passed; stacked on #652; **paired benchmarks pending** |

**Current interpretation:** the existence of a utility-selected skill, good cover, suppression, or a retreat holding team **does not** by itself prove coordinated maneuver. The most recent targeted fixes resolve plausible time-gate defects in unit tests, not yet in natural-battle outcomes.

## 4. Remaining roadmap (ordered)

### D1 — Make the decision gates observable, correct and non-starving

**Next action:** benchmark #652+#653 against pinned controls on both the compact tactical 2-km map and normal 5-km map. Verify effective runtime flags and actual code SHAs.

- Record time in HOLD/PRECISION, number/length of rearmed fire-control episodes, support capacity, local-plan authorization, open/blocked leases, and physical bounds by direction.
- Investigate the **bound-cycle 7-s gate** using a precise lease timeline: who owns it, first publication/adoption, expiry, retry and conflict. Only change the gate if evidence shows it unfairly starves ready teams; preserve safety/real command cadence and avoid duplicate leases.
- Preserve contact confidence and received-report provenance; don't bypass mission/COA/ROE restrictions to manufacture movement.
- Re-run negative fixture tests, full owner/mission/receipt checks and default-off parity.

**D1 exit:** demonstrated removal of pathological indefinite/repeating gate delays **and** materially more qualified authorizations *without* illegal leases, fabricated supporter counts or unacceptable combat regressions. A passing local test alone does not meet this gate.

### D2 — Implement one coordinated skill for forward and backward movement

Build on #630 and #651. Name the capability **execute-covered-bound(direction)** with **direction=forward|back**, shared readiness/holder/mover/resource/action receipts, and bounded cancellation/retry/rotation.

- **Meso 15j is the sole native bound-lease author**; 15n/the proper owner scores lawful options. Existing Engagement, command reception, resolver, Navigation, cover and route owners execute the request.
- **Real base of fire:** at least two independently effective non-moving shooters with recent real discharge/callout provenance; preserve current authorization and actual ammunition, LOS and target/sector knowledge.
- **Forward:** one designated fireteam advances along a genuinely reachable covered route while the others hold and shoot; verify physically reached destination before crediting success.
- **Backward:** one designated element provides cover while the other withdraws toward lawful retreat anchors; rotate the holding team on the existing bounded cadence. Do not redefine ordinary retreat authority.
- Where fewer than four combat-capable survivors or meaningful contact is absent, return safely to the owner-defined ordinary behavior. No forced rush to exposed cover, hidden-info reads, invented weapons, teleport or duplicate movement writer.
- Keep experimental candidate flags isolated while evaluating, then **consolidate approved behavior through the central AI-skills manifest**; do not institutionalize one URL flag per final skill.

**D2 exit:** one tested, registered skill and a small number of properly owned action adapters implement both directions with traceable real movement receipts; no new owner bypass or permanent monkey-patch seam.

### D3 — Natural-battle acceptance, not staged-fixture acceptance

Use paired immutable-head **meeting / US defend / GE defend** battles at 2 km and 5 km, including the normal full-ON strategic configuration when appropriate. Record seeds/clock/config/control SHA, compare default legacy, shadow, pilot and behavior-enabled modes on the same benchmark runner.

Must show, within the **same squad and command serial**:

1. Perceived or legitimately transmitted contact and lawful task/ROE.
2. Cover/firing-line preparation, physical settlement and command adoption.
3. Two distinct qualified supporters **actually firing**.
4. A leader-authorized, personally adopted, **physically completed** covered bound while independent support continues.
5. Repeated alternating movement where conditions allow, including **controlled withdrawal** in natural retreat situations.
6. Failure paths that release resources, terminate bounded attempts, avoid unsupported rushes and preserve fallback behavior.

Report **attempts, authorizations, adoptions, arrivals, successive rotations, cover geometry/route exposure, mover and holder deaths, retreat completion time, squad losses, kills, objective captures and wall-clock cost**. Count tactical success only from natural logs, not fixture setup or a debug UI indicator.

**D3 exit:** reproducible natural-battle coordination beyond isolated rare events, with acceptable tactical/casualty/CPU tradeoffs versus the pinned control. A numerically specified acceptance threshold should be chosen using representative baseline distributions before merging; do not invent a pass threshold after seeing results.

### D4 — Consolidate and accept the integration branch

- Rebase or rebuild the reviewed stack on current main only after handling other active work and conflicts explicitly.
- Inspect every new writer/owner seam, load order, flags/profile, lifecycle, restarts, telemetry and feature rollback. Eliminate duplicate alternative tactical branches where equivalent behavior exists.
- Run the full native harness, ownership/wire map, CI, hosted browser QA, multi-scenario paired benchmarks and shadow/default identity tests on the exact final commit.
- Document decisions about #646–#650 and #652–#653: **accept, revise, replace, or reject** with evidence rather than automatically aggregating every experiment.
- Merge #630 or an explicitly chosen successor **only with approval**. No “tests green therefore merge” shortcut.

**D4 exit:** reviewed, approved, correctly integrated gameplay behavior with a documented rollback and credible natural-battle acceptance.

### E — Measured migration and legacy retirement (after D4)

- Inventory legacy soldier/squad skills and state-machine transitions by ownership, test coverage and observed runtime usage.
- Prioritize one capability at a time (e.g. seek-cover, support fire, regroup, sector verification, retreat coordination); migrate **decision ownership** while reusing physical executors.
- Enforce single-authority behavior and measure fewer cross-file changes, duplicate timers/flags, state mirrors and fallback branches.
- Establish deterministic fallback/default parity and per-skill opt-in checks, profile disable/cancel/restart tests and benchmark/CPU impacts.
- Delete obsolete code, old flags or state branches **only after** equivalent evidence and separate authorization; keep a migration/rollback ledger.

**E exit:** the new skill platform is the ordinary owner of migrated decisions, old duplicated decision logic is measurably removed, new skills are demonstrably modular, and legacy mode can be retired without breaking authoritative effects or replay determinism.

## 5. Questions / decisions still open

- Should covered withdrawal start **only once the squad enters retreat**, or should a separately authorized planned fighting withdrawal be eligible earlier? Do not quietly bypass existing 60%-casualty retreat logic.
- Is the existing forward **4.5-s** holder window sufficient for retreat, or does an evidence-backed variant need a longer window? Reuse established clock/lease ownership rather than adding a parallel timer.
- Following D1 benchmarks, implement the forward-half fix first or integrate both directions in one explicitly reviewed D2 PR? The **end state remains one skill** either way.
- Confirm what counts as *independent supporting fire* under heard relay versus real discharge and how near-current believed sector reports remain actionable without omniscient targeting.

## 6. Maintenance rule and source links

Update this document when a PR changes a **phase verdict**, closes a **gate**, or provides a **benchmark-backed result**. Each update must include date, PR/commit SHA, scenario, effective flags, seed count, sim duration, comparison runner, numerical outcome, failure modes and whether it is **draft, merged or deployed**. Keep contradicted or failed experiments in the evidence table; don't rewrite history as success.

**Primary sources:** [#602 specification](https://github.com/APPARANYX/grasstex/issues/602) · [#630 integration](https://github.com/APPARANYX/grasstex/pull/630) · [#635 gate probe](https://github.com/APPARANYX/grasstex/pull/635) · [#645–#649 probes/alternatives](https://github.com/APPARANYX/grasstex/pull/645) · [#650 retreat pilot](https://github.com/APPARANYX/grasstex/pull/650) · [#651 directional design](https://github.com/APPARANYX/grasstex/pull/651) · [#652 fire-control PRECISION](https://github.com/APPARANYX/grasstex/pull/652) · [#653 HOLD clock](https://github.com/APPARANYX/grasstex/pull/653).

**Current executive verdict:** A–C **implemented in the draft integration**; D **experimentally implemented but natural-battle acceptance blocked**; E **not started**. Priority = evidence-backed D1 gate fixes → one directional bound skill D2 → repeatable natural validation D3 → reviewed integration D4 → measured retirement E.

## 7. Update 2026-11-06 — guarded tactical controller takeover (supersedes the stale D/E wording above)

The #630 consolidation was not merged. The Meso controller reached `main` as a different, smaller path: the guarded tactical controller (`?tacticalController=new`, legacy by default until the switch below) with Meso skills merged through #771, then speed work #767-#770 and #773. The default switch is a separate PR after the acceptance list below (now #785). Merge plan and open-PR dispositions: the 2026-11-06 consolidated merge plan (thread "Finish Meso controller merge plan").

**Required before default takeover** (a missing item blocks the switch):

1. Fresh 600 s paired baseline on the exact main commit: meeting, US defense, GE defense; wall clock at most 1.25x legacy (desktop primary), or a new baseline set by Ivan after checks.
2. Recovered #706 behaviours: passenger-level transport ownership (#776), carrier release retires the foot order, recon and mission-route hold across handoffs, regroup unreachable-order release.
3. One owner for route and mission writes (`?controllerSingleWriter=0`; Draft 2026-11-07: the march provider follows 15l's `sq.routeIndex` instead of its own leg counter, `controller-single-writer-check.js`), ambush casualty strand fix, reconstitution and truck checks, desktop playtest.
4. **Stress and casualty awareness in contact (gap found 2026-11-06).** Two legacy Squad Leader decisions never run for squads the controller owns: the course-of-action decision on contact (a shaken or depleted squad holds instead of bounding) and the stress review (a squad shaken too long asks the General for a new brief). The controller therefore ignores stress and casualties during a fight. A third default-on legacy decision is also skipped: engagement-plan upkeep (`updatePlan`, module 16), which asks the General for a review when contact clears or a lease expires; 13e only requests reviews for its own stall reasons. Confirm that in a battle first. Local plan (15n) and lease conflicts are opt-in in legacy, so they are not gaps. Plan: one Draft that feeds the existing scorer into the controller's contact skills and the existing General request path, behind its own off flag and `?tacticalController=new`. No new scorer, timer or order writer. Not started; needs the standard paired set before it counts.
5. Explicit legacy rollback kept for an agreed transition period.

**Status 2026-11-07 (default switch PR).** Item 1: baseline set by Ivan on wall ratio (main d036b3f: meeting x1.695, US defense x1.506, GE defense x1.435). Item 2: #776. Item 3: single writer #781, ambush strand #779, reconstitution and trucks checked by Muse on issue #780 (merges flat at 900 s, trucks board, ride and dismount with zero controller faults), desktop playtest on #299. Item 4: #778 (`?controllerSquadReviews=0`, `?controllerCoaGate=0`); plan upkeep has nothing to keep up because the controller stages no engagement plan. Item 5: the switch keeps `?tacticalController=legacy`.

**The switch.** `battle/battle_sim.html` opens with one script that adds `?tacticalController=new` to a battle URL that names no controller, before any module reads its query, so every existing `?tacticalController=new` test sees the same answer. Rollback for one battle: `?tacticalController=legacy`. Old default: `?controllerDefault=0`. Check: `tools/ai-sim-harness/tactical-controller-default-check.js`. Benchmark arms meant as legacy must now pass `tacticalController=legacy`. Node harness checks are unchanged: they set their own query. Follow-ups found on the way, not blockers: more men flee under the controller (Muse #780: flee acts +40%, shorter each), the `order-handoff-churn` detector counts a firing line as "no progress", one seed of `writer-ping-pong` between squad-stability and prepared-defense at battle end, and the fled-man reload fix (#784).

Phase E (legacy retirement) stays blocked on this list. #299 is a separate product track; its phase status against the controller is in the comment on that PR.

## 8. Next phase 2026-11-07 — port Macro and Micro onto the controller

The controller today owns the **Meso** layer: squad decisions through 13 capabilities (`mission.accept`, `mission.execute`, `movement.move`, `movement.hold`, `combat.march`, `combat.contact`, `combat.bound`, `fire.control`, `maneuver.cover`, `posture.lower`, `station.claim`, `transport.consider`, `transport.cancel`) with providers 13c to 13i. Macro (the General) and Micro (each soldier) still run their legacy decision code, which the controller calls into. Architecture porting is complete when all three layers decide through the controller, one owner per decision, and legacy decision code can be retired. The default switch is done (#785, main aed0165); `?tacticalController=legacy` stays as the rollback for the transition period.

### 8.1 Rules for every slice

- **New architecture, not a reformat.** A slice moves a *decision* into a controller policy and leaves the *effector* with its owner. Behaviour may change; tuning comes later. Never chase exact legacy parity.
- **Reuse.** The policy calls the existing scorer or chooser (for example `chooseGroup`, `selectMission`, `fightingStance`) as a pure function; a slice adds a new capability only when no existing one fits, and its PR says so.
- **One owner per decision.** When the slice is on, the legacy decision path for that decision does not run for controlled squads or soldiers. No new timers (a policy runs on an existing entry point: the 0.45 s commander tick or the soldier drill tick), no new movement or order writers (the Movement Resolver stays the sole destination writer; briefs go out through `issueMission` and Command Reception).
- **Nothing omniscient.** Macro reads own-side squad status and objective status only, never enemy actor truth. Micro reads the soldier's own beliefs and what his squad told him.
- **Flags.** Each slice has its own off flag (below) that restores the pre-slice controller behaviour. `?tacticalController=legacy` and `?controllerDefault=0` must stay identical to `main` (deterministic rollback check in every PR).
- **Interface first.** A slice that adds a scope, entry point or capability updates `battle/tactical-capability-contract.js` and this section before the code.

### 8.2 Gate (same for every slice)

1. Syntax, Sim, Prettier, the slice's own regression (fails on old code) and the legacy/off-flag identity checks.
2. Through Muse (issue #786, label `needs-kit-testing`): the standard paired benchmark (`battle-benchmark-standard.yml`, 60 to 100 fresh seeds, 600 s, pinned control SHA) over meeting, US defense and GE defense, candidate no-param against control no-param, `?strategicInterception=0`; plus the causal-inaction pack and the probe pack. The standard benchmark decides; real broken behaviour in the other two blocks.
3. Wall ratio no worse than the accepted baseline (x1.695 / x1.506 / x1.435) beyond noise.
4. Macro slices that act late in a battle (reconstitution, recovery, reserves) also run 900 s.

### 8.3 Ordered slices

**Macro (the General).** Today `updateFactionCommander` (`commander-ai.js`) runs reconstitution, fled pickup, strategic recovery, per-squad mission wakes and transport allocation in a fixed order every commander tick. The controller has only per-squad records.

| # | Slice | Legacy owner it replaces | Capability (new unless noted) | Off flag |
| --- | --- | --- | --- | --- |
| M0 | **Command scope.** One controller record per side's General, a `generalTick` entry point dispatched from `updateFactionCommander`, `scope: 'command'` in the contract (`actorId` null, squad id `@us`/`@ge`). Ships with M1 (13j). | none (plumbing) | none | with M1: `?controllerReconstitution=0` leaves the unit legacy |
| M1 | **Reconstitution and fled pickup.** Policy picks groups with the existing `chooseGroup` and decides form, dissolve and merge; adapters call the existing `formGroup`, `dissolveGroup`, `mergeGroup`, `pickUpFled`. Lifecycle stages `grouped`, `briefed`, `merged` (or `dissolved`) make a stalled group visible in `summary().live`. | `22-commander-reconstitution.js` `reconstitute`, `pickUpFled` | `command.reconstitute`, `command.pickup` | `?controllerReconstitution=0` (Draft #787, check `tactical-general-check.js`) |
| M2 | **Strategic recovery.** The stall detector and the release, main-effort and reset stages become one action per recovery with stages, so a stage that produced no adopted brief is a visible stall instead of a silent re-run. | `22a-commander-strategic-recovery.js` `runStrategicRecovery`, `runReviewPass` | `command.recover` (`episode`; stages `staged`, `recovered`) | `?controllerRecovery=0` (check `tactical-general-check.js`) |
| M3 | **Briefs: objective choice and main effort.** Per-squad wakes and `selectMission` scoring (`commander-doctrine.js` reused as-is) decided by the command policy; publishing stays `issueMission`, acceptance stays `mission.accept`. | `commander-ai.js` `wakeReason`, `reconsiderMission`; `22a` `selectMission`, `chooseMainEffort` | `command.brief` (`targetSquadId`, `reason`; stages `issued`, `accepted`) | `?controllerBriefs=0` |
| M4 | **Reserves and transport allocation.** The General's per-tick truck allocation moves into the command policy: after the briefs it asks 58 `quoteMission` (pure) and grants each quoted truck as one action that follows the ride. The reserve commit needed no new capability: `reserveDue` is a wake reason (`reserve-commit`), so it has been a `command.brief` since M3. `command.commit` was dropped for that reason, and the squad-scope `transport.consider` stays for squad providers (a command-scope request cannot name a squad scope). A truck granted at publication stays inside `issueMission`. | transport call in `commander-ai.js` `updateFactionCommander` (`reserveDue` already via M3) | `command.transport` (`targetSquadId`, `reason`; stages `boarding`, `embarked`) | `?controllerTransport=0` (check `strategic-transport-check.js`) |

Out of scope for Macro: scenario rules that are not General decisions (`21b` front lines, `21c`/`21d` reinforcement trials, `00-defense-plan.js` setup).

**Micro (the soldier).** Engagement's `runDrill` (`engagement.js`) runs physiology, reactions, retreat and stations for every man and hands only the cover, assault and withdrawal drills to the controller (`engagement` entry point, `controllerCombatTick`). Stance, personal cover, fire and stress reactions are still decided inside Engagement.

| # | Slice | Legacy owner it replaces | Capability | Off flag |
| --- | --- | --- | --- | --- |
| U0 | **Soldier policy hook.** The existing `engagement` entry point gains a per-soldier policy slot for soldier skills; physiology (`17-soldier-mind.js` stress, wounds) stays a fact source, not a decision. | none (plumbing) | none | ships with U1 |
| U1 | **Stance and personal cover.** Which stance and which cover spot; Engagement keeps `applyStance`, `reserveCover`, `releaseCover` as effectors. | `19b` `fightingStance`, `seeingStance`, `suppressionStance`, `commitStance`; `19` `findCover` | extend `posture.lower` to `posture.set` (raise as well as lower), new `cover.take` | `?controllerStance=0` |
| U2 | **Personal fire and reload.** Target, shot and reload timing inside the squad's `fire.control` permission; `46-ammunition-stoppages` and `47-sidearm-switch` stay effectors. Takes the fled-man reload read (#784). | `19b` `fireAllowed`, `tryFire`, `suppress`; reload choice in `engagement.js` | `fire.personal` | `?controllerSoldierFire=0` |
| U3 | **Stress reactions.** Cower, freeze, flee and rage as soldier skills choosing from the same stress facts; Engagement keeps `runTo`, `goHome`, `fledTick` as effectors. Takes the flee +40% read (section 9) and a windowed suppression-stress cap if it is confirmed. | `19a` `chooseBreak`, `cower`, `freeze`, `beginFled`, `rage` | `soldier.react` | `?controllerReactions=0` |
| S1 | **Squad Leader skills, combined S1b–S1f implementation.** The march provider selects defensive posts, regroup, recon, structure clearing and retreat. The native skill logic produces personal intents; every enabled skill moves its men through `movement.move`, never the retained fireteam publisher. Recon/regroup lease lifecycle, prepared-post claims, structure entry evidence, retreat anchors and rally recovery remain owner services. S1a phase band is merged (#796). S1b–S1f implementation has offline coverage; exact-head Muse/Kit lab and battle acceptance remain required before completion. | `13c` skill selection; `16` `controllerSkills` intent planning; native 15c/15h/15l/15m/15n skill logic | reuse `movement.move` with optional validated `skill`; no new capability or movement writer | S1a `?controllerPhaseBand=0`; S1b `?controllerDefensivePosts=0`; S1c `?controllerRegroup=0`; S1d `?controllerRecon=0`; S1e `?controllerStructureClearing=0`; S1f `?controllerRetreatSkill=0`. Each restores only its retained path. Existing `controllerRetreat=0` still disables retained retreat movement entirely. |
| U4 | **Remaining drill states** (orient, alert, advance hand-back) and the contact/march flip read. | `engagement.js` `orient`, `alert`, `advance` for controlled squads | reuse `combat.contact` / `combat.march` | `?controllerDrill=0` |

**U0–U4 single-PR implementation candidate (2026-11-08).** `13k-tactical-soldier-policy.js`
provides the active provider's per-soldier policy slot. It chooses fighting/sight/march posture,
eligible personal-cover ranking and incumbent retention, personal fire/suppression and empty-magazine
reload, stress reactions, recognition and contact/march hand-back. Engagement projects detached facts
and executes the chosen action through its existing stance, cover, reaction and combat effectors;
46 retains ammunition, discharge and reload clocks, and the Movement Resolver retains destinations.
The four off flags in the table are independent and pass through the preview launcher. Perception
still supplies personal targets; no policy acquires enemy actors or transforms. U3 preserves existing
stress dosage and suppression saturation: the suggested windowed cap is **not confirmed or enabled**.

**Interface refinement for U:** `tactical-capability-contract.js` declares `soldierDecisions` for the
synchronous `posture.set`, `cover.take`, `fire.personal`, `soldier.react` choices and reused
`combat.contact`/`combat.march` decisions. `selectSoldier` runs inside the existing drill/resource
owner; it does not acquire a competing posture/weapon/locomotion lease or create an extra timer.
The provider receives frozen bounded data, and selected values are contract-validated before owner
execution. `summary().soldierDecisions` retains the latest selection per living actor/slot, with
mission, epoch, generation and simulation time. **`selected` is not physical success:** use native
stance trails, cover claims, ammunition discharge/reload evidence, reaction transitions and combat
arrival receipts to establish execution. A newly selected reaction interrupts that actor's controller
actions before the native reaction runs; rage fire obeys the same adopted permission as other personal
fire. Legacy/off paths remain available. No legacy decision code is retired.

**Candidate evidence/status:** `tactical-soldier-policy-check.js` exercises the slot and real owner
seams, including native discharge/reload, reaction interruption, bounded freeze, authority rejection,
restart isolation and independent flags. This is controlled fixture evidence only. U0–U4 are
**implemented for review, not natural-battle accepted or merged**. The contact/march flip retains its
existing rule pending the natural causal read. Exact-head Skills Lab, 60–100 fresh paired seeds across
meeting/US defense/GE defense, rollback identity, causal/probe packs and the section 8.2 wall-time gate
remain required through Muse. S1b–S1f remain separate from this soldier-layer PR.

**Phase E, legacy retirement.** Only after both layers pass and Ivan agrees the transition period is over: delete legacy decision paths and their off flags one layer at a time (Meso, Macro, Micro), each with a rollback ledger entry.

### 8.4 Open calls for Ivan (do not block M0/M1)

- What a rallied or stranded retreated squad should do (section 9 map-edge squads). M1 keeps today's rule (a member that rallies dissolves its group) until he decides.
- Whether a rebuilt squad takes still-broken men.

## 9. Follow-ups and known issues (parked 2026-11-07)

Not blockers for the default switch. Each needs a confirmed failure before a fix, then the usual small guarded PR.

**Soldier behaviour (Micro):**
- **More men flee under the controller.** Muse on #780: flee acts +40% (1,181 to 1,652), each a little shorter; retreat samples +25%. `?pinNerve` (17-soldier-mind) caps stress per *unbroken* pin spell at 1.625 s, but the controller's heavier suppression gives many short spells that each bill again. Candidate: cap suppression stress over a time window, own off flag. Keep the controller's suppression saturation (Ivan likes it).
- **Contact/march flip.** In contact, men without a firing line and no incoming fire for 3 s drop from `combat.contact` to `combat.march` and back every 2 to 5 s, in sync (13d `drill`). Confirm whether this is the intended advance-until-you-find-a-line behaviour before touching it.
- **Fled man keeps reloading** after dropping his rifle: Draft #784 (`?fledReloadClear=0`).
- **Retreated squads stuck at the map edge** to battle end (desktop playtest on #299, all three controller battles). Waits on Ivan's design call on what a rallied or stranded squad should do.
- Meeting grenade casualties 14 to 39 with throws flat after #778 (meeting only).
- Engineer `states.rage` +129% (likely multiple-comparison noise); sergeant rage drop under #776 judged benign.

**Command and writers:**
- `writer-ping-pong` on one us-defend seed (#780 run 1704, seed -0020): two men flip `orderDestination` between squad-stability and prepared-defense at 580 to 598 s, controller on only. Cause found 2026-11-08 on #793 (us-defend seed pr793-m3-20261108-0011, ge-3 man 86, 546 to 556 s): the controller released a man's order, a one-tick defend or regroup phase let the Squad Leader's fireteam slot publish, and while that slot was pending publishPersonalMovement committed the man's last adopted envelope, the released controller order, under the Squad Leader's name. Fixed in module 16: the controller is the senior writer for its squads and only its live order may use its key (?controllerReleaseFinal=0 restores; check in tactical-owner-adapters-check.js). Merged without a Muse gate on Ivan's word; confirm on the next gate that us-defend writer conflicts read 0. The phase flicker itself (assault to defend for 0.45 s in contact) is not addressed.
- Four pre-existing causal stalls (`requires-command-or-route-review`, attackers idle 45 s at an interim waypoint).
- #701: unexplained GE fire-silence rise.
- Probe `contacts-cleared` 44 to 23 after #772 (more under-fire endings).

**Diagnostics and benchmark harness:**
- `order-handoff-churn` (32-ai-loop-watch) counts a firing line holding ground as "no progress" (6 to 594 alerts). Fix the detector only after the contact/march flip above is judged valid.
- Benchmark records carry `winReason: null` for time-limit battles; `movementGoals` counters accumulate across battles in one shard worker.
- Controller stats (faults, rejected, stale requests) are not in CI benchmark records.
- Local runs fall back to policy revision 0 while CI uses the live revision, so local traces do not reproduce CI alert times.
- A second battle in the same page differs from the first.
- Preview slug URLs 404 for some branches; the `ref-<sha>` path works.

**Speed:** wall ratio baseline x1.695 / x1.506 / x1.435 (meeting / us-defend / ge-defend). The 1.25x target is not met. Biggest known cost: 13g `findRoute` (about 2.8 s per meeting battle, parked); no speedup with a truck on the map.

### 9.1 Performance and knowledge-boundary optimization investigation (2026-11-10; proposal, not implementation)

**Purpose and provenance.** This is the detailed follow-up to draft [#794](https://github.com/APPARANYX/bound-by-glory/pull/794), reconciled against `main` at `b47e1b54cd2ddd58555b11600ac256f7eba5b520` after #810 merged. The 2026-11-08 sector-cache sketch is retained below as a broader, prioritized investigation. Code observations refer to this source snapshot, *not* a completed CPU profile, an accepted defect, or a measured speed improvement. Recheck live code/branches before any implementation; the Macro/Micro migration and fire-silence investigations have progressed since the original roadmap snapshot above.

**Guiding separation.** (1) *World/geometry facts* may be shared read-only if truly invariant: static obstacles, navigation topology, reusable cover slots, terrain and static visibility. (2) *Beliefs and commands* belong to their authorized observer/recipient: personal first-hand sightings, received messages, expiring last-known locations, squad knowledge, General reports, and personally adopted orders. (3) *Decisions* may be cached or woken only on meaningful changes, deadlines, and owner lifecycle events. (4) *Effectors and physical safety* remain live: motion/resolver, collisions, ballistic/fire-line checks, actual visibility where needed, suppression, claim ownership, survival, transport footprints and physical arrival. Neither event-driven decisions nor a sector grid may become an omniscient sensing service or a second order writer.

**Evidence legend:** **Observed in code** = actual current call/guard or fact dependency; **investigate** = possible repeated work or unsafe cross-layer dependency, still requiring profile/fixture evidence; **design option** = not yet authorized or implemented. Do not equate a frequent cheap guard with an expensive full search. In particular, 13e already requires authorized contact and legitimate reports before selecting new covered routes, and it has lazy basis, stall pacing and retained-route behavior; it does *not* perform a full cover search for every man on every frame. Quiet soldiers must still acquire first contact; injury, incoming fire and movement safety cannot wait for a distant strategic wake.

#### 9.1.1 Source-grounded audit inventory

| ID | Existing mechanism / evidence | Question to measure or prove | First proposed experiment |
| --- | --- | --- | --- |
| **D1 — tactical wake/route churn** | `battle/modules/13c-tactical-march-provider.js` calls contact, flank, covered maneuver and ambush policies at the squad `fireAndMovement` dispatch. `13e-tactical-covered-maneuver.js` checks contact, eligibility, lease and stage each update, but gates expensive `choose()` by blocked decision basis, `controllerLazyBasis`, `controllerStallPace` and the existing bound cycle. `13g-tactical-contact-route.js` retains waypoint chains and briefly memoizes failed plans. | Count policy dispatches, actual `choose` calls, route searches, new command publications, unproductive retries, and distinct decision-input revisions. Are successful plans re-searched simply because a man drifted a meter, a report timestamp changed, or a periodic loop ran? Separate safe stage/receipt checks from unnecessary replans. | Instrument-only counts first; then event/revision-gate expensive planning while keeping owner deadlines, retreat urgency, lease releases, interruption and physical revalidation intact. |
| **D2 — squad belief-map reconstruction** | `battle/squad-ai.js` `squadContactsMap(squad,battle)` walks every living member's belief keys, aggregates 20 m sectors, computes confidence and sorts on each invocation. `13d-tactical-contact-skills.js` and `13h-tactical-ambush-skill.js` consume it. | How many repeated identical maps are built per squad/tick? How often do records change through new sightings, actual callouts, incoming fire, confidence decay or TTL expiry? | Per-squad *immutable versioned read snapshot* with event/expiry invalidation and within-tick same-output verification. No global enemy positions, mutable shared references or stale cross-faction records. |
| **D3 — first-contact acquisition** | `battle/squad-ai.js` `perceive()` scans when targetless at roughly 0.3 s plus soldier-id stagger, filtering every candidate enemy before range/cone/LOS tests; `stillTracking()` tests a tracked target from the 0.15 s soldier update. Existing range-first tests are deliberate and must remain. | Count roster broad-phase iterations versus actual in-range candidates, LOS calls and time to first honest contact in quiet, dense, moving, and partially occluded battles. Does spatial candidate indexing help more than adjusting cadence? | Read-only physical broad-phase near the soldier, same range/cone/LOS truth and observable latency. Do **not** suspend no-contact perception or use knowledge caches as detection. |
| **D4 — cover candidate direction and geometry** | `battle/modules/19-engagement-cover-positions.js` already maintains obstacle-backed cover slots and static `quality` under `controllerCoverCache`. `candidatesWhere` repeats threat-relative normal/shape shielding, range and live slot/claim checks; `findCover` checks reachable, firing line and constraints. | Are threat-side/candidate-set results recomputed with identical geometry and **reported** threat sector? What fraction of candidates can be reused across nearby soldiers without discarding distinct personal threat beliefs, stance and reservations? | Cache static slots per geometry revision; optionally bucket *candidate order* by directional sector and source region, then recheck exact shielding, actor distance, knowledge provenance, live claims and final physical reachability. |
| **D5 — route LOS and dynamic vehicles** | `battle/modules/13g-tactical-contact-route.js` caches LOS sample-point answers across plans with a geometry epoch and size cap. `geometryEpoch` returns null whenever any `__dynamicFootprints` exist, even when a vehicle is remote from a sampled line; this conservatively avoids stale obstruction. The old rejected truck-clearance optimization (#733) warns against unsafe reuse. | How much caching is lost to irrelevant vehicles? Measure truck-present versus absent hit rates and route wall time. Can static terrain/structure LOS be reused without ever caching an assumption that a moving truck will not obstruct the line? | Split static LOS memo from *fresh dynamic occluder* tests; query spatially relevant moving footprints and fall back to the native authoritative result whenever uncertainty remains. No caching of moving-truck clearance without live confirmation. |
| **D6 — fire-line/posture evaluation** | `battle/modules/19b-engagement-fire-stance.js` `fireControlObservation` computes stance-specific visual and ballistic lines (including prone) and eligibility. `13d-tactical-contact-skills.js` memoizes each soldier's observation only for the current sim-time and target. | Repeated observations per soldier, per tick, per changing target/stance; which geometric subtests are invariant, and which must be fresh for trigger, occupancy, crest, moving actor, damage and fire authorization? | Cache only safe static-geometric subresults; make target/pose/position/geometry revisions explicit. Keep exact firing authority and ballistic revalidation at discharge and owner handoff. |
| **D7 — ambush/masking and other stationary policies** | `13h-tactical-ambush-skill.js` repeatedly reads squad contact sectors and checks `maskedPost` during prepared ambush updates; `44-combat-urgency.js` already rate-limits urgent cover searches (~0.9 s at average agility) and suppresses duplicate shared-contact reactions. | Are unchanged ambush contact/masking calculations a real hotspot? Are urgency searches reattempted at the cooldown despite the same known failure, or correctly reacting to newly arrived danger? | Add counters only. If material, version cached static masks or negative result basis with bounded expiry; preserve immediate suppression/incoming-fire emergency behavior. |
| **D8 — Macro, morale and diagnostics** | The General's decision path, reconstitution, transport and soldier mind operate on their owner ticks; `battle/modules/17-soldier-mind.js` processes real stress and events each soldier tick. Debug and forensic observers may build per-battle snapshots. | Which work runs without mission/roster/objective/report/stress changes? What is continuous physiology versus a needless high-level score/array reconstruction? How much wall time is diagnostics-only? Respect current M0–M4 and U0–U4 implementation status before assuming a gap. | Profile separately: commander decisions, stress/social reads, telemetry and diagnostics; introduce invalidation only for actual pure queries, not continuous stress integration or mandated review clocks. |

#### 9.1.2 Knowledge isolation and suspected information leaks

- **K1 — possible death-state leakage (needs a reproducer).** In `battle/squad-ai.js` `squadContact`, controlled squads use `seenThreat` to judge whether an observed enemy ceased being a threat; *but* contact expiry still chooses a shorter limit when `c.unit.dead` is true. This reads live enemy death state even if nobody in the owning squad learned of the death. Test a squad with retained, unrefreshed sighting: kill that enemy out of view and without a delivered report, compare contact availability, decision outcome and expiry timing with a matched alive-but-hidden control. Do not conclude player-visible omniscience before reproducing a downstream behavioral difference. The fix, if supported, must derive death/expiry only from legitimate evidence or ordinary TTL, retaining normal first-hand observed kills.
- **K2 — intentional legacy/off-flag truth reads, not a shipping bug.** `battle/commander-doctrine.js` `nearestEnemyToSquad` defaults to reported contacts (`generalIntel` on); `?generalIntel=0` deliberately restores a truth-reading comparison arm. Preserve test controls unless separately authorized. Audit *active default* Macro policies for any other hostile-actor dereference using an information-flow harness; do not infer omniscience from a raw reference located in a legacy-only or physics-owned path.
- **K3 — retained enemy references and personal beliefs.** Some modules legitimately use `s.target` or `contact.unit` to act on a directly tracked actor; others must use detached `x,z,at,source` reports. Audit consumers of enemy `root.position`, `dead`, `reactionState`, weapon/suppression and stance for their actual provenance and timing; prove with hidden-enemy mutation tests. A living target should not teleport in remembered knowledge when out of sight, and a reported-only target must not silently become a live object.
- **K4 — cross-scope cache isolation.** A shared sector/environment cache may contain static public geometry, but never faction-specific beliefs or “safe side of building” decisions without an explicit observer/faction/knowledge key. The General may use only upward reports; Meso may use received squad reports; Micro may use personal sightings and actually adopted messages. Expiry, report confidence, sight status, reception delay and restart/ownership generation are part of cache validity.
- **K5 — no absence-of-contact shortcut.** `!inContact` does not mean “world safe”: perception, suppressive incoming fire, acquired personal sightings, scripted objectives, cover preparation before contact, and physical obstacles may demand work. Avoid using squad contact as a universal kill-switch for Micro responses or authorized mission movement.

#### 9.1.3 Proposed incremental architecture

**A. Stable geometry store (read-only).** Use the existing obstacle spatial index and cover registry first, not a second occupancy/path writer. Represent static terrain/obstacle topology with version/epoch, local cells and object-to-cell membership; 20 m is a *starting visualization hypothesis* from the unmerged #631 overlay, not a mandated cache resolution. Support rotated/oversized buildings touching several cells, destruction/door/terrain/navigation changes, and neighboring-cell invalidation. Share only truly static geometry and candidate cover slots; no globally “safe” cardinal directions.

**B. Direction-relative *candidate* cache, not final orders.** Given a known reported threat bearing relative to a structure, cache potentially sheltered sides/candidates, with a coarse directional bin (e.g. eight directions) for lookup. Crossing bin boundaries alone need not invalidate an otherwise valid set; conversely, remaining inside one bin is *not sufficient* to skip exact geometry for near-corner positions, multiple attackers, height differences, windows, angles and changes of stance. Re-rank by actor position, lawful report(s), mission direction, risk/exposure and live slot reservations. Validate exact LOS, ballistic constraints and native route before any owner issues/adopts a move.

**C. Event/revision-driven decision wake.** Keep one owner per layer and its existing entry-point clocks; use cheap event/revision comparisons to *avoid expensive recompute* when the input basis is unchanged. Relevant events include: new/expired/changed personal or squad contact; delivered command; changed mission/goal/phase; changed navigation/obstacle epoch; suppression/incoming fire; casualty, stress threshold or capability change; lease/open/expiry; firing evidence; arrival, blockage or reservation change; truck/occluder proximity. Time-dependent decisions require an explicit next-deadline wake or bounded fallback; a snapshot with identical coordinates but expired confidence is *not identical input*. Respect retreat and survival immediate priority. Continue low-cost ownership/stage/receipt/physical checks each required tick.

**D. Reuse successful plans rather than restart them.** Retain existing `13g` waypoint chains, mission identity, owner action and physical checkpoint semantics. Do not silently reacquire a different cover slot every dispatch while a valid native move is progressing. Replan on a meaningful invalidation, completion, owner refusal, interruption or deadline; validate currently chosen next hop through the existing movement/Engagement owners. Negative plan caching must not indefinitely starve a squad when fresh reports, a shot, nearby movement or new nav opportunities unlock a safe route.

**E. Frame-safe invalidation and memory budget.** Prefer per-battle/per-squad/per-soldier storage with epoch and generation keys. Use bounded storage, eviction and restart cleanup; no stale Map/WeakMap references across battle reset or a new controller generation. Handle event delivery order deterministically and preserve same-tick visibility of legitimately delivered reports. If a dependency cannot be proven versioned, call the authoritative function rather than trusting a cache. Profile memory/GC overhead and invalidation fan-out, not just cache hit percentage.

**F. WebAssembly only after algorithmic work.** Do not port policy ownership, information flow or full sim state into WASM first. If profiler identifies an isolated, heavy, deterministic pure geometry/math kernel after unnecessary calls are eliminated, test an opt-in native-JS versus WASM implementation including boundary marshalling/heap costs. No assumption that AssemblyScript or WASM itself makes a repeated search cheap.

#### 9.1.4 Measurement plan and acceptance design

**P0 — zero-behavior instrumentation first.** On a pinned source SHA, measure per 600-s scenario: controller policy dispatches; decisions skipped by unchanged bases; `choose`, `findRoute`, `findCover`, `squadContactsMap`, `findTarget`, `stillTracking`, `fireControlObservation`, `maskedPost`, nav path and LOS/ballistic calls; unique inputs versus repeat calls; reported threat/source versions; cache hit/miss/invalidations; successful plan reuse, replans after a genuine event, rejected/expired claims and memory growth. Report wall time by system (not only total frame time), CPU stacks and the cost of instrumentation itself. Capture actual contact/engagement exposure to avoid optimizing rarely used cold paths. Use existing offline checks for local correctness; **Muse alone owns browser/Skills Lab, CDP CPU profiles and hosted paired benchmarks**, per `AGENTS.md` and `docs/agents/working-rules.md`.

**P1 — causal information fixtures.** For each optimization, construct isolated observed/unobserved enemy moves and deaths, multi-threat updates, delayed callouts, TTL/confidence transitions, near-corner cover changes, moving and parked trucks (including truck newly crossing a previously clear line), destruction/nav revision, reconstitution/rebrief, suppression/incoming-fire emergency, last-holder casualty, retreat, waypoint arrival/blocked route, stale reservations and same-page restart. Assert the same legal perceptions, source provenance, command adoption, safety results, and timely wake/exit. A cached failure must not outlive a qualifying event. No invisible enemy transform, status or route query may appear in an owner's information inputs.

**P2 — smallest independently reversible change.** Suggested order by *investigation ROI* (revise using P0 data): (1) event-gate expensive tactical redecisions and retain valid plans; (2) versioned squad-belief snapshots; (3) profile and accelerate target acquisition broad-phase; (4) safe static cover/directional candidate reuse; (5) split static LOS from dynamic vehicle occlusion; (6) fire-line/posture memoization; (7) measured ambush, Macro, stress and diagnostics hotspots. Each behavior-affecting PR has one focused owner/contract change, its own off flag and harness; do not stack multiple experimental speedups into one hard-to-attribute benchmark. Repair an actual K1 information leak separately from speed caching if reproduced.

**P3 — real simulation gates.** Require syntax/native owner and contract checks, determinism and no new controller faults, illegal writers, leaked hidden knowledge, stale cover/fire safety, lost physical arrivals, never-ending stalls, or newly starved replan opportunities. Exercise the exact head in the native Tactical Skills Lab before any battle benchmark. Then ask Muse for the approved GitHub paired standard benchmark on **meeting, US-defense and GE-defense, 600 s** (plus 900 s where late Macro actions matter), pinned same scenario seed and same-controller baseline, and any relevant causal/targeted fire suites. Record source/control SHAs, effective flags, observer identity, seed sets, sim step, changed outcomes and wall/CPU/heap effects. Behavior-changing controller work is **not** required to match legacy kills, score, retreats or identical trajectories (`AGENTS.md`); interpret observed gameplay changes and reject real invariant failures. Historical 1.25× legacy wall target above is an *aspiration and trend reference*, not a license to retune decisions or a fabricated acceptance pass. Choose a meaningful speed threshold from the measured baseline *before* reviewing candidate results; never claim savings without profiler and paired-gate evidence.

**P4 — implementation ownership and merge boundaries.** This PR changes **documentation only**, no runtime behavior, performance numbers, flags, baseline, CI configuration or rollout. It does not authorize implementation, blanket disabling of perception, performance-based tactical retuning, test bypass, release, or merge. Future implementation is independent of active Macro/Micro, #799/#808 investigations and other acceptance work. Check the live heads and latest `AGENTS.md` each time; name actual beneficiaries and regressions; mark proposed, implemented, natural-battle validated, accepted and merged separately. Muse handoffs (including exact SHA and `needs-kit-testing`) are required only when scheduling applicable browser/benchmark testing of implementation, not for this inert documentation update.


**Player and UI (not AI):** pressing P gives `Unhandled promise rejection: {}` once per press; Esc does not release possession and P cycles to another soldier.

**Other open decisions:** #608 `?ballisticFailClosed=0` question; #685 Howler audio buses parked; the tactics campaign phases C to J (tracker #786, formerly PR #299) need a reuse audit against controller skills before any port.
