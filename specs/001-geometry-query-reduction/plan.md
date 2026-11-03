# Implementation Plan: Reduce the new controller's geometry query volume

**Branch**: `work/spec-kit-perf-pilot` | **Date**: 2026-11-03 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-geometry-query-reduction/spec.md`

## Summary

The new (Meso) controller issues 2,060,256 geometry queries in the 120 m lab (210 s), of which 516,249 (25.1%) repeat a pair already queried in the same 0.15 s step. A per-step cache scoped to one simulation step and cleared at each step boundary eliminates the repeats (~2.2 s of the 28 s lab wall, ~8%) with no behaviour change, because soldier positions are fixed within a step. The remaining 75% distinct pairs need candidate pruning in `contact-route.pick` and `contact-skills.update`. Together the cache and pruning must bring the new-vs-legacy wall-clock ratio from 1.71× under the 1.25× acceptance gate, measured by paired uninstrumented benchmarks on the 120 m lab and the 600 s meeting.

## Technical Context

**Language/Version**: JavaScript (ES modules in `battle/`, CommonJS in `scripts/`), Node.js 24 for tooling, Chromium (Playwright 1.55.0) for headless execution.

**Primary Dependencies**: Babylon.js 9.27.1 (rendering, via jsDelivr CDN bridged by Node fetch in this VM), Playwright for the lab/benchmark drivers, GitHub Actions for CI (the `⭐ Battle Sim Hot Path Profile` workflow and the standard benchmark).

**Storage**: N/A (in-memory per-step cache only; no persistence). Profile artifacts are `.cpuprofile` + JSON reports.

**Testing**: Deterministic harness (`tools/ai-sim-harness/*-check.js`), Native Tactical Skills Lab (`battle/skills-lab.js`, `scripts/probes/probe_skills_lab.cjs`), the 120 m lab profiler (`scripts/profile_skills_lab.mjs`), the 600 s profile workflow (`.github/workflows/battle-hotpath-profile.yml`), and paired uninstrumented benchmarks (`scripts/run_battle_benchmark.mjs`).

**Target Platform**: Browser (Chromium headless, SwiftShader) for the simulation; GitHub Actions runners for CI acceptance.

**Project Type**: Browser-based battle simulation (game AI) with a Node.js profiling/benchmark harness.

**Performance Goals**: Per-step cache saves ≥1.5 s on the 120 m lab (210 s, new controller) with identical outcomes. Combined cache + pruning brings the new-vs-legacy wall-clock ratio to ≤1.25× on both the 120 m lab and the 600 s meeting.

**Constraints**: Deterministic equivalence is non-negotiable — the cache must produce a 0-difference final state, identical snapshots, and identical navigation/route counters. The cache is cleared at each 0.15 s step boundary and its key includes every input that can change the answer (endpoints, dynamic obstacle state, nav version; soldier pair for `hasLineOfSight`). PR #706 is protected and must not be modified directly. Work lives on an isolated branch with a draft PR; no merge, deploy, or completion notification without authorization.

**Scale/Scope**: 120 m lab: 1,400 steps, 30 soldiers (20 US / 10 GE), ~2.06M geometry queries per 210 s run. 600 s meeting: 4,001 steps, 100 soldiers, ~1.6M geometry queries per run. The cache is a per-step map; its size is bounded by the distinct pairs per step (a few thousand).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. Evidence over inspection**: PASS. The cache and each pruning rule are validated by deterministic same-seed comparisons and paired benchmarks, not by inspection. No merge without its own green CI.
- **II. Deterministic equivalence**: PASS. FR-005 / SC-002 require a 0-difference final state, identical snapshots, and identical counters with the cache on vs off.
- **III. One owner per capability**: PASS. The cache is owned by the geometry query layer (one owner); `contact-route.pick` and `contact-skills.update` own their pruning rules. No duplicate ownership.
- **IV. Benchmark methodology**: PASS. The gate (SC-003/SC-004) is measured by paired uninstrumented benchmarks only, never by an instrumented profile.
- **V. Neutral-or-better and the 1.25x gate**: PASS. The feature's success criteria are the 1.25× gate on both the lab and the 600 s meeting.
- **VI. Agent ownership and handoffs**: PASS. Each agent works on a separate branch, does not edit another agent's branch, and records ownership/scope/source/work/evidence/status on the PR/issue.

## Project Structure

### Documentation (this feature)

```text
specs/001-geometry-query-reduction/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
battle/
├── obstacle-field.js          # sightBlocker (line 303), sightBlocked (line 326) — cache site
├── squad-ai.js                # hasLineOfSight (line 285) — cache site
├── battle-navigation.js       # movementClear (line 127), lineOfSightBlocked (losBlocked) — cache site
└── modules/
    ├── 13g-tactical-contact-route.js   # pick (line 311) — pruning site, 41.7% repeats
    └── 13d-tactical-contact-skills.js  # update — pruning site, 34.9% repeats

scripts/
├── profile_skills_lab.mjs     # 120 m lab profiler (physical testing on VM)
├── profile_battle_hotpaths.mjs # 600 s profiler (CI)
└── run_battle_benchmark.mjs   # paired uninstrumented benchmark (gate measurement)

tools/ai-sim-harness/          # deterministic harness checks
```

**Structure Decision**: The cache lives in the shared geometry query layer (`battle/obstacle-field.js`, `battle/squad-ai.js`, `battle/battle-navigation.js`), so it benefits both the new and legacy controllers and can be implemented on `main` without touching the protected PR #706. Pruning rules live in the two call sites (`13g-tactical-contact-route.js`, `13d-tactical-contact-skills.js`). Validation uses the existing lab profiler, 600 s CI profile workflow, and paired benchmark runner — no new harness is built.

## Complexity Tracking

No constitution violations. No new project, no new repository pattern, no new storage. The cache is an in-memory per-step map in existing modules.
