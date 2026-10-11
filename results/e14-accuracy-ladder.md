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
