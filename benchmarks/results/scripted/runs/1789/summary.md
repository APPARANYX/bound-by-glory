# Benchmark run #1789 · 60 seeds from `pr795-m4-20261108` (ge-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr795-504f69e3 @ 504f69e · [run](https://github.com/APPARANYX/grasstex/actions/runs/42519063448) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 18 of 42 counters under p 0.05 (about 2.1 by chance), 17 under 0.0012; casualties -27.1% (p 0)**

- Clears the Bonferroni line (p < 0.0012): casualties 2962 to 2158 (-27.1%, p 0); geKills 1742 to 1210 (-30.5%, p 0); fire.total 44738 to 69918 (+56.3%, p 0); fire.hits 6398 to 5035 (-21.3%, p 0); movementResolver.changes 198816 to 315634 (+58.8%, p 0); vacantObjectiveStalls.length 88 to 10 (-88.6%, p 0); loopAlerts.length 1147 to 1815 (+58.2%, p 0); recon.orders 1881 to 3704 (+96.9%, p 0); recon.contacts 271 to 778 (+187.1%, p 0); recon.cancelled 545 to 2003 (+267.5%, p 0); recon.reportsDelivered 1165 to 3108 (+166.8%, p 0); recon.retriggerBlocked 908 to 1086 (+19.6%, p 0); squadPerformance.meanMission 3975.2999999999993 to 3783.9999999999995 (-4.8%, p 0); squadPerformance.meanControl 5698.300000000001 to 5561.300000000001 (-2.4%, p 0); usKills 1220 to 948 (-22.3%, p 0.0002); recon.noContact 968 to 830 (-14.3%, p 0.0002); squadPerformance.meanOverall 4909.4 to 4841.000000000001 (-1.4%, p 0.0002).
- Under 0.05 only: squadPerformance.meanMovement 5990.2 to 5988.4000000000015 (-0.0%, p 0.0201).
- Wall time on/off x1.445 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.445 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2962 | 2158 | -13.4 | 60 | 4 | 56 | 0 |
| `usKills` | 1220 | 948 | -4.5333 | 57 | 14 | 43 | 0.0002 |
| `geKills` | 1742 | 1210 | -8.8667 | 58 | 7 | 51 | 0 |
| `fire.total` | 44738 | 69918 | 419.6667 | 60 | 52 | 8 | 0 |
| `fire.hits` | 6398 | 5035 | -22.7167 | 60 | 11 | 49 | 0 |
| `retreatSamples` | 120221 | 119585 | -10.6 | 60 | 26 | 34 | 0.3663 |
| `movementResolver.changes` | 198816 | 315634 | 1946.9667 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 71 | 69 | -0.0333 | 29 | 17 | 12 | 0.4583 |
| `grenades.bursts` | 71 | 68 | -0.05 | 29 | 17 | 12 | 0.4583 |
| `grenades.wounded` | 43 | 33 | -0.1667 | 17 | 8 | 9 | 1 |
| `grenades.casualties` | 17 | 11 | -0.1 | 12 | 5 | 7 | 0.7744 |
| `grenades.suppressed` | 115 | 90 | -0.4167 | 20 | 10 | 10 | 1 |
| `grenades.friendlyWounded` | 4 | 1 | -0.05 | 5 | 1 | 4 | 0.375 |
| `grenades.friendlyCasualties` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `grenades.aborted` | 10 | 12 | 0.0333 | 12 | 6 | 6 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 88 | 10 | -1.3 | 41 | 5 | 36 | 0 |
| `loopAlerts.length` | 1147 | 1815 | 11.1333 | 60 | 48 | 12 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 264 | 328 | 1.0667 | 51 | 30 | 21 | 0.2624 |
| `stallOutcomes.wakes` | 13 | 11 | -0.0333 | 18 | 7 | 11 | 0.4807 |
| `stallOutcomes.repeats` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1881 | 3704 | 30.3833 | 60 | 60 | 0 | 0 |
| `recon.contacts` | 271 | 778 | 8.45 | 57 | 51 | 6 | 0 |
| `recon.noContact` | 968 | 830 | -2.3 | 57 | 14 | 43 | 0.0002 |
| `recon.timeouts` | 41 | 34 | -0.1167 | 24 | 10 | 14 | 0.5413 |
| `recon.cancelled` | 545 | 2003 | 24.3 | 60 | 60 | 0 | 0 |
| `recon.reportsDelivered` | 1165 | 3108 | 32.3833 | 60 | 53 | 7 | 0 |
| `recon.retriggerBlocked` | 908 | 1086 | 2.9667 | 53 | 46 | 7 | 0 |
| `squadPerformance.meanOverall` | 4909.4 | 4841.000000000001 | -1.14 | 57 | 14 | 43 | 0.0002 |
| `squadPerformance.p10Overall` | 4482 | 4478.9 | -0.0517 | 36 | 19 | 17 | 0.8679 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3975.2999999999993 | 3783.9999999999995 | -3.1883 | 60 | 14 | 46 | 0 |
| `squadPerformance.meanMovement` | 5990.2 | 5988.4000000000015 | -0.03 | 37 | 11 | 26 | 0.0201 |
| `squadPerformance.meanControl` | 5698.300000000001 | 5561.300000000001 | -2.2833 | 60 | 12 | 48 | 0 |
| `squadPerformance.meanCohesion` | 5413.100000000001 | 5439.3 | 0.4367 | 60 | 32 | 28 | 0.6989 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr795-m4-20261108-0001 0.15 s (timeline) · pr795-m4-20261108-0002 0.15 s (timeline) · pr795-m4-20261108-0003 0.15 s (timeline) · pr795-m4-20261108-0004 0.15 s (timeline) · pr795-m4-20261108-0005 0.15 s (timeline) · pr795-m4-20261108-0006 0.15 s (timeline) · pr795-m4-20261108-0007 0.15 s (timeline) · pr795-m4-20261108-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1789&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr795-504f69e3/ai_flow_live.html?bench=1789&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1789`); it opens the seed that parts earliest, and the dropdowns choose another.

