# Benchmark run #1667 · 60 seeds from `pace772c` (meeting), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerStallPace=0&controllerRefillGate=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/pace772-935b4fa @ 935b4fa · [run](https://github.com/APPARANYX/grasstex/actions/runs/42259230736) · build v29-dev

## Verdict

**WEAK: 60 of 60 pairs changed (median first part 242.1 s); 1 of 42 counters under p 0.05 (about 2.1 by chance); casualties +0.1% (p 0.8776)**

- Under 0.05 only: recon.orders 1305 to 1276 (-2.2%, p 0.0161).

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x0.955 (gate 1.25)
- the 51 changed records first part at simulated second: min 174, p10 199.05, median 242.1, p90 272.1, max 290.1

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 1129 | 1130 | 0.0167 | 42 | 20 | 22 | 0.8776 |
| `usKills` | 428 | 436 | 0.1333 | 42 | 23 | 19 | 0.644 |
| `geKills` | 701 | 694 | -0.1167 | 41 | 18 | 23 | 0.5327 |
| `fire.total` | 30492 | 30546 | 0.9 | 48 | 23 | 25 | 0.8854 |
| `fire.hits` | 2445 | 2356 | -1.4833 | 46 | 21 | 25 | 0.6587 |
| `retreatSamples` | 6478 | 6546 | 1.1333 | 42 | 21 | 21 | 1 |
| `movementResolver.changes` | 211006 | 211509 | 8.3833 | 49 | 25 | 24 | 1 |
| `grenades.throws` | 21 | 15 | -0.1 | 5 | 1 | 4 | 0.375 |
| `grenades.bursts` | 20 | 15 | -0.0833 | 4 | 1 | 3 | 0.625 |
| `grenades.wounded` | 15 | 12 | -0.05 | 2 | 1 | 1 | 1 |
| `grenades.casualties` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 33 | 20 | -0.2167 | 2 | 0 | 2 | 0.5 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 4 | 4 | 0 | 4 | 2 | 2 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 7 | 5 | -0.0333 | 1 | 0 | 1 | 1 |
| `loopAlerts.length` | 782 | 785 | 0.05 | 23 | 11 | 12 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 36 | 45 | 0.15 | 21 | 14 | 7 | 0.1892 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1305 | 1276 | -0.4833 | 30 | 8 | 22 | 0.0161 |
| `recon.contacts` | 73 | 68 | -0.0833 | 10 | 3 | 7 | 0.3438 |
| `recon.noContact` | 685 | 683 | -0.0333 | 1 | 0 | 1 | 1 |
| `recon.timeouts` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 527 | 513 | -0.2333 | 25 | 10 | 15 | 0.4244 |
| `recon.reportsDelivered` | 398 | 377 | -0.35 | 15 | 6 | 9 | 0.6072 |
| `recon.retriggerBlocked` | 1066 | 1056 | -0.1667 | 21 | 7 | 14 | 0.1892 |
| `squadPerformance.meanOverall` | 5038.300000000001 | 5045.1 | 0.1133 | 46 | 26 | 20 | 0.4614 |
| `squadPerformance.p10Overall` | 4602.100000000001 | 4603.5 | 0.0233 | 36 | 16 | 20 | 0.6177 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4315.400000000001 | 4334.999999999998 | 0.3267 | 45 | 27 | 18 | 0.2327 |
| `squadPerformance.meanMovement` | 5904.9000000000015 | 5907.4000000000015 | 0.0417 | 43 | 20 | 23 | 0.7608 |
| `squadPerformance.meanControl` | 5511.700000000002 | 5497.600000000003 | -0.235 | 47 | 22 | 25 | 0.7709 |
| `squadPerformance.meanCohesion` | 5334.4 | 5344.899999999999 | 0.175 | 46 | 22 | 24 | 0.883 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pace772c-0023 174 s (timeline) · pace772c-0041 179.1 s (stress) · pace772c-0013 189 s (timeline) · pace772c-0012 197.1 s (timeline) · pace772c-0051 197.1 s (timeline) · pace772c-0001 199.05 s (timeline) · pace772c-0056 201 s (timeline) · pace772c-0018 204 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1667&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pace772-935b4fa/ai_flow_live.html?bench=1667&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1667`); it opens the seed that parts earliest, and the dropdowns choose another.

