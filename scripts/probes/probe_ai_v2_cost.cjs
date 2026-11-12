#!/usr/bin/env node
/* Probe: what each AI V2 mechanism costs and saves, in the Node harness.

   Arms, on the same field, squads and seed (one process, median of three runs each):
     legacy        the shipping squad-command stack (no commander and no 13* controller modules: the
                   harness has neither, so the page's legacy cost is higher than this number)
     legacy @2s    the same stack with its squad layer run for each squad every 13th tick (about 2 s)
                   instead of every tick: an upper bound on what an event-woken squad layer could save
                   inside V1. It is a different battle and NOT a behaviour-preserving change.
     v2            AI V2 as shipped behind ?ai=v2
     v2 -think     V2 with event-driven deliberation switched off (every man deliberates every tick)
     v2 -resolve   V2 with resolver gating switched off (the Movement Resolver runs for every man every tick)
     v2 -cover     V2 with the cover cache switched off (every deliberation searches)
   The ablation arms isolate one mechanism each (`?v2Ablate=`, probe only). "same battle" says whether
   the arm ends in exactly the state of the full V2 arm: if it does, the mechanism changes cost and
   nothing else. legacy and v2 are different battles (different decisions), so that pair measures what a
   tick costs, not an A/B of outcomes. Browser cost and full-battle workloads are Muse's to measure.

   Run: node scripts/probes/probe_ai_v2_cost.cjs [squadsPerSide=4,12] [seconds=120] */
'use strict';
const path = require('path');
const F = require(path.join(__dirname, '..', '..', 'tools', 'ai-sim-harness', 'ai-v2-fixture.js'));
const sizes = (process.argv[2] || '4,12').split(',').map(Number),
  seconds = +process.argv[3] || 120;
