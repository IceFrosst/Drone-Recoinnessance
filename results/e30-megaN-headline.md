### E30 · Mega-N headline validation (clean + modern)

Largest-N confirmation of the core result for maximum statistical confidence: bare bladeRF vs fully-equipped fused payload, 200 maps × 3 altitudes, on both the clean and modern threat worlds.

2400 campaigns (4 variants × 200 maps × 3 altitudes), 1959 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bare · clean | 50% (2490/5004) | 68% | 295 m | 96% | 7% | 20% (406/2004) | 45% | 75% | 63 |
| **B** · equipped · clean | 73% (3669/5004) | 89% | 226 m | 95% | 6% | 65% (1299/2004) | 96% | 76% | 0 |
| **C** · bare · modern | 42% (2649/6255) | 56% | 278 m | 97% | 5% | 9% (249/2655) | 21% | 73% | 2450 |
| **D** · equipped · modern | 64% (4017/6255) | 78% | 220 m | 95% | 5% | 46% (1220/2655) | 70% | 73% | 2400 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +23.6 [+22.3, +24.9] | +21.4 [+20.4, +22.3] | +44.6 [+42.1, +47.1] |
| C | -7.4 [-8.9, -5.8] | -12.5 [-13.8, -10.9] | -10.9 [-12.6, -9.0] |
| D | +14.5 [+12.9, +16.0] | +9.5 [+8.1, +11.0] | +25.7 [+23.3, +28.1] |
