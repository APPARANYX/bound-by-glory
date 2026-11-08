# Benchmark run #1780 · 60 seeds from `pr793-m3-20261108` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0&controllerBriefs=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr793-156811c @ 156811c · [run](https://github.com/APPARANYX/grasstex/actions/runs/42493893764) · build v29-dev

## Verdict

**INERT: all 60 pairs identical in every field**


## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **60** · runtime errors off 0 / on 0 · wall time on/off x1.007 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2429 | 2429 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 1084 | 1084 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1345 | 1345 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 68084 | 68084 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 5599 | 5599 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 125581 | 125581 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 301336 | 301336 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 32 | 32 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 32 | 32 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 23 | 23 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 9 | 9 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 53 | 53 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 10 | 10 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 51 | 51 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 2149 | 2149 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 320 | 320 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1817 | 1817 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 110 | 110 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 914 | 914 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 9 | 9 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 695 | 695 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 526 | 526 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1379 | 1379 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4711.000000000001 | 4711.000000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4476.200000000001 | 4476.200000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3481.1999999999994 | 3481.1999999999994 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5981.5 | 5981.5 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5380.500000000001 | 5380.500000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5593.900000000002 | 5593.900000000002 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr793-m3-20261108-0001 (identical) · pr793-m3-20261108-0002 (identical) · pr793-m3-20261108-0003 (identical) · pr793-m3-20261108-0004 (identical) · pr793-m3-20261108-0005 (identical) · pr793-m3-20261108-0006 (identical) · pr793-m3-20261108-0007 (identical) · pr793-m3-20261108-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1780&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr793-156811c/ai_flow_live.html?bench=1780&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1780`); it opens the seed that parts earliest, and the dropdowns choose another.

