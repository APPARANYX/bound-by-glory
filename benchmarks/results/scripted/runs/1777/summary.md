# Benchmark run #1777 · 60 seeds from `pr793-m3-20261108` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&controllerBriefs=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr793-156811c @ 156811c · [run](https://github.com/APPARANYX/grasstex/actions/runs/42493873577) · build v29-dev

## Verdict

**INERT: all 60 pairs identical in every field**


## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **60** · runtime errors off 0 / on 0 · wall time on/off x0.98 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2687 | 2687 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 1328 | 1328 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1359 | 1359 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 83389 | 83389 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 6348 | 6348 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 174811 | 174811 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 287857 | 287857 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 42 | 42 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 42 | 42 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 45 | 45 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 17 | 17 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 98 | 98 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 19 | 19 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 1863 | 1863 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 303 | 303 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 3088 | 3088 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 636 | 636 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 958 | 958 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 56 | 56 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 1349 | 1349 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 2595 | 2595 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1099 | 1099 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4812.499999999999 | 4812.499999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4457.200000000001 | 4457.200000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3629.0000000000005 | 3629.0000000000005 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5989.2 | 5989.2 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5626.200000000002 | 5626.200000000002 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5585.800000000002 | 5585.800000000002 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr793-m3-20261108-0001 (identical) · pr793-m3-20261108-0002 (identical) · pr793-m3-20261108-0003 (identical) · pr793-m3-20261108-0004 (identical) · pr793-m3-20261108-0005 (identical) · pr793-m3-20261108-0006 (identical) · pr793-m3-20261108-0007 (identical) · pr793-m3-20261108-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1777&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr793-156811c/ai_flow_live.html?bench=1777&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1777`); it opens the seed that parts earliest, and the dropdowns choose another.

