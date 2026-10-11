### E21 · Multi-jammer robustness with the full stack

The fused, fully-equipped payload (nulling on, 5-ch → up to 4 nulls) against 1, 2, 3 jammers on the modern threat world, 40 maps × 3 altitudes. Does the fused path hold as jammer count rises (where a 2-channel bladeRF would run out of nulls)?

360 campaigns (3 variants × 40 maps × 3 altitudes), 325 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · 1 jammer | 66% (754/1140) | 81% | 227 m | 96% | 5% | 51% (274/540) | 73% | 77% | 480 |
| **B** · 2 jammers | 68% (853/1260) | 80% | 213 m | 96% | 4% | 53% (285/540) | 74% | 77% | 480 |
| **C** · 3 jammers | 66% (911/1380) | 79% | 220 m | 97% | 5% | 51% (274/540) | 74% | 77% | 480 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +1.6 [-0.5, +3.6] | -1.2 [-2.5, +0.1] | +2.0 [-0.7, +4.7] |
| C | -0.1 [-2.5, +2.5] | -1.9 [-3.8, -0.3] | +0.0 [-3.0, +3.2] |
