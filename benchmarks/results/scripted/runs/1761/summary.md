# Benchmark run #1761 · 60 seeds from `pr787-m2-20261108` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr787-main-aed0165 @ aed0165 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42434319037) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 17 of 42 counters under p 0.05 (about 2.1 by chance), 12 under 0.0012; casualties -10.2% (p 0.0869)**

- Clears the Bonferroni line (p < 0.0012): fire.total 46766 to 78212 (+67.2%, p 0); movementResolver.changes 211199 to 280851 (+33.0%, p 0); vacantObjectiveStalls.length 100 to 13 (-87.0%, p 0); recon.orders 1967 to 3172 (+61.3%, p 0); recon.contacts 295 to 724 (+145.4%, p 0); recon.cancelled 581 to 1343 (+131.2%, p 0); recon.reportsDelivered 1248 to 2873 (+130.2%, p 0); squadPerformance.meanMission 3925.9 to 3714.3999999999996 (-5.4%, p 0); squadPerformance.meanCohesion 5418.700000000001 to 5549.4000000000015 (+2.4%, p 0); loopAlerts.length 1030 to 1629 (+58.2%, p 0.0001); recon.retriggerBlocked 981 to 1135 (+15.7%, p 0.0001); squadPerformance.meanOverall 4884.9 to 4829.8 (-1.1%, p 0.0006).
- Under 0.05 only: squadPerformance.meanControl 5697.800000000001 to 5633.800000000001 (-1.1%, p 0.0027); geKills 1540 to 1347 (-12.5%, p 0.0105); retreatSamples 136018 to 159619 (+17.4%, p 0.0135); stallOutcomes.wakes 10 to 1 (-90.0%, p 0.0215); usKills 1504 to 1386 (-7.8%, p 0.044).
- Wall time on/off x1.371 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.371 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 3044 | 2733 | -5.1833 | 58 | 22 | 36 | 0.0869 |
| `usKills` | 1504 | 1386 | -1.9667 | 56 | 20 | 36 | 0.044 |
| `geKills` | 1540 | 1347 | -3.2167 | 56 | 18 | 38 | 0.0105 |
| `fire.total` | 46766 | 78212 | 524.1 | 60 | 56 | 4 | 0 |
| `fire.hits` | 6769 | 6428 | -5.6833 | 59 | 26 | 33 | 0.435 |
| `retreatSamples` | 136018 | 159619 | 393.35 | 60 | 40 | 20 | 0.0135 |
| `movementResolver.changes` | 211199 | 280851 | 1160.8667 | 60 | 58 | 2 | 0 |
| `grenades.throws` | 24 | 49 | 0.4167 | 26 | 18 | 8 | 0.0755 |
| `grenades.bursts` | 24 | 48 | 0.4 | 26 | 18 | 8 | 0.0755 |
| `grenades.wounded` | 11 | 21 | 0.1667 | 15 | 9 | 6 | 0.6072 |
| `grenades.casualties` | 3 | 11 | 0.1333 | 8 | 5 | 3 | 0.7266 |
| `grenades.suppressed` | 19 | 49 | 0.5 | 17 | 11 | 6 | 0.3323 |
| `grenades.friendlyWounded` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 4 | 9 | 0.0833 | 9 | 6 | 3 | 0.5078 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 100 | 13 | -1.45 | 40 | 2 | 38 | 0 |
| `loopAlerts.length` | 1030 | 1629 | 9.9833 | 59 | 45 | 14 | 0.0001 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 266 | 306 | 0.6667 | 54 | 32 | 22 | 0.2203 |
| `stallOutcomes.wakes` | 10 | 1 | -0.15 | 10 | 1 | 9 | 0.0215 |
| `stallOutcomes.repeats` | 4 | 0 | -0.0667 | 4 | 0 | 4 | 0.125 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1967 | 3172 | 20.0833 | 60 | 55 | 5 | 0 |
| `recon.contacts` | 295 | 724 | 7.15 | 58 | 52 | 6 | 0 |
| `recon.noContact` | 990 | 1004 | 0.2333 | 54 | 28 | 26 | 0.8919 |
| `recon.timeouts` | 44 | 42 | -0.0333 | 30 | 14 | 16 | 0.8555 |
| `recon.cancelled` | 581 | 1343 | 12.7 | 60 | 55 | 5 | 0 |
| `recon.reportsDelivered` | 1248 | 2873 | 27.0833 | 60 | 49 | 11 | 0 |
| `recon.retriggerBlocked` | 981 | 1135 | 2.5667 | 52 | 40 | 12 | 0.0001 |
| `squadPerformance.meanOverall` | 4884.9 | 4829.8 | -0.9183 | 59 | 16 | 43 | 0.0006 |
| `squadPerformance.p10Overall` | 4460.799999999999 | 4455 | -0.0967 | 21 | 9 | 12 | 0.6636 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3925.9 | 3714.3999999999996 | -3.525 | 59 | 10 | 49 | 0 |
| `squadPerformance.meanMovement` | 5989.100000000001 | 5989.6 | 0.0083 | 36 | 16 | 20 | 0.6177 |
| `squadPerformance.meanControl` | 5697.800000000001 | 5633.800000000001 | -1.0667 | 60 | 18 | 42 | 0.0027 |
| `squadPerformance.meanCohesion` | 5418.700000000001 | 5549.4000000000015 | 2.1783 | 60 | 48 | 12 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr787-m2-20261108-0001 0.15 s (timeline) · pr787-m2-20261108-0002 0.15 s (timeline) · pr787-m2-20261108-0003 0.15 s (timeline) · pr787-m2-20261108-0004 0.15 s (timeline) · pr787-m2-20261108-0005 0.15 s (timeline) · pr787-m2-20261108-0006 0.15 s (timeline) · pr787-m2-20261108-0007 0.15 s (timeline) · pr787-m2-20261108-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1761&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr787-main-aed0165/ai_flow_live.html?bench=1761&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1761`); it opens the seed that parts earliest, and the dropdowns choose another.

