# Meso: the Squad Leader

**Kind:** current implementation contract. **Read when:** changing squad phases, group morale and course of action, buddy pairs, scouts and recon, or leaderless continuation. Index and layer map: [battle architecture](../agents/battle-architecture.md). 

<!-- Moved verbatim from `docs/agents/battle-architecture.md` at d15687b; edit here, not there. -->

The Squad Leader declares its 11 execution phases in `BattleSquadStability.states`; setup,
mission execution and regroup all enter through `transitionPhase`. A replacement brief may select
any phase, so legality comes from the mission/route/lease guards rather than a restrictive phase-only
adjacency. Retreat remains `sq.state`, not a `commandPhase`.

**Group morale and course of action** (`modules/16-squad-plan-stability.js`, the Squad Leader; read once at load from
`location.search`: both are **on by default**; `?morale=0` restores the flat retreat rule and `?coa=0` disables COA gating). Group morale replaces the flat 60% casualty retreat in
`updateSquadState`: a squad breaks (`sq.state = 'retreat'`) at `breakBase` (0.6) minus `breakSlope` (0.3) per unit of
`squad.mind.mean` stress, never below `breakMin` (0.25), so calm men break exactly where they did before; a retreating
squad goes back to `engaged`/`advance` only when mean stress is under `rallyStress` (0.15) and its casualty fraction is
under the break threshold at that stress less `rallyGap` (0.05), so it cannot break again on the same inputs. Casualties do not heal, so a squad that broke at 60% rallies only if a merge restores its strength.
The squad mean reaches it through the soldier condition's `morale` lever (`BattleSoldierMind.squadStress`), so `?mind=0` and `?mind=observe` leave the flat rule alone.
The numbers are `BattleSquadStability.tuning.morale`. With COA on by default, on every tick the squad is in contact the Squad Leader
scores the declared COAs (`COAS`: `assault`, `defend`) against declared inputs (`COA_INPUTS`: casualty fraction, mean
stress, leader down) with declared weights (`COA_WEIGHTS`), keeps the winner as `sq.coa` and draws no random number; a
tie goes to the first name, `assault`. `defend` clears `_assaultAuthorized`, which
holds the bounds in `fireAndMovement`; `assault` changes nothing else. With the shipped weights `assault` wins while
`2.5 x casualties + 1.5 x stress + 2 x leaderDown <= 1`: a squad without a leader when contact starts defends for that
contact, and calm men defend from 5 casualties of 10. `sq.coa` is set on each in-contact tick, is never cleared and is not
in the diagnostics export. `morale-check.js` and `coa-check.js` exercise both flag-on paths and the `morale-decisions` and `coa-decisions` probes
measure them (60 battles and 600 squad-battles per arm, 2026-09-30, numbers in #133; every decision was re-derived from its
inputs with 0 mismatches bar 3 of 14,661 COA scorings, a succession resolving in the same tick). **Morale:** a ten-man
squad's casualty fraction moves in 0.1 steps, so the lever can only differ from the flat rule at mean stress 1/3 with 5
casualties, 2/3 with 4 or 1.0 with 3 (`breakMin` never binds); mean stress is 0.05 at the median and above 1/3 in 3.6%
of in-contact squad-time. On the flat rule's own battles it would touch 28 of 100 squad-battles and, for all but 8 of the
167 it touches, only retreats the squad earlier (median 5.8 s, mean 19.8 s; the 8 are retreats the flat rule never
makes). Flag on, 168 of 348 retreats come one casualty early (144 at 5, 24 at 4) and 5 squads rallied in 600 squad-battles:
a squad that broke at 5 or 6 casualties can never meet the rally's casualty ceiling (0.6% of retreat seconds are under
it, 75% are calm). The 17 merged squads all returned with mean stress under 0.15 (p90 0.07), so a merged squad staying in
`retreat` while shaken did not happen. With `breakSlope` tripled (diagnostic only) early breaks rise 2.6x and rallies
5 to 118: the lever is wired, the shipped dose is small. A rally ceiling above the break point flips a squad every tick
(diagnostic, `rallyCasualty` 0.7: about 111,000 flips in 600 squad-battles), so a reachable rally needs a gap between
break and rally. Retreat is 58 entries per 100 squad-battles either way and 54% of the retreating squads are still
retreating when the battle ends (15 to 17 merges per 600 squad-battles). **COA:** a contact starts 24 times per squad per
battle (median 0.45 s; 88% shorter than the 9 s bound-cycle wait that each start renews), so `sq.coa` was scored at each of
them, not once, until it became a per-tick evaluation (#137); 54% start in `assault` and 0.1% in `approach`; `defend` wins 25% of the starts (17% in a bounding phase; 94%
by casualties and stress, 6% by a leader down). The gate is exact: under `defend` in a bounding phase 1 bound was sent
against 4.5 per contact-minute under `assault`, and nothing set `_assaultAuthorized` again. It withholds about 6.5% of a
battle's bounds (691 to 646 per 100 squad-battles) and holds the squad in contact (`advanceSquadAnchor`: held while
`inContact` without a bound), so contacts run longer. Forcing `defend` everywhere (diagnostic only): 0 bounds, movement
stalls 35 to 16 over 60 battles (10 battles fewer, 2 more). **Standard benchmark** (prefix `ai-layers-20260929`, 100
battles per arm, branch on main `ee12d8c`, its own flags-off run as the baseline: identical to `main` in 100 of 100
records, #133): `?morale=1` changes 95 of 100 battles and moves retreat, not outcomes: `withdraw` man-samples +31% (more
in 67 battles, fewer in 28, sign p 0.0001), resolver changes +7.7% (65 to 30, p 0.0004), reconstitution groups formed
42 to 65 (p 0.006), time-limit battles 35 to 49 (McNemar p 0.016), `low-forward-progress` loops 537 to 464 (25 to 47,
p 0.013), movement stalls 40 to 42, 0 runtime errors: squads that break one casualty early leave the fight with a living
man more and, with no reachable rally, for good. `?coa=1` changes 71 of 100 and moves no efficiency counter beyond noise
(bound-state samples -3%, p 0.21; time-limit battles 35 to 39, p 0.42; 1 of 17 counters under p 0.05). Wall-time ratios
between arms (1.26 and 1.21) are not readable: the two flags-off runs, identical in every record, read 0.85 under the same
runner load. Win rates are reported and were not used for any of this. **COA per tick** (#137; both seed prefixes, 200
battles, against the flags-off run of each: identical to `main` in 100 of 100 records): `?coa=1` evaluated on each
in-contact tick, with no margin, meets the efficiency gate: resolver changes -2.6% (fewer in 120 battles, more in 73, sign
p 0.0009), `withdraw` man-samples -7% (p 0.03), movement stalls 101 to 118 (per-battle p 0.87), `low-forward-progress`
loops, stuck detections and forward-progress alerts unchanged, 0 runtime errors. It moves behaviour: bound-state samples
-10%, time-limit battles 75 to 94 (McNemar p 0.015, reported not gated), winners identical (94 and 106). Re-run on `main` at
`c7a527f` (prefix `ai-layers-20260929`, 100 battles): flags off identical to `main` in 100 of 100 records; `?coa=1` changes 95,
bound-state samples -11% (p 0.0026), movement stalls 17 to 15, `low-forward-progress` loops 553 to 540, stuck detections 226 to
204, resolver changes -2.7% (p 0.06), 0 runtime errors, wall time x0.90. One counter went the other way in all three 100-battle
runs: strategic-stall repeats 72 to 87, 93 to 97, 72 to 94 (p 0.03 on the last; 1 of 20 counters), not a gated counter. A margin on the
COA (switch only when the other leads by 0.25) was measured on one prefix and dropped: it latches squads in `defend`
(casualties never heal and stress only falls), bounds -8% and time-limit battles 35 to 52 (p 0.0023).
**Morale rally gap and morale on by default** (#142; #136 was the first attempt, closed unmerged, and its COA half is #137). A rally that
needs a gap below the break point (`rallyGap` 0.05), plus the General dissolving a reconstitution group whose member rallied, made the
rally reachable and stopped the tick-by-tick flip (a rally ceiling above the break point), but the lever still fails the efficiency
gate on 200 battles (both prefixes, each arm against its own flags-off run, flags off identical to `main` in 100 of 100 records):
`withdraw` man-samples +10.7% (more in 120 battles, fewer in 72, sign p 0.0007), resolver changes +6.7% (126 to 66, p 0.0000),
reconstitution groups dissolved 12 to 23 (p 0.03), against `low-forward-progress` loops -12% (p 0.0012) and forward-progress alerts
-9% (p 0.018); movement stalls 101 to 121 (per-battle p 0.52), 0 runtime errors. The rally stays rare (a squad is calm again by the
time it has lost its sixth man) and the cost is paid at the early break. **Re-run on this PR's branch** (#142, standard benchmark, both prefixes,
200 battles pooled, the `morale=0` arm identical to `main` flags off in 100 of 100 records on each prefix; default against `morale=0`):
`low-forward-progress` loops 1,104 to 977 (-11%, fewer in 99 battles, more in 58, sign p 0.0013), forward-progress alerts -8% (p 0.0084),
movement stalls 51 to 39 (p 0.63), retreat samples -7% (p 0.10), against resolver changes +5.8% (119 battles more, 74 fewer, p 0.0015),
`withdraw` man-samples +6.4% (p 0.014) and regroup entries +9% (p 0.063); reported, not gated: US wins 96 to 85 (McNemar p 0.15),
time-limit battles 94 to 81 (p 0.14); 0 runtime errors, 0 writer conflicts, wall time x1.03. **Owner decision, 2026-10-01: morale is on by default anyway**,
the failed gate recorded and not waived; `?morale=0` is the flat rule for any A/B. From that day a default battle has group morale,
so "flags off identical to `main`" compares against a `main` that has it, and every measurement in this file that says flags off
was taken with it off. What replaces the flat retreat in the long run is a separate design (fall back and hold), and a squad's
shakiness is to come from what its men do (Stress reactions, under The soldier layer, in slices).

