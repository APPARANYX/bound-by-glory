# Benchmark run #1738 · 60 seeds from `controller-natural-20261026` (ge-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr785-9855b01 @ 9855b01 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42386183815) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 16 of 42 counters under p 0.05 (about 2.1 by chance), 12 under 0.0012; casualties -5.5% (p 0.0627)**

- Clears the Bonferroni line (p < 0.0012): fire.total 44324 to 76430 (+72.4%, p 0); movementResolver.changes 199895 to 287631 (+43.9%, p 0); vacantObjectiveStalls.length 86 to 12 (-86.0%, p 0); loopAlerts.length 899 to 1585 (+76.3%, p 0); recon.orders 1959 to 3262 (+66.5%, p 0); recon.contacts 311 to 696 (+123.8%, p 0); recon.cancelled 563 to 1590 (+182.4%, p 0); recon.reportsDelivered 1205 to 2698 (+123.9%, p 0); squadPerformance.meanControl 5712.2 to 5592.700000000002 (-2.1%, p 0); squadPerformance.meanCohesion 5396.700000000002 to 5546.999999999998 (+2.8%, p 0); recon.retriggerBlocked 948 to 1106 (+16.7%, p 0.0001); squadPerformance.meanMission 3978.899999999999 to 3783.9 (-4.9%, p 0.0004).
- Under 0.05 only: squadPerformance.meanOverall 4911 to 4853.699999999998 (-1.2%, p 0.0062); grenades.throws 42 to 70 (+66.7%, p 0.0169); grenades.bursts 41 to 70 (+70.7%, p 0.0169); grenades.aborted 5 to 14 (+180.0%, p 0.0391).
- Wall time on/off x1.445 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.445 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 3017 | 2851 | -2.7667 | 57 | 21 | 36 | 0.0627 |
| `usKills` | 1235 | 1109 | -2.1 | 60 | 24 | 36 | 0.155 |
| `geKills` | 1782 | 1742 | -0.6667 | 58 | 28 | 30 | 0.8957 |
| `fire.total` | 44324 | 76430 | 535.1 | 60 | 57 | 3 | 0 |
| `fire.hits` | 6555 | 6444 | -1.85 | 60 | 25 | 35 | 0.2451 |
| `retreatSamples` | 122059 | 139540 | 291.35 | 60 | 37 | 23 | 0.0925 |
| `movementResolver.changes` | 199895 | 287631 | 1462.2667 | 60 | 58 | 2 | 0 |
| `grenades.throws` | 42 | 70 | 0.4667 | 22 | 17 | 5 | 0.0169 |
| `grenades.bursts` | 41 | 70 | 0.4833 | 22 | 17 | 5 | 0.0169 |
| `grenades.wounded` | 23 | 43 | 0.3333 | 12 | 8 | 4 | 0.3877 |
| `grenades.casualties` | 7 | 13 | 0.1 | 8 | 4 | 4 | 1 |
| `grenades.suppressed` | 58 | 113 | 0.9167 | 18 | 12 | 6 | 0.2379 |
| `grenades.friendlyWounded` | 0 | 3 | 0.05 | 2 | 2 | 0 | 0.5 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 5 | 14 | 0.15 | 9 | 8 | 1 | 0.0391 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 86 | 12 | -1.2333 | 46 | 6 | 40 | 0 |
| `loopAlerts.length` | 899 | 1585 | 11.4333 | 59 | 47 | 12 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 212 | 242 | 0.5 | 49 | 27 | 22 | 0.5682 |
| `stallOutcomes.wakes` | 10 | 4 | -0.1 | 11 | 2 | 9 | 0.0654 |
| `stallOutcomes.repeats` | 1 | 2 | 0.0167 | 2 | 1 | 1 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1959 | 3262 | 21.7167 | 60 | 58 | 2 | 0 |
| `recon.contacts` | 311 | 696 | 6.4167 | 58 | 52 | 6 | 0 |
| `recon.noContact` | 981 | 894 | -1.45 | 54 | 20 | 34 | 0.0759 |
| `recon.timeouts` | 59 | 37 | -0.3667 | 31 | 10 | 21 | 0.0708 |
| `recon.cancelled` | 563 | 1590 | 17.1167 | 60 | 59 | 1 | 0 |
| `recon.reportsDelivered` | 1205 | 2698 | 24.8833 | 60 | 50 | 10 | 0 |
| `recon.retriggerBlocked` | 948 | 1106 | 2.6333 | 53 | 41 | 12 | 0.0001 |
| `squadPerformance.meanOverall` | 4911 | 4853.699999999998 | -0.955 | 60 | 19 | 41 | 0.0062 |
| `squadPerformance.p10Overall` | 4483.6 | 4475.2 | -0.14 | 33 | 14 | 19 | 0.4869 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3978.899999999999 | 3783.9 | -3.25 | 60 | 16 | 44 | 0.0004 |
| `squadPerformance.meanMovement` | 5990.3 | 5989.7 | -0.01 | 31 | 12 | 19 | 0.281 |
| `squadPerformance.meanControl` | 5712.2 | 5592.700000000002 | -1.9917 | 60 | 13 | 47 | 0 |
| `squadPerformance.meanCohesion` | 5396.700000000002 | 5546.999999999998 | 2.505 | 60 | 51 | 9 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 0.15 s (timeline) · controller-natural-20261026-0002 0.15 s (timeline) · controller-natural-20261026-0003 0.15 s (timeline) · controller-natural-20261026-0004 0.15 s (timeline) · controller-natural-20261026-0005 0.15 s (timeline) · controller-natural-20261026-0006 0.15 s (timeline) · controller-natural-20261026-0007 0.15 s (timeline) · controller-natural-20261026-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1738&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr785-9855b01/ai_flow_live.html?bench=1738&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1738`); it opens the seed that parts earliest, and the dropdowns choose another.

