# Benchmark run #1720 · 60 seeds from `pr783-defend-reinforcements` (ge-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=new&defendReinforcements=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/pin/pr783-3e36a67 @ 3e36a67 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42354291488) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 248.025 s); 12 of 42 counters under p 0.05 (about 2.1 by chance), 7 under 0.0012; casualties +9.7% (p 0.0002)**

- Clears the Bonferroni line (p < 0.0012): movementResolver.changes 221058 to 278851 (+26.1%, p 0); recon.noContact 743 to 902 (+21.4%, p 0); recon.retriggerBlocked 875 to 1065 (+21.7%, p 0); fire.total 64335 to 72118 (+12.1%, p 0.0001); recon.orders 2889 to 3266 (+13.0%, p 0.0001); casualties 2431 to 2667 (+9.7%, p 0.0002); squadPerformance.meanOverall 4811.4000000000015 to 4847.5 (+0.8%, p 0.0002).
- Under 0.05 only: loopAlerts.length 1252 to 1518 (+21.2%, p 0.0022); recon.contacts 607 to 687 (+13.2%, p 0.0198); fire.hits 5638 to 6152 (+9.1%, p 0.0247); regroups.entries 252 to 283 (+12.3%, p 0.0259); geKills 1460 to 1607 (+10.1%, p 0.0402).

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.176 (gate 1.25)
- the 60 changed records first part at simulated second: min 176.1, p10 188.1, median 248.025, p90 316.05, max 391.05

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2431 | 2667 | 3.9333 | 56 | 42 | 14 | 0.0002 |
| `usKills` | 971 | 1060 | 1.4833 | 55 | 32 | 23 | 0.2806 |
| `geKills` | 1460 | 1607 | 2.45 | 54 | 35 | 19 | 0.0402 |
| `fire.total` | 64335 | 72118 | 129.7167 | 60 | 45 | 15 | 0.0001 |
| `fire.hits` | 5638 | 6152 | 8.5667 | 58 | 38 | 20 | 0.0247 |
| `retreatSamples` | 140774 | 142194 | 23.6667 | 60 | 34 | 26 | 0.3663 |
| `movementResolver.changes` | 221058 | 278851 | 963.2167 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 78 | 59 | -0.3167 | 21 | 6 | 15 | 0.0784 |
| `grenades.bursts` | 78 | 59 | -0.3167 | 21 | 6 | 15 | 0.0784 |
| `grenades.wounded` | 46 | 27 | -0.3167 | 11 | 3 | 8 | 0.2266 |
| `grenades.casualties` | 16 | 11 | -0.0833 | 8 | 2 | 6 | 0.2891 |
| `grenades.suppressed` | 124 | 101 | -0.3833 | 12 | 4 | 8 | 0.3877 |
| `grenades.friendlyWounded` | 5 | 3 | -0.0333 | 4 | 1 | 3 | 0.625 |
| `grenades.friendlyCasualties` | 1 | 1 | 0 | 2 | 1 | 1 | 1 |
| `grenades.aborted` | 13 | 13 | 0 | 13 | 7 | 6 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 11 | 12 | 0.0167 | 19 | 11 | 8 | 0.6476 |
| `loopAlerts.length` | 1252 | 1518 | 4.4333 | 58 | 41 | 17 | 0.0022 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 252 | 283 | 0.5167 | 46 | 31 | 15 | 0.0259 |
| `stallOutcomes.wakes` | 3 | 4 | 0.0167 | 3 | 2 | 1 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2889 | 3266 | 6.2833 | 58 | 44 | 14 | 0.0001 |
| `recon.contacts` | 607 | 687 | 1.3333 | 54 | 36 | 18 | 0.0198 |
| `recon.noContact` | 743 | 902 | 2.65 | 59 | 48 | 11 | 0 |
| `recon.timeouts` | 39 | 46 | 0.1167 | 25 | 15 | 10 | 0.4244 |
| `recon.cancelled` | 1452 | 1567 | 1.9167 | 57 | 36 | 21 | 0.0627 |
| `recon.reportsDelivered` | 2540 | 2826 | 4.7667 | 58 | 31 | 27 | 0.694 |
| `recon.retriggerBlocked` | 875 | 1065 | 3.1667 | 54 | 49 | 5 | 0 |
| `squadPerformance.meanOverall` | 4811.4000000000015 | 4847.5 | 0.6017 | 57 | 43 | 14 | 0.0002 |
| `squadPerformance.p10Overall` | 4465.3 | 4462.999999999999 | -0.0383 | 27 | 14 | 13 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3676.5000000000005 | 3728.9 | 0.8733 | 59 | 34 | 25 | 0.2976 |
| `squadPerformance.meanMovement` | 5990.5 | 5991 | 0.0083 | 21 | 13 | 8 | 0.3833 |
| `squadPerformance.meanControl` | 5623.5999999999985 | 5628.999999999998 | 0.09 | 59 | 32 | 27 | 0.6029 |
| `squadPerformance.meanCohesion` | 5538.5999999999985 | 5563 | 0.4067 | 60 | 35 | 25 | 0.2451 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr783-defend-reinforcements-0050 176.1 s (timeline) · pr783-defend-reinforcements-0057 178.05 s (timeline) · pr783-defend-reinforcements-0022 181.05 s (timeline) · pr783-defend-reinforcements-0047 183 s (timeline) · pr783-defend-reinforcements-0011 184.05 s (timeline) · pr783-defend-reinforcements-0030 188.1 s (timeline) · pr783-defend-reinforcements-0018 190.05 s (timeline) · pr783-defend-reinforcements-0001 192 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1720&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr783-3e36a67/ai_flow_live.html?bench=1720&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1720`); it opens the seed that parts earliest, and the dropdowns choose another.

