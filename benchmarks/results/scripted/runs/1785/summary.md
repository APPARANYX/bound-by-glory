# Benchmark run #1785 · 48 seeds from `pr793-brief900-20261108` (meeting), windows `0+900`

- **OFF** flags: `strategicInterception=0&controllerBriefs=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr793-156811c @ 156811c · [run](https://github.com/APPARANYX/grasstex/actions/runs/42493930826) · build v29-dev

## Verdict

**INERT: all 48 pairs identical in every field**


## Paired comparison (off against on)

- **48** pairs (unpaired: off 0, on 0) · identical in every field: **48** · runtime errors off 0 / on 0 · wall time on/off x0.962 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2164 | 2164 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 930 | 930 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1234 | 1234 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 55156 | 55156 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 4818 | 4818 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 147067 | 147067 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 266986 | 266986 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 50 | 50 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 50 | 50 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 48 | 48 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 15 | 15 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 102 | 102 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 19 | 19 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 72 | 72 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 1760 | 1760 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 320 | 320 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 7 | 7 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1821 | 1821 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 107 | 107 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 931 | 931 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 16 | 16 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 669 | 669 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 481 | 481 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1386 | 1386 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 3737.600000000001 | 3737.600000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 3557.7000000000007 | 3557.7000000000007 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 2731.9 | 2731.9 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 4781.599999999999 | 4781.599999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 4283.4 | 4283.4 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 4479.5 | 4479.5 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr793-brief900-20261108-0001 (identical) · pr793-brief900-20261108-0002 (identical) · pr793-brief900-20261108-0003 (identical) · pr793-brief900-20261108-0004 (identical) · pr793-brief900-20261108-0005 (identical) · pr793-brief900-20261108-0006 (identical) · pr793-brief900-20261108-0007 (identical) · pr793-brief900-20261108-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1785&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr793-156811c/ai_flow_live.html?bench=1785&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1785`); it opens the seed that parts earliest, and the dropdowns choose another.

