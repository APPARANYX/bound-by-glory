# Benchmark run #1686 · 60 seeds from `pr777-contact-stable` (us-defend), windows `0+600`

- **OFF** flags: `tacticalController=new&strategicInterception=0&contactActionStable=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/pr777-bdcac65f @ bdcac65 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42328529734) · build v29-dev

## Verdict

**QUIET: 56 of 60 pairs changed (median first part 199.05 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties -0.0% (p 0.6271)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **4** · runtime errors off 0 / on 0 · wall time on/off x1 (gate 1.25)
- the 51 changed records first part at simulated second: min 108, p10 142.05, median 199.05, p90 250.05, max 341.1

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2022 | 2021 | -0.0167 | 38 | 17 | 21 | 0.6271 |
| `usKills` | 989 | 989 | 0 | 33 | 19 | 14 | 0.4869 |
| `geKills` | 1033 | 1032 | -0.0167 | 32 | 17 | 15 | 0.8601 |
| `fire.total` | 61286 | 59833 | -24.2167 | 39 | 15 | 24 | 0.1996 |
| `fire.hits` | 4529 | 4572 | 0.7167 | 36 | 19 | 17 | 0.8679 |
| `retreatSamples` | 133211 | 135343 | 35.5333 | 38 | 24 | 14 | 0.1433 |
| `movementResolver.changes` | 197927 | 196495 | -23.8667 | 44 | 16 | 28 | 0.0961 |
| `grenades.throws` | 56 | 59 | 0.05 | 11 | 6 | 5 | 1 |
| `grenades.bursts` | 55 | 59 | 0.0667 | 10 | 6 | 4 | 0.7539 |
| `grenades.wounded` | 62 | 68 | 0.1 | 6 | 3 | 3 | 1 |
| `grenades.casualties` | 21 | 26 | 0.0833 | 5 | 4 | 1 | 0.375 |
| `grenades.suppressed` | 143 | 133 | -0.1667 | 8 | 4 | 4 | 1 |
| `grenades.friendlyWounded` | 0 | 3 | 0.05 | 1 | 1 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 2 | 0.0333 | 1 | 1 | 0 | 1 |
| `grenades.aborted` | 16 | 13 | -0.05 | 4 | 1 | 3 | 0.625 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 17 | 17 | 0 | 10 | 6 | 4 | 0.7539 |
| `loopAlerts.length` | 1266 | 1248 | -0.3 | 38 | 18 | 20 | 0.8714 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 216 | 249 | 0.55 | 22 | 16 | 6 | 0.0525 |
| `stallOutcomes.wakes` | 5 | 5 | 0 | 2 | 1 | 1 | 1 |
| `stallOutcomes.repeats` | 2 | 1 | -0.0167 | 1 | 0 | 1 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2538 | 2586 | 0.8 | 36 | 22 | 14 | 0.243 |
| `recon.contacts` | 571 | 587 | 0.2667 | 36 | 21 | 15 | 0.405 |
| `recon.noContact` | 706 | 707 | 0.0167 | 24 | 12 | 12 | 1 |
| `recon.timeouts` | 36 | 45 | 0.15 | 10 | 7 | 3 | 0.3438 |
| `recon.cancelled` | 1131 | 1148 | 0.2833 | 31 | 18 | 13 | 0.4731 |
| `recon.reportsDelivered` | 2303 | 2286 | -0.2833 | 37 | 15 | 22 | 0.324 |
| `recon.retriggerBlocked` | 761 | 768 | 0.1167 | 26 | 14 | 12 | 0.845 |
| `squadPerformance.meanOverall` | 4929.7 | 4930.299999999999 | 0.01 | 34 | 16 | 18 | 0.8642 |
| `squadPerformance.p10Overall` | 4630.300000000001 | 4629.300000000001 | -0.0167 | 7 | 2 | 5 | 0.4531 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3895.2 | 3891.9000000000005 | -0.055 | 36 | 19 | 17 | 0.8679 |
| `squadPerformance.meanMovement` | 5992.899999999999 | 5992.199999999999 | -0.0117 | 10 | 2 | 8 | 0.1094 |
| `squadPerformance.meanControl` | 5681.499999999999 | 5697 | 0.2583 | 36 | 23 | 13 | 0.1325 |
| `squadPerformance.meanCohesion` | 5589.499999999998 | 5592.3 | 0.0467 | 37 | 20 | 17 | 0.7428 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr777-contact-stable-0060 108 s (timeline) · pr777-contact-stable-0011 115.05 s (timeline) · pr777-contact-stable-0030 132 s (timeline) · pr777-contact-stable-0021 135 s (timeline) · pr777-contact-stable-0008 140.1 s (timeline) · pr777-contact-stable-0024 142.05 s (timeline) · pr777-contact-stable-0044 142.05 s (timeline) · pr777-contact-stable-0004 146.1 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1686&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr777-bdcac65f/ai_flow_live.html?bench=1686&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1686`); it opens the seed that parts earliest, and the dropdowns choose another.

