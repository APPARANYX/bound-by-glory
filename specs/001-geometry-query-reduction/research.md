# Research: Reduce the new controller's geometry query volume

**Date**: 2026-11-03 | **Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## Evidence base

All numbers are measured (2026-11-03, PR #744, `docs/cpu-profiling-analysis.md` §12), not estimated.

- **120 m lab, new vs legacy**: new 28.006 s vs legacy 16.375 s (210 s sim, seed `skills-range-0001`, preview `preview-f469a69`) — 1.71×, above the 1.25× gate. Wrappers-off new is 26.761 s, so the ratio is not instrumentation.
- **Query volume**: new issues 669,735 `sightBlocker` calls (vs 161,016 legacy, 4.16×) and 314,106 `hasLineOfSight` calls (vs 65,354 legacy, 4.81×).
- **Query-pair repetition** (profiler v1.7, per-step, directional keys, 1 cm rounding): 2,060,256 total geometry queries, 1,544,007 distinct, 516,249 repeats (25.1%). By kind: `hasLineOfSight` 40.3%, `movementClear` 30.3%, `sightBlocked` 28.4%, `sightBlocker` 20.9%, `lineOfSightBlocked` 16.9%. By call site: `contact-route.pick` 41.7%, `contact-skills.update` 34.9% (together 82% of repeats); `engagement.updateSquad` 8.9%, `squad.updateSoldier` 2.3%.
- **Nesting**: `hasLineOfSight` in a pick is a direct pass-through to `sightBlocked` (identical counts 180,038 / 104,559 / 75,479), so the saving estimate counts only the outermost entry points.
- **Saving estimate**: `hasLineOfSight` 9.8 µs × 126,606 + `sightBlocker` 6.04 µs × 139,688 + `movementClear` 4.65 µs × 34,146 ≈ 2.2 s of the 28 s lab wall (~8%).
- **Determinism**: the pair-instrumented run ends 20/10 with nav 28,000/872/27,128 and route 631/255/80 — identical to the plain new run. Every pair total matches its wrapper call count exactly.

## Why a per-step cache is safe

- Soldier positions are fixed within a 0.15 s step (they move once per step, in `stepMovement`). Static obstacle geometry does not change within a step.
- Therefore the same endpoints give the same answer within the step, provided the key includes every input that can change the answer (endpoints, dynamic obstacle state, nav version; soldier pair for `hasLineOfSight`, because stance affects eye height).
- The cache is cleared at each step boundary, so no cross-step staleness is possible.

## Why pruning is separate work

- 75% of queries are distinct pairs — genuinely different candidates. A cache cannot touch them.
- Pruning is a design change in `contact-route.pick` and `contact-skills.update` (skip a query when the target/edge provably cannot improve the current best or is already known blocked). Each rule needs its own deterministic validation.
- `engagement.updateSquad` (8.9% repeats) and `squad.updateSoldier` (2.3%) are already almost entirely distinct — they are pruning candidates, not cache candidates.

## Related in-flight work (do not duplicate)

The Meso optimization stack (PRs #707–#743, all draft, based on #706's branch) includes adjacent work: #719 (geometry query repetition within each route search), #735 (omit LOS on provably non-improving graph edges — a pruning rule), #730 (certified straight-segment clearance reuse), #742 (personal-space numeric buckets), #714 (duplicate direct-leg clearance). The per-step cache here is scoped to the shared geometry query layer and must be coordinated with #719 and #735, not duplicated. See the coordination note in the plan's task list.

## Open questions

- None that block the cache (P1). The pruning rules (P2) each need their own design decision (which rule, what "provably cannot improve" means for that call site) at implementation time.
