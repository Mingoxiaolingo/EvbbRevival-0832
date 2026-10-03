# Evbb Revival — Design

Neon voxel night. Dark void backgrounds, emerald/teal glow pulled from the hero render, hard pixel edges.

## Color
- --void #05070b (page bg), --deep #0a0f16 (panels), --line rgba(120,255,214,.14)
- --emerald #3dffb0 (primary, CTAs, live), --cyan #4fd8ff (secondary), --lapis #5c6bff (MOTD blue accent), --redstone #ff4d5e (offline/warnings), --gold #ffd24a (owner)
- Text: #e9fff7 main, #8aa39b muted

## Type
- Display: Pixelify Sans (700) — headings, big numbers
- Body: Chakra Petch (400/500/600)
- Mono: JetBrains Mono — IPs, commands, labels

## Shapes
- No rounded corners on structural elements (radius 0–2px). Pixel "notched" corners via clip-path on buttons/cards.
- Blocky 4px offset shadows in emerald for CTAs.

## Background
- Pixel grid overlay, scanline noise, radial emerald glows, floating CSS cubes.

## Motion
- Staggered reveal on load (hero), IntersectionObserver reveal for sections, marquee ticker, pulsing live dot. Respect prefers-reduced-motion.
