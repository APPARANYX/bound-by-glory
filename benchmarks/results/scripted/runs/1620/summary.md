# Benchmark run #1620 · 60 seeds from `churn765` (meeting), windows `contact+120`

- **OFF** flags: `strategicInterception=0&tacticalController=new&orderChurnSameMen=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- claude/project-thread-dtjh5a @ b97909d · [run](https://github.com/APPARANYX/grasstex/actions/runs/42030920577) · build v29-dev

## Verdict

**MOVED: 58 of 60 pairs changed; 4 of 42 counters under p 0.05 (about 2.1 by chance), 3 under 0.0012; casualties +0.0% (p 1)**

- Clears the Bonferroni line (p < 0.0012): loopAlerts.length 768 to 576 (-25.0%, p 0); squadPerformance.meanOverall 5025.999999999999 to 5045.4000000000015 (+0.4%, p 0); squadPerformance.meanControl 5540.099999999999 to 5637.100000000001 (+1.8%, p 0).
- Under 0.05 only: squadPerformance.p10Overall 4597.099999999999 to 4606.799999999998 (+0.2%, p 0.0352).

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **2** · runtime errors off 0 / on 0 · wall time on/off x1.024 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 1045 | 1045 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 457 | 457 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 588 | 588 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 29637 | 29637 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 2321 | 2321 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 7355 | 7355 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 203480 | 203480 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 18 | 18 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 17 | 17 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 23 | 23 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 12 | 12 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 42 | 42 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 2 | 2 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 5 | 5 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 768 | 576 | -3.2 | 49 | 0 | 49 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 26 | 26 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1240 | 1240 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 61 | 61 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 703 | 703 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 1 | 1 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 466 | 466 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 343 | 343 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 1055 | 1055 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 5025.999999999999 | 5045.4000000000015 | 0.3233 | 49 | 46 | 3 | 0 |
| `squadPerformance.p10Overall` | 4597.099999999999 | 4606.799999999998 | 0.1617 | 15 | 12 | 3 | 0.0352 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4196.5 | 4196.5 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMovement` | 5924.700000000002 | 5924.700000000002 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 5540.099999999999 | 5637.100000000001 | 1.6167 | 49 | 46 | 3 | 0 |
| `squadPerformance.meanCohesion` | 5440.8 | 5440.8 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

churn765-0001 (identical) · churn765-0002 (identical) · churn765-0003 (identical) · churn765-0004 (identical) · churn765-0005 (identical) · churn765-0006 (identical) · churn765-0007 (identical) · churn765-0008 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1620&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1620`); it opens the seed that parts earliest, and the dropdowns choose another.

