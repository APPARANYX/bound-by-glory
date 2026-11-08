# Benchmark run #1748 · 60 seeds from `pr787-m0m1-20261107` (ge-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&controllerReconstitution=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr787-dd122c3 @ dd122c3 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42423162684) · build v29-dev

## Verdict

**INERT: all 60 pairs identical in every field**


## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **60** · runtime errors off 0 / on 0 · wall time on/off x0.991 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2761 | 2761 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 1032 | 1032 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1729 | 1729 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 67899 | 67899 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 6102 | 6102 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 148651 | 148651 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 280567 | 280567 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 82 | 82 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 82 | 82 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 61 | 61 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 27 | 27 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 163 | 163 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 12 | 12 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 17 | 17 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 1435 | 1435 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 236 | 236 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 16 | 16 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 16 | 16 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 3399 | 3399 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 774 | 774 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 931 | 931 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 36 | 36 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 1599 | 1599 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 2950 | 2950 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1119 | 1119 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4842.399999999999 | 4842.399999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4460 | 4460 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3744.899999999999 | 3744.899999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5990.799999999998 | 5990.799999999998 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5629.200000000001 | 5629.200000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5565.299999999999 | 5565.299999999999 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr787-m0m1-20261107-0001 (identical) · pr787-m0m1-20261107-0002 (identical) · pr787-m0m1-20261107-0003 (identical) · pr787-m0m1-20261107-0004 (identical) · pr787-m0m1-20261107-0005 (identical) · pr787-m0m1-20261107-0006 (identical) · pr787-m0m1-20261107-0007 (identical) · pr787-m0m1-20261107-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1748&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr787-dd122c3/ai_flow_live.html?bench=1748&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1748`); it opens the seed that parts earliest, and the dropdowns choose another.

