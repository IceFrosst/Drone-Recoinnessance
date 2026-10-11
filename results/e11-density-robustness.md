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
