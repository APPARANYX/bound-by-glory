# Benchmark run #1697 · 60 seeds from `controller-natural-20261026` (ge-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/pin/pr778-e4278914 @ e427891 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42338957945) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 18 of 42 counters under p 0.05 (about 2.1 by chance), 11 under 0.0012; casualties -2.9% (p 0.1839)**

- Clears the Bonferroni line (p < 0.0012): fire.total 31367 to 51972 (+65.7%, p 0); movementResolver.changes 134099 to 187585 (+39.9%, p 0); recon.orders 1507 to 2472 (+64.0%, p 0); recon.contacts 226 to 565 (+150.0%, p 0); recon.noContact 696 to 558 (-19.8%, p 0); recon.cancelled 459 to 1243 (+170.8%, p 0); recon.reportsDelivered 889 to 2135 (+140.2%, p 0); squadPerformance.meanMission 4284.099999999999 to 4014.2999999999993 (-6.3%, p 0); squadPerformance.meanCohesion 5351.300000000001 to 5583.900000000001 (+4.3%, p 0); vacantObjectiveStalls.length 71 to 17 (-76.1%, p 0.0003); loopAlerts.length 834 to 1061 (+27.2%, p 0.0009).
- Under 0.05 only: retreatSamples 88001 to 111622 (+26.8%, p 0.0026); grenades.suppressed 40 to 104 (+160.0%, p 0.0039); grenades.wounded 17 to 41 (+141.2%, p 0.0078); grenades.throws 34 to 55 (+61.8%, p 0.0192); grenades.bursts 34 to 55 (+61.8%, p 0.0192); stallOutcomes.wakes 10 to 2 (-80.0%, p 0.0215); squadPerformance.meanOverall 5036 to 4977.9 (-1.2%, p 0.0363).
- Wall time on/off x1.449 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.449 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2135 | 2074 | -1.0167 | 46 | 18 | 28 | 0.1839 |
| `usKills` | 893 | 793 | -1.6667 | 45 | 17 | 28 | 0.1352 |
| `geKills` | 1242 | 1281 | 0.65 | 50 | 27 | 23 | 0.6718 |
| `fire.total` | 31367 | 51972 | 343.4167 | 50 | 46 | 4 | 0 |
| `fire.hits` | 4608 | 4633 | 0.4167 | 50 | 27 | 23 | 0.6718 |
| `retreatSamples` | 88001 | 111622 | 393.6833 | 50 | 36 | 14 | 0.0026 |
| `movementResolver.changes` | 134099 | 187585 | 891.4333 | 60 | 59 | 1 | 0 |
| `grenades.throws` | 34 | 55 | 0.35 | 19 | 15 | 4 | 0.0192 |
| `grenades.bursts` | 34 | 55 | 0.35 | 19 | 15 | 4 | 0.0192 |
| `grenades.wounded` | 17 | 41 | 0.4 | 8 | 8 | 0 | 0.0078 |
| `grenades.casualties` | 8 | 17 | 0.15 | 5 | 5 | 0 | 0.0625 |
| `grenades.suppressed` | 40 | 104 | 1.0667 | 9 | 9 | 0 | 0.0039 |
| `grenades.friendlyWounded` | 0 | 5 | 0.0833 | 4 | 4 | 0 | 0.125 |
| `grenades.friendlyCasualties` | 0 | 2 | 0.0333 | 2 | 2 | 0 | 0.5 |
| `grenades.aborted` | 6 | 8 | 0.0333 | 8 | 5 | 3 | 0.7266 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 71 | 17 | -0.9 | 33 | 6 | 27 | 0.0003 |
| `loopAlerts.length` | 834 | 1061 | 3.7833 | 50 | 37 | 13 | 0.0009 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 158 | 174 | 0.2667 | 44 | 22 | 22 | 1 |
| `stallOutcomes.wakes` | 10 | 2 | -0.1333 | 10 | 1 | 9 | 0.0215 |
| `stallOutcomes.repeats` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1507 | 2472 | 16.0833 | 59 | 58 | 1 | 0 |
| `recon.contacts` | 226 | 565 | 5.65 | 48 | 41 | 7 | 0 |
| `recon.noContact` | 696 | 558 | -2.3 | 56 | 11 | 45 | 0 |
| `recon.timeouts` | 54 | 37 | -0.2833 | 25 | 11 | 14 | 0.69 |
| `recon.cancelled` | 459 | 1243 | 13.0667 | 60 | 59 | 1 | 0 |
| `recon.reportsDelivered` | 889 | 2135 | 20.7667 | 48 | 42 | 6 | 0 |
| `recon.retriggerBlocked` | 672 | 731 | 0.9833 | 41 | 26 | 15 | 0.1173 |
| `squadPerformance.meanOverall` | 5036 | 4977.9 | -0.9683 | 59 | 21 | 38 | 0.0363 |
| `squadPerformance.p10Overall` | 4649.8 | 4665.900000000001 | 0.2683 | 41 | 25 | 16 | 0.211 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4284.099999999999 | 4014.2999999999993 | -4.4967 | 50 | 8 | 42 | 0 |
| `squadPerformance.meanMovement` | 5992.999999999999 | 5991.999999999998 | -0.0167 | 30 | 13 | 17 | 0.5847 |
| `squadPerformance.meanControl` | 5705.199999999999 | 5662.9 | -0.705 | 50 | 19 | 31 | 0.1189 |
| `squadPerformance.meanCohesion` | 5351.300000000001 | 5583.900000000001 | 3.8767 | 60 | 53 | 7 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 0.15 s (timeline) · controller-natural-20261026-0002 0.15 s (timeline) · controller-natural-20261026-0003 0.15 s (timeline) · controller-natural-20261026-0004 0.15 s (timeline) · controller-natural-20261026-0005 0.15 s (timeline) · controller-natural-20261026-0006 0.15 s (timeline) · controller-natural-20261026-0007 0.15 s (timeline) · controller-natural-20261026-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1697&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr778-e4278914/ai_flow_live.html?bench=1697&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1697`); it opens the seed that parts earliest, and the dropdowns choose another.

