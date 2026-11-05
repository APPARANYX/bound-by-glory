# Benchmark run #1624 · 3 seeds from `controller-natural-20261026` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/contact-march-arrived-posture @ e50ebd0 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42096416746) · build v29-dev

## Verdict

**QUIET: 3 of 3 pairs changed (median first part 0.15 s); 0 of 42 counters under p 0.05 (about 2.1 by chance); casualties -27.8% (p 1)**

- No counter has a sign test under 0.05: no detectable effect on these counters at this many seeds.
- Wall time on/off x1.676 is over the 1.25 gate.

## Paired comparison (off against on)

- **3** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.676 (gate 1.25)
- the 3 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 126 | 91 | -11.6667 | 3 | 1 | 2 | 1 |
| `usKills` | 69 | 24 | -15 | 3 | 0 | 3 | 0.25 |
| `geKills` | 57 | 67 | 3.3333 | 3 | 1 | 2 | 1 |
| `fire.total` | 1863 | 2951 | 362.6667 | 3 | 3 | 0 | 0.25 |
| `fire.hits` | 281 | 218 | -21 | 3 | 1 | 2 | 1 |
| `retreatSamples` | 3695 | 5839 | 714.6667 | 3 | 2 | 1 | 1 |
| `movementResolver.changes` | 9417 | 14269 | 1617.3333 | 3 | 3 | 0 | 0.25 |
| `grenades.throws` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 2 | 3 | 0.3333 | 1 | 1 | 0 | 1 |
| `loopAlerts.length` | 15 | 81 | 22 | 3 | 3 | 0 | 0.25 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 1 | 14 | 4.3333 | 3 | 3 | 0 | 0.25 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 77 | 78 | 0.3333 | 3 | 1 | 2 | 1 |
| `recon.contacts` | 5 | 3 | -0.6667 | 2 | 1 | 1 | 1 |
| `recon.noContact` | 52 | 41 | -3.6667 | 3 | 1 | 2 | 1 |
| `recon.timeouts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 15 | 32 | 5.6667 | 3 | 3 | 0 | 0.25 |
| `recon.reportsDelivered` | 32 | 16 | -5.3333 | 3 | 1 | 2 | 1 |
| `recon.retriggerBlocked` | 61 | 60 | -0.3333 | 3 | 1 | 2 | 1 |
| `squadPerformance.meanOverall` | 241.5 | 237.7 | -1.2667 | 3 | 0 | 3 | 0.25 |
| `squadPerformance.p10Overall` | 222.1 | 222 | -0.0333 | 1 | 0 | 1 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 183.1 | 172.2 | -3.6333 | 3 | 1 | 2 | 1 |
| `squadPerformance.meanMovement` | 299.2 | 299.2 | 0 | 2 | 1 | 1 | 1 |
| `squadPerformance.meanControl` | 288 | 272.8 | -5.0667 | 3 | 0 | 3 | 0.25 |
| `squadPerformance.meanCohesion` | 276.3 | 283.1 | 2.2667 | 3 | 2 | 1 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 3 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 0.15 s (timeline) · controller-natural-20261026-0002 0.15 s (timeline) · controller-natural-20261026-0003 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1624&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/contact-march-arrived-posture/ai_flow_live.html?bench=1624&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1624`); it opens the seed that parts earliest, and the dropdowns choose another.

