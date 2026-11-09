# Benchmark run #1804 · 60 seeds from `pr796-s1a-20261108` (ge-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr796-0cac14f @ 0cac14f · [run](https://github.com/APPARANYX/grasstex/actions/runs/42536356501) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 23 of 42 counters under p 0.05 (about 2.1 by chance), 18 under 0.0012; casualties -23.9% (p 0)**

- Clears the Bonferroni line (p < 0.0012): casualties 2982 to 2270 (-23.9%, p 0); fire.total 46650 to 69848 (+49.7%, p 0); fire.hits 6816 to 5476 (-19.7%, p 0); movementResolver.changes 198732 to 320797 (+61.4%, p 0); vacantObjectiveStalls.length 97 to 14 (-85.6%, p 0); loopAlerts.length 1187 to 1891 (+59.3%, p 0); recon.orders 1935 to 3869 (+99.9%, p 0); recon.contacts 301 to 930 (+209.0%, p 0); recon.noContact 972 to 788 (-18.9%, p 0); recon.cancelled 566 to 2047 (+261.7%, p 0); recon.reportsDelivered 1154 to 3134 (+171.6%, p 0); recon.retriggerBlocked 928 to 1104 (+19.0%, p 0); squadPerformance.meanOverall 4913.6 to 4846.200000000001 (-1.4%, p 0); squadPerformance.meanMission 3996.7999999999997 to 3810.5 (-4.7%, p 0); squadPerformance.meanControl 5665.499999999999 to 5549.900000000001 (-2.0%, p 0); geKills 1697 to 1269 (-25.2%, p 0.0002); squadPerformance.meanMovement 5988.999999999999 to 5986.300000000001 (-0.0%, p 0.0003); regroups.entries 260 to 369 (+41.9%, p 0.0008).
- Under 0.05 only: squadPerformance.p10Overall 4496.699999999999 to 4455.6 (-0.9%, p 0.0019); usKills 1285 to 1001 (-22.1%, p 0.0022); grenades.throws 100 to 117 (+17.0%, p 0.0037); grenades.aborted 8 to 25 (+212.5%, p 0.0042); grenades.bursts 100 to 116 (+16.0%, p 0.0059).
- Wall time on/off x1.389 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.389 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2982 | 2270 | -11.8667 | 59 | 8 | 51 | 0 |
| `usKills` | 1285 | 1001 | -4.7333 | 58 | 17 | 41 | 0.0022 |
| `geKills` | 1697 | 1269 | -7.1333 | 57 | 14 | 43 | 0.0002 |
| `fire.total` | 46650 | 69848 | 386.6333 | 60 | 55 | 5 | 0 |
| `fire.hits` | 6816 | 5476 | -22.3333 | 59 | 12 | 47 | 0 |
| `retreatSamples` | 120870 | 115069 | -96.6833 | 60 | 24 | 36 | 0.155 |
| `movementResolver.changes` | 198732 | 320797 | 2034.4167 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 100 | 117 | 0.2833 | 28 | 22 | 6 | 0.0037 |
| `grenades.bursts` | 100 | 116 | 0.2667 | 27 | 21 | 6 | 0.0059 |
| `grenades.wounded` | 78 | 63 | -0.25 | 18 | 10 | 8 | 0.8145 |
| `grenades.casualties` | 31 | 24 | -0.1167 | 14 | 7 | 7 | 1 |
| `grenades.suppressed` | 216 | 179 | -0.6167 | 22 | 13 | 9 | 0.5235 |
| `grenades.friendlyWounded` | 9 | 6 | -0.05 | 5 | 3 | 2 | 1 |
| `grenades.friendlyCasualties` | 5 | 4 | -0.0167 | 4 | 2 | 2 | 1 |
| `grenades.aborted` | 8 | 25 | 0.2833 | 16 | 14 | 2 | 0.0042 |
| `movementStalls.length` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 97 | 14 | -1.3833 | 40 | 1 | 39 | 0 |
| `loopAlerts.length` | 1187 | 1891 | 11.7333 | 60 | 51 | 9 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 260 | 369 | 1.8167 | 53 | 39 | 14 | 0.0008 |
| `stallOutcomes.wakes` | 6 | 3 | -0.05 | 9 | 3 | 6 | 0.5078 |
| `stallOutcomes.repeats` | 1 | 2 | 0.0167 | 3 | 2 | 1 | 1 |
| `timeline.stalledOnsets` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamples` | 29 | 0 | -0.4833 | 1 | 0 | 1 | 1 |
| `timeline.stalledOnsetsRepeated` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamplesRepeated` | 29 | 0 | -0.4833 | 1 | 0 | 1 | 1 |
| `recon.orders` | 1935 | 3869 | 32.2333 | 60 | 60 | 0 | 0 |
| `recon.contacts` | 301 | 930 | 10.4833 | 57 | 54 | 3 | 0 |
| `recon.noContact` | 972 | 788 | -3.0667 | 58 | 12 | 46 | 0 |
| `recon.timeouts` | 37 | 38 | 0.0167 | 25 | 10 | 15 | 0.4244 |
| `recon.cancelled` | 566 | 2047 | 24.6833 | 60 | 60 | 0 | 0 |
| `recon.reportsDelivered` | 1154 | 3134 | 33 | 59 | 52 | 7 | 0 |
| `recon.retriggerBlocked` | 928 | 1104 | 2.9333 | 58 | 48 | 10 | 0 |
| `squadPerformance.meanOverall` | 4913.6 | 4846.200000000001 | -1.1233 | 58 | 12 | 46 | 0 |
| `squadPerformance.p10Overall` | 4496.699999999999 | 4455.6 | -0.685 | 35 | 8 | 27 | 0.0019 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3996.7999999999997 | 3810.5 | -3.105 | 60 | 14 | 46 | 0 |
| `squadPerformance.meanMovement` | 5988.999999999999 | 5986.300000000001 | -0.045 | 42 | 9 | 33 | 0.0003 |
| `squadPerformance.meanControl` | 5665.499999999999 | 5549.900000000001 | -1.9267 | 60 | 13 | 47 | 0 |
| `squadPerformance.meanCohesion` | 5383.399999999999 | 5424.7 | 0.6883 | 59 | 30 | 29 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr796-s1a-20261108-0001 0.15 s (timeline) · pr796-s1a-20261108-0002 0.15 s (timeline) · pr796-s1a-20261108-0003 0.15 s (timeline) · pr796-s1a-20261108-0004 0.15 s (timeline) · pr796-s1a-20261108-0005 0.15 s (timeline) · pr796-s1a-20261108-0006 0.15 s (timeline) · pr796-s1a-20261108-0007 0.15 s (timeline) · pr796-s1a-20261108-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1804&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr796-0cac14f/ai_flow_live.html?bench=1804&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1804`); it opens the seed that parts earliest, and the dropdowns choose another.

