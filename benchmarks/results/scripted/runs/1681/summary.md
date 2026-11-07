# Benchmark run #1681 · 60 seeds from `controller-natural-20261026` (ge-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/pin/pr776-cbe2da76 @ cbe2da7 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42315175003) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 13 of 42 counters under p 0.05 (about 2.1 by chance), 10 under 0.0012; casualties -2.5% (p 1)**

- Clears the Bonferroni line (p < 0.0012): fire.total 31367 to 49941 (+59.2%, p 0); movementResolver.changes 134099 to 185100 (+38.0%, p 0); recon.orders 1507 to 2548 (+69.1%, p 0); recon.contacts 226 to 542 (+139.8%, p 0); recon.cancelled 459 to 1288 (+180.6%, p 0); recon.reportsDelivered 889 to 2166 (+143.6%, p 0); squadPerformance.meanCohesion 5351.300000000001 to 5559.400000000001 (+3.9%, p 0); vacantObjectiveStalls.length 71 to 22 (-69.0%, p 0.0002); recon.retriggerBlocked 672 to 762 (+13.4%, p 0.0006); squadPerformance.meanMission 4284.099999999999 to 4068.199999999999 (-5.0%, p 0.0009).
- Under 0.05 only: recon.noContact 696 to 609 (-12.5%, p 0.0027); loopAlerts.length 834 to 984 (+18.0%, p 0.0038); retreatSamples 88001 to 108574 (+23.4%, p 0.0328).
- Wall time on/off x1.477 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.477 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2135 | 2082 | -0.8833 | 49 | 24 | 25 | 1 |
| `usKills` | 893 | 759 | -2.2333 | 50 | 19 | 31 | 0.1189 |
| `geKills` | 1242 | 1323 | 1.35 | 46 | 28 | 18 | 0.1839 |
| `fire.total` | 31367 | 49941 | 309.5667 | 50 | 45 | 5 | 0 |
| `fire.hits` | 4608 | 4543 | -1.0833 | 49 | 24 | 25 | 1 |
| `retreatSamples` | 88001 | 108574 | 342.8833 | 50 | 33 | 17 | 0.0328 |
| `movementResolver.changes` | 134099 | 185100 | 850.0167 | 60 | 59 | 1 | 0 |
| `grenades.throws` | 34 | 42 | 0.1333 | 19 | 13 | 6 | 0.1671 |
| `grenades.bursts` | 34 | 42 | 0.1333 | 19 | 13 | 6 | 0.1671 |
| `grenades.wounded` | 17 | 21 | 0.0667 | 6 | 3 | 3 | 1 |
| `grenades.casualties` | 8 | 8 | 0 | 4 | 1 | 3 | 0.625 |
| `grenades.suppressed` | 40 | 42 | 0.0333 | 9 | 6 | 3 | 0.5078 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 6 | 8 | 0.0333 | 8 | 5 | 3 | 0.7266 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 71 | 22 | -0.8167 | 34 | 6 | 28 | 0.0002 |
| `loopAlerts.length` | 834 | 984 | 2.5 | 49 | 35 | 14 | 0.0038 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 158 | 156 | -0.0333 | 38 | 19 | 19 | 1 |
| `stallOutcomes.wakes` | 10 | 3 | -0.1167 | 13 | 3 | 10 | 0.0923 |
| `stallOutcomes.repeats` | 1 | 2 | 0.0167 | 3 | 2 | 1 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1507 | 2548 | 17.35 | 60 | 57 | 3 | 0 |
| `recon.contacts` | 226 | 542 | 5.2667 | 48 | 42 | 6 | 0 |
| `recon.noContact` | 696 | 609 | -1.45 | 55 | 16 | 39 | 0.0027 |
| `recon.timeouts` | 54 | 38 | -0.2667 | 25 | 9 | 16 | 0.2295 |
| `recon.cancelled` | 459 | 1288 | 13.8167 | 60 | 59 | 1 | 0 |
| `recon.reportsDelivered` | 889 | 2166 | 21.2833 | 49 | 40 | 9 | 0 |
| `recon.retriggerBlocked` | 672 | 762 | 1.5 | 43 | 33 | 10 | 0.0006 |
| `squadPerformance.meanOverall` | 5036 | 4999.600000000001 | -0.6067 | 60 | 24 | 36 | 0.155 |
| `squadPerformance.p10Overall` | 4649.8 | 4666.900000000002 | 0.285 | 41 | 24 | 17 | 0.3489 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4284.099999999999 | 4068.199999999999 | -3.5983 | 50 | 13 | 37 | 0.0009 |
| `squadPerformance.meanMovement` | 5992.999999999999 | 5992.099999999997 | -0.015 | 28 | 13 | 15 | 0.8506 |
| `squadPerformance.meanControl` | 5705.199999999999 | 5680.2 | -0.4167 | 49 | 20 | 29 | 0.2529 |
| `squadPerformance.meanCohesion` | 5351.300000000001 | 5559.400000000001 | 3.4683 | 59 | 46 | 13 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 0.15 s (timeline) · controller-natural-20261026-0002 0.15 s (timeline) · controller-natural-20261026-0003 0.15 s (timeline) · controller-natural-20261026-0004 0.15 s (timeline) · controller-natural-20261026-0005 0.15 s (timeline) · controller-natural-20261026-0006 0.15 s (timeline) · controller-natural-20261026-0007 0.15 s (timeline) · controller-natural-20261026-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1681&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr776-cbe2da76/ai_flow_live.html?bench=1681&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1681`); it opens the seed that parts earliest, and the dropdowns choose another.

