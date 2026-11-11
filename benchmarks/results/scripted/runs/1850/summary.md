# Benchmark run #1850 · 20 seeds from `815-accept-20261110` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- main @ 24a84de · [run](https://github.com/APPARANYX/bound-by-glory/actions/runs/42939940206) · build v29-dev

## Verdict

**MOVED: 20 of 20 pairs changed (median first part 0.15 s); 18 of 42 counters under p 0.05 (about 2.1 by chance), 12 under 0.0012; casualties -35.1% (p 0)**

- Clears the Bonferroni line (p < 0.0012): casualties 1024 to 665 (-35.1%, p 0); usKills 507 to 288 (-43.2%, p 0); movementResolver.changes 68489 to 94966 (+38.7%, p 0); loopAlerts.length 316 to 718 (+127.2%, p 0); recon.orders 646 to 1173 (+81.6%, p 0); recon.contacts 86 to 270 (+214.0%, p 0); recon.noContact 335 to 259 (-22.7%, p 0); recon.cancelled 184 to 601 (+226.6%, p 0); recon.reportsDelivered 339 to 1057 (+211.8%, p 0); vacantObjectiveStalls.length 46 to 4 (-91.3%, p 0.0001); fire.total 17318 to 26572 (+53.4%, p 0.0004); squadPerformance.meanControl 1895.8 to 1846.1 (-2.6%, p 0.0004).
- Under 0.05 only: fire.hits 2370 to 1638 (-30.9%, p 0.0026); squadPerformance.meanMission 1312.6999999999996 to 1238.3 (-5.7%, p 0.0026); squadPerformance.meanOverall 1629.3999999999999 to 1608.1999999999996 (-1.3%, p 0.0044); grenades.throws 1 to 18 (+1700.0%, p 0.0078); grenades.bursts 1 to 16 (+1500.0%, p 0.0156); geKills 517 to 377 (-27.1%, p 0.049).
- Wall time on/off x1.657 is over the 1.25 gate.

## Paired comparison (off against on)

- **20** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.657 (gate 1.25)
- the 20 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 1024 | 665 | -17.95 | 19 | 0 | 19 | 0 |
| `usKills` | 507 | 288 | -10.95 | 19 | 0 | 19 | 0 |
| `geKills` | 517 | 377 | -7 | 17 | 4 | 13 | 0.049 |
| `fire.total` | 17318 | 26572 | 462.7 | 20 | 18 | 2 | 0.0004 |
| `fire.hits` | 2370 | 1638 | -36.6 | 20 | 3 | 17 | 0.0026 |
| `retreatSamples` | 41995 | 39616 | -118.95 | 20 | 8 | 12 | 0.5034 |
| `movementResolver.changes` | 68489 | 94966 | 1323.85 | 20 | 20 | 0 | 0 |
| `grenades.throws` | 1 | 18 | 0.85 | 8 | 8 | 0 | 0.0078 |
| `grenades.bursts` | 1 | 16 | 0.75 | 7 | 7 | 0 | 0.0156 |
| `grenades.wounded` | 0 | 5 | 0.25 | 3 | 3 | 0 | 0.25 |
| `grenades.casualties` | 0 | 2 | 0.1 | 1 | 1 | 0 | 1 |
| `grenades.suppressed` | 0 | 24 | 1.2 | 3 | 3 | 0 | 0.25 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 2 | 0.1 | 2 | 2 | 0 | 0.5 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 46 | 4 | -2.1 | 18 | 1 | 17 | 0.0001 |
| `loopAlerts.length` | 316 | 718 | 20.1 | 20 | 19 | 1 | 0 |
| `writerConflicts` | 0 | 8 | 0.4 | 4 | 4 | 0 | 0.125 |
| `regroups.entries` | 86 | 112 | 1.3 | 17 | 11 | 6 | 0.3323 |
| `stallOutcomes.wakes` | 5 | 3 | -0.1 | 4 | 1 | 3 | 0.625 |
| `stallOutcomes.repeats` | 3 | 0 | -0.15 | 3 | 0 | 3 | 0.25 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 646 | 1173 | 26.35 | 20 | 20 | 0 | 0 |
| `recon.contacts` | 86 | 270 | 9.2 | 20 | 19 | 1 | 0 |
| `recon.noContact` | 335 | 259 | -3.8 | 17 | 0 | 17 | 0 |
| `recon.timeouts` | 21 | 26 | 0.25 | 13 | 7 | 6 | 1 |
| `recon.cancelled` | 184 | 601 | 20.85 | 20 | 20 | 0 | 0 |
| `recon.reportsDelivered` | 339 | 1057 | 35.9 | 20 | 19 | 1 | 0 |
| `recon.retriggerBlocked` | 334 | 356 | 1.1 | 15 | 11 | 4 | 0.1185 |
| `squadPerformance.meanOverall` | 1629.3999999999999 | 1608.1999999999996 | -1.06 | 19 | 3 | 16 | 0.0044 |
| `squadPerformance.p10Overall` | 1489.5 | 1489.8 | 0.015 | 12 | 6 | 6 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 1312.6999999999996 | 1238.3 | -3.72 | 20 | 3 | 17 | 0.0026 |
| `squadPerformance.meanMovement` | 1996.9000000000003 | 1995.8999999999999 | -0.05 | 13 | 3 | 10 | 0.0923 |
| `squadPerformance.meanControl` | 1895.8 | 1846.1 | -2.485 | 20 | 2 | 18 | 0.0004 |
| `squadPerformance.meanCohesion` | 1807.3999999999999 | 1805.8 | -0.08 | 20 | 11 | 9 | 0.8238 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

815-accept-20261110-0001 0.15 s (timeline) · 815-accept-20261110-0002 0.15 s (timeline) · 815-accept-20261110-0003 0.15 s (timeline) · 815-accept-20261110-0004 0.15 s (timeline) · 815-accept-20261110-0005 0.15 s (timeline) · 815-accept-20261110-0006 0.15 s (timeline) · 815-accept-20261110-0007 0.15 s (timeline) · 815-accept-20261110-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1850&repo=APPARANYX%2Fbound-by-glory&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1850`); it opens the seed that parts earliest, and the dropdowns choose another.

