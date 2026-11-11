# Benchmark run #1855 · 20 seeds from `815-accept-20261110` (ge-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- main @ 24a84de · [run](https://github.com/APPARANYX/bound-by-glory/actions/runs/42950252905) · build v29-dev

## Verdict

**MOVED: 20 of 20 pairs changed (median first part 0.15 s); 17 of 42 counters under p 0.05 (about 2.1 by chance), 10 under 0.0012; casualties -28.1% (p 0.0004)**

- Clears the Bonferroni line (p < 0.0012): movementResolver.changes 62724 to 97483 (+55.4%, p 0); loopAlerts.length 244 to 626 (+156.6%, p 0); recon.orders 611 to 1229 (+101.1%, p 0); recon.contacts 73 to 304 (+316.4%, p 0); recon.noContact 334 to 229 (-31.4%, p 0); recon.cancelled 168 to 639 (+280.4%, p 0); casualties 944 to 679 (-28.1%, p 0.0004); recon.reportsDelivered 354 to 1193 (+237.0%, p 0.0004); squadPerformance.meanControl 1911.0999999999995 to 1835.8 (-3.9%, p 0.0004); usKills 325 to 187 (-42.5%, p 0.0007).
- Under 0.05 only: vacantObjectiveStalls.length 24 to 0 (-100.0%, p 0.002); squadPerformance.meanMovement 1997.2000000000003 to 1995.6999999999998 (-0.1%, p 0.0034); fire.total 13887 to 19482 (+40.3%, p 0.0118); fire.hits 2063 to 1579 (-23.5%, p 0.0118); squadPerformance.meanOverall 1643.2 to 1614.1000000000001 (-1.8%, p 0.0118); recon.retriggerBlocked 315 to 356 (+13.0%, p 0.0127); squadPerformance.meanMission 1336.1000000000004 to 1271.3999999999996 (-4.8%, p 0.0414).
- Wall time on/off x1.635 is over the 1.25 gate.

## Paired comparison (off against on)

- **20** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.635 (gate 1.25)
- the 20 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 944 | 679 | -13.25 | 20 | 2 | 18 | 0.0004 |
| `usKills` | 325 | 187 | -6.9 | 19 | 2 | 17 | 0.0007 |
| `geKills` | 619 | 492 | -6.35 | 17 | 5 | 12 | 0.1435 |
| `fire.total` | 13887 | 19482 | 279.75 | 20 | 16 | 4 | 0.0118 |
| `fire.hits` | 2063 | 1579 | -24.2 | 20 | 4 | 16 | 0.0118 |
| `retreatSamples` | 39555 | 37725 | -91.5 | 20 | 9 | 11 | 0.8238 |
| `movementResolver.changes` | 62724 | 97483 | 1737.95 | 20 | 20 | 0 | 0 |
| `grenades.throws` | 10 | 24 | 0.7 | 5 | 4 | 1 | 0.375 |
| `grenades.bursts` | 10 | 24 | 0.7 | 5 | 4 | 1 | 0.375 |
| `grenades.wounded` | 8 | 17 | 0.45 | 3 | 3 | 0 | 0.25 |
| `grenades.casualties` | 3 | 7 | 0.2 | 3 | 3 | 0 | 0.25 |
| `grenades.suppressed` | 14 | 35 | 1.05 | 4 | 4 | 0 | 0.125 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 1 | 7 | 0.3 | 3 | 2 | 1 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 24 | 0 | -1.2 | 10 | 0 | 10 | 0.002 |
| `loopAlerts.length` | 244 | 626 | 19.1 | 20 | 19 | 1 | 0 |
| `writerConflicts` | 0 | 4 | 0.2 | 2 | 2 | 0 | 0.5 |
| `regroups.entries` | 70 | 91 | 1.05 | 18 | 10 | 8 | 0.8145 |
| `stallOutcomes.wakes` | 3 | 3 | 0 | 6 | 3 | 3 | 1 |
| `stallOutcomes.repeats` | 2 | 0 | -0.1 | 2 | 0 | 2 | 0.5 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 611 | 1229 | 30.9 | 20 | 20 | 0 | 0 |
| `recon.contacts` | 73 | 304 | 11.55 | 20 | 19 | 1 | 0 |
| `recon.noContact` | 334 | 229 | -5.25 | 20 | 0 | 20 | 0 |
| `recon.timeouts` | 21 | 32 | 0.55 | 12 | 7 | 5 | 0.7744 |
| `recon.cancelled` | 168 | 639 | 23.55 | 20 | 20 | 0 | 0 |
| `recon.reportsDelivered` | 354 | 1193 | 41.95 | 20 | 18 | 2 | 0.0004 |
| `recon.retriggerBlocked` | 315 | 356 | 2.05 | 17 | 14 | 3 | 0.0127 |
| `squadPerformance.meanOverall` | 1643.2 | 1614.1000000000001 | -1.455 | 20 | 4 | 16 | 0.0118 |
| `squadPerformance.p10Overall` | 1501.6 | 1487 | -0.73 | 9 | 2 | 7 | 0.1797 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 1336.1000000000004 | 1271.3999999999996 | -3.235 | 20 | 5 | 15 | 0.0414 |
| `squadPerformance.meanMovement` | 1997.2000000000003 | 1995.6999999999998 | -0.075 | 13 | 1 | 12 | 0.0034 |
| `squadPerformance.meanControl` | 1911.0999999999995 | 1835.8 | -3.765 | 20 | 2 | 18 | 0.0004 |
| `squadPerformance.meanCohesion` | 1801.8000000000002 | 1782.7999999999995 | -0.95 | 20 | 11 | 9 | 0.8238 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

815-accept-20261110-0001 0.15 s (timeline) · 815-accept-20261110-0002 0.15 s (timeline) · 815-accept-20261110-0003 0.15 s (timeline) · 815-accept-20261110-0004 0.15 s (timeline) · 815-accept-20261110-0005 0.15 s (timeline) · 815-accept-20261110-0006 0.15 s (timeline) · 815-accept-20261110-0007 0.15 s (timeline) · 815-accept-20261110-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1855&repo=APPARANYX%2Fbound-by-glory&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1855`); it opens the seed that parts earliest, and the dropdowns choose another.

