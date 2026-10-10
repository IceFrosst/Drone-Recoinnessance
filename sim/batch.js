#!/usr/bin/env node
// Parallel A/B/C experiment runner for the Heat-Map Recon model.
//
//   node sim/batch.js sim/experiments/<name>.json [--seeds N] [--workers 4] [--quick]
//
// An experiment is a set of variants (A, B, C, ...) flown on the SAME seeds and altitudes, so every
// comparison is paired: each map is its own control. One "simulation" = one full multi-flight campaign.
// Output: results/<name>.json (every run) and results/<name>.md (summary table), and the running
// simulation count in results/ledger.json.
'use strict';
const fs = require('fs');
const path = require('path');
const os = require('os');
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

const ROOT = path.join(__dirname, '..');

/* ------------------------------------------------------------------ worker */
if (!isMainThread) {
  const { loadEngine, defaultCfg } = require('./engine');
  const E = loadEngine(workerData.html);
  const worlds = new Map();
  const worldFor = (seed, wo) => {
    const key = seed + '|' + JSON.stringify(wo);
    if (!worlds.has(key)) { if (worlds.size > 2) worlds.delete(worlds.keys().next().value); worlds.set(key, E.genWorld(seed, wo.nEmit || 6, wo)); }
    return worlds.get(key);
  };
  parentPort.on('message', (job) => {
    if (job === 'exit') process.exit(0);
    const t0 = Date.now();
    let out;
    try {
      const W = worldFor(job.seed, job.worldOpts);
      const cfg = defaultCfg(Object.assign({ finalOnly: true }, job.cfg));
      const c = E.runCampaign(W, cfg);
      out = { ok: true, metrics: metricsOf(W, c, job), ms: Date.now() - t0 };
    } catch (e) { out = { ok: false, err: String(e && e.stack || e), ms: Date.now() - t0 }; }
    parentPort.postMessage(Object.assign({ id: job.id }, out));
  });
  function metricsOf(W, c, job) {
    const last = c.perFlight[c.perFlight.length - 1].report;
    const types = ['ctrl', 'jam', 'c2', 'relay'];
    const m = { seed: job.seed, variant: job.variant, alt: job.cfg.altM, byType: {}, bursts: c.summary.bursts, extra: c.summary.extra || null };
    for (const ty of types) {
      const targets = W.emitters.filter(e => e.type === ty && !e.decoy).length;
      const rows = last.filter(r => r.type === ty);
      const loc = rows.filter(r => r.located);
      const rep = rows.filter(r => r.reportable && r.truth);
      const errs = loc.map(r => r.err).filter(isFinite);
      m.byType[ty] = {
        targets,
        located: loc.length,
        reportable: rep.length,
        inside: rep.filter(r => Math.hypot(r.pk.x - r.truth.x, r.pk.y - r.truth.y) <= r.el.a).length,
        hit500: loc.filter(r => r.err <= 500).length,          // pinned within 500 m: an actionable fix
        wrong: loc.filter(r => !(r.err <= 1500)).length,      // "located" but >1.5 km off (or on no live emitter): a strike that misses
        ghosts: rows.filter(r => r.ghost && !r.located).length,
        errs,
        semi: loc.map(r => r.el.a),
      };
    }
    // false tracks: located fixes on something that is not a live target (spurs, decoys, relays mistaken for operators)
    m.falseLoc = last.filter(r => r.located && r.falseTrack).length;
    m.decoyLoc = last.filter(r => r.located && r.decoy).length;
    return m;
  }
  return;
}

/* ------------------------------------------------------------------ main */
const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : d; };
const flag = k => args.includes('--' + k);
const specPath = args.find(a => !a.startsWith('--') && (a.endsWith('.json') || a.endsWith('.js')));
if (!specPath) { console.error('usage: node sim/batch.js <experiment.json> [--seeds N] [--workers N]'); process.exit(1); }
const spec = specPath.endsWith('.js') ? require(path.resolve(specPath)) : JSON.parse(fs.readFileSync(specPath, 'utf8'));
const nSeeds = +(opt('seeds', spec.nSeeds || 12));
const seedBase = spec.seedBase || 'S';
const seeds = spec.seeds || Array.from({ length: nSeeds }, (_, i) => seedBase + String(i + 1).padStart(3, '0'));
const alts = spec.alts || [1000, 2000, 3000];
const nWorkers = +(opt('workers', Math.max(1, os.cpus().length)));
const worldOpts = Object.assign({ nEmit: 6, c2: 2, relay: 2 }, spec.worldOpts || {});
const html = spec.html ? path.resolve(ROOT, spec.html) : path.join(ROOT, 'heatmap.html');

