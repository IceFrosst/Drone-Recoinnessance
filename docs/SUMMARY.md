# Heat-Map Recon — what changed and why it matters

A one-page brief on the passive RF direction-finding payload (bladeRF 2.0 micro, 2 coherent channels) and the work done to make it hold up against a modern jamming/EW environment. Every number is **modelled**, from a notional physics model calibrated to published figures (`docs/research.md`), not a field test. They show the direction and rough size of each effect, not a guaranteed result.

## The problem a passive DF drone faces on this front

1. **Jamming** raises the noise floor, buries co-channel signals, drags bearings, and — worst — **overloads the receiver front end**, throwing phantom "false fixes" that look like real targets.
2. **New tech on both sides**: fibre-optic FPV drones that emit *no* RF, long-range low-rate control links that sit *below* a normal detector, and decoy emitters that fake a control-link signature.

## What we built (all off by default; all A/B/C tested)

| Lever | What it does | Where it helps | Honest limit |
|---|---|---|---|
| **Preselect filter** (~$35, before the ADC) | throws away out-of-band energy before it can overload the receiver | **takes spur false-fixes to zero**; stops broadband desense from an off-band jammer | can't help when the jammer shares the target's band |
| **LNA** (~$25) | lowers noise figure → hears weaker/farther emitters | +sensitivity, more operators located | **alone it lowers overload headroom → *more* false fixes**; must sit *after* the filter |
| **Adaptive nulling** (free, code) | steers a spatial null onto the jammer (MVDR) | clears co-channel burying & bearing bias | 2 channels = **one** null; a 2nd jammer needs more channels (→ Kraken/fused); digital, so it can't fix overload |
| **Time/frequency excision** (free) | notches a swept jammer / blanks a pulsed one | recovers the gaps a non-continuous jammer leaves | nothing to recover against a barrage |
| **Cyclostationary detection** (free) | detects hop/packet cadence *below* the energy floor | **biggest software win**; the only thing that catches low-rate spread links | only helps known signatures; needs several cycles |
| **SEI — specific emitter ID** (free) | a hardware fingerprint re-links an operator after it retunes | retune no longer resets the track: operators located 85 % → 96 % when they change settings | needs enough SNR to read the fingerprint (strong emitters only) |

The one systems insight that ties it together: **the filter (analog, before the ADC) is the only thing that fixes front-end overload; the DSP (after the ADC) is the only thing that fixes co-channel interference. They are complementary, not interchangeable — you need both.**

## The accuracy ladder (each lever's cumulative contribution)

From `e14-accuracy-ladder` (1,080 campaigns, 60 maps × 3 altitudes, Frontline RF on). Each row keeps everything above it. "Operators ≤500 m" is the actionable number; "false fixes" is front-end spurs that fooled the sorter.

| Payload | Operators ≤500 m | Operators located | All-HVT located | Median err | False fixes |
|---|---|---|---|---|---|
| bare bladeRF | 20 % | 56 % | 73 % | 284 m | 48 |
| + preselect filter | 22 % | 57 % | 74 % | 274 m | **0** |
| + LNA (filter→LNA) | 28 % | 70 % | 79 % | 285 m | 0 |
| + nulling + excision | 27 % | 69 % | 78 % | 270 m | 0 |
| + cyclostationary + SEI | 30 % | 92 % | 88 % | 306 m | 0 |
| **+ fused KrakenSDR** | **49 %** | **96 %** | **90 %** | **208 m** | 0 |

The filter zeroes the false fixes; the LNA buys sensitivity; cyclostationary + SEI lift *located* sharply (they recover weak and retuned operators); the fused Kraken delivers the biggest jump in *actionable* fixes (it hears the whole band mirror-free). Net: operators within 500 m **20 % → 49 %**, located **56 % → 96 %**.

## The accuracy gain (validated over 100 maps × 3 altitudes)

Bare bladeRF as the project started → fully-equipped fused payload (filter→LNA + nulling + excision + cyclostationary + the KrakenSDR second receiver):

- **Drone-operator fixes within 500 m: 20 % → 47 %** (paired Δ +27.3 pp, 95 % CI [+24.1, +30.7]).
- **Operators located: 56 % → 86 %.**
- **Median error: ~277 → ~204 m.**
- **Front-end false fixes: eliminated** (the filter).
- Calibration honesty held: truth inside the 95 % ellipse ~89 %.

## What stays hard — on purpose

- **Fibre-optic FPV** emit nothing, so they are unlocatable at any price. With 30 % of operators on fibre, ~70 % is the ceiling, and the sim shows it rather than hiding it.
- **Decoys** really transmit, so no direction-finding removes them — the decoy false-fix count is identical across every equipped payload.
- **GNSS spoofing** is the sharpest warning: it drops actionable fixes (≤500 m) from 69 % to 14 % and quadruples median error, while the located count and the 95 %-ellipse calibration barely move — the system reports just as many confident fixes, all displaced. No RF countermeasure touches it; the fix is anti-spoof/inertial navigation, out of this payload's scope. A tight ellipse is not proof a fix is right.
- The front-end and null-depth numbers are notional-but-calibrated; real nulling depends on phase-calibrating two channels on a vibrating airframe, which a real build still has to prove.

## An operational insight the sim surfaces

Against a **relocating / retuning enemy**, more sorties are not automatically better. With "keep all" memory, flying 8 passes instead of 2 *lowers* operator fixes within 500 m (45 % → 24 %) because stale recordings from teams' old positions pile up and smear the fix — and 22 % of the fixes go confidently wrong (`e16`). Fading old recordings fixes it: at 8 flights, "fade ½ per flight" lifts operators to 42 % and "last flight only" to 50 %, with the confidently-wrong rate dropping to 6 % and 1 % (`e17`). The lesson for tasking: against a moving enemy, **freshness beats quantity** — forget old data rather than averaging over where the target *used* to be.

## How it was measured

`sim/engine.js` runs the model from `heatmap.html` headless; `sim/batch.js` runs paired A/B/C experiments (every variant flies the same maps) across thousands of campaigns on worker threads. Results in `results/`, accuracy-per-version in `docs/CHANGELOG.md`, every version a git commit for rollback.
