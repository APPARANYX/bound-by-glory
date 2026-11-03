#!/usr/bin/env node
'use strict';
// Profile the deployed Grasstex 120 m skills-range lab (or a local lab URL)
// with V8 CPU sampling (CDP Profiler) plus the inclusive wall-time wrapper
// profiler. Drives the REAL lab through its canonical fixed-step clock
// (BattleSkillsLab.advance), changing no orders, stance, velocity, clip or
// animation clock.
//
//   SKILLS_LAB_URL        base page URL (default: localhost reverse proxy to
//                         the deployed preview; see SKILLS_LAB_PROXY)
//   SKILLS_LAB_PROXY=1    start the localhost reverse proxy to
//                         SKILLS_LAB_UPSTREAM (default
//                         https://test.ivandpopov.com). Needed because
//                         Chromium in this sandbox cannot reach external
//                         hosts directly; Node fetch can.
//   SKILLS_LAB_CONTROLLER new | legacy (default new)
//   SKILLS_LAB_MOVE       autonomous | purposeful | baseline (default autonomous)
//   SKILLS_LAB_DISTANCE   35 | 70 | 120 | 180 (default 120)
//   SKILLS_LAB_COVER      open | mixed | staggered | dense | hedgerow | original
//   SKILLS_LAB_SEED       (default skills-range-0001)
//   SKILLS_LAB_SECONDS    30..900 (default 210)
//   SKILLS_LAB_PINSEED    (default 1)
//   SKILLS_LAB_WRAPPERS=0 run CDP sampling only (uninstrumented wall-clock)
//   SKILLS_LAB_HEAP=1     also capture CDP HeapProfiler allocation sampling
//   SKILLS_LAB_OUTPUT     output dir (default
//                         reports/profile-skills-lab-<controller>)
//   SKILLS_LAB_BABYLON_LOCAL=/path/to/babylon.js  serve a local Babylon
//                         instead of fetching the CDN (offline Chromium)
//
// Artifacts mirror scripts/profile_battle_hotpaths.mjs: raw .cpuprofile,
// cpu summary, top call chains, SVG flamegraph, per-interval splits,
// step boundaries, report JSON + markdown. Run once per controller and
// compare the two reports; only the controller flag changes.

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import summarizeCPUProfile from './lib/cpu-profile-summary.cjs';
import cpuChains from './lib/cpu-profile-chains.cjs';
import { renderFlamegraph } from './lib/cpu-flamegraph.cjs';
import { startPreviewProxy } from './lib/preview-proxy.cjs';

const { topChains, flameTree, splitByIntervals } = cpuChains;

const UPSTREAM = process.env.SKILLS_LAB_UPSTREAM || 'https://test.ivandpopov.com';
const PROXY_PORT = Number(process.env.SKILLS_LAB_PROXY_PORT || 8766);
const useProxy = process.env.SKILLS_LAB_PROXY === '1';
const BASE =
  process.env.SKILLS_LAB_URL ||
  (useProxy
    ? `http://127.0.0.1:${PROXY_PORT}/grasstex/preview/meso-playable-preview-20261103/battle_sim.php`
    : `${UPSTREAM}/grasstex/preview/meso-playable-preview-20261103/battle_sim.php`);
const controller = String(process.env.SKILLS_LAB_CONTROLLER || 'new');
const move = String(process.env.SKILLS_LAB_MOVE || 'autonomous');
const distance = String(process.env.SKILLS_LAB_DISTANCE || '120');
const cover = String(process.env.SKILLS_LAB_COVER || 'mixed');
const seed = String(process.env.SKILLS_LAB_SEED || 'skills-range-0001');
const seconds = Math.max(30, Math.min(900, Number(process.env.SKILLS_LAB_SECONDS || 210) || 210));
const pinSeed = String(process.env.SKILLS_LAB_PINSEED || '1');
const useWrappers = process.env.SKILLS_LAB_WRAPPERS !== '0';
const useHeapSampling = process.env.SKILLS_LAB_HEAP === '1';
const outputDir = path.resolve(
  process.env.SKILLS_LAB_OUTPUT || `reports/profile-skills-lab-${controller}`
);
const commit = process.env.BATTLE_BENCHMARK_SOURCE_SHA || process.env.GITHUB_SHA || 'local';
const babylonLocalPath = process.env.SKILLS_LAB_BABYLON_LOCAL || '';
let babylonJs = null;
if (babylonLocalPath) babylonJs = fs.readFileSync(path.resolve(babylonLocalPath));
fs.mkdirSync(outputDir, { recursive: true });

const params = new URLSearchParams({
  skillsLab: '1',
  combatLab: '1',
  seed,
  labDistance: distance,
  labCover: cover,
  labRange: '1',
  labMove: move,
  labDuration: String(seconds),
  tacticalController: controller,
  strategicInterception: '0',
  pinSeed
});
const url = BASE + (BASE.includes('?') ? '&' : '?') + params;

