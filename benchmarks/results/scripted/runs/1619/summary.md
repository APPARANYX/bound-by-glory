# Benchmark run #1619 · 3 seeds from `controller-natural-20261026` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/fled-refuge-posture @ da0ce22 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42028030731) · build v29-dev

## Verdict

**QUIET: 3 of 3 pairs changed (median first part 0.15 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties -16.5% (p 0.25)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.
- Wall time on/off x2.042 is over the 1.25 gate.

## Paired comparison (off against on)

- **3** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x2.042 (gate 1.25)
- the 3 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 164 | 137 | -9 | 3 | 0 | 3 | 0.25 |
| `usKills` | 68 | 70 | 0.6667 | 3 | 1 | 2 | 1 |
| `geKills` | 96 | 67 | -9.6667 | 3 | 1 | 2 | 1 |
| `fire.total` | 2360 | 4204 | 614.6667 | 3 | 3 | 0 | 0.25 |
| `fire.hits` | 374 | 324 | -16.6667 | 3 | 0 | 3 | 0.25 |
| `retreatSamples` | 5965 | 5837 | -42.6667 | 3 | 2 | 1 | 1 |
| `movementResolver.changes` | 9994 | 16048 | 2018 | 3 | 3 | 0 | 0.25 |
| `grenades.throws` | 0 | 1 | 0.3333 | 1 | 1 | 0 | 1 |
| `grenades.bursts` | 0 | 1 | 0.3333 | 1 | 1 | 0 | 1 |
| `grenades.wounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 2 | 1 | -0.3333 | 1 | 0 | 1 | 1 |
| `loopAlerts.length` | 27 | 142 | 38.3333 | 3 | 3 | 0 | 0.25 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 7 | 9 | 0.6667 | 3 | 2 | 1 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 59 | 78 | 6.3333 | 3 | 2 | 1 | 1 |
| `recon.contacts` | 5 | 6 | 0.3333 | 1 | 1 | 0 | 1 |
| `recon.noContact` | 44 | 40 | -1.3333 | 3 | 1 | 2 | 1 |
| `recon.timeouts` | 1 | 0 | -0.3333 | 1 | 0 | 1 | 1 |
| `recon.cancelled` | 7 | 26 | 6.3333 | 3 | 3 | 0 | 0.25 |
| `recon.reportsDelivered` | 33 | 41 | 2.6667 | 2 | 2 | 0 | 0.5 |
| `recon.retriggerBlocked` | 49 | 67 | 6 | 3 | 3 | 0 | 0.25 |
| `squadPerformance.meanOverall` | 237.59999999999997 | 233 | -1.5333 | 3 | 0 | 3 | 0.25 |
| `squadPerformance.p10Overall` | 223.9 | 222 | -0.6333 | 1 | 0 | 1 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 179.1 | 168.9 | -3.4 | 3 | 1 | 2 | 1 |
| `squadPerformance.meanMovement` | 299.09999999999997 | 297.9 | -0.4 | 3 | 0 | 3 | 0.25 |
| `squadPerformance.meanControl` | 284.09999999999997 | 264.9 | -6.4 | 3 | 0 | 3 | 0.25 |
| `squadPerformance.meanCohesion` | 274.4 | 280.7 | 2.1 | 3 | 3 | 0 | 0.25 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 3 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 0.15 s (timeline) · controller-natural-20261026-0002 0.15 s (timeline) · controller-natural-20261026-0003 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1619&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/fled-refuge-posture/ai_flow_live.html?bench=1619&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1619`); it opens the seed that parts earliest, and the dropdowns choose another.

