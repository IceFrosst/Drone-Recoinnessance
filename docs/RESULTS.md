# Experiment results

Auto-generated from `results/*.md` by `sim/makedocs.js`. Total campaigns run across all experiments: **16,362** (ledger: `results/ledger.json`). Every table is paired — all variants fly the same maps and altitudes. All numbers are modelled, not field data.

## Index

- **e00-baseline** — E00 · Baseline (v1 model, before any change)
- **e01-merged-baseline** — E01 · Baseline with the jammer-interference model (v1.2)
- **e02-frontend** — E02 · RF front end — does a preselect filter / LNA help, and does an LNA cost us?
- **e03-countermeasures** — E03 · Software countermeasures — nulling, excision, cyclostationary detection
- **e04-nulling-limit** — E04 · The two-channel null limit — one jammer vs two
- **e05-headline** — E05 · Headline — the payload as handed over vs fully equipped
- **e06-modern-battlefield** — E06 · Modern battlefield — fibre FPV, low-rate links, decoys
- **e07-validation** — E07 · Headline validation across 100 maps
- **e08-ablation-modern** — E08 · Countermeasure ablation on the modern battlefield
- **e09-jammer-waveforms** — E09 · Jammer waveforms vs time/frequency excision
- **e10-modern-validation** — E10 · Modern-battlefield headline across 100 maps
- **e11-density-robustness** — E11 · Robustness to background-spectrum density
- **e12-sei** — E12 · Specific emitter ID (hardware fingerprint) vs retuning
- **e13-gnss-spoof** — E13 · GNSS spoofing — the confidently-wrong failure
- **e14-accuracy-ladder** — E14 · The accuracy ladder — each lever's cumulative contribution
- **e15-ladder-modern** — E15 · The accuracy ladder on the modern threat world
- **e16-flights-sweep** — E16 · How many flights does the recommended payload need?
- **e17-memory-fix** — E17 · Does memory-fading fix the stale-data problem?
- **e18-mobility-sweep** — E18 · Robustness to enemy mobility
- **e19-plan-recommended** — E19 · Best flight plan for the recommended payload
- **e20-receiver-fullstack** — E20 · Receiver choice once everything else is optimized
- **e21-multijammer-fullstack** — E21 · Multi-jammer robustness with the full stack
- **e22-headline-highN** — E22 · Definitive modern-world headline (high N)
- **e23-headline-clean-highN** — E23 · Definitive clean-world headline (high N)
- **e24-ladder-bestops** — E24 · Accuracy ladder under best operational settings
- **e25-frontend-highN** — E25 · Front end (high N)
- **e26-countermeasures-highN** — E26 · Countermeasures (high N)

### E00 · Baseline (v1 model, before any change)

The simulator exactly as it was at the start of this work (commit 3e3a535), measured headless. Every later experiment is compared against these numbers.

180 campaigns (5 variants × 12 maps × 3 altitudes), 117 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bladeRF · combined · grid (headline) | 48% (146/306) | 73% | 343 m | 89% | 13% | 19% (24/126) | 58% | 64% | 0 |
| **B** · bladeRF · bearings · grid | 54% (166/306) | 76% | 314 m | 93% | 9% | 29% (37/126) | 63% | 64% | 0 |
| **C** · bladeRF · combined · multi-angle | 49% (151/306) | 69% | 287 m | 90% | 14% | 19% (24/126) | 47% | 61% | 0 |
| **D** · coherent array · grid | 42% (128/306) | 70% | 370 m | 90% | 10% | 22% (28/126) | 48% | 61% | 0 |
| **E** · bladeRF + array fused · grid | 63% (192/306) | 77% | 201 m | 90% | 8% | 38% (48/126) | 66% | 67% | 0 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +6.5 [+3.3, +9.9] | +2.9 [+0.3, +5.8] | +10.3 [+4.8, +16.7] |
| C | +1.6 [-3.7, +7.1] | -3.9 [-7.6, -0.6] | +0.0 [-9.1, +7.9] |
| D | -5.9 [-9.5, -2.3] | -2.9 [-5.6, -0.3] | +3.2 [-4.0, +10.2] |
| E | +15.0 [+10.7, +19.4] | +4.2 [+1.3, +7.3] | +19.0 [+11.9, +27.1] |


---

### E01 · Baseline with the jammer-interference model (v1.2)

After merging the parallel session's jammer model (band blackout, bearing bias, front-end spurs). F switches those jammer effects off to show what they cost. This is the reference for every later experiment.

