# Benchmark run #1811 · 48 seeds from `pr796-phase900-20261108` (meeting), windows `0+900`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr796-main-b811827 @ b811827 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42536403597) · build v29-dev

## Verdict

**MOVED: 48 of 48 pairs changed (median first part 0.15 s); 20 of 42 counters under p 0.05 (about 2.1 by chance), 11 under 0.0012; casualties -12.9% (p 0.0019)**

- Clears the Bonferroni line (p < 0.0012): fire.total 31984 to 68985 (+115.7%, p 0); movementResolver.changes 177863 to 348309 (+95.8%, p 0); vacantObjectiveStalls.length 289 to 70 (-75.8%, p 0); loopAlerts.length 793 to 2448 (+208.7%, p 0); recon.noContact 1000 to 787 (-21.3%, p 0); squadPerformance.meanOverall 3830.6 to 3688.900000000001 (-3.7%, p 0); squadPerformance.meanMission 2974.3 to 2657.1 (-10.7%, p 0); squadPerformance.meanMovement 4786.300000000001 to 4777.199999999999 (-0.2%, p 0); squadPerformance.meanControl 4461.8 to 4253.500000000001 (-4.7%, p 0); regroups.entries 232 to 470 (+102.6%, p 0.0002); squadPerformance.p10Overall 3584.499999999999 to 3534.7000000000003 (-1.4%, p 0.0003).
- Under 0.05 only: casualties 2186 to 1905 (-12.9%, p 0.0019); fire.hits 4789 to 4272 (-10.8%, p 0.0133); geKills 1237 to 1051 (-15.0%, p 0.0259); grenades.throws 22 to 63 (+186.4%, p 0.029); grenades.bursts 22 to 63 (+186.4%, p 0.029); retreatSamples 116997 to 146305 (+25.1%, p 0.0293); recon.cancelled 432 to 492 (+13.9%, p 0.0315); grenades.aborted 2 to 13 (+550.0%, p 0.0391); recon.orders 1613 to 1469 (-8.9%, p 0.04).
- Wall time on/off x1.771 is over the 1.25 gate.

## Paired comparison (off against on)

- **48** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.771 (gate 1.25)
- the 48 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2186 | 1905 | -5.8542 | 43 | 11 | 32 | 0.0019 |
| `usKills` | 949 | 854 | -1.9792 | 46 | 22 | 24 | 0.883 |
| `geKills` | 1237 | 1051 | -3.875 | 46 | 15 | 31 | 0.0259 |
| `fire.total` | 31984 | 68985 | 770.8542 | 48 | 46 | 2 | 0 |
| `fire.hits` | 4789 | 4272 | -10.7708 | 48 | 15 | 33 | 0.0133 |
| `retreatSamples` | 116997 | 146305 | 610.5833 | 48 | 32 | 16 | 0.0293 |
| `movementResolver.changes` | 177863 | 348309 | 3550.9583 | 48 | 48 | 0 | 0 |
| `grenades.throws` | 22 | 63 | 0.8542 | 26 | 19 | 7 | 0.029 |
| `grenades.bursts` | 22 | 63 | 0.8542 | 26 | 19 | 7 | 0.029 |
| `grenades.wounded` | 25 | 43 | 0.375 | 14 | 9 | 5 | 0.424 |
| `grenades.casualties` | 11 | 19 | 0.1667 | 12 | 9 | 3 | 0.146 |
| `grenades.suppressed` | 43 | 94 | 1.0625 | 18 | 13 | 5 | 0.0963 |
| `grenades.friendlyWounded` | 0 | 2 | 0.0417 | 2 | 2 | 0 | 0.5 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 2 | 13 | 0.2292 | 9 | 8 | 1 | 0.0391 |
| `movementStalls.length` | 1 | 0 | -0.0208 | 1 | 0 | 1 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 289 | 70 | -4.5625 | 44 | 4 | 40 | 0 |
| `loopAlerts.length` | 793 | 2448 | 34.4792 | 48 | 46 | 2 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 232 | 470 | 4.9583 | 46 | 36 | 10 | 0.0002 |
| `stallOutcomes.wakes` | 13 | 14 | 0.0208 | 15 | 9 | 6 | 0.6072 |
| `stallOutcomes.repeats` | 4 | 6 | 0.0417 | 8 | 5 | 3 | 0.7266 |
| `timeline.stalledOnsets` | 1 | 0 | -0.0208 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamples` | 14 | 0 | -0.2917 | 1 | 0 | 1 | 1 |
| `timeline.stalledOnsetsRepeated` | 1 | 0 | -0.0208 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamplesRepeated` | 14 | 0 | -0.2917 | 1 | 0 | 1 | 1 |
| `recon.orders` | 1613 | 1469 | -3 | 47 | 16 | 31 | 0.04 |
| `recon.contacts` | 77 | 97 | 0.4167 | 33 | 19 | 14 | 0.4869 |
| `recon.noContact` | 1000 | 787 | -4.4375 | 48 | 8 | 40 | 0 |
| `recon.timeouts` | 15 | 13 | -0.0417 | 15 | 6 | 9 | 0.6072 |
| `recon.cancelled` | 432 | 492 | 1.25 | 43 | 29 | 14 | 0.0315 |
| `recon.reportsDelivered` | 308 | 352 | 0.9167 | 44 | 22 | 22 | 1 |
| `recon.retriggerBlocked` | 1243 | 1216 | -0.5625 | 45 | 22 | 23 | 1 |
| `squadPerformance.meanOverall` | 3830.6 | 3688.900000000001 | -2.9521 | 48 | 2 | 46 | 0 |
| `squadPerformance.p10Overall` | 3584.499999999999 | 3534.7000000000003 | -1.0375 | 33 | 6 | 27 | 0.0003 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 2974.3 | 2657.1 | -6.6083 | 48 | 3 | 45 | 0 |
| `squadPerformance.meanMovement` | 4786.300000000001 | 4777.199999999999 | -0.1896 | 41 | 3 | 38 | 0 |
| `squadPerformance.meanControl` | 4461.8 | 4253.500000000001 | -4.3396 | 48 | 4 | 44 | 0 |
| `squadPerformance.meanCohesion` | 4374.8 | 4332.3 | -0.8854 | 48 | 21 | 27 | 0.4709 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr796-phase900-20261108-0001 0.15 s (timeline) · pr796-phase900-20261108-0002 0.15 s (timeline) · pr796-phase900-20261108-0003 0.15 s (timeline) · pr796-phase900-20261108-0004 0.15 s (timeline) · pr796-phase900-20261108-0005 0.15 s (timeline) · pr796-phase900-20261108-0006 0.15 s (timeline) · pr796-phase900-20261108-0007 0.15 s (timeline) · pr796-phase900-20261108-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1811&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr796-main-b811827/ai_flow_live.html?bench=1811&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1811`); it opens the seed that parts earliest, and the dropdowns choose another.

