# Deep CPU profiling — hotspot analysis and optimization candidates

Diagnostic-only investigation. No simulation code was changed to produce
this analysis. All numbers below are measured, not estimated; the sources
are the profile artifacts listed in §1.

## 1. Profiles measured

| Profile | Where | Controller | Simulated | Wall | Real-time | Steps |
|---|---|---|---|---|---|---|
| Baseline 600 s meeting (run 41530432380) | CI, commit a80a4c39 | new | 600.15 s | 48.658 s | 12.33× | 4,001 |
| Branch 600 s meeting (run 41648741452) | CI, branch `work/cpu-deep-profile-20261103`, commit 0bd5027 | new | 600.15 s | 50.411 s | 11.91× | 4,001 |
| 120 m lab, new | Local via preview proxy, build preview-f469a69 | new | 210 s | 28.006 s | 7.50× | 1,400 |
| 120 m lab, new, wrappers off | Same | new | 210 s | 26.761 s | 7.85× | 1,400 |
| 120 m lab, legacy | Same | legacy | 210 s | 16.375 s | 12.82× | 1,400 |
| 120 m lab, new, query-pair instrumentation | Same, profiler v1.7 | new | 210 s | 33.524 s | 6.26× | 1,400 |

Seed for the 600 s meeting: `controller-natural-20261026-0002`,
`tacticalController=new`, `strategicInterception=0`, fixed step 0.15 s.
Lab: distance 120 m, cover mixed, seed `skills-range-0001`,
`labMove=autonomous`, `pinSeed=1`, 210 s. Preview ref
`work/meso-playable-preview-20261103`, SHA
`f469a6993d490bf101fe17026c73f9c4bb5e81ed`.

Artifacts: the branch 600 s profile is GitHub Actions run 41648741452
(artifact `battle-hotpath-manual-79` — `.cpuprofile`, cpu summary, call
chains, SVG flamegraph, per-30 s interval splits, report JSON + markdown).
The lab profiles are in `reports/profile-skills-lab-{new,legacy,new-nowrap}/`.
The baseline artifacts are run 41530432380.

### 1.1 Profiler overhead (measured)

- 120 m lab, new controller: wrappers on 28.006 s vs wrappers off
  26.761 s → the inclusive wall-time wrappers cost **~1.25 s (4.4%)**.
- In the 600 s sampled profile the wrappers' own `clock` helper is the
  largest single self-time entry (2,624.8 ms, 4.94%) and `now` is 2.58%.
  Together with the `profiled` wrapper frames this is ~7–8% of sampled
  time that is instrumentation, not simulation.
- Consequence: wall-clock comparisons between instrumented runs are
  valid (same instrumentation), but absolute wall seconds overstate
  simulation cost by ~4–8%. The 1.71× new-vs-legacy ratio below is
  robust to this: both lab arms carried identical instrumentation, and
  the wrappers-off new run (26.761 s) is still 1.63× the legacy
  wrappers-on run (16.375 s); correcting legacy down by the same ~4%
  gives ~1.71×.
- The query-pair instrumented run (§12) is slower still: 33.524 s vs
  28.006 s plain (+19.7%) — the per-query pair bookkeeping (string
  key + per-step set) is the cost. Its wall time is not used for any
  comparison; only its pair counts are.

## 2. Headline: the new controller is 1.71× legacy on the 120 m lab

| | New | Legacy | Ratio |
|---|---|---|---|
| Wall (210 s sim) | 28.006 s | 16.375 s | **1.71×** |
| Real-time | 7.50× | 12.82× | |
| `squad.updateSquad` (inclusive wall) | 11,863 ms (42.3%) | 3,806 ms (23.1%) | 3.12× |
| `controller.dispatch` (inclusive wall) | 9,733 ms (34.7%) | — (no Meso dispatch) | new-only |
| `contact-skills.update` | 4,492 ms (16.0%) | — | new-only |
| `covered-maneuver.update` | 2,722 ms (9.7%) | — (not in top 12) | new-only |
| `obstacle.sightBlocker` calls | 669,735 (3,913 ms) | 161,016 (948 ms) | **4.16× calls** |
| `squad.hasLineOfSight` calls | 314,106 (2,063 ms) | 65,354 (523 ms) | **4.81× calls** |
| `contact-route.pick` calls | 631 | 0 | new-only |
| Navigation requests | 28,000 both | 28,000 both | 1.00× |
| Navigation replans | 872 | 924 | 0.94× |
| Same-waypoint reuses | 1,370 | 4,855 | 0.28× |

