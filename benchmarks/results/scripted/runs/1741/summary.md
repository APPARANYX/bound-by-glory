# Benchmark run #1741 · 3 seeds from `phase-c-natural-20261012` (us-defend), windows `contact+60,every60`

- **OFF** flags: `none` · **ON** flags: `localPlan=1&localAmbush=1&localManeuver=1&coveredBounds=1`
- claude/project-thread-c78ew0 @ 5986524 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42414830235) · build v29-dev

## Verdict

**MOVED: 20 of 20 pairs changed (median first part 252 s); 4 of 42 counters under p 0.05 (about 2.1 by chance), 3 under 0.0012; casualties -6.6% (p 0.4807)**

- Clears the Bonferroni line (p < 0.0012): recon.orders 415 to 358 (-13.7%, p 0); geKills 56 to 31 (-44.6%, p 0.0005); recon.cancelled 197 to 140 (-28.9%, p 0.0005).
- Under 0.05 only: recon.reportsDelivered 226 to 97 (-57.1%, p 0.0225).

## Paired comparison (off against on)

- **20** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x0.999 (gate 1.25)
- the 19 changed records first part at simulated second: min 205.05, p10 205.05, median 252, p90 313.05, max 313.05

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 228 | 213 | -0.75 | 18 | 11 | 7 | 0.4807 |
| `usKills` | 172 | 182 | 0.5 | 17 | 12 | 5 | 0.1435 |
| `geKills` | 56 | 31 | -1.25 | 12 | 0 | 12 | 0.0005 |
| `fire.total` | 2398 | 1949 | -22.45 | 18 | 6 | 12 | 0.2379 |
| `fire.hits` | 149 | 126 | -1.15 | 14 | 7 | 7 | 1 |
| `retreatSamples` | 3654 | 3834 | 9 | 18 | 8 | 10 | 0.8145 |
| `movementResolver.changes` | 17590 | 18894 | 65.2 | 19 | 8 | 11 | 0.6476 |
| `grenades.throws` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 2 | 4 | 0.1 | 2 | 2 | 0 | 0.5 |
| `loopAlerts.length` | 54 | 66 | 0.6 | 15 | 11 | 4 | 0.1185 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 4 | 7 | 0.15 | 3 | 3 | 0 | 0.25 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 415 | 358 | -2.85 | 18 | 0 | 18 | 0 |
| `recon.contacts` | 37 | 26 | -0.55 | 15 | 6 | 9 | 0.6072 |
| `recon.noContact` | 80 | 86 | 0.3 | 7 | 6 | 1 | 0.125 |
| `recon.timeouts` | 58 | 61 | 0.15 | 2 | 2 | 0 | 0.5 |
| `recon.cancelled` | 197 | 140 | -2.85 | 16 | 1 | 15 | 0.0005 |
| `recon.reportsDelivered` | 226 | 97 | -6.45 | 13 | 2 | 11 | 0.0225 |
| `recon.retriggerBlocked` | 139 | 122 | -0.85 | 15 | 5 | 10 | 0.3018 |
| `squadPerformance.meanOverall` | 1750.7999999999995 | 1736.9000000000003 | -0.695 | 19 | 8 | 11 | 0.6476 |
| `squadPerformance.p10Overall` | 1548.4999999999995 | 1531.3 | -0.86 | 19 | 7 | 12 | 0.3593 |
| `squadPerformance.lowScoreSquads` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 1468.3999999999999 | 1436.5000000000002 | -1.595 | 17 | 7 | 10 | 0.6291 |
| `squadPerformance.meanMovement` | 1915.1999999999994 | 1922.8999999999999 | 0.385 | 17 | 10 | 7 | 0.6291 |
| `squadPerformance.meanControl` | 1972.9999999999998 | 1963 | -0.5 | 16 | 4 | 12 | 0.0768 |
| `squadPerformance.meanCohesion` | 1859.9 | 1841.4000000000003 | -0.925 | 16 | 7 | 9 | 0.8036 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 3 seeds that part earliest (simulated seconds)

phase-c-natural-20261012-0002 205.05 s (timeline) · phase-c-natural-20261012-0001 252 s (timeline) · phase-c-natural-20261012-0003 313.05 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1741&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1741`); it opens the seed that parts earliest, and the dropdowns choose another.

