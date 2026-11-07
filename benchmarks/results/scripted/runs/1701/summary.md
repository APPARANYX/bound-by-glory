# Benchmark run #1701 · 60 seeds from `pr779-ambush-release` (us-defend), windows `0+600`

- **OFF** flags: `tacticalController=new&strategicInterception=0&controllerAmbushRelease=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/pr779-1e6f4bb @ 1e6f4bb · [run](https://github.com/APPARANYX/grasstex/actions/runs/42339323242) · build v29-dev

## Verdict

**QUIET: 3 of 60 pairs changed (median first part 222 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties -0.0% (p 1)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **57** · runtime errors off 0 / on 0 · wall time on/off x0.99 (gate 1.25)
- the 1 changed records first part at simulated second: min 222, p10 222, median 222, p90 222, max 222

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2288 | 2287 | -0.0167 | 1 | 0 | 1 | 1 |
| `usKills` | 1013 | 1011 | -0.0333 | 1 | 0 | 1 | 1 |
| `geKills` | 1275 | 1276 | 0.0167 | 1 | 1 | 0 | 1 |
| `fire.total` | 66752 | 66772 | 0.3333 | 1 | 1 | 0 | 1 |
| `fire.hits` | 5099 | 5107 | 0.1333 | 1 | 1 | 0 | 1 |
| `retreatSamples` | 141502 | 141306 | -3.2667 | 1 | 0 | 1 | 1 |
| `movementResolver.changes` | 218707 | 218430 | -4.6167 | 1 | 0 | 1 | 1 |
| `grenades.throws` | 49 | 49 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 49 | 49 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 24 | 24 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 10 | 10 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 76 | 76 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 7 | 7 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 25 | 25 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 1530 | 1532 | 0.0333 | 1 | 1 | 0 | 1 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 288 | 290 | 0.0333 | 1 | 1 | 0 | 1 |
| `stallOutcomes.wakes` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2619 | 2639 | 0.3333 | 1 | 1 | 0 | 1 |
| `recon.contacts` | 559 | 567 | 0.1333 | 1 | 1 | 0 | 1 |
| `recon.noContact` | 726 | 728 | 0.0333 | 1 | 1 | 0 | 1 |
| `recon.timeouts` | 37 | 37 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 1220 | 1229 | 0.15 | 1 | 1 | 0 | 1 |
| `recon.reportsDelivered` | 2356 | 2388 | 0.5333 | 1 | 1 | 0 | 1 |
| `recon.retriggerBlocked` | 807 | 809 | 0.0333 | 1 | 1 | 0 | 1 |
| `squadPerformance.meanOverall` | 4853.700000000002 | 4854.200000000002 | 0.0083 | 1 | 1 | 0 | 1 |
| `squadPerformance.p10Overall` | 4556.999999999999 | 4556.999999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3771.599999999998 | 3772.299999999998 | 0.0117 | 1 | 1 | 0 | 1 |
| `squadPerformance.meanMovement` | 5991.699999999999 | 5991.699999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5632.2 | 5631.2 | -0.0167 | 1 | 0 | 1 | 1 |
| `squadPerformance.meanCohesion` | 5555.2 | 5554.999999999999 | -0.0033 | 1 | 0 | 1 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 1 seed that part earliest (simulated seconds)

pr779-ambush-release-0001 222 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1701&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr779-1e6f4bb/ai_flow_live.html?bench=1701&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1701`); it opens the seed that parts earliest, and the dropdowns choose another.

