# Benchmark run #1642 · 60 seeds from `meso771` (meeting), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerLeaderless=0&controllerAssault=0&controllerRetreat=0&controllerGrenade=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/meso771-e717141 @ e717141 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42171112348) · build v29-dev

## Verdict

**WEAK: 60 of 60 pairs changed (median first part 233.1 s); 2 of 42 counters under p 0.05 (about 2.1 by chance); casualties +7.3% (p 0.0153)**

- Under 0.05 only: geKills 551 to 608 (+10.3%, p 0.0137); casualties 1011 to 1085 (+7.3%, p 0.0153).

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x0.949 (gate 1.25)
- the 59 changed records first part at simulated second: min 179.1, p10 194.1, median 233.1, p90 271.05, max 294

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 1011 | 1085 | 1.2333 | 50 | 34 | 16 | 0.0153 |
| `usKills` | 460 | 477 | 0.2833 | 43 | 21 | 22 | 1 |
| `geKills` | 551 | 608 | 0.95 | 43 | 30 | 13 | 0.0137 |
| `fire.total` | 30471 | 29904 | -9.45 | 53 | 23 | 30 | 0.4101 |
| `fire.hits` | 2336 | 2407 | 1.1833 | 48 | 29 | 19 | 0.1934 |
| `retreatSamples` | 5976 | 6381 | 6.75 | 49 | 27 | 22 | 0.5682 |
| `movementResolver.changes` | 204035 | 205383 | 22.4667 | 59 | 37 | 22 | 0.0674 |
| `grenades.throws` | 7 | 16 | 0.15 | 6 | 5 | 1 | 0.2188 |
| `grenades.bursts` | 7 | 14 | 0.1167 | 5 | 4 | 1 | 0.375 |
| `grenades.wounded` | 9 | 20 | 0.1833 | 2 | 2 | 0 | 0.5 |
| `grenades.casualties` | 3 | 6 | 0.05 | 3 | 2 | 1 | 1 |
| `grenades.suppressed` | 12 | 47 | 0.5833 | 4 | 4 | 0 | 0.125 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 2 | 2 | 0 | 3 | 2 | 1 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 15 | 15 | 0 | 4 | 2 | 2 | 1 |
| `loopAlerts.length` | 768 | 787 | 0.3167 | 44 | 24 | 20 | 0.6516 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 42 | 34 | -0.1333 | 18 | 6 | 12 | 0.2379 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1265 | 1277 | 0.2 | 26 | 16 | 10 | 0.3269 |
| `recon.contacts` | 64 | 69 | 0.0833 | 13 | 8 | 5 | 0.5811 |
| `recon.noContact` | 705 | 704 | -0.0167 | 7 | 3 | 4 | 1 |
| `recon.timeouts` | 4 | 5 | 0.0167 | 1 | 1 | 0 | 1 |
| `recon.cancelled` | 481 | 487 | 0.1 | 25 | 14 | 11 | 0.69 |
| `recon.reportsDelivered` | 326 | 350 | 0.4 | 12 | 8 | 4 | 0.3877 |
| `recon.retriggerBlocked` | 1048 | 1052 | 0.0667 | 21 | 13 | 8 | 0.3833 |
| `squadPerformance.meanOverall` | 5051.400000000001 | 5058.500000000001 | 0.1183 | 52 | 24 | 28 | 0.6778 |
| `squadPerformance.p10Overall` | 4616.200000000002 | 4616.3 | 0.0017 | 40 | 22 | 18 | 0.6358 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4330.9 | 4345.7 | 0.2467 | 48 | 24 | 24 | 1 |
| `squadPerformance.meanMovement` | 5920.700000000002 | 5917.1 | -0.06 | 49 | 24 | 25 | 1 |
| `squadPerformance.meanControl` | 5513.2 | 5512.3 | -0.015 | 49 | 24 | 25 | 1 |
| `squadPerformance.meanCohesion` | 5329.9 | 5349.700000000001 | 0.33 | 51 | 29 | 22 | 0.4011 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

meso771-0001 179.1 s (timeline) · meso771-0022 181.05 s (timeline) · meso771-0042 182.1 s (timeline) · meso771-0017 185.1 s (timeline) · meso771-0003 193.05 s (timeline) · meso771-0024 194.1 s (timeline) · meso771-0041 196.05 s (timeline) · meso771-0013 198 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1642&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-meso771-e717141/ai_flow_live.html?bench=1642&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1642`); it opens the seed that parts earliest, and the dropdowns choose another.

