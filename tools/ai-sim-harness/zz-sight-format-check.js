'use strict';
// Temporary formatter diagnostic on the candidate branch; remove after reading CI output.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const repo = path.resolve(__dirname, '../..');
const files = [
  'battle/obstacle-field.js',
  'tools/ai-sim-harness/sight-static-candidate-cache-check.js'
];
const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'sight-formatter-'));
try {
  const copies = files.map((file, i) => {
    const dest = path.join(temp, i + '.js');
    fs.copyFileSync(path.join(repo, file), dest);
    return dest;
  });
  const result = spawnSync(
    'npx',
    ['--yes', 'prettier@3.3.3', '--config', path.join(repo, '.prettierrc.json'), '--write', ...copies],
    { cwd: repo, encoding: 'utf8', timeout: 120000 }
  );
  assert.equal(result.status, 0, result.stderr || result.stdout || 'Prettier failed');
  files.forEach((file, i) => {
    console.log('SIGHT_FORMATTED_FILE ' + JSON.stringify({
      file,
      text: fs.readFileSync(copies[i], 'utf8')
    }));
  });
  console.log('PASS generated canonical Prettier 3.3.3 formatting from unchanged source copies');
} finally {
  fs.rmSync(temp, { recursive: true, force: true });
}
