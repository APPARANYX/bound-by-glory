# Benchmark dispatch

**Kind:** current CI contract. Index: [CI and workflows](../ci-workflows.md). **Read when:** a benchmark has to be launched or its inputs chosen. **Who launches:** only Muse/Kit. Pushing a launcher request (or pressing a `workflow_dispatch` button, or running a local browser probe, even on one seed) **is** execution, and it is reserved for Muse/Kit ([ownership](../handoffs.md#muse-browser-qa-ownership)). Other agents choose the inputs from this page, then post the exact-head handoff with the `needs-kit-testing` label; they never push the triggering branch or file.

**Before any launch:** the exact-source [Skills Lab preflight](../testing/skills-lab.md#preflight-before-any-battle-benchmark) must have passed, with physical evidence for the skill being benchmarked, and its run and head SHA go in the handoff.

<!-- Moved from docs/agents/ci-workflows.md at d15687b. The temporary per-topic dispatch workflow section was removed: the permanent launcher below replaced it. -->

## Standard benchmark inputs

Strategic diagnostic replay may reuse completed same-branch battle collection when the simulation sources, collection/server workflow steps, seed prefix, count, duration, fixed step, 12-objective profile and diagnostic integrity match. `scripts/reuse_strategic_evidence.cjs` validates the source artifacts and records their original run/SHA. The selected forensic probes, their controls and aggregate acceptance always run on the current head. A runtime or collection-configuration change requires fresh battles; the optional `reuse_run` dispatch input requests a specific source and fails if it is ineligible.

Standard benchmark battles default to 600 simulated seconds at a fixed 0.15 s step. For endurance testing,
`battle-benchmark-standard.yml` and the permanent Agent Benchmark Launcher accept `sim_seconds` (integer 60–10800).
If `sim_seconds` is not 600 and `windows` is omitted, the entire match is measured as `0+sim_seconds` rather than
only the first contact window. For a 50-seed full-battle regression, use `seeds=50`, `sim_seconds=10800`,
`windows=0+10800`, and the same explicit 5 km gameplay flags in both arms; these are 50 independent scenarios,
not 50 temporal windows of one scenario. Both arms replay the same seeds for deterministic comparison; compare
separate commits with separate matched-seed runs. Artifacts preserve every record, and results go to the
`benchmark-results` branch. This extends the standard paired benchmark, not the main-only 300-battle matrix.

**Benchmarks run on GitHub, never locally.** Dispatch `battle-benchmark-standard.yml` on the branch
and on `main` with the same `seed` input and no flags for a paired comparison across commits, or on the branch with `query_on`
set for an A/B of a flag, and `seeds` (e.g. 100) when the flag needs a verdict and not only a look. The result is published to the `benchmark-results` branch and the artifacts keep every record. Local Playwright runs are for
probes and single-seed replays only (the scripted benchmark is one seed, about two minutes: `BATTLE_BENCHMARK_WINDOWS=contact+60,every60
BATTLE_BENCHMARK_COUNT=1 BATTLE_BENCHMARK_SEED=<seed> node scripts/run_battle_benchmark.mjs`).

## Permanent agent benchmark launcher (Muse/Kit's procedure)

The steps below are how Muse/Kit launches. Other agents read them only to fill in the request.


The canonical [⭐ Agent Benchmark Launcher](../../../.github/workflows/agent-benchmark-launcher.yml) accepts a JSON request placed at `.github/benchmark-request.json` on a **new branch matching** `work/benchmark-launch/**`. Use GitHub create-branch (from main or the desired source) and create-file on that branch. Its push triggers the launcher, which invokes an **existing** workflow through authenticated `gh workflow run`. The launcher does not run any benchmark directly and does not change gameplay. Do not merge launch branches.

Request examples (JSON file content):

```json
{"benchmark":"standard","seed":"live-mv0z6zy9-4lhnw","seeds":"1","battle_type":"meeting","query_off":"","query_on":"","origin_agent":"chatgpt","correlation_id":"issue-431"}
```

```json
{"benchmark":"causal","exact_seed":"live-mv0z6zy9-4lhnw","seconds":"660","side":"ge","ids":"62,63,67","squads":"ge-1"}
```

Other selectors: `targeted-fire` (seeds, seconds, side, role, ids, squads), `timescale` (seed, seconds), `probe-pack` (seed, seeds, map `tactical` or `strategic`, sim_seconds, query_off, query_on, probes, origin_agent, purpose; the paired table is printed in the Compare arms job log and kept as the `probe-pack-result` artifact), `matrix-smoke` (no inputs), and `matrix-full` (seed, battles_per_worker, worker_minutes_cutoff). **Full matrix** always runs on main and requires `"confirm_full_matrix": true` to avoid accidental 300-battle workloads. Every request may specify `"ref": "main"` (default) or an approved feature branch, except full matrix. Standard also accepts `query_off`, `query_on`, `windows`, `purpose`; causal accepts `query`, `seeds`, `role`. An exact causal seed executes once **per each of three scenarios**; review meeting/us-defend/ge-defend separately.

After launching, inspect the **launcher** Actions run for successful dispatch, then locate the **child workflow** named in the request and verify its source ref, inputs, conclusion and artifact evidence. Launcher success does not mean benchmark success. For another request, use a fresh unique launch branch (do not rewrite/merge the previous branch). The manual Actions `workflow_dispatch` buttons remain usable.

Never create another temporary dispatcher workflow.
