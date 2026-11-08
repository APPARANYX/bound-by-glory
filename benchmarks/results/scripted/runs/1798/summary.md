# Benchmark run #1798 · 48 seeds from `pr795-transport900-20261108` (us-defend), windows `0+900`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr795-504f69e3 @ 504f69e · [run](https://github.com/APPARANYX/grasstex/actions/runs/42519150419) · build v29-dev

## Verdict

**MOVED: 48 of 48 pairs changed (median first part 0.15 s); 22 of 42 counters under p 0.05 (about 2.1 by chance), 16 under 0.0012; casualties -22.0% (p 0)**

- Clears the Bonferroni line (p < 0.0012): casualties 3502 to 2730 (-22.0%, p 0); usKills 1581 to 1071 (-32.3%, p 0); fire.total 57550 to 85954 (+49.4%, p 0); fire.hits 7645 to 6186 (-19.1%, p 0); movementResolver.changes 236549 to 376719 (+59.3%, p 0); vacantObjectiveStalls.length 261 to 79 (-69.7%, p 0); loopAlerts.length 1300 to 2545 (+95.8%, p 0); recon.orders 2101 to 3686 (+75.4%, p 0); recon.contacts 323 to 751 (+132.5%, p 0); recon.cancelled 636 to 1823 (+186.6%, p 0); recon.reportsDelivered 1272 to 2678 (+110.5%, p 0); squadPerformance.meanOverall 3830.7000000000003 to 3777.6 (-1.4%, p 0); squadPerformance.meanMission 2985.9 to 2827.7 (-5.3%, p 0); squadPerformance.meanControl 4517.4 to 4407.599999999999 (-2.4%, p 0); regroups.entries 386 to 627 (+62.4%, p 0.0001); recon.retriggerBlocked 1069 to 1270 (+18.8%, p 0.0005).
- Under 0.05 only: squadPerformance.p10Overall 3558.9 to 3549.7000000000003 (-0.3%, p 0.0034); squadPerformance.meanMovement 4787.900000000002 to 4785.6 (-0.0%, p 0.0064); geKills 1921 to 1659 (-13.6%, p 0.0186); grenades.throws 54 to 73 (+35.2%, p 0.029); grenades.bursts 54 to 73 (+35.2%, p 0.029); grenades.suppressed 40 to 96 (+140.0%, p 0.0352).
- Wall time on/off x1.535 is over the 1.25 gate.

## Paired comparison (off against on)

- **48** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.535 (gate 1.25)
- the 48 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 3502 | 2730 | -16.0833 | 45 | 3 | 42 | 0 |
| `usKills` | 1581 | 1071 | -10.625 | 47 | 6 | 41 | 0 |
| `geKills` | 1921 | 1659 | -5.4583 | 47 | 15 | 32 | 0.0186 |
| `fire.total` | 57550 | 85954 | 591.75 | 48 | 45 | 3 | 0 |
| `fire.hits` | 7645 | 6186 | -30.3958 | 48 | 9 | 39 | 0 |
| `retreatSamples` | 249536 | 257139 | 158.3958 | 48 | 25 | 23 | 0.8854 |
| `movementResolver.changes` | 236549 | 376719 | 2920.2083 | 48 | 48 | 0 | 0 |
| `grenades.throws` | 54 | 73 | 0.3958 | 26 | 19 | 7 | 0.029 |
| `grenades.bursts` | 54 | 73 | 0.3958 | 26 | 19 | 7 | 0.029 |
| `grenades.wounded` | 26 | 35 | 0.1875 | 11 | 7 | 4 | 0.5488 |
| `grenades.casualties` | 7 | 17 | 0.2083 | 10 | 7 | 3 | 0.3438 |
| `grenades.suppressed` | 40 | 96 | 1.1667 | 15 | 12 | 3 | 0.0352 |
| `grenades.friendlyWounded` | 1 | 2 | 0.0208 | 1 | 1 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 1 | 0.0208 | 1 | 1 | 0 | 1 |
| `grenades.aborted` | 5 | 19 | 0.2917 | 10 | 7 | 3 | 0.3438 |
| `movementStalls.length` | 1 | 0 | -0.0208 | 1 | 0 | 1 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 261 | 79 | -3.7917 | 45 | 5 | 40 | 0 |
| `loopAlerts.length` | 1300 | 2545 | 25.9375 | 48 | 44 | 4 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 386 | 627 | 5.0208 | 44 | 35 | 9 | 0.0001 |
| `stallOutcomes.wakes` | 17 | 15 | -0.0417 | 21 | 9 | 12 | 0.6636 |
| `stallOutcomes.repeats` | 7 | 7 | 0 | 12 | 6 | 6 | 1 |
| `timeline.stalledOnsets` | 1 | 0 | -0.0208 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamples` | 137 | 0 | -2.8542 | 1 | 0 | 1 | 1 |
| `timeline.stalledOnsetsRepeated` | 1 | 0 | -0.0208 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamplesRepeated` | 137 | 0 | -2.8542 | 1 | 0 | 1 | 1 |
| `recon.orders` | 2101 | 3686 | 33.0208 | 48 | 47 | 1 | 0 |
| `recon.contacts` | 323 | 751 | 8.9167 | 44 | 43 | 1 | 0 |
| `recon.noContact` | 1031 | 986 | -0.9375 | 45 | 23 | 22 | 1 |
| `recon.timeouts` | 63 | 62 | -0.0208 | 27 | 13 | 14 | 1 |
| `recon.cancelled` | 636 | 1823 | 24.7292 | 48 | 46 | 2 | 0 |
| `recon.reportsDelivered` | 1272 | 2678 | 29.2917 | 47 | 43 | 4 | 0 |
| `recon.retriggerBlocked` | 1069 | 1270 | 4.1875 | 46 | 35 | 11 | 0.0005 |
| `squadPerformance.meanOverall` | 3830.7000000000003 | 3777.6 | -1.1062 | 46 | 4 | 42 | 0 |
| `squadPerformance.p10Overall` | 3558.9 | 3549.7000000000003 | -0.1917 | 13 | 1 | 12 | 0.0034 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 2985.9 | 2827.7 | -3.2958 | 48 | 7 | 41 | 0 |
| `squadPerformance.meanMovement` | 4787.900000000002 | 4785.6 | -0.0479 | 40 | 11 | 29 | 0.0064 |
| `squadPerformance.meanControl` | 4517.4 | 4407.599999999999 | -2.2875 | 47 | 9 | 38 | 0 |
| `squadPerformance.meanCohesion` | 4379 | 4386.699999999999 | 0.1604 | 48 | 25 | 23 | 0.8854 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr795-transport900-20261108-0001 0.15 s (timeline) · pr795-transport900-20261108-0002 0.15 s (timeline) · pr795-transport900-20261108-0003 0.15 s (timeline) · pr795-transport900-20261108-0004 0.15 s (timeline) · pr795-transport900-20261108-0005 0.15 s (timeline) · pr795-transport900-20261108-0006 0.15 s (timeline) · pr795-transport900-20261108-0007 0.15 s (timeline) · pr795-transport900-20261108-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1798&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr795-504f69e3/ai_flow_live.html?bench=1798&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1798`); it opens the seed that parts earliest, and the dropdowns choose another.

