# Benchmark run #1679 · 60 seeds from `pr776-recovery` (meeting), windows `0+600`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerTransportPassenger=0&releasedOrder=0&controllerMissionHold=0&regroupUndeliverable=0&reloadStanceHold=0&loopAbsentOrder=0&refugeHold=0&retreatObjectiveRelease=0&fledGoalKeep=0&arrivedProneDown=0&combatRebriefRenew=0&controllerLazyBasis=0&controllerReserveShooters=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/pr776-cbe2da76 @ cbe2da7 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42314963597) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 4 of 42 counters under p 0.05 (about 2.1 by chance), 3 under 0.0012; casualties +1.5% (p 0.694)**

- Clears the Bonferroni line (p < 0.0012): vacantObjectiveStalls.length 334 to 51 (-84.7%, p 0); squadPerformance.meanMission 3597.7999999999997 to 3450.9 (-4.1%, p 0.0002); squadPerformance.meanOverall 4717.6 to 4678.000000000001 (-0.8%, p 0.0003).
- Under 0.05 only: grenades.casualties 11 to 21 (+90.9%, p 0.0386).

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.016 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2645 | 2685 | 0.6667 | 58 | 31 | 27 | 0.694 |
| `usKills` | 1238 | 1187 | -0.85 | 59 | 28 | 31 | 0.7948 |
| `geKills` | 1407 | 1498 | 1.5167 | 58 | 33 | 25 | 0.3581 |
| `fire.total` | 70878 | 70246 | -10.5333 | 60 | 31 | 29 | 0.8974 |
| `fire.hits` | 6076 | 6000 | -1.2667 | 59 | 27 | 32 | 0.6029 |
| `retreatSamples` | 121461 | 124781 | 55.3333 | 60 | 31 | 29 | 0.8974 |
| `movementResolver.changes` | 314146 | 312317 | -30.4833 | 60 | 30 | 30 | 1 |
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
| `vacantObjectiveStalls.length` | 334 | 51 | -4.7167 | 53 | 1 | 52 | 0 |
| `loopAlerts.length` | 2570 | 2336 | -3.9 | 57 | 22 | 35 | 0.1112 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 279 | 354 | 1.25 | 54 | 29 | 25 | 0.6835 |
| `stallOutcomes.wakes` | 6 | 3 | -0.05 | 8 | 2 | 6 | 0.2891 |
| `stallOutcomes.repeats` | 3 | 2 | -0.0167 | 4 | 1 | 3 | 0.625 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1887 | 1920 | 0.55 | 56 | 27 | 29 | 0.8939 |
| `recon.contacts` | 105 | 118 | 0.2167 | 44 | 26 | 18 | 0.2912 |
| `recon.noContact` | 969 | 968 | -0.0167 | 55 | 27 | 28 | 1 |
| `recon.timeouts` | 9 | 10 | 0.0167 | 17 | 9 | 8 | 1 |
| `recon.cancelled` | 724 | 747 | 0.3833 | 57 | 30 | 27 | 0.7914 |
| `recon.reportsDelivered` | 582 | 611 | 0.4833 | 53 | 26 | 27 | 1 |
| `recon.retriggerBlocked` | 1466 | 1491 | 0.4167 | 53 | 27 | 26 | 1 |
| `squadPerformance.meanOverall` | 4717.6 | 4678.000000000001 | -0.66 | 58 | 15 | 43 | 0.0003 |
| `squadPerformance.p10Overall` | 4461.1 | 4459.099999999999 | -0.0333 | 28 | 10 | 18 | 0.1849 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3597.7999999999997 | 3450.9 | -2.4483 | 59 | 15 | 44 | 0.0002 |
| `squadPerformance.meanMovement` | 5977.5 | 5977.800000000001 | 0.005 | 44 | 20 | 24 | 0.6516 |
| `squadPerformance.meanControl` | 5318.4 | 5344.800000000002 | 0.44 | 60 | 33 | 27 | 0.519 |
| `squadPerformance.meanCohesion` | 5565.200000000002 | 5567.900000000001 | 0.045 | 58 | 32 | 26 | 0.5118 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr776-recovery-0001 0.15 s (timeline) · pr776-recovery-0002 0.15 s (timeline) · pr776-recovery-0003 0.15 s (timeline) · pr776-recovery-0004 0.15 s (timeline) · pr776-recovery-0005 0.15 s (timeline) · pr776-recovery-0006 0.15 s (timeline) · pr776-recovery-0007 0.15 s (timeline) · pr776-recovery-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1679&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr776-cbe2da76/ai_flow_live.html?bench=1679&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1679`); it opens the seed that parts earliest, and the dropdowns choose another.

