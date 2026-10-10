# RF Recon Simulator

A browser-based simulator of passive radio reconnaissance from a fixed-wing drone. The drone listens for ground emitters (drone control stations, jammers, radios), takes a bearing on each burst it catches, and crosses those bearings to estimate where each emitter is.

Open `index.html` in any browser. It is a single self-contained file with no build step, so it also deploys as-is to any static host (Vercel, Netlify, GitHub Pages).

## What it shows

- **Tab 1, Straight pass survey:** one straight line across the sector. Directional control stations aim at their own drones, so whether we cross a main beam decides who gets a tight fix and who stays vague.
- **Tab 2, Pinpoint on contact:** transit until a contact is classified as a drone control link (90% or more, from its signal fingerprint) and is stationary, then orbit it outside the steep zone until the fix is tight.

Every map is generated from a seed shown in the top bar. The same seed gives the same map, and `index.html#ALPHA1` opens that seed directly.

## The model

All numbers are modelled estimates from a notional physics model, not real RF data and not a claim of field performance. The constants (beam width, side and back lobe levels, bearing error, detection threshold, path loss, jammer effects, lock rule) sit in one block at the top of the script so field-test figures can replace them.

- Fix: maximum-likelihood bearing intersection (Gauss-Newton on angular residuals). Bearing weights account for signal strength, range, and our own GNSS drift. The worst bearing is dropped while any sits more than 3 sigma off, up to a quarter of them.
- Uncertainty: 95% ellipse from the solution covariance, inflated when bearings disagree more than modelled. Across 8 test maps at 3 altitudes, the true position fell inside the 95% ellipse in about 93% of fixes.
- Classification: per-burst fingerprint reads, more reliable at high signal-to-noise, combined into a running probability. A motion test (bearings that never converge) separates airborne emitters.

Not modelled: fibre-optic FPV drones (no RF to intercept), relay stations, operators changing power or channel, multiple receivers, real protocol libraries, and enemy fire against the drone.

## Five-stage classification pipeline

Every event the receiver hears runs through five gates in order, and must pass all five to be shown as a located transmitter. Cheap gates run first and discard the most, so the expensive direction-finding only runs on a shrinking candidate set. The side panel shows the funnel live.

1. **Band gate** — keep only events inside the watched frequency ranges (2.4 GHz is deliberately not covered, reflecting a KrakenSDR-class ceiling).
2. **Self-noise blanking** — drop events on the platform's own frequencies.
3. **Above-floor test** — keep only events a set margin above the rolling noise floor.
4. **Hop fingerprint** — reject continuous carriers (ordinary radios, video downlinks) and wrong-rhythm hoppers; keep only hoppers whose rate and burst shape match the target, plus strong wideband interferers.
5. **Persistence + geometric convergence** — require contact across several windows and bearings that cross at one spot; this is the direction-finding step acting as the final filter.

The gate parameters are notional placeholders at the top of the script. Stage 4's hop fingerprint is the one piece that can only be set from a real field recording, and is kept adjustable for that reason. The simulator proves the logic flows — the right signals survive and clutter dies — but it does not prove the fingerprint separates a real target from real-world clutter. That proof needs a field recording.

## Frontline degradation (the "Frontline RF" toggle)

A clean model is optimistic. The toggle adds the error a real sector introduces, so mentors can compare clean vs. degraded:

- **Array / attitude error** — the array is body-mounted, so aircraft roll, pitch and yaw feed into every bearing. Modelled as a residual angular error, correctly treated as *correlated* across nearby bearings (a drifting calibration offset does not average down), which is what keeps the uncertainty ellipse honest.
- **Multipath fading** — signal strength swings second to second as reflections add and cancel; weak emitters drop in and out.
- **Near-far floor rise** — a busy band raises the effective noise floor and buries weak distant emitters.
- **Airframe shadowing** — the aircraft's own body blocks signals arriving from behind the array.
- **Burst mis-association (deinterleave error)** — a burst from one emitter is occasionally filed under a nearby concurrent one; the convergence gate has to catch it.

Across 8 seeds × 3 altitudes × 2 tabs, the true position falls inside the 95% ellipse in 98% of located fixes with degradation on and 98% with it off. Degradation reduces how many emitters get located and pinpointed, and roughly 1% of located fixes can be confidently wrong (a tight ellipse on an ill-conditioned fix) — a real failure mode, left visible on purpose.

## Dense spectrum and deinterleaving

