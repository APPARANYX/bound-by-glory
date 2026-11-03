'use strict';

// Localhost reverse proxy for the deployed Grasstex preview.
//
// Chromium in this sandbox cannot reach external HTTPS hosts (the egress
// proxy rejects its tunnel), while Node's fetch reaches them fine. This
// proxy lets a headless browser profile the ACTUAL deployed preview:
// the browser talks to http://127.0.0.1:<port>/grasstex/preview/... and
// this server forwards each request to the upstream origin and streams the
// response back byte-for-byte (status, content-type and body preserved).
// Paths are preserved, so the page's relative asset URLs (/grasstex/Assets/,
// /grasstex/preview/.../Assets/) resolve through the same proxy.
//
// Usage (from a .mjs driver):
//   const { startPreviewProxy } = require('./lib/preview-proxy.cjs');
//   const proxy = await startPreviewProxy({ port: 8766, upstream: 'https://test.ivandpopov.com' });
//   // ... browse http://127.0.0.1:8766/grasstex/preview/... ...
//   await proxy.close();
//
// This is test infrastructure only. It changes no simulation code and
// never writes to the upstream.

const http = require('node:http');

async function startPreviewProxy({ port, upstream }) {
  const origin = String(upstream || 'https://test.ivandpopov.com').replace(/\/$/, '');
  const server = http.createServer(async (req, res) => {
    const target = origin + req.url;
    try {
      const upstreamRes = await fetch(target, {
        method: req.method,
        headers: { 'user-agent': 'grasstex-preview-proxy/1.0' },
        redirect: 'manual'
      });
      const body = Buffer.from(await upstreamRes.arrayBuffer());
      const headers = {};
      for (const [k, v] of upstreamRes.headers.entries()) {
        if (['content-length', 'content-encoding', 'transfer-encoding', 'connection'].includes(k)) continue;
        headers[k] = v;
      }
      res.writeHead(upstreamRes.status, headers);
      res.end(body);
    } catch (error) {
      res.writeHead(502, { 'content-type': 'text/plain' });
      res.end(`preview proxy upstream error: ${error?.message || error}`);
    }
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', resolve);
  });
  return {
    port,
    upstream: origin,
    baseUrl: `http://127.0.0.1:${port}`,
    close: () =>
      new Promise(resolve => {
        server.close(() => resolve());
      })
  };
}

module.exports = { startPreviewProxy };
