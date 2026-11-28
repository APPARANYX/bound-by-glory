# CI risk routing and Sim test selection

**Kind:** current CI contract. Index: [CI and workflows](../ci-workflows.md). **Read when:** a PR skipped or ran a check you did not expect, or you change `scripts/classify_ci_risk.py`, `risk-route.yml` or `scripts/run_sim_checks.py`.

<!-- Moved from docs/agents/ci-workflows.md at d15687b; edit here. -->

## Risk routing: which PR checks run

`scripts/classify_ci_risk.py` classifies a PR's changed paths into one tier, and that tier alone decides which pull-request checks run. `ci.yml`'s change detector reads it for Syntax and Sim; every browser QA, probe and benchmark workflow on PRs calls the reusable [`risk-route.yml`](../../../.github/workflows/risk-route.yml) first and runs only when `battle_checks` is true.

| Tier | Paths | Syntax | Sim | Browser QA, probes, benchmarks |
| --- | --- | --- | --- | --- |
| docs | `docs/`, `*.md`, issue/PR templates | skip | skip | skip |
| housekeeping | `scripts/housekeeping*`, `scripts/test_housekeeping*` | run | skip | skip |
| ci-config | `.github/workflows/*.yml`, the classifier and its tests | run | run | skip |
| audio, ui, deployment, gameplay, architecture | everything else, unknown paths, mixed changes | run | run | run |

Mixed tiers escalate to architecture, except that docs, housekeeping and ci-config together stay ci-config. Benchmark and probe scripts (`scripts/run_*`, `scripts/probes/`) are never ci-config. Audio and deploy-plan jobs keep their own detectors. Path filters on each workflow still apply on top.

**Off switch:** set the repository variable `CI_RISK_ROUTING=off` (all PRs, takes effect on the next run or re-run), or add the label `ci-full` to one PR and push (labels are read from the event that started the run). Manual `workflow_dispatch` and push runs always run every check. New PR-triggered QA or benchmark workflows must add the `route` job; `scripts/test_classify_ci_risk.py` fails if one is not wired.

## Sim regressions: test selection

`scripts/run_sim_checks.py` owns the Sim suite: every `tools/ai-sim-harness/*-check.js`, the standalone regressions in its `STANDALONE` list and the eight engagement harness seeds. It runs them in parallel (about 57 s wall for all 299, was about 135 s one at a time). Each check runs under `scripts/lib/record-repo-reads.cjs`, which records every repository file it reads; `tools/ai-sim-harness/sim-deps.json` keeps that map.

On a pull request only these run: checks that read a changed file (or a directory a changed file is in), checks that are themselves changed, checks not in the map yet, and the core set (command lifecycle audit and the engagement seeds). A change to the suite itself (`run_sim_checks.py`, the recorder, the map, `ci.yml`, `package*.json`) runs everything, as do manual runs, `CI_RISK_ROUTING=off` and the `ci-full` label. If a check reads a file its map entry does not list, the job fails; refresh the map with `python3 scripts/run_sim_checks.py --all --write-map` and commit it. Add new standalone regressions to `STANDALONE`, not to `ci.yml`.
