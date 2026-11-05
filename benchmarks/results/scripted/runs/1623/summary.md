# Benchmark run #1623 · 30 seeds from `churn765-legacy` (meeting), windows `contact+120`

- **OFF** flags: `strategicInterception=0&orderChurnSameMen=0` · **ON** flags: `strategicInterception=0`
- claude/project-thread-dtjh5a @ b97909d · [run](https://github.com/APPARANYX/grasstex/actions/runs/42030935637) · build v29-dev

## Verdict

**QUIET: 12 of 30 pairs changed; 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties +0.0% (p 1)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **30** pairs (unpaired: off 0, on 0) · identical in every field: **18** · runtime errors off 0 / on 0 · wall time on/off x0.987 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 581 | 581 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 259 | 259 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 322 | 322 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 7444 | 7444 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 1274 | 1274 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 3128 | 3128 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 62132 | 62132 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 9 | 9 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 75 | 71 | -0.1333 | 4 | 0 | 4 | 0.125 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 42 | 42 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 576 | 576 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 27 | 27 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 417 | 417 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 125 | 125 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 145 | 145 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 475 | 475 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 2579.3 | 2579.8 | 0.0167 | 4 | 4 | 0 | 0.125 |
| `squadPerformance.p10Overall` | 2361.2999999999997 | 2361.2999999999997 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 2252.1 | 2252.1 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 2971.6999999999994 | 2971.6999999999994 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 2921.2000000000003 | 2923.9000000000005 | 0.09 | 4 | 4 | 0 | 0.125 |
| `squadPerformance.meanCohesion` | 2674.6000000000004 | 2674.6000000000004 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

churn765-legacy-0001 (identical) · churn765-legacy-0002 (identical) · churn765-legacy-0003 (identical) · churn765-legacy-0004 (identical) · churn765-legacy-0005 (identical) · churn765-legacy-0006 (identical) · churn765-legacy-0007 (identical) · churn765-legacy-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1623&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1623`); it opens the seed that parts earliest, and the dropdowns choose another.

