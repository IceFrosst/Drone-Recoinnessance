### E03 · Software countermeasures — nulling, excision, cyclostationary detection

bladeRF · combined · crossing grid, Frontline RF on, with a preselect filter so spurs are already handled (isolates what the DSP adds on top of the hardware). Each variant adds one countermeasure, then all three. These are digital, after the ADC, so they recover co-channel signal and dig below the floor — they cannot undo front-end overload (that is the filter's job).

300 campaigns (5 variants × 20 maps × 3 altitudes), 221 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · filter only (no DSP) | 49% (249/504) | 70% | 268 m | 89% | 11% | 22% (45/204) | 56% | 55% | 0 |
| **B** · + adaptive nulling | 51% (259/504) | 70% | 248 m | 90% | 10% | 25% (52/204) | 57% | 55% | 0 |
| **C** · + time/freq excision | 50% (253/504) | 70% | 260 m | 90% | 12% | 23% (47/204) | 58% | 55% | 0 |
| **D** · + cyclostationary detection | 52% (262/504) | 76% | 320 m | 87% | 14% | 26% (53/204) | 73% | 55% | 0 |
| **E** · + all three | 51% (257/504) | 74% | 298 m | 87% | 13% | 23% (46/204) | 70% | 52% | 0 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +2.0 [-0.6, +4.6] | +0.0 [-1.4, +1.4] | +3.4 [-0.5, +7.4] |
| C | +0.8 [-1.0, +2.4] | +0.2 [-0.8, +1.2] | +1.0 [-2.0, +3.9] |
| D | +2.6 [+0.0, +5.3] | +5.8 [+3.0, +8.3] | +3.9 [-0.5, +8.4] |
| E | +1.6 [-1.2, +4.4] | +4.2 [+1.6, +6.7] | +0.5 [-4.9, +5.7] |
