# Benchmark run #1663 · 3 seeds from `controller-natural-20261026` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/combat-renewal-rebrief @ 1fd8614 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42223982634) · build v29-dev

## Verdict

**QUIET: 3 of 3 pairs changed (median first part 0.15 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties -24.8% (p 1)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.
- Wall time on/off x1.8 is over the 1.25 gate.

## Paired comparison (off against on)

- **3** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.8 (gate 1.25)
- the 3 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 121 | 91 | -10 | 3 | 1 | 2 | 1 |
| `usKills` | 53 | 24 | -9.6667 | 2 | 0 | 2 | 0.5 |
| `geKills` | 68 | 67 | -0.3333 | 3 | 1 | 2 | 1 |
| `fire.total` | 2021 | 2951 | 310 | 3 | 2 | 1 | 1 |
| `fire.hits` | 281 | 218 | -21 | 3 | 1 | 2 | 1 |
| `retreatSamples` | 4052 | 5839 | 595.6667 | 3 | 2 | 1 | 1 |
| `movementResolver.changes` | 9365 | 14253 | 1629.3333 | 3 | 3 | 0 | 0.25 |
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
| `vacantObjectiveStalls.length` | 1 | 3 | 0.6667 | 1 | 1 | 0 | 1 |
| `loopAlerts.length` | 16 | 81 | 21.6667 | 3 | 3 | 0 | 0.25 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 2 | 14 | 4 | 3 | 3 | 0 | 0.25 |
| `stallOutcomes.wakes` | 1 | 0 | -0.3333 | 1 | 0 | 1 | 1 |
| `stallOutcomes.repeats` | 1 | 0 | -0.3333 | 1 | 0 | 1 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 72 | 78 | 2 | 3 | 2 | 1 | 1 |
| `recon.contacts` | 3 | 3 | 0 | 2 | 1 | 1 | 1 |
| `recon.noContact` | 58 | 41 | -5.6667 | 2 | 0 | 2 | 0.5 |
| `recon.timeouts` | 1 | 0 | -0.3333 | 1 | 0 | 1 | 1 |
| `recon.cancelled` | 8 | 32 | 8 | 3 | 3 | 0 | 0.25 |
| `recon.reportsDelivered` | 13 | 16 | 1 | 2 | 1 | 1 | 1 |
| `recon.retriggerBlocked` | 64 | 60 | -1.3333 | 3 | 1 | 2 | 1 |
| `squadPerformance.meanOverall` | 240.10000000000002 | 237.7 | -0.8 | 3 | 0 | 3 | 0.25 |
| `squadPerformance.p10Overall` | 222 | 222 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 183.5 | 172.2 | -3.7667 | 3 | 0 | 3 | 0.25 |
| `squadPerformance.meanMovement` | 299.2 | 299.2 | 0 | 2 | 1 | 1 | 1 |
| `squadPerformance.meanControl` | 285.9 | 272.8 | -4.3667 | 3 | 0 | 3 | 0.25 |
| `squadPerformance.meanCohesion` | 273.5 | 283.1 | 3.2 | 3 | 3 | 0 | 0.25 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 3 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 0.15 s (timeline) · controller-natural-20261026-0002 0.15 s (timeline) · controller-natural-20261026-0003 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1663&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/combat-renewal-rebrief/ai_flow_live.html?bench=1663&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1663`); it opens the seed that parts earliest, and the dropdowns choose another.

