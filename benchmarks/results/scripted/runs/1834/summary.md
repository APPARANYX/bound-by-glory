# Benchmark run #1834 · 60 seeds from `pr797-micro-u-20261109` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&controllerStance=0&controllerSoldierFire=0&controllerReactions=0&controllerDrill=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr797-5d7cc87 @ 5d7cc87 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42566639094) · build v29-dev

## Verdict

**WEAK: 60 of 60 pairs changed (median first part 248.55 s); 1 of 42 counters under p 0.05 (about 2.1 by chance); casualties +3.0% (p 0.1112)**

- Under 0.05 only: stallOutcomes.wakes 11 to 3 (-72.7%, p 0.0078).

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.16 (gate 1.25)
- the 60 changed records first part at simulated second: min 134.1, p10 195, median 248.55, p90 304.05, max 482.1

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2197 | 2263 | 1.1 | 57 | 35 | 22 | 0.1112 |
| `usKills` | 942 | 1006 | 1.0667 | 58 | 33 | 25 | 0.3581 |
| `geKills` | 1255 | 1257 | 0.0333 | 56 | 26 | 30 | 0.6889 |
| `fire.total` | 75174 | 74965 | -3.4833 | 60 | 28 | 32 | 0.6989 |
| `fire.hits` | 5002 | 5268 | 4.4333 | 58 | 35 | 23 | 0.148 |
| `retreatSamples` | 132354 | 134550 | 36.6 | 60 | 31 | 29 | 0.8974 |
| `movementResolver.changes` | 317958 | 321142 | 53.0667 | 60 | 33 | 27 | 0.519 |
| `grenades.throws` | 62 | 62 | 0 | 26 | 14 | 12 | 0.845 |
| `grenades.bursts` | 62 | 62 | 0 | 26 | 14 | 12 | 0.845 |
| `grenades.wounded` | 40 | 44 | 0.0667 | 16 | 9 | 7 | 0.8036 |
| `grenades.casualties` | 21 | 20 | -0.0167 | 10 | 6 | 4 | 0.7539 |
| `grenades.suppressed` | 84 | 77 | -0.1167 | 19 | 10 | 9 | 1 |
| `grenades.friendlyWounded` | 1 | 6 | 0.0833 | 2 | 2 | 0 | 0.5 |
| `grenades.friendlyCasualties` | 0 | 3 | 0.05 | 2 | 2 | 0 | 0.5 |
| `grenades.aborted` | 7 | 10 | 0.05 | 8 | 5 | 3 | 0.7266 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 20 | 20 | 0 | 20 | 9 | 11 | 0.8238 |
| `loopAlerts.length` | 1836 | 1824 | -0.2 | 59 | 31 | 28 | 0.7948 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 354 | 389 | 0.5833 | 52 | 31 | 21 | 0.2116 |
| `stallOutcomes.wakes` | 11 | 3 | -0.1333 | 8 | 0 | 8 | 0.0078 |
| `stallOutcomes.repeats` | 2 | 0 | -0.0333 | 2 | 0 | 2 | 0.5 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 3449 | 3531 | 1.3667 | 60 | 32 | 28 | 0.6989 |
| `recon.contacts` | 727 | 701 | -0.4333 | 58 | 22 | 36 | 0.0869 |
| `recon.noContact` | 856 | 889 | 0.55 | 55 | 33 | 22 | 0.177 |
| `recon.timeouts` | 42 | 40 | -0.0333 | 21 | 11 | 10 | 1 |
| `recon.cancelled` | 1778 | 1822 | 0.7333 | 58 | 32 | 26 | 0.5118 |
| `recon.reportsDelivered` | 2736 | 2593 | -2.3833 | 58 | 24 | 34 | 0.237 |
| `recon.retriggerBlocked` | 1091 | 1152 | 1.0167 | 52 | 32 | 20 | 0.1263 |
| `squadPerformance.meanOverall` | 4823.4000000000015 | 4824.6 | 0.02 | 56 | 32 | 24 | 0.3497 |
| `squadPerformance.p10Overall` | 4470.5 | 4460.799999999999 | -0.1617 | 29 | 11 | 18 | 0.2649 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3692.1 | 3689.9 | -0.0367 | 59 | 30 | 29 | 1 |
| `squadPerformance.meanMovement` | 5987.999999999999 | 5987.199999999999 | -0.0133 | 32 | 12 | 20 | 0.2153 |
| `squadPerformance.meanControl` | 5602.8 | 5601.2 | -0.0267 | 58 | 29 | 29 | 1 |
| `squadPerformance.meanCohesion` | 5450.899999999999 | 5454.9000000000015 | 0.0667 | 58 | 31 | 27 | 0.694 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr797-micro-u-20261109-0046 134.1 s (timeline) · pr797-micro-u-20261109-0011 145.05 s (timeline) · pr797-micro-u-20261109-0018 158.1 s (timeline) · pr797-micro-u-20261109-0031 176.1 s (timeline) · pr797-micro-u-20261109-0032 178.05 s (timeline) · pr797-micro-u-20261109-0047 195 s (timeline) · pr797-micro-u-20261109-0054 196.05 s (timeline) · pr797-micro-u-20261109-0055 199.05 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1834&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr797-5d7cc87/ai_flow_live.html?bench=1834&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1834`); it opens the seed that parts earliest, and the dropdowns choose another.

