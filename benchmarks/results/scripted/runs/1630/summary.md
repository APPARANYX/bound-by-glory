# Benchmark run #1630 · 60 seeds from `fast768` (meeting), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&fastRouteChecks=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- claude/project-thread-a3p046 @ 59a99f7 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42144224023) · build v29-dev

## Verdict

**INERT: all 60 pairs identical in every field**


## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **60** · runtime errors off 0 / on 0 · wall time on/off x0.896 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 1147 | 1147 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 495 | 495 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 652 | 652 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 29250 | 29250 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 2585 | 2585 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 6245 | 6245 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 206931 | 206931 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 8 | 8 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 8 | 8 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 7 | 7 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 11 | 11 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 776 | 776 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 40 | 40 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1252 | 1252 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 60 | 60 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 679 | 679 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 499 | 499 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 309 | 309 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1039 | 1039 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 5066.3 | 5066.3 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4634.100000000001 | 4634.100000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4373.000000000001 | 4373.000000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5926.499999999997 | 5926.499999999997 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5497.100000000002 | 5497.100000000002 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5382.299999999998 | 5382.299999999998 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

fast768-0001 (identical) · fast768-0002 (identical) · fast768-0003 (identical) · fast768-0004 (identical) · fast768-0005 (identical) · fast768-0006 (identical) · fast768-0007 (identical) · fast768-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1630&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1630`); it opens the seed that parts earliest, and the dropdowns choose another.

