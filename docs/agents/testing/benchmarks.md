# Natural battle benchmarks

**Kind:** current testing contract. Index: [testing](../testing.md). **Read when:** a change needs paired benchmark evidence or you are reading a benchmark result. How to launch one: [benchmark dispatch](../ci/benchmark-dispatch.md) (Muse launches; you prepare the request).

## Rules

- **A/B work uses the GitHub standard benchmark, not local runs.** No local probe arms and no fingerprint comparisons over many battles (`ab_fingerprints.sh`, `state-fingerprint`, `PROBE_CONTROL=1` on many battles): they take hours and the benchmark does the same job (owner, said three times, 2026-09-30). `battle-benchmark-standard.yml` takes `seed` (the exact scenario seed, same for both arms), `query_off` / `query_on` (each arm's page flags; both empty is a control, and the arms must come out identical) and `seeds` (1 is the scripted scenario; more, such as 100, is a paired run across seeds with `seed` as the prefix). One run plays both arms on one runner and compares them. Compare runs across commits with `scripts/compare_benchmark_arms.cjs` (`--count <path>` pairs any record field). Identical records on `main` and a branch prove a change is inert. A probe is for one seed and a few minutes, never for an arm of twenty seeds.
- **Merge gate for AI behavior** (owner policy 2026-10-29, confirmed 2026-11-28): three parts over meeting, US-defend and GE-defend. (1) The standard paired benchmark (60-100 fresh seeds, 600 s, pinned control SHA) decides. (2) The [causal inaction benchmark](../causal-inaction-benchmark.md) and (3) the playtester probe pack (below) must be read; real broken behavior blocks a merge even with a good score. Tactical runs pin `?strategicInterception=0`. A legacy arm passes `?tacticalController=legacy` (since #785). Same-seed reruns are not independent samples. Late effects need 900 s. Ask for proof that every shard finished.
- **Speed gate:** see [acceptance](acceptance.md#performance-gate) and the [constitution](../../../.specify/memory/constitution.md).
- **Squad-performance scores are triage, never pass/fail.** `run_battle_benchmark.mjs` samples each squad every 2.5 simulated seconds and records a role-aware vector (mission, movement, control, cohesion, combat when exposed, preservation) plus the raw measurements. Support, reserve and garrison squads are not penalized for holding still. Paired runs compare the per-battle squad mean, p10/tail and dimension means; use the raw squad rows and a reproducible seed before changing AI from a score.
- **Controller-on runs are judged by broken behavior** (runtime errors, writer conflicts, stalls, unexplained silence, lost skills), not by how close they come to legacy numbers. Differences from legacy are information.

## Other benchmark families

| Benchmark | Contract |
| --- | --- |
| Causal inaction (firing and movement) | [causal-inaction-benchmark.md](../causal-inaction-benchmark.md) |
| Targeted MG42 fire control | [targeted-fire-benchmark.md](../targeted-fire-benchmark.md) |
| Release matrix (300 battles, main only) | [matrix-diagnostics.md](../matrix-diagnostics.md) |
| Timescale parity | [timescale-parity.md](../timescale-parity.md) |
| Statistics: what one seed or many seeds can prove | [acceptance.md](acceptance.md#statistics) |

## Playtester probe pack

<!-- Moved from docs/agents/testing.md at d15687b. -->

**Playtester probe pack:** `.github/workflows/playtester-probe-pack.yml` plays paired seeds (off arm, on arm, same seed names, three scenarios in up to 10 shards each) with a probe list attached (default `outcome` (winner, living, kills, objectives held), `playtest`, `causal-inaction` (fire-silence and movement-inaction episodes with reasons), `move-stalls`, `contact-flicker`, `bound-episodes`, `squad-idle`, `retreat-episodes`, `fire-gates`, `clear-contact`) and `scripts/merge_probe_pack.cjs` compares every numeric leaf of the probe reports (`probe.path`) with an exact sign test, listing the metrics that moved at p < 0.05 by probe. It answers "what did the soldiers do differently" and "is anything broken" next to "did the outcome move" in one table, on the same seeds; the standard benchmark stays the merge gate. The `map` input is `tactical` (2 km, `strategicInterception=0` added to both arms) or `strategic` (the 5 km default map, 1800 s: about 130 s of wall time a battle with eight probes). `scripts/probes/playtest.js` is the pack's own probe: per side, the share of man-time in each Engagement state, squad-time in each command phase and fire-control state, pin episodes and length, suppressor shares, supported-contact share, rounds (and the share fired while pinned), bound share, retreating squads and the times of first contact and first casualty. Put `strategicInterception=0` in both query arms. Probes do not change a battle; run `PROBE_CONTROL=1 node scripts/run_probe.cjs` on a seed after adding one.
