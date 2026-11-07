# Benchmark run #1719 · 60 seeds from `pr783-defend-reinforcements` (us-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=new&defendReinforcements=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/pin/pr783-3e36a67 @ 3e36a67 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42354284150) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 269.1 s); 11 of 42 counters under p 0.05 (about 2.1 by chance), 9 under 0.0012; casualties +10.6% (p 0.0009)**

- Clears the Bonferroni line (p < 0.0012): movementResolver.changes 228967 to 291838 (+27.5%, p 0); recon.noContact 783 to 963 (+23.0%, p 0); recon.retriggerBlocked 907 to 1096 (+20.8%, p 0); squadPerformance.meanOverall 4779.200000000001 to 4829.399999999998 (+1.1%, p 0); squadPerformance.meanMission 3627.9000000000005 to 3753 (+3.4%, p 0); fire.total 71216 to 82063 (+15.2%, p 0.0001); fire.hits 5919 to 6615 (+11.8%, p 0.0002); casualties 2604 to 2879 (+10.6%, p 0.0009); usKills 1238 to 1441 (+16.4%, p 0.001).
- Under 0.05 only: loopAlerts.length 1502 to 1777 (+18.3%, p 0.0022); recon.orders 2856 to 3053 (+6.9%, p 0.0046).

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.199 (gate 1.25)
- the 60 changed records first part at simulated second: min 182.1, p10 212.1, median 269.1, p90 326.1, max 402

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2604 | 2879 | 4.5833 | 58 | 42 | 16 | 0.0009 |
| `usKills` | 1238 | 1441 | 3.3833 | 55 | 40 | 15 | 0.001 |
| `geKills` | 1366 | 1438 | 1.2 | 55 | 30 | 25 | 0.5901 |
| `fire.total` | 71216 | 82063 | 180.7833 | 59 | 45 | 14 | 0.0001 |
| `fire.hits` | 5919 | 6615 | 11.6 | 59 | 44 | 15 | 0.0002 |
| `retreatSamples` | 156236 | 157454 | 20.3 | 60 | 31 | 29 | 0.8974 |
| `movementResolver.changes` | 228967 | 291838 | 1047.85 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 68 | 55 | -0.2167 | 32 | 14 | 18 | 0.5966 |
| `grenades.bursts` | 68 | 55 | -0.2167 | 32 | 14 | 18 | 0.5966 |
| `grenades.wounded` | 47 | 28 | -0.3167 | 14 | 6 | 8 | 0.7905 |
| `grenades.casualties` | 15 | 11 | -0.0667 | 11 | 4 | 7 | 0.5488 |
| `grenades.suppressed` | 106 | 60 | -0.7667 | 17 | 5 | 12 | 0.1435 |
| `grenades.friendlyWounded` | 1 | 3 | 0.0333 | 2 | 2 | 0 | 0.5 |
| `grenades.friendlyCasualties` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.aborted` | 12 | 12 | 0 | 14 | 8 | 6 | 0.7905 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 18 | 25 | 0.1167 | 18 | 10 | 8 | 0.8145 |
| `loopAlerts.length` | 1502 | 1777 | 4.5833 | 58 | 41 | 17 | 0.0022 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 292 | 301 | 0.15 | 51 | 29 | 22 | 0.4011 |
| `stallOutcomes.wakes` | 5 | 5 | 0 | 6 | 3 | 3 | 1 |
| `stallOutcomes.repeats` | 2 | 3 | 0.0167 | 5 | 3 | 2 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2856 | 3053 | 3.2833 | 56 | 39 | 17 | 0.0046 |
| `recon.contacts` | 666 | 645 | -0.35 | 55 | 28 | 27 | 1 |
| `recon.noContact` | 783 | 963 | 3 | 54 | 47 | 7 | 0 |
| `recon.timeouts` | 47 | 45 | -0.0333 | 22 | 12 | 10 | 0.8318 |
| `recon.cancelled` | 1303 | 1331 | 0.4667 | 56 | 31 | 25 | 0.5044 |
| `recon.reportsDelivered` | 2655 | 2598 | -0.95 | 58 | 27 | 31 | 0.694 |
| `recon.retriggerBlocked` | 907 | 1096 | 3.15 | 55 | 49 | 6 | 0 |
| `squadPerformance.meanOverall` | 4779.200000000001 | 4829.399999999998 | 0.8367 | 59 | 48 | 11 | 0 |
| `squadPerformance.p10Overall` | 4456.1 | 4449.899999999999 | -0.1033 | 14 | 8 | 6 | 0.7905 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3627.9000000000005 | 3753 | 2.085 | 57 | 44 | 13 | 0 |
| `squadPerformance.meanMovement` | 5989.5 | 5989.100000000001 | -0.0067 | 27 | 15 | 12 | 0.7011 |
| `squadPerformance.meanControl` | 5610.399999999999 | 5599.1 | -0.1883 | 59 | 27 | 32 | 0.6029 |
| `squadPerformance.meanCohesion` | 5550 | 5541.299999999997 | -0.145 | 60 | 27 | 33 | 0.519 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr783-defend-reinforcements-0043 182.1 s (timeline) · pr783-defend-reinforcements-0031 195 s (timeline) · pr783-defend-reinforcements-0017 198 s (timeline) · pr783-defend-reinforcements-0040 203.1 s (timeline) · pr783-defend-reinforcements-0021 207 s (timeline) · pr783-defend-reinforcements-0042 212.1 s (timeline) · pr783-defend-reinforcements-0023 213 s (timeline) · pr783-defend-reinforcements-0036 214.05 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1719&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr783-3e36a67/ai_flow_live.html?bench=1719&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1719`); it opens the seed that parts earliest, and the dropdowns choose another.

