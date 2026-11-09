# Fay Hattı (Fault Line): press kit

Factsheet and copy for press, jams and store pages. Every number below was
measured on the current `index.html` (see "Measured" at the end). Text only;
the one image is the existing [`screenshot.png`](screenshot.png).

## Factsheet

| | |
|---|---|
| Title | **Fay Hattı** (Turkish for "fault line") |
| Genre | Daily sliding-tile puzzle on a map of Anatolia |
| Jam | GitHub Game Off 2026, theme **SHIFT** |
| Developer | [Furkiozknn](https://github.com/Furkiozknn), built with Claude (Anthropic) models under human direction |
| Platforms | Any modern browser, desktop and phone (touch, mouse, keyboard) |
| Play | <https://furkiozknn.github.io/fay-hatti/> |
| Source | <https://github.com/Furkiozknn/fay-hatti> |
| itch.io | Planned: `https://furkiozknn.itch.io/fay-hatti` (address taken from the old press-kit branch; not verified to be live) |
| Languages | English, Turkish |
| Tech | One `index.html`: Canvas 2D, Web Audio synthesis, no image or sound files, no external requests, no build step |
| Price | Free |
| Licence | MIT |

## Short description (1 line)

Shift rows and columns of an Anatolian map to bring rivers and caravan roads
to every village, while a small earthquake shifts the ground after each move.

## Long description

Every day, everyone gets the same 5×5 map, seeded by the date. Slide a row
sideways or a column up or down; tiles wrap around the edge and glide past
the villages, mountains, spring and caravanserai, which never move. Each
village asks for water, a road, or both.

The twist is the fault line. After each of your moves a small quake shifts
one row by itself. The red band shows which row is next and which way it
will go, so you plan around the tremors. Solve the map with your own move
and the ground stays calm.

Finish within par for three stars, then share a spoiler-free result card.

## Features (current build)

- **Daily puzzle:** one map per day for everyone; weekday ramp (Mon–Tue
  short, Wed–Fri medium, weekends longest). Daily maps are sealed: the seed
  integrity check verifies every day through 31 December is solvable.
- **Endless journey** with three difficulty tiers:
  - *Kolay / Easy:* gentle par, calm turns between quakes;
  - *Normal:* the classic curve, a quake after every move;
  - *Zor / Hard:* three villages, mountains and bridges from level 1, a
    four-quake cycle.
- **Endless variety:** stone bridges (river under, road over), ferries,
  roadside caravan stops, ancient ruins, and double-fault quakes that shift
  two rows at once.
- **Endless Marathon** (daily multi-stage run), milestone badges, par-time
  speedrun timer, daily streak.
- **Live "villages linked" counter** above the board, with a short pulse
  on each village as it connects.
- **Hint:** glows the optimal next row or column for 2 seconds (asks the
  built-in optimal planner); tap again for the full solution path (costs
  stars). Endless and marathon only, never in the daily.
- **Undo** restores the board and the quake schedule exactly.
- **Share result:** a 640×640 PNG card (solved map, stars, date,
  #FayHattı) through the phone's share sheet, or a PNG download.
- **Skill cards:** 18 cosmetic and gameplay cards unlocked between boards
  (themes, regional biomes, juice effects). Cards never change the daily.
- **Touch first:** swipe thresholds with an accidental-swipe guard, 44 px
  edge arrows, a one-hand (left/right) bottom bar.
- **Accessibility:** high-contrast mode, reduced-motion support, screen
  reader announcements for moves and quakes, keyboard play, haptics toggle.
- **Two built-in bots:** A, an optimal planner (iterative deepening), and B,
  a greedy beam search. Both are available for demos (`?demo=a`,
  `?demo=b`, `?auto`).

## Controls

| Action | Keyboard | Touch / mouse |
|---|---|---|
| Move cursor | W A S D | tap a tile |
| Shift row / column | arrow keys | drag, or tap the edge arrows |
| Hint (endless) | H | Hint button |
| Undo | Z or Backspace | Undo |
| Restart | R | Restart |
| Mute | M | Sound |
| High contrast | C | Menu |
| Menu / close | Esc | Menu, ✕ |

## Measured (this build)

- `node tools/sim.mjs 20261108 7 10`: 17/17 puzzles (7 daily + 10
  endless) solved by both bots and replayed under the real rules; bot A
  average 4.18 moves (= par), bot B 6.94.
- `node tools/sim.mjs`: 7/7 daily maps, bot A average 4.43 (= par).
- `node tools/cardcheck.mjs`: daily par, moves and stars for
  2026-11-08 … 2026-11-14 are identical with all cards on or off.
- Easy and Hard tiers, levels 1–15: 30/30 solved by both bots (par 2–5 and
  3–5).
- Headless Chromium: the page loads with 0 console or page errors and makes
  0 network requests; `?auto` bots win the daily and endless maps.

Not measured here: frame rate on real phones, and whether the itch.io page
is live.

## Credits

Design, code and visuals by Claude (Anthropic) models under the direction of
[Furkiozknn](https://github.com/Furkiozknn). All sound is synthesized at
runtime with Web Audio. No third-party assets.

---

## Basın kiti (Türkçe özet)

| | |
|---|---|
| Ad | **Fay Hattı** |
| Tür | Anadolu haritasında günlük kaydırmalı karo bulmacası |
| Oyun şenliği | GitHub Game Off 2026, tema **SHIFT** |
| Geliştirici | [Furkiozknn](https://github.com/Furkiozknn), insan yönlendirmesiyle Claude (Anthropic) modelleri |
| Oyna | <https://furkiozknn.github.io/fay-hatti/> |
| itch.io | Planlanan adres: `https://furkiozknn.itch.io/fay-hatti` (yayında olduğu doğrulanmadı) |
| Diller | Türkçe, İngilizce |
| Teknoloji | Tek `index.html`: Canvas 2D, Web Audio sentezi, harici dosya ya da istek yok |
| Lisans | MIT |

**Tek cümle:** Anadolu haritasının satır ve sütunlarını kaydır, her köye su
ve kervan yolu götür; her hamleden sonra küçük bir deprem bir satırı
kendiliğinden kaydırır.

**Öne çıkanlar:** herkese aynı günlük harita; Kolay / Normal / Zor sonsuz
mod; köprü, feribot, kervansaray durağı, antik harabe ve çifte fay depremi;
"3/3 Köy Bağlı" canlı sayaç; 2 saniyelik optimal ipucu parıltısı (yalnız
sonsuz mod); depremi de geri alan "Geri al"; 640×640 "Paylaş" sonuç kartı;
18 hüner kartı (günlük bulmacayı asla değiştirmez); tek el kullanımı,
yüksek kontrast, ekran okuyucu duyuruları.

**Ölçümler** yukarıdaki "Measured" bölümündedir.
