# Physical and browser QA

**Kind:** current testing contract. Index: [testing](../testing.md). Muse executes manually requested browser runs ([ownership](../handoffs.md#muse-browser-qa-ownership)); this page says what the tools do so a request can name them. **Read when:** preparing a browser probe, visual check, preview check, camera or player-mode check, or the device benchmark.

<!-- Moved from docs/agents/testing.md at d15687b; edit here. -->

## Where browser probes run

<!-- Moved from docs/agents/working-rules.md at d15687b. -->

**Browser probes run against the preview, not a local server.** Push the branch and point the
  script's URL variable (`CLOSEUP_URL`, `CULL_URL`, `BF_URL`, …) at
  `https://test.ivandpopov.com/grasstex/preview.php?ref=<branch>` (only the preview options declared in `runtime-contract.php` pass through; strategic controls
  including explicit `=0` values are preserved, while unsupported options still drop: `morale`, `coa`, `mind`, `stats`, `perception`, `geScout`,
  `groundSteps` and any probe flag are not among them, so three "flag" arms of the 3b/3c probes once ran flag-off,
  identical to the control in 60 of 60 battles; for those, open the staged page the launcher redirects to,
  `https://test.ivandpopov.com/grasstex/preview/ref-<sha12>/battle_sim.php?<flags>`, and check the flag arrived,
  e.g. `BattleSquadStability.moraleOn()`). It has
  the real textures and hosting and loads far faster than `php -S` under SwiftShader, where the ground
  renders red. Use the local server only for what the preview can't serve: an unpushed tree, a
  `git worktree` A/B, or a change to `battle_sim_local.php`.

**Browser smoke + screenshot.** Proves the page boots and the sim runs. Playwright is installed
globally here; don't run `playwright install`.

```bash
mkdir -p /tmp/www && ln -sfn "$PWD" /tmp/www/grasstex
php -S 127.0.0.1:8765 -t /tmp/www >/tmp/php.log 2>&1 &
node scripts/smoke_battle_page.cjs          # SMOKE_SEED, SMOKE_SECONDS, SMOKE_OUTPUT=shot.png
```

Hosted textures 404 when served locally, so the ground renders red. That's expected. Scripts below
default to this local URL; run them against the branch preview instead (see Working rules).

**Visual checks: keep these, don't rewrite them.** Look at a change on the live host rather than a
local red-ground page, and reuse these harnesses instead of writing one-off probes:

- **Open any branch live:** `https://test.ivandpopov.com/grasstex/preview.php?ref=<branch|#PR|GitHub URL>`
  (see CI and workflows). The link follows the branch head. It carries the branch's own models, clips,
  weapons and effect sprites, so new decals or FBX show up.
- **Close-ups in a real fight:** `scripts/closeup_battle.cjs` runs a battle in fixed 0.15 s steps
  until a soldier matches `CLOSEUP_TARGET` (`casualty`, `wounded`, `any`, `role:ge/gunner`, `id:<n>`),
  pauses, and photographs him from `CLOSEUP_VIEWS` (`front,left,back,top,right,wide`). Output is
  `<view>-<id>.png` plus `summary.json` (hp, wounds, casualty zone, weapon, FBX or not, and `timings`
  per phase). It blocks telemetry, learning and policy writes, so it's safe against production and
  previews. A live run takes ~1 min. Page build is ~20 s, the sim fast-forward is ~5 s for two minutes
  of battle, and software rendering is ~0.3-0.6 s a frame. Clips run on sim time, so it renders only
  6 settle frames and 1 per view. `Math.random` is seeded from the seed, but a rerun can still match a
  different man at a different time (seen 2026-09-28), and decal variants drawn on async timers
  differ, so it is for looking, not for before/after comparisons (see Before/after pictures). Env: `CLOSEUP_URL`, `CLOSEUP_SEED`, `CLOSEUP_COUNT`,
  `CLOSEUP_AFTER` (sim seconds after the match, default 1.5), `CLOSEUP_DIST`, `CLOSEUP_WAIT`,
  `CLOSEUP_OUT`, `CLOSEUP_UI=1`.
  ```bash
  CLOSEUP_URL='https://test.ivandpopov.com/grasstex/preview.php?ref=<branch>' CLOSEUP_TARGET=wounded \
    CLOSEUP_OUT=out/closeup node scripts/closeup_battle.cjs
  ```
- **Close-ups of one posed soldier:** `scripts/closeup.cjs` puts any `faction/role[/weapon.fbx]` in
  any Motion Lab pose at any time, alone in its own scene, through the game's FBX backend at a fixed
  30 Hz, from `front`/`side` (or `right`)/`back`/`left`/`three-quarter`/`top`, framed on
  `body`/`hands`/`weapon`. Use it for a hold or a clip. Use `closeup_battle.cjs` for anything the
  fight itself causes (wounds, death falls, stance under fire). `Math.random` is seeded, so the same env
  gives the same frames, death clips included. Env: `CLOSEUP_SOLDIERS`, `CLOSEUP_POSES`, `CLOSEUP_TIMES`,
  `CLOSEUP_VIEWS`, `CLOSEUP_FRAMING`, `CLOSEUP_SIDECAR`, `CLOSEUP_OUT`, `CLOSEUP_URL`. Writes PNGs and
  `summary.json` (clips, two-hand state, support error).
- **Damage decals themselves:** `scripts/closeup_damage_fx.cjs` shoots the newest decal of each kind
  (wound, exit, pool, spray, masonry, wood, dirt, metal) along its surface normal, plus a
  `summary.json` of wounds by zone and decals by kind; works against a `preview.php?ref=` URL.
  `scripts/preview_decal_sheets.cjs` checks the sprite sheets themselves (no server).
- **Interactive damage range:** add `?damageRange=1` to a normal battle/preview URL. It freezes combat
  AI and lays out one US shooter plus US/GE rifleman, sergeant, scout, gunner and engineer targets on
  a raised inspection deck. The range uses the shipping FBX models, weapon presentation, hit/death
  animation bridge and impact/UV-wound system; Fire itself does not alter HP, while **Kill** is
  explicit so wounds can accumulate before a death pose is inspected. Controls in the page select
  target and zone, entry-only vs through-shot, single/3-shot, auto cycling, orbit, FPS aim, clear and reset.
  FPS aim puts a UniversalCamera just in front of the shooter's face/chest line, shows a centered reticle,
  and sends shots through the reticle: body hits are classified into head/chest/abdomen/arm/leg while a
  miss paints the backstop. Drag/touch or the right stick aims; changing target/zone recenters the reticle.
  The panel is docked off-center and collapsible; `rangeAuto=1` starts with the compact panel unless
  `rangeUi=full` is supplied (`rangeUi=compact` forces compact mode). Keyboard: Space fire, arrows
  target, 1-5 zone, F FPS aim, E exit, O orbit, A auto, C clear. Xbox/standard gamepad: A fire,
  RT also fires in FPS aim, X 3-shot, D-pad left/right target, D-pad up/down zone, Menu toggles FPS,
  Y auto, B clear, LB exit, RB orbit, right stick aim/orbit, LT ADS in FPS, R3 kill, View toggles the panel.
  URL setup: `rangeTarget=0..9`, `rangeZone=head|chest|abdomen|arm|leg`, `rangeExit=0|1`,
  `rangeAuto=0|1`, `rangeInterval=<seconds>`, `rangeOrbit=0|1`, `rangeDist=<metres>`,
  `rangeUi=full|compact`, `rangeFps=0|1`.
  **V1 closeout:** PR #103 adds the off-centre/collapsible UI, Xbox controls, FPS aim/reticle and
  preview-launcher pass-through for every range flag.
- **Every model with its weapon, plus the Motion Lab poses:** `scripts/fbx-soldier-lineup.cjs`
  (see Soldiers, weapons, animation).
- **Pistol support hand numbers:** `scripts/probe_pistol_cup.cjs` (see the replay table below).

In a cloud sandbox Chromium sees the proxy's CA, so launch with `--ignore-certificate-errors`
(these scripts do). Otherwise Babylon never loads from the CDN and `__battle__` never appears:
the symptom is a `waitForFunction` timeout after 180 s, not an error. A new Playwright script
needs the flag in `chromium.launch` args; `ignoreHTTPSErrors` on the page alone is not enough.

**Before/after pictures (pixel A/B of a presentation change).** Learned the slow way (PR #86):
- **Use `closeup.cjs` (posed soldier), not `closeup_battle.cjs`.** The fight close-up is not
  deterministic across page loads here: the same build and seed matched a different soldier at a
  different sim time on a rerun, so its differences prove nothing either way. `closeup.cjs` is
  seeded and steps at a fixed 30 Hz, so the same env gives the same bytes.
- **Put the old and new code behind a URL flag** (as `?cloneBounds=1`, `?fastRetarget=0`,
  `?soldierLod=0` do) and run the same tool against both URLs from one checkout. Comparing two
  trees also works: serve a `git worktree` of `main` at `/tmp/www/<name>` and drop a
  `preview.json` in its root (and one in yours), or `battle_sim_local.php` serves `/grasstex/`'s
  runtime for both. Never commit those `preview.json` files.
- **Run a control first:** the same URL twice. If the control differs, the tool is not
  deterministic for that case and an A/B means nothing.
- **Compare with `scripts/compare_screenshots.cjs <dirA> <dirB>`** (byte-identical, else the share
  and box of differing pixels; decodes in Chromium, as there is no Python imaging library here).
- Keep a run small (a few soldiers, poses and views): each image renders under SwiftShader.
- **A script that pauses the battle must wait for Start first:** its click handler awaits the audio
  unlock and then calls `battle.resume()`, so a pause set right after `startBtn.click()` is undone
  a moment later (wait until `startBtn.hidden`). Let the first few renders after a fast-forward play
  out too: effects the steps queued on wall-clock timers keep appearing (`probe_soldier_cull.cjs`).

**Persistent visual-QA camera** (`battle/camera-controls.js`, presentation only): normal battle/preview URLs may use
`?follow=1` for a close ArcRotate chase camera (default `followDist=10` m). `?orbit=1` implies follow
and continuously circles the tracked soldier; `orbitSpeed=.22` is radians/sec and may be negative,
while `followHeight=1.05`, `followBeta=1.18`, and `followAlpha=-1.5708` are optional framing
controls. The camera follows the busiest living soldier initially and transfers to the nearest living
soldier 3 sim seconds after death. It reads presentation transforms only and never writes simulation
state. The user can still drag to change bearing/elevation and wheel to zoom. This is separate from
the benchmark-only `benchCam=follow` camera.

**Battle player mode** (`battle/camera-controls.js` + existing AI owners): on the normal battle
page, desktop **P** enters player mode by choosing a random living soldier from a random live squad
on the player's faction (`us` by default; `?playerFaction=ge` chooses German). Press **P** again to
jump to another random living soldier on the same faction; **V** returns to the free camera.
Keyboard/mouse controls: **WASD** move, **Shift** run, **mouse** look, **RMB** aim, **LMB** fire,
**C** crouch/stand, **Z** prone/stand. On a standard Xbox controller, **Menu/Start** enters or switches
player mode, **View** exits, **LS** moves, **L3** runs, **RS** looks, **LT** aims, **RT** fires,
**B** crouches/stands and **A** goes prone/stands. Keyboard/mouse and gamepad inputs feed the same
player-control path and can be mixed; losing the controller leaves possession active so keyboard/mouse
takes over.
The possessed soldier carries `isPlayer=true` for the full possession lifetime; that flag, not the
short render-time movement proposal, gates the entire soldier Micro path. While it is set, SquadAI
does not run before/after Micro extensions, Perception or Engagement for that man, the Movement
Resolver never falls through to squad/tactical routing if an input proposal expires, and building
hardpoints cannot assign or retain him. Squad command and every other soldier keep running.
Possession starts in a player-owned standing stance. The player's walk/run choice overrides squad
hold/defend gait selection for that soldier only. Player fire is true free-fire: it launches the
crosshair ray even with no AI target lock, using the normal ammunition/reload/stoppage owner and
physical ballistics through terrain, buildings, bodies, penetration, wounds and presentation FX.
Movement still goes through `BattleMovementResolver` and the shipping movement integrator, stance
through `BattleEngagement.commitStance`, and the crosshair aim point through `SquadAI.playerAim` for
presentation. The third-person camera is terrain-clamped so its shoulder position cannot drop below
the ground. Fly, follow and player cameras share `CAMERA_FAR=2600`; keep that farther than the
physically offset sky dome so looking up cannot clip through to `scene.clearColor`. `isPlayer` is
cleared only on switch/exit/death handoff, at which point normal Micro resumes.

**Device benchmark** (`modules/97-device-benchmark.js`, inert without the flag): open the page with
`?bench=1` on any phone or computer, tap **Start benchmark** and keep the tab in front. It
fast-forwards `benchWarmup` (60) sim seconds to contact, plays `benchSeconds` (60) with the normal
render loop and reports (result v7): FPS (median, mean, 5%/1% lows); frame, CPU, render, sim and
pose time; GPU time where the browser has a timer query; device and renderer; the load breakdown;
where `scene.render` goes (hooks by name, active-mesh evaluation, `Skeleton.prepare`, draw,
unattributed); draw calls by kind; frame pacing (refresh rate, share of frames taking 1, 2, 3…
refreshes); and the 10 worst frames, with the meshes created just before each. **Copy results** /
**Download JSON** (nothing is uploaded; also `window.__deviceBench`). Flags: `benchCam=close` (the
biggest group from 90 m, the touch camera's limit), `benchCam=follow` (a chase camera `benchFollow`
(25) m from a man in the biggest group, onto the nearest living man 3 s after he falls; the result
records who and how many switches), `soldierCull=0` (cull before/after), `benchHide=soldiers[,weapons,decals,hedges,terrain,objectives,walls,cover]`
(stop drawing those kinds, to cost them on a device with no GPU timer), `benchAuto=1` (no tap),
`animLod=0` (LOD before/after). This is how real devices are measured; `benchmark_full_fidelity.cjs`
is the scripted equivalent.

**Runtime timing switch** (`modules/53-fbx-soldier-backend.js`, observe only, no sim writes or RNG draws):
`BattleAssetTimings.snapshot()` gives the load overlay's phase times, and per FBX file the download
(browser stall and transfer), queue wait, Babylon parse, prepare, clip conversion, retarget, grip solve
and sidecar fetch, plus per-soldier bind, totals and the 10 slowest files. It is on by default.
`BattlePoseTimings` times `applyPose` per frame and per soldier, split into setup, base, overlay,
dials, weapon, aim and support layers, and counts how often each layer's inputs changed since it last
ran. It is off by default and measures nothing until turned on. `?perfTimings=1` or
`window.BATTLE_PERF_TIMINGS=true` turns both on; `=0`/`false` turns both off.

**Damage range lifetime (audit #456 R5):** `98-damage-range.js` keeps opt-in bootstrap and pure helpers; `97z-damage-range-session.js` owns lineup, shipped shot dispatch and presentation ticks, `97z-damage-range-view.js` owns cameras and pointer/gamepad aim, `97z-damage-range-panel.js` owns live DOM controls, and `97z-damage-range-lifetime.js` cancels timers, listeners, observers and resources on scene disposal. Both PHP loaders gate the whole group behind `damageRange=1` (or `devModules=1`). `damage-range-lifecycle-check.js` checks cancellation and control leases; `probe_damage_range.cjs` exercises actual canvas aiming, UV wounds, reload reset and scene teardown in Chromium.

## Muse evidence contract

<!-- Moved from docs/agents/working-rules.md at d15687b. -->

### Evidence and completion

Muse returns the tested full SHA, actual URL/build and effective inputs, steps or
commands actually executed, observed versus expected behavior, pass/fail/blocker,
browser errors, screenshots/video when relevant, raw diagnostics/traces and CI/run
links. Skills Lab reports retain real actor/target/action-owner identities, simulation
advancement, same-seed reset, physical movement/support-fire/check-in and cancellation
evidence; staged inputs are labelled as premises. A changed source invalidates an
older result as current-head acceptance.

The implementing agent reviews the evidence and fixes any confirmed issue. Mark
browser QA complete only after Muse has returned evidence for that exact source;
a task file, mention, dispatch acknowledgement or green launcher alone is not a
browser test result.

### Automatic CI and unavailable integrations

Existing automatically triggered CI, preview and browser workflows continue to run.
Do not disable, skip, weaken or replace required checks to enforce agent routing.
Muse reviews their browser evidence and owns any manual follow-up; automatic execution
can be reused rather than duplicated. Repository-wide CI, exact-head validation,
deterministic comparisons, performance limits and merge/deployment requirements still
apply.

The commands under `.muse/commands/` describe workflows; they do not themselves
dispatch Muse or connect agents' conversations. An `@mention` is a delivery mechanism
only when a verified GitHub account/bot and its event integration are configured.
Never invent an account, assign an unverified recipient, or claim delivery/execution
without an observed acknowledgement or run. If no Muse integration is available,
leave the handoff explicitly pending, provide its GitHub link, and continue independent
non-browser work. Do not silently substitute another agent's browser or claim that
the request is running. A change to this routing requires the user's explicit
instruction; Muse unavailability is not a waiver of required browser evidence.
