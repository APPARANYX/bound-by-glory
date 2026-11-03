# Grasstex Constitution

## Core Principles

### I. Evidence over inspection (NON-NEGOTIABLE)
Never merge on "proved by inspection." Every merge needs its own green CI on its head. A change is proven by harness runs, paired benchmarks, and CI evidence — never by reading the code and concluding it is correct. This is codified from the 2026-09-30 audit, when phases 3b–5 were merged on inspection alone and main broke (15/45 harness checks failed).

### II. Deterministic equivalence
A profiling-only or behaviour-preserving change MUST leave gameplay state, route-planning counters, movement receipts, command adoption/publication, and collision/destination ownership unchanged. Validation is a same-seed deterministic comparison: all per-interval snapshots, the full final state, the original counters, and the receipts must match. Green CI alone does not establish deterministic equivalence. The deterministic harness checks live under `tools/ai-sim-harness/`; see `AGENTS.md` (the agent entry point) for the testing and benchmark map.

### III. One owner per capability
Macro/Meso/Micro authority is explicit, with one owner per mutable action and capability. No duplicate capability ownership. Command contracts (M3C) define who may write what. A new capability must name its owner and its authority level before implementation.

### IV. Benchmark methodology
A/B work is done with the GitHub standard benchmark (paired, same seed, same flags), not with local probes. Performance claims come from paired uninstrumented benchmarks only — never from an instrumented profile alone. A probe is for one seed and a few minutes, never for an arm of twenty seeds. The benchmark workflow, harness checks, and CI gating are defined in `AGENTS.md` (the agent entry point) and `docs/agents/` (`testing.md`, `ci-workflows.md`); an agent doing performance work reads those first, before the spec.

### V. Neutral-or-better and the 1.25x gate
A change MUST be neutral-or-better on performance. The integrated Meso controller's official wall-clock acceptance requirement is ≤1.25× legacy overhead. A candidate that fails the gate is rejected or reverted, even if it is behaviour-preserving. The 600-second deterministic meeting scenario is the official performance acceptance gate; the 120 m skills lab is the primary profiling environment.

### VI. Agent ownership and handoffs
GitHub is the canonical shared record. Agent-specific memory and chat summaries supplement the record; they are never the only place another agent can find the work. Each agent works on a separate branch for parallel edits. Do not edit or force-push another agent's active branch, and do not merge without explicit authorization. A handoff records owner/scope, source (base branch and SHA), work (branch, head SHA, pushed yes/no, PR/issue URL), changes/findings, evidence (commands, results, run links, seeds/flags/metrics), and status/next steps.

### VII. AGENTS.md is the agent entry point (NON-NEGOTIABLE)
`AGENTS.md` is the authoritative entry point for any agent working in this repo. It maps to the living references for testing, benchmarks, harnesses, CI workflows, and architecture (`docs/agents/` — `working-rules.md`, `testing.md`, `ci-workflows.md`, `battle-architecture.md`, `tactical-ai.md`, `branch-snapshots.md`), the harness checks (`tools/ai-sim-harness/`), and the benchmark tooling. A spec, plan, or task list never restates those rules — it points at `AGENTS.md` and the docs it links, so the rules stay in one place and stay current. An agent starts a task by reading `AGENTS.md`, not by re-deriving the workflow from the spec.

## Performance Standards

- The 600-second natural meeting scenario (seed `controller-natural-20261026-0002`, `strategicInterception=0`, `tacticalController=new`, fixed timestep 0.15 s) is the deterministic regression and official acceptance gate.
- The 120 m skills-range lab (seed `skills-range-0001`, 210 simulated seconds, `labMove=autonomous`, `pinSeed=1`, preview build) is the primary profiling environment.
- Before anything destructive: dry run with exact counts, exclude cited/referenced evidence, honour the repo keep policy (main and benchmark-results runs are never deleted), verify after, and account honestly for discrepancies.

## Development Workflow

- **Start from `AGENTS.md`.** It is the agent entry point (Principle VII): it maps the working rules, testing/benchmarks, harnesses, CI workflows, and architecture references. A spec never replaces it.
- Diagnostic and profiling work lives on an isolated branch with a draft PR. Do not merge, deploy, or send completion notifications without explicit authorization.
- PR #706 (Coordinator-owned Meso controller integration) is protected and must not be modified directly.
- After a branch merges, read the run summaries (branch housekeeping and deploy) before calling it done. Push further work to a fresh branch from `main`, not the merged one.
- Do not create new plan/roadmap/summary Markdown files for routine work. Findings go in the commit message or PR body; open issues hold the current state and the next step. This constitution and the Spec Kit artifacts under `specs/` are the authorized exception for the spec-driven pilot (issue #711).

## Governance

The constitution supersedes all other practices in this project. Amendments require documentation, explicit approval from the project owner, and a migration plan for in-flight work. All PRs and reviews must verify compliance with these principles. Complexity must be justified against them.

**Version**: 1.1.0 | **Ratified**: 2026-11-03 | **Last Amended**: 2026-11-03 (added Principle VII: `AGENTS.md` is the agent entry point)
