# Benchmark run #1795 · 60 seeds from `pr795-m4-20261108` (ge-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&controllerTransport=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr795-504f69e3 @ 504f69e · [run](https://github.com/APPARANYX/grasstex/actions/runs/42519105345) · build v29-dev

## Verdict

**INERT: all 60 pairs identical in every field**


## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **60** · runtime errors off 0 / on 0 · wall time on/off x1.005 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2158 | 2158 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 948 | 948 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1210 | 1210 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 69918 | 69918 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 5035 | 5035 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 119585 | 119585 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 315634 | 315634 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 69 | 69 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 68 | 68 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 33 | 33 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 11 | 11 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 90 | 90 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 12 | 12 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 10 | 10 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 1815 | 1815 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 328 | 328 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 11 | 11 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 3704 | 3704 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 778 | 778 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 830 | 830 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 34 | 34 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 2003 | 2003 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 3108 | 3108 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1086 | 1086 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4841.000000000001 | 4841.000000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4478.9 | 4478.9 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3783.9999999999995 | 3783.9999999999995 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5988.4000000000015 | 5988.4000000000015 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5561.300000000001 | 5561.300000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5439.3 | 5439.3 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr795-m4-20261108-0001 (identical) · pr795-m4-20261108-0002 (identical) · pr795-m4-20261108-0003 (identical) · pr795-m4-20261108-0004 (identical) · pr795-m4-20261108-0005 (identical) · pr795-m4-20261108-0006 (identical) · pr795-m4-20261108-0007 (identical) · pr795-m4-20261108-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1795&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr795-504f69e3/ai_flow_live.html?bench=1795&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1795`); it opens the seed that parts earliest, and the dropdowns choose another.

