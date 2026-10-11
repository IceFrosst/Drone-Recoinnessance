### E26 · Countermeasures (high N)

e03 at 120 maps, filter fixed: none / +nulling / +excision / +cyclostationary / +all.

1800 campaigns (5 variants × 120 maps × 3 altitudes), 1284 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · no DSP | 53% (1584/3000) | 74% | 276 m | 89% | 13% | 22% (259/1200) | 58% | 73% | 0 |
| **B** · nulling | 54% (1633/3000) | 74% | 267 m | 90% | 12% | 22% (260/1200) | 57% | 73% | 0 |
| **C** · excision | 53% (1577/3000) | 74% | 276 m | 89% | 13% | 21% (252/1200) | 58% | 73% | 0 |
| **D** · cyclostationary | 55% (1635/3000) | 80% | 301 m | 87% | 15% | 27% (325/1200) | 74% | 74% | 0 |
| **E** · all+SEI | 57% (1703/3000) | 84% | 311 m | 84% | 17% | 28% (333/1200) | 85% | 74% | 0 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +1.6 [+0.5, +2.7] | -0.0 [-0.6, +0.5] | +0.1 [-1.6, +1.8] |
| C | -0.2 [-0.9, +0.5] | +0.2 [-0.1, +0.5] | -0.6 [-1.6, +0.4] |
| D | +1.7 [+0.4, +3.1] | +5.8 [+4.8, +6.8] | +5.5 [+3.3, +7.8] |
| E | +4.0 [+2.7, +5.3] | +10.7 [+9.5, +11.9] | +6.2 [+3.7, +8.6] |
