# Benchmark run #1610 · 100 seeds from `grenade759` (meeting), windows `contact+120`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerGrenade=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- claude/project-thread-ht54wj @ fa7efc9 · [run](https://github.com/APPARANYX/grasstex/actions/runs/41904163615) · build v29-dev

## Verdict

**QUIET: 28 of 100 pairs changed (median first part 264 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties -0.3% (p 0.375)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **100** pairs (unpaired: off 0, on 0) · identical in every field: **72** · runtime errors off 0 / on 0 · wall time on/off x0.997 (gate 1.25)
- the 7 changed records first part at simulated second: min 235.05, p10 235.05, median 264, p90 315, max 315

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 1870 | 1865 | -0.05 | 5 | 1 | 4 | 0.375 |
| `usKills` | 822 | 824 | 0.02 | 5 | 3 | 2 | 1 |
| `geKills` | 1048 | 1041 | -0.07 | 5 | 2 | 3 | 1 |
| `fire.total` | 51098 | 51200 | 1.02 | 7 | 6 | 1 | 0.125 |
| `fire.hits` | 4243 | 4231 | -0.12 | 7 | 2 | 5 | 0.4531 |
| `retreatSamples` | 11199 | 11162 | -0.37 | 7 | 3 | 4 | 1 |
| `movementResolver.changes` | 344297 | 344445 | 1.48 | 7 | 4 | 3 | 1 |
| `grenades.throws` | 23 | 28 | 0.05 | 6 | 5 | 1 | 0.2188 |
| `grenades.bursts` | 22 | 26 | 0.04 | 6 | 5 | 1 | 0.2188 |
| `grenades.wounded` | 16 | 17 | 0.01 | 2 | 1 | 1 | 1 |
| `grenades.casualties` | 5 | 3 | -0.02 | 2 | 1 | 1 | 1 |
| `grenades.suppressed` | 29 | 32 | 0.03 | 4 | 2 | 2 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 6 | 10 | 0.04 | 3 | 3 | 0 | 0.25 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 13 | 13 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 1369 | 1371 | 0.02 | 2 | 2 | 0 | 0.5 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 67 | 68 | 0.01 | 1 | 1 | 0 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2092 | 2091 | -0.01 | 3 | 1 | 2 | 1 |
| `recon.contacts` | 89 | 91 | 0.02 | 1 | 1 | 0 | 1 |
| `recon.noContact` | 1175 | 1174 | -0.01 | 1 | 0 | 1 | 1 |
| `recon.timeouts` | 8 | 8 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 800 | 799 | -0.01 | 1 | 0 | 1 | 1 |
| `recon.reportsDelivered` | 508 | 519 | 0.11 | 1 | 1 | 0 | 1 |
| `recon.retriggerBlocked` | 1749 | 1748 | -0.01 | 1 | 0 | 1 | 1 |
| `squadPerformance.meanOverall` | 8387 | 8386.600000000002 | -0.004 | 6 | 2 | 4 | 0.6875 |
| `squadPerformance.p10Overall` | 7650.400000000001 | 7649.100000000001 | -0.013 | 6 | 2 | 4 | 0.6875 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 7176.800000000002 | 7180.600000000003 | 0.038 | 6 | 3 | 3 | 1 |
| `squadPerformance.meanMovement` | 9841.600000000004 | 9841.800000000003 | 0.002 | 5 | 3 | 2 | 1 |
| `squadPerformance.meanControl` | 9147.499999999998 | 9138.899999999996 | -0.086 | 6 | 2 | 4 | 0.6875 |
| `squadPerformance.meanCohesion` | 8901.700000000004 | 8904.800000000003 | 0.031 | 7 | 5 | 2 | 0.4531 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 7 seeds that part earliest (simulated seconds)

grenade759-0006 235.05 s (timeline) · grenade759-0011 236.1 s (timeline) · grenade759-0020 247.05 s (timeline) · grenade759-0033 264 s (timeline) · grenade759-0039 288 s (timeline) · grenade759-0042 304.05 s (stress) · grenade759-0091 315 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1610&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1610`); it opens the seed that parts earliest, and the dropdowns choose another.

