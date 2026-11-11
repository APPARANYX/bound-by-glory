# Benchmark run #1848 · 4 seeds from `mac-pool-control-20261110` (meeting), windows `0+600`

- **OFF** flags: `none` · **ON** flags: `none`
- main @ 24a84de · [run](https://github.com/APPARANYX/bound-by-glory/actions/runs/42927962242) · build v29-dev

## Verdict

**INERT: all 4 pairs identical in every field**


## Paired comparison (off against on)

- **4** pairs (unpaired: off 0, on 0) · identical in every field: **4** · runtime errors off 0 / on 0 · wall time on/off x0.983 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 62 | 62 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 16 | 16 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 46 | 46 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 2818 | 2818 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 136 | 136 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 2607 | 2607 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 9768 | 9768 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 6 | 6 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 8 | 8 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 83 | 83 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 14 | 14 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 76 | 76 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 7 | 7 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 19 | 19 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 17 | 17 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 24 | 24 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 30 | 30 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 39 | 39 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 333.5 | 333.5 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 296.4 | 296.4 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 269.6 | 269.6 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 389.59999999999997 | 389.59999999999997 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 364.9 | 364.9 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 383.20000000000005 | 383.20000000000005 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 4 seeds that part earliest (simulated seconds)

mac-pool-control-20261110-0001 (identical) · mac-pool-control-20261110-0002 (identical) · mac-pool-control-20261110-0003 (identical) · mac-pool-control-20261110-0004 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1848&repo=APPARANYX%2Fbound-by-glory&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1848`); it opens the seed that parts earliest, and the dropdowns choose another.

