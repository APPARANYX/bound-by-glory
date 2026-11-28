# Native Tactical Skills Lab

**Kind:** current testing contract. Index: [testing](../testing.md). **Read when:** a change touches a tactical skill, or a battle benchmark is about to be requested.

The [native Tactical Skills Lab](../../../battle/skills-lab.js) (`?skillsLab=1`; the controller is the default, `&tacticalController=legacy` for the legacy arm) is the standard skills test. CI runs [Native Tactical Skills Lab QA](../../../.github/workflows/tactical-skills-lab-qa.yml) on runtime PRs; Muse runs it by hand when asked.

## Preflight before any battle benchmark

<!-- Moved from AGENTS.md at d15687b. -->

Before any standard, causal, targeted-fire, probe-pack, timescale, matrix or other battle/AI benchmark is requested, the Skills Lab QA must have passed on the **exact same source commit**, with a passing `scripts/probes/probe_skills_lab.cjs` result. Check the controller flag, live soldier/target identities, real simulation steps, skill/action ownership and repeatable same-seed reset. Then exercise **the specific skill being benchmarked** in the visible lab and inspect real owner receipts, physical motion, fire/suppression and cancellation reasons. Staged casualties, synthetic contact and fixtures are premises, not spontaneous tactical success.

If the preflight fails, is unavailable for that source, or shows a skill regression, fix that before spending CI time on battle benchmarks. A green launch job is not a lab pass. Put the passing lab run and head SHA in the benchmark handoff. Lab success is required but not sufficient: equal-seed full-battle A/B acceptance still follows.

## Controller covered maneuver checks

<!-- Moved from docs/agents/testing.md at d15687b. -->

`tactical-covered-maneuver-check.js` exercises both directional lifecycles through the shipping
controller, Meso, personal adoption, Engagement, ammunition and movement integrator. Its named
geometry fixture isolates lifecycle and uses long training magazines; it does not prove terrain
or ordinary combat-load acceptance. `covered-bounds-check.js` tests the native route sampler.
Hosted natural contact QA exports controller maneuver census/history; paired standard benchmarks
carry the same data under `coveredBounds.controller`. Require real-map direction, independently
qualified discharge continuity, physical arrival and role swaps before tactical acceptance.

The native first-contact and ballistic-flight meeting probes report grenade friendly wounds and deaths as physical outcomes; they do not require zero friendly fire. They require nonnegative integer counts with friendly losses included in the totals. Deterministic grenade checks separately cover unsafe commitment/release rejection, legal release followed by late friendly entry, and injury/kill attribution. Do not add automatic grenade avoidance or damage immunity to make a live meeting pass.
