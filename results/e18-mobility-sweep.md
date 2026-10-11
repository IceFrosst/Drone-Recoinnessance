### E18 · Robustness to enemy mobility

The recommended payload (fused, everything on, memory=fade — the good setting from e17) against teams that relocate between flights at increasing rates, modern threat world, 40 maps × 3 altitudes. How does accuracy hold as the enemy moves more?

480 campaigns (4 variants × 40 maps × 3 altitudes), 345 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · static enemy (0%) | 74% (927/1260) | 80% | 197 m | 100% | 0% | 65% (353/540) | 74% | 77% | 480 |
| **B** · relocate 20%/flight | 70% (881/1260) | 80% | 216 m | 98% | 3% | 58% (314/540) | 74% | 77% | 480 |
| **C** · relocate 40%/flight | 65% (824/1260) | 79% | 234 m | 94% | 7% | 47% (252/540) | 73% | 76% | 480 |
| **D** · relocate 70%/flight | 61% (771/1260) | 79% | 243 m | 92% | 10% | 38% (205/540) | 73% | 76% | 480 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | -3.7 [-5.4, -1.8] | -0.1 [-0.5, +0.3] | -7.2 [-10.4, -3.7] |
| C | -8.2 [-10.3, -6.0] | -0.6 [-1.3, +0.1] | -18.7 [-23.1, -14.3] |
| D | -12.4 [-14.4, -10.2] | -0.5 [-1.1, +0.2] | -27.4 [-31.7, -23.1] |
