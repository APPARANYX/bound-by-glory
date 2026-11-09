# Benchmark run #1820 · 60 seeds from `pr797-micro-u-20261109` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr797-main-e8650a82 @ e8650a8 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42566388676) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 20 of 42 counters under p 0.05 (about 2.1 by chance), 17 under 0.0012; casualties -14.1% (p 0)**

- Clears the Bonferroni line (p < 0.0012): casualties 2633 to 2262 (-14.1%, p 0); fire.total 39226 to 73315 (+86.9%, p 0); movementResolver.changes 217738 to 397842 (+82.7%, p 0); vacantObjectiveStalls.length 329 to 35 (-89.4%, p 0); loopAlerts.length 784 to 2805 (+257.8%, p 0); regroups.entries 246 to 416 (+69.1%, p 0); recon.noContact 1142 to 866 (-24.2%, p 0); squadPerformance.meanOverall 4796.300000000001 to 4659.999999999999 (-2.8%, p 0); squadPerformance.meanMission 3743.3 to 3493.2000000000003 (-6.7%, p 0); squadPerformance.meanMovement 5983.200000000001 to 5976.099999999999 (-0.1%, p 0); squadPerformance.meanControl 5603.6 to 5259.399999999998 (-6.1%, p 0); recon.orders 1837 to 1573 (-14.4%, p 0.0001); usKills 1242 to 977 (-21.3%, p 0.0003); grenades.throws 26 to 51 (+96.2%, p 0.0005); grenades.bursts 26 to 51 (+96.2%, p 0.0005); squadPerformance.p10Overall 4475.3 to 4457.900000000001 (-0.4%, p 0.0005); fire.hits 5931 to 5103 (-14.0%, p 0.0011).
- Under 0.05 only: grenades.aborted 1 to 20 (+1900.0%, p 0.0063); squadPerformance.meanCohesion 5430.300000000001 to 5323.599999999999 (-2.0%, p 0.0183); recon.timeouts 24 to 7 (-70.8%, p 0.0192).
- Wall time on/off x1.694 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.694 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2633 | 2262 | -6.1833 | 58 | 13 | 45 | 0 |
| `usKills` | 1242 | 977 | -4.4167 | 58 | 15 | 43 | 0.0003 |
| `geKills` | 1391 | 1285 | -1.7667 | 59 | 23 | 36 | 0.1175 |
| `fire.total` | 39226 | 73315 | 568.15 | 60 | 57 | 3 | 0 |
| `fire.hits` | 5931 | 5103 | -13.8 | 60 | 17 | 43 | 0.0011 |
| `retreatSamples` | 98948 | 94186 | -79.3667 | 60 | 28 | 32 | 0.6989 |
| `movementResolver.changes` | 217738 | 397842 | 3001.7333 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 26 | 51 | 0.4167 | 23 | 20 | 3 | 0.0005 |
| `grenades.bursts` | 26 | 51 | 0.4167 | 23 | 20 | 3 | 0.0005 |
| `grenades.wounded` | 24 | 30 | 0.1 | 10 | 4 | 6 | 0.7539 |
| `grenades.casualties` | 9 | 10 | 0.0167 | 5 | 2 | 3 | 1 |
| `grenades.suppressed` | 52 | 72 | 0.3333 | 12 | 7 | 5 | 0.7744 |
| `grenades.friendlyWounded` | 2 | 0 | -0.0333 | 1 | 0 | 1 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 1 | 20 | 0.3167 | 12 | 11 | 1 | 0.0063 |
| `movementStalls.length` | 6 | 0 | -0.1 | 1 | 0 | 1 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 329 | 35 | -4.9 | 56 | 0 | 56 | 0 |
| `loopAlerts.length` | 784 | 2805 | 33.6833 | 59 | 57 | 2 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 246 | 416 | 2.8333 | 56 | 44 | 12 | 0 |
| `stallOutcomes.wakes` | 8 | 5 | -0.05 | 11 | 4 | 7 | 0.5488 |
| `stallOutcomes.repeats` | 4 | 1 | -0.05 | 5 | 1 | 4 | 0.375 |
| `timeline.stalledOnsets` | 6 | 0 | -0.1 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamples` | 418 | 0 | -6.9667 | 1 | 0 | 1 | 1 |
| `timeline.stalledOnsetsRepeated` | 6 | 0 | -0.1 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamplesRepeated` | 418 | 0 | -6.9667 | 1 | 0 | 1 | 1 |
| `recon.orders` | 1837 | 1573 | -4.4 | 56 | 13 | 43 | 0.0001 |
| `recon.contacts` | 100 | 110 | 0.1667 | 44 | 26 | 18 | 0.2912 |
| `recon.noContact` | 1142 | 866 | -4.6 | 56 | 3 | 53 | 0 |
| `recon.timeouts` | 24 | 7 | -0.2833 | 27 | 7 | 20 | 0.0192 |
| `recon.cancelled` | 498 | 543 | 0.75 | 55 | 34 | 21 | 0.1048 |
| `recon.reportsDelivered` | 497 | 514 | 0.2833 | 57 | 30 | 27 | 0.7914 |
| `recon.retriggerBlocked` | 1410 | 1336 | -1.2333 | 53 | 25 | 28 | 0.7838 |
| `squadPerformance.meanOverall` | 4796.300000000001 | 4659.999999999999 | -2.2717 | 60 | 4 | 56 | 0 |
| `squadPerformance.p10Overall` | 4475.3 | 4457.900000000001 | -0.29 | 38 | 8 | 30 | 0.0005 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3743.3 | 3493.2000000000003 | -4.1683 | 60 | 10 | 50 | 0 |
| `squadPerformance.meanMovement` | 5983.200000000001 | 5976.099999999999 | -0.1183 | 48 | 5 | 43 | 0 |
| `squadPerformance.meanControl` | 5603.6 | 5259.399999999998 | -5.7367 | 60 | 3 | 57 | 0 |
| `squadPerformance.meanCohesion` | 5430.300000000001 | 5323.599999999999 | -1.7783 | 59 | 20 | 39 | 0.0183 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr797-micro-u-20261109-0001 0.15 s (timeline) · pr797-micro-u-20261109-0002 0.15 s (timeline) · pr797-micro-u-20261109-0003 0.15 s (timeline) · pr797-micro-u-20261109-0004 0.15 s (timeline) · pr797-micro-u-20261109-0005 0.15 s (timeline) · pr797-micro-u-20261109-0006 0.15 s (timeline) · pr797-micro-u-20261109-0007 0.15 s (timeline) · pr797-micro-u-20261109-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1820&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr797-main-e8650a82/ai_flow_live.html?bench=1820&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1820`); it opens the seed that parts earliest, and the dropdowns choose another.

