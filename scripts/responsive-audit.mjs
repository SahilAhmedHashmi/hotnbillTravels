import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { destinations } from '../src/data/destinations.js';
import { experiences } from '../src/data/experiences.js';
import { vehicles } from '../src/data/vehicles.js';

const widths = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
const allRoutes = [
  '/', ...['cinematic','editorial','earthy','minimal','photographic'].map((version) => `/?version=${version}`),
  ...['cinematic','editorial','earthy','minimal','photographic'].map((version) => `/?version=${version}&theme=dark`),
  '/destinations', ...destinations.map(({ slug }) => `/destinations/${slug}`),
  '/experiences', ...experiences.map(({ slug }) => `/experiences/${slug}`),
  '/fleet', ...vehicles.map(({ slug }) => `/fleet/${slug}`),
  '/packages', '/about', '/contact', '/plan-my-trip', '/booking-confirmation', '/travel-guides', '/route-that-does-not-exist',
];
const routes = process.env.AUDIT_HOME_ONLY === '1'
  ? allRoutes.filter((route) => route === '/' || route.startsWith('/?version='))
  : allRoutes;
const baseUrl = process.env.AUDIT_URL || 'http://127.0.0.1:4173';
const edgePath = process.env.EDGE_PATH || 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const profile = mkdtempSync(join(tmpdir(), 'hornbill-edge-'));
const edge = spawn(edgePath, [
  '--headless=new', '--no-sandbox', '--disable-gpu-sandbox', '--use-gl=swiftshader', '--enable-unsafe-swiftshader',
  '--no-first-run', '--no-default-browser-check',
  '--remote-debugging-port=9223', '--remote-allow-origins=*', `--user-data-dir=${profile}`, 'about:blank',
], { stdio: 'ignore' });

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let nextId = 0;
const pending = new Map();

try {
  let target;
  for (let attempt = 0; attempt < 40 && !target; attempt += 1) {
    try {
      const targets = await fetch('http://127.0.0.1:9223/json').then((response) => response.json());
      target = targets.find(({ type }) => type === 'page');
    } catch { await delay(250); }
  }
  if (!target) throw new Error('Could not connect to the Edge debugging endpoint.');

  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    socket.addEventListener('open', resolve, { once: true });
    socket.addEventListener('error', reject, { once: true });
  });
  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data);
    if (!message.id || !pending.has(message.id)) return;
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    message.error ? reject(new Error(message.error.message)) : resolve(message.result);
  });
  socket.addEventListener('close', () => {
    for (const { reject } of pending.values()) reject(new Error('Edge debugging socket closed.'));
    pending.clear();
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => {
    const id = ++nextId;
    pending.set(id, { resolve, reject });
    socket.send(JSON.stringify({ id, method, params }));
  });

  await send('Page.enable');
  await send('Runtime.enable');
  const results = [];
  for (const width of widths) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 768 });
    for (const route of routes) {
      const browserErrors = [];
      const errorHandler = ({ data }) => {
        const message = JSON.parse(data);
        if (message.method === 'Runtime.exceptionThrown') browserErrors.push(message.params.exceptionDetails.text);
      };
      socket.addEventListener('message', errorHandler);
      await send('Page.navigate', { url: `${baseUrl}${route}` });
      await delay(220);
      const { result } = await send('Runtime.evaluate', {
        returnByValue: true,
        expression: `(() => {
          const root = document.documentElement;
          const viewport = root.clientWidth;
          const offenders = [...document.querySelectorAll('body *')].filter((el) => {
            const style = getComputedStyle(el);
            if (style.position === 'fixed' || style.visibility === 'hidden' || style.transform !== 'none') return false;
            const box = el.getBoundingClientRect();
            if (!(box.right > viewport + 1 || box.left < -1)) return false;
            const clippedByAncestor = [...function* () { let node = el.parentElement; while (node) { yield node; node = node.parentElement; } }()]
              .some((ancestor) => ['auto', 'scroll', 'hidden', 'clip'].includes(getComputedStyle(ancestor).overflowX));
            return !clippedByAncestor;
          }).slice(0, 12).map((el) => ({ tag: el.tagName, className: String(el.className).slice(0, 100), box: el.getBoundingClientRect().toJSON() }));
          const brokenImages = [...document.images].filter((img) => img.complete && img.naturalWidth === 0).map((img) => img.currentSrc || img.src);
          const missingAlt = [...document.images].filter((img) => !img.hasAttribute('alt')).map((img) => img.currentSrc || img.src);
          const ids = [...document.querySelectorAll('[id]')].map((el) => el.id).filter(Boolean);
          const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
          const unlabeledControls = [...document.querySelectorAll('button,input,select,textarea')].filter((el) => {
            if (el.type === 'hidden') return false;
            const label = el.labels?.[0]?.textContent || el.getAttribute('aria-label') || el.getAttribute('aria-labelledby') || el.textContent || el.title;
            return !String(label || '').trim();
          }).map((el) => ({ tag: el.tagName, type: el.type || '', id: el.id || '' }));
          const smallTargets = [...document.querySelectorAll('button, a, input, select, textarea')].filter((el) => {
            const box = el.getBoundingClientRect();
            const style = getComputedStyle(el);
            return style.visibility !== 'hidden' && box.width > 0 && box.height > 0 && (box.width < 40 || box.height < 40);
          }).slice(0, 12).map((el) => ({ tag: el.tagName, label: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 60), width: Math.round(el.getBoundingClientRect().width), height: Math.round(el.getBoundingClientRect().height) }));
          return { title: document.title, documentOverflow: root.scrollWidth - viewport, offenders, brokenImages, missingAlt, duplicateIds, unlabeledControls, smallTargets };
        })()`,
      });
      socket.removeEventListener('message', errorHandler);
      results.push({ width, route, browserErrors, ...result.value });
    }
  }
  socket.close();
  const failures = results.filter(({ documentOverflow, offenders, brokenImages, missingAlt, duplicateIds, unlabeledControls, browserErrors }) => documentOverflow > 1 || offenders.length || brokenImages.length || missingAlt.length || duplicateIds.length || unlabeledControls.length || browserErrors.length);
  const report = { generatedAt: new Date().toISOString(), baseUrl, widths, routesAudited: routes.length, checks: results.length, failureCount: failures.length, failures, results };
  writeFileSync(new URL('../docs/responsive-audit.json', import.meta.url), `${JSON.stringify(report, null, 2)}\n`);
  console.log(`Audited ${results.length} route/viewport combinations; ${failures.length} require review.`);
  if (failures.length) process.exitCode = 1;
} finally {
  edge.kill();
  await delay(300);
  try { rmSync(profile, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 }); } catch { /* Edge may retain its profile briefly on Windows. */ }
}
