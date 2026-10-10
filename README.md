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
