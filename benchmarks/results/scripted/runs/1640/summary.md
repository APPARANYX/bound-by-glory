# Benchmark run #1640 · 60 seeds from `cover770b` (ge-defend), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerCoverCache=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/cover770-787b22f3 @ 787b22f · [run](https://github.com/APPARANYX/grasstex/actions/runs/42155333476) · build v29-dev

## Verdict

**INERT: all 54 pairs identical in every field**


## Paired comparison (off against on)

- **54** pairs (unpaired: off 0, on 0) · identical in every field: **54** · runtime errors off 0 / on 0 · wall time on/off x0.967 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 847 | 847 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 299 | 299 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 548 | 548 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 20663 | 20663 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 1799 | 1799 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 5528 | 5528 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 108091 | 108091 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 27 | 27 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 26 | 26 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 40 | 40 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 15 | 15 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 87 | 87 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 7 | 7 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 467 | 467 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 91 | 91 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1408 | 1408 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 203 | 203 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 398 | 398 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 33 | 33 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 720 | 720 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 966 | 966 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 493 | 493 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4652.799999999998 | 4652.799999999998 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4194.099999999999 | 4194.099999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4189.9 | 4189.9 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5375.400000000001 | 5375.400000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5116.5999999999985 | 5116.5999999999985 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 4634.6 | 4634.6 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

cover770b-0001 (identical) · cover770b-0003 (identical) · cover770b-0004 (identical) · cover770b-0006 (identical) · cover770b-0007 (identical) · cover770b-0008 (identical) · cover770b-0009 (identical) · cover770b-0010 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1640&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-cover770-787b22f3/ai_flow_live.html?bench=1640&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1640`); it opens the seed that parts earliest, and the dropdowns choose another.

