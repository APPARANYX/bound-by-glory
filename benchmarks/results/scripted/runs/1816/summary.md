# Benchmark run #1816 · 48 seeds from `pr796-phase900-20261108` (us-defend), windows `0+900`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr796-0cac14f @ 0cac14f · [run](https://github.com/APPARANYX/grasstex/actions/runs/42536691561) · build v29-dev

## Verdict

**MOVED: 45 of 45 pairs changed (median first part 0.15 s); 19 of 42 counters under p 0.05 (about 2.1 by chance), 16 under 0.0012; casualties -22.2% (p 0)**

- Clears the Bonferroni line (p < 0.0012): casualties 3138 to 2440 (-22.2%, p 0); fire.total 51508 to 83648 (+62.4%, p 0); fire.hits 7062 to 5501 (-22.1%, p 0); movementResolver.changes 228285 to 340292 (+49.1%, p 0); vacantObjectiveStalls.length 241 to 41 (-83.0%, p 0); loopAlerts.length 1104 to 2202 (+99.5%, p 0); regroups.entries 361 to 594 (+64.5%, p 0); recon.orders 2031 to 3381 (+66.5%, p 0); recon.contacts 269 to 769 (+185.9%, p 0); recon.cancelled 612 to 1624 (+165.4%, p 0); recon.reportsDelivered 1013 to 2778 (+174.2%, p 0); squadPerformance.meanOverall 3595.2000000000007 to 3540.2999999999993 (-1.5%, p 0); squadPerformance.meanMission 2807.9000000000005 to 2646.9 (-5.7%, p 0); squadPerformance.meanMovement 4490.100000000001 to 4485 (-0.1%, p 0); squadPerformance.meanControl 4226.8 to 4141.300000000001 (-2.0%, p 0); geKills 1733 to 1326 (-23.5%, p 0.0004).
- Under 0.05 only: recon.noContact 1002 to 859 (-14.3%, p 0.0029); usKills 1405 to 1114 (-20.7%, p 0.0066); squadPerformance.p10Overall 3332.7 to 3327.9 (-0.1%, p 0.0391).
- Wall time on/off x1.642 is over the 1.25 gate.
- Unpaired records: off 3, on 0 (a seed or checkpoint only one arm reached: the flag changed how long the battle lasted, or a shard failed).

## Paired comparison (off against on)

- **45** pairs (unpaired: off 3, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.642 (gate 1.25)
- the 45 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 3138 | 2440 | -15.5111 | 44 | 2 | 42 | 0 |
| `usKills` | 1405 | 1114 | -6.4667 | 45 | 13 | 32 | 0.0066 |
| `geKills` | 1733 | 1326 | -9.0444 | 44 | 10 | 34 | 0.0004 |
| `fire.total` | 51508 | 83648 | 714.2222 | 45 | 43 | 2 | 0 |
| `fire.hits` | 7062 | 5501 | -34.6889 | 44 | 7 | 37 | 0 |
| `retreatSamples` | 240956 | 246167 | 115.8 | 45 | 21 | 24 | 0.766 |
| `movementResolver.changes` | 228285 | 340292 | 2489.0444 | 45 | 45 | 0 | 0 |
| `grenades.throws` | 50 | 59 | 0.2 | 20 | 13 | 7 | 0.2632 |
| `grenades.bursts` | 50 | 58 | 0.1778 | 20 | 13 | 7 | 0.2632 |
| `grenades.wounded` | 23 | 25 | 0.0444 | 10 | 6 | 4 | 0.7539 |
| `grenades.casualties` | 11 | 13 | 0.0444 | 8 | 5 | 3 | 0.7266 |
| `grenades.suppressed` | 40 | 52 | 0.2667 | 14 | 8 | 6 | 0.7905 |
| `grenades.friendlyWounded` | 4 | 0 | -0.0889 | 1 | 0 | 1 | 1 |
| `grenades.friendlyCasualties` | 2 | 0 | -0.0444 | 1 | 0 | 1 | 1 |
| `grenades.aborted` | 7 | 8 | 0.0222 | 8 | 4 | 4 | 1 |
| `movementStalls.length` | 0 | 1 | 0.0222 | 1 | 1 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 241 | 41 | -4.4444 | 43 | 2 | 41 | 0 |
| `loopAlerts.length` | 1104 | 2202 | 24.4 | 45 | 44 | 1 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 361 | 594 | 5.1778 | 41 | 36 | 5 | 0 |
| `stallOutcomes.wakes` | 8 | 7 | -0.0222 | 13 | 7 | 6 | 1 |
| `stallOutcomes.repeats` | 0 | 3 | 0.0667 | 3 | 3 | 0 | 0.25 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2031 | 3381 | 30 | 44 | 43 | 1 | 0 |
| `recon.contacts` | 269 | 769 | 11.1111 | 45 | 43 | 2 | 0 |
| `recon.noContact` | 1002 | 859 | -3.1778 | 42 | 11 | 31 | 0.0029 |
| `recon.timeouts` | 74 | 61 | -0.2889 | 33 | 13 | 20 | 0.2962 |
| `recon.cancelled` | 612 | 1624 | 22.4889 | 44 | 44 | 0 | 0 |
| `recon.reportsDelivered` | 1013 | 2778 | 39.2222 | 45 | 40 | 5 | 0 |
| `recon.retriggerBlocked` | 1051 | 1144 | 2.0667 | 41 | 24 | 17 | 0.3489 |
| `squadPerformance.meanOverall` | 3595.2000000000007 | 3540.2999999999993 | -1.22 | 44 | 5 | 39 | 0 |
| `squadPerformance.p10Overall` | 3332.7 | 3327.9 | -0.1067 | 9 | 1 | 8 | 0.0391 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 2807.9000000000005 | 2646.9 | -3.5778 | 45 | 8 | 37 | 0 |
| `squadPerformance.meanMovement` | 4490.100000000001 | 4485 | -0.1133 | 36 | 4 | 32 | 0 |
| `squadPerformance.meanControl` | 4226.8 | 4141.300000000001 | -1.9 | 45 | 8 | 37 | 0 |
| `squadPerformance.meanCohesion` | 4102.8 | 4111.0999999999985 | 0.1844 | 45 | 19 | 26 | 0.3713 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr796-phase900-20261108-0001 0.15 s (timeline) · pr796-phase900-20261108-0002 0.15 s (timeline) · pr796-phase900-20261108-0003 0.15 s (timeline) · pr796-phase900-20261108-0004 0.15 s (timeline) · pr796-phase900-20261108-0005 0.15 s (timeline) · pr796-phase900-20261108-0006 0.15 s (timeline) · pr796-phase900-20261108-0007 0.15 s (timeline) · pr796-phase900-20261108-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1816&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr796-0cac14f/ai_flow_live.html?bench=1816&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1816`); it opens the seed that parts earliest, and the dropdowns choose another.

