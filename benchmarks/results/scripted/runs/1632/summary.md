# Benchmark run #1632 · 60 seeds from `fc769` (ge-defend), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerFastChecks=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/benchmark-launch/fc769-ge-defend @ c0384f0 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42146319082) · build v29-dev

## Verdict

**INERT: all 57 pairs identical in every field**


## Paired comparison (off against on)

- **57** pairs (unpaired: off 0, on 0) · identical in every field: **57** · runtime errors off 0 / on 0 · wall time on/off x0.939 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 827 | 827 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 325 | 325 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 502 | 502 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 21680 | 21680 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 1873 | 1873 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 5822 | 5822 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 109534 | 109534 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 15 | 15 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 13 | 13 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 6 | 6 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 38 | 38 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 448 | 448 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 98 | 98 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1535 | 1535 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 223 | 223 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 432 | 432 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 17 | 17 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 786 | 786 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 841 | 841 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 551 | 551 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4937.5 | 4937.5 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4443.7 | 4443.7 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4443 | 4443 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5675.300000000001 | 5675.300000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5427.999999999999 | 5427.999999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 4896.700000000002 | 4896.700000000002 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

fc769-0001 (identical) · fc769-0002 (identical) · fc769-0003 (identical) · fc769-0004 (identical) · fc769-0006 (identical) · fc769-0007 (identical) · fc769-0008 (identical) · fc769-0009 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1632&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/benchmark-launch-fc769-ge-defend/ai_flow_live.html?bench=1632&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1632`); it opens the seed that parts earliest, and the dropdowns choose another.

