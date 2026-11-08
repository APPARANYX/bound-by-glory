# Benchmark run #1758 · 60 seeds from `pr787-m2-20261108` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr787-m2-83fb5a0 @ 83fb5a0 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42434307318) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 14 of 42 counters under p 0.05 (about 2.1 by chance), 10 under 0.0012; casualties -3.3% (p 0.6989)**

- Clears the Bonferroni line (p < 0.0012): fire.total 38047 to 66985 (+76.1%, p 0); movementResolver.changes 215342 to 303356 (+40.9%, p 0); vacantObjectiveStalls.length 289 to 45 (-84.4%, p 0); loopAlerts.length 774 to 2047 (+164.5%, p 0); recon.noContact 1133 to 945 (-16.6%, p 0); recon.cancelled 496 to 798 (+60.9%, p 0); squadPerformance.meanOverall 4809.000000000001 to 4701.8 (-2.2%, p 0); squadPerformance.meanMission 3779.0999999999995 to 3498.4 (-7.4%, p 0); squadPerformance.meanControl 5583.9 to 5338.100000000001 (-4.4%, p 0); squadPerformance.meanCohesion 5450.199999999999 to 5585.100000000001 (+2.5%, p 0).
- Under 0.05 only: recon.retriggerBlocked 1405 to 1508 (+7.3%, p 0.0046); recon.orders 1820 to 1970 (+8.2%, p 0.0065); stallOutcomes.wakes 20 to 6 (-70.0%, p 0.0192); regroups.entries 259 to 313 (+20.8%, p 0.03).
- Wall time on/off x1.535 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.535 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2673 | 2585 | -1.4667 | 60 | 28 | 32 | 0.6989 |
| `usKills` | 1266 | 1102 | -2.7333 | 55 | 21 | 34 | 0.1048 |
| `geKills` | 1407 | 1483 | 1.2667 | 58 | 35 | 23 | 0.148 |
| `fire.total` | 38047 | 66985 | 482.3 | 60 | 56 | 4 | 0 |
| `fire.hits` | 5739 | 5706 | -0.55 | 60 | 32 | 28 | 0.6989 |
| `retreatSamples` | 97646 | 114352 | 278.4333 | 60 | 35 | 25 | 0.2451 |
| `movementResolver.changes` | 215342 | 303356 | 1466.9 | 60 | 59 | 1 | 0 |
| `grenades.throws` | 52 | 59 | 0.1167 | 32 | 19 | 13 | 0.3771 |
| `grenades.bursts` | 52 | 59 | 0.1167 | 32 | 19 | 13 | 0.3771 |
| `grenades.wounded` | 52 | 48 | -0.0667 | 25 | 14 | 11 | 0.69 |
| `grenades.casualties` | 16 | 19 | 0.05 | 19 | 11 | 8 | 0.6476 |
| `grenades.suppressed` | 133 | 75 | -0.9667 | 28 | 15 | 13 | 0.8506 |
| `grenades.friendlyWounded` | 1 | 4 | 0.05 | 5 | 4 | 1 | 0.375 |
| `grenades.friendlyCasualties` | 1 | 1 | 0 | 2 | 1 | 1 | 1 |
| `grenades.aborted` | 12 | 12 | 0 | 11 | 6 | 5 | 1 |
| `movementStalls.length` | 0 | 2 | 0.0333 | 1 | 1 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 289 | 45 | -4.0667 | 53 | 2 | 51 | 0 |
| `loopAlerts.length` | 774 | 2047 | 21.2167 | 60 | 59 | 1 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 259 | 313 | 0.9 | 55 | 36 | 19 | 0.03 |
| `stallOutcomes.wakes` | 20 | 6 | -0.2333 | 19 | 4 | 15 | 0.0192 |
| `stallOutcomes.repeats` | 10 | 3 | -0.1167 | 9 | 2 | 7 | 0.1797 |
| `timeline.stalledOnsets` | 0 | 2 | 0.0333 | 1 | 1 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 98 | 1.6333 | 1 | 1 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 2 | 0.0333 | 1 | 1 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 98 | 1.6333 | 1 | 1 | 0 | 1 |
| `recon.orders` | 1820 | 1970 | 2.5 | 55 | 38 | 17 | 0.0065 |
| `recon.contacts` | 107 | 117 | 0.1667 | 41 | 21 | 20 | 1 |
| `recon.noContact` | 1133 | 945 | -3.1333 | 55 | 12 | 43 | 0 |
| `recon.timeouts` | 20 | 13 | -0.1167 | 24 | 9 | 15 | 0.3075 |
| `recon.cancelled` | 496 | 798 | 5.0333 | 58 | 54 | 4 | 0 |
| `recon.reportsDelivered` | 505 | 535 | 0.5 | 50 | 27 | 23 | 0.6718 |
| `recon.retriggerBlocked` | 1405 | 1508 | 1.7167 | 56 | 39 | 17 | 0.0046 |
| `squadPerformance.meanOverall` | 4809.000000000001 | 4701.8 | -1.7867 | 59 | 5 | 54 | 0 |
| `squadPerformance.p10Overall` | 4478.399999999999 | 4466.4 | -0.2 | 36 | 14 | 22 | 0.243 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3779.0999999999995 | 3498.4 | -4.6783 | 60 | 10 | 50 | 0 |
| `squadPerformance.meanMovement` | 5984.9000000000015 | 5981.100000000003 | -0.0633 | 42 | 16 | 26 | 0.1641 |
| `squadPerformance.meanControl` | 5583.9 | 5338.100000000001 | -4.0967 | 59 | 5 | 54 | 0 |
| `squadPerformance.meanCohesion` | 5450.199999999999 | 5585.100000000001 | 2.2483 | 59 | 49 | 10 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr787-m2-20261108-0001 0.15 s (timeline) · pr787-m2-20261108-0002 0.15 s (timeline) · pr787-m2-20261108-0003 0.15 s (timeline) · pr787-m2-20261108-0004 0.15 s (timeline) · pr787-m2-20261108-0005 0.15 s (timeline) · pr787-m2-20261108-0006 0.15 s (timeline) · pr787-m2-20261108-0007 0.15 s (timeline) · pr787-m2-20261108-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1758&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr787-m2-83fb5a0/ai_flow_live.html?bench=1758&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1758`); it opens the seed that parts earliest, and the dropdowns choose another.