// job list, grouped by seed so a worker builds each world once
const groups = [];
let id = 0;
for (const seed of seeds) {
  const g = [];
  for (const alt of alts) for (const v of spec.variants) {
    const wo = Object.assign({}, worldOpts, v.worldOpts || {});
    g.push({ id: id++, seed, variant: v.label, worldOpts: wo, cfg: Object.assign({}, spec.base || {}, v.cfg || {}, { altM: alt }) });
  }
  groups.push(g);
}
const total = id;
console.log(`[batch] ${spec.name}: ${spec.variants.length} variants × ${seeds.length} seeds × ${alts.length} altitudes = ${total} campaigns on ${nWorkers} workers`);

const results = new Array(total);
let done = 0, failed = 0;
const t0 = Date.now();
function runAll() {
  return new Promise((resolve) => {
    let gi = 0, live = 0;
    const startWorker = () => {
      const w = new Worker(__filename, { workerData: { html } });
      live++;
      let queue = [];
      const feed = () => {
        if (!queue.length) { if (gi < groups.length) queue = groups[gi++].slice(); else { w.postMessage('exit'); return; } }
        w.postMessage(queue.shift());
      };
      w.on('message', (r) => {
        results[r.id] = r; done++; if (!r.ok) { failed++; if (failed < 4) console.error('[batch] run failed:', r.err); }
        if (done % Math.max(1, Math.round(total / 20)) === 0 || done === total) {
          const el = (Date.now() - t0) / 1000;
          console.log(`[batch] ${done}/${total}  ${el.toFixed(0)}s elapsed, ~${(el / done * (total - done)).toFixed(0)}s left`);
        }
        feed();
      });
      w.on('exit', () => { if (--live === 0) resolve(); });
      w.on('error', (e) => { console.error('[batch] worker error', e); });
      feed();
    };
    for (let i = 0; i < Math.min(nWorkers, groups.length); i++) startWorker();
  });
}

