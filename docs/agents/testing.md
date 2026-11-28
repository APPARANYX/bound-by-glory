# Testing index

**Kind:** index. Read only the page your task needs. Muse/Kit runs every manually requested browser test and browser-backed benchmark ([ownership and handoff](handoffs.md#muse-browser-qa-ownership)); other agents run offline checks and prepare requests.

| Purpose | Page | Typical question |
| --- | --- | --- |
| Offline deterministic regression | [testing/offline-regression.md](testing/offline-regression.md) | Which Node harness check covers this? How do I run the suite? |
| Native Skills Lab | [testing/skills-lab.md](testing/skills-lab.md) | Does the skill work in the lab? What must pass before a benchmark? |
| Natural battle benchmarks | [testing/benchmarks.md](testing/benchmarks.md) | Which paired runs decide a merge, and how are they read? |
| Physical and browser QA | [testing/browser-qa.md](testing/browser-qa.md) | Preview URLs, visual checks, camera and player mode, device benchmark |
| Performance profiling and diagnostics | [testing/profiling-diagnostics.md](testing/profiling-diagnostics.md) | Replays, profilers, the AI runtime timeline |
| Causal investigations | [causal inaction](causal-inaction-benchmark.md), [targeted fire](targeted-fire-benchmark.md), [matrix diagnostics](matrix-diagnostics.md), [timescale parity](timescale-parity.md) | Why did soldiers not fire or move? |
| Acceptance and rollback | [testing/acceptance.md](testing/acceptance.md) | Is this accepted? What is the speed gate? How do I roll back? |
| How CI picks checks for a PR | [ci/risk-routing.md](ci/risk-routing.md) | Why did a check skip? |

Quick start for most code changes:

```bash
python3 scripts/run_sim_checks.py --all          # every Sim check, in parallel (what CI runs)
python3 scripts/check_agent_docs.py              # docs links, routing and Spec Kit artifacts
```

<!-- Split on 2026-11-28 from a single 104 KB page; the old page is at `git show d15687b:docs/agents/testing.md`. -->
