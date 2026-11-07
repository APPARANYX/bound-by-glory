# Benchmark run #1682 · 60 seeds from `controller-natural-20261026` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/pin/pr776-cbe2da76 @ cbe2da7 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42315191037) · build v29-dev

## Verdict

**MOVED: 57 of 57 pairs changed (median first part 0.15 s); 14 of 42 counters under p 0.05 (about 2.1 by chance), 10 under 0.0012; casualties -4.9% (p 0.766)**

- Clears the Bonferroni line (p < 0.0012): fire.total 31033 to 54025 (+74.1%, p 0); movementResolver.changes 132511 to 177465 (+33.9%, p 0); vacantObjectiveStalls.length 89 to 19 (-78.7%, p 0); recon.orders 1333 to 2200 (+65.0%, p 0); recon.contacts 173 to 409 (+136.4%, p 0); recon.cancelled 429 to 1047 (+144.1%, p 0); recon.reportsDelivered 724 to 1629 (+125.0%, p 0); squadPerformance.meanMission 3961.500000000001 to 3736.4000000000005 (-5.7%, p 0); squadPerformance.meanCohesion 5172.0999999999985 to 5299.9 (+2.5%, p 0); retreatSamples 101555 to 127649 (+25.7%, p 0.0011).
- Under 0.05 only: grenades.aborted 1 to 13 (+1200.0%, p 0.0078); recon.retriggerBlocked 622 to 709 (+14.0%, p 0.0213); loopAlerts.length 879 to 1089 (+23.9%, p 0.0259); squadPerformance.meanOverall 4765.4000000000015 to 4709.8 (-1.2%, p 0.03).
- Wall time on/off x1.546 is over the 1.25 gate.
- Unpaired records: off 3, on 0 (a seed or checkpoint only one arm reached: the flag changed how long the battle lasted, or a shard failed).

## Paired comparison (off against on)

- **57** pairs (unpaired: off 3, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.546 (gate 1.25)
- the 57 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 1991 | 1893 | -1.7193 | 45 | 24 | 21 | 0.766 |
| `usKills` | 908 | 833 | -1.3158 | 43 | 15 | 28 | 0.066 |
| `geKills` | 1083 | 1060 | -0.4035 | 44 | 21 | 23 | 0.8804 |
| `fire.total` | 31033 | 54025 | 403.3684 | 47 | 46 | 1 | 0 |
| `fire.hits` | 4434 | 4303 | -2.2982 | 47 | 20 | 27 | 0.3817 |
| `retreatSamples` | 101555 | 127649 | 457.7895 | 47 | 35 | 12 | 0.0011 |
| `movementResolver.changes` | 132511 | 177465 | 788.6667 | 57 | 54 | 3 | 0 |
| `grenades.throws` | 33 | 54 | 0.3684 | 21 | 15 | 6 | 0.0784 |
| `grenades.bursts` | 32 | 54 | 0.386 | 22 | 16 | 6 | 0.0525 |
| `grenades.wounded` | 31 | 43 | 0.2105 | 14 | 10 | 4 | 0.1796 |
| `grenades.casualties` | 15 | 19 | 0.0702 | 11 | 7 | 4 | 0.5488 |
| `grenades.suppressed` | 101 | 128 | 0.4737 | 19 | 13 | 6 | 0.1671 |
| `grenades.friendlyWounded` | 0 | 6 | 0.1053 | 1 | 1 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 3 | 0.0526 | 1 | 1 | 0 | 1 |
| `grenades.aborted` | 1 | 13 | 0.2105 | 8 | 8 | 0 | 0.0078 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 89 | 19 | -1.2281 | 33 | 4 | 29 | 0 |
| `loopAlerts.length` | 879 | 1089 | 3.6842 | 46 | 31 | 15 | 0.0259 |
| `writerConflicts` | 0 | 2 | 0.0351 | 1 | 1 | 0 | 1 |
| `regroups.entries` | 183 | 214 | 0.5439 | 42 | 24 | 18 | 0.4408 |
| `stallOutcomes.wakes` | 4 | 2 | -0.0351 | 4 | 1 | 3 | 0.625 |
| `stallOutcomes.repeats` | 2 | 0 | -0.0351 | 2 | 0 | 2 | 0.5 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1333 | 2200 | 15.2105 | 56 | 53 | 3 | 0 |
| `recon.contacts` | 173 | 409 | 4.1404 | 46 | 43 | 3 | 0 |
| `recon.noContact` | 595 | 595 | 0 | 48 | 22 | 26 | 0.6655 |
| `recon.timeouts` | 50 | 46 | -0.0702 | 22 | 12 | 10 | 0.8318 |
| `recon.cancelled` | 429 | 1047 | 10.8421 | 56 | 54 | 2 | 0 |
| `recon.reportsDelivered` | 724 | 1629 | 15.8772 | 43 | 36 | 7 | 0 |
| `recon.retriggerBlocked` | 622 | 709 | 1.5263 | 49 | 33 | 16 | 0.0213 |
| `squadPerformance.meanOverall` | 4765.4000000000015 | 4709.8 | -0.9754 | 55 | 19 | 36 | 0.03 |
| `squadPerformance.p10Overall` | 4439.2 | 4433.100000000001 | -0.107 | 30 | 16 | 14 | 0.8555 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3961.500000000001 | 3736.4000000000005 | -3.9491 | 47 | 9 | 38 | 0 |
| `squadPerformance.meanMovement` | 5693.599999999998 | 5693.499999999999 | -0.0018 | 29 | 13 | 16 | 0.7111 |
| `squadPerformance.meanControl` | 5441.800000000001 | 5417.000000000002 | -0.4351 | 47 | 21 | 26 | 0.5601 |
| `squadPerformance.meanCohesion` | 5172.0999999999985 | 5299.9 | 2.2421 | 57 | 45 | 12 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

controller-natural-20261026-0001 0.15 s (timeline) · controller-natural-20261026-0002 0.15 s (timeline) · controller-natural-20261026-0003 0.15 s (timeline) · controller-natural-20261026-0004 0.15 s (timeline) · controller-natural-20261026-0005 0.15 s (timeline) · controller-natural-20261026-0006 0.15 s (timeline) · controller-natural-20261026-0007 0.15 s (timeline) · controller-natural-20261026-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1682&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr776-cbe2da76/ai_flow_live.html?bench=1682&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1682`); it opens the seed that parts earliest, and the dropdowns choose another.

