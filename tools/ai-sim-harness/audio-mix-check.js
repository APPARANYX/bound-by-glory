#!/usr/bin/env node
'use strict';
// The production audio mix is a pure gain policy; Howler owns the audio output graph.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const code = fs.readFileSync(path.join(__dirname, '../../battle/modules/00a-audio-mix.js'), 'utf8');
assert.doesNotMatch(code, /BABYLON\.Engine\.audioEngine|createDynamicsCompressor|ensureLimiter/);

function fixture(query) {
  const saved = {};
  const win = {
    location: { search: query || '' },
    localStorage: {
      getItem(key) {
        return saved[key] || null;
      },
      setItem(key, value) {
        saved[key] = value;
      }
    }
  };
  win.window = win;
  vm.createContext(win);
  vm.runInContext(code, win);
  return { api: win.BattleAudioMix, saved };
}

const w = fixture();
const a = w.api;
assert.equal(a.get().master, 100, '100% remains the calibrated default');
assert.equal(a.gain('weapon', 0.1).toFixed(3), '0.180', 'weapon gain unchanged');
assert.equal(a.gain('voice', 0.1).toFixed(3), '0.165', 'voice gain unchanged');
assert.equal(a.gain('combat', 0.1).toFixed(3), '0.130', 'combat gain unchanged');
assert.equal(a.gain('foley', 0.1).toFixed(3), '0.125', 'handling gain unchanged');
assert.equal(a.gain('weapon', 5), 1, 'individual clip gain capped at unity');
a.set('master', 50);
assert.ok(Math.abs(a.gain('weapon', 0.1) - 0.09) < 1e-10, 'master applies to weapons');
assert.ok(Math.abs(a.gain('voice', 0.2) - 0.165) < 1e-10, 'master applies to voices');
a.set('weapons', 0);
assert.equal(a.gain('weapon', 0.2), 0, 'weapon mute independent');
assert.ok(JSON.parse(w.saved['grasstex.audioMix.v1']).weapons === 0, 'mix settings persist');
a.set('voices', 9999);
assert.equal(a.get().voices, 150, 'sliders clamp at 150%');
a.reset();
assert.equal(a.get().master, 100, 'reset restores master');
assert.equal(a.get().weapons, 100, 'reset restores weapons');
assert.equal(typeof a.ensureLimiter, 'undefined', 'Babylon soundtrack compressor retired');
const tactical = fixture('?tacticalController=new');
assert.equal(tactical.api.tacticalSafety, false, 'Howler never applies the Babylon tactical compressor');
assert.equal(tactical.api.gain('weapon', 0.1).toFixed(3), '0.180', 'new AI does not change Howler gain');
const legacy = fixture('?audioMix=legacy');
assert.equal(legacy.api.gain('weapon', 0.11), 0.11, 'dry mix comparison retains unboosted gain');
console.log('audio-mix-check: PASS (Howler-only mix; no Babylon SoundTrack)');
