## Working rules

- **A/B WORK IS DONE WITH THE GITHUB STANDARD BENCHMARK, NOT LOCALLY. NO LOCAL PROBE ARMS. NO FINGERPRINT COMPARISONS
  (`ab_fingerprints.sh`, `state-fingerprint`, `PROBE_CONTROL=1` on many battles). THEY TAKE HOURS AND THE BENCHMARK DOES
  THE SAME JOB.** THE BENCHMARK TAKES PARAMETERS: DISPATCH `battle-benchmark-standard.yml` WITH `seed` (THE EXACT SCENARIO SEED, THE SAME
  FOR BOTH ARMS) AND `query_off` / `query_on` (THE PAGE FLAGS OF EACH ARM, E.G. `query_on=coa=1`, OR `query_off=morale=0` FOR THE FLAT RETREAT;
  BOTH EMPTY IS A CONTROL: THE ARMS MUST COME OUT IDENTICAL) AND `seeds` (1 IS THE SCRIPTED SCENARIO; MORE, E.G. 100, IS A PAIRED RUN ACROSS SEEDS, `seed` THEN THE PREFIX). ONE RUN IS BOTH ARMS, ONE AFTER THE OTHER ON ONE RUNNER, AND THE RUN COMPARES THEM. COMPARE ACROSS RUNS (`main` AGAINST A BRANCH) WITH `compare_benchmark_arms.cjs` (`--count <path>`
  PAIRS ANY RECORD FIELD). IDENTICAL RECORDS ON `main` AND ON A BRANCH ARE THE PROOF THAT A CHANGE IS INERT. A PROBE IS FOR
  ONE SEED AND A FEW MINUTES, NEVER FOR AN ARM OF TWENTY SEEDS. (Said three times by the owner, 2026-09-30.)
- **Squad-performance scores are benchmark triage, never a pass/fail gate.** `run_battle_benchmark.mjs` samples each squad every 2.5 simulated seconds and records a role-aware vector (mission, movement, control, cohesion, combat when exposed, preservation) plus the raw measurements behind it. Support/reserve/garrison squads are not penalized for holding still. Standard paired runs compare the per-battle squad mean, p10/tail and dimension means; use the raw squad rows and reproducible seed before changing AI from a score.
- **Don't create new plan/roadmap/summary `.md` files.** The one exception is `docs/reference/TUNABLES.md`, the
  inventory of every tunable number by layer (Phase 5, the input to the genome rewrite). Update this
  file only when a command, contract or rule actually changes. Findings go in the commit message or PR body. Open issues
  hold the current state and the next step, not run-by-run logs: cite the PR that has the numbers.
- **State success criteria up front, prove them with a harness below, report the output.**
  Never claim visual/browser validation that wasn't performed.
- **Keep probes.** A one-off measurement script is a probe: commit it as `scripts/probes/<name>.js`
  (run with `scripts/run_probe.cjs`) or extend a close-up tool (`closeup.cjs` for a posed soldier,
  `closeup_battle.cjs` for one in a fight), never leave it in `/tmp`.
- **Browser probes run against the preview, not a local server.** Push the branch and point the
  script's URL variable (`CLOSEUP_URL`, `CULL_URL`, `BF_URL`, …) at
  `https://test.ivandpopov.com/grasstex/preview.php?ref=<branch>` (only the preview options declared in `runtime-contract.php` pass through; strategic controls
  including explicit `=0` values are preserved, while unsupported options still drop: `morale`, `coa`, `mind`, `stats`, `perception`, `geScout`,
  `groundSteps` and any probe flag are not among them, so three "flag" arms of the 3b/3c probes once ran flag-off,
  identical to the control in 60 of 60 battles; for those, open the staged page the launcher redirects to,
  `https://test.ivandpopov.com/grasstex/preview/ref-<sha12>/battle_sim.php?<flags>`, and check the flag arrived,
  e.g. `BattleSquadStability.moraleOn()`). It has
  the real textures and hosting and loads far faster than `php -S` under SwiftShader, where the ground
  renders red. Use the local server only for what the preview can't serve: an unpushed tree, a
  `git worktree` A/B, or a change to `battle_sim_local.php`.