The integrated Meso controller's official wall-clock acceptance is
≤1.25× legacy overhead. On the 120 m lab it is **1.71× — above the
gate**. (The gate is defined for the 600 s meeting benchmark; the lab
is a second, independent measurement on a different map and roster.
There is no 600 s legacy arm in this investigation to compare the gate
directly — see §6.)

Both lab arms end identically (`usAlive` 20, `geAlive` 10, no winner),
so the cost difference is pure overhead, not a different battle
outcome.

## 3. Where the new controller's extra time goes (120 m lab)

The delta is 11.63 s of wall. It is not one function; it is the Meso
controller's machinery plus the geometry queries that machinery issues:

1. **`squad.updateSquad` + `controller.dispatch` (the container).**
   `updateSquad` is 11.86 s in new vs 3.81 s in legacy. `dispatch`
   (13a-tactical-controller.js:457) is 9.73 s inclusive in new and does
   not exist in legacy. Everything below lives inside these two.
2. **Geometry query volume (the largest measurable excess).**
   The new controller issues ~4–5× as many sight/LOS queries as
   legacy: `sightBlocker` 669,735 vs 161,016 calls (+508,719 calls,
   +2,965 ms) and `hasLineOfSight` 314,106 vs 65,354 calls (+248,752
   calls, +1,540 ms). Each query is cheap (~6 µs) but the volume is
   ~4.5 s of the ~11.6 s delta. The queries come from
   covered-maneuver, contact-route and contact-skills evaluating
   candidates (cover positions, route edges, contact responses). The
   600 s meeting shows the same pattern at larger scale: 1,343,037
   `hasLineOfSight`, 1,647,589 `movementClear`, 1,643,227
   `sightBlocked` calls.
3. **Contact machinery (new-only).** `contact-skills.update`
   4,492 ms, `covered-maneuver.update` 2,722 ms, `contact-route.pick`
   631 calls. In the 600 s meeting, `contact-route.pick` alone is
   9,037 ms inclusive (17.9% of wall) — see §4.
