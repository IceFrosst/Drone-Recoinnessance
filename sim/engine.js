// Headless loader for the Heat-Map Recon model.
// heatmap.html stays the single source of truth (it must remain one self-contained file for
// static hosting), so this extracts the model half of its <script> — everything above the
// "HEAT-MAP UI" marker — and runs it in a Node vm context with tiny DOM stubs.
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function loadEngine(htmlPath) {
  htmlPath = htmlPath || path.join(__dirname, '..', 'heatmap.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  const s0 = html.indexOf('<script>') + '<script>'.length;
  const s1 = html.indexOf('/* ===================================================================== HEAT-MAP UI */');
  if (s0 < 8 || s1 < 0) throw new Error('could not find the model section in ' + htmlPath);
  let code = html.slice(s0, s1);
  const exportsList = ['genWorld', 'runCampaign', 'simulate', 'solveFix', 'PLANS', 'MAP_W', 'MAP_H', 'HVT', 'TYPE_NAME'];
  // optional exports (newer versions of the model)
  const optional = ['FRONTEND', 'JAMMER', 'frontEndOf', 'EW', 'THREATS', 'cascade', 'MODEL_VERSION'];
  code += '\n;globalThis.__E = {' + exportsList.join(',') + '};\n';
  for (const o of optional) code += `try { globalThis.__E.${o} = ${o}; } catch (e) {}\n`;
  const ctx = {
    console, Math, Date, JSON, Set, Map, Float32Array, Float64Array, Uint8Array, Uint16Array, Int32Array, Array, Object, Number, String, Infinity, NaN, isFinite, parseFloat, parseInt,
    document: { documentElement: {}, createElement: () => ({ getContext: () => ({}) }), getElementById: () => null },
    getComputedStyle: () => ({ getPropertyValue: () => '#000000' }),
    ImageData: function () {},
  };
  ctx.window = { matchMedia: () => ({ matches: false }) };
  ctx.globalThis = ctx;
  vm.createContext(ctx);
  vm.runInContext(code, ctx, { filename: 'heatmap-model.js' });
  return ctx.__E;
}

// The UI's default configuration (cfg() in heatmap.html), so headless runs match the page.
function defaultCfg(over) {
  return Object.assign({ refl: true, realism: true, attDeg: 2.5, noise: 2, beam: 40, density: 150, margin: 4, convTolM: 4000,
    moveP: 0.35, nFlights: 4, rx: 'bladerf', method: 'both', plan: 'grid', planning: 'fixed', memory: 'all', omni: false, altM: 2000,
    frontEnd: 'none', nulling: false, excision: false, cyclo: false, sei: false }, over || {});
}

module.exports = { loadEngine, defaultCfg };
