# Benchmark run #1843 · 3 seeds from `phase-c-natural-20261012` (meeting), windows `contact+60,every60`

- **OFF** flags: `none` · **ON** flags: `localPlan=1&localAmbush=1&localManeuver=1&coveredBounds=1`
- work/controller-s1b-s1f-20261108 @ ccc696d · [run](https://github.com/APPARANYX/grasstex/actions/runs/42608885952) · build v29-dev

## Verdict

**MOVED: 19 of 19 pairs changed (median first part 322.05 s); 6 of 42 counters under p 0.05 (about 2.1 by chance), 1 under 0.0012; casualties -20.0% (p 0.0768)**

- Clears the Bonferroni line (p < 0.0012): recon.contacts 31 to 6 (-80.6%, p 0.0005).
- Under 0.05 only: recon.retriggerBlocked 87 to 71 (-18.4%, p 0.0039); regroups.entries 41 to 50 (+22.0%, p 0.0156); timeline.stalledOnsetsRepeated 11 to 0 (-100.0%, p 0.0156); timeline.stalledSamplesRepeated 54 to 0 (-100.0%, p 0.0156); geKills 222 to 149 (-32.9%, p 0.0352).

## Paired comparison (off against on)

- **19** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x0.954 (gate 1.25)
- the 16 changed records first part at simulated second: min 301.05, p10 301.05, median 322.05, p90 323.1, max 323.1

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 285 | 228 | -3 | 16 | 4 | 12 | 0.0768 |
| `usKills` | 63 | 79 | 0.8421 | 13 | 7 | 6 | 1 |
| `geKills` | 222 | 149 | -3.8421 | 15 | 3 | 12 | 0.0352 |
| `fire.total` | 3399 | 3672 | 14.3684 | 16 | 11 | 5 | 0.2101 |
| `fire.hits` | 201 | 162 | -2.0526 | 14 | 6 | 8 | 0.7905 |
| `retreatSamples` | 4496 | 4457 | -2.0526 | 15 | 10 | 5 | 0.3018 |
| `movementResolver.changes` | 17253 | 15594 | -87.3158 | 14 | 4 | 10 | 0.1796 |
| `grenades.throws` | 1 | 0 | -0.0526 | 1 | 0 | 1 | 1 |
| `grenades.bursts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 3 | 0 | -0.1579 | 2 | 0 | 2 | 0.5 |
| `routeStalls.length` | 4 | 5 | 0.0526 | 1 | 1 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 6 | 8 | 0.1053 | 6 | 4 | 2 | 0.6875 |
| `loopAlerts.length` | 53 | 57 | 0.2105 | 13 | 7 | 6 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 41 | 50 | 0.4737 | 7 | 7 | 0 | 0.0156 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 3 | 0 | -0.1579 | 2 | 0 | 2 | 0.5 |
| `timeline.stalledSamples` | 15 | 0 | -0.7895 | 2 | 0 | 2 | 0.5 |
| `timeline.stalledOnsetsRepeated` | 11 | 0 | -0.5789 | 7 | 0 | 7 | 0.0156 |
| `timeline.stalledSamplesRepeated` | 54 | 0 | -2.8421 | 7 | 0 | 7 | 0.0156 |
| `recon.orders` | 241 | 205 | -1.8947 | 12 | 3 | 9 | 0.146 |
| `recon.contacts` | 31 | 6 | -1.3158 | 12 | 0 | 12 | 0.0005 |
| `recon.noContact` | 35 | 41 | 0.3158 | 5 | 4 | 1 | 0.375 |
| `recon.timeouts` | 48 | 44 | -0.2105 | 4 | 0 | 4 | 0.125 |
| `recon.cancelled` | 86 | 85 | -0.0526 | 13 | 8 | 5 | 0.5811 |
| `recon.reportsDelivered` | 111 | 24 | -4.5789 | 12 | 3 | 9 | 0.146 |
| `recon.retriggerBlocked` | 87 | 71 | -0.8421 | 9 | 0 | 9 | 0.0039 |
| `squadPerformance.meanOverall` | 1623.9 | 1616.5000000000002 | -0.3895 | 16 | 5 | 11 | 0.2101 |
| `squadPerformance.p10Overall` | 1461.1999999999998 | 1453.7 | -0.3947 | 13 | 3 | 10 | 0.0923 |
| `squadPerformance.lowScoreSquads` | 0 | 1 | 0.0526 | 1 | 1 | 0 | 1 |
| `squadPerformance.meanMission` | 1248.4000000000003 | 1225.9 | -1.1842 | 16 | 5 | 11 | 0.2101 |
| `squadPerformance.meanMovement` | 1811.6000000000001 | 1810.4000000000003 | -0.0632 | 16 | 9 | 7 | 0.8036 |
| `squadPerformance.meanControl` | 1872.7 | 1870.2999999999997 | -0.1263 | 15 | 6 | 9 | 0.6072 |
| `squadPerformance.meanCohesion` | 1829.1999999999998 | 1834.0000000000002 | 0.2526 | 16 | 9 | 7 | 0.8036 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 3 seeds that part earliest (simulated seconds)

phase-c-natural-20261012-0001 301.05 s (timeline) · phase-c-natural-20261012-0003 322.05 s (timeline) · phase-c-natural-20261012-0002 323.1 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1843&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/controller-s1b-s1f-20261108/ai_flow_live.html?bench=1843&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1843`); it opens the seed that parts earliest, and the dropdowns choose another.

