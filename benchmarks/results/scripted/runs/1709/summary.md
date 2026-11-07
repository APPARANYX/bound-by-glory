# Benchmark run #1709 · 60 seeds from `pr781-single-writer` (ge-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=new&controllerSingleWriter=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/pin/pr781-2d641e38 @ 2d641e3 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42341704635) · build v29-dev

## Verdict

**INERT: all 60 pairs identical in every field**


## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **60** · runtime errors off 0 / on 0 · wall time on/off x1.003 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2331 | 2331 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 1005 | 1005 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1326 | 1326 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 63666 | 63666 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 5221 | 5221 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 137362 | 137362 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 216980 | 216980 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 89 | 89 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 89 | 89 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 52 | 52 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 21 | 21 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 145 | 145 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 11 | 11 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 20 | 20 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 1372 | 1372 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 248 | 248 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2987 | 2987 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 669 | 669 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 658 | 658 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 46 | 46 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 1542 | 1542 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 2890 | 2890 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 836 | 836 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4831.4 | 4831.4 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4490.799999999999 | 4490.799999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3721.1000000000013 | 3721.1000000000013 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5991.199999999998 | 5991.199999999998 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5621 | 5621 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5558.999999999998 | 5558.999999999998 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr781-single-writer-0001 (identical) · pr781-single-writer-0002 (identical) · pr781-single-writer-0003 (identical) · pr781-single-writer-0004 (identical) · pr781-single-writer-0005 (identical) · pr781-single-writer-0006 (identical) · pr781-single-writer-0007 (identical) · pr781-single-writer-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1709&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr781-2d641e38/ai_flow_live.html?bench=1709&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1709`); it opens the seed that parts earliest, and the dropdowns choose another.

