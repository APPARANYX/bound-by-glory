# Benchmark run #1788 · 60 seeds from `pr795-m4-20261108` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr795-504f69e3 @ 504f69e · [run](https://github.com/APPARANYX/grasstex/actions/runs/42519057379) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 21 of 42 counters under p 0.05 (about 2.1 by chance), 16 under 0.0012; casualties -22.6% (p 0)**

- Clears the Bonferroni line (p < 0.0012): casualties 2870 to 2220 (-22.6%, p 0); usKills 1440 to 980 (-31.9%, p 0); fire.total 44498 to 74164 (+66.7%, p 0); fire.hits 6347 to 5020 (-20.9%, p 0); movementResolver.changes 210273 to 321790 (+53.0%, p 0); vacantObjectiveStalls.length 123 to 16 (-87.0%, p 0); loopAlerts.length 898 to 1990 (+121.6%, p 0); regroups.entries 251 to 421 (+67.7%, p 0); recon.orders 1914 to 3483 (+82.0%, p 0); recon.contacts 278 to 825 (+196.8%, p 0); recon.cancelled 554 to 1673 (+202.0%, p 0); recon.reportsDelivered 1185 to 3042 (+156.7%, p 0); squadPerformance.meanOverall 4915.399999999999 to 4836.499999999999 (-1.6%, p 0); squadPerformance.meanMission 3993.8000000000015 to 3750.9000000000005 (-6.1%, p 0); squadPerformance.meanMovement 5990.199999999998 to 5986.9000000000015 (-0.1%, p 0); squadPerformance.meanControl 5698.200000000001 to 5568.600000000003 (-2.3%, p 0).
- Under 0.05 only: recon.noContact 987 to 900 (-8.8%, p 0.0018); grenades.bursts 43 to 61 (+41.9%, p 0.0033); grenades.throws 44 to 62 (+40.9%, p 0.0052); stallOutcomes.wakes 12 to 2 (-83.3%, p 0.0215); recon.retriggerBlocked 944 to 1048 (+11.0%, p 0.0479).
- Wall time on/off x1.461 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.461 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2870 | 2220 | -10.8333 | 60 | 8 | 52 | 0 |
| `usKills` | 1440 | 980 | -7.6667 | 57 | 13 | 44 | 0 |
| `geKills` | 1430 | 1240 | -3.1667 | 60 | 24 | 36 | 0.155 |
| `fire.total` | 44498 | 74164 | 494.4333 | 60 | 54 | 6 | 0 |
| `fire.hits` | 6347 | 5020 | -22.1167 | 60 | 13 | 47 | 0 |
| `retreatSamples` | 126569 | 120472 | -101.6167 | 60 | 27 | 33 | 0.519 |
| `movementResolver.changes` | 210273 | 321790 | 1858.6167 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 44 | 62 | 0.3 | 30 | 23 | 7 | 0.0052 |
| `grenades.bursts` | 43 | 61 | 0.3 | 31 | 24 | 7 | 0.0033 |
| `grenades.wounded` | 31 | 38 | 0.1167 | 10 | 6 | 4 | 0.7539 |
| `grenades.casualties` | 10 | 13 | 0.05 | 7 | 5 | 2 | 0.4531 |
| `grenades.suppressed` | 97 | 89 | -0.1333 | 14 | 9 | 5 | 0.424 |
| `grenades.friendlyWounded` | 1 | 4 | 0.05 | 3 | 2 | 1 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 8 | 26 | 0.3 | 15 | 10 | 5 | 0.3018 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 123 | 16 | -1.7833 | 46 | 4 | 42 | 0 |
| `loopAlerts.length` | 898 | 1990 | 18.2 | 60 | 58 | 2 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 251 | 421 | 2.8333 | 55 | 44 | 11 | 0 |
| `stallOutcomes.wakes` | 12 | 2 | -0.1667 | 10 | 1 | 9 | 0.0215 |
| `stallOutcomes.repeats` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1914 | 3483 | 26.15 | 60 | 59 | 1 | 0 |
| `recon.contacts` | 278 | 825 | 9.1167 | 59 | 53 | 6 | 0 |
| `recon.noContact` | 987 | 900 | -1.45 | 51 | 14 | 37 | 0.0018 |
| `recon.timeouts` | 41 | 32 | -0.15 | 21 | 9 | 12 | 0.6636 |
| `recon.cancelled` | 554 | 1673 | 18.65 | 60 | 60 | 0 | 0 |
| `recon.reportsDelivered` | 1185 | 3042 | 30.95 | 60 | 50 | 10 | 0 |
| `recon.retriggerBlocked` | 944 | 1048 | 1.7333 | 58 | 37 | 21 | 0.0479 |
| `squadPerformance.meanOverall` | 4915.399999999999 | 4836.499999999999 | -1.315 | 57 | 12 | 45 | 0 |
| `squadPerformance.p10Overall` | 4476.500000000001 | 4466.6 | -0.165 | 35 | 14 | 21 | 0.3105 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3993.8000000000015 | 3750.9000000000005 | -4.0483 | 59 | 13 | 46 | 0 |
| `squadPerformance.meanMovement` | 5990.199999999998 | 5986.9000000000015 | -0.055 | 41 | 7 | 34 | 0 |
| `squadPerformance.meanControl` | 5698.200000000001 | 5568.600000000003 | -2.16 | 60 | 11 | 49 | 0 |
| `squadPerformance.meanCohesion` | 5405.599999999999 | 5445.7 | 0.6683 | 58 | 32 | 26 | 0.5118 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr795-m4-20261108-0001 0.15 s (timeline) · pr795-m4-20261108-0002 0.15 s (timeline) · pr795-m4-20261108-0003 0.15 s (timeline) · pr795-m4-20261108-0004 0.15 s (timeline) · pr795-m4-20261108-0005 0.15 s (timeline) · pr795-m4-20261108-0006 0.15 s (timeline) · pr795-m4-20261108-0007 0.15 s (timeline) · pr795-m4-20261108-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1788&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr795-504f69e3/ai_flow_live.html?bench=1788&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1788`); it opens the seed that parts earliest, and the dropdowns choose another.

