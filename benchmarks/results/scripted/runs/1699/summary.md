# Benchmark run #1699 · 60 seeds from `pr779-ambush-release` (ge-defend), windows `0+600`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerAmbushRelease=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/pr779-1e6f4bb @ 1e6f4bb · [run](https://github.com/APPARANYX/grasstex/actions/runs/42339224834) · build v29-dev

## Verdict

**QUIET: 6 of 60 pairs changed (median first part 215.55 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties -0.4% (p 0.5)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **54** · runtime errors off 0 / on 0 · wall time on/off x0.996 (gate 1.25)
- the 2 changed records first part at simulated second: min 188.1, p10 188.1, median 215.55, p90 243, max 243

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2253 | 2243 | -0.1667 | 2 | 0 | 2 | 0.5 |
| `usKills` | 998 | 987 | -0.1833 | 2 | 1 | 1 | 1 |
| `geKills` | 1255 | 1256 | 0.0167 | 2 | 1 | 1 | 1 |
| `fire.total` | 59825 | 59607 | -3.6333 | 2 | 1 | 1 | 1 |
| `fire.hits` | 5115 | 5087 | -0.4667 | 2 | 0 | 2 | 0.5 |
| `retreatSamples` | 133539 | 132738 | -13.35 | 2 | 1 | 1 | 1 |
| `movementResolver.changes` | 201690 | 201373 | -5.2833 | 2 | 1 | 1 | 1 |
| `grenades.throws` | 61 | 61 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 61 | 61 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 36 | 37 | 0.0167 | 2 | 1 | 1 | 1 |
| `grenades.casualties` | 12 | 13 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.suppressed` | 79 | 82 | 0.05 | 2 | 1 | 1 | 1 |
| `grenades.friendlyWounded` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 27 | 26 | -0.0167 | 1 | 0 | 1 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 24 | 21 | -0.05 | 1 | 0 | 1 | 1 |
| `loopAlerts.length` | 1189 | 1182 | -0.1167 | 2 | 1 | 1 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 280 | 269 | -0.1833 | 2 | 0 | 2 | 0.5 |
| `stallOutcomes.wakes` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2853 | 2847 | -0.1 | 2 | 1 | 1 | 1 |
| `recon.contacts` | 643 | 639 | -0.0667 | 2 | 1 | 1 | 1 |
| `recon.noContact` | 700 | 699 | -0.0167 | 1 | 0 | 1 | 1 |
| `recon.timeouts` | 62 | 62 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 1372 | 1373 | 0.0167 | 2 | 1 | 1 | 1 |
| `recon.reportsDelivered` | 2557 | 2539 | -0.3 | 2 | 1 | 1 | 1 |
| `recon.retriggerBlocked` | 829 | 820 | -0.15 | 2 | 0 | 2 | 0.5 |
| `squadPerformance.meanOverall` | 4885.1 | 4888.200000000001 | 0.0517 | 2 | 1 | 1 | 1 |
| `squadPerformance.p10Overall` | 4546.799999999999 | 4548.299999999999 | 0.025 | 1 | 1 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3856.0999999999995 | 3866.8999999999996 | 0.18 | 2 | 2 | 0 | 0.5 |
| `squadPerformance.meanMovement` | 5992.499999999999 | 5992.299999999998 | -0.0033 | 2 | 0 | 2 | 0.5 |
| `squadPerformance.meanControl` | 5650.9000000000015 | 5651.600000000001 | 0.0117 | 2 | 1 | 1 | 1 |
| `squadPerformance.meanCohesion` | 5523.299999999999 | 5517.4 | -0.0983 | 2 | 0 | 2 | 0.5 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 2 seeds that part earliest (simulated seconds)

pr779-ambush-release-0049 188.1 s (timeline) · pr779-ambush-release-0052 243 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1699&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr779-1e6f4bb/ai_flow_live.html?bench=1699&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1699`); it opens the seed that parts earliest, and the dropdowns choose another.

