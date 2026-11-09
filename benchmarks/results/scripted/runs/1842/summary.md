# Benchmark run #1842 · 3 seeds from `phase-c-natural-20261012` (ge-defend), windows `contact+60,every60`

- **OFF** flags: `none` · **ON** flags: `localPlan=1&localAmbush=1&localManeuver=1&coveredBounds=1`
- work/controller-s1b-s1f-20261108 @ ccc696d · [run](https://github.com/APPARANYX/grasstex/actions/runs/42608885225) · build v29-dev

## Verdict

**WEAK: 23 of 23 pairs changed (median first part 211.05 s); 2 of 42 counters under p 0.05 (about 2.1 by chance); casualties -3.3% (p 1)**

- Under 0.05 only: recon.orders 412 to 364 (-11.7%, p 0.0044); retreatSamples 1501 to 1777 (+18.4%, p 0.049).

## Paired comparison (off against on)

- **23** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.024 (gate 1.25)
- the 19 changed records first part at simulated second: min 197.1, p10 197.1, median 211.05, p90 416.1, max 416.1

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 246 | 238 | -0.3478 | 15 | 7 | 8 | 1 |
| `usKills` | 68 | 67 | -0.0435 | 7 | 3 | 4 | 1 |
| `geKills` | 178 | 171 | -0.3043 | 15 | 9 | 6 | 0.6072 |
| `fire.total` | 2109 | 1647 | -20.087 | 15 | 6 | 9 | 0.6072 |
| `fire.hits` | 134 | 128 | -0.2609 | 14 | 8 | 6 | 0.7905 |
| `retreatSamples` | 1501 | 1777 | 12 | 17 | 13 | 4 | 0.049 |
| `movementResolver.changes` | 20369 | 18569 | -78.2609 | 20 | 14 | 6 | 0.1153 |
| `grenades.throws` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 12 | 12 | 0 | 6 | 2 | 4 | 0.6875 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 3 | 1 | -0.087 | 2 | 0 | 2 | 0.5 |
| `loopAlerts.length` | 47 | 38 | -0.3913 | 13 | 5 | 8 | 0.5811 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 34 | 28 | -0.2609 | 4 | 0 | 4 | 0.125 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 14 | 15 | 0.0435 | 5 | 2 | 3 | 1 |
| `timeline.stalledSamples` | 76 | 67 | -0.3913 | 6 | 2 | 4 | 0.6875 |
| `timeline.stalledOnsetsRepeated` | 25 | 28 | 0.1304 | 5 | 3 | 2 | 1 |
| `timeline.stalledSamplesRepeated` | 127 | 116 | -0.4783 | 7 | 3 | 4 | 1 |
| `recon.orders` | 412 | 364 | -2.087 | 19 | 3 | 16 | 0.0044 |
| `recon.contacts` | 36 | 29 | -0.3043 | 11 | 3 | 8 | 0.2266 |
| `recon.noContact` | 76 | 73 | -0.1304 | 8 | 4 | 4 | 1 |
| `recon.timeouts` | 51 | 59 | 0.3478 | 7 | 5 | 2 | 0.4531 |
| `recon.cancelled` | 190 | 146 | -1.913 | 14 | 5 | 9 | 0.424 |
| `recon.reportsDelivered` | 171 | 61 | -4.7826 | 11 | 3 | 8 | 0.2266 |
| `recon.retriggerBlocked` | 153 | 162 | 0.3913 | 12 | 9 | 3 | 0.146 |
| `squadPerformance.meanOverall` | 2065.6 | 2056.4 | -0.4 | 18 | 8 | 10 | 0.8145 |
| `squadPerformance.p10Overall` | 1834.0999999999997 | 1800.6 | -1.4565 | 17 | 7 | 10 | 0.6291 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 1892.1000000000004 | 1859.9 | -1.4 | 17 | 5 | 12 | 0.1435 |
| `squadPerformance.meanMovement` | 2190.5 | 2195 | 0.1957 | 16 | 9 | 7 | 0.8036 |
| `squadPerformance.meanControl` | 2263.3999999999996 | 2270.7000000000003 | 0.3174 | 13 | 9 | 4 | 0.2668 |
| `squadPerformance.meanCohesion` | 2024.3999999999994 | 2024.0000000000002 | -0.0174 | 17 | 10 | 7 | 0.6291 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 3 seeds that part earliest (simulated seconds)

phase-c-natural-20261012-0003 197.1 s (timeline) · phase-c-natural-20261012-0002 211.05 s (timeline) · phase-c-natural-20261012-0001 416.1 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1842&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/controller-s1b-s1f-20261108/ai_flow_live.html?bench=1842&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1842`); it opens the seed that parts earliest, and the dropdowns choose another.

