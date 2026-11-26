#!/usr/bin/env node
'use strict';
/* Early stop for the standard paired benchmark (battle-benchmark-standard.yml, seeds mode).
 *   node scripts/benchmark_early_stop.cjs compare.json      prints {"stop":bool,"reason":"..."}
 * The workflow plays a first stage of seeds (default 20), compares the arms, and asks this whether the result is
 * already clear. Only then does it skip the rest of the seeds. Clear means one of:
 *   - inert: every pair identical in every field (more seeds of an identical run add nothing);
 *   - errored: a runtime error in either arm (the run fails whatever the rest says);
 *   - decided: some counter's sign test clears a STRICTER line than the final verdict's Bonferroni line
 *     (p < 0.01 / counters instead of 0.05 / counters), so looking twice cannot inflate a false "moved";
 * and, for inert or decided, the median wall-time ratio is clearly away from the 1.25 speed gate
 * (below 1.15 or above 1.35), because 20 seeds put the median too close to call near the gate.
 * Anything else (quiet, weak, incomplete, no pairs, over 5% unpaired windows, wall time near the gate) plays every seed.
 * Nothing is tuned to a result: the lines are derived from the final verdict's own thresholds. */
const fs = require('node:fs');

const INTERIM_ALPHA = 0.01; // final verdict uses 0.05 (format_benchmark_compare.cjs)
const WALL_GATE = 1.25; // compare_benchmark_arms.cjs GATE
const WALL_MARGIN = 0.1;
const MAX_UNPAIRED = 0.05;

function decide(r) {
  if (!r || !r.pairs) return { stop: false, reason: 'no pairs yet: play every seed' };
  const errors =
    ((r.runtimeErrors && r.runtimeErrors.a) || 0) + ((r.runtimeErrors && r.runtimeErrors.b) || 0);
  if (errors)
    return {
      stop: true,
      reason: `runtime errors (off ${r.runtimeErrors.a}, on ${r.runtimeErrors.b}): the run fails anyway`
    };
  const unpaired = ((r.unpaired && r.unpaired.a) || 0) + ((r.unpaired && r.unpaired.b) || 0);
  // A window only one arm reached is a real difference (the battle ended sooner), and a few are normal in meetings; many
  // mean the stage is not comparable yet. Inert-but-unpaired is the verdict's INCOMPLETE and never stops.
  if (unpaired > MAX_UNPAIRED * r.pairs)
    return {
      stop: false,
      reason: `${unpaired} unpaired records (over ${MAX_UNPAIRED * 100}% of ${r.pairs}): play every seed`
    };
  const ratio = r.wallSeconds && r.wallSeconds.ratio;
  const wallClear =
    typeof ratio === 'number' && (ratio < WALL_GATE - WALL_MARGIN || ratio > WALL_GATE + WALL_MARGIN);
  const changed = r.pairs - (r.identicalBattles || 0);
  if (!changed) {
    if (unpaired)
      return { stop: false, reason: `incomplete: pairs identical but ${unpaired} unpaired: play every seed` };
    return wallClear
      ? { stop: true, reason: `inert: all ${r.pairs} pairs identical, wall ratio ${ratio}` }
      : {
          stop: false,
          reason: `inert but wall ratio ${ratio} is near the ${WALL_GATE} gate: play every seed`
        };
  }
  const counters = Object.entries(r.counters || {});
  const line = INTERIM_ALPHA / Math.max(1, counters.length);
  const decided = counters
    .filter(([, c]) => c.more + c.fewer > 0 && c.signP < line)
    .map(([n, c]) => `${n} (p ${c.signP})`);
  if (decided.length && wallClear)
    return {
      stop: true,
      reason: `decided at ${r.pairs} seeds: ${decided.join(', ')} under ${line.toFixed(5)}; wall ratio ${ratio}`
    };
  if (decided.length)
    return {
      stop: false,
      reason: `effect is clear but wall ratio ${ratio} is near the gate: play every seed`
    };
  return {
    stop: false,
    reason: `not decided at ${r.pairs} seeds (no counter under ${line.toFixed(5)}): play every seed`
  };
}

if (require.main === module) {
  const file = process.argv[2];
  let r = null;
  try {
    r = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    console.log(
      JSON.stringify({ stop: false, reason: `no readable comparison (${e.message}): play every seed` })
    );
    process.exit(0);
  }
  console.log(JSON.stringify(decide(r)));
}
module.exports = { decide, INTERIM_ALPHA, WALL_GATE, WALL_MARGIN, MAX_UNPAIRED };
