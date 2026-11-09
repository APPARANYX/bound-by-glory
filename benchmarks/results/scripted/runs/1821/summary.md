# Benchmark run #1821 · 60 seeds from `pr797-micro-u-20261109` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr797-main-e8650a82 @ e8650a8 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42566400865) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 20 of 42 counters under p 0.05 (about 2.1 by chance), 16 under 0.0012; casualties -25.9% (p 0)**

- Clears the Bonferroni line (p < 0.0012): casualties 2965 to 2197 (-25.9%, p 0); usKills 1427 to 942 (-34.0%, p 0); fire.total 46936 to 75174 (+60.2%, p 0); fire.hits 6692 to 5002 (-25.3%, p 0); movementResolver.changes 211132 to 317958 (+50.6%, p 0); vacantObjectiveStalls.length 111 to 20 (-82.0%, p 0); loopAlerts.length 1058 to 1836 (+73.5%, p 0); regroups.entries 235 to 354 (+50.6%, p 0); recon.orders 1958 to 3449 (+76.1%, p 0); recon.contacts 308 to 727 (+136.0%, p 0); recon.noContact 997 to 856 (-14.1%, p 0); recon.cancelled 546 to 1778 (+225.6%, p 0); recon.reportsDelivered 1270 to 2736 (+115.4%, p 0); squadPerformance.meanOverall 4889.599999999999 to 4823.4000000000015 (-1.4%, p 0); squadPerformance.meanMission 3913.800000000002 to 3692.1 (-5.7%, p 0); geKills 1538 to 1255 (-18.4%, p 0.0004).
- Under 0.05 only: recon.retriggerBlocked 996 to 1091 (+9.5%, p 0.0022); grenades.throws 35 to 62 (+77.1%, p 0.0106); grenades.bursts 33 to 62 (+87.9%, p 0.0106); squadPerformance.meanControl 5692.5999999999985 to 5602.8 (-1.6%, p 0.0119).
- Wall time on/off x1.448 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.448 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2965 | 2197 | -12.8 | 60 | 6 | 54 | 0 |
| `usKills` | 1427 | 942 | -8.0833 | 56 | 9 | 47 | 0 |
| `geKills` | 1538 | 1255 | -4.7167 | 60 | 16 | 44 | 0.0004 |
| `fire.total` | 46936 | 75174 | 470.6333 | 60 | 54 | 6 | 0 |
| `fire.hits` | 6692 | 5002 | -28.1667 | 60 | 9 | 51 | 0 |
| `retreatSamples` | 133903 | 132354 | -25.8167 | 60 | 29 | 31 | 0.8974 |
| `movementResolver.changes` | 211132 | 317958 | 1780.4333 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 35 | 62 | 0.45 | 23 | 18 | 5 | 0.0106 |
| `grenades.bursts` | 33 | 62 | 0.4833 | 23 | 18 | 5 | 0.0106 |
| `grenades.wounded` | 13 | 40 | 0.45 | 15 | 11 | 4 | 0.1185 |
| `grenades.casualties` | 4 | 21 | 0.2833 | 8 | 7 | 1 | 0.0703 |
| `grenades.suppressed` | 36 | 84 | 0.8 | 18 | 13 | 5 | 0.0963 |
| `grenades.friendlyWounded` | 2 | 1 | -0.0167 | 3 | 1 | 2 | 1 |
| `grenades.friendlyCasualties` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `grenades.aborted` | 4 | 7 | 0.05 | 8 | 5 | 3 | 0.7266 |
| `movementStalls.length` | 3 | 0 | -0.05 | 2 | 0 | 2 | 0.5 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 111 | 20 | -1.5167 | 42 | 1 | 41 | 0 |
| `loopAlerts.length` | 1058 | 1836 | 12.9667 | 60 | 52 | 8 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 235 | 354 | 1.9833 | 55 | 43 | 12 | 0 |
| `stallOutcomes.wakes` | 11 | 11 | 0 | 17 | 9 | 8 | 1 |
| `stallOutcomes.repeats` | 5 | 2 | -0.05 | 7 | 2 | 5 | 0.4531 |
| `timeline.stalledOnsets` | 4 | 0 | -0.0667 | 2 | 0 | 2 | 0.5 |
| `timeline.stalledSamples` | 37 | 0 | -0.6167 | 2 | 0 | 2 | 0.5 |
| `timeline.stalledOnsetsRepeated` | 4 | 0 | -0.0667 | 2 | 0 | 2 | 0.5 |
| `timeline.stalledSamplesRepeated` | 37 | 0 | -0.6167 | 2 | 0 | 2 | 0.5 |
| `recon.orders` | 1958 | 3449 | 24.85 | 60 | 60 | 0 | 0 |
| `recon.contacts` | 308 | 727 | 6.9833 | 57 | 50 | 7 | 0 |
| `recon.noContact` | 997 | 856 | -2.35 | 52 | 10 | 42 | 0 |
| `recon.timeouts` | 54 | 42 | -0.2 | 26 | 10 | 16 | 0.3269 |
| `recon.cancelled` | 546 | 1778 | 20.5333 | 60 | 60 | 0 | 0 |
| `recon.reportsDelivered` | 1270 | 2736 | 24.4333 | 60 | 47 | 13 | 0 |
| `recon.retriggerBlocked` | 996 | 1091 | 1.5833 | 53 | 38 | 15 | 0.0022 |
| `squadPerformance.meanOverall` | 4889.599999999999 | 4823.4000000000015 | -1.1033 | 59 | 13 | 46 | 0 |
| `squadPerformance.p10Overall` | 4484.099999999999 | 4470.5 | -0.2267 | 38 | 19 | 19 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3913.800000000002 | 3692.1 | -3.695 | 60 | 14 | 46 | 0 |
| `squadPerformance.meanMovement` | 5988.899999999999 | 5987.999999999999 | -0.015 | 37 | 13 | 24 | 0.0989 |
| `squadPerformance.meanControl` | 5692.5999999999985 | 5602.8 | -1.4967 | 58 | 19 | 39 | 0.0119 |
| `squadPerformance.meanCohesion` | 5424.800000000001 | 5450.899999999999 | 0.435 | 59 | 33 | 26 | 0.435 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr797-micro-u-20261109-0001 0.15 s (timeline) · pr797-micro-u-20261109-0002 0.15 s (timeline) · pr797-micro-u-20261109-0003 0.15 s (timeline) · pr797-micro-u-20261109-0004 0.15 s (timeline) · pr797-micro-u-20261109-0005 0.15 s (timeline) · pr797-micro-u-20261109-0006 0.15 s (timeline) · pr797-micro-u-20261109-0007 0.15 s (timeline) · pr797-micro-u-20261109-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1821&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr797-main-e8650a82/ai_flow_live.html?bench=1821&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1821`); it opens the seed that parts earliest, and the dropdowns choose another.

