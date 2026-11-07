# Benchmark run #1687 · 60 seeds from `pr777-contact-stable` (meeting), windows `0+600`

- **OFF** flags: `tacticalController=new&strategicInterception=0&contactActionStable=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/pr777-bdcac65f @ bdcac65 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42328530457) · build v29-dev

## Verdict

**QUIET: 60 of 60 pairs changed (median first part 211.575 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties +2.5% (p 0.4709)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.009 (gate 1.25)
- the 60 changed records first part at simulated second: min 170.1, p10 178.05, median 211.575, p90 246, max 258

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2517 | 2581 | 1.0667 | 48 | 27 | 21 | 0.4709 |
| `usKills` | 1060 | 1119 | 0.9833 | 46 | 27 | 19 | 0.302 |
| `geKills` | 1457 | 1462 | 0.0833 | 43 | 23 | 20 | 0.7608 |
| `fire.total` | 69585 | 72947 | 56.0333 | 50 | 31 | 19 | 0.1189 |
| `fire.hits` | 5564 | 5809 | 4.0833 | 49 | 29 | 20 | 0.2529 |
| `retreatSamples` | 132279 | 130995 | -21.4 | 49 | 22 | 27 | 0.5682 |
| `movementResolver.changes` | 311826 | 314801 | 49.5833 | 58 | 30 | 28 | 0.8957 |
| `grenades.throws` | 32 | 24 | -0.1333 | 18 | 7 | 11 | 0.4807 |
| `grenades.bursts` | 32 | 24 | -0.1333 | 18 | 7 | 11 | 0.4807 |
| `grenades.wounded` | 23 | 14 | -0.15 | 6 | 1 | 5 | 0.2188 |
| `grenades.casualties` | 8 | 6 | -0.0333 | 5 | 1 | 4 | 0.375 |
| `grenades.suppressed` | 42 | 24 | -0.3 | 8 | 1 | 7 | 0.0703 |
| `grenades.friendlyWounded` | 2 | 0 | -0.0333 | 1 | 0 | 1 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 8 | 11 | 0.05 | 6 | 3 | 3 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 55 | 64 | 0.15 | 27 | 18 | 9 | 0.1221 |
| `loopAlerts.length` | 2371 | 2385 | 0.2333 | 51 | 28 | 23 | 0.5758 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 293 | 317 | 0.4 | 44 | 25 | 19 | 0.4514 |
| `stallOutcomes.wakes` | 2 | 6 | 0.0667 | 5 | 4 | 1 | 0.375 |
| `stallOutcomes.repeats` | 1 | 3 | 0.0333 | 2 | 2 | 0 | 0.5 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1841 | 1819 | -0.3667 | 46 | 21 | 25 | 0.6587 |
| `recon.contacts` | 108 | 111 | 0.05 | 29 | 14 | 15 | 1 |
| `recon.noContact` | 923 | 922 | -0.0167 | 38 | 19 | 19 | 1 |
| `recon.timeouts` | 11 | 9 | -0.0333 | 6 | 2 | 4 | 0.6875 |
| `recon.cancelled` | 726 | 710 | -0.2667 | 44 | 19 | 25 | 0.4514 |
| `recon.reportsDelivered` | 450 | 503 | 0.8833 | 34 | 19 | 15 | 0.6076 |
| `recon.retriggerBlocked` | 1447 | 1431 | -0.2667 | 40 | 15 | 25 | 0.1539 |
| `squadPerformance.meanOverall` | 4687.8 | 4681.899999999999 | -0.0983 | 50 | 21 | 29 | 0.3222 |
| `squadPerformance.p10Overall` | 4455.6 | 4456.5 | 0.015 | 16 | 11 | 5 | 0.2101 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3431.300000000001 | 3436.3000000000015 | 0.0833 | 48 | 27 | 21 | 0.4709 |
| `squadPerformance.meanMovement` | 5980.700000000002 | 5981.2 | 0.0083 | 26 | 14 | 12 | 0.845 |
| `squadPerformance.meanControl` | 5388.7 | 5380.599999999999 | -0.135 | 50 | 22 | 28 | 0.4799 |
| `squadPerformance.meanCohesion` | 5593.199999999999 | 5590.900000000001 | -0.0383 | 46 | 23 | 23 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr777-contact-stable-0032 170.1 s (timeline) · pr777-contact-stable-0008 174 s (timeline) · pr777-contact-stable-0034 174 s (timeline) · pr777-contact-stable-0047 176.1 s (timeline) · pr777-contact-stable-0043 177 s (timeline) · pr777-contact-stable-0022 178.05 s (timeline) · pr777-contact-stable-0012 184.05 s (timeline) · pr777-contact-stable-0038 187.05 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1687&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr777-bdcac65f/ai_flow_live.html?bench=1687&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1687`); it opens the seed that parts earliest, and the dropdowns choose another.

