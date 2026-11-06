# Benchmark run #1626 · 60 seeds from `pk767` (us-defend), windows `contact+120`

- **OFF** flags: `strategicInterception=0&tacticalController=new&pendingKeyRead=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- claude/project-thread-dtjh5a @ c4d4c19 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42142642957) · build v29-dev

## Verdict

**INERT: all 58 pairs identical in every field**


## Paired comparison (off against on)

- **58** pairs (unpaired: off 0, on 0) · identical in every field: **58** · runtime errors off 0 / on 0 · wall time on/off x0.935 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 827 | 827 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 420 | 420 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 407 | 407 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 24931 | 24931 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 1887 | 1887 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 6102 | 6102 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 117356 | 117356 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 12 | 12 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 11 | 11 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 10 | 10 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 26 | 26 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 515 | 515 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 96 | 96 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1423 | 1423 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 223 | 223 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 521 | 521 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 30 | 30 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 602 | 602 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 819 | 819 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 546 | 546 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4993.299999999999 | 4993.299999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4510.599999999999 | 4510.599999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4440.5 | 4440.5 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5766.900000000001 | 5766.900000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5506.099999999999 | 5506.099999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5007.500000000002 | 5007.500000000002 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pk767-0001 (identical) · pk767-0002 (identical) · pk767-0003 (identical) · pk767-0004 (identical) · pk767-0005 (identical) · pk767-0006 (identical) · pk767-0007 (identical) · pk767-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1626&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1626`); it opens the seed that parts earliest, and the dropdowns choose another.

