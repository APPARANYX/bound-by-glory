# Benchmark run #1650 · 60 seeds from `pace772` (ge-defend), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerStallPace=0&controllerRefillGate=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/pace772-d881be0 @ d881be0 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42174437750) · build v29-dev

## Verdict

**WEAK: 51 of 51 pairs changed (median first part 197.1 s); 1 of 42 counters under p 0.05 (about 2.1 by chance); casualties +1.2% (p 1)**

- Under 0.05 only: recon.cancelled 624 to 650 (+4.2%, p 0.0127).

## Paired comparison (off against on)

- **51** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x0.971 (gate 1.25)
- the 27 changed records first part at simulated second: min 119.1, p10 149.1, median 197.1, p90 219, max 248.1

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 723 | 732 | 0.1765 | 17 | 9 | 8 | 1 |
| `usKills` | 209 | 205 | -0.0784 | 18 | 9 | 9 | 1 |
| `geKills` | 514 | 527 | 0.2549 | 14 | 9 | 5 | 0.424 |
| `fire.total` | 18829 | 18870 | 0.8039 | 22 | 9 | 13 | 0.5235 |
| `fire.hits` | 1608 | 1653 | 0.8824 | 23 | 12 | 11 | 1 |
| `retreatSamples` | 4790 | 4673 | -2.2941 | 20 | 11 | 9 | 0.8238 |
| `movementResolver.changes` | 99220 | 99412 | 3.7647 | 27 | 18 | 9 | 0.1221 |
| `grenades.throws` | 6 | 5 | -0.0196 | 1 | 0 | 1 | 1 |
| `grenades.bursts` | 5 | 4 | -0.0196 | 1 | 0 | 1 | 1 |
| `grenades.wounded` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 2 | 0 | -0.0392 | 1 | 0 | 1 | 1 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 1 | 0 | -0.0196 | 1 | 0 | 1 | 1 |
| `loopAlerts.length` | 432 | 432 | 0 | 18 | 10 | 8 | 0.8145 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 74 | 71 | -0.0588 | 10 | 5 | 5 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1232 | 1252 | 0.3922 | 19 | 14 | 5 | 0.0636 |
| `recon.contacts` | 193 | 191 | -0.0392 | 13 | 6 | 7 | 1 |
| `recon.noContact` | 341 | 345 | 0.0784 | 4 | 3 | 1 | 0.625 |
| `recon.timeouts` | 17 | 17 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 624 | 650 | 0.5098 | 17 | 14 | 3 | 0.0127 |
| `recon.reportsDelivered` | 957 | 951 | -0.1176 | 16 | 8 | 8 | 1 |
| `recon.retriggerBlocked` | 461 | 463 | 0.0392 | 9 | 5 | 4 | 1 |
| `squadPerformance.meanOverall` | 4445.9 | 4448.5 | 0.051 | 22 | 8 | 14 | 0.2863 |
| `squadPerformance.p10Overall` | 4000.9999999999995 | 4012.2 | 0.2196 | 14 | 7 | 7 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4054.0999999999995 | 4062.899999999999 | 0.1725 | 20 | 9 | 11 | 0.8238 |
| `squadPerformance.meanMovement` | 5073.400000000001 | 5074.300000000001 | 0.0176 | 13 | 9 | 4 | 0.2668 |
| `squadPerformance.meanControl` | 4821.7 | 4818.499999999999 | -0.0627 | 24 | 12 | 12 | 1 |
| `squadPerformance.meanCohesion` | 4433.200000000001 | 4424.599999999999 | -0.1686 | 23 | 12 | 11 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pace772-0055 119.1 s (timeline) · pace772-0036 145.05 s (timeline) · pace772-0041 149.1 s (timeline) · pace772-0049 149.1 s (timeline) · pace772-0048 151.05 s (timeline) · pace772-0046 162 s (timeline) · pace772-0037 166.05 s (timeline) · pace772-0054 167.1 s (stress)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1650&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pace772-d881be0/ai_flow_live.html?bench=1650&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1650`); it opens the seed that parts earliest, and the dropdowns choose another.

