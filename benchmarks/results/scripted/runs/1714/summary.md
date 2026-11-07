# Benchmark run #1714 · 60 seeds from `pr781-single-writer` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- main @ 9e6866b · [run](https://github.com/APPARANYX/grasstex/actions/runs/42341900620) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 14 of 42 counters under p 0.05 (about 2.1 by chance), 12 under 0.0012; casualties -4.7% (p 0.3409)**

- Clears the Bonferroni line (p < 0.0012): fire.total 40134 to 68608 (+70.9%, p 0); retreatSamples 118388 to 151587 (+28.0%, p 0); movementResolver.changes 167374 to 222590 (+33.0%, p 0); vacantObjectiveStalls.length 97 to 19 (-80.4%, p 0); loopAlerts.length 815 to 1609 (+97.4%, p 0); recon.orders 1635 to 2670 (+63.3%, p 0); recon.contacts 246 to 588 (+139.0%, p 0); recon.cancelled 548 to 1216 (+121.9%, p 0); recon.reportsDelivered 1164 to 2340 (+101.0%, p 0); squadPerformance.meanOverall 4887.800000000001 to 4799.1 (-1.8%, p 0); squadPerformance.meanMission 3922.2 to 3664.6000000000004 (-6.6%, p 0); squadPerformance.meanCohesion 5453.800000000001 to 5586.199999999999 (+2.4%, p 0).
- Under 0.05 only: squadPerformance.meanControl 5677.700000000001 to 5621.000000000002 (-1.0%, p 0.0222); recon.retriggerBlocked 767 to 865 (+12.8%, p 0.0293).
- Wall time on/off x1.499 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.499 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2467 | 2352 | -1.9167 | 54 | 23 | 31 | 0.3409 |
| `usKills` | 1161 | 1169 | 0.1333 | 54 | 27 | 27 | 1 |
| `geKills` | 1306 | 1183 | -2.05 | 52 | 20 | 32 | 0.1263 |
| `fire.total` | 40134 | 68608 | 474.5667 | 58 | 55 | 3 | 0 |
| `fire.hits` | 5587 | 5292 | -4.9167 | 58 | 27 | 31 | 0.694 |
| `retreatSamples` | 118388 | 151587 | 553.3167 | 58 | 45 | 13 | 0 |
| `movementResolver.changes` | 167374 | 222590 | 920.2667 | 60 | 57 | 3 | 0 |
| `grenades.throws` | 52 | 59 | 0.1167 | 22 | 15 | 7 | 0.1338 |
| `grenades.bursts` | 52 | 59 | 0.1167 | 22 | 15 | 7 | 0.1338 |
| `grenades.wounded` | 39 | 53 | 0.2333 | 13 | 8 | 5 | 0.5811 |
| `grenades.casualties` | 15 | 24 | 0.15 | 11 | 7 | 4 | 0.5488 |
| `grenades.suppressed` | 113 | 112 | -0.0167 | 16 | 10 | 6 | 0.4545 |
| `grenades.friendlyWounded` | 2 | 1 | -0.0167 | 2 | 1 | 1 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 4 | 9 | 0.0833 | 6 | 5 | 1 | 0.2188 |
| `movementStalls.length` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 97 | 19 | -1.3 | 44 | 3 | 41 | 0 |
| `loopAlerts.length` | 815 | 1609 | 13.2333 | 57 | 50 | 7 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 197 | 254 | 0.95 | 49 | 30 | 19 | 0.1524 |
| `stallOutcomes.wakes` | 10 | 2 | -0.1333 | 11 | 2 | 9 | 0.0654 |
| `stallOutcomes.repeats` | 2 | 0 | -0.0333 | 2 | 0 | 2 | 0.5 |
| `timeline.stalledOnsets` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamples` | 4 | 0 | -0.0667 | 1 | 0 | 1 | 1 |
| `timeline.stalledOnsetsRepeated` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamplesRepeated` | 4 | 0 | -0.0667 | 1 | 0 | 1 | 1 |
| `recon.orders` | 1635 | 2670 | 17.25 | 59 | 59 | 0 | 0 |
| `recon.contacts` | 246 | 588 | 5.7 | 53 | 48 | 5 | 0 |
| `recon.noContact` | 750 | 773 | 0.3833 | 51 | 26 | 25 | 1 |
| `recon.timeouts` | 36 | 26 | -0.1667 | 30 | 10 | 20 | 0.0987 |
| `recon.cancelled` | 548 | 1216 | 11.1333 | 59 | 58 | 1 | 0 |
| `recon.reportsDelivered` | 1164 | 2340 | 19.6 | 58 | 48 | 10 | 0 |
| `recon.retriggerBlocked` | 767 | 865 | 1.6333 | 48 | 32 | 16 | 0.0293 |
| `squadPerformance.meanOverall` | 4887.800000000001 | 4799.1 | -1.4783 | 60 | 6 | 54 | 0 |
| `squadPerformance.p10Overall` | 4506.3 | 4485.9 | -0.34 | 26 | 9 | 17 | 0.1686 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3922.2 | 3664.6000000000004 | -4.2933 | 58 | 3 | 55 | 0 |
| `squadPerformance.meanMovement` | 5991.199999999998 | 5990.700000000002 | -0.0083 | 29 | 13 | 16 | 0.7111 |
| `squadPerformance.meanControl` | 5677.700000000001 | 5621.000000000002 | -0.945 | 56 | 19 | 37 | 0.0222 |
| `squadPerformance.meanCohesion` | 5453.800000000001 | 5586.199999999999 | 2.2067 | 59 | 53 | 6 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr781-single-writer-0001 0.15 s (timeline) · pr781-single-writer-0002 0.15 s (timeline) · pr781-single-writer-0003 0.15 s (timeline) · pr781-single-writer-0004 0.15 s (timeline) · pr781-single-writer-0005 0.15 s (timeline) · pr781-single-writer-0006 0.15 s (timeline) · pr781-single-writer-0007 0.15 s (timeline) · pr781-single-writer-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1714&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1714`); it opens the seed that parts earliest, and the dropdowns choose another.

