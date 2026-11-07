# Benchmark run #1736 · 60 seeds from `controller-natural-20261026` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr785-9855b01 @ 9855b01 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42386165604) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 17 of 42 counters under p 0.05 (about 2.1 by chance), 10 under 0.0012; casualties -3.5% (p 0.3581)**

- Clears the Bonferroni line (p < 0.0012): fire.total 39764 to 68905 (+73.3%, p 0); movementResolver.changes 210010 to 300191 (+42.9%, p 0); vacantObjectiveStalls.length 278 to 54 (-80.6%, p 0); loopAlerts.length 721 to 2126 (+194.9%, p 0); recon.noContact 1106 to 918 (-17.0%, p 0); recon.cancelled 463 to 695 (+50.1%, p 0); squadPerformance.meanOverall 4806.700000000001 to 4690.400000000001 (-2.4%, p 0); squadPerformance.meanMission 3780.8 to 3469.699999999999 (-8.2%, p 0); squadPerformance.meanControl 5616 to 5376.100000000001 (-4.3%, p 0); squadPerformance.meanCohesion 5425.999999999998 to 5583.900000000002 (+2.9%, p 0).
- Under 0.05 only: squadPerformance.meanMovement 5984.800000000001 to 5979.600000000001 (-0.1%, p 0.0031); usKills 1300 to 1098 (-15.5%, p 0.0065); grenades.throws 11 to 34 (+209.1%, p 0.0075); grenades.bursts 11 to 34 (+209.1%, p 0.0075); recon.retriggerBlocked 1333 to 1401 (+5.1%, p 0.0175); retreatSamples 103776 to 119198 (+14.9%, p 0.0273); regroups.entries 227 to 309 (+36.1%, p 0.0402).
- Wall time on/off x1.433 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.433 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2695 | 2601 | -1.5667 | 58 | 25 | 33 | 0.3581 |
| `usKills` | 1300 | 1098 | -3.3667 | 55 | 17 | 38 | 0.0065 |
| `geKills` | 1395 | 1503 | 1.8 | 57 | 29 | 28 | 1 |
| `fire.total` | 39764 | 68905 | 485.6833 | 60 | 56 | 4 | 0 |
| `fire.hits` | 6063 | 5838 | -3.75 | 60 | 26 | 34 | 0.3663 |
| `retreatSamples` | 103776 | 119198 | 257.0333 | 60 | 39 | 21 | 0.0273 |
| `movementResolver.changes` | 210010 | 300191 | 1503.0167 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 11 | 34 | 0.3833 | 18 | 15 | 3 | 0.0075 |
| `grenades.bursts` | 11 | 34 | 0.3833 | 18 | 15 | 3 | 0.0075 |
| `grenades.wounded` | 6 | 30 | 0.4 | 11 | 8 | 3 | 0.2266 |
| `grenades.casualties` | 3 | 12 | 0.15 | 8 | 7 | 1 | 0.0703 |
| `grenades.suppressed` | 10 | 62 | 0.8667 | 10 | 8 | 2 | 0.1094 |
| `grenades.friendlyWounded` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 5 | 2 | -0.05 | 3 | 1 | 2 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 278 | 54 | -3.7333 | 53 | 2 | 51 | 0 |
| `loopAlerts.length` | 721 | 2126 | 23.4167 | 60 | 57 | 3 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 227 | 309 | 1.3667 | 54 | 35 | 19 | 0.0402 |
| `stallOutcomes.wakes` | 4 | 6 | 0.0333 | 8 | 5 | 3 | 0.7266 |
| `stallOutcomes.repeats` | 1 | 3 | 0.0333 | 4 | 3 | 1 | 0.625 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1742 | 1798 | 0.9333 | 56 | 32 | 24 | 0.3497 |
| `recon.contacts` | 87 | 96 | 0.15 | 48 | 27 | 21 | 0.4709 |
| `recon.noContact` | 1106 | 918 | -3.1333 | 57 | 10 | 47 | 0 |
| `recon.timeouts` | 16 | 13 | -0.05 | 19 | 8 | 11 | 0.6476 |
| `recon.cancelled` | 463 | 695 | 3.8667 | 57 | 49 | 8 | 0 |
| `recon.reportsDelivered` | 433 | 501 | 1.1333 | 54 | 30 | 24 | 0.4966 |
| `recon.retriggerBlocked` | 1333 | 1401 | 1.1333 | 52 | 35 | 17 | 0.0175 |
| `squadPerformance.meanOverall` | 4806.700000000001 | 4690.400000000001 | -1.9383 | 60 | 8 | 52 | 0 |
| `squadPerformance.p10Overall` | 4470.2 | 4458.2 | -0.2 | 32 | 13 | 19 | 0.3771 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3780.8 | 3469.699999999999 | -5.185 | 60 | 9 | 51 | 0 |
| `squadPerformance.meanMovement` | 5984.800000000001 | 5979.600000000001 | -0.0867 | 47 | 13 | 34 | 0.0031 |
| `squadPerformance.meanControl` | 5616 | 5376.100000000001 | -3.9983 | 60 | 8 | 52 | 0 |
| `squadPerformance.meanCohesion` | 5425.999999999998 | 5583.900000000002 | 2.6317 | 60 | 52 | 8 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 0.15 s (timeline) · controller-natural-20261026-0002 0.15 s (timeline) · controller-natural-20261026-0003 0.15 s (timeline) · controller-natural-20261026-0004 0.15 s (timeline) · controller-natural-20261026-0005 0.15 s (timeline) · controller-natural-20261026-0006 0.15 s (timeline) · controller-natural-20261026-0007 0.15 s (timeline) · controller-natural-20261026-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1736&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr785-9855b01/ai_flow_live.html?bench=1736&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1736`); it opens the seed that parts earliest, and the dropdowns choose another.

