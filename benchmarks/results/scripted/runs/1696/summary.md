# Benchmark run #1696 · 60 seeds from `controller-natural-20261026` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/pin/pr778-e4278914 @ e427891 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42338952713) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 16 of 42 counters under p 0.05 (about 2.1 by chance), 11 under 0.0012; casualties -5.9% (p 0.6718)**

- Clears the Bonferroni line (p < 0.0012): fire.total 32763 to 59743 (+82.3%, p 0); movementResolver.changes 140845 to 186886 (+32.7%, p 0); vacantObjectiveStalls.length 95 to 10 (-89.5%, p 0); recon.orders 1420 to 2254 (+58.7%, p 0); recon.contacts 193 to 411 (+113.0%, p 0); recon.cancelled 457 to 1034 (+126.3%, p 0); recon.reportsDelivered 791 to 1617 (+104.4%, p 0); squadPerformance.meanMission 4158.700000000002 to 3900.5 (-6.2%, p 0); squadPerformance.meanCohesion 5447.199999999999 to 5584.399999999996 (+2.5%, p 0); retreatSamples 107664 to 138765 (+28.9%, p 0.0003); grenades.bursts 32 to 59 (+84.4%, p 0.0009).
- Under 0.05 only: squadPerformance.meanOverall 5011.100000000003 to 4941.500000000001 (-1.4%, p 0.0022); grenades.throws 33 to 60 (+81.8%, p 0.0025); recon.retriggerBlocked 657 to 764 (+16.3%, p 0.0094); grenades.suppressed 101 to 109 (+7.9%, p 0.0192); loopAlerts.length 909 to 1221 (+34.3%, p 0.0328).
- Wall time on/off x1.385 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.385 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2119 | 1994 | -2.0833 | 50 | 23 | 27 | 0.6718 |
| `usKills` | 975 | 916 | -0.9833 | 47 | 17 | 30 | 0.0789 |
| `geKills` | 1144 | 1078 | -1.1 | 49 | 21 | 28 | 0.3916 |
| `fire.total` | 32763 | 59743 | 449.6667 | 50 | 50 | 0 | 0 |
| `fire.hits` | 4684 | 4748 | 1.0667 | 49 | 26 | 23 | 0.7754 |
| `retreatSamples` | 107664 | 138765 | 518.35 | 50 | 38 | 12 | 0.0003 |
| `movementResolver.changes` | 140845 | 186886 | 767.35 | 60 | 59 | 1 | 0 |
| `grenades.throws` | 33 | 60 | 0.45 | 26 | 21 | 5 | 0.0025 |
| `grenades.bursts` | 32 | 59 | 0.45 | 25 | 21 | 4 | 0.0009 |
| `grenades.wounded` | 31 | 40 | 0.15 | 12 | 9 | 3 | 0.146 |
| `grenades.casualties` | 15 | 15 | 0 | 7 | 5 | 2 | 0.4531 |
| `grenades.suppressed` | 101 | 109 | 0.1333 | 19 | 15 | 4 | 0.0192 |
| `grenades.friendlyWounded` | 0 | 5 | 0.0833 | 3 | 3 | 0 | 0.25 |
| `grenades.friendlyCasualties` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.aborted` | 1 | 10 | 0.15 | 5 | 5 | 0 | 0.0625 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 95 | 10 | -1.4167 | 38 | 1 | 37 | 0 |
| `loopAlerts.length` | 909 | 1221 | 5.2 | 50 | 33 | 17 | 0.0328 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 189 | 224 | 0.5833 | 40 | 22 | 18 | 0.6358 |
| `stallOutcomes.wakes` | 6 | 3 | -0.05 | 6 | 2 | 4 | 0.6875 |
| `stallOutcomes.repeats` | 4 | 0 | -0.0667 | 3 | 0 | 3 | 0.25 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1420 | 2254 | 13.9 | 59 | 54 | 5 | 0 |
| `recon.contacts` | 193 | 411 | 3.6333 | 46 | 40 | 6 | 0 |
| `recon.noContact` | 631 | 659 | 0.4667 | 50 | 30 | 20 | 0.2026 |
| `recon.timeouts` | 50 | 50 | 0 | 23 | 13 | 10 | 0.6776 |
| `recon.cancelled` | 457 | 1034 | 9.6167 | 58 | 55 | 3 | 0 |
| `recon.reportsDelivered` | 791 | 1617 | 13.7667 | 48 | 39 | 9 | 0 |
| `recon.retriggerBlocked` | 657 | 764 | 1.7833 | 49 | 34 | 15 | 0.0094 |
| `squadPerformance.meanOverall` | 5011.100000000003 | 4941.500000000001 | -1.16 | 58 | 17 | 41 | 0.0022 |
| `squadPerformance.p10Overall` | 4663.299999999999 | 4646.2 | -0.285 | 28 | 11 | 17 | 0.3449 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4158.700000000002 | 3900.5 | -4.3033 | 50 | 5 | 45 | 0 |
| `squadPerformance.meanMovement` | 5993.199999999997 | 5992.700000000001 | -0.0083 | 30 | 13 | 17 | 0.5847 |
| `squadPerformance.meanControl` | 5729.1 | 5705.7 | -0.39 | 50 | 23 | 27 | 0.6718 |
| `squadPerformance.meanCohesion` | 5447.199999999999 | 5584.399999999996 | 2.2867 | 59 | 51 | 8 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 0.15 s (timeline) · controller-natural-20261026-0002 0.15 s (timeline) · controller-natural-20261026-0003 0.15 s (timeline) · controller-natural-20261026-0004 0.15 s (timeline) · controller-natural-20261026-0005 0.15 s (timeline) · controller-natural-20261026-0006 0.15 s (timeline) · controller-natural-20261026-0007 0.15 s (timeline) · controller-natural-20261026-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1696&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr778-e4278914/ai_flow_live.html?bench=1696&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1696`); it opens the seed that parts earliest, and the dropdowns choose another.

