# Benchmark run #1816 · 48 seeds from `pr796-phase900-20261108` (us-defend), windows `0+900`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr796-0cac14f @ 0cac14f · [run](https://github.com/APPARANYX/grasstex/actions/runs/42536691561) · build v29-dev

## Verdict

**MOVED: 48 of 48 pairs changed (median first part 0.15 s); 19 of 42 counters under p 0.05 (about 2.1 by chance), 16 under 0.0012; casualties -22.4% (p 0)**

- Clears the Bonferroni line (p < 0.0012): casualties 3345 to 2596 (-22.4%, p 0); fire.total 55073 to 88636 (+60.9%, p 0); fire.hits 7544 to 5851 (-22.4%, p 0); movementResolver.changes 244293 to 364486 (+49.2%, p 0); vacantObjectiveStalls.length 253 to 43 (-83.0%, p 0); loopAlerts.length 1181 to 2407 (+103.8%, p 0); regroups.entries 399 to 632 (+58.4%, p 0); recon.orders 2168 to 3635 (+67.7%, p 0); recon.contacts 285 to 829 (+190.9%, p 0); recon.cancelled 666 to 1754 (+163.4%, p 0); recon.reportsDelivered 1084 to 3004 (+177.1%, p 0); squadPerformance.meanOverall 3831.900000000001 to 3774.6999999999994 (-1.5%, p 0); squadPerformance.meanMission 2990.3000000000006 to 2818.1000000000004 (-5.8%, p 0); squadPerformance.meanControl 4507.599999999999 to 4418.400000000001 (-2.0%, p 0); squadPerformance.meanMovement 4788.9000000000015 to 4784.3 (-0.1%, p 0.0001); geKills 1844 to 1421 (-22.9%, p 0.0003).
- Under 0.05 only: usKills 1501 to 1175 (-21.7%, p 0.0021); recon.noContact 1061 to 916 (-13.7%, p 0.0066); squadPerformance.p10Overall 3554.7 to 3549.9 (-0.1%, p 0.0391).
- Wall time on/off x1.613 is over the 1.25 gate.

## Paired comparison (off against on)

- **48** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.613 (gate 1.25)
- the 48 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 3345 | 2596 | -15.6042 | 47 | 2 | 45 | 0 |
| `usKills` | 1501 | 1175 | -6.7917 | 48 | 13 | 35 | 0.0021 |
| `geKills` | 1844 | 1421 | -8.8125 | 47 | 11 | 36 | 0.0003 |
| `fire.total` | 55073 | 88636 | 699.2292 | 48 | 46 | 2 | 0 |
| `fire.hits` | 7544 | 5851 | -35.2708 | 47 | 7 | 40 | 0 |
| `retreatSamples` | 257642 | 266427 | 183.0208 | 48 | 23 | 25 | 0.8854 |
| `movementResolver.changes` | 244293 | 364486 | 2504.0208 | 48 | 48 | 0 | 0 |
| `grenades.throws` | 51 | 60 | 0.1875 | 22 | 14 | 8 | 0.2863 |
| `grenades.bursts` | 51 | 59 | 0.1667 | 22 | 14 | 8 | 0.2863 |
| `grenades.wounded` | 23 | 26 | 0.0625 | 11 | 7 | 4 | 0.5488 |
| `grenades.casualties` | 11 | 13 | 0.0417 | 8 | 5 | 3 | 0.7266 |
| `grenades.suppressed` | 40 | 55 | 0.3125 | 15 | 9 | 6 | 0.6072 |
| `grenades.friendlyWounded` | 4 | 0 | -0.0833 | 1 | 0 | 1 | 1 |
| `grenades.friendlyCasualties` | 2 | 0 | -0.0417 | 1 | 0 | 1 | 1 |
| `grenades.aborted` | 8 | 8 | 0 | 9 | 4 | 5 | 1 |
| `movementStalls.length` | 1 | 1 | 0 | 2 | 1 | 1 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 253 | 43 | -4.375 | 46 | 3 | 43 | 0 |
| `loopAlerts.length` | 1181 | 2407 | 25.5417 | 48 | 47 | 1 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 399 | 632 | 4.8542 | 44 | 38 | 6 | 0 |
| `stallOutcomes.wakes` | 8 | 7 | -0.0208 | 13 | 7 | 6 | 1 |
| `stallOutcomes.repeats` | 0 | 3 | 0.0625 | 3 | 3 | 0 | 0.25 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2168 | 3635 | 30.5625 | 47 | 46 | 1 | 0 |
| `recon.contacts` | 285 | 829 | 11.3333 | 48 | 46 | 2 | 0 |
| `recon.noContact` | 1061 | 916 | -3.0208 | 45 | 13 | 32 | 0.0066 |
| `recon.timeouts` | 77 | 62 | -0.3125 | 35 | 13 | 22 | 0.1755 |
| `recon.cancelled` | 666 | 1754 | 22.6667 | 47 | 47 | 0 | 0 |
| `recon.reportsDelivered` | 1084 | 3004 | 40 | 48 | 43 | 5 | 0 |
| `recon.retriggerBlocked` | 1112 | 1228 | 2.4167 | 44 | 26 | 18 | 0.2912 |
| `squadPerformance.meanOverall` | 3831.900000000001 | 3774.6999999999994 | -1.1917 | 47 | 7 | 40 | 0 |
| `squadPerformance.p10Overall` | 3554.7 | 3549.9 | -0.1 | 9 | 1 | 8 | 0.0391 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 2990.3000000000006 | 2818.1000000000004 | -3.5875 | 48 | 8 | 40 | 0 |
| `squadPerformance.meanMovement` | 4788.9000000000015 | 4784.3 | -0.0958 | 39 | 7 | 32 | 0.0001 |
| `squadPerformance.meanControl` | 4507.599999999999 | 4418.400000000001 | -1.8583 | 48 | 9 | 39 | 0 |
| `squadPerformance.meanCohesion` | 4374.900000000001 | 4388.7 | 0.2875 | 48 | 21 | 27 | 0.4709 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr796-phase900-20261108-0001 0.15 s (timeline) · pr796-phase900-20261108-0002 0.15 s (timeline) · pr796-phase900-20261108-0003 0.15 s (timeline) · pr796-phase900-20261108-0004 0.15 s (timeline) · pr796-phase900-20261108-0005 0.15 s (timeline) · pr796-phase900-20261108-0006 0.15 s (timeline) · pr796-phase900-20261108-0007 0.15 s (timeline) · pr796-phase900-20261108-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1816&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr796-0cac14f/ai_flow_live.html?bench=1816&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1816`); it opens the seed that parts earliest, and the dropdowns choose another.

