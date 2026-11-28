# Workflow inventory

**Kind:** current CI facts. Index: [CI and workflows](../ci-workflows.md). **Read when:** you need to know what a workflow does or when it runs. `scripts/check_agent_docs.py` fails CI when a file in `.github/workflows/` is missing from this page.

<!-- Main table moved from docs/agents/ci-workflows.md at d15687b; the second table was generated from the workflow files the old page did not list. -->

## Documented workflows

| Workflow | Trigger | Purpose |
| --- | --- | --- |
| [`ci.yml`](#ciyml) | PR, manual dispatch | Change detection skips the private-audio job unless actual audio inputs change and skips the full deploy-plan job unless audio/deployment inputs change… |
| [`deploy-50webs-php.yml`](#deploy-50webs-phpyml) | push to main (verify merged PR head passed CI; manual override for non-merge pushes) | Stamps `build-v<N>`, validates the merged commit independently (without duplicating the full PR CI workflow), reruns deployment checks and deploy safety, upload… |
| [`deploy-50webs-preview.yml`](#deploy-50webs-previewyml) | push `work/**`, `preview/**` | `https://test.ivandpopov.com/grasstex/preview/<slug>/battle_sim.php`… |
| [`preview.php` (on the host, not a workflow)](#previewphp-on-the-host-not-a-workflow) | `?ref=<branch>`, `#47`, or a GitHub branch/PR URL | Stages that commit's `battle/` runtime from GitHub into `preview/ref-<sha12>/` with the host's own loader and opens it (same preview contract, no writes). |
| [`battle-benchmark-standard.yml`](#battle-benchmark-standardyml) | dispatch | One scripted scenario, two arms. |
| [`battle-benchmark.yml`](#battle-benchmarkyml) | tag `benchmark-*` or dispatch (source must be on main) | 30 workers × 10 = 300 battles, 100 per type. |
| [`battle-hotpath-profile.yml`](#battle-hotpath-profileyml) | dispatch (type/seed/seconds) | Hot-path profile on one seed… |
| [`branch-housekeeping.yml`](#branch-housekeepingyml) | PR merged; daily 06:23 UTC; Mondays 06:17 UTC; dispatch (`dry_run` defaults true) | On PR merge, removes an unmoved merged head with no competing open PR head. |
| [`agent-apply-patch.yml`](#agent-apply-patchyml) | issue labeled `agent-apply` (issue author on the approved list) | An AI agent ships a PR by filing an issue — the agent never holds a token. |
| [`agent-benchmark-launcher.yml`](#agent-benchmark-launcheryml) | push to `work/benchmark-launch/**` | Permanent launcher: an agent pushes `.github/benchmark-request.json` on a benchmark-launch branch… |
| [`audio-acoustics-preview.yml`](#audio-acoustics-previewyml) | dispatch (`preview_ref`) | Real-browser audio compatibility QA (Playwright Chromium) against the hosted preview of that ref: runs `scripts/probes/probe_listener_acoustics.cjs` to validate… |
| [`audio-mix-preview.yml`](#audio-mix-previewyml) | dispatch (`preview_ref`) | Real-browser QA of the player audio-mix menu (Start-hold Audio tab, gamepad) against the hosted preview of that ref: runs `scripts/probes/probe_audio_mix_menu.c… |
| [`causal-inaction-benchmark.yml`](#causal-inaction-benchmarkyml) | PR touching its inputs; dispatch (`seeds`, `seconds`, `side`) | Full shipping battles… |
| [`combat-sfx-generate.yml`](#combat-sfx-generateyml) | dispatch (`max_new`) — by hand only, it spends ElevenLabs credits | Generates the combat clips `Assets/audio/combat-sfx-manifest.json` declares but that do not exist yet, onset-checks and masters them, clears their placeholder l… |
| [`grenade-area-fog-qa.yml`](#grenade-area-fog-qayml) | PR touching grenade fog, browser probe or QA workflow; dispatch (`preview_ref`) | Real-browser WebGL QA: verifies instant volume-density grenade fog from `24-grenade-fx.js` through `scripts/probes/probe_grenade_area_fog.cjs` against a hosted … |
| [`issue430-restart-isolation.yml`](#issue430-restart-isolationyml) | PR touching wound/restart/repro files; manual dispatch | Real-browser regression for issue #430: verifies two consecutive 600-second same-page battles have identical full-state fingerprints in meeting/US-defend/GE-defend… |
| [`matrix-diagnostics-smoke.yml`](#matrix-diagnostics-smokeyml) | PR touching the production matrix runner/merger; dispatch | Work-branch validation of the production matrix's actual browser runner and merger, without triggering the 300-battle main-only release matrix. |
| [`targeted-fire-control.yml`](#targeted-fire-controlyml) | PR touching its inputs; dispatch (`seeds`, `side`) | Independent observe-only multi-seed MG42 fire benchmark, diagnostics filtered by unit/role. |
| [`timescale-parity-benchmark.yml`](#timescale-parity-benchmarkyml) | PR touching the fixed-step clock; dispatch (`seconds`, `seed`) | Timescale parity benchmark: proves 1x/2x/4x and throttled-FPS variants of the fixed-step clock land on the same simulated outcomes. |
| [`voice-callouts-generate.yml`](#voice-callouts-generateyml) | dispatch — by hand only, it spends ElevenLabs credits; never on `main` | Generates the voice lines `Assets/audio/manifest.json` scripts (callouts.<side>.generation) but that do not exist yet, masters them and commits them to the running branch. |

For draft #683's Howler migration, `mobile-mini-audio-683.yml` requires the Howler Mini Map run, and `full-mix-audio-683.yml` requires Howler off/standard/high. Babylon runs afterward as an informational comparison with a visible warning and retained raw report on failure. Howler failures, native preflight, shared gameplay, required asset and browser-error checks still fail normally. Full-mix CI limits test-host audio fetches to four concurrent requests and retries connection-refused transport errors at most twice; responses remain real, HTTP failures such as 404 are forwarded unchanged, and exhausted transport retries fail. Delivery statistics are retained in each report. This test-only host protection does not alter game loading or playback. This preview CI policy does not change the runtime default: explicitly use `audioBackend=howler` until the default backend is separately changed.

## Other workflows

These existed in `.github/workflows/` but had no entry in the old page. Descriptions come from each file's header comment; read the file before relying on one. Workflows whose names end in a PR number (676, 679, 680, 683) belong to that PR's experiment and run only on PRs that touch their inputs.

| Workflow | Name | Triggers | Purpose (from the workflow header) |
| --- | --- | --- | --- |
| `actions-run-retention.yml` | ⭐ Actions run retention | schedule, workflow_dispatch | Deletes completed workflow runs (with their logs and artifacts) older than KEEP_DAYS. Benchmark and QA results are read as soon as a run finishes, so a week of history is enough. Queued and running runs are never touched… |
| `audio-limits-experiment-683.yml` | Experimental listener audio budgets 683 | pull_request | Draft-PR-only research. This does not change the shipped audio configuration or add a long-running job to the normal CI workflow. This expensive browser matrix has already produced a complete seven-case artifact. Re-run … |
| `ballistic-flight-qa.yml` | Ballistic Flight and Combat Tempo 679 | pull_request, workflow_dispatch | No header comment: read the file. |
| `damage-range-browser-qa.yml` | ⭐ Damage range browser QA | pull_request, workflow_dispatch | Run the real opt-in range against this PR's PHP loader and checked-in FBX assets. Keep it separate from the fast simulation CI; this is an expensive browser smoke. |
| `elevenlabs-connection-check.yml` | ⭐ Verify ElevenLabs connection | workflow_dispatch | Manual, read-only credential probe. Never synthesize audio or spend generation credits. Keep existing voice/SFX generator workflows manual and their ELEVEN_LABS_API wiring unchanged. |
| `fbx-retarget-browser-qa.yml` | ⭐ FBX retarget browser QA | pull_request, workflow_dispatch | The pure quaternion kernel must still agree with Babylon's independent matrix retarget on every actual imported model and clip in a checked-out PHP battle. |
| `first-contact-qa.yml` | First Contact Evidence 680 | pull_request, workflow_dispatch | No header comment: read the file. |
| `full-mix-audio-683.yml` | Experimental full battlefield audio mix 683 | pull_request | No header comment: read the file. |
| `ideation-site-check.yml` | ⭐️ Commander Ideation Site QA | pull_request, workflow_dispatch | No header comment: read the file. |
| `legacy-host-redirect.yml` | Restore historical grasstex URL alias | push, workflow_dispatch | Isolated from the protected production runtime deploy. Only runs after this workflow/redirect changes or on explicit manual dispatch. |
| `mini-meeting-qa.yml` | Mini Map Balanced Meeting 676 | pull_request, workflow_dispatch | No header comment: read the file. |
| `mini-meeting-tempo.yml` | Mini Meeting Combat Tempo 679 | pull_request, workflow_dispatch | No header comment: read the file. |
| `mobile-mini-audio-683.yml` | Experimental mobile Mini Map full audio 683 | pull_request | No header comment: read the file. |
| `phase-c-m3c-dispatch.yml` | ⭐ Dispatch Phase C Standard Comparisons | pull_request, workflow_dispatch | This workflow uses GitHub's own Actions API so all three real M3C benchmark runs appear under "M3C Standard Benchmark", not only our natural-field QA. |
| `phase-c-natural-field-qa.yml` | ⭐ Phase C Natural Full-Battle Acceptance | pull_request, workflow_dispatch | No header comment: read the file. |
| `player-settings-browser-qa.yml` | ⭐ Player settings browser QA | pull_request, workflow_dispatch | Verify the desktop/player settings UI on the PR's real PHP/module graph. |
| `playtester-probe-pack.yml` | ⭐ Playtester Probe Pack | pull_request, workflow_dispatch | Paired full battles with the observe-only probes attached, off arm against on arm, same seeds. One table for outcomes (`outcome`: winner, living, kills, objectives held), causes (`playtest` and the per-behaviour probes: … |
| `retire-branches.yml` | ⭐ Retire superseded branches | workflow_dispatch | Deletes the branches listed in .github/branch-retirement.txt, archiving any with commits nothing else keeps as archive/branch/<name> tags first. Skips a branch whose tip moved since the list was made or that has an open … |
| `risk-route.yml` | ⭐ Risk route | workflow_call | Reusable: every browser QA, probe and benchmark workflow that runs on pull requests calls this first and runs only when battle_checks is true. The decision comes from scripts/classify_ci_risk.py (one table, shared with c… |
| `strategic-5km-qa.yml` | ⭐ Strategic 5km browser QA | pull_request, workflow_dispatch | No header comment: read the file. |
| `strategic-diagnostics.yml` | ⭐ Strategic Diagnostic Replay | pull_request, workflow_dispatch | Browser benchmark evidence, not a synthetic harness. Does not alter AI decisions. |
| `strategic-interception-qa.yml` | ⭐ Strategic Interception Native QA | pull_request, workflow_dispatch | No header comment: read the file. |
| `strategic-interception-triage.yml` | ⭐ Strategic Interception Decision Triage | pull_request, workflow_dispatch | No header comment: read the file. |
| `tactical-controller-natural.yml` | ⭐ New Tactical Controller Natural A-B | pull_request, workflow_dispatch | No header comment: read the file. |
| `tactical-map-browser-qa.yml` | ⭐ Tactical map browser QA | pull_request, workflow_dispatch | No header comment: read the file. |
| `tactical-observation-qa.yml` | ⭐ Tactical Observation Browser QA | pull_request, workflow_dispatch | No header comment: read the file. |
| `tactical-skills-lab-drills.yml` | ⭐ Tactical Skills Lab Microdrills | pull_request, workflow_dispatch | No header comment: read the file. |
| `tactical-skills-lab-qa.yml` | ⭐ Native Tactical Skills Lab QA | pull_request, workflow_dispatch | Runtime PRs run the range gate; docs, housekeeping and CI-config-only PRs skip it. This preflight must pass before spending CI on full-battle benchmarks. |
| `tactical-sprint-clip-audit.yml` | ⭐ Sprint Gait to FBX Clip Audit | pull_request, workflow_dispatch | Read-only, no injected tactical decisions. Collect the exact lower-body FBX selected for native US sprint movement at each fixed 0.15-second sim step. |

## Workflow details

One section per workflow above; read only the one you need.

### `ci.yml`

**Trigger:** PR, manual dispatch

Change detection skips the private-audio job unless actual audio inputs change and skips the full deploy-plan job unless audio/deployment inputs change; syntax (JS/PHP/Py/sh/JSON), prettier ratchet (every JS file the PR touches must satisfy `.prettierrc.json`; legacy files converge as they are edited), audio library, sim regressions (all harness checks + 8 seeds + the five standalone scripts/ checks: formation-frame stability, macro mission command, movement-order ownership, meso-micro movement ownership, physical waypoint refill), deploy plan + deploy safety + prepared clips current

### `deploy-50webs-php.yml`

**Trigger:** push to main (verify merged PR head passed CI; manual override for non-merge pushes)

Stamps `build-v<N>`, validates the merged commit independently (without duplicating the full PR CI workflow), reruns deployment checks and deploy safety, uploads by content hash to production

### `deploy-50webs-preview.yml`

**Trigger:** push `work/**`, `preview/**`

`https://test.ivandpopov.com/grasstex/preview/<slug>/battle_sim.php`; never touches prod, makes no telemetry/learning writes; its `mirror --delete` skips JSON and lab files

### `preview.php` (on the host, not a workflow)

**Trigger:** `?ref=<branch>`, `#47`, or a GitHub branch/PR URL

Stages that commit's `battle/` runtime from GitHub into `preview/ref-<sha12>/` with the host's own loader and opens it (same preview contract, no writes). Only this repo's branches and same-repo PRs (a PR uses its head commit, so merged ones still open); keeps the 12 most recent. Branch FBX, clips, weapons and `Assets/effects` PNGs come too: files identical to production are hard links, and new ones download (≤300 MB). A branch that changes `battle_sim_local.php` still needs the Actions preview. Optional `state/github-token.php` (`<?php return '<token>';`) lifts the 60/h API limit.

### `battle-benchmark-standard.yml`

**Trigger:** dispatch

**One scripted scenario, two arms.** One seed (`seed`, used exactly as given; default `scripted-scout-0003`) is stepped unmeasured to first contact, measured for 60 simulated seconds, then run to the end of the battle with a record at every 60 simulated seconds and one at the end (`windows`, default `contact+60,every60`; `battle_type` picks meeting / us-defend / ge-defend), once with `query_off` and once with `query_on` as page flags, one after the other on one runner (so wall time is comparable), then compared with `compare_benchmark_arms.cjs` (the counters are in the workflow). Each segment is one full benchmark record (`<seed>-contact`, `<seed>-t180`, `<seed>-t240`, … `<seed>-end`; every field of the old record, counted inside the segment, with kills, survivors, captures, `timeline` and `stress` as of its close, copied when it closes, and a `window` block), so the old stats and telemetry are all there; segments that touch carry the stall and objective trackers across, so a stall over a checkpoint is one stall. `end` is the winner or the time limit, and covers what is left since the last checkpoint; an arm that ends earlier has fewer `tN` records and a shorter `end`, and a checkpoint only one arm reached shows as `unpaired`. Both queries empty is a control and the arms must be identical (two fresh runs of one seed were, field for field bar wall time). **The run processes its own result** (`scripts/process_benchmark_results.cjs`): a verdict (inert, one battle, quiet, weak or moved, with the Bonferroni line named and the chance count stated), the paired table, the seeds that part earliest and slim viewer files (`off.json`, `on.json`: the full-length record of a scripted run; in seeds mode the 8 seeds whose timelines part earliest). It is the head of the run summary, is printed in the job log, and is pushed (`scripts/publish_benchmark_result.sh`) to the `benchmark-results` branch at `benchmarks/results/scripted/runs/<run>/` (`summary.md`, `result.json`, `compare.json`, `off.json`, `on.json`; the newest 30 runs stay; `benchmarks/results/standard` is not touched), so read a run with `get_file_contents` on that path, not by downloading an artifact. The notification's click opens `ai_flow_live.html?bench=<run>&view=brain3d` with both arms loaded: on the server's map once its viewer has the loading code (it has it when this reaches `main`), until then on the viewer of the branch that ran (`/preview/<slug>/`, which the preview deploy now uploads), and on the run page if neither is up; the full artifacts keep every record. `BATTLE_BENCHMARK_WINDOWS` is the runner's switch, and without it the runner is the whole battle as one record (the milestone `battle-benchmark.yml` still uses that). **`seeds` above 1 is a paired run across seeds**: `seed` is then the prefix, the seeds are `<prefix>-0001` to `<prefix>-<N>`, `scripts/plan_benchmark_shards.cjs` spreads them over up to 20 shard jobs (`BATTLE_BENCHMARK_FIRST` numbers a shard's seeds) that each play both arms on one runner over `windows` (default `contact+120`, the first two minutes of fighting, one record per seed), and a last job pools the shards and compares them paired by seed (`compare_benchmark_arms.cjs`, `--count casualties` among the counters; `scripts/format_benchmark_compare.cjs` renders the table in the run summary). One shard failing leaves its seeds out of the pairs and fails the run.

### `battle-benchmark.yml`

**Trigger:** tag `benchmark-*` or dispatch (source must be on main)

30 workers × 10 = **300 battles**, 100 per type. Major milestones only.

### `battle-hotpath-profile.yml`

**Trigger:** dispatch (type/seed/seconds)

Hot-path profile on one seed

### `branch-housekeeping.yml`

**Trigger:** PR merged; daily 06:23 UTC; Mondays 06:17 UTC; dispatch (`dry_run` defaults true)

On PR merge, removes an unmoved merged head with no competing open PR head. Mondays, the regular sweep removes branches with no unmatched patches, no open PR and tips ≥7 days old. Every day, a separate benchmark-launch sweep considers `work/benchmark-launch/*` tips ≥2 days old **only when** the tip edits just `.github/benchmark-request.json`, the exact launch SHA has a successful launcher run, no related run is active, and no open PR depends on the branch. Before a guarded lease deletion, it pins a non-main launch parent as a `archive/benchmark-source/<sha>` tag and verifies a request/provenance JSON archive in `benchmark-results/benchmarks/launch-requests/<sha>.json`. Self-dependent launcher refs, unmatched changes outside the request, failed launches, and errors are kept. Scheduled sweeps are live; manual dispatch defaults to dry-run. Workflow-registration auditing is read-only.

### `agent-apply-patch.yml`

**Trigger:** issue labeled `agent-apply` (issue author on the approved list)

An AI agent ships a PR by filing an issue — the agent never holds a token. Parses the issue's base64 `git format-patch` payload (or plain unified diff), applies it and opens a PR. Format, actor allowlist and credential redaction: [agent-apply workflow](../agent-apply-workflow.md).

### `agent-benchmark-launcher.yml`

**Trigger:** push to `work/benchmark-launch/**`

Permanent launcher: an agent pushes `.github/benchmark-request.json` on a benchmark-launch branch; this job dispatches existing benchmark workflows only. Agents never edit benchmark implementations or create per-run workflow files.

### `audio-acoustics-preview.yml`

**Trigger:** dispatch (`preview_ref`)

Real-browser audio compatibility QA (Playwright Chromium) against the hosted preview of that ref: runs `scripts/probes/probe_listener_acoustics.cjs` to validate a real Babylon 9 audio graph (module 12a listener acoustics).

### `audio-mix-preview.yml`

**Trigger:** dispatch (`preview_ref`)

Real-browser QA of the player audio-mix menu (Start-hold Audio tab, gamepad) against the hosted preview of that ref: runs `scripts/probes/probe_audio_mix_menu.cjs` (module 00a player mix).

### `causal-inaction-benchmark.yml`

**Trigger:** PR touching its inputs; dispatch (`seeds`, `seconds`, `side`)

Full shipping battles; each instrumented seed is replayed without the probe (probe-free control must match). Details: [causal-inaction benchmark](../causal-inaction-benchmark.md).

### `combat-sfx-generate.yml`

**Trigger:** dispatch (`max_new`) — by hand only, it spends ElevenLabs credits

Generates the combat clips `Assets/audio/combat-sfx-manifest.json` declares but that do not exist yet, onset-checks and masters them, clears their placeholder lines and commits them to the running branch. Existing clips are never regenerated, so a rerun spends nothing. Details: [audio](../audio.md).

### `grenade-area-fog-qa.yml`

**Trigger:** PR touching grenade fog, browser probe or QA workflow; dispatch (`preview_ref`)

Real-browser WebGL QA: verifies instant volume-density grenade fog from `24-grenade-fx.js` through `scripts/probes/probe_grenade_area_fog.cjs` against a hosted preview ref.

### `issue430-restart-isolation.yml`

**Trigger:** PR touching wound/restart/repro files; manual dispatch

Real-browser regression for issue #430: verifies two consecutive 600-second same-page battles have identical full-state fingerprints in meeting/US-defend/GE-defend; also tests isolated-page 1×/4×/8× parity. Kept separately from the cheap static restart harness check.

### `matrix-diagnostics-smoke.yml`

**Trigger:** PR touching the production matrix runner/merger; dispatch

Work-branch validation of the production matrix's actual browser runner and merger, without triggering the 300-battle main-only release matrix. Details: [matrix diagnostics](../matrix-diagnostics.md).

### `targeted-fire-control.yml`

**Trigger:** PR touching its inputs; dispatch (`seeds`, `side`)

Independent observe-only multi-seed MG42 fire benchmark, diagnostics filtered by unit/role. PRs run a two-seed smoke per scenario; dispatch defaults to 20. Details: [targeted-fire benchmark](../targeted-fire-benchmark.md).

### `timescale-parity-benchmark.yml`

**Trigger:** PR touching the fixed-step clock; dispatch (`seconds`, `seed`)

Timescale parity benchmark: proves 1x/2x/4x and throttled-FPS variants of the fixed-step clock land on the same simulated outcomes. Details: [timescale parity](../timescale-parity.md).

### `voice-callouts-generate.yml`

**Trigger:** dispatch — by hand only, it spends ElevenLabs credits; never on `main`

Generates the voice lines `Assets/audio/manifest.json` scripts (callouts.<side>.generation) but that do not exist yet, masters them and commits them to the running branch. Existing lines are never regenerated or touched.

## Credential checks

### ElevenLabs credential verification (zero generation credits)

`elevenlabs-connection-check.yml` is a permanent **manual-only, read-only** workflow.
Run it from GitHub Actions to validate the current `ELEVEN_LABS_API` binding using
ElevenLabs `GET /v1/user`. It prints no key or account details, and does not generate audio.
A 403 can reflect scoped access to the user endpoint rather than a disabled TTS/SFX key.
The voice and combat generation workflows remain independently manual and unchanged.
