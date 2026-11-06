/* CDP CPU profile of one headless battle, plus a gameplay fingerprint (every soldier's final
   position/health and the battle counters) so two runs can be checked for identical play.
   Usage: PROFILE_URL=<battle_sim_local.php?flags> PROFILE_SEED=<seed> PROFILE_SECONDS=300 \
          PROFILE_OUT=<dir> node scripts/probes/profile_cdp_battle.mjs
   Writes <dir>/profile.cpuprofile, <dir>/summary.json (wall, fingerprint, top self-time functions). */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const url = process.env.PROFILE_URL || 'http://127.0.0.1:8765/grasstex/battle_sim_local.php';
const seed = process.env.PROFILE_SEED || 'controller-natural-20261026-0002';
const simSeconds = +(process.env.PROFILE_SECONDS || 300);
const fixedDt = +(process.env.PROFILE_STEP || 0.15);
const out = path.resolve(process.env.PROFILE_OUT || 'reports/cdp-profile');
const doProfile = process.env.PROFILE_CPU !== '0';
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({
  headless: true,
  args: ['--disable-dev-shm-usage', '--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist']
});
try {
  const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
  page.setDefaultTimeout(600_000);
  const errors = [];
  page.on('pageerror', e => errors.push(String(e?.stack || e)));
  await page.route('**/*', r =>
    ['media', 'font'].includes(r.request().resourceType()) ? r.abort() : r.continue()
  );
  await page.goto(`${url}${url.includes('?') ? '&' : '?'}seed=${encodeURIComponent(seed)}`, {
    waitUntil: 'domcontentloaded',
    timeout: 120_000
  });
  await page.waitForFunction(
    () => !!(window.__battle__ && window.BattleCommanderAI && window.BattleAIPolicy),
    null,
    { timeout: 120_000 }
  );
  await page.evaluate(async () => {
    const root = window,
      sim = root.__battle__,
      engine = sim.scene?.getEngine?.(),
      rl = root.__battleRenderLoop__;
    if (engine && rl) engine.stopRenderLoop(rl);
    sim.pause();
    const t = root.BattleTelemetry;
    if (t?.end) {
      try {
        await t.end(sim, 'profile-start');
      } catch (_) {}
    }
    if (t) {
      t.record = t.start = t.ensure = function () {};
      t.end = t.checkpoint = t.flush = async () => true;
    }
    const base = root.BattleAIPolicy.get();
    root.BattleAIPolicy.setMatchPolicies(sim, base, base);
    sim.trainingMode = true;
    root.BattleSoldierModel?.setImportedEnabled?.(sim.scene, false);
    (sim._controlRawRestart || sim.restart.bind(sim))();
  });
  const cdp = await page.context().newCDPSession(page);
  if (doProfile) {
    await cdp.send('Profiler.enable');
    await cdp.send('Profiler.setSamplingInterval', { interval: 500 });
    await cdp.send('Profiler.start');
  }
  const result = await page.evaluate(
    ({ simSeconds, fixedDt }) => {
      const root = window,
        sim = root.__battle__;
      sim.manualEnded = false;
      sim.winner = null;
      sim.paused = false;
      sim.timeScale = 1;
      sim.timeLimit = simSeconds;
      const tick = +root.BattleCommanderAI.commandTick || 0.45;
      let acc = 0,
        steps = 0;
      const t0 = performance.now();
      while (!sim.winner && sim.time < simSeconds + 0.5 && steps < Math.ceil((simSeconds + 2) / fixedDt)) {
        sim._trainerStepActive = true;
        try {
          sim.step ? sim.step(fixedDt) : sim._frame(fixedDt);
        } finally {
          sim._trainerStepActive = false;
        }
        steps++;
        acc += fixedDt;
        while (acc + 1e-9 >= tick && !sim.winner) {
          acc -= tick;
          root.BattleCommanderAI.update(
            sim,
            root.__scenario__ || sim.scene?.metadata?.battleScenario || null,
            tick
          );
        }
      }
      const wall = (performance.now() - t0) / 1000;
      const men = (sim.soldiers || []).map(s => [
        s.team,
        s.id ?? s.name,
        s.alive ? 1 : 0,
        +(s.hp ?? s.health ?? 0),
        s.root ? +s.root.position.x.toFixed(6) : 0,
        s.root ? +s.root.position.z.toFixed(6) : 0,
        s.shotsFired ?? s.shots ?? 0,
        s.kills ?? 0
      ]);
      const f = sim.factions || {};
      return {
        wall,
        steps,
        simTime: sim.time,
        winner: sim.winner || null,
        alive: { us: f.us?.alive, ge: f.ge?.alive },
        stats: sim.stats || null,
        men
      };
    },
    { simSeconds, fixedDt }
  );
  let top = [];
  if (doProfile) {
    const { profile } = await cdp.send('Profiler.stop');
    fs.writeFileSync(path.join(out, 'profile.cpuprofile'), JSON.stringify(profile));
    const dt = {};
    const ts = profile.timeDeltas;
    const byId = new Map(profile.nodes.map(n => [n.id, n]));
    for (let i = 0; i < profile.samples.length; i++)
      dt[profile.samples[i]] = (dt[profile.samples[i]] || 0) + (ts[i] || 0);
    const self = {};
    for (const [id, us] of Object.entries(dt)) {
      const n = byId.get(+id),
        cf = n.callFrame;
      const k = `${cf.functionName || '(anon)'} ${path.basename(cf.url || '')}:${cf.lineNumber + 1}`;
      self[k] = (self[k] || 0) + us;
    }
    const file = {};
    for (const [id, us] of Object.entries(dt)) {
      const cf = byId.get(+id).callFrame;
      const k = path.basename(cf.url || '') || '(native)';
      file[k] = (file[k] || 0) + us;
    }
    top = {
      functions: Object.entries(self)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 60)
        .map(([k, v]) => [k, +(v / 1e6).toFixed(3)]),
      files: Object.entries(file)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 40)
        .map(([k, v]) => [k, +(v / 1e6).toFixed(3)])
    };
  }
  const fingerprint = crypto
    .createHash('sha256')
    .update(JSON.stringify([result.simTime, result.winner, result.alive, result.stats, result.men]))
    .digest('hex')
    .slice(0, 16);
  const summary = {
    url,
    seed,
    simSeconds,
    wall: +result.wall.toFixed(2),
    steps: result.steps,
    simTime: result.simTime,
    winner: result.winner,
    alive: result.alive,
    fingerprint,
    errors: errors.slice(0, 5),
    top
  };
  fs.writeFileSync(path.join(out, 'summary.json'), JSON.stringify(summary, null, 1));
  console.log(
    JSON.stringify({
      wall: summary.wall,
      fingerprint,
      simTime: result.simTime,
      alive: result.alive,
      errors: errors.length
    })
  );
} finally {
  await browser.close();
}
