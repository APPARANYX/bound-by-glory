/* Opt-in browser CPU probe. Real fixed-step battle, no render-loop timing or gameplay tuning.
   ?cpuBench=1&cpuSeconds=210; collects inclusive call-site costs for diagnosis,
   NOT an uninstrumented A/B performance acceptance benchmark. */
(function (root) {
  'use strict';
  if (typeof document === 'undefined' || typeof location === 'undefined') return;
  var q = new URLSearchParams(location.search || '');
  if (q.get('cpuBench') !== '1' || root.BattleBrowserCpuProbe) return;

  var seconds = Number(q.get('cpuSeconds'));
  if (!Number.isFinite(seconds) || seconds < 15 || seconds > 600) seconds = 210;
  var STEP = 0.15, SLICE_MS = 24, BUCKET_SECONDS = 30;
  var panel, status, startButton, stopButton, saveButton, copyButton;
  var sim = null, engine = null, clock = null, patches = [], rows = {};
  var running = false, result = null, startedAt = 0, startedSim = 0, finishAt = 0;
  var sampledSteps = [], slowSteps = [], totalStepMs = 0, nSteps = 0, hiddenSlices = 0;
  var originalScale = null, lastError = null, valid = false, finishedEarly = false;

  function node(tag, value) {
    var el = document.createElement(tag);
    if (value != null) el.textContent = value;
    return el;
  }
  function button(label, handler) {
    var b = node('button', label);
    b.type = 'button';
    b.style.cssText = 'padding:7px 10px;border-radius:5px;border:1px solid #687c51;background:#34412a;color:#fff;cursor:pointer;font:inherit';
    b.addEventListener('click', handler);
    return b;
  }
  function initPanel() {
    if (panel || !document.body) return;
    panel = node('section');
    panel.id = 'browserCpuProbe';
    panel.style.cssText = 'position:fixed;z-index:96;top:12px;right:12px;width:min(380px,calc(100vw - 24px));max-height:calc(100vh - 24px);box-sizing:border-box;overflow:auto;padding:13px;background:rgba(15,20,15,.96);color:#eef1e6;border:1px solid #697958;border-radius:9px;font:12px/1.5 Arial,sans-serif;box-shadow:0 8px 25px #0009';
    var heading = node('div', 'CPU simulation probe');
    heading.style.cssText = 'font-weight:700;font-size:15px;margin-bottom:6px';
    panel.appendChild(heading);
    panel.appendChild(node('div', 'Fixed 0.15 s steps · no rendering · real AI and navigation. Instrumented measurements, not the official performance gate.'));
    status = node('pre', 'Loading simulation…');
    status.style.cssText = 'white-space:pre-wrap;word-break:break-word;margin:10px 0;font:11px/1.5 monospace;color:#cbd8bb';
    panel.appendChild(status);
    var controls = node('div');
    controls.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px';
    startButton = button('Run ' + seconds + ' s CPU test', start);
    stopButton = button('Stop & export', function () { finish('user-stopped'); });
    saveButton = button('Download JSON', download);
    copyButton = button('Copy JSON', function () {
      if (!result) return;
      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        status.textContent = 'Clipboard unavailable here. Use Download JSON.';
        return;
      }
      navigator.clipboard.writeText(JSON.stringify(result, null, 2)).then(function () {
        copyButton.textContent = 'Copied';
      }).catch(function () { status.textContent = 'Copy failed. Use Download JSON.'; });
    });
    [startButton, stopButton, saveButton, copyButton].forEach(function (b) { controls.appendChild(b); });
    panel.appendChild(controls);
    document.body.appendChild(panel);
    controlsState();
  }
  function controlsState() {
    if (!panel) return;
    startButton.disabled = running || !sim;
    stopButton.disabled = !running;
    saveButton.disabled = copyButton.disabled = !result;
  }
  function safeNumber(x) { return Number.isFinite(x) ? +x.toFixed(4) : null; }
  function quantile(xs, p) {
    if (!xs.length) return null;
    var sorted = xs.slice().sort(function (a, b) { return a - b; });
    return safeNumber(sorted[Math.round((sorted.length - 1) * p)]);
  }
  function measure(obj, key, name) {
    if (!obj || typeof obj[key] !== 'function') return false;
    var original = obj[key];
    var row = rows[name] = { calls: 0, inclusiveMs: 0, maxMs: 0, buckets: {} };
    function wrapped() {
      var t0 = performance.now();
      try { return original.apply(this, arguments); }
      finally {
        var ms = performance.now() - t0;
        row.calls++;
        row.inclusiveMs += ms;
        if (ms > row.maxMs) row.maxMs = ms;
        var ix = Math.floor(Math.max(0, (sim.time - startedSim)) / BUCKET_SECONDS);
        var w = row.buckets[ix] || (row.buckets[ix] = { calls: 0, inclusiveMs: 0 });
        w.calls++; w.inclusiveMs += ms;
      }
    }
    obj[key] = wrapped;
    patches.push([obj, key, original, wrapped]);
    return true;
  }
  function install() {
    rows = {};
    patches = [];
    [
      [sim, 'step', 'BattleSim.step'],
      [sim, '_liveCommanderTick', 'Commander.liveTick'],
      [root.BattleCommanderAI, 'update', 'Commander.update'],
      [root.SquadAI, 'updateSquad', 'SquadAI.updateSquad'],
      [root.SquadAI, 'updateSoldier', 'SquadAI.updateSoldier'],
      [root.BattleModules, 'runHook', 'BattleModules.runHook'],
      [root.BattleNavigation, 'findPath', 'Navigation.findPath'],
      [root.BattleNavigation, 'movementClear', 'Navigation.movementClear'],
      [root.BattleNavigation, 'hasLineOfSight', 'Navigation.hasLineOfSight'],
      [root.BattleObstacleField, 'sightBlocked', 'Obstacles.sightBlocked'],
      [root.BattleObstacleField, 'sightBlocker', 'Obstacles.sightBlocker'],
      [root.BattleObstacleField, 'nearby', 'Obstacles.nearby'],
      [root.BattleMovementResolver, 'resolve', 'MovementResolver.resolve'],
      [root.BattleMovementResolver, 'arbitrate', 'MovementResolver.arbitrate']
    ].forEach(function (entry) { measure(entry[0], entry[1], entry[2]); });
  }
  function restore() {
    patches.forEach(function (p) {
      if (p[0][p[1]] === p[3]) p[0][p[1]] = p[2];
    });
    patches.length = 0;
  }
  function ready() {
    return !!(root.__battle__ && root.__battle__.scene && root.__battle__._fixedClock &&
      (!root.BattleLoading || !root.BattleLoading.timings || root.BattleLoading.timings().finishedAt != null));
  }
  function poll() {
    initPanel();
    if (!panel) return setTimeout(poll, 100);
    if (!ready()) {
      if (!running) status.textContent = 'Waiting for simulation and fixed-step clock…';
      return setTimeout(poll, 350);
    }
    sim = root.__battle__;
    if (!running && !result) {
      status.textContent = 'Ready. Seed: ' +
        ((root.__scenario__ && root.__scenario__.seed) || 'page default') +
        '\nController: ' + q.get('tacticalController') +
        '\nStarts from current state; reload to reproduce. Keep this tab visible.';
    }
    controlsState();
  }
  function start() {
    if (running || !ready()) return;
    sim = root.__battle__;
    if (sim.winner) { status.textContent = 'Battle already finished. Reload first.'; return; }
    if (sim.time > 0.3) {
      status.textContent = 'For a repeatable baseline, reload the page before running (battle already at ' + sim.time.toFixed(2) + ' s).';
      return;
    }
    engine = sim.scene.getEngine();
    clock = sim._fixedClock;
    originalScale = sim.timeScale;
    startedSim = sim.time;
    finishAt = startedSim + seconds;
    startedAt = performance.now();
    sampledSteps = []; slowSteps = []; nSteps = 0; totalStepMs = 0; hiddenSlices = 0;
    lastError = null; result = null; valid = false; finishedEarly = false;
    running = true;
    try {
      engine.stopRenderLoop();
      sim.setTimeScale(1);
      sim.resume();
      install();
      controlsState();
      status.textContent = 'Profiling… 0/' + seconds + ' simulated seconds. Keep tab visible.';
      setTimeout(slice, 0);
    } catch (e) {
      lastError = String(e && (e.stack || e.message) || e);
      finish('error');
    }
  }
  function slice() {
    if (!running) return;
    if (document.hidden) hiddenSlices++;
    var sliceStart = performance.now();
    try {
      while (running && !sim.winner && !sim.paused && sim.time + 1e-7 < finishAt &&
             performance.now() - sliceStart < SLICE_MS) {
        var beforeTime = sim.time, t = performance.now();
        var steps = clock.advance(STEP);
        var elapsed = performance.now() - t;
        if (steps !== 1 || sim.time <= beforeTime) {
          lastError = 'Fixed-step advance failed to progress exactly once (steps=' + steps + ').';
          return finish('clock-error');
        }
        nSteps++;
        totalStepMs += elapsed;
        sampledSteps.push(elapsed);
        if (slowSteps.length < 15 || elapsed > slowSteps[slowSteps.length - 1].ms) {
          slowSteps.push({ simTime: safeNumber(sim.time), ms: safeNumber(elapsed) });
          slowSteps.sort(function (a, b) { return b.ms - a.ms; });
          if (slowSteps.length > 15) slowSteps.length = 15;
        }
      }
      if (sim.winner || sim.paused || sim.time + 1e-7 >= finishAt) return finish('completed');
      if (nSteps % 40 < 12) {
        status.textContent = 'Profiling… ' + (sim.time - startedSim).toFixed(1) + '/' + seconds +
          ' simulated seconds\n' + nSteps + ' fixed steps · ' + (performance.now() - startedAt).toFixed(0) +
          ' ms elapsed';
      }
      setTimeout(slice, 0);
    } catch (e) {
      lastError = String(e && (e.stack || e.message) || e);
      finish('error');
    }
  }
  function finish(reason) {
    if (!running) return;
    running = false;
    var endWall = performance.now(), endSim = sim.time, endedEarly = endSim + 0.01 < finishAt;
    try {
      restore();
      if (root.BattleSkillsLab && root.BattleSkillsLab.setRunning) root.BattleSkillsLab.setRunning(false);
      else sim.pause();
      if (originalScale != null) sim.setTimeScale(originalScale);
      if (engine) engine.runRenderLoop(root.__battleRenderLoop__ || function () { sim.scene.render(); });
    } catch (e) { lastError = (lastError || '') + ' / cleanup: ' + String(e); }
    var functions = Object.keys(rows).map(function (key) {
      var r = rows[key];
      return { name: key, calls: r.calls, inclusiveMs: safeNumber(r.inclusiveMs),
        meanMs: r.calls ? safeNumber(r.inclusiveMs / r.calls) : null, maxMs: safeNumber(r.maxMs),
        windows: Object.keys(r.buckets).map(function (i) {
          var w = r.buckets[i];
          return { simFrom: Number(i) * BUCKET_SECONDS, calls: w.calls, inclusiveMs: safeNumber(w.inclusiveMs) };
        }).sort(function (a, b) { return a.simFrom - b.simFrom; }) };
    }).sort(function (a, b) { return b.inclusiveMs - a.inclusiveMs; });
    var scenario = root.__scenario__ || {};
    valid = !lastError && !hiddenSlices && !endedEarly && nSteps > 0;
    finishedEarly = endedEarly;
    result = {
      kind: 'grasstex-browser-cpu-probe', version: 1, date: new Date().toISOString(),
      source: { url: location.href, ref: root.BATTLE_REF || null, build: root.BATTLE_BUILD || root.BATTLE_BUILD_DEPLOYED || null },
      device: { userAgent: navigator.userAgent, cores: navigator.hardwareConcurrency || null,
        memoryGB: navigator.deviceMemory || null, hiddenSlices: hiddenSlices },
      scenario: { id: scenario.id || null, seed: scenario.seed || null, skillsLab: !!root.BattleSkillsLab,
        controller: q.get('tacticalController') || 'legacy', flags: location.search },
      run: { requestedSimSeconds: seconds, simulatedSeconds: safeNumber(endSim - startedSim),
        fromSim: safeNumber(startedSim), toSim: safeNumber(endSim), steps: nSteps,
        stepSeconds: STEP, wallMs: safeNumber(endWall - startedAt),
        measuredAdvanceMs: safeNumber(totalStepMs), meanAdvanceMs: nSteps ? safeNumber(totalStepMs / nSteps) : null,
        p50AdvanceMs: quantile(sampledSteps, 0.5), p95AdvanceMs: quantile(sampledSteps, 0.95),
        p99AdvanceMs: quantile(sampledSteps, 0.99), slowestSteps: slowSteps, endReason: reason, early: endedEarly, valid: valid },
      functions: functions, error: lastError,
      note: 'Instrumented inclusive JavaScript main-thread elapsed time, not OS CPU utilization. Function times can nest and must not be summed. Captured exports can miss internal closure call sites. Use the official uninstrumented paired benchmark for acceptance.'
    };
    root.__browserCpuResult = result;
    status.textContent = (valid ? 'CPU test complete.' : 'CPU test stopped (partial/invalid).') +
      '\n' + nSteps + ' steps · ' + (endSim - startedSim).toFixed(1) + ' sim s · ' +
      (totalStepMs / 1000).toFixed(2) + ' s measured step CPU' +
      '\nP95: ' + String(result.run.p95AdvanceMs) + ' ms · wall: ' +
      (result.run.wallMs / 1000).toFixed(1) + ' s' +
      '\nTop observed functions:\n' +
      functions.filter(function (r) { return r.calls; }).slice(0, 7).map(function (r) {
        return r.name + ': ' + r.calls + ' calls, ' + r.inclusiveMs + ' ms';
      }).join('\n') +
      (lastError ? '\nERROR: ' + lastError : '') +
      (hiddenSlices ? '\nWARNING: tab hidden in ' + hiddenSlices + ' slices' : '') +
      '\nDownload the JSON and attach it in ChatGPT.';
    controlsState();
  }
  function download() {
    if (!result) return;
    var url = URL.createObjectURL(new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' }));
    var a = node('a');
    a.href = url;
    a.download = 'grasstex-cpu-' + (result.scenario.seed || 'seed') + '-' +
      (result.source.ref || 'build').slice(0, 12) + '.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
  }
  root.BattleBrowserCpuProbe = { state: function () { return running ? 'running' : result ? 'complete' : 'ready'; },
    result: function () { return result; }, start: start, stop: function () { finish('user-stopped'); } };
  poll();
})(typeof window !== 'undefined' ? window : globalThis);
