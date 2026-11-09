# Benchmark run #1839 · 3 seeds from `phase-c-natural-20261012` (ge-defend), windows `contact+60,every60`

- **OFF** flags: `none` · **ON** flags: `localPlan=1&localAmbush=1&localManeuver=1&coveredBounds=1`
- work/controller-micro-u-20261109 @ 5d7cc87 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42607859109) · build v29-dev

## Verdict

**MOVED: 19 of 19 pairs changed (median first part 213.075 s); 4 of 42 counters under p 0.05 (about 2.1 by chance), 1 under 0.0012; casualties +8.3% (p 0.5488)**

- Clears the Bonferroni line (p < 0.0012): recon.orders 343 to 277 (-19.2%, p 0.0001).
- Under 0.05 only: squadPerformance.meanMission 1399.1999999999998 to 1533.6 (+9.6%, p 0.0063); recon.cancelled 136 to 79 (-41.9%, p 0.0074); squadPerformance.meanCohesion 1753.6000000000001 to 1691.3 (-3.6%, p 0.0386).

## Paired comparison (off against on)

- **19** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x0.988 (gate 1.25)
- the 16 changed records first part at simulated second: min 203.1, p10 203.1, median 213.075, p90 223.05, max 591

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 168 | 182 | 0.7368 | 11 | 4 | 7 | 0.5488 |
| `usKills` | 79 | 91 | 0.6316 | 12 | 6 | 6 | 1 |
| `geKills` | 89 | 91 | 0.1053 | 7 | 4 | 3 | 1 |
| `fire.total` | 1974 | 2384 | 21.5789 | 13 | 9 | 4 | 0.2668 |
| `fire.hits` | 86 | 93 | 0.3684 | 10 | 5 | 5 | 1 |
| `retreatSamples` | 3855 | 1500 | -123.9474 | 11 | 2 | 9 | 0.0654 |
| `movementResolver.changes` | 17988 | 18184 | 10.3158 | 15 | 8 | 7 | 1 |
| `grenades.throws` | 0 | 1 | 0.0526 | 1 | 1 | 0 | 1 |
| `grenades.bursts` | 0 | 1 | 0.0526 | 1 | 1 | 0 | 1 |
| `grenades.wounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 7 | 4 | -0.1579 | 3 | 2 | 1 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 1 | 1 | 0 | 2 | 1 | 1 | 1 |
| `loopAlerts.length` | 29 | 27 | -0.1053 | 6 | 2 | 4 | 0.6875 |
| `writerConflicts` | 68 | 68 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 15 | 18 | 0.1579 | 9 | 4 | 5 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 8 | 5 | -0.1579 | 4 | 2 | 2 | 1 |
| `timeline.stalledSamples` | 45 | 18 | -1.4211 | 4 | 3 | 1 | 0.625 |
| `timeline.stalledOnsetsRepeated` | 17 | 13 | -0.2105 | 5 | 3 | 2 | 1 |
| `timeline.stalledSamplesRepeated` | 91 | 47 | -2.3158 | 5 | 3 | 2 | 1 |
| `recon.orders` | 343 | 277 | -3.4737 | 15 | 0 | 15 | 0.0001 |
| `recon.contacts` | 30 | 23 | -0.3684 | 13 | 4 | 9 | 0.2668 |
| `recon.noContact` | 66 | 68 | 0.1053 | 9 | 5 | 4 | 1 |
| `recon.timeouts` | 77 | 77 | 0 | 8 | 3 | 5 | 0.7266 |
| `recon.cancelled` | 136 | 79 | -3 | 15 | 2 | 13 | 0.0074 |
| `recon.reportsDelivered` | 142 | 98 | -2.3158 | 14 | 5 | 9 | 0.424 |
| `recon.retriggerBlocked` | 134 | 128 | -0.3158 | 9 | 3 | 6 | 0.5078 |
| `squadPerformance.meanOverall` | 1671.7999999999997 | 1705.6 | 1.7789 | 13 | 10 | 3 | 0.0923 |
| `squadPerformance.p10Overall` | 1531.5 | 1537.4000000000003 | 0.3105 | 10 | 8 | 2 | 0.1094 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 1399.1999999999998 | 1533.6 | 7.0737 | 12 | 11 | 1 | 0.0063 |
| `squadPerformance.meanMovement` | 1840.7999999999997 | 1822.7 | -0.9526 | 11 | 2 | 9 | 0.0654 |
| `squadPerformance.meanControl` | 1876.3999999999999 | 1873.3999999999999 | -0.1579 | 8 | 4 | 4 | 1 |
| `squadPerformance.meanCohesion` | 1753.6000000000001 | 1691.3 | -3.2789 | 12 | 2 | 10 | 0.0386 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 3 seeds that part earliest (simulated seconds)

phase-c-natural-20261012-0003 203.1 s (timeline) · phase-c-natural-20261012-0002 223.05 s (timeline) · phase-c-natural-20261012-0001 591 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1839&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/controller-micro-u-20261109/ai_flow_live.html?bench=1839&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1839`); it opens the seed that parts earliest, and the dropdowns choose another.

