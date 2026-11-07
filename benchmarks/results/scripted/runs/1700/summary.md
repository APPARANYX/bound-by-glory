# Benchmark run #1700 · 20 seeds from `controller-natural-20261026` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/pin/pr779-1e6f4bb @ 1e6f4bb · [run](https://github.com/APPARANYX/grasstex/actions/runs/42339229365) · build v29-dev

## Verdict

**MOVED: 20 of 20 pairs changed (median first part 0.15 s); 12 of 42 counters under p 0.05 (about 2.1 by chance), 8 under 0.0012; casualties -6.7% (p 0.6476)**

- Clears the Bonferroni line (p < 0.0012): fire.total 14072 to 23611 (+67.8%, p 0); movementResolver.changes 71758 to 100410 (+39.9%, p 0); vacantObjectiveStalls.length 103 to 14 (-86.4%, p 0); loopAlerts.length 280 to 732 (+161.4%, p 0.0004); squadPerformance.meanOverall 1591.8999999999999 to 1556.7 (-2.2%, p 0.0004); squadPerformance.meanMission 1227.6999999999998 to 1141.3 (-7.0%, p 0.0004); squadPerformance.meanControl 1882.5 to 1786.0000000000002 (-5.1%, p 0.0004); squadPerformance.meanCohesion 1818.8000000000002 to 1859.1999999999998 (+2.2%, p 0.0004).
- Under 0.05 only: recon.cancelled 155 to 238 (+53.5%, p 0.0026); squadPerformance.meanMovement 1995.6000000000004 to 1992.1999999999998 (-0.2%, p 0.0044); recon.noContact 368 to 313 (-14.9%, p 0.0118); recon.retriggerBlocked 439 to 479 (+9.1%, p 0.049).
- Wall time on/off x1.523 is over the 1.25 gate.

## Paired comparison (off against on)

- **20** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.523 (gate 1.25)
- the 20 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 923 | 861 | -3.1 | 19 | 8 | 11 | 0.6476 |
| `usKills` | 459 | 358 | -5.05 | 19 | 6 | 13 | 0.1671 |
| `geKills` | 464 | 503 | 1.95 | 17 | 9 | 8 | 1 |
| `fire.total` | 14072 | 23611 | 476.95 | 20 | 20 | 0 | 0 |
| `fire.hits` | 2100 | 2007 | -4.65 | 20 | 8 | 12 | 0.5034 |
| `retreatSamples` | 40913 | 42133 | 61 | 20 | 12 | 8 | 0.5034 |
| `movementResolver.changes` | 71758 | 100410 | 1432.6 | 20 | 20 | 0 | 0 |
| `grenades.throws` | 1 | 10 | 0.45 | 8 | 7 | 1 | 0.0703 |
| `grenades.bursts` | 1 | 10 | 0.45 | 8 | 7 | 1 | 0.0703 |
| `grenades.wounded` | 1 | 7 | 0.3 | 4 | 3 | 1 | 0.625 |
| `grenades.casualties` | 0 | 3 | 0.15 | 3 | 3 | 0 | 0.25 |
| `grenades.suppressed` | 0 | 13 | 0.65 | 5 | 5 | 0 | 0.0625 |
| `grenades.friendlyWounded` | 0 | 1 | 0.05 | 1 | 1 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 1 | 0.05 | 1 | 1 | 0 | 1 |
| `grenades.aborted` | 2 | 3 | 0.05 | 3 | 2 | 1 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 103 | 14 | -4.45 | 19 | 0 | 19 | 0 |
| `loopAlerts.length` | 280 | 732 | 22.6 | 20 | 18 | 2 | 0.0004 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 76 | 97 | 1.05 | 15 | 10 | 5 | 0.3018 |
| `stallOutcomes.wakes` | 2 | 2 | 0 | 4 | 2 | 2 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 569 | 613 | 2.2 | 19 | 10 | 9 | 1 |
| `recon.contacts` | 25 | 37 | 0.6 | 16 | 11 | 5 | 0.2101 |
| `recon.noContact` | 368 | 313 | -2.75 | 20 | 4 | 16 | 0.0118 |
| `recon.timeouts` | 6 | 5 | -0.05 | 9 | 4 | 5 | 1 |
| `recon.cancelled` | 155 | 238 | 4.15 | 20 | 17 | 3 | 0.0026 |
| `recon.reportsDelivered` | 134 | 197 | 3.15 | 19 | 12 | 7 | 0.3593 |
| `recon.retriggerBlocked` | 439 | 479 | 2 | 17 | 13 | 4 | 0.049 |
| `squadPerformance.meanOverall` | 1591.8999999999999 | 1556.7 | -1.76 | 20 | 2 | 18 | 0.0004 |
| `squadPerformance.p10Overall` | 1483.4 | 1481.5 | -0.095 | 9 | 4 | 5 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 1227.6999999999998 | 1141.3 | -4.32 | 20 | 2 | 18 | 0.0004 |
| `squadPerformance.meanMovement` | 1995.6000000000004 | 1992.1999999999998 | -0.17 | 19 | 3 | 16 | 0.0044 |
| `squadPerformance.meanControl` | 1882.5 | 1786.0000000000002 | -4.825 | 20 | 2 | 18 | 0.0004 |
| `squadPerformance.meanCohesion` | 1818.8000000000002 | 1859.1999999999998 | 2.02 | 20 | 18 | 2 | 0.0004 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 0.15 s (timeline) · controller-natural-20261026-0002 0.15 s (timeline) · controller-natural-20261026-0003 0.15 s (timeline) · controller-natural-20261026-0004 0.15 s (timeline) · controller-natural-20261026-0005 0.15 s (timeline) · controller-natural-20261026-0006 0.15 s (timeline) · controller-natural-20261026-0007 0.15 s (timeline) · controller-natural-20261026-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1700&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr779-1e6f4bb/ai_flow_live.html?bench=1700&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1700`); it opens the seed that parts earliest, and the dropdowns choose another.

