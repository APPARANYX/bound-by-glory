# Benchmark run #1689 · 60 seeds from `controller-natural-20261026` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/pin/pr777-bdcac65f @ bdcac65 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42328541698) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 19 of 42 counters under p 0.05 (about 2.1 by chance), 14 under 0.0012; casualties -2.7% (p 0.3497)**

- Clears the Bonferroni line (p < 0.0012): fire.total 39764 to 68295 (+71.8%, p 0); movementResolver.changes 210010 to 306234 (+45.8%, p 0); grenades.throws 11 to 46 (+318.2%, p 0); grenades.bursts 11 to 46 (+318.2%, p 0); vacantObjectiveStalls.length 278 to 55 (-80.2%, p 0); loopAlerts.length 721 to 2370 (+228.7%, p 0); recon.noContact 1106 to 905 (-18.2%, p 0); recon.cancelled 463 to 703 (+51.8%, p 0); squadPerformance.meanOverall 4806.700000000001 to 4675.199999999999 (-2.7%, p 0); squadPerformance.meanMission 3780.8 to 3434.2999999999993 (-9.2%, p 0); squadPerformance.meanControl 5616 to 5360.3 (-4.6%, p 0); squadPerformance.meanCohesion 5425.999999999998 to 5590.1 (+3.0%, p 0); squadPerformance.meanMovement 5984.800000000001 to 5978.2 (-0.1%, p 0.0002); grenades.suppressed 10 to 70 (+600.0%, p 0.001).
- Under 0.05 only: recon.retriggerBlocked 1333 to 1410 (+5.8%, p 0.0127); retreatSamples 103776 to 128686 (+24.0%, p 0.0135); grenades.casualties 3 to 14 (+366.7%, p 0.0215); grenades.wounded 6 to 31 (+416.7%, p 0.0386); regroups.entries 227 to 303 (+33.5%, p 0.0489).
- Wall time on/off x1.496 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.496 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2695 | 2623 | -1.2 | 56 | 24 | 32 | 0.3497 |
| `usKills` | 1300 | 1160 | -2.3333 | 57 | 23 | 34 | 0.1849 |
| `geKills` | 1395 | 1463 | 1.1333 | 56 | 30 | 26 | 0.6889 |
| `fire.total` | 39764 | 68295 | 475.5167 | 60 | 57 | 3 | 0 |
| `fire.hits` | 6063 | 5856 | -3.45 | 60 | 24 | 36 | 0.155 |
| `retreatSamples` | 103776 | 128686 | 415.1667 | 60 | 40 | 20 | 0.0135 |
| `movementResolver.changes` | 210010 | 306234 | 1603.7333 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 11 | 46 | 0.5833 | 27 | 24 | 3 | 0 |
| `grenades.bursts` | 11 | 46 | 0.5833 | 27 | 24 | 3 | 0 |
| `grenades.wounded` | 6 | 31 | 0.4167 | 12 | 10 | 2 | 0.0386 |
| `grenades.casualties` | 3 | 14 | 0.1833 | 10 | 9 | 1 | 0.0215 |
| `grenades.suppressed` | 10 | 70 | 1 | 15 | 14 | 1 | 0.001 |
| `grenades.friendlyWounded` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.aborted` | 5 | 7 | 0.0333 | 7 | 5 | 2 | 0.4531 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 278 | 55 | -3.7167 | 53 | 4 | 49 | 0 |
| `loopAlerts.length` | 721 | 2370 | 27.4833 | 60 | 58 | 2 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 227 | 303 | 1.2667 | 51 | 33 | 18 | 0.0489 |
| `stallOutcomes.wakes` | 4 | 4 | 0 | 6 | 3 | 3 | 1 |
| `stallOutcomes.repeats` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1742 | 1817 | 1.25 | 56 | 35 | 21 | 0.0814 |
| `recon.contacts` | 87 | 115 | 0.4667 | 46 | 28 | 18 | 0.1839 |
| `recon.noContact` | 1106 | 905 | -3.35 | 59 | 12 | 47 | 0 |
| `recon.timeouts` | 16 | 10 | -0.1 | 20 | 7 | 13 | 0.2632 |
| `recon.cancelled` | 463 | 703 | 4 | 54 | 47 | 7 | 0 |
| `recon.reportsDelivered` | 433 | 586 | 2.55 | 51 | 29 | 22 | 0.4011 |
| `recon.retriggerBlocked` | 1333 | 1410 | 1.2833 | 53 | 36 | 17 | 0.0127 |
| `squadPerformance.meanOverall` | 4806.700000000001 | 4675.199999999999 | -2.1917 | 59 | 5 | 54 | 0 |
| `squadPerformance.p10Overall` | 4470.2 | 4449.4 | -0.3467 | 26 | 9 | 17 | 0.1686 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3780.8 | 3434.2999999999993 | -5.775 | 60 | 7 | 53 | 0 |
| `squadPerformance.meanMovement` | 5984.800000000001 | 5978.2 | -0.11 | 51 | 12 | 39 | 0.0002 |
| `squadPerformance.meanControl` | 5616 | 5360.3 | -4.2617 | 60 | 9 | 51 | 0 |
| `squadPerformance.meanCohesion` | 5425.999999999998 | 5590.1 | 2.735 | 60 | 53 | 7 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 0.15 s (timeline) · controller-natural-20261026-0002 0.15 s (timeline) · controller-natural-20261026-0003 0.15 s (timeline) · controller-natural-20261026-0004 0.15 s (timeline) · controller-natural-20261026-0005 0.15 s (timeline) · controller-natural-20261026-0006 0.15 s (timeline) · controller-natural-20261026-0007 0.15 s (timeline) · controller-natural-20261026-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1689&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr777-bdcac65f/ai_flow_live.html?bench=1689&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1689`); it opens the seed that parts earliest, and the dropdowns choose another.

