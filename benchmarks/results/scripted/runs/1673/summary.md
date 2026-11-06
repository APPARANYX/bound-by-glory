# Benchmark run #1673 · 60 seeds from `pr776-recovery` (meeting), windows `0+600`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerTransportPassenger=0&releasedOrder=0&controllerMissionHold=0&regroupUndeliverable=0&reloadStanceHold=0&loopAbsentOrder=0&refugeHold=0&retreatObjectiveRelease=0&fledGoalKeep=0&arrivedProneDown=0&combatRebriefRenew=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/pr776-adfab042 @ adfab04 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42311801600) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 4 of 42 counters under p 0.05 (about 2.1 by chance), 3 under 0.0012; casualties +1.3% (p 0.694)**

- Clears the Bonferroni line (p < 0.0012): vacantObjectiveStalls.length 334 to 54 (-83.8%, p 0); squadPerformance.meanMission 3597.7999999999997 to 3449.4 (-4.1%, p 0.0002); squadPerformance.meanOverall 4717.6 to 4677.6 (-0.8%, p 0.0003).
- Under 0.05 only: grenades.casualties 11 to 21 (+90.9%, p 0.0386).

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x0.987 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2645 | 2679 | 0.5667 | 58 | 31 | 27 | 0.694 |
| `usKills` | 1238 | 1198 | -0.6667 | 59 | 28 | 31 | 0.7948 |
| `geKills` | 1407 | 1481 | 1.2333 | 58 | 32 | 26 | 0.5118 |
| `fire.total` | 70878 | 69958 | -15.3333 | 60 | 31 | 29 | 0.8974 |
| `fire.hits` | 6076 | 5973 | -1.7167 | 59 | 27 | 32 | 0.6029 |
| `retreatSamples` | 121461 | 125096 | 60.5833 | 60 | 31 | 29 | 0.8974 |
| `movementResolver.changes` | 314146 | 312091 | -34.25 | 60 | 29 | 31 | 0.8974 |
| `grenades.throws` | 50 | 57 | 0.1167 | 30 | 15 | 15 | 1 |
| `grenades.bursts` | 50 | 57 | 0.1167 | 30 | 15 | 15 | 1 |
| `grenades.wounded` | 40 | 47 | 0.1167 | 17 | 10 | 7 | 0.6291 |
| `grenades.casualties` | 11 | 21 | 0.1667 | 12 | 10 | 2 | 0.0386 |
| `grenades.suppressed` | 80 | 89 | 0.15 | 20 | 11 | 9 | 0.8238 |
| `grenades.friendlyWounded` | 3 | 2 | -0.0167 | 3 | 1 | 2 | 1 |
| `grenades.friendlyCasualties` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.aborted` | 6 | 9 | 0.05 | 7 | 5 | 2 | 0.4531 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 334 | 54 | -4.6667 | 53 | 1 | 52 | 0 |
| `loopAlerts.length` | 2570 | 2339 | -3.85 | 57 | 22 | 35 | 0.1112 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 279 | 355 | 1.2667 | 54 | 29 | 25 | 0.6835 |
| `stallOutcomes.wakes` | 6 | 3 | -0.05 | 8 | 2 | 6 | 0.2891 |
| `stallOutcomes.repeats` | 3 | 2 | -0.0167 | 4 | 1 | 3 | 0.625 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1887 | 1915 | 0.4667 | 56 | 27 | 29 | 0.8939 |
| `recon.contacts` | 105 | 119 | 0.2333 | 44 | 26 | 18 | 0.2912 |
| `recon.noContact` | 969 | 967 | -0.0333 | 55 | 27 | 28 | 1 |
| `recon.timeouts` | 9 | 10 | 0.0167 | 17 | 9 | 8 | 1 |
| `recon.cancelled` | 724 | 745 | 0.35 | 57 | 30 | 27 | 0.7914 |
| `recon.reportsDelivered` | 582 | 616 | 0.5667 | 53 | 26 | 27 | 1 |
| `recon.retriggerBlocked` | 1466 | 1490 | 0.4 | 53 | 27 | 26 | 1 |
| `squadPerformance.meanOverall` | 4717.6 | 4677.6 | -0.6667 | 58 | 15 | 43 | 0.0003 |
| `squadPerformance.p10Overall` | 4461.1 | 4459.099999999999 | -0.0333 | 28 | 10 | 18 | 0.1849 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3597.7999999999997 | 3449.4 | -2.4733 | 59 | 15 | 44 | 0.0002 |
| `squadPerformance.meanMovement` | 5977.5 | 5977.9000000000015 | 0.0067 | 44 | 20 | 24 | 0.6516 |
| `squadPerformance.meanControl` | 5318.4 | 5345.500000000002 | 0.4517 | 60 | 33 | 27 | 0.519 |
| `squadPerformance.meanCohesion` | 5565.200000000002 | 5568.000000000001 | 0.0467 | 58 | 32 | 26 | 0.5118 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr776-recovery-0001 0.15 s (timeline) · pr776-recovery-0002 0.15 s (timeline) · pr776-recovery-0003 0.15 s (timeline) · pr776-recovery-0004 0.15 s (timeline) · pr776-recovery-0005 0.15 s (timeline) · pr776-recovery-0006 0.15 s (timeline) · pr776-recovery-0007 0.15 s (timeline) · pr776-recovery-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1673&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr776-adfab042/ai_flow_live.html?bench=1673&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1673`); it opens the seed that parts earliest, and the dropdowns choose another.

