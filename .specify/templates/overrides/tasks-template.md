<!-- Repository override of the Spec Kit tasks template (.specify/templates/overrides/). Core template: ../tasks-template.md.
     It replaces the core template's "tests are optional" rule: this repository's constitution (principles I, V, VI, X)
     makes evidence tasks mandatory where they apply. `python3 scripts/check_agent_docs.py` checks the result. -->

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Evidence is not optional.** Every user story gets at least one `[EV]` task: a regression check that fails on the old code, and, where they apply, deterministic equivalence, Muse/Kit physical validation on the exact head, and the paired benchmark gate (see the spec's Acceptance Evidence section). Docs-only or tooling stories get offline checks only, never browser runs.

## Format: `- [ ] TNNN [P?] [USn] [EV?] Description (FR-NNN, ...) Owner: <agent>; Depends: TNNN; Status: <state>`

- **TNNN**: unique, never renumbered. **[P]**: can run in parallel (different files, no dependencies).
- **[USn]**: the user story; the story's `**Requirements**:` line in spec.md says which FRs it serves. Name an FR directly when a task serves only part of a story or no story.
- **[EV]**: an evidence task (regression, equivalence, physical validation, benchmark).
- **Owner / Depends / Status** are optional when planning; required once a task is assigned. Status words: Planned, Assigned, Implemented, CI validated, Physically validated, Accepted, Merged, Superseded, Abandoned, Deferred (see `docs/agents/development-workflows.md`, task and evidence states).
- **`[X]`** means implemented and pushed, and the line cites its PR (`#123`) or commit SHA. Validation states go in `Status:` with links. A tick is never a test result.

## Path conventions

Runtime `battle/`, `battle/modules/NN-*.js`; offline checks `tools/ai-sim-harness/*-check.js` and `scripts/check-*.cjs`; probes `scripts/probes/`; docs `docs/`. Each independent slice is its own branch and PR.

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLES. Replace them with tasks generated from
  spec.md (stories, FRs, owners), plan.md (structure, rollback flags) and the
  spec's Acceptance Evidence section. Keep stories independently deliverable.
  ============================================================================
-->

## Phase 1: Setup and ownership

- [ ] T001 Record the feature's tracking issue and the owner of each capability in plan.md (FR-001)
- [ ] T002 [P] Confirm every writer the feature adds is listed in `tools/ai-sim-harness/fixtures/wire-map-baseline.json`, or none is added

## Phase 2: User Story 1 - [Title] (Priority: P1)

**Goal**: [What this story delivers]
**Rollback**: [off flag, or approved Phase E reference]

- [ ] T003 [US1] [EV] Add an offline check in `tools/ai-sim-harness/[name]-check.js` that fails on the old code
- [ ] T004 [US1] Implement [capability] at its owner in `battle/modules/[NN-name].js` behind `?[flag]=0` Owner: [agent]; Depends: T003
- [ ] T005 [US1] [EV] Request Muse/Kit Skills Lab validation on the exact head (label `needs-kit-testing`, handoff per docs/agents/handoffs.md) Depends: T004
- [ ] T006 [US1] [EV] Request the paired benchmark gate (meeting, US-defend, GE-defend) on the exact head Depends: T005

## Phase 3: User Story 2 - [Title] (Priority: P2)

- [ ] T007 [US2] [EV] [regression check]
- [ ] T008 [US2] [implementation] Depends: T007

## Phase N: Convergence

- [ ] T0NN Run `speckit.converge` on `main` after each merged slice and reconcile task states
- [ ] T0NN [EV] Run `python3 scripts/check_agent_docs.py` and record the final evidence for every FR

## Dependencies

- Setup before stories; each story's `[EV]` regression task before its implementation; physical and benchmark evidence after the exact head exists.
- Stories are independent unless a `Depends:` says otherwise.
