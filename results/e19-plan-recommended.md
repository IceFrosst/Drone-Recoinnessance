### E19 · Best flight plan for the recommended payload

The fused, fully-equipped payload (memory=fade) flown on each flight plan — single pass, parallel lines, crossing grid, multi-angle — on the modern threat world, 40 maps × 3 altitudes. Which routing pattern gets the most operators per sortie now that the receiver is good?

480 campaigns (4 variants × 40 maps × 3 altitudes), 340 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · single pass | 62% (787/1260) | 78% | 222 m | 95% | 7% | 43% (232/540) | 69% | 77% | 480 |
| **B** · parallel lines | 66% (837/1260) | 79% | 218 m | 97% | 4% | 49% (265/540) | 73% | 76% | 480 |
| **C** · crossing grid | 67% (850/1260) | 79% | 226 m | 95% | 6% | 51% (277/540) | 73% | 77% | 480 |
| **D** · multi-angle | 68% (853/1260) | 80% | 213 m | 96% | 4% | 53% (285/540) | 74% | 77% | 480 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +4.0 [+1.8, +6.2] | +1.4 [+0.4, +2.4] | +6.1 [+2.2, +10.0] |
| C | +5.0 [+3.1, +7.0] | +1.6 [+0.9, +2.3] | +8.3 [+4.8, +12.2] |
| D | +5.2 [+3.2, +7.4] | +1.7 [+0.9, +2.6] | +9.8 [+6.1, +13.7] |
