# Benchmark run #1737 · 60 seeds from `controller-natural-20261026` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr785-9855b01 @ 9855b01 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42386174124) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 18 of 42 counters under p 0.05 (about 2.1 by chance), 14 under 0.0012; casualties -7.6% (p 0.0363)**

- Clears the Bonferroni line (p < 0.0012): fire.total 47266 to 82297 (+74.1%, p 0); retreatSamples 143837 to 174163 (+21.1%, p 0); movementResolver.changes 212846 to 287342 (+35.0%, p 0); vacantObjectiveStalls.length 127 to 21 (-83.5%, p 0); loopAlerts.length 1123 to 1858 (+65.4%, p 0); recon.orders 1887 to 2926 (+55.1%, p 0); recon.contacts 266 to 551 (+107.1%, p 0); recon.cancelled 524 to 1275 (+143.3%, p 0); recon.reportsDelivered 1082 to 2123 (+96.2%, p 0); squadPerformance.meanOverall 4894.200000000002 to 4824.000000000001 (-1.4%, p 0); squadPerformance.meanMission 3916.2000000000003 to 3670 (-6.3%, p 0); squadPerformance.meanControl 5723.200000000001 to 5638.200000000001 (-1.5%, p 0); squadPerformance.meanCohesion 5432.299999999999 to 5578.000000000001 (+2.7%, p 0); recon.retriggerBlocked 1003 to 1124 (+12.1%, p 0.0001).
- Under 0.05 only: grenades.wounded 17 to 49 (+188.2%, p 0.0213); grenades.suppressed 49 to 137 (+179.6%, p 0.0309); grenades.throws 38 to 66 (+73.7%, p 0.0347); casualties 3002 to 2773 (-7.6%, p 0.0363).
- Wall time on/off x1.408 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.408 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 3002 | 2773 | -3.8167 | 59 | 21 | 38 | 0.0363 |
| `usKills` | 1453 | 1320 | -2.2167 | 56 | 24 | 32 | 0.3497 |
| `geKills` | 1549 | 1453 | -1.6 | 57 | 28 | 29 | 1 |
| `fire.total` | 47266 | 82297 | 583.85 | 60 | 59 | 1 | 0 |
| `fire.hits` | 6665 | 6465 | -3.3333 | 60 | 23 | 37 | 0.0925 |
| `retreatSamples` | 143837 | 174163 | 505.4333 | 60 | 47 | 13 | 0 |
| `movementResolver.changes` | 212846 | 287342 | 1241.6 | 60 | 59 | 1 | 0 |
| `grenades.throws` | 38 | 66 | 0.4667 | 23 | 17 | 6 | 0.0347 |
| `grenades.bursts` | 38 | 65 | 0.45 | 22 | 16 | 6 | 0.0525 |
| `grenades.wounded` | 17 | 49 | 0.5333 | 16 | 13 | 3 | 0.0213 |
| `grenades.casualties` | 9 | 16 | 0.1167 | 8 | 6 | 2 | 0.2891 |
| `grenades.suppressed` | 49 | 137 | 1.4667 | 18 | 14 | 4 | 0.0309 |
| `grenades.friendlyWounded` | 1 | 3 | 0.0333 | 4 | 3 | 1 | 0.625 |
| `grenades.friendlyCasualties` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `grenades.aborted` | 4 | 15 | 0.1833 | 13 | 10 | 3 | 0.0923 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 127 | 21 | -1.7667 | 50 | 4 | 46 | 0 |
| `loopAlerts.length` | 1123 | 1858 | 12.25 | 60 | 48 | 12 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 266 | 285 | 0.3167 | 50 | 26 | 24 | 0.8877 |
| `stallOutcomes.wakes` | 4 | 5 | 0.0167 | 7 | 4 | 3 | 1 |
| `stallOutcomes.repeats` | 2 | 3 | 0.0167 | 3 | 2 | 1 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1887 | 2926 | 17.3167 | 60 | 59 | 1 | 0 |
| `recon.contacts` | 266 | 551 | 4.75 | 56 | 50 | 6 | 0 |
| `recon.noContact` | 975 | 966 | -0.15 | 50 | 26 | 24 | 0.8877 |
| `recon.timeouts` | 61 | 61 | 0 | 26 | 13 | 13 | 1 |
| `recon.cancelled` | 524 | 1275 | 12.5167 | 60 | 59 | 1 | 0 |
| `recon.reportsDelivered` | 1082 | 2123 | 17.35 | 59 | 48 | 11 | 0 |
| `recon.retriggerBlocked` | 1003 | 1124 | 2.0167 | 55 | 42 | 13 | 0.0001 |
| `squadPerformance.meanOverall` | 4894.200000000002 | 4824.000000000001 | -1.17 | 58 | 10 | 48 | 0 |
| `squadPerformance.p10Overall` | 4471.099999999999 | 4460.699999999999 | -0.1733 | 27 | 10 | 17 | 0.2478 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3916.2000000000003 | 3670 | -4.1033 | 60 | 10 | 50 | 0 |
| `squadPerformance.meanMovement` | 5989.5999999999985 | 5988.9 | -0.0117 | 39 | 17 | 22 | 0.5224 |
| `squadPerformance.meanControl` | 5723.200000000001 | 5638.200000000001 | -1.4167 | 58 | 12 | 46 | 0 |
| `squadPerformance.meanCohesion` | 5432.299999999999 | 5578.000000000001 | 2.4283 | 59 | 49 | 10 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 0.15 s (timeline) · controller-natural-20261026-0002 0.15 s (timeline) · controller-natural-20261026-0003 0.15 s (timeline) · controller-natural-20261026-0004 0.15 s (timeline) · controller-natural-20261026-0005 0.15 s (timeline) · controller-natural-20261026-0006 0.15 s (timeline) · controller-natural-20261026-0007 0.15 s (timeline) · controller-natural-20261026-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1737&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr785-9855b01/ai_flow_live.html?bench=1737&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1737`); it opens the seed that parts earliest, and the dropdowns choose another.

