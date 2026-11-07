# Benchmark run #1688 · 60 seeds from `pr777-contact-stable` (ge-defend), windows `0+600`

- **OFF** flags: `tacticalController=new&strategicInterception=0&contactActionStable=0` · **ON** flags: `tacticalController=new&strategicInterception=0`
- work/pin/pr777-bdcac65f @ bdcac65 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42328537134) · build v29-dev

## Verdict

**QUIET: 56 of 60 pairs changed (median first part 173.1 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties -0.5% (p 0.5572)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **4** · runtime errors off 0 / on 0 · wall time on/off x0.972 (gate 1.25)
- the 49 changed records first part at simulated second: min 120, p10 130.05, median 173.1, p90 272.1, max 327

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 1936 | 1927 | -0.15 | 26 | 11 | 15 | 0.5572 |
| `usKills` | 709 | 702 | -0.1167 | 23 | 11 | 12 | 1 |
| `geKills` | 1227 | 1225 | -0.0333 | 25 | 13 | 12 | 1 |
| `fire.total` | 54292 | 53187 | -18.4167 | 27 | 12 | 15 | 0.7011 |
| `fire.hits` | 4332 | 4346 | 0.2333 | 25 | 11 | 14 | 0.69 |
| `retreatSamples` | 125258 | 124359 | -14.9833 | 27 | 15 | 12 | 0.7011 |
| `movementResolver.changes` | 191324 | 189253 | -34.5167 | 38 | 13 | 25 | 0.073 |
| `grenades.throws` | 28 | 23 | -0.0833 | 4 | 1 | 3 | 0.625 |
| `grenades.bursts` | 27 | 22 | -0.0833 | 4 | 1 | 3 | 0.625 |
| `grenades.wounded` | 14 | 9 | -0.0833 | 5 | 2 | 3 | 1 |
| `grenades.casualties` | 7 | 3 | -0.0667 | 4 | 2 | 2 | 1 |
| `grenades.suppressed` | 24 | 27 | 0.05 | 4 | 2 | 2 | 1 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 8 | 5 | -0.05 | 2 | 0 | 2 | 0.5 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 10 | 4 | -0.1 | 6 | 1 | 5 | 0.2188 |
| `loopAlerts.length` | 1090 | 1030 | -1 | 26 | 10 | 16 | 0.3269 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 181 | 183 | 0.0333 | 20 | 10 | 10 | 1 |
| `stallOutcomes.wakes` | 7 | 6 | -0.0167 | 5 | 2 | 3 | 1 |
| `stallOutcomes.repeats` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2536 | 2552 | 0.2667 | 26 | 14 | 12 | 0.845 |
| `recon.contacts` | 542 | 528 | -0.2333 | 23 | 8 | 15 | 0.21 |
| `recon.noContact` | 652 | 668 | 0.2667 | 24 | 16 | 8 | 0.1516 |
| `recon.timeouts` | 29 | 36 | 0.1167 | 10 | 8 | 2 | 0.1094 |
| `recon.cancelled` | 1241 | 1237 | -0.0667 | 24 | 13 | 11 | 0.8388 |
| `recon.reportsDelivered` | 2163 | 2077 | -1.4333 | 26 | 12 | 14 | 0.845 |
| `recon.retriggerBlocked` | 770 | 775 | 0.0833 | 18 | 9 | 9 | 1 |
| `squadPerformance.meanOverall` | 4955.400000000001 | 4959.700000000001 | 0.0717 | 26 | 16 | 10 | 0.3269 |
| `squadPerformance.p10Overall` | 4631.300000000001 | 4635.700000000001 | 0.0733 | 12 | 7 | 5 | 0.7744 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3962.3 | 3959.7 | -0.0433 | 27 | 13 | 14 | 1 |
| `squadPerformance.meanMovement` | 5993.099999999999 | 5993.499999999999 | 0.0067 | 13 | 8 | 5 | 0.5811 |
| `squadPerformance.meanControl` | 5680.8 | 5691.199999999999 | 0.1733 | 27 | 17 | 10 | 0.2478 |
| `squadPerformance.meanCohesion` | 5559.299999999998 | 5561.4 | 0.035 | 26 | 11 | 15 | 0.5572 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr777-contact-stable-0007 120 s (timeline) · pr777-contact-stable-0054 128.1 s (timeline) · pr777-contact-stable-0056 128.1 s (timeline) · pr777-contact-stable-0053 129 s (timeline) · pr777-contact-stable-0058 130.05 s (timeline) · pr777-contact-stable-0052 140.1 s (timeline) · pr777-contact-stable-0006 145.05 s (timeline) · pr777-contact-stable-0013 145.05 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1688&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr777-bdcac65f/ai_flow_live.html?bench=1688&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1688`); it opens the seed that parts earliest, and the dropdowns choose another.

