#!/usr/bin/env node
'use strict';
/* Spread N seeds over at most M shards for the standard benchmark's seeds mode:
 *   node scripts/plan_benchmark_shards.cjs <seeds> [maxShards=20] [firstSeed=0] [firstShard=1]
 * Prints a JSON array of {shard, first, count}: every seed `<prefix>-0001` to `<prefix>-<seeds>` exactly once, in order, the
 * shards balanced to within one seed (the first `seeds mod shards` of them take the extra). Fewer seeds than shards is one
 * seed a shard. Each shard plays `count` seeds from `first` (BATTLE_BENCHMARK_FIRST), both arms, on one runner.
 * firstSeed/firstShard offset a later stage (early stop): its seeds and shard numbers follow the first stage's. */
function plan(seeds, maxShards = 20, firstSeed = 0, firstShard = 1) {
  if (!Number.isInteger(seeds) || seeds < 1)
    throw new Error(`seeds must be a whole number of 1 or more, got ${seeds}`);
  if (!Number.isInteger(maxShards) || maxShards < 1)
    throw new Error(`maxShards must be a whole number of 1 or more, got ${maxShards}`);
  const shards = Math.min(seeds, maxShards),
    base = Math.floor(seeds / shards),
    extra = seeds % shards,
    out = [];
  let first = firstSeed;
  for (let k = 0; k < shards; k++) {
    const count = base + (k < extra ? 1 : 0);
    out.push({ shard: firstShard + k, first, count });
    first += count;
  }
  return out;
}
if (require.main === module) {
  try {
    console.log(
      JSON.stringify(
        plan(
          Number(process.argv[2]),
          process.argv[3] === undefined ? 20 : Number(process.argv[3]),
          process.argv[4] === undefined ? 0 : Number(process.argv[4]),
          process.argv[5] === undefined ? 1 : Number(process.argv[5])
        )
      )
    );
  } catch (e) {
    console.error(e.message);
    process.exit(2);
  }
}
module.exports = { plan };
