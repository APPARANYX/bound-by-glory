# Benchmark run #1625 · 60 seeds from `pk767` (meeting), windows `contact+120`

- **OFF** flags: `strategicInterception=0&tacticalController=new&pendingKeyRead=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- claude/project-thread-dtjh5a @ c4d4c19 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42142638914) · build v29-dev

## Verdict

**INERT: all 60 pairs identical in every field**


## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **60** · runtime errors off 0 / on 0 · wall time on/off x0.877 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 1173 | 1173 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 483 | 483 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 690 | 690 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 28502 | 28502 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 2471 | 2471 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 6391 | 6391 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 208449 | 208449 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 22 | 22 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 20 | 20 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 24 | 24 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 8 | 8 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 45 | 45 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 6 | 6 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 10 | 10 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 719 | 719 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 35 | 35 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1329 | 1329 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 74 | 74 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 722 | 722 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 517 | 517 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 426 | 426 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1112 | 1112 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 5065.999999999998 | 5065.999999999998 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4639.000000000001 | 4639.000000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4353.9 | 4353.9 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5918.000000000001 | 5918.000000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5536.3 | 5536.3 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5350.699999999999 | 5350.699999999999 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pk767-0001 (identical) · pk767-0002 (identical) · pk767-0003 (identical) · pk767-0004 (identical) · pk767-0005 (identical) · pk767-0006 (identical) · pk767-0007 (identical) · pk767-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1625&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1625`); it opens the seed that parts earliest, and the dropdowns choose another.

