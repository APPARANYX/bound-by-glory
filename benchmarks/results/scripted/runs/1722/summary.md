# Benchmark run #1722 · 60 seeds from `controller-natural-20261026` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=new&fledReloadClear=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/pin/pr784-0586e42 @ 0586e42 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42381935236) · build v29-dev

## Verdict

**QUIET: 13 of 60 pairs changed (median first part 452.025 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties -0.3% (p 0.5)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **47** · runtime errors off 0 / on 0 · wall time on/off x1.043 (gate 1.25)
- the 6 changed records first part at simulated second: min 301.05, p10 301.05, median 452.025, p90 520.05, max 520.05

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2601 | 2594 | -0.1167 | 2 | 0 | 2 | 0.5 |
| `usKills` | 1098 | 1096 | -0.0333 | 2 | 1 | 1 | 1 |
| `geKills` | 1503 | 1498 | -0.0833 | 3 | 0 | 3 | 0.25 |
| `fire.total` | 68905 | 68654 | -4.1833 | 3 | 0 | 3 | 0.25 |
| `fire.hits` | 5838 | 5801 | -0.6167 | 3 | 0 | 3 | 0.25 |
| `retreatSamples` | 119198 | 119737 | 8.9833 | 3 | 2 | 1 | 1 |
| `movementResolver.changes` | 300191 | 299878 | -5.2167 | 5 | 0 | 5 | 0.0625 |
| `grenades.throws` | 34 | 34 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 34 | 34 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 30 | 31 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.casualties` | 12 | 13 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.suppressed` | 62 | 61 | -0.0167 | 1 | 0 | 1 | 1 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 54 | 50 | -0.0667 | 2 | 1 | 1 | 1 |
| `loopAlerts.length` | 2126 | 2117 | -0.15 | 2 | 0 | 2 | 0.5 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 309 | 305 | -0.0667 | 3 | 1 | 2 | 1 |
| `stallOutcomes.wakes` | 6 | 5 | -0.0167 | 1 | 0 | 1 | 1 |
| `stallOutcomes.repeats` | 3 | 2 | -0.0167 | 1 | 0 | 1 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1798 | 1802 | 0.0667 | 2 | 2 | 0 | 0.5 |
| `recon.contacts` | 96 | 98 | 0.0333 | 1 | 1 | 0 | 1 |
| `recon.noContact` | 918 | 917 | -0.0167 | 1 | 0 | 1 | 1 |
| `recon.timeouts` | 13 | 13 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 695 | 697 | 0.0333 | 1 | 1 | 0 | 1 |
| `recon.reportsDelivered` | 501 | 502 | 0.0167 | 1 | 1 | 0 | 1 |
| `recon.retriggerBlocked` | 1401 | 1404 | 0.05 | 2 | 2 | 0 | 0.5 |
| `squadPerformance.meanOverall` | 4690.400000000001 | 4689.000000000001 | -0.0233 | 4 | 1 | 3 | 0.625 |
| `squadPerformance.p10Overall` | 4458.2 | 4458.2 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3469.699999999999 | 3468.699999999999 | -0.0167 | 3 | 1 | 2 | 1 |
| `squadPerformance.meanMovement` | 5979.600000000001 | 5979.600000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5376.100000000001 | 5379.4000000000015 | 0.055 | 3 | 2 | 1 | 1 |
| `squadPerformance.meanCohesion` | 5583.900000000002 | 5583.800000000002 | -0.0017 | 2 | 1 | 1 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 6 seeds that part earliest (simulated seconds)

controller-natural-20261026-0060 301.05 s (timeline) · controller-natural-20261026-0004 356.1 s (timeline) · controller-natural-20261026-0047 435 s (timeline) · controller-natural-20261026-0022 469.05 s (timeline) · controller-natural-20261026-0051 475.05 s (timeline) · controller-natural-20261026-0028 520.05 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1722&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr784-0586e42/ai_flow_live.html?bench=1722&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1722`); it opens the seed that parts earliest, and the dropdowns choose another.

