# Benchmark run #1634 · 60 seeds from `fc769` (meeting), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerFastChecks=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/benchmark-launch/fc769-meeting @ 6ad497c · [run](https://github.com/APPARANYX/grasstex/actions/runs/42146670059) · build v29-dev

## Verdict

**INERT: all 60 pairs identical in every field**


## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **60** · runtime errors off 0 / on 0 · wall time on/off x0.948 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 929 | 929 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 399 | 399 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 530 | 530 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 29296 | 29296 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 2021 | 2021 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 5735 | 5735 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 202109 | 202109 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 7 | 7 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 713 | 713 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 43 | 43 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1311 | 1311 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 65 | 65 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 715 | 715 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 518 | 518 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 406 | 406 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1098 | 1098 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 5075.7 | 5075.7 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4646.099999999999 | 4646.099999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4332.800000000001 | 4332.800000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5921.199999999998 | 5921.199999999998 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5559.099999999999 | 5559.099999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5402.700000000001 | 5402.700000000001 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

fc769-0001 (identical) · fc769-0002 (identical) · fc769-0003 (identical) · fc769-0004 (identical) · fc769-0005 (identical) · fc769-0006 (identical) · fc769-0007 (identical) · fc769-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1634&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/benchmark-launch-fc769-meeting/ai_flow_live.html?bench=1634&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1634`); it opens the seed that parts earliest, and the dropdowns choose another.