216 campaigns (6 variants × 12 maps × 3 altitudes), 152 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bladeRF · combined · grid (headline) | 50% (154/306) | 73% | 281 m | 92% | 11% | 23% (29/126) | 56% | 67% | 13 |
| **B** · bladeRF · bearings · grid | 57% (174/306) | 77% | 260 m | 92% | 9% | 35% (44/126) | 67% | 67% | 14 |
| **C** · bladeRF · combined · multi-angle | 50% (152/306) | 70% | 270 m | 90% | 11% | 19% (24/126) | 48% | 67% | 15 |
| **D** · coherent array · grid | 42% (128/306) | 71% | 401 m | 92% | 11% | 22% (28/126) | 50% | 64% | 16 |
| **E** · bladeRF + array fused · grid | 60% (184/306) | 77% | 235 m | 92% | 8% | 39% (49/126) | 66% | 67% | 16 |
| **F** · A with jammer effects off | 48% (146/306) | 73% | 343 m | 89% | 13% | 19% (24/126) | 58% | 64% | 0 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +6.5 [+2.3, +11.0] | +4.2 [+1.6, +7.0] | +11.9 [+4.8, +19.5] |
| C | -0.7 [-5.3, +3.9] | -3.3 [-6.6, +0.0] | -4.0 [-11.3, +3.9] |
| D | -8.5 [-13.8, -3.0] | -2.3 [-4.9, +0.3] | -0.8 [-9.8, +7.9] |
| E | +9.8 [+4.5, +15.0] | +4.2 [+1.3, +7.4] | +15.9 [+7.1, +24.0] |
| F | -2.6 [-8.1, +2.3] | +0.0 [-1.9, +1.9] | -4.0 [-10.7, +1.7] |


---

### E02 · RF front end — does a preselect filter / LNA help, and does an LNA cost us?

bladeRF · combined · crossing grid, Frontline RF on (jammers active). Each variant is the same payload with a different analog front end. This isolates the hardware: A bare SDR, B an LNA only, C a preselect filter only, D filter→LNA (the recommended build), E LNA→filter (wrong order).

300 campaigns (5 variants × 20 maps × 3 altitudes), 236 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bare SDR | 51% (255/504) | 71% | 300 m | 89% | 10% | 23% (46/204) | 59% | 52% | 13 |
| **B** · LNA only | 54% (274/504) | 74% | 281 m | 87% | 14% | 30% (61/204) | 69% | 55% | 18 |
| **C** · preselect filter only | 49% (249/504) | 70% | 268 m | 89% | 11% | 22% (45/204) | 56% | 55% | 0 |
| **D** · filter → LNA (recommended) | 53% (268/504) | 75% | 288 m | 87% | 13% | 27% (56/204) | 68% | 53% | 0 |
| **E** · LNA → filter (wrong order) | 51% (259/504) | 73% | 290 m | 87% | 12% | 26% (53/204) | 66% | 55% | 22 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +3.8 [+1.2, +6.5] | +3.6 [+1.2, +6.0] | +7.4 [+2.4, +12.4] |
| C | -1.2 [-3.8, +1.4] | -0.4 [-2.6, +1.6] | -0.5 [-5.4, +4.4] |
| D | +2.6 [-0.4, +5.8] | +4.4 [+2.4, +6.3] | +4.9 [+0.0, +10.6] |
| E | +0.8 [-2.2, +3.6] | +2.4 [+0.0, +4.9] | +3.4 [-1.0, +8.3] |


---

### E03 · Software countermeasures — nulling, excision, cyclostationary detection

