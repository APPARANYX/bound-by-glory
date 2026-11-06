# Benchmark run #1649 · 60 seeds from `pace772` (us-defend), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerStallPace=0&controllerRefillGate=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/pace772-d881be0 @ d881be0 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42174435544) · build v29-dev

## Verdict

**QUIET: 51 of 51 pairs changed (median first part 200.025 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties +1.8% (p 0.7011)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **51** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x0.949 (gate 1.25)
- the 34 changed records first part at simulated second: min 141, p10 156, median 200.025, p90 255, max 281.1

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 825 | 840 | 0.2941 | 27 | 12 | 15 | 0.7011 |
| `usKills` | 423 | 417 | -0.1176 | 20 | 7 | 13 | 0.2632 |
| `geKills` | 402 | 423 | 0.4118 | 26 | 14 | 12 | 0.845 |
| `fire.total` | 22572 | 23066 | 9.6863 | 30 | 17 | 13 | 0.5847 |
| `fire.hits` | 1800 | 1829 | 0.5686 | 27 | 12 | 15 | 0.7011 |
| `retreatSamples` | 6368 | 6376 | 0.1569 | 27 | 14 | 13 | 1 |
| `movementResolver.changes` | 107851 | 108164 | 6.1373 | 33 | 19 | 14 | 0.4869 |
| `grenades.throws` | 20 | 23 | 0.0588 | 2 | 1 | 1 | 1 |
| `grenades.bursts` | 18 | 23 | 0.098 | 1 | 1 | 0 | 1 |
| `grenades.wounded` | 26 | 30 | 0.0784 | 1 | 1 | 0 | 1 |
| `grenades.casualties` | 8 | 6 | -0.0392 | 1 | 0 | 1 | 1 |
| `grenades.suppressed` | 53 | 74 | 0.4118 | 1 | 1 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 1 | 0.0196 | 1 | 1 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 5 | 4 | -0.0196 | 1 | 0 | 1 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 3 | 2 | -0.0196 | 1 | 0 | 1 | 1 |
| `loopAlerts.length` | 406 | 403 | -0.0588 | 25 | 10 | 15 | 0.4244 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 68 | 64 | -0.0784 | 12 | 5 | 7 | 0.7744 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1305 | 1267 | -0.7451 | 23 | 9 | 14 | 0.4049 |
| `recon.contacts` | 210 | 207 | -0.0588 | 19 | 12 | 7 | 0.3593 |
| `recon.noContact` | 459 | 458 | -0.0196 | 3 | 1 | 2 | 1 |
| `recon.timeouts` | 31 | 32 | 0.0196 | 1 | 1 | 0 | 1 |
| `recon.cancelled` | 554 | 521 | -0.6471 | 21 | 7 | 14 | 0.1892 |
| `recon.reportsDelivered` | 824 | 826 | 0.0392 | 22 | 13 | 9 | 0.5235 |
| `recon.retriggerBlocked` | 475 | 470 | -0.098 | 11 | 3 | 8 | 0.2266 |
| `squadPerformance.meanOverall` | 4379.3 | 4378.200000000001 | -0.0216 | 30 | 15 | 15 | 1 |
| `squadPerformance.p10Overall` | 3937.5999999999995 | 3949.1999999999994 | 0.2275 | 23 | 16 | 7 | 0.0931 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3895.0000000000005 | 3873.1999999999994 | -0.4275 | 26 | 10 | 16 | 0.3269 |
| `squadPerformance.meanMovement` | 5073.2 | 5073 | -0.0039 | 22 | 11 | 11 | 1 |
| `squadPerformance.meanControl` | 4854.599999999999 | 4863.599999999999 | 0.1765 | 27 | 15 | 12 | 0.7011 |
| `squadPerformance.meanCohesion` | 4417.699999999999 | 4412.7 | -0.098 | 26 | 12 | 14 | 0.845 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pace772-0018 141 s (timeline) · pace772-0046 144 s (timeline) · pace772-0026 153 s (stress) · pace772-0057 156 s (timeline) · pace772-0022 164.1 s (timeline) · pace772-0014 167.1 s (timeline) · pace772-0056 167.1 s (timeline) · pace772-0055 171 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1649&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pace772-d881be0/ai_flow_live.html?bench=1649&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1649`); it opens the seed that parts earliest, and the dropdowns choose another.

