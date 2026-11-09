# Benchmark run #1840 · 3 seeds from `phase-c-natural-20261012` (meeting), windows `contact+60,every60`

- **OFF** flags: `none` · **ON** flags: `localPlan=1&localAmbush=1&localManeuver=1&coveredBounds=1`
- work/controller-micro-u-20261109 @ 5d7cc87 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42607859128) · build v29-dev

## Verdict

**QUIET: 18 of 18 pairs changed (median first part 292.05 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties +6.6% (p 0.2891)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **18** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.084 (gate 1.25)
- the 9 changed records first part at simulated second: min 292.05, p10 292.05, median 292.05, p90 472.05, max 472.05

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 151 | 161 | 0.5556 | 8 | 6 | 2 | 0.2891 |
| `usKills` | 96 | 103 | 0.3889 | 4 | 3 | 1 | 0.625 |
| `geKills` | 55 | 58 | 0.1667 | 6 | 4 | 2 | 0.6875 |
| `fire.total` | 3014 | 2984 | -1.6667 | 6 | 4 | 2 | 0.6875 |
| `fire.hits` | 100 | 110 | 0.5556 | 6 | 4 | 2 | 0.6875 |
| `retreatSamples` | 3443 | 3364 | -4.3889 | 8 | 3 | 5 | 0.7266 |
| `movementResolver.changes` | 18828 | 17322 | -83.6667 | 9 | 2 | 7 | 0.1797 |
| `grenades.throws` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 2 | 4 | 0.1111 | 3 | 2 | 1 | 1 |
| `loopAlerts.length` | 34 | 36 | 0.1111 | 5 | 2 | 3 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 29 | 27 | -0.1111 | 3 | 1 | 2 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 208 | 206 | -0.1111 | 7 | 3 | 4 | 1 |
| `recon.contacts` | 20 | 18 | -0.1111 | 5 | 1 | 4 | 0.375 |
| `recon.noContact` | 12 | 13 | 0.0556 | 2 | 1 | 1 | 1 |
| `recon.timeouts` | 63 | 60 | -0.1667 | 3 | 0 | 3 | 0.25 |
| `recon.cancelled` | 75 | 77 | 0.1111 | 3 | 2 | 1 | 1 |
| `recon.reportsDelivered` | 64 | 55 | -0.5 | 8 | 3 | 5 | 0.7266 |
| `recon.retriggerBlocked` | 67 | 60 | -0.3889 | 5 | 1 | 4 | 0.375 |
| `squadPerformance.meanOverall` | 1542.3999999999999 | 1540.6999999999998 | -0.0944 | 8 | 5 | 3 | 0.7266 |
| `squadPerformance.p10Overall` | 1384.1999999999998 | 1378.8 | -0.3 | 8 | 2 | 6 | 0.2891 |
| `squadPerformance.lowScoreSquads` | 1 | 0 | -0.0556 | 1 | 0 | 1 | 1 |
| `squadPerformance.meanMission` | 1198.2 | 1198.2 | 0 | 8 | 4 | 4 | 1 |
| `squadPerformance.meanMovement` | 1722 | 1714.3999999999999 | -0.4222 | 8 | 3 | 5 | 0.7266 |
| `squadPerformance.meanControl` | 1781.2999999999997 | 1779.8999999999996 | -0.0778 | 6 | 4 | 2 | 0.6875 |
| `squadPerformance.meanCohesion` | 1700.2000000000003 | 1707.8 | 0.4222 | 8 | 5 | 3 | 0.7266 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 2 seeds that part earliest (simulated seconds)

phase-c-natural-20261012-0002 292.05 s (timeline) · phase-c-natural-20261012-0001 472.05 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1840&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/controller-micro-u-20261109/ai_flow_live.html?bench=1840&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1840`); it opens the seed that parts earliest, and the dropdowns choose another.

