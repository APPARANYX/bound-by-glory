# Benchmark run #1861 · scripted scenario `scripted-scout-0003` (us-defend), windows `contact+60,every60`

- **OFF** flags: `scanReject=0` · **ON** flags: `none`
- claude/zealous-heisenberg-fcl2x8 @ c4bedb5 · [run](https://github.com/APPARANYX/bound-by-glory/actions/runs/43051293810) · build v29-dev

## Verdict

**INERT: all 7 pairs identical in every field**


## Paired comparison (off against on)

- **7** pairs (unpaired: off 0, on 0) · identical in every field: **7** · runtime errors off 0 / on 0 · wall time on/off x0.903 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 41 | 41 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 41 | 41 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 663 | 663 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 21 | 21 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 648 | 648 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 5007 | 5007 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 10 | 10 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 14 | 14 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 11 | 11 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 57 | 57 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 33 | 33 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 171 | 171 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 152 | 152 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 8 | 8 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 32 | 32 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 26 | 26 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 60 | 60 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 35 | 35 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 75 | 75 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 631.1999999999999 | 631.1999999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 564.2 | 564.2 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 559.6 | 559.6 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 669.9 | 669.9 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 695.6 | 695.6 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 657.3 | 657.3 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## Where the arms part (simulated seconds)

scripted-scout-0003 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1861&repo=APPARANYX%2Fbound-by-glory&pick=-end&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1861`); it opens the full-length record (`pick=-end`), and the dropdowns choose another.