/* ------------------------------------------------------------------ stats */
const median = a => { a = a.filter(isFinite).slice().sort((x, y) => x - y); return a.length ? (a.length % 2 ? a[a.length >> 1] : (a[a.length / 2 - 1] + a[a.length / 2]) / 2) : NaN; };
function makeRng(seed) { let a = seed >>> 0; return () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function aggregate(runs, types) {
  const a = { runs: runs.length, targets: 0, located: 0, reportable: 0, inside: 0, hit500: 0, wrong: 0, ghosts: 0, errs: [], falseLoc: 0, decoyLoc: 0 };
  for (const r of runs) {
    for (const ty of types) {
      const b = r.metrics.byType[ty];
      a.targets += b.targets; a.located += b.located; a.reportable += b.reportable; a.inside += b.inside; a.hit500 += b.hit500; a.wrong += b.wrong; a.ghosts += b.ghosts; a.errs.push(...b.errs);
    }
    a.falseLoc += r.metrics.falseLoc || 0; a.decoyLoc += r.metrics.decoyLoc || 0;
  }
  a.locRate = a.located / Math.max(1, a.targets);
  a.hitRate = a.hit500 / Math.max(1, a.targets);
  a.insideRate = a.inside / Math.max(1, a.reportable);
  a.medErr = median(a.errs);
  a.wrongRate = a.wrong / Math.max(1, a.located);
  delete a.errs;
  return a;
}
// paired bootstrap over seeds×alts: CI of (variant - baseline) in hit rate
function pairedDelta(byKey, A, B, types, metric) {
  const keys = Object.keys(byKey).filter(k => byKey[k][A] && byKey[k][B]);
  const val = (r) => { let n = 0, d = 0; for (const ty of types) { const b = r.metrics.byType[ty]; n += metric === 'loc' ? b.located : b.hit500; d += b.targets; } return [n, d]; };
  const pairs = keys.map(k => { const [na, da] = val(byKey[k][A]), [nb, db] = val(byKey[k][B]); return [na, da, nb, db]; });
  const point = (ps) => { let na = 0, da = 0, nb = 0, db = 0; for (const p of ps) { na += p[0]; da += p[1]; nb += p[2]; db += p[3]; } return nb / Math.max(1, db) - na / Math.max(1, da); };
  const R = makeRng(12345), boots = [];
  for (let i = 0; i < 1000; i++) { const s = []; for (let j = 0; j < pairs.length; j++) s.push(pairs[Math.floor(R() * pairs.length)]); boots.push(point(s)); }
  boots.sort((x, y) => x - y);
  return { d: point(pairs), lo: boots[25], hi: boots[974] };
}

(async () => {
  await runAll();
  const el = (Date.now() - t0) / 1000;
  const ok = results.filter(r => r && r.ok);
  const typeSets = { all: ['ctrl', 'jam', 'c2', 'relay'], ctrl: ['ctrl'], jam: ['jam'], c2: ['c2'], relay: ['relay'] };
  const byVariant = {};
  for (const v of spec.variants) byVariant[v.label] = ok.filter(r => r.metrics.variant === v.label);
  const byKey = {};
  for (const r of ok) { const k = r.metrics.seed + '|' + r.metrics.alt; (byKey[k] = byKey[k] || {})[r.metrics.variant] = r; }
  const summary = {};
  for (const v of spec.variants) {
    summary[v.label] = {};
    for (const [tk, ts] of Object.entries(typeSets)) summary[v.label][tk] = aggregate(byVariant[v.label], ts);
  }
  const A = spec.variants[0].label;
  const deltas = {};
  for (const v of spec.variants.slice(1)) deltas[v.label] = { hitAll: pairedDelta(byKey, A, v.label, typeSets.all, 'hit'), locAll: pairedDelta(byKey, A, v.label, typeSets.all, 'loc'), hitCtrl: pairedDelta(byKey, A, v.label, typeSets.ctrl, 'hit') };

  const outName = spec.name + (flag('tag') ? '' : '');
  fs.mkdirSync(path.join(ROOT, 'results'), { recursive: true });
  const meta = { name: spec.name, title: spec.title || spec.name, description: spec.description || '', when: new Date().toISOString(), seconds: el, total, ok: ok.length, failed, seeds: seeds.length, alts, worldOpts, base: spec.base || {}, variants: spec.variants };
  fs.writeFileSync(path.join(ROOT, 'results', outName + '.json'), JSON.stringify({ meta, summary, deltas, runs: ok.map(r => r.metrics) }));

  // markdown summary
  const pc = x => isFinite(x) ? (100 * x).toFixed(0) + '%' : '–';
  const pm = x => isFinite(x) ? Math.round(x) + ' m' : '–';
  const sg = x => (x >= 0 ? '+' : '') + (100 * x).toFixed(1);
  let md = `### ${meta.title}\n\n${meta.description}\n\n`;
  md += `${total} campaigns (${spec.variants.length} variants × ${seeds.length} maps × ${alts.length} altitudes), ${el.toFixed(0)} s on ${nWorkers} cores. Paired: every variant flies the same maps.\n\n`;
  md += `| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |\n|---|---|---|---|---|---|---|---|---|---|\n`;
  for (const v of spec.variants) {
    const s = summary[v.label], a = s.all, c = s.ctrl, j = s.jam;
    md += `| **${v.label}** ${v.name ? '· ' + v.name : ''} | ${pc(a.hitRate)} (${a.hit500}/${a.targets}) | ${pc(a.locRate)} | ${pm(a.medErr)} | ${pc(a.insideRate)} | ${pc(a.wrongRate)} | ${pc(c.hitRate)} (${c.hit500}/${c.targets}) | ${pc(c.locRate)} | ${pc(j.hitRate)} | ${a.falseLoc + a.decoyLoc} |\n`;
  }
  if (spec.variants.length > 1) {
    md += `\nPaired difference vs **${A}** (percentage points, 95% bootstrap CI over maps):\n\n| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |\n|---|---|---|---|\n`;
    for (const v of spec.variants.slice(1)) { const d = deltas[v.label]; md += `| ${v.label} | ${sg(d.hitAll.d)} [${sg(d.hitAll.lo)}, ${sg(d.hitAll.hi)}] | ${sg(d.locAll.d)} [${sg(d.locAll.lo)}, ${sg(d.locAll.hi)}] | ${sg(d.hitCtrl.d)} [${sg(d.hitCtrl.lo)}, ${sg(d.hitCtrl.hi)}] |\n`; }
  }
  fs.writeFileSync(path.join(ROOT, 'results', outName + '.md'), md);
  console.log('\n' + md);

  // ledger: running simulation count across all experiments
  const ledgerPath = path.join(ROOT, 'results', 'ledger.json');
  let ledger = { total: 0, experiments: [] };
  try { ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8')); } catch (e) {}
  ledger.experiments = ledger.experiments.filter(x => x.name !== spec.name);
  ledger.experiments.push({ name: spec.name, campaigns: ok.length, when: meta.when, seconds: Math.round(el) });
  ledger.total = ledger.experiments.reduce((a, x) => a + x.campaigns, 0);
  fs.writeFileSync(ledgerPath, JSON.stringify(ledger, null, 1));
  console.log(`[batch] ledger: ${ledger.total} campaigns across ${ledger.experiments.length} experiments`);
})();