**Buddy pairs inside each fireteam** (#187, Squad Leader/Meso owner). Stable pairs are deterministic adjacent-slot
relationships inside the existing command/alpha/bravo/charlie fireteams; they are **on by default** and
`?buddyPairs=0` is the legacy no-pair control. Pair identity is not command: a pair never writes a destination,
publishes an order or calls Movement Resolver. During an already-authorized bound, the Squad Leader may leave one
buddy who is already in Engagement's base of fire covering while the other takes the bound; if that condition is
not available, the existing whole-fireteam bound passes through. Casualty/fireteam changes deterministically retire
and re-pair survivors; suppression, freeze/flee/rage/cower, incompatible tactical-position work, blocked movement,
route divergence and separation only degrade cooperation. Separation/route recovery uses hysteresis plus a 1.5 s
stable-reform window, so diagnostic state does not chatter while physical movement crosses a threshold. Pair identity,
task context, separation/route gap, state/reason, break/reform timing and cover/move actors are exported through
`BattleSquadStability.buddySnapshot`; `buddy-pairs-check.js` owns the deterministic contract and the observe-only
`scripts/probes/buddy-pairs.js` measures real usage. Standard benchmark #272, 100 paired meeting battles,
`buddyPairs=0` vs `buddyPairs=1`, `contact+120`: 135 cover/move activations; 6,396 degraded episodes and 4,124
reforms across all squads (4,708 separation, 631 suppression, 338 incompatibility, 19 blocked, 12 route-diverged);
resolver changes 153,211→150,895 (-1.5%, sign p 0.001), loop alerts 59→40, movement-stall reports 26→31 in only
3 paired battles (sign p 0.25), writer conflicts 0→0, runtime errors 0→0 and median wall time x1.001 (gate 1.25).
The earlier #271 measurement exposed plan-refresh/threshold diagnostic churn (40,477 breaks / 37,980 reforms);
the shipped hysteresis/task-context fix reduced those counts by 84% / 89% before the default-on decision.

**Scouts Forward** (#196, Squad Leader/Meso owner) is **on by default**; `?scoutsForward=0` is the legacy
control. Module 16 owns one `recon` lease and its decision/lifecycle. The leader may recon an unknown objective
approach, a crest detected from terrain height, or a visual screen already represented by LOS/obstacles, but it never
queries enemy truth. A fresh, adequate _leader-owned_ `SquadAI.soldierContact` suppresses the order; aggregate
`squad.contact` is not personal knowledge. Scout selection is deterministic, scout-role first, keeps an eligible
scout buddy pair together where practical, never sends the whole squad, and draws no combat RNG. The main-body anchor
and non-scout hold points stay fixed while scout order intents flow through the existing squad-stability producer,
normal navigation and the Movement Resolver; scouts remain ordinary Engagement/Perception actors.

A scout's direct sight is a personal `seen` belief. Recon ends on reportable scout sight, other meaningful contact/
under-fire, completed observation, an 18 s timeout, retreat, leader/mission/phase invalidation or battle end. The
existing `BattleCallouts` path is the only report transport: only listeners who actually receive the message acquire
`told` beliefs; a missed/out-of-range call creates no knowledge. No-contact completion remains uncertainty. A
mission/route/goal signature prevents recon-release-recon churn on the same approach. After only a no-contact completion
or timeout, the existing `regroup-bypass` lease gives the main body at most 9 s to absorb the intentionally-forward
scout geometry and releases early when the scouts are back inside the ordinary cohesion-release band.

**Recon time budget** (#393, `?reconBudget=0` restores the 28 s constant). `RECON_TUNING.timeout` was not derived from anything, and a defender's scouts (about 1.0-1.3 m/s once adoption is counted) did not reach a point 41-50 m out in it, so most defender tasks ended in `timeout` (no report) instead of an observation. A task's budget is now the walk to the farthest scout destination at the slowest scout's own ground speed (`_locomotionGroundSpeed`, else `walkSpeed`) plus `RECON_TUNING.observe` and `reportWatch`, never shorter than the old constant, and the old constant when no pace is known. Module 15c `reconBudget`; no new timer or writer. `recon-budget-check.js` owns the contract.

`BattleSquadStability.reconTelemetry` and the `scouts-forward` observe-only probe expose order reasons, selected
men, scout distance/time, endings, contact/report delivery, wait time, same-approach retrigger blocks, duplicate tasks,
main-body stop context and live anchor drift. `scouts-forward-check.js` owns the deterministic contract. Full-battle
paired benchmark run **37117876560** (36 seeds: 12 meeting, 12 US-defend, 12 GE-defend; OFF `scoutsForward=0`,
ON `=1`) passed: runtime errors 0→0, writer/strategic-writer conflicts 0→0, wall time x0.991 (1.25 gate),
route/targetless stalls 0→0, regroups 195→180, loop alerts 173→97, vacant-objective stalls 28→23, simulated duration
-2.36 s/pair, first contact +3.27 s/pair, first objective progress -2.36 s/pair, captures 60→62. ON issued 363 recon
orders: 301 observed-no-contact completions, 14 scout contacts, 9 timeouts, 36 other cancellations and 77 actually
delivered scout-report beliefs; 307 same-approach retrigger attempts were suppressed. Resolver changes rose by about
100/pair as expected from the added scout/hold/release movement, but movement stalls were 1→2 total and timeline stalled
man-seconds fell 56→20. The fixed-scenario probe was behavior-neutral in all three scenarios, with zero duplicate
same-signature orders and zero live-recon anchor drift; its meeting scenario observed a real scout-contact episode with
8 delivered report events.

**Intent-based continuation after Squad Leader loss** (#197, Squad Leader/Meso owner) is **on by default**;
`?leaderlessIntent=0` is the legacy control. The existing 6 s `succession` lease still determines when the
most-senior survivor becomes the new leader. At leader loss, module 16 snapshots the last valid parent intent:
mission/macro version, command phase, route index, objective, squad anchor, order version, plan serial/status,
fire-control state, and each surviving man's current fireteam task/destination. While no leader exists, module 16
may not invent or refresh a Meso decision: no new route leg/phase/objective/anchor stride, plan stage/review, COA,
fire-control decision, clear-contact order, recon, regroup, bound, or fireteam destination publication. Already
published Movement Resolver orders remain ordinary physical intents and can finish; an already-live bound can expire
normally; Perception/Engagement still own immediate threat acquisition, firing, suppression/stress and local survival;
retreat remains legal through its existing owner. Ordinary contact is reported through existing Perception/Callouts
channels and does **not** manufacture a special General retask during the short command gap. When succession completes,
the successor receives an explicit hand-back and normal Meso ownership resumes.

`BattleSquadStability.leaderlessTelemetry` records inherit/hand-back episodes, duration and local action classes;
the `leaderless-intent` observe-only probe checks route/phase/order-version/objective/anchor/fireteam drift and new
Meso-lease creation. `leaderless-intent-check.js` owns the deterministic contract. Final full-battle paired benchmark
run **37121639099** (36 seeds: 12 meeting, 12 US-defend, 12 GE-defend; OFF `leaderlessIntent=0`, ON `=1`) passed:
runtime errors 0→0, writer/strategic-writer conflicts 0→0, wall time x0.975 (1.25 gate), movement stalls 2→2,
route/targetless stalls 0→0, stall wakes/repeats 263→263 / 62→62, timeline stalled onsets/samples 2→2 / 6→6,
Movement Resolver changes 80,292→80,215, regroups 201→202 and long regroups 0→0. The ON arm exercised **110**
leaderless episodes totaling **633.75 squad-seconds**: 102 successor hand-backs, 7 squads destroyed before hand-back,
and 1 episode live at the time limit. Behavioral differences were small but real: casualties 833→828 and captures
49→47; first-contact/first-fire timing was unchanged.

Loop alerts rose 117→148, so they were investigated rather than ignored. The +31 alerts occur in four affected pairs:
**+27 are existing posture-churn diagnostics** (Engagement/stance ownership), while the remaining +4 in one meeting
seed are 2 order-churn, 1 position-seeking and 1 low-forward-progress alert during a changed downstream trajectory.
That seed still has zero movement/route/targetless/timeline stalls and finishes substantially earlier; aggregate
stall wakes/repeats remain exactly flat, so no new succession/release command loop was found. Targeted read-only probe
run **37122188486** then exercised **56 non-retreat leaderless samples** on known affected seeds and found 0 route-index,
phase, order-version, objective, anchor, fireteam-destination or new-Meso-lease violations, with 0 m max anchor/objective/
fireteam drift; both probe battles matched their probe-free controls exactly.