function once(ai, n, ablate, squadEvery) {
  const log = console.log;
  console.log = () => {};
  const squads = [];
  for (let i = 0; i < n; i++) {
    squads.push({
      id: 'us-' + i,
      faction: 'us',
      x: (i - (n - 1) / 2) * 40,
      z: -170,
      objective: { x: 0, z: 0 }
    });
    squads.push({
      id: 'ge-' + i,
      faction: 'ge',
      x: (i - (n - 1) / 2) * 40,
      z: 170,
      objective: { x: 0, z: 0 }
    });
  }
  const w = F.build({
    ai,
    search: ablate ? '&v2Ablate=' + ablate : '',
    seed: 9001,
    half: 60 + n * 30,
    cover: 120 + n * 60,
    squads,
    objectives: [{ id: 'obj-a', x: 0, z: 0, radius: 30, owner: null }]
  });
  if (squadEvery) w.squadEvery = squadEvery;
  const OF = w.root.BattleObstacleField,
    R = w.root.BattleMovementResolver,
    count = { sight: 0, cover: 0, resolve: 0 },
    sight = OF.sightBlocked,
    cover = OF.coverAt,
    resolve = R.resolve;
  OF.sightBlocked = function () {
    count.sight++;
    return sight.apply(this, arguments);
  };
  OF.coverAt = function () {
    count.cover++;
    return cover.apply(this, arguments);
  };
  R.resolve = function () {
    count.resolve++;
    return resolve.apply(this, arguments);
  };
  /* Where the time goes: wall time inside each decision entry point and the movement integrator;
     the remainder is perception, the weapon hooks and (legacy) the squad-command stack. */
  const spent = {},
    undo = [], // the harness object is shared between runs: every timer is removed after its run
    timed = (obj, name, key) => {
      const fn = obj && obj[name];
      if (typeof fn !== 'function') return;
      undo.push(() => (obj[name] = fn));
      obj[name] = function () {
        const a = process.hrtime.bigint();
        try {
          return fn.apply(this, arguments);
        } finally {
          spent[key] = (spent[key] || 0) + Number(process.hrtime.bigint() - a) / 1e6;
        }
      };
    };
  if (!ablate) {
    timed(w.S, 'updateSquad', 'squad layer');
    timed(w.S, 'updateSoldier', 'soldier tick');
    timed(
      ai === 'legacy' ? w.root.BattleEngagement : w.root.BattleAIV2,
      ai === 'legacy' ? 'updateSoldier' : 'soldierTick',
      'soldier decision'
    );
    timed(w.root.BattleAIV2, 'strategicTick', 'commander');
    timed(R, 'resolve', 'resolver');
    timed(F.H, 'stepMovement', 'movement step');
  }
  const t0 = process.hrtime.bigint();
  F.run(w, seconds);
  const ms = Number(process.hrtime.bigint() - t0) / 1e6;
  undo.forEach(f => f());
  console.log = log;
  const st = w.battle._aiV2 ? w.battle._aiV2.stats : null,
    rows = [];
  ['us', 'ge'].forEach(f =>
    w.battle._roster[f].forEach(s =>
      rows.push(
        [
          s.id,
          s.dead ? 1 : 0,
          s.hp.toFixed(3),
          s.root.position.x.toFixed(3),
          s.root.position.z.toFixed(3)
        ].join(',')
      )
    )
  );
  return {
    spent,
    total: ms,
    ms: ms / seconds,
    count,
    fired: w.battle.events.fired,
    alive: w.battle.factions.us.alive + w.battle.factions.ge.alive,
    st,
    state: rows.join(';')
  };
}
function arm(label, ai, n, ablate, squadEvery) {
  const runs = [0, 1, 2].map(() => once(ai, n, ablate, squadEvery)).sort((a, b) => a.ms - b.ms),
    r = runs[1];
  r.label = label;
  return r;
}
sizes.forEach(n => {
  once('v2', Math.min(n, 2)); // warm both code paths
  once('legacy', Math.min(n, 2));
  const arms = [
      arm('legacy', 'legacy', n),
      arm('v2', 'v2', n),
      arm('v2 -think', 'v2', n, 'think'),
      arm('v2 -resolve', 'v2', n, 'resolve'),
      arm('v2 -cover', 'v2', n, 'cover'),
      arm('legacy @2s', 'legacy', n, null, 13)
    ],
    full = arms[1];
  console.log('\n' + n + ' squads a side (' + n * 20 + ' men), ' + seconds + ' s simulated, median of 3');
  console.log(
    '  arm            ms/sim-s  sight tests  cover lookups  resolver calls  rounds  alive  same battle as v2'
  );
  arms.forEach(r =>
    console.log(
      '  ' +
        r.label.padEnd(12) +
        String(r.ms.toFixed(2)).padStart(10) +
        String(r.count.sight).padStart(13) +
        String(r.count.cover).padStart(15) +
        String(r.count.resolve).padStart(16) +
        String(r.fired).padStart(8) +
        String(r.alive).padStart(7) +
        '  ' +
        (r.label.indexOf('legacy') === 0 ? 'n/a (different AI)' : r.state === full.state ? 'yes' : 'no')
    )
  );
  arms.slice(0, 2).forEach(r => {
    /* The soldier tick is perception, then the decision, then (legacy) the resolver; V2's decision calls the resolver itself. */
    const t = r.spent,
      decision = t['soldier decision'] - (r.label === 'v2' ? t.resolver : 0),
      perception = t['soldier tick'] - t['soldier decision'] - (r.label === 'legacy' ? t.resolver : 0),
      parts = {
        'squad layer': t['squad layer'],
        'soldier decision': decision,
        'movement resolver': t.resolver,
        'perception + weapon hooks': perception,
        'movement step': t['movement step'],
        commander: t.commander || 0
      };
    console.log(
      '  ' +
        r.label.padEnd(7) +
        'ms/sim-s by part: ' +
        Object.keys(parts)
          .map(k => k + ' ' + (parts[k] / seconds).toFixed(2))
          .join(', ')
    );
  });
  const s = full.st;
  console.log(
    '  v2 work: deliberations ' +
      s.deliberations +
      ' in ' +
      s.soldierTicks +
      ' soldier ticks, squad thinks ' +
      s.squadThinks +
      ' in ' +
      s.squadTicks +
      ', commander plans ' +
      s.sidePlans +
      ' in ' +
      s.sideTicks +
      ', cover searches ' +
      s.coverSearches +
      ' (cache hits ' +
      s.coverCacheHits +
      '), messages ' +
      s.sent +
      ' (reports ' +
      s.reports +
      ', sitreps ' +
      s.sitreps +
      ')'
  );
});
