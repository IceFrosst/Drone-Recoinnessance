### E08 · Countermeasure ablation on the modern battlefield

On the 2024-26 threat world (fibre 30%, low-rate 30%, 2 decoys), with a filter→LNA front end fixed, turn on one DSP countermeasure at a time. Isolates what each buys when the hard new threats are present — cyclostationary should dominate because of the low-rate links.

360 campaigns (5 variants × 24 maps × 3 altitudes), 319 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · no DSP | 47% (354/759) | 64% | 279 m | 91% | 10% | 14% (46/327) | 40% | 73% | 288 |
| **B** · nulling | 49% (372/759) | 64% | 239 m | 91% | 9% | 15% (50/327) | 41% | 73% | 288 |
| **C** · excision | 47% (355/759) | 64% | 256 m | 91% | 10% | 14% (46/327) | 40% | 73% | 288 |
| **D** · cyclostationary | 52% (392/759) | 72% | 281 m | 90% | 11% | 24% (77/327) | 59% | 72% | 288 |
| **E** · all three | 54% (410/759) | 72% | 269 m | 90% | 10% | 24% (80/327) | 59% | 73% | 288 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +2.4 [+0.3, +4.7] | +0.4 [-1.1, +2.0] | +1.2 [-1.2, +3.6] |
| C | +0.1 [-1.2, +1.7] | +0.1 [-0.9, +1.3] | +0.0 [-2.2, +2.2] |
| D | +5.0 [+2.2, +7.5] | +7.8 [+5.5, +10.0] | +9.5 [+5.2, +13.7] |
| E | +7.4 [+4.8, +10.1] | +7.8 [+5.8, +10.0] | +10.4 [+6.4, +15.2] |
