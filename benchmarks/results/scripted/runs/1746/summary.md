# Benchmark run #1746 · 60 seeds from `pr787-m0m1-20261107` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr787-main-aed0165 @ aed0165 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42423023650) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 16 of 42 counters under p 0.05 (about 2.1 by chance), 13 under 0.0012; casualties -7.8% (p 0.0627)**

- Clears the Bonferroni line (p < 0.0012): fire.total 46572 to 82613 (+77.4%, p 0); movementResolver.changes 215482 to 296977 (+37.8%, p 0); vacantObjectiveStalls.length 122 to 25 (-79.5%, p 0); loopAlerts.length 1056 to 1889 (+78.9%, p 0); recon.orders 1879 to 3151 (+67.7%, p 0); recon.contacts 268 to 656 (+144.8%, p 0); recon.cancelled 526 to 1432 (+172.2%, p 0); recon.reportsDelivered 1203 to 2719 (+126.0%, p 0); recon.retriggerBlocked 979 to 1130 (+15.4%, p 0); squadPerformance.meanOverall 4892.299999999999 to 4825.499999999999 (-1.4%, p 0); squadPerformance.meanMission 3924.6 to 3702.9999999999995 (-5.6%, p 0); squadPerformance.meanControl 5723.800000000001 to 5605.199999999999 (-2.1%, p 0); squadPerformance.meanCohesion 5442.900000000001 to 5566.299999999999 (+2.3%, p 0).
- Under 0.05 only: usKills 1540 to 1345 (-12.7%, p 0.0247); retreatSamples 141903 to 165088 (+16.3%, p 0.0273); squadPerformance.p10Overall 4464.1 to 4446.8 (-0.4%, p 0.0347).
- Wall time on/off x1.46 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.46 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 3085 | 2844 | -4.0167 | 57 | 21 | 36 | 0.0627 |
| `usKills` | 1540 | 1345 | -3.25 | 58 | 20 | 38 | 0.0247 |
| `geKills` | 1545 | 1499 | -0.7667 | 56 | 23 | 33 | 0.2288 |
| `fire.total` | 46572 | 82613 | 600.6833 | 60 | 58 | 2 | 0 |
| `fire.hits` | 6975 | 6657 | -5.3 | 60 | 24 | 36 | 0.155 |
| `retreatSamples` | 141903 | 165088 | 386.4167 | 60 | 39 | 21 | 0.0273 |
| `movementResolver.changes` | 215482 | 296977 | 1358.25 | 60 | 59 | 1 | 0 |
| `grenades.throws` | 73 | 58 | -0.25 | 23 | 11 | 12 | 1 |
| `grenades.bursts` | 73 | 58 | -0.25 | 23 | 11 | 12 | 1 |
| `grenades.wounded` | 41 | 53 | 0.2 | 15 | 10 | 5 | 0.3018 |
| `grenades.casualties` | 13 | 23 | 0.1667 | 8 | 6 | 2 | 0.2891 |
| `grenades.suppressed` | 132 | 126 | -0.1 | 17 | 7 | 10 | 0.6291 |
| `grenades.friendlyWounded` | 8 | 8 | 0 | 4 | 2 | 2 | 1 |
| `grenades.friendlyCasualties` | 3 | 4 | 0.0167 | 3 | 2 | 1 | 1 |
| `grenades.aborted` | 9 | 11 | 0.0333 | 11 | 6 | 5 | 1 |
| `movementStalls.length` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 122 | 25 | -1.6167 | 46 | 3 | 43 | 0 |
| `loopAlerts.length` | 1056 | 1889 | 13.8833 | 60 | 50 | 10 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 258 | 283 | 0.4167 | 53 | 31 | 22 | 0.2717 |
| `stallOutcomes.wakes` | 13 | 3 | -0.1667 | 13 | 3 | 10 | 0.0923 |
| `stallOutcomes.repeats` | 3 | 1 | -0.0333 | 4 | 1 | 3 | 0.625 |
| `timeline.stalledOnsets` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamples` | 42 | 0 | -0.7 | 1 | 0 | 1 | 1 |
| `timeline.stalledOnsetsRepeated` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamplesRepeated` | 42 | 0 | -0.7 | 1 | 0 | 1 | 1 |
| `recon.orders` | 1879 | 3151 | 21.2 | 60 | 59 | 1 | 0 |
| `recon.contacts` | 268 | 656 | 6.4667 | 56 | 50 | 6 | 0 |
| `recon.noContact` | 978 | 968 | -0.1667 | 50 | 25 | 25 | 1 |
| `recon.timeouts` | 44 | 41 | -0.05 | 34 | 16 | 18 | 0.8642 |
| `recon.cancelled` | 526 | 1432 | 15.1 | 60 | 60 | 0 | 0 |
| `recon.reportsDelivered` | 1203 | 2719 | 25.2667 | 58 | 49 | 9 | 0 |
| `recon.retriggerBlocked` | 979 | 1130 | 2.5167 | 53 | 43 | 10 | 0 |
| `squadPerformance.meanOverall` | 4892.299999999999 | 4825.499999999999 | -1.1133 | 60 | 12 | 48 | 0 |
| `squadPerformance.p10Overall` | 4464.1 | 4446.8 | -0.2883 | 23 | 6 | 17 | 0.0347 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3924.6 | 3702.9999999999995 | -3.6933 | 59 | 8 | 51 | 0 |
| `squadPerformance.meanMovement` | 5988.999999999998 | 5988.599999999999 | -0.0067 | 34 | 15 | 19 | 0.6076 |
| `squadPerformance.meanControl` | 5723.800000000001 | 5605.199999999999 | -1.9767 | 60 | 14 | 46 | 0 |
| `squadPerformance.meanCohesion` | 5442.900000000001 | 5566.299999999999 | 2.0567 | 60 | 49 | 11 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr787-m0m1-20261107-0001 0.15 s (timeline) · pr787-m0m1-20261107-0002 0.15 s (timeline) · pr787-m0m1-20261107-0003 0.15 s (timeline) · pr787-m0m1-20261107-0004 0.15 s (timeline) · pr787-m0m1-20261107-0005 0.15 s (timeline) · pr787-m0m1-20261107-0006 0.15 s (timeline) · pr787-m0m1-20261107-0007 0.15 s (timeline) · pr787-m0m1-20261107-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1746&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr787-main-aed0165/ai_flow_live.html?bench=1746&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1746`); it opens the seed that parts earliest, and the dropdowns choose another.

