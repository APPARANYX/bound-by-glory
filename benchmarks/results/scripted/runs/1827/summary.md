# Benchmark run #1827 · 60 seeds from `pr797-micro-u-20261109` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&controllerDrill=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr797-5d7cc87 @ 5d7cc87 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42566511390) · build v29-dev

## Verdict

**INERT: all 60 pairs identical in every field**


## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **60** · runtime errors off 0 / on 0 · wall time on/off x1.07 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2263 | 2263 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 1006 | 1006 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1257 | 1257 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 74965 | 74965 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 5268 | 5268 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 134550 | 134550 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 321142 | 321142 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 62 | 62 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 62 | 62 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 44 | 44 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 20 | 20 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 77 | 77 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 6 | 6 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 10 | 10 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 20 | 20 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 1824 | 1824 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 389 | 389 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 3531 | 3531 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 701 | 701 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 889 | 889 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 40 | 40 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 1822 | 1822 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 2593 | 2593 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1152 | 1152 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4824.6 | 4824.6 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4460.799999999999 | 4460.799999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3689.9 | 3689.9 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5987.199999999999 | 5987.199999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5601.2 | 5601.2 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5454.9000000000015 | 5454.9000000000015 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr797-micro-u-20261109-0001 (identical) · pr797-micro-u-20261109-0002 (identical) · pr797-micro-u-20261109-0003 (identical) · pr797-micro-u-20261109-0004 (identical) · pr797-micro-u-20261109-0005 (identical) · pr797-micro-u-20261109-0006 (identical) · pr797-micro-u-20261109-0007 (identical) · pr797-micro-u-20261109-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1827&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr797-5d7cc87/ai_flow_live.html?bench=1827&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1827`); it opens the seed that parts earliest, and the dropdowns choose another.

