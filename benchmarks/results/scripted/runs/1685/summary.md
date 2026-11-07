# Benchmark run #1685 · 60 seeds from `controller-natural-20261026` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/pin/pr776-cbe2da76 @ cbe2da7 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42320441689) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 16 of 42 counters under p 0.05 (about 2.1 by chance), 10 under 0.0012; casualties -5.0% (p 0.6655)**

- Clears the Bonferroni line (p < 0.0012): fire.total 32763 to 57266 (+74.8%, p 0); movementResolver.changes 140845 to 186812 (+32.6%, p 0); vacantObjectiveStalls.length 95 to 20 (-78.9%, p 0); recon.orders 1420 to 2320 (+63.4%, p 0); recon.contacts 193 to 436 (+125.9%, p 0); recon.cancelled 457 to 1098 (+140.3%, p 0); recon.reportsDelivered 791 to 1733 (+119.1%, p 0); squadPerformance.meanMission 4158.700000000002 to 3925.3000000000006 (-5.6%, p 0); squadPerformance.meanCohesion 5447.199999999999 to 5573.799999999998 (+2.3%, p 0); retreatSamples 107664 to 134739 (+25.1%, p 0.0009).
- Under 0.05 only: grenades.aborted 1 to 13 (+1200.0%, p 0.0078); loopAlerts.length 909 to 1153 (+26.8%, p 0.0094); squadPerformance.meanOverall 5011.100000000003 to 4952.199999999999 (-1.2%, p 0.0119); recon.retriggerBlocked 657 to 746 (+13.5%, p 0.0175); grenades.bursts 32 to 57 (+78.1%, p 0.0227); grenades.throws 33 to 57 (+72.7%, p 0.0347).
- Wall time on/off x1.517 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.517 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2119 | 2013 | -1.7667 | 48 | 26 | 22 | 0.6655 |
| `usKills` | 975 | 893 | -1.3667 | 46 | 16 | 30 | 0.0541 |
| `geKills` | 1144 | 1120 | -0.4 | 47 | 22 | 25 | 0.7709 |
| `fire.total` | 32763 | 57266 | 408.3833 | 50 | 48 | 2 | 0 |
| `fire.hits` | 4684 | 4564 | -2 | 50 | 22 | 28 | 0.4799 |
| `retreatSamples` | 107664 | 134739 | 451.25 | 50 | 37 | 13 | 0.0009 |
| `movementResolver.changes` | 140845 | 186812 | 766.1167 | 60 | 57 | 3 | 0 |
| `grenades.throws` | 33 | 57 | 0.4 | 23 | 17 | 6 | 0.0347 |
| `grenades.bursts` | 32 | 57 | 0.4167 | 24 | 18 | 6 | 0.0227 |
| `grenades.wounded` | 31 | 45 | 0.2333 | 15 | 11 | 4 | 0.1185 |
| `grenades.casualties` | 15 | 19 | 0.0667 | 11 | 7 | 4 | 0.5488 |
| `grenades.suppressed` | 101 | 131 | 0.5 | 21 | 15 | 6 | 0.0784 |
| `grenades.friendlyWounded` | 0 | 7 | 0.1167 | 2 | 2 | 0 | 0.5 |
| `grenades.friendlyCasualties` | 0 | 3 | 0.05 | 1 | 1 | 0 | 1 |
| `grenades.aborted` | 1 | 13 | 0.2 | 8 | 8 | 0 | 0.0078 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 95 | 20 | -1.25 | 35 | 4 | 31 | 0 |
| `loopAlerts.length` | 909 | 1153 | 4.0667 | 49 | 34 | 15 | 0.0094 |
| `writerConflicts` | 0 | 2 | 0.0333 | 1 | 1 | 0 | 1 |
| `regroups.entries` | 189 | 221 | 0.5333 | 45 | 25 | 20 | 0.5515 |
| `stallOutcomes.wakes` | 6 | 3 | -0.05 | 5 | 1 | 4 | 0.375 |
| `stallOutcomes.repeats` | 4 | 1 | -0.05 | 3 | 0 | 3 | 0.25 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1420 | 2320 | 15 | 59 | 55 | 4 | 0 |
| `recon.contacts` | 193 | 436 | 4.05 | 49 | 45 | 4 | 0 |
| `recon.noContact` | 631 | 634 | 0.05 | 50 | 24 | 26 | 0.8877 |
| `recon.timeouts` | 50 | 47 | -0.05 | 23 | 13 | 10 | 0.6776 |
| `recon.cancelled` | 457 | 1098 | 10.6833 | 59 | 56 | 3 | 0 |
| `recon.reportsDelivered` | 791 | 1733 | 15.7 | 46 | 38 | 8 | 0 |
| `recon.retriggerBlocked` | 657 | 746 | 1.4833 | 52 | 35 | 17 | 0.0175 |
| `squadPerformance.meanOverall` | 5011.100000000003 | 4952.199999999999 | -0.9817 | 58 | 19 | 39 | 0.0119 |
| `squadPerformance.p10Overall` | 4663.299999999999 | 4657.200000000001 | -0.1017 | 32 | 17 | 15 | 0.8601 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4158.700000000002 | 3925.3000000000006 | -3.89 | 50 | 9 | 41 | 0 |
| `squadPerformance.meanMovement` | 5993.199999999997 | 5992.699999999999 | -0.0083 | 30 | 13 | 17 | 0.5847 |
| `squadPerformance.meanControl` | 5729.1 | 5694.000000000002 | -0.585 | 50 | 21 | 29 | 0.3222 |
| `squadPerformance.meanCohesion` | 5447.199999999999 | 5573.799999999998 | 2.11 | 60 | 46 | 14 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 0.15 s (timeline) · controller-natural-20261026-0002 0.15 s (timeline) · controller-natural-20261026-0003 0.15 s (timeline) · controller-natural-20261026-0004 0.15 s (timeline) · controller-natural-20261026-0005 0.15 s (timeline) · controller-natural-20261026-0006 0.15 s (timeline) · controller-natural-20261026-0007 0.15 s (timeline) · controller-natural-20261026-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1685&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr776-cbe2da76/ai_flow_live.html?bench=1685&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1685`); it opens the seed that parts earliest, and the dropdowns choose another.

