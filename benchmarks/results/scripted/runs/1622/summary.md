# Benchmark run #1622 · 60 seeds from `churn765` (ge-defend), windows `contact+120`

- **OFF** flags: `strategicInterception=0&tacticalController=new&orderChurnSameMen=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- claude/project-thread-dtjh5a @ b97909d · [run](https://github.com/APPARANYX/grasstex/actions/runs/42030930913) · build v29-dev

## Verdict

**MOVED: 47 of 53 pairs changed; 4 of 42 counters under p 0.05 (about 2.1 by chance), 3 under 0.0012; casualties +0.0% (p 1)**

- Clears the Bonferroni line (p < 0.0012): loopAlerts.length 485 to 389 (-19.8%, p 0); squadPerformance.meanOverall 4561.999999999999 to 4570.9 (+0.2%, p 0); squadPerformance.meanControl 5015.800000000001 to 5059.500000000002 (+0.9%, p 0).
- Under 0.05 only: squadPerformance.p10Overall 4111 to 4120 (+0.2%, p 0.0078).

## Paired comparison (off against on)

- **53** pairs (unpaired: off 0, on 0) · identical in every field: **6** · runtime errors off 0 / on 0 · wall time on/off x1.009 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 845 | 845 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 334 | 334 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 511 | 511 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 23202 | 23202 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 1939 | 1939 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 5815 | 5815 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 105410 | 105410 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 11 | 11 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 9 | 9 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 12 | 12 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 34 | 34 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 4 | 4 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 485 | 389 | -1.8113 | 40 | 0 | 40 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 75 | 75 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1372 | 1372 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 242 | 242 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 389 | 389 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 19 | 19 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 670 | 670 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 807 | 807 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 489 | 489 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4561.999999999999 | 4570.9 | 0.1679 | 38 | 36 | 2 | 0 |
| `squadPerformance.p10Overall` | 4111 | 4120 | 0.1698 | 8 | 8 | 0 | 0.0078 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4081.5000000000005 | 4081.100000000001 | -0.0075 | 1 | 0 | 1 | 1 |
| `squadPerformance.meanMovement` | 5275.599999999999 | 5275.599999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5015.800000000001 | 5059.500000000002 | 0.8245 | 38 | 36 | 2 | 0 |
| `squadPerformance.meanCohesion` | 4610.000000000001 | 4610.000000000001 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

churn765-0001 (identical) · churn765-0003 (identical) · churn765-0004 (identical) · churn765-0005 (identical) · churn765-0006 (identical) · churn765-0007 (identical) · churn765-0008 (identical) · churn765-0009 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1622&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1622`); it opens the seed that parts earliest, and the dropdowns choose another.

