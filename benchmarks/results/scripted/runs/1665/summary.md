# Benchmark run #1665 · 60 seeds from `reuse773b` (meeting), windows `0+600`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerRouteSight=0&controllerRoutePrune=0&controllerSuppressorScan=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/reuse773-7de67f8 @ 7de67f8 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42227162955) · build v29-dev

## Verdict

**QUIET: 36 of 60 pairs changed; 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties +0.0% (p 1)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **24** · runtime errors off 0 / on 0 · wall time on/off x0.966 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2630 | 2630 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 1280 | 1280 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 1350 | 1350 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 70127 | 70127 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 6052 | 6052 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 124168 | 124168 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 310262 | 310262 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 65 | 65 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 65 | 65 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 67 | 67 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 16 | 16 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 136 | 136 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 11 | 11 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 292 | 292 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 980 | 980 | 0 | 0 | 0 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 318 | 318 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 94 | 94 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 94 | 94 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1871 | 1871 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 117 | 117 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 963 | 963 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 11 | 11 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 704 | 704 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 567 | 567 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1487 | 1487 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4775.099999999999 | 4775.099999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.p10Overall` | 4460.4 | 4460.4 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3586.3000000000006 | 3586.3000000000006 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5978.799999999999 | 5978.799999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5623.300000000001 | 5623.300000000001 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanCohesion` | 5585.099999999999 | 5585.099999999999 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

reuse773b-0001 (identical) · reuse773b-0002 (identical) · reuse773b-0003 (identical) · reuse773b-0004 (identical) · reuse773b-0005 (identical) · reuse773b-0006 (identical) · reuse773b-0007 (identical) · reuse773b-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1665&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-reuse773-7de67f8/ai_flow_live.html?bench=1665&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1665`); it opens the seed that parts earliest, and the dropdowns choose another.

