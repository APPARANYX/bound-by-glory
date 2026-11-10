#!/usr/bin/env node
'use strict';
/* Temporary formatting diagnostic for a draft-only check, removed before review. */
const { execFileSync } = require('node:child_process');
const file = 'tools/ai-sim-harness/tactical-covered-maneuver-check.js';
execFileSync('npx', ['--yes', 'prettier@3.3.3', '--write', file], { stdio: 'inherit' });
const patch = execFileSync('git', ['diff', '--', file], { encoding: 'utf8' });
console.log('PRETTIER_DIAGNOSTIC_BEGIN');
console.log(patch);
console.log('PRETTIER_DIAGNOSTIC_END');
