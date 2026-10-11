### E15 · The accuracy ladder on the modern threat world

Same cumulative ladder as e14, but on the 2024-26 world (fibre 30%, low-rate 30%, 2 decoys). Does each lever still pay off when the hard new threats are present? 60 maps × 3 altitudes, Frontline RF on.

1080 campaigns (6 variants × 60 maps × 3 altitudes), 908 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bare bladeRF | 45% (853/1887) | 60% | 254 m | 93% | 8% | 9% (71/807) | 29% | 75% | 808 |
| **B** · + preselect filter | 49% (917/1887) | 60% | 230 m | 94% | 6% | 12% (99/807) | 29% | 75% | 714 |
| **C** · + LNA (filter→LNA) | 48% (911/1887) | 65% | 268 m | 91% | 10% | 15% (123/807) | 41% | 75% | 720 |
| **D** · + nulling + excision | 50% (941/1887) | 65% | 248 m | 91% | 10% | 15% (120/807) | 42% | 75% | 720 |
| **E** · + cyclostationary + SEI | 55% (1029/1887) | 77% | 283 m | 88% | 14% | 24% (192/807) | 69% | 75% | 720 |
| **F** · + fused KrakenSDR | 63% (1184/1887) | 80% | 206 m | 88% | 12% | 40% (326/807) | 74% | 76% | 720 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +3.4 [+2.0, +4.8] | +0.1 [-0.7, +0.9] | +3.5 [+1.6, +5.4] |
| C | +3.1 [+1.6, +4.5] | +5.1 [+4.0, +6.3] | +6.4 [+3.9, +9.0] |
| D | +4.7 [+3.0, +6.4] | +5.5 [+4.2, +6.6] | +6.1 [+3.8, +8.4] |
| E | +9.3 [+7.4, +11.3] | +17.1 [+15.4, +18.6] | +15.0 [+11.8, +18.1] |
| F | +17.5 [+15.5, +19.6] | +19.6 [+18.0, +21.1] | +31.6 [+27.9, +35.4] |
