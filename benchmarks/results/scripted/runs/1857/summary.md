# Benchmark run #1857 · 4 seeds from `815-accept-20261110` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0&tacticalController=legacy`
- main @ 24a84de · [run](https://github.com/APPARANYX/bound-by-glory/actions/runs/42955272448) · build v29-dev

## Verdict

**INERT: all 4 pairs identical in every field**


## Paired comparison (off against on)

- **4** pairs (unpaired: off 0, on 0) · identical in every field: **4** · runtime errors off 0 / on 0 · wall time on/off x1.011 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 172 | 172 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 87 | 87 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 85 | 85 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 2201 | 2201 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 373 | 373 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 7776 | 7776 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 15364 | 15364 | 0 | 0 | 0 | 0 | 1 |
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
| `vacantObjectiveStalls.length` | 22 | 22 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 36 | 36 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 23 | 23 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 130 | 130 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 7 | 7 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 76 | 76 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 41 | 41 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 25 | 25 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 100 | 100 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 316.4 | 316.4 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 297.6 | 297.6 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 242 | 242 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 399.2 | 399.2 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 375.8 | 375.8 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 365.79999999999995 | 365.79999999999995 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 4 seeds that part earliest (simulated seconds)

815-accept-20261110-0001 (identical) · 815-accept-20261110-0002 (identical) · 815-accept-20261110-0003 (identical) · 815-accept-20261110-0004 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1857&repo=APPARANYX%2Fbound-by-glory&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1857`); it opens the seed that parts earliest, and the dropdowns choose another.

