# Benchmark run #1690 · 60 seeds from `controller-natural-20261026` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/pin/pr777-bdcac65f @ bdcac65 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42328549115) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 15 of 42 counters under p 0.05 (about 2.1 by chance), 12 under 0.0012; casualties -4.3% (p 1)**

- Clears the Bonferroni line (p < 0.0012): fire.total 32763 to 56652 (+72.9%, p 0); movementResolver.changes 140845 to 186233 (+32.2%, p 0); vacantObjectiveStalls.length 95 to 16 (-83.2%, p 0); recon.orders 1420 to 2229 (+57.0%, p 0); recon.contacts 193 to 390 (+102.1%, p 0); recon.cancelled 457 to 1046 (+128.9%, p 0); recon.reportsDelivered 791 to 1505 (+90.3%, p 0); squadPerformance.meanMission 4158.700000000002 to 3920.3999999999996 (-5.7%, p 0); squadPerformance.meanCohesion 5447.199999999999 to 5579.299999999999 (+2.4%, p 0); retreatSamples 107664 to 136710 (+27.0%, p 0.0001); recon.retriggerBlocked 657 to 750 (+14.2%, p 0.0002); loopAlerts.length 909 to 1185 (+30.4%, p 0.0009).
- Under 0.05 only: squadPerformance.meanOverall 5011.100000000003 to 4947.999999999999 (-1.3%, p 0.0062); grenades.aborted 1 to 9 (+800.0%, p 0.0313); grenades.bursts 32 to 48 (+50.0%, p 0.0347).
- Wall time on/off x1.533 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.533 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2119 | 2027 | -1.5333 | 49 | 24 | 25 | 1 |
| `usKills` | 975 | 962 | -0.2167 | 49 | 21 | 28 | 0.3916 |
| `geKills` | 1144 | 1065 | -1.3167 | 50 | 24 | 26 | 0.8877 |
| `fire.total` | 32763 | 56652 | 398.15 | 50 | 48 | 2 | 0 |
| `fire.hits` | 4684 | 4678 | -0.1 | 48 | 22 | 26 | 0.6655 |
| `retreatSamples` | 107664 | 136710 | 484.1 | 50 | 39 | 11 | 0.0001 |
| `movementResolver.changes` | 140845 | 186233 | 756.4667 | 60 | 57 | 3 | 0 |
| `grenades.throws` | 33 | 48 | 0.25 | 22 | 16 | 6 | 0.0525 |
| `grenades.bursts` | 32 | 48 | 0.2667 | 23 | 17 | 6 | 0.0347 |
| `grenades.wounded` | 31 | 33 | 0.0333 | 13 | 9 | 4 | 0.2668 |
| `grenades.casualties` | 15 | 14 | -0.0167 | 6 | 4 | 2 | 0.6875 |
| `grenades.suppressed` | 101 | 97 | -0.0667 | 16 | 10 | 6 | 0.4545 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 1 | 9 | 0.1333 | 6 | 6 | 0 | 0.0313 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 95 | 16 | -1.3167 | 39 | 3 | 36 | 0 |
| `loopAlerts.length` | 909 | 1185 | 4.6 | 50 | 37 | 13 | 0.0009 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 189 | 208 | 0.3167 | 38 | 20 | 18 | 0.8714 |
| `stallOutcomes.wakes` | 6 | 3 | -0.05 | 6 | 2 | 4 | 0.6875 |
| `stallOutcomes.repeats` | 4 | 0 | -0.0667 | 3 | 0 | 3 | 0.25 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1420 | 2229 | 13.4833 | 59 | 54 | 5 | 0 |
| `recon.contacts` | 193 | 390 | 3.2833 | 49 | 43 | 6 | 0 |
| `recon.noContact` | 631 | 650 | 0.3167 | 49 | 28 | 21 | 0.3916 |
| `recon.timeouts` | 50 | 52 | 0.0333 | 24 | 14 | 10 | 0.5413 |
| `recon.cancelled` | 457 | 1046 | 9.8167 | 59 | 56 | 3 | 0 |
| `recon.reportsDelivered` | 791 | 1505 | 11.9 | 47 | 38 | 9 | 0 |
| `recon.retriggerBlocked` | 657 | 750 | 1.55 | 51 | 39 | 12 | 0.0002 |
| `squadPerformance.meanOverall` | 5011.100000000003 | 4947.999999999999 | -1.0517 | 60 | 19 | 41 | 0.0062 |
| `squadPerformance.p10Overall` | 4663.299999999999 | 4649.700000000001 | -0.2267 | 32 | 15 | 17 | 0.8601 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4158.700000000002 | 3920.3999999999996 | -3.9717 | 50 | 7 | 43 | 0 |
| `squadPerformance.meanMovement` | 5993.199999999997 | 5992.800000000001 | -0.0067 | 28 | 12 | 16 | 0.5716 |
| `squadPerformance.meanControl` | 5729.1 | 5695.399999999998 | -0.5617 | 50 | 21 | 29 | 0.3222 |
| `squadPerformance.meanCohesion` | 5447.199999999999 | 5579.299999999999 | 2.2017 | 59 | 46 | 13 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 0.15 s (timeline) · controller-natural-20261026-0002 0.15 s (timeline) · controller-natural-20261026-0003 0.15 s (timeline) · controller-natural-20261026-0004 0.15 s (timeline) · controller-natural-20261026-0005 0.15 s (timeline) · controller-natural-20261026-0006 0.15 s (timeline) · controller-natural-20261026-0007 0.15 s (timeline) · controller-natural-20261026-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1690&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr777-bdcac65f/ai_flow_live.html?bench=1690&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1690`); it opens the seed that parts earliest, and the dropdowns choose another.

