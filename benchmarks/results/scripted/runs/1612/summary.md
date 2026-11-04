# Benchmark run #1612 · 100 seeds from `grenade759` (ge-defend), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerGrenade=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- claude/project-thread-ht54wj @ fa7efc9 · [run](https://github.com/APPARANYX/grasstex/actions/runs/41904176849) · build v29-dev

## Verdict

**QUIET: 29 of 87 pairs changed (median first part 223.05 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties +0.9% (p 0.6875)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **87** pairs (unpaired: off 0, on 0) · identical in every field: **58** · runtime errors off 0 / on 0 · wall time on/off x0.993 (gate 1.25)
- the 7 changed records first part at simulated second: min 183, p10 183, median 223.05, p90 274.05, max 274.05

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 1384 | 1397 | 0.1494 | 6 | 4 | 2 | 0.6875 |
| `usKills` | 520 | 527 | 0.0805 | 4 | 3 | 1 | 0.625 |
| `geKills` | 864 | 870 | 0.069 | 4 | 2 | 2 | 1 |
| `fire.total` | 35087 | 35255 | 1.931 | 6 | 4 | 2 | 0.6875 |
| `fire.hits` | 2997 | 3066 | 0.7931 | 5 | 2 | 3 | 1 |
| `retreatSamples` | 9264 | 9242 | -0.2529 | 5 | 4 | 1 | 0.375 |
| `movementResolver.changes` | 172215 | 172520 | 3.5057 | 7 | 6 | 1 | 0.125 |
| `grenades.throws` | 32 | 38 | 0.069 | 3 | 3 | 0 | 0.25 |
| `grenades.bursts` | 28 | 34 | 0.069 | 3 | 3 | 0 | 0.25 |
| `grenades.wounded` | 24 | 30 | 0.069 | 2 | 2 | 0 | 0.5 |
| `grenades.casualties` | 10 | 12 | 0.023 | 3 | 2 | 1 | 1 |
| `grenades.suppressed` | 46 | 78 | 0.3678 | 4 | 3 | 1 | 0.625 |
| `grenades.friendlyWounded` | 1 | 3 | 0.023 | 1 | 1 | 0 | 1 |
| `grenades.friendlyCasualties` | 1 | 2 | 0.0115 | 1 | 1 | 0 | 1 |
| `grenades.aborted` | 7 | 9 | 0.023 | 4 | 3 | 1 | 0.625 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 737 | 743 | 0.069 | 4 | 3 | 1 | 0.625 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 130 | 129 | -0.0115 | 3 | 1 | 2 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2194 | 2194 | 0 | 6 | 2 | 4 | 0.6875 |
| `recon.contacts` | 371 | 374 | 0.0345 | 1 | 1 | 0 | 1 |
| `recon.noContact` | 595 | 594 | -0.0115 | 1 | 0 | 1 | 1 |
| `recon.timeouts` | 36 | 36 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 1099 | 1100 | 0.0115 | 6 | 4 | 2 | 0.6875 |
| `recon.reportsDelivered` | 1538 | 1532 | -0.069 | 3 | 1 | 2 | 1 |
| `recon.retriggerBlocked` | 764 | 765 | 0.0115 | 1 | 1 | 0 | 1 |
| `squadPerformance.meanOverall` | 7499.9000000000015 | 7493.500000000001 | -0.0736 | 6 | 1 | 5 | 0.2188 |
| `squadPerformance.p10Overall` | 6790.000000000004 | 6784.300000000003 | -0.0655 | 5 | 1 | 4 | 0.375 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 6686.700000000001 | 6675.600000000001 | -0.1276 | 6 | 2 | 4 | 0.6875 |
| `squadPerformance.meanMovement` | 8649.999999999996 | 8650.199999999997 | 0.0023 | 6 | 4 | 2 | 0.6875 |
| `squadPerformance.meanControl` | 8265.500000000004 | 8261.700000000004 | -0.0437 | 4 | 1 | 3 | 0.625 |
| `squadPerformance.meanCohesion` | 7577.299999999999 | 7574.699999999999 | -0.0299 | 6 | 3 | 3 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 7 seeds that part earliest (simulated seconds)

grenade759-0046 183 s (timeline) · grenade759-0058 186 s (timeline) · grenade759-0021 215.1 s (timeline) · grenade759-0005 223.05 s (timeline) · grenade759-0081 237 s (timeline) · grenade759-0036 248.1 s (timeline) · grenade759-0077 274.05 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1612&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1612`); it opens the seed that parts earliest, and the dropdowns choose another.

