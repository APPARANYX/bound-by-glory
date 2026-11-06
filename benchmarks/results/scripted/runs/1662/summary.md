# Benchmark run #1662 · 60 seeds from `reuse773` (ge-defend), windows `0+600`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerRouteSight=0&controllerRoutePrune=0&controllerSuppressorScan=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/reuse773-8261fe6 @ 8261fe6 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42217660427) · build v29-dev

## Verdict

**QUIET: 18 of 60 pairs changed; 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties +0.0% (p 1)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **42** · runtime errors off 0 / on 0 · wall time on/off x0.928 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2283 | 2283 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 893 | 893 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1390 | 1390 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 58003 | 58003 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 5302 | 5302 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 131981 | 131981 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 201114 | 201114 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 46 | 46 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 46 | 46 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 23 | 23 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 43 | 43 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 6 | 6 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 9 | 9 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 88 | 88 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 856 | 856 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 203 | 203 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2754 | 2754 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 635 | 635 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 590 | 590 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 35 | 35 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 1439 | 1439 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 2595 | 2595 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 798 | 798 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4941.499999999999 | 4941.499999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4590.699999999999 | 4590.699999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3947.2 | 3947.2 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5991.899999999999 | 5991.899999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5735.999999999999 | 5735.999999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5571.199999999997 | 5571.199999999997 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

reuse773-0001 (identical) · reuse773-0002 (identical) · reuse773-0003 (identical) · reuse773-0004 (identical) · reuse773-0005 (identical) · reuse773-0006 (identical) · reuse773-0007 (identical) · reuse773-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1662&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-reuse773-8261fe6/ai_flow_live.html?bench=1662&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1662`); it opens the seed that parts earliest, and the dropdowns choose another.

