### E17 · Does memory-fading fix the stale-data problem?

Follow-up to e16: the recommended payload flown 8 flights against a relocating/retuning enemy, with the three memory policies. If fading old recordings recovers accuracy, that is the operational answer to 'more flights hurt'.

360 campaigns (3 variants × 40 maps × 3 altitudes), 391 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · keep all | 57% (712/1260) | 79% | 223 m | 79% | 22% | 24% (128/540) | 73% | 78% | 480 |
| **B** · fade ½ per flight | 61% (773/1260) | 79% | 239 m | 94% | 6% | 42% (226/540) | 72% | 77% | 480 |
| **C** · last flight only | 64% (809/1260) | 75% | 221 m | 100% | 1% | 50% (271/540) | 63% | 76% | 480 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +4.8 [+2.9, +7.1] | -0.4 [-1.0, +0.2] | +18.1 [+14.5, +22.1] |
| C | +7.7 [+5.5, +10.0] | -4.2 [-5.5, -3.0] | +26.5 [+22.2, +31.0] |
