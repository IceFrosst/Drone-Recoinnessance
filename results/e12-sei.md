### E12 · Specific emitter ID (hardware fingerprint) vs retuning

Frontline RF on with a high retune rate (operators change link settings between flights, breaking their tracks). SEI reads a hardware fingerprint that survives the settings change, so a retuned track re-links to its parent instead of resetting. Fused payload, everything on, across 40 maps × 3 altitudes.

240 campaigns (2 variants × 40 maps × 3 altitudes), 163 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · no SEI (retune breaks the track) | 79% (792/1008) | 86% | 186 m | 97% | 3% | 71% (291/408) | 85% | 73% | 0 |
| **B** · SEI re-links retuned tracks | 80% (809/1008) | 90% | 192 m | 94% | 6% | 75% (307/408) | 96% | 73% | 0 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +1.7 [+0.2, +3.3] | +4.6 [+3.3, +5.9] | +3.9 [+0.5, +7.6] |
