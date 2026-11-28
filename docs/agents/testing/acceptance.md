# Acceptance and rollback

**Kind:** current testing contract. Index: [testing](../testing.md). **Read when:** deciding whether a change is accepted, or how to roll it back.

## What counts as acceptance

- Evidence is pinned to an exact head SHA. A new head invalidates older results as current-head acceptance; the requester says which older gates stay valid ([handoff rules](../handoffs.md#route-work-to-muse)).
- A task file, a handoff, a mention, a dispatch acknowledgement or a green launcher is not a test result. Browser QA is complete only when Muse returns evidence for that exact source.
- Controlled harness success does not establish natural-battle acceptance; natural behavior needs the [benchmark gate](benchmarks.md#rules).
- A behavior-preserving change must be deterministic-equivalent: same-seed snapshots, final state, counters and receipts all match ([constitution](../../../.specify/memory/constitution.md) principle II).

## Rollback

- Every controller or skills change ships behind its own off flag that restores the old behavior (owner rule 2026-10-31), and legacy play (`?tacticalController=legacy`) must stay equal to `main`. Exception (owner-approved 2026-11-28): an owner-authorized Phase E retirement slice rolls back by reverting its PR to a pinned pre-retirement reference ([contract](../spec-kit.md#phase-e-rollback-exception)).
- A candidate that regresses movement feel is reverted as a unit.
- `main` deploys to production on every push; a bad merge is rolled back by reverting its squash commit in a new PR, through the same CI gates.

<!-- The sections below moved verbatim from docs/agents/battle-architecture.md at d15687b. -->

## Performance gate

**Performance is a gate.** A median slowdown of more than ~25% per battle on the same profile
means stop and profile. Don't hide it with a bigger step, shorter battles or disabled systems.
Wrap hot functions in the harness and fix the dominant subsystem at its owner. Optimisations must
preserve determinism and behaviour.

## Change discipline

**Change discipline:** one conceptual change per commit. Use a branch plus preview for anything
that crosses an ownership boundary. If a candidate regresses movement feel, revert it as a unit.

## Statistics

**Statistics:** the standard benchmark with `seeds` 1 is one battle per arm, so it proves that a change is inert (identical records) and
where and how an arm first diverges (`firstDivergence`, the per-window counters); it carries no rate, no p-value and no win
split, and one battle's counters are a size, not a finding. With `seeds` above 1 the unit is the seed, and the paired sign test on an
event count (casualties, shots, retreat samples, resolver changes, loops) is the evidence, as in the old 100-battle runs; the null arm
measured on one seed (a 0.07% step nudge, three runs) moved total casualties 68 to 81 against `coa=1` at 53, so a single battle's
difference between arms is inside that spread until many seeds say otherwise. Win splits are underpowered. Telling 10% from 3.3% needs ~216 runs per arm, and a
30-run arm can't carry a claim. Report Fisher p-values and don't read mechanism into a
four-run swing. Live-browser runs at `timeScale` 8 aren't deterministic, so use the replay script
for controlled pairs, and serve both arms the same way: `battle_sim_local.php` in preview mode (a
`preview.json` beside it) reads `state/` and the audio manifest two directories up.

## Current gate parameters

<!-- Moved from .specify/memory/constitution.md v1.1.0 (Performance Standards); values unchanged. Changing them needs the owner's approval. -->

- **Official performance acceptance gate and deterministic regression:** the 600-second natural meeting scenario, seed `controller-natural-20261026-0002`, `strategicInterception=0`, fixed timestep 0.15 s, controller on (the default since #785; it used to need `tacticalController=new`).
- **Primary profiling environment:** the 120 m skills-range lab, seed `skills-range-0001`, 210 simulated seconds, `labMove=autonomous`, `pinSeed=1`, preview build.
- **Wall-time ratio:** the integrated controller's requirement is at most 1.25x legacy overhead ([constitution](../../../.specify/memory/constitution.md), principle VII). The standard benchmark's compare step fails a run whose median wall-time slowdown is above 25% (`compare_benchmark_arms.cjs`). The owner confirmed on 2026-11-28 that 1.25x stays the formal acceptance gate, including for Phase E. The baseline set for the default switch (#785: main d036b3f, meeting x1.695, US defense x1.506, GE defense x1.435; [roadmap section 7](../../architecture/AI_SKILLS_ROADMAP.md)) is historical context, not a replacement gate. A conflict between the two goes to the owner with numbers.
- **Before anything destructive** (deleting runs, branches, data): dry run with exact counts, exclude cited evidence, honor the [retention rules](../ci/housekeeping.md), verify afterwards and account for any discrepancy.
