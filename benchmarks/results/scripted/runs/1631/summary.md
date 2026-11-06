# Benchmark run #1631 · 60 seeds from `fast768` (us-defend), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&fastRouteChecks=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- claude/project-thread-a3p046 @ 59a99f7 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42144829499) · build v29-dev

## Verdict

**INERT: all 55 pairs identical in every field**


## Paired comparison (off against on)

- **55** pairs (unpaired: off 0, on 0) · identical in every field: **55** · runtime errors off 0 / on 0 · wall time on/off x0.913 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 907 | 907 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 455 | 455 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 452 | 452 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 25815 | 25815 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 2260 | 2260 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 6573 | 6573 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 114181 | 114181 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 21 | 21 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 20 | 20 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 16 | 16 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 49 | 49 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 509 | 509 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 75 | 75 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1272 | 1272 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 178 | 178 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 490 | 490 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 12 | 12 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 538 | 538 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 825 | 825 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 493 | 493 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4725.500000000001 | 4725.500000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4264.899999999999 | 4264.899999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4137.8 | 4137.8 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5475.999999999998 | 5475.999999999998 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5227.899999999999 | 5227.899999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 4864.7 | 4864.7 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

fast768-0001 (identical) · fast768-0002 (identical) · fast768-0003 (identical) · fast768-0005 (identical) · fast768-0006 (identical) · fast768-0007 (identical) · fast768-0008 (identical) · fast768-0009 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1631&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1631`); it opens the seed that parts earliest, and the dropdowns choose another.

