# Benchmark run #1745 · 60 seeds from `pr787-m0m1-20261107` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr787-main-aed0165 @ aed0165 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42423014887) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 17 of 42 counters under p 0.05 (about 2.1 by chance), 10 under 0.0012; casualties -6.4% (p 0.0479)**

- Clears the Bonferroni line (p < 0.0012): fire.total 41097 to 69223 (+68.4%, p 0); movementResolver.changes 219128 to 310603 (+41.7%, p 0); vacantObjectiveStalls.length 276 to 59 (-78.6%, p 0); loopAlerts.length 853 to 2167 (+154.0%, p 0); recon.noContact 1091 to 934 (-14.4%, p 0); recon.cancelled 464 to 708 (+52.6%, p 0); squadPerformance.meanOverall 4791.500000000001 to 4685.599999999999 (-2.2%, p 0); squadPerformance.meanMission 3733.3999999999996 to 3427.8999999999996 (-8.2%, p 0); squadPerformance.meanControl 5590.4 to 5391 (-3.6%, p 0); squadPerformance.meanCohesion 5440.500000000001 to 5598.999999999999 (+2.9%, p 0).
- Under 0.05 only: squadPerformance.meanMovement 5984.300000000003 to 5979.9 (-0.1%, p 0.0079); recon.retriggerBlocked 1330 to 1435 (+7.9%, p 0.0127); recon.reportsDelivered 485 to 595 (+22.7%, p 0.0175); grenades.aborted 5 to 17 (+240.0%, p 0.0225); retreatSamples 109346 to 132627 (+21.3%, p 0.0273); recon.orders 1722 to 1860 (+8.0%, p 0.044); casualties 2774 to 2596 (-6.4%, p 0.0479).
- Wall time on/off x1.528 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.528 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2774 | 2596 | -2.9667 | 58 | 21 | 37 | 0.0479 |
| `usKills` | 1257 | 1139 | -1.9667 | 56 | 24 | 32 | 0.3497 |
| `geKills` | 1517 | 1457 | -1 | 58 | 28 | 30 | 0.8957 |
| `fire.total` | 41097 | 69223 | 468.7667 | 60 | 56 | 4 | 0 |
| `fire.hits` | 6294 | 5836 | -7.6333 | 59 | 22 | 37 | 0.0674 |
| `retreatSamples` | 109346 | 132627 | 388.0167 | 60 | 39 | 21 | 0.0273 |
| `movementResolver.changes` | 219128 | 310603 | 1524.5833 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 47 | 63 | 0.2667 | 26 | 18 | 8 | 0.0755 |
| `grenades.bursts` | 47 | 61 | 0.2333 | 25 | 17 | 8 | 0.1078 |
| `grenades.wounded` | 44 | 54 | 0.1667 | 15 | 10 | 5 | 0.3018 |
| `grenades.casualties` | 16 | 20 | 0.0667 | 13 | 7 | 6 | 1 |
| `grenades.suppressed` | 89 | 119 | 0.5 | 17 | 10 | 7 | 0.6291 |
| `grenades.friendlyWounded` | 0 | 4 | 0.0667 | 3 | 3 | 0 | 0.25 |
| `grenades.friendlyCasualties` | 0 | 2 | 0.0333 | 1 | 1 | 0 | 1 |
| `grenades.aborted` | 5 | 17 | 0.2 | 13 | 11 | 2 | 0.0225 |
| `movementStalls.length` | 2 | 0 | -0.0333 | 1 | 0 | 1 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 276 | 59 | -3.6167 | 57 | 4 | 53 | 0 |
| `loopAlerts.length` | 853 | 2167 | 21.9 | 60 | 57 | 3 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 256 | 319 | 1.05 | 52 | 33 | 19 | 0.0704 |
| `stallOutcomes.wakes` | 11 | 6 | -0.0833 | 13 | 5 | 8 | 0.5811 |
| `stallOutcomes.repeats` | 4 | 1 | -0.05 | 4 | 1 | 3 | 0.625 |
| `timeline.stalledOnsets` | 2 | 0 | -0.0333 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamples` | 34 | 0 | -0.5667 | 1 | 0 | 1 | 1 |
| `timeline.stalledOnsetsRepeated` | 2 | 0 | -0.0333 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamplesRepeated` | 34 | 0 | -0.5667 | 1 | 0 | 1 | 1 |
| `recon.orders` | 1722 | 1860 | 2.3 | 56 | 36 | 20 | 0.044 |
| `recon.contacts` | 104 | 116 | 0.2 | 49 | 29 | 20 | 0.2529 |
| `recon.noContact` | 1091 | 934 | -2.6167 | 56 | 12 | 44 | 0 |
| `recon.timeouts` | 17 | 6 | -0.1833 | 21 | 6 | 15 | 0.0784 |
| `recon.cancelled` | 464 | 708 | 4.0667 | 55 | 48 | 7 | 0 |
| `recon.reportsDelivered` | 485 | 595 | 1.8333 | 52 | 35 | 17 | 0.0175 |
| `recon.retriggerBlocked` | 1330 | 1435 | 1.75 | 53 | 36 | 17 | 0.0127 |
| `squadPerformance.meanOverall` | 4791.500000000001 | 4685.599999999999 | -1.765 | 59 | 5 | 54 | 0 |
| `squadPerformance.p10Overall` | 4474.700000000001 | 4466.599999999999 | -0.135 | 31 | 12 | 19 | 0.281 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3733.3999999999996 | 3427.8999999999996 | -5.0917 | 60 | 9 | 51 | 0 |
| `squadPerformance.meanMovement` | 5984.300000000003 | 5979.9 | -0.0733 | 42 | 12 | 30 | 0.0079 |
| `squadPerformance.meanControl` | 5590.4 | 5391 | -3.3233 | 60 | 9 | 51 | 0 |
| `squadPerformance.meanCohesion` | 5440.500000000001 | 5598.999999999999 | 2.6417 | 58 | 48 | 10 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr787-m0m1-20261107-0001 0.15 s (timeline) · pr787-m0m1-20261107-0002 0.15 s (timeline) · pr787-m0m1-20261107-0003 0.15 s (timeline) · pr787-m0m1-20261107-0004 0.15 s (timeline) · pr787-m0m1-20261107-0005 0.15 s (timeline) · pr787-m0m1-20261107-0006 0.15 s (timeline) · pr787-m0m1-20261107-0007 0.15 s (timeline) · pr787-m0m1-20261107-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1745&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr787-main-aed0165/ai_flow_live.html?bench=1745&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1745`); it opens the seed that parts earliest, and the dropdowns choose another.

