# Benchmark run #1838 · 3 seeds from `phase-c-natural-20261012` (us-defend), windows `contact+60,every60`

- **OFF** flags: `none` · **ON** flags: `localPlan=1&localAmbush=1&localManeuver=1&coveredBounds=1`
- work/controller-micro-u-20261109 @ 5d7cc87 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42607857115) · build v29-dev

## Verdict

**MOVED: 20 of 20 pairs changed (median first part 245.1 s); 2 of 42 counters under p 0.05 (about 2.1 by chance), 1 under 0.0012; casualties -6.4% (p 0.6072)**

- Clears the Bonferroni line (p < 0.0012): recon.reportsDelivered 206 to 48 (-76.7%, p 0.0005).
- Under 0.05 only: recon.orders 393 to 372 (-5.3%, p 0.0034).

## Paired comparison (off against on)

- **20** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x0.984 (gate 1.25)
- the 19 changed records first part at simulated second: min 206.1, p10 206.1, median 245.1, p90 318, max 318

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 204 | 191 | -0.65 | 15 | 6 | 9 | 0.6072 |
| `usKills` | 148 | 144 | -0.2 | 16 | 6 | 10 | 0.4545 |
| `geKills` | 56 | 47 | -0.45 | 11 | 5 | 6 | 1 |
| `fire.total` | 3466 | 2222 | -62.2 | 19 | 5 | 14 | 0.0636 |
| `fire.hits` | 145 | 222 | 3.85 | 15 | 7 | 8 | 1 |
| `retreatSamples` | 3388 | 2910 | -23.9 | 18 | 8 | 10 | 0.8145 |
| `movementResolver.changes` | 18608 | 17760 | -42.4 | 19 | 9 | 10 | 1 |
| `grenades.throws` | 1 | 0 | -0.05 | 1 | 0 | 1 | 1 |
| `grenades.bursts` | 1 | 0 | -0.05 | 1 | 0 | 1 | 1 |
| `grenades.wounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 2 | 3 | 0.05 | 1 | 1 | 0 | 1 |
| `loopAlerts.length` | 53 | 57 | 0.2 | 14 | 7 | 7 | 1 |
| `writerConflicts` | 404 | 544 | 7 | 6 | 4 | 2 | 0.6875 |
| `regroups.entries` | 12 | 8 | -0.2 | 7 | 2 | 5 | 0.4531 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 1 | 0.05 | 1 | 1 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 3 | 0.15 | 3 | 3 | 0 | 0.25 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 393 | 372 | -1.05 | 13 | 1 | 12 | 0.0034 |
| `recon.contacts` | 40 | 18 | -1.1 | 17 | 5 | 12 | 0.1435 |
| `recon.noContact` | 74 | 77 | 0.15 | 5 | 4 | 1 | 0.375 |
| `recon.timeouts` | 48 | 54 | 0.3 | 5 | 5 | 0 | 0.0625 |
| `recon.cancelled` | 190 | 178 | -0.6 | 15 | 6 | 9 | 0.6072 |
| `recon.reportsDelivered` | 206 | 48 | -7.9 | 12 | 0 | 12 | 0.0005 |
| `recon.retriggerBlocked` | 134 | 135 | 0.05 | 3 | 2 | 1 | 1 |
| `squadPerformance.meanOverall` | 1749.1000000000004 | 1763.8 | 0.735 | 19 | 13 | 6 | 0.1671 |
| `squadPerformance.p10Overall` | 1559.7999999999997 | 1577.4999999999998 | 0.885 | 17 | 9 | 8 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 1 | 0.05 | 1 | 1 | 0 | 1 |
| `squadPerformance.meanMission` | 1453.2 | 1496.9000000000003 | 2.185 | 18 | 11 | 7 | 0.4807 |
| `squadPerformance.meanMovement` | 1936.3000000000004 | 1931.2000000000003 | -0.255 | 15 | 6 | 9 | 0.6072 |
| `squadPerformance.meanControl` | 1963.5 | 1955.3999999999999 | -0.405 | 18 | 8 | 10 | 0.8145 |
| `squadPerformance.meanCohesion` | 1873.3999999999999 | 1862.2999999999997 | -0.555 | 15 | 7 | 8 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 3 seeds that part earliest (simulated seconds)

phase-c-natural-20261012-0002 206.1 s (stress) · phase-c-natural-20261012-0001 245.1 s (timeline) · phase-c-natural-20261012-0003 318 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1838&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/controller-micro-u-20261109/ai_flow_live.html?bench=1838&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1838`); it opens the seed that parts earliest, and the dropdowns choose another.

