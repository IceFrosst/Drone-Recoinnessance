### E04 · The two-channel null limit — one jammer vs two

Adaptive nulling with Frontline RF on. A 2-channel bladeRF can steer ONE null; a 5-channel array can steer four. With a single jammer both cope; with two jammers in different bands the bladeRF can only null one, so the second still buries its co-band targets. The array (and the fused payload) keep nulling both.

240 campaigns (4 variants × 20 maps × 3 altitudes), 205 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bladeRF 2-ch · 1 jammer | 47% (271/573) | 68% | 267 m | 87% | 15% | 21% (56/273) | 55% | 65% | 0 |
| **B** · bladeRF 2-ch · 3 jammers | 53% (365/693) | 69% | 246 m | 90% | 10% | 18% (50/273) | 51% | 72% | 0 |
| **C** · array 5-ch · 3 jammers | 41% (283/693) | 60% | 338 m | 90% | 11% | 21% (57/273) | 47% | 36% | 0 |
| **D** · fused 5-ch · 3 jammers | 62% (433/693) | 76% | 199 m | 89% | 11% | 38% (105/273) | 70% | 73% | 0 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +5.4 [+1.5, +9.7] | +1.3 [-1.9, +4.6] | -2.2 [-8.1, +3.7] |
| C | -6.5 [-11.0, -2.3] | -7.8 [-11.5, -4.3] | +0.4 [-5.5, +5.2] |
| D | +15.2 [+11.0, +19.8] | +8.6 [+5.8, +11.7] | +17.9 [+11.6, +24.6] |
