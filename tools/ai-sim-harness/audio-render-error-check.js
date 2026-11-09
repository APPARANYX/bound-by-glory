#!/usr/bin/env node
'use strict';
// Real battle page's AudioContext error/retry block, isolated from simulation.
// A rendered-device failure must not be silently ignored or restart gameplay.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('battle/battle_sim.html', 'utf8');
const a = html.indexOf("  var startBtn=document.getElementById('startBtn'),");
const b = html.indexOf('  // Opt-in continuous master-output trace', a);
assert.ok(a >= 0 && b > a, 'audio recovery block should be present');
const block = html.slice(a, b);
assert.match(html, /id="audioRecoverBtn" type="button" hidden/, 'retry control starts hidden');
assert.match(
  html,
  /audioRenderErrors:audioCopy\(audioRendererErrors\)/,
  'diagnostic exports renderer errors'
);

const events = {};
const ui = {
  hidden: true,
  addEventListener(kind, fn) {
    events['button:' + kind] = fn;
  }
};
const audio = {
  state: 'suspended',
  currentTime: 0.5,
  sampleRate: 48000,
  resumeCalls: 0,
  handlers: {},
  addEventListener(kind, fn) {
    this.handlers[kind] = fn;
  },
  resume() {
    this.resumeCalls++;
    this.state = 'running';
    return Promise.resolve();
  }
};
const engine = {
  audioContext: audio,
  unlocked: false,
  unlock() {
    this.unlocked = true;
  }
};
const errors = [];
const sandbox = {
  document: {
    getElementById(id) {
      return id === 'audioRecoverBtn' ? ui : {};
    }
  },
  console: {
    error(...args) {
      errors.push(args);
    },
    warn(...args) {
      errors.push(args);
    },
    log() {}
  },
  performance: { now: () => 1234 },
  window: {
    BattleAudioBackend: { engine: () => engine },
    BattleAudioMix: { get: () => ({ master: 100 }) }
  },
  BABYLON: { Engine: { audioEngine: engine } },
  enableLiveAudioMeter() {},
  audioRendererErrors: [],
  audioRecovery: { attempts: 0, successes: 0, failures: 0 },
  Promise,
  Math
};
sandbox.BattleAudioBackend = sandbox.window.BattleAudioBackend;
sandbox.BattleAudioMix = sandbox.window.BattleAudioMix;
vm.runInNewContext(block, sandbox, { filename: 'battle-audio-recovery-fixture.js' });

(async () => {
  assert.equal(await sandbox.window.__battleUnlockAudio__(), true, 'first click unlocks');
  assert.equal(audio.resumeCalls, 1);
  assert.ok(audio.handlers.error, 'registers native AudioContext error');
  assert.equal(ui.hidden, true, 'no false positive retry button');
  audio.handlers.error({ type: 'error' });
  assert.equal(ui.hidden, false, 'device/render error exposes retry button');
  assert.equal(sandbox.audioRendererErrors.length, 1, 'error added to diagnostics');
  assert.equal(audio.resumeCalls, 1, 'error does not auto-resume on its own');
  audio.state = 'suspended';
  await events['button:click']();
  assert.equal(audio.resumeCalls, 2, 'retry resumes from user gesture');
  assert.equal(ui.hidden, true, 'successful retry clears button');
  assert.equal(sandbox.audioRecovery.successes, 1);
  assert.equal(sandbox.audioRecovery.attempts, 1);
  assert.equal(sandbox.audioRecovery.failures, 0);
  assert.match(errors.map(e => String(e[0])).join(' '), /render\/device error/);
  console.log('PASS: WebAudio render error is surfaced and retry occurs only on a user gesture');
})().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
