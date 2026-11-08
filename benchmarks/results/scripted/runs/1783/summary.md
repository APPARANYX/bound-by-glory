# Benchmark run #1783 · 48 seeds from `pr793-brief900-20261108` (us-defend), windows `0+900`

- **OFF** flags: `strategicInterception=0&controllerBriefs=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr793-156811c @ 156811c · [run](https://github.com/APPARANYX/grasstex/actions/runs/42493909930) · build v29-dev

## Verdict

**INERT: all 48 pairs identical in every field**


## Paired comparison (off against on)

- **48** pairs (unpaired: off 0, on 0) · identical in every field: **48** · runtime errors off 0 / on 0 · wall time on/off x1.006 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 3004 | 3004 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 1466 | 1466 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1538 | 1538 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 88282 | 88282 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 6849 | 6849 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 317331 | 317331 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 320852 | 320852 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 70 | 70 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 68 | 68 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 68 | 68 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 22 | 22 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 198 | 198 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 15 | 15 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 50 | 50 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 2168 | 2168 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 391 | 391 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 11 | 11 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 7 | 7 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 3364 | 3364 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 707 | 707 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 1030 | 1030 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 59 | 59 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 1495 | 1495 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 2862 | 2862 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1246 | 1246 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 3767.899999999999 | 3767.899999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 3553.7000000000003 | 3553.7000000000003 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 2769.0999999999995 | 2769.0999999999995 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 4789.500000000001 | 4789.500000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 4460.500000000001 | 4460.500000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 4490.8 | 4490.8 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr793-brief900-20261108-0001 (identical) · pr793-brief900-20261108-0002 (identical) · pr793-brief900-20261108-0003 (identical) · pr793-brief900-20261108-0004 (identical) · pr793-brief900-20261108-0005 (identical) · pr793-brief900-20261108-0006 (identical) · pr793-brief900-20261108-0007 (identical) · pr793-brief900-20261108-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1783&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr793-156811c/ai_flow_live.html?bench=1783&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1783`); it opens the seed that parts earliest, and the dropdowns choose another.

