# Benchmark run #1756 · 48 seeds from `pr787-recon900-20261107` (us-defend), windows `0+900`

- **OFF** flags: `strategicInterception=0&controllerReconstitution=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr787-dd122c3 @ dd122c3 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42423318375) · build v29-dev

## Verdict

**INERT: all 48 pairs identical in every field**


## Paired comparison (off against on)

- **48** pairs (unpaired: off 0, on 0) · identical in every field: **48** · runtime errors off 0 / on 0 · wall time on/off x0.992 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 3147 | 3147 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 1539 | 1539 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1608 | 1608 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 91428 | 91428 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 7121 | 7121 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 314204 | 314204 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 321723 | 321723 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 58 | 58 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 57 | 57 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 42 | 42 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 15 | 15 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 126 | 126 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 11 | 11 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 48 | 48 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 2159 | 2159 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 432 | 432 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 3197 | 3197 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 663 | 663 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 1049 | 1049 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 56 | 56 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 1355 | 1355 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 2430 | 2430 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1202 | 1202 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 3772.200000000001 | 3772.200000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 3553.4999999999995 | 3553.4999999999995 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 2792.7999999999997 | 2792.7999999999997 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 4786.500000000001 | 4786.500000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 4457.299999999999 | 4457.299999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 4471.200000000001 | 4471.200000000001 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr787-recon900-20261107-0001 (identical) · pr787-recon900-20261107-0002 (identical) · pr787-recon900-20261107-0003 (identical) · pr787-recon900-20261107-0004 (identical) · pr787-recon900-20261107-0005 (identical) · pr787-recon900-20261107-0006 (identical) · pr787-recon900-20261107-0007 (identical) · pr787-recon900-20261107-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1756&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr787-dd122c3/ai_flow_live.html?bench=1756&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1756`); it opens the seed that parts earliest, and the dropdowns choose another.

