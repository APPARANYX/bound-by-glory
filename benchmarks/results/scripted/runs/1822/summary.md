# Benchmark run #1822 · 60 seeds from `pr797-micro-u-20261109` (ge-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr797-main-e8650a82 @ e8650a8 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42566421480) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 22 of 42 counters under p 0.05 (about 2.1 by chance), 19 under 0.0012; casualties -29.9% (p 0)**

- Clears the Bonferroni line (p < 0.0012): casualties 2969 to 2081 (-29.9%, p 0); usKills 1267 to 856 (-32.4%, p 0); geKills 1702 to 1225 (-28.0%, p 0); fire.total 45112 to 70653 (+56.6%, p 0); fire.hits 6386 to 4815 (-24.6%, p 0); movementResolver.changes 199948 to 309955 (+55.0%, p 0); vacantObjectiveStalls.length 100 to 19 (-81.0%, p 0); loopAlerts.length 907 to 1874 (+106.6%, p 0); regroups.entries 215 to 379 (+76.3%, p 0); recon.orders 1908 to 3808 (+99.6%, p 0); recon.contacts 283 to 861 (+204.2%, p 0); recon.noContact 952 to 793 (-16.7%, p 0); recon.cancelled 580 to 2050 (+253.4%, p 0); recon.reportsDelivered 1103 to 3467 (+214.3%, p 0); recon.retriggerBlocked 905 to 1068 (+18.0%, p 0); squadPerformance.meanMission 3952.0999999999995 to 3719.200000000001 (-5.9%, p 0); squadPerformance.meanMovement 5991.299999999996 to 5986.700000000003 (-0.1%, p 0); squadPerformance.meanControl 5716.699999999999 to 5560.200000000001 (-2.7%, p 0); squadPerformance.meanOverall 4902.300000000001 to 4833.200000000001 (-1.4%, p 0.0003).
- Under 0.05 only: grenades.throws 31 to 54 (+74.2%, p 0.0266); grenades.bursts 31 to 54 (+74.2%, p 0.0266); grenades.suppressed 24 to 48 (+100.0%, p 0.0386).
- Wall time on/off x1.417 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.417 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2969 | 2081 | -14.8 | 60 | 6 | 54 | 0 |
| `usKills` | 1267 | 856 | -6.85 | 59 | 13 | 46 | 0 |
| `geKills` | 1702 | 1225 | -7.95 | 58 | 9 | 49 | 0 |
| `fire.total` | 45112 | 70653 | 425.6833 | 60 | 56 | 4 | 0 |
| `fire.hits` | 6386 | 4815 | -26.1833 | 60 | 10 | 50 | 0 |
| `retreatSamples` | 124401 | 123297 | -18.4 | 60 | 33 | 27 | 0.519 |
| `movementResolver.changes` | 199948 | 309955 | 1833.45 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 31 | 54 | 0.3833 | 21 | 16 | 5 | 0.0266 |
| `grenades.bursts` | 31 | 54 | 0.3833 | 21 | 16 | 5 | 0.0266 |
| `grenades.wounded` | 15 | 23 | 0.1333 | 9 | 7 | 2 | 0.1797 |
| `grenades.casualties` | 6 | 9 | 0.05 | 7 | 5 | 2 | 0.4531 |
| `grenades.suppressed` | 24 | 48 | 0.4 | 12 | 10 | 2 | 0.0386 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 2 | 1 | 1 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 4 | 9 | 0.0833 | 9 | 7 | 2 | 0.1797 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 100 | 19 | -1.35 | 46 | 5 | 41 | 0 |
| `loopAlerts.length` | 907 | 1874 | 16.1167 | 58 | 54 | 4 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 215 | 379 | 2.7333 | 52 | 41 | 11 | 0 |
| `stallOutcomes.wakes` | 9 | 13 | 0.0667 | 19 | 11 | 8 | 0.6476 |
| `stallOutcomes.repeats` | 2 | 2 | 0 | 4 | 2 | 2 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1908 | 3808 | 31.6667 | 60 | 60 | 0 | 0 |
| `recon.contacts` | 283 | 861 | 9.6333 | 60 | 58 | 2 | 0 |
| `recon.noContact` | 952 | 793 | -2.65 | 57 | 9 | 48 | 0 |
| `recon.timeouts` | 41 | 40 | -0.0167 | 24 | 13 | 11 | 0.8388 |
| `recon.cancelled` | 580 | 2050 | 24.5 | 60 | 60 | 0 | 0 |
| `recon.reportsDelivered` | 1103 | 3467 | 39.4 | 60 | 55 | 5 | 0 |
| `recon.retriggerBlocked` | 905 | 1068 | 2.7167 | 56 | 45 | 11 | 0 |
| `squadPerformance.meanOverall` | 4902.300000000001 | 4833.200000000001 | -1.1517 | 58 | 15 | 43 | 0.0003 |
| `squadPerformance.p10Overall` | 4468.1 | 4470.600000000001 | 0.0417 | 36 | 21 | 15 | 0.405 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3952.0999999999995 | 3719.200000000001 | -3.8817 | 60 | 12 | 48 | 0 |
| `squadPerformance.meanMovement` | 5991.299999999996 | 5986.700000000003 | -0.0767 | 44 | 5 | 39 | 0 |
| `squadPerformance.meanControl` | 5716.699999999999 | 5560.200000000001 | -2.6083 | 60 | 6 | 54 | 0 |
| `squadPerformance.meanCohesion` | 5407.3 | 5443.899999999999 | 0.61 | 59 | 35 | 24 | 0.1925 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr797-micro-u-20261109-0001 0.15 s (timeline) · pr797-micro-u-20261109-0002 0.15 s (timeline) · pr797-micro-u-20261109-0003 0.15 s (timeline) · pr797-micro-u-20261109-0004 0.15 s (timeline) · pr797-micro-u-20261109-0005 0.15 s (timeline) · pr797-micro-u-20261109-0006 0.15 s (timeline) · pr797-micro-u-20261109-0007 0.15 s (timeline) · pr797-micro-u-20261109-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1822&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr797-main-e8650a82/ai_flow_live.html?bench=1822&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1822`); it opens the seed that parts earliest, and the dropdowns choose another.

