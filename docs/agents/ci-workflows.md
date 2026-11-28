# CI and workflows index

**Kind:** index. Read only the page your task needs. `main` deploys to production on every push; the gates below are the mechanical part of the [working rules](working-rules.md).

| Topic | Page |
| --- | --- |
| What each workflow does and when it runs | [ci/workflows.md](ci/workflows.md) |
| Which PR checks run (risk tiers) and Sim test selection | [ci/risk-routing.md](ci/risk-routing.md) |
| Required checks and merge gates | [working rules: merge and deploy](working-rules.md#merge-and-deploy) |
| Launching a benchmark (Muse launches; agents prepare the request) | [ci/benchmark-dispatch.md](ci/benchmark-dispatch.md) |
| Deployment to production and previews | [deployment and assets](deployment-assets.md); deploy rows in the [inventory](ci/workflows.md#documented-workflows) |
| Run, artifact and branch retention | [ci/housekeeping.md](ci/housekeeping.md) |
| Agent automation: Kit label protocol, agent-apply patches | [working rules: route work to Muse](handoffs.md#route-work-to-muse), [agent apply workflow](agent-apply-workflow.md) |
| Documentation checks | `scripts/check_agent_docs.py`, run by the `changes` job of `ci.yml` on every PR |

<!-- Split on 2026-11-28 from a single 85 KB page; the old page is at `git show d15687b:docs/agents/ci-workflows.md`. -->
