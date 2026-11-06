/* Uninstrumented wall time per simulated window, for finding what grows over a battle.
   One battle per process, stepped exactly as run_battle_benchmark.mjs steps it (0.15 s step plus
   the commander tick), with no diagnostics sampling. Prints wall ms per WALL_WINDOW simulated
   seconds and the living count, so two arms (legacy vs ?tacticalController=new) can be laid side
   by side. Optional WALL_PROFILE=1 injects battle-hotpath-profiler.cjs and dumps a cumulative
   profile at each window boundary (instrumented; use only for attribution, never for the ratio).
   Env: WALL_URL (page with flags), WALL_SEED, WALL_SECONDS (600), WALL_WINDOW (60), WALL_OUT,
   WALL_CPUPROF (below). */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const url =
  process.env.WALL_URL || 'http://127.0.0.1:8765/grasstex/battle_sim_local.php?strategicInterception=0';
const seed = process.env.WALL_SEED || 'controller-natural-20261026-0001';
const seconds = +(process.env.WALL_SECONDS || 600);
const windowS = +(process.env.WALL_WINDOW || 60);
const profile = process.env.WALL_PROFILE === '1';
const out = process.env.WALL_OUT || '';
/* WALL_CPUPROF=<second>: record a V8 sampling CPU profile from that simulated second to the end
   (written next to WALL_OUT as .cpuprofile, plus a self-time table by function). */
const cpuFrom = process.env.WALL_CPUPROF ? +process.env.WALL_CPUPROF : null;
/* WALL_HEAP=1: run one window at a time and, after each, force a full GC and record the JS heap in
   use and the window's SquadAI.hasLineOfSight calls (result.heap). For memory only: the forced GCs
   and the call counter cost wall time, so never read the wall ratio from such a run. */
const heap = process.env.WALL_HEAP === '1';

