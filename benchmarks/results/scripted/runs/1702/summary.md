# Benchmark run #1702 · 48 seeds from `item4-9e6866b-recon900` (ge-defend), windows `0+900`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/pin/item4-9e6866bc @ 9e6866b · [run](https://github.com/APPARANYX/grasstex/actions/runs/42341507979) · build v29-dev

## Verdict

**MOVED: 48 of 48 pairs changed (median first part 0.15 s); 15 of 42 counters under p 0.05 (about 2.1 by chance), 9 under 0.0012; casualties -13.2% (p 0.0054)**

- Clears the Bonferroni line (p < 0.0012): movementResolver.changes 152805 to 193797 (+26.8%, p 0); vacantObjectiveStalls.length 120 to 7 (-94.2%, p 0); recon.orders 1601 to 2683 (+67.6%, p 0); recon.contacts 258 to 595 (+130.6%, p 0); recon.cancelled 478 to 1304 (+172.8%, p 0); recon.reportsDelivered 1009 to 2280 (+126.0%, p 0); squadPerformance.meanMission 3194.6999999999994 to 3017.2999999999997 (-5.6%, p 0); squadPerformance.meanCohesion 4309.099999999999 to 4456.400000000001 (+3.4%, p 0); fire.total 36212 to 50249 (+38.8%, p 0.0001).
- Under 0.05 only: usKills 1020 to 758 (-25.7%, p 0.0037); casualties 2217 to 1925 (-13.2%, p 0.0054); squadPerformance.meanMovement 4792.4 to 4793.800000000001 (+0.0%, p 0.0066); retreatSamples 157298 to 211043 (+34.2%, p 0.0226); recon.retriggerBlocked 710 to 830 (+16.9%, p 0.0275); loopAlerts.length 878 to 980 (+11.6%, p 0.0488).
- Wall time on/off x1.429 is over the 1.25 gate.

## Paired comparison (off against on)

- **48** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.429 (gate 1.25)
- the 48 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2217 | 1925 | -6.0833 | 43 | 12 | 31 | 0.0054 |
| `usKills` | 1020 | 758 | -5.4583 | 44 | 12 | 32 | 0.0037 |
| `geKills` | 1197 | 1167 | -0.625 | 42 | 18 | 24 | 0.4408 |
| `fire.total` | 36212 | 50249 | 292.4375 | 44 | 35 | 9 | 0.0001 |
| `fire.hits` | 4711 | 4369 | -7.125 | 44 | 17 | 27 | 0.1742 |
| `retreatSamples` | 157298 | 211043 | 1119.6875 | 44 | 30 | 14 | 0.0226 |
| `movementResolver.changes` | 152805 | 193797 | 854 | 48 | 42 | 6 | 0 |
| `grenades.throws` | 63 | 54 | -0.1875 | 22 | 14 | 8 | 0.2863 |
| `grenades.bursts` | 63 | 54 | -0.1875 | 22 | 14 | 8 | 0.2863 |
| `grenades.wounded` | 45 | 34 | -0.2292 | 10 | 4 | 6 | 0.7539 |
| `grenades.casualties` | 15 | 16 | 0.0208 | 9 | 5 | 4 | 1 |
| `grenades.suppressed` | 106 | 81 | -0.5208 | 15 | 10 | 5 | 0.3018 |
| `grenades.friendlyWounded` | 1 | 2 | 0.0208 | 3 | 2 | 1 | 1 |
| `grenades.friendlyCasualties` | 0 | 1 | 0.0208 | 1 | 1 | 0 | 1 |
| `grenades.aborted` | 6 | 10 | 0.0833 | 8 | 5 | 3 | 0.7266 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 120 | 7 | -2.3542 | 37 | 0 | 37 | 0 |
| `loopAlerts.length` | 878 | 980 | 2.125 | 44 | 29 | 15 | 0.0488 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 253 | 214 | -0.8125 | 39 | 14 | 25 | 0.1081 |
| `stallOutcomes.wakes` | 10 | 4 | -0.125 | 11 | 3 | 8 | 0.2266 |
| `stallOutcomes.repeats` | 2 | 3 | 0.0208 | 3 | 2 | 1 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1601 | 2683 | 22.5417 | 48 | 46 | 2 | 0 |
| `recon.contacts` | 258 | 595 | 7.0208 | 41 | 37 | 4 | 0 |
| `recon.noContact` | 752 | 687 | -1.3542 | 44 | 17 | 27 | 0.1742 |
| `recon.timeouts` | 63 | 46 | -0.3542 | 31 | 11 | 20 | 0.1496 |
| `recon.cancelled` | 478 | 1304 | 17.2083 | 47 | 46 | 1 | 0 |
| `recon.reportsDelivered` | 1009 | 2280 | 26.4792 | 44 | 37 | 7 | 0 |
| `recon.retriggerBlocked` | 710 | 830 | 2.5 | 41 | 28 | 13 | 0.0275 |
| `squadPerformance.meanOverall` | 3910.899999999999 | 3887.7999999999993 | -0.4813 | 46 | 20 | 26 | 0.4614 |
| `squadPerformance.p10Overall` | 3635.5 | 3632.0999999999995 | -0.0708 | 24 | 13 | 11 | 0.8388 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3194.6999999999994 | 3017.2999999999997 | -3.6958 | 44 | 6 | 38 | 0 |
| `squadPerformance.meanMovement` | 4792.4 | 4793.800000000001 | 0.0292 | 24 | 19 | 5 | 0.0066 |
| `squadPerformance.meanControl` | 4513.799999999998 | 4519.6 | 0.1208 | 44 | 24 | 20 | 0.6516 |
| `squadPerformance.meanCohesion` | 4309.099999999999 | 4456.400000000001 | 3.0687 | 46 | 40 | 6 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

item4-9e6866b-recon900-0001 0.15 s (timeline) · item4-9e6866b-recon900-0002 0.15 s (timeline) · item4-9e6866b-recon900-0003 0.15 s (timeline) · item4-9e6866b-recon900-0004 0.15 s (timeline) · item4-9e6866b-recon900-0005 0.15 s (timeline) · item4-9e6866b-recon900-0006 0.15 s (timeline) · item4-9e6866b-recon900-0007 0.15 s (timeline) · item4-9e6866b-recon900-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1702&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-item4-9e6866bc/ai_flow_live.html?bench=1702&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1702`); it opens the seed that parts earliest, and the dropdowns choose another.

