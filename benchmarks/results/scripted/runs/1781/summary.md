# Benchmark run #1781 · 60 seeds from `pr793-m3-20261108` (ge-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr793-main-e86cda4 @ e86cda4 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42493901983) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 19 of 42 counters under p 0.05 (about 2.1 by chance), 14 under 0.0012; casualties -10.8% (p 0.0009)**

- Clears the Bonferroni line (p < 0.0012): fire.total 44921 to 74676 (+66.2%, p 0); movementResolver.changes 202931 to 280856 (+38.4%, p 0); vacantObjectiveStalls.length 93 to 20 (-78.5%, p 0); loopAlerts.length 909 to 1705 (+87.6%, p 0); recon.orders 1960 to 3325 (+69.6%, p 0); recon.contacts 321 to 724 (+125.5%, p 0); recon.cancelled 605 to 1618 (+167.4%, p 0); recon.reportsDelivered 1210 to 2819 (+133.0%, p 0); squadPerformance.meanMission 3997.2 to 3736.2000000000003 (-6.5%, p 0); squadPerformance.meanControl 5696.199999999999 to 5601.9000000000015 (-1.7%, p 0); squadPerformance.meanCohesion 5372.600000000001 to 5561.300000000001 (+3.5%, p 0); recon.retriggerBlocked 916 to 1057 (+15.4%, p 0.0008); casualties 3058 to 2729 (-10.8%, p 0.0009); retreatSamples 124072 to 148224 (+19.5%, p 0.0011).
- Under 0.05 only: squadPerformance.meanOverall 4900.2 to 4833.599999999999 (-1.4%, p 0.0015); usKills 1268 to 1039 (-18.1%, p 0.0062); grenades.bursts 25 to 63 (+152.0%, p 0.0066); grenades.throws 27 to 63 (+133.3%, p 0.0146); grenades.aborted 2 to 10 (+400.0%, p 0.0313).
- Wall time on/off x1.516 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.516 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 3058 | 2729 | -5.4833 | 58 | 16 | 42 | 0.0009 |
| `usKills` | 1268 | 1039 | -3.8167 | 60 | 19 | 41 | 0.0062 |
| `geKills` | 1790 | 1690 | -1.6667 | 58 | 25 | 33 | 0.3581 |
| `fire.total` | 44921 | 74676 | 495.9167 | 60 | 58 | 2 | 0 |
| `fire.hits` | 6409 | 6093 | -5.2667 | 60 | 25 | 35 | 0.2451 |
| `retreatSamples` | 124072 | 148224 | 402.5333 | 60 | 43 | 17 | 0.0011 |
| `movementResolver.changes` | 202931 | 280856 | 1298.75 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 27 | 63 | 0.6 | 25 | 19 | 6 | 0.0146 |
| `grenades.bursts` | 25 | 63 | 0.6333 | 24 | 19 | 5 | 0.0066 |
| `grenades.wounded` | 22 | 39 | 0.2833 | 10 | 7 | 3 | 0.3438 |
| `grenades.casualties` | 8 | 8 | 0 | 7 | 4 | 3 | 1 |
| `grenades.suppressed` | 44 | 83 | 0.65 | 13 | 7 | 6 | 1 |
| `grenades.friendlyWounded` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.aborted` | 2 | 10 | 0.1333 | 6 | 6 | 0 | 0.0313 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 93 | 20 | -1.2167 | 34 | 4 | 30 | 0 |
| `loopAlerts.length` | 909 | 1705 | 13.2667 | 58 | 53 | 5 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 240 | 256 | 0.2667 | 49 | 26 | 23 | 0.7754 |
| `stallOutcomes.wakes` | 10 | 4 | -0.1 | 10 | 3 | 7 | 0.3438 |
| `stallOutcomes.repeats` | 0 | 3 | 0.05 | 3 | 3 | 0 | 0.25 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1960 | 3325 | 22.75 | 60 | 58 | 2 | 0 |
| `recon.contacts` | 321 | 724 | 6.7167 | 58 | 51 | 7 | 0 |
| `recon.noContact` | 920 | 874 | -0.7667 | 55 | 23 | 32 | 0.2806 |
| `recon.timeouts` | 54 | 39 | -0.25 | 26 | 11 | 15 | 0.5572 |
| `recon.cancelled` | 605 | 1618 | 16.8833 | 60 | 59 | 1 | 0 |
| `recon.reportsDelivered` | 1210 | 2819 | 26.8167 | 59 | 53 | 6 | 0 |
| `recon.retriggerBlocked` | 916 | 1057 | 2.35 | 53 | 39 | 14 | 0.0008 |
| `squadPerformance.meanOverall` | 4900.2 | 4833.599999999999 | -1.11 | 59 | 17 | 42 | 0.0015 |
| `squadPerformance.p10Overall` | 4471.299999999999 | 4448.7 | -0.3767 | 24 | 8 | 16 | 0.1516 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3997.2 | 3736.2000000000003 | -4.35 | 60 | 13 | 47 | 0 |
| `squadPerformance.meanMovement` | 5987.699999999998 | 5991.099999999999 | 0.0567 | 37 | 22 | 15 | 0.324 |
| `squadPerformance.meanControl` | 5696.199999999999 | 5601.9000000000015 | -1.5717 | 58 | 12 | 46 | 0 |
| `squadPerformance.meanCohesion` | 5372.600000000001 | 5561.300000000001 | 3.145 | 60 | 54 | 6 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr793-m3-20261108-0001 0.15 s (timeline) · pr793-m3-20261108-0002 0.15 s (timeline) · pr793-m3-20261108-0003 0.15 s (timeline) · pr793-m3-20261108-0004 0.15 s (timeline) · pr793-m3-20261108-0005 0.15 s (timeline) · pr793-m3-20261108-0006 0.15 s (timeline) · pr793-m3-20261108-0007 0.15 s (timeline) · pr793-m3-20261108-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1781&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr793-main-e86cda4/ai_flow_live.html?bench=1781&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1781`); it opens the seed that parts earliest, and the dropdowns choose another.

