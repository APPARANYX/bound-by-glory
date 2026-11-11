'use strict';
/* Shared world builder for the AI V2 checks and probe (ai-v2-check.js, scripts/probes/probe_ai_v2_cost.cjs).
   The shipping perception, weapons, obstacle field, movement integrator and Movement Resolver run as they
   are; the fixture supplies only a flat field with cover, a capture rule for the objectives (the page's
   capture zones are a registered objective module this harness does not load) and the run loop, which
   calls the three V2 layers in the page's order. `{ai:'legacy'}` builds the same field for the shipping
   squad-command stack, with no commander (the harness has none), for the cost comparison only. */
const H = require('./harness.js');
const { loadModule } = require('./module-loader');

const V2_FILES = [
  'battle/modules/11v-ai-v2-kernel.js',
  'battle/modules/11w-ai-v2-individual.js',
  'battle/modules/11x-ai-v2-tactical.js',
  'battle/modules/11y-ai-v2-strategic.js'
];

function load(root, rel) {
  return loadModule(root, rel, {
    BABYLON: root.BABYLON,
    ...(root.location ? { location: root.location } : {})
  });
}
function boot(search) {
  const root = H.bootstrap({ search: search });
  load(root, 'battle/movement-resolver.js');
  V2_FILES.forEach(f => load(root, f));
  return root;
}
function cover(x, z, type) {
  const spec = {
    rock: { radius: 1.3, cover: 0.55, height: 0.85 },
    hedge: { radius: 3.4, cover: 0.62, height: 1.5 },
    wall: { radius: 1.6, cover: 0.5, height: 1.05 }
  }[type || 'rock'];
  return { x, z, y: 0, radius: spec.radius, cover: spec.cover, height: spec.height, type: type || 'rock' };
}
/* Deterministic scatter of cover over the field. */
function field(seed, half, count) {
  const rnd = H.seededRandom(seed),
    out = [];
  for (let i = 0; i < count; i++) {
    const x = (rnd() * 2 - 1) * half,
      z = (rnd() * 2 - 1) * half;
    out.push(cover(+x.toFixed(1), +z.toFixed(1), ['rock', 'hedge', 'wall'][i % 3]));
  }
  return out;
}

/* opts: {search, seed, squads:[{id,faction,x,z}], objectives:[{id,x,z,radius,owner}], half, cover} */
function build(opts) {
  opts = opts || {};
  H.resetIds();
  const ai = opts.ai || 'v2',
    root = boot(ai === 'v2' ? '?ai=v2' + (opts.search || '') : opts.search || ''),
    battle = H.makeBattle(root, {
      seed: opts.seed || 4242,
      obstacles:
        opts.obstacles ||
        field((opts.seed || 4242) + 17, opts.half || 260, opts.cover == null ? 260 : opts.cover)
    });
  battle._objectives = (opts.objectives || []).map(o => ({
    id: o.id,
    def: { x: o.x, z: o.z, radius: o.radius || 25 }
  }));
  battle.objectiveControl = { objectives: {} };
  battle._capture = {};
  (opts.objectives || []).forEach(o => {
    battle.objectiveControl.objectives[o.id] = { owner: o.owner || null };
    battle._capture[o.id] = { side: null, since: 0 };
  });
  const squads = {};
  (opts.squads || []).forEach(q => {
    const obj = (opts.objectives || [])[0] || { x: 0, z: 0 };
    squads[q.id] = H.addSquad(root, battle, {
      id: q.id,
      faction: q.faction,
      x: q.x,
      z: q.z,
      objective: q.objective || { x: obj.x, z: obj.z },
      facing: q.faction === 'us' ? 0 : Math.PI,
      seed: (opts.seed || 4242) + q.id.length * 13 + q.x
    });
  });
  return { root, battle, squads, K: root.BattleAIV2, S: root.SquadAI };
}

/* Capture rule of the fixture: a side alone inside the radius for 10 s owns the objective. */
function capture(battle) {
  battle._objectives.forEach(o => {
    const n = { us: 0, ge: 0 };
    ['us', 'ge'].forEach(f =>
      battle._roster[f].forEach(s => {
        if (!s.dead && Math.hypot(s.root.position.x - o.def.x, s.root.position.z - o.def.z) <= o.def.radius)
          n[f]++;
      })
    );
    const side = n.us && !n.ge ? 'us' : n.ge && !n.us ? 'ge' : null,
      c = battle._capture[o.id];
    if (side !== c.side) {
      c.side = side;
      c.since = battle.time;
    }
    if (side && battle.time - c.since >= 10) battle.objectiveControl.objectives[o.id].owner = side;
  });
}

function run(world, seconds, onTick) {
  const { root, battle, K, S } = world;
  let elapsed = 0,
    tick = 0;
  while (elapsed < seconds - 1e-9) {
    battle.time += H.AI_TICK;
    elapsed += H.AI_TICK;
    ['us', 'ge'].forEach(f => battle._roster[f].forEach(s => H.stepMovement(battle, s, H.AI_TICK)));
    /* Probe only (`squadEvery`): run the squad layer for each squad on every Nth tick, staggered by squad. */
    const every = world.squadEvery || 1;
    tick++;
    ['us', 'ge'].forEach(f =>
      battle.factions[f].squads.forEach((sq, i) => {
        if (every === 1 || (tick + i) % every === 0) S.updateSquad(sq, battle);
      })
    );
    ['us', 'ge'].forEach(f => battle._roster[f].forEach(s => S.updateSoldier(s, battle)));
    capture(battle);
    if (K.on) K.strategicTick(battle, null, H.AI_TICK);
    if (onTick) onTick(battle);
  }
}

function centre(sq) {
  let x = 0,
    z = 0,
    n = 0;
  sq.members.forEach(s => {
    if (s.dead) return;
    x += s.root.position.x;
    z += s.root.position.z;
    n++;
  });
  return n ? { x: x / n, z: z / n, n } : null;
}
function fingerprint(battle) {
  const rows = [];
  ['us', 'ge'].forEach(f =>
    battle._roster[f].forEach(s =>
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
  const st = battle._aiV2 ? battle._aiV2.stats : {};
  return rows.join(';') + '|' + JSON.stringify(st) + '|' + JSON.stringify(battle.events.fired);
}

module.exports = { H, V2_FILES, boot, build, run, capture, centre, fingerprint, cover, field };
