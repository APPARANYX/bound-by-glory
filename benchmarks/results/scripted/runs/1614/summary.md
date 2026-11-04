# Benchmark run #1614 · 60 seeds from `vret` (meeting), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&localPlan=1&localTasks=1&localStructures=1&localEntry=1&localEntryGate=1&localSurvey=1&localWatch=1&localContactResume=1&localContinuity=1&localStructureOrders=1&controllerRetreat=0` · **ON** flags: `tacticalController=new&strategicInterception=0&localPlan=1&localTasks=1&localStructures=1&localEntry=1&localEntryGate=1&localSurvey=1&localWatch=1&localContactResume=1&localContinuity=1&localStructureOrders=1`
- work/pin/retreat-9fade817 @ 9fade81 · [run](https://github.com/APPARANYX/grasstex/actions/runs/41905094436) · build v29-dev

## Verdict

**QUIET: 56 of 57 pairs changed (median first part 258.07500000000005 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties -2.1% (p 0.766)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **57** pairs (unpaired: off 0, on 0) · identical in every field: **1** · runtime errors off 0 / on 0 · wall time on/off x0.943 (gate 1.25)
- the 50 changed records first part at simulated second: min 189, p10 220.05, median 258.07500000000005, p90 292.05, max 307.05

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 1072 | 1049 | -0.4035 | 45 | 21 | 24 | 0.766 |
| `usKills` | 471 | 463 | -0.1404 | 37 | 21 | 16 | 0.5114 |
| `geKills` | 601 | 586 | -0.2632 | 41 | 16 | 25 | 0.211 |
| `fire.total` | 29939 | 29950 | 0.193 | 48 | 25 | 23 | 0.8854 |
| `fire.hits` | 2384 | 2339 | -0.7895 | 41 | 21 | 20 | 1 |
| `retreatSamples` | 6823 | 6909 | 1.5088 | 39 | 20 | 19 | 1 |
| `movementResolver.changes` | 197216 | 198309 | 19.1754 | 50 | 31 | 19 | 0.1189 |
| `grenades.throws` | 18 | 17 | -0.0175 | 6 | 2 | 4 | 0.6875 |
| `grenades.bursts` | 16 | 17 | 0.0175 | 4 | 2 | 2 | 1 |
| `grenades.wounded` | 16 | 26 | 0.1754 | 5 | 4 | 1 | 0.375 |
| `grenades.casualties` | 4 | 8 | 0.0702 | 1 | 1 | 0 | 1 |
| `grenades.suppressed` | 43 | 54 | 0.193 | 4 | 4 | 0 | 0.125 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 4 | 3 | -0.0175 | 1 | 0 | 1 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 9 | 8 | -0.0175 | 7 | 3 | 4 | 1 |
| `loopAlerts.length` | 755 | 758 | 0.0526 | 22 | 12 | 10 | 0.8318 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 40 | 43 | 0.0526 | 12 | 7 | 5 | 0.7744 |
| `stallOutcomes.wakes` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1134 | 1135 | 0.0175 | 15 | 7 | 8 | 1 |
| `recon.contacts` | 46 | 41 | -0.0877 | 5 | 0 | 5 | 0.0625 |
| `recon.noContact` | 645 | 647 | 0.0351 | 4 | 3 | 1 | 0.625 |
| `recon.timeouts` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 426 | 431 | 0.0877 | 10 | 7 | 3 | 0.3438 |
| `recon.reportsDelivered` | 283 | 259 | -0.4211 | 7 | 1 | 6 | 0.125 |
| `recon.retriggerBlocked` | 976 | 974 | -0.0351 | 11 | 5 | 6 | 1 |
| `squadPerformance.meanOverall` | 4784.4 | 4782.999999999998 | -0.0246 | 44 | 20 | 24 | 0.6516 |
| `squadPerformance.p10Overall` | 4374 | 4390.099999999999 | 0.2825 | 26 | 15 | 11 | 0.5572 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4073.3 | 4052.5 | -0.3649 | 41 | 22 | 19 | 0.7552 |
| `squadPerformance.meanMovement` | 5618.9000000000015 | 5621.400000000001 | 0.0439 | 37 | 20 | 17 | 0.7428 |
| `squadPerformance.meanControl` | 5231.200000000001 | 5240.3 | 0.1596 | 41 | 21 | 20 | 1 |
| `squadPerformance.meanCohesion` | 5126.999999999999 | 5146.700000000001 | 0.3456 | 41 | 22 | 19 | 0.7552 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

vret-0004 189 s (stress) · vret-0036 207 s (timeline) · vret-0033 210 s (timeline) · vret-0007 219 s (timeline) · vret-0048 220.05 s (timeline) · vret-0010 221.1 s (timeline) · vret-0040 221.1 s (timeline) · vret-0042 227.1 s (stress)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1614&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-retreat-9fade817/ai_flow_live.html?bench=1614&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1614`); it opens the seed that parts earliest, and the dropdowns choose another.

