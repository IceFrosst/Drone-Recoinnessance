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
