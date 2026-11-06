# Benchmark run #1664 · 60 seeds from `reuse773b` (us-defend), windows `0+600`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerRouteSight=0&controllerRoutePrune=0&controllerSuppressorScan=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/reuse773-7de67f8 @ 7de67f8 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42227160688) · build v29-dev

## Verdict

**QUIET: 24 of 60 pairs changed; 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties +0.0% (p 1)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **36** · runtime errors off 0 / on 0 · wall time on/off x0.981 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2138 | 2138 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 1152 | 1152 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 986 | 986 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 60659 | 60659 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 5037 | 5037 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 141646 | 141646 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 200865 | 200865 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 76 | 76 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 74 | 74 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 42 | 42 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 14 | 14 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 152 | 152 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 16 | 16 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 75 | 75 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 849 | 849 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 205 | 205 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2705 | 2705 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 644 | 644 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 698 | 698 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 40 | 40 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 1259 | 1259 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 2528 | 2528 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 770 | 770 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4942.9 | 4942.9 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4593 | 4593 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3904.1999999999994 | 3904.1999999999994 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5991.099999999999 | 5991.099999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5759.299999999998 | 5759.299999999998 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5599.700000000001 | 5599.700000000001 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

reuse773b-0001 (identical) · reuse773b-0002 (identical) · reuse773b-0003 (identical) · reuse773b-0004 (identical) · reuse773b-0005 (identical) · reuse773b-0006 (identical) · reuse773b-0007 (identical) · reuse773b-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1664&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-reuse773-7de67f8/ai_flow_live.html?bench=1664&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1664`); it opens the seed that parts earliest, and the dropdowns choose another.

