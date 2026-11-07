# Benchmark run #1691 · 60 seeds from `controller-natural-20261026` (ge-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/pin/pr777-bdcac65f @ bdcac65 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42328552150) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 14 of 42 counters under p 0.05 (about 2.1 by chance), 10 under 0.0012; casualties -3.1% (p 0.5601)**

- Clears the Bonferroni line (p < 0.0012): fire.total 31367 to 49737 (+58.6%, p 0); movementResolver.changes 134099 to 182558 (+36.1%, p 0); recon.orders 1507 to 2530 (+67.9%, p 0); recon.contacts 226 to 536 (+137.2%, p 0); recon.cancelled 459 to 1269 (+176.5%, p 0); recon.reportsDelivered 889 to 2163 (+143.3%, p 0); squadPerformance.meanMission 4284.099999999999 to 4060.4999999999995 (-5.2%, p 0); squadPerformance.meanCohesion 5351.300000000001 to 5563.799999999999 (+4.0%, p 0); vacantObjectiveStalls.length 71 to 15 (-78.9%, p 0.0001); recon.retriggerBlocked 672 to 751 (+11.8%, p 0.0004).
- Under 0.05 only: loopAlerts.length 834 to 995 (+19.3%, p 0.0038); recon.noContact 696 to 623 (-10.5%, p 0.027); retreatSamples 88001 to 108418 (+23.2%, p 0.0328); stallOutcomes.wakes 10 to 2 (-80.0%, p 0.0386).
- Wall time on/off x1.443 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.443 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2135 | 2069 | -1.1 | 47 | 21 | 26 | 0.5601 |
| `usKills` | 893 | 752 | -2.35 | 50 | 22 | 28 | 0.4799 |
| `geKills` | 1242 | 1317 | 1.25 | 48 | 30 | 18 | 0.1114 |
| `fire.total` | 31367 | 49737 | 306.1667 | 50 | 44 | 6 | 0 |
| `fire.hits` | 4608 | 4523 | -1.4167 | 50 | 24 | 26 | 0.8877 |
| `retreatSamples` | 88001 | 108418 | 340.2833 | 50 | 33 | 17 | 0.0328 |
| `movementResolver.changes` | 134099 | 182558 | 807.65 | 60 | 59 | 1 | 0 |
| `grenades.throws` | 34 | 40 | 0.1 | 21 | 15 | 6 | 0.0784 |
| `grenades.bursts` | 34 | 40 | 0.1 | 21 | 15 | 6 | 0.0784 |
| `grenades.wounded` | 17 | 16 | -0.0167 | 4 | 2 | 2 | 1 |
| `grenades.casualties` | 8 | 4 | -0.0667 | 3 | 1 | 2 | 1 |
| `grenades.suppressed` | 40 | 49 | 0.15 | 8 | 6 | 2 | 0.2891 |
| `grenades.friendlyWounded` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.aborted` | 6 | 7 | 0.0167 | 7 | 4 | 3 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 71 | 15 | -0.9333 | 32 | 5 | 27 | 0.0001 |
| `loopAlerts.length` | 834 | 995 | 2.6833 | 49 | 35 | 14 | 0.0038 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 158 | 151 | -0.1167 | 39 | 19 | 20 | 1 |
| `stallOutcomes.wakes` | 10 | 2 | -0.1333 | 12 | 2 | 10 | 0.0386 |
| `stallOutcomes.repeats` | 1 | 1 | 0 | 2 | 1 | 1 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1507 | 2530 | 17.05 | 60 | 58 | 2 | 0 |
| `recon.contacts` | 226 | 536 | 5.1667 | 47 | 43 | 4 | 0 |
| `recon.noContact` | 696 | 623 | -1.2167 | 53 | 18 | 35 | 0.027 |
| `recon.timeouts` | 54 | 38 | -0.2667 | 24 | 9 | 15 | 0.3075 |
| `recon.cancelled` | 459 | 1269 | 13.5 | 60 | 59 | 1 | 0 |
| `recon.reportsDelivered` | 889 | 2163 | 21.2333 | 50 | 44 | 6 | 0 |
| `recon.retriggerBlocked` | 672 | 751 | 1.3167 | 44 | 34 | 10 | 0.0004 |
| `squadPerformance.meanOverall` | 5036 | 5000.7 | -0.5883 | 59 | 25 | 34 | 0.2976 |
| `squadPerformance.p10Overall` | 4649.8 | 4668.700000000002 | 0.315 | 42 | 24 | 18 | 0.4408 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4284.099999999999 | 4060.4999999999995 | -3.7267 | 50 | 9 | 41 | 0 |
| `squadPerformance.meanMovement` | 5992.999999999999 | 5992.299999999999 | -0.0117 | 32 | 15 | 17 | 0.8601 |
| `squadPerformance.meanControl` | 5705.199999999999 | 5675.400000000001 | -0.4967 | 50 | 19 | 31 | 0.1189 |
| `squadPerformance.meanCohesion` | 5351.300000000001 | 5563.799999999999 | 3.5417 | 60 | 49 | 11 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 0.15 s (timeline) · controller-natural-20261026-0002 0.15 s (timeline) · controller-natural-20261026-0003 0.15 s (timeline) · controller-natural-20261026-0004 0.15 s (timeline) · controller-natural-20261026-0005 0.15 s (timeline) · controller-natural-20261026-0006 0.15 s (timeline) · controller-natural-20261026-0007 0.15 s (timeline) · controller-natural-20261026-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1691&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr777-bdcac65f/ai_flow_live.html?bench=1691&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1691`); it opens the seed that parts earliest, and the dropdowns choose another.

