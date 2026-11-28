# Tasks: Phase E, retire the legacy tactical decision paths

**Input**: [spec.md](spec.md) (Draft). No plan.md yet: it follows the owner's review of the spec (Spec Kit step 2).

**Evidence is not optional.** Every story has an `[EV]` task. Browser and benchmark tasks are Muse/Kit's; the implementing agent prepares the request on the PR.

## Format: `- [ ] TNNN [P?] [USn] [EV?] Description (FR-NNN, ...) Owner: <agent>; Depends: TNNN; Status: <state>`

## Phase 1: Readiness tooling (diagnostics only, no battle change)

- [X] T001 [P] [US1] Probe `writer-conflict-sites` and its Node check (FR-001) Owner: Claude Code; Status: Implemented, #840 `9c9fdc1d`
- [X] T002 [P] [US4] Probe `s1-skill-episodes` and its Node check (FR-009) Owner: Claude Code; Status: Implemented, #840 `9c9fdc1d`
- [X] T004 [P] [US3] Hot-path profiler controller rows and the profile workflow `query` input (FR-006) Owner: Claude Code; Status: Implemented, #840 `9c9fdc1d`
- [ ] T003 [US5] Node check listing every `controller*` URL flag with its module and class (legacy-selecting or controller-variant) and failing on an unclassified one (FR-013) Owner: Claude Code; Status: Planned

## Phase 2: User Story 1 - One writer per field on the defense maps (P1)

**Rollback**: the fix's own off flag.

- [ ] T010 [US1] [EV] Muse/Kit runs `writer-conflict-sites` on the six seeds (FR-001) Owner: Muse/Kit; Depends: T001; Status: Assigned, request on #840
- [ ] T011 [US1] [EV] Node regression replaying the traced writer sequence; fails on `main` (FR-003) Owner: Claude Code; Depends: T010
- [ ] T012 [US1] Fix at the owning layer behind its own flag (FR-002) Owner: Claude Code; Depends: T011
- [ ] T013 [US1] [EV] Exact-head Skills Lab, the six seeds paired, then the standard 60-seed paired gate (FR-002) Owner: Muse/Kit; Depends: T012

## Phase 3: User Story 2 - Ownership audit (P1)

- [ ] T005 [US2] [EV] Confirm the audit's runtime column from the #840 profiles: no legacy decision row under the controller arm beyond retained services (FR-004, FR-005) Owner: Claude Code; Depends: T014
- [ ] T006 [US2] Record each confirmed duplicate as a waste item for US 3, or mark the audit row verified (FR-005) Owner: Claude Code; Depends: T005

## Phase 4: User Story 3 - Speed (P2)

- [ ] T014 [US3] [EV] Muse/Kit hot-path profiles, legacy and controller arms, US defense `-0008` and meeting `-0001`, 600 s (FR-006) Owner: Muse/Kit; Depends: T004; Status: Assigned, request on #840
- [ ] T015 [US3] Attribute the wall gap to the FR-006 classes and file each waste fix as its own PR (FR-006, FR-007) Owner: Claude Code; Depends: T014
- [ ] T016 [US3] [EV] Same-seed identity and wall for each behavior-preserving fix (FR-007) Owner: Muse/Kit; Depends: T015
- [ ] T017 [US3] Owner decision card on the residual gap with numbers (FR-008) Owner: Claude Code; Depends: T016
- [ ] T018 [US3] Standard benchmark off-arm ref so the gate can compare against `baseline/pre-phase-e` legacy (FR-008) Owner: Claude Code

## Phase 5: User Story 4 - Physical acceptance (P2)

- [ ] T020 [US4] [EV] Muse/Kit runs `s1-skill-episodes` on the ten #840 battles (FR-009) Owner: Muse/Kit; Depends: T002; Status: Assigned, request on #840
- [ ] T021 [US4] [EV] Staged drill for each S1 kind absent from natural battles (FR-009) Depends: T020
- [ ] T022 [US4] [EV] Pinned-head campaign: lab and reset, drills incl. post-#810 cancellation, 5 km transport with a possessed passenger, retreat/rally/reconstitution, 900 s, fire-silence, K1 (FR-010) Owner: Muse/Kit; Depends: T013
- [ ] T023 [US4] [EV] Rollback identity: `?tacticalController=legacy` full off and each slice flag (FR-011) Owner: Muse/Kit; Depends: T013
- [ ] T024 [US4] Triage #812 and roadmap section 9 against the pinned head (FR-012) Owner: Claude Code; Depends: T022

## Phase 6: User Story 5 - Retirement slices (P3, each needs the owner's word)

- [ ] T030 [US5] Tag `baseline/pre-phase-e` on the accepted `main` (FR-014) Depends: T013, T022, T023
- [ ] T031 [US5] E1 Meso retirement PR (FR-013, FR-015) Depends: T030, T018, T003
- [ ] T032 [US5] [EV] E1 gates on its exact head (FR-015) Owner: Muse/Kit; Depends: T031
- [ ] T033 [US5] E2 Macro retirement PR (FR-013, FR-015) Depends: T032
- [ ] T034 [US5] [EV] E2 gates incl. 5 km transport and 900 s (FR-015) Owner: Muse/Kit; Depends: T033
- [ ] T035 [US5] E3 Micro retirement and the switch (FR-013, FR-015) Depends: T034
- [ ] T036 [US5] [EV] E3 gates (FR-015) Owner: Muse/Kit; Depends: T035

## Convergence

- [ ] T040 Run `speckit.converge` on `main` after each merged slice and reconcile task states
- [ ] T041 [EV] `python3 scripts/check_agent_docs.py` and the final evidence per FR
