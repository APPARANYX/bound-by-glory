# Benchmark run #1694 · 60 seeds from `pr778-squad-reviews` (ge-defend), windows `0+600`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerSquadReviews=0&controllerCoaGate=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/pr778-e4278914 @ e427891 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42338945163) · build v29-dev

## Verdict

**QUIET: 57 of 60 pairs changed (median first part 216.525 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties -1.7% (p 0.6655)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **3** · runtime errors off 0 / on 0 · wall time on/off x0.99 (gate 1.25)
- the 52 changed records first part at simulated second: min 115.05, p10 174, median 216.525, p90 283.05, max 395.1

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2115 | 2080 | -0.5833 | 48 | 22 | 26 | 0.6655 |
| `usKills` | 854 | 849 | -0.0833 | 47 | 24 | 23 | 1 |
| `geKills` | 1261 | 1231 | -0.5 | 45 | 18 | 27 | 0.2327 |
| `fire.total` | 57558 | 56657 | -15.0167 | 52 | 24 | 28 | 0.6778 |
| `fire.hits` | 4645 | 4582 | -1.05 | 50 | 22 | 28 | 0.4799 |
| `retreatSamples` | 121066 | 112914 | -135.8667 | 52 | 23 | 29 | 0.4885 |
| `movementResolver.changes` | 193942 | 196154 | 36.8667 | 52 | 29 | 23 | 0.4885 |
| `grenades.throws` | 99 | 100 | 0.0167 | 25 | 14 | 11 | 0.69 |
| `grenades.bursts` | 98 | 100 | 0.0333 | 26 | 15 | 11 | 0.5572 |
| `grenades.wounded` | 100 | 90 | -0.1667 | 16 | 10 | 6 | 0.4545 |
| `grenades.casualties` | 25 | 28 | 0.05 | 14 | 9 | 5 | 0.424 |
| `grenades.suppressed` | 268 | 228 | -0.6667 | 20 | 12 | 8 | 0.5034 |
| `grenades.friendlyWounded` | 3 | 5 | 0.0333 | 6 | 4 | 2 | 0.6875 |
| `grenades.friendlyCasualties` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `grenades.aborted` | 12 | 16 | 0.0667 | 12 | 7 | 5 | 0.7744 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 8 | 19 | 0.1833 | 13 | 10 | 3 | 0.0923 |
| `loopAlerts.length` | 1142 | 1049 | -1.55 | 52 | 19 | 33 | 0.0704 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 210 | 233 | 0.3833 | 41 | 23 | 18 | 0.5327 |
| `stallOutcomes.wakes` | 2 | 2 | 0 | 4 | 2 | 2 | 1 |
| `stallOutcomes.repeats` | 1 | 1 | 0 | 2 | 1 | 1 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2846 | 2729 | -1.95 | 49 | 20 | 29 | 0.2529 |
| `recon.contacts` | 613 | 547 | -1.1 | 41 | 14 | 27 | 0.0596 |
| `recon.noContact` | 678 | 695 | 0.2833 | 45 | 25 | 20 | 0.5515 |
| `recon.timeouts` | 42 | 42 | 0 | 18 | 9 | 9 | 1 |
| `recon.cancelled` | 1450 | 1391 | -0.9833 | 50 | 24 | 26 | 0.8877 |
| `recon.reportsDelivered` | 2594 | 2289 | -5.0833 | 50 | 20 | 30 | 0.2026 |
| `recon.retriggerBlocked` | 815 | 834 | 0.3167 | 43 | 25 | 18 | 0.3604 |
| `squadPerformance.meanOverall` | 4941.000000000002 | 4962.700000000001 | 0.3617 | 50 | 30 | 20 | 0.2026 |
| `squadPerformance.p10Overall` | 4612.5 | 4621.200000000001 | 0.145 | 21 | 14 | 7 | 0.1892 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3934.4999999999995 | 4002.2000000000003 | 1.1283 | 51 | 28 | 23 | 0.5758 |
| `squadPerformance.meanMovement` | 5992.199999999999 | 5990.7 | -0.025 | 29 | 9 | 20 | 0.0614 |
| `squadPerformance.meanControl` | 5681.2 | 5675.300000000003 | -0.0983 | 51 | 25 | 26 | 1 |
| `squadPerformance.meanCohesion` | 5571.499999999999 | 5539.3 | -0.5367 | 52 | 19 | 33 | 0.0704 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr778-squad-reviews-0057 115.05 s (timeline) · pr778-squad-reviews-0040 124.05 s (timeline) · pr778-squad-reviews-0014 158.1 s (timeline) · pr778-squad-reviews-0054 163.05 s (timeline) · pr778-squad-reviews-0049 173.1 s (timeline) · pr778-squad-reviews-0024 174 s (timeline) · pr778-squad-reviews-0025 174 s (timeline) · pr778-squad-reviews-0021 176.1 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1694&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr778-e4278914/ai_flow_live.html?bench=1694&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1694`); it opens the seed that parts earliest, and the dropdowns choose another.

