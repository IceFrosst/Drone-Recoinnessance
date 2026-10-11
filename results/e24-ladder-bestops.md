### E24 · Accuracy ladder under best operational settings

The cumulative lever ladder on the modern world, but flown with the best operational choices (multi-angle plan, memory=fade) rather than e15's grid/keep-all. Shows each hardware/DSP lever's contribution once tasking is also optimal. 50 maps × 3 altitudes.

750 campaigns (5 variants × 50 maps × 3 altitudes), 655 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bare bladeRF | 43% (671/1572) | 56% | 287 m | 97% | 5% | 10% (64/672) | 20% | 77% | 615 |
| **B** · + filter→LNA | 47% (742/1572) | 63% | 285 m | 95% | 6% | 16% (110/672) | 34% | 76% | 600 |
| **C** · + nulling + excision | 49% (766/1572) | 62% | 245 m | 96% | 6% | 16% (105/672) | 33% | 76% | 598 |
| **D** · + cyclostationary + SEI | 54% (844/1572) | 75% | 309 m | 95% | 7% | 29% (195/672) | 64% | 76% | 600 |
| **E** · + fused KrakenSDR | 67% (1060/1572) | 80% | 217 m | 96% | 5% | 51% (345/672) | 73% | 77% | 600 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +4.5 [+2.7, +6.4] | +6.4 [+5.2, +7.6] | +6.8 [+4.4, +9.4] |
| C | +6.0 [+4.4, +7.7] | +5.7 [+4.3, +7.0] | +6.1 [+3.4, +8.6] |
| D | +11.0 [+8.9, +12.9] | +18.6 [+16.8, +20.4] | +19.5 [+16.1, +22.8] |
| E | +24.7 [+22.5, +27.0] | +23.5 [+21.8, +25.3] | +41.8 [+38.1, +45.3] |
