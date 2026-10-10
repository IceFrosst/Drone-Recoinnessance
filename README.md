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
