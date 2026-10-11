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
