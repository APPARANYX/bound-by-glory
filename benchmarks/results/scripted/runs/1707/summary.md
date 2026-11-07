# Benchmark run #1707 · 60 seeds from `pr781-single-writer` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=new&controllerSingleWriter=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/pin/pr781-2d641e38 @ 2d641e3 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42341657376) · build v29-dev

## Verdict

**INERT: all 60 pairs identical in every field**


## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **60** · runtime errors off 0 / on 0 · wall time on/off x1.001 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2716 | 2716 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 1248 | 1248 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1468 | 1468 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 71961 | 71961 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 5980 | 5980 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 121140 | 121140 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 317625 | 317625 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 50 | 50 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 49 | 49 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 49 | 49 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 16 | 16 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 96 | 96 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 18 | 18 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 62 | 62 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 2409 | 2409 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 319 | 319 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 6 | 6 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1908 | 1908 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 127 | 127 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 988 | 988 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 9 | 9 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 718 | 718 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 632 | 632 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1514 | 1514 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4679.499999999999 | 4679.499999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4449 | 4449 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3454.4999999999995 | 3454.4999999999995 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5980.4 | 5980.4 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5338.899999999997 | 5338.899999999997 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5581.7 | 5581.7 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr781-single-writer-0001 (identical) · pr781-single-writer-0002 (identical) · pr781-single-writer-0003 (identical) · pr781-single-writer-0004 (identical) · pr781-single-writer-0005 (identical) · pr781-single-writer-0006 (identical) · pr781-single-writer-0007 (identical) · pr781-single-writer-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1707&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr781-2d641e38/ai_flow_live.html?bench=1707&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1707`); it opens the seed that parts earliest, and the dropdowns choose another.

