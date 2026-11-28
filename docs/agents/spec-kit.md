# Spec Kit (full spec-driven path)

**Kind:** mandatory procedure for [path A](development-workflows.md#a-full-spec-driven-development). Read only when that path applies.

## What is installed

- Spec Kit **1.2.6**, `generic` integration (`.specify/integration.json`). Upstream is at 1.4.5; see [upgrade](#upgrade-decision).
- **Canonical command prompts:** `.muse/commands/speckit.<command>.md`. They are Spec Kit's own files (hashes in `.specify/integrations/generic.manifest.json`); do not edit them by hand.
- Templates `.specify/templates/`, scripts `.specify/scripts/bash/`, principles [`.specify/memory/constitution.md`](../../.specify/memory/constitution.md), features `specs/NNN-name/`.

## How each agent runs a command

The command prompts are plain Markdown, so every agent runs them the same way: **read `.muse/commands/speckit.<command>.md` and follow it, with the user's request as `$ARGUMENTS`**, running any script it names from the repository root. Slash commands are a convenience, not a requirement.

| Agent | Entry point | How it finds Spec Kit | Verified |
| --- | --- | --- | --- |
| Claude Code (Opus, Sonnet) | `CLAUDE.md` imports `AGENTS.md` | skill `.claude/skills/spec-driven-workflow/` (auto-selected by its description) | layout per Claude Code docs; a headless session loaded `AGENTS.md` through `CLAUDE.md` and listed the skill (see the PR) |
| Codex | `AGENTS.md` (native) | skill `.agents/skills/spec-driven-workflow/`, or `$spec-driven-workflow` | file layout per the Spec Kit Codex integration docs; not run in Codex |
| Cursor | `AGENTS.md` (native) | AGENTS.md routes here; read the command file | not run in Cursor |
| ChatGPT and agents working through GitHub | `AGENTS.md` | read the files on GitHub | n/a: reading files is the mechanism |
| Muse/Kit | `AGENTS.md` | `.muse/commands/` is the generic integration's command directory | Muse's existing setup |

The skills are thin adapters that point here; this page and the command files are the only copies of the procedure.

## Lifecycle with this repo's gates

| Step | Command | Gate before the next step |
| --- | --- | --- |
| 1 | `speckit.specify` | spec names owners (Macro, Meso or Micro; one owner per mutable capability), out-of-scope behavior, and observable acceptance |
| 2 | `speckit.clarify` | no `[NEEDS CLARIFICATION]` left; owner reviews the spec |
| 3 | `speckit.plan` | plan passes the constitution check; rollback flag named for every behavior change |
| 4 | `speckit.tasks` | every task has an ID, owner, dependencies and the requirement IDs it serves |
| 5 | `speckit.analyze` | no CRITICAL findings; **owner says go** |
| 6 | `speckit.implement` | one PR per independent slice, on its own branch, each through the normal [merge gates](working-rules.md#merge-and-deploy) |
| 7 | `speckit.converge` | repeat implement and converge until it reports converged; then reconcile states and ask for acceptance |

`speckit.checklist` is optional. `speckit.constitution` changes principles and needs the owner's approval ([governance](../../.specify/memory/constitution.md#governance)). `speckit.taskstoissues` is not used: GitHub issues track a feature, not each task (upstream removed it from core in 1.3.0).

## Artifact conventions (checked by `scripts/check_agent_docs.py`)

- `spec.md` keeps a `**Status**:` line with one of: Draft, Active, Implemented, Superseded, Abandoned, Deferred.
- Requirements use stable IDs `FR-NNN` and success criteria `SC-NNN`. Never renumber; retire an ID by marking it superseded.
- Tasks are `- [ ] TNNN ...` with unique IDs. Each task in an Active spec names the requirement IDs it serves (`FR-003`, or `[US1]` when the story lists its requirements). Every `FR-NNN` of an Active spec appears in at least one task.
- A task may add `Owner: <agent>`, `Branch: <name>`, `Depends: T004` and `Status: <state>` using the [state words](development-workflows.md#task-and-evidence-states).
- `[X]` means implemented and pushed, and the line must cite its evidence: a PR number (`#123`) or commit SHA. Validation states (CI, physical, accepted, merged) go in `Status:` with their links. Never tick a box for work you have not verified.

## Multi-agent coordination

- GitHub is the record: one tracking issue per feature links the spec folder; each slice is its own PR on its own branch; each agent edits only its own branch.
- `tasks.md` is updated **in the PR that changes a task's state**, so the record and the code move together. Do not keep a second checklist in an issue.
- Convergence checkpoints: after each merged slice, run `speckit.converge` on `main` and reconcile `tasks.md`.
- Evidence is exact-head: a result for an older SHA is history, not acceptance. Muse/Kit owns browser runs and benchmark launches; a task or handoff is not proof of testing.
- Handoffs use the [handoff fields](handoffs.md#agent-ownership-and-handoffs).

## Phase E readiness (do not start without the owner's word)

Phase E (legacy retirement, ordered Meso, then Macro, then Micro) is the first project for this path. Its spec should carry: per layer, a removal contract (code, flags and checks that go) and a retention contract (services, flags and diagnostics that stay); the owner audit that proves each capability has one controller owner first (`wire-map-check.js`, the capability contract); one PR per layer with its rollback reference (the last commit where `?tacticalController=legacy` works); acceptance per layer against the [benchmark gate](testing/benchmarks.md#rules); and a final converge against every requirement. The roadmap ([section 8](../architecture/AI_SKILLS_ROADMAP.md)) holds the current plan.

## Pilot record

The first feature, [`specs/001-geometry-query-reduction`](../../specs/001-geometry-query-reduction/spec.md) (issue #711), is **Superseded**: its reconciliation is at the top of its [`tasks.md`](../../specs/001-geometry-query-reduction/tasks.md). Lessons: tasks were never ticked as work moved to other PRs; the spec pinned file and line numbers that changed; validation steps assumed a VM that later ran out of memory; and no state words separated "built" from "tested".

## Upgrade decision

Not upgraded. 1.3.0 to 1.4.5 adds native skill layouts per agent, an opt-in `bug` extension, and fixes; it removes `taskstoissues` (unused here). Installing per-agent integrations would write another copy of every command for each agent, which this repo avoids. If the owner wants the upgrade: commit first, `specify self upgrade --tag v1.4.5`, `specify integration upgrade generic` (it refuses to overwrite modified managed files without `--force` and never touches the constitution), run `python3 scripts/check_agent_docs.py`, and roll back by reverting that commit.
