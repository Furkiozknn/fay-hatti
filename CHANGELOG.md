# Changelog / devlog

One line per day: date, the one visible change, and any measured number (for example, how many moves the bot needed to solve the daily puzzle).

- 2026-11-03: Repository created for Game Off 2026 (theme SHIFT). Design work started.
- 2026-11-03: v0.1 first playable: 5x5 map, row/column shifts with quakes, daily + endless, share text, EN/TR, synthesized sound. Solver success 12/12 seeds in Chrome (?auto, bot A and bot B) and 40/40 in Node (30 daily maps + 10 endless levels); bot A average 4.25 moves (= par), bot B 6.5 (Chrome, 12 seeds); 60 fps desktop and phone in headless Chrome.
- 2026-11-26: Hint system: costly "Show Solution Path" fallback for stuck users with step-by-step guidance and 1-star score cap.
