# Benchmark run #1672 · 60 seeds from `controller-natural-20261026` (meeting), windows `0+600`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- main @ d036b3f · [run](https://github.com/APPARANYX/grasstex/actions/runs/42280392104) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 18 of 42 counters under p 0.05 (about 2.1 by chance), 10 under 0.0012; casualties -3.5% (p 0.155)**

- Clears the Bonferroni line (p < 0.0012): fire.total 39764 to 72567 (+82.5%, p 0); movementResolver.changes 210010 to 304548 (+45.0%, p 0); loopAlerts.length 600 to 993 (+65.5%, p 0); recon.noContact 1106 to 917 (-17.1%, p 0); recon.cancelled 463 to 715 (+54.4%, p 0); squadPerformance.meanMission 3780.8 to 3564.4000000000005 (-5.7%, p 0); squadPerformance.meanMovement 5984.800000000001 to 5978.5 (-0.1%, p 0); squadPerformance.meanCohesion 5425.999999999998 to 5559.999999999998 (+2.5%, p 0); regroups.entries 227 to 324 (+42.7%, p 0.0003); squadPerformance.meanOverall 4810.800000000001 to 4762.200000000001 (-1.0%, p 0.0009).
- Under 0.05 only: usKills 1300 to 1059 (-18.5%, p 0.0038); grenades.throws 11 to 41 (+272.7%, p 0.0044); grenades.bursts 11 to 41 (+272.7%, p 0.0044); recon.retriggerBlocked 1333 to 1419 (+6.5%, p 0.0065); retreatSamples 103776 to 126747 (+22.1%, p 0.0135); recon.orders 1742 to 1852 (+6.3%, p 0.0163); grenades.suppressed 10 to 72 (+620.0%, p 0.0225); recon.contacts 87 to 119 (+36.8%, p 0.0226).
- Wall time on/off x1.695 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.695 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2695 | 2600 | -1.5833 | 60 | 24 | 36 | 0.155 |
| `usKills` | 1300 | 1059 | -4.0167 | 59 | 18 | 41 | 0.0038 |
| `geKills` | 1395 | 1541 | 2.4333 | 56 | 33 | 23 | 0.2288 |
| `fire.total` | 39764 | 72567 | 546.7167 | 60 | 58 | 2 | 0 |
| `fire.hits` | 6063 | 5810 | -4.2167 | 60 | 26 | 34 | 0.3663 |
| `retreatSamples` | 103776 | 126747 | 382.85 | 60 | 40 | 20 | 0.0135 |
| `movementResolver.changes` | 210010 | 304548 | 1575.6333 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 11 | 41 | 0.5 | 19 | 16 | 3 | 0.0044 |
| `grenades.bursts` | 11 | 41 | 0.5 | 19 | 16 | 3 | 0.0044 |
| `grenades.wounded` | 6 | 26 | 0.3333 | 11 | 8 | 3 | 0.2266 |
| `grenades.casualties` | 3 | 10 | 0.1167 | 8 | 6 | 2 | 0.2891 |
| `grenades.suppressed` | 10 | 72 | 1.0333 | 13 | 11 | 2 | 0.0225 |
| `grenades.friendlyWounded` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 5 | 8 | 0.05 | 7 | 5 | 2 | 0.4531 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 278 | 276 | -0.0333 | 56 | 27 | 29 | 0.8939 |
| `loopAlerts.length` | 600 | 993 | 6.55 | 55 | 51 | 4 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 227 | 324 | 1.6167 | 53 | 40 | 13 | 0.0003 |
| `stallOutcomes.wakes` | 4 | 3 | -0.0167 | 6 | 2 | 4 | 0.6875 |
| `stallOutcomes.repeats` | 1 | 3 | 0.0333 | 3 | 2 | 1 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1742 | 1852 | 1.8333 | 57 | 38 | 19 | 0.0163 |
| `recon.contacts` | 87 | 119 | 0.5333 | 44 | 30 | 14 | 0.0226 |
| `recon.noContact` | 1106 | 917 | -3.15 | 56 | 10 | 46 | 0 |
| `recon.timeouts` | 16 | 10 | -0.1 | 15 | 5 | 10 | 0.3018 |
| `recon.cancelled` | 463 | 715 | 4.2 | 57 | 51 | 6 | 0 |
| `recon.reportsDelivered` | 433 | 604 | 2.85 | 54 | 34 | 20 | 0.0759 |
| `recon.retriggerBlocked` | 1333 | 1419 | 1.4333 | 55 | 38 | 17 | 0.0065 |
| `squadPerformance.meanOverall` | 4810.800000000001 | 4762.200000000001 | -0.81 | 58 | 16 | 42 | 0.0009 |
| `squadPerformance.p10Overall` | 4471.3 | 4459.799999999999 | -0.1917 | 27 | 12 | 15 | 0.7011 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3780.8 | 3564.4000000000005 | -3.6067 | 60 | 13 | 47 | 0 |
| `squadPerformance.meanMovement` | 5984.800000000001 | 5978.5 | -0.105 | 43 | 7 | 36 | 0 |
| `squadPerformance.meanControl` | 5636.400000000001 | 5626.300000000001 | -0.1683 | 59 | 24 | 35 | 0.1925 |
| `squadPerformance.meanCohesion` | 5425.999999999998 | 5559.999999999998 | 2.2333 | 60 | 46 | 14 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 0.15 s (timeline) · controller-natural-20261026-0002 0.15 s (timeline) · controller-natural-20261026-0003 0.15 s (timeline) · controller-natural-20261026-0004 0.15 s (timeline) · controller-natural-20261026-0005 0.15 s (timeline) · controller-natural-20261026-0006 0.15 s (timeline) · controller-natural-20261026-0007 0.15 s (timeline) · controller-natural-20261026-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1672&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1672`); it opens the seed that parts earliest, and the dropdowns choose another.

