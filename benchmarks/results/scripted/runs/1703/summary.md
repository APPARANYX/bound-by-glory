# Benchmark run #1703 · 20 seeds from `item4-9e6866b-trucks` (ge-defend), windows `0+600`

- **OFF** flags: `none` · **ON** flags: `tacticalController=new`
- work/pin/item4-9e6866bc @ 9e6866b · [run](https://github.com/APPARANYX/grasstex/actions/runs/42341519434) · build v29-dev

## Verdict

**MOVED: 20 of 20 pairs changed (median first part 0.15 s); 8 of 42 counters under p 0.05 (about 2.1 by chance), 2 under 0.0012; casualties -14.6% (p 0.0963)**

- Clears the Bonferroni line (p < 0.0012): fire.total 5164 to 13483 (+161.1%, p 0); recon.orders 371 to 515 (+38.8%, p 0.0004).
- Under 0.05 only: recon.cancelled 109 to 235 (+115.6%, p 0.0026); squadPerformance.meanMission 1488.2999999999997 to 1391.4 (-6.5%, p 0.0118); squadPerformance.meanCohesion 1847.1000000000001 to 1881.5000000000002 (+1.9%, p 0.0118); grenades.throws 0 to 15 (new, p 0.0313); grenades.bursts 0 to 14 (new, p 0.0313); geKills 316 to 227 (-28.2%, p 0.0414).

## Paired comparison (off against on)

- **20** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x0.998 (gate 1.25)
- the 20 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 480 | 410 | -3.5 | 18 | 5 | 13 | 0.0963 |
| `usKills` | 164 | 183 | 0.95 | 19 | 6 | 13 | 0.1671 |
| `geKills` | 316 | 227 | -4.45 | 20 | 5 | 15 | 0.0414 |
| `fire.total` | 5164 | 13483 | 415.95 | 20 | 19 | 1 | 0 |
| `fire.hits` | 992 | 1010 | 0.9 | 20 | 10 | 10 | 1 |
| `retreatSamples` | 15546 | 17996 | 122.5 | 20 | 11 | 9 | 0.8238 |
| `movementResolver.changes` | 24039 | 29462 | 271.15 | 20 | 14 | 6 | 0.1153 |
| `grenades.throws` | 0 | 15 | 0.75 | 6 | 6 | 0 | 0.0313 |
| `grenades.bursts` | 0 | 14 | 0.7 | 6 | 6 | 0 | 0.0313 |
| `grenades.wounded` | 0 | 4 | 0.2 | 2 | 2 | 0 | 0.5 |
| `grenades.casualties` | 0 | 2 | 0.1 | 1 | 1 | 0 | 1 |
| `grenades.suppressed` | 0 | 6 | 0.3 | 3 | 3 | 0 | 0.25 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 23 | 27 | 0.2 | 10 | 5 | 5 | 1 |
| `routeStalls.length` | 1 | 8 | 0.35 | 8 | 7 | 1 | 0.0703 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 20 | 26 | 0.3 | 11 | 8 | 3 | 0.2266 |
| `loopAlerts.length` | 213 | 362 | 7.45 | 18 | 13 | 5 | 0.0963 |
| `writerConflicts` | 0 | 2 | 0.1 | 1 | 1 | 0 | 1 |
| `regroups.entries` | 69 | 42 | -1.35 | 15 | 11 | 4 | 0.1185 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 27 | 32 | 0.25 | 12 | 7 | 5 | 0.7744 |
| `timeline.stalledSamples` | 2948 | 188 | -138 | 12 | 6 | 6 | 1 |
| `timeline.stalledOnsetsRepeated` | 27 | 32 | 0.25 | 12 | 7 | 5 | 0.7744 |
| `timeline.stalledSamplesRepeated` | 2948 | 188 | -138 | 12 | 6 | 6 | 1 |
| `recon.orders` | 371 | 515 | 7.2 | 20 | 18 | 2 | 0.0004 |
| `recon.contacts` | 43 | 53 | 0.5 | 16 | 11 | 5 | 0.2101 |
| `recon.noContact` | 96 | 116 | 1 | 16 | 11 | 5 | 0.2101 |
| `recon.timeouts` | 100 | 92 | -0.4 | 17 | 7 | 10 | 0.6291 |
| `recon.cancelled` | 109 | 235 | 6.3 | 20 | 17 | 3 | 0.0026 |
| `recon.reportsDelivered` | 210 | 205 | -0.25 | 16 | 9 | 7 | 0.8036 |
| `recon.retriggerBlocked` | 192 | 228 | 1.8 | 19 | 14 | 5 | 0.0636 |
| `squadPerformance.meanOverall` | 1716.1000000000001 | 1684.5 | -1.58 | 20 | 6 | 14 | 0.1153 |
| `squadPerformance.p10Overall` | 1523.2 | 1518.3999999999999 | -0.24 | 15 | 8 | 7 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 1488.2999999999997 | 1391.4 | -4.845 | 20 | 4 | 16 | 0.0118 |
| `squadPerformance.meanMovement` | 1970.5 | 1960.1 | -0.52 | 20 | 8 | 12 | 0.5034 |
| `squadPerformance.meanControl` | 1898 | 1871.7 | -1.315 | 19 | 8 | 11 | 0.6476 |
| `squadPerformance.meanCohesion` | 1847.1000000000001 | 1881.5000000000002 | 1.72 | 20 | 16 | 4 | 0.0118 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

item4-9e6866b-trucks-0001 0.15 s (timeline) · item4-9e6866b-trucks-0002 0.15 s (timeline) · item4-9e6866b-trucks-0003 0.15 s (timeline) · item4-9e6866b-trucks-0004 0.15 s (timeline) · item4-9e6866b-trucks-0005 0.15 s (timeline) · item4-9e6866b-trucks-0006 0.15 s (timeline) · item4-9e6866b-trucks-0007 0.15 s (timeline) · item4-9e6866b-trucks-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1703&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-item4-9e6866bc/ai_flow_live.html?bench=1703&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1703`); it opens the seed that parts earliest, and the dropdowns choose another.

