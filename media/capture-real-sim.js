// Record the REAL simulator (heatmap.html) running one campaign in Film mode,
// driven deterministically frame-by-frame so it renders to a clean looping MP4.
const pkg = require('/opt/node-tools/node_modules/playwright/index.js');
const { chromium } = pkg;
const path = require('path');

const HTML = 'file://' + path.resolve('/home/user/Drone-Recoinnessance/heatmap.html');
const OUT = '/tmp/claude-0/vid/frames2';
const W = 1920, H = 1080, FPS = 30;

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--force-color-profile=srgb', '--font-render-hinting=none']
  });
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.error('PAGEERR', e.message));
  await page.goto(HTML, { waitUntil: 'load' });
  await page.waitForFunction(() => typeof window.enterFilm === 'function' && typeof window.draw === 'function');
  // let fonts settle
  await page.evaluate(() => document.fonts && document.fonts.ready);

  // Enter Film mode with the curated seed, then take full manual control of the frame loop.
  await page.evaluate(() => {
    // stop the page's own animation loop so our __cap fully controls each frame
    window.requestAnimationFrame = () => 0;
    enterFilm('GOLF77');
    state.showPaths = true;      // show the flight trail building as the drone records
    state.truth = false;         // don't reveal real positions — the pitch is that we FOUND them
    // hide interactive film chrome for a clean auto-playing loop
    for (const id of ['filmRun', 'filmReplay', 'filmExit']) { const e = document.getElementById(id); if (e) e.style.display = 'none'; }
    // black fade overlay for a seamless loop (matches --ground)
    const f = document.createElement('div'); f.id = 'capfade';
    f.style.cssText = 'position:fixed;inset:0;background:#08111e;z-index:999;pointer-events:none;opacity:0';
    document.body.appendChild(f);
    // one capture step: set state, refresh overlay + HUD, redraw canvas
    window.__cap = (s) => {
      state.filmPhase = s.phase; state.filmProg = s.prog; state.filterStage = s.stage;
      state.t = s.t;
      updateFilmOverlay(); updateTypeHud();
      draw(s.now);
      document.getElementById('capfade').style.opacity = String(s.fade);
    };
    return { total: timeline.total, nF: camp.flights.length };
  });
  const info = await page.evaluate(() => ({ total: timeline.total, nF: camp.flights.length }));
  console.log('timeline total', info.total, 'flights', info.nF);

  // ---- build the frame plan ----
  const FLY = 195, HOLD_RAW = 18, STAGES = 5, PER_STAGE = 15, BLOOM = 54, HOLD_DONE = 33;
  const FILTER = STAGES * PER_STAGE;
  const N = FLY + HOLD_RAW + FILTER + BLOOM + HOLD_DONE;
  const FADE = 12;                              // fade in/out length (frames)
  const frames = [];
  for (let i = 0; i < N; i++) {
    let phase = 'raw', prog = 0, stage = 0, t = info.total;
    if (i < FLY) {                              // sweep the whole campaign replay (fly + process + gaps)
      t = (i / (FLY - 1)) * info.total; phase = 'raw'; prog = 0; stage = 0;
    } else if (i < FLY + HOLD_RAW) {            // hold on the raw, undifferentiated heat
      t = info.total; phase = 'raw';
    } else if (i < FLY + HOLD_RAW + FILTER) {   // run the 5 signature-filter stages
      const k = i - (FLY + HOLD_RAW);
      phase = 'running'; stage = Math.min(STAGES, Math.floor(k / PER_STAGE) + 1); prog = 0; t = info.total;
    } else if (i < FLY + HOLD_RAW + FILTER + BLOOM) {  // classified bloom: colours + located fixes emerge
      const k = i - (FLY + HOLD_RAW + FILTER);
      phase = 'running'; stage = STAGES; prog = k / (BLOOM - 1); t = info.total;
    } else {                                    // hold on the classified result
      phase = 'done'; stage = STAGES; prog = 1; t = info.total;
    }
    // seamless-loop fade (to --ground) at both ends
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
