# Benchmark run #1639 · 60 seeds from `cover770b` (us-defend), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerCoverCache=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/cover770-787b22f3 @ 787b22f · [run](https://github.com/APPARANYX/grasstex/actions/runs/42155326346) · build v29-dev

## Verdict

**INERT: all 54 pairs identical in every field**


## Paired comparison (off against on)

- **54** pairs (unpaired: off 0, on 0) · identical in every field: **54** · runtime errors off 0 / on 0 · wall time on/off x0.953 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 870 | 870 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 431 | 431 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 439 | 439 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 25691 | 25691 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 1949 | 1949 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 6826 | 6826 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 110062 | 110062 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 10 | 10 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 10 | 10 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 7 | 7 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 19 | 19 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 501 | 501 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 73 | 73 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1203 | 1203 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 193 | 193 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 446 | 446 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 25 | 25 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 491 | 491 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 635 | 635 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 454 | 454 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4617.9 | 4617.9 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4136.699999999999 | 4136.699999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4041.5999999999995 | 4041.5999999999995 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5375.4 | 5375.4 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5119.299999999999 | 5119.299999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 4764.499999999998 | 4764.499999999998 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

cover770b-0001 (identical) · cover770b-0003 (identical) · cover770b-0004 (identical) · cover770b-0006 (identical) · cover770b-0007 (identical) · cover770b-0008 (identical) · cover770b-0009 (identical) · cover770b-0010 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1639&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-cover770-787b22f3/ai_flow_live.html?bench=1639&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1639`); it opens the seed that parts earliest, and the dropdowns choose another.

