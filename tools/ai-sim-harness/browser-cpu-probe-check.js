/* Offline contract test for the opt-in, browser-only fixed-step CPU probe. */
'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../../battle/modules/97a-browser-cpu-probe.js'), 'utf8');
const querySource = fs.readFileSync(
  path.join(__dirname, '../../battle/modules/97b-browser-query-census.js'),
  'utf8'
);
require('node:child_process').execFileSync(process.execPath, [
  path.join(__dirname, '../../scripts/build-browser-query-census.cjs'),
  '--check'
]);

function fixture(search, opts = {}) {
  const queue = [];
  let elapsed = 0;
  function element(tag) {
    return {
      tagName: tag.toUpperCase(),
      style: {},
      children: [],
      textContent: '',
      disabled: false,
      appendChild(child) {
        this.children.push(child);
      },
      addEventListener(name, callback) {
        this[name] = callback;
      },
      remove() {},
      click() {}
    };
  }
  const document = { body: element('body'), hidden: !!opts.hidden, createElement: element };
  const engine = {
    stopped: false,
    stopRenderLoop() {
      this.stopped = true;
    },
    runRenderLoop() {
      this.stopped = false;
    }
  };
  const sim = {
    time: opts.initialTime || 0,
    timeScale: 4,
    paused: true,
    winner: null,
    scene: {
      getEngine() {
        return engine;
      },
      render() {}
    },
    setTimeScale(value) {
      this.timeScale = value;
    },
    resume() {
      this.paused = false;
    },
    pause() {
      this.paused = true;
    },
    step(delta) {
      this._frame(delta);
    },
    _frame(delta) {
      this.time += delta;
      if (opts.queryCalls) {
        window.BattleObstacleField.sightBlocked(this.obstacles, { x: 1, z: 2 }, { x: 3, z: 4 });
        window.BattleObstacleField.sightBlocked(this.obstacles, { x: 1, z: 2 }, { x: 3, z: 4 });
      }
    },
    _liveCommanderTick() {
      if (opts.queryCalls)
        window.BattleObstacleField.sightBlocked(this.obstacles, { x: 1, z: 2 }, { x: 3, z: 4 });
    },
    obstacles: []
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
    BattleLoading: {
      timings() {
        return { finishedAt: 1 };
      }
    },
    BattleModules: { runHook() {} },
    BattleNavigation: {
      findPath() {
        return [];
      }
    },
    BattleObstacleField: {
      nativeCalls: 0,
      sightBlocked() {
        this.nativeCalls++;
        if (opts.throwQuery) throw new Error('native-query-test-error');
        return false;
      }
    },
    SquadAI: { updateSquad() {}, updateSoldier() {} }
  };
  Object.defineProperty(window.BattleNavigation, 'version', {
    get() {
      throw new Error('diagnostic invoked a navigation context getter');
    }
  });
  const initialLab = {
    rangeDistanceM: 120,
    coverLayout: 'mixed',
    movementPace: 'autonomous',
    rangeScale: 1,
    durationLimitSeconds: 210,
    seed: 'skills-range-0001',
    controller: 'new'
  };
  if (opts.lab)
    window.BattleSkillsLab = {
      snapshot() {
        return Object.assign({ time: sim.time }, initialLab, opts.labOverrides);
      },
      setRunning() {
        sim.pause();
      }
    };
  const sandbox = {
    window,
    document,
    navigator: { userAgent: 'offline-check', hardwareConcurrency: 8 },
    location: { search, href: 'https://example.test/battle_sim.php' + search },
    performance: {
      now() {
        elapsed += 0.02;
        return elapsed;
      }
    },
    setTimeout(fn) {
      queue.push(fn);
      return queue.length;
    },
    URLSearchParams,
    URL,
    Blob,
    console
  };
  window.performance = sandbox.performance;
  const originalSight = window.BattleObstacleField.sightBlocked;
  const originalFrame = sim._frame;
  vm.runInNewContext(querySource, sandbox, { filename: '97b-browser-query-census.js' });
  vm.runInNewContext(source, sandbox, { filename: '97a-browser-cpu-probe.js' });
  function drain() {
    for (let i = 0; queue.length && i < 5000; i++) queue.shift()();
    assert.ok(queue.length === 0, 'probe did not terminate');
  }
  return { window, sim, originalStep, originalSight, originalFrame, engine, drain, document };
}

const disabled = fixture('?tacticalController=new');
assert.equal(
  disabled.window.BattleBrowserCpuProbe,
  undefined,
  'probe must be completely inert without opt-in'
);
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

