# Benchmark run #1638 · 60 seeds from `cover770b` (meeting), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerCoverCache=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/cover770-787b22f3 @ 787b22f · [run](https://github.com/APPARANYX/grasstex/actions/runs/42155296393) · build v29-dev

## Verdict

**INERT: all 60 pairs identical in every field**


## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **60** · runtime errors off 0 / on 0 · wall time on/off x0.927 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 1119 | 1119 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 505 | 505 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 614 | 614 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 32029 | 32029 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 2547 | 2547 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 6752 | 6752 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 206388 | 206388 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 21 | 21 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 18 | 18 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 28 | 28 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 65 | 65 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 17 | 17 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 786 | 786 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 40 | 40 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1276 | 1276 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 64 | 64 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 690 | 690 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 6 | 6 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 508 | 508 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 424 | 424 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1068 | 1068 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 5031.6 | 5031.6 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4591.1 | 4591.1 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4287.700000000003 | 4287.700000000003 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5915.300000000002 | 5915.300000000002 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5514.200000000003 | 5514.200000000003 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5361.400000000001 | 5361.400000000001 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

cover770b-0001 (identical) · cover770b-0002 (identical) · cover770b-0003 (identical) · cover770b-0004 (identical) · cover770b-0005 (identical) · cover770b-0006 (identical) · cover770b-0007 (identical) · cover770b-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1638&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-cover770-787b22f3/ai_flow_live.html?bench=1638&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1638`); it opens the seed that parts earliest, and the dropdowns choose another.

