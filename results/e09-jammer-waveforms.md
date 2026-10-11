### E09 · Jammer waveforms vs time/frequency excision

Three worlds, each with every jammer forced to one waveform, flown with and without excision. Shows excision recovers a swept or pulsed jammer's gaps but does nothing against a barrage.

360 campaigns (6 variants × 20 maps × 3 altitudes), 276 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · barrage · no excision | 54% (272/504) | 74% | 284 m | 90% | 12% | 25% (52/204) | 61% | 80% | 0 |
| **B** · barrage · excision | 54% (272/504) | 74% | 284 m | 90% | 12% | 25% (52/204) | 61% | 80% | 0 |
| **C** · swept · no excision | 55% (278/504) | 73% | 267 m | 93% | 11% | 27% (56/204) | 59% | 78% | 0 |
| **D** · swept · excision | 55% (279/504) | 74% | 258 m | 92% | 12% | 25% (52/204) | 61% | 80% | 0 |
| **E** · pulsed · no excision | 55% (275/504) | 74% | 279 m | 92% | 11% | 26% (53/204) | 61% | 78% | 0 |
| **F** · pulsed · excision | 55% (279/504) | 74% | 258 m | 92% | 12% | 25% (52/204) | 61% | 80% | 0 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +0.0 [+0.0, +0.0] | +0.0 [+0.0, +0.0] | +0.0 [+0.0, +0.0] |
| C | +1.2 [-1.0, +3.4] | -0.6 [-2.0, +0.8] | +2.0 [-2.4, +6.4] |
| D | +1.4 [-0.2, +3.2] | +0.2 [-1.6, +1.8] | +0.0 [-3.4, +3.9] |
| E | +0.6 [-1.6, +2.8] | +0.2 [-1.0, +1.6] | +0.5 [-3.0, +3.9] |
| F | +1.4 [-0.2, +3.2] | +0.2 [-1.6, +1.8] | +0.0 [-3.4, +3.9] |
