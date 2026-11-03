# Data Model: Reduce the new controller's geometry query volume

**Date**: 2026-11-03 | **Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

## Per-step cache

A single map, owned by the geometry query layer, scoped to one 0.15 s simulation step.

| Field | Type | Notes |
|---|---|---|
| `stepIndex` | integer | `Math.floor(sim.time / 0.15)`. The cache is cleared when this changes. |
| `entries` | map | Key → result. Created empty at each step boundary. Bounded by the distinct pairs per step (a few thousand). |
| `navVersion` | string | The obstacle/nav version at the time of the entry. An entry is valid only if the current version matches. |
| `hits` / `misses` | counters | Diagnostic only (exposed for the profiler, not for gameplay). |

### Cache key (per query kind)

| Query kind | Key components |
|---|---|
| `sightBlocker` / `sightBlocked` | Rounded endpoints (1 cm): `ax,ay,az > bx,by,bz` + nav version. |
| `hasLineOfSight` | Soldier pair ids `a.id > b.id` + nav version. (Position alone is insufficient: stance affects eye height.) |
| `movementClear` | Rounded endpoints (1 cm): `ax,az > bx,bz` + nav version. |
| `lineOfSightBlocked` | Rounded endpoints + heights (1 cm): `ax,az,ay > bx,bz,by` + nav version. |

Keys are directional (as called). A pair queried in the opposite direction is a separate entry — this is conservative and matches the measured repeat rate (a lower bound).

### Invalidation rules

- The map is cleared at each step boundary (`stepIndex` change).
- An entry is valid only if its recorded `navVersion` equals the current nav version (dynamic obstacle / geometry change invalidates).
- A query for a kind with no cache falls through to the uncached path (never fails).

## Pruning rule (P2, per rule)

| Field | Type | Notes |
|---|---|---|
| `rule` | identifier | e.g., `skip-non-improving-edge`, `skip-known-blocked-target`. |
| `condition` | predicate | The provable condition under which the query is skipped (must be a strict under-approximation: it only skips when it *proves* the query cannot change the outcome). |
| `callSite` | identifier | `contact-route.pick` or `contact-skills.update`. |
| `validation` | evidence | Deterministic comparison (final state deep-diff, snapshots, counters) with the rule on vs off, plus the paired benchmark delta. |

## Validation evidence (per candidate)

| Field | Type | Notes |
|---|---|---|
| `labNew` / `labLegacy` | wall seconds | Paired uninstrumented 120 m lab (210 s, seed `skills-range-0001`). |
| `meetingNew` / `meetingLegacy` | wall seconds | Paired uninstrumented 600 s meeting (seed `controller-natural-20261026-0002`). |
| `finalStateDiff` | count | Deep-diff differences between cache-on and cache-off final states (must be 0). |
| `snapshotMismatches` | count | Per-30 s snapshot mismatches (must be 0). |
| `counterDiffs` | count | Navigation/route counter differences (must be 0). |
