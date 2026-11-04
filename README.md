# Fay Hattı — Fault Line

A daily sliding-tile puzzle on a map of Anatolia, made for **GitHub Game Off 2026** (theme: **SHIFT**).
Shift rows and columns to bring rivers and caravan roads to the villages. After every move a small earthquake shifts one row on its own.

**Play:** https://furkiozknn.github.io/fay-hatti/

<img src="docs/screenshot.png" alt="Fay Hattı on a phone: a 5x5 parchment map with rivers, roads, villages, a spring and a caravanserai" width="300">

- **Daily puzzle:** everyone gets the same map each day (seeded by the date).
- **Endless mode:** numbered levels that grow from 2 villages and short solutions to 3 villages, mountains and longer solutions.
- One HTML file, no downloads, no external requests. Phone first (portrait), works on desktop. English and Turkish.

## How to play

1. Drag a row sideways or a column up or down, or tap the arrows around the board. Tiles that leave one edge come back on the other.
2. Villages, mountains, the spring and the caravanserai never move: the other tiles slide past them.
3. Each village shows what it needs: a water drop (river from the spring) and/or a road sign (road from the caravanserai). Connect every need to solve the map.
4. After each of your moves a small quake shifts one row by one tile. The red band and the line above the board show which row is next and which way it will go. If your move solves the map, the ground stays calm.
5. Solve within par (the fewest possible moves) for 3 stars, par + 2 for 2 stars. Share your result without spoilers.

**Controls:** drag or tap the arrows; keyboard WASD moves the cursor, arrow keys shift its row or column, Z or Backspace undo, R restart, M mute, Esc menu.

## Daily difficulty ramp

Starting from **2026-11-15**, daily puzzles follow a gentle weekly difficulty curve. Mondays and Tuesdays provide an accessible entry point (par 3–4), midweek days deepen the planning horizon (par 4–5), and weekends present peak tactical challenges (par 5–6). Historical boards for dates up to **2026-11-14** are strictly preserved byte-identical for devlog video reproducibility.

| Day / Gün | Rhythm / Ritim | Target Par | Scramble ($K$) | Quakes ($P$) | Character / Oyun Karakteri |
|---|---|---|---|---|---|
| **Monday** / Pazartesi | Early week / Hafta başı | 3–4 | 4 | 5 | Gentle opening: compact routes, quick river/road connections |
| **Tuesday** / Salı | Early week / Hafta başı | 3–4 | 4 | 5 | Clear canal alignments, low decoy distraction |
| **Wednesday** / Çarşamba | Midweek / Hafta ortası | 4–5 | 5 | 5 | Balanced depth: branching network junctions |
| **Thursday** / Perşembe | Midweek / Hafta ortası | 4–5 | 5 | 5 | Strategic routing around mountain barriers |
| **Friday** / Cuma | Midweek / Hafta ortası | 4–5 | 5 | 5 | Multi-step shift sequencing with decoy channels |
| **Saturday** / Cumartesi | Weekend / Hafta sonu | 5–6 | 6 | 5 | Tactical challenge: complex multi-village routing |
| **Sunday** / Pazar | Weekend / Hafta sonu | 5–6 | 6 | 5 | Peak weekly puzzle: deep scramble, tight quake synchronization |

- **Fairness:** Every daily par is verified by the optimal planner (Bot A).
- **Integrity:** Seeds up to `2026-11-14` remain 100% byte-identical.
- **Languages:** Fully supported in English and Turkish (`?lang=en` / `?lang=tr`).

## URL flags

| Flag | Effect |
|---|---|
| `?seed=YYYYMMDD` | Play the daily map of that date (any short word also works as a seed) |
| `?level=N` | Play endless level N |
| `?demo=1` | The bot solves the map visibly, about one move every 0.8 s (strategy A) |
| `?demo=a` / `?demo=b` | Bot strategy A (optimal planner) or B (greedy beam search, often slower) for "bot race" videos |
| `?auto` | Fast bot (strategy A; add `&demo=b` for B) |
| `?debug` | fps, seed, par, generation time overlay |
| `?lang=en` / `?lang=tr` | Force the language (default: Turkish for Turkish browsers, English otherwise) |
| `?nosave` | Do not write to localStorage |

`window.fayHatti` exposes `seed`, `moves`, `solved`, `state` (`loading`, `play`, `won`), `par`, `stars`, `mode`, `level`, `dailyRamp`, `nextQuake`, `bot`, `plan`, `board`, `fps`, `genMs` and the actions `move(code)`, `undo()`, `restart()`, `start(mode, arg)`. A move code is `line * 2 + dir`: lines 0-4 are rows, 5-9 columns; dir 0 is right/down, 1 is left/up.

Saves use localStorage keys starting with `fayhatti.` (language, mute, daily results, endless level, help seen).

## How it works

- **Generator:** places the spring, caravanserai, villages and mountains, routes a river and a road network to every need (randomised shortest paths), fills the rest with decoy tiles, then scrambles the solved board by playing K moves backwards, undoing each quake as well. So a solution of at most K moves always exists.
- **Solver (bot A):** iterative-deepening search with a transposition table over (board, quake phase). It finds the fewest-moves solution, which becomes the par.
- **Bot B:** a beam search guided by a greedy score (connected villages, network size, distance to the next village). It plays "by feel" and often needs more moves.
- `node tools/sim.mjs [fromDate] [days] [endlessLevels]` runs the same engine in Node and replays both bots' solutions under the real rules.

## Devlog

See [CHANGELOG.md](CHANGELOG.md): one line per day with measured numbers.

Made with AI: code and visuals by Claude (Anthropic) models under our direction.

## License

MIT. See [LICENSE](LICENSE).
