#!/usr/bin/env node
'use strict';
/* Documents which controller entry points remain ungated under AI V2 (offline contract). */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const REPO = path.resolve(__dirname, '../..');
const meso = fs.readFileSync(path.join(REPO, 'battle/ai-v2/meso.js'), 'utf8');
const provider = fs.readFileSync(path.join(REPO, 'battle/modules/14a-ai-v2-provider.js'), 'utf8');

let n = 0;
function test(name, fn) {
  fn();
  n++;
  console.log('PASS ' + name);
}

test('ungated: squadCommand always invokes march core', () => {
  assert.match(meso, /function squadCommand[\s\S]*C\.squadCommand\(ctx\)/);
  assert.doesNotMatch(
    meso,
    /function squadCommand[\s\S]*if \(!K\.shouldRun[\s\S]*'formation'[\s\S]*\) return/
  );
});

test('gated: mission, contact, maneuver use shouldRun', () => {
  assert.match(meso, /shouldRun\([\s\S]*'mission'\)/);
  assert.match(meso, /shouldRun\([\s\S]*'contact'\)/);
  assert.match(meso, /shouldRun\([\s\S]*'maneuver'\)/);
});

test('ungated provider paths: engagement, stationSelection', () => {
  const eng = provider.match(/function engagement\(ctx\) \{[\s\S]*?\n  \}/);
  assert.ok(eng, 'engagement policy');
  assert.doesNotMatch(eng[0], /shouldRun/);
  const station = provider.match(/stationSelection: function \(ctx\) \{[\s\S]*?\n      \}/);
  assert.ok(station, 'stationSelection policy');
  assert.doesNotMatch(station[0], /shouldRun/);
});

test('strategic generalTick is gated', () => {
  assert.match(provider, /shouldRun\([\s\S]*'strategic'\)/);
});

console.log('\n' + n + ' tests passed');
console.log(
  '[AI-V2 inventory] Ungated every dispatch: squadCommand (full core), engagement, stationSelection, micro soldierPolicy, commanderTick review via core. Gated when aiV2Schedule on: executeMission, fireAndMovement contact/maneuver slices, strategic generalTick.'
);
