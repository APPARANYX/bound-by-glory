# Benchmark run #1773 · 60 seeds from `pr793-m3-20261108` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr793-156811c @ 156811c · [run](https://github.com/APPARANYX/grasstex/actions/runs/42493647908) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 16 of 42 counters under p 0.05 (about 2.1 by chance), 13 under 0.0012; casualties -10.2% (p 0.0183)**

- Clears the Bonferroni line (p < 0.0012): fire.total 46128 to 83389 (+80.8%, p 0); movementResolver.changes 208633 to 287857 (+38.0%, p 0); vacantObjectiveStalls.length 105 to 19 (-81.9%, p 0); loopAlerts.length 940 to 1863 (+98.2%, p 0); recon.orders 1868 to 3088 (+65.3%, p 0); recon.contacts 291 to 636 (+118.6%, p 0); recon.cancelled 503 to 1349 (+168.2%, p 0); recon.reportsDelivered 1201 to 2595 (+116.1%, p 0); recon.retriggerBlocked 930 to 1099 (+18.2%, p 0); squadPerformance.meanOverall 4891.799999999999 to 4812.499999999999 (-1.6%, p 0); squadPerformance.meanMission 3925.4000000000005 to 3629.0000000000005 (-7.6%, p 0); squadPerformance.meanControl 5733.8 to 5626.200000000002 (-1.9%, p 0); squadPerformance.meanCohesion 5418.200000000001 to 5585.800000000002 (+3.1%, p 0).
- Under 0.05 only: retreatSamples 139621 to 174811 (+25.2%, p 0.0027); usKills 1531 to 1328 (-13.3%, p 0.0075); casualties 2992 to 2687 (-10.2%, p 0.0183).
- Wall time on/off x1.6 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.6 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2992 | 2687 | -5.0833 | 59 | 20 | 39 | 0.0183 |
| `usKills` | 1531 | 1328 | -3.3833 | 57 | 18 | 39 | 0.0075 |
| `geKills` | 1461 | 1359 | -1.7 | 57 | 23 | 34 | 0.1849 |
| `fire.total` | 46128 | 83389 | 621.0167 | 60 | 59 | 1 | 0 |
| `fire.hits` | 6461 | 6348 | -1.8833 | 60 | 27 | 33 | 0.519 |
| `retreatSamples` | 139621 | 174811 | 586.5 | 60 | 42 | 18 | 0.0027 |
| `movementResolver.changes` | 208633 | 287857 | 1320.4 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 47 | 42 | -0.0833 | 20 | 13 | 7 | 0.2632 |
| `grenades.bursts` | 47 | 42 | -0.0833 | 20 | 13 | 7 | 0.2632 |
| `grenades.wounded` | 50 | 45 | -0.0833 | 16 | 9 | 7 | 0.8036 |
| `grenades.casualties` | 12 | 17 | 0.0833 | 9 | 6 | 3 | 0.5078 |
| `grenades.suppressed` | 100 | 98 | -0.0333 | 16 | 9 | 7 | 0.8036 |
| `grenades.friendlyWounded` | 10 | 3 | -0.1167 | 4 | 1 | 3 | 0.625 |
| `grenades.friendlyCasualties` | 4 | 0 | -0.0667 | 2 | 0 | 2 | 0.5 |
| `grenades.aborted` | 4 | 4 | 0 | 6 | 3 | 3 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 105 | 19 | -1.4333 | 43 | 4 | 39 | 0 |
| `loopAlerts.length` | 940 | 1863 | 15.3833 | 60 | 51 | 9 | 0 |
| `writerConflicts` | 0 | 4 | 0.0667 | 1 | 1 | 0 | 1 |
| `regroups.entries` | 234 | 303 | 1.15 | 53 | 32 | 21 | 0.169 |
| `stallOutcomes.wakes` | 5 | 4 | -0.0167 | 9 | 4 | 5 | 1 |
| `stallOutcomes.repeats` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1868 | 3088 | 20.3333 | 60 | 60 | 0 | 0 |
| `recon.contacts` | 291 | 636 | 5.75 | 59 | 52 | 7 | 0 |
| `recon.noContact` | 970 | 958 | -0.2 | 50 | 20 | 30 | 0.2026 |
| `recon.timeouts` | 58 | 56 | -0.0333 | 29 | 13 | 16 | 0.7111 |
| `recon.cancelled` | 503 | 1349 | 14.1 | 58 | 58 | 0 | 0 |
| `recon.reportsDelivered` | 1201 | 2595 | 23.2333 | 59 | 50 | 9 | 0 |
| `recon.retriggerBlocked` | 930 | 1099 | 2.8167 | 53 | 43 | 10 | 0 |
| `squadPerformance.meanOverall` | 4891.799999999999 | 4812.499999999999 | -1.3217 | 60 | 12 | 48 | 0 |
| `squadPerformance.p10Overall` | 4463.499999999999 | 4457.200000000001 | -0.105 | 22 | 11 | 11 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3925.4000000000005 | 3629.0000000000005 | -4.94 | 60 | 8 | 52 | 0 |
| `squadPerformance.meanMovement` | 5990.799999999999 | 5989.2 | -0.0267 | 35 | 14 | 21 | 0.3105 |
| `squadPerformance.meanControl` | 5733.8 | 5626.200000000002 | -1.7933 | 59 | 13 | 46 | 0 |
| `squadPerformance.meanCohesion` | 5418.200000000001 | 5585.800000000002 | 2.7933 | 57 | 48 | 9 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr793-m3-20261108-0001 0.15 s (timeline) · pr793-m3-20261108-0002 0.15 s (timeline) · pr793-m3-20261108-0003 0.15 s (timeline) · pr793-m3-20261108-0004 0.15 s (timeline) · pr793-m3-20261108-0005 0.15 s (timeline) · pr793-m3-20261108-0006 0.15 s (timeline) · pr793-m3-20261108-0007 0.15 s (timeline) · pr793-m3-20261108-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1773&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr793-156811c/ai_flow_live.html?bench=1773&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1773`); it opens the seed that parts earliest, and the dropdowns choose another.

