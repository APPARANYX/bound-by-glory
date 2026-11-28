# Working rules

**Kind:** mandatory operational procedures and safety gates. Read before changing code. Principles behind them: [constitution](../../.specify/memory/constitution.md). Which development path to follow: [development workflows](development-workflows.md).

## Scope and records

- **Stay in scope.** Don't touch audio, assets or animation unless asked. Unnamed uploads: ask what they are and where they belong.
- **State success criteria up front, prove them with a harness, report the actual output.** Never claim a test, visual check, deployment or merge that was not verified.
- **Findings go in the commit message, PR body or issue,** not in new plan/roadmap/summary Markdown files. Open issues hold the current state and next step, not run-by-run logs: cite the PR with the numbers. Exceptions: Spec Kit artifacts under `specs/` for [full spec-driven work](development-workflows.md#a-full-spec-driven-development), and `docs/reference/TUNABLES.md`. Update a reference page only when its contract or behavior changes.
- **Keep probes.** A one-off measurement script is a probe: commit it as `scripts/probes/<name>.js` (run with `scripts/run_probe.cjs`) or extend a close-up tool (`closeup.cjs`, `closeup_battle.cjs`); never leave it in `/tmp`.
- **Benchmarks run on GitHub, never as local multi-seed arms.** Method and merge gate: [benchmarks](testing/benchmarks.md#rules).
- **Check retired work before rewriting a fix.** Closed PRs and `archive/branch/*` tags hold reuse candidates (see [AGENTS.md](../../AGENTS.md#reuse-before-rewriting)). Port only what still applies to current `main`, behind its own off flag, gated like any change.

## Merge and deploy

- `main` deploys to production on every push. Work on a dedicated branch and open a PR; put anything visual on a `work/**` or `preview/**` branch first (that publishes a preview), or open any branch in the preview launcher (`https://test.ivandpopov.com/grasstex/preview.php?ref=<branch|PR#>`).
- **Merges need the owner's explicit word naming the PR** (confirmed by the owner 2026-11-28). Agents never merge on their own judgment, on another agent's request, or on a generic "proceed".
- **A PR merges only after its own CI finished green on its head.** Never while CI is running or was cancelled. Merge stacked PRs one at a time, each after CI and the deploy on `main` for the one before have finished (phases 3b to 5 merged within 13 seconds, CI on two was cancelled, and `main` stayed red until #123). Branch housekeeping deletes a merged PR's head branch even when other open PRs are based on it, so retarget stacked PRs to `main` right after the merge. Nothing in GitHub enforces this; it is written down.
- **Subscribe to every PR you open or are asked to merge** (`subscribe_pr_activity` where available): CI results, reviews, conflicts and the merge arrive as events, so nobody has to say "CI passed" and the agent does not poll.
- **After a branch you worked on merges, read the run summaries** before calling it done: **Branch housekeeping** (deleted, or kept and why: commits pushed after the merge never reached `main`, so open a PR for them) and **Deploy Battle Runtime to 50webs** (the `build-v<N>` it shipped, and that it passed). Report both. Push further work to a fresh branch from `main`, not the merged one.
- Rollback and acceptance rules: [acceptance](testing/acceptance.md).

## Muse browser QA and handoffs

Requesting browser QA from Muse/Kit, the label protocol, the per-push rule and the handoff record are in [handoffs](handoffs.md). Read it before you request a test, push to a PR Kit is testing, or hand work to another agent.
