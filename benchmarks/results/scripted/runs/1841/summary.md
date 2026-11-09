# Benchmark run #1841 · 3 seeds from `phase-c-natural-20261012` (us-defend), windows `contact+60,every60`

- **OFF** flags: `none` · **ON** flags: `localPlan=1&localAmbush=1&localManeuver=1&coveredBounds=1`
- work/controller-s1b-s1f-20261108 @ ccc696d · [run](https://github.com/APPARANYX/grasstex/actions/runs/42608883881) · build v29-dev

## Verdict

**MOVED: 21 of 21 pairs changed (median first part 249 s); 7 of 42 counters under p 0.05 (about 2.1 by chance), 3 under 0.0012; casualties -6.4% (p 0.5811)**

- Clears the Bonferroni line (p < 0.0012): retreatSamples 2964 to 2097 (-29.3%, p 0); squadPerformance.meanMission 1604.7 to 1684.8999999999999 (+5.0%, p 0); recon.orders 464 to 411 (-11.4%, p 0.0001).
- Under 0.05 only: recon.cancelled 217 to 180 (-17.1%, p 0.0042); squadPerformance.meanOverall 1875 to 1900.8 (+1.4%, p 0.0192); timeline.stalledOnsetsRepeated 0 to 21 (new, p 0.0313); timeline.stalledSamplesRepeated 0 to 124 (new, p 0.0313).

## Paired comparison (off against on)

- **21** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.016 (gate 1.25)
- the 21 changed records first part at simulated second: min 168, p10 168, median 249, p90 258, max 258

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 236 | 221 | -0.7143 | 13 | 5 | 8 | 0.5811 |
| `usKills` | 165 | 131 | -1.619 | 12 | 3 | 9 | 0.146 |
| `geKills` | 71 | 90 | 0.9048 | 9 | 7 | 2 | 0.1797 |
| `fire.total` | 2612 | 2756 | 6.8571 | 19 | 10 | 9 | 1 |
| `fire.hits` | 140 | 162 | 1.0476 | 14 | 8 | 6 | 0.7905 |
| `retreatSamples` | 2964 | 2097 | -41.2857 | 20 | 1 | 19 | 0 |
| `movementResolver.changes` | 17451 | 17318 | -6.3333 | 21 | 12 | 9 | 0.6636 |
| `grenades.throws` | 1 | 0 | -0.0476 | 1 | 0 | 1 | 1 |
| `grenades.bursts` | 1 | 0 | -0.0476 | 1 | 0 | 1 | 1 |
| `grenades.wounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 9 | 0.4286 | 4 | 4 | 0 | 0.125 |
| `routeStalls.length` | 0 | 1 | 0.0476 | 1 | 1 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 3 | 4 | 0.0476 | 1 | 1 | 0 | 1 |
| `loopAlerts.length` | 50 | 53 | 0.1429 | 14 | 9 | 5 | 0.424 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 15 | 10 | -0.2381 | 6 | 2 | 4 | 0.6875 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 10 | 0.4762 | 4 | 4 | 0 | 0.125 |
| `timeline.stalledSamples` | 0 | 63 | 3 | 4 | 4 | 0 | 0.125 |
| `timeline.stalledOnsetsRepeated` | 0 | 21 | 1 | 6 | 6 | 0 | 0.0313 |
| `timeline.stalledSamplesRepeated` | 0 | 124 | 5.9048 | 6 | 6 | 0 | 0.0313 |
| `recon.orders` | 464 | 411 | -2.5238 | 19 | 1 | 18 | 0.0001 |
| `recon.contacts` | 45 | 41 | -0.1905 | 17 | 8 | 9 | 1 |
| `recon.noContact` | 85 | 77 | -0.381 | 5 | 0 | 5 | 0.0625 |
| `recon.timeouts` | 62 | 57 | -0.2381 | 7 | 1 | 6 | 0.125 |
| `recon.cancelled` | 217 | 180 | -1.7619 | 16 | 2 | 14 | 0.0042 |
| `recon.reportsDelivered` | 235 | 234 | -0.0476 | 14 | 5 | 9 | 0.424 |
| `recon.retriggerBlocked` | 157 | 140 | -0.8095 | 15 | 6 | 9 | 0.6072 |
| `squadPerformance.meanOverall` | 1875 | 1900.8 | 1.2286 | 19 | 15 | 4 | 0.0192 |
| `squadPerformance.p10Overall` | 1668.8999999999994 | 1713.3999999999996 | 2.119 | 17 | 11 | 6 | 0.3323 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 1604.7 | 1684.8999999999999 | 3.819 | 20 | 19 | 1 | 0 |
| `squadPerformance.meanMovement` | 2032.1 | 2018.7000000000003 | -0.6381 | 19 | 7 | 12 | 0.3593 |
| `squadPerformance.meanControl` | 2071.3999999999996 | 2063.7000000000003 | -0.3667 | 17 | 5 | 12 | 0.1435 |
| `squadPerformance.meanCohesion` | 1982.5 | 2011.1000000000001 | 1.3619 | 18 | 8 | 10 | 0.8145 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 3 seeds that part earliest (simulated seconds)

phase-c-natural-20261012-0002 168 s (timeline) · phase-c-natural-20261012-0003 249 s (timeline) · phase-c-natural-20261012-0001 258 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1841&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/controller-s1b-s1f-20261108/ai_flow_live.html?bench=1841&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1841`); it opens the seed that parts earliest, and the dropdowns choose another.

