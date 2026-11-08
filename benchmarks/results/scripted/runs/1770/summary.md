# Benchmark run #1770 · 48 seeds from `pr787-m2-recon900-20261108` (us-defend), windows `0+900`

- **OFF** flags: `strategicInterception=0&controllerReconstitution=0&controllerRecovery=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr787-m2-83fb5a0 @ 83fb5a0 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42434594525) · build v29-dev

## Verdict

**INERT: all 48 pairs identical in every field**


## Paired comparison (off against on)

- **48** pairs (unpaired: off 0, on 0) · identical in every field: **48** · runtime errors off 0 / on 0 · wall time on/off x1.003 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 3083 | 3083 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 1463 | 1463 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1620 | 1620 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 89072 | 89072 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 7099 | 7099 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 295826 | 295826 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 315486 | 315486 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 87 | 87 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 87 | 87 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 74 | 74 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 16 | 16 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 166 | 166 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 21 | 21 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 23 | 23 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 2114 | 2114 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 426 | 426 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 3359 | 3359 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 726 | 726 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 1044 | 1044 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 57 | 57 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 1469 | 1469 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 2399 | 2399 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1242 | 1242 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 3781.2 | 3781.2 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 3552.4 | 3552.4 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 2802.7999999999997 | 2802.7999999999997 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 4790.1 | 4790.1 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 4461.599999999999 | 4461.599999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 4484.799999999999 | 4484.799999999999 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr787-m2-recon900-20261108-0001 (identical) · pr787-m2-recon900-20261108-0002 (identical) · pr787-m2-recon900-20261108-0003 (identical) · pr787-m2-recon900-20261108-0004 (identical) · pr787-m2-recon900-20261108-0005 (identical) · pr787-m2-recon900-20261108-0006 (identical) · pr787-m2-recon900-20261108-0007 (identical) · pr787-m2-recon900-20261108-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1770&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr787-m2-83fb5a0/ai_flow_live.html?bench=1770&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1770`); it opens the seed that parts earliest, and the dropdowns choose another.

