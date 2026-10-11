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
