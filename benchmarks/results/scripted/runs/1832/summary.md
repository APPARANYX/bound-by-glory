# Benchmark run #1832 · 60 seeds from `pr797-micro-u-20261109` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0&controllerReactions=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr797-5d7cc87 @ 5d7cc87 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42566603408) · build v29-dev

## Verdict

**QUIET: 60 of 60 pairs changed (median first part 283.05 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties -4.4% (p 0.0814)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x0.99 (gate 1.25)
- the 59 changed records first part at simulated second: min 215.1, p10 232.05, median 283.05, p90 352.05, max 479.1

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2262 | 2162 | -1.6667 | 56 | 21 | 35 | 0.0814 |
| `usKills` | 977 | 989 | 0.2 | 54 | 26 | 28 | 0.8919 |
| `geKills` | 1285 | 1173 | -1.8667 | 53 | 21 | 32 | 0.169 |
| `fire.total` | 73315 | 75181 | 31.1 | 58 | 35 | 23 | 0.148 |
| `fire.hits` | 5103 | 5088 | -0.25 | 58 | 26 | 32 | 0.5118 |
| `retreatSamples` | 94186 | 99139 | 82.55 | 58 | 32 | 26 | 0.5118 |
| `movementResolver.changes` | 397842 | 397006 | -13.9333 | 58 | 34 | 24 | 0.237 |
| `grenades.throws` | 51 | 62 | 0.1833 | 24 | 13 | 11 | 0.8388 |
| `grenades.bursts` | 51 | 62 | 0.1833 | 24 | 13 | 11 | 0.8388 |
| `grenades.wounded` | 30 | 41 | 0.1833 | 11 | 8 | 3 | 0.2266 |
| `grenades.casualties` | 10 | 15 | 0.0833 | 8 | 6 | 2 | 0.2891 |
| `grenades.suppressed` | 72 | 89 | 0.2833 | 13 | 10 | 3 | 0.0923 |
| `grenades.friendlyWounded` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.aborted` | 20 | 13 | -0.1167 | 15 | 5 | 10 | 0.3018 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 35 | 40 | 0.0833 | 31 | 16 | 15 | 1 |
| `loopAlerts.length` | 2805 | 2769 | -0.6 | 57 | 29 | 28 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 416 | 430 | 0.2333 | 55 | 31 | 24 | 0.4188 |
| `stallOutcomes.wakes` | 5 | 5 | 0 | 6 | 3 | 3 | 1 |
| `stallOutcomes.repeats` | 1 | 1 | 0 | 2 | 1 | 1 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1573 | 1641 | 1.1333 | 56 | 34 | 22 | 0.1409 |
| `recon.contacts` | 110 | 129 | 0.3167 | 39 | 24 | 15 | 0.1996 |
| `recon.noContact` | 866 | 879 | 0.2167 | 47 | 25 | 22 | 0.7709 |
| `recon.timeouts` | 7 | 10 | 0.05 | 9 | 6 | 3 | 0.5078 |
| `recon.cancelled` | 543 | 555 | 0.2 | 45 | 24 | 21 | 0.766 |
| `recon.reportsDelivered` | 514 | 525 | 0.1833 | 49 | 24 | 25 | 1 |
| `recon.retriggerBlocked` | 1336 | 1370 | 0.5667 | 46 | 25 | 21 | 0.6587 |
| `squadPerformance.meanOverall` | 4659.999999999999 | 4652.2 | -0.13 | 54 | 24 | 30 | 0.4966 |
| `squadPerformance.p10Overall` | 4457.900000000001 | 4452.999999999999 | -0.0817 | 35 | 17 | 18 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3493.2000000000003 | 3442.7 | -0.8417 | 56 | 24 | 32 | 0.3497 |
| `squadPerformance.meanMovement` | 5976.099999999999 | 5975.499999999999 | -0.01 | 38 | 15 | 23 | 0.2559 |
| `squadPerformance.meanControl` | 5259.399999999998 | 5289.4000000000015 | 0.5 | 58 | 33 | 25 | 0.3581 |
| `squadPerformance.meanCohesion` | 5323.599999999999 | 5352.6 | 0.4833 | 55 | 30 | 25 | 0.5901 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr797-micro-u-20261109-0037 215.1 s (timeline) · pr797-micro-u-20261109-0015 218.1 s (timeline) · pr797-micro-u-20261109-0013 221.1 s (timeline) · pr797-micro-u-20261109-0017 221.1 s (timeline) · pr797-micro-u-20261109-0043 227.1 s (timeline) · pr797-micro-u-20261109-0036 232.05 s (timeline) · pr797-micro-u-20261109-0059 234 s (timeline) · pr797-micro-u-20261109-0018 237 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1832&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr797-5d7cc87/ai_flow_live.html?bench=1832&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1832`); it opens the seed that parts earliest, and the dropdowns choose another.

