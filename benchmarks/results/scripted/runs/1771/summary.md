# Benchmark run #1771 · 48 seeds from `pr787-m2-recon900-20261108` (us-defend), windows `0+900`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr787-main-aed0165 @ aed0165 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42434648723) · build v29-dev

## Verdict

**MOVED: 48 of 48 pairs changed (median first part 0.15 s); 15 of 42 counters under p 0.05 (about 2.1 by chance), 13 under 0.0012; casualties -10.7% (p 0)**

- Clears the Bonferroni line (p < 0.0012): casualties 3454 to 3083 (-10.7%, p 0); fire.total 56218 to 89072 (+58.4%, p 0); retreatSamples 240712 to 295826 (+22.9%, p 0); movementResolver.changes 245694 to 315486 (+28.4%, p 0); vacantObjectiveStalls.length 296 to 23 (-92.2%, p 0); loopAlerts.length 1290 to 2114 (+63.9%, p 0); recon.orders 2153 to 3359 (+56.0%, p 0); recon.contacts 303 to 726 (+139.6%, p 0); recon.cancelled 640 to 1469 (+129.5%, p 0); recon.reportsDelivered 1212 to 2399 (+97.9%, p 0); squadPerformance.meanOverall 3838.7000000000007 to 3781.2 (-1.5%, p 0); squadPerformance.meanMission 3013.2 to 2802.7999999999997 (-7.0%, p 0); squadPerformance.meanCohesion 4382 to 4484.799999999999 (+2.3%, p 0).
- Under 0.05 only: squadPerformance.meanControl 4521.7 to 4461.599999999999 (-1.3%, p 0.0016); recon.retriggerBlocked 1125 to 1242 (+10.4%, p 0.0186).
- Wall time on/off x1.536 is over the 1.25 gate.

## Paired comparison (off against on)

- **48** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.536 (gate 1.25)
- the 48 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 3454 | 3083 | -7.7292 | 46 | 8 | 38 | 0 |
| `usKills` | 1591 | 1463 | -2.6667 | 46 | 17 | 29 | 0.1038 |
| `geKills` | 1863 | 1620 | -5.0625 | 47 | 17 | 30 | 0.0789 |
| `fire.total` | 56218 | 89072 | 684.4583 | 48 | 45 | 3 | 0 |
| `fire.hits` | 7458 | 7099 | -7.4792 | 47 | 19 | 28 | 0.243 |
| `retreatSamples` | 240712 | 295826 | 1148.2083 | 48 | 40 | 8 | 0 |
| `movementResolver.changes` | 245694 | 315486 | 1454 | 48 | 45 | 3 | 0 |
| `grenades.throws` | 76 | 87 | 0.2292 | 28 | 16 | 12 | 0.5716 |
| `grenades.bursts` | 76 | 87 | 0.2292 | 28 | 16 | 12 | 0.5716 |
| `grenades.wounded` | 72 | 74 | 0.0417 | 15 | 9 | 6 | 0.6072 |
| `grenades.casualties` | 26 | 16 | -0.2083 | 12 | 5 | 7 | 0.7744 |
| `grenades.suppressed` | 161 | 166 | 0.1042 | 19 | 12 | 7 | 0.3593 |
| `grenades.friendlyWounded` | 1 | 5 | 0.0833 | 4 | 4 | 0 | 0.125 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 6 | 21 | 0.3125 | 17 | 12 | 5 | 0.1435 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 296 | 23 | -5.6875 | 47 | 0 | 47 | 0 |
| `loopAlerts.length` | 1290 | 2114 | 17.1667 | 46 | 43 | 3 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 346 | 426 | 1.6667 | 44 | 20 | 24 | 0.6516 |
| `stallOutcomes.wakes` | 7 | 4 | -0.0625 | 10 | 4 | 6 | 0.7539 |
| `stallOutcomes.repeats` | 0 | 2 | 0.0417 | 2 | 2 | 0 | 0.5 |
| `timeline.stalledOnsets` | 1 | 0 | -0.0208 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamples` | 1 | 0 | -0.0208 | 1 | 0 | 1 | 1 |
| `timeline.stalledOnsetsRepeated` | 1 | 0 | -0.0208 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamplesRepeated` | 1 | 0 | -0.0208 | 1 | 0 | 1 | 1 |
| `recon.orders` | 2153 | 3359 | 25.125 | 47 | 44 | 3 | 0 |
| `recon.contacts` | 303 | 726 | 8.8125 | 46 | 43 | 3 | 0 |
| `recon.noContact` | 1078 | 1044 | -0.7083 | 44 | 19 | 25 | 0.4514 |
| `recon.timeouts` | 69 | 57 | -0.25 | 35 | 15 | 20 | 0.4996 |
| `recon.cancelled` | 640 | 1469 | 17.2708 | 48 | 46 | 2 | 0 |
| `recon.reportsDelivered` | 1212 | 2399 | 24.7292 | 47 | 40 | 7 | 0 |
| `recon.retriggerBlocked` | 1125 | 1242 | 2.4375 | 47 | 32 | 15 | 0.0186 |
| `squadPerformance.meanOverall` | 3838.7000000000007 | 3781.2 | -1.1979 | 47 | 5 | 42 | 0 |
| `squadPerformance.p10Overall` | 3557.2 | 3552.4 | -0.1 | 8 | 1 | 7 | 0.0703 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3013.2 | 2802.7999999999997 | -4.3833 | 48 | 4 | 44 | 0 |
| `squadPerformance.meanMovement` | 4789.6 | 4790.1 | 0.0104 | 29 | 16 | 13 | 0.7111 |
| `squadPerformance.meanControl` | 4521.7 | 4461.599999999999 | -1.2521 | 46 | 12 | 34 | 0.0016 |
| `squadPerformance.meanCohesion` | 4382 | 4484.799999999999 | 2.1417 | 48 | 43 | 5 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr787-m2-recon900-20261108-0001 0.15 s (timeline) · pr787-m2-recon900-20261108-0002 0.15 s (timeline) · pr787-m2-recon900-20261108-0003 0.15 s (timeline) · pr787-m2-recon900-20261108-0004 0.15 s (timeline) · pr787-m2-recon900-20261108-0005 0.15 s (timeline) · pr787-m2-recon900-20261108-0006 0.15 s (timeline) · pr787-m2-recon900-20261108-0007 0.15 s (timeline) · pr787-m2-recon900-20261108-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1771&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr787-main-aed0165/ai_flow_live.html?bench=1771&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1771`); it opens the seed that parts earliest, and the dropdowns choose another.

