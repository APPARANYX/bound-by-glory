# Benchmark run #1833 · 60 seeds from `pr797-micro-u-20261109` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&controllerSoldierFire=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr797-5d7cc87 @ 5d7cc87 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42566620687) · build v29-dev

## Verdict

**QUIET: 3 of 60 pairs changed (median first part 394.5 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties +0.2% (p 1)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **57** · runtime errors off 0 / on 0 · wall time on/off x0.992 (gate 1.25)
- the 2 changed records first part at simulated second: min 330, p10 330, median 394.5, p90 459, max 459

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2258 | 2263 | 0.0833 | 2 | 1 | 1 | 1 |
| `usKills` | 1003 | 1006 | 0.05 | 2 | 1 | 1 | 1 |
| `geKills` | 1255 | 1257 | 0.0333 | 2 | 2 | 0 | 0.5 |
| `fire.total` | 75070 | 74965 | -1.75 | 2 | 1 | 1 | 1 |
| `fire.hits` | 5274 | 5268 | -0.1 | 2 | 1 | 1 | 1 |
| `retreatSamples` | 134879 | 134550 | -5.4833 | 2 | 1 | 1 | 1 |
| `movementResolver.changes` | 321037 | 321142 | 1.75 | 2 | 1 | 1 | 1 |
| `grenades.throws` | 62 | 62 | 0 | 2 | 1 | 1 | 1 |
| `grenades.bursts` | 62 | 62 | 0 | 2 | 1 | 1 | 1 |
| `grenades.wounded` | 44 | 44 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 20 | 20 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 77 | 77 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 6 | 6 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 10 | 10 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 18 | 20 | 0.0333 | 1 | 1 | 0 | 1 |
| `loopAlerts.length` | 1815 | 1824 | 0.15 | 2 | 2 | 0 | 0.5 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 386 | 389 | 0.05 | 2 | 2 | 0 | 0.5 |
| `stallOutcomes.wakes` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 3532 | 3531 | -0.0167 | 2 | 1 | 1 | 1 |
| `recon.contacts` | 707 | 701 | -0.1 | 2 | 0 | 2 | 0.5 |
| `recon.noContact` | 885 | 889 | 0.0667 | 2 | 1 | 1 | 1 |
| `recon.timeouts` | 40 | 40 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 1825 | 1822 | -0.05 | 2 | 0 | 2 | 0.5 |
| `recon.reportsDelivered` | 2596 | 2593 | -0.05 | 2 | 1 | 1 | 1 |
| `recon.retriggerBlocked` | 1148 | 1152 | 0.0667 | 1 | 1 | 0 | 1 |
| `squadPerformance.meanOverall` | 4824.200000000001 | 4824.6 | 0.0067 | 2 | 1 | 1 | 1 |
| `squadPerformance.p10Overall` | 4462.9 | 4460.799999999999 | -0.035 | 1 | 0 | 1 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3687.2000000000003 | 3689.9 | 0.045 | 2 | 1 | 1 | 1 |
| `squadPerformance.meanMovement` | 5987 | 5987.199999999999 | 0.0033 | 2 | 2 | 0 | 0.5 |
| `squadPerformance.meanControl` | 5603.9 | 5601.2 | -0.045 | 2 | 0 | 2 | 0.5 |
| `squadPerformance.meanCohesion` | 5455.100000000001 | 5454.9000000000015 | -0.0033 | 2 | 1 | 1 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 2 seeds that part earliest (simulated seconds)

pr797-micro-u-20261109-0024 330 s (timeline) · pr797-micro-u-20261109-0011 459 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1833&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr797-5d7cc87/ai_flow_live.html?bench=1833&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1833`); it opens the seed that parts earliest, and the dropdowns choose another.

