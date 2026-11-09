# Benchmark run #1812 · 48 seeds from `pr796-phase900-20261108` (meeting), windows `0+900`

- **OFF** flags: `strategicInterception=0&controllerPhaseBand=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr796-0cac14f @ 0cac14f · [run](https://github.com/APPARANYX/grasstex/actions/runs/42536439167) · build v29-dev

## Verdict

**QUIET: 9 of 48 pairs changed (median first part 623.55 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties +0.1% (p 1)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **48** pairs (unpaired: off 0, on 0) · identical in every field: **39** · runtime errors off 0 / on 0 · wall time on/off x0.991 (gate 1.25)
- the 4 changed records first part at simulated second: min 570, p10 570, median 623.55, p90 813, max 813

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 1905 | 1906 | 0.0208 | 1 | 1 | 0 | 1 |
| `usKills` | 854 | 855 | 0.0208 | 1 | 1 | 0 | 1 |
| `geKills` | 1051 | 1051 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 68985 | 68984 | -0.0208 | 1 | 0 | 1 | 1 |
| `fire.hits` | 4272 | 4272 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 146305 | 146305 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 348309 | 348300 | -0.1875 | 3 | 0 | 3 | 0.25 |
| `grenades.throws` | 63 | 63 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 63 | 63 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 43 | 43 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 19 | 19 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 94 | 94 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 13 | 13 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 70 | 70 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 2448 | 2448 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 470 | 470 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 14 | 14 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 6 | 6 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1469 | 1468 | -0.0208 | 1 | 0 | 1 | 1 |
| `recon.contacts` | 97 | 97 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 787 | 787 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 13 | 13 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 492 | 491 | -0.0208 | 1 | 0 | 1 | 1 |
| `recon.reportsDelivered` | 352 | 352 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1216 | 1215 | -0.0208 | 1 | 0 | 1 | 1 |
| `squadPerformance.meanOverall` | 3688.900000000001 | 3688.900000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 3534.7000000000003 | 3534.7000000000003 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 2657.1 | 2657.1 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 4777.199999999999 | 4777.199999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 4253.500000000001 | 4253.500000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 4332.3 | 4332.3 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 4 seeds that part earliest (simulated seconds)

pr796-phase900-20261108-0035 570 s (timeline) · pr796-phase900-20261108-0033 584.1 s (timeline) · pr796-phase900-20261108-0045 663 s (timeline) · pr796-phase900-20261108-0010 813 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1812&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr796-0cac14f/ai_flow_live.html?bench=1812&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1812`); it opens the seed that parts earliest, and the dropdowns choose another.

