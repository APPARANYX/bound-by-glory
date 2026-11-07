# Benchmark run #1717 · 60 seeds from `pr782-defend-majority` (ge-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=new&defendMajorityWin=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- work/pin/pr782-8ebb4df @ 8ebb4df · [run](https://github.com/APPARANYX/grasstex/actions/runs/42347146112) · build v29-dev

## Verdict

**WEAK: 14 of 60 pairs changed (median first part 549.9 s); 13 of 42 counters under p 0.05 (about 2.1 by chance); casualties +9.6% (p 0.0313)**

- Under 0.05 only: casualties 2139 to 2345 (+9.6%, p 0.0313); usKills 864 to 947 (+9.6%, p 0.0313); fire.total 60042 to 66428 (+10.6%, p 0.0313); fire.hits 4780 to 5342 (+11.8%, p 0.0313); retreatSamples 139202 to 152956 (+9.9%, p 0.0313); movementResolver.changes 208664 to 225867 (+8.2%, p 0.0313); loopAlerts.length 1233 to 1346 (+9.2%, p 0.0313); recon.orders 2683 to 2871 (+7.0%, p 0.0313); recon.contacts 564 to 611 (+8.3%, p 0.0313); recon.noContact 670 to 709 (+5.8%, p 0.0313); recon.cancelled 1312 to 1419 (+8.2%, p 0.0313); recon.retriggerBlocked 833 to 889 (+6.7%, p 0.0313); squadPerformance.meanMovement 5992.999999999998 to 5992.099999999998 (-0.0%, p 0.0313).

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **46** · runtime errors off 0 / on 0 · wall time on/off x0.999 (gate 1.25)
- the 1 changed records first part at simulated second: min 549.9, p10 549.9, median 549.9, p90 549.9, max 549.9

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2139 | 2345 | 3.4333 | 6 | 6 | 0 | 0.0313 |
| `usKills` | 864 | 947 | 1.3833 | 6 | 6 | 0 | 0.0313 |
| `geKills` | 1275 | 1398 | 2.05 | 5 | 5 | 0 | 0.0625 |
| `fire.total` | 60042 | 66428 | 106.4333 | 6 | 6 | 0 | 0.0313 |
| `fire.hits` | 4780 | 5342 | 9.3667 | 6 | 6 | 0 | 0.0313 |
| `retreatSamples` | 139202 | 152956 | 229.2333 | 6 | 6 | 0 | 0.0313 |
| `movementResolver.changes` | 208664 | 225867 | 286.7167 | 6 | 6 | 0 | 0.0313 |
| `grenades.throws` | 46 | 51 | 0.0833 | 2 | 2 | 0 | 0.5 |
| `grenades.bursts` | 46 | 51 | 0.0833 | 2 | 2 | 0 | 0.5 |
| `grenades.wounded` | 37 | 38 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.casualties` | 9 | 10 | 0.0167 | 1 | 1 | 0 | 1 |
| `grenades.suppressed` | 78 | 80 | 0.0333 | 2 | 2 | 0 | 0.5 |
| `grenades.friendlyWounded` | 6 | 6 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 19 | 20 | 0.0167 | 1 | 1 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 12 | 12 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 1233 | 1346 | 1.8833 | 6 | 6 | 0 | 0.0313 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 208 | 219 | 0.1833 | 4 | 4 | 0 | 0.125 |
| `stallOutcomes.wakes` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2683 | 2871 | 3.1333 | 6 | 6 | 0 | 0.0313 |
| `recon.contacts` | 564 | 611 | 0.7833 | 6 | 6 | 0 | 0.0313 |
| `recon.noContact` | 670 | 709 | 0.65 | 6 | 6 | 0 | 0.0313 |
| `recon.timeouts` | 74 | 77 | 0.05 | 2 | 2 | 0 | 0.5 |
| `recon.cancelled` | 1312 | 1419 | 1.7833 | 6 | 6 | 0 | 0.0313 |
| `recon.reportsDelivered` | 2344 | 2536 | 3.2 | 5 | 5 | 0 | 0.0625 |
| `recon.retriggerBlocked` | 833 | 889 | 0.9333 | 6 | 6 | 0 | 0.0313 |
| `squadPerformance.meanOverall` | 4879.500000000001 | 4793.100000000001 | -1.44 | 6 | 1 | 5 | 0.2188 |
| `squadPerformance.p10Overall` | 4553.3 | 4456.2 | -1.6183 | 5 | 0 | 5 | 0.0625 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3790.2000000000003 | 3625.6000000000013 | -2.7433 | 6 | 1 | 5 | 0.2188 |
| `squadPerformance.meanMovement` | 5992.999999999998 | 5992.099999999998 | -0.015 | 6 | 0 | 6 | 0.0313 |
| `squadPerformance.meanControl` | 5659.3 | 5632.8 | -0.4417 | 5 | 0 | 5 | 0.0625 |
| `squadPerformance.meanCohesion` | 5568.999999999998 | 5555.699999999998 | -0.2217 | 6 | 2 | 4 | 0.6875 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 1 seed that part earliest (simulated seconds)

pr782-defend-majority-0029 549.9 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1717&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr782-8ebb4df/ai_flow_live.html?bench=1717&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1717`); it opens the seed that parts earliest, and the dropdowns choose another.

