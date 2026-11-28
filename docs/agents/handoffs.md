# Muse QA requests and agent handoffs

**Kind:** mandatory procedure, read when you request browser QA or a benchmark, push to a PR Kit is testing, or hand work to another agent. Index: [working rules](working-rules.md).

<!-- Moved from docs/agents/working-rules.md at d15687b. -->

## Muse browser QA ownership

Muse is the owner and execution coordinator for **all browser testing across this
repository**, including interactive UI/visual checks, browser-driven integration and
regression probes, headless Playwright/Puppeteer runs, CDP CPU/heap profiles, Skills Lab
exercises and browser-backed battle benchmarks. Code owners continue to implement
changes, run non-browser Node/PHP/Python/shell checks, and review returned artifacts.
This ownership applies to every agent and Spec Kit workflow, including work on older
branches whose instructions predate this rule.

### Route work to Muse

Before starting a browser test, the implementing agent records a **Muse browser QA
handoff** in the relevant GitHub PR or issue:

- Owner: Muse; requester and implementation owner; status: pending Muse acknowledgement.
- Source: repository, branch, full published commit SHA and baseline/control SHA.
- Target: exact preview URL, expected deployed/build identity, map, seed, controller,
  flags, duration, timestep and any staged premises.
- Task: existing probe/command or explicit UI actions; success criteria, required
  skill/ownership/physical evidence, and the raw artifacts to preserve.
- Existing work: matching CI/run URLs, previous findings and a request identifier
  formed from PR, source SHA, scenario and purpose, so a second agent does not
  duplicate the same browser execution.

**Every new commit needs its own handoff, posted with the push.** When an agent pushes a
new head to a PR or branch that Muse is testing or will test, it posts the handoff for that
exact SHA in the same step as the push, never after: what the commit changes, which runs
and flags it needs, the acceptance criteria, and whether a gate already running on an
older pinned SHA stays valid or must be redone. A pushed head without a stated test plan
leaves Muse guessing (Ivan, 2026-11-08). Keep the `needs-kit-testing` label on.

Muse acknowledges the handoff in that shared record, verifies the actual source and
runtime, and runs the requested checks using its available browser/VM or the existing
approved CI workflow. Muse owns manually requested launches and reruns of
browser-backed workflows; other agents may prepare the request and inspect run
status/results, but must not independently launch another browser run. Follow the
existing permanent benchmark launcher and exact-head Skills Lab preflight rules;
browser ownership does not permit temporary workflows, local multi-seed A/B arms or
bypassing any acceptance gate.

### Kit label protocol

Requesting Kit's browser/VM testing: apply the `needs-kit-testing` label to the issue or PR and state the branch or PR, the exact head SHA, what to test (120 m lab profile, 600 s deterministic validation, or paired benchmark), flags, and acceptance criteria. Mentions and `@` do nothing; the label is the only signal. Kit's hook polls every 5 minutes and label indexing can lag 4-5 minutes. When Kit picks a request up it reacts 👍 on the request comment, sends Ivan the test plan in chat, and posts a start comment with a time estimate; when the gate finishes it posts the verdict, removes `needs-kit-testing` and, for an unambiguous verdict, applies `test-passed` (acceptance met) or `test-failed` (not met, or a regression). Blocked, incomplete or mixed verdicts get no result label; the verdict comment is the record. A re-test needs the label re-applied **and** a new head: the hook wakes only on a head change.

### Evidence, automatic CI and unavailable integrations

What Muse returns, when browser QA counts as complete, how automatic CI evidence is reused, and what to do when no Muse integration is available: [Muse evidence contract](testing/browser-qa.md#muse-evidence-contract). In short: only Muse evidence for the exact source completes browser QA, and Muse being unavailable never waives it.

## Agent ownership and handoffs

**GitHub is the canonical shared record.** Agent-specific memory and chat summaries supplement the
record; they are never the only place another agent can find the work. Record a task owner and scope;
use a separate branch for each agent's parallel edits. Do not edit or force-push another agent's active branch or merge
without explicit authorization; existing CI and deployment gates still apply.

At a handoff, completion, blocker or material scope change, update the relevant PR or issue with the
fields below. Keep the issue's current status and next step concise, and link the PR for detailed
results rather than duplicating run-by-run logs. A read-only investigation records its inspected
refs and says that no changes were made; it does not invent a work branch or commit.

```text
Owner / scope: agent or task owner; authorized work and exclusions
Source: repository; base branch and full base SHA; inspected refs/SHAs if different
Work: branch; full head SHA; committed yes/no; pushed yes/no; PR/issue URL
Changes / findings: exact paths and commit-pinned file links; observed facts, inference,
                    and untested claims identified separately
Evidence: commands and actual results; logs/timestamps and run links; scenario/seeds,
          flags, control SHA and metrics when applicable; failures and omitted checks
Status / next: completed work; blockers; next owner/action; user decision required, if any
```

Record the **remote** head you verified, not merely a local SHA or a claim that work is pushed. For
uncommitted or unpushed work, say so explicitly and do not imply that another agent can retrieve it.
Link source documents at the inspected commit and provide the exact repository path/ref for
supporting evidence. A handoff records authorization; it does not expand the authorized scope.

The receiving agent must verify the remote PR/branch head and read the named source documents before
relying on the handoff. If the branch has advanced, compare the recorded commit with the current
head and identify which evidence applies. If a ref, path, commit or permission is missing or differs,
report the specific mismatch and resolve it before proceeding with dependent work; do not assume
that agent memory is shared or silently substitute another branch.
