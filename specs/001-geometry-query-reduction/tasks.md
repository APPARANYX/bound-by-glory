# Tasks: Reduce the new controller's geometry query volume

**Input**: Design documents from `/specs/001-geometry-query-reduction/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Tests**: The spec requires deterministic comparisons and paired benchmarks for every change (FR-005, FR-006, FR-007). Those validation tasks are included below as first-class tasks, not optional.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Coordination and branch setup before any implementation

- [ ] T001 [US1] Coordinate with the in-flight Meso optimization stack (PRs #707–#743): read #719 (query repetition within a route search) and #735 (omit LOS on non-improving edges) and record on the feature PR whether the per-step cache duplicates, complements, or conflicts with them. Do not edit another agent's branch.
- [ ] T002 [P] [US1] Confirm the feature branch `work/spec-kit-perf-pilot` is based on `main` and pushed; open the draft PR for this feature.
- [ ] T003 [P] [US1] Record the owner/scope/source/work/evidence/status handoff on the feature PR per the working rules.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The per-step cache infrastructure that US1 depends on

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 [US1] Implement the per-step cache map in the shared geometry query layer: a `stepIndex` (`Math.floor(sim.time / 0.15)`), an `entries` map (key → result), a `navVersion` check, and diagnostic `hits`/`misses` counters. Clear the map when `stepIndex` changes.
- [ ] T005 [P] [US1] Implement the cache key functions per `data-model.md`: 1 cm rounded endpoints for `sightBlocker`/`sightBlocked`/`movementClear`, soldier pair ids for `hasLineOfSight`, endpoints + heights for `lineOfSightBlocked`, all plus the nav version.
- [ ] T006 [US1] Wire the cache into the three outermost entry points: `battle/obstacle-field.js` (`sightBlocker`, line 303; `sightBlocked`, line 326), `battle/squad-ai.js` (`hasLineOfSight`, line 285), `battle/battle-navigation.js` (`movementClear`, line 127). A query for a kind with no cache falls through to the uncached path.

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Per-step geometry query cache (Priority: P1) 🎯 MVP

**Goal**: Eliminate the 516,249 per-step repeated geometry queries (~2.2 s of the 28 s lab wall) with no behaviour change.

**Independent Test**: 120 m lab (new, 210 s) wall drops by ≥1.5 s with identical final state and counters; 600 s meeting deep-diff is 0 differences.

### Tests for User Story 1

- [ ] T007 [P] [US1] Add a step-boundary invalidation test: move an endpoint between steps, re-query the same pair, and confirm the cache does not return the previous step's result (harness check under `tools/ai-sim-harness/`, or a targeted probe if no suitable check exists).
- [ ] T008 [P] [US1] Add a `hasLineOfSight` key test: the same soldier pair at the same positions but with different stances must not share a cache entry.

### Implementation for User Story 1

- [ ] T009 [US1] Enable the cache at `contact-route.pick` (`battle/modules/13g-tactical-contact-route.js`, line 311) and `contact-skills.update` (`battle/modules/13d-tactical-contact-skills.js`), where 82% of the repeats concentrate.
- [ ] T010 [US1] Run the physical validation on the VM (see `quickstart.md`): 120 m lab new-controller profile with the cache on vs off, and the 600 s CI profile. Record wall times, final states, nav/route counters, and the deep-diff result on the feature PR.

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Candidate pruning for distinct geometry queries (Priority: P2)

**Goal**: Reduce the 1,544,007 distinct-pair queries by skipping queries that provably cannot improve the current best or are already known blocked.

**Independent Test**: For each pruning rule, the rule-on run produces an identical final state and identical counters to the rule-off run (or the behaviour change is documented and approved).

### Implementation for User Story 2

- [ ] T011 [US2] Design the first pruning rule for `contact-route.pick`: define the provable "cannot improve the current best" condition (strict under-approximation) and record it in the feature PR before implementing.
- [ ] T012 [US2] Implement the first pruning rule in `battle/modules/13g-tactical-contact-route.js` and validate it by deterministic comparison (120 m lab + 600 s meeting, cache-on baseline).
- [ ] T013 [US2] Design and implement a pruning rule for `contact-skills.update` (`battle/modules/13d-tactical-contact-skills.js`) and validate it the same way.
- [ ] T014 [US2] Coordinate with PR #735 (omit LOS on non-improving graph edges): if #735 already implements the same rule, do not duplicate it — record the dependency and use its result instead.

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - The 1.25x acceptance gate (Priority: P1)

**Goal**: Bring the new-vs-legacy wall-clock ratio to ≤1.25× on both the 120 m lab and the 600 s meeting, measured by paired uninstrumented benchmarks.

**Independent Test**: Paired uninstrumented benchmarks (new vs legacy) on both environments show ratios ≤1.25×.

### Implementation for User Story 3

- [ ] T015 [US3] Run the paired uninstrumented 120 m lab benchmark (new vs legacy, same seed `skills-range-0001`, 210 s) after US1 + US2 and record the ratio.
- [ ] T016 [US3] Run the paired uninstrumented 600 s meeting benchmark (new vs legacy, seed `controller-natural-20261026-0002`) after US1 + US2 and record the ratio. (There is no legacy 600 s arm yet; this task includes running it.)
- [ ] T017 [US3] If either ratio is >1.25×, record the remaining gap and the next candidate on the feature PR; do not claim the gate from an instrumented profile alone.

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Convergence, handoff, and PR readiness

- [ ] T018 [P] Run `quickstart.md` validation end-to-end and attach the results (lab profiles, 600 s CI run, paired benchmark ratios, deep-diff) to the feature PR.
- [ ] T019 Run `/speckit.converge`: assess the codebase against the spec and append any remaining work as tasks.
- [ ] T020 Update the feature PR with the full handoff (owner/scope, source, work, changes/findings, evidence, status/next) per the working rules, and report to the project owner. Do not merge, deploy, or send completion notifications without authorization.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - US1 (cache) first (P1, mechanical, no behaviour change)
  - US2 (pruning) after US1 (P2, design change, validated against the US1 baseline)
  - US3 (gate) after US1 + US2 (measures the combined effect)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Validated against the US1 (cache-on) baseline
- **User Story 3 (P1)**: Depends on US1 + US2 - Measures the combined gate ratio

### Parallel Opportunities

- T001 (coordination) and T002/T003 (branch/PR setup) can run in parallel
- T007 and T008 (tests) can run in parallel
- Different agents can own different user stories (separate branches per the working rules), but US2 validation depends on the US1 baseline, so US2 implementation should not merge before US1 is validated

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing (T007/T008 should fail without the cache, pass with it)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- The physical testing for every task runs on the VM (lab profiler, CI 600 s profile, paired benchmark) — see `quickstart.md`
