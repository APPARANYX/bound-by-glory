# Benchmark run #1611 · 100 seeds from `grenade759` (us-defend), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerGrenade=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- claude/project-thread-ht54wj @ fa7efc9 · [run](https://github.com/APPARANYX/grasstex/actions/runs/41904170579) · build v29-dev

## Verdict

**QUIET: 14 of 87 pairs changed (median first part 257.1 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties +0.2% (p 1)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **87** pairs (unpaired: off 0, on 0) · identical in every field: **73** · runtime errors off 0 / on 0 · wall time on/off x1.006 (gate 1.25)
- the 3 changed records first part at simulated second: min 210, p10 210, median 257.1, p90 276, max 276

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 1403 | 1406 | 0.0345 | 3 | 2 | 1 | 1 |
| `usKills` | 712 | 714 | 0.023 | 2 | 2 | 0 | 0.5 |
| `geKills` | 691 | 692 | 0.0115 | 3 | 2 | 1 | 1 |
| `fire.total` | 38731 | 38730 | -0.0115 | 3 | 1 | 2 | 1 |
| `fire.hits` | 3152 | 3158 | 0.069 | 2 | 1 | 1 | 1 |
| `retreatSamples` | 10057 | 10046 | -0.1264 | 2 | 0 | 2 | 0.5 |
| `movementResolver.changes` | 181893 | 181888 | -0.0575 | 3 | 2 | 1 | 1 |
| `grenades.throws` | 11 | 12 | 0.0115 | 1 | 1 | 0 | 1 |
| `grenades.bursts` | 10 | 9 | -0.0115 | 1 | 0 | 1 | 1 |
| `grenades.wounded` | 14 | 13 | -0.0115 | 1 | 0 | 1 | 1 |
| `grenades.casualties` | 6 | 8 | 0.023 | 1 | 1 | 0 | 1 |
| `grenades.suppressed` | 25 | 23 | -0.023 | 2 | 0 | 2 | 0.5 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 4 | 5 | 0.0115 | 3 | 2 | 1 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 906 | 907 | 0.0115 | 3 | 2 | 1 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 127 | 125 | -0.023 | 2 | 0 | 2 | 0.5 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2056 | 2059 | 0.0345 | 1 | 1 | 0 | 1 |
| `recon.contacts` | 331 | 328 | -0.0345 | 2 | 1 | 1 | 1 |
| `recon.noContact` | 755 | 759 | 0.046 | 1 | 1 | 0 | 1 |
| `recon.timeouts` | 32 | 32 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 845 | 845 | 0 | 2 | 1 | 1 | 1 |
| `recon.reportsDelivered` | 1419 | 1396 | -0.2644 | 1 | 0 | 1 | 1 |
| `recon.retriggerBlocked` | 784 | 784 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 7454.800000000003 | 7455.100000000003 | 0.0034 | 3 | 1 | 2 | 1 |
| `squadPerformance.p10Overall` | 6697.800000000001 | 6697.600000000001 | -0.0023 | 1 | 0 | 1 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 6577.799999999999 | 6579.7 | 0.0218 | 1 | 1 | 0 | 1 |
| `squadPerformance.meanMovement` | 8652.500000000002 | 8652.300000000001 | -0.0023 | 1 | 0 | 1 | 1 |
| `squadPerformance.meanControl` | 8199.100000000002 | 8197.900000000001 | -0.0138 | 3 | 1 | 2 | 1 |
| `squadPerformance.meanCohesion` | 7624.300000000002 | 7624.500000000002 | 0.0023 | 2 | 1 | 1 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 3 seeds that part earliest (simulated seconds)

grenade759-0026 210 s (timeline) · grenade759-0001 257.1 s (timeline) · grenade759-0083 276 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1611&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1611`); it opens the seed that parts earliest, and the dropdowns choose another.

