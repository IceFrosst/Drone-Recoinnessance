### E02 · RF front end — does a preselect filter / LNA help, and does an LNA cost us?

bladeRF · combined · crossing grid, Frontline RF on (jammers active). Each variant is the same payload with a different analog front end. This isolates the hardware: A bare SDR, B an LNA only, C a preselect filter only, D filter→LNA (the recommended build), E LNA→filter (wrong order).

300 campaigns (5 variants × 20 maps × 3 altitudes), 236 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bare SDR | 51% (255/504) | 71% | 300 m | 89% | 10% | 23% (46/204) | 59% | 52% | 13 |
| **B** · LNA only | 54% (274/504) | 74% | 281 m | 87% | 14% | 30% (61/204) | 69% | 55% | 18 |
| **C** · preselect filter only | 49% (249/504) | 70% | 268 m | 89% | 11% | 22% (45/204) | 56% | 55% | 0 |
| **D** · filter → LNA (recommended) | 53% (268/504) | 75% | 288 m | 87% | 13% | 27% (56/204) | 68% | 53% | 0 |
| **E** · LNA → filter (wrong order) | 51% (259/504) | 73% | 290 m | 87% | 12% | 26% (53/204) | 66% | 55% | 22 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +3.8 [+1.2, +6.5] | +3.6 [+1.2, +6.0] | +7.4 [+2.4, +12.4] |
| C | -1.2 [-3.8, +1.4] | -0.4 [-2.6, +1.6] | -0.5 [-5.4, +4.4] |
| D | +2.6 [-0.4, +5.8] | +4.4 [+2.4, +6.3] | +4.9 [+0.0, +10.6] |
| E | +0.8 [-2.2, +3.6] | +2.4 [+0.0, +4.9] | +3.4 [-1.0, +8.3] |
