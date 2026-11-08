# Benchmark run #1766 · 60 seeds from `pr787-m2-20261108` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0&controllerReconstitution=0&controllerRecovery=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr787-m2-83fb5a0 @ 83fb5a0 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42434344918) · build v29-dev

## Verdict

**INERT: all 60 pairs identical in every field**


## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **60** · runtime errors off 0 / on 0 · wall time on/off x0.992 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2585 | 2585 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 1102 | 1102 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1483 | 1483 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 66985 | 66985 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 5706 | 5706 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 114352 | 114352 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 303356 | 303356 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 59 | 59 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 59 | 59 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 48 | 48 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 19 | 19 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 75 | 75 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 12 | 12 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 45 | 45 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 2047 | 2047 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 313 | 313 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 6 | 6 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 98 | 98 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 98 | 98 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1970 | 1970 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 117 | 117 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 945 | 945 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 13 | 13 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 798 | 798 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 535 | 535 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1508 | 1508 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4701.8 | 4701.8 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4466.4 | 4466.4 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3498.4 | 3498.4 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5981.100000000003 | 5981.100000000003 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5338.100000000001 | 5338.100000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5585.100000000001 | 5585.100000000001 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr787-m2-20261108-0001 (identical) · pr787-m2-20261108-0002 (identical) · pr787-m2-20261108-0003 (identical) · pr787-m2-20261108-0004 (identical) · pr787-m2-20261108-0005 (identical) · pr787-m2-20261108-0006 (identical) · pr787-m2-20261108-0007 (identical) · pr787-m2-20261108-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1766&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr787-m2-83fb5a0/ai_flow_live.html?bench=1766&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1766`); it opens the seed that parts earliest, and the dropdowns choose another.

