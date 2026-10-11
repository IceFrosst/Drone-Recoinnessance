# Experiment results

Auto-generated from `results/*.md` by `sim/makedocs.js`. Total campaigns run across all experiments: **5,412** (ledger: `results/ledger.json`). Every table is paired — all variants fly the same maps and altitudes. All numbers are modelled, not field data.

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
