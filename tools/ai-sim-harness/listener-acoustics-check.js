#!/usr/bin/env node
'use strict';
// Howler-only listener acoustics: source filtering, prioritization, and bounded work.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const code = fs.readFileSync(path.join(__dirname, '../../battle/modules/12a-listener-acoustics.js'), 'utf8');
assert.doesNotMatch(code, /BABYLON\.Sound|BABYLON\.Engine\.audioEngine|_battleAcousticFilter/);

function world(flags = '') {
  let clock = 1000;
  let blocked = false;
  const timers = [];
  const ctx = {
    sampleRate: 12000,
    currentTime: 0,
    createConvolver() {
      return { connect() {} };
    },
    createGain() {
      return { gain: { value: 0 }, connect() {} };
    },
    createBuffer(channels, length) {
      const data = Array.from({ length: channels }, () => new Float32Array(length));
      return { getChannelData: i => data[i] };
    }
  };
  const masterGain = { connect() {} };
  const scene = {
    activeCamera: { position: { x: 0, y: 1.6, z: 0 } },
    metadata: { battleScenario: { buildings: [] } }
  };
  const runtime = {
    location: { search: flags },
    window: null,
    performance: { now: () => clock },
    setTimeout(fn) {
      timers.push(fn);
    },
    BattleAudioBackend: { engine: () => ({ audioContext: ctx, masterGain }) },
    BattleObstacleField: { sightBlocked: () => blocked },
    BattleModules: { registerSystem() {} }
  };
  runtime.window = runtime;
  vm.createContext(runtime);
  vm.runInContext(code, runtime);
  const api = runtime.BattleListenerAcoustics;
  api.bind({ scene, obstacles: [], heightAt: () => (blocked ? 6 : -3) });
  function sound() {
    return {
      isPlaying: true,
      setVolume(v) {
        this.volume = v;
      },
      setAcousticProfile(hz, wet, input, limit) {
        this.hz = hz;
        this.wet = wet;
        this.input = input;
        this.limit = limit;
        if (!this._acoustics) this._acoustics = { filter: true };
        return true;
      },
      neutralizeAcoustics() {
        this.neutralized = (this.neutralized || 0) + 1;
        this.hz = 20000;
        this.wet = 0;
      }
    };
  }
  return {
    api,
    scene,
    sound,
    block(value) {
      blocked = value;
    },
    tick() {
      clock += 250;
      if (timers.length) timers.shift()();
    },
    advance(ms) {
      clock += ms;
    }
  };
}

{
  const w = world();
  const s = w.sound();
  assert.equal(w.api.quality, 'standard');
  assert.equal(w.api.maxActive, 96, 'production standard maintains 96 slots');
  assert.equal(w.api.prepare(s, { x: 40, y: 1.6, z: 0 }, 'gun', 0.2, w.scene), true);
  assert.equal(w.api.stats.filtered, 1, 'Howler filter attached');
  const openHz = s.hz;
  w.block(true);
  w.tick();
  assert.ok(s.hz < openHz, 'cover muffles gunfire');
  assert.ok(s.volume < 0.2, 'cover attenuates sound');
  assert.ok(w.api.stats.occluded > 0, 'physical obstruction counted');
  w.block(false);
  w.api.prepare(s, { x: 40, y: 1.6, z: 0 }, 'gun', 0.2, w.scene);
  assert.equal(w.api.active, 1, 'reused sound has one acoustic record');
  assert.equal(w.api.stats.filtered, 1, 'reuse does not allocate another filter');
  w.api.reset();
  assert.equal(w.api.active, 0);
  assert.ok(s.neutralized > 0, 'restart neutralizes Howler processing');
}
{
  const w = world('?acoustics=off');
  assert.equal(w.api.prepare(w.sound(), { x: 20, y: 1.6, z: 0 }, 'gun', 0.2, w.scene), false);
  assert.equal(w.api.active, 0, 'off bypasses filter work');
}
{
  const w = world('?acoustics=standard&acousticSlots=2&acousticPriority=1');
  const far1 = w.sound();
  const far2 = w.sound();
  assert.equal(w.api.prepare(far1, { x: 700, y: 1.6, z: 0 }, 'gunDistant', 0.08, w.scene), true);
  assert.equal(w.api.prepare(far2, { x: 730, y: 1.6, z: 0 }, 'gunDistant', 0.08, w.scene), true);
  const near = w.sound();
  assert.equal(w.api.prepare(near, { x: 12, y: 1.6, z: 0 }, 'gun', 0.2, w.scene), true);
  assert.equal(w.api.active, 2, 'priority never increases processing budget');
  assert.equal(w.api.stats.replacedCapacity, 1, 'higher priority replaces far slot');
  assert.ok(far1.neutralized || far2.neutralized, 'evicted source continues dry');
  assert.equal(
    w.api.prepare(w.sound(), { x: 900, y: 1.6, z: 0 }, 'gunDistant', 0.001, w.scene),
    false
  );
  assert.equal(w.api.stats.skippedCapacity, 1, 'lower priority plays without filtered slot');
}
{
  const w = world('?acoustics=standard&acousticSlots=2&acousticPriority=1&acousticHoldMs=250');
  for (let i = 0; i < 2; i++)
    w.api.prepare(w.sound(), { x: 700 + i, y: 1.6, z: 0 }, 'gunDistant', 0.08, w.scene);
  const close = w.sound();
  assert.equal(w.api.prepare(close, { x: 12, y: 1.6, z: 0 }, 'gun', 0.2, w.scene), false);
  assert.equal(w.api.stats.deniedHold, 1, 'hold protects recently attached filters');
  w.advance(300);
  assert.equal(w.api.prepare(close, { x: 12, y: 1.6, z: 0 }, 'gun', 0.2, w.scene), true);
}
for (const capacity of [24, 48, 96, 192]) {
  const w = world('?acoustics=standard&acousticSlots=' + capacity);
  for (let i = 0; i < capacity; i++) {
    const s = w.sound();
    assert.equal(w.api.prepare(s, { x: 25 + i / 100, y: 1.6, z: 0 }, 'gun', 0.1, w.scene), true);
  }
  assert.equal(w.api.active, capacity);
  assert.equal(w.api.maxActive, capacity);
  assert.equal(w.api.prepare(w.sound(), { x: 900, y: 1.6, z: 0 }, 'gunDistant', 0.01, w.scene), false);
  assert.equal(w.api.stats.skippedCapacity, 1);
  w.tick();
  assert.ok(w.api.stats.sampled >= capacity * 2, 'all admitted sources sampled on audio tick');
}
for (const kind of ['voice', 'gun']) {
  const w = world();
  const s = w.sound();
  const cutoffs = [5, 40, 80].map(d => {
    w.api.prepare(s, { x: d, y: 1.6, z: 0 }, kind, 0.24, w.scene);
    return s.hz;
  });
  assert.ok(cutoffs[0] > cutoffs[1] && cutoffs[1] > cutoffs[2]);
  if (kind === 'voice') {
    assert.equal(cutoffs[0], 14000);
    assert.ok(cutoffs[1] > 8500 && cutoffs[1] < 9500);
    assert.ok(cutoffs[2] > 2700 && cutoffs[2] < 2900);
  }
}
assert.equal(world('?acoustics=high').api.maxActive, 192, 'high retains 192 slots');
console.log('listener-acoustics-check: PASS (Howler-only source sampling and capacity)');
