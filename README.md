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
