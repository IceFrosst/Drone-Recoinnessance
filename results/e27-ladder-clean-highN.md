### E27 · Accuracy ladder clean (high N)

e14 at 100 maps.

1800 campaigns (6 variants × 100 maps × 3 altitudes), 1169 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bare | 53% (1335/2505) | 73% | 277 m | 89% | 13% | 20% (203/1005) | 56% | 73% | 84 |
| **B** · +filter | 53% (1329/2505) | 74% | 272 m | 89% | 13% | 21% (213/1005) | 57% | 73% | 0 |
| **C** · +LNA | 56% (1406/2505) | 78% | 281 m | 87% | 14% | 27% (271/1005) | 70% | 73% | 0 |
| **D** · +null+excision | 57% (1428/2505) | 78% | 269 m | 87% | 14% | 27% (271/1005) | 68% | 73% | 0 |
| **E** · +cyclo+SEI | 58% (1442/2505) | 88% | 307 m | 83% | 18% | 30% (305/1005) | 92% | 72% | 0 |
| **F** · +fused | 68% (1712/2505) | 89% | 208 m | 85% | 14% | 49% (488/1005) | 96% | 74% | 0 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | -0.2 [-1.7, +1.3] | +0.5 [-0.4, +1.3] | +1.0 [-1.4, +3.5] |
| C | +2.8 [+1.5, +4.2] | +5.3 [+4.3, +6.3] | +6.8 [+4.3, +9.0] |
| D | +3.7 [+2.4, +5.0] | +4.8 [+3.9, +5.8] | +6.8 [+4.5, +9.1] |
| E | +4.3 [+2.8, +5.9] | +14.4 [+13.0, +15.7] | +10.1 [+6.9, +13.5] |
| F | +15.0 [+13.3, +16.9] | +16.3 [+14.9, +17.6] | +28.4 [+25.0, +32.3] |
