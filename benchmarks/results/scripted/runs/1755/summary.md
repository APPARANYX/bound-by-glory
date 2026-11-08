# Benchmark run #1755 · 60 seeds from `pr787-m0m1-20261107` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0&controllerReconstitution=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr787-dd122c3 @ dd122c3 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42423285286) · build v29-dev

## Verdict

**INERT: all 60 pairs identical in every field**


## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **60** · runtime errors off 0 / on 0 · wall time on/off x0.997 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2596 | 2596 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 1139 | 1139 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1457 | 1457 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 69223 | 69223 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 5836 | 5836 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 132627 | 132627 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 310603 | 310603 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 63 | 63 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 61 | 61 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 54 | 54 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 20 | 20 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 119 | 119 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 17 | 17 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 59 | 59 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 2167 | 2167 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 319 | 319 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 6 | 6 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1860 | 1860 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 116 | 116 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 934 | 934 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 6 | 6 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 708 | 708 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 595 | 595 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1435 | 1435 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4685.599999999999 | 4685.599999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4466.599999999999 | 4466.599999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3427.8999999999996 | 3427.8999999999996 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5979.9 | 5979.9 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5391 | 5391 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5598.999999999999 | 5598.999999999999 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr787-m0m1-20261107-0001 (identical) · pr787-m0m1-20261107-0002 (identical) · pr787-m0m1-20261107-0003 (identical) · pr787-m0m1-20261107-0004 (identical) · pr787-m0m1-20261107-0005 (identical) · pr787-m0m1-20261107-0006 (identical) · pr787-m0m1-20261107-0007 (identical) · pr787-m0m1-20261107-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1755&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr787-dd122c3/ai_flow_live.html?bench=1755&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1755`); it opens the seed that parts earliest, and the dropdowns choose another.

