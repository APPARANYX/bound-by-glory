# Benchmark run #1723 · 60 seeds from `controller-natural-20261026` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=new&fledReloadClear=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/pin/pr784-0586e42 @ 0586e42 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42381943231) · build v29-dev

## Verdict

**QUIET: 18 of 60 pairs changed (median first part 320.025 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties -0.9% (p 0.4531)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **42** · runtime errors off 0 / on 0 · wall time on/off x0.993 (gate 1.25)
- the 10 changed records first part at simulated second: min 183, p10 183, median 320.025, p90 583.05, max 583.05

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2773 | 2749 | -0.4 | 7 | 2 | 5 | 0.4531 |
| `usKills` | 1320 | 1330 | 0.1667 | 8 | 5 | 3 | 0.7266 |
| `geKills` | 1453 | 1419 | -0.5667 | 8 | 3 | 5 | 0.7266 |
| `fire.total` | 82297 | 82067 | -3.8333 | 9 | 3 | 6 | 0.5078 |
| `fire.hits` | 6465 | 6427 | -0.6333 | 8 | 2 | 6 | 0.2891 |
| `retreatSamples` | 174163 | 174907 | 12.4 | 9 | 7 | 2 | 0.1797 |
| `movementResolver.changes` | 287342 | 285973 | -22.8167 | 10 | 4 | 6 | 0.7539 |
| `grenades.throws` | 66 | 63 | -0.05 | 3 | 1 | 2 | 1 |
| `grenades.bursts` | 65 | 62 | -0.05 | 3 | 1 | 2 | 1 |
| `grenades.wounded` | 49 | 49 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 16 | 17 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.suppressed` | 137 | 126 | -0.1833 | 1 | 0 | 1 | 1 |
| `grenades.friendlyWounded` | 3 | 4 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 15 | 19 | 0.0667 | 3 | 3 | 0 | 0.25 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 21 | 21 | 0 | 2 | 1 | 1 | 1 |
| `loopAlerts.length` | 1858 | 1820 | -0.6333 | 10 | 3 | 7 | 0.3438 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 285 | 274 | -0.1833 | 6 | 2 | 4 | 0.6875 |
| `stallOutcomes.wakes` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2926 | 2928 | 0.0333 | 6 | 3 | 3 | 1 |
| `recon.contacts` | 551 | 569 | 0.3 | 5 | 4 | 1 | 0.375 |
| `recon.noContact` | 966 | 947 | -0.3167 | 6 | 1 | 5 | 0.2188 |
| `recon.timeouts` | 61 | 61 | 0 | 3 | 1 | 2 | 1 |
| `recon.cancelled` | 1275 | 1276 | 0.0167 | 7 | 4 | 3 | 1 |
| `recon.reportsDelivered` | 2123 | 2173 | 0.8333 | 6 | 4 | 2 | 0.6875 |
| `recon.retriggerBlocked` | 1124 | 1109 | -0.25 | 7 | 2 | 5 | 0.4531 |
| `squadPerformance.meanOverall` | 4824.000000000001 | 4820.100000000001 | -0.065 | 9 | 2 | 7 | 0.1797 |
| `squadPerformance.p10Overall` | 4460.699999999999 | 4455.9 | -0.08 | 5 | 1 | 4 | 0.375 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3670 | 3660.4000000000005 | -0.16 | 8 | 3 | 5 | 0.7266 |
| `squadPerformance.meanMovement` | 5988.9 | 5988.599999999999 | -0.005 | 2 | 1 | 1 | 1 |
| `squadPerformance.meanControl` | 5638.200000000001 | 5642.7 | 0.075 | 8 | 6 | 2 | 0.2891 |
| `squadPerformance.meanCohesion` | 5578.000000000001 | 5583.900000000001 | 0.0983 | 8 | 5 | 3 | 0.7266 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

controller-natural-20261026-0027 183 s (timeline) · controller-natural-20261026-0008 211.05 s (timeline) · controller-natural-20261026-0013 213 s (timeline) · controller-natural-20261026-0056 218.1 s (timeline) · controller-natural-20261026-0034 309 s (timeline) · controller-natural-20261026-0054 331.05 s (timeline) · controller-natural-20261026-0046 350.1 s (stress) · controller-natural-20261026-0048 448.05 s (stress)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1723&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr784-0586e42/ai_flow_live.html?bench=1723&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1723`); it opens the seed that parts earliest, and the dropdowns choose another.

