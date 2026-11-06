# Benchmark run #1659 · 60 seeds from `pace772b` (ge-defend), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerStallPace=0&controllerRefillGate=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/pace772-cf0334b @ cf0334b · [run](https://github.com/APPARANYX/grasstex/actions/runs/42183444618) · build v29-dev

## Verdict

**WEAK: 53 of 53 pairs changed (median first part 194.1 s); 1 of 42 counters under p 0.05 (about 2.1 by chance); casualties +0.2% (p 0.8318)**

- Under 0.05 only: usKills 320 to 293 (-8.4%, p 0.0352).

## Paired comparison (off against on)

- **53** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x0.946 (gate 1.25)
- the 33 changed records first part at simulated second: min 100.05, p10 141, median 194.1, p90 236.1, max 250.05

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 865 | 867 | 0.0377 | 22 | 10 | 12 | 0.8318 |
| `usKills` | 320 | 293 | -0.5094 | 15 | 3 | 12 | 0.0352 |
| `geKills` | 545 | 574 | 0.5472 | 19 | 12 | 7 | 0.3593 |
| `fire.total` | 22273 | 22343 | 1.3208 | 25 | 14 | 11 | 0.69 |
| `fire.hits` | 2038 | 1975 | -1.1887 | 23 | 11 | 12 | 1 |
| `retreatSamples` | 5651 | 5655 | 0.0755 | 22 | 12 | 10 | 0.8318 |
| `movementResolver.changes` | 107341 | 107012 | -6.2075 | 28 | 13 | 15 | 0.8506 |
| `grenades.throws` | 5 | 4 | -0.0189 | 3 | 1 | 2 | 1 |
| `grenades.bursts` | 5 | 4 | -0.0189 | 3 | 1 | 2 | 1 |
| `grenades.wounded` | 1 | 3 | 0.0377 | 1 | 1 | 0 | 1 |
| `grenades.casualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 2 | 5 | 0.0566 | 1 | 1 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 5 | 5 | 0 | 2 | 1 | 1 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 503 | 482 | -0.3962 | 24 | 10 | 14 | 0.5413 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 70 | 71 | 0.0189 | 9 | 4 | 5 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1273 | 1271 | -0.0377 | 18 | 8 | 10 | 0.8145 |
| `recon.contacts` | 182 | 185 | 0.0566 | 19 | 11 | 8 | 0.6476 |
| `recon.noContact` | 343 | 342 | -0.0189 | 1 | 0 | 1 | 1 |
| `recon.timeouts` | 27 | 25 | -0.0377 | 2 | 0 | 2 | 0.5 |
| `recon.cancelled` | 655 | 658 | 0.0566 | 16 | 8 | 8 | 1 |
| `recon.reportsDelivered` | 746 | 761 | 0.283 | 15 | 7 | 8 | 1 |
| `recon.retriggerBlocked` | 485 | 489 | 0.0755 | 12 | 7 | 5 | 0.7744 |
| `squadPerformance.meanOverall` | 4578.299999999999 | 4577.800000000001 | -0.0094 | 25 | 14 | 11 | 0.69 |
| `squadPerformance.p10Overall` | 4129.3 | 4128.3 | -0.0189 | 21 | 12 | 9 | 0.6636 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4099.299999999999 | 4082.6999999999994 | -0.3132 | 21 | 10 | 11 | 1 |
| `squadPerformance.meanMovement` | 5272.6 | 5271.599999999999 | -0.0189 | 19 | 12 | 7 | 0.3593 |
| `squadPerformance.meanControl` | 5001 | 5023.1 | 0.417 | 22 | 16 | 6 | 0.0525 |
| `squadPerformance.meanCohesion` | 4630.7 | 4638.5999999999985 | 0.1491 | 24 | 9 | 15 | 0.3075 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pace772b-0031 100.05 s (timeline) · pace772b-0040 113.1 s (timeline) · pace772b-0022 136.05 s (timeline) · pace772b-0023 141 s (timeline) · pace772b-0015 143.1 s (timeline) · pace772b-0032 152.1 s (timeline) · pace772b-0027 154.05 s (timeline) · pace772b-0024 155.1 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1659&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pace772-cf0334b/ai_flow_live.html?bench=1659&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1659`); it opens the seed that parts earliest, and the dropdowns choose another.

