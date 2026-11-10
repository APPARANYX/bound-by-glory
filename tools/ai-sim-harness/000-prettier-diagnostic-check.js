#!/usr/bin/env node
'use strict';
/* Temporary diagnostic only. Will be removed before PR review/merge. */
const { execFileSync } = require('node:child_process');
const file = 'tools/ai-sim-harness/tactical-covered-maneuver-check.js';
execFileSync('npx', ['--yes', 'prettier@3.3.3', '--write', file], { stdio: 'inherit' });
const patch = execFileSync('git', ['diff', '--', file], { encoding: 'utf8' });
console.log('PR810_FORMAT_DIAGNOSTIC_START');
console.log(patch);
console.log('PR810_FORMAT_DIAGNOSTIC_END');