bladeRF · combined · crossing grid, Frontline RF on, with a preselect filter so spurs are already handled (isolates what the DSP adds on top of the hardware). Each variant adds one countermeasure, then all three. These are digital, after the ADC, so they recover co-channel signal and dig below the floor — they cannot undo front-end overload (that is the filter's job).

300 campaigns (5 variants × 20 maps × 3 altitudes), 221 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · filter only (no DSP) | 49% (249/504) | 70% | 268 m | 89% | 11% | 22% (45/204) | 56% | 55% | 0 |
| **B** · + adaptive nulling | 51% (259/504) | 70% | 248 m | 90% | 10% | 25% (52/204) | 57% | 55% | 0 |
| **C** · + time/freq excision | 50% (253/504) | 70% | 260 m | 90% | 12% | 23% (47/204) | 58% | 55% | 0 |
| **D** · + cyclostationary detection | 52% (262/504) | 76% | 320 m | 87% | 14% | 26% (53/204) | 73% | 55% | 0 |
| **E** · + all three | 51% (257/504) | 74% | 298 m | 87% | 13% | 23% (46/204) | 70% | 52% | 0 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +2.0 [-0.6, +4.6] | +0.0 [-1.4, +1.4] | +3.4 [-0.5, +7.4] |
| C | +0.8 [-1.0, +2.4] | +0.2 [-0.8, +1.2] | +1.0 [-2.0, +3.9] |
| D | +2.6 [+0.0, +5.3] | +5.8 [+3.0, +8.3] | +3.9 [-0.5, +8.4] |
| E | +1.6 [-1.2, +4.4] | +4.2 [+1.6, +6.7] | +0.5 [-4.9, +5.7] |


---

### E04 · The two-channel null limit — one jammer vs two

Adaptive nulling with Frontline RF on. A 2-channel bladeRF can steer ONE null; a 5-channel array can steer four. With a single jammer both cope; with two jammers in different bands the bladeRF can only null one, so the second still buries its co-band targets. The array (and the fused payload) keep nulling both.

240 campaigns (4 variants × 20 maps × 3 altitudes), 205 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bladeRF 2-ch · 1 jammer | 47% (271/573) | 68% | 267 m | 87% | 15% | 21% (56/273) | 55% | 65% | 0 |
| **B** · bladeRF 2-ch · 3 jammers | 53% (365/693) | 69% | 246 m | 90% | 10% | 18% (50/273) | 51% | 72% | 0 |
| **C** · array 5-ch · 3 jammers | 41% (283/693) | 60% | 338 m | 90% | 11% | 21% (57/273) | 47% | 36% | 0 |
| **D** · fused 5-ch · 3 jammers | 62% (433/693) | 76% | 199 m | 89% | 11% | 38% (105/273) | 70% | 73% | 0 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +5.4 [+1.5, +9.7] | +1.3 [-1.9, +4.6] | -2.2 [-8.1, +3.7] |
| C | -6.5 [-11.0, -2.3] | -7.8 [-11.5, -4.3] | +0.4 [-5.5, +5.2] |
| D | +15.2 [+11.0, +19.8] | +8.6 [+5.8, +11.7] | +17.9 [+11.6, +24.6] |


---

### E05 · Headline — the payload as handed over vs fully equipped

The single accuracy number. Frontline RF on, crossing grid, same 24 maps. A is the bladeRF exactly as the project started (bare SDR, no countermeasures). B adds the recommended analog front end (filter→LNA). C adds the three software countermeasures. D is the fused bladeRF+Kraken payload with everything on — the full recommendation.

288 campaigns (4 variants × 24 maps × 3 altitudes), 214 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bare bladeRF (start of project) | 49% (297/606) | 68% | 300 m | 90% | 10% | 22% (53/246) | 55% | 51% | 16 |
| **B** · + filter→LNA front end | 52% (313/606) | 73% | 286 m | 87% | 13% | 26% (65/246) | 65% | 53% | 0 |
| **C** · + nulling + excision + cyclo | 52% (313/606) | 78% | 297 m | 87% | 15% | 29% (72/246) | 79% | 53% | 0 |
| **D** · fused payload, everything on | 66% (397/606) | 81% | 205 m | 90% | 11% | 51% (125/246) | 84% | 54% | 0 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +2.6 [-0.2, +5.7] | +4.6 [+2.8, +6.7] | +4.9 [+0.4, +9.6] |
| C | +2.6 [-0.5, +5.4] | +9.6 [+7.0, +12.3] | +7.7 [+2.9, +13.0] |
| D | +16.5 [+13.7, +19.4] | +12.4 [+9.3, +15.7] | +29.3 [+23.5, +34.9] |


---

### E06 · Modern battlefield — fibre FPV, low-rate links, decoys

The 2024-26 picture: ~30% of FPV operators on fibre (no RF), ~30% on long-range low-rate spread links (below an energy detector), and 2 decoy emitters per map. bladeRF · combined · crossing grid, Frontline RF on. A bare payload, B adds a filter→LNA front end, C adds the three DSP countermeasures, D is the fused payload with everything. Shows what the new tech costs (fibre ceiling, decoy false fixes) and what the countermeasures buy back (low-rate links via cyclostationary).

288 campaigns (4 variants × 24 maps × 3 altitudes), 260 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bare bladeRF | 45% (341/759) | 58% | 247 m | 93% | 8% | 8% (26/327) | 27% | 72% | 328 |
| **B** · + filter→LNA | 47% (354/759) | 64% | 279 m | 91% | 10% | 14% (46/327) | 40% | 73% | 288 |
| **C** · + nulling+excision+cyclo | 54% (410/759) | 72% | 269 m | 90% | 10% | 24% (80/327) | 59% | 73% | 288 |
| **D** · fused, everything on | 63% (475/759) | 75% | 203 m | 92% | 9% | 41% (135/327) | 65% | 73% | 288 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +1.7 [-0.5, +3.8] | +5.8 [+4.2, +7.4] | +6.1 [+3.4, +8.9] |
| C | +9.1 [+6.1, +11.9] | +13.6 [+11.6, +15.4] | +16.5 [+11.8, +21.2] |
| D | +17.7 [+14.4, +21.0] | +16.9 [+15.1, +18.6] | +33.3 [+28.3, +39.2] |


---

### E07 · Headline validation across 100 maps

The headline comparison again, but across 100 maps × 3 altitudes for a tight estimate. Clean target mix (no fibre/decoy), Frontline RF on, crossing grid.

900 campaigns (3 variants × 100 maps × 3 altitudes), 662 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bare bladeRF | 53% (1335/2505) | 73% | 277 m | 89% | 13% | 20% (203/1005) | 56% | 73% | 84 |
| **B** · filter→LNA + DSP | 57% (1419/2505) | 83% | 295 m | 87% | 15% | 27% (275/1005) | 82% | 72% | 0 |
| **C** · fused, everything on | 68% (1705/2505) | 85% | 204 m | 89% | 11% | 47% (477/1005) | 86% | 74% | 0 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +3.4 [+2.0, +4.8] | +10.1 [+8.9, +11.4] | +7.2 [+4.5, +9.8] |
| C | +14.8 [+13.1, +16.6] | +12.2 [+11.0, +13.4] | +27.3 [+24.1, +30.7] |


---

### E08 · Countermeasure ablation on the modern battlefield

On the 2024-26 threat world (fibre 30%, low-rate 30%, 2 decoys), with a filter→LNA front end fixed, turn on one DSP countermeasure at a time. Isolates what each buys when the hard new threats are present — cyclostationary should dominate because of the low-rate links.

360 campaigns (5 variants × 24 maps × 3 altitudes), 319 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · no DSP | 47% (354/759) | 64% | 279 m | 91% | 10% | 14% (46/327) | 40% | 73% | 288 |
| **B** · nulling | 49% (372/759) | 64% | 239 m | 91% | 9% | 15% (50/327) | 41% | 73% | 288 |
| **C** · excision | 47% (355/759) | 64% | 256 m | 91% | 10% | 14% (46/327) | 40% | 73% | 288 |
| **D** · cyclostationary | 52% (392/759) | 72% | 281 m | 90% | 11% | 24% (77/327) | 59% | 72% | 288 |
| **E** · all three | 54% (410/759) | 72% | 269 m | 90% | 10% | 24% (80/327) | 59% | 73% | 288 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +2.4 [+0.3, +4.7] | +0.4 [-1.1, +2.0] | +1.2 [-1.2, +3.6] |
| C | +0.1 [-1.2, +1.7] | +0.1 [-0.9, +1.3] | +0.0 [-2.2, +2.2] |
| D | +5.0 [+2.2, +7.5] | +7.8 [+5.5, +10.0] | +9.5 [+5.2, +13.7] |
| E | +7.4 [+4.8, +10.1] | +7.8 [+5.8, +10.0] | +10.4 [+6.4, +15.2] |


---

### E09 · Jammer waveforms vs time/frequency excision

Three worlds, each with every jammer forced to one waveform, flown with and without excision. Shows excision recovers a swept or pulsed jammer's gaps but does nothing against a barrage.

360 campaigns (6 variants × 20 maps × 3 altitudes), 276 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · barrage · no excision | 54% (272/504) | 74% | 284 m | 90% | 12% | 25% (52/204) | 61% | 80% | 0 |
| **B** · barrage · excision | 54% (272/504) | 74% | 284 m | 90% | 12% | 25% (52/204) | 61% | 80% | 0 |
| **C** · swept · no excision | 55% (278/504) | 73% | 267 m | 93% | 11% | 27% (56/204) | 59% | 78% | 0 |
| **D** · swept · excision | 55% (279/504) | 74% | 258 m | 92% | 12% | 25% (52/204) | 61% | 80% | 0 |
| **E** · pulsed · no excision | 55% (275/504) | 74% | 279 m | 92% | 11% | 26% (53/204) | 61% | 78% | 0 |
| **F** · pulsed · excision | 55% (279/504) | 74% | 258 m | 92% | 12% | 25% (52/204) | 61% | 80% | 0 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +0.0 [+0.0, +0.0] | +0.0 [+0.0, +0.0] | +0.0 [+0.0, +0.0] |
| C | +1.2 [-1.0, +3.4] | -0.6 [-2.0, +0.8] | +2.0 [-2.4, +6.4] |
| D | +1.4 [-0.2, +3.2] | +0.2 [-1.6, +1.8] | +0.0 [-3.4, +3.9] |
| E | +0.6 [-1.6, +2.8] | +0.2 [-1.0, +1.6] | +0.5 [-3.0, +3.9] |
| F | +1.4 [-0.2, +3.2] | +0.2 [-1.6, +1.8] | +0.0 [-3.4, +3.9] |


---

### E10 · Modern-battlefield headline across 100 maps

The modern-threat headline (fibre 30%, low-rate 30%, 2 decoys) across 100 maps × 3 altitudes. A bare bladeRF, B the equipped single bladeRF, C the fused payload with everything on.

900 campaigns (3 variants × 100 maps × 3 altitudes), 777 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bare bladeRF | 46% (1435/3144) | 60% | 251 m | 94% | 7% | 9% (127/1344) | 27% | 75% | 1336 |
| **B** · bladeRF + filter→LNA + DSP | 53% (1676/3144) | 72% | 274 m | 90% | 12% | 22% (294/1344) | 58% | 75% | 1200 |
| **C** · fused, everything on | 62% (1944/3144) | 75% | 206 m | 91% | 9% | 37% (491/1344) | 63% | 76% | 1200 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +7.7 [+6.3, +9.0] | +12.8 [+11.7, +13.9] | +12.4 [+10.2, +14.6] |
| C | +16.2 [+14.7, +17.5] | +15.5 [+14.4, +16.6] | +27.1 [+24.5, +29.7] |


---

### E11 · Robustness to background-spectrum density

Does a denser sector (more clutter the sorter must cut through) degrade the equipped payload? Fused payload, everything on, Frontline RF, across 120 maps × 3 altitudes, at three clutter levels.

1080 campaigns (3 variants × 120 maps × 3 altitudes), 661 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · light clutter (80) | 68% (2029/3000) | 85% | 202 m | 89% | 11% | 47% (568/1200) | 85% | 74% | 0 |
| **B** · typical clutter (150) | 68% (2046/3000) | 85% | 204 m | 89% | 11% | 48% (576/1200) | 85% | 74% | 0 |
| **C** · heavy clutter (300) | 68% (2045/3000) | 85% | 209 m | 89% | 11% | 49% (589/1200) | 85% | 73% | 0 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +0.6 [-0.1, +1.4] | +0.0 [-0.2, +0.2] | +0.7 [-0.8, +2.1] |
| C | +0.5 [-0.4, +1.5] | -0.2 [-0.5, +0.1] | +1.8 [+0.1, +3.4] |


---

### E12 · Specific emitter ID (hardware fingerprint) vs retuning

Frontline RF on with a high retune rate (operators change link settings between flights, breaking their tracks). SEI reads a hardware fingerprint that survives the settings change, so a retuned track re-links to its parent instead of resetting. Fused payload, everything on, across 40 maps × 3 altitudes.

240 campaigns (2 variants × 40 maps × 3 altitudes), 163 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · no SEI (retune breaks the track) | 79% (792/1008) | 86% | 186 m | 97% | 3% | 71% (291/408) | 85% | 73% | 0 |
| **B** · SEI re-links retuned tracks | 80% (809/1008) | 90% | 192 m | 94% | 6% | 75% (307/408) | 96% | 73% | 0 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +1.7 [+0.2, +3.3] | +4.6 [+3.3, +5.9] | +3.9 [+0.5, +7.6] |


---

### E13 · GNSS spoofing — the confidently-wrong failure

A spoofer induces a coherent false position (not random drift), so fixes taken in the belt are displaced with full confidence. Fused payload, everything on, 40 maps × 3 altitudes. A clean GNSS, B spoofed. Watch the ≤500 m hit rate collapse while the located count and 95%-ellipse calibration barely move — a tight ellipse is no defence against spoofing.

240 campaigns (2 variants × 40 maps × 3 altitudes), 162 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · clean GNSS | 69% (698/1008) | 90% | 209 m | 85% | 14% | 49% (199/408) | 94% | 72% | 0 |
| **B** · GNSS spoofed | 14% (143/1008) | 89% | 948 m | 82% | 17% | 12% (47/408) | 93% | 23% | 0 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | -55.1 [-58.9, -51.0] | -0.6 [-1.3, +0.2] | -37.3 [-43.0, -31.2] |


---

### E14 · The accuracy ladder — each lever's cumulative contribution

One table, the whole story. Starting from the bare bladeRF, add one capability at a time across 60 maps × 3 altitudes, Frontline RF on, crossing grid. Each row keeps everything from the row above.

1080 campaigns (6 variants × 60 maps × 3 altitudes), 727 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bare bladeRF | 53% (802/1509) | 73% | 284 m | 88% | 13% | 20% (120/609) | 56% | 71% | 48 |
| **B** · + preselect filter | 53% (796/1509) | 74% | 274 m | 89% | 13% | 22% (131/609) | 57% | 71% | 0 |
| **C** · + LNA (filter→LNA) | 56% (848/1509) | 79% | 285 m | 87% | 15% | 28% (168/609) | 70% | 71% | 0 |
| **D** · + nulling + excision | 57% (863/1509) | 78% | 270 m | 87% | 14% | 27% (167/609) | 69% | 71% | 0 |
| **E** · + cyclostationary + SEI | 57% (865/1509) | 88% | 306 m | 84% | 17% | 30% (182/609) | 92% | 71% | 0 |
| **F** · + fused KrakenSDR | 69% (1037/1509) | 90% | 208 m | 85% | 14% | 49% (299/609) | 96% | 71% | 0 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | -0.4 [-2.3, +1.5] | +0.6 [-0.5, +1.7] | +1.8 [-1.3, +4.9] |
| C | +3.0 [+1.3, +4.7] | +5.4 [+4.2, +6.7] | +7.9 [+5.1, +10.9] |
| D | +4.0 [+2.1, +5.9] | +5.1 [+3.9, +6.4] | +7.7 [+4.7, +10.8] |
| E | +4.2 [+2.0, +6.2] | +14.3 [+12.7, +15.9] | +10.2 [+5.9, +14.7] |
| F | +15.6 [+13.5, +17.8] | +16.3 [+14.7, +17.8] | +29.4 [+24.8, +34.4] |


---

### E15 · The accuracy ladder on the modern threat world

Same cumulative ladder as e14, but on the 2024-26 world (fibre 30%, low-rate 30%, 2 decoys). Does each lever still pay off when the hard new threats are present? 60 maps × 3 altitudes, Frontline RF on.

1080 campaigns (6 variants × 60 maps × 3 altitudes), 908 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bare bladeRF | 45% (853/1887) | 60% | 254 m | 93% | 8% | 9% (71/807) | 29% | 75% | 808 |
| **B** · + preselect filter | 49% (917/1887) | 60% | 230 m | 94% | 6% | 12% (99/807) | 29% | 75% | 714 |
| **C** · + LNA (filter→LNA) | 48% (911/1887) | 65% | 268 m | 91% | 10% | 15% (123/807) | 41% | 75% | 720 |
| **D** · + nulling + excision | 50% (941/1887) | 65% | 248 m | 91% | 10% | 15% (120/807) | 42% | 75% | 720 |
| **E** · + cyclostationary + SEI | 55% (1029/1887) | 77% | 283 m | 88% | 14% | 24% (192/807) | 69% | 75% | 720 |
| **F** · + fused KrakenSDR | 63% (1184/1887) | 80% | 206 m | 88% | 12% | 40% (326/807) | 74% | 76% | 720 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +3.4 [+2.0, +4.8] | +0.1 [-0.7, +0.9] | +3.5 [+1.6, +5.4] |
| C | +3.1 [+1.6, +4.5] | +5.1 [+4.0, +6.3] | +6.4 [+3.9, +9.0] |
| D | +4.7 [+3.0, +6.4] | +5.5 [+4.2, +6.6] | +6.1 [+3.8, +8.4] |
| E | +9.3 [+7.4, +11.3] | +17.1 [+15.4, +18.6] | +15.0 [+11.8, +18.1] |
| F | +17.5 [+15.5, +19.6] | +19.6 [+18.0, +21.1] | +31.6 [+27.9, +35.4] |


---

### E16 · How many flights does the recommended payload need?

The fused, fully-equipped payload flown with 2, 4, 6, 8 flights (extra passes on fresh headings) across 40 maps × 3 altitudes, modern threat world. The operational question: how fast does accuracy build with sorties?

480 campaigns (4 variants × 40 maps × 3 altitudes), 396 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · 2 flights | 65% (816/1260) | 79% | 214 m | 94% | 8% | 45% (241/540) | 72% | 77% | 480 |
| **B** · 4 flights | 64% (805/1260) | 80% | 200 m | 87% | 13% | 42% (226/540) | 75% | 77% | 480 |
| **C** · 6 flights | 57% (718/1260) | 79% | 224 m | 81% | 19% | 26% (140/540) | 73% | 77% | 480 |
| **D** · 8 flights | 57% (712/1260) | 79% | 223 m | 79% | 22% | 24% (128/540) | 73% | 78% | 480 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | -0.9 [-2.9, +1.2] | +1.1 [+0.0, +2.2] | -2.8 [-6.8, +1.3] |
| C | -7.8 [-10.0, -5.7] | +0.4 [-0.7, +1.4] | -18.7 [-23.4, -14.3] |
| D | -8.3 [-10.4, -6.1] | +0.3 [-0.8, +1.5] | -20.9 [-25.8, -16.2] |


---

### E17 · Does memory-fading fix the stale-data problem?

Follow-up to e16: the recommended payload flown 8 flights against a relocating/retuning enemy, with the three memory policies. If fading old recordings recovers accuracy, that is the operational answer to 'more flights hurt'.

360 campaigns (3 variants × 40 maps × 3 altitudes), 391 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · keep all | 57% (712/1260) | 79% | 223 m | 79% | 22% | 24% (128/540) | 73% | 78% | 480 |
| **B** · fade ½ per flight | 61% (773/1260) | 79% | 239 m | 94% | 6% | 42% (226/540) | 72% | 77% | 480 |
| **C** · last flight only | 64% (809/1260) | 75% | 221 m | 100% | 1% | 50% (271/540) | 63% | 76% | 480 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +4.8 [+2.9, +7.1] | -0.4 [-1.0, +0.2] | +18.1 [+14.5, +22.1] |
| C | +7.7 [+5.5, +10.0] | -4.2 [-5.5, -3.0] | +26.5 [+22.2, +31.0] |


---

### E18 · Robustness to enemy mobility

The recommended payload (fused, everything on, memory=fade — the good setting from e17) against teams that relocate between flights at increasing rates, modern threat world, 40 maps × 3 altitudes. How does accuracy hold as the enemy moves more?

480 campaigns (4 variants × 40 maps × 3 altitudes), 345 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · static enemy (0%) | 74% (927/1260) | 80% | 197 m | 100% | 0% | 65% (353/540) | 74% | 77% | 480 |
| **B** · relocate 20%/flight | 70% (881/1260) | 80% | 216 m | 98% | 3% | 58% (314/540) | 74% | 77% | 480 |
| **C** · relocate 40%/flight | 65% (824/1260) | 79% | 234 m | 94% | 7% | 47% (252/540) | 73% | 76% | 480 |
| **D** · relocate 70%/flight | 61% (771/1260) | 79% | 243 m | 92% | 10% | 38% (205/540) | 73% | 76% | 480 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | -3.7 [-5.4, -1.8] | -0.1 [-0.5, +0.3] | -7.2 [-10.4, -3.7] |
| C | -8.2 [-10.3, -6.0] | -0.6 [-1.3, +0.1] | -18.7 [-23.1, -14.3] |
| D | -12.4 [-14.4, -10.2] | -0.5 [-1.1, +0.2] | -27.4 [-31.7, -23.1] |


---

### E19 · Best flight plan for the recommended payload

The fused, fully-equipped payload (memory=fade) flown on each flight plan — single pass, parallel lines, crossing grid, multi-angle — on the modern threat world, 40 maps × 3 altitudes. Which routing pattern gets the most operators per sortie now that the receiver is good?

480 campaigns (4 variants × 40 maps × 3 altitudes), 340 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · single pass | 62% (787/1260) | 78% | 222 m | 95% | 7% | 43% (232/540) | 69% | 77% | 480 |
| **B** · parallel lines | 66% (837/1260) | 79% | 218 m | 97% | 4% | 49% (265/540) | 73% | 76% | 480 |
| **C** · crossing grid | 67% (850/1260) | 79% | 226 m | 95% | 6% | 51% (277/540) | 73% | 77% | 480 |
| **D** · multi-angle | 68% (853/1260) | 80% | 213 m | 96% | 4% | 53% (285/540) | 74% | 77% | 480 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +4.0 [+1.8, +6.2] | +1.4 [+0.4, +2.4] | +6.1 [+2.2, +10.0] |
| C | +5.0 [+3.1, +7.0] | +1.6 [+0.9, +2.3] | +8.3 [+4.8, +12.2] |
| D | +5.2 [+3.2, +7.4] | +1.7 [+0.9, +2.6] | +9.8 [+6.1, +13.7] |


---

### E20 · Receiver choice once everything else is optimized

With the full stack on (filter→LNA + nulling + excision + cyclostationary + SEI, memory=fade, multi-angle) on the modern threat world, how much does the receiver still matter? bladeRF 2-ch vs coherent array 5-ch vs fused. 40 maps × 3 altitudes.

360 campaigns (3 variants × 40 maps × 3 altitudes), 286 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bladeRF 2-ch | 54% (675/1260) | 74% | 311 m | 95% | 7% | 28% (153/540) | 63% | 75% | 480 |
| **B** · coherent array 5-ch | 39% (492/1260) | 69% | 435 m | 96% | 7% | 28% (149/540) | 58% | 47% | 318 |
| **C** · fused (bladeRF+Kraken) | 68% (853/1260) | 80% | 213 m | 96% | 4% | 53% (285/540) | 74% | 77% | 480 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | -14.5 [-17.4, -11.9] | -5.1 [-6.9, -3.4] | -0.7 [-5.0, +3.4] |
| C | +14.1 [+12.2, +16.2] | +5.3 [+4.1, +6.5] | +24.4 [+20.7, +28.3] |


---

### E21 · Multi-jammer robustness with the full stack

The fused, fully-equipped payload (nulling on, 5-ch → up to 4 nulls) against 1, 2, 3 jammers on the modern threat world, 40 maps × 3 altitudes. Does the fused path hold as jammer count rises (where a 2-channel bladeRF would run out of nulls)?

360 campaigns (3 variants × 40 maps × 3 altitudes), 325 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · 1 jammer | 66% (754/1140) | 81% | 227 m | 96% | 5% | 51% (274/540) | 73% | 77% | 480 |
| **B** · 2 jammers | 68% (853/1260) | 80% | 213 m | 96% | 4% | 53% (285/540) | 74% | 77% | 480 |
| **C** · 3 jammers | 66% (911/1380) | 79% | 220 m | 97% | 5% | 51% (274/540) | 74% | 77% | 480 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +1.6 [-0.5, +3.6] | -1.2 [-2.5, +0.1] | +2.0 [-0.7, +4.7] |
| C | -0.1 [-2.5, +2.5] | -1.9 [-3.8, -0.3] | +0.0 [-3.0, +3.2] |


---

### E22 · Definitive modern-world headline (high N)

The single number for the pitch, at high N for a tight interval: bare bladeRF vs the fully-equipped fused payload on the 2024-26 threat world, 120 maps × 3 altitudes.

720 campaigns (2 variants × 120 maps × 3 altitudes), 611 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bare bladeRF | 42% (1571/3762) | 55% | 279 m | 97% | 5% | 10% (160/1602) | 20% | 74% | 1487 |
| **B** · fully-equipped fused | 65% (2435/3762) | 78% | 222 m | 96% | 5% | 47% (760/1602) | 70% | 74% | 1440 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +23.0 [+21.5, +24.4] | +22.4 [+21.3, +23.5] | +37.5 [+35.1, +39.7] |


---

### E23 · Definitive clean-world headline (high N)

The clean-world counterpart to e22 (no fibre/low-rate/decoys): bare bladeRF vs the fully-equipped fused payload, 120 maps × 3 altitudes, Frontline RF on. Completes the definitive before/after in both regimes.

720 campaigns (2 variants × 120 maps × 3 altitudes), 507 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bare bladeRF | 50% (1487/3000) | 68% | 297 m | 96% | 6% | 21% (255/1200) | 45% | 73% | 33 |
| **B** · fully-equipped fused | 74% (2220/3000) | 89% | 226 m | 95% | 5% | 68% (812/1200) | 96% | 73% | 0 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +24.4 [+22.8, +26.2] | +21.5 [+20.3, +22.7] | +46.4 [+43.5, +49.5] |


---

### E24 · Accuracy ladder under best operational settings

The cumulative lever ladder on the modern world, but flown with the best operational choices (multi-angle plan, memory=fade) rather than e15's grid/keep-all. Shows each hardware/DSP lever's contribution once tasking is also optimal. 50 maps × 3 altitudes.

750 campaigns (5 variants × 50 maps × 3 altitudes), 655 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bare bladeRF | 43% (671/1572) | 56% | 287 m | 97% | 5% | 10% (64/672) | 20% | 77% | 615 |
| **B** · + filter→LNA | 47% (742/1572) | 63% | 285 m | 95% | 6% | 16% (110/672) | 34% | 76% | 600 |
| **C** · + nulling + excision | 49% (766/1572) | 62% | 245 m | 96% | 6% | 16% (105/672) | 33% | 76% | 598 |
| **D** · + cyclostationary + SEI | 54% (844/1572) | 75% | 309 m | 95% | 7% | 29% (195/672) | 64% | 76% | 600 |
| **E** · + fused KrakenSDR | 67% (1060/1572) | 80% | 217 m | 96% | 5% | 51% (345/672) | 73% | 77% | 600 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +4.5 [+2.7, +6.4] | +6.4 [+5.2, +7.6] | +6.8 [+4.4, +9.4] |
| C | +6.0 [+4.4, +7.7] | +5.7 [+4.3, +7.0] | +6.1 [+3.4, +8.6] |
| D | +11.0 [+8.9, +12.9] | +18.6 [+16.8, +20.4] | +19.5 [+16.1, +22.8] |
| E | +24.7 [+22.5, +27.0] | +23.5 [+21.8, +25.3] | +41.8 [+38.1, +45.3] |


---

### E25 · Front end (high N)

e02 at 120 maps for tight intervals: bare / LNA / filter / filter→LNA / LNA→filter. Frontline RF, grid.

1800 campaigns (5 variants × 120 maps × 3 altitudes), 1378 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bare | 53% (1586/3000) | 73% | 277 m | 89% | 13% | 20% (245/1200) | 56% | 73% | 100 |
| **B** · LNA | 55% (1638/3000) | 78% | 281 m | 87% | 14% | 25% (303/1200) | 69% | 72% | 125 |
| **C** · filter | 53% (1584/3000) | 74% | 276 m | 89% | 13% | 22% (259/1200) | 58% | 73% | 0 |
| **D** · filter→LNA | 56% (1673/3000) | 79% | 284 m | 87% | 14% | 27% (321/1200) | 70% | 73% | 0 |
| **E** · LNA→filter | 54% (1628/3000) | 77% | 289 m | 88% | 14% | 24% (285/1200) | 67% | 73% | 112 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +1.7 [+0.6, +3.0] | +4.8 [+3.9, +5.7] | +4.8 [+2.7, +6.9] |
| C | -0.1 [-1.4, +1.3] | +0.7 [-0.1, +1.5] | +1.2 [-0.8, +3.2] |
| D | +2.9 [+1.6, +4.2] | +5.5 [+4.6, +6.4] | +6.3 [+4.4, +8.4] |
| E | +1.4 [+0.2, +2.6] | +4.2 [+3.3, +5.0] | +3.3 [+1.3, +5.4] |


---

### E26 · Countermeasures (high N)

e03 at 120 maps, filter fixed: none / +nulling / +excision / +cyclostationary / +all.

1800 campaigns (5 variants × 120 maps × 3 altitudes), 1284 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · no DSP | 53% (1584/3000) | 74% | 276 m | 89% | 13% | 22% (259/1200) | 58% | 73% | 0 |
| **B** · nulling | 54% (1633/3000) | 74% | 267 m | 90% | 12% | 22% (260/1200) | 57% | 73% | 0 |
| **C** · excision | 53% (1577/3000) | 74% | 276 m | 89% | 13% | 21% (252/1200) | 58% | 73% | 0 |
| **D** · cyclostationary | 55% (1635/3000) | 80% | 301 m | 87% | 15% | 27% (325/1200) | 74% | 74% | 0 |
| **E** · all+SEI | 57% (1703/3000) | 84% | 311 m | 84% | 17% | 28% (333/1200) | 85% | 74% | 0 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +1.6 [+0.5, +2.7] | -0.0 [-0.6, +0.5] | +0.1 [-1.6, +1.8] |
| C | -0.2 [-0.9, +0.5] | +0.2 [-0.1, +0.5] | -0.6 [-1.6, +0.4] |
| D | +1.7 [+0.4, +3.1] | +5.8 [+4.8, +6.8] | +5.5 [+3.3, +7.8] |
| E | +4.0 [+2.7, +5.3] | +10.7 [+9.5, +11.9] | +6.2 [+3.7, +8.6] |


---
