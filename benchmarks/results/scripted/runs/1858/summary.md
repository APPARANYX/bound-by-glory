# Benchmark run #1858 · 4 seeds from `815-accept-20261110` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0&controllerReconstitution=0&controllerRecovery=0&controllerBriefs=0&controllerTransport=0`
- main @ 24a84de · [run](https://github.com/APPARANYX/bound-by-glory/actions/runs/42955977065) · build v29-dev

## Verdict

**QUIET: 4 of 4 pairs changed (median first part 0.15 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties -15.7% (p 0.625)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.
- Wall time on/off x1.765 is over the 1.25 gate.

## Paired comparison (off against on)

- **4** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.765 (gate 1.25)
- the 4 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 172 | 145 | -6.75 | 4 | 1 | 3 | 0.625 |
| `usKills` | 87 | 68 | -4.75 | 4 | 1 | 3 | 0.625 |
| `geKills` | 85 | 77 | -2 | 4 | 1 | 3 | 0.625 |
| `fire.total` | 2201 | 4861 | 665 | 4 | 4 | 0 | 0.125 |
| `fire.hits` | 373 | 349 | -6 | 4 | 2 | 2 | 1 |
| `retreatSamples` | 7776 | 8377 | 150.25 | 4 | 1 | 3 | 0.625 |
| `movementResolver.changes` | 15364 | 27560 | 3049 | 4 | 4 | 0 | 0.125 |
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
| `vacantObjectiveStalls.length` | 22 | 6 | -4 | 4 | 0 | 4 | 0.125 |
| `loopAlerts.length` | 36 | 193 | 39.25 | 4 | 4 | 0 | 0.125 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 23 | 34 | 2.75 | 4 | 4 | 0 | 0.125 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 130 | 114 | -4 | 3 | 1 | 2 | 1 |
| `recon.contacts` | 7 | 6 | -0.25 | 2 | 1 | 1 | 1 |
| `recon.noContact` | 76 | 63 | -3.25 | 4 | 1 | 3 | 0.625 |
| `recon.timeouts` | 1 | 0 | -0.25 | 1 | 0 | 1 | 1 |
| `recon.cancelled` | 41 | 44 | 0.75 | 4 | 2 | 2 | 1 |
| `recon.reportsDelivered` | 25 | 29 | 1 | 3 | 2 | 1 | 1 |
| `recon.retriggerBlocked` | 100 | 101 | 0.25 | 3 | 1 | 2 | 1 |
| `squadPerformance.meanOverall` | 316.4 | 308.8 | -1.9 | 4 | 0 | 4 | 0.125 |
| `squadPerformance.p10Overall` | 297.6 | 296 | -0.4 | 3 | 1 | 2 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 242 | 217.79999999999998 | -6.05 | 4 | 0 | 4 | 0.125 |
| `squadPerformance.meanMovement` | 399.2 | 398.3 | -0.225 | 4 | 0 | 4 | 0.125 |
| `squadPerformance.meanControl` | 375.8 | 358.79999999999995 | -4.25 | 4 | 1 | 3 | 0.625 |
| `squadPerformance.meanCohesion` | 365.79999999999995 | 362.59999999999997 | -0.8 | 4 | 1 | 3 | 0.625 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 4 seeds that part earliest (simulated seconds)

815-accept-20261110-0001 0.15 s (timeline) · 815-accept-20261110-0002 0.15 s (timeline) · 815-accept-20261110-0003 0.15 s (timeline) · 815-accept-20261110-0004 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1858&repo=APPARANYX%2Fbound-by-glory&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1858`); it opens the seed that parts earliest, and the dropdowns choose another.

