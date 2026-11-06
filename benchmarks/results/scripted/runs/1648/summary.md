# Benchmark run #1648 · 60 seeds from `pace772` (meeting), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerStallPace=0&controllerRefillGate=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/pace772-d881be0 @ d881be0 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42174433290) · build v29-dev

## Verdict

**WEAK: 60 of 60 pairs changed (median first part 230.1 s); 1 of 42 counters under p 0.05 (about 2.1 by chance); casualties +0.1% (p 0.3317)**

- Under 0.05 only: loopAlerts.length 734 to 785 (+6.9%, p 0.0336).

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x0.941 (gate 1.25)
- the 59 changed records first part at simulated second: min 180, p10 193.05, median 230.1, p90 271.05, max 286.05

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 1174 | 1175 | 0.0167 | 52 | 30 | 22 | 0.3317 |
| `usKills` | 489 | 479 | -0.1667 | 46 | 22 | 24 | 0.883 |
| `geKills` | 685 | 696 | 0.1833 | 48 | 25 | 23 | 0.8854 |
| `fire.total` | 31321 | 30151 | -19.5 | 57 | 22 | 35 | 0.1112 |
| `fire.hits` | 2736 | 2677 | -0.9833 | 55 | 26 | 29 | 0.7877 |
| `retreatSamples` | 7046 | 6859 | -3.1167 | 53 | 29 | 24 | 0.5831 |
| `movementResolver.changes` | 208472 | 209544 | 17.8667 | 58 | 35 | 23 | 0.148 |
| `grenades.throws` | 18 | 12 | -0.1 | 5 | 1 | 4 | 0.375 |
| `grenades.bursts` | 17 | 11 | -0.1 | 5 | 1 | 4 | 0.375 |
| `grenades.wounded` | 32 | 16 | -0.2667 | 5 | 2 | 3 | 1 |
| `grenades.casualties` | 9 | 5 | -0.0667 | 3 | 1 | 2 | 1 |
| `grenades.suppressed` | 50 | 26 | -0.4 | 4 | 1 | 3 | 0.625 |
| `grenades.friendlyWounded` | 3 | 1 | -0.0333 | 2 | 0 | 2 | 0.5 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 3 | 7 | 0.0667 | 4 | 3 | 1 | 0.625 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 10 | 10 | 0 | 4 | 2 | 2 | 1 |
| `loopAlerts.length` | 734 | 785 | 0.85 | 38 | 26 | 12 | 0.0336 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 38 | 43 | 0.0833 | 20 | 13 | 7 | 0.2632 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1239 | 1243 | 0.0667 | 25 | 14 | 11 | 0.69 |
| `recon.contacts` | 55 | 55 | 0 | 14 | 7 | 7 | 1 |
| `recon.noContact` | 704 | 707 | 0.05 | 7 | 5 | 2 | 0.4531 |
| `recon.timeouts` | 3 | 5 | 0.0333 | 4 | 3 | 1 | 0.625 |
| `recon.cancelled` | 467 | 467 | 0 | 25 | 13 | 12 | 1 |
| `recon.reportsDelivered` | 289 | 291 | 0.0333 | 16 | 7 | 9 | 0.8036 |
| `recon.retriggerBlocked` | 1047 | 1044 | -0.05 | 22 | 10 | 12 | 0.8318 |
| `squadPerformance.meanOverall` | 5038.200000000002 | 5030.599999999999 | -0.1267 | 55 | 30 | 25 | 0.5901 |
| `squadPerformance.p10Overall` | 4622.7 | 4600.899999999999 | -0.3633 | 50 | 24 | 26 | 0.8877 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4280.3 | 4244.9 | -0.59 | 53 | 19 | 34 | 0.0534 |
| `squadPerformance.meanMovement` | 5887.8 | 5889.100000000001 | 0.0217 | 51 | 26 | 25 | 1 |
| `squadPerformance.meanControl` | 5542.800000000001 | 5526.700000000002 | -0.2683 | 51 | 22 | 29 | 0.4011 |
| `squadPerformance.meanCohesion` | 5370.299999999999 | 5399.6 | 0.4883 | 54 | 32 | 22 | 0.2203 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pace772-0057 180 s (timeline) · pace772-0003 182.1 s (timeline) · pace772-0021 190.05 s (timeline) · pace772-0031 190.05 s (timeline) · pace772-0011 191.1 s (timeline) · pace772-0026 193.05 s (timeline) · pace772-0043 193.05 s (timeline) · pace772-0033 199.05 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1648&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pace772-d881be0/ai_flow_live.html?bench=1648&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1648`); it opens the seed that parts earliest, and the dropdowns choose another.