const browser = await chromium.launch({
  headless: true,
  args: ['--disable-dev-shm-usage', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist']
});
try {
  const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
  const errors = [];
  page.on('pageerror', e => errors.push(String(e?.stack || e)));
  await page.route('**/*', r =>
    ['media', 'font'].includes(r.request().resourceType()) ? r.abort() : r.continue()
  );
  await page.goto(`${url}${url.includes('?') ? '&' : '?'}seed=${encodeURIComponent(seed + '-bootstrap')}`, {
    waitUntil: 'domcontentloaded',
    timeout: 180000
  });
  await page.waitForFunction(
    () =>
      !!(
        window.__battle__ &&
        window.BattleCommanderAI &&
        window.BattleTownObjectives &&
        window.BattleAIPolicy
      ),
    null,
    { timeout: 180000 }
  );
  if (profile) await page.addScriptTag({ path: path.resolve('scripts/battle-hotpath-profiler.cjs') });
  await page.evaluate(
    async ({ seed, seconds, windowS, profile, heap }) => {
      const root = window,
        sim = root.__battle__,
        engine = sim.scene?.getEngine?.(),
        loop = root.__battleRenderLoop__;
      if (engine && loop) engine.stopRenderLoop(loop);
      sim.pause();
      const t = root.BattleTelemetry;
      if (t) {
        try {
          await t.end?.(sim, 'x');
        } catch (_) {}
        for (const k of ['record', 'start', 'ensure']) t[k] = function () {};
        for (const k of ['end', 'checkpoint', 'flush'])
          t[k] = async function () {
            return true;
          };
        t.setConsoleLogging?.(false);
      }
      const baseline = root.BattleAIPolicy.get();
      const rawRestart = sim._controlRawRestart || sim.restart.bind(sim);
      const scenario = root.BattleTownObjectives.regenerate(
        sim.scene,
        sim.heightAt,
        seed,
        { benchmark: true, benchmarkIndex: 0 },
        sim
      );
      root.BattleAIPolicy.setMatchPolicies(sim, baseline, baseline);
      sim.trainingMode = true;
      root.BattleSoldierModel?.setImportedEnabled?.(sim.scene, false);
      rawRestart();
      sim.manualEnded = false;
      sim.winner = null;
      sim.winReason = null;
      sim.paused = false;
      sim.timeScale = 1;
      sim.timeLimit = seconds;
      const prof = profile ? root.BattleHotpathProfiler : null;
      prof?.reset();
      const dt = 0.15,
        tick = +root.BattleCommanderAI.commandTick || 0.45;
      let acc = 0,
        steps = 0,
        next = windowS,
        wStart = performance.now(),
        cmdMs = 0,
        stepMs = 0;
      const rows = [],
        t0 = performance.now();
      const st = (root.__wallGrowth = { rows, t0, los: 0 });
      /* Wrapped before the battle starts, so stores keyed on the function see one identity. */
      const los = heap && root.SquadAI && root.SquadAI.hasLineOfSight;
      if (los)
        root.SquadAI.hasLineOfSight = function () {
          st.los++;
          return los.apply(this, arguments);
        };
      const alive = f => +(sim.factions?.[f]?.alive || 0);
      /* Activity per window: living and moving man-steps, and rounds fired, so wall time can be read
       per man and per unit of fighting, not only per battle. */
      const roster = () =>
        ['us', 'ge'].flatMap(f => (sim.factions?.[f]?.squads || []).flatMap(q => q.members || []));
      let manSteps = 0,
        movingSteps = 0,
        shots = 0;
      const priorFire = sim.onFire;
      sim.onFire = function () {
        shots++;
        return priorFire ? priorFire.apply(this, arguments) : undefined;
      };
      st.runTo = until => {
        while (!sim.winner && sim.time < Math.min(until, seconds + 0.5) && steps < 5000) {
          const a = performance.now();
          sim._trainerStepActive = true;
          try {
            sim.step ? sim.step(dt) : sim._frame(dt);
          } finally {
            sim._trainerStepActive = false;
          }
          const b = performance.now();
          stepMs += b - a;
          for (const m of roster())
            if (!m.dead) {
              manSteps++;
              if (m.moving) movingSteps++;
            }
          steps++;
          acc += dt;
          while (acc + 1e-9 >= tick && !sim.winner) {
            acc -= tick;
            root.BattleCommanderAI.update(sim, scenario, tick);
          }
          cmdMs += performance.now() - b;
          if (sim.time + 1e-9 >= next) {
            const now = performance.now();
            rows.push({
              t: +(+sim.time).toFixed(1),
              wallMs: Math.round(now - wStart),
              stepMs: Math.round(stepMs),
              cmdMs: Math.round(cmdMs),
              us: alive('us'),
              ge: alive('ge'),
              manSteps,
              movingSteps,
              shots,
              profile: prof ? prof.snapshot(0) : undefined
            });
            manSteps = 0;
            movingSteps = 0;
            shots = 0;
            wStart = now;
            stepMs = 0;
            cmdMs = 0;
            next += windowS;
          }
        }
        /* End-state hash (every man's id, position, hp and death): equal hashes on two arms are a quick
       local hint that a change is inert; the standard benchmark is still the proof. */
        const state = ['us', 'ge']
          .flatMap(f => (sim.factions?.[f]?.squads || []).flatMap(q => q.members || []))
          .map(s =>
            [
              s.id,
              s.faction,
              (+s.root.position.x).toFixed(4),
              (+s.root.position.z).toFixed(4),
              (+s.hp || 0).toFixed(3),
              !!s.dead
            ].join(':')
          )
          .join('|');
        let fingerprint = 0;
        for (let i = 0; i < state.length; i++) fingerprint = (fingerprint * 31 + state.charCodeAt(i)) | 0;
        return {
          seed,
          fingerprint,
          simulated: +(+sim.time).toFixed(1),
          winner: sim.winner || null,
          winReason: sim.winReason || null,
          totalMs: Math.round(performance.now() - t0),
          steps,
          rows,
          controller: root.BattleTacticalController?.enabled?.(sim) ?? null
        };
      };
    },
    { seed, seconds, windowS, profile, heap }
  );
  let result,
    cdp = null;
  if (cpuFrom != null) {
    await page.evaluate(t => window.__wallGrowth.runTo(t), cpuFrom);
    cdp = await page.context().newCDPSession(page);
    await cdp.send('Profiler.enable');
    await cdp.send('Profiler.setSamplingInterval', { interval: 500 });
    await cdp.send('Profiler.start');
  }
  const heapRows = [];
  if (heap) {
    const mem = await page.context().newCDPSession(page);
    for (let t = windowS; t <= seconds; t += windowS) {
      const done = await page.evaluate(t => window.__wallGrowth.runTo(t), t);
      await mem.send('HeapProfiler.collectGarbage');
      const { usedSize } = await mem.send('Runtime.getHeapUsage');
      const calls = await page.evaluate(() => {
        const n = window.__wallGrowth.los;
        window.__wallGrowth.los = 0;
        return n;
      });
      heapRows.push({ t: done.simulated, usedMB: +(usedSize / 1048576).toFixed(2), losCalls: calls });
      if (done.winner) break;
    }
  }
  result = await page.evaluate(t => window.__wallGrowth.runTo(t), seconds + 1);
  if (heap) result.heap = heapRows;
  if (cdp) {
    const { profile: cpu } = await cdp.send('Profiler.stop');
    const base = (out || 'wall-growth.json').replace(/\.json$/, '');
    fs.writeFileSync(base + '.cpuprofile', JSON.stringify(cpu));
    const self = new Map(),
      byId = new Map(cpu.nodes.map(n => [n.id, n]));
    const dts = cpu.timeDeltas;
    let total = 0;
    cpu.samples.forEach((id, i) => {
      const n = byId.get(id),
        f = n.callFrame,
        k = `${f.functionName || '(anon)'} ${String(f.url).replace(/^.*\//, '')}:${f.lineNumber + 1}`;
      const d = (dts[i] || 0) / 1000;
      total += d;
      self.set(k, (self.get(k) || 0) + d);
    });
    const rowsOut = [...self.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 80)
      .map(([k, ms]) => ({ fn: k, selfMs: Math.round(ms), pct: +((100 * ms) / total).toFixed(2) }));
    fs.writeFileSync(
      base + '.self.json',
      JSON.stringify({ totalMs: Math.round(total), rows: rowsOut }, null, 1)
    );
    console.log(`CPU profile ${cpuFrom}s..end, ${Math.round(total)} ms sampled; top self time:`);
    for (const r of rowsOut.slice(0, 40))
      console.log(`  ${String(r.selfMs).padStart(7)} ms ${String(r.pct).padStart(6)}%  ${r.fn}`);
  }
  result.url = url;
  result.errors = errors;
  if (out) fs.writeFileSync(out, JSON.stringify(result, null, 1));
  console.log(
    `${url.replace(/^.*\?/, '')} seed=${seed} sim=${result.simulated}s wall=${(result.totalMs / 1000).toFixed(1)}s winner=${result.winner} fingerprint=${result.fingerprint} errors=${errors.length}`
  );
  for (const r of result.rows)
    console.log(
      `  t=${r.t}\twall=${r.wallMs}\tstep=${r.stepMs}\tcmd=${r.cmdMs}\tus=${r.us}\tge=${r.ge}` +
        `\tmanSteps=${r.manSteps}\tmoving=${r.movingSteps}\tshots=${r.shots}` +
        `\tusPerManStep=${r.manSteps ? ((1000 * r.wallMs) / r.manSteps).toFixed(1) : '-'}`
    );
  for (const h of result.heap || [])
    console.log(`  heap t=${h.t}\tusedMB=${h.usedMB}\tlosCalls=${h.losCalls}`);
} finally {
  await browser.close();
}
