# Benchmark run #1754 · 60 seeds from `pr787-m0m1-20261107` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&controllerReconstitution=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr787-dd122c3 @ dd122c3 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42423260811) · build v29-dev

## Verdict

**INERT: all 60 pairs identical in every field**


## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **60** · runtime errors off 0 / on 0 · wall time on/off x1.001 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2844 | 2844 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 1345 | 1345 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1499 | 1499 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 82613 | 82613 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 6657 | 6657 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 165088 | 165088 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 296977 | 296977 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 58 | 58 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 58 | 58 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 53 | 53 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 23 | 23 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 126 | 126 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 8 | 8 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 11 | 11 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 25 | 25 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 1889 | 1889 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 283 | 283 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 3151 | 3151 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 656 | 656 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 968 | 968 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 41 | 41 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 1432 | 1432 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 2719 | 2719 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1130 | 1130 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4825.499999999999 | 4825.499999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4446.8 | 4446.8 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3702.9999999999995 | 3702.9999999999995 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5988.599999999999 | 5988.599999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5605.199999999999 | 5605.199999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5566.299999999999 | 5566.299999999999 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr787-m0m1-20261107-0001 (identical) · pr787-m0m1-20261107-0002 (identical) · pr787-m0m1-20261107-0003 (identical) · pr787-m0m1-20261107-0004 (identical) · pr787-m0m1-20261107-0005 (identical) · pr787-m0m1-20261107-0006 (identical) · pr787-m0m1-20261107-0007 (identical) · pr787-m0m1-20261107-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1754&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr787-dd122c3/ai_flow_live.html?bench=1754&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1754`); it opens the seed that parts earliest, and the dropdowns choose another.

