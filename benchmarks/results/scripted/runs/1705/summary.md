# Benchmark run #1705 · 48 seeds from `item4-9e6866b-recon900` (us-defend), windows `0+900`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/pin/item4-9e6866bc @ 9e6866b · [run](https://github.com/APPARANYX/grasstex/actions/runs/42341612034) · build v29-dev

## Verdict

**MOVED: 48 of 48 pairs changed (median first part 0.15 s); 15 of 42 counters under p 0.05 (about 2.1 by chance), 11 under 0.0012; casualties -12.3% (p 0.0054)**

- Clears the Bonferroni line (p < 0.0012): fire.total 35008 to 56325 (+60.9%, p 0); movementResolver.changes 153934 to 194708 (+26.5%, p 0); vacantObjectiveStalls.length 172 to 26 (-84.9%, p 0); recon.orders 1614 to 2531 (+56.8%, p 0); recon.contacts 238 to 579 (+143.3%, p 0); recon.cancelled 482 to 1075 (+123.0%, p 0); recon.reportsDelivered 930 to 2072 (+122.8%, p 0); squadPerformance.meanMission 3165.1999999999994 to 3015.3 (-4.7%, p 0.0001); squadPerformance.meanCohesion 4345.5 to 4452.0999999999985 (+2.5%, p 0.0002); grenades.throws 40 to 93 (+132.5%, p 0.0003); grenades.bursts 40 to 93 (+132.5%, p 0.0003).
- Under 0.05 only: casualties 2276 to 1996 (-12.3%, p 0.0054); retreatSamples 172778 to 202147 (+17.0%, p 0.0096); loopAlerts.length 972 to 1472 (+51.4%, p 0.0096); usKills 1105 to 929 (-15.9%, p 0.0385).
- Wall time on/off x1.445 is over the 1.25 gate.

## Paired comparison (off against on)

- **48** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.445 (gate 1.25)
- the 48 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2276 | 1996 | -5.8333 | 43 | 12 | 31 | 0.0054 |
| `usKills` | 1105 | 929 | -3.6667 | 40 | 13 | 27 | 0.0385 |
| `geKills` | 1171 | 1067 | -2.1667 | 43 | 22 | 21 | 1 |
| `fire.total` | 35008 | 56325 | 444.1042 | 44 | 42 | 2 | 0 |
| `fire.hits` | 4986 | 4767 | -4.5625 | 44 | 21 | 23 | 0.8804 |
| `retreatSamples` | 172778 | 202147 | 611.8542 | 44 | 31 | 13 | 0.0096 |
| `movementResolver.changes` | 153934 | 194708 | 849.4583 | 48 | 44 | 4 | 0 |
| `grenades.throws` | 40 | 93 | 1.1042 | 24 | 21 | 3 | 0.0003 |
| `grenades.bursts` | 40 | 93 | 1.1042 | 24 | 21 | 3 | 0.0003 |
| `grenades.wounded` | 13 | 55 | 0.875 | 8 | 7 | 1 | 0.0703 |
| `grenades.casualties` | 9 | 18 | 0.1875 | 8 | 5 | 3 | 0.7266 |
| `grenades.suppressed` | 55 | 161 | 2.2083 | 13 | 10 | 3 | 0.0923 |
| `grenades.friendlyWounded` | 0 | 3 | 0.0625 | 2 | 2 | 0 | 0.5 |
| `grenades.friendlyCasualties` | 0 | 1 | 0.0208 | 1 | 1 | 0 | 1 |
| `grenades.aborted` | 6 | 16 | 0.2083 | 11 | 9 | 2 | 0.0654 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 172 | 26 | -3.0417 | 38 | 4 | 34 | 0 |
| `loopAlerts.length` | 972 | 1472 | 10.4167 | 44 | 31 | 13 | 0.0096 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 283 | 291 | 0.1667 | 43 | 23 | 20 | 0.7608 |
| `stallOutcomes.wakes` | 6 | 7 | 0.0208 | 10 | 5 | 5 | 1 |
| `stallOutcomes.repeats` | 2 | 3 | 0.0208 | 3 | 2 | 1 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1614 | 2531 | 19.1042 | 46 | 44 | 2 | 0 |
| `recon.contacts` | 238 | 579 | 7.1042 | 41 | 37 | 4 | 0 |
| `recon.noContact` | 750 | 740 | -0.2083 | 47 | 22 | 25 | 0.7709 |
| `recon.timeouts` | 71 | 58 | -0.2708 | 30 | 12 | 18 | 0.3616 |
| `recon.cancelled` | 482 | 1075 | 12.3542 | 48 | 46 | 2 | 0 |
| `recon.reportsDelivered` | 930 | 2072 | 23.7917 | 43 | 38 | 5 | 0 |
| `recon.retriggerBlocked` | 754 | 826 | 1.5 | 41 | 27 | 14 | 0.0596 |
| `squadPerformance.meanOverall` | 3901.500000000001 | 3872.4999999999995 | -0.6042 | 47 | 17 | 30 | 0.0789 |
| `squadPerformance.p10Overall` | 3642.8999999999996 | 3637.9000000000005 | -0.1042 | 21 | 12 | 9 | 0.6636 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3165.1999999999994 | 3015.3 | -3.1229 | 44 | 9 | 35 | 0.0001 |
| `squadPerformance.meanMovement` | 4792.300000000001 | 4791.5 | -0.0167 | 28 | 12 | 16 | 0.5716 |
| `squadPerformance.meanControl` | 4508.5 | 4493.200000000002 | -0.3188 | 43 | 22 | 21 | 1 |
| `squadPerformance.meanCohesion` | 4345.5 | 4452.0999999999985 | 2.2208 | 48 | 37 | 11 | 0.0002 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

item4-9e6866b-recon900-0001 0.15 s (timeline) · item4-9e6866b-recon900-0002 0.15 s (timeline) · item4-9e6866b-recon900-0003 0.15 s (timeline) · item4-9e6866b-recon900-0004 0.15 s (timeline) · item4-9e6866b-recon900-0005 0.15 s (timeline) · item4-9e6866b-recon900-0006 0.15 s (timeline) · item4-9e6866b-recon900-0007 0.15 s (timeline) · item4-9e6866b-recon900-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1705&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-item4-9e6866bc/ai_flow_live.html?bench=1705&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1705`); it opens the seed that parts earliest, and the dropdowns choose another.

