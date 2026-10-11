### E13 · GNSS spoofing — the confidently-wrong failure

A spoofer induces a coherent false position (not random drift), so fixes taken in the belt are displaced with full confidence. Fused payload, everything on, 40 maps × 3 altitudes. A clean GNSS, B spoofed. Watch the ≤500 m hit rate collapse while the located count and 95%-ellipse calibration barely move — a tight ellipse is no defence against spoofing.

240 campaigns (2 variants × 40 maps × 3 altitudes), 162 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · clean GNSS | 69% (698/1008) | 90% | 209 m | 85% | 14% | 49% (199/408) | 94% | 72% | 0 |
| **B** · GNSS spoofed | 14% (143/1008) | 89% | 948 m | 82% | 17% | 12% (47/408) | 93% | 23% | 0 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | -55.1 [-58.9, -51.0] | -0.6 [-1.3, +0.2] | -37.3 [-43.0, -31.2] |
