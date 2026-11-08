# Benchmark run #1759 · 60 seeds from `pr787-m2-20261108` (ge-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&tacticalController=legacy` · **ON** flags: `strategicInterception=0`
- work/pin/pr787-m2-83fb5a0 @ 83fb5a0 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42434309637) · build v29-dev

## Verdict

**MOVED: 60 of 60 pairs changed (median first part 0.15 s); 15 of 42 counters under p 0.05 (about 2.1 by chance), 14 under 0.0012; casualties -2.6% (p 0.6835)**

- Clears the Bonferroni line (p < 0.0012): fire.total 41583 to 75219 (+80.9%, p 0); movementResolver.changes 201621 to 288355 (+43.0%, p 0); vacantObjectiveStalls.length 86 to 17 (-80.2%, p 0); loopAlerts.length 1015 to 1535 (+51.2%, p 0); recon.orders 2065 to 3552 (+72.0%, p 0); recon.contacts 339 to 743 (+119.2%, p 0); recon.cancelled 612 to 1750 (+185.9%, p 0); recon.reportsDelivered 1419 to 3107 (+119.0%, p 0); recon.retriggerBlocked 943 to 1142 (+21.1%, p 0); squadPerformance.meanOverall 4916.2 to 4843.700000000001 (-1.5%, p 0); squadPerformance.meanMission 4044.0999999999985 to 3769.7 (-6.8%, p 0); squadPerformance.meanCohesion 5355.000000000002 to 5549.499999999999 (+3.6%, p 0); squadPerformance.meanControl 5682.5 to 5612.4 (-1.2%, p 0.0001); retreatSamples 120505 to 146249 (+21.4%, p 0.0011).
- Under 0.05 only: squadPerformance.p10Overall 4480.400000000001 to 4454.200000000001 (-0.6%, p 0.0241).
- Wall time on/off x1.456 is over the 1.25 gate.

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.456 (gate 1.25)
- the 60 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2960 | 2883 | -1.2833 | 54 | 25 | 29 | 0.6835 |
| `usKills` | 1246 | 1179 | -1.1167 | 56 | 27 | 29 | 0.8939 |
| `geKills` | 1714 | 1704 | -0.1667 | 56 | 22 | 34 | 0.1409 |
| `fire.total` | 41583 | 75219 | 560.6 | 60 | 57 | 3 | 0 |
| `fire.hits` | 6256 | 6624 | 6.1333 | 58 | 33 | 25 | 0.3581 |
| `retreatSamples` | 120505 | 146249 | 429.0667 | 60 | 43 | 17 | 0.0011 |
| `movementResolver.changes` | 201621 | 288355 | 1445.5667 | 60 | 60 | 0 | 0 |
| `grenades.throws` | 99 | 105 | 0.1 | 32 | 22 | 10 | 0.0501 |
| `grenades.bursts` | 99 | 105 | 0.1 | 32 | 22 | 10 | 0.0501 |
| `grenades.wounded` | 53 | 93 | 0.6667 | 26 | 18 | 8 | 0.0755 |
| `grenades.casualties` | 28 | 29 | 0.0167 | 18 | 9 | 9 | 1 |
| `grenades.suppressed` | 186 | 264 | 1.3 | 26 | 18 | 8 | 0.0755 |
| `grenades.friendlyWounded` | 4 | 7 | 0.05 | 6 | 3 | 3 | 1 |
| `grenades.friendlyCasualties` | 3 | 2 | -0.0167 | 5 | 2 | 3 | 1 |
| `grenades.aborted` | 10 | 20 | 0.1667 | 14 | 8 | 6 | 0.7905 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 86 | 17 | -1.15 | 38 | 2 | 36 | 0 |
| `loopAlerts.length` | 1015 | 1535 | 8.6667 | 59 | 47 | 12 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 261 | 259 | -0.0333 | 53 | 25 | 28 | 0.7838 |
| `stallOutcomes.wakes` | 7 | 2 | -0.0833 | 5 | 0 | 5 | 0.0625 |
| `stallOutcomes.repeats` | 0 | 2 | 0.0333 | 2 | 2 | 0 | 0.5 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 2065 | 3552 | 24.7833 | 60 | 55 | 5 | 0 |
| `recon.contacts` | 339 | 743 | 6.7333 | 57 | 51 | 6 | 0 |
| `recon.noContact` | 985 | 919 | -1.1 | 51 | 21 | 30 | 0.2624 |
| `recon.timeouts` | 69 | 62 | -0.1167 | 26 | 9 | 17 | 0.1686 |
| `recon.cancelled` | 612 | 1750 | 18.9667 | 59 | 58 | 1 | 0 |
| `recon.reportsDelivered` | 1419 | 3107 | 28.1333 | 60 | 48 | 12 | 0 |
| `recon.retriggerBlocked` | 943 | 1142 | 3.3167 | 56 | 47 | 9 | 0 |
| `squadPerformance.meanOverall` | 4916.2 | 4843.700000000001 | -1.2083 | 60 | 12 | 48 | 0 |
| `squadPerformance.p10Overall` | 4480.400000000001 | 4454.200000000001 | -0.4367 | 29 | 8 | 21 | 0.0241 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4044.0999999999985 | 3769.7 | -4.5733 | 60 | 12 | 48 | 0 |
| `squadPerformance.meanMovement` | 5989.9000000000015 | 5990 | 0.0017 | 29 | 15 | 14 | 1 |
| `squadPerformance.meanControl` | 5682.5 | 5612.4 | -1.1683 | 60 | 15 | 45 | 0.0001 |
| `squadPerformance.meanCohesion` | 5355.000000000002 | 5549.499999999999 | 3.2417 | 59 | 49 | 10 | 0 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr787-m2-20261108-0001 0.15 s (timeline) · pr787-m2-20261108-0002 0.15 s (timeline) · pr787-m2-20261108-0003 0.15 s (timeline) · pr787-m2-20261108-0004 0.15 s (timeline) · pr787-m2-20261108-0005 0.15 s (timeline) · pr787-m2-20261108-0006 0.15 s (timeline) · pr787-m2-20261108-0007 0.15 s (timeline) · pr787-m2-20261108-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1759&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr787-m2-83fb5a0/ai_flow_live.html?bench=1759&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1759`); it opens the seed that parts earliest, and the dropdowns choose another.

