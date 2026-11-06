# Benchmark run #1670 · 60 seeds from `controller-natural-20261026` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- main @ d036b3f · [run](https://github.com/APPARANYX/grasstex/actions/runs/42280390505) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 13 of 42 counters under p 0.05 (about 2.1 by chance), 10 under 0.0012; casualties -3.5% (p 0.6655)**

- Clears the Bonferroni line (p < 0.0012): fire.total 32763 to 60149 (+83.6%, p 0); movementResolver.changes 140845 to 190646 (+35.4%, p 0); loopAlerts.length 579 to 794 (+37.1%, p 0); recon.orders 1420 to 2276 (+60.3%, p 0); recon.contacts 193 to 441 (+128.5%, p 0); recon.cancelled 457 to 1085 (+137.4%, p 0); recon.reportsDelivered 791 to 1678 (+112.1%, p 0); squadPerformance.meanMission 4169.200000000002 to 3994 (-4.2%, p 0); squadPerformance.meanCohesion 5447.199999999999 to 5572.8 (+2.3%, p 0); retreatSamples 107664 to 132755 (+23.3%, p 0.0001).
- Under 0.05 only: recon.retriggerBlocked 657 to 748 (+13.9%, p 0.0016); grenades.throws 33 to 55 (+66.7%, p 0.0125); grenades.bursts 32 to 54 (+68.8%, p 0.0125).
- Wall time on/off x1.506 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.506 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2119 | 2044 | -1.25 | 48 | 22 | 26 | 0.6655 |
| `usKills` | 975 | 1009 | 0.5667 | 48 | 31 | 17 | 0.0595 |
| `geKills` | 1144 | 1035 | -1.8167 | 49 | 19 | 30 | 0.1524 |
| `fire.total` | 32763 | 60149 | 456.4333 | 50 | 47 | 3 | 0 |
| `fire.hits` | 4684 | 4647 | -0.6167 | 50 | 23 | 27 | 0.6718 |
| `retreatSamples` | 107664 | 132755 | 418.1833 | 50 | 39 | 11 | 0.0001 |
| `movementResolver.changes` | 140845 | 190646 | 830.0167 | 60 | 58 | 2 | 0 |
| `grenades.throws` | 33 | 55 | 0.3667 | 28 | 21 | 7 | 0.0125 |
| `grenades.bursts` | 32 | 54 | 0.3667 | 28 | 21 | 7 | 0.0125 |
| `grenades.wounded` | 31 | 32 | 0.0167 | 16 | 11 | 5 | 0.2101 |
| `grenades.casualties` | 15 | 12 | -0.05 | 8 | 5 | 3 | 0.7266 |
| `grenades.suppressed` | 101 | 101 | 0 | 21 | 14 | 7 | 0.1892 |
| `grenades.friendlyWounded` | 0 | 5 | 0.0833 | 4 | 4 | 0 | 0.125 |
| `grenades.friendlyCasualties` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.aborted` | 1 | 7 | 0.1 | 7 | 6 | 1 | 0.125 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 95 | 79 | -0.2667 | 37 | 15 | 22 | 0.324 |
| `loopAlerts.length` | 579 | 794 | 3.5833 | 35 | 32 | 3 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 189 | 214 | 0.4167 | 46 | 24 | 22 | 0.883 |
| `stallOutcomes.wakes` | 6 | 3 | -0.05 | 8 | 3 | 5 | 0.7266 |
| `stallOutcomes.repeats` | 4 | 1 | -0.05 | 4 | 1 | 3 | 0.625 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1420 | 2276 | 14.2667 | 60 | 57 | 3 | 0 |
| `recon.contacts` | 193 | 441 | 4.1333 | 45 | 41 | 4 | 0 |
| `recon.noContact` | 631 | 618 | -0.2167 | 53 | 23 | 30 | 0.4101 |
| `recon.timeouts` | 50 | 46 | -0.0667 | 23 | 13 | 10 | 0.6776 |
| `recon.cancelled` | 457 | 1085 | 10.4667 | 58 | 58 | 0 | 0 |
| `recon.reportsDelivered` | 791 | 1678 | 14.7833 | 48 | 39 | 9 | 0 |
| `recon.retriggerBlocked` | 657 | 748 | 1.5167 | 46 | 34 | 12 | 0.0016 |
| `squadPerformance.meanOverall` | 5022.900000000002 | 4981.4000000000015 | -0.6917 | 57 | 23 | 34 | 0.1849 |
| `squadPerformance.p10Overall` | 4663.299999999999 | 4651.9 | -0.19 | 29 | 13 | 16 | 0.7111 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4169.200000000002 | 3994 | -2.92 | 49 | 5 | 44 | 0 |
| `squadPerformance.meanMovement` | 5993.199999999997 | 5991.999999999999 | -0.02 | 29 | 10 | 19 | 0.136 |
| `squadPerformance.meanControl` | 5771.5 | 5774.000000000001 | 0.0417 | 49 | 21 | 28 | 0.3916 |
| `squadPerformance.meanCohesion` | 5447.199999999999 | 5572.8 | 2.0933 | 60 | 50 | 10 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 0.15 s (timeline) · controller-natural-20261026-0002 0.15 s (timeline) · controller-natural-20261026-0003 0.15 s (timeline) · controller-natural-20261026-0004 0.15 s (timeline) · controller-natural-20261026-0005 0.15 s (timeline) · controller-natural-20261026-0006 0.15 s (timeline) · controller-natural-20261026-0007 0.15 s (timeline) · controller-natural-20261026-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1670&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1670`); it opens the seed that parts earliest, and the dropdowns choose another.

