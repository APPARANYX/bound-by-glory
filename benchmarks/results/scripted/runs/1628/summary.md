# Benchmark run #1628 · 30 seeds from `pk767-legacy` (meeting), windows `contact+120`

- **OFF** flags: `strategicInterception=0&pendingKeyRead=0` · **ON** flags: `strategicInterception=0`
- claude/project-thread-dtjh5a @ c4d4c19 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42142651890) · build v29-dev

## Verdict

**INERT: all 30 pairs identical in every field**


## Paired comparison (off against on)

- **30** pairs (unpaired: off 0, on 0) · identical in every field: **30** · runtime errors off 0 / on 0 · wall time on/off x0.942 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 582 | 582 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 253 | 253 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 329 | 329 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 7540 | 7540 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 1346 | 1346 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 2566 | 2566 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 62518 | 62518 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 14 | 14 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 93 | 93 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 49 | 49 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 13 | 13 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 13 | 13 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 611 | 611 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 36 | 36 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 426 | 426 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 144 | 144 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 210 | 210 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 491 | 491 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 2567.9000000000005 | 2567.9000000000005 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 2344.4999999999995 | 2344.4999999999995 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 2242.3000000000006 | 2242.3000000000006 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 2953.4999999999995 | 2953.4999999999995 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 2905.2000000000003 | 2905.2000000000003 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 2629.7 | 2629.7 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pk767-legacy-0001 (identical) · pk767-legacy-0002 (identical) · pk767-legacy-0003 (identical) · pk767-legacy-0004 (identical) · pk767-legacy-0005 (identical) · pk767-legacy-0006 (identical) · pk767-legacy-0007 (identical) · pk767-legacy-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1628&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1628`); it opens the seed that parts earliest, and the dropdowns choose another.

