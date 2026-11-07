# Benchmark run #1704 · 20 seeds from `item4-9e6866b-trucks` (us-defend), windows `0+600`

- **OFF** flags: `none` · **ON** flags: `tacticalController=new`
- work/pin/item4-9e6866bc @ 9e6866b · [run](https://github.com/APPARANYX/grasstex/actions/runs/42341536666) · build v29-dev

## Verdict

**MOVED: 20 of 20 pairs changed (median first part 0.15 s); 4 of 42 counters under p 0.05 (about 2.1 by chance), 2 under 0.0012; casualties -5.8% (p 0.6476)**

- Clears the Bonferroni line (p < 0.0012): fire.total 5779 to 16082 (+178.3%, p 0); recon.cancelled 123 to 199 (+61.8%, p 0.0004).
- Under 0.05 only: recon.orders 397 to 490 (+23.4%, p 0.0026); retreatSamples 19199 to 21915 (+14.1%, p 0.0414).

## Paired comparison (off against on)

- **20** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.034 (gate 1.25)
- the 20 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 469 | 442 | -1.35 | 19 | 8 | 11 | 0.6476 |
| `usKills` | 219 | 228 | 0.45 | 20 | 10 | 10 | 1 |
| `geKills` | 250 | 214 | -1.8 | 17 | 8 | 9 | 1 |
| `fire.total` | 5779 | 16082 | 515.15 | 20 | 19 | 1 | 0 |
| `fire.hits` | 968 | 961 | -0.35 | 20 | 10 | 10 | 1 |
| `retreatSamples` | 19199 | 21915 | 135.8 | 20 | 15 | 5 | 0.0414 |
| `movementResolver.changes` | 25358 | 28944 | 179.3 | 20 | 12 | 8 | 0.5034 |
| `grenades.throws` | 11 | 3 | -0.4 | 5 | 2 | 3 | 1 |
| `grenades.bursts` | 11 | 2 | -0.45 | 4 | 1 | 3 | 0.625 |
| `grenades.wounded` | 1 | 1 | 0 | 2 | 1 | 1 | 1 |
| `grenades.casualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 7 | 2 | -0.25 | 2 | 1 | 1 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 2 | 0 | -0.1 | 1 | 0 | 1 | 1 |
| `movementStalls.length` | 36 | 19 | -0.85 | 10 | 2 | 8 | 0.1094 |
| `routeStalls.length` | 3 | 2 | -0.05 | 4 | 2 | 2 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 32 | 24 | -0.4 | 11 | 3 | 8 | 0.2266 |
| `loopAlerts.length` | 251 | 338 | 4.35 | 18 | 12 | 6 | 0.2379 |
| `writerConflicts` | 0 | 8 | 0.4 | 1 | 1 | 0 | 1 |
| `regroups.entries` | 61 | 40 | -1.05 | 14 | 6 | 8 | 0.7905 |
| `stallOutcomes.wakes` | 0 | 1 | 0.05 | 1 | 1 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 1 | 0.05 | 1 | 1 | 0 | 1 |
| `timeline.stalledOnsets` | 47 | 25 | -1.1 | 13 | 4 | 9 | 0.2668 |
| `timeline.stalledSamples` | 261 | 940 | 33.95 | 12 | 3 | 9 | 0.146 |
| `timeline.stalledOnsetsRepeated` | 47 | 25 | -1.1 | 13 | 4 | 9 | 0.2668 |
| `timeline.stalledSamplesRepeated` | 261 | 940 | 33.95 | 12 | 3 | 9 | 0.146 |
| `recon.orders` | 397 | 490 | 4.65 | 20 | 17 | 3 | 0.0026 |
| `recon.contacts` | 29 | 62 | 1.65 | 18 | 12 | 6 | 0.2379 |
| `recon.noContact` | 119 | 114 | -0.25 | 14 | 7 | 7 | 1 |
| `recon.timeouts` | 97 | 91 | -0.3 | 15 | 7 | 8 | 1 |
| `recon.cancelled` | 123 | 199 | 3.8 | 20 | 18 | 2 | 0.0004 |
| `recon.reportsDelivered` | 165 | 246 | 4.05 | 16 | 8 | 8 | 1 |
| `recon.retriggerBlocked` | 214 | 205 | -0.45 | 12 | 6 | 6 | 1 |
| `squadPerformance.meanOverall` | 1705.4 | 1696.9999999999998 | -0.42 | 20 | 9 | 11 | 0.8238 |
| `squadPerformance.p10Overall` | 1506.2 | 1524.3 | 0.905 | 17 | 10 | 7 | 0.6291 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 1443.8000000000004 | 1401.4 | -2.12 | 20 | 7 | 13 | 0.2632 |
| `squadPerformance.meanMovement` | 1969.5000000000005 | 1974.9000000000003 | 0.27 | 14 | 9 | 5 | 0.424 |
| `squadPerformance.meanControl` | 1893.2 | 1871.2000000000003 | -1.1 | 20 | 8 | 12 | 0.5034 |
| `squadPerformance.meanCohesion` | 1905 | 1911.1000000000001 | 0.305 | 19 | 13 | 6 | 0.1671 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

item4-9e6866b-trucks-0001 0.15 s (timeline) · item4-9e6866b-trucks-0002 0.15 s (timeline) · item4-9e6866b-trucks-0003 0.15 s (timeline) · item4-9e6866b-trucks-0004 0.15 s (timeline) · item4-9e6866b-trucks-0005 0.15 s (timeline) · item4-9e6866b-trucks-0006 0.15 s (timeline) · item4-9e6866b-trucks-0007 0.15 s (timeline) · item4-9e6866b-trucks-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1704&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-item4-9e6866bc/ai_flow_live.html?bench=1704&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1704`); it opens the seed that parts earliest, and the dropdowns choose another.

