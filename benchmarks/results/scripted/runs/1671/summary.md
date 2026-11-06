# Benchmark run #1671 · 60 seeds from `controller-natural-20261026` (ge-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- main @ d036b3f · [run](https://github.com/APPARANYX/grasstex/actions/runs/42280390578) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 12 of 42 counters under p 0.05 (about 2.1 by chance), 11 under 0.0012; casualties -1.3% (p 0.6587)**

- Clears the Bonferroni line (p < 0.0012): fire.total 31367 to 53254 (+69.8%, p 0); movementResolver.changes 134099 to 184479 (+37.6%, p 0); loopAlerts.length 578 to 797 (+37.9%, p 0); recon.orders 1507 to 2523 (+67.4%, p 0); recon.contacts 226 to 597 (+164.2%, p 0); recon.cancelled 459 to 1252 (+172.8%, p 0); recon.reportsDelivered 889 to 2449 (+175.5%, p 0); squadPerformance.meanCohesion 5351.300000000001 to 5565.999999999998 (+4.0%, p 0); retreatSamples 88001 to 111540 (+26.7%, p 0.0001); squadPerformance.meanMission 4295.4 to 4113 (-4.2%, p 0.0001); recon.noContact 696 to 572 (-17.8%, p 0.0002).
- Under 0.05 only: recon.retriggerBlocked 672 to 735 (+9.4%, p 0.0114).
- Wall time on/off x1.435 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.435 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2135 | 2107 | -0.4667 | 46 | 21 | 25 | 0.6587 |
| `usKills` | 893 | 737 | -2.6 | 46 | 18 | 28 | 0.1839 |
| `geKills` | 1242 | 1370 | 2.1333 | 47 | 27 | 20 | 0.3817 |
| `fire.total` | 31367 | 53254 | 364.7833 | 50 | 50 | 0 | 0 |
| `fire.hits` | 4608 | 4739 | 2.1833 | 49 | 26 | 23 | 0.7754 |
| `retreatSamples` | 88001 | 111540 | 392.3167 | 50 | 39 | 11 | 0.0001 |
| `movementResolver.changes` | 134099 | 184479 | 839.6667 | 60 | 58 | 2 | 0 |
| `grenades.throws` | 34 | 32 | -0.0333 | 17 | 9 | 8 | 1 |
| `grenades.bursts` | 34 | 32 | -0.0333 | 17 | 9 | 8 | 1 |
| `grenades.wounded` | 17 | 31 | 0.2333 | 4 | 4 | 0 | 0.125 |
| `grenades.casualties` | 8 | 14 | 0.1 | 5 | 4 | 1 | 0.375 |
| `grenades.suppressed` | 40 | 40 | 0 | 9 | 7 | 2 | 0.1797 |
| `grenades.friendlyWounded` | 0 | 3 | 0.05 | 2 | 2 | 0 | 0.5 |
| `grenades.friendlyCasualties` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.aborted` | 6 | 6 | 0 | 7 | 4 | 3 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 71 | 57 | -0.2333 | 40 | 18 | 22 | 0.6358 |
| `loopAlerts.length` | 578 | 797 | 3.65 | 35 | 33 | 2 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 158 | 165 | 0.1167 | 47 | 25 | 22 | 0.7709 |
| `stallOutcomes.wakes` | 10 | 3 | -0.1167 | 13 | 3 | 10 | 0.0923 |
| `stallOutcomes.repeats` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1507 | 2523 | 16.9333 | 60 | 57 | 3 | 0 |
| `recon.contacts` | 226 | 597 | 6.1833 | 48 | 47 | 1 | 0 |
| `recon.noContact` | 696 | 572 | -2.0667 | 51 | 12 | 39 | 0.0002 |
| `recon.timeouts` | 54 | 39 | -0.25 | 26 | 10 | 16 | 0.3269 |
| `recon.cancelled` | 459 | 1252 | 13.2167 | 60 | 59 | 1 | 0 |
| `recon.reportsDelivered` | 889 | 2449 | 26 | 50 | 46 | 4 | 0 |
| `recon.retriggerBlocked` | 672 | 735 | 1.05 | 46 | 32 | 14 | 0.0114 |
| `squadPerformance.meanOverall` | 5047.5 | 5017.000000000001 | -0.5083 | 59 | 26 | 33 | 0.435 |
| `squadPerformance.p10Overall` | 4650.2 | 4660.800000000002 | 0.1767 | 42 | 24 | 18 | 0.4408 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4295.4 | 4113 | -3.04 | 49 | 11 | 38 | 0.0001 |
| `squadPerformance.meanMovement` | 5992.999999999999 | 5993.199999999999 | 0.0033 | 30 | 16 | 14 | 0.8555 |
| `squadPerformance.meanControl` | 5745.199999999999 | 5743.7 | -0.025 | 49 | 22 | 27 | 0.5682 |
| `squadPerformance.meanCohesion` | 5351.300000000001 | 5565.999999999998 | 3.5783 | 60 | 51 | 9 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 0.15 s (timeline) · controller-natural-20261026-0002 0.15 s (timeline) · controller-natural-20261026-0003 0.15 s (timeline) · controller-natural-20261026-0004 0.15 s (timeline) · controller-natural-20261026-0005 0.15 s (timeline) · controller-natural-20261026-0006 0.15 s (timeline) · controller-natural-20261026-0007 0.15 s (timeline) · controller-natural-20261026-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1671&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1671`); it opens the seed that parts earliest, and the dropdowns choose another.

