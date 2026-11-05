# Benchmark run #1621 · 60 seeds from `churn765` (us-defend), windows `contact+120`

- **OFF** flags: `strategicInterception=0&tacticalController=new&orderChurnSameMen=0` · **ON** flags: `strategicInterception=0&tacticalController=new`
- claude/project-thread-dtjh5a @ b97909d · [run](https://github.com/APPARANYX/grasstex/actions/runs/42030925781) · build v29-dev

## Verdict

**MOVED: 47 of 53 pairs changed; 4 of 42 counters under p 0.05 (about 2.1 by chance), 3 under 0.0012; casualties +0.0% (p 1)**

- Clears the Bonferroni line (p < 0.0012): loopAlerts.length 508 to 389 (-23.4%, p 0); squadPerformance.meanOverall 4574.6 to 4585.399999999999 (+0.2%, p 0); squadPerformance.meanControl 4997.999999999999 to 5053.999999999999 (+1.1%, p 0).
- Under 0.05 only: squadPerformance.p10Overall 4096.8 to 4103.8 (+0.2%, p 0.0117).

## Paired comparison (off against on)

- **53** pairs (unpaired: off 0, on 0) · identical in every field: **6** · runtime errors off 0 / on 0 · wall time on/off x1.008 (gate 1.25)
- no record has a timeline or stress series that parts

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 759 | 759 | 0 | 0 | 0 | 0 | 1 |
| `usKills` | 396 | 396 | 0 | 0 | 0 | 0 | 1 |
| `geKills` | 363 | 363 | 0 | 0 | 0 | 0 | 1 |
| `fire.total` | 23673 | 23673 | 0 | 0 | 0 | 0 | 1 |
| `fire.hits` | 1731 | 1731 | 0 | 0 | 0 | 0 | 1 |
| `retreatSamples` | 5153 | 5153 | 0 | 0 | 0 | 0 | 1 |
| `movementResolver.changes` | 108373 | 108373 | 0 | 0 | 0 | 0 | 1 |
| `grenades.throws` | 12 | 12 | 0 | 0 | 0 | 0 | 1 |
| `grenades.bursts` | 9 | 9 | 0 | 0 | 0 | 0 | 1 |
| `grenades.wounded` | 11 | 11 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 3 | 3 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 18 | 18 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `movementStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `loopAlerts.length` | 508 | 389 | -2.2453 | 42 | 0 | 42 | 0 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 62 | 62 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `recon.orders` | 1229 | 1229 | 0 | 0 | 0 | 0 | 1 |
| `recon.contacts` | 193 | 193 | 0 | 0 | 0 | 0 | 1 |
| `recon.noContact` | 459 | 459 | 0 | 0 | 0 | 0 | 1 |
| `recon.timeouts` | 19 | 19 | 0 | 0 | 0 | 0 | 1 |
| `recon.cancelled` | 506 | 506 | 0 | 0 | 0 | 0 | 1 |
| `recon.reportsDelivered` | 873 | 873 | 0 | 0 | 0 | 0 | 1 |
| `recon.retriggerBlocked` | 466 | 466 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanOverall` | 4574.6 | 4585.399999999999 | 0.2038 | 42 | 39 | 3 | 0 |
| `squadPerformance.p10Overall` | 4096.8 | 4103.8 | 0.1321 | 11 | 10 | 1 | 0.0117 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 4077.2 | 4076 | -0.0226 | 2 | 0 | 2 | 0.5 |
| `squadPerformance.meanMovement` | 5273.599999999999 | 5273.599999999999 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanControl` | 4997.999999999999 | 5053.999999999999 | 1.0566 | 42 | 40 | 2 | 0 |
| `squadPerformance.meanCohesion` | 4667.2 | 4667.2 | 0 | 0 | 0 | 0 | 1 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

churn765-0001 (identical) · churn765-0003 (identical) · churn765-0004 (identical) · churn765-0005 (identical) · churn765-0006 (identical) · churn765-0007 (identical) · churn765-0008 (identical) · churn765-0009 (identical)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1621&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1621`); it opens the seed that parts earliest, and the dropdowns choose another.

