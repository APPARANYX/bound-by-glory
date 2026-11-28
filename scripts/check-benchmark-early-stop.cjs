'use strict';
// Regression for scripts/benchmark_early_stop.cjs: the standard benchmark may skip its
// remaining seeds only when the first stage is inert, errored, or decided on a line
// stricter than the final verdict's, and never with wall time near the speed gate.
const assert = require('node:assert/strict');
const { decide } = require('./benchmark_early_stop.cjs');

const counters = n => {
  const out = {};
  for (let i = 0; i < 40; i++) out['c' + i] = { a: 10, b: 10, more: 0, fewer: 0, signP: 1 };
  return Object.assign(out, n || {});
};
const base = over => ({
  pairs: 20,
  identicalBattles: 0,
  unpaired: { a: 0, b: 0 },
  runtimeErrors: { a: 0, b: 0 },
  wallSeconds: { ratio: 1.0 },
  counters: counters(),
  ...over
});

// Inert with clear wall time stops; inert near the gate plays on.
assert.equal(decide(base({ identicalBattles: 20 })).stop, true);
assert.equal(decide(base({ identicalBattles: 20, wallSeconds: { ratio: 1.2 } })).stop, false);
assert.equal(decide(base({ identicalBattles: 20, wallSeconds: { ratio: 1.3 } })).stop, false);
assert.equal(decide(base({ identicalBattles: 20, wallSeconds: { ratio: 1.4 } })).stop, true);

// Runtime errors stop (the run fails anyway).
assert.equal(decide(base({ runtimeErrors: { a: 0, b: 2 } })).stop, true);

// Quiet: changed pairs but nothing significant plays every seed.
assert.equal(decide(base()).stop, false);

// Weak: under the final Bonferroni line (0.05/40 = 0.00125) but not the interim one (0.01/40 = 0.00025) plays on.
assert.equal(
  decide(base({ counters: counters({ casualties: { a: 50, b: 80, more: 18, fewer: 2, signP: 0.0004 } }) }))
    .stop,
  false
);

// Decided: under the interim line with clear wall time stops, and says why.
const d = decide(
  base({ counters: counters({ casualties: { a: 50, b: 90, more: 20, fewer: 0, signP: 0.000002 } }) })
);
assert.equal(d.stop, true);
assert.match(d.reason, /casualties/);
// ...but not when wall time is near the gate.
assert.equal(
  decide(
    base({
      wallSeconds: { ratio: 1.22 },
      counters: counters({ casualties: { a: 50, b: 90, more: 20, fewer: 0, signP: 0.000002 } })
    })
  ).stop,
  false
);

// Missing or unpaired data never stops early.
assert.equal(decide(null).stop, false);
assert.equal(decide(base({ pairs: 0 })).stop, false);
assert.equal(decide(base({ identicalBattles: 20, unpaired: { a: 1, b: 0 } })).stop, false); // incomplete
assert.equal(
  decide(
    base({
      pairs: 20,
      unpaired: { a: 2, b: 0 },
      counters: counters({ casualties: { a: 50, b: 90, more: 20, fewer: 0, signP: 0.000002 } })
    })
  ).stop,
  false
); // 10% unpaired
assert.equal(
  decide(
    base({
      pairs: 100,
      unpaired: { a: 3, b: 0 },
      counters: counters({ casualties: { a: 50, b: 90, more: 20, fewer: 0, signP: 0.000002 } })
    })
  ).stop,
  true
); // 3% unpaired
assert.equal(decide(base({ identicalBattles: 20, wallSeconds: {} })).stop, false);

console.log('benchmark early stop: ok');
