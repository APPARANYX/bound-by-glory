# Benchmark run #1713 · 60 seeds from `pr781-single-writer` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=new&controllerSingleWriter=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/pin/pr781-2d641e38 @ 2d641e3 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42341868907) · build v29-dev

## Verdict

**INERT: all 60 pairs identical in every field**


## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **60** · runtime errors off 0 / on 0 · wall time on/off x1.094 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2352 | 2352 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 1169 | 1169 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1183 | 1183 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 68608 | 68608 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 5292 | 5292 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 151587 | 151587 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 222590 | 222590 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 59 | 59 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 59 | 59 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 53 | 53 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 24 | 24 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 112 | 112 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 9 | 9 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 19 | 19 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 1609 | 1609 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 254 | 254 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2670 | 2670 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 588 | 588 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 773 | 773 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 26 | 26 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 1216 | 1216 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 2340 | 2340 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 865 | 865 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4799.1 | 4799.1 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4485.9 | 4485.9 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3664.6000000000004 | 3664.6000000000004 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5990.700000000002 | 5990.700000000002 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5621.000000000002 | 5621.000000000002 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5586.199999999999 | 5586.199999999999 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr781-single-writer-0001 (identical) · pr781-single-writer-0002 (identical) · pr781-single-writer-0003 (identical) · pr781-single-writer-0004 (identical) · pr781-single-writer-0005 (identical) · pr781-single-writer-0006 (identical) · pr781-single-writer-0007 (identical) · pr781-single-writer-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1713&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr781-2d641e38/ai_flow_live.html?bench=1713&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1713`); it opens the seed that parts earliest, and the dropdowns choose another.

