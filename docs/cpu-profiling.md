# CPU profiling — reproducing the profiles

Diagnostic-only tooling. Nothing in this document changes gameplay,
scheduling, RNG, or authoritative state. All profiling runs in a headless
Chromium against either a local battle server or the deployed preview
through a localhost reverse proxy.

## What exists

| Script | Profiles | Output |
|---|---|---|
| `scripts/profile_battle_hotpaths.mjs` | Deterministic battle (trainer-stepped, fixed dt) | `reports/profile/` |
| `scripts/profile_skills_lab.mjs` | 120 m skills-range lab (fixed-step clock) | `reports/profile-skills-lab-<controller>/` |
| `scripts/lib/cpu-profile-summary.cjs` | `.cpuprofile` → per-function self/inclusive µs | `*-cpu-summary.json` |
| `scripts/lib/cpu-profile-chains.cjs` | `.cpuprofile` → top call chains, flame tree, per-interval splits | `*-cpu-chains.json`, `intervals/` |
| `scripts/lib/cpu-flamegraph.cjs` | flame tree → self-contained SVG flamegraph | `*-flamegraph.svg` |
| `scripts/lib/preview-proxy.cjs` | localhost reverse proxy to the deployed preview | (used by the lab profiler) |
| `scripts/battle-hotpath-profiler.cjs` | Inclusive wall-time wrapper profiler (injected into the page) | counters in the report JSON |

The wall-time wrapper profiler and the CDP sampler measure different
things. The wrappers give call counts and inclusive wall time per named
entry point (including route/navigation counters). The CDP sampler gives
true self time per function from 1 ms samples, with full stacks. Neither
is uninstrumented wall-clock: the wrappers' own `clock` helper was the
largest self-time entry in the baseline profile. Run with wrappers off
for the uninstrumented reference (see below).

## Deterministic 600 s meeting profile

Seed `controller-natural-20261026-0002`, `tacticalController=new`,
`strategicInterception=0`, fixed step 0.15 s, 600 s simulated, 4,001 steps.

Locally (from the repo root):

```sh
# Serve the repo (the page loads Babylon.js from the jsdelivr CDN; if
# Chromium cannot reach it, pass BATTLE_PROFILE_BABYLON_LOCAL — see below).
rm -rf /tmp/battle-www && mkdir -p /tmp/battle-www
ln -s "$PWD" /tmp/battle-www/grasstex
php -S 127.0.0.1:8765 -t /tmp/battle-www >/tmp/battle-profile-php.log 2>&1 &

npm install --no-save --no-package-lock playwright@1.55.0
npx playwright install --with-deps chromium

BATTLE_PROFILE_URL='http://127.0.0.1:8765/grasstex/battle_sim_local.php?tacticalController=new&strategicInterception=0' \
BATTLE_PROFILE_SEED=controller-natural-20261026-0002 \
BATTLE_PROFILE_TYPE=meeting \
BATTLE_PROFILE_SECONDS=600 \
BATTLE_PROFILE_STEP=0.15 \
BATTLE_PROFILE_SNAPSHOT_SECONDS=30 \
BATTLE_PROFILE_OUTPUT=reports/profile \
BATTLE_BENCHMARK_SOURCE_SHA=$(git rev-parse HEAD) \
node scripts/profile_battle_hotpaths.mjs
```

In CI, dispatch the `⭐ Battle Sim Hot Path Profile` workflow
(`.github/workflows/battle-hotpath-profile.yml`) with the same seed,
`meeting`, `600` seconds, and query
`tacticalController=new&strategicInterception=0`.

Baseline (for comparison): GitHub Actions run 41530432380, commit
`a80a4c39` (branch `work/meso706-route-clearance-filter-20261102`), 48.7 s
wall, 12.33× real-time. Its artifacts are the reference for the route /
navigation counters (317,199 `nextWaypoint` requests, 11,133 physical
rebuilds, 306,066 reuses, 3,862 fresh route searches, 8,970 route requests).

### Uninstrumented wall-clock reference

```sh
BATTLE_PROFILE_WRAPPERS=0 ... node scripts/profile_battle_hotpaths.mjs
```

Skips the wrapper profiler entirely (CDP sampling only). Route/navigation
counters are unavailable in this mode; wall seconds are the clean
reference. Compare against the wrappers-on wall seconds to quantify
profiler overhead.

### Heap allocation sampling

