'use strict';

// Minimal dependency-free SVG flamegraph renderer for Grasstex CPU profiles.
// Input: a flame tree as produced by cpu-profile-chains.flameTree()
// (root.value = total sampled microseconds; each node's value includes its
// subtree). Output: a self-contained SVG string. Width is proportional to
// sampled time; depth is the call-stack depth. Frames narrower than one
// pixel are merged into their parent row visually (they still count in the
// parent's width). No JavaScript, no external assets: the file opens in any
// browser and can be archived alongside the .cpuprofile.

const WIDTH = 1200;
const ROW_H = 18;
const FONT = 11;

function hueFor(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return h % 360;
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderFlamegraph(tree, title) {
  const total = tree.value || 1;
  const unit = WIDTH / total;
  const rows = [];
  let maxDepth = 0;

  function walk(node, depth, x) {
    maxDepth = Math.max(maxDepth, depth);
    const w = node.value * unit;
    if (w < 0.5 && depth > 0) return; // too narrow to draw; parent keeps the width
    rows.push({ node, depth, x, w });
    let cx = x;
    for (const child of node.children || []) {
      walk(child, depth + 1, cx);
      cx += child.value * unit;
    }
  }
  // Skip the synthetic root: its children are the real top frames.
  let cx = 0;
  for (const child of tree.children || []) {
    walk(child, 0, cx);
    cx += child.value * unit;
  }

  const height = (maxDepth + 1) * ROW_H + 44;
  const parts = [];
  parts.push(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${height}" font-family="monospace" font-size="${FONT}">`
  );
  parts.push(`<rect width="100%" height="100%" fill="#ffffff"/>`);
  parts.push(
    `<text x="8" y="16" font-size="13" font-weight="bold" fill="#222">${esc(title || 'CPU flamegraph')}</text>`
  );
  parts.push(
    `<text x="8" y="32" fill="#555">total sampled ${(total / 1000).toFixed(1)} ms · width ∝ sampled time · one row per stack depth</text>`
  );
  for (const r of rows) {
    const y = 40 + r.depth * ROW_H;
    const hue = hueFor(r.node.name);
    const pct = ((100 * r.node.value) / total).toFixed(1);
    const label = `${r.node.name} · ${(r.node.value / 1000).toFixed(1)} ms (${pct}%)`;
    const chars = Math.floor(r.w / (FONT * 0.6));
    const text = chars >= 4 ? label.slice(0, Math.max(0, chars - 1)) : '';
    parts.push(
      `<rect x="${r.x.toFixed(1)}" y="${y}" width="${Math.max(0.5, r.w).toFixed(1)}" height="${ROW_H - 1}" fill="hsl(${hue}, 55%, ${72 - Math.min(22, r.depth * 2)}%)" stroke="#fff" stroke-width="0.5"><title>${esc(label)}</title></rect>`
    );
    if (text) parts.push(`<text x="${(r.x + 3).toFixed(1)}" y="${y + 13}" fill="#1a1a1a">${esc(text)}</text>`);
  }
  parts.push('</svg>');
  return parts.join('\n');
}

module.exports = { renderFlamegraph };
