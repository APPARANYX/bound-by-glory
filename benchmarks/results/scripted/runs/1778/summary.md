# Benchmark run #1778 · 48 seeds from `pr793-brief900-20261108` (us-defend), windows `0+900`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr793-main-e86cda4 @ e86cda4 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42493879012) · build v29-dev

## Verdict

**MOVED: 48 of 48 pairs changed (median first part 0.15 s); 18 of 42 counters under p 0.05 (about 2.1 by chance), 13 under 0.0012; casualties -7.0% (p 0.0789)**

- Clears the Bonferroni line (p < 0.0012): fire.total 49757 to 88282 (+77.4%, p 0); retreatSamples 246504 to 317331 (+28.7%, p 0); movementResolver.changes 238871 to 320852 (+34.3%, p 0); vacantObjectiveStalls.length 291 to 50 (-82.8%, p 0); loopAlerts.length 975 to 2168 (+122.4%, p 0); recon.orders 2198 to 3364 (+53.0%, p 0); recon.contacts 303 to 707 (+133.3%, p 0); recon.cancelled 681 to 1495 (+119.5%, p 0); recon.reportsDelivered 1209 to 2862 (+136.7%, p 0); squadPerformance.meanOverall 3838.8999999999987 to 3767.899999999999 (-1.8%, p 0); squadPerformance.meanMission 2990.2999999999993 to 2769.0999999999995 (-7.4%, p 0); squadPerformance.meanCohesion 4367.3 to 4490.8 (+2.8%, p 0); squadPerformance.meanControl 4544.199999999999 to 4460.500000000001 (-1.8%, p 0.0002).
- Under 0.05 only: grenades.suppressed 80 to 198 (+147.5%, p 0.0118); grenades.wounded 38 to 68 (+78.9%, p 0.0127); recon.retriggerBlocked 1134 to 1246 (+9.9%, p 0.0161); grenades.throws 41 to 70 (+70.7%, p 0.0266); grenades.bursts 41 to 68 (+65.9%, p 0.0266).
- Wall time on/off x1.545 is over the 1.25 gate.

## Paired comparison (off against on)

- **48** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.545 (gate 1.25)
- the 48 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 3230 | 3004 | -4.7083 | 47 | 17 | 30 | 0.0789 |
| `usKills` | 1458 | 1466 | 0.1667 | 46 | 22 | 24 | 0.883 |
| `geKills` | 1772 | 1538 | -4.875 | 45 | 20 | 25 | 0.5515 |
| `fire.total` | 49757 | 88282 | 802.6042 | 48 | 48 | 0 | 0 |
| `fire.hits` | 6887 | 6849 | -0.7917 | 48 | 23 | 25 | 0.8854 |
| `retreatSamples` | 246504 | 317331 | 1475.5625 | 48 | 40 | 8 | 0 |
| `movementResolver.changes` | 238871 | 320852 | 1707.9375 | 48 | 46 | 2 | 0 |
| `grenades.throws` | 41 | 70 | 0.6042 | 21 | 16 | 5 | 0.0266 |
| `grenades.bursts` | 41 | 68 | 0.5625 | 21 | 16 | 5 | 0.0266 |
| `grenades.wounded` | 38 | 68 | 0.625 | 17 | 14 | 3 | 0.0127 |
| `grenades.casualties` | 11 | 22 | 0.2292 | 11 | 9 | 2 | 0.0654 |
| `grenades.suppressed` | 80 | 198 | 2.4583 | 20 | 16 | 4 | 0.0118 |
| `grenades.friendlyWounded` | 2 | 4 | 0.0417 | 4 | 3 | 1 | 0.625 |
| `grenades.friendlyCasualties` | 1 | 0 | -0.0208 | 1 | 0 | 1 | 1 |
| `grenades.aborted` | 4 | 15 | 0.2292 | 9 | 7 | 2 | 0.1797 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 291 | 50 | -5.0208 | 43 | 1 | 42 | 0 |
| `loopAlerts.length` | 975 | 2168 | 24.8542 | 48 | 47 | 1 | 0 |
| `writerConflicts` | 0 | 2 | 0.0417 | 1 | 1 | 0 | 1 |
| `regroups.entries` | 343 | 391 | 1 | 42 | 24 | 18 | 0.4408 |
| `stallOutcomes.wakes` | 14 | 11 | -0.0625 | 14 | 4 | 10 | 0.1796 |
| `stallOutcomes.repeats` | 8 | 7 | -0.0208 | 9 | 3 | 6 | 0.5078 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2198 | 3364 | 24.2917 | 48 | 47 | 1 | 0 |
| `recon.contacts` | 303 | 707 | 8.4167 | 46 | 42 | 4 | 0 |
| `recon.noContact` | 1046 | 1030 | -0.3333 | 45 | 21 | 24 | 0.766 |
| `recon.timeouts` | 80 | 59 | -0.4375 | 33 | 11 | 22 | 0.0801 |
| `recon.cancelled` | 681 | 1495 | 16.9583 | 47 | 45 | 2 | 0 |
| `recon.reportsDelivered` | 1209 | 2862 | 34.4375 | 48 | 42 | 6 | 0 |
| `recon.retriggerBlocked` | 1134 | 1246 | 2.3333 | 45 | 31 | 14 | 0.0161 |
| `squadPerformance.meanOverall` | 3838.8999999999987 | 3767.899999999999 | -1.4792 | 48 | 4 | 44 | 0 |
| `squadPerformance.p10Overall` | 3558.4 | 3553.7000000000003 | -0.0979 | 10 | 2 | 8 | 0.1094 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 2990.2999999999993 | 2769.0999999999995 | -4.6083 | 48 | 4 | 44 | 0 |
| `squadPerformance.meanMovement` | 4790.5 | 4789.500000000001 | -0.0208 | 32 | 12 | 20 | 0.2153 |
| `squadPerformance.meanControl` | 4544.199999999999 | 4460.500000000001 | -1.7438 | 48 | 11 | 37 | 0.0002 |
| `squadPerformance.meanCohesion` | 4367.3 | 4490.8 | 2.5729 | 47 | 42 | 5 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr793-brief900-20261108-0001 0.15 s (timeline) · pr793-brief900-20261108-0002 0.15 s (timeline) · pr793-brief900-20261108-0003 0.15 s (timeline) · pr793-brief900-20261108-0004 0.15 s (timeline) · pr793-brief900-20261108-0005 0.15 s (timeline) · pr793-brief900-20261108-0006 0.15 s (timeline) · pr793-brief900-20261108-0007 0.15 s (timeline) · pr793-brief900-20261108-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1778&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr793-main-e86cda4/ai_flow_live.html?bench=1778&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1778`); it opens the seed that parts earliest, and the dropdowns choose another.

