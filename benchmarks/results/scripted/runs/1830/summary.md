# Benchmark run #1830 · 60 seeds from `pr797-micro-u-20261109` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&controllerReactions=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr797-5d7cc87 @ 5d7cc87 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42566567944) · build v29-dev

## Verdict

**WEAK: 60 of 60 pairs changed (median first part 248.55 s); 1 of 42 counters under p 0.05 (about 2.1 by chance); casualties +3.0% (p 0.1849)**

- Under 0.05 only: stallOutcomes.wakes 11 to 3 (-72.7%, p 0.0078).

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.039 (gate 1.25)
- the 60 changed records first part at simulated second: min 134.1, p10 195, median 248.55, p90 304.05, max 482.1

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2197 | 2263 | 1.1 | 57 | 34 | 23 | 0.1849 |
| `usKills` | 942 | 1006 | 1.0667 | 58 | 33 | 25 | 0.3581 |
| `geKills` | 1255 | 1257 | 0.0333 | 56 | 26 | 30 | 0.6889 |
| `fire.total` | 75140 | 74965 | -2.9167 | 60 | 29 | 31 | 0.8974 |
| `fire.hits` | 4984 | 5268 | 4.7333 | 58 | 35 | 23 | 0.148 |
| `retreatSamples` | 132404 | 134550 | 35.7667 | 60 | 31 | 29 | 0.8974 |
| `movementResolver.changes` | 317963 | 321142 | 52.9833 | 60 | 33 | 27 | 0.519 |
| `grenades.throws` | 62 | 62 | 0 | 26 | 14 | 12 | 0.845 |
| `grenades.bursts` | 62 | 62 | 0 | 26 | 14 | 12 | 0.845 |
| `grenades.wounded` | 40 | 44 | 0.0667 | 16 | 9 | 7 | 0.8036 |
| `grenades.casualties` | 21 | 20 | -0.0167 | 10 | 6 | 4 | 0.7539 |
| `grenades.suppressed` | 83 | 77 | -0.1 | 19 | 10 | 9 | 1 |
| `grenades.friendlyWounded` | 1 | 6 | 0.0833 | 2 | 2 | 0 | 0.5 |
| `grenades.friendlyCasualties` | 0 | 3 | 0.05 | 2 | 2 | 0 | 0.5 |
| `grenades.aborted` | 6 | 10 | 0.0667 | 9 | 6 | 3 | 0.5078 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 19 | 20 | 0.0167 | 19 | 9 | 10 | 1 |
| `loopAlerts.length` | 1854 | 1824 | -0.5 | 59 | 30 | 29 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 358 | 389 | 0.5167 | 51 | 30 | 21 | 0.2624 |
| `stallOutcomes.wakes` | 11 | 3 | -0.1333 | 8 | 0 | 8 | 0.0078 |
| `stallOutcomes.repeats` | 2 | 0 | -0.0333 | 2 | 0 | 2 | 0.5 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 3462 | 3531 | 1.15 | 59 | 30 | 29 | 1 |
| `recon.contacts` | 730 | 701 | -0.4833 | 58 | 22 | 36 | 0.0869 |
| `recon.noContact` | 857 | 889 | 0.5333 | 55 | 33 | 22 | 0.177 |
| `recon.timeouts` | 42 | 40 | -0.0333 | 21 | 11 | 10 | 1 |
| `recon.cancelled` | 1788 | 1822 | 0.5667 | 58 | 31 | 27 | 0.694 |
| `recon.reportsDelivered` | 2773 | 2593 | -3 | 58 | 24 | 34 | 0.237 |
| `recon.retriggerBlocked` | 1094 | 1152 | 0.9667 | 52 | 32 | 20 | 0.1263 |
| `squadPerformance.meanOverall` | 4822.100000000001 | 4824.6 | 0.0417 | 56 | 33 | 23 | 0.2288 |
| `squadPerformance.p10Overall` | 4468.299999999999 | 4460.799999999999 | -0.125 | 28 | 11 | 17 | 0.3449 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3691.2999999999997 | 3689.9 | -0.0233 | 59 | 29 | 30 | 1 |
| `squadPerformance.meanMovement` | 5987.499999999999 | 5987.199999999999 | -0.005 | 32 | 13 | 19 | 0.3771 |
| `squadPerformance.meanControl` | 5597.7 | 5601.2 | 0.0583 | 58 | 30 | 28 | 0.8957 |
| `squadPerformance.meanCohesion` | 5448.499999999998 | 5454.9000000000015 | 0.1067 | 58 | 32 | 26 | 0.5118 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr797-micro-u-20261109-0046 134.1 s (timeline) · pr797-micro-u-20261109-0011 145.05 s (timeline) · pr797-micro-u-20261109-0018 158.1 s (timeline) · pr797-micro-u-20261109-0031 176.1 s (timeline) · pr797-micro-u-20261109-0032 178.05 s (timeline) · pr797-micro-u-20261109-0047 195 s (timeline) · pr797-micro-u-20261109-0054 196.05 s (timeline) · pr797-micro-u-20261109-0055 199.05 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1830&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr797-5d7cc87/ai_flow_live.html?bench=1830&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1830`); it opens the seed that parts earliest, and the dropdowns choose another.

