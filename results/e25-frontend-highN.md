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
