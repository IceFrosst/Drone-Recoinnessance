### E06 · Modern battlefield — fibre FPV, low-rate links, decoys

The 2024-26 picture: ~30% of FPV operators on fibre (no RF), ~30% on long-range low-rate spread links (below an energy detector), and 2 decoy emitters per map. bladeRF · combined · crossing grid, Frontline RF on. A bare payload, B adds a filter→LNA front end, C adds the three DSP countermeasures, D is the fused payload with everything. Shows what the new tech costs (fibre ceiling, decoy false fixes) and what the countermeasures buy back (low-rate links via cyclostationary).

288 campaigns (4 variants × 24 maps × 3 altitudes), 260 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bare bladeRF | 45% (341/759) | 58% | 247 m | 93% | 8% | 8% (26/327) | 27% | 72% | 328 |
| **B** · + filter→LNA | 47% (354/759) | 64% | 279 m | 91% | 10% | 14% (46/327) | 40% | 73% | 288 |
| **C** · + nulling+excision+cyclo | 54% (410/759) | 72% | 269 m | 90% | 10% | 24% (80/327) | 59% | 73% | 288 |
| **D** · fused, everything on | 63% (475/759) | 75% | 203 m | 92% | 9% | 41% (135/327) | 65% | 73% | 288 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +1.7 [-0.5, +3.8] | +5.8 [+4.2, +7.4] | +6.1 [+3.4, +8.9] |
| C | +9.1 [+6.1, +11.9] | +13.6 [+11.6, +15.4] | +16.5 [+11.8, +21.2] |
| D | +17.7 [+14.4, +21.0] | +16.9 [+15.1, +18.6] | +33.3 [+28.3, +39.2] |
