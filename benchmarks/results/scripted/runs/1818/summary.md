# Benchmark run #1818 · 60 seeds from `pr797-micro-u-20261109` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr797-5d7cc87 @ 5d7cc87 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42566379267) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 22 of 42 counters under p 0.05 (about 2.1 by chance), 17 under 0.0012; casualties -23.7% (p 0)**

- Clears the Bonferroni line (p < 0.0012): casualties 2965 to 2263 (-23.7%, p 0); usKills 1427 to 1006 (-29.5%, p 0); fire.total 46936 to 74965 (+59.7%, p 0); fire.hits 6692 to 5268 (-21.3%, p 0); movementResolver.changes 211132 to 321142 (+52.1%, p 0); vacantObjectiveStalls.length 111 to 20 (-82.0%, p 0); loopAlerts.length 1058 to 1824 (+72.4%, p 0); recon.orders 1958 to 3531 (+80.3%, p 0); recon.contacts 308 to 701 (+127.6%, p 0); recon.cancelled 546 to 1822 (+233.7%, p 0); recon.reportsDelivered 1270 to 2593 (+104.2%, p 0); squadPerformance.meanOverall 4889.599999999999 to 4824.6 (-1.3%, p 0); squadPerformance.meanMission 3913.800000000002 to 3689.9 (-5.7%, p 0); squadPerformance.meanControl 5692.5999999999985 to 5601.2 (-1.6%, p 0.0001); geKills 1538 to 1257 (-18.3%, p 0.0002); recon.noContact 997 to 889 (-10.8%, p 0.0002); regroups.entries 235 to 389 (+65.5%, p 0.0007).
- Under 0.05 only: recon.retriggerBlocked 996 to 1152 (+15.7%, p 0.0027); squadPerformance.meanMovement 5988.899999999999 to 5987.199999999999 (-0.0%, p 0.0167); grenades.wounded 13 to 44 (+238.5%, p 0.0213); grenades.casualties 4 to 20 (+400.0%, p 0.0215); squadPerformance.meanCohesion 5424.800000000001 to 5454.9000000000015 (+0.6%, p 0.0273).
- Wall time on/off x1.716 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.716 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2965 | 2263 | -11.7 | 60 | 8 | 52 | 0 |
| `usKills` | 1427 | 1006 | -7.0167 | 60 | 13 | 47 | 0 |
| `geKills` | 1538 | 1257 | -4.6833 | 59 | 15 | 44 | 0.0002 |
| `fire.total` | 46936 | 74965 | 467.15 | 60 | 56 | 4 | 0 |
| `fire.hits` | 6692 | 5268 | -23.7333 | 59 | 9 | 50 | 0 |
| `retreatSamples` | 133903 | 134550 | 10.7833 | 60 | 28 | 32 | 0.6989 |
| `movementResolver.changes` | 211132 | 321142 | 1833.5 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 35 | 62 | 0.45 | 23 | 15 | 8 | 0.21 |
| `grenades.bursts` | 33 | 62 | 0.4833 | 23 | 16 | 7 | 0.0931 |
| `grenades.wounded` | 13 | 44 | 0.5167 | 16 | 13 | 3 | 0.0213 |
| `grenades.casualties` | 4 | 20 | 0.2667 | 10 | 9 | 1 | 0.0215 |
| `grenades.suppressed` | 36 | 77 | 0.6833 | 19 | 13 | 6 | 0.1671 |
| `grenades.friendlyWounded` | 2 | 6 | 0.0667 | 4 | 2 | 2 | 1 |
| `grenades.friendlyCasualties` | 1 | 3 | 0.0333 | 3 | 2 | 1 | 1 |
| `grenades.aborted` | 4 | 10 | 0.1 | 8 | 6 | 2 | 0.2891 |
| `movementStalls.length` | 3 | 0 | -0.05 | 2 | 0 | 2 | 0.5 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 111 | 20 | -1.5167 | 43 | 4 | 39 | 0 |
| `loopAlerts.length` | 1058 | 1824 | 12.7667 | 58 | 51 | 7 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 235 | 389 | 2.5667 | 56 | 41 | 15 | 0.0007 |
| `stallOutcomes.wakes` | 11 | 3 | -0.1333 | 12 | 3 | 9 | 0.146 |
| `stallOutcomes.repeats` | 5 | 0 | -0.0833 | 5 | 0 | 5 | 0.0625 |
| `timeline.stalledOnsets` | 4 | 0 | -0.0667 | 2 | 0 | 2 | 0.5 |
| `timeline.stalledSamples` | 37 | 0 | -0.6167 | 2 | 0 | 2 | 0.5 |
| `timeline.stalledOnsetsRepeated` | 4 | 0 | -0.0667 | 2 | 0 | 2 | 0.5 |
| `timeline.stalledSamplesRepeated` | 37 | 0 | -0.6167 | 2 | 0 | 2 | 0.5 |
| `recon.orders` | 1958 | 3531 | 26.2167 | 59 | 59 | 0 | 0 |
| `recon.contacts` | 308 | 701 | 6.55 | 57 | 52 | 5 | 0 |
| `recon.noContact` | 997 | 889 | -1.8 | 56 | 14 | 42 | 0.0002 |
| `recon.timeouts` | 54 | 40 | -0.2333 | 31 | 11 | 20 | 0.1496 |
| `recon.cancelled` | 546 | 1822 | 21.2667 | 60 | 60 | 0 | 0 |
| `recon.reportsDelivered` | 1270 | 2593 | 22.05 | 59 | 47 | 12 | 0 |
| `recon.retriggerBlocked` | 996 | 1152 | 2.6 | 55 | 39 | 16 | 0.0027 |
| `squadPerformance.meanOverall` | 4889.599999999999 | 4824.6 | -1.0833 | 58 | 11 | 47 | 0 |
| `squadPerformance.p10Overall` | 4484.099999999999 | 4460.799999999999 | -0.3883 | 31 | 10 | 21 | 0.0708 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3913.800000000002 | 3689.9 | -3.7317 | 60 | 10 | 50 | 0 |
| `squadPerformance.meanMovement` | 5988.899999999999 | 5987.199999999999 | -0.0283 | 35 | 10 | 25 | 0.0167 |
| `squadPerformance.meanControl` | 5692.5999999999985 | 5601.2 | -1.5233 | 60 | 15 | 45 | 0.0001 |
| `squadPerformance.meanCohesion` | 5424.800000000001 | 5454.9000000000015 | 0.5017 | 60 | 39 | 21 | 0.0273 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr797-micro-u-20261109-0001 0.15 s (timeline) · pr797-micro-u-20261109-0002 0.15 s (timeline) · pr797-micro-u-20261109-0003 0.15 s (timeline) · pr797-micro-u-20261109-0004 0.15 s (timeline) · pr797-micro-u-20261109-0005 0.15 s (timeline) · pr797-micro-u-20261109-0006 0.15 s (timeline) · pr797-micro-u-20261109-0007 0.15 s (timeline) · pr797-micro-u-20261109-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1818&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr797-5d7cc87/ai_flow_live.html?bench=1818&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1818`); it opens the seed that parts earliest, and the dropdowns choose another.

