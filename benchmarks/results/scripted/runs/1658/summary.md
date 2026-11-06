# Benchmark run #1658 · 60 seeds from `pace772b` (us-defend), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerStallPace=0&controllerRefillGate=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/pace772-cf0334b @ cf0334b · [run](https://github.com/APPARANYX/grasstex/actions/runs/42183430900) · build v29-dev

## Verdict

**QUIET: 53 of 53 pairs changed (median first part 188.55 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties +0.6% (p 0.8318)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **53** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x0.973 (gate 1.25)
- the 30 changed records first part at simulated second: min 126, p10 142.05, median 188.55, p90 215.1, max 240

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 776 | 781 | 0.0943 | 22 | 10 | 12 | 0.8318 |
| `usKills` | 373 | 387 | 0.2642 | 23 | 13 | 10 | 0.6776 |
| `geKills` | 403 | 394 | -0.1698 | 20 | 6 | 14 | 0.1153 |
| `fire.total` | 23728 | 23827 | 1.8679 | 27 | 17 | 10 | 0.2478 |
| `fire.hits` | 1759 | 1824 | 1.2264 | 26 | 18 | 8 | 0.0755 |
| `retreatSamples` | 4913 | 5064 | 2.8491 | 25 | 9 | 16 | 0.2295 |
| `movementResolver.changes` | 109889 | 109618 | -5.1132 | 30 | 14 | 16 | 0.8555 |
| `grenades.throws` | 10 | 6 | -0.0755 | 3 | 1 | 2 | 1 |
| `grenades.bursts` | 10 | 6 | -0.0755 | 3 | 1 | 2 | 1 |
| `grenades.wounded` | 7 | 4 | -0.0566 | 1 | 0 | 1 | 1 |
| `grenades.casualties` | 2 | 1 | -0.0189 | 1 | 0 | 1 | 1 |
| `grenades.suppressed` | 15 | 5 | -0.1887 | 2 | 1 | 1 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 3 | 1 | -0.0377 | 1 | 0 | 1 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 522 | 509 | -0.2453 | 28 | 12 | 16 | 0.5716 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 61 | 64 | 0.0566 | 10 | 6 | 4 | 0.7539 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1202 | 1194 | -0.1509 | 19 | 8 | 11 | 0.6476 |
| `recon.contacts` | 176 | 174 | -0.0377 | 19 | 9 | 10 | 1 |
| `recon.noContact` | 463 | 462 | -0.0189 | 6 | 2 | 4 | 0.6875 |
| `recon.timeouts` | 19 | 20 | 0.0189 | 1 | 1 | 0 | 1 |
| `recon.cancelled` | 488 | 490 | 0.0377 | 18 | 9 | 9 | 1 |
| `recon.reportsDelivered` | 732 | 739 | 0.1321 | 21 | 10 | 11 | 1 |
| `recon.retriggerBlocked` | 483 | 484 | 0.0189 | 8 | 5 | 3 | 0.7266 |
| `squadPerformance.meanOverall` | 4586.3 | 4584.999999999999 | -0.0245 | 27 | 14 | 13 | 1 |
| `squadPerformance.p10Overall` | 4146.900000000001 | 4159.8 | 0.2434 | 22 | 15 | 7 | 0.1338 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4101.200000000001 | 4078.400000000001 | -0.4302 | 25 | 10 | 15 | 0.4244 |
| `squadPerformance.meanMovement` | 5275.299999999998 | 5275.099999999999 | -0.0038 | 20 | 9 | 11 | 0.8238 |
| `squadPerformance.meanControl` | 4989.5999999999985 | 4994.799999999999 | 0.0981 | 28 | 16 | 12 | 0.5716 |
| `squadPerformance.meanCohesion` | 4677.699999999998 | 4677.499999999999 | -0.0038 | 26 | 12 | 14 | 0.845 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pace772b-0041 126 s (stress) · pace772b-0043 136.05 s (timeline) · pace772b-0012 142.05 s (timeline) · pace772b-0029 148.05 s (timeline) · pace772b-0011 149.1 s (timeline) · pace772b-0060 154.05 s (timeline) · pace772b-0058 161.1 s (timeline) · pace772b-0030 162 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1658&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pace772-cf0334b/ai_flow_live.html?bench=1658&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1658`); it opens the seed that parts earliest, and the dropdowns choose another.

