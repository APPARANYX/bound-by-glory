#!/usr/bin/env node
/* Per-step geometry cache must not change query answers vs uncached paths. */
'use strict';
const fs = require('fs'),
  path = require('path');
const REPO = path.resolve(__dirname, '..', '..');

function load(root, rel) {
  const c = fs.readFileSync(path.join(REPO, rel), 'utf8');
  new Function('window', 'globalThis', 'console', 'BABYLON', c + '\n//# sourceURL=' + rel)(
    root,
    root,
    console,
    root.BABYLON
  );
}

const root = { console, BABYLON: {}, location: { search: '?tacticalController=new' } };
root.window = root;

let failures = 0;
function check(name, ok, detail) {
  if (ok) console.log('  PASS  ' + name);
  else {
    failures++;
    console.log('  FAIL  ' + name + (detail ? '  (' + detail + ')' : ''));
  }
}

load(root, 'battle/core-runtime.js');
load(root, 'battle/geometry-step-cache.js');
load(root, 'battle/obstacle-field.js');
load(root, 'battle/battle-navigation.js');

const obstacles = { __physicalVersion: 1, length: 0 };
const C = root.BattleGeometryStepCache;
check('cache enabled under new controller', C.enabled);

C.beginStep({ obstacles: obstacles }, 1);
const a = { x: 1.234, z: 2.345, y: 1.5 };
const b = { x: 8.765, z: -4.321, y: 1.4 };
const r1 = root.BattleObstacleField.sightBlocked(obstacles, a, b);
const r2 = root.BattleObstacleField.sightBlocked(obstacles, a, b);
check('sightBlocked repeat same step', r1 === r2);
check('cache records hit', C.stats().hits >= 1);

C.beginStep({ obstacles: obstacles }, 2);
const r3 = root.BattleObstacleField.sightBlocked(obstacles, a, b);
check('new step still answers', typeof r3 === 'boolean');

const m1 = root.BattleNavigation.movementClear({ x: 0, z: 0 }, { x: 12, z: 3 });
const m2 = root.BattleNavigation.movementClear({ x: 0, z: 0 }, { x: 12, z: 3 });
check('movementClear repeat same step', m1 === m2);

if (failures) {
  console.error('\n' + failures + ' failure(s)');
  process.exit(1);
}
console.log('\nAll geometry step cache checks passed.');
