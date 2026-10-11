# Research notes — sourced parameters for the model

All figures gathered 2026-10-10 by a research pass. `[calc]` = my arithmetic; `[unverified]` = single source. These are the real-world anchors the model's notional constants are calibrated against — see `docs/CHANGELOG.md` for which constant each one set.

## bladeRF 2.0 micro / AD9361 receiver
- **Measured board NF (LibreSpace lab):** 4.9 dB @437 MHz · 7.4 @1.28 GHz · 9.0 @2.25 GHz · 9.5 @2.425 GHz · 15.8 @5.83 GHz. The bladeRF has **no front-end filters**; dynamic range varies ~30 dB across the band. (B210: 4.4–9.6 dB; Pluto: 4.1–9.3 dB.) — https://gitlab.com/librespacefoundation/sdrmakerspace/sdreval
- **AD9361 chip, max gain:** NF 2 dB @800 MHz, 3 @2.4 GHz, 3.8 @5.5 GHz; IIP3 −18/−14/−17 dBm; gain 0–74.5 dB. Absolute max RF input **+2.5 dBm**. Input P1dB not published (≈IIP3−10 ≈ −28 dBm [calc]).
- **HackRF One** measured NF 11.1 dB alone, 3.4 dB with LNA. USRP B210 spec NF <8 dB, IIP3 −20 dBm.
- **AGC:** manual / fast-attack / slow-attack / hybrid; ADI advises fast-attack during preamble then lock.

## External LNAs
| Part | Band | NF | Gain | Linearity | Price |
|---|---|---|---|---|---|
| ZX60-P33ULN+ | 0.4–3 GHz | 0.38 dB | 19 dB | OIP3 +34 dBm | $153 |
| ZX60-83LN-S+ | 0.5–8 GHz | 1.4 dB | 21 dB | P1dB +20.7 dBm | $219 |
| SPF5189Z (EOL) | 0.05–4 GHz | 0.55 dB | 18.7 dB | P1dB 22.4 dBm | ~$4–10 board |
| Nooelec LaNA WB | 0.3–8 GHz | ~1.5 dB | 16–20 dB | — | $65 |

## Preselect filters
- 433 MHz SAW: IL 1.8 dB, rejection ≥48 dB. 868 MHz SAW: IL 2.5 dB, 45 dB. 915 MHz SAW: IL 1.7 dB, >35 dB.
- 2.4 GHz LTCC (VBF-2435+): IL 2–3 dB, 20–25 dB rejection, $47. 2.4 GHz cavity: IL 0.7 dB, $469.
- Switched filter banks: Mercury AM3025A (7 bands 0.4–6 GHz); ATEK1001 (7 bands, IL ~6 dB, 40–45 dB rej, ~$419).

## The LNA downside (why order matters)
- Cascaded IIP3: 1/IIP3 = 1/IIP3₁ + G₁/IIP3₂ + … (linear). — rfessentials.com
- **ADI app note 1836:** a 15 dB LNA moved system IIP3 −34 → −49 dBm. **Sensitivity +3.77 dB, dynamic range −15 dB.** — analog.com
- Filter-before-LNA: the filter's IL adds ~dB-for-dB to NF (1.5 dB filter + 1.0 dB LNA ≈ 2.5 dB NF), but LNA overload costs 5–10 dB effective NF, so the filter usually wins.

## Nulling and detection
- N elements → N−1 nulls (2-ch = 1 null). MVDR: w = S⁻¹v/(vᴴS⁻¹v).
- Null depth: **−13 dB uncalibrated, −46 dB with per-subcarrier calibration**; ~30 dB with ±0.5 dB/±5° errors; a 1° phase error caps the null near −35 dB.
- Pulse blanking works on swept jammers (they look pulsed to a narrowband receiver).
- Energy detector SNR wall ≈ −3.3 dB with 1 dB noise-power uncertainty.
- **Cyclostationary:** Pd 0.99 vs energy 0.18 at −22 dB SNR (ideal AWGN sim, N=4096). — arXiv 0903.1183
- LoRa demod floor: SF7 −7.5 dB SNR → SF12 −20 dB SNR. — SX1276 datasheet

## Ukraine 2024–2026 drone/EW picture
- **Fiber-optic FPV:** Russia 30–50 % of FPV in some sectors, Ukraine ~15 % (Jan 2026). Russia >50k fiber FPV/month (Sep 2025). These emit **no RF**.
- **ELRS sensitivity:** 900 MHz −123 dBm @25 Hz, −117 @100 Hz; 2.4 GHz −115 @50 Hz, −105 @500 Hz.
- **Band shift (one front, Aug 2025):** 20 % at 400–490 MHz, 30 % at 720–1020 MHz, rest 2.1–2.3 GHz.
- **Relay drones:** Vidlunnia aerial repeater, 30 km @ 500 m.
- **Decoy emitters:** Russia shields SAM radars with radar-signal simulators.
- **Starlink** used by Russian units; cut off Feb 2026 via whitelist.
- **Russian EW:** Pole-21 (GNSS 1176–1575 MHz, ~25 km), Krasukha-4 (X/Ku radar), Silok (drones 3–4 km), Volnorez (900–2000 MHz, ~1 km). Older jammers = analogue swept carriers; **Tishina** = LoRa-structured jamming, needs 10–14.5 dB less power.
- **RF fingerprinting:** Dedrone ~300 sensors recognising ~250 drone types (vendor claim).
- **GNSS:** Baltic interference ~20× the 2024 level; spoofing/jamming near-continuous on the front.
