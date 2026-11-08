# Benchmark run #1786 · 48 seeds from `pr793-brief900-20261108` (meeting), windows `0+900`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr793-156811c @ 156811c · [run](https://github.com/APPARANYX/grasstex/actions/runs/42493956629) · build v29-dev

## Verdict

**MOVED: 48 of 48 pairs changed (median first part 0.15 s); 12 of 42 counters under p 0.05 (about 2.1 by chance), 9 under 0.0012; casualties -6.8% (p 0.0133)**

- Clears the Bonferroni line (p < 0.0012): fire.total 35573 to 55156 (+55.1%, p 0); movementResolver.changes 191608 to 266986 (+39.3%, p 0); vacantObjectiveStalls.length 341 to 72 (-78.9%, p 0); loopAlerts.length 827 to 1760 (+112.8%, p 0); squadPerformance.meanOverall 3802.8999999999996 to 3737.600000000001 (-1.7%, p 0); squadPerformance.meanMission 2948.1000000000004 to 2731.9 (-7.3%, p 0); squadPerformance.meanControl 4427 to 4283.4 (-3.2%, p 0); squadPerformance.meanMovement 4787.300000000001 to 4781.599999999999 (-0.1%, p 0.0001); squadPerformance.meanCohesion 4357.5 to 4479.5 (+2.8%, p 0.0002).
- Under 0.05 only: recon.noContact 1057 to 931 (-11.9%, p 0.0013); recon.cancelled 510 to 669 (+31.2%, p 0.0016); casualties 2321 to 2164 (-6.8%, p 0.0133).
- Wall time on/off x1.421 is over the 1.25 gate.

## Paired comparison (off against on)

- **48** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.421 (gate 1.25)
- the 48 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2321 | 2164 | -3.2708 | 48 | 15 | 33 | 0.0133 |
| `usKills` | 1030 | 930 | -2.0833 | 48 | 21 | 27 | 0.4709 |
| `geKills` | 1291 | 1234 | -1.1875 | 46 | 19 | 27 | 0.302 |
| `fire.total` | 35573 | 55156 | 407.9792 | 48 | 39 | 9 | 0 |
| `fire.hits` | 5033 | 4818 | -4.4792 | 48 | 22 | 26 | 0.6655 |
| `retreatSamples` | 140189 | 147067 | 143.2917 | 48 | 25 | 23 | 0.8854 |
| `movementResolver.changes` | 191608 | 266986 | 1570.375 | 48 | 44 | 4 | 0 |
| `grenades.throws` | 31 | 50 | 0.3958 | 19 | 13 | 6 | 0.1671 |
| `grenades.bursts` | 31 | 50 | 0.3958 | 19 | 13 | 6 | 0.1671 |
| `grenades.wounded` | 48 | 48 | 0 | 14 | 8 | 6 | 0.7905 |
| `grenades.casualties` | 17 | 15 | -0.0417 | 12 | 6 | 6 | 1 |
| `grenades.suppressed` | 107 | 102 | -0.1042 | 17 | 10 | 7 | 0.6291 |
| `grenades.friendlyWounded` | 0 | 1 | 0.0208 | 1 | 1 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 6 | 19 | 0.2708 | 14 | 11 | 3 | 0.0574 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 341 | 72 | -5.6042 | 47 | 3 | 44 | 0 |
| `loopAlerts.length` | 827 | 1760 | 19.4375 | 47 | 42 | 5 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 275 | 320 | 0.9375 | 46 | 27 | 19 | 0.302 |
| `stallOutcomes.wakes` | 15 | 7 | -0.1667 | 15 | 4 | 11 | 0.1185 |
| `stallOutcomes.repeats` | 4 | 3 | -0.0208 | 7 | 3 | 4 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1753 | 1821 | 1.4167 | 44 | 28 | 16 | 0.0961 |
| `recon.contacts` | 91 | 107 | 0.3333 | 37 | 20 | 17 | 0.7428 |
| `recon.noContact` | 1057 | 931 | -2.625 | 44 | 11 | 33 | 0.0013 |
| `recon.timeouts` | 12 | 16 | 0.0833 | 16 | 10 | 6 | 0.4545 |
| `recon.cancelled` | 510 | 669 | 3.3125 | 46 | 34 | 12 | 0.0016 |
| `recon.reportsDelivered` | 446 | 481 | 0.7292 | 41 | 20 | 21 | 1 |
| `recon.retriggerBlocked` | 1315 | 1386 | 1.4792 | 45 | 28 | 17 | 0.1352 |
| `squadPerformance.meanOverall` | 3802.8999999999996 | 3737.600000000001 | -1.3604 | 47 | 7 | 40 | 0 |
| `squadPerformance.p10Overall` | 3561.8 | 3557.7000000000007 | -0.0854 | 21 | 9 | 12 | 0.6636 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 2948.1000000000004 | 2731.9 | -4.5042 | 48 | 7 | 41 | 0 |
| `squadPerformance.meanMovement` | 4787.300000000001 | 4781.599999999999 | -0.1187 | 39 | 7 | 32 | 0.0001 |
| `squadPerformance.meanControl` | 4427 | 4283.4 | -2.9917 | 48 | 8 | 40 | 0 |
| `squadPerformance.meanCohesion` | 4357.5 | 4479.5 | 2.5417 | 48 | 37 | 11 | 0.0002 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr793-brief900-20261108-0001 0.15 s (timeline) · pr793-brief900-20261108-0002 0.15 s (timeline) · pr793-brief900-20261108-0003 0.15 s (timeline) · pr793-brief900-20261108-0004 0.15 s (timeline) · pr793-brief900-20261108-0005 0.15 s (timeline) · pr793-brief900-20261108-0006 0.15 s (timeline) · pr793-brief900-20261108-0007 0.15 s (timeline) · pr793-brief900-20261108-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1786&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr793-156811c/ai_flow_live.html?bench=1786&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1786`); it opens the seed that parts earliest, and the dropdowns choose another.

