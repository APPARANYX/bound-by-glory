# Quickstart: Validate the geometry query volume reduction

**Date**: 2026-11-03 | **Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

This is the physical-testing procedure for this feature, run on the VM. It validates the per-step cache (P1) and each pruning rule (P2) by deterministic comparison and paired uninstrumented benchmarks.

## Prerequisites

- Repo clone with the feature branch checked out. PHP CLI + Playwright Chromium installed (see `docs/cpu-profiling.md` for the environment notes: Chromium cannot reach external HTTPS in this VM, so the battle page's jsDelivr CDN scripts are bridged via Node fetch and the preview is profiled through a localhost reverse proxy).
- Local server: `php -S 127.0.0.1:8765 -t /tmp/battle-www` (with `grasstex` symlinked into it).
- Clear stale Chromium processes before a run (the VM is memory-tight; a renderer needs ~300–600 MB). Kill by exact PID, never `pkill -f` (it matches your own shell).

## 1. 120 m lab, new controller (cache on vs off)

```bash
cd /tmp/grasstex-prof
SKILLS_LAB_PROXY=1 SKILLS_LAB_CONTROLLER=new SKILLS_LAB_SECONDS=210 \
  SKILLS_LAB_OUTPUT=reports/profile-skills-lab-new-cache \
  node scripts/profile_skills_lab.mjs
```

Expected: wall drops by ≥1.5 s vs the same run without the cache; final state `usAlive` 20, `geAlive` 10, no winner; nav 28,000 requests. Compare `skills-lab-profile.json` against the cache-off run.

## 2. 600 s deterministic meeting (cache on vs off)

Dispatch the `⭐ Battle Sim Hot Path Profile` workflow on the feature branch with `battle_type=meeting`, `seed=controller-natural-20261026-0002`, `sim_seconds=600`, `query=tacticalController=new&strategicInterception=0`. Download the artifact and deep-diff the entire `finalState` against the baseline run (41530432380) and the branch run (41648741452): 0 differences, all 20 snapshots match, all navigation/route counters identical.

## 3. Determinism deep-diff (local, fast check)

```bash
python3 - << 'EOF'
import json
base = json.load(open('reports/profile-skills-lab-new/skills-lab-profile.json'))
new = json.load(open('reports/profile-skills-lab-new-cache/skills-lab-profile.json'))
# compare finalState, nav/route counters, snapshots; report any difference
EOF
```

## 4. Paired uninstrumented benchmark (the 1.25x gate)

Run the standard paired benchmark (new vs legacy) on the 120 m lab and on the 600 s meeting, uninstrumented (wrappers off). The gate passes only if **both** ratios are ≤1.25×. Never claim the gate from an instrumented profile alone.

## 5. Step-boundary invalidation test

A targeted test: move an endpoint between steps, re-query the same pair, and confirm the cache does not return the previous step's result. (Add as a harness check under `tools/ai-sim-harness/` if a suitable check does not exist.)

## Coordination

- Before implementing, check the in-flight Meso optimization stack (PRs #707–#743) for overlapping work — especially #719 (query repetition within a route search) and #735 (omit LOS on non-improving edges). Coordinate via GitHub (PR/issue comments); do not duplicate their work and do not edit another agent's branch.
- Record owner, scope, source, work, changes, evidence, and status on the feature PR, per the working rules.
