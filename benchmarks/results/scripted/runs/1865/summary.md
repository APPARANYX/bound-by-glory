# Benchmark run #1865 · 20 seeds from `scripted-seeds` (meeting), windows `contact+120`

- **OFF** flags: `none` · **ON** flags: `controllerDefault=0`
- claude/project-thread-m7x8vq @ 482ccb9 · [run](https://github.com/APPARANYX/bound-by-glory/actions/runs/46098257826) · build v29-dev

## Verdict

**MOVED: 20 of 20 pairs changed (median first part 0.15 s); 10 of 42 counters under p 0.05 (about 2.1 by chance), 3 under 0.0012; casualties +49.6% (p 0.0414)**

- Clears the Bonferroni line (p < 0.0012): movementResolver.changes 15841 to 9395 (-40.7%, p 0); recon.timeouts 45 to 77 (+71.1%, p 0); fire.total 6534 to 2854 (-56.3%, p 0.0004).
- Under 0.05 only: recon.noContact 49 to 22 (-55.1%, p 0.0042); loopAlerts.length 146 to 69 (-52.7%, p 0.0118); recon.reportsDelivered 137 to 55 (-59.9%, p 0.0213); vacantObjectiveStalls.length 13 to 25 (+92.3%, p 0.0391); casualties 129 to 193 (+49.6%, p 0.0414); retreatSamples 1044 to 1591 (+52.4%, p 0.0414); squadPerformance.meanControl 1900.3999999999996 to 1944.9999999999995 (+2.3%, p 0.0414).

## Paired comparison (off against on)

- **20** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x0.816 (gate 1.25)
- the 20 changed records first part at simulated second: min 0.15, p10 0.15, median 0.15, p90 0.15, max 0.15

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 129 | 193 | 3.2 | 20 | 15 | 5 | 0.0414 |
| `usKills` | 81 | 88 | 0.35 | 17 | 11 | 6 | 0.3323 |
| `geKills` | 48 | 105 | 2.85 | 17 | 11 | 6 | 0.3323 |
| `fire.total` | 6534 | 2854 | -184 | 20 | 2 | 18 | 0.0004 |
| `fire.hits` | 308 | 439 | 6.55 | 20 | 13 | 7 | 0.2632 |
| `retreatSamples` | 1044 | 1591 | 27.35 | 20 | 15 | 5 | 0.0414 |
| `movementResolver.changes` | 15841 | 9395 | -322.3 | 20 | 1 | 19 | 0 |
| `grenades.throws` | 0 | 1 | 0.05 | 1 | 1 | 0 | 1 |
| `grenades.bursts` | 0 | 1 | 0.05 | 1 | 1 | 0 | 1 |
| `grenades.wounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.casualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.suppressed` | 0 | 1 | 0.05 | 1 | 1 | 0 | 1 |
| `grenades.friendlyWounded` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 0 | 1 | 0.05 | 1 | 1 | 0 | 1 |
| `movementStalls.length` | 1 | 0 | -0.05 | 1 | 0 | 1 | 1 |
| `routeStalls.length` | 23 | 22 | -0.05 | 1 | 0 | 1 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 13 | 25 | 0.6 | 9 | 8 | 1 | 0.0391 |
| `loopAlerts.length` | 146 | 69 | -3.85 | 20 | 4 | 16 | 0.0118 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 31 | 13 | -0.9 | 15 | 4 | 11 | 0.1185 |
| `stallOutcomes.wakes` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `stallOutcomes.repeats` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `timeline.stalledOnsets` | 1 | 0 | -0.05 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamples` | 5 | 0 | -0.25 | 1 | 0 | 1 | 1 |
| `timeline.stalledOnsetsRepeated` | 1 | 0 | -0.05 | 1 | 0 | 1 | 1 |
| `timeline.stalledSamplesRepeated` | 5 | 0 | -0.25 | 1 | 0 | 1 | 1 |
| `recon.orders` | 247 | 223 | -1.2 | 16 | 7 | 9 | 0.8036 |
| `recon.contacts` | 31 | 16 | -0.75 | 15 | 4 | 11 | 0.1185 |
| `recon.noContact` | 49 | 22 | -1.35 | 16 | 2 | 14 | 0.0042 |
| `recon.timeouts` | 45 | 77 | 1.6 | 17 | 17 | 0 | 0 |
| `recon.cancelled` | 84 | 64 | -1 | 17 | 8 | 9 | 1 |
| `recon.reportsDelivered` | 137 | 55 | -4.1 | 16 | 3 | 13 | 0.0213 |
| `recon.retriggerBlocked` | 101 | 86 | -0.75 | 15 | 4 | 11 | 0.1185 |
| `squadPerformance.meanOverall` | 1733.2999999999997 | 1745.5 | 0.61 | 20 | 13 | 7 | 0.2632 |
| `squadPerformance.p10Overall` | 1548.5000000000002 | 1542.3999999999999 | -0.305 | 18 | 9 | 9 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 1470.1 | 1496 | 1.295 | 20 | 11 | 9 | 0.8238 |
| `squadPerformance.meanMovement` | 1859.0000000000002 | 1871.7999999999995 | 0.64 | 20 | 9 | 11 | 0.8238 |
| `squadPerformance.meanControl` | 1900.3999999999996 | 1944.9999999999995 | 2.23 | 20 | 15 | 5 | 0.0414 |
| `squadPerformance.meanCohesion` | 1931.6 | 1904.3999999999999 | -1.36 | 20 | 9 | 11 | 0.8238 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

scripted-seeds-0001 0.15 s (timeline) · scripted-seeds-0002 0.15 s (timeline) · scripted-seeds-0003 0.15 s (timeline) · scripted-seeds-0004 0.15 s (timeline) · scripted-seeds-0005 0.15 s (timeline) · scripted-seeds-0006 0.15 s (timeline) · scripted-seeds-0007 0.15 s (timeline) · scripted-seeds-0008 0.15 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1865&repo=APPARANYX%2Fbound-by-glory&view=brain3d)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1865`); it opens the seed that parts earliest, and the dropdowns choose another.