- **Stay in scope.** Don't touch audio, assets or animation unless asked. Unnamed uploads: ask
  what they are and where they belong.
- `main` deploys to production on every push. Put anything visual on a `work/**` or `preview/**`
  branch first (that publishes a preview; see Deploy), or open any branch in the live preview
  launcher (`https://test.ivandpopov.com/grasstex/preview.php?ref=<branch|PR#>`).
- **After a branch you worked on merges, read the run summaries** before calling it done:
  **Branch housekeeping** (deleted, or kept and why: commits pushed after the merge never reached
  `main`, so open a PR for them) and **Deploy Battle Runtime to 50webs** (the `build-v<N>` it shipped, and
  that it passed). Report both. Push further work to a fresh branch from `main`, not the merged one.
- **A PR merges only after its own CI has finished green on its head.** Never merge while CI is still running or
  was cancelled, and merge stacked PRs one at a time, each after CI and the deploy on `main` for the one before
  have finished (phases 3b to 5 merged within 13 seconds, CI on two was cancelled, and `main` stayed red until
  #123). Branch housekeeping deletes a merged PR's head branch even when other open PRs are based on it (it only
  looks for open PRs whose *head* is that branch), so retarget stacked PRs to `main` right after the merge. Nothing
  in GitHub enforces any of this; it is written down.
- **Subscribe to every PR you open or are asked to merge** (`subscribe_pr_activity`): CI results, reviews, conflicts and the
  merge arrive as events, so nobody has to say "CI passed" and the agent does not poll. Merge when the head's CI events are
  green; cover the gaps (commit-status CI, merge-queue branches, a lost delivery) with one `send_later` check-in.

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

Muse acknowledges the handoff in that shared record, verifies the actual source and
runtime, and runs the requested checks using its available browser/VM or the existing
approved CI workflow. Muse owns manually requested launches and reruns of
browser-backed workflows; other agents may prepare the request and inspect run
status/results, but must not independently launch another browser run. Follow the
existing permanent benchmark launcher and exact-head Skills Lab preflight rules;
browser ownership does not permit temporary workflows, local multi-seed A/B arms or
bypassing any acceptance gate.

### Evidence and completion

Muse returns the tested full SHA, actual URL/build and effective inputs, steps or
commands actually executed, observed versus expected behavior, pass/fail/blocker,
browser errors, screenshots/video when relevant, raw diagnostics/traces and CI/run
links. Skills Lab reports retain real actor/target/action-owner identities, simulation
advancement, same-seed reset, physical movement/support-fire/check-in and cancellation
evidence; staged inputs are labelled as premises. A changed source invalidates an
older result as current-head acceptance.

The implementing agent reviews the evidence and fixes any confirmed issue. Mark
browser QA complete only after Muse has returned evidence for that exact source;
a task file, mention, dispatch acknowledgement or green launcher alone is not a
browser test result.

### Automatic CI and unavailable integrations

Existing automatically triggered CI, preview and browser workflows continue to run.
Do not disable, skip, weaken or replace required checks to enforce agent routing.
Muse reviews their browser evidence and owns any manual follow-up; automatic execution
can be reused rather than duplicated. Repository-wide CI, exact-head validation,
deterministic comparisons, performance limits and merge/deployment requirements still
apply.

The commands under `.muse/commands/` describe workflows; they do not themselves
dispatch Muse or connect agents' conversations. An `@mention` is a delivery mechanism
only when a verified GitHub account/bot and its event integration are configured.
Never invent an account, assign an unverified recipient, or claim delivery/execution
without an observed acknowledgement or run. If no Muse integration is available,
leave the handoff explicitly pending, provide its GitHub link, and continue independent
non-browser work. Do not silently substitute another agent's browser or claim that
the request is running. A change to this routing requires the user's explicit
instruction; Muse unavailability is not a waiver of required browser evidence.

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
