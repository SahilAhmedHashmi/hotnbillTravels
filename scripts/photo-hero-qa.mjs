import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const baseUrl = process.env.QA_URL || 'http://127.0.0.1:4180';
const browserPath = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const profile = mkdtempSync(join(tmpdir(), 'hornbill-hero-qa-'));
const browser = spawn(browserPath, ['--headless=new','--no-sandbox','--disable-gpu-sandbox','--use-gl=swiftshader','--enable-unsafe-swiftshader','--remote-debugging-port=9232','--remote-allow-origins=*',`--user-data-dir=${profile}`,'about:blank'], { stdio: 'ignore' });
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let id = 0;
const pending = new Map();

try {
  let target;
  for (let attempt = 0; attempt < 40 && !target; attempt += 1) {
    try { target = (await fetch('http://127.0.0.1:9232/json').then((response) => response.json())).find((item) => item.type === 'page'); }
    catch { await wait(250); }
  }
  if (!target) throw new Error('Could not connect to Chrome.');
  const socket = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { socket.addEventListener('open', resolve, { once: true }); socket.addEventListener('error', reject, { once: true }); });
  socket.addEventListener('message', ({ data }) => {
    const message = JSON.parse(data);
    if (!message.id || !pending.has(message.id)) return;
    const job = pending.get(message.id);
    pending.delete(message.id);
    message.error ? job.reject(new Error(message.error.message)) : job.resolve(message.result);
  });
  const send = (method, params = {}) => new Promise((resolve, reject) => { const callId = ++id; pending.set(callId, { resolve, reject }); socket.send(JSON.stringify({ id: callId, method, params })); });
  const evaluate = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true })).result.value;
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Page.bringToFront');
  const exceptions = [];
  socket.addEventListener('message', ({ data }) => { const message = JSON.parse(data); if (message.method === 'Runtime.exceptionThrown') exceptions.push(message.params.exceptionDetails.text); });

  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: `${baseUrl}/?version=photographic&theme=light` });
  await wait(2200);
  await send('Page.navigate', { url: `${baseUrl}/?version=photographic&theme=light` });
  for (let attempt = 0; attempt < 30; attempt += 1) {
    if (await evaluate('Boolean(document.querySelector(".photo-hero__index button[aria-selected=true]")?.textContent.trim())')) break;
    await wait(250);
  }
  const initial = await evaluate('document.querySelector(".photo-hero__index button[aria-selected=true]")?.textContent.trim()');
  await wait(8400);
  const autoplay = await evaluate('document.querySelector(".photo-hero__index button[aria-selected=true]")?.textContent.trim()');
  await evaluate('document.querySelector(".photo-hero__pause").click()');
  const pausedBefore = await evaluate('document.querySelector(".photo-hero__index button[aria-selected=true]")?.textContent.trim()');
  await wait(6800);
  const pausedAfter = await evaluate('document.querySelector(".photo-hero__index button[aria-selected=true]")?.textContent.trim()');
  const pauseState = await evaluate('({ pressed: document.querySelector(".photo-hero__pause")?.getAttribute("aria-pressed"), label: document.querySelector(".photo-hero__pause")?.textContent.trim() })');
  await evaluate('document.querySelector(".photo-hero__pause").click()');
  await evaluate('document.querySelectorAll(".photo-hero__index button")[4].click(); setTimeout(()=>document.querySelectorAll(".photo-hero__index button")[1].click(),90)');
  await wait(1800);
  const rapid = await evaluate('document.querySelector(".photo-hero__index button[aria-selected=true]")?.textContent.trim()');
  const desktop = await evaluate(`(() => ({
    scenes: document.querySelectorAll('[data-photo-scene]').length,
    brokenImages: [...document.images].filter((image) => image.complete && !image.naturalWidth).length,
    selectedTabs: document.querySelectorAll('.photo-hero__index button[aria-selected=true]').length,
    activeCopyVisible: Number(getComputedStyle(document.querySelector('[data-photo-scene][style*="visibility: inherit"] .photo-scene__copy') || document.querySelector('[data-photo-scene][style*="opacity: 1"] .photo-scene__copy') || document.querySelector('.photo-scene__copy')).opacity) > .85,
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
  }))()`);

  await send('Emulation.setDeviceMetricsOverride', { width: 320, height: 800, deviceScaleFactor: 1, mobile: true });
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  await send('Page.navigate', { url: `${baseUrl}/?version=photographic&theme=dark` });
  await wait(1800);
  const reducedBefore = await evaluate('document.querySelector(".photo-hero__index button[aria-selected=true]")?.textContent.trim()');
  await wait(6800);
  const reducedAfter = await evaluate('document.querySelector(".photo-hero__index button[aria-selected=true]")?.textContent.trim()');
  await evaluate('document.querySelectorAll(".photo-hero__index button")[3].click()');
  await wait(100);
  const reducedManual = await evaluate('document.querySelector(".photo-hero__index button[aria-selected=true]")?.textContent.trim()');
  const mobile = await evaluate(`(() => ({
    overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    heroHeight: Math.round(document.querySelector('.photo-hero').getBoundingClientRect().height),
    buttons: [...document.querySelectorAll('.photo-hero__index button')].every((button) => button.getBoundingClientRect().height >= 44),
    railVisible: Number(getComputedStyle(document.querySelector('.photo-hero__index-wrap')).opacity) > .85,
    actionsVisible: Number(getComputedStyle(document.querySelector('.photo-hero__actions')).opacity) > .85
  }))()`);

  const passed = /01Dawki River/.test(initial) && initial !== autoplay && pausedBefore === pausedAfter && pauseState.pressed === 'true' && /Play story/.test(pauseState.label) && /02Kaziranga/.test(rapid) && desktop.scenes === 5 && desktop.brokenImages === 0 && desktop.selectedTabs === 1 && desktop.activeCopyVisible && !desktop.overflow && reducedBefore === reducedAfter && /04Majuli Island/.test(reducedManual) && !mobile.overflow && mobile.buttons && mobile.railVisible && mobile.actionsVisible && exceptions.length === 0;
  console.log(JSON.stringify({ passed, initial, autoplay, pausedBefore, pausedAfter, pauseState, rapid, desktop, reducedBefore, reducedAfter, reducedManual, mobile, exceptions }, null, 2));
  socket.close();
  if (!passed) process.exitCode = 1;
} finally {
  browser.kill();
  await wait(250);
  try { rmSync(profile, { recursive: true, force: true, maxRetries: 3 }); } catch {}
}
