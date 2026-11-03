# Benchmark run #1606 · 3 seeds from `controller-natural-20261026` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/meso732-route-search-review-20261103 @ fed2a23 · [run](https://github.com/APPARANYX/grasstex/actions/runs/41573961080) · build v29-dev

## Verdict

**QUIET: 3 of 3 pairs changed (median first part 0.15 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties -16.3% (p 0.25)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.
- Wall time on/off x1.698 is over the 1.25 gate.

## Paired comparison (off against on)

- **3** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.698 (gate 1.25)
- the 3 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 166 | 139 | -9 | 3 | 0 | 3 | 0.25 |
| `usKills` | 83 | 50 | -11 | 3 | 0 | 3 | 0.25 |
| `geKills` | 83 | 89 | 2 | 3 | 2 | 1 | 1 |
| `fire.total` | 2655 | 3812 | 385.6667 | 3 | 3 | 0 | 0.25 |
| `fire.hits` | 349 | 318 | -10.3333 | 3 | 0 | 3 | 0.25 |
| `retreatSamples` | 6013 | 6976 | 321 | 3 | 1 | 2 | 1 |
| `movementResolver.changes` | 10343 | 15256 | 1637.6667 | 3 | 3 | 0 | 0.25 |
| `grenades.throws` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 12 | 18 | 2 | 3 | 2 | 1 | 1 |
| `loopAlerts.length` | 14 | 49 | 11.6667 | 3 | 3 | 0 | 0.25 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 6 | 14 | 2.6667 | 2 | 2 | 0 | 0.5 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 63 | 78 | 5 | 3 | 3 | 0 | 0.25 |
| `recon.contacts` | 4 | 5 | 0.3333 | 1 | 1 | 0 | 1 |
| `recon.noContact` | 45 | 42 | -1 | 3 | 1 | 2 | 1 |
| `recon.timeouts` | 1 | 0 | -0.3333 | 1 | 0 | 1 | 1 |
| `recon.cancelled` | 12 | 28 | 5.3333 | 3 | 3 | 0 | 0.25 |
| `recon.reportsDelivered` | 24 | 23 | -0.3333 | 2 | 1 | 1 | 1 |
| `recon.retriggerBlocked` | 49 | 68 | 6.3333 | 3 | 3 | 0 | 0.25 |
| `squadPerformance.meanOverall` | 239.3 | 236.39999999999998 | -0.9667 | 3 | 1 | 2 | 1 |
| `squadPerformance.p10Overall` | 223.9 | 222 | -0.6333 | 1 | 0 | 1 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 183.8 | 174.5 | -3.1 | 3 | 0 | 3 | 0.25 |
| `squadPerformance.meanMovement` | 299.09999999999997 | 297.8 | -0.4333 | 3 | 1 | 2 | 1 |
| `squadPerformance.meanControl` | 289.2 | 280.4 | -2.9333 | 3 | 1 | 2 | 1 |
| `squadPerformance.meanCohesion` | 275 | 281.4 | 2.1333 | 3 | 3 | 0 | 0.25 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 3 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 0.15 s (timeline) · controller-natural-20261026-0002 0.15 s (timeline) · controller-natural-20261026-0003 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1606&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/meso732-route-search-review-20261103/ai_flow_live.html?bench=1606&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1606`); it opens the seed that parts earliest, and the dropdowns choose another.

