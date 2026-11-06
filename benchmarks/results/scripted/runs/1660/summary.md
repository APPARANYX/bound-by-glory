# Benchmark run #1660 · 60 seeds from `reuse773` (us-defend), windows `0+600`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerRouteSight=0&controllerRoutePrune=0&controllerSuppressorScan=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/reuse773-8261fe6 @ 8261fe6 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42217650297) · build v29-dev

## Verdict

**QUIET: 36 of 60 pairs changed; 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties +0.0% (p 1)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **24** · runtime errors off 0 / on 0 · wall time on/off x0.958 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2231 | 2231 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 1110 | 1110 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1121 | 1121 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 66361 | 66361 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 5150 | 5150 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 137082 | 137082 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 205052 | 205052 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 60 | 60 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 60 | 60 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 61 | 61 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 23 | 23 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 159 | 159 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 9 | 9 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 87 | 87 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 882 | 882 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 244 | 244 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2486 | 2486 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 497 | 497 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 719 | 719 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 47 | 47 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 1143 | 1143 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 1932 | 1932 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 774 | 774 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4917.399999999999 | 4917.399999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4573.3 | 4573.3 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3903.7999999999997 | 3903.7999999999997 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5991.100000000001 | 5991.100000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5735 | 5735 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5549.900000000001 | 5549.900000000001 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

reuse773-0001 (identical) · reuse773-0002 (identical) · reuse773-0003 (identical) · reuse773-0004 (identical) · reuse773-0005 (identical) · reuse773-0006 (identical) · reuse773-0007 (identical) · reuse773-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1660&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-reuse773-8261fe6/ai_flow_live.html?bench=1660&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1660`); it opens the seed that parts earliest, and the dropdowns choose another.

