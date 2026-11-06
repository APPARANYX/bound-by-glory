# Benchmark run #1675 · 60 seeds from `controller-natural-20261026` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/pin/pr776-adfab042 @ adfab04 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42312167420) · build v29-dev

## Verdict

**MOVED: 30 of 30 pairs changed (median first part 0.15 s); 16 of 42 counters under p 0.05 (about 2.1 by chance), 6 under 0.0012; casualties -7.7% (p 0.69)**

- Clears the Bonferroni line (p < 0.0012): fire.total 17887 to 29703 (+66.1%, p 0); movementResolver.changes 75648 to 98149 (+29.7%, p 0); recon.orders 743 to 1217 (+63.8%, p 0); recon.contacts 102 to 231 (+126.5%, p 0); recon.cancelled 256 to 577 (+125.4%, p 0); squadPerformance.meanMission 2042.6000000000001 to 1886.3 (-7.7%, p 0).
- Under 0.05 only: vacantObjectiveStalls.length 54 to 12 (-77.8%, p 0.0013); retreatSamples 55374 to 72974 (+31.8%, p 0.0015); recon.reportsDelivered 449 to 919 (+104.7%, p 0.0025); grenades.bursts 10 to 35 (+250.0%, p 0.0034); squadPerformance.meanCohesion 2726.3999999999996 to 2791.1 (+2.4%, p 0.0052); grenades.throws 11 to 35 (+218.2%, p 0.0063); grenades.wounded 7 to 30 (+328.6%, p 0.0078); recon.retriggerBlocked 336 to 415 (+23.5%, p 0.0094); grenades.suppressed 43 to 83 (+93.0%, p 0.0215); squadPerformance.meanOverall 2480.7 to 2444.7000000000003 (-1.5%, p 0.0241).
- Wall time on/off x1.595 is over the 1.25 gate.
- Unpaired records: off 6, on 0 (a seed or checkpoint only one arm reached: the flag changed how long the battle lasted, or a shard failed).

## Paired comparison (off against on)

- **30** pairs (unpaired: off 6, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.595 (gate 1.25)
- the 30 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 1168 | 1078 | -3 | 25 | 14 | 11 | 0.69 |
| `usKills` | 531 | 475 | -1.8667 | 24 | 8 | 16 | 0.1516 |
| `geKills` | 637 | 603 | -1.1333 | 26 | 12 | 14 | 0.845 |
| `fire.total` | 17887 | 29703 | 393.8667 | 27 | 26 | 1 | 0 |
| `fire.hits` | 2491 | 2520 | 0.9667 | 27 | 12 | 15 | 0.7011 |
| `retreatSamples` | 55374 | 72974 | 586.6667 | 27 | 22 | 5 | 0.0015 |
| `movementResolver.changes` | 75648 | 98149 | 750.0333 | 30 | 27 | 3 | 0 |
| `grenades.throws` | 11 | 35 | 0.8 | 12 | 11 | 1 | 0.0063 |
| `grenades.bursts` | 10 | 35 | 0.8333 | 13 | 12 | 1 | 0.0034 |
| `grenades.wounded` | 7 | 30 | 0.7667 | 8 | 8 | 0 | 0.0078 |
| `grenades.casualties` | 4 | 10 | 0.2 | 6 | 5 | 1 | 0.2188 |
| `grenades.suppressed` | 43 | 83 | 1.3333 | 10 | 9 | 1 | 0.0215 |
| `grenades.friendlyWounded` | 0 | 7 | 0.2333 | 2 | 2 | 0 | 0.5 |
| `grenades.friendlyCasualties` | 0 | 3 | 0.1 | 1 | 1 | 0 | 1 |
| `grenades.aborted` | 1 | 5 | 0.1333 | 4 | 4 | 0 | 0.125 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 54 | 12 | -1.4 | 18 | 2 | 16 | 0.0013 |
| `loopAlerts.length` | 447 | 586 | 4.6333 | 26 | 18 | 8 | 0.0755 |
| `writerConflicts` | 0 | 2 | 0.0667 | 1 | 1 | 0 | 1 |
| `regroups.entries` | 110 | 127 | 0.5667 | 24 | 13 | 11 | 0.8388 |
| `stallOutcomes.wakes` | 6 | 2 | -0.1333 | 4 | 0 | 4 | 0.125 |
| `stallOutcomes.repeats` | 4 | 1 | -0.1 | 3 | 0 | 3 | 0.25 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 743 | 1217 | 15.8 | 30 | 27 | 3 | 0 |
| `recon.contacts` | 102 | 231 | 4.3 | 27 | 24 | 3 | 0 |
| `recon.noContact` | 315 | 329 | 0.4667 | 24 | 13 | 11 | 0.8388 |
| `recon.timeouts` | 30 | 29 | -0.0333 | 10 | 6 | 4 | 0.7539 |
| `recon.cancelled` | 256 | 577 | 10.7 | 29 | 27 | 2 | 0 |
| `recon.reportsDelivered` | 449 | 919 | 15.6667 | 26 | 21 | 5 | 0.0025 |
| `recon.retriggerBlocked` | 336 | 415 | 2.6333 | 26 | 20 | 6 | 0.0094 |
| `squadPerformance.meanOverall` | 2480.7 | 2444.7000000000003 | -1.2 | 29 | 8 | 21 | 0.0241 |
| `squadPerformance.p10Overall` | 2296.3999999999996 | 2291.6 | -0.16 | 15 | 8 | 7 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 2042.6000000000001 | 1886.3 | -5.21 | 27 | 1 | 26 | 0 |
| `squadPerformance.meanMovement` | 2995.9000000000005 | 2995.900000000001 | 0 | 19 | 10 | 9 | 1 |
| `squadPerformance.meanControl` | 2854.1000000000004 | 2839.3 | -0.4933 | 27 | 11 | 16 | 0.4421 |
| `squadPerformance.meanCohesion` | 2726.3999999999996 | 2791.1 | 2.1567 | 30 | 23 | 7 | 0.0052 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 0.15 s (timeline) · controller-natural-20261026-0002 0.15 s (timeline) · controller-natural-20261026-0003 0.15 s (timeline) · controller-natural-20261026-0010 0.15 s (timeline) · controller-natural-20261026-0011 0.15 s (timeline) · controller-natural-20261026-0012 0.15 s (timeline) · controller-natural-20261026-0013 0.15 s (timeline) · controller-natural-20261026-0014 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1675&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr776-adfab042/ai_flow_live.html?bench=1675&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1675`); it opens the seed that parts earliest, and the dropdowns choose another.

