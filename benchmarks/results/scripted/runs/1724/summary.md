# Benchmark run #1724 · 60 seeds from `controller-natural-20261026` (ge-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=new&fledReloadClear=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/pin/pr784-0586e42 @ 0586e42 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42381953577) · build v29-dev

## Verdict

**QUIET: 11 of 60 pairs changed (median first part 321 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties -0.2% (p 0.625)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **49** · runtime errors off 0 / on 0 · wall time on/off x0.984 (gate 1.25)
- the 7 changed records first part at simulated second: min 199.05, p10 199.05, median 321, p90 561.15, max 561.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2851 | 2846 | -0.0833 | 4 | 3 | 1 | 0.625 |
| `usKills` | 1109 | 1106 | -0.05 | 2 | 1 | 1 | 1 |
| `geKills` | 1742 | 1740 | -0.0333 | 4 | 2 | 2 | 1 |
| `fire.total` | 76430 | 75857 | -9.55 | 5 | 0 | 5 | 0.0625 |
| `fire.hits` | 6444 | 6415 | -0.4833 | 5 | 1 | 4 | 0.375 |
| `retreatSamples` | 139540 | 139635 | 1.5833 | 4 | 2 | 2 | 1 |
| `movementResolver.changes` | 287631 | 288121 | 8.1667 | 6 | 4 | 2 | 0.6875 |
| `grenades.throws` | 70 | 70 | 0 | 2 | 1 | 1 | 1 |
| `grenades.bursts` | 70 | 69 | -0.0167 | 1 | 0 | 1 | 1 |
| `grenades.wounded` | 43 | 42 | -0.0167 | 1 | 0 | 1 | 1 |
| `grenades.casualties` | 13 | 13 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 113 | 113 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 14 | 14 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 12 | 13 | 0.0167 | 1 | 1 | 0 | 1 |
| `loopAlerts.length` | 1585 | 1572 | -0.2167 | 4 | 1 | 3 | 0.625 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 242 | 243 | 0.0167 | 4 | 1 | 3 | 0.625 |
| `stallOutcomes.wakes` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 3262 | 3280 | 0.3 | 4 | 3 | 1 | 0.625 |
| `recon.contacts` | 696 | 691 | -0.0833 | 4 | 1 | 3 | 0.625 |
| `recon.noContact` | 894 | 901 | 0.1167 | 4 | 3 | 1 | 0.625 |
| `recon.timeouts` | 37 | 37 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 1590 | 1605 | 0.25 | 4 | 3 | 1 | 0.625 |
| `recon.reportsDelivered` | 2698 | 2693 | -0.0833 | 4 | 2 | 2 | 1 |
| `recon.retriggerBlocked` | 1106 | 1108 | 0.0333 | 4 | 3 | 1 | 0.625 |
| `squadPerformance.meanOverall` | 4853.699999999998 | 4853.899999999998 | 0.0033 | 4 | 2 | 2 | 1 |
| `squadPerformance.p10Overall` | 4475.2 | 4471.9 | -0.055 | 2 | 0 | 2 | 0.5 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3783.9 | 3784.2 | 0.005 | 4 | 1 | 3 | 0.625 |
| `squadPerformance.meanMovement` | 5989.7 | 5989.599999999999 | -0.0017 | 2 | 1 | 1 | 1 |
| `squadPerformance.meanControl` | 5592.700000000002 | 5592.600000000001 | -0.0017 | 4 | 2 | 2 | 1 |
| `squadPerformance.meanCohesion` | 5546.999999999998 | 5548.999999999997 | 0.0333 | 5 | 4 | 1 | 0.375 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 7 seeds that part earliest (simulated seconds)

controller-natural-20261026-0040 199.05 s (timeline) · controller-natural-20261026-0059 258 s (timeline) · controller-natural-20261026-0037 264 s (timeline) · controller-natural-20261026-0033 321 s (timeline) · controller-natural-20261026-0060 350.1 s (timeline) · controller-natural-20261026-0045 432 s (timeline) · controller-natural-20261026-0009 561.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1724&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr784-0586e42/ai_flow_live.html?bench=1724&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1724`); it opens the seed that parts earliest, and the dropdowns choose another.

