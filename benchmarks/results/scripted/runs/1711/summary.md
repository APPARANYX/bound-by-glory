# Benchmark run #1711 · 60 seeds from `pr781-single-writer` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- main @ 9e6866b · [run](https://github.com/APPARANYX/grasstex/actions/runs/42341721050) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 20 of 42 counters under p 0.05 (about 2.1 by chance), 11 under 0.0012; casualties -1.7% (p 0.5966)**

- Clears the Bonferroni line (p < 0.0012): fire.total 40273 to 71961 (+78.7%, p 0); movementResolver.changes 224107 to 317625 (+41.7%, p 0); vacantObjectiveStalls.length 300 to 62 (-79.3%, p 0); loopAlerts.length 839 to 2409 (+187.1%, p 0); recon.cancelled 491 to 718 (+46.2%, p 0); squadPerformance.meanOverall 4778.9000000000015 to 4679.499999999999 (-2.1%, p 0); squadPerformance.meanMission 3688.8999999999987 to 3454.4999999999995 (-6.4%, p 0); squadPerformance.meanControl 5621.599999999999 to 5338.899999999997 (-5.0%, p 0); squadPerformance.meanCohesion 5470.100000000002 to 5581.7 (+2.0%, p 0); squadPerformance.meanMovement 5985.4000000000015 to 5980.4 (-0.1%, p 0.0005); recon.noContact 1115 to 988 (-11.4%, p 0.0009).
- Under 0.05 only: grenades.throws 26 to 50 (+92.3%, p 0.0015); grenades.bursts 26 to 49 (+88.5%, p 0.0015); recon.retriggerBlocked 1372 to 1514 (+10.3%, p 0.0022); regroups.entries 232 to 319 (+37.5%, p 0.0065); recon.reportsDelivered 452 to 632 (+39.8%, p 0.0065); grenades.wounded 18 to 49 (+172.2%, p 0.0215); recon.contacts 97 to 127 (+30.9%, p 0.0226); recon.orders 1771 to 1908 (+7.7%, p 0.0247); recon.timeouts 21 to 9 (-57.1%, p 0.0347).
- Wall time on/off x1.561 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.561 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2762 | 2716 | -0.7667 | 57 | 26 | 31 | 0.5966 |
| `usKills` | 1259 | 1248 | -0.1833 | 60 | 31 | 29 | 0.8974 |
| `geKills` | 1503 | 1468 | -0.5833 | 58 | 25 | 33 | 0.3581 |
| `fire.total` | 40273 | 71961 | 528.1333 | 60 | 57 | 3 | 0 |
| `fire.hits` | 6017 | 5980 | -0.6167 | 59 | 25 | 34 | 0.2976 |
| `retreatSamples` | 109764 | 121140 | 189.6 | 60 | 34 | 26 | 0.3663 |
| `movementResolver.changes` | 224107 | 317625 | 1558.6333 | 60 | 59 | 1 | 0 |
| `grenades.throws` | 26 | 50 | 0.4 | 21 | 18 | 3 | 0.0015 |
| `grenades.bursts` | 26 | 49 | 0.3833 | 21 | 18 | 3 | 0.0015 |
| `grenades.wounded` | 18 | 49 | 0.5167 | 10 | 9 | 1 | 0.0215 |
| `grenades.casualties` | 8 | 16 | 0.1333 | 7 | 5 | 2 | 0.4531 |
| `grenades.suppressed` | 53 | 96 | 0.7167 | 13 | 9 | 4 | 0.2668 |
| `grenades.friendlyWounded` | 1 | 3 | 0.0333 | 1 | 1 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 4 | 18 | 0.2333 | 11 | 9 | 2 | 0.0654 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 300 | 62 | -3.9667 | 55 | 3 | 52 | 0 |
| `loopAlerts.length` | 839 | 2409 | 26.1667 | 60 | 58 | 2 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 232 | 319 | 1.45 | 55 | 38 | 17 | 0.0065 |
| `stallOutcomes.wakes` | 10 | 6 | -0.0667 | 15 | 6 | 9 | 0.6072 |
| `stallOutcomes.repeats` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1771 | 1908 | 2.2833 | 58 | 38 | 20 | 0.0247 |
| `recon.contacts` | 97 | 127 | 0.5 | 44 | 30 | 14 | 0.0226 |
| `recon.noContact` | 1115 | 988 | -2.1167 | 58 | 16 | 42 | 0.0009 |
| `recon.timeouts` | 21 | 9 | -0.2 | 23 | 6 | 17 | 0.0347 |
| `recon.cancelled` | 491 | 718 | 3.7833 | 57 | 51 | 6 | 0 |
| `recon.reportsDelivered` | 452 | 632 | 3 | 55 | 38 | 17 | 0.0065 |
| `recon.retriggerBlocked` | 1372 | 1514 | 2.3667 | 58 | 41 | 17 | 0.0022 |
| `squadPerformance.meanOverall` | 4778.9000000000015 | 4679.499999999999 | -1.6567 | 59 | 3 | 56 | 0 |
| `squadPerformance.p10Overall` | 4464.8 | 4449 | -0.2633 | 25 | 8 | 17 | 0.1078 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3688.8999999999987 | 3454.4999999999995 | -3.9067 | 60 | 9 | 51 | 0 |
| `squadPerformance.meanMovement` | 5985.4000000000015 | 5980.4 | -0.0833 | 46 | 11 | 35 | 0.0005 |
| `squadPerformance.meanControl` | 5621.599999999999 | 5338.899999999997 | -4.7117 | 60 | 4 | 56 | 0 |
| `squadPerformance.meanCohesion` | 5470.100000000002 | 5581.7 | 1.86 | 60 | 50 | 10 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr781-single-writer-0001 0.15 s (timeline) · pr781-single-writer-0002 0.15 s (timeline) · pr781-single-writer-0003 0.15 s (timeline) · pr781-single-writer-0004 0.15 s (timeline) · pr781-single-writer-0005 0.15 s (timeline) · pr781-single-writer-0006 0.15 s (timeline) · pr781-single-writer-0007 0.15 s (timeline) · pr781-single-writer-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1711&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1711`); it opens the seed that parts earliest, and the dropdowns choose another.

