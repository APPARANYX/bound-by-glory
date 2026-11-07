# Benchmark run #1680 · 60 seeds from `pr776-recovery` (us-defend), windows `0+600`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerTransportPassenger=0&releasedOrder=0&controllerMissionHold=0&regroupUndeliverable=0&reloadStanceHold=0&loopAbsentOrder=0&refugeHold=0&retreatObjectiveRelease=0&fledGoalKeep=0&arrivedProneDown=0&combatRebriefRenew=0&controllerLazyBasis=0&controllerReserveShooters=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/pr776-cbe2da76 @ cbe2da7 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42315154924) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 4 of 42 counters under p 0.05 (about 2.1 by chance), 1 under 0.0012; casualties +0.1% (p 0.1839)**

- Clears the Bonferroni line (p < 0.0012): vacantObjectiveStalls.length 88 to 15 (-83.0%, p 0).
- Under 0.05 only: squadPerformance.meanControl 5613.3 to 5687.500000000002 (+1.3%, p 0.0018); loopAlerts.length 1798 to 1355 (-24.6%, p 0.0046); squadPerformance.meanMission 3933.0999999999995 to 3856.4999999999986 (-1.9%, p 0.011).

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x0.99 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 1954 | 1955 | 0.0167 | 46 | 28 | 18 | 0.1839 |
| `usKills` | 991 | 1007 | 0.2667 | 49 | 27 | 22 | 0.5682 |
| `geKills` | 963 | 948 | -0.25 | 50 | 26 | 24 | 0.8877 |
| `fire.total` | 60030 | 61675 | 27.4167 | 51 | 30 | 21 | 0.2624 |
| `fire.hits` | 4537 | 4497 | -0.6667 | 50 | 29 | 21 | 0.3222 |
| `retreatSamples` | 125180 | 137940 | 212.6667 | 51 | 26 | 25 | 1 |
| `movementResolver.changes` | 196380 | 196228 | -2.5333 | 59 | 37 | 22 | 0.0674 |
| `grenades.throws` | 32 | 38 | 0.1 | 23 | 13 | 10 | 0.6776 |
| `grenades.bursts` | 32 | 38 | 0.1 | 23 | 13 | 10 | 0.6776 |
| `grenades.wounded` | 15 | 18 | 0.05 | 14 | 8 | 6 | 0.7905 |
| `grenades.casualties` | 6 | 7 | 0.0167 | 9 | 5 | 4 | 1 |
| `grenades.suppressed` | 24 | 34 | 0.1667 | 16 | 10 | 6 | 0.4545 |
| `grenades.friendlyWounded` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 4 | 12 | 0.1333 | 9 | 6 | 3 | 0.5078 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 88 | 15 | -1.2167 | 30 | 1 | 29 | 0 |
| `loopAlerts.length` | 1798 | 1355 | -7.3833 | 51 | 15 | 36 | 0.0046 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 226 | 240 | 0.2333 | 41 | 23 | 18 | 0.5327 |
| `stallOutcomes.wakes` | 4 | 2 | -0.0333 | 6 | 2 | 4 | 0.6875 |
| `stallOutcomes.repeats` | 2 | 1 | -0.0167 | 3 | 1 | 2 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2419 | 2454 | 0.5833 | 48 | 28 | 20 | 0.3123 |
| `recon.contacts` | 571 | 521 | -0.8333 | 50 | 22 | 28 | 0.4799 |
| `recon.noContact` | 670 | 674 | 0.0667 | 46 | 25 | 21 | 0.6587 |
| `recon.timeouts` | 23 | 30 | 0.1167 | 19 | 12 | 7 | 0.3593 |
| `recon.cancelled` | 1070 | 1141 | 1.1833 | 48 | 28 | 20 | 0.3123 |
| `recon.reportsDelivered` | 2200 | 2162 | -0.6333 | 51 | 24 | 27 | 0.7798 |
| `recon.retriggerBlocked` | 763 | 741 | -0.3667 | 43 | 18 | 25 | 0.3604 |
| `squadPerformance.meanOverall` | 4935.5 | 4922.4 | -0.2183 | 53 | 25 | 28 | 0.7838 |
| `squadPerformance.p10Overall` | 4636.700000000001 | 4637.500000000001 | 0.0133 | 17 | 8 | 9 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3933.0999999999995 | 3856.4999999999986 | -1.2767 | 51 | 16 | 35 | 0.011 |
| `squadPerformance.meanMovement` | 5991.3 | 5992.400000000001 | 0.0183 | 25 | 17 | 8 | 0.1078 |
| `squadPerformance.meanControl` | 5613.3 | 5687.500000000002 | 1.2367 | 51 | 37 | 14 | 0.0018 |
| `squadPerformance.meanCohesion` | 5604.300000000002 | 5610.2 | 0.0983 | 52 | 27 | 25 | 0.8899 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr776-recovery-0001 0.15 s (timeline) · pr776-recovery-0002 0.15 s (timeline) · pr776-recovery-0003 0.15 s (timeline) · pr776-recovery-0004 0.15 s (timeline) · pr776-recovery-0005 0.15 s (timeline) · pr776-recovery-0006 0.15 s (timeline) · pr776-recovery-0007 0.15 s (timeline) · pr776-recovery-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1680&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr776-cbe2da76/ai_flow_live.html?bench=1680&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1680`); it opens the seed that parts earliest, and the dropdowns choose another.

