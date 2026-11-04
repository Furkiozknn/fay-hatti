<p align="center">
  <a href="https://furkiozknn.github.io/fay-hatti/">
    <img src="docs/screenshot.png" width="320" alt="Fay Hattı: a daily sliding-tile puzzle on an Anatolian parchment map. Click to play in your browser.">
  </a>
</p>

<p align="center">
  <a href="https://furkiozknn.github.io/fay-hatti/"><img src="https://img.shields.io/badge/%E2%96%B6_Play_free-in_your_browser-C2410C?style=for-the-badge&logo=googlechrome&logoColor=white&labelColor=17120B" height="40" alt="Play free in your browser"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Game_Off_2026-SHIFT-E0553A?style=for-the-badge&logo=github&logoColor=white&labelColor=17120B" alt="GitHub Game Off 2026 theme SHIFT">
  <img src="https://img.shields.io/badge/built_by-Claude-D4C3A2?style=for-the-badge&logo=claude&logoColor=white&labelColor=17120B" alt="Built by Claude">
  <a href="LICENSE"><img src="https://img.shields.io/badge/licence-MIT-7FB26A?style=for-the-badge&labelColor=17120B" alt="MIT licence"></a>
  <img src="https://img.shields.io/badge/no_install-desktop_%C2%B7_phone-F7ECD6?style=for-the-badge&labelColor=17120B" alt="No install, desktop and phone">
</p>

<!-- portals:start -->
<!-- portals:end -->

<p align="center">
  <strong>A daily sliding-tile puzzle on a map of Anatolia made for GitHub Game Off 2026: shift rows and columns to bring rivers and caravan roads to the villages while small earthquakes shift the ground after every move.</strong>
</p>

<!-- gameplay gif -->

## Features

- **Daily puzzle & endless journey:** Everyone solves the same 5x5 map each day seeded by the date; endless mode levels ramp from 2 villages and short solutions up to 3 villages, mountains, and longer solutions.
- **Living fault line mechanic:** After every move, a small earthquake shifts 1 row by 1 tile—anticipate tremors via the red indicator band, or solve the puzzle so the ground stays calm.
- **Par scoring & star ratings:** Solve within par (the fewest possible moves) for 3 stars, or par + 2 for 2 stars, with spoiler-free result sharing.
- **Dual-solver AI built-in:** Includes 2 bot strategies—strategy A (optimal planner via iterative deepening) and strategy B (greedy beam search at ~0.8 s per move)—for in-engine demonstrations and benchmarking.
- **Ultra-lean zero-install web design:** One HTML file with no downloads, no external requests, and zero dependencies, running smoothly on desktop and phone with touch, mouse, and keyboard in English and Turkish.

## How to play

> [!TIP]
> **Goal:** Connect every village's needs—a water drop (river from the spring) and/or a road sign (road from the caravanserai)—by shifting rows and columns. If your move solves the map, the ground stays calm!

1. **Shift rows and columns:** Drag a row sideways or a column up or down, or tap the arrows around the board. Tiles that leave one edge wrap around and re-enter on the opposite side.
2. **Fixed landmarks:** Villages, mountains, the spring, and the caravanserai never move; all other tiles slide past them.
3. **Connect needs:** Each village shows what it needs: a water drop (river from the spring) and/or a road sign (road from the caravanserai). Connect every need to solve the map.
4. **Earthquake phase:** After each of your moves, a small quake shifts one row by one tile. The red band and the line above the board show which row is next and which way it will go.
5. **Score stars:** Solve within par (the fewest possible moves) for 3 stars, or par + 2 for 2 stars. Share your result without spoilers.

### Controls

| Action | Controls | Touch / Mouse |
|---|---|---|
| Move cursor | `W` `A` `S` `D` | Tap tile |
| Shift row / column | `←` `↑` `→` `↓` | Drag row/column or tap edge arrows |
| Undo move | `Z` or `Backspace` | Undo button |
| Restart level | `R` | Restart button |
| Sound mute | `M` | Speaker button |
| Menu / pause | `Esc` | Menu button |

- **Persistence:** Settings (language, mute, daily results, endless level, help seen) are saved in `localStorage` under keys starting with `fayhatti.`. Turkish is the default for Turkish browsers, English otherwise.

<details>
<summary><b>URL flags for testing</b></summary>

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

`window.fayHatti` exposes `seed`, `moves`, `solved`, `state` (`loading`, `play`, `won`), `par`, `stars`, `mode`, `level`, `nextQuake`, `bot`, `plan`, `board`, `fps`, `genMs` and the actions `move(code)`, `undo()`, `restart()`, `start(mode, arg)`. A move code is `line * 2 + dir`: lines 0-4 are rows, 5-9 columns; dir 0 is right/down, 1 is left/up.

</details>

<details>
<summary><b>How it works & technical notes</b></summary>

- **Generator:** Places the spring, caravanserai, villages and mountains, routes a river and a road network to every need (randomised shortest paths), fills the rest with decoy tiles, then scrambles the solved board by playing K moves backwards, undoing each quake as well. So a solution of at most K moves always exists.
- **Solver (bot A):** Iterative-deepening search with a transposition table over (board, quake phase). It finds the fewest-moves solution, which becomes the par.
- **Bot B:** A beam search guided by a greedy score (connected villages, network size, distance to the next village). It plays "by feel" and often needs more moves.
- **Simulation tool:** `node tools/sim.mjs [fromDate] [days] [endlessLevels]` runs the same engine in Node and replays both bots' solutions under the real rules.

</details>

## Running locally

Serve the folder over HTTP (or open `index.html` directly in any modern browser):

```bash
python -m http.server 8000
```

Then open <http://localhost:8000/>.

## Made with Claude Code

Code and visuals built by Claude (Anthropic) models under human direction for **GitHub Game Off 2026** (theme: **SHIFT**). Pure HTML, Canvas 2D, and Web Audio with no external dependencies or build step.

See [CHANGELOG.md](CHANGELOG.md) for daily development logs and solver benchmark numbers.

### Claude Game Arena

Fay Hattı is part of the **Claude Game Arena** series, where games are built with AI assistance:

[Hisar](https://furkiozknn.github.io/kale-savunmasi/) · [Çay Ocağı](https://furkiozknn.github.io/cay-ocagi/) · [Çini Ustası](https://furkiozknn.github.io/cini-ustasi/) · [Martı](https://furkiozknn.github.io/marti/) · [Kervan](https://furkiozknn.github.io/kervan/) · [Dolmuş](https://furkiozknn.github.io/dolmus/) · [Peri Golf](https://furkiozknn.github.io/peri-golf/) · [Mehter](https://furkiozknn.github.io/mehter/) · [Boğaz Vapuru](https://furkiozknn.github.io/bogaz-vapuru/) · [Simit Fırını](https://furkiozknn.github.io/simit-firini/) · [Karagöz](https://furkiozknn.github.io/karagoz/) · [Lale Bahçesi](https://furkiozknn.github.io/lale-bahcesi/) · [Kırkpınar](https://furkiozknn.github.io/kirkpinar/)

## License

MIT, see [LICENSE](LICENSE).

Like the game? You can support new rounds on [Buy Me a Coffee](https://buymeacoffee.com/furkiozkann). The game stays free.
