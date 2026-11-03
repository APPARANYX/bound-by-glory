import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import summarizeCPUProfile from './lib/cpu-profile-summary.cjs';
import cpuChains from './lib/cpu-profile-chains.cjs';
import { renderFlamegraph } from './lib/cpu-flamegraph.cjs';

const { topChains, flameTree, splitByIntervals } = cpuChains;

// BATTLE_PROFILE_WRAPPERS=0 skips the inclusive wall-time wrapper profiler
// and runs CDP sampling only. The wrappers perturb wall-clock behaviour
// (their `clock` helper was the largest self-time entry in the baseline
// profile), so a wrappers-off run is the uninstrumented wall-clock
// reference. Default is on: wrappers also supply the route/navigation
// counters the report reconciles against.
// BATTLE_PROFILE_HEAP=1 additionally captures CDP HeapProfiler allocation
// sampling (selfSize per allocating function) alongside CPU sampling.
const useWrappers = process.env.BATTLE_PROFILE_WRAPPERS !== '0';
const useHeapSampling = process.env.BATTLE_PROFILE_HEAP === '1';
// BATTLE_PROFILE_BABYLON_LOCAL=/path/to/babylon.js serves a local copy of
// the Babylon.js CDN script instead of fetching it from jsdelivr. The battle
// page loads Babylon from the CDN; sandboxed/offline runners (proxy blocks
// the CDN in Chromium even when curl reaches it) cannot initialise the
// battle without it. CI has internet access and does not need this. The file
// is served byte-for-byte; it changes no simulation code.
const babylonLocalPath = process.env.BATTLE_PROFILE_BABYLON_LOCAL || '';
let babylonJs = null;
if (babylonLocalPath) babylonJs = fs.readFileSync(path.resolve(babylonLocalPath));

const url =
  process.env.BATTLE_PROFILE_URL ||
  process.env.BATTLE_BENCHMARK_URL ||
  'http://127.0.0.1:8765/grasstex/battle_sim_local.php';
const seed = String(process.env.BATTLE_PROFILE_SEED || 'profile-battle');
const battleType = String(process.env.BATTLE_PROFILE_TYPE || 'meeting');
const fixedDt = Math.max(
  0.05,
  Math.min(0.3, Number.parseFloat(process.env.BATTLE_PROFILE_STEP || '0.15') || 0.15)
);
const simSeconds = Math.max(
  15,
  Math.min(600, Number.parseFloat(process.env.BATTLE_PROFILE_SECONDS || '120') || 120)
);
const snapshotSeconds = Math.max(
  10,
  Math.min(simSeconds, Number.parseFloat(process.env.BATTLE_PROFILE_SNAPSHOT_SECONDS || '30') || 30)
);
const outputDir = path.resolve(process.env.BATTLE_PROFILE_OUTPUT || 'reports/profile');
const policyUrl =
  process.env.BATTLE_BENCHMARK_POLICY_URL || 'https://test.ivandpopov.com/grasstex/battle_policy.php';
const commit = process.env.BATTLE_BENCHMARK_SOURCE_SHA || process.env.GITHUB_SHA || 'local';
fs.mkdirSync(outputDir, { recursive: true });

