# Benchmark run #1864 · 20 seeds from `scripted-seeds` (meeting), windows `contact+120`

- **OFF** flags: `none` · **ON** flags: `none`
- claude/project-thread-m7x8vq @ 482ccb9 · [run](https://github.com/APPARANYX/bound-by-glory/actions/runs/46098122366) · build v29-dev

## Verdict

**INERT: all 20 pairs identical in every field**


## Paired comparison (off against on)

- **20** pairs (unpaired: off 0, on 0) · identical in every field: **20** · runtime errors off 0 / on 0 · wall time on/off x0.995 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 129 | 129 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 81 | 81 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 48 | 48 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 6534 | 6534 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 308 | 308 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 1044 | 1044 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 15841 | 15841 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 23 | 23 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 13 | 13 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 146 | 146 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 31 | 31 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 247 | 247 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 31 | 31 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 49 | 49 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 45 | 45 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 84 | 84 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 137 | 137 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 101 | 101 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 1733.2999999999997 | 1733.2999999999997 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 1548.5000000000002 | 1548.5000000000002 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 1470.1 | 1470.1 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 1859.0000000000002 | 1859.0000000000002 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 1900.3999999999996 | 1900.3999999999996 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 1931.6 | 1931.6 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

scripted-seeds-0001 (identical) · scripted-seeds-0002 (identical) · scripted-seeds-0003 (identical) · scripted-seeds-0004 (identical) · scripted-seeds-0005 (identical) · scripted-seeds-0006 (identical) · scripted-seeds-0007 (identical) · scripted-seeds-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1864&repo=APPARANYX%2Fbound-by-glory&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1864`); it opens the seed that parts earliest, and the dropdowns choose another.

