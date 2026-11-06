# Benchmark run #1644 · 60 seeds from `meso771` (ge-defend), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerLeaderless=0&controllerAssault=0&controllerRetreat=0&controllerGrenade=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/meso771-e717141 @ e717141 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42171119295) · build v29-dev

## Verdict

**WEAK: 56 of 56 pairs changed (median first part 188.55 s); 1 of 42 counters under p 0.05 (about 2.1 by chance); casualties -0.6% (p 1)**

- Under 0.05 only: squadPerformance.meanMovement 5576.600000000001 to 5571.900000000002 (-0.1%, p 0.0107).

## Paired comparison (off against on)

- **56** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x0.981 (gate 1.25)
- the 52 changed records first part at simulated second: min 119.1, p10 150, median 188.55, p90 241.05, max 278.1

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 871 | 866 | -0.0893 | 41 | 21 | 20 | 1 |
| `usKills` | 324 | 308 | -0.2857 | 38 | 18 | 20 | 0.8714 |
| `geKills` | 547 | 558 | 0.1964 | 39 | 21 | 18 | 0.7493 |
| `fire.total` | 23173 | 22371 | -14.3214 | 49 | 21 | 28 | 0.3916 |
| `fire.hits` | 2045 | 1943 | -1.8214 | 42 | 20 | 22 | 0.8776 |
| `retreatSamples` | 5587 | 5520 | -1.1964 | 41 | 15 | 26 | 0.1173 |
| `movementResolver.changes` | 110837 | 111433 | 10.6429 | 52 | 31 | 21 | 0.2116 |
| `grenades.throws` | 11 | 12 | 0.0179 | 7 | 3 | 4 | 1 |
| `grenades.bursts` | 10 | 12 | 0.0357 | 6 | 3 | 3 | 1 |
| `grenades.wounded` | 3 | 5 | 0.0357 | 2 | 2 | 0 | 0.5 |
| `grenades.casualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 13 | 14 | 0.0179 | 2 | 1 | 1 | 1 |
| `grenades.friendlyWounded` | 0 | 1 | 0.0179 | 1 | 1 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 2 | 3 | 0.0179 | 3 | 1 | 2 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 467 | 467 | 0 | 40 | 24 | 16 | 0.2682 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 71 | 76 | 0.0893 | 9 | 6 | 3 | 0.5078 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1367 | 1378 | 0.1964 | 38 | 17 | 21 | 0.6271 |
| `recon.contacts` | 222 | 233 | 0.1964 | 29 | 16 | 13 | 0.7111 |
| `recon.noContact` | 413 | 405 | -0.1429 | 8 | 1 | 7 | 0.0703 |
| `recon.timeouts` | 27 | 26 | -0.0179 | 1 | 0 | 1 | 1 |
| `recon.cancelled` | 649 | 663 | 0.25 | 36 | 19 | 17 | 0.8679 |
| `recon.reportsDelivered` | 960 | 1066 | 1.8929 | 32 | 19 | 13 | 0.3771 |
| `recon.retriggerBlocked` | 518 | 513 | -0.0893 | 19 | 8 | 11 | 0.6476 |
| `squadPerformance.meanOverall` | 4851.999999999999 | 4855.300000000001 | 0.0589 | 47 | 22 | 25 | 0.7709 |
| `squadPerformance.p10Overall` | 4385.500000000002 | 4383.499999999998 | -0.0357 | 40 | 19 | 21 | 0.8746 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4336 | 4363.5999999999985 | 0.4929 | 46 | 24 | 22 | 0.883 |
| `squadPerformance.meanMovement` | 5576.600000000001 | 5571.900000000002 | -0.0839 | 31 | 8 | 23 | 0.0107 |
| `squadPerformance.meanControl` | 5308.400000000001 | 5298.2 | -0.1821 | 44 | 20 | 24 | 0.6516 |
| `squadPerformance.meanCohesion` | 4903.1 | 4904.1 | 0.0179 | 45 | 27 | 18 | 0.2327 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

meso771-0045 119.1 s (timeline) · meso771-0043 133.05 s (timeline) · meso771-0051 137.1 s (timeline) · meso771-0011 146.1 s (timeline) · meso771-0007 149.1 s (timeline) · meso771-0024 150 s (timeline) · meso771-0006 153 s (timeline) · meso771-0013 154.05 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1644&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-meso771-e717141/ai_flow_live.html?bench=1644&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1644`); it opens the seed that parts earliest, and the dropdowns choose another.

