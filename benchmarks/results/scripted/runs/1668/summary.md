# Benchmark run #1668 · 60 seeds from `pace772c` (us-defend), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerStallPace=0&controllerRefillGate=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/pace772-935b4fa @ 935b4fa · [run](https://github.com/APPARANYX/grasstex/actions/runs/42259236085) · build v29-dev

## Verdict

**QUIET: 52 of 52 pairs changed (median first part 201 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties +1.2% (p 0.4049)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **52** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x0.954 (gate 1.25)
- the 34 changed records first part at simulated second: min 136.05, p10 150, median 201, p90 251.1, max 327

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 809 | 819 | 0.1923 | 23 | 14 | 9 | 0.4049 |
| `usKills` | 420 | 430 | 0.1923 | 22 | 13 | 9 | 0.5235 |
| `geKills` | 389 | 389 | 0 | 20 | 10 | 10 | 1 |
| `fire.total` | 24478 | 24581 | 1.9808 | 25 | 14 | 11 | 0.69 |
| `fire.hits` | 1951 | 1889 | -1.1923 | 23 | 9 | 14 | 0.4049 |
| `retreatSamples` | 6018 | 6085 | 1.2885 | 21 | 11 | 10 | 1 |
| `movementResolver.changes` | 108315 | 108520 | 3.9423 | 30 | 14 | 16 | 0.8555 |
| `grenades.throws` | 27 | 25 | -0.0385 | 4 | 1 | 3 | 0.625 |
| `grenades.bursts` | 25 | 24 | -0.0192 | 4 | 1 | 3 | 0.625 |
| `grenades.wounded` | 18 | 20 | 0.0385 | 3 | 2 | 1 | 1 |
| `grenades.casualties` | 7 | 8 | 0.0192 | 1 | 1 | 0 | 1 |
| `grenades.suppressed` | 62 | 65 | 0.0577 | 2 | 2 | 0 | 0.5 |
| `grenades.friendlyWounded` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 1 | 2 | 0.0192 | 1 | 1 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 0 | 1 | 0.0192 | 1 | 1 | 0 | 1 |
| `loopAlerts.length` | 495 | 477 | -0.3462 | 20 | 6 | 14 | 0.1153 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 81 | 82 | 0.0192 | 9 | 4 | 5 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1255 | 1253 | -0.0385 | 18 | 10 | 8 | 0.8145 |
| `recon.contacts` | 187 | 182 | -0.0962 | 16 | 9 | 7 | 0.8036 |
| `recon.noContact` | 443 | 446 | 0.0577 | 3 | 2 | 1 | 1 |
| `recon.timeouts` | 17 | 17 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 563 | 571 | 0.1538 | 21 | 12 | 9 | 0.6636 |
| `recon.reportsDelivered` | 779 | 741 | -0.7308 | 19 | 8 | 11 | 0.6476 |
| `recon.retriggerBlocked` | 481 | 481 | 0 | 10 | 4 | 6 | 0.7539 |
| `squadPerformance.meanOverall` | 4462.900000000001 | 4465 | 0.0404 | 25 | 15 | 10 | 0.4244 |
| `squadPerformance.p10Overall` | 4030.9 | 4026.399999999999 | -0.0865 | 20 | 8 | 12 | 0.5034 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3978.7999999999997 | 3972.1 | -0.1288 | 23 | 12 | 11 | 1 |
| `squadPerformance.meanMovement` | 5173.499999999999 | 5173.999999999999 | 0.0096 | 17 | 7 | 10 | 0.6291 |
| `squadPerformance.meanControl` | 4905.600000000001 | 4922.600000000001 | 0.3269 | 23 | 15 | 8 | 0.21 |
| `squadPerformance.meanCohesion` | 4508.1 | 4515.599999999999 | 0.1442 | 24 | 13 | 11 | 0.8388 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pace772c-0019 136.05 s (timeline) · pace772c-0057 142.05 s (timeline) · pace772c-0023 148.05 s (timeline) · pace772c-0029 150 s (timeline) · pace772c-0036 153 s (timeline) · pace772c-0058 153 s (timeline) · pace772c-0053 154.05 s (timeline) · pace772c-0038 174 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1668&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pace772-935b4fa/ai_flow_live.html?bench=1668&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1668`); it opens the seed that parts earliest, and the dropdowns choose another.