```sh
BATTLE_PROFILE_HEAP=1 ... node scripts/profile_battle_hotpaths.mjs
```

Adds CDP HeapProfiler allocation sampling (512 KiB interval) to
`battle-hotpath-heap-profile.json`. Summarize allocating functions from
`nodes[].callFrame` + `selfSize` before drawing conclusions.

### Offline Chromium (Babylon CDN unreachable)

```sh
curl -sS -o /tmp/babylon.js "https://cdn.jsdelivr.net/npm/babylonjs@9.27.1/babylon.js"
BATTLE_PROFILE_BABYLON_LOCAL=/tmp/babylon.js ... node scripts/profile_battle_hotpaths.mjs
```

Serves a local copy of the exact CDN script the page requests. Served
byte-for-byte; it changes no simulation code.

## 120 m skills-lab profile

Lab config: distance 120 m, cover mixed, seed `skills-range-0001`,
210 simulated seconds, `labMove=autonomous`, `pinSeed=1`. Run once per
controller; only `tacticalController` changes.

```sh
# New controller, via the localhost reverse proxy to the deployed preview:
SKILLS_LAB_PROXY=1 SKILLS_LAB_CONTROLLER=new SKILLS_LAB_SECONDS=210 \
  SKILLS_LAB_OUTPUT=reports/profile-skills-lab-new \
  node scripts/profile_skills_lab.mjs

# Legacy controller, same map and code:
SKILLS_LAB_PROXY=1 SKILLS_LAB_CONTROLLER=legacy SKILLS_LAB_SECONDS=210 \
  SKILLS_LAB_OUTPUT=reports/profile-skills-lab-legacy \
  node scripts/profile_skills_lab.mjs
```

The driver records the deployed build stamp (`BATTLE_BUILD` /
`BATTLE_PREVIEW`: ref, sha, deployedAt), the lab snapshot (controller,
movement pace, range, cover, seed), roster, and policy revision in
`skills-lab-profile.json` before driving anything. Verify those match
the preview you intend to profile; do not assume the preview is the
latest source commit.

Full lab URL (what the driver builds): the deployed preview
`battle_sim.php` with `skillsLab=1&combatLab=1&seed=skills-range-0001&
labDistance=120&labCover=mixed&labRange=1&labMove=autonomous&
labDuration=210&tacticalController=<new|legacy>&strategicInterception=0&
pinSeed=1`. Note the assignment URL has no `skillsLab=1` and does not
activate the lab.

If Chromium can reach the preview directly, set `SKILLS_LAB_URL` to the
live preview URL and omit `SKILLS_LAB_PROXY=1`. The proxy exists because
Chromium in some sandboxes cannot reach external hosts while Node fetch
can; the proxy forwards each request to
`SKILLS_LAB_UPSTREAM` (default `https://test.ivandpopov.com`) and returns
it byte-for-byte.

## Reading the results

- `*.cpuprofile` — raw V8 profile. Open in Chrome DevTools → Performance
  → Load profile, or in Speedscope (https://www.speedscope.app).
- `*-flamegraph.svg` — self-contained flamegraph; open in any browser.
  Width is proportional to sampled time; one row per stack depth.
- `*-cpu-chains.json` — top 25 call chains by inclusive sampled time.
  A sample counts once per chain, so chain percentages do not
  double-count nested frames.
- `*-cpu-summary.json` — per-function self/inclusive sampled µs.
  Self time is the ground truth for "where CPU is spent"; inclusive time
  shows which callers trigger it. Do not sum inclusive time across nested
  functions.
- `intervals/` — per-interval `.cpuprofile` + summaries, split by the
  step boundaries the driver recorded (every 30 s of simulated time).
  Use these to compare early / contact / late battle phases.
- `*-profile.md` — human-readable report with the same tables.
- `*-profile.json` — machine-readable report (counters, snapshots,
  chains, intervals, instrumentation flags, browser errors).

## What the profiles do not prove

- Sampled wall microseconds are approximate attribution, not exact CPU
  cycles and not uninstrumented benchmark acceptance. The official gate
  remains the paired uninstrumented benchmark (≤1.25× legacy overhead).
- A high call count does not prove a function dominates CPU; rank
  candidates by measured CPU savings, not frequency.
- Identical inputs do not guarantee safe caching: dynamic obstacles,
  moving soldiers, reservations, and owner revisions can all invalidate
  a result. Every candidate needs its invalidation conditions stated
  before any optimization is attempted.
