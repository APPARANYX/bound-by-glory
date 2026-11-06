# Benchmark run #1633 · 60 seeds from `fc769` (us-defend), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerFastChecks=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/benchmark-launch/fc769-us-defend @ 88ce80c · [run](https://github.com/APPARANYX/grasstex/actions/runs/42146548455) · build v29-dev

## Verdict

**INERT: all 57 pairs identical in every field**


## Paired comparison (off against on)

- **57** pairs (unpaired: off 0, on 0) · identical in every field: **57** · runtime errors off 0 / on 0 · wall time on/off x0.966 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 802 | 802 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 388 | 388 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 414 | 414 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 25482 | 25482 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 1859 | 1859 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 5048 | 5048 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 116739 | 116739 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 13 | 13 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 13 | 13 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 13 | 13 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 517 | 517 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 65 | 65 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1317 | 1317 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 167 | 167 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 507 | 507 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 22 | 22 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 567 | 567 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 698 | 698 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 503 | 503 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4940.599999999999 | 4940.599999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4460.2 | 4460.2 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4404 | 4404 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5674.299999999999 | 5674.299999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5400.200000000001 | 5400.200000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5014.700000000003 | 5014.700000000003 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

fc769-0001 (identical) · fc769-0002 (identical) · fc769-0003 (identical) · fc769-0004 (identical) · fc769-0006 (identical) · fc769-0007 (identical) · fc769-0008 (identical) · fc769-0009 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1633&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/benchmark-launch-fc769-us-defend/ai_flow_live.html?bench=1633&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1633`); it opens the seed that parts earliest, and the dropdowns choose another.

