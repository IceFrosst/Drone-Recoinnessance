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
