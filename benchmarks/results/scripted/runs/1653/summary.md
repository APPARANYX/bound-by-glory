# Benchmark run #1653 · 3 seeds from `controller-natural-20261026` (ge-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new&controllerLeaderless=0&controllerAssault=0&controllerRetreat=0&controllerGrenade=0`
- main @ e87475a · [run](https://github.com/APPARANYX/grasstex/actions/runs/42176256758) · build v29-dev

## Verdict

**QUIET: 3 of 3 pairs changed (median first part 0.15 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties -14.1% (p 0.5)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.
- Wall time on/off x1.341 is over the 1.25 gate.

## Paired comparison (off against on)

- **3** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.341 (gate 1.25)
- the 3 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 78 | 67 | -3.6667 | 2 | 0 | 2 | 0.5 |
| `usKills` | 25 | 13 | -4 | 2 | 0 | 2 | 0.5 |
| `geKills` | 53 | 54 | 0.3333 | 2 | 1 | 1 | 1 |
| `fire.total` | 1020 | 1866 | 282 | 2 | 2 | 0 | 0.5 |
| `fire.hits` | 162 | 134 | -9.3333 | 2 | 0 | 2 | 0.5 |
| `retreatSamples` | 2994 | 4853 | 619.6667 | 2 | 2 | 0 | 0.5 |
| `movementResolver.changes` | 4787 | 5794 | 335.6667 | 3 | 3 | 0 | 0.25 |
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
| `vacantObjectiveStalls.length` | 3 | 1 | -0.6667 | 1 | 0 | 1 | 1 |
| `loopAlerts.length` | 15 | 32 | 5.6667 | 2 | 2 | 0 | 0.5 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 6 | 5 | -0.3333 | 1 | 0 | 1 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 63 | 97 | 11.3333 | 3 | 3 | 0 | 0.25 |
| `recon.contacts` | 8 | 26 | 6 | 2 | 2 | 0 | 0.5 |
| `recon.noContact` | 28 | 22 | -2 | 3 | 1 | 2 | 1 |
| `recon.timeouts` | 10 | 5 | -1.6667 | 2 | 0 | 2 | 0.5 |
| `recon.cancelled` | 11 | 40 | 9.6667 | 3 | 3 | 0 | 0.25 |
| `recon.reportsDelivered` | 30 | 95 | 21.6667 | 2 | 2 | 0 | 0.5 |
| `recon.retriggerBlocked` | 27 | 25 | -0.6667 | 2 | 1 | 1 | 1 |
| `squadPerformance.meanOverall` | 261.20000000000005 | 260.6 | -0.2 | 3 | 2 | 1 | 1 |
| `squadPerformance.p10Overall` | 238.7 | 243.5 | 1.6 | 3 | 3 | 0 | 0.25 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 235.1 | 220.4 | -4.9 | 2 | 0 | 2 | 0.5 |
| `squadPerformance.meanMovement` | 299.70000000000005 | 299.8 | 0.0333 | 1 | 1 | 0 | 1 |
| `squadPerformance.meanControl` | 290.7 | 290.6 | -0.0333 | 2 | 1 | 1 | 1 |
| `squadPerformance.meanCohesion` | 265.59999999999997 | 284 | 6.1333 | 3 | 3 | 0 | 0.25 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 3 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 0.15 s (timeline) · controller-natural-20261026-0002 0.15 s (timeline) · controller-natural-20261026-0003 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1653&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1653`); it opens the seed that parts earliest, and the dropdowns choose another.

