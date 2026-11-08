# Benchmark run #1794 · 60 seeds from `pr795-m4-20261108` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0&controllerTransport=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr795-504f69e3 @ 504f69e · [run](https://github.com/APPARANYX/grasstex/actions/runs/42519100149) · build v29-dev

## Verdict

**INERT: all 60 pairs identical in every field**


## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **60** · runtime errors off 0 / on 0 · wall time on/off x0.946 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2338 | 2338 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 1061 | 1061 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1277 | 1277 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 80342 | 80342 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 5254 | 5254 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 99733 | 99733 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 398675 | 398675 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 49 | 49 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 48 | 48 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 27 | 27 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 6 | 6 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 62 | 62 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 10 | 10 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 46 | 46 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 2655 | 2655 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 432 | 432 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 19 | 19 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 7 | 7 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1522 | 1522 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 114 | 114 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 852 | 852 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 12 | 12 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 505 | 505 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 436 | 436 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1321 | 1321 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4647.5 | 4647.5 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4436.7 | 4436.7 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3428.1 | 3428.1 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5975.399999999998 | 5975.399999999998 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5290.000000000001 | 5290.000000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5366.799999999997 | 5366.799999999997 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr795-m4-20261108-0001 (identical) · pr795-m4-20261108-0002 (identical) · pr795-m4-20261108-0003 (identical) · pr795-m4-20261108-0004 (identical) · pr795-m4-20261108-0005 (identical) · pr795-m4-20261108-0006 (identical) · pr795-m4-20261108-0007 (identical) · pr795-m4-20261108-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1794&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr795-504f69e3/ai_flow_live.html?bench=1794&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1794`); it opens the seed that parts earliest, and the dropdowns choose another.

