# Changelog / devlog

One line per day: date, the one visible change, and any measured number (for example, how many moves the bot needed to solve the daily puzzle).

- 2026-11-03: Repository created for Game Off 2026 (theme SHIFT). Design work started.
- 2026-11-03: v0.1 first playable: 5x5 map, row/column shifts with quakes, daily + endless, share text, EN/TR, synthesized sound. Solver success 12/12 seeds in Chrome (?auto, bot A and bot B) and 40/40 in Node (30 daily maps + 10 endless levels); bot A average 4.25 moves (= par), bot B 6.5 (Chrome, 12 seeds); 60 fps desktop and phone in headless Chrome.
- 2026-11-04: Ported high-contrast card as always-on accessibility mode: WCAG AAA contrast palette, distinct river/road styling, prefers-contrast OS sync, C hotkey, and menu toggle.
- 2026-11-04: Ported haptics card as always-on tactile feedback: slide (22 ms), undo (12 ms), quake (35/45/30 ms), win pattern, reduced-motion suppression, and menu toggle.
- 2026-11-04: Ported seed-integrity card as always-on verification: 32/32 daily seeds verified solvable through Dec 31, interactive seal report dialog, re-verify runner, and window.fayHatti.integrity API.
- 2026-11-04: Ported analytics-hooks card as always-on telemetry: 10 event types (session, puzzle, moves, quakes, solves, drop-off), CustomEvent dispatching, ring buffer (200), and window.fayHatti telemetry API.
- 2026-11-04: Ported tutorial card as always-on interactive onboarding: 3-step dynamic parchment tooltip (shifts, quake, village needs), canvas highlighting, Help replay button, and window.fayHatti tutorial API.
- 2026-11-04: Ported audio-polish card as always-on sound synthesis: ceramic tile mechanical clicks with soft cursor navigation, tectonic quake rumble with virtual-bass harmonics, and window.fayHatti.sfx API.
- 2026-11-04: Ported cosmetic cards theme-night and theme-paper (one branch, two cards): dark indigo Gece and layered Kâğıt themes, radio pill selector, ?theme URL flag, and card registry (implemented: true).
- 2026-11-04: Ported cosmetic card region-kapadokya: volcanic tuff palette, fairy chimneys, cave dwellings, Seljuk caravanserai, weekly rotation (debut Nov 9), and card registry (implemented: true).
- 2026-11-04: Ported cosmetic card region-karadeniz: mist-tinted deep greens, Kaçkar alpine peaks, tea sprigs, Serander chalets, horon cadence, and card registry (implemented: true).
- 2026-11-04: Ported cosmetic card region-ege: Aegean olive oil greens, terracotta amphorae, whitewashed stone houses, sunny folk melody, weekly rotation (debut Nov 23), and card registry (implemented: true).
- 2026-11-04: Ported cosmetic card juice-dust: 22 floating sand and dust motes with wind sway, quake agitation, theme-adaptive palettes, and card registry (implemented: true).
- 2026-11-04: Ported cosmetic card juice-ripples: concentric water ripple rings, shimmer glow, splash droplets on village water connection, synthesized chirp/chime sfx, and card registry (implemented: true).
