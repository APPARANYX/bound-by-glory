# Benchmark run #1787 · 60 seeds from `pr795-m4-20261108` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr795-504f69e3 @ 504f69e · [run](https://github.com/APPARANYX/grasstex/actions/runs/42519053806) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 16 of 42 counters under p 0.05 (about 2.1 by chance), 12 under 0.0012; casualties -12.9% (p 0.0001)**

- Clears the Bonferroni line (p < 0.0012): fire.total 39472 to 80342 (+103.5%, p 0); movementResolver.changes 215250 to 398675 (+85.2%, p 0); vacantObjectiveStalls.length 320 to 46 (-85.6%, p 0); loopAlerts.length 908 to 2655 (+192.4%, p 0); regroups.entries 230 to 432 (+87.8%, p 0); recon.orders 1772 to 1522 (-14.1%, p 0); recon.noContact 1150 to 852 (-25.9%, p 0); squadPerformance.meanOverall 4782.299999999999 to 4647.5 (-2.8%, p 0); squadPerformance.meanMission 3740.2 to 3428.1 (-8.3%, p 0); squadPerformance.meanMovement 5985.499999999999 to 5975.399999999998 (-0.2%, p 0); squadPerformance.meanControl 5559.399999999998 to 5290.000000000001 (-4.8%, p 0); casualties 2684 to 2338 (-12.9%, p 0.0001).
- Under 0.05 only: usKills 1256 to 1061 (-15.5%, p 0.0075); squadPerformance.p10Overall 4470.1 to 4436.7 (-0.7%, p 0.0113); geKills 1428 to 1277 (-10.6%, p 0.0247); squadPerformance.meanCohesion 5432.300000000002 to 5366.799999999997 (-1.2%, p 0.0273).
- Wall time on/off x1.649 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.649 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2684 | 2338 | -5.7667 | 58 | 14 | 44 | 0.0001 |
| `usKills` | 1256 | 1061 | -3.25 | 57 | 18 | 39 | 0.0075 |
| `geKills` | 1428 | 1277 | -2.5167 | 58 | 20 | 38 | 0.0247 |
| `fire.total` | 39472 | 80342 | 681.1667 | 60 | 60 | 0 | 0 |
| `fire.hits` | 5789 | 5254 | -8.9167 | 59 | 25 | 34 | 0.2976 |
| `retreatSamples` | 104846 | 99733 | -85.2167 | 60 | 25 | 35 | 0.2451 |
| `movementResolver.changes` | 215250 | 398675 | 3057.0833 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 54 | 49 | -0.0833 | 26 | 15 | 11 | 0.5572 |
| `grenades.bursts` | 54 | 48 | -0.1 | 26 | 15 | 11 | 0.5572 |
| `grenades.wounded` | 51 | 27 | -0.4 | 14 | 7 | 7 | 1 |
| `grenades.casualties` | 16 | 6 | -0.1667 | 8 | 4 | 4 | 1 |
| `grenades.suppressed` | 101 | 62 | -0.65 | 19 | 9 | 10 | 1 |
| `grenades.friendlyWounded` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 8 | 10 | 0.0333 | 10 | 6 | 4 | 0.7539 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 320 | 46 | -4.5667 | 55 | 1 | 54 | 0 |
| `loopAlerts.length` | 908 | 2655 | 29.1167 | 60 | 57 | 3 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 230 | 432 | 3.3667 | 57 | 48 | 9 | 0 |
| `stallOutcomes.wakes` | 16 | 19 | 0.05 | 22 | 11 | 11 | 1 |
| `stallOutcomes.repeats` | 10 | 7 | -0.05 | 14 | 5 | 9 | 0.424 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1772 | 1522 | -4.1667 | 55 | 12 | 43 | 0 |
| `recon.contacts` | 96 | 114 | 0.3 | 41 | 25 | 16 | 0.211 |
| `recon.noContact` | 1150 | 852 | -4.9667 | 55 | 5 | 50 | 0 |
| `recon.timeouts` | 15 | 12 | -0.05 | 22 | 9 | 13 | 0.5235 |
| `recon.cancelled` | 447 | 505 | 0.9667 | 58 | 35 | 23 | 0.148 |
| `recon.reportsDelivered` | 372 | 436 | 1.0667 | 52 | 32 | 20 | 0.1263 |
| `recon.retriggerBlocked` | 1395 | 1321 | -1.2333 | 56 | 21 | 35 | 0.0814 |
| `squadPerformance.meanOverall` | 4782.299999999999 | 4647.5 | -2.2467 | 60 | 2 | 58 | 0 |
| `squadPerformance.p10Overall` | 4470.1 | 4436.7 | -0.5567 | 36 | 10 | 26 | 0.0113 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3740.2 | 3428.1 | -5.2017 | 60 | 4 | 56 | 0 |
| `squadPerformance.meanMovement` | 5985.499999999999 | 5975.399999999998 | -0.1683 | 48 | 2 | 46 | 0 |
| `squadPerformance.meanControl` | 5559.399999999998 | 5290.000000000001 | -4.49 | 60 | 7 | 53 | 0 |
| `squadPerformance.meanCohesion` | 5432.300000000002 | 5366.799999999997 | -1.0917 | 60 | 21 | 39 | 0.0273 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr795-m4-20261108-0001 0.15 s (timeline) · pr795-m4-20261108-0002 0.15 s (timeline) · pr795-m4-20261108-0003 0.15 s (timeline) · pr795-m4-20261108-0004 0.15 s (timeline) · pr795-m4-20261108-0005 0.15 s (timeline) · pr795-m4-20261108-0006 0.15 s (timeline) · pr795-m4-20261108-0007 0.15 s (timeline) · pr795-m4-20261108-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1787&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr795-504f69e3/ai_flow_live.html?bench=1787&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1787`); it opens the seed that parts earliest, and the dropdowns choose another.

