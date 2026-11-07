# Benchmark run #1740 · 3 seeds from `phase-c-natural-20261012` (meeting), windows `contact+60,every60`

- **OFF** flags: `none` · **ON** flags: `localPlan=1&localAmbush=1&localManeuver=1&coveredBounds=1`
- claude/project-thread-c78ew0 @ 5986524 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42414830007) · build v29-dev

## Verdict

**WEAK: 18 of 18 pairs changed (median first part 364.05 s); 5 of 42 counters under p 0.05 (about 2.1 by chance); casualties +22.0% (p 1)**

- Under 0.05 only: squadPerformance.meanCohesion 1681.2000000000003 to 1719.2 (+2.3%, p 0.002); recon.cancelled 100 to 73 (-27.0%, p 0.0117); recon.orders 213 to 195 (-8.5%, p 0.0156); geKills 104 to 153 (+47.1%, p 0.0225); movementResolver.changes 16197 to 17611 (+8.7%, p 0.0352).

## Paired comparison (off against on)

- **18** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.037 (gate 1.25)
- the 15 changed records first part at simulated second: min 262.05, p10 262.05, median 364.05, p90 375, max 375

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 177 | 216 | 2.1667 | 13 | 6 | 7 | 1 |
| `usKills` | 73 | 63 | -0.5556 | 12 | 5 | 7 | 0.7744 |
| `geKills` | 104 | 153 | 2.7222 | 13 | 11 | 2 | 0.0225 |
| `fire.total` | 3415 | 3142 | -15.1667 | 14 | 4 | 10 | 0.1796 |
| `fire.hits` | 117 | 163 | 2.5556 | 13 | 9 | 4 | 0.2668 |
| `retreatSamples` | 3102 | 4230 | 62.6667 | 12 | 7 | 5 | 0.7744 |
| `movementResolver.changes` | 16197 | 17611 | 78.5556 | 15 | 12 | 3 | 0.0352 |
| `grenades.throws` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 5 | 4 | -0.0556 | 1 | 0 | 1 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 3 | 5 | 0.1111 | 3 | 2 | 1 | 1 |
| `loopAlerts.length` | 53 | 61 | 0.4444 | 14 | 8 | 6 | 0.7905 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 25 | 24 | -0.0556 | 1 | 0 | 1 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 213 | 195 | -1 | 7 | 0 | 7 | 0.0156 |
| `recon.contacts` | 23 | 18 | -0.2778 | 10 | 4 | 6 | 0.7539 |
| `recon.noContact` | 7 | 9 | 0.1111 | 2 | 2 | 0 | 0.5 |
| `recon.timeouts` | 58 | 62 | 0.2222 | 2 | 2 | 0 | 0.5 |
| `recon.cancelled` | 100 | 73 | -1.5 | 11 | 1 | 10 | 0.0117 |
| `recon.reportsDelivered` | 116 | 96 | -1.1111 | 8 | 4 | 4 | 1 |
| `recon.retriggerBlocked` | 64 | 59 | -0.2778 | 6 | 2 | 4 | 0.6875 |
| `squadPerformance.meanOverall` | 1547.3000000000004 | 1541.4000000000003 | -0.3278 | 14 | 6 | 8 | 0.7905 |
| `squadPerformance.p10Overall` | 1358.9999999999998 | 1364.3999999999999 | 0.3 | 12 | 6 | 6 | 1 |
| `squadPerformance.lowScoreSquads` | 1 | 0 | -0.0556 | 1 | 0 | 1 | 1 |
| `squadPerformance.meanMission` | 1236.6000000000001 | 1215.0000000000002 | -1.2 | 12 | 4 | 8 | 0.3877 |
| `squadPerformance.meanMovement` | 1711.4999999999998 | 1714.8 | 0.1833 | 13 | 7 | 6 | 1 |
| `squadPerformance.meanControl` | 1770.3000000000002 | 1770.7 | 0.0222 | 13 | 6 | 7 | 1 |
| `squadPerformance.meanCohesion` | 1681.2000000000003 | 1719.2 | 2.1111 | 10 | 10 | 0 | 0.002 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 3 seeds that part earliest (simulated seconds)

phase-c-natural-20261012-0003 262.05 s (timeline) · phase-c-natural-20261012-0001 364.05 s (timeline) · phase-c-natural-20261012-0002 375 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1740&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1740`); it opens the seed that parts earliest, and the dropdowns choose another.

