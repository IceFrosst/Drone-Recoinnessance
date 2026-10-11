# Experiment results

Auto-generated from `results/*.md`. Total campaigns run: **1524** (ledger in `results/ledger.json`). Every table is paired — all variants fly the same maps and altitudes. Modelled, not field data.


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
