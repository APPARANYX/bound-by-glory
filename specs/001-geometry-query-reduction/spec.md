# Feature Specification: Reduce the new controller's geometry query volume

**Feature Branch**: `work/spec-kit-perf-pilot`

**Created**: 2026-11-03

**Status**: Draft

**Input**: User description: "Reduce the new Meso controller geometry query volume so the 120m lab ratio meets the 1.25x acceptance gate" (Spec Kit pilot for the current performance work, issue #711)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Per-step geometry query cache (Priority: P1)

The new (Meso) controller issues 4–5× as many geometry queries as legacy on the same map, seed, and roster. Measured 2026-11-03 (120 m lab, 210 s, seed `skills-range-0001`): 2,060,256 geometry queries, of which 516,249 (25.1%) repeat a pair already queried in the same 0.15 s step. The repeats concentrate in `contact-route.pick` (41.7% repeats) and `contact-skills.update` (34.9%), together 82% of all repeats. A cache scoped to a single simulation step, cleared at each step boundary, eliminates the repeated queries without changing any answer, because soldier positions are fixed within a step and static obstacle geometry does not change.

**Why this priority**: It is the bounded, mechanical first fix for the largest measured excess vs legacy. It recovers ~2.2 s of the 28 s lab wall (~8%) with no behaviour change, and it is independently testable and deployable without the pruning work.

**Independent Test**: Run the 120 m lab (new controller, 210 s, seed `skills-range-0001`) and the 600 s deterministic meeting (seed `controller-natural-20261026-0002`) with the cache on and off. The cache-on run must produce an identical final state, identical navigation and route counters, and identical snapshots to the cache-off run, with a lower wall time.

**Acceptance Scenarios**:

1. **Given** the 120 m lab with the new controller, **When** the per-step cache is enabled, **Then** the lab wall time drops by at least 1.5 s vs the same run without the cache, and the final state (`usAlive` 20, `geAlive` 10, no winner) is identical.
2. **Given** the 600 s deterministic meeting, **When** the per-step cache is enabled, **Then** the deep-diff of the entire final state vs the cache-off run is 0 differences, all 20 per-30 s snapshots match, and all navigation and route counters are identical.
3. **Given** a geometry query whose endpoints move between steps, **When** the query is issued in the new step, **Then** the cache does not return the previous step's result (the cache is cleared at each step boundary).
4. **Given** a `hasLineOfSight` query for a soldier pair, **When** the cache is consulted, **Then** the key includes the soldier pair (stance affects eye height), not just the positions.

---

### User Story 2 - Candidate pruning for distinct geometry queries (Priority: P2)

75% of the geometry queries (1,544,007 of 2,060,256) are distinct pairs — genuinely different candidates (each soldier checks a different target, each route edge is a different segment). A cache cannot touch those. Reducing them needs candidate pruning: do not issue a LOS/movement query for a target or edge that cannot improve the current best, or that is already known blocked. This is a design change in `contact-route.pick` and `contact-skills.update`, not a mechanical cache.

**Why this priority**: It is the larger prize (3× the cache saving) but a design change with behaviour risk. It follows the cache, and it is independently testable: each pruning rule must be validated by the same deterministic comparison as the cache.

**Independent Test**: For each pruning rule, run the 120 m lab and the 600 s meeting with the rule on and off. The rule-on run must produce an identical final state and identical counters to the rule-off run (if the rule is behaviour-preserving), or the behaviour change must be explicitly documented and approved by the project owner (if the rule intentionally changes behaviour).

**Acceptance Scenarios**:

1. **Given** a candidate target or route edge that cannot improve the current best, **When** the pruning rule skips its geometry query, **Then** the final state and counters are unchanged vs the unpruned run.
2. **Given** a pruning rule that intentionally changes behaviour, **When** it is proposed, **Then** the behaviour change is documented with before/after evidence and approved by the project owner before merge.

---

### User Story 3 - The 1.25x acceptance gate (Priority: P1)

The integrated Meso controller's official wall-clock acceptance requirement is ≤1.25× legacy overhead. Measured 2026-11-03 the new controller is 1.71× legacy on the 120 m lab (28.0 s vs 16.4 s). The cache (P1) and pruning (P2) together must bring the ratio under the gate. The gate is measured by a paired uninstrumented benchmark (new vs legacy), never by an instrumented profile alone.

**Why this priority**: The gate is the acceptance criterion for the whole Meso controller integration (PR #706). Without it, the controller cannot be accepted.

**Independent Test**: A paired uninstrumented 120 m lab benchmark (new vs legacy, same seed, same roster) shows a wall-clock ratio ≤1.25×, and a paired uninstrumented 600 s meeting benchmark shows the same.

**Acceptance Scenarios**:

1. **Given** the 120 m lab, **When** a paired uninstrumented benchmark runs new vs legacy, **Then** the new/legacy wall-clock ratio is ≤1.25×.
2. **Given** the 600 s meeting, **When** a paired uninstrumented benchmark runs new vs legacy, **Then** the new/legacy wall-clock ratio is ≤1.25×.
3. **Given** a candidate that improves the lab ratio but fails the 600 s gate (or vice versa), **When** it is evaluated, **Then** it is not accepted — both gates must pass.

### Edge Cases

- What happens when a soldier moves between the query and the use of its result within the same step? The cache key must include every input that can change the answer (both endpoints' positions, dynamic obstacle state, nav version); a soldier moving invalidates the entry.
- How does the system handle a geometry query for a pair whose endpoints are identical (zero-length segment)? The cache must handle it without error (the existing zero-length fast path applies).
- What happens when the cache is consulted for a query type that has no cache (e.g., a new query kind added later)? The query must fall through to the uncached path, not fail.
- What happens when the obstacle/nav version changes mid-step (e.g., a dynamic obstacle is added)? The cache must be invalidated by the version change.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST cache repeated geometry queries within a single 0.15 s simulation step, keyed on the query endpoints plus every input that can change the answer (dynamic obstacle state, nav version).
- **FR-002**: The cache MUST be cleared at each simulation step boundary, so no result from a previous step is ever returned.
- **FR-003**: The `hasLineOfSight` cache key MUST include the soldier pair (not just positions), because stance affects eye height and therefore the result.
- **FR-004**: The cache MUST cover the three outermost geometry query entry points (`hasLineOfSight`, `sightBlocker`, `movementClear`) at `contact-route.pick` and `contact-skills.update`, where 82% of the repeats concentrate.
- **FR-005**: The cache MUST NOT change any gameplay outcome: final state, navigation counters, route counters, snapshots, and receipts must be identical with the cache on vs off (deterministic equivalence).
- **FR-006**: Candidate pruning rules MUST skip a geometry query only when the target or edge provably cannot improve the current best or is already known blocked, and each rule MUST be validated by a deterministic comparison.
- **FR-007**: The 1.25× acceptance gate MUST be measured by a paired uninstrumented benchmark (new vs legacy) on both the 120 m lab and the 600 s meeting; an instrumented profile alone MUST NOT be used to claim the gate is met.
- **FR-008**: Each agent working on this feature MUST work on a separate branch, MUST NOT edit another agent's active branch, and MUST record ownership, scope, source, work, changes, evidence, and status in the relevant PR or issue. **FR-008a**: Each agent MUST start from `AGENTS.md` (the agent entry point, per Constitution Principle VII) for the working rules, testing/benchmark map, harness checks, and CI gating — the spec does not restate those rules.

### Key Entities

- **Geometry query**: A line-of-sight or movement-clearance check between two endpoints (soldier pair for `hasLineOfSight`; points for `sightBlocker`, `sightBlocked`, `movementClear`, `lineOfSightBlocked`). Attributes: endpoints, query kind, calling site, simulation step.
- **Per-step cache**: A map from query key to result, scoped to one 0.15 s simulation step, cleared at each step boundary. Attributes: key (endpoints + version + soldier pair where applicable), result, step index.
- **Call site**: The subsystem issuing the query (`contact-route.pick`, `contact-skills.update`, `covered-maneuver.update`, `engagement.updateSquad`, `controller.dispatch`, `squad.updateSoldier`, etc.). Used to attribute repeats and to scope the cache.
- **Acceptance gate**: The ≤1.25× new-vs-legacy wall-clock ratio, measured by paired uninstrumented benchmarks on the 120 m lab and the 600 s meeting.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The per-step cache reduces the 120 m lab (new controller, 210 s) wall time by at least 1.5 s vs the same run without the cache, with identical final state and counters.
- **SC-002**: The per-step cache produces a 0-difference deep-diff of the entire final state on the 600 s deterministic meeting, with all 20 snapshots and all navigation/route counters identical.
- **SC-003**: The paired uninstrumented 120 m lab benchmark (new vs legacy) shows a wall-clock ratio ≤1.25× after the cache and pruning work.
- **SC-004**: The paired uninstrumented 600 s meeting benchmark (new vs legacy) shows a wall-clock ratio ≤1.25× after the cache and pruning work.
- **SC-005**: No geometry query result from a previous simulation step is ever returned (verified by a targeted test that moves an endpoint between steps and re-queries).
- **SC-006**: The spec, plan, and tasks for this feature are complete and traceable: every requirement maps to an automated test or a real Skills Lab receipt, and every agent working on it has a recorded owner and branch.

## Assumptions

- The profiling evidence is the 2026-11-03 measurement (PR #744, `docs/cpu-profiling-analysis.md` §12): 25.1% of 2,060,256 geometry queries are per-step repeats; the cache saves ~2.2 s of the 28 s lab wall.
- The Meso controller integration (PR #706) is the protected base; this feature does not modify #706 directly. The cache lives in the shared geometry query layer, which is present on main.
- The 600 s meeting has no legacy arm yet, so the 600 s gate (SC-004) requires a paired uninstrumented 600 s benchmark (new vs legacy) to be run as part of this feature.
- The other agents working on the Meso optimization stack (PRs #707–#743) are coordinated via GitHub (issues/PRs), per `AGENTS.md` and the working rules; this feature does not duplicate their in-flight work.
- The working-rules prohibition on new plan/roadmap/summary Markdown files is explicitly excepted for the Spec Kit artifacts under `specs/` for this pilot, authorized by the project owner (issue #711).
- `AGENTS.md` is the authoritative entry point for testing, benchmarks, and harnesses; this spec points at it (Constitution Principle VII) rather than restating its rules.
