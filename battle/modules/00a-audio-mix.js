/* Local-listener game-audio mix. Presentation only; no soldier or simulation state.
   Source clips retain their calibrated masters and one-shot transients. We apply
   category compensation once, before Howler spatial attenuation.
   The Howler WebAudio graph owns output; no Babylon soundtrack routing.
   User sliders represent percentages of this new, louder balanced mix.
   ?audioMix=legacy is an exact unboosted comparison and does not erase settings. */
(function (root) {
  'use strict';
  if (typeof window === 'undefined' || root.BattleAudioMix) return;

  var KEY = 'grasstex.audioMix.v1';
  var LIMIT = 150;
  var MIX = { weapon: 1.8, tail: 1.35, voice: 1.65, foley: 1.25, combat: 1.3 };
  var CATEGORIES = {
    weapon: 'weapons',
    tail: 'weapons',
    voice: 'voices',
    foley: 'effects',
    combat: 'effects'
  };
  var search = typeof location !== 'undefined' ? location.search || '' : '';
  var legacy = /(?:^|[?&])audioMix=legacy(?:&|$)/.test(search);
  // Howler owns the sole output graph. Babylon SoundTrack compressors were retired.
  var defaults = { master: 100, weapons: 100, voices: 100, effects: 100 };
  var settings = {};
  // Retained empty for older read-only mix diagnostics; no graph rerouting occurs.
  var stats = { routed: 0, unavailable: 0, limited: 0 };
  function bounded(v) {
    v = Number(v);
    return Number.isFinite(v) ? Math.max(0, Math.min(LIMIT, Math.round(v / 5) * 5)) : 100;
  }
  function snapshot() {
    return {
      master: settings.master,
      weapons: settings.weapons,
      voices: settings.voices,
      effects: settings.effects
    };
  }
  function save() {
    try {
      if (typeof localStorage !== 'undefined') localStorage.setItem(KEY, JSON.stringify(snapshot()));
    } catch (_) {}
  }
  function load() {
    var stored = null;
    try {
      if (typeof localStorage !== 'undefined') stored = JSON.parse(localStorage.getItem(KEY) || 'null');
    } catch (_) {}
    Object.keys(defaults).forEach(function (key) {
      settings[key] =
        stored && Object.prototype.hasOwnProperty.call(stored, key) ? bounded(stored[key]) : defaults[key];
    });
  }
  function set(key, value) {
    if (!Object.prototype.hasOwnProperty.call(defaults, key)) return snapshot();
    settings[key] = bounded(value);
    save();
    return snapshot();
  }
  function reset() {
    Object.keys(defaults).forEach(function (key) {
      settings[key] = defaults[key];
    });
    save();
    return snapshot();
  }
  function gain(kind, raw) {
    var base = Number(raw);
    if (!Number.isFinite(base) || base <= 0) return 0;
    if (legacy) return base;
    var category = CATEGORIES[kind] || 'effects';
    var single = (((base * (MIX[kind] || 1) * settings.master) / 100) * settings[category]) / 100;
    return Math.min(1, single);
  }

  load();
  root.BattleAudioMix = {
    gain: gain,
    get: snapshot,
    set: set,
    reset: reset,
    stats: stats,
    legacy: !!legacy,
    tacticalSafety: false,
    presets: MIX
  };
})(typeof window !== 'undefined' ? window : globalThis);
