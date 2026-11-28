# Development workflows

**Kind:** mandatory procedure. Agents pick the path themselves from what the owner asks; the owner never has to name a Spec Kit command or template. Say which path you chose in your first update.

## Choosing the path

| Signal in the request or the code | Path |
| --- | --- |
| Architectural transition, Phase E legacy retirement, a new tactical skill, a change of decision ownership, a new knowledge or command architecture, a cross-subsystem change, a multi-agent project, or substantial behavioral uncertainty | **A. Full spec-driven** |
| A focused bug, a deterministic regression, a narrow performance fix, a small behavior adjustment, a localized improvement | **B. Lightweight defect or improvement** |
| Housekeeping, a small docs correction, routine config, straightforward tooling upkeep | **C. Routine maintenance** |

When two rows fit, take the heavier path. Path A always needs the owner's go-ahead before implementation starts (the spec is how that go-ahead is asked for).

**Escalate** from C to B, or B to A, as soon as the work turns out to need a second owner, a new writer, a new capability or uncertain requirements. Stop, tell the owner what changed and which path you now propose, and wait before expanding the scope. Never expand silently.

## A. Full spec-driven development

Use [Spec Kit](spec-kit.md): specify, clarify, plan, tasks, analyze, implement, converge. Requirements, ownership, dependencies and observable acceptance criteria are written and reviewed before consequential code. The spec, plan and tasks live under `specs/NNN-name/`; GitHub issues and PRs stay the shared record ([coordination rules](spec-kit.md#multi-agent-coordination)).

## B. Lightweight defect or improvement

No Spec Kit artifacts. The owning issue and PR carry everything:

1. **Evidence of the problem**: a reproduction on an exact seed and scenario, a failing check, or a measured regression.
2. **Scope and acceptance** stated in the PR body before the fix: what changes, what must not, and how success is shown.
3. **Root cause** at the owning layer (steps below).
4. **A regression check** that fails on the old code, when practical.
5. **The applicable gates**: CI, and for behavior changes Muse's Skills Lab preflight and the [benchmark merge gate](testing/benchmarks.md#rules). A controller or skills change ships behind its own off flag (the one exception is an owner-authorized Phase E retirement slice: [rollback by revert](spec-kit.md#phase-e-rollback-exception)).

Behavior changes and diagnostics-only changes go in separate PRs.

### Evidence-first steps

<!-- Moved from docs/agents/battle-architecture.md at d15687b. -->

1. Reproduce on the exact seed/scenario. 2. Measure before editing (diagnostics, provenance,
   route/movement/position state, counters). 3. Name the broken invariant in one sentence.
2. Name the one owning layer and subsystem; two apparent owners is itself the bug. 5. Trace the
   **producer**, not the resolver. 6. Add a failing deterministic check ([offline regression](testing/offline-regression.md)) when
   practical. 7. Make the smallest structural fix at the owner, preferring deletion. 8. Re-run the same
   seed and compare before/after. 9. Run the full harness suite. 10. Benchmark only after a
   material change is stable: standard 100 for checkpoints, 300 for milestones.

**Stop and write a root-cause chain** (observed → evidence → owner → invariant → fix → test)
before coding if any of these hold:

- the fix needs guards in two or more unrelated modules;
- a timer is added to counter another timer;
- A→B→A churn is being fixed in the resolver instead of the producer;
- a soldier with a legal destination stands still with `stuck=false`;
- reservations are unique but bodies still stack;
- metrics improve but it looks worse;
- the explanation got longer.

### Rules for behavior slices

<!-- Moved from docs/agents/battle-architecture.md at d15687b. -->

**Rules for active AI slices.** One conceptual behavior change at a time; existing owner boundaries remain
authoritative; new state has an explicit owner and reader; no presentation system writes simulation truth; no
combat-RNG draw merely to choose tactics; add a deterministic harness/check before relying on a visual impression;
add observe-only probe/telemetry that measures the decision dose; ship behavioral changes behind a flag until the
paired GitHub benchmark shows the efficiency gate is acceptable. **Do not make a behavioral feature imitate the old
simulation merely to satisfy an equality test.** New tactics are expected to change decisions and outcomes; benchmarks
gate broken invariants, determinism, pathological stalls/loops/churn, runtime errors and performance, while behavioral
deltas are evidence to understand rather than something to erase. Equality/neutrality checks belong only to explicitly
non-behavioral tooling or a deliberately isolated legacy/control arm. Once a slice ships, its evidence lives in the PR; update the subsystem page only if its contract changed.

The tactical controller is a rebuild, not a reformat: never cut, cap or retune controller behavior to make a controller-vs-legacy comparison look equal. Reuse existing skills and actions (AI Skills V1) and add a new one only when it is truly unique; say so when you do.

The [Spec Kit bug extension](https://github.github.com/spec-kit/guides/bugfix.html) (`specify extension add bug`) is not installed: the installed Spec Kit is 1.2.6 and the extension would add a second record of each fix beside the PR. Path B uses the issue and PR instead.

## C. Routine maintenance

Make the change directly on a branch, keep it narrow, run the checks that the changed files call for (`python3 scripts/check_agent_docs.py` for docs; the risk-routed CI decides the rest), and open a PR. No spec, no plan file, no benchmark unless runtime code changed.

## Task and evidence states

Use these words, in PRs, issues and `tasks.md`, so nobody reads a handoff as a test:

| State | Means | Evidence required |
| --- | --- | --- |
| Planned | written down, no owner | the task or issue |
| Assigned | one named owner and branch | owner and branch on the task, issue or PR |
| Implemented | code committed and pushed | the commit SHA on the remote branch |
| CI validated | the PR's own CI is green on that head | the run link for that SHA |
| Physically validated | Muse/Kit evidence on that exact head | the verdict comment |
| Accepted | the owner or the gate accepted it | the owner's word or the gate result |
| Merged | on `main` | the squash commit |
| Superseded / Abandoned / Deferred | not done, on purpose | the reason and a link |

A task file, a handoff, a mention, a label or a green launcher is never evidence of testing.
