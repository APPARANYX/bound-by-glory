# Benchmark run #1693 · 60 seeds from `pr778-squad-reviews` (us-defend), windows `0+600`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerSquadReviews=0&controllerCoaGate=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/pr778-e4278914 @ e427891 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42338939388) · build v29-dev

## Verdict

**QUIET: 57 of 60 pairs changed (median first part 236.1 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties +4.2% (p 0.2912)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **3** · runtime errors off 0 / on 0 · wall time on/off x0.969 (gate 1.25)
- the 52 changed records first part at simulated second: min 129, p10 176.1, median 236.1, p90 330, max 515.1

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2082 | 2169 | 1.45 | 44 | 26 | 18 | 0.2912 |
| `usKills` | 1056 | 1060 | 0.0667 | 45 | 22 | 23 | 1 |
| `geKills` | 1026 | 1109 | 1.3833 | 48 | 27 | 21 | 0.4709 |
| `fire.total` | 59728 | 59329 | -6.65 | 51 | 26 | 25 | 1 |
| `fire.hits` | 4829 | 5079 | 4.1667 | 50 | 29 | 21 | 0.3222 |
| `retreatSamples` | 138091 | 133250 | -80.6833 | 51 | 23 | 28 | 0.5758 |
| `movementResolver.changes` | 195802 | 200691 | 81.4833 | 52 | 29 | 23 | 0.4885 |
| `grenades.throws` | 60 | 70 | 0.1667 | 25 | 15 | 10 | 0.4244 |
| `grenades.bursts` | 60 | 70 | 0.1667 | 25 | 15 | 10 | 0.4244 |
| `grenades.wounded` | 47 | 62 | 0.25 | 13 | 8 | 5 | 0.5811 |
| `grenades.casualties` | 16 | 22 | 0.1 | 7 | 5 | 2 | 0.4531 |
| `grenades.suppressed` | 114 | 136 | 0.3667 | 15 | 8 | 7 | 1 |
| `grenades.friendlyWounded` | 4 | 2 | -0.0333 | 2 | 1 | 1 | 1 |
| `grenades.friendlyCasualties` | 2 | 1 | -0.0167 | 2 | 1 | 1 | 1 |
| `grenades.aborted` | 15 | 10 | -0.0833 | 10 | 4 | 6 | 0.7539 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 12 | 8 | -0.0667 | 9 | 3 | 6 | 0.5078 |
| `loopAlerts.length` | 1350 | 1332 | -0.3 | 48 | 24 | 24 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 250 | 234 | -0.2667 | 43 | 25 | 18 | 0.3604 |
| `stallOutcomes.wakes` | 1 | 4 | 0.05 | 3 | 3 | 0 | 0.25 |
| `stallOutcomes.repeats` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2568 | 2548 | -0.3333 | 46 | 19 | 27 | 0.302 |
| `recon.contacts` | 617 | 612 | -0.0833 | 44 | 20 | 24 | 0.6516 |
| `recon.noContact` | 692 | 675 | -0.2833 | 46 | 23 | 23 | 1 |
| `recon.timeouts` | 58 | 55 | -0.05 | 13 | 5 | 8 | 0.5811 |
| `recon.cancelled` | 1124 | 1124 | 0 | 49 | 22 | 27 | 0.5682 |
| `recon.reportsDelivered` | 2345 | 2394 | 0.8167 | 49 | 24 | 25 | 1 |
| `recon.retriggerBlocked` | 765 | 750 | -0.25 | 43 | 20 | 23 | 0.7608 |
| `squadPerformance.meanOverall` | 4911.3 | 4914.600000000001 | 0.055 | 50 | 30 | 20 | 0.2026 |
| `squadPerformance.p10Overall` | 4606.299999999999 | 4613.099999999999 | 0.1133 | 16 | 9 | 7 | 0.8036 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3862.4000000000005 | 3875.8999999999996 | 0.225 | 50 | 24 | 26 | 0.8877 |
| `squadPerformance.meanMovement` | 5992.4000000000015 | 5991.1 | -0.0217 | 16 | 4 | 12 | 0.0768 |
| `squadPerformance.meanControl` | 5663.4 | 5656.399999999999 | -0.1167 | 50 | 21 | 29 | 0.3222 |
| `squadPerformance.meanCohesion` | 5564.600000000002 | 5563.5 | -0.0183 | 50 | 28 | 22 | 0.4799 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr778-squad-reviews-0028 129 s (timeline) · pr778-squad-reviews-0047 143.1 s (timeline) · pr778-squad-reviews-0023 154.05 s (timeline) · pr778-squad-reviews-0001 164.1 s (timeline) · pr778-squad-reviews-0017 174 s (timeline) · pr778-squad-reviews-0004 176.1 s (timeline) · pr778-squad-reviews-0009 176.1 s (timeline) · pr778-squad-reviews-0056 177 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1693&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr778-e4278914/ai_flow_live.html?bench=1693&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1693`); it opens the seed that parts earliest, and the dropdowns choose another.

