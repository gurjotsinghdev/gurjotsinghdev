/* Captures a homepage screenshot per project into /img/projects.
   node pages/shots.js

   Chrome's --screenshot flag only emits PNG, and a photographic homepage
   lands around a megabyte that way, which is not something to put on a site
   that sells page speed. So this drives Chrome over the DevTools Protocol
   instead and asks for JPEG. No dependencies: Node 22+ has a global
   WebSocket, and CDP's target list is plain HTTP. */

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9222;
const W = 1200, H = 900;          /* the card art window is close to 1.96:1,
                                     so shoot that rather than cropping a 4:3 */
const QUALITY = 72;
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';

const SITES = [
  ['nero-tondo',          'https://nerotondo.com'],
  ['dhaliwals-lounge',    'https://dhaliwalslounge.com'],
  ['photography-academy', 'https://photographyacademy.com'],
  ['hitech-advisors',     'https://hitechadvisors.com']
];

const OUT = path.join(__dirname, '..', 'img', 'projects');
const wait = ms => new Promise(r => setTimeout(r, ms));

async function ready() {
  for (let i = 0; i < 60; i++) {
    try { const r = await fetch(`http://127.0.0.1:${PORT}/json/version`); if (r.ok) return true; }
    catch (e) {}
    await wait(300);
  }
  throw new Error('Chrome never opened its debugging port');
}

/* a minimal CDP client: send a command, resolve on the matching id */
function connect(url) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);
    let id = 0;
    const pending = new Map();
    const events = new Map();
    ws.addEventListener('message', ev => {
      const m = JSON.parse(ev.data);
      if (m.id && pending.has(m.id)) {
        const { res, rej } = pending.get(m.id);
        pending.delete(m.id);
        m.error ? rej(new Error(m.error.message)) : res(m.result);
      } else if (m.method && events.has(m.method)) {
        events.get(m.method)();
        events.delete(m.method);
      }
    });
    ws.addEventListener('error', reject);
    ws.addEventListener('open', () => resolve({
      send(method, params) {
        return new Promise((res, rej) => { pending.set(++id, { res, rej }); ws.send(JSON.stringify({ id, method, params: params || {} })); });
      },
      once(method, ms) {
        return new Promise(res => {
          const t = setTimeout(res, ms);
          events.set(method, () => { clearTimeout(t); res(); });
        });
      },
      close() { ws.close(); }
    }));
  });
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const chrome = spawn(CHROME, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--mute-audio',
    '--no-first-run', '--no-default-browser-check',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=C:/Users/GurjotXP/AppData/Local/Temp/claude/shotprofile'
  ], { stdio: 'ignore' });

  try {
    await ready();
    for (const [slug, url] of SITES) {
      const t = await (await fetch(`http://127.0.0.1:${PORT}/json/new?about:blank`, { method: 'PUT' })).json();
      const cdp = await connect(t.webSocketDebuggerUrl);
      await cdp.send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false });
      /* headless Chrome advertises itself in the UA and Cloudflare answers
         with an interstitial, which is what a naive capture photographs */
      await cdp.send(String.fromCharCode(69)+"mulation.setUserAgentOverride", { userAgent: UA, acceptLanguage: "en-CA,en" });
      await cdp.send('Page.enable');
      await cdp.send('Page.navigate', { url });
      await cdp.once('Page.loadEventFired', 25000);
      await wait(3500);                       /* let hero animations settle */
      const shot = await cdp.send('Page.captureScreenshot', {
        format: 'jpeg', quality: QUALITY,
        clip: { x: 0, y: 0, width: W, height: H, scale: 1 },
        captureBeyondViewport: true
      });
      /* refuse to save a bot wall or an error page as if it were the site */
      const probe = await cdp.send("Runtime.evaluate", { expression: "document.title + String.fromCharCode(124) + document.body.innerText.slice(0,400)", returnByValue: true });
      const text = String((probe.result && probe.result.value) || "");
      if (/checking your browser|just a moment|attention required|verify you are human|enable javascript/i.test(text))
        throw new Error(slug + ": got an interstitial, not the site -- " + text.slice(0, 90));
      const file = path.join(OUT, slug + '.jpg');
      fs.writeFileSync(file, Buffer.from(shot.data, 'base64'));
      console.log(slug.padEnd(22) + (fs.statSync(file).size / 1024).toFixed(0).padStart(5) + ' KB');
      cdp.close();
      await fetch(`http://127.0.0.1:${PORT}/json/close/${t.id}`);
    }
  } finally {
    chrome.kill();
  }
})().catch(e => { console.error('FAILED: ' + e.message); process.exit(1); });