async function getLivePolicy() {
  try {
    const response = await fetch(policyUrl, { headers: { 'cache-control': 'no-cache' } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    if (json?.genome)
      return { source: 'live-policy-endpoint', revision: Number(json.revision || 0), genome: json.genome };
    return {
      source: 'runtime-default',
      revision: Number(json?.revision || 0),
      genome: null,
      warning: 'Policy endpoint returned no genome.'
    };
  } catch (error) {
    return {
      source: 'runtime-default',
      revision: 0,
      genome: null,
      warning: `Live policy fetch failed: ${error?.message || error}`
    };
  }
}

const policy = await getLivePolicy();
const browserErrors = [],
  browserWarnings = [];
const startedWall = Date.now();
const browser = await chromium.launch({
  headless: true,
  args: ['--disable-dev-shm-usage', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist']
});

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  page.setDefaultTimeout(120_000);
  page.on('pageerror', error => browserErrors.push(String(error?.stack || error)));
  page.on('console', msg => {
    const text = msg.text();
    if (msg.type() === 'error') browserErrors.push(text);
    else if (msg.type() === 'warning') browserWarnings.push(text);
  });
  await page.route('**/*', async route => {
    const reqUrl = route.request().url();
    // Chromium in this sandbox cannot fetch the jsdelivr CDN (the egress
    // proxy rejects its tunnel); when a local Babylon file is supplied, the
    // CDN is bridged through Node fetch instead. Babylon comes from the
    // local file; the other CDN scripts (loaders, meshoptimizer) are
    // fulfilled from the CDN via Node fetch. Without this the battle never
    // initialises (FBX loader script fails to load).
    if (babylonJs && /^https:\/\/cdn\.jsdelivr\.net\//.test(reqUrl)) {
      try {
        const isBabylon = /\/npm\/babylonjs@[^/]+\/babylon\.js/.test(reqUrl);
        const body = isBabylon
          ? babylonJs
          : Buffer.from(await (await fetch(reqUrl)).arrayBuffer());
        return route.fulfill({ status: 200, contentType: 'application/javascript', body });
      } catch (error) {
        browserWarnings.push(`CDN bridge failed for ${reqUrl}: ${error?.message || error}`);
        return route.continue();
      }
    }
    const type = route.request().resourceType();
    if (type === 'media' || type === 'font') return route.abort();
    return route.continue();
  });

  const pageUrl = `${url}${url.includes('?') ? '&' : '?'}seed=${encodeURIComponent(seed)}`;
  await page.goto(pageUrl, { waitUntil: 'domcontentloaded', timeout: 120_000 });
  await page.waitForFunction(
    () =>
      !!(
        window.__battle__ &&
        window.BattleCommanderAI &&
        window.BattleTownObjectives &&
        window.BattleAIPolicy &&
        window.BattleObjectiveSystem &&
        window.BattleModules
      ),
    null,
    { timeout: 120_000 }
  );
  if (useWrappers) {
    await page.addScriptTag({ path: path.resolve('scripts/battle-hotpath-profiler.cjs') });
  }

  // Sampling complements the inclusive wrappers: it exposes work inside their
  // closures without changing gameplay functions, scheduling, inputs or RNG.
  // The anchor is the page's performance.now() just before sampling starts;
  // step boundaries recorded inside the battle are converted to microseconds
  // since this anchor so CPU samples can be attributed to simulation
  // intervals on the same clock.
  const profileStartPerfNowMs = await page.evaluate(() => performance.now());
  const cpuSession = await page.context().newCDPSession(page);
  await cpuSession.send('Profiler.enable');
  await cpuSession.send('Profiler.setSamplingInterval', { interval: 1000 });
  if (useHeapSampling) {
    await cpuSession.send('HeapProfiler.enable');
    await cpuSession.send('HeapProfiler.startSampling', { samplingInterval: 512 * 1024 });
  }
  await cpuSession.send('Profiler.start');
  let result, cpuSummary, cpuProfile, heapProfile;
  try {
    result = await page.evaluate(
      async ({ fixedDt, simSeconds, snapshotSeconds, suppliedPolicy, useWrappers }) => {
        const root = window,
          sim = root.__battle__,
          engine = sim.scene?.getEngine?.(),
          renderLoop = root.__battleRenderLoop__;
        if (engine && renderLoop) engine.stopRenderLoop(renderLoop);
        sim.pause();

        const telemetry = root.BattleTelemetry || null;
        if (telemetry?.end) {
          try {
            await telemetry.end(sim, 'benchmark-profile-start');
          } catch (_) {}
        }
        if (telemetry) {
          telemetry.record = function () {};
          telemetry.start = function () {};
          telemetry.ensure = function () {};
          telemetry.end = async function () {
            return true;
          };
          telemetry.checkpoint = async function () {
            return true;
          };
          telemetry.flush = async function () {
            return true;
          };
        }

        const baseline = suppliedPolicy?.genome || root.BattleAIPolicy.get();
        const rawRestart = sim._controlRawRestart || sim.restart.bind(sim);
        root.BattleAIPolicy.setMatchPolicies(sim, baseline, baseline);
        sim.trainingMode = true;
        root.BattleSoldierModel?.setImportedEnabled?.(sim.scene, false);
        rawRestart();
        sim.manualEnded = false;
        sim.winner = null;
        sim.winReason = null;
        sim.paused = false;
        sim.timeScale = 1;
        sim.timeLimit = simSeconds;

        const profiler = useWrappers ? root.BattleHotpathProfiler : null;
        if (useWrappers && !profiler) throw new Error('BattleHotpathProfiler did not load');
        if (profiler) profiler.reset();
        const commandTick = +root.BattleCommanderAI.commandTick || 0.45;
        const maxSteps = Math.ceil((simSeconds + 2) / fixedDt);
        const snapshots = [];
        // Step boundaries on the page clock, for attributing CPU samples to
        // simulation intervals. First entry is the battle start.
        const stepBoundaries = [{ simTime: 0, perfNowMs: performance.now() }];
        let commandAccum = 0,
          steps = 0,
          nextSnapshot = snapshotSeconds;
        const wallStart = performance.now();

        function slimState() {
          return {
            simTime: +(+sim.time || 0).toFixed(2),
            winner: sim.winner || null,
            winReason: sim.winReason || null,
            usAlive: +(sim.factions?.us?.alive || 0),
            geAlive: +(sim.factions?.ge?.alive || 0),
            personalSpace: sim._personalSpaceSummary || sim._personalSpaceStats || null,
            tacticalPositions: sim._tacticalPositionSummary || null,
            movementGoals: sim._movementGoalStats || null,
            squadCommand: sim._squadCommandStats || null
          };
        }

        while (!sim.winner && sim.time < simSeconds + 0.5 && steps < maxSteps) {
          sim._trainerStepActive = true;
          try {
            sim.step ? sim.step(fixedDt) : sim._frame(fixedDt);
          } finally {
            sim._trainerStepActive = false;
          }
          steps++;
          commandAccum += fixedDt;
          while (commandAccum + 1e-9 >= commandTick && !sim.winner) {
            commandAccum -= commandTick;
            root.BattleCommanderAI.update(
              sim,
              root.__scenario__ || sim.scene?.metadata?.battleScenario || null,
              commandTick
            );
          }
          if (sim.time + 1e-9 >= nextSnapshot) {
            snapshots.push({ state: slimState(), profile: profiler ? profiler.snapshot(40) : null });
            stepBoundaries.push({ simTime: +(+sim.time || 0).toFixed(2), perfNowMs: performance.now() });
            nextSnapshot += snapshotSeconds;
          }
        }
        if (!sim.winner && sim._checkWinner) sim._checkWinner();
        stepBoundaries.push({ simTime: +(+sim.time || 0).toFixed(2), perfNowMs: performance.now() });
        const finalState = slimState(),
          profile = profiler ? profiler.snapshot(80) : null,
          wallSeconds = (performance.now() - wallStart) / 1000;
        return {
          build: root.BATTLE_BUILD || null,
          policyRevision: suppliedPolicy?.revision || root.BattleAIPolicy.revision || 0,
          simulatedSeconds: +(+sim.time || 0).toFixed(2),
          steps,
          wallSeconds: +wallSeconds.toFixed(3),
          realtimeMultiplier: wallSeconds > 0 ? +((+sim.time || 0) / wallSeconds).toFixed(2) : 0,
          finalState,
          profile,
          snapshots,
          stepBoundaries
        };
      },
      { fixedDt, simSeconds, snapshotSeconds, suppliedPolicy: policy, useWrappers }
    );
  } finally {
    // Keep the raw trace even if the battle evaluation throws.
    try {
      const { profile } = await cpuSession.send('Profiler.stop');
      cpuProfile = profile;
      fs.writeFileSync(path.join(outputDir, 'battle-hotpath-profile.cpuprofile'), JSON.stringify(profile));
      cpuSummary = summarizeCPUProfile(profile);
      fs.writeFileSync(
        path.join(outputDir, 'battle-hotpath-cpu-summary.json'),
        JSON.stringify(cpuSummary, null, 2) + '\n'
      );
      if (useHeapSampling) {
        try {
          const { profile: heap } = await cpuSession.send('HeapProfiler.stopSampling');
          heapProfile = heap;
          fs.writeFileSync(
            path.join(outputDir, 'battle-hotpath-heap-profile.json'),
            JSON.stringify(heap)
          );
        } catch (error) {
          browserWarnings.push(`Heap sampling stop failed: ${error?.message || error}`);
        }
      }
    } finally {
      await cpuSession.detach();
    }
  }

  // Post-process the raw CPU profile: top call chains, flamegraph, and
  // per-interval splits. Intervals are the snapshot boundaries (every
  // snapshotSeconds of simulated time); each sample is attributed to the
  // interval containing its timestamp, converted from the page clock to
  // microseconds since sampling started.
  let chains = { sampledUs: 0, chains: [] };
  let intervals = [];
  if (cpuProfile) {
    chains = topChains(cpuProfile, 25);
    fs.writeFileSync(
      path.join(outputDir, 'battle-hotpath-cpu-chains.json'),
      JSON.stringify(chains, null, 2) + '\n'
    );
    fs.writeFileSync(
      path.join(outputDir, 'battle-hotpath-flamegraph.svg'),
      renderFlamegraph(
        flameTree(cpuProfile),
        `Grasstex battle CPU flamegraph · ${battleType} · seed ${seed} · ${commit}`
      ) + '\n'
    );
    const boundaries = (result?.stepBoundaries || []).map(b => ({
      atUs: Math.max(0, (b.perfNowMs - profileStartPerfNowMs) * 1000),
      label: `sim-${String(b.simTime).replace('.', 'p')}s`
    }));
    if (boundaries.length >= 2) {
      const intervalsDir = path.join(outputDir, 'intervals');
      fs.mkdirSync(intervalsDir, { recursive: true });
      intervals = splitByIntervals(cpuProfile, boundaries).map(({ label, profile, samples }) => {
        fs.writeFileSync(path.join(intervalsDir, `${label}.cpuprofile`), JSON.stringify(profile));
        const summary = summarizeCPUProfile(profile);
        fs.writeFileSync(
          path.join(intervalsDir, `${label}-cpu-summary.json`),
          JSON.stringify(summary, null, 2) + '\n'
        );
        return { label, samples, sampledUs: summary.sampledUs, topFunction: summary.functions[0] || null };
      });
      fs.writeFileSync(
        path.join(outputDir, 'battle-hotpath-step-boundaries.json'),
        JSON.stringify({ anchorPerfNowMs: profileStartPerfNowMs, boundaries: result.stepBoundaries }, null, 2) + '\n'
      );
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    commit,
    build: result.build,
    battleType,
    seed,
    url,
    fixedDt,
    requestedSimSeconds: simSeconds,
    snapshotSeconds,
    policy: { source: policy.source, revision: result.policyRevision, warning: policy.warning || null },
    wallSeconds: result.wallSeconds,
    simulatedSeconds: result.simulatedSeconds,
    realtimeMultiplier: result.realtimeMultiplier,
    steps: result.steps,
    finalState: result.finalState,
    profile: result.profile,
    snapshots: result.snapshots,
    cpu: {
      ...cpuSummary,
      functions: cpuSummary.functions.slice(0, 40),
      rawFile: 'battle-hotpath-profile.cpuprofile',
      chainsFile: 'battle-hotpath-cpu-chains.json',
      flamegraphFile: 'battle-hotpath-flamegraph.svg'
    },
    chains: { sampledUs: chains.sampledUs, chains: chains.chains.slice(0, 10) },
    intervals,
    instrumentation: {
      wrappersEnabled: useWrappers,
      heapSampling: useHeapSampling,
      note: useWrappers
        ? 'Inclusive wall-time wrappers were active; their own clock/helper cost appears in the sampled profile (see `clock` self time). Wall seconds are instrumented, not uninstrumented benchmark wall-clock.'
        : 'Inclusive wall-time wrappers were OFF (BATTLE_PROFILE_WRAPPERS=0); wall seconds are the uninstrumented reference. Route/navigation counters are unavailable in this mode.'
    },
    browserErrors,
    browserWarnings,
    harnessWallSeconds: +((Date.now() - startedWall) / 1000).toFixed(2)
  };
  fs.writeFileSync(
    path.join(outputDir, 'battle-hotpath-profile.json'),
    JSON.stringify(report, null, 2) + '\n'
  );

  const top = (result.profile?.rows || []).slice(0, 25);
  const route = result.profile?.routePlanning;
  const nav = result.profile?.navigationPlanning;
  const md = [
    '# Battle Sim hot-path profile',
    '',
    `- Commit: \`${commit}\``,
    `- Build: \`${result.build || 'unknown'}\``,
    `- Scenario: **${battleType}** · seed \`${seed}\``,
    `- Simulated: **${result.simulatedSeconds}s** in **${result.wallSeconds}s wall** (${result.realtimeMultiplier}× real-time)`,
    `- Fixed step: **${fixedDt}s** · snapshots every **${snapshotSeconds}s simulated**`,
    `- Policy: ${policy.source}, revision ${result.policyRevision}${policy.warning ? ` · ${policy.warning}` : ''}`,
    `- Instrumentation: inclusive wrappers ${useWrappers ? '**on**' : '**OFF (uninstrumented wall-clock reference)'}; heap sampling ${useHeapSampling ? '**on**' : 'off'}.`,
    '',
    '## Top sampled call chains (CDP, self + inclusive by stack)',
    '',
    '| Rank | Chain (root → leaf) | Samples | Sampled µs | % |',
    '|---:|---|---:|---:|---:|',
    ...chains.chains.slice(0, 10).map(
      (c, i) =>
        `| ${i + 1} | ${c.frames.join(' → ').replaceAll('|', '\\|')} | ${c.samples} | ${c.us} | ${c.percent}% |`
    ),
    '',
    '> Chains aggregate full stacks: a sample counts once per chain, so chain percentages do not double-count nested frames. Full list: `battle-hotpath-cpu-chains.json`. Flamegraph: `battle-hotpath-flamegraph.svg` (open in a browser; the raw `.cpuprofile` also loads in Chrome DevTools / Speedscope).',
    '',
    ...(intervals.length
      ? [
          '## Sampled CPU by simulation interval',
          '',
          '| Interval | Samples | Sampled µs | Top function (self µs) |',
          '|---|---:|---:|---|',
          ...intervals.map(
            i =>
              `| ${i.label} | ${i.samples} | ${i.sampledUs} | ${i.topFunction ? `${i.topFunction.functionName} (${i.topFunction.selfUs})` : '—'} |`
          ),
          '',
          '> Intervals split the single CDP session by sample timestamp against the step boundaries the driver recorded. Per-interval `.cpuprofile` files live under `intervals/`.',
          ''
        ]
      : []),
    ...(heapProfile
      ? [
          '## Allocation sampling (CDP HeapProfiler, opt-in)',
          '',
          '- Raw heap allocation profile: `battle-hotpath-heap-profile.json`. Summarize allocating functions from its `nodes[].callFrame` + `selfSize` before drawing allocation conclusions; sampling interval 512 KiB.',
          ''
        ]
      : []),
    '## Physical waypoint lifecycle (profiler-only)',
    '',
    `- Waypoint calls: ${nav?.requests || 0}; physical path rebuilds: ${nav?.physicalReplans || 0}; reuses: ${nav?.physicalReuses || 0}.`,
    `- Requests already within 0.35m of physical goal: ${nav?.nearGoalRequests || 0}; physical reuses at goal: ${nav?.nearGoalPhysicalReuses || 0}; replans at goal: ${nav?.nearGoalPhysicalReplans || 0}.`,
    `- Requests from soldiers reported stopped on previous movement step: ${nav?.stoppedRequests || 0}; physical reuses while stopped: ${nav?.stoppedPhysicalReuses || 0}.`,
    `- At-goal path states: ${JSON.stringify(nav?.nearGoalRouteStates || {})}.`,
    `- At-goal legalized stand status: ${JSON.stringify(nav?.nearGoalStandStates || {})}.`,
    `- At-goal route invalidation state: ${JSON.stringify(nav?.nearGoalGoalStates || {})}.`,
    `- Existing populated queues: ${nav?.reuseWithPoints || 0}; same next waypoint: ${nav?.reusedSameWaypoint || 0}; next waypoint advanced in place: ${nav?.reusedAdvancedWaypoint || 0}; tail extended: ${nav?.reusedQueueExtended || 0}.`,
    `- Version/goal-stable populated plans entering segment clearance check: ${nav?.priorSegmentClearanceChecks || 0}; physical reuse calls while dynamic footprints were present: ${nav?.reuseWithMovingFootprints || 0}.`,
    '',
    '| Physical full-replan cause | Count |',
    '|---|---:|',
    ...Object.entries(nav?.replanReasons || {})
      .sort((a, b) => b[1] - a[1])
      .map(([reason, count]) => `| ${reason} | ${count} |`),
    '',
    '| Replan movement owner / kind | Count |',
    '|---|---:|',
    ...Object.entries(nav?.replanByOwnerKind || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([owner, count]) => `| ${owner} | ${count} |`),
    '',
    '> Clearance-count is inferred from a version/goal-stable populated plan entering needsReplan; this diagnostic does not intercept the private clearance function. Reuse calls may also consume waypoints or refill the queue. Dynamic footprint counts indicate presence during reuse, not how many affected the route.',
    '',
    '## Route-planning diagnostic (profiler-only)',
    '',
    `- Calls: ${route?.calls || 0}; fresh searches: ${route?.fresh || 0}; retained: ${route?.retained || 0}; cached failures: ${route?.negativeCache || 0}; failed fresh: ${route?.failedFresh || 0}.`,
    `- Retained checkpoints rejected before a fresh search: ${route?.retainedRejected || 0}.`,
    `- Native requests inside contact-route.pick: ${route?.totals?.candidateQueries || 0} cover queries (${route?.totals?.candidatesReturned || 0} returned slots), ${route?.totals?.sightQueries || 0} line-of-sight calls, ${route?.totals?.movementQueries || 0} movement-clear calls.`,
    `- Fresh graph totals: ${route?.totals?.graphNodes || 0} candidate nodes, ${route?.totals?.edgeQueries || 0} evaluated edges, ${route?.totals?.detourQueries || 0} detour requests.`,
    '',
    '| Reason for fresh search vs this soldier’s preceding observed request | Count |',
    '|---|---:|',
    ...Object.entries(route?.freshReasons || {})
      .sort((a, b) => b[1] - a[1])
      .map(([reason, count]) => `| ${reason} | ${count} |`),
    '',
    '### Fresh search outcomes and rejected edges',
    '',
    `- Failed search terminal reasons: ${JSON.stringify(route?.failedFinalReasons || {})}.`,
    `- Fresh search terminal states: ${JSON.stringify(route?.freshTerminals || {})}.`,
    '| Native graph rejection code | Rejected edges |',
    '|---|---:|',
    ...Object.entries(route?.edgeRejections || {})
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([reason, count]) => `| ${reason} | ${count} |`),
    '',
    '> Edge rejection counts are evaluations, not distinct failed plans; they can exceed the number of requests.',
    '',
    '> Reasons are exclusive differences between successive observed requests, not proof of tactical invalidation. “same-observed-inputs” means the recorded inputs matched; live occupancy and visibility can still change. Native counts include checks during retained-route validation. Both timing and counters are affected by profiler instrumentation.',
    '',
    '## Inclusive hot paths',
    '',
    '| Rank | Path | Calls | Inclusive ms | Wall % | Avg µs | Max ms |',
    '|---:|---|---:|---:|---:|---:|---:|',
    ...top.map(
      (r, i) =>
        `| ${i + 1} | ${r.label} | ${r.calls} | ${r.totalMs} | ${r.wallPct}% | ${r.avgUs} | ${r.maxMs} |`
    ),
    '',
    '> Times are inclusive. Nested rows can overlap, so percentages are diagnostic and do not sum to 100%.',
    '',
    '## Sampled JavaScript stacks',
    '',
    `- Raw Chrome DevTools trace: \`battle-hotpath-profile.cpuprofile\` (1 ms requested sampling interval).`,
    `- Scope: ${cpuSummary.scope}. Samples: ${cpuSummary.samples}; untimed: ${cpuSummary.untimedSamples}; unattributed: ${cpuSummary.unattributedUs} µs.`,
    '- Sample-weighted wall time is approximate attribution, not exact CPU cycles or uninstrumented benchmark acceptance.',
    '',
    '| Function | Source | Self samples | Self µs | Self % | Inclusive µs |',
    '|---|---|---:|---:|---:|---:|',
    ...cpuSummary.functions
      .slice(0, 30)
      .map(
        r =>
          `| ${r.functionName.replaceAll('|', '\\|')} | ${r.url.replaceAll('|', '\\|')}${r.line == null ? '' : ':' + r.line} | ${r.selfSamples} | ${r.selfUs} | ${r.selfPercent}% | ${r.inclusiveUs} |`
      ),
    ''
  ];
  fs.writeFileSync(path.join(outputDir, 'battle-hotpath-profile.md'), md.join('\n'));
  console.log(
    `PROFILE_SUMMARY ${JSON.stringify({ seed, battleType, wallSeconds: result.wallSeconds, simulatedSeconds: result.simulatedSeconds, realtimeMultiplier: result.realtimeMultiplier, top: top.slice(0, 12) })}`
  );
  console.log('PROFILE_ROUTE_PLANNING ' + JSON.stringify(route));
  console.log('PROFILE_NAVIGATION ' + JSON.stringify(nav));
  console.log(md.join('\n'));
} finally {
  await browser.close();
}
