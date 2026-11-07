# Benchmark run #1695 · 60 seeds from `controller-natural-20261026` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/pin/pr778-e4278914 @ e427891 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42338947580) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 16 of 42 counters under p 0.05 (about 2.1 by chance), 10 under 0.0012; casualties -3.3% (p 0.5118)**

- Clears the Bonferroni line (p < 0.0012): fire.total 39764 to 68442 (+72.1%, p 0); movementResolver.changes 210010 to 300085 (+42.9%, p 0); vacantObjectiveStalls.length 278 to 55 (-80.2%, p 0); loopAlerts.length 721 to 2133 (+195.8%, p 0); recon.noContact 1106 to 923 (-16.5%, p 0); recon.cancelled 463 to 699 (+51.0%, p 0); squadPerformance.meanOverall 4806.700000000001 to 4688.900000000001 (-2.5%, p 0); squadPerformance.meanMission 3780.8 to 3474.499999999999 (-8.1%, p 0); squadPerformance.meanControl 5616 to 5372.600000000001 (-4.3%, p 0); squadPerformance.meanCohesion 5425.999999999998 to 5580.100000000002 (+2.8%, p 0).
- Under 0.05 only: squadPerformance.meanMovement 5984.800000000001 to 5979.4000000000015 (-0.1%, p 0.0021); usKills 1300 to 1091 (-16.1%, p 0.0027); grenades.throws 11 to 34 (+209.1%, p 0.0075); grenades.bursts 11 to 34 (+209.1%, p 0.0075); recon.retriggerBlocked 1333 to 1409 (+5.7%, p 0.0078); regroups.entries 227 to 314 (+38.3%, p 0.0402).
- Wall time on/off x1.479 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.479 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2695 | 2607 | -1.4667 | 58 | 26 | 32 | 0.5118 |
| `usKills` | 1300 | 1091 | -3.4833 | 55 | 16 | 39 | 0.0027 |
| `geKills` | 1395 | 1516 | 2.0167 | 57 | 30 | 27 | 0.7914 |
| `fire.total` | 39764 | 68442 | 477.9667 | 60 | 56 | 4 | 0 |
| `fire.hits` | 6063 | 5812 | -4.1833 | 60 | 25 | 35 | 0.2451 |
| `retreatSamples` | 103776 | 118277 | 241.6833 | 60 | 38 | 22 | 0.0519 |
| `movementResolver.changes` | 210010 | 300085 | 1501.25 | 60 | 60 | 0 | 0 |
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
| `vacantObjectiveStalls.length` | 278 | 55 | -3.7167 | 53 | 2 | 51 | 0 |
| `loopAlerts.length` | 721 | 2133 | 23.5333 | 60 | 57 | 3 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 227 | 314 | 1.45 | 54 | 35 | 19 | 0.0402 |
| `stallOutcomes.wakes` | 4 | 6 | 0.0333 | 8 | 5 | 3 | 0.7266 |
| `stallOutcomes.repeats` | 1 | 3 | 0.0333 | 4 | 3 | 1 | 0.625 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1742 | 1807 | 1.0833 | 56 | 33 | 23 | 0.2288 |
| `recon.contacts` | 87 | 96 | 0.15 | 48 | 27 | 21 | 0.4709 |
| `recon.noContact` | 1106 | 923 | -3.05 | 57 | 10 | 47 | 0 |
| `recon.timeouts` | 16 | 12 | -0.0667 | 18 | 7 | 11 | 0.4807 |
| `recon.cancelled` | 463 | 699 | 3.9333 | 57 | 49 | 8 | 0 |
| `recon.reportsDelivered` | 433 | 505 | 1.2 | 54 | 30 | 24 | 0.4966 |
| `recon.retriggerBlocked` | 1333 | 1409 | 1.2667 | 52 | 36 | 16 | 0.0078 |
| `squadPerformance.meanOverall` | 4806.700000000001 | 4688.900000000001 | -1.9633 | 60 | 7 | 53 | 0 |
| `squadPerformance.p10Overall` | 4470.2 | 4457.099999999999 | -0.2183 | 31 | 12 | 19 | 0.281 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3780.8 | 3474.499999999999 | -5.105 | 60 | 10 | 50 | 0 |
| `squadPerformance.meanMovement` | 5984.800000000001 | 5979.4000000000015 | -0.09 | 48 | 13 | 35 | 0.0021 |
| `squadPerformance.meanControl` | 5616 | 5372.600000000001 | -4.0567 | 60 | 8 | 52 | 0 |
| `squadPerformance.meanCohesion` | 5425.999999999998 | 5580.100000000002 | 2.5683 | 60 | 51 | 9 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 0.15 s (timeline) · controller-natural-20261026-0002 0.15 s (timeline) · controller-natural-20261026-0003 0.15 s (timeline) · controller-natural-20261026-0004 0.15 s (timeline) · controller-natural-20261026-0005 0.15 s (timeline) · controller-natural-20261026-0006 0.15 s (timeline) · controller-natural-20261026-0007 0.15 s (timeline) · controller-natural-20261026-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1695&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr778-e4278914/ai_flow_live.html?bench=1695&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1695`); it opens the seed that parts earliest, and the dropdowns choose another.

