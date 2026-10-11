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
