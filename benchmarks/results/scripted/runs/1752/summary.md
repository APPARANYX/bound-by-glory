# Benchmark run #1752 · 48 seeds from `pr787-recon900-20261107` (meeting), windows `0+900`

- **OFF** flags: `strategicInterception=0&controllerReconstitution=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr787-dd122c3 @ dd122c3 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42423226671) · build v29-dev

## Verdict

**INERT: all 48 pairs identical in every field**


## Paired comparison (off against on)

- **48** pairs (unpaired: off 0, on 0) · identical in every field: **48** · runtime errors off 0 / on 0 · wall time on/off x1 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2197 | 2197 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 886 | 886 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1311 | 1311 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 58058 | 58058 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 4868 | 4868 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 129800 | 129800 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 260215 | 260215 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 37 | 37 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 37 | 37 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 24 | 24 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 11 | 11 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 52 | 52 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 7 | 7 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 56 | 56 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 1918 | 1918 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 298 | 298 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1710 | 1710 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 102 | 102 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 859 | 859 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 660 | 660 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 475 | 475 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1308 | 1308 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 3738 | 3738 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 3565.2999999999997 | 3565.2999999999997 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 2760.0000000000005 | 2760.0000000000005 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 4783.700000000001 | 4783.700000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 4256.4 | 4256.4 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 4469.6 | 4469.6 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr787-recon900-20261107-0001 (identical) · pr787-recon900-20261107-0002 (identical) · pr787-recon900-20261107-0003 (identical) · pr787-recon900-20261107-0004 (identical) · pr787-recon900-20261107-0005 (identical) · pr787-recon900-20261107-0006 (identical) · pr787-recon900-20261107-0007 (identical) · pr787-recon900-20261107-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1752&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr787-dd122c3/ai_flow_live.html?bench=1752&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1752`); it opens the seed that parts earliest, and the dropdowns choose another.

