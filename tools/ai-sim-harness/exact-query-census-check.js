'use strict';
// Offline Node/VM checks only: no DOM, browser, CDP, server or battle benchmark.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const create = require('../../scripts/lib/exact-query-census.cjs');
let passed = 0;
function test(name, fn) {
  fn();
  passed++;
  console.log('PASS ' + name);
}
function fixture(limit) {
  const c = create(limit),
    source = function native() {},
    receiver = {};
  return {
    c,
    source,
    receiver,
    call(inputs, value, context = { time: 1 }, complete = true) {
      const t = c.enter('ray', source, receiver, 'owner', inputs, context, complete);
      c.leave(t, value, false);
    },
    row() {
      return c.snapshot().rows['ray@owner'];
    }
  };
}
test('entry snapshot survives native mutation; answer snapshot survives returned blocker mutation', () => {
  const f = fixture(),
    input = { x: 1 },
    blocker = { id: 'truck', x: 4 };
  let t = f.c.enter('ray', f.source, f.receiver, 'owner', input, { time: 1 }, true);
  input.x = 2;
  f.c.leave(t, blocker, false);
  blocker.x = 8;
  f.call({ x: 1 }, blocker);
  assert.equal(f.row().argumentRepeats, 1);
  assert.equal(f.row().answerDisagreements, 1);
  assert.equal(f.c.snapshot().disagreementExamples.length, 1);
});
test('sub-centimetre and exact numeric/type distinctions are not rounded or coerced', () => {
  const f = fixture();
  for (const x of [0, -0, 0.001, 0.002, undefined, null, NaN, Infinity, '0']) f.call({ x }, false);
  assert.equal(f.row().argumentRepeats, 0);
  f.call({ x: 0.001 }, false);
  assert.equal(f.row().answerAgreements, 1);
});
test('same-time live geometry answer changes remain visible, never certified', () => {
  const f = fixture();
  for (const answer of [false, true, false]) f.call([1, 2], answer, { time: 1, navVersion: 7 });
  assert.equal(f.row().argumentRepeats, 2);
  assert.equal(f.row().answerDisagreements, 1);
  assert.equal(f.row().answerAgreements, 1);
  assert.equal(f.c.snapshot().stateAuthority, 'uncertified');
  assert.equal(f.c.snapshot().certifiedReuse, 0);
});
test('eye heights, options and carrier exemption values distinguish arguments', () => {
  const f = fixture();
  for (const a of [
    [1.6, undefined],
    [0.6, undefined],
    [0.6, null],
    [0.6, {}],
    [0.6, { ignoreDynamicId: 'truck-a' }],
    [0.6, { ignoreDynamicId: 'truck-b' }]
  ])
    f.call(a, true);
  assert.equal(f.row().argumentRepeats, 0);
});
test('source function, receiver, battle identity and explicit context distinguish observations', () => {
  const f = fixture();
  f.call([1], true);
  f.c.leave(
    f.c.enter('ray', function other() {}, f.receiver, 'owner', [1], { time: 1 }, true),
    true,
    false
  );
  f.c.leave(f.c.enter('ray', f.source, {}, 'owner', [1], { time: 1 }, true), true, false);
  f.call([1], true, { time: 1, battle: f.c.ref({}) });
  assert.equal(f.row().argumentRepeats, 0);
});
test('actual frame boundaries distinguish calls even when time is unchanged', () => {
  const f = fixture();
  for (let i = 0; i < 2; i++) {
    f.c.beginFrame();
    f.call([1], true);
    f.call([1], true);
    f.c.endFrame();
  }
  assert.equal(f.row().argumentRepeats, 2);
  assert.equal(f.c.snapshot().frame, 2);
  assert.equal(f.row().unobservedFrameCalls, 0);
});
test('restart clears rows and observations; detached exports cannot mutate census', () => {
  const f = fixture();
  f.call([1], false);
  const out = f.c.snapshot();
  out.rows['ray@owner'].calls = 99;
  assert.equal(f.row().calls, 1);
  f.c.reset();
  f.call([1], true);
  assert.equal(f.row().calls, 1);
  assert.equal(f.row().argumentRepeats, 0);
});
test('opaque actors/accessors are unknown; diagnostic never invokes their getters', () => {
  const f = fixture();
  let reads = 0;
  const input = {
    get stance() {
      reads++;
      return 'prone';
    }
  };
  f.call(input, true);
  f.call({ id: 1, stance: 'prone' }, true, { time: 1 }, false);
  assert.equal(reads, 0);
  assert.equal(f.row().unknownInputs, 2);
  assert.equal(f.row().argumentRepeats, 0);
});
test('throws are separate from native undefined and unknown returned objects', () => {
  const f = fixture();
  const t = f.c.enter('ray', f.source, f.receiver, 'owner', [1], {}, true);
  f.c.leave(t, undefined, true);
  f.call([2], undefined);
  f.call([2], undefined);
  f.call([3], new Date());
  assert.equal(f.row().throws, 1);
  assert.equal(f.row().answerAgreements, 1);
  assert.equal(f.row().unknownAnswers, 1);
});
test('bounded storage discloses dropped keys without inventing repeats', () => {
  const f = fixture(1);
  f.call([1], false);
  f.call([2], true);
  assert.equal(f.row().droppedKeys, 1);
  assert.equal(f.row().argumentRepeats, 0);
  assert.equal(f.c.snapshot().retainedKeys, 1);
});
const profiler = fs.readFileSync(path.join(__dirname, '../../scripts/battle-hotpath-profiler.cjs'), 'utf8');
const helper = fs.readFileSync(path.join(__dirname, '../../scripts/lib/exact-query-census.cjs'), 'utf8');
function engine(enabled) {
  const context = vm.createContext({});
  vm.runInContext(
    `var calls = 0, reads = 0, answer = false, boom = null;
    var performance = { now: function () { return 1; } };
    var BattleNavigation = {version: 7, movementClear: function(a,b,o) {
      calls++; if(boom) throw boom; if(o) o.ignoreDynamicId; return answer;
    }};
    var native = BattleNavigation.movementClear;
    var __battle__ = {time: 1, _frame: function () {
      BattleNavigation.movementClear({x:0,z:0}, {x:1,z:1});
      BattleNavigation.movementClear({x:0,z:0}, {x:1,z:1});
    }};
    var nativeFrame = __battle__._frame;`,
    context
  );
  if (enabled) vm.runInContext(helper, context);
  vm.runInContext(profiler, context);
  return {
    context,
    run(code) {
      return vm.runInContext(code, context);
    },
    snapshot() {
      return JSON.parse(vm.runInContext('JSON.stringify(BattleHotpathProfiler.snapshot(0))', context));
    }
  };
}
test('shipping profiler integration executes every native call and observes actual frames', () => {
  const e = engine(true);
  e.run('__battle__._frame(); __battle__._frame();');
  assert.equal(e.run('calls'), 4);
  const c = e.snapshot().queryExactCensus;
  assert.equal(c.frame, 2);
  assert.equal(c.rows['movementClear@unscoped'].argumentRepeats, 2);
  assert.equal(c.certifiedReuse, 0);
  e.run('BattleHotpathProfiler.restore()');
  assert.equal(e.run('BattleNavigation.movementClear === native && __battle__._frame === nativeFrame'), true);
});
test('shipping wrapper keeps getter count and exception object unchanged', () => {
  const e = engine(true);
  e.run(
    'var o={get ignoreDynamicId(){reads++; return "truck";}}; BattleNavigation.movementClear({x:0},{x:1},o);'
  );
  assert.equal(e.run('reads'), 1);
  assert.equal(e.snapshot().queryExactCensus.rows['movementClear@unscoped'].unknownInputs, 1);
  assert.equal(
    e.run(
      'boom = {}; var caught; try { BattleNavigation.movementClear({x:0},{x:1}); } catch(e) { caught=e; } caught === boom;'
    ),
    true
  );
  assert.equal(e.run('calls'), 2);
  assert.equal(e.snapshot().queryExactCensus.rows['movementClear@unscoped'].throws, 1);
});
test('disabled census preserves existing native calls and returns no exact observations', () => {
  const e = engine(false);
  e.run('__battle__._frame();');
  assert.equal(e.run('calls'), 2);
  assert.equal(e.snapshot().queryExactCensus, null);
});
test('query kinds and call sites keep separate repetition tables', () => {
  const f = fixture();
  for (const [kind, scope] of [
    ['ray', 'a'],
    ['ray', 'b'],
    ['other', 'a']
  ]) {
    f.c.leave(f.c.enter(kind, f.source, f.receiver, scope, [1], {}, true), true, false);
  }
  for (const r of Object.values(f.c.snapshot().rows)) assert.equal(r.argumentRepeats, 0);
});
test('effective inherited carrier option is captured without reading an accessor', () => {
  const e = engine(true);
  e.run(`Object.prototype.ignoreDynamicId = 'first';
    BattleNavigation.movementClear({x:0},{x:1},{});
    Object.prototype.ignoreDynamicId = 'second';
    BattleNavigation.movementClear({x:0},{x:1},{});
    delete Object.prototype.ignoreDynamicId;`);
  const r = e.snapshot().queryExactCensus.rows['movementClear@unscoped'];
  assert.equal(r.calls, 2);
  assert.equal(r.argumentRepeats, 0);
  assert.equal(e.run('calls'), 2);
});
test('shipping navigation version getter cannot discard readable native query inputs', () => {
  const context = vm.createContext({ URLSearchParams, location: { search: '' } });
  vm.runInContext('var window=globalThis; var GTMath={clamp:Math.min}; var GTLog=function(){};', context);
  vm.runInContext(
    fs.readFileSync(path.join(__dirname, '../../battle/battle-navigation.js'), 'utf8'),
    context
  );
  vm.runInContext(
    `var versionReads=0;
    var nativeVersion=Object.getOwnPropertyDescriptor(BattleNavigation,'version').get;
    Object.defineProperty(BattleNavigation,'version',{get:function(){versionReads++;return nativeVersion.call(this);}});
    var SquadAI={hasLineOfSight:function(){return false;}};
    var __battle__={time:0,_frame:function(){
      BattleNavigation.movementClear({x:0,z:0},{x:1,z:1});
      BattleNavigation.movementClear({x:0,z:0},{x:1,z:1});
      SquadAI.hasLineOfSight({id:1},{id:2});
    }};`,
    context
  );
  vm.runInContext(helper, context);
  vm.runInContext(profiler, context);
  vm.runInContext('__battle__._frame()', context);
  const c = JSON.parse(
    vm.runInContext('JSON.stringify(BattleHotpathProfiler.snapshot(0).queryExactCensus)', context)
  );
  const row = c.rows['movementClear@unscoped'];
  assert.equal(row.unknownInputs, 0, 'a context accessor must not erase exact endpoint observations');
  assert.equal(row.answerAgreements, 1);
  assert.equal(vm.runInContext('versionReads', context), 3, 'sample the known version once per query');
  assert.equal(row.unknownContextCalls, 0, 'shipping numeric version is observed');
  assert.equal(row.unknownContextFields.navigationVersion, undefined);
  assert.equal(
    c.rows['hasLineOfSight@unscoped'].unknownInputReasons['private-los-dynamic-dependencies-unobserved'],
    1,
    'a missing context field cannot overwrite the private-LOS reason'
  );
  assert.equal(c.certifiedReuse, 0);
});
test('partial context still exposes native answer disagreement without certifying reuse', () => {
  const e = engine(true);
  e.run(`Object.defineProperty(BattleNavigation,'version',{get:function(){throw new Error('must not read');}});
    __battle__._frame=function(){
      BattleNavigation.movementClear({x:0,z:0},{x:1,z:1});
      answer=true;
      BattleNavigation.movementClear({x:0,z:0},{x:1,z:1});
    };
    __battle__._frame();`);
  const r = e.snapshot().queryExactCensus.rows['movementClear@unscoped'];
  assert.equal(r.unknownInputs, 0);
  assert.equal(r.unknownContextCalls, 2);
  assert.equal(r.answerDisagreements, 1);
  assert.equal(r.certifiedReuse, 0);
  assert.equal(e.run('calls'), 2);
});
test('version changes separate exact keys and the getter is sampled once per query', () => {
  const e = engine(true);
  e.run(`var versionReads=0;
    Object.defineProperty(BattleNavigation,'version',{get:function(){return ++versionReads;}});
    __battle__._frame();`);
  const r = e.snapshot().queryExactCensus.rows['movementClear@unscoped'];
  assert.equal(e.run('versionReads'), 2);
  assert.equal(e.run('calls'), 2);
  assert.equal(r.unknownInputs, 0);
  assert.equal(r.unknownContextCalls, 0);
  assert.equal(r.argumentRepeats, 0);
  assert.equal(r.certifiedReuse, 0);
});
test('invalid navigation versions stay unknown without losing native query evidence', () => {
  for (const value of ['undefined', 'null', '"7"', 'NaN', 'Infinity']) {
    const e = engine(true);
    e.run(`BattleNavigation.version=${value}; __battle__._frame();`);
    const r = e.snapshot().queryExactCensus.rows['movementClear@unscoped'];
    assert.equal(e.run('calls'), 2);
    assert.equal(r.unknownInputs, 0);
    assert.equal(r.unknownContextFields.navigationVersion, 2);
    assert.equal(r.answerAgreements, 1);
    assert.equal(r.certifiedReuse, 0);
  }
});
console.log(`${passed}/${passed} exact-query census checks passed (offline Node/VM).`);
