# Benchmark run #1806 · 60 seeds from `pr796-s1a-20261108` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr796-main-b811827 @ b811827 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42536364668) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 19 of 42 counters under p 0.05 (about 2.1 by chance), 18 under 0.0012; casualties -23.5% (p 0)**

- Clears the Bonferroni line (p < 0.0012): casualties 2900 to 2219 (-23.5%, p 0); fire.total 45478 to 75425 (+65.8%, p 0); fire.hits 6465 to 5100 (-21.1%, p 0); movementResolver.changes 212065 to 322365 (+52.0%, p 0); vacantObjectiveStalls.length 127 to 18 (-85.8%, p 0); loopAlerts.length 901 to 2001 (+122.1%, p 0); recon.orders 1995 to 3544 (+77.6%, p 0); recon.contacts 280 to 836 (+198.6%, p 0); recon.noContact 1019 to 839 (-17.7%, p 0); recon.cancelled 590 to 1743 (+195.4%, p 0); recon.reportsDelivered 1180 to 3257 (+176.0%, p 0); squadPerformance.meanOverall 4903.6 to 4823.800000000002 (-1.6%, p 0); squadPerformance.meanMission 3933.9 to 3734.2 (-5.1%, p 0); squadPerformance.meanControl 5722.000000000002 to 5559.499999999999 (-2.8%, p 0); geKills 1507 to 1214 (-19.4%, p 0.0001); squadPerformance.meanMovement 5990.700000000002 to 5985.500000000002 (-0.1%, p 0.0001); regroups.entries 235 to 398 (+69.4%, p 0.0002); usKills 1393 to 1005 (-27.9%, p 0.0009).
- Under 0.05 only: recon.retriggerBlocked 960 to 1035 (+7.8%, p 0.0444).
- Wall time on/off x1.529 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.529 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2900 | 2219 | -11.35 | 60 | 6 | 54 | 0 |
| `usKills` | 1393 | 1005 | -6.4667 | 58 | 16 | 42 | 0.0009 |
| `geKills` | 1507 | 1214 | -4.8833 | 58 | 14 | 44 | 0.0001 |
| `fire.total` | 45478 | 75425 | 499.1167 | 60 | 58 | 2 | 0 |
| `fire.hits` | 6465 | 5100 | -22.75 | 60 | 11 | 49 | 0 |
| `retreatSamples` | 135555 | 126594 | -149.35 | 60 | 25 | 35 | 0.2451 |
| `movementResolver.changes` | 212065 | 322365 | 1838.3333 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 32 | 37 | 0.0833 | 22 | 16 | 6 | 0.0525 |
| `grenades.bursts` | 32 | 36 | 0.0667 | 22 | 16 | 6 | 0.0525 |
| `grenades.wounded` | 12 | 12 | 0 | 7 | 4 | 3 | 1 |
| `grenades.casualties` | 3 | 5 | 0.0333 | 6 | 3 | 3 | 1 |
| `grenades.suppressed` | 33 | 30 | -0.05 | 11 | 5 | 6 | 1 |
| `grenades.friendlyWounded` | 3 | 0 | -0.05 | 1 | 0 | 1 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 3 | 10 | 0.1167 | 10 | 7 | 3 | 0.3438 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 127 | 18 | -1.8167 | 47 | 3 | 44 | 0 |
| `loopAlerts.length` | 901 | 2001 | 18.3333 | 60 | 53 | 7 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 235 | 398 | 2.7167 | 56 | 42 | 14 | 0.0002 |
| `stallOutcomes.wakes` | 9 | 5 | -0.0667 | 14 | 5 | 9 | 0.424 |
| `stallOutcomes.repeats` | 2 | 1 | -0.0167 | 3 | 1 | 2 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1995 | 3544 | 25.8167 | 60 | 59 | 1 | 0 |
| `recon.contacts` | 280 | 836 | 9.2667 | 60 | 57 | 3 | 0 |
| `recon.noContact` | 1019 | 839 | -3 | 55 | 12 | 43 | 0 |
| `recon.timeouts` | 61 | 44 | -0.2833 | 28 | 11 | 17 | 0.3449 |
| `recon.cancelled` | 590 | 1743 | 19.2167 | 59 | 58 | 1 | 0 |
| `recon.reportsDelivered` | 1180 | 3257 | 34.6167 | 60 | 55 | 5 | 0 |
| `recon.retriggerBlocked` | 960 | 1035 | 1.25 | 49 | 32 | 17 | 0.0444 |
| `squadPerformance.meanOverall` | 4903.6 | 4823.800000000002 | -1.33 | 58 | 10 | 48 | 0 |
| `squadPerformance.p10Overall` | 4474.799999999999 | 4456.6 | -0.3033 | 29 | 10 | 19 | 0.136 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3933.9 | 3734.2 | -3.3283 | 59 | 11 | 48 | 0 |
| `squadPerformance.meanMovement` | 5990.700000000002 | 5985.500000000002 | -0.0867 | 39 | 7 | 32 | 0.0001 |
| `squadPerformance.meanControl` | 5722.000000000002 | 5559.499999999999 | -2.7083 | 60 | 5 | 55 | 0 |
| `squadPerformance.meanCohesion` | 5441.400000000001 | 5439.900000000001 | -0.025 | 58 | 28 | 30 | 0.8957 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr796-s1a-20261108-0001 0.15 s (timeline) · pr796-s1a-20261108-0002 0.15 s (timeline) · pr796-s1a-20261108-0003 0.15 s (timeline) · pr796-s1a-20261108-0004 0.15 s (timeline) · pr796-s1a-20261108-0005 0.15 s (timeline) · pr796-s1a-20261108-0006 0.15 s (timeline) · pr796-s1a-20261108-0007 0.15 s (timeline) · pr796-s1a-20261108-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1806&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr796-main-b811827/ai_flow_live.html?bench=1806&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1806`); it opens the seed that parts earliest, and the dropdowns choose another.

