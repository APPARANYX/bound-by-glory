#!/usr/bin/env node
'use strict';
/* Native wall-broadphase parity: compare the shipping module with the same
   exact geometry/collision routines running the original full wall scan.
   The second instance disables only the static index, not the safety rules. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const filename = path.resolve(__dirname, '../../battle/battle-navigation.js');
const original = fs.readFileSync(filename, 'utf8');
assert.ok(original.includes('    rebuildWallIndex();'), 'scenario rebuild includes the spatial index');
assert.ok(
  original.includes('var w = walls[candidates ? candidates[i] : i];'),
  'wall scan preserves native wall order'
);
function navigation(fullScan) {
  let src = original.replace(
    'var w = walls[candidates ? candidates[i] : i];',
    'var w = walls[candidates ? candidates[i] : i];\n      root._wallVisits++;'
  );
  src = src.replace('          out.push(id);', '          out.push(id);\n          root._wallCollections++;');
  if (fullScan) src = src.replace('    rebuildWallIndex();', '    wallIndex = null;');
  const root = {
    _wallVisits: 0,
    _wallCollections: 0,
    _queryCacheClears: 0,
    GTLog() {},
    GTMath: {
      clamp(v, lo, hi) {
        return Math.max(lo, Math.min(hi, v));
      }
    }
  };
  class ObservedMap extends Map {
    clear() {
      root._queryCacheClears++;
      return super.clear();
    }
  }
  new Function('window', 'globalThis', 'location', 'Map', src)(root, root, { search: '' }, ObservedMap);
  return { root, nav: root.BattleNavigation };
}
const fast = navigation(false);
const slow = navigation(true);
let seed = 115271;
function rand() {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
}
function scene(offset) {
  const buildings = [];
  for (let row = 0; row < 4; row++)
    for (let col = 0; col < 4; col++) {
      const id = 'test-' + row + '-' + col;
      buildings.push({
        id,
        x: (col - 1.5) * 115 + offset,
        z: (row - 1.5) * 115 - offset,
        w: 12 + (col % 2) * 4,
        d: 14 + (row % 2) * 3,
        rot: ((row + col) % 4) * 0.23,
        openings: [
          { id: id + '-door', side: 'north', offset: 0, width: 1.8, type: 'door' },
          { id: id + '-window', side: 'east', offset: 1, width: 1.1, type: 'window', bottom: 0.7, top: 1.9 }
        ]
      });
    }
  return { buildings, profile: 'default', objectives: [], roads: [] };
}
function compare(a, b) {
  assert.equal(
    fast.nav.movementClear(a, b),
    slow.nav.movementClear(a, b),
    'movement AABB/index query cannot skip a native building wall'
  );
  assert.equal(
    !!fast.nav.lineOfSightBlocked(a, b, 1.5, 1.5),
    !!slow.nav.lineOfSightBlocked(a, b, 1.5, 1.5),
    'LOS still respects native window/door aperture rules'
  );
  assert.deepEqual(
    fast.nav.resolveStep(a, b),
    slow.nav.resolveStep(a, b),
    'same first blocking wall and slide'
  );
}
for (const offset of [0, 57, -85]) {
  const scenario = scene(offset);
  fast.nav.installScenario(scenario);
  slow.nav.installScenario(scenario);
  assert.equal(fast.nav.walls.length, slow.nav.walls.length);
  for (let i = 0; i < 2800; i++) {
    const a = { x: (rand() - 0.5) * 680, z: (rand() - 0.5) * 680 };
    const length = i % 10 === 0 ? 1000 : i % 7 === 0 ? 50 : 0.1 + rand() * 12;
    const angle = rand() * 2 * Math.PI;
    const b = { x: a.x + Math.cos(angle) * length, z: a.z + Math.sin(angle) * length };
    compare(a, b);
  }
  // Near boundaries, the native start-skin, door opening and crossing order matter.
  for (const building of scenario.buildings) {
    const a = { x: building.x - 15, z: building.z };
    const b = { x: building.x + 15, z: building.z };
    compare(a, b);
    compare(b, a);
    compare(a, a);
  }
}
// Different exact rays in one cell range share only the ordered candidate list.
// Native movement and aperture tests must still run for each query.
fast.nav.installScenario(scene(0));
slow.nav.installScenario(scene(0));
compare({ x: -181, z: -172 }, { x: -163, z: -172 });
const collectionsBefore = fast.root._wallCollections,
  visitsBefore = fast.root._wallVisits,
  answers = new Set();
for (let i = 0; i < 100; i++) {
  const a = { x: -181 + i * 0.01, z: -172 + i * 0.01 },
    b = i % 2 ? { ...a } : { x: -163, z: -172 - i * 0.01 };
  const clear = fast.nav.movementClear(a, b);
  answers.add(clear);
  assert.equal(clear, slow.nav.movementClear(a, b));
  assert.equal(!!fast.nav.lineOfSightBlocked(a, b, 1.5, 1.5), !!slow.nav.lineOfSightBlocked(a, b, 1.5, 1.5));
}
assert.equal(answers.size, 2, 'cached candidate lists must still allow both clear and blocked answers');
assert.equal(
  fast.root._wallCollections - collectionsBefore,
  0,
  'unchanged cell ranges do not gather/sort the same wall IDs again'
);
assert.ok(fast.root._wallVisits > visitsBefore, 'actual wall intersection tests remain live on every query');
const doorA = { x: -172.5, z: -167.5 },
  doorB = { x: -172.5, z: -163.5 },
  north = fast.nav.walls.find(w => w.building.id === 'test-0-0' && w.side === 'north'),
  openings = north.openings;
assert.equal(fast.nav.movementClear(doorA, doorB), true, 'native door initially admits the segment');
north.openings = [];
assert.equal(fast.nav.movementClear(doorA, doorB), false, 'cached IDs still read the live aperture rules');
north.openings = openings;
assert.equal(fast.nav.movementClear(doorA, doorB), true, 'restored aperture is authoritative immediately');
// Exercise more distinct cell rectangles than the bounded cache retains.
for (let x = -5; x < 5; x++)
  for (let z = -5; z < 5; z++)
    for (let span = 0; span < 16; span++) {
      const a = { x: x * 32 + 0.5, z: z * 32 + 10.5 },
        b = { x: (x + span) * 32 + 10.5, z: a.z };
      assert.equal(fast.nav.movementClear(a, b), slow.nav.movementClear(a, b));
      assert.equal(
        !!fast.nav.lineOfSightBlocked(a, b, 1.5, 1.5),
        !!slow.nav.lineOfSightBlocked(a, b, 1.5, 1.5)
      );
    }
assert.ok(fast.root._queryCacheClears > 0, 'bounded collection cache eviction was exercised');
// Replacing a populated scenario must invalidate the old grid completely.
fast.nav.installScenario({ buildings: [], profile: 'default' });
slow.nav.installScenario({ buildings: [], profile: 'default' });
for (let i = 0; i < 100; i++) compare({ x: i - 50, z: i }, { x: -i, z: -i });
assert.ok(
  fast.root._wallVisits < slow.root._wallVisits * 0.45,
  'index must materially reduce visited walls on short, realistic movement queries: indexed=' +
    fast.root._wallVisits +
    ' full=' +
    slow.root._wallVisits
);
console.log(
  'PASS indexed wall scan matches unindexed native movement, LOS and wall slides across 8,000+ pairs and scenario resets; wall visits ' +
    fast.root._wallVisits +
    '/' +
    slow.root._wallVisits
);