let proxy = null;
if (useProxy) proxy = await startPreviewProxy({ port: PROXY_PORT, upstream: UPSTREAM });
const browserErrors = [],
  browserWarnings = [];
const startedWall = Date.now();
const browser = await chromium.launch({
  headless: true,
  args: ['--disable-dev-shm-usage', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist', '--no-sandbox']
});

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  page.setDefaultTimeout(150_000);
  page.on('pageerror', error => browserErrors.push(String(error?.stack || error)));
  page.on('console', msg => {
    const text = msg.text();
    if (msg.type() === 'error') browserErrors.push(text);
    else if (msg.type() === 'warning') browserWarnings.push(text);
  });
  await page.route('**/*', async route => {
    const reqUrl = route.request().url();
    // Chromium cannot fetch the jsdelivr CDN here (egress proxy rejects its
    // tunnel); fulfil every CDN script via Node fetch, which reaches it.
    // A supplied local Babylon file takes precedence for that one script.
    if (/^https:\/\/cdn\.jsdelivr\.net\//.test(reqUrl)) {
      try {
        const isBabylon = /\/npm\/babylonjs@[^/]+\/babylon\.js/.test(reqUrl);
        const body =
          isBabylon && babylonJs
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

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 150_000 });
  await page.waitForFunction(
    () => {
      const b = window.__battle__,
        l = window.BattleSkillsLab;
      return !!(b && l && l.snapshot() && l.snapshot().targetCount === 10);
    },
    null,
    { timeout: 150_000 }
  );

  // Record exactly what is deployed before driving anything.
  const identity = await page.evaluate(() => {
    const lab = window.BattleSkillsLab.snapshot();
    const b = window.__battle__;
    return {
      build: window.BATTLE_BUILD || null,
      preview: window.BATTLE_PREVIEW || null,
      policyRevision: window.BattleAIPolicy?.revision || 0,
      lab: {
        controller: lab.controller,
        movementPace: lab.movementPace,
        rangeDistanceM: lab.rangeDistanceM,
        coverLayout: lab.coverLayout,
        seed: lab.seed,
        targetCount: lab.targetCount
      },
      roster: { us: (b._roster?.us || []).length, ge: (b._roster?.ge || []).length },
      timeLimit: b.timeLimit
    };
  });
  if (identity.lab.controller !== controller) {
    throw new Error(`Lab controller is ${identity.lab.controller}, expected ${controller}`);
  }

  if (useWrappers) {
    await page.addScriptTag({ path: path.resolve('scripts/battle-hotpath-profiler.cjs') });
  }

  // Telemetry is observability, not gameplay: stub it so no telemetry POSTs
  // pollute the profile or hit the network mid-run.
  await page.evaluate(() => {
    const telemetry = window.BattleTelemetry;
    if (!telemetry) return;
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
  });

  const profileStartPerfNowMs = await page.evaluate(() => performance.now());
  // Stop the Babylon render loop before sampling: with SwiftShader the
  // software renderer otherwise dominates the profile as unattributed
  // `(program)` time (68% in the first smoke run) and it is presentation,
  // not simulation. The sim steps through the fixed clock, not the render
  // loop, so this changes no gameplay. Same treatment as the 600 s runner,
  // which stops the render loop before stepping. The lab's 250 ms HUD
  // interval (DOM text updates) keeps running and is negligible.
  await page.evaluate(() => {
    const sim = window.__battle__;
    const engine = sim?.scene?.getEngine?.();
    const renderLoop = window.__battleRenderLoop__;
    if (engine && renderLoop) engine.stopRenderLoop(renderLoop);
  });
  const cpuSession = await page.context().newCDPSession(page);
  await cpuSession.send('Profiler.enable');
  await cpuSession.send('Profiler.setSamplingInterval', { interval: 1000 });
  if (useHeapSampling) {
    await cpuSession.send('HeapProfiler.enable');
    await cpuSession.send('HeapProfiler.startSampling', { samplingInterval: 512 * 1024 });
  }
  await cpuSession.send('Profiler.start');

  let cpuProfile, cpuSummary, heapProfile;
  let drive;
  try {
    // Reset the wrapper profiler after load so its counters cover only the
    // driven lab run, and capture the start boundary.
    await page.evaluate(useWrappers => {
      const p = window.BattleHotpathProfiler;
      if (useWrappers && p) p.reset();
    }, useWrappers);
    const wallStartMs = await page.evaluate(() => performance.now());
    const stepBoundaries = [{ simTime: 0, perfNowMs: wallStartMs }];
    const snapshotSeconds = 30;
    let nextBoundary = snapshotSeconds;
    let batches = 0,
      lastTime = 0;
    const wallStart = Date.now();
    while (true) {
      const r = await page.evaluate(steps => {
        const b = window.__battle__,
          lab = window.BattleSkillsLab;
        const before = b.time;
        lab.advance(steps);
        const snap = lab.snapshot();
        return {
          time: +b.time.toFixed(2),
          advanced: +(b.time - before).toFixed(3),
          winner: b.winner || null,
          capReached: snap.durationCapReached === true,
          usAlive: +(b.factions?.us?.alive || 0),
          geAlive: +(b.factions?.ge?.alive || 0)
        };
      }, 60);
      batches++;
      lastTime = r.time;
      if (r.time + 1e-9 >= nextBoundary || r.capReached || r.winner) {
        stepBoundaries.push({ simTime: r.time, perfNowMs: await page.evaluate(() => performance.now()) });
        nextBoundary += snapshotSeconds;
      }
      if (r.advanced < 0.05) throw new Error(`Lab stopped advancing at t=${r.time}s (advanced ${r.advanced}s in 60 steps)`);
      if (r.winner || r.capReached || r.time >= seconds) break;
      if (batches > Math.ceil(seconds / 0.15 / 60) + 5) throw new Error(`Lab did not finish in ${batches} batches (t=${r.time}s)`);
    }
    const wallSeconds = (Date.now() - wallStart) / 1000;
    const finalProfile = await page.evaluate(useWrappers => {
      const p = window.BattleHotpathProfiler;
      const b = window.__battle__;
      return {
        profile: useWrappers && p ? p.snapshot(80) : null,
        finalState: {
          simTime: +(+b.time || 0).toFixed(2),
          winner: b.winner || null,
          usAlive: +(b.factions?.us?.alive || 0),
          geAlive: +(b.factions?.ge?.alive || 0)
        }
      };
    }, useWrappers);
    drive = {
      batches,
      steps: Math.round(lastTime / 0.15),
      simulatedSeconds: lastTime,
      wallSeconds: +wallSeconds.toFixed(3),
      realtimeMultiplier: wallSeconds > 0 ? +(lastTime / wallSeconds).toFixed(2) : 0,
      finalState: finalProfile.finalState,
      profile: finalProfile.profile,
      stepBoundaries
    };
  } finally {
    try {
      const { profile } = await cpuSession.send('Profiler.stop');
      cpuProfile = profile;
      fs.writeFileSync(path.join(outputDir, 'skills-lab-profile.cpuprofile'), JSON.stringify(profile));
      cpuSummary = summarizeCPUProfile(profile);
      fs.writeFileSync(
        path.join(outputDir, 'skills-lab-cpu-summary.json'),
        JSON.stringify(cpuSummary, null, 2) + '\n'
      );
      if (useHeapSampling) {
        try {
          const { profile: heap } = await cpuSession.send('HeapProfiler.stopSampling');
          heapProfile = heap;
          fs.writeFileSync(path.join(outputDir, 'skills-lab-heap-profile.json'), JSON.stringify(heap));
        } catch (error) {
          browserWarnings.push(`Heap sampling stop failed: ${error?.message || error}`);
        }
      }
    } finally {
      await cpuSession.detach();
    }
  }

  let chains = { sampledUs: 0, chains: [] };
  let intervals = [];
  if (cpuProfile) {
    chains = topChains(cpuProfile, 25);
    fs.writeFileSync(path.join(outputDir, 'skills-lab-cpu-chains.json'), JSON.stringify(chains, null, 2) + '\n');
    fs.writeFileSync(
      path.join(outputDir, 'skills-lab-flamegraph.svg'),
      renderFlamegraph(
        flameTree(cpuProfile),
        `Grasstex 120m skills lab CPU flamegraph · controller=${controller} · move=${move} · seed ${seed}`
      ) + '\n'
    );
    const boundaries = (drive?.stepBoundaries || []).map(b => ({
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
        path.join(outputDir, 'skills-lab-step-boundaries.json'),
        JSON.stringify({ anchorPerfNowMs: profileStartPerfNowMs, boundaries: drive.stepBoundaries }, null, 2) + '\n'
      );
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    commit,
    url,
    upstream: UPSTREAM,
    viaProxy: useProxy,
    identity,
    config: { controller, move, distance, cover, seed, seconds, pinSeed },
    wallSeconds: drive.wallSeconds,
    simulatedSeconds: drive.simulatedSeconds,
    realtimeMultiplier: drive.realtimeMultiplier,
    steps: drive.steps,
    batches: drive.batches,
    finalState: drive.finalState,
    profile: drive.profile,
    chains: { sampledUs: chains.sampledUs, chains: chains.chains.slice(0, 10) },
    intervals,
    cpu: {
      ...cpuSummary,
      functions: cpuSummary.functions.slice(0, 40),
      rawFile: 'skills-lab-profile.cpuprofile',
      chainsFile: 'skills-lab-cpu-chains.json',
      flamegraphFile: 'skills-lab-flamegraph.svg'
    },
    instrumentation: {
      wrappersEnabled: useWrappers,
      heapSampling: useHeapSampling,
      renderLoopStopped: true,
      note: useWrappers
        ? 'Babylon render loop stopped before sampling (presentation, not simulation; same as the 600 s runner). Inclusive wall-time wrappers were active; their own clock/helper cost appears in the sampled profile. Wall seconds are instrumented.'
        : 'Babylon render loop stopped before sampling (presentation, not simulation; same as the 600 s runner). Inclusive wall-time wrappers were OFF; wall seconds are the uninstrumented reference. Route/navigation counters are unavailable in this mode.'
    },
    browserErrors,
    browserWarnings,
    harnessWallSeconds: +((Date.now() - startedWall) / 1000).toFixed(2)
  };
  fs.writeFileSync(path.join(outputDir, 'skills-lab-profile.json'), JSON.stringify(report, null, 2) + '\n');

  const top = (drive.profile?.rows || []).slice(0, 25);
  const nav = drive.profile?.navigationPlanning;
  const route = drive.profile?.routePlanning;
  const md = [
    '# 120 m skills-lab CPU profile',
    '',
    `- Preview: \`${url}\``,
    `- Build: \`${identity.build || 'unknown'}\` (preview ref \`${identity.preview?.ref || '?'}\`, sha \`${identity.preview?.sha || '?'}\`, deployed \`${identity.preview?.deployedAt || '?'}\`)`,
    `- Controller: **${controller}** · movement: **${move}** · distance: **${distance} m** · cover: **${cover}** · seed \`${seed}\` · pinSeed ${pinSeed}`,
    `- Roster: US ${identity.roster.us} / GE ${identity.roster.ge} · policy revision ${identity.policyRevision}`,
    `- Simulated: **${drive.simulatedSeconds}s** in **${drive.wallSeconds}s wall** (${drive.realtimeMultiplier}× real-time) · ${drive.steps} steps of 0.15 s`,
    `- Instrumentation: inclusive wrappers ${useWrappers ? '**on**' : '**OFF (uninstrumented wall-clock reference)'}; heap sampling ${useHeapSampling ? '**on**' : 'off'}.`,
    '',
    '## Top sampled call chains (CDP, full stacks)',
    '',
    '| Rank | Chain (root → leaf) | Samples | Sampled µs | % |',
    '|---:|---|---:|---:|---:|',
    ...chains.chains.slice(0, 10).map(
      (c, i) =>
        `| ${i + 1} | ${c.frames.join(' → ').replaceAll('|', '\\|')} | ${c.samples} | ${c.us} | ${c.percent}% |`
    ),
    '',
    '> Chains aggregate full stacks: a sample counts once per chain. Full list: `skills-lab-cpu-chains.json`. Flamegraph: `skills-lab-flamegraph.svg` (raw `.cpuprofile` also loads in Chrome DevTools / Speedscope).',
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
          '> Intervals split the single CDP session by sample timestamp. Per-interval `.cpuprofile` files live under `intervals/`.',
          ''
        ]
      : []),
    '## Inclusive hot paths (wrapper profiler)',
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
    `- Raw Chrome DevTools trace: \`skills-lab-profile.cpuprofile\` (1 ms requested sampling interval).`,
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
  if (nav) {
    md.push(
      '',
      '## Physical waypoint lifecycle (profiler-only)',
      '',
      `- Waypoint calls: ${nav.requests || 0}; physical path rebuilds: ${nav.physicalReplans || 0}; reuses: ${nav.physicalReuses || 0}.`,
      `- Requests already within 0.35m of physical goal: ${nav.nearGoalRequests || 0}; physical reuses at goal: ${nav.nearGoalPhysicalReuses || 0}; replans at goal: ${nav.nearGoalPhysicalReplans || 0}.`
    );
  }
  if (route) {
    md.push(
      '',
      '## Route-planning diagnostic (profiler-only)',
      '',
      `- Calls: ${route.calls || 0}; fresh searches: ${route.fresh || 0}; retained: ${route.retained || 0}; cached failures: ${route.negativeCache || 0}; failed fresh: ${route.failedFresh || 0}.`
    );
  }
  fs.writeFileSync(path.join(outputDir, 'skills-lab-profile.md'), md.join('\n'));
  console.log(
    `SKILLS_LAB_PROFILE ${JSON.stringify({ controller, move, seed, wallSeconds: drive.wallSeconds, simulatedSeconds: drive.simulatedSeconds, realtimeMultiplier: drive.realtimeMultiplier, steps: drive.steps, build: identity.build })}`
  );
  console.log(md.join('\n'));
} finally {
  await browser.close();
  if (proxy) await proxy.close();
}
