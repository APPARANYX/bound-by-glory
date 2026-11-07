# Benchmark run #1721 · 60 seeds from `pr783-defend-reinforcements` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&defendReinforcements=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr783-3e36a67 @ 3e36a67 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42354294112) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 247.575 s); 14 of 42 counters under p 0.05 (about 2.1 by chance), 9 under 0.0012; casualties +16.1% (p 0)**

- Clears the Bonferroni line (p < 0.0012): casualties 2583 to 2998 (+16.1%, p 0); movementResolver.changes 169787 to 212687 (+25.3%, p 0); recon.orders 1704 to 1977 (+16.0%, p 0); recon.noContact 789 to 961 (+21.8%, p 0); recon.retriggerBlocked 777 to 974 (+25.4%, p 0); squadPerformance.meanOverall 4828.500000000001 to 4881.1 (+1.1%, p 0); fire.total 39270 to 46073 (+17.3%, p 0.0001); vacantObjectiveStalls.length 86 to 133 (+54.7%, p 0.0002); retreatSamples 139453 to 152911 (+9.7%, p 0.0004).
- Under 0.05 only: geKills 1345 to 1581 (+17.5%, p 0.0015); squadPerformance.meanControl 5685.8 to 5737.200000000001 (+0.9%, p 0.0022); fire.hits 5603 to 6543 (+16.8%, p 0.0135); squadPerformance.meanMission 3819.2000000000003 to 3873.199999999999 (+1.4%, p 0.0135); usKills 1238 to 1417 (+14.5%, p 0.0163).

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.066 (gate 1.25)
- the 60 changed records first part at simulated second: min 171, p10 184.05, median 247.575, p90 321, max 409.05

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2583 | 2998 | 6.9167 | 57 | 45 | 12 | 0 |
| `usKills` | 1238 | 1417 | 2.9833 | 57 | 38 | 19 | 0.0163 |
| `geKills` | 1345 | 1581 | 3.9333 | 59 | 42 | 17 | 0.0015 |
| `fire.total` | 39270 | 46073 | 113.3833 | 58 | 44 | 14 | 0.0001 |
| `fire.hits` | 5603 | 6543 | 15.6667 | 60 | 40 | 20 | 0.0135 |
| `retreatSamples` | 139453 | 152911 | 224.3 | 60 | 44 | 16 | 0.0004 |
| `movementResolver.changes` | 169787 | 212687 | 715 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 46 | 54 | 0.1333 | 14 | 8 | 6 | 0.7905 |
| `grenades.bursts` | 46 | 54 | 0.1333 | 14 | 8 | 6 | 0.7905 |
| `grenades.wounded` | 45 | 39 | -0.1 | 4 | 2 | 2 | 1 |
| `grenades.casualties` | 14 | 7 | -0.1167 | 5 | 1 | 4 | 0.375 |
| `grenades.suppressed` | 98 | 72 | -0.4333 | 12 | 4 | 8 | 0.3877 |
| `grenades.friendlyWounded` | 3 | 3 | 0 | 2 | 1 | 1 | 1 |
| `grenades.friendlyCasualties` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `grenades.aborted` | 5 | 2 | -0.05 | 7 | 2 | 5 | 0.4531 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 86 | 133 | 0.7833 | 37 | 30 | 7 | 0.0002 |
| `loopAlerts.length` | 872 | 927 | 0.9167 | 55 | 29 | 26 | 0.7877 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 242 | 249 | 0.1167 | 46 | 22 | 24 | 0.883 |
| `stallOutcomes.wakes` | 7 | 4 | -0.05 | 6 | 2 | 4 | 0.6875 |
| `stallOutcomes.repeats` | 2 | 1 | -0.0167 | 2 | 1 | 1 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1704 | 1977 | 4.55 | 56 | 46 | 10 | 0 |
| `recon.contacts` | 289 | 298 | 0.15 | 47 | 22 | 25 | 0.7709 |
| `recon.noContact` | 789 | 961 | 2.8667 | 54 | 47 | 7 | 0 |
| `recon.timeouts` | 66 | 73 | 0.1167 | 30 | 19 | 11 | 0.2005 |
| `recon.cancelled` | 511 | 587 | 1.2667 | 53 | 33 | 20 | 0.0984 |
| `recon.reportsDelivered` | 1220 | 1267 | 0.7833 | 55 | 33 | 22 | 0.177 |
| `recon.retriggerBlocked` | 777 | 974 | 3.2833 | 59 | 49 | 10 | 0 |
| `squadPerformance.meanOverall` | 4828.500000000001 | 4881.1 | 0.8767 | 60 | 47 | 13 | 0 |
| `squadPerformance.p10Overall` | 4467.6 | 4466.200000000001 | -0.0233 | 23 | 11 | 12 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3819.2000000000003 | 3873.199999999999 | 0.9 | 60 | 40 | 20 | 0.0135 |
| `squadPerformance.meanMovement` | 5990.900000000001 | 5988.7 | -0.0367 | 29 | 13 | 16 | 0.7111 |
| `squadPerformance.meanControl` | 5685.8 | 5737.200000000001 | 0.8567 | 58 | 41 | 17 | 0.0022 |
| `squadPerformance.meanCohesion` | 5436.9 | 5457.899999999998 | 0.35 | 57 | 29 | 28 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr783-defend-reinforcements-0046 171 s (timeline) · pr783-defend-reinforcements-0037 176.1 s (timeline) · pr783-defend-reinforcements-0043 177 s (timeline) · pr783-defend-reinforcements-0021 181.05 s (timeline) · pr783-defend-reinforcements-0049 181.05 s (timeline) · pr783-defend-reinforcements-0026 184.05 s (timeline) · pr783-defend-reinforcements-0034 186 s (timeline) · pr783-defend-reinforcements-0002 197.1 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1721&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr783-3e36a67/ai_flow_live.html?bench=1721&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1721`); it opens the seed that parts earliest, and the dropdowns choose another.

