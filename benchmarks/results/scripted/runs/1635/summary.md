# Benchmark run #1635 · 60 seeds from `cover770` (ge-defend), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerCoverCache=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- claude/project-thread-kg44fx @ b279c60 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42149144252) · build v29-dev

## Verdict

**INCOMPLETE: all 50 paired records identical, but 3 records unpaired (off 3, on 0)**

- Unpaired records: off 3, on 0 (a seed or checkpoint only one arm reached: the flag changed how long the battle lasted, or a shard failed).

## Paired comparison (off against on)

- **50** pairs (unpaired: off 3, on 0) · identical in every field: **50** · runtime errors off 0 / on 0 · wall time on/off x0.925 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 711 | 711 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 260 | 260 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 451 | 451 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 19540 | 19540 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 1555 | 1555 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 4805 | 4805 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 94783 | 94783 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 6 | 6 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 6 | 6 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 6 | 6 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 12 | 12 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 390 | 390 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 71 | 71 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1169 | 1169 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 174 | 174 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 353 | 353 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 18 | 18 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 580 | 580 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 900 | 900 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 459 | 459 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4349.4000000000015 | 4349.4000000000015 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 3952.7999999999997 | 3952.7999999999997 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3922.300000000001 | 3922.300000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 4978.5 | 4978.5 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 4760.400000000001 | 4760.400000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 4341.7 | 4341.7 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

cover770-0004 (identical) · cover770-0006 (identical) · cover770-0007 (identical) · cover770-0008 (identical) · cover770-0009 (identical) · cover770-0010 (identical) · cover770-0011 (identical) · cover770-0012 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1635&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1635`); it opens the seed that parts earliest, and the dropdowns choose another.

