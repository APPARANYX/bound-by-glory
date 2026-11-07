# Benchmark run #1739 · 3 seeds from `phase-c-natural-20261012` (ge-defend), windows `contact+60,every60`

- **OFF** flags: `none` · **ON** flags: `localPlan=1&localAmbush=1&localManeuver=1&coveredBounds=1`
- claude/project-thread-c78ew0 @ 5986524 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42414829018) · build v29-dev

## Verdict

**MOVED: 19 of 19 pairs changed (median first part 240 s); 5 of 42 counters under p 0.05 (about 2.1 by chance), 2 under 0.0012; casualties +12.6% (p 0.7539)**

- Clears the Bonferroni line (p < 0.0012): recon.cancelled 116 to 84 (-27.6%, p 0.0005); recon.retriggerBlocked 161 to 135 (-16.1%, p 0.0005).
- Under 0.05 only: recon.orders 349 to 309 (-11.5%, p 0.002); squadPerformance.meanOverall 1706 to 1717.7 (+0.7%, p 0.0117); recon.contacts 24 to 17 (-29.2%, p 0.0156).

## Paired comparison (off against on)

- **19** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.021 (gate 1.25)
- the 13 changed records first part at simulated second: min 240, p10 240, median 240, p90 306, max 592.05

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 206 | 232 | 1.3684 | 10 | 6 | 4 | 0.7539 |
| `usKills` | 124 | 117 | -0.3684 | 9 | 3 | 6 | 0.5078 |
| `geKills` | 82 | 115 | 1.7368 | 5 | 5 | 0 | 0.0625 |
| `fire.total` | 1805 | 1936 | 6.8947 | 11 | 6 | 5 | 1 |
| `fire.hits` | 92 | 114 | 1.1579 | 8 | 3 | 5 | 0.7266 |
| `retreatSamples` | 1052 | 869 | -9.6316 | 8 | 3 | 5 | 0.7266 |
| `movementResolver.changes` | 16859 | 15904 | -50.2632 | 15 | 4 | 11 | 0.1185 |
| `grenades.throws` | 1 | 0 | -0.0526 | 1 | 0 | 1 | 1 |
| `grenades.bursts` | 1 | 0 | -0.0526 | 1 | 0 | 1 | 1 |
| `grenades.wounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 4 | 4 | 0 | 3 | 2 | 1 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 43 | 37 | -0.3158 | 10 | 4 | 6 | 0.7539 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 29 | 23 | -0.3158 | 3 | 0 | 3 | 0.25 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 6 | 5 | -0.0526 | 3 | 2 | 1 | 1 |
| `timeline.stalledSamples` | 29 | 24 | -0.2632 | 4 | 3 | 1 | 0.625 |
| `timeline.stalledOnsetsRepeated` | 22 | 19 | -0.1579 | 5 | 1 | 4 | 0.375 |
| `timeline.stalledSamplesRepeated` | 112 | 55 | -3 | 5 | 1 | 4 | 0.375 |
| `recon.orders` | 349 | 309 | -2.1053 | 10 | 0 | 10 | 0.002 |
| `recon.contacts` | 24 | 17 | -0.3684 | 7 | 0 | 7 | 0.0156 |
| `recon.noContact` | 89 | 88 | -0.0526 | 8 | 4 | 4 | 1 |
| `recon.timeouts` | 84 | 85 | 0.0526 | 1 | 1 | 0 | 1 |
| `recon.cancelled` | 116 | 84 | -1.6842 | 12 | 0 | 12 | 0.0005 |
| `recon.reportsDelivered` | 75 | 59 | -0.8421 | 11 | 5 | 6 | 1 |
| `recon.retriggerBlocked` | 161 | 135 | -1.3684 | 12 | 0 | 12 | 0.0005 |
| `squadPerformance.meanOverall` | 1706 | 1717.7 | 0.6158 | 11 | 10 | 1 | 0.0117 |
| `squadPerformance.p10Overall` | 1506.5000000000002 | 1515.8 | 0.4895 | 6 | 4 | 2 | 0.6875 |
| `squadPerformance.lowScoreSquads` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 1562.9 | 1592.5999999999997 | 1.5632 | 11 | 9 | 2 | 0.0654 |
| `squadPerformance.meanMovement` | 1807.2000000000003 | 1805.8000000000002 | -0.0737 | 12 | 5 | 7 | 0.7744 |
| `squadPerformance.meanControl` | 1865.4999999999998 | 1868.8999999999999 | 0.1789 | 10 | 6 | 4 | 0.7539 |
| `squadPerformance.meanCohesion` | 1652.1 | 1642.7999999999997 | -0.4895 | 11 | 4 | 7 | 0.5488 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 3 seeds that part earliest (simulated seconds)

phase-c-natural-20261012-0002 240 s (timeline) · phase-c-natural-20261012-0003 306 s (timeline) · phase-c-natural-20261012-0001 592.05 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1739&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1739`); it opens the seed that parts earliest, and the dropdowns choose another.

