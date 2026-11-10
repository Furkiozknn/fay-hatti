# tools/gate.mjs: regression gate (fay-hatti)

Adapted from kale-savunmasi's `tools/gate.mjs` (same output lines and options), but built for this game: the puzzle
engine runs in Node, so the sim part runs the game's own tools instead of a browser fast-forward.

## What it checks

1. **sim**: `tools/sim.mjs 20261108 28 20` (28 daily seeds from fixed dates + endless levels 1-20 = 48 puzzles; the
   generator, the optimal solver and the in-game beam bot, every path replayed with the real move + quake rules) on
   the base and on the candidate. The candidate runs twice; its summary and a sha of the per-puzzle table (timing
   columns dropped) must be identical, or the comparison is void (FAIL). Gated metrics:
   - `solvedBoth`: puzzles both solvers solve and replay, must not drop;
   - `avgPar`: generator difficulty, may change by at most 0.5 either way (a real redesign re-records the baseline);
   - `avgB`: average moves of the beam bot (`?demo=b`), may rise by at most 0.25;
   - `puzzles`, `avgA` (optimal moves), `rows` (table sha) are info; a non-zero `sim.mjs` exit fails.
2. **cards**: `tools/cardcheck.mjs` on the candidate must exit 0 (daily boards, par, moves and stars identical with
   cards none vs all).
3. **browser**: headless Chromium opens the candidate from `file://` with `?seed=20261108&nosave` (first visit, so the
   tutorial is up) at 390x844, 360x740 and 412x915 (isMobile + hasTouch): 0 page errors, 0 console errors, 0 failed
   requests, and every visible `#bar button` (undo, restart, menu, sound, language; hint is hidden in daily) must be
   inside the viewport and be what `elementFromPoint` returns at its centre. `GAME.browser.known` lists reported
   offenders (none on main).

The board's row/column arrows are drawn on the canvas and are not checked here.

## Running

```sh
npm ci --prefix tools --ignore-scripts && tools/node_modules/.bin/playwright install chromium   # once
node tools/gate.mjs                       # base = origin/main:index.html, candidate = working tree
node tools/gate.mjs --base <ref>          # any git ref (CI: HEAD^1)
node tools/gate.mjs --baseline            # base = tools/gate-baseline.json
node tools/gate.mjs --record              # write tools/gate-baseline.json from the working tree (main only)
node tools/gate.mjs --candidate x.html    # a scratch build, index.html untouched
node tools/gate.mjs --only sim|browser    # sim includes cards
```

Each build is copied to a temp dir with the working tree's `tools/sim.mjs` and `tools/cardcheck.mjs`; only
`index.html` differs. About 25 s with an identical base. CI: `.github/workflows/gate.yml` on pull_request and on push
to main (base `HEAD^1`).
