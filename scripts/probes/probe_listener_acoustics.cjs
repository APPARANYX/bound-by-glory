#!/usr/bin/env node
'use strict';
/* Hosted Howler smoke: synthetic spatial source, actual filter attachment and
   same-page route reuse. The analyser proves graph output, not speaker audibility. */
const assert = require('node:assert/strict');
const { chromium, webkit } = require('playwright');
const BROWSER = process.env.AUDIO_BROWSER || 'chromium';
assert.ok(['chromium', 'webkit'].includes(BROWSER), 'AUDIO_BROWSER must be chromium or webkit');
const BASE = process.env.AUDIO_PREVIEW_URL ||
  'https://test.ivandpopov.com/bound-by-glory/battle_sim.php?seed=acoustic-browser-qa';

(async function () {
  const browser = await (BROWSER === 'webkit' ? webkit : chromium).launch({ headless: true, args: BROWSER === 'webkit' ? [] : [
    '--autoplay-policy=no-user-gesture-required', '--use-gl=angle',
    '--use-angle=swiftshader', '--enable-webgl', '--ignore-certificate-errors'
  ] });
  try {
    const page = await browser.newPage({ ignoreHTTPSErrors: true, viewport: { width: 900, height: 650 } });
    const errors = [];
    page.on('pageerror', e => errors.push(String(e)));
    const response = await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 90000 });
    assert.ok(response?.ok(), 'preview HTTP ' + response?.status());
    await page.waitForFunction(() => window.__battle__ && window.BattleListenerAcoustics && window.BattleAudioBackend,
      null, { timeout: 120000 });
    const play = page.locator('#skillPlay');
    if (await play.count()) await play.click();
    else await page.locator('#startBtn').click();
    await page.evaluate(() => window.__battle__.pause());
    const result = await page.evaluate(async () => {
      const backend = window.BattleAudioBackend, a = window.BattleListenerAcoustics;
      const scene = window.__battle__.scene, ae = backend.engine(), ctx = ae.audioContext;
      await ae.unlock();
      // A local PCM WAV exercises Howler's real decoder without private clips.
      const rate = 16000, length = rate * 3, bytes = new ArrayBuffer(44 + length * 2), view = new DataView(bytes);
      function text(at, value) { for (let i = 0; i < value.length; i++) view.setUint8(at + i, value.charCodeAt(i)); }
      text(0, 'RIFF'); view.setUint32(4, 36 + length * 2, true); text(8, 'WAVE'); text(12, 'fmt ');
      view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
      view.setUint32(24, rate, true); view.setUint32(28, rate * 2, true); view.setUint16(32, 2, true);
      view.setUint16(34, 16, true); text(36, 'data'); view.setUint32(40, length * 2, true);
      for (let i = 0; i < length; i++) view.setInt16(44 + i * 2, Math.sin(i * 2 * Math.PI * 240 / rate) * 4000, true);
      const blob = URL.createObjectURL(new Blob([bytes], { type: 'audio/wav' }));
      let sound;
      await new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(Error('synthetic Howler clip did not decode')), 15000);
        sound = new backend.Sound('acoustic-browser-probe', blob + '#probe.wav', scene,
          () => { clearTimeout(timer); resolve(); }, { spatialSound: true, autoplay: false, volume: 0.18 });
      });
      const cam = scene.activeCamera, c = cam.globalPosition || cam.position;
      const src = { x: c.x + 14, y: c.y, z: c.z + 3 };
      sound.setPosition(src);
      const meter = ctx.createAnalyser(), data = new Float32Array(meter.fftSize);
      ae.masterGain.connect(meter);
      sound.play();
      const accepted = a.prepare(sound, src, 'gun', 0.18, scene);
      let peak = 0;
      for (let i = 0; i < 20; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        meter.getFloatTimeDomainData(data);
        for (const value of data) peak = Math.max(peak, Math.abs(value));
      }
      const original = sound._acoustics, first = backend.summary();
      a.reset(); sound.stop(); sound.play(); a.prepare(sound, src, 'gun', 0.18, scene);
      await new Promise(resolve => setTimeout(resolve, 300));
      const last = backend.summary();
      const result = { url: location.href, backend: backend.name, audioState: ctx.state, quality: a.quality,
        babylonAudio: !!window.BABYLON.Engine.audioEngine, accepted, filtered: !!original,
        reused: !!original && sound._acoustics === original, peak,
        firstChains: first.acousticChains, lastChains: last.acousticChains,
        started: last.started, loadErrors: last.loadErrors, playErrors: last.playErrors, acousticErrors: last.acousticErrors };
      sound.stop(); a.reset(); sound.dispose(); ae.masterGain.disconnect(meter); meter.disconnect(); URL.revokeObjectURL(blob);
      return result;
    });
    console.log('Howler acoustic graph (' + BROWSER + '):', JSON.stringify(result));
    assert.equal(result.backend, 'howler'); assert.equal(result.audioState, 'running');
    assert.equal(result.babylonAudio, false); assert.equal(result.quality, 'standard');
    assert.equal(result.accepted, true); assert.equal(result.filtered, true); assert.equal(result.reused, true);
    assert.equal(result.lastChains, result.firstChains, 'restart does not grow filter routes');
    assert.ok(result.started >= 2); assert.ok(result.peak > 0.001, 'real decoded signal reaches master');
    assert.equal(result.loadErrors, 0); assert.equal(result.playErrors, 0); assert.equal(result.acousticErrors, 0);
    assert.deepEqual(errors, []);
    console.log('PASS: Howler decoding, acoustic attachment, master output and restart reuse');
  } finally { await browser.close(); }
})().catch(e => { console.error('AUDIO PREVIEW PROBE FAILED:', e?.stack || e); process.exit(1); });
