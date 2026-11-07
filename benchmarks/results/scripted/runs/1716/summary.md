# Benchmark run #1716 · 60 seeds from `pr782-defend-majority` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&defendMajorityWin=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr782-8ebb4df @ 8ebb4df · [run](https://github.com/APPARANYX/grasstex/actions/runs/42347094375) · build v29-dev

## Verdict

**QUIET: 12 of 60 pairs changed; 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties +9.3% (p 0.0625)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **48** · runtime errors off 0 / on 0 · wall time on/off x0.993 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2440 | 2666 | 3.7667 | 5 | 5 | 0 | 0.0625 |
| `usKills` | 1172 | 1291 | 1.9833 | 5 | 5 | 0 | 0.0625 |
| `geKills` | 1268 | 1375 | 1.7833 | 5 | 5 | 0 | 0.0625 |
| `fire.total` | 36433 | 39339 | 48.4333 | 5 | 5 | 0 | 0.0625 |
| `fire.hits` | 5256 | 5720 | 7.7333 | 5 | 5 | 0 | 0.0625 |
| `retreatSamples` | 121205 | 134628 | 223.7167 | 5 | 5 | 0 | 0.0625 |
| `movementResolver.changes` | 155806 | 167263 | 190.95 | 5 | 5 | 0 | 0.0625 |
| `grenades.throws` | 88 | 91 | 0.05 | 2 | 2 | 0 | 0.5 |
| `grenades.bursts` | 88 | 91 | 0.05 | 2 | 2 | 0 | 0.5 |
| `grenades.wounded` | 62 | 63 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.casualties` | 20 | 21 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.suppressed` | 159 | 160 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.friendlyWounded` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 7 | 7 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 105 | 109 | 0.0667 | 2 | 2 | 0 | 0.5 |
| `loopAlerts.length` | 752 | 829 | 1.2833 | 5 | 5 | 0 | 0.0625 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 204 | 224 | 0.3333 | 4 | 4 | 0 | 0.125 |
| `stallOutcomes.wakes` | 9 | 9 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1565 | 1636 | 1.1833 | 5 | 5 | 0 | 0.0625 |
| `recon.contacts` | 272 | 284 | 0.2 | 4 | 4 | 0 | 0.125 |
| `recon.noContact` | 715 | 762 | 0.7833 | 5 | 5 | 0 | 0.0625 |
| `recon.timeouts` | 38 | 41 | 0.05 | 2 | 2 | 0 | 0.5 |
| `recon.cancelled` | 468 | 497 | 0.4833 | 5 | 5 | 0 | 0.0625 |
| `recon.reportsDelivered` | 1203 | 1261 | 0.9667 | 3 | 3 | 0 | 0.25 |
| `recon.retriggerBlocked` | 722 | 771 | 0.8167 | 5 | 5 | 0 | 0.0625 |
| `squadPerformance.meanOverall` | 4921.2 | 4838.5 | -1.3783 | 5 | 0 | 5 | 0.0625 |
| `squadPerformance.p10Overall` | 4550.299999999999 | 4454.200000000001 | -1.6017 | 5 | 0 | 5 | 0.0625 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3969.1000000000004 | 3817.7000000000003 | -2.5233 | 5 | 0 | 5 | 0.0625 |
| `squadPerformance.meanMovement` | 5992.1 | 5991.700000000001 | -0.0067 | 4 | 0 | 4 | 0.125 |
| `squadPerformance.meanControl` | 5724.499999999999 | 5702.099999999998 | -0.3733 | 5 | 0 | 5 | 0.0625 |
| `squadPerformance.meanCohesion` | 5468.999999999998 | 5450.299999999997 | -0.3117 | 5 | 0 | 5 | 0.0625 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr782-defend-majority-0001 (identical) · pr782-defend-majority-0002 (identical) · pr782-defend-majority-0003 (identical) · pr782-defend-majority-0004 (identical) · pr782-defend-majority-0005 (identical) · pr782-defend-majority-0006 (identical) · pr782-defend-majority-0007 (identical) · pr782-defend-majority-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1716&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr782-8ebb4df/ai_flow_live.html?bench=1716&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1716`); it opens the seed that parts earliest, and the dropdowns choose another.

