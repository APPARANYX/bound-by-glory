# Benchmark run #1799 · 48 seeds from `pr795-transport900-20261108` (meeting), windows `0+900`

- **OFF** flags: `strategicInterception=0&controllerTransport=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr795-504f69e3 @ 504f69e · [run](https://github.com/APPARANYX/grasstex/actions/runs/42519346965) · build v29-dev

## Verdict

**INERT: all 48 pairs identical in every field**


## Paired comparison (off against on)

- **48** pairs (unpaired: off 0, on 0) · identical in every field: **48** · runtime errors off 0 / on 0 · wall time on/off x1.016 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2088 | 2088 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 891 | 891 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1197 | 1197 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 63856 | 63856 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 4741 | 4741 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 164682 | 164682 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 357686 | 357686 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 56 | 56 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 55 | 55 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 36 | 36 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 14 | 14 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 80 | 80 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 19 | 19 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 90 | 90 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 2551 | 2551 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 510 | 510 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 15 | 15 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 8 | 8 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1662 | 1662 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 118 | 118 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 877 | 877 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 20 | 20 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 563 | 563 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 512 | 512 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1357 | 1357 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 3689.3999999999987 | 3689.3999999999987 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 3514.5 | 3514.5 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 2693.4 | 2693.4 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 4775.900000000001 | 4775.900000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 4209.099999999999 | 4209.099999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 4312.499999999999 | 4312.499999999999 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr795-transport900-20261108-0001 (identical) · pr795-transport900-20261108-0002 (identical) · pr795-transport900-20261108-0003 (identical) · pr795-transport900-20261108-0004 (identical) · pr795-transport900-20261108-0005 (identical) · pr795-transport900-20261108-0006 (identical) · pr795-transport900-20261108-0007 (identical) · pr795-transport900-20261108-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1799&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr795-504f69e3/ai_flow_live.html?bench=1799&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1799`); it opens the seed that parts earliest, and the dropdowns choose another.

