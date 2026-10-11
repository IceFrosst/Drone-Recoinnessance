// Record the REAL simulator (heatmap.html) running one campaign in Film mode,
// driven deterministically frame-by-frame so it renders to a clean looping MP4.
const pkg = require('/opt/node-tools/node_modules/playwright/index.js');
const { chromium } = pkg;
const path = require('path');

const HTML = 'file://' + path.resolve('/home/user/Drone-Recoinnessance/heatmap.html');
const OUT = '/tmp/claude-0/vid/frames2';
const W = 1920, H = 1080, FPS = 30;
const NFLIGHTS = 7;                 // demo campaign flight count (default plan is 4; +3 = 7)

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--force-color-profile=srgb', '--font-render-hinting=none']
  });
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.error('PAGEERR', e.message));
  await page.goto(HTML, { waitUntil: 'load' });
  await page.waitForFunction(() => typeof window.enterFilm === 'function' && typeof window.draw === 'function');
  await page.evaluate(() => document.fonts && document.fonts.ready);

  // Enter Film mode with the curated seed at the chosen flight count, then take full manual control.
  await page.evaluate((nf) => {
    window.requestAnimationFrame = () => 0;   // stop the page's own loop so __cap controls every frame
    state.nFlights = nf;                       // add flights to the demo before the campaign is built
    enterFilm('GOLF77');
    state.showPaths = true;                    // show the flight trails building as the drone records
    state.truth = false;                       // don't reveal real positions — the pitch is that we FOUND them
    for (const id of ['filmRun', 'filmReplay', 'filmExit']) { const e = document.getElementById(id); if (e) e.style.display = 'none'; }
    const f = document.createElement('div'); f.id = 'capfade';
    f.style.cssText = 'position:fixed;inset:0;background:#08111e;z-index:999;pointer-events:none;opacity:0';
    document.body.appendChild(f);
    window.__cap = (s) => {
      state.filmPhase = s.phase; state.filmProg = s.prog; state.filterStage = s.stage;
      state.t = s.t;
      updateFilmOverlay(); updateTypeHud();
      draw(s.now);
      document.getElementById('capfade').style.opacity = String(s.fade);
    };
  }, NFLIGHTS);
  const info = await page.evaluate(() => ({ total: timeline.total, nF: camp.flights.length }));
  console.log('timeline total', info.total, 'flights', info.nF);

  // ---- frame plan (faster: brisker flight sweep + punchier reveal) ----
  const FLY = 168, HOLD_RAW = 12, STAGES = 5, PER_STAGE = 12, BLOOM = 45, HOLD_DONE = 24;
  const FILTER = STAGES * PER_STAGE;
  const N = FLY + HOLD_RAW + FILTER + BLOOM + HOLD_DONE;
  const FADE = 12;
  const frames = [];
  for (let i = 0; i < N; i++) {
    let phase = 'raw', prog = 0, stage = 0, t = info.total;
    if (i < FLY) {
      t = (i / (FLY - 1)) * info.total; phase = 'raw'; prog = 0; stage = 0;
    } else if (i < FLY + HOLD_RAW) {
      t = info.total; phase = 'raw';
    } else if (i < FLY + HOLD_RAW + FILTER) {
      const k = i - (FLY + HOLD_RAW);
      phase = 'running'; stage = Math.min(STAGES, Math.floor(k / PER_STAGE) + 1); prog = 0; t = info.total;
    } else if (i < FLY + HOLD_RAW + FILTER + BLOOM) {
      const k = i - (FLY + HOLD_RAW + FILTER);
      phase = 'running'; stage = STAGES; prog = k / (BLOOM - 1); t = info.total;
    } else {
      phase = 'done'; stage = STAGES; prog = 1; t = info.total;
    }
    let fade = 0;
    if (i < FADE) fade = 1 - i / FADE;
    else if (i >= N - FADE) fade = (i - (N - FADE) + 1) / FADE;
    frames.push({ t, phase, prog, stage, fade, now: i / FPS * 1000 });
  }

  for (let i = 0; i < N; i++) {
    await page.evaluate((s) => window.__cap(s), frames[i]);
    await page.screenshot({ path: path.join(OUT, String(i).padStart(4, '0') + '.png'), clip: { x: 0, y: 0, width: W, height: H } });
  }
  console.log('captured', N, 'frames (~' + (N / FPS).toFixed(1) + 's)');
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
