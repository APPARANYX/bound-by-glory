# Benchmark run #1669 · 60 seeds from `pace772c` (ge-defend), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerStallPace=0&controllerRefillGate=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/pace772-935b4fa @ 935b4fa · [run](https://github.com/APPARANYX/grasstex/actions/runs/42259246785) · build v29-dev

## Verdict

**QUIET: 52 of 52 pairs changed (median first part 187.05 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties +0.3% (p 1)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **52** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x0.953 (gate 1.25)
- the 27 changed records first part at simulated second: min 132, p10 145.05, median 187.05, p90 255, max 258

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 770 | 772 | 0.0385 | 17 | 9 | 8 | 1 |
| `usKills` | 304 | 295 | -0.1731 | 14 | 5 | 9 | 0.424 |
| `geKills` | 466 | 477 | 0.2115 | 17 | 11 | 6 | 0.3323 |
| `fire.total` | 21078 | 20674 | -7.7692 | 23 | 8 | 15 | 0.21 |
| `fire.hits` | 1651 | 1661 | 0.1923 | 18 | 7 | 11 | 0.4807 |
| `retreatSamples` | 4752 | 4798 | 0.8846 | 21 | 11 | 10 | 1 |
| `movementResolver.changes` | 104035 | 103787 | -4.7692 | 23 | 12 | 11 | 1 |
| `grenades.throws` | 24 | 23 | -0.0192 | 1 | 0 | 1 | 1 |
| `grenades.bursts` | 22 | 20 | -0.0385 | 1 | 0 | 1 | 1 |
| `grenades.wounded` | 26 | 28 | 0.0385 | 1 | 1 | 0 | 1 |
| `grenades.casualties` | 6 | 7 | 0.0192 | 1 | 1 | 0 | 1 |
| `grenades.suppressed` | 64 | 68 | 0.0769 | 1 | 1 | 0 | 1 |
| `grenades.friendlyWounded` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 3 | 4 | 0.0192 | 1 | 1 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 2 | 1 | -0.0192 | 1 | 0 | 1 | 1 |
| `loopAlerts.length` | 389 | 360 | -0.5577 | 18 | 8 | 10 | 0.8145 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 68 | 71 | 0.0577 | 3 | 2 | 1 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1287 | 1271 | -0.3077 | 15 | 5 | 10 | 0.3018 |
| `recon.contacts` | 186 | 187 | 0.0192 | 10 | 6 | 4 | 0.7539 |
| `recon.noContact` | 372 | 371 | -0.0192 | 3 | 1 | 2 | 1 |
| `recon.timeouts` | 16 | 15 | -0.0192 | 1 | 0 | 1 | 1 |
| `recon.cancelled` | 662 | 647 | -0.2885 | 16 | 7 | 9 | 0.8036 |
| `recon.reportsDelivered` | 963 | 937 | -0.5 | 13 | 4 | 9 | 0.2668 |
| `recon.retriggerBlocked` | 485 | 483 | -0.0385 | 11 | 6 | 5 | 1 |
| `squadPerformance.meanOverall` | 4524.4000000000015 | 4527.700000000002 | 0.0635 | 21 | 9 | 12 | 0.6636 |
| `squadPerformance.p10Overall` | 4082.4999999999995 | 4074.2 | -0.1596 | 19 | 7 | 12 | 0.3593 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4066.7000000000003 | 4065.6 | -0.0212 | 19 | 8 | 11 | 0.6476 |
| `squadPerformance.meanMovement` | 5171.6 | 5172.2 | 0.0115 | 14 | 8 | 6 | 0.7905 |
| `squadPerformance.meanControl` | 4954.1 | 4971.8 | 0.3404 | 21 | 12 | 9 | 0.6636 |
| `squadPerformance.meanCohesion` | 4567.6 | 4581.3 | 0.2635 | 21 | 12 | 9 | 0.6636 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pace772c-0043 132 s (timeline) · pace772c-0059 138 s (timeline) · pace772c-0001 145.05 s (timeline) · pace772c-0015 151.05 s (timeline) · pace772c-0038 157.05 s (timeline) · pace772c-0029 161.1 s (timeline) · pace772c-0054 165 s (timeline) · pace772c-0040 168 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1669&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pace772-935b4fa/ai_flow_live.html?bench=1669&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1669`); it opens the seed that parts earliest, and the dropdowns choose another.

