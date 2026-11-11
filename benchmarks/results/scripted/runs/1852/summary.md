# Benchmark run #1852 · 4 seeds from `815-accept-20261110` (meeting), windows `0+900`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- main @ 24a84de · [run](https://github.com/APPARANYX/bound-by-glory/actions/runs/42944387526) · build v29-dev

## Verdict

**QUIET: 4 of 4 pairs changed (median first part 0.15 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties -25.1% (p 0.125)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.
- Wall time on/off x1.856 is over the 1.25 gate.

## Paired comparison (off against on)

- **4** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.856 (gate 1.25)
- the 4 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 211 | 158 | -13.25 | 4 | 0 | 4 | 0.125 |
| `usKills` | 99 | 72 | -6.75 | 4 | 0 | 4 | 0.125 |
| `geKills` | 112 | 86 | -6.5 | 4 | 0 | 4 | 0.125 |
| `fire.total` | 2828 | 5497 | 667.25 | 4 | 4 | 0 | 0.125 |
| `fire.hits` | 443 | 376 | -16.75 | 4 | 2 | 2 | 1 |
| `retreatSamples` | 15290 | 19993 | 1175.75 | 4 | 3 | 1 | 0.625 |
| `movementResolver.changes` | 19398 | 32532 | 3283.5 | 4 | 4 | 0 | 0.125 |
| `grenades.throws` | 0 | 8 | 2 | 3 | 3 | 0 | 0.25 |
| `grenades.bursts` | 0 | 8 | 2 | 3 | 3 | 0 | 0.25 |
| `grenades.wounded` | 0 | 7 | 1.75 | 2 | 2 | 0 | 0.5 |
| `grenades.casualties` | 0 | 2 | 0.5 | 2 | 2 | 0 | 0.5 |
| `grenades.suppressed` | 0 | 6 | 1.5 | 2 | 2 | 0 | 0.5 |
| `grenades.friendlyWounded` | 0 | 1 | 0.25 | 1 | 1 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 35 | 10 | -6.25 | 4 | 0 | 4 | 0.125 |
| `loopAlerts.length` | 63 | 244 | 45.25 | 4 | 4 | 0 | 0.125 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 32 | 48 | 4 | 3 | 3 | 0 | 0.25 |
| `stallOutcomes.wakes` | 0 | 1 | 0.25 | 1 | 1 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 177 | 148 | -7.25 | 4 | 1 | 3 | 0.625 |
| `recon.contacts` | 10 | 10 | 0 | 3 | 2 | 1 | 1 |
| `recon.noContact` | 103 | 79 | -6 | 4 | 0 | 4 | 0.125 |
| `recon.timeouts` | 1 | 0 | -0.25 | 1 | 0 | 1 | 1 |
| `recon.cancelled` | 59 | 55 | -1 | 4 | 2 | 2 | 1 |
| `recon.reportsDelivered` | 38 | 40 | 0.5 | 4 | 3 | 1 | 0.625 |
| `recon.retriggerBlocked` | 138 | 126 | -3 | 4 | 1 | 3 | 0.625 |
| `squadPerformance.meanOverall` | 311.70000000000005 | 304.4 | -1.825 | 4 | 0 | 4 | 0.125 |
| `squadPerformance.p10Overall` | 296.9 | 289.3 | -1.9 | 4 | 0 | 4 | 0.125 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 232.40000000000003 | 209.10000000000002 | -5.825 | 4 | 0 | 4 | 0.125 |
| `squadPerformance.meanMovement` | 399.1 | 398.4 | -0.175 | 4 | 0 | 4 | 0.125 |
| `squadPerformance.meanControl` | 368.4 | 357.8 | -2.65 | 4 | 1 | 3 | 0.625 |
| `squadPerformance.meanCohesion` | 368.29999999999995 | 366.9 | -0.35 | 4 | 1 | 3 | 0.625 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 4 seeds that part earliest (simulated seconds)

815-accept-20261110-0001 0.15 s (timeline) · 815-accept-20261110-0002 0.15 s (timeline) · 815-accept-20261110-0003 0.15 s (timeline) · 815-accept-20261110-0004 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1852&repo=APPARANYX%2Fbound-by-glory&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1852`); it opens the seed that parts earliest, and the dropdowns choose another.

