# Benchmark run #1751 · 48 seeds from `pr787-recon900-20261107` (meeting), windows `0+900`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr787-dd122c3 @ dd122c3 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42423211453) · build v29-dev

## Verdict

**MOVED: 48 of 48 pairs changed (median first part 0.15 s); 15 of 42 counters under p 0.05 (about 2.1 by chance), 10 under 0.0012; casualties -9.4% (p 0.0114)**

- Clears the Bonferroni line (p < 0.0012): fire.total 38039 to 58058 (+52.6%, p 0); movementResolver.changes 197306 to 260215 (+31.9%, p 0); vacantObjectiveStalls.length 328 to 56 (-82.9%, p 0); loopAlerts.length 1025 to 1918 (+87.1%, p 0); recon.noContact 1025 to 859 (-16.2%, p 0); squadPerformance.meanOverall 3794.300000000001 to 3738 (-1.5%, p 0); squadPerformance.meanControl 4469.099999999999 to 4256.4 (-4.8%, p 0); recon.cancelled 457 to 660 (+44.4%, p 0.0001); squadPerformance.meanMission 2886.8999999999983 to 2760.0000000000005 (-4.4%, p 0.0003); squadPerformance.meanCohesion 4408.099999999999 to 4469.6 (+1.4%, p 0.0011).
- Under 0.05 only: recon.timeouts 21 to 3 (-85.7%, p 0.0026); usKills 1132 to 886 (-21.7%, p 0.0055); casualties 2425 to 2197 (-9.4%, p 0.0114); grenades.throws 28 to 37 (+32.1%, p 0.0347); grenades.bursts 28 to 37 (+32.1%, p 0.0347).
- Wall time on/off x1.336 is over the 1.25 gate.

## Paired comparison (off against on)

- **48** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.336 (gate 1.25)
- the 48 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2425 | 2197 | -4.75 | 46 | 14 | 32 | 0.0114 |
| `usKills` | 1132 | 886 | -5.125 | 48 | 14 | 34 | 0.0055 |
| `geKills` | 1293 | 1311 | 0.375 | 45 | 24 | 21 | 0.766 |
| `fire.total` | 38039 | 58058 | 417.0625 | 48 | 39 | 9 | 0 |
| `fire.hits` | 5354 | 4868 | -10.125 | 48 | 18 | 30 | 0.1114 |
| `retreatSamples` | 169729 | 129800 | -831.8542 | 48 | 17 | 31 | 0.0595 |
| `movementResolver.changes` | 197306 | 260215 | 1310.6042 | 48 | 44 | 4 | 0 |
| `grenades.throws` | 28 | 37 | 0.1875 | 23 | 17 | 6 | 0.0347 |
| `grenades.bursts` | 28 | 37 | 0.1875 | 23 | 17 | 6 | 0.0347 |
| `grenades.wounded` | 35 | 24 | -0.2292 | 11 | 7 | 4 | 0.5488 |
| `grenades.casualties` | 15 | 11 | -0.0833 | 9 | 5 | 4 | 1 |
| `grenades.suppressed` | 61 | 52 | -0.1875 | 13 | 9 | 4 | 0.2668 |
| `grenades.friendlyWounded` | 1 | 0 | -0.0208 | 1 | 0 | 1 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 5 | 7 | 0.0417 | 9 | 5 | 4 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 328 | 56 | -5.6667 | 43 | 3 | 40 | 0 |
| `loopAlerts.length` | 1025 | 1918 | 18.6042 | 48 | 43 | 5 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 286 | 298 | 0.25 | 43 | 23 | 20 | 0.7608 |
| `stallOutcomes.wakes` | 14 | 5 | -0.1875 | 14 | 3 | 11 | 0.0574 |
| `stallOutcomes.repeats` | 5 | 4 | -0.0208 | 7 | 3 | 4 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1664 | 1710 | 0.9583 | 48 | 25 | 23 | 0.8854 |
| `recon.contacts` | 91 | 102 | 0.2292 | 36 | 18 | 18 | 1 |
| `recon.noContact` | 1025 | 859 | -3.4583 | 45 | 8 | 37 | 0 |
| `recon.timeouts` | 21 | 3 | -0.375 | 20 | 3 | 17 | 0.0026 |
| `recon.cancelled` | 457 | 660 | 4.2292 | 47 | 37 | 10 | 0.0001 |
| `recon.reportsDelivered` | 397 | 475 | 1.625 | 43 | 26 | 17 | 0.2221 |
| `recon.retriggerBlocked` | 1250 | 1308 | 1.2083 | 46 | 25 | 21 | 0.6587 |
| `squadPerformance.meanOverall` | 3794.300000000001 | 3738 | -1.1729 | 48 | 9 | 39 | 0 |
| `squadPerformance.p10Overall` | 3567.999999999999 | 3565.2999999999997 | -0.0562 | 25 | 10 | 15 | 0.4244 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 2886.8999999999983 | 2760.0000000000005 | -2.6438 | 47 | 11 | 36 | 0.0003 |
| `squadPerformance.meanMovement` | 4787.400000000001 | 4783.700000000001 | -0.0771 | 33 | 11 | 22 | 0.0801 |
| `squadPerformance.meanControl` | 4469.099999999999 | 4256.4 | -4.4313 | 48 | 5 | 43 | 0 |
| `squadPerformance.meanCohesion` | 4408.099999999999 | 4469.6 | 1.2813 | 47 | 35 | 12 | 0.0011 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr787-recon900-20261107-0001 0.15 s (timeline) · pr787-recon900-20261107-0002 0.15 s (timeline) · pr787-recon900-20261107-0003 0.15 s (timeline) · pr787-recon900-20261107-0004 0.15 s (timeline) · pr787-recon900-20261107-0005 0.15 s (timeline) · pr787-recon900-20261107-0006 0.15 s (timeline) · pr787-recon900-20261107-0007 0.15 s (timeline) · pr787-recon900-20261107-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1751&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr787-dd122c3/ai_flow_live.html?bench=1751&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1751`); it opens the seed that parts earliest, and the dropdowns choose another.

