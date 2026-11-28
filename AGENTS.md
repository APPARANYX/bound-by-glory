# Agent entry point

Bound by Glory (repo `APPARANYX/bound-by-glory`, formerly grasstex): a WW2 squad battle simulation. Owner: Ivan (`Teethree89`).

## Start here

1. Read this file and the [working rules](docs/agents/working-rules.md) (mandatory).
2. Pick a [development workflow](docs/agents/development-workflows.md): full spec, lightweight fix, or maintenance. Say which in your first update.
3. Read only the references your task needs (map below). Do not load every reference.
4. Check the current branch, code and open PRs before editing. Historical notes are not a task list.

## Rules that must never be missed

- **`main` deploys to production on every push.** Work on your own branch and PR. Never edit or force-push another agent's branch.
- **Merges need Ivan's explicit word naming the PR**, after the PR's own CI is green on its head. Never merge on your own judgment or on another agent's request.
- **Muse/Kit owns browser testing and benchmark launches** (Playwright, CDP, Skills Lab, battle benchmarks). Request it with the `needs-kit-testing` label plus a comment giving the exact head SHA, runs, flags and acceptance; mentions do nothing. **Every push to a PR Kit tests gets its request in the same step.** [Protocol](docs/agents/handoffs.md#route-work-to-muse).
- **Evidence over inspection.** A handoff, task tick, label or green launcher is not a test. Report only what you verified, pinned to a SHA.
- **One owner per capability.** No second movement writer, timer or competing order path. Fix at the owning layer.
- **Every controller or skills change has its own off flag**, and legacy play (`?tacticalController=legacy`) stays equal to `main`.
- **`[PARKED]` PRs are reference only.** Do not continue, test, label, ready or merge one unless the owner reactivates that PR. You may adapt its ideas into separately authorized work.
- **Phase E (legacy retirement) has not started.** It needs the owner's word and runs as a full spec-driven project.
- Stay in scope: no audio, assets or animation changes unless asked. Never print secrets. ElevenLabs generation only when the owner starts it.

## Controller philosophy

The tactical controller is the default since #785 (`?tacticalController=legacy` rolls back). It is a **rebuild, not a reformat**: port each skill to one controller owner, reusing existing skill logic. Do not tune it to match legacy numbers; behavior will change and tuning comes later. Judge controller runs by real broken behavior (errors, writer conflicts, stalls, unexplained silence, lost skills).

## Reuse before rewriting

Closed PRs and `archive/branch/*` tags hold reuse candidates: speed caches #707-#750 (some redone in #767-#770, #773; #733 rejected), soldier fixes #764 #766 #763 #774 #696 #761, hedge-ambush tests in `archive/branch/work/hedge420-*`, and the #817 salvage list in issue #837. Port only what still applies to `main`, behind its own off flag.

## Reading map

| Task | Read |
| --- | --- |
| Choosing how to work | [Development workflows](docs/agents/development-workflows.md); [Spec Kit](docs/agents/spec-kit.md) for the full path |
| Principles | [Constitution](.specify/memory/constitution.md) |
| Repository layout | [Repository overview](docs/agents/repository-overview.md) |
| AI behavior, ownership, soldiers | [Architecture index](docs/agents/battle-architecture.md), then one subsystem page |
| Planned AI work | [AI Skills roadmap](docs/architecture/AI_SKILLS_ROADMAP.md) sections 7-9 |
| Requesting tests, handing off work | [Handoffs](docs/agents/handoffs.md) |
| Tests, benchmarks, acceptance | [Testing index](docs/agents/testing.md) |
| CI, workflows, housekeeping | [CI index](docs/agents/ci-workflows.md) |
| Runtime lifecycle | [Runtime contracts](docs/agents/runtime-contracts.md) |
| Models, weapons, animation | [Soldiers, weapons and animation](docs/agents/soldiers-weapons-animation.md) |
| Audio (only when asked) | [Audio](docs/agents/audio.md) |
| Deployment and assets | [Deployment and assets](docs/agents/deployment-assets.md) |
| Tunable numbers | [Tunables](docs/reference/TUNABLES.md) |
| Local conversation hooks | [Conversation maintenance](docs/agents/conversation-maintenance.md) |

Each fact has one home. Link to it; do not copy it here.
