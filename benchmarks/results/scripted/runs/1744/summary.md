# Benchmark run #1744 · 60 seeds from `pr787-m0m1-20261107` (ge-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr787-dd122c3 @ dd122c3 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42423006162) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 20 of 42 counters under p 0.05 (about 2.1 by chance), 13 under 0.0012; casualties -8.1% (p 0.044)**

- Clears the Bonferroni line (p < 0.0012): fire.total 44987 to 67899 (+50.9%, p 0); movementResolver.changes 200883 to 280567 (+39.7%, p 0); vacantObjectiveStalls.length 78 to 17 (-78.2%, p 0); recon.orders 2020 to 3399 (+68.3%, p 0); recon.contacts 327 to 774 (+136.7%, p 0); recon.cancelled 602 to 1599 (+165.6%, p 0); recon.reportsDelivered 1456 to 2950 (+102.6%, p 0); recon.retriggerBlocked 935 to 1119 (+19.7%, p 0); squadPerformance.meanCohesion 5405.900000000002 to 5565.299999999999 (+2.9%, p 0); squadPerformance.meanControl 5696.700000000002 to 5629.200000000001 (-1.2%, p 0.0006); squadPerformance.meanOverall 4898.999999999999 to 4842.399999999999 (-1.2%, p 0.0009); retreatSamples 122375 to 148651 (+21.5%, p 0.0011); squadPerformance.meanMission 3943.5999999999995 to 3744.899999999999 (-5.0%, p 0.0011).
- Under 0.05 only: recon.timeouts 55 to 36 (-34.5%, p 0.0059); loopAlerts.length 1089 to 1435 (+31.8%, p 0.0065); grenades.throws 51 to 82 (+60.8%, p 0.0146); grenades.bursts 51 to 82 (+60.8%, p 0.0146); grenades.wounded 30 to 61 (+103.3%, p 0.0309); usKills 1166 to 1032 (-11.5%, p 0.0331); casualties 3003 to 2761 (-8.1%, p 0.044).
- Wall time on/off x1.438 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.438 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 3003 | 2761 | -4.0333 | 56 | 20 | 36 | 0.044 |
| `usKills` | 1166 | 1032 | -2.2333 | 57 | 20 | 37 | 0.0331 |
| `geKills` | 1837 | 1729 | -1.8 | 59 | 27 | 32 | 0.6029 |
| `fire.total` | 44987 | 67899 | 381.8667 | 60 | 54 | 6 | 0 |
| `fire.hits` | 6466 | 6102 | -6.0667 | 60 | 28 | 32 | 0.6989 |
| `retreatSamples` | 122375 | 148651 | 437.9333 | 60 | 43 | 17 | 0.0011 |
| `movementResolver.changes` | 200883 | 280567 | 1328.0667 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 51 | 82 | 0.5167 | 25 | 19 | 6 | 0.0146 |
| `grenades.bursts` | 51 | 82 | 0.5167 | 25 | 19 | 6 | 0.0146 |
| `grenades.wounded` | 30 | 61 | 0.5167 | 18 | 14 | 4 | 0.0309 |
| `grenades.casualties` | 11 | 27 | 0.2667 | 14 | 11 | 3 | 0.0574 |
| `grenades.suppressed` | 79 | 163 | 1.4 | 22 | 16 | 6 | 0.0525 |
| `grenades.friendlyWounded` | 3 | 2 | -0.0167 | 3 | 1 | 2 | 1 |
| `grenades.friendlyCasualties` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `grenades.aborted` | 8 | 12 | 0.0667 | 9 | 7 | 2 | 0.1797 |
| `movementStalls.length` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 78 | 17 | -1.0167 | 40 | 7 | 33 | 0 |
| `loopAlerts.length` | 1089 | 1435 | 5.7667 | 55 | 38 | 17 | 0.0065 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 253 | 236 | -0.2833 | 50 | 26 | 24 | 0.8877 |
| `stallOutcomes.wakes` | 8 | 2 | -0.1 | 8 | 1 | 7 | 0.0703 |
| `stallOutcomes.repeats` | 3 | 0 | -0.05 | 3 | 0 | 3 | 0.25 |
| `timeline.stalledOnsets` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 16 | 0.2667 | 1 | 1 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 16 | 0.2667 | 1 | 1 | 0 | 1 |
| `recon.orders` | 2020 | 3399 | 22.9833 | 60 | 57 | 3 | 0 |
| `recon.contacts` | 327 | 774 | 7.45 | 59 | 55 | 4 | 0 |
| `recon.noContact` | 990 | 931 | -0.9833 | 55 | 25 | 30 | 0.5901 |
| `recon.timeouts` | 55 | 36 | -0.3167 | 27 | 6 | 21 | 0.0059 |
| `recon.cancelled` | 602 | 1599 | 16.6167 | 57 | 56 | 1 | 0 |
| `recon.reportsDelivered` | 1456 | 2950 | 24.9 | 60 | 51 | 9 | 0 |
| `recon.retriggerBlocked` | 935 | 1119 | 3.0667 | 56 | 46 | 10 | 0 |
| `squadPerformance.meanOverall` | 4898.999999999999 | 4842.399999999999 | -0.9433 | 58 | 16 | 42 | 0.0009 |
| `squadPerformance.p10Overall` | 4467.199999999999 | 4460 | -0.12 | 28 | 11 | 17 | 0.3449 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3943.5999999999995 | 3744.899999999999 | -3.3117 | 60 | 17 | 43 | 0.0011 |
| `squadPerformance.meanMovement` | 5990.4 | 5990.799999999998 | 0.0067 | 33 | 19 | 14 | 0.4869 |
| `squadPerformance.meanControl` | 5696.700000000002 | 5629.200000000001 | -1.125 | 59 | 16 | 43 | 0.0006 |
| `squadPerformance.meanCohesion` | 5405.900000000002 | 5565.299999999999 | 2.6567 | 60 | 49 | 11 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr787-m0m1-20261107-0001 0.15 s (timeline) · pr787-m0m1-20261107-0002 0.15 s (timeline) · pr787-m0m1-20261107-0003 0.15 s (timeline) · pr787-m0m1-20261107-0004 0.15 s (timeline) · pr787-m0m1-20261107-0005 0.15 s (timeline) · pr787-m0m1-20261107-0006 0.15 s (timeline) · pr787-m0m1-20261107-0007 0.15 s (timeline) · pr787-m0m1-20261107-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1744&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr787-dd122c3/ai_flow_live.html?bench=1744&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1744`); it opens the seed that parts earliest, and the dropdowns choose another.

