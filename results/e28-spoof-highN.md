### E28 · GNSS spoofing (high N)

e13 at 100 maps.

600 campaigns (2 variants × 100 maps × 3 altitudes), 468 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · clean GNSS | 62% (1956/3144) | 79% | 210 m | 88% | 12% | 38% (515/1344) | 71% | 75% | 1200 |
| **B** · spoofed | 13% (399/3144) | 78% | 956 m | 85% | 17% | 9% (123/1344) | 70% | 19% | 1200 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | -49.5 [-51.4, -47.7] | -0.6 [-1.0, -0.3] | -29.2 [-31.8, -26.7] |
