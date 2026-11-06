# Benchmark run #1627 · 60 seeds from `pk767` (ge-defend), windows `contact+120`

- **OFF** flags: `strategicInterception=0&tacticalController=new&pendingKeyRead=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- claude/project-thread-dtjh5a @ c4d4c19 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42142647163) · build v29-dev

## Verdict

**INERT: all 58 pairs identical in every field**


## Paired comparison (off against on)

- **58** pairs (unpaired: off 0, on 0) · identical in every field: **58** · runtime errors off 0 / on 0 · wall time on/off x0.92 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 923 | 923 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 331 | 331 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 592 | 592 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 21804 | 21804 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 2064 | 2064 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 6340 | 6340 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 115835 | 115835 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 10 | 10 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 8 | 8 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 448 | 448 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 85 | 85 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1498 | 1498 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 231 | 231 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 412 | 412 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 28 | 28 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 766 | 766 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 1078 | 1078 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 558 | 558 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 5026.4 | 5026.4 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4556.000000000001 | 4556.000000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4521.599999999999 | 4521.599999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5769.200000000002 | 5769.200000000002 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5527.700000000001 | 5527.700000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5015.4 | 5015.4 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pk767-0001 (identical) · pk767-0002 (identical) · pk767-0003 (identical) · pk767-0004 (identical) · pk767-0005 (identical) · pk767-0006 (identical) · pk767-0007 (identical) · pk767-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1627&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1627`); it opens the seed that parts earliest, and the dropdowns choose another.

