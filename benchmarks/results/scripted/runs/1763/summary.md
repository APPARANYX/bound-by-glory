# Benchmark run #1763 · 60 seeds from `pr787-m2-20261108` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&controllerReconstitution=0&controllerRecovery=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr787-m2-83fb5a0 @ 83fb5a0 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42434334951) · build v29-dev

## Verdict

**INERT: all 60 pairs identical in every field**


## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **60** · runtime errors off 0 / on 0 · wall time on/off x0.996 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2733 | 2733 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 1386 | 1386 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1347 | 1347 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 78212 | 78212 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 6428 | 6428 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 159619 | 159619 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 280851 | 280851 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 49 | 49 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 48 | 48 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 21 | 21 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 11 | 11 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 49 | 49 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 9 | 9 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 13 | 13 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 1629 | 1629 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 306 | 306 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 3172 | 3172 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 724 | 724 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 1004 | 1004 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 42 | 42 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 1343 | 1343 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 2873 | 2873 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1135 | 1135 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4829.8 | 4829.8 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4455 | 4455 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3714.3999999999996 | 3714.3999999999996 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5989.6 | 5989.6 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5633.800000000001 | 5633.800000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5549.4000000000015 | 5549.4000000000015 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr787-m2-20261108-0001 (identical) · pr787-m2-20261108-0002 (identical) · pr787-m2-20261108-0003 (identical) · pr787-m2-20261108-0004 (identical) · pr787-m2-20261108-0005 (identical) · pr787-m2-20261108-0006 (identical) · pr787-m2-20261108-0007 (identical) · pr787-m2-20261108-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1763&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr787-m2-83fb5a0/ai_flow_live.html?bench=1763&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1763`); it opens the seed that parts earliest, and the dropdowns choose another.

