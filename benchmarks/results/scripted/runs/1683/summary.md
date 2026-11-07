# Benchmark run #1683 · 60 seeds from `pr776-recovery` (ge-defend), windows `0+600`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerTransportPassenger=0&releasedOrder=0&controllerMissionHold=0&regroupUndeliverable=0&reloadStanceHold=0&loopAbsentOrder=0&refugeHold=0&retreatObjectiveRelease=0&fledGoalKeep=0&arrivedProneDown=0&combatRebriefRenew=0&controllerLazyBasis=0&controllerReserveShooters=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/pr776-cbe2da76 @ cbe2da7 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42315274204) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 4 of 42 counters under p 0.05 (about 2.1 by chance), 1 under 0.0012; casualties -5.3% (p 0.2529)**

- Clears the Bonferroni line (p < 0.0012): vacantObjectiveStalls.length 58 to 9 (-84.5%, p 0).
- Under 0.05 only: squadPerformance.meanControl 5630.3 to 5701.0999999999985 (+1.3%, p 0.0018); squadPerformance.meanMovement 5992.499999999997 to 5993.799999999997 (+0.0%, p 0.0106); loopAlerts.length 1454 to 988 (-32.0%, p 0.0153).

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x0.953 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2099 | 1987 | -1.8667 | 49 | 20 | 29 | 0.2529 |
| `usKills` | 747 | 759 | 0.2 | 50 | 24 | 26 | 0.8877 |
| `geKills` | 1352 | 1228 | -2.0667 | 45 | 16 | 29 | 0.0725 |
| `fire.total` | 52215 | 50543 | -27.8667 | 51 | 29 | 22 | 0.4011 |
| `fire.hits` | 4670 | 4574 | -1.6 | 49 | 24 | 25 | 1 |
| `retreatSamples` | 121103 | 126347 | 87.4 | 51 | 27 | 24 | 0.7798 |
| `movementResolver.changes` | 189402 | 187021 | -39.6833 | 60 | 32 | 28 | 0.6989 |
| `grenades.throws` | 45 | 46 | 0.0167 | 23 | 12 | 11 | 1 |
| `grenades.bursts` | 45 | 46 | 0.0167 | 23 | 12 | 11 | 1 |
| `grenades.wounded` | 36 | 43 | 0.1167 | 12 | 9 | 3 | 0.146 |
| `grenades.casualties` | 10 | 13 | 0.05 | 5 | 4 | 1 | 0.375 |
| `grenades.suppressed` | 85 | 84 | -0.0167 | 19 | 13 | 6 | 0.1671 |
| `grenades.friendlyWounded` | 2 | 4 | 0.0333 | 6 | 4 | 2 | 0.6875 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 12 | 15 | 0.05 | 11 | 5 | 6 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 58 | 9 | -0.8167 | 26 | 2 | 24 | 0 |
| `loopAlerts.length` | 1454 | 988 | -7.7667 | 50 | 16 | 34 | 0.0153 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 218 | 221 | 0.05 | 43 | 19 | 24 | 0.5424 |
| `stallOutcomes.wakes` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2690 | 2549 | -2.35 | 51 | 23 | 28 | 0.5758 |
| `recon.contacts` | 557 | 538 | -0.3167 | 46 | 23 | 23 | 1 |
| `recon.noContact` | 660 | 661 | 0.0167 | 46 | 28 | 18 | 0.1839 |
| `recon.timeouts` | 46 | 53 | 0.1167 | 20 | 11 | 9 | 0.8238 |
| `recon.cancelled` | 1351 | 1227 | -2.0667 | 48 | 22 | 26 | 0.6655 |
| `recon.reportsDelivered` | 2260 | 2047 | -3.55 | 51 | 25 | 26 | 1 |
| `recon.retriggerBlocked` | 787 | 772 | -0.25 | 47 | 24 | 23 | 1 |
| `squadPerformance.meanOverall` | 4967.199999999999 | 4961.400000000001 | -0.0967 | 52 | 28 | 24 | 0.6778 |
| `squadPerformance.p10Overall` | 4646.300000000001 | 4637.4 | -0.1483 | 24 | 12 | 12 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4027.7999999999997 | 3957.2999999999993 | -1.175 | 51 | 20 | 31 | 0.1608 |
| `squadPerformance.meanMovement` | 5992.499999999997 | 5993.799999999997 | 0.0217 | 23 | 18 | 5 | 0.0106 |
| `squadPerformance.meanControl` | 5630.3 | 5701.0999999999985 | 1.18 | 51 | 37 | 14 | 0.0018 |
| `squadPerformance.meanCohesion` | 5563.600000000001 | 5578.999999999999 | 0.2567 | 53 | 32 | 21 | 0.169 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr776-recovery-0001 0.15 s (timeline) · pr776-recovery-0002 0.15 s (timeline) · pr776-recovery-0003 0.15 s (timeline) · pr776-recovery-0004 0.15 s (timeline) · pr776-recovery-0005 0.15 s (timeline) · pr776-recovery-0006 0.15 s (timeline) · pr776-recovery-0007 0.15 s (timeline) · pr776-recovery-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1683&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr776-cbe2da76/ai_flow_live.html?bench=1683&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1683`); it opens the seed that parts earliest, and the dropdowns choose another.

