# Benchmark run #1729 · 60 seeds from `controller-natural-20261026` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr785-main-f9dc044 @ f9dc044 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42382913295) · build v29-dev

## Verdict

**INERT: all 60 pairs identical in every field**


## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **60** · runtime errors off 0 / on 0 · wall time on/off x0.993 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 3002 | 3002 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 1453 | 1453 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1549 | 1549 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 47266 | 47266 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 6665 | 6665 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 143837 | 143837 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 212846 | 212846 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 38 | 38 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 38 | 38 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 17 | 17 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 9 | 9 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 49 | 49 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 127 | 127 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 1123 | 1123 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 266 | 266 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1887 | 1887 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 266 | 266 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 975 | 975 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 61 | 61 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 524 | 524 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 1082 | 1082 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1003 | 1003 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4894.200000000002 | 4894.200000000002 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4471.099999999999 | 4471.099999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3916.2000000000003 | 3916.2000000000003 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5989.5999999999985 | 5989.5999999999985 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5723.200000000001 | 5723.200000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5432.299999999999 | 5432.299999999999 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 (identical) · controller-natural-20261026-0002 (identical) · controller-natural-20261026-0003 (identical) · controller-natural-20261026-0004 (identical) · controller-natural-20261026-0005 (identical) · controller-natural-20261026-0006 (identical) · controller-natural-20261026-0007 (identical) · controller-natural-20261026-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1729&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr785-main-f9dc044/ai_flow_live.html?bench=1729&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1729`); it opens the seed that parts earliest, and the dropdowns choose another.

