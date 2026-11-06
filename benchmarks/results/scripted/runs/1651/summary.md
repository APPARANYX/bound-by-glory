# Benchmark run #1651 · 3 seeds from `controller-natural-20261026` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new&controllerLeaderless=0&controllerAssault=0&controllerRetreat=0&controllerGrenade=0`
- main @ e87475a · [run](https://github.com/APPARANYX/grasstex/actions/runs/42176196308) · build v29-dev

## Verdict

**QUIET: 3 of 3 pairs changed (median first part 0.15 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties -30.8% (p 0.25)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.
- Wall time on/off x1.412 is over the 1.25 gate.

## Paired comparison (off against on)

- **3** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.412 (gate 1.25)
- the 3 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 159 | 110 | -16.3333 | 3 | 0 | 3 | 0.25 |
| `usKills` | 81 | 51 | -10 | 3 | 0 | 3 | 0.25 |
| `geKills` | 78 | 59 | -6.3333 | 3 | 0 | 3 | 0.25 |
| `fire.total` | 2553 | 3889 | 445.3333 | 3 | 3 | 0 | 0.25 |
| `fire.hits` | 329 | 239 | -30 | 3 | 0 | 3 | 0.25 |
| `retreatSamples` | 5994 | 4350 | -548 | 3 | 1 | 2 | 1 |
| `movementResolver.changes` | 10310 | 13317 | 1002.3333 | 3 | 3 | 0 | 0.25 |
| `grenades.throws` | 0 | 2 | 0.6667 | 1 | 1 | 0 | 1 |
| `grenades.bursts` | 0 | 2 | 0.6667 | 1 | 1 | 0 | 1 |
| `grenades.wounded` | 0 | 1 | 0.3333 | 1 | 1 | 0 | 1 |
| `grenades.casualties` | 0 | 1 | 0.3333 | 1 | 1 | 0 | 1 |
| `grenades.suppressed` | 0 | 1 | 0.3333 | 1 | 1 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 13 | 6 | -2.3333 | 3 | 1 | 2 | 1 |
| `loopAlerts.length` | 16 | 50 | 11.3333 | 3 | 3 | 0 | 0.25 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 8 | 14 | 2 | 2 | 1 | 1 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 64 | 70 | 2 | 3 | 2 | 1 | 1 |
| `recon.contacts` | 5 | 6 | 0.3333 | 2 | 1 | 1 | 1 |
| `recon.noContact` | 45 | 34 | -3.6667 | 3 | 0 | 3 | 0.25 |
| `recon.timeouts` | 1 | 1 | 0 | 2 | 1 | 1 | 1 |
| `recon.cancelled` | 12 | 25 | 4.3333 | 3 | 3 | 0 | 0.25 |
| `recon.reportsDelivered` | 29 | 28 | -0.3333 | 3 | 1 | 2 | 1 |
| `recon.retriggerBlocked` | 49 | 56 | 2.3333 | 3 | 3 | 0 | 0.25 |
| `squadPerformance.meanOverall` | 239.8 | 240.10000000000002 | 0.1 | 3 | 2 | 1 | 1 |
| `squadPerformance.p10Overall` | 223.9 | 223.7 | -0.0667 | 2 | 1 | 1 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 187.7 | 184 | -1.2333 | 3 | 2 | 1 | 1 |
| `squadPerformance.meanMovement` | 299.2 | 298.7 | -0.1667 | 3 | 1 | 2 | 1 |
| `squadPerformance.meanControl` | 287.2 | 275.5 | -3.9 | 3 | 1 | 2 | 1 |
| `squadPerformance.meanCohesion` | 272.40000000000003 | 277.79999999999995 | 1.8 | 3 | 3 | 0 | 0.25 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 3 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 0.15 s (timeline) · controller-natural-20261026-0002 0.15 s (timeline) · controller-natural-20261026-0003 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1651&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1651`); it opens the seed that parts earliest, and the dropdowns choose another.

