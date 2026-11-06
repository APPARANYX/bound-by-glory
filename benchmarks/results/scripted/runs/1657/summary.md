# Benchmark run #1657 · 60 seeds from `pace772b` (meeting), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerStallPace=0&controllerRefillGate=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/pace772-cf0334b @ cf0334b · [run](https://github.com/APPARANYX/grasstex/actions/runs/42183430349) · build v29-dev

## Verdict

**WEAK: 60 of 60 pairs changed (median first part 231 s); 1 of 42 counters under p 0.05 (about 2.1 by chance); casualties -1.0% (p 1)**

- Under 0.05 only: squadPerformance.meanCohesion 5435.1 to 5405.999999999999 (-0.5%, p 0.0357).

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x0.951 (gate 1.25)
- the 53 changed records first part at simulated second: min 151.05, p10 186, median 231, p90 274.05, max 303

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 1074 | 1063 | -0.1833 | 46 | 23 | 23 | 1 |
| `usKills` | 463 | 439 | -0.4 | 40 | 20 | 20 | 1 |
| `geKills` | 611 | 624 | 0.2167 | 44 | 24 | 20 | 0.6516 |
| `fire.total` | 30398 | 30201 | -3.2833 | 47 | 21 | 26 | 0.5601 |
| `fire.hits` | 2407 | 2363 | -0.7333 | 47 | 21 | 26 | 0.5601 |
| `retreatSamples` | 6852 | 6661 | -3.1833 | 45 | 23 | 22 | 1 |
| `movementResolver.changes` | 205787 | 205621 | -2.7667 | 51 | 22 | 29 | 0.4011 |
| `grenades.throws` | 16 | 18 | 0.0333 | 7 | 5 | 2 | 0.4531 |
| `grenades.bursts` | 15 | 17 | 0.0333 | 7 | 5 | 2 | 0.4531 |
| `grenades.wounded` | 23 | 16 | -0.1167 | 4 | 1 | 3 | 0.625 |
| `grenades.casualties` | 11 | 8 | -0.05 | 4 | 1 | 3 | 0.625 |
| `grenades.suppressed` | 43 | 30 | -0.2167 | 4 | 1 | 3 | 0.625 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 5 | 3 | -0.0333 | 2 | 0 | 2 | 0.5 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 3 | 6 | 0.05 | 2 | 2 | 0 | 0.5 |
| `loopAlerts.length` | 787 | 778 | -0.15 | 25 | 9 | 16 | 0.2295 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 35 | 34 | -0.0167 | 10 | 5 | 5 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1251 | 1256 | 0.0833 | 21 | 12 | 9 | 0.6636 |
| `recon.contacts` | 54 | 58 | 0.0667 | 11 | 7 | 4 | 0.5488 |
| `recon.noContact` | 682 | 684 | 0.0333 | 2 | 2 | 0 | 0.5 |
| `recon.timeouts` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 504 | 499 | -0.0833 | 22 | 9 | 13 | 0.5235 |
| `recon.reportsDelivered` | 295 | 311 | 0.2667 | 12 | 7 | 5 | 0.7744 |
| `recon.retriggerBlocked` | 1030 | 1027 | -0.05 | 13 | 6 | 7 | 1 |
| `squadPerformance.meanOverall` | 5042.8 | 5047.8 | 0.0833 | 45 | 25 | 20 | 0.5515 |
| `squadPerformance.p10Overall` | 4587 | 4603.7 | 0.2783 | 43 | 21 | 22 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4248.900000000001 | 4288.299999999998 | 0.6567 | 46 | 29 | 17 | 0.1038 |
| `squadPerformance.meanMovement` | 5926.600000000001 | 5925.800000000001 | -0.0133 | 40 | 17 | 23 | 0.4296 |
| `squadPerformance.meanControl` | 5540.200000000002 | 5526.100000000002 | -0.235 | 43 | 18 | 25 | 0.3604 |
| `squadPerformance.meanCohesion` | 5435.1 | 5405.999999999999 | -0.485 | 45 | 15 | 30 | 0.0357 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pace772b-0024 151.05 s (timeline) · pace772b-0042 168 s (timeline) · pace772b-0021 178.05 s (timeline) · pace772b-0016 179.1 s (timeline) · pace772b-0043 184.05 s (timeline) · pace772b-0034 186 s (timeline) · pace772b-0031 188.1 s (timeline) · pace772b-0003 194.1 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1657&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pace772-cf0334b/ai_flow_live.html?bench=1657&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1657`); it opens the seed that parts earliest, and the dropdowns choose another.

