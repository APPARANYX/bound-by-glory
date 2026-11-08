# Benchmark run #1764 · 60 seeds from `pr787-m2-20261108` (ge-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&controllerReconstitution=0&controllerRecovery=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr787-m2-83fb5a0 @ 83fb5a0 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42434336481) · build v29-dev

## Verdict

**INERT: all 60 pairs identical in every field**


## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **60** · runtime errors off 0 / on 0 · wall time on/off x0.999 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2883 | 2883 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 1179 | 1179 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1704 | 1704 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 75219 | 75219 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 6624 | 6624 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 146249 | 146249 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 288355 | 288355 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 105 | 105 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 105 | 105 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 93 | 93 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 29 | 29 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 264 | 264 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 7 | 7 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 20 | 20 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 17 | 17 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 1535 | 1535 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 259 | 259 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 3552 | 3552 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 743 | 743 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 919 | 919 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 62 | 62 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 1750 | 1750 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 3107 | 3107 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1142 | 1142 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4843.700000000001 | 4843.700000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4454.200000000001 | 4454.200000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3769.7 | 3769.7 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5990 | 5990 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5612.4 | 5612.4 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5549.499999999999 | 5549.499999999999 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr787-m2-20261108-0001 (identical) · pr787-m2-20261108-0002 (identical) · pr787-m2-20261108-0003 (identical) · pr787-m2-20261108-0004 (identical) · pr787-m2-20261108-0005 (identical) · pr787-m2-20261108-0006 (identical) · pr787-m2-20261108-0007 (identical) · pr787-m2-20261108-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1764&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr787-m2-83fb5a0/ai_flow_live.html?bench=1764&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1764`); it opens the seed that parts earliest, and the dropdowns choose another.

