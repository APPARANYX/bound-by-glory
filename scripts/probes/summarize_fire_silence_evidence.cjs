#!/usr/bin/env node
'use strict';
// Read downloaded causal raw.json artifacts only; never starts a simulation.
const fs = require('node:fs');
const assert = require('node:assert/strict');
const paths = process.argv.slice(2);
assert.ok(paths.length, 'Usage: node scripts/probes/summarize_fire_silence_evidence.cjs <raw.json> ...');
let total = 0,
  attempts = 0;
for (const path of paths) {
  const raw = JSON.parse(fs.readFileSync(path, 'utf8'));
  const rows = [],
    worked = [];
  for (const battle of raw.battles) {
    const report = battle.reports['causal-inaction'];
    assert.equal(report.classificationVersion, 3, 'Requires matching v3 instrumentation');
    for (const episode of report.episodes) {
      const evidence = episode.evidence,
        decisions = evidence.decisions;
      if (episode.code === 'unexplained-fire-silence' && decisions?.coverage.weaponAttemptTicks > 0) {
        rows.push({
          seed: battle.seed,
          actor: episode.actor,
          target: evidence.target,
          start: episode.start,
          end: episode.observedAt,
          attempts: decisions.coverage.weaponAttemptTicks,
          rounds: evidence.roundsFired
        });
        total++;
        attempts += decisions.coverage.weaponAttemptTicks;
      }
      if (
        battle.seed === 'causal-inaction-us-defend-0010' &&
        episode.actor === 'us:12' &&
        episode.start === 287.85
      )
        worked.push({
          seed: battle.seed,
          actor: episode.actor,
          start: episode.start,
          end: episode.observedAt,
          counts: decisions.counts,
          coverage: decisions.coverage,
          history: episode.history
        });
    }
  }
  console.log(JSON.stringify({ path, step: raw.step, seconds: raw.seconds, rows, worked }));
}
console.log(JSON.stringify({ episodes: total, weaponAttemptTicks: attempts }));
