'use strict';
/* Exact-ray static candidate memoization must never cache a visibility answer.
   Keep static object geometry, moving trucks and station-independent options live. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(path.resolve(__dirname, '../../battle/obstacle-field.js'), 'utf8');
const root = {
  GTLog() {},
  GTMath: { clamp: (n, lo, hi) => Math.max(lo, Math.min(hi, n)) }
};
new Function('window', 'globalThis', 'console', source)(root, root, console);
const F = root.BattleObstacleField;
const obstacles = [
  { id: 'wall-circle', shape: 'circle', type: 'rock', x: 4, z: 0, y: 0, height: 2, radius: 0.8 },
  { id: 'off-ray', shape: 'obb', type: 'hedge', x: 15, z: 15, y: 0, height: 2, hx: 2, hz: 0.6 }
];
obstacles.__physicalVersion = 1;
const lowA = { x: 0, z: 0, y: 1 };
const lowB = { x: 8, z: 0, y: 1 };
const highA = { ...lowA, y: 5 };
const highB = { ...lowB, y: 5 };
const field = F.index(obstacles);
assert.ok(field);
assert.equal(F.sightBlocked(obstacles, lowA, lowB), true, 'static cylinder blocks low ray');
assert.equal(field.sightRayMisses, 1);
const cached = field.sightRayCandidates.get('0|0|8|0');
assert.ok(cached && cached.length, 'cache retains static candidate indices');
assert.equal(typeof cached[0], 'number', 'no obstacle shape or result is cached');
F.nearby(obstacles, 15, 15, 4);
assert.equal(F.sightBlocked(obstacles, lowA, lowB), true, 'scratch reuse must not corrupt candidates');
assert.equal(field.sightRayHits, 1, 'second exact ray skips static cell gathering');
assert.equal(F.sightBlocked(obstacles, highA, highB), false, 'height changes re-test the live static volume');
assert.equal(field.sightRayHits, 2, 'X/Z candidate collection remains reusable across eye heights');
obstacles[0].height = 0.2;
assert.equal(F.sightBlocked(obstacles, lowA, lowB), false, 'same-time height mutation must remain live');
obstacles[0].height = 2;
assert.equal(F.sightBlocked(obstacles, lowA, lowB), true, 'same-time restoration must remain live');
const original = obstacles[0];
obstacles[0] = { ...original, y: 5 };
assert.equal(F.index(obstacles), field, 'test must not rebuild the unchanged index');
assert.equal(F.sightBlocked(obstacles, lowA, lowB), false, 'same-index obstacle replacement uses live object');
obstacles[0] = original;
assert.equal(F.sightBlocked(obstacles, lowA, lowB), true, 'restored object blocks immediately');
const emptyA = { x: 9, z: 0, y: 1 };
const emptyB = { x: 12, z: 0, y: 1 };
assert.equal(F.sightBlocked(obstacles, emptyA, emptyB), false);
const truck = { id: 'truck-1', shape: 'circle', type: 'truck', x: 11, z: 0, y: 0, height: 2, radius: 0.8 };
obstacles.__dynamicFootprints = [truck];
assert.equal(F.sightBlocked(obstacles, emptyA, emptyB), true, 'new moving truck blocks an already cached ray');
assert.equal(
  F.sightBlocked(obstacles, emptyA, emptyB, { ignoreDynamicId: 'truck-1' }),
  false,
  'carrier owner exemption remains live'
);
truck.x = 30;
assert.equal(F.sightBlocked(obstacles, emptyA, emptyB), false, 'truck movement without a version bump clears');
truck.x = 11;
assert.equal(F.sightBlocked(obstacles, emptyA, emptyB), true, 'same-time truck return blocks again');
delete obstacles.__dynamicFootprints;
assert.equal(F.sightBlocked(obstacles, emptyA, emptyB), false, 'removing the truck clears immediately');
let seed = 261453;
function rand() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
}
for (let i = 0; i < 1400; i++) {
  const a = { x: (rand() - 0.5) * 65, z: (rand() - 0.5) * 65, y: 0.2 + rand() * 3 };
  const b = { x: (rand() - 0.5) * 65, z: (rand() - 0.5) * 65, y: 0.2 + rand() * 3 };
  const fast = F.sightBlocked(obstacles, a, b);
  assert.equal(fast, !!F.sightBlocker(obstacles, a, b), 'cached sight result agrees with nearest-hit query');
}
assert.ok(field.sightRayCandidates.size <= 1024, 'ray candidate cache remains bounded');
assert.ok(field.sightRayMisses > 1024, 'test exercises cache eviction');
const oldField = F.index(obstacles);
obstacles[0].x = 30;
obstacles.__physicalVersion++;
const rebuilt = F.index(obstacles);
assert.notEqual(rebuilt, oldField, 'physical version change rebuilds the candidate cache');
assert.equal(rebuilt.sightRayCandidates.size, 0, 'no old ray candidates survive geometry rebuild');
assert.equal(F.sightBlocked(obstacles, lowA, lowB), false, 'new static geometry is authoritative');
assert.equal(F.sightBlocked(obstacles, lowA, lowB), false);
assert.equal(rebuilt.sightRayHits, 1, 'new version can cache only its own candidate list');
console.log('PASS static ray candidate cache: exact X/Z keys, live volumes and trucks, same-time changes, bounded eviction and version resets');