4. **Per-soldier update cost.** `squad.updateSoldier` is 9,327 ms in
   new vs 7,414 ms in legacy (+1,913 ms); `engagement.updateSoldier`
   is 4,549 ms vs 2,289 ms (+2,261 ms). The new controller's soldiers
   do more per step (perceive → findTarget → detectionRange is the
   #2/#3 call chain in both lab arms).

The self-time top list in the lab (new) is diffuse: `axes`
(obstacle-field.js:33) 5.36%, `(program)` 4.49%, `clock` 4.40%,
`gatherSegment` 3.70%, `now` 3.10%, `hearGunfireBelief` 2.46%,
`obbInterval` 2.30%. No simulation function exceeds ~5.4% self time.
This is a volume problem (many cheap queries + many per-step updates),
not a single hot function.

## 4. The 600 s meeting: route planning is the clearest wasted work

`contact-route.pick` (13g-tactical-contact-route.js:352):

| | 600 s meeting | 120 m lab (new) |
|---|---|---|
| Calls | 8,970 | 631 |
| Inclusive wall | 9,037 ms (17.9%) | — |
| Avg per call | 1,007 µs | — |
| Fresh searches | 3,862 | 255 |
| Failed fresh | 3,320 (**86% of fresh**) | 80 (31% of fresh) |
| Terminal reason for all failures | `no-connected-progress-route` (3,320/3,320) | `none` 80 |
| Negative-cache hits | 5,105 | 353 |
| Fresh re-trigger reasons | contact-rounded-location-changed 2,427; contact-observation-metadata-changed 1,220; goal-changed 104; first-observation 79; contact-precise-location-changed 32 | metadata-changed 118; rounded-location-changed 73; goal-changed 41; first-observation 23 |
| Edge rejections | nav-detour-budget 18,972; no-connected-progress-route 3,320; excessive-observed-exposure 1,514; overlong-physical-detour 1,157 | — |
| Candidates returned | 627,031 from 3,867 queries (~162/query) | — |

86% of fresh route searches fail, and every failure ends the same way:
the graph search finds no route that makes progress toward the goal.
The search is re-triggered mostly because the contact's rounded
location changed (2,427) or its observation metadata changed (1,220) —
i.e. the threat moved by ~1 m or its metadata ticked, invalidating the
previous (negative) result. A cheaper conservative pre-check ("is there
any progress route at all from here, in the coarse graph") before the
full search would avoid most of these. The negative cache already
exists (`failedPlans`, keyed on rounded positions + threat + underFire +
nav version + taken count) and absorbs 5,105 calls; the 3,862 fresh
searches are the ones whose key changed. Classification: C — the
pre-check must be conservative (it may only skip when provably no
route exists), otherwise it changes behaviour.

## 5. Per-step cost triples after contact (600 s meeting)

Wall seconds by 30 s snapshot (branch run; baseline identical):

| Sim time | Cumulative wall | Per-30 s wall | Alive US/GE |
|---|---|---|---|
| 30 s | 2.1 s | 2.1 s | 50/50 |
| 90 s | 5.1 s | 1.5 s | 50/50 |
| 180 s | 10.1 s | 2.1 s | 50/50 |
| 210 s | 13.5 s | 3.4 s | 48/49 |
| 240 s | 18.8 s | 5.3 s | 46/48 |
| 270 s | 23.4 s | 4.6 s | 42/46 |
| 300 s | 28.8 s | 5.4 s | 34/45 |
| 600 s | 50.4 s | ~1.5 s | 20/34 |

Per-step cost roughly triples after first contact (~t=200 s) and stays
elevated through t≈300 s, then falls as casualties thin the roster.
Per-interval CPU confirms it: 1.4–2.1 s sampled per 30 s sim before
contact, 3.4–5.4 s during t=180–270 s, back to ~1.5 s late. The growth
is inside `updateSquad` (perceive → findTarget → detectionRange,
personal-space tick, covered-maneuver) — more enemies visible means
more sight tests per soldier, and more contact responses. The single
most expensive step observed is ~142 ms (vs an 11.9 ms average).
Classification: E (uncertain) — the decomposition of the contact-phase
`updateSquad` growth has not been done; it is the highest-leverage
unknown, not yet a concrete fix.

## 6. Top 20 self-time functions (600 s meeting, branch run)

48,600 samples, 53.1 s sampled, 0 unattributed, 0 untimed. Self time
is diffuse; no simulation function dominates.

| # | Function | Self | % | Inclusive |
|---|---|---|---|---|
| 1 | `clock` (profiler) | 2,624.8 ms | 4.94% | 3,790 ms |
| 2 | `(program)` | 1,493.6 ms | 2.81% | 1,494 ms |
| 3 | `now` (profiler) | 1,368.6 ms | 2.58% | 1,369 ms |
| 4 | `publicRecord` (18-command-reception.js:504) | 892.5 ms | 1.68% | 1,011 ms |
| 5 | `resolve` (movement-resolver.js:564) | 882.6 ms | 1.66% | 5,379 ms |
| 6 | `(garbage collector)` | 814.0 ms | 1.53% | 814 ms |
| 7 | `stepMovement` (battle-sim.js:763) | 766.4 ms | 1.44% | 6,383 ms |
| 8 | `tick` (51-soldier-personal-space.js:239) | 765.5 ms | 1.44% | 838 ms |
| 9 | `perceive` (squad-ai.js:2175) | 669.5 ms | 1.26% | 3,156 ms |
| 10 | `detectionRange` (squad-ai.js:318) | 652.6 ms | 1.23% | 946 ms |
| 11 | `blocked` (battle-navigation.js:198) | 625.3 ms | 1.18% | 1,098 ms |
| 12 | `gatherStatic` (39-navigation-physicality-debug.js:200) | 623.1 ms | 1.17% | 973 ms |
| 13 | `profiled` (profiler) | 582.6 ms | 1.10% | 42,733 ms |
| 14 | `tick` (17-soldier-mind.js:702) | 538.7 ms | 1.01% | 1,031 ms |
| 15 | `segmentObb` (39-navigation-physicality-debug.js:329) | 496.0 ms | 0.93% | 814 ms |
| 16 | `findTarget` (squad-ai.js:980) | 490.0 ms | 0.92% | 1,821 ms |
| 17 | `destinationFree` (51-soldier-personal-space.js:108) | 466.4 ms | 0.88% | 483 ms |
| 18 | `wallCandidates` (battle-navigation.js:157) | 439.4 ms | 0.83% | 439 ms |
| 19 | `dispatch` (13a-tactical-controller.js:457) | 411.0 ms | 0.77% | 16,489 ms |
| 20 | `runDrill` (engagement.js:1052) | 410.5 ms | 0.77% | 4,143 ms |

Top inclusive: `BattleSim.step` 46,934 ms (88%), `updateSquad`
19,453 ms, controller `dispatch` 16,489 ms, `updateSoldier`
15,165 ms, `fireAndMovement` 14,801 ms, covered-maneuver `update`
9,778 ms.

Top call chains (inclusive sampled time, no double-counting):
- `updateSoldier → resolve (movement-resolver)` 0.85%
- `updateSoldier → perceive → findTarget → detectionRange` 0.73%
- `BattleSim.step → _frame → stepMovement` 0.72%
- `runHook → tick (personal-space)` 0.46%
- `resolve → resolveDestination → destinationFree` 0.43%
- `updateSoldier (engagement) → runDrill` 0.40%

Note the codebase is already heavily optimized in these paths:
`gatherStatic` already uses a spatial grid + stamp dedup + scratch
reuse; `wallCandidates` already caches per cell-rectangle;
`hasLineOfSight` already does range-first, sight-second with sorted
enemies; `contact-route.pick` already has a negative-result cache and a
retained-route fast path; `settle` in command reception already caches
per battle.time. The remaining cost is the volume of calls, not
unoptimized inner loops. That is why the candidates below are
structural (fewer queries, cheaper pre-checks) rather than
micro-optimizations.

## 7. Allocation / GC

- GC self time: 1.53% (600 s), 1.35% (lab new), 0.81% (lab legacy).
  GC is not a major cost, and allocation pressure is low — the
  bottleneck is the volume of geometry queries and per-step AI work,
  not allocation churn.
- A heap-allocation profile (CDP HeapProfiler, 512 KiB interval) was
  attempted for the 120 m lab (new controller) but the renderer was
  killed before completing, most likely OOM: the heap profiler adds
  memory overhead on top of the battle page, and the VM had ~830 MB
  available. The run is not essential — GC% already bounds the
  allocation cost — but if allocation attribution is wanted, run it
  in CI (where memory is plentiful) via `BATTLE_PROFILE_HEAP=1` /
  `SKILLS_LAB_HEAP=1`, not on this VM.

## 8. Classification of expensive work (A–E)

| Work | Class | Why |
|---|---|---|
| `BattleSim.step` / `_frame` / `stepMovement` — the per-step simulation itself | A (essential live) | It is the simulation. Cannot be skipped; only made cheaper per unit. |
| `perceive` / `findTarget` / `detectionRange` / `hasLineOfSight` — spotting | A/B | Live per-step (enemies move), but the *volume* is the issue: the new controller issues 4–5× legacy's queries. The queries themselves are essential; the excess count is the candidate (§9.1). |
| `contact-route.pick` fresh searches | C (safely reusable *if* the pre-check is conservative) | 86% fail identically. A coarse reachability pre-check can skip provably-impossible searches. Must not skip any search that could succeed. |
| `movement-resolver.resolve` / `nextWaypoint` / physical reuses | A/C | 96.5% of waypoint requests already reuse (306,066/317,199). The reuse path is working; the remaining cost is the 11,133 rebuilds + the per-call `resolve` overhead. |
| `personal-space.tick` + `destinationFree` | C | Spatial hash rebuilt per tick with string keys; numeric keys are behaviour-preserving (PR #742 exists for this). |
| `publicRecord` defensive copies | B/C | The copy prevents mutation of the authoritative command record. Removing it needs proof callers don't mutate, or an immutable record. |
| `gatherStatic` / `wallCandidates` / `segmentObb` / `blocked` | A (already optimized) | Grid + stamp dedup + caching already in place. Further gains need fewer callers, not faster callees. |
| `hearGunfireBelief` | A/B | Per-soldier belief update from perceive. 706 ms (new) / 1,280 ms (legacy) in the lab — notable but not the excess; legacy spends *more* on it absolutely. |
| Contact-phase `updateSquad` growth (tripling) | E (uncertain) | The growth is real and large, but its decomposition is not yet measured. Needs a per-interval breakdown of `updateSquad` before any fix is proposed. |
| `(program)` unattributed time | — (measurement) | 2.81% (600 s), 4.49% (lab new), 10.68% (lab legacy). In the lab it is mostly render/compositing between drive batches, not simulation. Do not treat it as sim cost. |

## 9. Top five optimization candidates

### 9.1 Reduce the new controller's geometry query volume (STRONGEST — do first)

**Evidence.** The new controller issues 4.16× as many
`sightBlocker` calls and 4.81× as many `hasLineOfSight` calls as
legacy on the same map, seed and roster (§2). That is ~4.5 s of the
~11.6 s lab delta. In the 600 s meeting the same queries run at
1.3–1.6M calls each. The queries come from covered-maneuver,
contact-route and contact-skills evaluating candidates.

**Change.** Determine, per call site, whether the queries repeat the
same (a, b) pair within a step (cacheable) or are genuinely distinct
candidates (needs pruning). Two sub-steps: (a) instrument the three
call sites to count distinct vs repeated query pairs per step; (b)
then either cache repeated pairs for the step (with invalidation on
any movement of either endpoint — dynamic obstacles and moving
soldiers both invalidate) or cap/prune the candidate set evaluated
per step.

**Measurement done 2026-11-03 — see §12.** Step (a) is complete:
25.1% of the 2.06M geometry queries are repeats of a pair already
queried in the same step, concentrated in `contact-route.pick`
(41.7% repeats) and `contact-skills.update` (34.9%). A per-step
cache of the three outermost entry points saves ~2.2 s of the 28 s
lab wall (~8%). The remaining 75% are distinct pairs and need
pruning, not caching.

**Safety.** A per-step cache is only safe if every input that can
change the answer is part of the key (both endpoints' positions,
dynamic obstacle state, nav version). Identical inputs do not
guarantee safe caching — a soldier moving between the query and the
use invalidates it. The cache must be scoped to a single step and
cleared on any position change.

**Expected benefit + confidence.** If the new controller's query
volume were brought to legacy levels, ~4.5 s of the 11.6 s lab delta
disappears (~40% of the excess, ~16% of new's wall). Confidence
medium: the volume excess is measured, but the repeat-vs-distinct
split is not yet measured — step (a) decides whether the fix is a
cache or a prune. This is first because it is the largest measured
excess vs legacy, it directly addresses the 1.71× gate miss, and it
applies to both the lab and the 600 s meeting.

### 9.2 Cheap conservative pre-check before `contact-route.pick` fresh searches

**Evidence.** 86% of fresh searches fail with
`no-connected-progress-route` (§4); each costs ~1,007 µs; the search
is re-triggered by ~1 m threat movements and metadata ticks.

**Change.** Before the full graph search, run a coarse reachability
check (e.g. flood-fill on the coarse cover graph from the soldier's
cell: is the goal's region reachable at all, and is there any cell
that makes progress toward the goal?). Only run the full search when
the pre-check passes. The pre-check must be conservative: it may
only skip when it *proves* no progress route exists.

**Safety.** Requires the pre-check to be a strict under-approximation
of the full search's reachability. Validate by running the paired
600 s comparison and confirming all 20 snapshots, final state,
counters and receipts are unchanged (the pre-check must not change
any successful search's outcome, only skip provably-failing ones).

**Expected benefit + confidence.** If the pre-check costs ~50 µs and
avoids 80% of the 3,320 failed searches, it saves ~2.6 s of the 9.0 s
pick cost in the 600 s meeting (~5% of total wall). Confidence
medium-high: the failure mode is systematic and the fix is a
well-defined conservative filter. Second because its benefit is
concentrated in the 600 s meeting (in the lab, pick is only 631
calls), while 9.1 is broader.

### 9.3 Decompose the contact-phase `updateSquad` tripling

**Evidence.** Per-step wall triples after contact (§5); the growth is
inside `updateSquad` but its sub-component split is unmeasured.

**Change.** Not a code fix — an investigation. Run the 600 s profile
with per-interval `updateSquad` sub-row attribution (perceive vs
covered-maneuver vs personal-space vs contact-skills, per 30 s
interval) to find which sub-component grows and why. Then propose a
targeted fix.

**Safety / benefit.** No behaviour change until the decomposition
identifies a candidate. Expected benefit unknown until measured; the
tripling is ~3 s per 30 s sim during contact, so even a 30% reduction
of the growth is ~1 s per 30 s. Confidence low (E) — this is the
highest-leverage unknown, listed third because it needs measurement
before it becomes a fix.

### 9.4 Personal-space numeric buckets (PR #742)

**Evidence.** `personal-space.tick` 765 ms self + `destinationFree`
466 ms self (600 s). `tick` rebuilds a spatial hash with string keys
(`cx + ',' + cz`) every tick and scans 9 neighbouring cells per
soldier; `destinationFree` does a 3×3 cell scan with distance checks
per resolve.

**Change.** Replace string keys with numeric keys (PR #742,
"personal-space numeric buckets", already an open draft on the same
stack). The bucket structure is rebuilt per tick, so there is no
staleness risk — it is a mechanical change.

**Safety.** Behaviour-preserving by construction (same buckets, same
membership, different key type). Validate with the paired 600 s
comparison (counters + receipts unchanged).

**Expected benefit + confidence.** ~1.2 s of the 50 s 600 s wall
(~2.4%). Confidence high (mechanical, and a draft already exists).
Fourth because the benefit is small, though the risk is the lowest.

### 9.5 Audit `publicRecord` defensive copying in command reception

**Evidence.** `publicRecord` 892 ms self (1.68%, 600 s). It does a
shallow copy plus `copyData(rec.data)` on every call, to prevent
callers mutating the authoritative command record.

**Change.** Audit the callers: if none mutate the returned record,
return the record directly (or a frozen view) instead of copying.
If some mutate, copy only for those callers.

**Safety.** Requires proving no caller mutates, or the command state
corrupts. The `settle` O(N²) fix in the same file shows this area has
already had a per-tick cost bug; audit carefully.

**Expected benefit + confidence.** ~0.9 s of the 50 s wall (~1.8%).
Confidence medium (needs the caller audit first). Fifth because the
benefit is the smallest and the safety case needs work.

## 10. Validation

- **Determinism (600 s meeting, branch vs baseline): exact.**
  A deep diff of the entire `finalState` object finds **0
  differences** (winner, alive counts, personalSpace, tactical
  positions, assignments, receipts — byte-identical). All 20
  per-30 s snapshots match (0 mismatches). Navigation counters
  identical (317,199 requests; 11,133 replans; 306,066 reuses;
  121,815 near-goal; 165,775 same-waypoint). Route counters
  identical (8,970 calls; 3,862 fresh; 3,320 failed fresh; 5,105
  negative-cache; identical freshReasons, freshTerminals,
  edgeRejections). Browser errors identical as multisets (676 in
  both — 674 × 404 asset loads + 2 failed resources, pre-existing
  non-fatal noise). Policy revision 14 in both. The only differences
  are 8 of 84 wrapper-row labels, which are profiler-version
  differences (the branch profiler splits `nextWaypoint` by class
  and drops 4 rows the old profiler emitted), not behaviour.
  Wall 50.411 s vs baseline 48.658 s (+3.6% — CI machine variance
  plus the new profiler code; not a behaviour change).
- **Lab determinism:** new, legacy and wrappers-off new all end with
  `usAlive` 20, `geAlive` 10, no winner; nav requests 28,000 in both
  arms (1,400 steps × 20 soldiers). The query-pair instrumented run
  (§12) also ends 20/10 with nav 28,000 / 872 / 27,128 and route
  631 / 255 / 80 — identical to the plain new-controller run — so
  the pair instrumentation did not change behaviour, and every pair
  total matches its wrapper call count exactly.
- **CI:** the branch 600 s profile run 41648741452 completed
  `success`. The workflow's smoke profiles were not re-run on this
  branch (the push trigger only fires on `main`); exact-head CI and
  the Native Tactical Skills Lab are still to be run for the branch.
- **What was not validated:** no 600 s *legacy* arm exists, so the
  1.25× gate cannot be checked directly on the 600 s meeting — the
  1.71× figure is from the 120 m lab. A paired uninstrumented 600 s
  benchmark (new vs legacy) is the remaining acceptance measurement.
  The heap-allocation analysis is in §7 (GC bounds the cost; the
  heap-profile run OOMed locally). The local 600 s runner
  could not be exercised on this VM (page load is pathologically slow
  there — see `docs/cpu-profiling.md` environment notes; the CI run is
  the authoritative 600 s profile).

## 11. Single strongest candidate

**9.1 — reduce the new controller's geometry query volume.** It is
the largest measured excess vs legacy, it is the direct cause of the
1.71× lab ratio (and therefore of the gate miss), it applies to both
the lab and the 600 s meeting, and the repeat-vs-distinct split is
now measured (§12): a per-step cache at `contact-route.pick` and
`contact-skills.update` saves ~2.2 s of the 28 s lab wall (~8%),
and the remaining distinct-pair volume is the larger follow-on
(pruning). Do the per-step cache first — it is the bounded,
mechanical fix; then measure whether pruning the distinct candidates
is worth the design change.

## 12. Query-pair repetition measurement (candidate 1, 2026-11-03)

The question §9.1 left open: of the new controller's 4–5× geometry
query volume, how much is the *same* query repeated within a step
(cacheable) vs genuinely distinct candidates (needs pruning)?

### Method

`scripts/battle-hotpath-profiler.cjs` v1.7 (commit `032c02e`)
instruments the five geometry query entry points —
`sightBlocker`, `sightBlocked`, `hasLineOfSight`,
`movementClear`, `lineOfSightBlocked` — and records, per 0.15 s
step and per innermost scoped caller, the total queries, the
distinct endpoint pairs, and the repeats (total − distinct).

- Point keys round coordinates to 1 cm. `hasLineOfSight` keys on
  soldier ids (eye height differs by stance, so position alone is
  not a sufficient key). Keys are directional (as called), so the
  repeat rate is a lower bound — a pair queried in the opposite
  direction counts as distinct.
- Call-site attribution is the profiler's scope stack; queries
  inside a `contact-route.pick` are attributed to
  `contact-route.pick` (via `routeActive`), not to the enclosing
  scoped caller.
- The measurement is diagnostic-only (try/catch-guarded, never
  touches simulation state). It costs ~20% wall overhead on the
  instrumented run (33.5 s vs 28.0 s plain), so the wall time of
  this run is not used for any new-vs-legacy comparison.

Run: 120 m lab, new controller, 210 s, seed `skills-range-0001`,
preview `preview-f469a69` — the same config as the §2 lab arms.
Output: `reports/profile-skills-lab-new-pairs/` (in the local
run directory; the profiler and report are on the branch).

**Cross-check:** every pair total matches its wrapper call count
exactly (sightBlocker 669,735 = 669,735; sightBlocked 461,030;
hasLineOfSight 314,106; movementClear 112,626;
lineOfSightBlocked 502,759), so no query was missed or
double-counted at the entry points. Determinism held: final state
usAlive 20 / geAlive 10, nav 28,000 / 872 / 27,128, route 631 /
255 / 80 — identical to the plain new-controller run.

### Results — by query kind

| Query | Total | Distinct | Repeats | Repeat rate |
|---|---:|---:|---:|---:|
| sightBlocker | 669,735 | 530,047 | 139,688 | 20.9% |
| lineOfSightBlocked | 502,759 | 417,724 | 85,035 | 16.9% |
| sightBlocked | 461,030 | 330,256 | 130,774 | 28.4% |
| hasLineOfSight | 314,106 | 187,500 | 126,606 | 40.3% |
| movementClear | 112,626 | 78,480 | 34,146 | 30.3% |
| **Total** | **2,060,256** | **1,544,007** | **516,249** | **25.1%** |

### Results — by call site

| Call site | Total | Distinct | Repeats | Repeat rate |
|---|---:|---:|---:|---:|
| contact-skills.update | 669,263 | 435,879 | 233,384 | 34.9% |
| contact-route.pick | 453,388 | 264,407 | 188,981 | 41.7% |
| engagement.updateSquad | 425,505 | 387,597 | 37,908 | 8.9% |
| engagement.updateSoldier | 177,777 | 149,231 | 28,546 | 16.1% |
| controller.dispatch | 155,024 | 133,254 | 21,770 | 14.0% |
| squad.updateSoldier | 113,206 | 110,551 | 2,655 | 2.3% |
| system:projectile-flight | 32,391 | 32,334 | 57 | 0.2% |
| squad.updateSquad | 20,811 | 20,802 | 9 | 0.0% |
| covered-maneuver.update | 10,277 | 7,340 | 2,937 | 28.6% |
| other (unscoped + systems) | 2,614 | 2,612 | 2 | ~0% |

The repeats are concentrated: `contact-route.pick` +
`contact-skills.update` hold 422,365 of the 516,249 repeats
(82%). The largest single cells:

| Cell | Total | Repeats | Repeat rate |
|---|---:|---:|---:|
| sightBlocker@contact-skills.update | 319,731 | 105,298 | 32.9% |
| sightBlocked@contact-route.pick | 180,038 | 75,479 | 41.9% |
| hasLineOfSight@contact-route.pick | 180,038 | 75,479 | 41.9% |
| lineOfSightBlocked@contact-skills.update | 159,898 | 57,383 | 35.9% |
| movementClear@contact-route.pick | 64,032 | 30,713 | 48.0% |
| hasLineOfSight@contact-skills.update | 45,616 | 31,372 | 68.8% |

Two structural notes:

- `hasLineOfSight@contact-route.pick` and
  `sightBlocked@contact-route.pick` have **identical** counts
  (180,038 / 104,559 / 75,479). Every `hasLineOfSight` in a pick
  issues exactly one `sightBlocked` with the same endpoints — it is
  a direct pass-through, so the two are the same logical query
  counted twice. The same nesting applies elsewhere: `hasLineOfSight`
  calls `sightBlocked` and `lineOfSightBlocked` internally, so the
  516,249 repeat total double-counts nested repeats. The saving
  estimate below counts only the outermost entry points to avoid
  this.
- `hasLineOfSight@contact-skills.update` is the highest-rate cell
  (68.8%): only 14,244 distinct soldier pairs out of 45,616
  queries — the same pairs are checked ~3.2× per step, once per
  fire-control observation per soldier.

### Verdict: cache AND prune, in that order

**A per-step cache is worth doing, scoped to the two repeat-heavy
sites.** The repeats are 25.1% of all geometry queries. Valued at
the wrapper inclusive cost of the three outermost entry points
(`hasLineOfSight` 9.8 µs × 126,606 repeats,
`sightBlocker` 6.04 µs × 139,688,
`movementClear` 4.65 µs × 34,146) the saving is **~2.2 s of the
28 s lab wall (~8%)**. (`sightBlocked` / `lineOfSightBlocked`
repeats are mostly nested inside `hasLineOfSight` and are already
counted in that figure; the direct ones add a little more.)

Safety shape: the cache is scoped to a single 0.15 s step and
cleared at each step boundary. Within a step, soldier positions are
fixed (they move once per step, in `stepMovement`), and static
obstacle geometry does not change, so the same endpoints give the
same answer within the step. The key must still include the
obstacle/nav version and, for `hasLineOfSight`, the soldier pair
(stance affects eye height). Do not cache across steps.

**Pruning is the larger prize and the follow-on.** 75% of the
queries (1.54M) are distinct pairs — genuinely different
candidates (each soldier checks a different target, each route edge
is a different segment). A cache cannot touch those. Reducing them
needs candidate pruning: don't issue a LOS/movement query for a
target or edge that cannot improve the current best, or that is
already known blocked. That is a design change in
`contact-route.pick` and `contact-skills.update`, not a mechanical
cache, and it is the next investigation after the cache lands.
`engagement.updateSquad` (8.9% repeats) and `squad.updateSoldier`
(2.3%) are already almost entirely distinct — they are the
pruning candidates, not cache candidates.

**Revised expectation for candidate 9.1.** The cache alone recovers
~2.2 s (~8% of new's lab wall, ~19% of the 11.6 s new-vs-legacy
delta). Bringing query volume fully to legacy levels would need the
pruning half as well; the cache is the bounded first step.
