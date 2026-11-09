# Benchmark run #1805 · 60 seeds from `pr796-s1a-20261108` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr796-main-b811827 @ b811827 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42536363920) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 15 of 42 counters under p 0.05 (about 2.1 by chance), 11 under 0.0012; casualties -15.0% (p 0)**

- Clears the Bonferroni line (p < 0.0012): casualties 2525 to 2147 (-15.0%, p 0); fire.total 37390 to 69920 (+87.0%, p 0); movementResolver.changes 206235 to 394904 (+91.5%, p 0); vacantObjectiveStalls.length 225 to 44 (-80.4%, p 0); loopAlerts.length 770 to 2556 (+231.9%, p 0); recon.noContact 1127 to 846 (-24.9%, p 0); squadPerformance.meanOverall 4824.400000000001 to 4665.399999999999 (-3.3%, p 0); squadPerformance.meanMission 3817.6999999999994 to 3452.2999999999997 (-9.6%, p 0); squadPerformance.meanMovement 5986.700000000001 to 5975.300000000001 (-0.2%, p 0); squadPerformance.meanControl 5584.8 to 5314.9 (-4.8%, p 0); regroups.entries 239 to 458 (+91.6%, p 0.0001).
- Under 0.05 only: recon.orders 1788 to 1566 (-12.4%, p 0.0013); squadPerformance.meanCohesion 5425.200000000002 to 5366.699999999999 (-1.1%, p 0.0086); fire.hits 5544 to 4809 (-13.3%, p 0.0183); squadPerformance.p10Overall 4503.2 to 4454.800000000001 (-1.1%, p 0.0201).
- Wall time on/off x1.666 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.666 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2525 | 2147 | -6.3 | 58 | 13 | 45 | 0 |
| `usKills` | 1152 | 901 | -4.1833 | 59 | 23 | 36 | 0.1175 |
| `geKills` | 1373 | 1246 | -2.1167 | 58 | 22 | 36 | 0.0869 |
| `fire.total` | 37390 | 69920 | 542.1667 | 60 | 59 | 1 | 0 |
| `fire.hits` | 5544 | 4809 | -12.25 | 59 | 20 | 39 | 0.0183 |
| `retreatSamples` | 88879 | 100007 | 185.4667 | 60 | 29 | 31 | 0.8974 |
| `movementResolver.changes` | 206235 | 394904 | 3144.4833 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 62 | 59 | -0.05 | 30 | 16 | 14 | 0.8555 |
| `grenades.bursts` | 61 | 59 | -0.0333 | 29 | 16 | 13 | 0.7111 |
| `grenades.wounded` | 86 | 39 | -0.7833 | 17 | 6 | 11 | 0.3323 |
| `grenades.casualties` | 38 | 14 | -0.4 | 14 | 3 | 11 | 0.0574 |
| `grenades.suppressed` | 193 | 100 | -1.55 | 20 | 8 | 12 | 0.5034 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 2 | 1 | 1 | 1 |
| `grenades.friendlyCasualties` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `grenades.aborted` | 7 | 13 | 0.1 | 11 | 8 | 3 | 0.2266 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 225 | 44 | -3.0167 | 55 | 5 | 50 | 0 |
| `loopAlerts.length` | 770 | 2556 | 29.7667 | 59 | 58 | 1 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 239 | 458 | 3.65 | 55 | 42 | 13 | 0.0001 |
| `stallOutcomes.wakes` | 8 | 13 | 0.0833 | 18 | 10 | 8 | 0.8145 |
| `stallOutcomes.repeats` | 1 | 6 | 0.0833 | 6 | 5 | 1 | 0.2188 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1788 | 1566 | -3.7 | 57 | 16 | 41 | 0.0013 |
| `recon.contacts` | 87 | 105 | 0.3 | 46 | 29 | 17 | 0.1038 |
| `recon.noContact` | 1127 | 846 | -4.6833 | 58 | 7 | 51 | 0 |
| `recon.timeouts` | 14 | 9 | -0.0833 | 17 | 7 | 10 | 0.6291 |
| `recon.cancelled` | 484 | 557 | 1.2167 | 52 | 29 | 23 | 0.4885 |
| `recon.reportsDelivered` | 362 | 413 | 0.85 | 53 | 30 | 23 | 0.4101 |
| `recon.retriggerBlocked` | 1388 | 1319 | -1.15 | 54 | 24 | 30 | 0.4966 |
| `squadPerformance.meanOverall` | 4824.400000000001 | 4665.399999999999 | -2.65 | 60 | 4 | 56 | 0 |
| `squadPerformance.p10Overall` | 4503.2 | 4454.800000000001 | -0.8067 | 37 | 11 | 26 | 0.0201 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3817.6999999999994 | 3452.2999999999997 | -6.09 | 60 | 9 | 51 | 0 |
| `squadPerformance.meanMovement` | 5986.700000000001 | 5975.300000000001 | -0.19 | 53 | 3 | 50 | 0 |
| `squadPerformance.meanControl` | 5584.8 | 5314.9 | -4.4983 | 58 | 3 | 55 | 0 |
| `squadPerformance.meanCohesion` | 5425.200000000002 | 5366.699999999999 | -0.975 | 59 | 19 | 40 | 0.0086 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr796-s1a-20261108-0001 0.15 s (timeline) · pr796-s1a-20261108-0002 0.15 s (timeline) · pr796-s1a-20261108-0003 0.15 s (timeline) · pr796-s1a-20261108-0004 0.15 s (timeline) · pr796-s1a-20261108-0005 0.15 s (timeline) · pr796-s1a-20261108-0006 0.15 s (timeline) · pr796-s1a-20261108-0007 0.15 s (timeline) · pr796-s1a-20261108-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1805&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr796-main-b811827/ai_flow_live.html?bench=1805&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1805`); it opens the seed that parts earliest, and the dropdowns choose another.

