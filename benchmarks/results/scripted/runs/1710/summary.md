# Benchmark run #1710 · 60 seeds from `pr781-single-writer` (ge-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- main @ 9e6866b · [run](https://github.com/APPARANYX/grasstex/actions/runs/42341715624) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 20 of 42 counters under p 0.05 (about 2.1 by chance), 15 under 0.0012; casualties -6.8% (p 0.0581)**

- Clears the Bonferroni line (p < 0.0012): fire.total 37371 to 63666 (+70.4%, p 0); movementResolver.changes 154856 to 216980 (+40.1%, p 0); loopAlerts.length 763 to 1372 (+79.8%, p 0); recon.orders 1624 to 2987 (+83.9%, p 0); recon.contacts 285 to 669 (+134.7%, p 0); recon.cancelled 548 to 1542 (+181.4%, p 0); recon.reportsDelivered 1177 to 2890 (+145.5%, p 0); recon.retriggerBlocked 689 to 836 (+21.3%, p 0); squadPerformance.meanOverall 4914.2 to 4831.4 (-1.7%, p 0); squadPerformance.meanMission 3984.0999999999985 to 3721.1000000000013 (-6.6%, p 0); retreatSamples 109716 to 137362 (+25.2%, p 0.0001); squadPerformance.meanCohesion 5418.9 to 5558.999999999998 (+2.6%, p 0.0001); squadPerformance.meanControl 5694.7 to 5621 (-1.3%, p 0.0003); grenades.throws 47 to 89 (+89.4%, p 0.0005); grenades.bursts 47 to 89 (+89.4%, p 0.0005).
- Under 0.05 only: vacantObjectiveStalls.length 63 to 20 (-68.3%, p 0.0021); stallOutcomes.wakes 11 to 1 (-90.9%, p 0.0063); recon.noContact 702 to 658 (-6.3%, p 0.0328); regroups.entries 181 to 248 (+37.0%, p 0.04); grenades.suppressed 84 to 145 (+72.6%, p 0.0414).
- Wall time on/off x1.539 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.539 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2502 | 2331 | -2.85 | 55 | 20 | 35 | 0.0581 |
| `usKills` | 1009 | 1005 | -0.0667 | 54 | 28 | 26 | 0.8919 |
| `geKills` | 1493 | 1326 | -2.7833 | 55 | 20 | 35 | 0.0581 |
| `fire.total` | 37371 | 63666 | 438.25 | 58 | 51 | 7 | 0 |
| `fire.hits` | 5398 | 5221 | -2.95 | 58 | 24 | 34 | 0.237 |
| `retreatSamples` | 109716 | 137362 | 460.7667 | 58 | 44 | 14 | 0.0001 |
| `movementResolver.changes` | 154856 | 216980 | 1035.4 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 47 | 89 | 0.7 | 29 | 24 | 5 | 0.0005 |
| `grenades.bursts` | 47 | 89 | 0.7 | 29 | 24 | 5 | 0.0005 |
| `grenades.wounded` | 19 | 52 | 0.55 | 21 | 15 | 6 | 0.0784 |
| `grenades.casualties` | 12 | 21 | 0.15 | 14 | 10 | 4 | 0.1796 |
| `grenades.suppressed` | 84 | 145 | 1.0167 | 20 | 15 | 5 | 0.0414 |
| `grenades.friendlyWounded` | 0 | 4 | 0.0667 | 3 | 3 | 0 | 0.25 |
| `grenades.friendlyCasualties` | 0 | 2 | 0.0333 | 1 | 1 | 0 | 1 |
| `grenades.aborted` | 8 | 11 | 0.05 | 11 | 7 | 4 | 0.5488 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 63 | 20 | -0.7167 | 32 | 7 | 25 | 0.0021 |
| `loopAlerts.length` | 763 | 1372 | 10.15 | 57 | 47 | 10 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 181 | 248 | 1.1167 | 47 | 31 | 16 | 0.04 |
| `stallOutcomes.wakes` | 11 | 1 | -0.1667 | 12 | 1 | 11 | 0.0063 |
| `stallOutcomes.repeats` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1624 | 2987 | 22.7167 | 60 | 60 | 0 | 0 |
| `recon.contacts` | 285 | 669 | 6.4 | 56 | 50 | 6 | 0 |
| `recon.noContact` | 702 | 658 | -0.7333 | 50 | 17 | 33 | 0.0328 |
| `recon.timeouts` | 44 | 46 | 0.0333 | 25 | 13 | 12 | 1 |
| `recon.cancelled` | 548 | 1542 | 16.5667 | 60 | 60 | 0 | 0 |
| `recon.reportsDelivered` | 1177 | 2890 | 28.55 | 57 | 51 | 6 | 0 |
| `recon.retriggerBlocked` | 689 | 836 | 2.45 | 51 | 42 | 9 | 0 |
| `squadPerformance.meanOverall` | 4914.2 | 4831.4 | -1.38 | 57 | 11 | 46 | 0 |
| `squadPerformance.p10Overall` | 4528.700000000001 | 4490.799999999999 | -0.6317 | 33 | 11 | 22 | 0.0801 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3984.0999999999985 | 3721.1000000000013 | -4.3833 | 58 | 9 | 49 | 0 |
| `squadPerformance.meanMovement` | 5991.299999999999 | 5991.199999999998 | -0.0017 | 29 | 15 | 14 | 1 |
| `squadPerformance.meanControl` | 5694.7 | 5621 | -1.2283 | 58 | 15 | 43 | 0.0003 |
| `squadPerformance.meanCohesion` | 5418.9 | 5558.999999999998 | 2.335 | 60 | 45 | 15 | 0.0001 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr781-single-writer-0001 0.15 s (timeline) · pr781-single-writer-0002 0.15 s (timeline) · pr781-single-writer-0003 0.15 s (timeline) · pr781-single-writer-0004 0.15 s (timeline) · pr781-single-writer-0005 0.15 s (timeline) · pr781-single-writer-0006 0.15 s (timeline) · pr781-single-writer-0007 0.15 s (timeline) · pr781-single-writer-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1710&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1710`); it opens the seed that parts earliest, and the dropdowns choose another.

