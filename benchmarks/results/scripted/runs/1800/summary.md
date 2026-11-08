# Benchmark run #1800 · 48 seeds from `pr795-transport900-20261108` (us-defend), windows `0+900`

- **OFF** flags: `strategicInterception=0&controllerTransport=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr795-504f69e3 @ 504f69e · [run](https://github.com/APPARANYX/grasstex/actions/runs/42519445148) · build v29-dev

## Verdict

**INERT: all 48 pairs identical in every field**


## Paired comparison (off against on)

- **48** pairs (unpaired: off 0, on 0) · identical in every field: **48** · runtime errors off 0 / on 0 · wall time on/off x0.988 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2730 | 2730 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 1071 | 1071 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1659 | 1659 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 85954 | 85954 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 6186 | 6186 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 257139 | 257139 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 376719 | 376719 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 73 | 73 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 73 | 73 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 35 | 35 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 17 | 17 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 96 | 96 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 19 | 19 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 79 | 79 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 2545 | 2545 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 627 | 627 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 15 | 15 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 7 | 7 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 3686 | 3686 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 751 | 751 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 986 | 986 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 62 | 62 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 1823 | 1823 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 2678 | 2678 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1270 | 1270 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 3777.6 | 3777.6 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 3549.7000000000003 | 3549.7000000000003 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 2827.7 | 2827.7 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 4785.6 | 4785.6 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 4407.599999999999 | 4407.599999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 4386.699999999999 | 4386.699999999999 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr795-transport900-20261108-0001 (identical) · pr795-transport900-20261108-0002 (identical) · pr795-transport900-20261108-0003 (identical) · pr795-transport900-20261108-0004 (identical) · pr795-transport900-20261108-0005 (identical) · pr795-transport900-20261108-0006 (identical) · pr795-transport900-20261108-0007 (identical) · pr795-transport900-20261108-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1800&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr795-504f69e3/ai_flow_live.html?bench=1800&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1800`); it opens the seed that parts earliest, and the dropdowns choose another.

