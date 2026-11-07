# Benchmark run #1692 · 60 seeds from `pr778-squad-reviews` (meeting), windows `0+600`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerSquadReviews=0&controllerCoaGate=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/pr778-e4278914 @ e427891 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42338935113) · build v29-dev

## Verdict

**WEAK: 60 of 60 pairs changed (median first part 252.525 s); 1 of 42 counters under p 0.05 (about 2.1 by chance); casualties +3.4% (p 0.5044)**

- Under 0.05 only: grenades.casualties 14 to 39 (+178.6%, p 0.0225).

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x0.974 (gate 1.25)
- the 60 changed records first part at simulated second: min 194.1, p10 207, median 252.525, p90 311.1, max 338.1

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2623 | 2711 | 1.4667 | 56 | 31 | 25 | 0.5044 |
| `usKills` | 1216 | 1264 | 0.8 | 55 | 27 | 28 | 1 |
| `geKills` | 1407 | 1447 | 0.6667 | 55 | 28 | 27 | 1 |
| `fire.total` | 69096 | 69651 | 9.25 | 60 | 32 | 28 | 0.6989 |
| `fire.hits` | 6010 | 6155 | 2.4167 | 58 | 35 | 23 | 0.148 |
| `retreatSamples` | 120421 | 123586 | 52.75 | 60 | 28 | 32 | 0.6989 |
| `movementResolver.changes` | 309611 | 310623 | 16.8667 | 60 | 34 | 26 | 0.3663 |
| `grenades.throws` | 73 | 80 | 0.1167 | 27 | 15 | 12 | 0.7011 |
| `grenades.bursts` | 72 | 80 | 0.1333 | 27 | 15 | 12 | 0.7011 |
| `grenades.wounded` | 50 | 94 | 0.7333 | 16 | 11 | 5 | 0.2101 |
| `grenades.casualties` | 14 | 39 | 0.4167 | 13 | 11 | 2 | 0.0225 |
| `grenades.suppressed` | 111 | 187 | 1.2667 | 21 | 13 | 8 | 0.3833 |
| `grenades.friendlyWounded` | 0 | 4 | 0.0667 | 1 | 1 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 2 | 0.0333 | 1 | 1 | 0 | 1 |
| `grenades.aborted` | 13 | 19 | 0.1 | 10 | 5 | 5 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 60 | 57 | -0.05 | 44 | 21 | 23 | 0.8804 |
| `loopAlerts.length` | 2218 | 2171 | -0.7833 | 58 | 26 | 32 | 0.5118 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 403 | 330 | -1.2167 | 52 | 28 | 24 | 0.6778 |
| `stallOutcomes.wakes` | 4 | 1 | -0.05 | 5 | 1 | 4 | 0.375 |
| `stallOutcomes.repeats` | 2 | 0 | -0.0333 | 2 | 0 | 2 | 0.5 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1841 | 1863 | 0.3667 | 57 | 30 | 27 | 0.7914 |
| `recon.contacts` | 124 | 111 | -0.2167 | 37 | 14 | 23 | 0.1877 |
| `recon.noContact` | 954 | 958 | 0.0667 | 51 | 27 | 24 | 0.7798 |
| `recon.timeouts` | 9 | 16 | 0.1167 | 13 | 9 | 4 | 0.2668 |
| `recon.cancelled` | 682 | 698 | 0.2667 | 54 | 27 | 27 | 1 |
| `recon.reportsDelivered` | 633 | 538 | -1.5833 | 41 | 15 | 26 | 0.1173 |
| `recon.retriggerBlocked` | 1469 | 1489 | 0.3333 | 50 | 25 | 25 | 1 |
| `squadPerformance.meanOverall` | 4680.700000000001 | 4674.799999999998 | -0.0983 | 59 | 29 | 30 | 1 |
| `squadPerformance.p10Overall` | 4451.9 | 4448.200000000001 | -0.0617 | 18 | 8 | 10 | 0.8145 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3429.7999999999984 | 3435.500000000001 | 0.095 | 60 | 33 | 27 | 0.519 |
| `squadPerformance.meanMovement` | 5978.600000000002 | 5978.900000000001 | 0.005 | 35 | 17 | 18 | 1 |
| `squadPerformance.meanControl` | 5363.300000000001 | 5364.1 | 0.0133 | 60 | 32 | 28 | 0.6989 |
| `squadPerformance.meanCohesion` | 5579.6 | 5573.3 | -0.105 | 58 | 29 | 29 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr778-squad-reviews-0052 194.1 s (timeline) · pr778-squad-reviews-0039 198 s (timeline) · pr778-squad-reviews-0035 201 s (timeline) · pr778-squad-reviews-0015 203.1 s (timeline) · pr778-squad-reviews-0018 203.1 s (timeline) · pr778-squad-reviews-0056 207 s (timeline) · pr778-squad-reviews-0031 209.1 s (timeline) · pr778-squad-reviews-0041 216 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1692&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr778-e4278914/ai_flow_live.html?bench=1692&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1692`); it opens the seed that parts earliest, and the dropdowns choose another.

