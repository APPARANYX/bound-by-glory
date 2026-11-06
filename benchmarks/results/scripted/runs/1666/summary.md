# Benchmark run #1666 · 60 seeds from `reuse773b` (ge-defend), windows `0+600`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerRouteSight=0&controllerRoutePrune=0&controllerSuppressorScan=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/reuse773-7de67f8 @ 7de67f8 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42227169701) · build v29-dev

## Verdict

**QUIET: 23 of 60 pairs changed; 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties +0.0% (p 1)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **37** · runtime errors off 0 / on 0 · wall time on/off x0.918 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2186 | 2186 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 855 | 855 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1331 | 1331 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 55821 | 55821 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 5135 | 5135 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 122729 | 122729 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 197489 | 197489 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 54 | 54 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 54 | 54 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 52 | 52 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 17 | 17 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 121 | 121 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 12 | 12 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 79 | 79 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 837 | 837 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 231 | 231 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 6 | 6 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2686 | 2686 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 560 | 560 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 661 | 661 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 53 | 53 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 1342 | 1342 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 2227 | 2227 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 790 | 790 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4955.799999999999 | 4955.799999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4615.599999999999 | 4615.599999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3995.199999999999 | 3995.199999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5992.799999999999 | 5992.799999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5716.499999999999 | 5716.499999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5526.400000000002 | 5526.400000000002 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

reuse773b-0001 (identical) · reuse773b-0002 (identical) · reuse773b-0003 (identical) · reuse773b-0004 (identical) · reuse773b-0005 (identical) · reuse773b-0006 (identical) · reuse773b-0007 (identical) · reuse773b-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1666&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-reuse773-7de67f8/ai_flow_live.html?bench=1666&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1666`); it opens the seed that parts earliest, and the dropdowns choose another.

