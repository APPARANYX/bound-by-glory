# Benchmark run #1831 · 60 seeds from `pr797-micro-u-20261109` (ge-defend), windows `0+600`

- **OFF** flags: `strategicInterception=0&controllerReactions=0` · **ON** flags: `strategicInterception=0`
- work/pin/pr797-5d7cc87 @ 5d7cc87 · [run](https://github.com/APPARANYX/grasstex/actions/runs/42566584949) · build v29-dev

## Verdict

**WEAK: 60 of 60 pairs changed (median first part 238.05 s); 3 of 42 counters under p 0.05 (about 2.1 by chance); casualties +4.4% (p 0.7838)**

- Under 0.05 only: movementResolver.changes 310093 to 320486 (+3.4%, p 0.0015); usKills 864 to 947 (+9.6%, p 0.0163); recon.reportsDelivered 3464 to 2966 (-14.4%, p 0.0479).

## Paired comparison (off against on)

- **60** pairs (unpaired: off 0, on 0) · identical in every field: **0** · runtime errors off 0 / on 0 · wall time on/off x1.033 (gate 1.25)
- the 60 changed records first part at simulated second: min 113.1, p10 161.1, median 238.05, p90 327, max 358.05

| counter | off | on | mean diff per pair | pairs changed | on more | on fewer | sign p |
|---|---:|---:|---:|---:|---:|---:|---:|
| `casualties` | 2086 | 2178 | 1.5333 | 53 | 28 | 25 | 0.7838 |
| `usKills` | 864 | 947 | 1.3833 | 57 | 38 | 19 | 0.0163 |
| `geKills` | 1222 | 1231 | 0.15 | 53 | 25 | 28 | 0.7838 |
| `fire.total` | 70411 | 69163 | -20.8 | 59 | 24 | 35 | 0.1925 |
| `fire.hits` | 4794 | 4973 | 2.9833 | 59 | 35 | 24 | 0.1925 |
| `retreatSamples` | 123011 | 125445 | 40.5667 | 59 | 33 | 26 | 0.435 |
| `movementResolver.changes` | 310093 | 320486 | 173.2167 | 59 | 42 | 17 | 0.0015 |
| `grenades.throws` | 54 | 56 | 0.0333 | 21 | 13 | 8 | 0.3833 |
| `grenades.bursts` | 54 | 54 | 0 | 21 | 12 | 9 | 0.6636 |
| `grenades.wounded` | 23 | 21 | -0.0333 | 10 | 4 | 6 | 0.7539 |
| `grenades.casualties` | 9 | 8 | -0.0167 | 6 | 2 | 4 | 0.6875 |
| `grenades.suppressed` | 48 | 38 | -0.1667 | 14 | 5 | 9 | 0.424 |
| `grenades.friendlyWounded` | 1 | 0 | -0.0167 | 1 | 0 | 1 | 1 |
| `grenades.friendlyCasualties` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `grenades.aborted` | 9 | 8 | -0.0167 | 10 | 4 | 6 | 0.7539 |
| `movementStalls.length` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `routeStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `targetlessStalls.length` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `vacantObjectiveStalls.length` | 20 | 13 | -0.1167 | 17 | 7 | 10 | 0.6291 |
| `loopAlerts.length` | 1870 | 1747 | -2.05 | 55 | 23 | 32 | 0.2806 |
| `writerConflicts` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `regroups.entries` | 380 | 343 | -0.6167 | 45 | 18 | 27 | 0.2327 |
| `stallOutcomes.wakes` | 13 | 8 | -0.0833 | 12 | 4 | 8 | 0.3877 |
| `stallOutcomes.repeats` | 2 | 0 | -0.0333 | 2 | 0 | 2 | 0.5 |
| `timeline.stalledOnsets` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `timeline.stalledSamples` | 0 | 10 | 0.1667 | 1 | 1 | 0 | 1 |
| `timeline.stalledOnsetsRepeated` | 0 | 1 | 0.0167 | 1 | 1 | 0 | 1 |
| `timeline.stalledSamplesRepeated` | 0 | 10 | 0.1667 | 1 | 1 | 0 | 1 |
| `recon.orders` | 3816 | 3795 | -0.35 | 58 | 26 | 32 | 0.5118 |
| `recon.contacts` | 860 | 806 | -0.9 | 56 | 21 | 35 | 0.0814 |
| `recon.noContact` | 795 | 820 | 0.4167 | 50 | 26 | 24 | 0.8877 |
| `recon.timeouts` | 40 | 36 | -0.0667 | 23 | 9 | 14 | 0.4049 |
| `recon.cancelled` | 2052 | 2065 | 0.2167 | 54 | 22 | 32 | 0.2203 |
| `recon.reportsDelivered` | 3464 | 2966 | -8.3 | 58 | 21 | 37 | 0.0479 |
| `recon.retriggerBlocked` | 1071 | 1080 | 0.15 | 46 | 26 | 20 | 0.4614 |
| `squadPerformance.meanOverall` | 4833.500000000001 | 4837.500000000002 | 0.0667 | 58 | 31 | 27 | 0.694 |
| `squadPerformance.p10Overall` | 4470.600000000001 | 4469.500000000001 | -0.0183 | 30 | 15 | 15 | 1 |
| `squadPerformance.lowScoreSquads` | 0 | 0 | 0 | 0 | 0 | 0 | 1 |
| `squadPerformance.meanMission` | 3721.600000000001 | 3731.3999999999987 | 0.1633 | 58 | 33 | 25 | 0.3581 |
| `squadPerformance.meanMovement` | 5986.700000000003 | 5986.9000000000015 | 0.0033 | 37 | 22 | 15 | 0.324 |
| `squadPerformance.meanControl` | 5558.800000000001 | 5581.900000000001 | 0.385 | 54 | 31 | 23 | 0.3409 |
| `squadPerformance.meanCohesion` | 5441.599999999999 | 5433.700000000001 | -0.1317 | 57 | 25 | 32 | 0.427 |

With this many counters a p of 0.05 is expected by chance in about one of twenty: read the size and the direction across counters, not one p.

## The 8 seeds that part earliest (simulated seconds)

pr797-micro-u-20261109-0006 113.1 s (timeline) · pr797-micro-u-20261109-0003 140.1 s (timeline) · pr797-micro-u-20261109-0027 150 s (timeline) · pr797-micro-u-20261109-0050 154.05 s (timeline) · pr797-micro-u-20261109-0060 157.05 s (timeline) · pr797-micro-u-20261109-0023 161.1 s (timeline) · pr797-micro-u-20261109-0043 162 s (timeline) · pr797-micro-u-20261109-0010 171 s (timeline)

## Viewer

[Open both arms in the 3D map](https://test.ivandpopov.com/grasstex/ai_flow_live.html?bench=1831&view=brain3d) · [the same on this branch's viewer](https://test.ivandpopov.com/grasstex/preview/pin-pr797-5d7cc87/ai_flow_live.html?bench=1831&view=brain3d) (it has the change before it reaches main)

The viewer loads `off.json` and `on.json` from the `benchmark-results` branch (`?bench=1831`); it opens the seed that parts earliest, and the dropdowns choose another.

