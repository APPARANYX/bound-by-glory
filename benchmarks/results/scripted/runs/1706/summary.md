# Benchmark run #1706 · 20 seeds from `item4-9e6866b-trucks` (meeting), windows `0+600`

- **OFF** flags: `none` · **ON** flags: `tacticalController=new`
- work/pin/item4-9e6866bc @ 9e6866b · [run](https://github.com/APPARANYX/grasstex/actions/runs/42341625569) · build v29-dev

## Verdict

**MOVED: 20 of 20 pairs changed (median first part 0.15 s); 12 of 42 counters under p 0.05 (about 2.1 by chance), 3 under 0.0012; casualties -18.4% (p 0.0075)**

- Clears the Bonferroni line (p < 0.0012): squadPerformance.meanControl 1912.1999999999998 to 1867.8 (-2.3%, p 0); loopAlerts.length 189 to 443 (+134.4%, p 0.0001); recon.orders 367 to 490 (+33.5%, p 0.0007).
- Under 0.05 only: recon.retriggerBlocked 162 to 227 (+40.1%, p 0.0023); fire.total 6603 to 14838 (+124.7%, p 0.0026); movementResolver.changes 26432 to 34087 (+29.0%, p 0.0026); squadPerformance.meanMission 1393.8000000000002 to 1289.5000000000002 (-7.5%, p 0.0026); casualties 548 to 447 (-18.4%, p 0.0075); squadPerformance.meanOverall 1695.8000000000002 to 1657.3999999999999 (-2.3%, p 0.0075); regroups.entries 28 to 51 (+82.1%, p 0.0213); recon.contacts 38 to 82 (+115.8%, p 0.0309); squadPerformance.meanCohesion 1933.1000000000001 to 1947.9 (+0.8%, p 0.0414).

## Paired comparison (off against on)

- **20** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.058 (gate 1.25)
- the 20 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 548 | 447 | -5.05 | 18 | 3 | 15 | 0.0075 |
| `usKills` | 232 | 184 | -2.4 | 18 | 7 | 11 | 0.4807 |
| `geKills` | 316 | 263 | -2.65 | 19 | 7 | 12 | 0.3593 |
| `fire.total` | 6603 | 14838 | 411.75 | 20 | 17 | 3 | 0.0026 |
| `fire.hits` | 1154 | 1004 | -7.5 | 20 | 7 | 13 | 0.2632 |
| `retreatSamples` | 19339 | 17894 | -72.25 | 20 | 11 | 9 | 0.8238 |
| `movementResolver.changes` | 26432 | 34087 | 382.75 | 20 | 17 | 3 | 0.0026 |
| `grenades.throws` | 4 | 17 | 0.65 | 4 | 4 | 0 | 0.125 |
| `grenades.bursts` | 4 | 17 | 0.65 | 4 | 4 | 0 | 0.125 |
| `grenades.wounded` | 1 | 18 | 0.85 | 3 | 3 | 0 | 0.25 |
| `grenades.casualties` | 0 | 6 | 0.3 | 2 | 2 | 0 | 0.5 |
| `grenades.suppressed` | 3 | 36 | 1.65 | 3 | 3 | 0 | 0.25 |
| `grenades.friendlyWounded` | 0 | 2 | 0.1 | 2 | 2 | 0 | 0.5 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 2 | 0.1 | 1 | 1 | 0 | 1 |
| `movementStalls.length` | 14 | 14 | 0 | 6 | 2 | 4 | 0.6875 |
| `routeStalls.length` | 31 | 28 | -0.15 | 5 | 1 | 4 | 0.375 |
| `targetlessStalls.length` | 3 | 1 | -0.1 | 2 | 0 | 2 | 0.5 |
| `vacantObjectiveStalls.length` | 58 | 42 | -0.8 | 14 | 4 | 10 | 0.1796 |
| `loopAlerts.length` | 189 | 443 | 12.7 | 19 | 18 | 1 | 0.0001 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 28 | 51 | 1.15 | 16 | 13 | 3 | 0.0213 |
| `stallOutcomes.wakes` | 4 | 0 | -0.2 | 4 | 0 | 4 | 0.125 |
| `stallOutcomes.repeats` | 4 | 0 | -0.2 | 4 | 0 | 4 | 0.125 |
| `timeline.stalledOnsets` | 23 | 14 | -0.45 | 9 | 3 | 6 | 0.5078 |
| `timeline.stalledSamples` | 100 | 3641 | 177.05 | 8 | 3 | 5 | 0.7266 |
| `timeline.stalledOnsetsRepeated` | 23 | 14 | -0.45 | 9 | 3 | 6 | 0.5078 |
| `timeline.stalledSamplesRepeated` | 100 | 3641 | 177.05 | 8 | 3 | 5 | 0.7266 |
| `recon.orders` | 367 | 490 | 6.15 | 19 | 17 | 2 | 0.0007 |
| `recon.contacts` | 38 | 82 | 2.2 | 18 | 14 | 4 | 0.0309 |
| `recon.noContact` | 60 | 76 | 0.8 | 15 | 11 | 4 | 0.1185 |
| `recon.timeouts` | 96 | 96 | 0 | 17 | 7 | 10 | 0.6291 |
| `recon.cancelled` | 146 | 206 | 3 | 19 | 14 | 5 | 0.0636 |
| `recon.reportsDelivered` | 188 | 370 | 9.1 | 16 | 11 | 5 | 0.2101 |
| `recon.retriggerBlocked` | 162 | 227 | 3.25 | 17 | 15 | 2 | 0.0023 |
| `squadPerformance.meanOverall` | 1695.8000000000002 | 1657.3999999999999 | -1.92 | 18 | 3 | 15 | 0.0075 |
| `squadPerformance.p10Overall` | 1488 | 1488.5 | 0.025 | 15 | 7 | 8 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 1393.8000000000002 | 1289.5000000000002 | -5.215 | 20 | 3 | 17 | 0.0026 |
| `squadPerformance.meanMovement` | 1955.1000000000001 | 1955.9000000000003 | 0.04 | 19 | 8 | 11 | 0.6476 |
| `squadPerformance.meanControl` | 1912.1999999999998 | 1867.8 | -2.22 | 19 | 0 | 19 | 0 |
| `squadPerformance.meanCohesion` | 1933.1000000000001 | 1947.9 | 0.74 | 20 | 15 | 5 | 0.0414 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

item4-9e6866b-trucks-0001 0.15 s (timeline) · item4-9e6866b-trucks-0002 0.15 s (timeline) · item4-9e6866b-trucks-0003 0.15 s (timeline) · item4-9e6866b-trucks-0004 0.15 s (timeline) · item4-9e6866b-trucks-0005 0.15 s (timeline) · item4-9e6866b-trucks-0006 0.15 s (timeline) · item4-9e6866b-trucks-0007 0.15 s (timeline) · item4-9e6866b-trucks-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1706&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-item4-9e6866bc/ai_flow_live.html?bench=1706&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1706`); it opens the seed that parts earliest, and the dropdowns choose another.

