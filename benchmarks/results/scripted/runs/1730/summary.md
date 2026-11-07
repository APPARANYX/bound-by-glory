# Benchmark run #1730 · 60 seeds from `controller-natural-20261026` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr785-aac9720a @ aac9720 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42383239730) · build v29-dev

## Verdict

**QUIET: 3 of 3 pairs changed (median first part 0.15 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties +2.2% (p 1)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.
- Wall time on/off x1.355 is over the 1.25 gate.

## Paired comparison (off against on)

- **3** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.355 (gate 1.25)
- the 3 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 134 | 137 | 1 | 3 | 2 | 1 | 1 |
| `usKills` | 69 | 62 | -2.3333 | 2 | 1 | 1 | 1 |
| `geKills` | 65 | 75 | 3.3333 | 2 | 2 | 0 | 0.5 |
| `fire.total` | 1960 | 3597 | 545.6667 | 3 | 3 | 0 | 0.25 |
| `fire.hits` | 279 | 296 | 5.6667 | 3 | 2 | 1 | 1 |
| `retreatSamples` | 5681 | 5242 | -146.3333 | 3 | 2 | 1 | 1 |
| `movementResolver.changes` | 11485 | 14187 | 900.6667 | 3 | 3 | 0 | 0.25 |
| `grenades.throws` | 0 | 7 | 2.3333 | 1 | 1 | 0 | 1 |
| `grenades.bursts` | 0 | 7 | 2.3333 | 1 | 1 | 0 | 1 |
| `grenades.wounded` | 0 | 5 | 1.6667 | 1 | 1 | 0 | 1 |
| `grenades.casualties` | 0 | 1 | 0.3333 | 1 | 1 | 0 | 1 |
| `grenades.suppressed` | 0 | 16 | 5.3333 | 1 | 1 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 11 | 6 | -1.6667 | 3 | 0 | 3 | 0.25 |
| `loopAlerts.length` | 38 | 64 | 8.6667 | 3 | 2 | 1 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 14 | 19 | 1.6667 | 3 | 3 | 0 | 0.25 |
| `stallOutcomes.wakes` | 0 | 1 | 0.3333 | 1 | 1 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 1 | 0.3333 | 1 | 1 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 101 | 88 | -4.3333 | 3 | 1 | 2 | 1 |
| `recon.contacts` | 5 | 5 | 0 | 2 | 1 | 1 | 1 |
| `recon.noContact` | 59 | 49 | -3.3333 | 3 | 0 | 3 | 0.25 |
| `recon.timeouts` | 1 | 0 | -0.3333 | 1 | 0 | 1 | 1 |
| `recon.cancelled` | 35 | 31 | -1.3333 | 2 | 1 | 1 | 1 |
| `recon.reportsDelivered` | 28 | 31 | 1 | 3 | 2 | 1 | 1 |
| `recon.retriggerBlocked` | 77 | 71 | -2 | 2 | 0 | 2 | 0.5 |
| `squadPerformance.meanOverall` | 239.8 | 234.5 | -1.7667 | 3 | 0 | 3 | 0.25 |
| `squadPerformance.p10Overall` | 223.4 | 222 | -0.4667 | 2 | 1 | 1 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 188 | 169.6 | -6.1333 | 3 | 0 | 3 | 0.25 |
| `squadPerformance.meanMovement` | 299.40000000000003 | 299.2 | -0.0667 | 2 | 0 | 2 | 0.5 |
| `squadPerformance.meanControl` | 277 | 275 | -0.6667 | 3 | 1 | 2 | 1 |
| `squadPerformance.meanCohesion` | 272.4 | 281.4 | 3 | 3 | 3 | 0 | 0.25 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 3 seeds that part earliest (simulated seconds)

controller-natural-20261026-0004 0.15 s (timeline) · controller-natural-20261026-0005 0.15 s (timeline) · controller-natural-20261026-0006 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1730&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr785-aac9720a/ai_flow_live.html?bench=1730&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1730`); it opens the seed that parts earliest, and the dropdowns choose another.

