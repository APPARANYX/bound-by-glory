# Benchmark run #1643 · 60 seeds from `meso771` (us-defend), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerLeaderless=0&controllerAssault=0&controllerRetreat=0&controllerGrenade=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/meso771-e717141 @ e717141 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42171114995) · build v29-dev

## Verdict

**QUIET: 56 of 56 pairs changed (median first part 192 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties -1.9% (p 0.5601)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **56** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.092 (gate 1.25)
- the 53 changed records first part at simulated second: min 125.1, p10 162, median 192, p90 228, max 273

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 872 | 855 | -0.3036 | 47 | 21 | 26 | 0.5601 |
| `usKills` | 422 | 393 | -0.5179 | 45 | 21 | 24 | 0.766 |
| `geKills` | 450 | 462 | 0.2143 | 39 | 21 | 18 | 0.7493 |
| `fire.total` | 23880 | 23650 | -4.1071 | 50 | 26 | 24 | 0.8877 |
| `fire.hits` | 1915 | 1994 | 1.4107 | 51 | 27 | 24 | 0.7798 |
| `retreatSamples` | 6055 | 6321 | 4.75 | 46 | 28 | 18 | 0.1839 |
| `movementResolver.changes` | 116177 | 116563 | 6.8929 | 54 | 33 | 21 | 0.1337 |
| `grenades.throws` | 12 | 10 | -0.0357 | 7 | 3 | 4 | 1 |
| `grenades.bursts` | 10 | 7 | -0.0536 | 6 | 2 | 4 | 0.6875 |
| `grenades.wounded` | 1 | 2 | 0.0179 | 1 | 1 | 0 | 1 |
| `grenades.casualties` | 0 | 2 | 0.0357 | 1 | 1 | 0 | 1 |
| `grenades.suppressed` | 11 | 12 | 0.0179 | 3 | 1 | 2 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 1 | 2 | 0.0179 | 1 | 1 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 572 | 558 | -0.25 | 38 | 17 | 21 | 0.6271 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 56 | 56 | 0 | 16 | 9 | 7 | 0.8036 |
| `stallOutcomes.wakes` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1267 | 1275 | 0.1429 | 39 | 20 | 19 | 1 |
| `recon.contacts` | 168 | 175 | 0.125 | 33 | 19 | 14 | 0.4869 |
| `recon.noContact` | 479 | 483 | 0.0714 | 11 | 7 | 4 | 0.5488 |
| `recon.timeouts` | 19 | 17 | -0.0357 | 2 | 0 | 2 | 0.5 |
| `recon.cancelled` | 550 | 556 | 0.1071 | 35 | 20 | 15 | 0.4996 |
| `recon.reportsDelivered` | 781 | 747 | -0.6071 | 35 | 16 | 19 | 0.7359 |
| `recon.retriggerBlocked` | 518 | 524 | 0.1071 | 25 | 16 | 9 | 0.2295 |
| `squadPerformance.meanOverall` | 4813.600000000001 | 4816.7 | 0.0554 | 49 | 20 | 29 | 0.2529 |
| `squadPerformance.p10Overall` | 4309.399999999999 | 4310.199999999999 | 0.0143 | 35 | 19 | 16 | 0.7359 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4260.200000000001 | 4256.699999999999 | -0.0625 | 50 | 23 | 27 | 0.6718 |
| `squadPerformance.meanMovement` | 5571.1 | 5569.100000000001 | -0.0357 | 36 | 17 | 19 | 0.8679 |
| `squadPerformance.meanControl` | 5282.999999999999 | 5290.5 | 0.1339 | 47 | 23 | 24 | 1 |
| `squadPerformance.meanCohesion` | 4978.400000000001 | 4968.199999999998 | -0.1821 | 50 | 28 | 22 | 0.4799 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

meso771-0003 125.1 s (timeline) · meso771-0023 127.05 s (timeline) · meso771-0052 140.1 s (timeline) · meso771-0057 153 s (timeline) · meso771-0046 160.05 s (timeline) · meso771-0042 162 s (timeline) · meso771-0030 163.05 s (timeline) · meso771-0060 163.05 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1643&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-meso771-e717141/ai_flow_live.html?bench=1643&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1643`); it opens the seed that parts earliest, and the dropdowns choose another.

