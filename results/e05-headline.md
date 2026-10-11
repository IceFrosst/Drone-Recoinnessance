### E05 · Headline — the payload as handed over vs fully equipped

The single accuracy number. Frontline RF on, crossing grid, same 24 maps. A is the bladeRF exactly as the project started (bare SDR, no countermeasures). B adds the recommended analog front end (filter→LNA). C adds the three software countermeasures. D is the fused bladeRF+Kraken payload with everything on — the full recommendation.

288 campaigns (4 variants × 24 maps × 3 altitudes), 214 s on 4 cores. Paired: every variant flies the same maps.

| Variant | Hit ≤500 m (all HVT) | Located | Median err | Inside 95% | Wrong (>1.5 km) | Operators hit | Operators located | Jammers hit | False/decoy fixes |
|---|---|---|---|---|---|---|---|---|---|
| **A** · bare bladeRF (start of project) | 49% (297/606) | 68% | 300 m | 90% | 10% | 22% (53/246) | 55% | 51% | 16 |
| **B** · + filter→LNA front end | 52% (313/606) | 73% | 286 m | 87% | 13% | 26% (65/246) | 65% | 53% | 0 |
| **C** · + nulling + excision + cyclo | 52% (313/606) | 78% | 297 m | 87% | 15% | 29% (72/246) | 79% | 53% | 0 |
| **D** · fused payload, everything on | 66% (397/606) | 81% | 205 m | 90% | 11% | 51% (125/246) | 84% | 54% | 0 |

Paired difference vs **A** (percentage points, 95% bootstrap CI over maps):

| Variant | Δ hit rate, all HVT | Δ located, all HVT | Δ hit rate, operators |
|---|---|---|---|
| B | +2.6 [-0.2, +5.7] | +4.6 [+2.8, +6.7] | +4.9 [+0.4, +9.6] |
| C | +2.6 [-0.5, +5.4] | +9.6 [+7.0, +12.3] | +7.7 [+2.9, +13.0] |
| D | +16.5 [+13.7, +19.4] | +12.4 [+9.3, +15.7] | +29.3 [+23.5, +34.9] |
