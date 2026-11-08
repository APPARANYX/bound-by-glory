# Benchmark run #1765 · 48 seeds from `pr787-m2-recon900-20261108` (meeting), windows `0+900`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr787-m2-83fb5a0 @ 83fb5a0 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42434341513) · build v29-dev

## Verdict

**MOVED: 48 of 48 pairs changed (median first part 0.15 s); 13 of 42 counters under p 0.05 (about 2.1 by chance), 9 under 0.0012; casualties -0.1% (p 0.883)**

- Clears the Bonferroni line (p < 0.0012): fire.total 35208 to 62615 (+77.8%, p 0); movementResolver.changes 193758 to 276137 (+42.5%, p 0); vacantObjectiveStalls.length 340 to 67 (-80.3%, p 0); loopAlerts.length 751 to 2050 (+173.0%, p 0); recon.cancelled 517 to 705 (+36.4%, p 0); squadPerformance.meanOverall 3810.899999999998 to 3709.5999999999995 (-2.7%, p 0); squadPerformance.meanMission 2960.3 to 2688.2999999999997 (-9.2%, p 0); squadPerformance.meanControl 4439.700000000001 to 4258.5 (-4.1%, p 0); squadPerformance.meanCohesion 4357 to 4460.5 (+2.4%, p 0).
- Under 0.05 only: squadPerformance.p10Overall 3573.5999999999995 to 3544.5 (-0.8%, p 0.0041); squadPerformance.meanMovement 4786.4 to 4782.299999999999 (-0.1%, p 0.009); recon.noContact 1078 to 945 (-12.3%, p 0.0226); usKills 1071 to 989 (-7.7%, p 0.0488).
- Wall time on/off x1.624 is over the 1.25 gate.

## Paired comparison (off against on)

- **48** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.624 (gate 1.25)
- the 48 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2342 | 2340 | -0.0417 | 46 | 22 | 24 | 0.883 |
| `usKills` | 1071 | 989 | -1.7083 | 44 | 15 | 29 | 0.0488 |
| `geKills` | 1271 | 1351 | 1.6667 | 45 | 26 | 19 | 0.3713 |
| `fire.total` | 35208 | 62615 | 570.9792 | 48 | 47 | 1 | 0 |
| `fire.hits` | 5217 | 5180 | -0.7708 | 48 | 25 | 23 | 0.8854 |
| `retreatSamples` | 133391 | 163440 | 626.0208 | 48 | 31 | 17 | 0.0595 |
| `movementResolver.changes` | 193758 | 276137 | 1716.2292 | 48 | 47 | 1 | 0 |
| `grenades.throws` | 35 | 35 | 0 | 19 | 13 | 6 | 0.1671 |
| `grenades.bursts` | 35 | 35 | 0 | 19 | 13 | 6 | 0.1671 |
| `grenades.wounded` | 50 | 20 | -0.625 | 12 | 7 | 5 | 0.7744 |
| `grenades.casualties` | 15 | 4 | -0.2292 | 8 | 3 | 5 | 0.7266 |
| `grenades.suppressed` | 113 | 48 | -1.3542 | 14 | 9 | 5 | 0.424 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 2 | 1 | 1 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 5 | 10 | 0.1042 | 8 | 6 | 2 | 0.2891 |
| `movementStalls.length` | 0 | 3 | 0.0625 | 1 | 1 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 340 | 67 | -5.6875 | 47 | 3 | 44 | 0 |
| `loopAlerts.length` | 751 | 2050 | 27.0625 | 48 | 44 | 4 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 280 | 351 | 1.4792 | 42 | 25 | 17 | 0.28 |
| `stallOutcomes.wakes` | 12 | 6 | -0.125 | 13 | 4 | 9 | 0.2668 |
| `stallOutcomes.repeats` | 6 | 3 | -0.0625 | 8 | 3 | 5 | 0.7266 |
| `timeline.stalledOnsets` | 0 | 3 | 0.0625 | 1 | 1 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 81 | 1.6875 | 1 | 1 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 3 | 0.0625 | 1 | 1 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 81 | 1.6875 | 1 | 1 | 0 | 1 |
| `recon.orders` | 1791 | 1883 | 1.9167 | 47 | 26 | 21 | 0.5601 |
| `recon.contacts` | 102 | 123 | 0.4375 | 36 | 22 | 14 | 0.243 |
| `recon.noContact` | 1078 | 945 | -2.7708 | 44 | 14 | 30 | 0.0226 |
| `recon.timeouts` | 21 | 22 | 0.0208 | 22 | 12 | 10 | 0.8318 |
| `recon.cancelled` | 517 | 705 | 3.9167 | 46 | 39 | 7 | 0 |
| `recon.reportsDelivered` | 466 | 587 | 2.5208 | 42 | 25 | 17 | 0.28 |
| `recon.retriggerBlocked` | 1385 | 1451 | 1.375 | 40 | 23 | 17 | 0.4296 |
| `squadPerformance.meanOverall` | 3810.899999999998 | 3709.5999999999995 | -2.1104 | 47 | 2 | 45 | 0 |
| `squadPerformance.p10Overall` | 3573.5999999999995 | 3544.5 | -0.6062 | 25 | 5 | 20 | 0.0041 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 2960.3 | 2688.2999999999997 | -5.6667 | 47 | 3 | 44 | 0 |
| `squadPerformance.meanMovement` | 4786.4 | 4782.299999999999 | -0.0854 | 34 | 9 | 25 | 0.009 |
| `squadPerformance.meanControl` | 4439.700000000001 | 4258.5 | -3.775 | 47 | 7 | 40 | 0 |
| `squadPerformance.meanCohesion` | 4357 | 4460.5 | 2.1563 | 48 | 39 | 9 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr787-m2-recon900-20261108-0001 0.15 s (timeline) · pr787-m2-recon900-20261108-0002 0.15 s (timeline) · pr787-m2-recon900-20261108-0003 0.15 s (timeline) · pr787-m2-recon900-20261108-0004 0.15 s (timeline) · pr787-m2-recon900-20261108-0005 0.15 s (timeline) · pr787-m2-recon900-20261108-0006 0.15 s (timeline) · pr787-m2-recon900-20261108-0007 0.15 s (timeline) · pr787-m2-recon900-20261108-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1765&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr787-m2-83fb5a0/ai_flow_live.html?bench=1765&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1765`); it opens the seed that parts earliest, and the dropdowns choose another.

