# Benchmark run #1726 · 60 seeds from `controller-natural-20261026` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr785-main-f9dc044 @ f9dc044 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42382803970) · build v29-dev

## Verdict

**INERT: all 60 pairs identical in every field**


## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **60** · runtime errors off 0 / on 0 · wall time on/off x0.981 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2695 | 2695 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 1300 | 1300 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1395 | 1395 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 39764 | 39764 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 6063 | 6063 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 103776 | 103776 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 210010 | 210010 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 11 | 11 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 11 | 11 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 6 | 6 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 10 | 10 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 278 | 278 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 721 | 721 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 227 | 227 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1742 | 1742 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 87 | 87 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 1106 | 1106 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 16 | 16 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 463 | 463 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 433 | 433 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1333 | 1333 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4806.700000000001 | 4806.700000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4470.2 | 4470.2 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3780.8 | 3780.8 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5984.800000000001 | 5984.800000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5616 | 5616 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5425.999999999998 | 5425.999999999998 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 (identical) · controller-natural-20261026-0002 (identical) · controller-natural-20261026-0003 (identical) · controller-natural-20261026-0004 (identical) · controller-natural-20261026-0005 (identical) · controller-natural-20261026-0006 (identical) · controller-natural-20261026-0007 (identical) · controller-natural-20261026-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1726&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr785-main-f9dc044/ai_flow_live.html?bench=1726&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1726`); it opens the seed that parts earliest, and the dropdowns choose another.