const labLink = '?cpuBench=1&cpuLab=120&cpuQueries=1&pinSeed=1&tacticalController=new';
const census = fixture(labLink, { lab: true, queryCalls: true });
census.window.BattleBrowserCpuProbe.start();
census.drain();
const censusReport = census.window.BattleBrowserCpuProbe.result();
assert.equal(censusReport.run.valid, true);
assert.equal(censusReport.run.steps, 1400);
assert.equal(censusReport.skillsLab.initial.rangeDistanceM, 120);
assert.ok(Math.abs(censusReport.skillsLab.final.time - 210) < 1e-7);
assert.equal(censusReport.queryExactCensus.frame, 1400, 'observe real _frame boundaries');
assert.equal(censusReport.queryExactCensus.stateAuthority, 'uncertified');
assert.equal(censusReport.queryExactCensus.certifiedReuse, 0);
const censusRows = Object.values(censusReport.queryExactCensus.rows);
assert.equal(censusReport.queryCapture.readableInputCalls, 4200);
assert.equal(censusReport.queryCapture.unknownContextCalls, 4200);
assert.equal(
  censusRows.reduce((sum, row) => sum + row.calls, 0),
  4200
);
assert.equal(
  censusRows.reduce((sum, row) => sum + row.answerAgreements, 0),
  1400
);
assert.equal(
  censusRows.reduce((sum, row) => sum + row.unobservedFrameCalls, 0),
  1400
);
assert.equal(census.window.BattleObstacleField.nativeCalls, 4200, 'every native query must execute');
assert.equal(census.window.BattleObstacleField.sightBlocked, census.originalSight);
assert.equal(census.sim._frame, census.originalFrame);
assert.equal(census.sim.step, census.originalStep);
assert.equal(census.window.BattleHotpathProfiler, undefined);
assert.equal(census.window.BattleExactQueryCensus, undefined);
assert.doesNotThrow(() => JSON.stringify(censusReport));

for (const labOverrides of [
  { rangeDistanceM: 70 },
  { seed: 'wrong' },
  { controller: 'legacy' },
  { movementPace: 'baseline' }
]) {
  const mismatch = fixture(labLink, { lab: true, labOverrides });
  mismatch.window.BattleBrowserCpuProbe.start();
  assert.equal(mismatch.window.BattleBrowserCpuProbe.state(), 'ready');
  assert.equal(mismatch.sim.time, 0, 'refuse mismatched effective lab settings before advancing');
}
const noLab = fixture(labLink);
noLab.window.BattleBrowserCpuProbe.start();
assert.equal(noLab.sim.time, 0);
const interruptedCensus = fixture(labLink, { lab: true, queryCalls: true });
interruptedCensus.window.BattleBrowserCpuProbe.start();
interruptedCensus.window.BattleBrowserCpuProbe.stop();
interruptedCensus.drain();
assert.equal(interruptedCensus.window.BattleBrowserCpuProbe.result().run.valid, false);
assert.equal(interruptedCensus.sim._frame, interruptedCensus.originalFrame);
assert.equal(interruptedCensus.window.BattleHotpathProfiler, undefined);
assert.equal(disabled.window.BattleBrowserQueryCensus, undefined);
const emptyCensus = fixture(labLink, { lab: true });
emptyCensus.window.BattleBrowserCpuProbe.start();
emptyCensus.drain();
assert.equal(emptyCensus.window.BattleBrowserCpuProbe.result().run.simulationValid, true);
assert.equal(
  emptyCensus.window.BattleBrowserCpuProbe.result().run.valid,
  false,
  'a complete simulation cannot pass an empty exact census'
);
const opaqueCensus = fixture(labLink, { lab: true, queryCalls: true });
const startObserver = opaqueCensus.window.BattleBrowserQueryCensus.start;
opaqueCensus.window.BattleBrowserQueryCensus.start = function () {
  const session = startObserver();
  return {
    restore: session.restore,
    snapshot() {
      const report = session.snapshot();
      for (const row of Object.values(report.queryExactCensus.rows)) row.unknownInputs = row.calls;
      return report;
    }
  };
};
opaqueCensus.window.BattleBrowserCpuProbe.start();
opaqueCensus.drain();
const opaqueReport = opaqueCensus.window.BattleBrowserCpuProbe.result();
assert.equal(opaqueReport.run.simulationValid, true);
assert.equal(opaqueReport.queryCapture.calls, 4200);
assert.equal(opaqueReport.queryCapture.readableInputCalls, 0);
assert.equal(opaqueReport.run.valid, false, 'all-opaque inputs cannot pass census validity');
const advancedLab = fixture(labLink, { lab: true, initialTime: 0.15 });
advancedLab.window.BattleBrowserCpuProbe.start();
assert.equal(advancedLab.sim.time, 0.15, 'canonical lab refuses an already advanced state');
const failedQuery = fixture(labLink, { lab: true, queryCalls: true, throwQuery: true });
failedQuery.window.BattleBrowserCpuProbe.start();
failedQuery.drain();
assert.equal(failedQuery.window.BattleBrowserCpuProbe.result().run.valid, false);
assert.match(failedQuery.window.BattleBrowserCpuProbe.result().error, /native-query-test-error/);
assert.equal(failedQuery.sim._frame, failedQuery.originalFrame);
assert.equal(failedQuery.window.BattleObstacleField.sightBlocked, failedQuery.originalSight);
assert.equal(failedQuery.engine.stopped, false);
console.log(
  'browser-cpu-probe-check: exact 120m census, native calls, frame boundaries, scenario guards and cleanup passed'
);
