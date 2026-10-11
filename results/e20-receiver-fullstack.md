### E20 · Receiver choice once everything else is optimized

With the full stack on (filter→LNA + nulling + excision + cyclostationary + SEI, memory=fade, multi-angle) on the modern threat world, how much does the receiver still matter? bladeRF 2-ch vs coherent array 5-ch vs fused. 40 maps × 3 altitudes.

360 campaigns (3 variants × 40 maps × 3 altitudes), 286 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bladeRF 2-ch | 54% (675/1260) | 74% | 311 m | 95% | 7% | 28% (153/540) | 63% | 75% | 480 |
| **B** · coherent array 5-ch | 39% (492/1260) | 69% | 435 m | 96% | 7% | 28% (149/540) | 58% | 47% | 318 |
| **C** · fused (bladeRF+Kraken) | 68% (853/1260) | 80% | 213 m | 96% | 4% | 53% (285/540) | 74% | 77% | 480 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | -14.5 [-17.4, -11.9] | -5.1 [-6.9, -3.4] | -0.7 [-5.0, +3.4] |
| C | +14.1 [+12.2, +16.2] | +5.3 [+4.1, +6.5] | +24.4 [+20.7, +28.3] |
