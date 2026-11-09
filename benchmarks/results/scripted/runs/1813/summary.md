# Benchmark run #1813 · 48 seeds from `pr796-phase900-20261108` (us-defend), windows `0+900`

- **OFF** flags: `strategicInterception=0&controllerPhaseBand=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr796-0cac14f @ 0cac14f · [run](https://github.com/APPARANYX/grasstex/actions/runs/42536471923) · build v29-dev

## Verdict

**QUIET: 20 of 48 pairs changed (median first part 806.025 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties -0.1% (p 0.6875)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.

## Paired comparison (off against on)

- **48** pairs (unpaired: off 0, on 0) · identical in every field: **28** · runtime errors off 0 / on 0 · wall time on/off x0.993 (gate 1.25)
- the 10 changed records first part at simulated second: min 582, p10 582, median 806.025, p90 897, max 897

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2599 | 2596 | -0.0625 | 6 | 2 | 4 | 0.6875 |
| `usKills` | 1176 | 1175 | -0.0208 | 4 | 2 | 2 | 1 |
| `geKills` | 1423 | 1421 | -0.0417 | 5 | 3 | 2 | 1 |
| `fire.total` | 88193 | 88636 | 9.2292 | 9 | 6 | 3 | 0.5078 |
| `fire.hits` | 5844 | 5851 | 0.1458 | 6 | 3 | 3 | 1 |
| `retreatSamples` | 266361 | 266427 | 1.375 | 6 | 3 | 3 | 1 |
| `movementResolver.changes` | 364414 | 364486 | 1.5 | 9 | 2 | 7 | 0.1797 |
| `grenades.throws` | 60 | 60 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 59 | 59 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 26 | 26 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 13 | 13 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 55 | 55 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 8 | 8 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 43 | 43 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 2411 | 2407 | -0.0833 | 9 | 3 | 6 | 0.5078 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 641 | 632 | -0.1875 | 4 | 0 | 4 | 0.125 |
| `stallOutcomes.wakes` | 7 | 7 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 3615 | 3635 | 0.4167 | 6 | 3 | 3 | 1 |
| `recon.contacts` | 827 | 829 | 0.0417 | 6 | 2 | 4 | 0.6875 |
| `recon.noContact` | 918 | 916 | -0.0417 | 3 | 1 | 2 | 1 |
| `recon.timeouts` | 60 | 62 | 0.0417 | 2 | 2 | 0 | 0.5 |
| `recon.cancelled` | 1740 | 1754 | 0.2917 | 6 | 4 | 2 | 0.6875 |
| `recon.reportsDelivered` | 2981 | 3004 | 0.4792 | 5 | 2 | 3 | 1 |
| `recon.retriggerBlocked` | 1221 | 1228 | 0.1458 | 3 | 2 | 1 | 1 |
| `squadPerformance.meanOverall` | 3774.5999999999995 | 3774.6999999999994 | 0.0021 | 7 | 4 | 3 | 1 |
| `squadPerformance.p10Overall` | 3549.9 | 3549.9 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 2820.0000000000005 | 2818.1000000000004 | -0.0396 | 6 | 2 | 4 | 0.6875 |
| `squadPerformance.meanMovement` | 4784.3 | 4784.3 | 0 | 2 | 1 | 1 | 1 |
| `squadPerformance.meanControl` | 4418.600000000001 | 4418.400000000001 | -0.0042 | 9 | 5 | 4 | 1 |
| `squadPerformance.meanCohesion` | 4386.599999999999 | 4388.7 | 0.0437 | 7 | 4 | 3 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr796-phase900-20261108-0010 582 s (timeline) · pr796-phase900-20261108-0039 729 s (timeline) · pr796-phase900-20261108-0029 770.1 s (timeline) · pr796-phase900-20261108-0037 776.1 s (timeline) · pr796-phase900-20261108-0032 787.05 s (timeline) · pr796-phase900-20261108-0035 825 s (timeline) · pr796-phase900-20261108-0021 857.1 s (timeline) · pr796-phase900-20261108-0022 857.1 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1813&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr796-0cac14f/ai_flow_live.html?bench=1813&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1813`); it opens the seed that parts earliest, and the dropdowns choose another.

