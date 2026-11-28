# Housekeeping: runs, artifacts and branches

**Kind:** current CI facts. Index: [CI and workflows](../ci-workflows.md). **Read when:** you need to know how long evidence lasts, or a branch or run disappeared.

| What | Rule | Owner |
| --- | --- | --- |
| Workflow artifacts | `retention-days: 7` everywhere (#788), except the final benchmark and probe-pack results, which keep 30 days (`battle-benchmark-standard.yml`, `battle-benchmark.yml`, `playtester-probe-pack.yml`). Read and cite results right away. | each workflow's `upload-artifact` step |
| Workflow runs | `actions-run-retention.yml` runs hourly and deletes completed runs older than 7 days (#789), at most 500 per pass. It never deletes queued or running runs, runs on an open PR's head branch or head commit, or runs on any branch that still exists, except `main`: old `main` runs are deleted. Dispatch defaults to a dry run. | `scripts/housekeeping-old-runs.py` |
| Merged branches | `branch-housekeeping.yml` removes an unmoved merged head after the merge, sweeps stale branches on Mondays, and archives successful benchmark-launch branches (row in the [inventory](workflows.md#documented-workflows)). Read its run summary after your PR merges. | `branch-housekeeping.yml` |
| One-off branch retirement | `retire-branches.yml` (dispatch, dry run by default) deletes the branches listed in `.github/branch-retirement.txt`, each pinned to its expected tip, after tagging any with unique commits as `archive/branch/<name>` (#790). | `retire-branches.yml` |
| Durable benchmark records | the `benchmark-results` branch and `archive/benchmark-source/<sha>` tags | the benchmark workflows |

Closed-PR commits stay reachable on `pull/<N>/head` after their branch is deleted.
