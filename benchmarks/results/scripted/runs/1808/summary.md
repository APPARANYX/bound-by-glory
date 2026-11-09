# Benchmark run #1808 · 60 seeds from `pr796-s1a-20261108` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0&controllerPhaseBand=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr796-0cac14f @ 0cac14f · [run](https://github.com/APPARANYX/grasstex/actions/runs/42536376858) · build v29-dev

## Verdict

**QUIET: 11 of 60 pairs changed (median first part 533.025 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties +0.0% (p 1)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **49** · runtime errors off 0 / on 0 · wall time on/off x1.014 (gate 1.25)
- the 4 changed records first part at simulated second: min 353.1, p10 353.1, median 533.025, p90 599.1, max 599.1

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2147 | 2147 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 901 | 901 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1246 | 1246 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 69920 | 69920 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 4809 | 4809 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 100007 | 100007 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 394904 | 394900 | -0.0667 | 3 | 0 | 3 | 0.25 |
| `grenades.throws` | 59 | 59 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 59 | 59 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 39 | 39 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 14 | 14 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 100 | 100 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 13 | 13 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 44 | 44 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 2556 | 2556 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 458 | 458 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 13 | 13 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 6 | 6 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1566 | 1566 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 105 | 105 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 846 | 846 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 9 | 9 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 557 | 557 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 413 | 413 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1319 | 1319 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4665.399999999999 | 4665.399999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4454.800000000001 | 4454.700000000001 | -0.0017 | 1 | 0 | 1 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3452.2999999999997 | 3452.2999999999997 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5975.300000000001 | 5975.300000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5314.9 | 5314.9 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5366.699999999999 | 5366.699999999999 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 4 seeds that part earliest (simulated seconds)

pr796-s1a-20261108-0052 353.1 s (timeline) · pr796-s1a-20261108-0046 525 s (timeline) · pr796-s1a-20261108-0040 541.05 s (timeline) · pr796-s1a-20261108-0011 599.1 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1808&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr796-0cac14f/ai_flow_live.html?bench=1808&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1808`); it opens the seed that parts earliest, and the dropdowns choose another.

