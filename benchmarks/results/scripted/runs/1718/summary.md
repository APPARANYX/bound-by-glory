# Benchmark run #1718 · 60 seeds from `pr782-defend-majority` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=new&defendMajorityWin=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/pin/pr782-8ebb4df @ 8ebb4df · [run](https://github.com/APPARANYX/grasstex/actions/runs/42347152858) · build v29-dev

## Verdict

**WEAK: 21 of 60 pairs changed (median first part 571.95 s); 10 of 42 counters under p 0.05 (about 2.1 by chance); casualties +7.2% (p 0.0625)**

- Under 0.05 only: retreatSamples 146688 to 166143 (+13.3%, p 0.0039); movementResolver.changes 211140 to 228986 (+8.5%, p 0.0078); loopAlerts.length 1515 to 1691 (+11.6%, p 0.0156); recon.orders 2696 to 2876 (+6.7%, p 0.0156); recon.noContact 716 to 784 (+9.5%, p 0.0156); recon.retriggerBlocked 830 to 910 (+9.6%, p 0.0156); squadPerformance.meanControl 5641.9 to 5612.8 (-0.5%, p 0.0156); recon.cancelled 1259 to 1350 (+7.2%, p 0.0313); squadPerformance.meanOverall 4866.799999999999 to 4774.499999999999 (-1.9%, p 0.0313); squadPerformance.meanMovement 5990.9 to 5990.0999999999985 (-0.0%, p 0.0313).

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **39** · runtime errors off 0 / on 0 · wall time on/off x1.088 (gate 1.25)
- the 3 changed records first part at simulated second: min 496.8, p10 496.8, median 571.95, p90 599.85, max 599.85

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2236 | 2397 | 2.6833 | 5 | 5 | 0 | 0.0625 |
| `usKills` | 1040 | 1118 | 1.3 | 5 | 5 | 0 | 0.0625 |
| `geKills` | 1196 | 1279 | 1.3833 | 5 | 5 | 0 | 0.0625 |
| `fire.total` | 66640 | 73308 | 111.1333 | 5 | 5 | 0 | 0.0625 |
| `fire.hits` | 5218 | 5578 | 6 | 5 | 5 | 0 | 0.0625 |
| `retreatSamples` | 146688 | 166143 | 324.25 | 9 | 9 | 0 | 0.0039 |
| `movementResolver.changes` | 211140 | 228986 | 297.4333 | 8 | 8 | 0 | 0.0078 |
| `grenades.throws` | 74 | 79 | 0.0833 | 1 | 1 | 0 | 1 |
| `grenades.bursts` | 73 | 78 | 0.0833 | 1 | 1 | 0 | 1 |
| `grenades.wounded` | 70 | 76 | 0.1 | 1 | 1 | 0 | 1 |
| `grenades.casualties` | 28 | 30 | 0.0333 | 1 | 1 | 0 | 1 |
| `grenades.suppressed` | 170 | 184 | 0.2333 | 1 | 1 | 0 | 1 |
| `grenades.friendlyWounded` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 16 | 16 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 23 | 24 | 0.0167 | 1 | 1 | 0 | 1 |
| `loopAlerts.length` | 1515 | 1691 | 2.9333 | 7 | 7 | 0 | 0.0156 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 250 | 290 | 0.6667 | 3 | 3 | 0 | 0.25 |
| `stallOutcomes.wakes` | 6 | 7 | 0.0167 | 1 | 1 | 0 | 1 |
| `stallOutcomes.repeats` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2696 | 2876 | 3 | 7 | 7 | 0 | 0.0156 |
| `recon.contacts` | 598 | 634 | 0.6 | 5 | 5 | 0 | 0.0625 |
| `recon.noContact` | 716 | 784 | 1.1333 | 7 | 7 | 0 | 0.0156 |
| `recon.timeouts` | 38 | 40 | 0.0333 | 1 | 1 | 0 | 1 |
| `recon.cancelled` | 1259 | 1350 | 1.5167 | 6 | 6 | 0 | 0.0313 |
| `recon.reportsDelivered` | 2500 | 2647 | 2.45 | 5 | 5 | 0 | 0.0625 |
| `recon.retriggerBlocked` | 830 | 910 | 1.3333 | 7 | 7 | 0 | 0.0156 |
| `squadPerformance.meanOverall` | 4866.799999999999 | 4774.499999999999 | -1.5383 | 6 | 0 | 6 | 0.0313 |
| `squadPerformance.p10Overall` | 4551.5 | 4452.8 | -1.645 | 5 | 0 | 5 | 0.0625 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3766.1 | 3582.9000000000005 | -3.0533 | 8 | 3 | 5 | 0.7266 |
| `squadPerformance.meanMovement` | 5990.9 | 5990.0999999999985 | -0.0133 | 6 | 0 | 6 | 0.0313 |
| `squadPerformance.meanControl` | 5641.9 | 5612.8 | -0.485 | 7 | 0 | 7 | 0.0156 |
| `squadPerformance.meanCohesion` | 5579.399999999998 | 5563.399999999998 | -0.2667 | 6 | 1 | 5 | 0.2188 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 3 seeds that part earliest (simulated seconds)

pr782-defend-majority-0015 496.8 s (timeline) · pr782-defend-majority-0052 571.95 s (timeline) · pr782-defend-majority-0050 599.85 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1718&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr782-8ebb4df/ai_flow_live.html?bench=1718&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1718`); it opens the seed that parts earliest, and the dropdowns choose another.

