# Benchmark run #1698 · 60 seeds from `pr779-ambush-release` (meeting), windows `0+600`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerAmbushRelease=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/pr779-1e6f4bb @ 1e6f4bb · [run](https://github.com/APPARANYX/grasstex/actions/runs/42339147528) · build v29-dev

## Verdict

**QUIET: 5 of 60 pairs changed (median first part 378.07500000000005 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties +0.2% (p 1)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **55** · runtime errors off 0 / on 0 · wall time on/off x0.99 (gate 1.25)
- the 2 changed records first part at simulated second: min 320.1, p10 320.1, median 378.07500000000005, p90 436.05, max 436.05

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2525 | 2529 | 0.0667 | 1 | 1 | 0 | 1 |
| `usKills` | 1114 | 1124 | 0.1667 | 2 | 2 | 0 | 0.5 |
| `geKills` | 1411 | 1405 | -0.1 | 2 | 0 | 2 | 0.5 |
| `fire.total` | 69096 | 69371 | 4.5833 | 2 | 2 | 0 | 0.5 |
| `fire.hits` | 5700 | 5731 | 0.5167 | 2 | 2 | 0 | 0.5 |
| `retreatSamples` | 113410 | 113685 | 4.5833 | 2 | 1 | 1 | 1 |
| `movementResolver.changes` | 311984 | 312139 | 2.5833 | 2 | 2 | 0 | 0.5 |
| `grenades.throws` | 42 | 42 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 42 | 42 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 23 | 23 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 7 | 7 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 44 | 44 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 11 | 11 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 55 | 54 | -0.0167 | 1 | 0 | 1 | 1 |
| `loopAlerts.length` | 2456 | 2476 | 0.3333 | 2 | 2 | 0 | 0.5 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 354 | 363 | 0.15 | 1 | 1 | 0 | 1 |
| `stallOutcomes.wakes` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1947 | 1946 | -0.0167 | 1 | 0 | 1 | 1 |
| `recon.contacts` | 121 | 120 | -0.0167 | 1 | 0 | 1 | 1 |
| `recon.noContact` | 1007 | 1006 | -0.0167 | 1 | 0 | 1 | 1 |
| `recon.timeouts` | 9 | 9 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 724 | 726 | 0.0333 | 2 | 2 | 0 | 0.5 |
| `recon.reportsDelivered` | 643 | 643 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1523 | 1523 | 0 | 2 | 1 | 1 | 1 |
| `squadPerformance.meanOverall` | 4697.5 | 4696.6 | -0.015 | 2 | 0 | 2 | 0.5 |
| `squadPerformance.p10Overall` | 4462.999999999999 | 4462.999999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3504.099999999999 | 3501.5999999999985 | -0.0417 | 2 | 1 | 1 | 1 |
| `squadPerformance.meanMovement` | 5978 | 5978.200000000001 | 0.0033 | 1 | 1 | 0 | 1 |
| `squadPerformance.meanControl` | 5316.399999999999 | 5316.999999999998 | 0.01 | 2 | 1 | 1 | 1 |
| `squadPerformance.meanCohesion` | 5550.099999999999 | 5551.799999999999 | 0.0283 | 2 | 1 | 1 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 2 seeds that part earliest (simulated seconds)

pr779-ambush-release-0056 320.1 s (timeline) · pr779-ambush-release-0022 436.05 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1698&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr779-1e6f4bb/ai_flow_live.html?bench=1698&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1698`); it opens the seed that parts earliest, and the dropdowns choose another.

