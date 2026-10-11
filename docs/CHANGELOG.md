# Changelog & accuracy over versions

> **Session close (2026-10-11 05:57 UTC).** Overnight autonomous run complete: ~6.3 h, **20,562 modelled simulations across 30 paired A/B/C experiments**, six versioned releases (v1.0→v1.5), artifact republished to Version 12. Full write-up: `docs/Drone-RF-Recon-Report.pdf`. Headline: fully-equipped payload vs the bare starting payload lifts operator fixes within 500 m from 21%→68% (clean) / 10%→47% (modern), front-end false fixes eliminated.

Every version is a git commit (and a local tag) so a bad change can be rolled back: `git checkout <sha> -- heatmap.html`. (This session's GitHub integration can push branch refs but not tag refs, so the tags live locally; the commit SHAs below are the reliable rollback handles.) All numbers are **modelled**, not field results, and come from the headless batch runner (`sim/batch.js`) over many maps × altitudes with Frontline RF on. Each meaningful change ships with an A/B/C experiment in `sim/experiments/` and a results table in `results/`.

| Version | Commit | What |
|---|---|---|
| v1.0 | `3e3a535` | project as handed over |
| v1.1 | `9a9f99c` | headless batch runner + likelihood speed-up (model unchanged) |
| v1.2 | `a1ed0c6` | jammer interference model (merged) |
| v1.3 | `031138a` | RF front end + EW countermeasures |
| v1.4 | `79393f4` | specific emitter identification (SEI) |
| v1.5 | (this commit) | GNSS spoofing (confidently-wrong failure) |

The one headline number, from `e05-headline` (24 maps × 3 altitudes = 72 campaigns per variant, paired — every variant flies the same maps), **drone-operator fixes within 500 m**:

| Payload | Operators ≤500 m | Operators located | All-HVT located | Median err | False fixes |
|---|---|---|---|---|---|
| **v1.2** bare bladeRF (project start) | 22 % | 55 % | 68 % | 300 m | 16 |
| + filter→LNA front end | 26 % | 65 % | 73 % | 286 m | **0** |
| + nulling · excision · cyclostationary | 29 % | 79 % | 78 % | 297 m | 0 |
| **v1.3** fused payload, everything on | **51 %** | **84 %** | **81 %** | **205 m** | **0** |

Fully equipped vs the bare starting payload: operator fixes within 500 m **more than doubled (22 % → 51 %)**, all-target located **+12 pp**, median error **down a third**, false fixes from front-end overload **eliminated**, and calibration honesty held (truth inside the 95 % ellipse ~90 %).

Validated at scale (`e07`, 100 maps × 3 altitudes = 300 campaigns per variant): the fused everything-on payload lifts operators within 500 m from **20 % to 47 %** (paired Δ +27.3 pp, 95 % bootstrap CI [+24.1, +30.7]) and operators located from 56 % to 86 %. On the full 2024-26 threat mix (`e10`, 100 maps), the gain holds against fibre FPV, low-rate links and decoys.

---

## v1.5 — GNSS spoofing (2026-10-11)

A spoofer makes our own receiver compute a **wrong position with full confidence** — a coherent offset shared by every recording in the belt, not the random drift the denial belt already models. The fix stays tight but is systematically displaced, and no RF front-end or DSP countermeasure touches it (the real fix is inertial / multi-constellation / anti-spoof GNSS, which this payload does not model). New `spoof` Scenario toggle, off by default.
- `e13-gnss-spoof` (240 campaigns): spoofing drops actionable fixes (≤500 m) from **69 % to 14 %** (paired Δ −55 pp) and quadruples median error (209 → 948 m) — while the **located count is unchanged (90 % → 89 %)** and the 95 %-ellipse calibration barely moves. The confidently-wrong failure a tight ellipse cannot flag: the system reports just as many fixes, all displaced.

## v1.4 — specific emitter identification (SEI) (2026-10-11)

A hardware fingerprint (oscillator offset, I/Q imbalance, turn-on transient) identifies a transmitter independently of its link settings — both sides field it. New `sei` toggle: when an operator **retunes** between flights its track normally breaks; SEI re-links the new emission to the same hardware, so the heat carries over and tracking survives even when the retune moves the hop rate out of the nominal signature gate. Readable on strong emitters only (`SEI_READ_P` = 0.7).
- `e12-sei` (240 campaigns, operators retuning): **operators located 85 % → 96 %** (+11 pp), all-HVT located +4.6 pp (95 % CI [+3.3, +5.9]), and fragmented retune tracks consolidate into one. Off by default.

## v1.3 — front end + EW countermeasures (2026-10-11)

New, all **off by default** so the clean illustration is unchanged.

**RF front end** (`frontEnd`: `none` / `lna` / `filter` / `filterlna` / `lnafilter`). Calibrated to measured bladeRF NF (4.9–15.8 dB across the band, no front-end filters) and ADI app-note 1836 (a 15 dB LNA: +3.8 dB sensitivity, −15 dB dynamic range). See `docs/research.md`.
- A **preselect filter** is before the ADC, so it is the only thing that stops an out-of-band jammer overloading the receiver — it is what kills the saturation spurs (effect *a*) and the broadband desense.
- An **LNA** lowers noise figure (hears weaker/farther) but lowers overload headroom, so **alone it makes saturation worse**.
- **Order matters**: filter→LNA protects the LNA; LNA→filter does not.
- `e02-frontend` (300 campaigns): false fixes **13 (bare) → 18 (LNA) → 0 (filter) → 0 (filter→LNA) → 22 (LNA→filter)**. The filter removes the spur false fixes outright; the LNA adds sensitivity (+3.6 pp located) but more false alarms; filter→LNA gets both (+4.4 pp located, 0 false fixes).

**Adaptive nulling** (MVDR), `nulling`. Two coherent channels steer one null; five steer four. Steered at the strongest jammer; a second jammer in another band is not covered (the honest "two channels, one null" limit). A null is a direction, so it also notches wanted signals near the jammer's bearing; depth is calibration-limited. Digital (post-ADC), so it fixes co-channel burying/bias but **not** overload spurs.
- `e04-nulling-limit` (240 campaigns): under 3 jammers the 2-ch bladeRF holds operators at 18 % hit / 51 % located (one null); the **fused 5-ch payload lifts them to 38 % hit / 70 % located**.

**Time/frequency excision**, `excision`. Notches a swept jammer's tone or blanks a pulsed jammer's slices; recovers nothing against a barrage. Needs the jammer waveform, so jammers now carry one (barrage / swept / pulsed).

**Cyclostationary detection**, `cyclo`. Lowers the detection threshold for signatures with a cyclic feature (hop/packet cadence), catching them below a raised floor. Matches the research (Pd 0.99 vs 0.18 at −22 dB SNR, ideal AWGN).
- `e03-countermeasures` (300 campaigns, on top of a filter): cyclostationary is the biggest DSP win — **operators located 56 % → 73 %**. Nulling and excision are smaller, honest gains (they help only targets actually co-band with a jammer).

**Jammer waveforms**: each jammer is barrage / swept / pulsed with duty & sweep params; the co-band blackout and bearing bias are now waveform-aware, and excision has gaps to exploit.

## v1.2 — jammer interference model (merged from a parallel session, 2026-10-10)
A jammer does more than raise the floor (Frontline RF only): co-band **blackout**, **bearing bias** (operator median ~590→950 m), and front-end **saturation spurs** that the sorter rejects across flights (a rare one slips through as a false fix). `e01-merged-baseline` is the reference point for this version.

## v1.1 — headless batch runner + speed-up (2026-10-10)
`sim/engine.js` runs the model half of `heatmap.html` in Node; `sim/batch.js` runs paired A/B/C experiments on worker threads. Fused the bearing+strength likelihood grid into one pass over flat arrays (2.5–6× faster, identical results). Model unchanged.

## v1.0 — project as handed over (2026-10-10)
Four target types, bladeRF 2-ch cone DF, strength / bearings / combined / array / fused receivers, record-then-map across flights, Film mode. `e00-baseline` captures its numbers.
