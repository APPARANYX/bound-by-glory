# Benchmark run #1749 · 48 seeds from `pr787-recon900-20261107` (us-defend), windows `0+900`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr787-main-aed0165 @ aed0165 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42423176618) · build v29-dev

## Verdict

**MOVED: 48 of 48 pairs changed (median first part 0.15 s); 14 of 42 counters under p 0.05 (about 2.1 by chance), 11 under 0.0012; casualties -8.4% (p 0.1439)**

- Clears the Bonferroni line (p < 0.0012): fire.total 54258 to 91428 (+68.5%, p 0); movementResolver.changes 245290 to 321723 (+31.2%, p 0); vacantObjectiveStalls.length 286 to 48 (-83.2%, p 0); recon.orders 2131 to 3197 (+50.0%, p 0); recon.contacts 298 to 663 (+122.5%, p 0); recon.cancelled 643 to 1355 (+110.7%, p 0); recon.reportsDelivered 1167 to 2430 (+108.2%, p 0); squadPerformance.meanOverall 3820.8 to 3772.200000000001 (-1.3%, p 0); squadPerformance.meanMission 2985.6 to 2792.7999999999997 (-6.5%, p 0); squadPerformance.meanCohesion 4369.7 to 4471.200000000001 (+2.3%, p 0.0001); loopAlerts.length 1488 to 2159 (+45.1%, p 0.0002).
- Under 0.05 only: retreatSamples 260596 to 314204 (+20.6%, p 0.0021); recon.retriggerBlocked 1118 to 1202 (+7.5%, p 0.0161); grenades.aborted 3 to 11 (+266.7%, p 0.0215).
- Wall time on/off x1.529 is over the 1.25 gate.

## Paired comparison (off against on)

- **48** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.529 (gate 1.25)
- the 48 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 3434 | 3147 | -5.9792 | 47 | 18 | 29 | 0.1439 |
| `usKills` | 1628 | 1539 | -1.8542 | 45 | 19 | 26 | 0.3713 |
| `geKills` | 1806 | 1608 | -4.125 | 48 | 19 | 29 | 0.1934 |
| `fire.total` | 54258 | 91428 | 774.375 | 48 | 47 | 1 | 0 |
| `fire.hits` | 7461 | 7121 | -7.0833 | 48 | 18 | 30 | 0.1114 |
| `retreatSamples` | 260596 | 314204 | 1116.8333 | 48 | 35 | 13 | 0.0021 |
| `movementResolver.changes` | 245290 | 321723 | 1592.3542 | 48 | 45 | 3 | 0 |
| `grenades.throws` | 38 | 58 | 0.4167 | 23 | 15 | 8 | 0.21 |
| `grenades.bursts` | 37 | 57 | 0.4167 | 22 | 15 | 7 | 0.1338 |
| `grenades.wounded` | 35 | 42 | 0.1458 | 12 | 7 | 5 | 0.7744 |
| `grenades.casualties` | 15 | 15 | 0 | 7 | 3 | 4 | 1 |
| `grenades.suppressed` | 103 | 126 | 0.4792 | 14 | 9 | 5 | 0.424 |
| `grenades.friendlyWounded` | 1 | 4 | 0.0625 | 5 | 4 | 1 | 0.375 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 3 | 11 | 0.1667 | 10 | 9 | 1 | 0.0215 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 286 | 48 | -4.9583 | 47 | 1 | 46 | 0 |
| `loopAlerts.length` | 1488 | 2159 | 13.9792 | 48 | 37 | 11 | 0.0002 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 409 | 432 | 0.4792 | 44 | 25 | 19 | 0.4514 |
| `stallOutcomes.wakes` | 12 | 5 | -0.1458 | 15 | 5 | 10 | 0.3018 |
| `stallOutcomes.repeats` | 2 | 4 | 0.0417 | 6 | 4 | 2 | 0.6875 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2131 | 3197 | 22.2083 | 48 | 45 | 3 | 0 |
| `recon.contacts` | 298 | 663 | 7.6042 | 48 | 41 | 7 | 0 |
| `recon.noContact` | 1044 | 1049 | 0.1042 | 43 | 23 | 20 | 0.7608 |
| `recon.timeouts` | 76 | 56 | -0.4167 | 40 | 15 | 25 | 0.1539 |
| `recon.cancelled` | 643 | 1355 | 14.8333 | 48 | 45 | 3 | 0 |
| `recon.reportsDelivered` | 1167 | 2430 | 26.3125 | 47 | 40 | 7 | 0 |
| `recon.retriggerBlocked` | 1118 | 1202 | 1.75 | 45 | 31 | 14 | 0.0161 |
| `squadPerformance.meanOverall` | 3820.8 | 3772.200000000001 | -1.0125 | 48 | 7 | 41 | 0 |
| `squadPerformance.p10Overall` | 3552.9999999999995 | 3553.4999999999995 | 0.0104 | 7 | 2 | 5 | 0.4531 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 2985.6 | 2792.7999999999997 | -4.0167 | 48 | 7 | 41 | 0 |
| `squadPerformance.meanMovement` | 4788.400000000001 | 4786.500000000001 | -0.0396 | 32 | 11 | 21 | 0.1102 |
| `squadPerformance.meanControl` | 4503.199999999998 | 4457.299999999999 | -0.9562 | 47 | 17 | 30 | 0.0789 |
| `squadPerformance.meanCohesion` | 4369.7 | 4471.200000000001 | 2.1146 | 48 | 38 | 10 | 0.0001 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr787-recon900-20261107-0001 0.15 s (timeline) · pr787-recon900-20261107-0002 0.15 s (timeline) · pr787-recon900-20261107-0003 0.15 s (timeline) · pr787-recon900-20261107-0004 0.15 s (timeline) · pr787-recon900-20261107-0005 0.15 s (timeline) · pr787-recon900-20261107-0006 0.15 s (timeline) · pr787-recon900-20261107-0007 0.15 s (timeline) · pr787-recon900-20261107-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1749&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr787-main-aed0165/ai_flow_live.html?bench=1749&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1749`); it opens the seed that parts earliest, and the dropdowns choose another.

