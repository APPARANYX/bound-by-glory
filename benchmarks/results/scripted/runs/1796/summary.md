# Benchmark run #1796 · 48 seeds from `pr795-transport900-20261108` (meeting), windows `0+900`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr795-main-b91ceacd @ b91ceac · [run](https://github.com/APPARANYX/grasstex/actions/runs/42519120549) · build v29-dev

## Verdict

**MOVED: 48 of 48 pairs changed (median first part 0.15 s); 16 of 42 counters under p 0.05 (about 2.1 by chance), 10 under 0.0012; casualties -4.5% (p 0.766)**

- Clears the Bonferroni line (p < 0.0012): fire.total 34352 to 63856 (+85.9%, p 0); movementResolver.changes 188637 to 357686 (+89.6%, p 0); vacantObjectiveStalls.length 281 to 90 (-68.0%, p 0); loopAlerts.length 827 to 2551 (+208.5%, p 0); regroups.entries 251 to 510 (+103.2%, p 0); squadPerformance.meanOverall 3821.2000000000007 to 3689.3999999999987 (-3.4%, p 0); squadPerformance.p10Overall 3581.3999999999996 to 3514.5 (-1.9%, p 0); squadPerformance.meanMission 2966.5999999999985 to 2693.4 (-9.2%, p 0); squadPerformance.meanMovement 4786.499999999999 to 4775.900000000001 (-0.2%, p 0); squadPerformance.meanControl 4449.099999999999 to 4209.099999999999 (-5.4%, p 0).
- Under 0.05 only: grenades.throws 19 to 56 (+194.7%, p 0.0015); grenades.bursts 19 to 55 (+189.5%, p 0.0026); retreatSamples 124714 to 164682 (+32.0%, p 0.0031); recon.noContact 1017 to 877 (-13.8%, p 0.0079); grenades.suppressed 37 to 80 (+116.2%, p 0.0309); recon.contacts 84 to 118 (+40.5%, p 0.0436).
- Wall time on/off x1.823 is over the 1.25 gate.

## Paired comparison (off against on)

- **48** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.823 (gate 1.25)
- the 48 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2187 | 2088 | -2.0625 | 45 | 21 | 24 | 0.766 |
| `usKills` | 960 | 891 | -1.4375 | 45 | 18 | 27 | 0.2327 |
| `geKills` | 1227 | 1197 | -0.625 | 46 | 24 | 22 | 0.883 |
| `fire.total` | 34352 | 63856 | 614.6667 | 48 | 45 | 3 | 0 |
| `fire.hits` | 4778 | 4741 | -0.7708 | 48 | 23 | 25 | 0.8854 |
| `retreatSamples` | 124714 | 164682 | 832.6667 | 47 | 34 | 13 | 0.0031 |
| `movementResolver.changes` | 188637 | 357686 | 3521.8542 | 48 | 48 | 0 | 0 |
| `grenades.throws` | 19 | 56 | 0.7708 | 24 | 20 | 4 | 0.0015 |
| `grenades.bursts` | 19 | 55 | 0.75 | 23 | 19 | 4 | 0.0026 |
| `grenades.wounded` | 27 | 36 | 0.1875 | 13 | 9 | 4 | 0.2668 |
| `grenades.casualties` | 8 | 14 | 0.125 | 10 | 7 | 3 | 0.3438 |
| `grenades.suppressed` | 37 | 80 | 0.8958 | 18 | 14 | 4 | 0.0309 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 2 | 1 | 1 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 4 | 19 | 0.3125 | 9 | 7 | 2 | 0.1797 |
| `movementStalls.length` | 1 | 0 | -0.0208 | 1 | 0 | 1 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 281 | 90 | -3.9792 | 40 | 3 | 37 | 0 |
| `loopAlerts.length` | 827 | 2551 | 35.9167 | 48 | 46 | 2 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 251 | 510 | 5.3958 | 43 | 37 | 6 | 0 |
| `stallOutcomes.wakes` | 10 | 15 | 0.1042 | 17 | 10 | 7 | 0.6291 |
| `stallOutcomes.repeats` | 4 | 8 | 0.0833 | 9 | 6 | 3 | 0.5078 |
| `timeline.stalledOnsets` | 1 | 0 | -0.0208 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamples` | 16 | 0 | -0.3333 | 1 | 0 | 1 | 1 |
| `timeline.stalledOnsetsRepeated` | 1 | 0 | -0.0208 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamplesRepeated` | 16 | 0 | -0.3333 | 1 | 0 | 1 | 1 |
| `recon.orders` | 1678 | 1662 | -0.3333 | 47 | 21 | 26 | 0.5601 |
| `recon.contacts` | 84 | 118 | 0.7083 | 42 | 28 | 14 | 0.0436 |
| `recon.noContact` | 1017 | 877 | -2.9167 | 47 | 14 | 33 | 0.0079 |
| `recon.timeouts` | 13 | 20 | 0.1458 | 21 | 15 | 6 | 0.0784 |
| `recon.cancelled` | 477 | 563 | 1.7917 | 45 | 27 | 18 | 0.2327 |
| `recon.reportsDelivered` | 385 | 512 | 2.6458 | 46 | 30 | 16 | 0.0541 |
| `recon.retriggerBlocked` | 1242 | 1357 | 2.3958 | 44 | 26 | 18 | 0.2912 |
| `squadPerformance.meanOverall` | 3821.2000000000007 | 3689.3999999999987 | -2.7458 | 48 | 0 | 48 | 0 |
| `squadPerformance.p10Overall` | 3581.3999999999996 | 3514.5 | -1.3937 | 37 | 2 | 35 | 0 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 2966.5999999999985 | 2693.4 | -5.6917 | 48 | 3 | 45 | 0 |
| `squadPerformance.meanMovement` | 4786.499999999999 | 4775.900000000001 | -0.2208 | 42 | 2 | 40 | 0 |
| `squadPerformance.meanControl` | 4449.099999999999 | 4209.099999999999 | -5 | 48 | 3 | 45 | 0 |
| `squadPerformance.meanCohesion` | 4374 | 4312.499999999999 | -1.2813 | 48 | 20 | 28 | 0.3123 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr795-transport900-20261108-0001 0.15 s (timeline) · pr795-transport900-20261108-0002 0.15 s (timeline) · pr795-transport900-20261108-0003 0.15 s (timeline) · pr795-transport900-20261108-0004 0.15 s (timeline) · pr795-transport900-20261108-0005 0.15 s (timeline) · pr795-transport900-20261108-0006 0.15 s (timeline) · pr795-transport900-20261108-0007 0.15 s (timeline) · pr795-transport900-20261108-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1796&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr795-main-b91ceacd/ai_flow_live.html?bench=1796&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1796`); it opens the seed that parts earliest, and the dropdowns choose another.

