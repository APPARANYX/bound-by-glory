# Benchmark run #1677 · 60 seeds from `pr776-recovery` (ge-defend), windows `0+600`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerTransportPassenger=0&releasedOrder=0&controllerMissionHold=0&regroupUndeliverable=0&reloadStanceHold=0&loopAbsentOrder=0&refugeHold=0&retreatObjectiveRelease=0&fledGoalKeep=0&arrivedProneDown=0&combatRebriefRenew=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/pr776-adfab042 @ adfab04 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42312298367) · build v29-dev

## Verdict

**QUIET: 3 of 3 pairs changed (median first part 0.15 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties -9.0% (p 1)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **3** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x0.973 (gate 1.25)
- the 3 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 133 | 121 | -4 | 3 | 1 | 2 | 1 |
| `usKills` | 71 | 58 | -4.3333 | 3 | 1 | 2 | 1 |
| `geKills` | 62 | 63 | 0.3333 | 2 | 1 | 1 | 1 |
| `fire.total` | 3245 | 3311 | 22 | 3 | 2 | 1 | 1 |
| `fire.hits` | 309 | 295 | -4.6667 | 3 | 1 | 2 | 1 |
| `retreatSamples` | 8416 | 7876 | -180 | 3 | 1 | 2 | 1 |
| `movementResolver.changes` | 12021 | 11585 | -145.3333 | 3 | 2 | 1 | 1 |
| `grenades.throws` | 6 | 3 | -1 | 2 | 0 | 2 | 0.5 |
| `grenades.bursts` | 6 | 3 | -1 | 2 | 0 | 2 | 0.5 |
| `grenades.wounded` | 4 | 4 | 0 | 2 | 1 | 1 | 1 |
| `grenades.casualties` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 12 | 8 | -1.3333 | 2 | 1 | 1 | 1 |
| `grenades.friendlyWounded` | 2 | 0 | -0.6667 | 2 | 0 | 2 | 0.5 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 1 | 0 | -0.3333 | 1 | 0 | 1 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 8 | 0 | -2.6667 | 3 | 0 | 3 | 0.25 |
| `loopAlerts.length` | 110 | 58 | -17.3333 | 3 | 1 | 2 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 9 | 17 | 2.6667 | 3 | 3 | 0 | 0.25 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 143 | 141 | -0.6667 | 3 | 1 | 2 | 1 |
| `recon.contacts` | 28 | 32 | 1.3333 | 3 | 2 | 1 | 1 |
| `recon.noContact` | 45 | 35 | -3.3333 | 3 | 1 | 2 | 1 |
| `recon.timeouts` | 2 | 1 | -0.3333 | 1 | 0 | 1 | 1 |
| `recon.cancelled` | 64 | 69 | 1.6667 | 3 | 2 | 1 | 1 |
| `recon.reportsDelivered` | 96 | 69 | -9 | 3 | 2 | 1 | 1 |
| `recon.retriggerBlocked` | 52 | 49 | -1 | 2 | 1 | 1 | 1 |
| `squadPerformance.meanOverall` | 238.9 | 241.60000000000002 | 0.9 | 3 | 2 | 1 | 1 |
| `squadPerformance.p10Overall` | 223 | 225.1 | 0.7 | 2 | 2 | 0 | 0.5 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 182.9 | 184.29999999999998 | 0.4667 | 3 | 2 | 1 | 1 |
| `squadPerformance.meanMovement` | 299.6 | 299.5 | -0.0333 | 1 | 0 | 1 | 1 |
| `squadPerformance.meanControl` | 278.09999999999997 | 281.3 | 1.0667 | 3 | 2 | 1 | 1 |
| `squadPerformance.meanCohesion` | 278.9 | 279.5 | 0.2 | 3 | 1 | 2 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 3 seeds that part earliest (simulated seconds)

pr776-recovery-0052 0.15 s (timeline) · pr776-recovery-0053 0.15 s (timeline) · pr776-recovery-0054 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1677&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr776-adfab042/ai_flow_live.html?bench=1677&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1677`); it opens the seed that parts earliest, and the dropdowns choose another.

