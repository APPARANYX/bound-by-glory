# Benchmark run #1629 · 60 seeds from `fast768` (ge-defend), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&fastRouteChecks=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- claude/project-thread-a3p046 @ 59a99f7 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42144145019) · build v29-dev

## Verdict

**INERT: all 55 pairs identical in every field**


## Paired comparison (off against on)

- **55** pairs (unpaired: off 0, on 0) · identical in every field: **55** · runtime errors off 0 / on 0 · wall time on/off x0.904 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 752 | 752 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 276 | 276 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 476 | 476 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 21104 | 21104 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 1703 | 1703 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 4903 | 4903 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 108930 | 108930 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 13 | 13 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 12 | 12 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 13 | 13 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 51 | 51 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 416 | 416 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 71 | 71 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 14 | 14 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 14 | 14 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1372 | 1372 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 218 | 218 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 377 | 377 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 19 | 19 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 693 | 693 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 999 | 999 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 493 | 493 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4767.7 | 4767.7 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4299.0999999999985 | 4299.0999999999985 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4244.6 | 4244.6 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5477.900000000001 | 5477.900000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5239.200000000002 | 5239.200000000002 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 4830.1 | 4830.1 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

fast768-0001 (identical) · fast768-0002 (identical) · fast768-0003 (identical) · fast768-0005 (identical) · fast768-0006 (identical) · fast768-0007 (identical) · fast768-0008 (identical) · fast768-0009 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1629&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1629`); it opens the seed that parts earliest, and the dropdowns choose another.

