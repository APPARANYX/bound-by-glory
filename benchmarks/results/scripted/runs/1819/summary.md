# Benchmark run #1819 · 60 seeds from `pr797-micro-u-20261109` (ge-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr797-5d7cc87 @ 5d7cc87 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42566383881) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 21 of 42 counters under p 0.05 (about 2.1 by chance), 18 under 0.0012; casualties -26.6% (p 0)**

- Clears the Bonferroni line (p < 0.0012): casualties 2969 to 2178 (-26.6%, p 0); geKills 1702 to 1231 (-27.7%, p 0); fire.total 45112 to 69163 (+53.3%, p 0); fire.hits 6386 to 4973 (-22.1%, p 0); movementResolver.changes 199948 to 320486 (+60.3%, p 0); vacantObjectiveStalls.length 100 to 13 (-87.0%, p 0); loopAlerts.length 907 to 1747 (+92.6%, p 0); recon.orders 1908 to 3795 (+98.9%, p 0); recon.contacts 283 to 806 (+184.8%, p 0); recon.cancelled 580 to 2065 (+256.0%, p 0); recon.reportsDelivered 1103 to 2966 (+168.9%, p 0); recon.retriggerBlocked 905 to 1080 (+19.3%, p 0); squadPerformance.meanOverall 4902.300000000001 to 4837.500000000002 (-1.3%, p 0); squadPerformance.meanMission 3952.0999999999995 to 3731.3999999999987 (-5.6%, p 0); squadPerformance.meanMovement 5991.299999999996 to 5986.9000000000015 (-0.1%, p 0); squadPerformance.meanControl 5716.699999999999 to 5581.900000000001 (-2.4%, p 0); recon.noContact 952 to 820 (-13.9%, p 0.0001); grenades.throws 31 to 56 (+80.6%, p 0.0009).
- Under 0.05 only: regroups.entries 215 to 343 (+59.5%, p 0.0013); usKills 1267 to 947 (-25.3%, p 0.0015); grenades.bursts 31 to 54 (+74.2%, p 0.0015).
- Wall time on/off x1.646 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.646 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2969 | 2178 | -13.1833 | 60 | 3 | 57 | 0 |
| `usKills` | 1267 | 947 | -5.3333 | 59 | 17 | 42 | 0.0015 |
| `geKills` | 1702 | 1231 | -7.85 | 58 | 8 | 50 | 0 |
| `fire.total` | 45112 | 69163 | 400.85 | 60 | 54 | 6 | 0 |
| `fire.hits` | 6386 | 4973 | -23.55 | 60 | 8 | 52 | 0 |
| `retreatSamples` | 124401 | 125445 | 17.4 | 60 | 30 | 30 | 1 |
| `movementResolver.changes` | 199948 | 320486 | 2008.9667 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 31 | 56 | 0.4167 | 25 | 21 | 4 | 0.0009 |
| `grenades.bursts` | 31 | 54 | 0.3833 | 24 | 20 | 4 | 0.0015 |
| `grenades.wounded` | 15 | 21 | 0.1 | 9 | 6 | 3 | 0.5078 |
| `grenades.casualties` | 6 | 8 | 0.0333 | 6 | 3 | 3 | 1 |
| `grenades.suppressed` | 24 | 38 | 0.2333 | 13 | 10 | 3 | 0.0923 |
| `grenades.friendlyWounded` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 4 | 8 | 0.0667 | 5 | 4 | 1 | 0.375 |
| `movementStalls.length` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 100 | 13 | -1.45 | 42 | 2 | 40 | 0 |
| `loopAlerts.length` | 907 | 1747 | 14 | 60 | 56 | 4 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 215 | 343 | 2.1333 | 57 | 41 | 16 | 0.0013 |
| `stallOutcomes.wakes` | 9 | 8 | -0.0167 | 13 | 6 | 7 | 1 |
| `stallOutcomes.repeats` | 2 | 0 | -0.0333 | 2 | 0 | 2 | 0.5 |
| `timeline.stalledOnsets` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 10 | 0.1667 | 1 | 1 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 10 | 0.1667 | 1 | 1 | 0 | 1 |
| `recon.orders` | 1908 | 3795 | 31.45 | 60 | 60 | 0 | 0 |
| `recon.contacts` | 283 | 806 | 8.7167 | 60 | 56 | 4 | 0 |
| `recon.noContact` | 952 | 820 | -2.2 | 56 | 13 | 43 | 0.0001 |
| `recon.timeouts` | 41 | 36 | -0.0833 | 25 | 11 | 14 | 0.69 |
| `recon.cancelled` | 580 | 2065 | 24.75 | 60 | 60 | 0 | 0 |
| `recon.reportsDelivered` | 1103 | 2966 | 31.05 | 60 | 55 | 5 | 0 |
| `recon.retriggerBlocked` | 905 | 1080 | 2.9167 | 57 | 45 | 12 | 0 |
| `squadPerformance.meanOverall` | 4902.300000000001 | 4837.500000000002 | -1.08 | 58 | 12 | 46 | 0 |
| `squadPerformance.p10Overall` | 4468.1 | 4469.500000000001 | 0.0233 | 31 | 17 | 14 | 0.7201 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3952.0999999999995 | 3731.3999999999987 | -3.6783 | 59 | 13 | 46 | 0 |
| `squadPerformance.meanMovement` | 5991.299999999996 | 5986.9000000000015 | -0.0733 | 43 | 7 | 36 | 0 |
| `squadPerformance.meanControl` | 5716.699999999999 | 5581.900000000001 | -2.2467 | 59 | 9 | 50 | 0 |
| `squadPerformance.meanCohesion` | 5407.3 | 5433.700000000001 | 0.44 | 58 | 31 | 27 | 0.694 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr797-micro-u-20261109-0001 0.15 s (timeline) · pr797-micro-u-20261109-0002 0.15 s (timeline) · pr797-micro-u-20261109-0003 0.15 s (timeline) · pr797-micro-u-20261109-0004 0.15 s (timeline) · pr797-micro-u-20261109-0005 0.15 s (timeline) · pr797-micro-u-20261109-0006 0.15 s (timeline) · pr797-micro-u-20261109-0007 0.15 s (timeline) · pr797-micro-u-20261109-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1819&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr797-5d7cc87/ai_flow_live.html?bench=1819&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1819`); it opens the seed that parts earliest, and the dropdowns choose another.

