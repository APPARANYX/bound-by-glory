/* Offline contract test for the opt-in, browser-only fixed-step CPU probe. */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../../battle/modules/97a-browser-cpu-probe.js'), 'utf8');

function fixture(search, opts = {}) {
  const queue = [];
  let elapsed = 0;
  function element(tag) {
    return {
      tagName: tag.toUpperCase(), style: {}, children: [], textContent: '', disabled: false,
      appendChild(child) { this.children.push(child); },
      addEventListener(name, callback) { this[name] = callback; },
      remove() {},
      click() {}
    };
  }
  const document = { body: element('body'), hidden: !!opts.hidden, createElement: element };
  const engine = {
    stopped: false, stopRenderLoop() { this.stopped = true; },
    runRenderLoop() { this.stopped = false; }
  };
  const sim = {
    time: 0, timeScale: 4, paused: true, winner: null,
    scene: { getEngine() { return engine; }, render() {} },
    setTimeScale(value) { this.timeScale = value; },
    resume() { this.paused = false; },
    pause() { this.paused = true; },
    step(delta) { this.time += delta; },
    _liveCommanderTick() {}
  };
  const originalStep = sim.step;
  sim._fixedClock = {
    advance(dt) {
      if (opts.brokenClock) return 0;
      if (sim.paused) return 0;
      sim.step(dt);
      sim._liveCommanderTick(dt);
      return 1;
    }
  };
  const window = {
    __battle__: sim,
    __scenario__: { seed: 'skills-range-0001' },
    BATTLE_REF: 'abcdef1234567890',
    BattleLoading: { timings() { return { finishedAt: 1 }; } },
    BattleModules: { runHook() {} },
    BattleNavigation: { findPath() { return []; } },
    BattleObstacleField: { sightBlocked() { return false; } },
    SquadAI: { updateSquad() {}, updateSoldier() {} }
  };
  const sandbox = {
    window, document, navigator: { userAgent: 'offline-check', hardwareConcurrency: 8 },
    location: { search, href: 'https://example.test/battle_sim.php' + search },
    performance: { now() { elapsed += 0.02; return elapsed; } },
    setTimeout(fn) { queue.push(fn); return queue.length; },
    URLSearchParams, URL, Blob,
    console
  };
  vm.runInNewContext(source, sandbox, { filename: '97a-browser-cpu-probe.js' });
  function drain() {
    for (let i = 0; queue.length && i < 5000; i++) queue.shift()();
    assert.ok(queue.length === 0, 'probe did not terminate');
  }
  return { window, sim, originalStep, engine, drain };
}

const disabled = fixture('?tacticalController=new');
assert.equal(disabled.window.BattleBrowserCpuProbe, undefined, 'probe must be completely inert without opt-in');
assert.equal(disabled.sim.step, disabled.originalStep);

const normal = fixture('?cpuBench=1&cpuSeconds=15&tacticalController=new');
normal.window.BattleBrowserCpuProbe.start();
normal.drain();
const report = normal.window.BattleBrowserCpuProbe.result();
assert.equal(report.kind, 'grasstex-browser-cpu-probe');
assert.equal(report.run.steps, 100);
assert.equal(report.run.simulatedSeconds, 15);
assert.equal(report.run.valid, true);
assert.equal(report.scenario.seed, 'skills-range-0001');
assert.equal(report.scenario.controller, 'new');
assert.ok(report.functions.some(row => row.name === 'BattleSim.step' && row.calls === 100));
assert.equal(normal.sim.step, normal.originalStep, 'timing wrapper must restore');
assert.equal(normal.sim.timeScale, 4, 'time scale must restore');
assert.equal(normal.sim.paused, true);
assert.equal(normal.engine.stopped, false, 'render loop must restore');

const fullMeeting = fixture('?cpuBench=1&tacticalController=new');
fullMeeting.window.BattleBrowserCpuProbe.start();
fullMeeting.drain();
const fullReport = fullMeeting.window.BattleBrowserCpuProbe.result();
assert.equal(fullReport.run.requestedSimSeconds, 600, 'default is the 600 s natural meeting');
assert.equal(fullReport.run.steps, 4000, 'full meeting advances 4,000 fixed steps');
assert.equal(fullReport.run.valid, true, 'full 600 s run must be valid');
assert.equal(fullReport.caveats.exactStepCount, true);
assert.equal(fullMeeting.sim.step, fullMeeting.originalStep);
assert.equal(fullMeeting.engine.stopped, false);

const lab = fixture('?cpuBench=1&cpuSeconds=210&tacticalController=new');
lab.window.BattleBrowserCpuProbe.start();
lab.drain();
assert.equal(lab.window.BattleBrowserCpuProbe.result().run.steps, 1400, 'optional 210 s lab profile');
assert.equal(lab.window.BattleBrowserCpuProbe.result().run.valid, true);

const hidden = fixture('?cpuBench=1&cpuSeconds=15', { hidden: true });
hidden.window.BattleBrowserCpuProbe.start();
hidden.drain();
assert.ok(hidden.window.BattleBrowserCpuProbe.result().device.hiddenSlices > 0);
assert.equal(hidden.window.BattleBrowserCpuProbe.result().run.valid, false);

const broken = fixture('?cpuBench=1&cpuSeconds=15', { brokenClock: true });
broken.window.BattleBrowserCpuProbe.start();
broken.drain();
assert.equal(broken.window.BattleBrowserCpuProbe.result().run.endReason, 'clock-error');
assert.equal(broken.window.BattleBrowserCpuProbe.result().run.valid, false);
assert.equal(broken.sim.step, broken.originalStep);
assert.equal(broken.engine.stopped, false);

const stopped = fixture('?cpuBench=1&cpuSeconds=15');
stopped.window.BattleBrowserCpuProbe.start();
stopped.window.BattleBrowserCpuProbe.stop();
stopped.drain();
assert.equal(stopped.window.BattleBrowserCpuProbe.result().run.endReason, 'user-stopped');
assert.equal(stopped.window.BattleBrowserCpuProbe.result().run.valid, false);
assert.equal(stopped.sim.step, stopped.originalStep);

console.log('browser-cpu-probe-check: opt-in, fixed-clock, export, invalidation and restoration passed');
