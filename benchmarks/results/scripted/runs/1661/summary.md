# Benchmark run #1661 · 60 seeds from `reuse773` (meeting), windows `0+600`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerRouteSight=0&controllerRoutePrune=0&controllerSuppressorScan=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/reuse773-8261fe6 @ 8261fe6 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42217650371) · build v29-dev

## Verdict

**QUIET: 32 of 60 pairs changed; 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties +0.0% (p 1)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **28** · runtime errors off 0 / on 0 · wall time on/off x0.899 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2569 | 2569 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 1145 | 1145 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1424 | 1424 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 69875 | 69875 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 5952 | 5952 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 131324 | 131324 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 305445 | 305445 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 41 | 41 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 41 | 41 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 40 | 40 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 13 | 13 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 83 | 83 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 13 | 13 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 267 | 267 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 1012 | 1012 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 327 | 327 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 50 | 50 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 50 | 50 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1883 | 1883 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 127 | 127 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 936 | 936 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 13 | 13 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 726 | 726 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 602 | 602 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1473 | 1473 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4769.999999999999 | 4769.999999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4456.5 | 4456.5 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3547.2000000000003 | 3547.2000000000003 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5979.700000000001 | 5979.700000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5624.400000000003 | 5624.400000000003 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5583.100000000001 | 5583.100000000001 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

reuse773-0001 (identical) · reuse773-0002 (identical) · reuse773-0003 (identical) · reuse773-0004 (identical) · reuse773-0005 (identical) · reuse773-0006 (identical) · reuse773-0007 (identical) · reuse773-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1661&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-reuse773-8261fe6/ai_flow_live.html?bench=1661&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1661`); it opens the seed that parts earliest, and the dropdowns choose another.

