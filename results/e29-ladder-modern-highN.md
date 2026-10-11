### E29 · Accuracy ladder modern (high N)

e15 at 100 maps.

1800 campaigns (6 variants × 100 maps × 3 altitudes), 1513 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bare | 46% (1435/3144) | 60% | 251 m | 94% | 7% | 9% (127/1344) | 27% | 75% | 1336 |
| **B** · +filter | 48% (1513/3144) | 60% | 236 m | 95% | 6% | 13% (168/1344) | 28% | 74% | 1190 |
| **C** · +LNA | 49% (1525/3144) | 65% | 267 m | 92% | 10% | 15% (207/1344) | 39% | 75% | 1198 |
| **D** · +null+excision | 50% (1585/3144) | 65% | 244 m | 92% | 9% | 15% (204/1344) | 39% | 75% | 1200 |
| **E** · +cyclo+SEI | 54% (1699/3144) | 76% | 282 m | 87% | 15% | 23% (308/1344) | 67% | 75% | 1198 |
| **F** · +fused | 62% (1956/3144) | 79% | 210 m | 88% | 12% | 38% (515/1344) | 71% | 75% | 1200 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +2.5 [+1.4, +3.6] | +0.5 [-0.1, +1.2] | +3.1 [+1.6, +4.5] |
| C | +2.9 [+1.7, +4.1] | +5.3 [+4.4, +6.2] | +6.0 [+4.2, +7.7] |
| D | +4.8 [+3.5, +6.1] | +5.1 [+4.3, +6.0] | +5.7 [+3.9, +7.4] |
| E | +8.4 [+6.9, +9.8] | +16.8 [+15.5, +17.9] | +13.5 [+10.9, +15.8] |
| F | +16.6 [+15.1, +18.0] | +19.1 [+17.9, +20.3] | +28.9 [+26.0, +31.8] |
