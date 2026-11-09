# Benchmark run #1817 · 60 seeds from `pr797-micro-u-20261109` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr797-5d7cc87 @ 5d7cc87 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42566369596) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 21 of 42 counters under p 0.05 (about 2.1 by chance), 13 under 0.0012; casualties -17.9% (p 0)**

- Clears the Bonferroni line (p < 0.0012): casualties 2633 to 2162 (-17.9%, p 0); fire.total 39226 to 75181 (+91.7%, p 0); movementResolver.changes 217738 to 397006 (+82.3%, p 0); vacantObjectiveStalls.length 329 to 40 (-87.8%, p 0); loopAlerts.length 784 to 2769 (+253.2%, p 0); regroups.entries 246 to 430 (+74.8%, p 0); recon.noContact 1142 to 879 (-23.0%, p 0); squadPerformance.meanOverall 4796.300000000001 to 4652.2 (-3.0%, p 0); squadPerformance.p10Overall 4475.3 to 4452.999999999999 (-0.5%, p 0); squadPerformance.meanMission 3743.3 to 3442.7 (-8.0%, p 0); squadPerformance.meanMovement 5983.200000000001 to 5975.499999999999 (-0.1%, p 0); squadPerformance.meanControl 5603.6 to 5289.4000000000015 (-5.6%, p 0); recon.orders 1837 to 1641 (-10.7%, p 0.001).
- Under 0.05 only: usKills 1242 to 989 (-20.4%, p 0.0022); grenades.aborted 1 to 13 (+1200.0%, p 0.0039); squadPerformance.meanCohesion 5430.300000000001 to 5352.6 (-1.4%, p 0.0062); grenades.throws 26 to 62 (+138.5%, p 0.0094); grenades.bursts 26 to 62 (+138.5%, p 0.0094); geKills 1391 to 1173 (-15.7%, p 0.0119); fire.hits 5931 to 5088 (-14.2%, p 0.0135); recon.cancelled 498 to 555 (+11.4%, p 0.027).
- Wall time on/off x1.948 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.948 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2633 | 2162 | -7.85 | 58 | 8 | 50 | 0 |
| `usKills` | 1242 | 989 | -4.2167 | 58 | 17 | 41 | 0.0022 |
| `geKills` | 1391 | 1173 | -3.6333 | 58 | 19 | 39 | 0.0119 |
| `fire.total` | 39226 | 75181 | 599.25 | 60 | 55 | 5 | 0 |
| `fire.hits` | 5931 | 5088 | -14.05 | 60 | 20 | 40 | 0.0135 |
| `retreatSamples` | 98948 | 99139 | 3.1833 | 59 | 32 | 27 | 0.6029 |
| `movementResolver.changes` | 217738 | 397006 | 2987.8 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 26 | 62 | 0.6 | 26 | 20 | 6 | 0.0094 |
| `grenades.bursts` | 26 | 62 | 0.6 | 26 | 20 | 6 | 0.0094 |
| `grenades.wounded` | 24 | 41 | 0.2833 | 12 | 8 | 4 | 0.3877 |
| `grenades.casualties` | 9 | 15 | 0.1 | 10 | 7 | 3 | 0.3438 |
| `grenades.suppressed` | 52 | 89 | 0.6167 | 15 | 11 | 4 | 0.1185 |
| `grenades.friendlyWounded` | 2 | 1 | -0.0167 | 2 | 1 | 1 | 1 |
| `grenades.friendlyCasualties` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.aborted` | 1 | 13 | 0.2 | 9 | 9 | 0 | 0.0039 |
| `movementStalls.length` | 6 | 0 | -0.1 | 1 | 0 | 1 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 329 | 40 | -4.8167 | 55 | 0 | 55 | 0 |
| `loopAlerts.length` | 784 | 2769 | 33.0833 | 59 | 57 | 2 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 246 | 430 | 3.0667 | 59 | 47 | 12 | 0 |
| `stallOutcomes.wakes` | 8 | 5 | -0.05 | 9 | 3 | 6 | 0.5078 |
| `stallOutcomes.repeats` | 4 | 1 | -0.05 | 5 | 1 | 4 | 0.375 |
| `timeline.stalledOnsets` | 6 | 0 | -0.1 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamples` | 418 | 0 | -6.9667 | 1 | 0 | 1 | 1 |
| `timeline.stalledOnsetsRepeated` | 6 | 0 | -0.1 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamplesRepeated` | 418 | 0 | -6.9667 | 1 | 0 | 1 | 1 |
| `recon.orders` | 1837 | 1641 | -3.2667 | 55 | 15 | 40 | 0.001 |
| `recon.contacts` | 100 | 129 | 0.4833 | 49 | 31 | 18 | 0.0854 |
| `recon.noContact` | 1142 | 879 | -4.3833 | 58 | 4 | 54 | 0 |
| `recon.timeouts` | 24 | 10 | -0.2333 | 27 | 8 | 19 | 0.0522 |
| `recon.cancelled` | 498 | 555 | 0.95 | 53 | 35 | 18 | 0.027 |
| `recon.reportsDelivered` | 497 | 525 | 0.4667 | 55 | 27 | 28 | 1 |
| `recon.retriggerBlocked` | 1410 | 1370 | -0.6667 | 54 | 25 | 29 | 0.6835 |
| `squadPerformance.meanOverall` | 4796.300000000001 | 4652.2 | -2.4017 | 60 | 3 | 57 | 0 |
| `squadPerformance.p10Overall` | 4475.3 | 4452.999999999999 | -0.3717 | 37 | 6 | 31 | 0 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3743.3 | 3442.7 | -5.01 | 59 | 8 | 51 | 0 |
| `squadPerformance.meanMovement` | 5983.200000000001 | 5975.499999999999 | -0.1283 | 50 | 6 | 44 | 0 |
| `squadPerformance.meanControl` | 5603.6 | 5289.4000000000015 | -5.2367 | 60 | 4 | 56 | 0 |
| `squadPerformance.meanCohesion` | 5430.300000000001 | 5352.6 | -1.295 | 60 | 19 | 41 | 0.0062 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr797-micro-u-20261109-0001 0.15 s (timeline) · pr797-micro-u-20261109-0002 0.15 s (timeline) · pr797-micro-u-20261109-0003 0.15 s (timeline) · pr797-micro-u-20261109-0004 0.15 s (timeline) · pr797-micro-u-20261109-0005 0.15 s (timeline) · pr797-micro-u-20261109-0006 0.15 s (timeline) · pr797-micro-u-20261109-0007 0.15 s (timeline) · pr797-micro-u-20261109-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1817&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr797-5d7cc87/ai_flow_live.html?bench=1817&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1817`); it opens the seed that parts earliest, and the dropdowns choose another.

