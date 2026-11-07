# Benchmark run #1684 · 60 seeds from `controller-natural-20261026` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/pin/pr776-cbe2da76 @ cbe2da7 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42315282279) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 20 of 42 counters under p 0.05 (about 2.1 by chance), 13 under 0.0012; casualties -1.0% (p 0.1925)**

- Clears the Bonferroni line (p < 0.0012): fire.total 39764 to 68078 (+71.2%, p 0); movementResolver.changes 210010 to 306010 (+45.7%, p 0); vacantObjectiveStalls.length 278 to 34 (-87.8%, p 0); loopAlerts.length 721 to 2241 (+210.8%, p 0); recon.cancelled 463 to 666 (+43.8%, p 0); squadPerformance.meanOverall 4806.700000000001 to 4672.699999999999 (-2.8%, p 0); squadPerformance.meanMission 3780.8 to 3418.6 (-9.6%, p 0); squadPerformance.meanControl 5616 to 5384.7000000000035 (-4.1%, p 0); squadPerformance.meanCohesion 5425.999999999998 to 5593.6 (+3.1%, p 0); recon.noContact 1106 to 958 (-13.4%, p 0.0001); recon.retriggerBlocked 1333 to 1438 (+7.9%, p 0.0002); grenades.throws 11 to 45 (+309.1%, p 0.0005); grenades.bursts 11 to 45 (+309.1%, p 0.0005).
- Under 0.05 only: regroups.entries 227 to 350 (+54.2%, p 0.0012); retreatSamples 103776 to 128045 (+23.4%, p 0.0027); grenades.suppressed 10 to 69 (+590.0%, p 0.0034); squadPerformance.meanMovement 5984.800000000001 to 5979.899999999998 (-0.1%, p 0.0045); recon.reportsDelivered 433 to 608 (+40.4%, p 0.0198); recon.contacts 87 to 112 (+28.7%, p 0.0444); recon.timeouts 16 to 6 (-62.5%, p 0.049).
- Wall time on/off x1.515 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.515 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2695 | 2669 | -0.4333 | 59 | 24 | 35 | 0.1925 |
| `usKills` | 1300 | 1159 | -2.35 | 58 | 27 | 31 | 0.694 |
| `geKills` | 1395 | 1510 | 1.9167 | 57 | 34 | 23 | 0.1849 |
| `fire.total` | 39764 | 68078 | 471.9 | 60 | 57 | 3 | 0 |
| `fire.hits` | 6063 | 5938 | -2.0833 | 58 | 22 | 36 | 0.0869 |
| `retreatSamples` | 103776 | 128045 | 404.4833 | 60 | 42 | 18 | 0.0027 |
| `movementResolver.changes` | 210010 | 306010 | 1600 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 11 | 45 | 0.5667 | 23 | 20 | 3 | 0.0005 |
| `grenades.bursts` | 11 | 45 | 0.5667 | 23 | 20 | 3 | 0.0005 |
| `grenades.wounded` | 6 | 29 | 0.3833 | 11 | 9 | 2 | 0.0654 |
| `grenades.casualties` | 3 | 11 | 0.1333 | 7 | 6 | 1 | 0.125 |
| `grenades.suppressed` | 10 | 69 | 0.9833 | 13 | 12 | 1 | 0.0034 |
| `grenades.friendlyWounded` | 0 | 3 | 0.05 | 2 | 2 | 0 | 0.5 |
| `grenades.friendlyCasualties` | 0 | 2 | 0.0333 | 1 | 1 | 0 | 1 |
| `grenades.aborted` | 5 | 7 | 0.0333 | 7 | 5 | 2 | 0.4531 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 278 | 34 | -4.0667 | 56 | 2 | 54 | 0 |
| `loopAlerts.length` | 721 | 2241 | 25.3333 | 60 | 57 | 3 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 227 | 350 | 2.05 | 52 | 38 | 14 | 0.0012 |
| `stallOutcomes.wakes` | 4 | 6 | 0.0333 | 8 | 5 | 3 | 0.7266 |
| `stallOutcomes.repeats` | 1 | 1 | 0 | 2 | 1 | 1 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1742 | 1819 | 1.2833 | 54 | 34 | 20 | 0.0759 |
| `recon.contacts` | 87 | 112 | 0.4167 | 49 | 32 | 17 | 0.0444 |
| `recon.noContact` | 1106 | 958 | -2.4667 | 56 | 13 | 43 | 0.0001 |
| `recon.timeouts` | 16 | 6 | -0.1667 | 17 | 4 | 13 | 0.049 |
| `recon.cancelled` | 463 | 666 | 3.3833 | 54 | 48 | 6 | 0 |
| `recon.reportsDelivered` | 433 | 608 | 2.9167 | 54 | 36 | 18 | 0.0198 |
| `recon.retriggerBlocked` | 1333 | 1438 | 1.75 | 57 | 43 | 14 | 0.0002 |
| `squadPerformance.meanOverall` | 4806.700000000001 | 4672.699999999999 | -2.2333 | 59 | 4 | 55 | 0 |
| `squadPerformance.p10Overall` | 4470.2 | 4447.9 | -0.3717 | 27 | 10 | 17 | 0.2478 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3780.8 | 3418.6 | -6.0367 | 60 | 3 | 57 | 0 |
| `squadPerformance.meanMovement` | 5984.800000000001 | 5979.899999999998 | -0.0817 | 46 | 13 | 33 | 0.0045 |
| `squadPerformance.meanControl` | 5616 | 5384.7000000000035 | -3.855 | 60 | 8 | 52 | 0 |
| `squadPerformance.meanCohesion` | 5425.999999999998 | 5593.6 | 2.7933 | 59 | 49 | 10 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 0.15 s (timeline) · controller-natural-20261026-0002 0.15 s (timeline) · controller-natural-20261026-0003 0.15 s (timeline) · controller-natural-20261026-0004 0.15 s (timeline) · controller-natural-20261026-0005 0.15 s (timeline) · controller-natural-20261026-0006 0.15 s (timeline) · controller-natural-20261026-0007 0.15 s (timeline) · controller-natural-20261026-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1684&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr776-cbe2da76/ai_flow_live.html?bench=1684&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1684`); it opens the seed that parts earliest, and the dropdowns choose another.

