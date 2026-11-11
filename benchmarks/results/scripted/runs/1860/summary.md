# Benchmark run #1860 · scripted scenario `scripted-scout-0003` (meeting), windows `contact+60,every60`

- **OFF** flags: `scanReject=0` · **ON** flags: `none`
- claude/zealous-heisenberg-fcl2x8 @ c4bedb5 · [run](https://github.com/APPARANYX/bound-by-glory/actions/runs/43051005292) · build v29-dev

## Verdict

**INERT: all 5 pairs identical in every field**


## Paired comparison (off against on)

- **5** pairs (unpaired: off 0, on 0) · identical in every field: **5** · runtime errors off 0 / on 0 · wall time on/off x0.915 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 38 | 38 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 10 | 10 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 28 | 28 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 972 | 972 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 30 | 30 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 827 | 827 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 7845 | 7845 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 12 | 12 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 11 | 11 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 92 | 92 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 11 | 11 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 13 | 13 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 12 | 12 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 49 | 49 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 32 | 32 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 40 | 40 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 424.9 | 424.9 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 377.20000000000005 | 377.20000000000005 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 331 | 331 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 478.8 | 478.8 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 492.7 | 492.7 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 459.79999999999995 | 459.79999999999995 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## Where the arms part (simulated seconds)

scripted-scout-0003 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1860&repo=APPARANYX%2Fbound-by-glory&pick=-end&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1860`); it opens the full-length record (`pick=-end`), and the dropdowns choose another.

