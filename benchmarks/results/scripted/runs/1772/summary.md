# Benchmark run #1772 · 60 seeds from `pr793-m3-20261108` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr793-156811c @ 156811c · [run](https://github.com/APPARANYX/grasstex/actions/runs/42493641063) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 17 of 42 counters under p 0.05 (about 2.1 by chance), 10 under 0.0012; casualties -7.5% (p 0.0273)**

- Clears the Bonferroni line (p < 0.0012): fire.total 38434 to 68084 (+77.1%, p 0); movementResolver.changes 209667 to 301336 (+43.7%, p 0); vacantObjectiveStalls.length 259 to 51 (-80.3%, p 0); loopAlerts.length 825 to 2149 (+160.5%, p 0); recon.noContact 1057 to 914 (-13.5%, p 0); recon.cancelled 440 to 695 (+58.0%, p 0); squadPerformance.meanOverall 4807.500000000002 to 4711.000000000001 (-2.0%, p 0); squadPerformance.meanMission 3745.2999999999997 to 3481.1999999999994 (-7.1%, p 0); squadPerformance.meanControl 5615.8 to 5380.500000000001 (-4.2%, p 0); squadPerformance.meanCohesion 5483.200000000001 to 5593.900000000002 (+2.0%, p 0).
- Under 0.05 only: squadPerformance.meanMovement 5985.700000000001 to 5981.5 (-0.1%, p 0.0029); recon.orders 1684 to 1817 (+7.9%, p 0.0075); geKills 1470 to 1345 (-8.5%, p 0.0119); casualties 2627 to 2429 (-7.5%, p 0.0273); recon.retriggerBlocked 1287 to 1379 (+7.1%, p 0.0402); grenades.throws 19 to 32 (+68.4%, p 0.0414); grenades.bursts 19 to 32 (+68.4%, p 0.0414).
- Wall time on/off x1.509 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.509 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2627 | 2429 | -3.3 | 60 | 21 | 39 | 0.0273 |
| `usKills` | 1157 | 1084 | -1.2167 | 57 | 25 | 32 | 0.427 |
| `geKills` | 1470 | 1345 | -2.0833 | 58 | 19 | 39 | 0.0119 |
| `fire.total` | 38434 | 68084 | 494.1667 | 60 | 59 | 1 | 0 |
| `fire.hits` | 5826 | 5599 | -3.7833 | 59 | 26 | 33 | 0.435 |
| `retreatSamples` | 107623 | 125581 | 299.3 | 60 | 38 | 22 | 0.0519 |
| `movementResolver.changes` | 209667 | 301336 | 1527.8167 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 19 | 32 | 0.2167 | 20 | 15 | 5 | 0.0414 |
| `grenades.bursts` | 19 | 32 | 0.2167 | 20 | 15 | 5 | 0.0414 |
| `grenades.wounded` | 22 | 23 | 0.0167 | 10 | 5 | 5 | 1 |
| `grenades.casualties` | 9 | 9 | 0 | 5 | 3 | 2 | 1 |
| `grenades.suppressed` | 47 | 53 | 0.1 | 11 | 6 | 5 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 1 | 10 | 0.15 | 8 | 7 | 1 | 0.0703 |
| `movementStalls.length` | 3 | 0 | -0.05 | 1 | 0 | 1 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 259 | 51 | -3.4667 | 53 | 2 | 51 | 0 |
| `loopAlerts.length` | 825 | 2149 | 22.0667 | 60 | 58 | 2 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 227 | 320 | 1.55 | 50 | 31 | 19 | 0.1189 |
| `stallOutcomes.wakes` | 8 | 4 | -0.0667 | 9 | 3 | 6 | 0.5078 |
| `stallOutcomes.repeats` | 2 | 2 | 0 | 4 | 2 | 2 | 1 |
| `timeline.stalledOnsets` | 3 | 0 | -0.05 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamples` | 67 | 0 | -1.1167 | 1 | 0 | 1 | 1 |
| `timeline.stalledOnsetsRepeated` | 3 | 0 | -0.05 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamplesRepeated` | 67 | 0 | -1.1167 | 1 | 0 | 1 | 1 |
| `recon.orders` | 1684 | 1817 | 2.2167 | 57 | 39 | 18 | 0.0075 |
| `recon.contacts` | 105 | 110 | 0.0833 | 50 | 26 | 24 | 0.8877 |
| `recon.noContact` | 1057 | 914 | -2.3833 | 58 | 12 | 46 | 0 |
| `recon.timeouts` | 10 | 9 | -0.0167 | 16 | 7 | 9 | 0.8036 |
| `recon.cancelled` | 440 | 695 | 4.25 | 55 | 50 | 5 | 0 |
| `recon.reportsDelivered` | 460 | 526 | 1.1 | 50 | 30 | 20 | 0.2026 |
| `recon.retriggerBlocked` | 1287 | 1379 | 1.5333 | 54 | 35 | 19 | 0.0402 |
| `squadPerformance.meanOverall` | 4807.500000000002 | 4711.000000000001 | -1.6083 | 59 | 6 | 53 | 0 |
| `squadPerformance.p10Overall` | 4481.599999999999 | 4476.200000000001 | -0.09 | 28 | 15 | 13 | 0.8506 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3745.2999999999997 | 3481.1999999999994 | -4.4017 | 60 | 11 | 49 | 0 |
| `squadPerformance.meanMovement` | 5985.700000000001 | 5981.5 | -0.07 | 42 | 11 | 31 | 0.0029 |
| `squadPerformance.meanControl` | 5615.8 | 5380.500000000001 | -3.9217 | 60 | 9 | 51 | 0 |
| `squadPerformance.meanCohesion` | 5483.200000000001 | 5593.900000000002 | 1.845 | 59 | 46 | 13 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr793-m3-20261108-0001 0.15 s (timeline) · pr793-m3-20261108-0002 0.15 s (timeline) · pr793-m3-20261108-0003 0.15 s (timeline) · pr793-m3-20261108-0004 0.15 s (timeline) · pr793-m3-20261108-0005 0.15 s (timeline) · pr793-m3-20261108-0006 0.15 s (timeline) · pr793-m3-20261108-0007 0.15 s (timeline) · pr793-m3-20261108-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1772&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr793-156811c/ai_flow_live.html?bench=1772&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1772`); it opens the seed that parts earliest, and the dropdowns choose another.

