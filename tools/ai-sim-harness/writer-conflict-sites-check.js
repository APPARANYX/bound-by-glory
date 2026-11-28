#!/usr/bin/env node
'use strict';
/* The writer-conflict-sites probe (scripts/probes/writer-conflict-sites.js) on module 36 as the page loads
   it: a staged A, B, A write on one man's orderDestination under two owner contexts must come back as the
   conflict module 36 raises, with each event joined to the function that wrote it and the command state at
   that write. The probe must also stay observe-only: every value it passes through is the value written,
   a write module 36 does not record (a move under the 1.25 m epsilon) adds no site, and its hooks survive
   module 36's own re-instrumentation. Staged writes, not a battle: the live question (which writers
   conflict on the #815 defense seeds) is answered by Muse/Kit running the probe on those seeds. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const H = require('./harness');

function load(r, p) {
  new Function('window', 'globalThis', 'console', fs.readFileSync(path.join(H.REPO, p), 'utf8'))(r, r, {
    log() {},
    warn() {}
  });
}
let count = 0;
function test(name, fn) {
  fn();
  count++;
  console.log('PASS ' + name);
}

function world() {
  H.resetIds();
  const r = H.bootstrap({ modules: false });
  const systems = {};
  r.BattleModules = {
    registerSystem(id, s) {
      s.id = id;
      systems[id] = s;
    },
    getSystem: id => systems[id],
    listSystems: () => Object.values(systems),
    unitsFor: b => (b._roster.us || []).concat(b._roster.ge || [])
  };
  load(r, 'battle/modules/36-order-provenance.js');
  const b = H.makeBattle(r);
  const q = H.addSquad(r, b, { id: 'us-0', faction: 'us', x: 0, z: 0, objective: { x: 0, z: 400 } });
  r.__battle__ = b;
  r.BattleOrderProvenance.instrument(b);
  load(r, 'scripts/probes/writer-conflict-sites.js');
  const probe = r.BattleProbes['writer-conflict-sites'];
  probe.start(b);
  probe.sample(b);
  return { r, b, q, P: r.BattleOrderProvenance, probe };
}

/* Two named writers, so the probe's sites can be checked against the code that wrote. */
function squadCommandWrite(P, s, p) {
  P.withOwner('squad-stability', 'staged formation order', () => {
    s.orderDestination = p;
  });
}
function preparedPostWrite(P, s, p) {
  P.withOwner('prepared-defense', 'staged prepared post', () => {
    s.orderDestination = p;
  });
}

test('an A, B, A conflict comes back with each writer site and its command state', () => {
  const w = world(),
    s = w.q.members[3];
  s._fireteamPublishKey = 'controller:move-7';
  w.b.time = 10;
  squadCommandWrite(w.P, s, { x: 10, z: 10 });
  w.b.time = 11;
  preparedPostWrite(w.P, s, { x: 20, z: 10 });
  w.b.time = 12;
  squadCommandWrite(w.P, s, { x: 10, z: 10 });
  w.probe.sample(w.b);
  const rep = w.probe.report(w.b);
  assert.equal(rep.benchmarkConflicts, 1, 'module 36 raised the staged ping-pong');
  assert.equal(rep.captured, 1);
  const c = rep.conflicts[0];
  assert.equal(c.kind, 'writer-ping-pong');
  assert.equal(c.field, 'orderDestination');
  assert.equal(c.squad, 'us:us-0');
  const tail = c.events.slice(-3);
  assert.deepEqual(
    tail.map(e => e.owner),
    ['squad-stability', 'prepared-defense', 'squad-stability']
  );
  assert.match(tail[0].sites.join(' '), /squadCommandWrite/);
  assert.match(tail[1].sites.join(' '), /preparedPostWrite/);
  assert.ok(
    tail.every(e => !e.sites.some(x => /^writer-conflict-sites\.js|^36-order-provenance/.test(x))),
    'neither the probe nor module 36 is reported as the writer'
  );
  assert.equal(tail[1].ctx.publishKey, 'controller:move-7', 'the command state at the write is frozen');
  assert.equal(tail[1].ctx.controller, 'none', 'no controller loaded reads as none');
  assert.ok(Object.keys(rep.bySignature)[0].indexOf('prepared-defense@') > 0);
});

test('the probe passes every value through and adds no site for an unrecorded write', () => {
  const w = world(),
    s = w.q.members[4],
    p = { x: 33, z: 44 };
  w.b.time = 5;
  squadCommandWrite(w.P, s, p);
  assert.equal(s.orderDestination, p, 'the written object is what the field holds');
  const seq = w.b._orderProvenance.seq;
  squadCommandWrite(w.P, s, { x: 33.5, z: 44 });
  assert.equal(w.b._orderProvenance.seq, seq, 'a move under the epsilon is not recorded by module 36');
  assert.equal(s.orderDestination.x, 33.5, 'but it is still written');
  const rep = w.probe.report(w.b);
  assert.equal(rep.captured, 0);
  assert.equal(rep.topWriteSites.length, 1, 'only the recorded write has a site');
});

test('module 36 re-instrumenting a battle keeps the probe hooks', () => {
  const w = world(),
    s = w.q.members[2];
  w.P.instrument(w.b);
  w.probe.sample(w.b);
  w.b.time = 3;
  preparedPostWrite(w.P, s, { x: 50, z: 50 });
  assert.equal(w.probe.report(w.b).topWriteSites.length, 1);
  assert.equal(w.probe.report(w.b).hookFailures, 0);
});

console.log(`writer-conflict-sites-check: ${count} passed`);
