# Benchmark run #1769 · 48 seeds from `pr787-m2-recon900-20261108` (meeting), windows `0+900`

- **OFF** flags: `strategicInterception=0&controllerReconstitution=0&controllerRecovery=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr787-m2-83fb5a0 @ 83fb5a0 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42434369842) · build v29-dev

## Verdict

**INERT: all 48 pairs identical in every field**


## Paired comparison (off against on)

- **48** pairs (unpaired: off 0, on 0) · identical in every field: **48** · runtime errors off 0 / on 0 · wall time on/off x0.992 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2340 | 2340 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 989 | 989 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1351 | 1351 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 62615 | 62615 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 5180 | 5180 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 163440 | 163440 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 276137 | 276137 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 35 | 35 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 35 | 35 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 20 | 20 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 48 | 48 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 10 | 10 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 67 | 67 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 2050 | 2050 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 351 | 351 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 6 | 6 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 81 | 81 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 81 | 81 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1883 | 1883 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 123 | 123 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 945 | 945 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 22 | 22 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 705 | 705 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 587 | 587 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1451 | 1451 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 3709.5999999999995 | 3709.5999999999995 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 3544.5 | 3544.5 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 2688.2999999999997 | 2688.2999999999997 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 4782.299999999999 | 4782.299999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 4258.5 | 4258.5 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 4460.5 | 4460.5 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr787-m2-recon900-20261108-0001 (identical) · pr787-m2-recon900-20261108-0002 (identical) · pr787-m2-recon900-20261108-0003 (identical) · pr787-m2-recon900-20261108-0004 (identical) · pr787-m2-recon900-20261108-0005 (identical) · pr787-m2-recon900-20261108-0006 (identical) · pr787-m2-recon900-20261108-0007 (identical) · pr787-m2-recon900-20261108-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1769&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr787-m2-83fb5a0/ai_flow_live.html?bench=1769&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1769`); it opens the seed that parts earliest, and the dropdowns choose another.

