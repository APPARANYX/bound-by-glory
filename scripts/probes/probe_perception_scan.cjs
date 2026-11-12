#!/usr/bin/env node
/* Probe: the early range reject in Perception's target scan (`findTarget`, `?scanReject=0` is the old scan).

   For the shipping squad-command stack and for AI V2, on a compact field and on a wide front (squads
   spread along a line, so most enemies are far out of spotting range), runs the same battle with the
   reject on and off and reports wall time (median of three) and whether the two runs end in exactly the
   same state: every man's position, wounds and death, and every round fired. Identical state is the
   proof the change is inert; the time is what it saves. Node harness only: no commander for the
   legacy arm, the fixture's capture rule, no browser.

   Run: node scripts/probes/probe_perception_scan.cjs [seconds=120] */
'use strict';
const path = require('path');
const F = require(path.join(__dirname, '..', '..', 'tools', 'ai-sim-harness', 'ai-v2-fixture.js'));
const seconds = +process.argv[2] || 120;
function once(ai, n, gap, off) {
  const log = console.log;
  console.log = () => {};
  const squads = [];
  for (let i = 0; i < n; i++) {
    squads.push({
      id: 'us-' + i,
      faction: 'us',
      x: (i - (n - 1) / 2) * gap,
      z: -170,
      objective: { x: 0, z: 0 }
    });
    squads.push({
      id: 'ge-' + i,
      faction: 'ge',
      x: (i - (n - 1) / 2) * gap,
      z: 170,
      objective: { x: 0, z: 0 }
    });
  }
  const flag = off ? 'scanReject=0' : '',
    w = F.build({
      ai,
      search: ai === 'v2' ? (flag ? '&' + flag : '') : flag ? '?' + flag : '',
      seed: 9001,
      half: Math.max(260, (n * gap) / 2 + 60),
      cover: 120 + n * 60,
      squads,
      objectives: [{ id: 'obj-a', x: 0, z: 0, radius: 30, owner: null }]
    });
  const t0 = process.hrtime.bigint();
  F.run(w, seconds);
  const ms = Number(process.hrtime.bigint() - t0) / 1e6;
  console.log = log;
  const rows = [];
  ['us', 'ge'].forEach(f =>
    w.battle._roster[f].forEach(s =>
      rows.push(
        [
          s.id,
          s.dead ? 1 : 0,
          s.hp.toFixed(4),
          s.root.position.x.toFixed(4),
          s.root.position.z.toFixed(4)
        ].join(',')
      )
    )
  );
  return {
    ms: ms / seconds,
    state: rows.join(';') + '|' + w.battle.events.fired + '|' + w.battle.events.kills
  };
}
const median = (ai, n, gap, off) => [0, 1, 2].map(() => once(ai, n, gap, off)).sort((a, b) => a.ms - b.ms)[1];
once('v2', 2, 40, false);
once('legacy', 2, 40, false);
console.log(seconds + ' s simulated, median of 3 (ms per simulated second)');
console.log('  field                      AI       old scan   early reject   saved   identical end state');
[
  ['compact, 240 men (40 m apart)', 12, 40],
  ['wide front, 240 men (160 m apart)', 12, 160],
  ['wide front, 480 men (160 m apart)', 24, 160]
].forEach(([label, n, gap]) =>
  ['legacy', 'v2'].forEach(ai => {
    const off = median(ai, n, gap, true),
      on = median(ai, n, gap, false);
    console.log(
      '  ' +
        label.padEnd(34) +
        ai.padEnd(8) +
        off.ms.toFixed(2).padStart(9) +
        on.ms.toFixed(2).padStart(15) +
        ((100 * (off.ms - on.ms)) / off.ms).toFixed(0).padStart(7) +
        '%   ' +
        (off.state === on.state ? 'yes' : 'NO')
    );
  })
);
