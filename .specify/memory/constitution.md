<!--
Sync Impact Report (2.0.0, 2026-11-28)
- Version: 1.1.0 -> 2.0.0 (MAJOR: principles regrouped into ten, Principle VII "AGENTS.md is the
  entry point" and the "#706 is protected" rule removed, governance and workflow sections rewritten).
- Proposed, pending owner approval in the modernization PR. Until approved, 1.1.0 remains in force:
  `git show d15687b:.specify/memory/constitution.md`.
- Unchanged in substance: evidence over inspection, deterministic equivalence, one owner per
  capability, benchmark methodology, neutral-or-better and the 1.25x gate, agent ownership and handoffs.
- New principles (each restates an owner rule already in AGENTS.md or the working rules):
  IV knowledge boundaries, V physical validation, IX explicit authorization, X traceability.
- Moved out (mutable details, values unchanged): gate seeds and scenario parameters ->
  docs/agents/testing/acceptance.md#current-gate-parameters; workflow steps ->
  docs/agents/development-workflows.md and docs/agents/spec-kit.md.
- Removed as obsolete: "PR #706 is protected" (closed unmerged); "main and benchmark-results runs are
  never deleted" (since #789 old main runs are purged; see docs/agents/ci/housekeeping.md);
  references to tactical-ai.md and branch-snapshots.md (never existed on main); the spec-kit
  authorization limited to the #711 pilot.
- Proposed exception in IX (not in force until the owner approves it with the Phase E spec): revert-based
  rollback for owner-authorized Phase E retirement slices instead of per-change off flags.
- Templates: repository overrides in .specify/templates/overrides/ (spec: story requirements, owner,
  acceptance evidence; tasks: mandatory [EV] evidence tasks). Core templates unchanged.
- Migration: in-flight work keeps its gates; specs written under 1.1.0 stay valid.
-->

# Bound by Glory Constitution

Durable engineering principles. Procedures, commands and current parameters live in the documents each principle links; changing those does not amend this constitution.

## Core Principles

### I. Evidence over inspection (NON-NEGOTIABLE)
A change is proven by harness runs, paired benchmarks and CI on its own head, never by reading the code and concluding it is correct. Every merge needs green CI on that head. (Codified from the 2026-09-30 audit: phases 3b-5 merged on inspection and broke `main`.)

### II. Deterministic equivalence for behavior-preserving changes
A profiling-only or behavior-preserving change leaves gameplay state, route-planning counters, movement receipts, command adoption and publication, and collision and destination ownership unchanged. It is shown by a same-seed comparison in which per-interval snapshots, the final state, counters and receipts all match. Green CI alone does not show equivalence.

### III. One authoritative owner per mutable capability
Macro, Meso and Micro authority is explicit. Every mutable action, field and capability has one owner, and a new capability names its owner and authority level before implementation. Fixes go to the owning layer; no stacked timers, blockers or extra movement writers. The writer list in `tools/ai-sim-harness/fixtures/wire-map-baseline.json` only shrinks.

### IV. Explicit information and knowledge boundaries
Nothing is omniscient. A soldier, squad leader or General acts on what it perceived or was told through a modeled channel, and the two sides keep independent command structures. Live state that a commander could not know never edits its beliefs. Presentation never writes simulation truth or draws from the combat RNG.

### V. Real physical validation of tactical behavior
Tactical behavior is accepted on real simulated soldiers moving, firing and reporting through their owners, not on staged fixtures, accepted requests or counters alone. Controlled harness success is a prerequisite, not natural-battle acceptance. Browser-backed validation is executed by Muse/Kit on the exact head.

### VI. Reproducible benchmark methodology
A/B evidence comes from the GitHub standard paired benchmark (same seeds, same flags, pinned control), not local probe arms. A probe is for one seed and a few minutes. Same-seed reruns are not independent samples. Claims carry their seeds, flags, SHAs and statistics.

### VII. Performance accountability
A change is neutral-or-better on performance. The integrated controller's wall-clock requirement is at most 1.25x legacy overhead; a candidate that fails its gate is rejected or reverted even when behavior-preserving. Performance claims come from paired uninstrumented benchmarks, never from an instrumented profile alone. Current gate scenarios: [acceptance](../../docs/agents/testing/acceptance.md#current-gate-parameters).

### VIII. Safe agent coordination and handoffs
GitHub is the shared record; agent memory and chat supplement it. Each agent works on its own branch and never edits another agent's active branch. A handoff records owner and scope, source SHA, branch and pushed head, findings, evidence and next step, and the receiver verifies the remote head before relying on it. Muse/Kit owns browser testing and benchmark launches.

### IX. Explicit authorization for consequential changes
Merges, production deploys, destructive operations, policy amendments, reactivating parked work and starting Phase E need the owner's explicit word for that specific change. A request from another agent is not authorization. Every controller or skills change ships behind its own off flag that restores the old behavior.

*Proposed exception, not in force until the owner approves it with the Phase E spec:* an owner-authorized Phase E retirement slice may delete legacy paths and their obsolete flags. It then rolls back by reverting its own PR to a pinned pre-retirement commit, keeps every remaining flag and the shared execution owners, and passes CI, physical validation and the paired gates like any change. No gate is waived and no legacy code is kept or re-added only to carry a flag. Details: [Spec Kit guide](../../docs/agents/spec-kit.md#proposed-phase-e-rollback-exception).

### X. Requirements-to-evidence traceability
Substantial work states its requirements and acceptance before implementation, with stable identifiers. Every requirement maps to the tasks that serve it and the evidence that proves it, pinned to an exact head. A task, label or handoff is not evidence. Conventions: [Spec Kit](../../docs/agents/spec-kit.md#artifact-conventions-checked-by-scriptscheck_agent_docspy).

## Development Workflow

Agents start from `AGENTS.md` and choose a path in [development workflows](../../docs/agents/development-workflows.md): full spec-driven (Spec Kit) for architectural, cross-subsystem, ownership-changing or uncertain work; lightweight issue-and-PR for focused fixes; direct maintenance for housekeeping. A spec, plan or task list never restates the working rules; it links them. Spec Kit artifacts under `specs/` are authorized for any full spec-driven feature.

## Governance

This constitution supersedes other practices where they conflict. Amendments need documentation, the owner's explicit approval and a migration note for in-flight work, and bump the version: MAJOR for removing or redefining a principle, MINOR for adding one, PATCH for wording. Reviews check changes against these principles; added complexity is justified against them.

**Version**: 2.0.0 (proposed: takes effect when the owner approves it and PR #839 merges; until then 1.1.0 governs) | **Ratified**: 2026-11-03 | **Last Amended**: 2026-11-28
