'use strict';
// Preload (node -r) for Sim test selection: records every repository file a check
// reads or requires, so scripts/select_sim_checks.py knows which checks a change can
// affect. Each process (child processes too, via NODE_OPTIONS) writes one JSON array
// to $SIM_DEPS_OUT/<pid>.json when it exits.
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const REPO = path.resolve(__dirname, '../..');
const out = process.env.SIM_DEPS_OUT;
const seen = new Set();
function note(file) {
  if (file == null) return;
  if (typeof file === 'number') return;
  let p = file instanceof URL ? file.pathname : String(file);
  p = path.resolve(p);
  if (!p.startsWith(REPO + path.sep)) return;
  const rel = path.relative(REPO, p).split(path.sep).join('/');
  if (rel.startsWith('node_modules/') || rel.startsWith('.git/')) return;
  seen.add(rel);
}
for (const name of [
  'readFileSync',
  'readFile',
  'openSync',
  'open',
  'createReadStream',
  'readdirSync',
  'existsSync',
  'statSync'
]) {
  const orig = fs[name];
  if (typeof orig !== 'function') continue;
  fs[name] = function (file, ...rest) {
    note(file);
    return orig.call(this, file, ...rest);
  };
}
const promises = fs.promises;
for (const name of ['readFile', 'open']) {
  const orig = promises[name];
  promises[name] = function (file, ...rest) {
    note(file);
    return orig.call(this, file, ...rest);
  };
}
const origLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (Module.isBuiltin(request)) return origLoad.apply(this, arguments);
  try {
    note(Module._resolveFilename(request, parent, isMain));
  } catch (_) {
    /* builtin or missing */
  }
  return origLoad.apply(this, arguments);
};
if (out) {
  process.on('exit', () => {
    try {
      fs.mkdirSync(out, { recursive: true });
      fs.writeFileSync(path.join(out, process.pid + '.json'), JSON.stringify([...seen].sort()));
    } catch (_) {
      /* best effort */
    }
  });
}