A real sector is not a handful of clean emitters — it is hundreds, overlapping in time and frequency. The simulator generates a configurable background population (friendly squad radios, cellular, Wi-Fi/Bluetooth, broadcast/satcom, vehicle mesh, and other units' control links) on top of the designated targets. Every emission becomes an anonymous burst, and an online clustering algorithm sorts the stream back into per-emitter tracks using frequency, bandwidth, hop signature and bearing — with co-channel collisions (a strong signal captures the channel), and re-acquisition of an intermittent emitter by its established location after a silence.

The deinterleaver scores itself against ground truth and reports, per mission: emitters in the sector, bursts sorted, tracks formed, and for each designated target whether it was **isolated**, **merged** with another emitter, **split** across tracks, or **lost** in the clutter. It also counts the *other* control links it found (real emitters, just not the tasked target) and any *false* control-link tracks from clutter. The located fixes shown are the targets the deinterleaver could isolate; merged and split targets carry a widened, flagged uncertainty ellipse.

One honest limit of the model: the located fix itself is computed from the target's own high-fidelity bearings (the validated direction-finding path). The deinterleaver decides whether, in the clutter, that target could have been isolated at all, and gates and degrades the result accordingly — it does not rebuild the fix from the imperfect clusters. Across 8 seeds x 3 altitudes x 2 tabs, the true position falls inside the 95% ellipse in about 98% of located fixes. The deinterleaver never suppresses a target the physics could locate; the "lost" ones are those that were unlocatable regardless.

## Mission profile, GNSS denial, and value-based tasking

- **Return to base.** The survey flies a straight line out across the sector and back. Pinpoint flies out, services targets, and returns when it hits a fuel budget ("bingo").
- **Value-based tasking.** Every candidate is scored by value — control links (operators) highest, then jammers (EW nodes), then radios, weighted by classification confidence and by how rough its current fix is (a valuable but imprecise target is worth refining). The drone diverts to the highest-value candidate, refines it, and moves on. The side panel's HVT-priority overlay shows the belief surface of where high-value targets are; it tightens as fixes converge.
- **180° arc, not a full circle.** To refine a target the drone flies a single half-circle around it, which cuts the bearing from a wide spread of angles, then breaks off. It does not loiter in circles over a hostile emitter.
- **GNSS-denial belt.** A broad belt runs along and behind the enemy line (distinct from the local comms-jamming bubbles around EW nodes). Inside it the drone dead-reckons and its own position drifts, which is folded into every fix taken there. This mirrors the real front, where GPS denial is near-continuous over wide areas while communications jamming is localized.
- **Frequency hopping and retune.** Control links hop across their whole band (not a narrow jitter), which is why the deinterleaver cannot sort them by frequency. Under Frontline RF, a share of operators retune (change hop rate / band) mid-mission, breaking the track so the emitter has to be re-acquired as a new one — the reactive adversary.

## Receiver and the scan trade-off

The module's binding constraint is **instantaneous bandwidth (IBW)** — how much spectrum the coherent receiver sees at once. A KrakenSDR-class receiver sees ~2.4 MHz, so it cannot watch the whole 400 MHz–2.3 GHz front at once; it **sweeps**, and the sweep sets how often each frequency is revisited.

The Receiver control exposes this as three tiers:
- **KrakenSDR** — 5-channel coherent, ~2.4 MHz IBW, ≤1.77 GHz. Revisits each frequency ~every 6 s and is blind above 1.77 GHz (no 2.4 GHz).
- **Wideband mid / Wideband** — wider-IBW coherent receivers (USRP-class), covering up to 3 or 6 GHz and revisiting every ~2–2.5 s.

Upgrading does three things, visible live: it **scans faster** (shorter revisit → more bursts caught → tighter fixes sooner), it **hears more of the band** (2.4 and 5.8 GHz come into coverage, so operators that were invisible become locatable), and it therefore **classifies sooner** (more bursts feed the fingerprint). The cost is SWaP — size, weight, power — and money: a multi-channel *coherent* wideband receiver is far more expensive and power-hungry than a Kraken, which matters on a small airframe. In testing, the upgrade lifted located targets by ~20% and unlocked the 2.4 GHz control links the Kraken cannot hear.

## Receiver comparison (KrakenSDR / HackRF / USRP)

The Receiver control carries four options; switch between them on the same map to compare. Prices are approximate and move — confirm before quoting.

| Receiver | IBW | Band | AoA? | ~Price | Role |
|---|---|---|---|---|---|
| KrakenSDR | 2.4 MHz | ≤1.77 GHz | yes (5-ch coherent) | ~$500 | prototype DF |
| HackRF One | 20 MHz | ≤6 GHz | **no** (single channel) | ~$150–320 | wideband scanner |
| USRP B210 | 56 MHz | ≤6 GHz | yes (2-ch coherent) | ~$1.5–2k | wideband DF |
| Wideband array | 56 MHz | ≤6 GHz | yes (4–5-ch coherent) | ~$10–25k | production DF |

The decisive property is **coherence**, not bandwidth. Angle-of-arrival needs phase-synchronised channels. A single **HackRF** is wider and higher in frequency than the Kraken and scans much faster — in the sim it detects and classifies the *most* emitters — but it has one channel, so it produces **no bearings and locates nothing**. It is a survey / signal-ID tool, not a locator. (Coherent HackRF arrays can be built with external clock and trigger sharing, but that is a DIY project.) KrakenSDR is slower and capped at 1.77 GHz, but it is coherent, so it locates. Wideband coherent AoA (USRP-class, several synchronised channels) scans fast, reaches 6 GHz and locates — at roughly 10–50× the Kraken's price, plus the size, weight and power cost that matters on a drone.

In the simulator, picking HackRF shows this directly: the funnel fills (tens of thousands of bursts detected and classified) but "located" stays at zero, every contact reads "no AoA", and the map shows no fixes. The coherent tiers locate; the wideband array locates the most because it also hears the 2.4 GHz operators the Kraken is blind to.

## Still not modelled

Where field data would matter most, and what a real system still has to solve:

- A validated hop fingerprint — the Stage-4 values are placeholders until a field recording sets them.
- 3D geolocation including emitter height.
- An adversary that changes frequency, bursts briefly, or runs silent.
- Fibre-optic FPV drones (no RF to intercept at all).
- Real coherent-array calibration and mutual coupling between elements.
- Weather and atmospheric ducting.
- Downlink bandwidth, aircraft endurance, and survivability under fire.
- The absence of ground truth in the field — here "error vs truth" is known only because the simulator placed the emitters.
