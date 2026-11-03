'use strict';

// CPU-profile post-processing for Grasstex deterministic battle profiles.
// Input: a V8 .cpuprofile (Chrome DevTools / Speedscope compatible) produced by
// scripts/profile_battle_hotpaths.mjs via the CDP Profiler domain.
// Outputs, all derived from sampled wall microseconds (timeDeltas), never from
// the wall-time wrapper profiler:
//   - top call chains ranked by inclusive sampled time (full stacks, not leaves)
//   - per-interval profile splits, attributing each sample to the simulation
//     interval that contains its timestamp (step boundaries recorded by the
//     driver in the same monotonic clock as the profile)
//   - an aggregated stack tree suitable for flamegraph rendering
//
// A sample is attributed to the innermost frame for self time and to every
// distinct frame on its stack for inclusive time (a recursive frame counts
// once per sample, matching cpu-profile-summary.cjs).

function buildMaps(profile) {
  const nodes = new Map((profile.nodes || []).map(node => [node.id, node]));
  const parents = new Map();
  for (const node of nodes.values()) {
    for (const child of node.children || []) parents.set(child, node.id);
  }
  return { nodes, parents };
}

function frameKey(node) {
  const f = node.callFrame || {};
  return JSON.stringify([
    f.functionName || '(anonymous)',
    f.url || '',
    Number.isInteger(f.lineNumber) ? f.lineNumber + 1 : null,
    Number.isInteger(f.columnNumber) ? f.columnNumber + 1 : null
  ]);
}

function frameLabel(node) {
  const f = node.callFrame || {};
  const url = (f.url || '').split('/').pop().split('?')[0];
  const name = f.functionName || '(anonymous)';
  const line = Number.isInteger(f.lineNumber) ? f.lineNumber + 1 : null;
  return line == null ? `${name} (${url})` : `${name} (${url}:${line})`;
}

// Walk a sample's stack from leaf to root, returning the ordered frames
// (root first) plus the node ids. Recursive nodes appear once.
function stackFor(nodes, parents, sampleId) {
  const frames = [];
  const seen = new Set();
  let node = nodes.get(sampleId);
  while (node && !seen.has(node.id)) {
    seen.add(node.id);
    frames.unshift(node);
    node = nodes.get(parents.get(node.id));
  }
  return frames;
}

function topChains(profile, limit) {
  const { nodes, parents } = buildMaps(profile);
  const chains = new Map();
  let sampledUs = 0;
  const samples = profile.samples || [];
  const deltas = profile.timeDeltas || [];
  for (let i = 0; i < samples.length; i++) {
    const delta = deltas[i];
    if (!Number.isFinite(delta) || delta < 0) continue;
    sampledUs += delta;
    const frames = stackFor(nodes, parents, samples[i]);
    if (!frames.length) continue;
    const key = frames.map(frameKey).join('\n');
    let chain = chains.get(key);
    if (!chain) {
      chain = { frames: frames.map(frameLabel), samples: 0, us: 0 };
      chains.set(key, chain);
    }
    chain.samples++;
    chain.us += delta;
  }
  const out = [...chains.values()].sort((a, b) => b.us - a.us || b.samples - a.samples);
  for (const c of out) c.percent = sampledUs ? +((100 * c.us) / sampledUs).toFixed(2) : 0;
  return { sampledUs, chains: limit > 0 ? out.slice(0, limit) : out };
}

// Aggregate all samples into a flamegraph tree: each node is a frame, with
// total sampled microseconds for the subtree rooted at that frame.
function flameTree(profile) {
  const { nodes, parents } = buildMaps(profile);
  const root = { name: '(root)', value: 0, children: new Map() };
  const samples = profile.samples || [];
  const deltas = profile.timeDeltas || [];
  for (let i = 0; i < samples.length; i++) {
    const delta = deltas[i];
    if (!Number.isFinite(delta) || delta < 0) continue;
    root.value += delta;
    const frames = stackFor(nodes, parents, samples[i]);
    let cursor = root;
    for (const node of frames) {
      const key = frameKey(node);
      let child = cursor.children.get(key);
      if (!child) {
        child = { name: frameLabel(node), value: 0, children: new Map() };
        cursor.children.set(key, child);
      }
      child.value += delta;
      cursor = child;
    }
  }
  function toPlain(node) {
    return {
      name: node.name,
      value: node.value,
      children: [...node.children.values()]
        .sort((a, b) => b.value - a.value)
        .map(toPlain)
    };
  }
  return toPlain(root);
}

// Split one profile into per-interval profiles. boundaries is an array of
// { atUs, label } sorted ascending, where atUs is MICROSECONDS SINCE THE
// PROFILE STARTED (cumulative timeDeltas time, not wall-clock time). The
// driver records step boundaries in performance.now() and converts them to
// this relative timebase using the profile-start anchor it captured just
// before Profiler.start. Every sample is attributed to the latest boundary
// at or before its timestamp; samples before the first boundary go to the
// first interval. Returns an array of { label, profile } where profile is a
// valid .cpuprofile containing only that interval's samples and the nodes
// they reference.
function splitByIntervals(profile, boundaries) {
  if (!Array.isArray(boundaries) || boundaries.length < 2) return [];
  const { nodes } = buildMaps(profile);
  const samples = profile.samples || [];
  const deltas = profile.timeDeltas || [];
  // Assign each sample a relative timestamp and an interval index.
  const sampleInterval = new Array(samples.length).fill(0);
  let t = 0;
  for (let i = 0; i < samples.length; i++) {
    const delta = deltas[i];
    if (Number.isFinite(delta) && delta >= 0) t += delta;
    let idx = 0;
    for (let b = 0; b < boundaries.length; b++) {
      if (t >= boundaries[b].atUs) idx = b;
      else break;
    }
    sampleInterval[i] = idx;
  }
  const out = [];
  for (let b = 0; b < boundaries.length; b++) {
    const idxs = [];
    for (let i = 0; i < samples.length; i++) if (sampleInterval[i] === b) idxs.push(i);
    if (!idxs.length) continue;
    // Collect the nodes referenced by these samples (full stacks).
    const { parents } = buildMaps(profile);
    const keep = new Set();
    for (const i of idxs) {
      let node = nodes.get(samples[i]);
      const seen = new Set();
      while (node && !seen.has(node.id)) {
        seen.add(node.id);
        keep.add(node.id);
        node = nodes.get(parents.get(node.id));
      }
    }
    const keptNodes = (profile.nodes || []).filter(n => keep.has(n.id));
    const keptIds = new Set(keptNodes.map(n => n.id));
    const sub = {
      nodes: keptNodes.map(n => ({
        ...n,
        children: (n.children || []).filter(c => keptIds.has(c))
      })),
      startTime: (profile.startTime || 0) + boundaries[b].atUs,
      endTime:
        b + 1 < boundaries.length
          ? (profile.startTime || 0) + boundaries[b + 1].atUs
          : profile.endTime,
      samples: idxs.map(i => samples[i]),
      timeDeltas: idxs.map(i => deltas[i])
    };
    out.push({ label: boundaries[b].label, profile: sub, samples: idxs.length });
  }
  return out;
}

module.exports = { topChains, flameTree, splitByIntervals, frameLabel };
