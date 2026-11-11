# Benchmark run #1849 · 20 seeds from `815-accept-20261110` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- main @ 24a84de · [run](https://github.com/APPARANYX/bound-by-glory/actions/runs/42937647897) · build v29-dev

## Verdict

**MOVED: 20 of 20 pairs changed (median first part 0.15 s); 14 of 42 counters under p 0.05 (about 2.1 by chance), 8 under 0.0012; casualties -17.1% (p 0.0118)**

- Clears the Bonferroni line (p < 0.0012): fire.total 12674 to 24420 (+92.7%, p 0); movementResolver.changes 71940 to 138957 (+93.2%, p 0); loopAlerts.length 223 to 985 (+341.7%, p 0); squadPerformance.meanOverall 1594.0999999999997 to 1542.0000000000002 (-3.3%, p 0); squadPerformance.meanControl 1871.8 to 1756.4999999999995 (-6.2%, p 0); regroups.entries 85 to 155 (+82.4%, p 0.0001); squadPerformance.meanMovement 1995.5 to 1991.3000000000002 (-0.2%, p 0.0001); recon.noContact 371 to 295 (-20.5%, p 0.0007).
- Under 0.05 only: vacantObjectiveStalls.length 101 to 18 (-82.2%, p 0.0013); squadPerformance.meanMission 1222.6000000000001 to 1123.5 (-8.1%, p 0.0026); squadPerformance.meanCohesion 1826.3 to 1784.8 (-2.3%, p 0.0026); squadPerformance.p10Overall 1489.5000000000002 to 1475.4 (-0.9%, p 0.0074); casualties 906 to 751 (-17.1%, p 0.0118); geKills 521 to 421 (-19.2%, p 0.0118).
- Wall time on/off x1.929 is over the 1.25 gate.

## Paired comparison (off against on)

- **20** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.929 (gate 1.25)
- the 20 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 906 | 751 | -7.75 | 20 | 4 | 16 | 0.0118 |
| `usKills` | 385 | 330 | -2.75 | 19 | 7 | 12 | 0.3593 |
| `geKills` | 521 | 421 | -5 | 20 | 4 | 16 | 0.0118 |
| `fire.total` | 12674 | 24420 | 587.3 | 20 | 20 | 0 | 0 |
| `fire.hits` | 1999 | 1703 | -14.8 | 20 | 7 | 13 | 0.2632 |
| `retreatSamples` | 38833 | 35771 | -153.1 | 20 | 7 | 13 | 0.2632 |
| `movementResolver.changes` | 71940 | 138957 | 3350.85 | 20 | 20 | 0 | 0 |
| `grenades.throws` | 6 | 16 | 0.5 | 7 | 6 | 1 | 0.125 |
| `grenades.bursts` | 6 | 16 | 0.5 | 7 | 6 | 1 | 0.125 |
| `grenades.wounded` | 10 | 15 | 0.25 | 6 | 5 | 1 | 0.2188 |
| `grenades.casualties` | 4 | 3 | -0.05 | 4 | 3 | 1 | 0.625 |
| `grenades.suppressed` | 16 | 20 | 0.2 | 6 | 5 | 1 | 0.2188 |
| `grenades.friendlyWounded` | 0 | 2 | 0.1 | 2 | 2 | 0 | 0.5 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 3 | 2 | -0.05 | 3 | 1 | 2 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 101 | 18 | -4.15 | 18 | 2 | 16 | 0.0013 |
| `loopAlerts.length` | 223 | 985 | 38.1 | 20 | 20 | 0 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 85 | 155 | 3.5 | 18 | 17 | 1 | 0.0001 |
| `stallOutcomes.wakes` | 1 | 4 | 0.15 | 5 | 4 | 1 | 0.375 |
| `stallOutcomes.repeats` | 0 | 4 | 0.2 | 4 | 4 | 0 | 0.125 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 589 | 541 | -2.4 | 18 | 8 | 10 | 0.8145 |
| `recon.contacts` | 24 | 31 | 0.35 | 18 | 12 | 6 | 0.2379 |
| `recon.noContact` | 371 | 295 | -3.8 | 19 | 2 | 17 | 0.0007 |
| `recon.timeouts` | 7 | 2 | -0.25 | 8 | 2 | 6 | 0.2891 |
| `recon.cancelled` | 165 | 198 | 1.65 | 20 | 12 | 8 | 0.5034 |
| `recon.reportsDelivered` | 111 | 110 | -0.05 | 18 | 11 | 7 | 0.4807 |
| `recon.retriggerBlocked` | 464 | 460 | -0.2 | 19 | 8 | 11 | 0.6476 |
| `squadPerformance.meanOverall` | 1594.0999999999997 | 1542.0000000000002 | -2.605 | 20 | 0 | 20 | 0 |
| `squadPerformance.p10Overall` | 1489.5000000000002 | 1475.4 | -0.705 | 15 | 2 | 13 | 0.0074 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 1222.6000000000001 | 1123.5 | -4.955 | 20 | 3 | 17 | 0.0026 |
| `squadPerformance.meanMovement` | 1995.5 | 1991.3000000000002 | -0.21 | 18 | 1 | 17 | 0.0001 |
| `squadPerformance.meanControl` | 1871.8 | 1756.4999999999995 | -5.765 | 20 | 1 | 19 | 0 |
| `squadPerformance.meanCohesion` | 1826.3 | 1784.8 | -2.075 | 20 | 3 | 17 | 0.0026 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

815-accept-20261110-0001 0.15 s (timeline) · 815-accept-20261110-0002 0.15 s (timeline) · 815-accept-20261110-0003 0.15 s (timeline) · 815-accept-20261110-0004 0.15 s (timeline) · 815-accept-20261110-0005 0.15 s (timeline) · 815-accept-20261110-0006 0.15 s (timeline) · 815-accept-20261110-0007 0.15 s (timeline) · 815-accept-20261110-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1849&repo=APPARANYX%2Fbound-by-glory&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1849`); it opens the seed that parts earliest, and the dropdowns choose another.

