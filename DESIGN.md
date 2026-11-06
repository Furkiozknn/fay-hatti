---
name: "Fay Hattı Design System"
version: "0.1.0"
status: "DRAFT"
description: "Authentic design tokens, visual specification, and motion grammar for Fay Hattı (Anatolian sliding-tile daily puzzle) and its Style E Light video marketing system."
author: "Fay Hattı Core Team"
specification: "https://github.com/google-labs-code/design.md/blob/main/docs/spec.md"
licence_references:
  google_design_md:
    licence: "Apache License, Version 2.0"
    url: "https://github.com/google-labs-code/design.md/blob/main/LICENSE"
  impeccable:
    licence: "Apache License, Version 2.0"
    url: "https://github.com/pbakaus/impeccable/blob/main/LICENSE"
tokens:
  colors:
    canvas:
      bg: "#1b2830"
      bgGradientTop: "#2a3f49"
      bg2: "#23343d"
      overlayBackdrop: "rgba(14, 22, 27, 0.74)"
      toastBg: "#0e171c"
      debugBg: "rgba(0, 0, 0, 0.6)"
    text:
      inkPrimary: "#f3ead8"
      inkMuted: "#c9bda4"
      paperInk: "#2b2118"
      panelHeading: "#5a2a18"
      panelHeadingSub: "#7a5638"
      panelMuted: "#5b4a36"
      quakeTickerText: "#ffd9cf"
      debugText: "#99ff99"
    brand:
      terracotta: "#a63f27"
      terracottaHover: "#b9472c"
      goldStar: "#f2b33d"
      goldStarStrokeActive: "#9c6a12"
      goldStarStrokeInactive: "#8d7f69"
      seismicRed: "#e0553a"
      seismicRedFade: "rgba(224, 85, 58, 0.6)"
      seismicWarningBand: "rgba(214, 70, 40, 0.16)"
      focusCyan: "#7cc4f0"
      botBadgeBg: "#33505c"
      botBadgeText: "#e7f4fb"
      calmGreen: "#6f8f6a"
    boardParchment:
      gradientStart: "#f0dfb3"
      gradientEnd: "#d8bf8b"
      outerBorder: "#9f7742"
      innerBorder: "rgba(120, 85, 45, 0.50)"
      cellDepression: "rgba(105, 72, 34, 0.13)"
      contourLines: "rgba(150, 108, 58, 0.20)"
      dropShadow: "rgba(0, 0, 0, 0.30)"
      flecksDark: "rgba(120, 84, 40, 0.08)"
      flecksLight: "rgba(255, 250, 232, 0.12)"
    tiles:
      plateGradientStart: "#f1e0b3"
      plateGradientEnd: "#d6bb83"
      plateBevelHighlight: "rgba(255, 251, 236, 0.70)"
      plateShadow: "rgba(70, 42, 18, 0.38)"
      steppeTuft: "rgba(125, 137, 60, 0.55)"
      pebble: "rgba(140, 110, 75, 0.35)"
    networks:
      riverFringe: "rgba(105, 140, 62, 0.40)"
      riverDeep: "#2a6c99"
      riverMain: "#3d95cf"
      riverHighlight: "rgba(255, 255, 255, 0.22)"
      riverFlowDash: "rgba(226, 247, 255, 0.90)"
      roadTrench: "rgba(122, 82, 48, 0.32)"
      roadMain: "#c79a5e"
      roadCenterRut: "rgba(248, 234, 200, 0.90)"
      roadFlowDash: "rgba(255, 243, 206, 0.95)"
      solvedGoldGlow: "rgba(255, 248, 215, 0.75)"
    structures:
      mountainLit: "#8c7660"
      mountainLitRear: "#7a6551"
      mountainShade: "#6a5644"
      mountainShadeRear: "#5e4c3c"
      mountainSnow: "#f6f2ea"
      springBasinGreen: "rgba(105, 140, 62, 0.45)"
      springDeepTeal: "#1d6f7e"
      springPoolStart: "#9fe3ea"
      springPoolEnd: "#2fa3b6"
      springRimStone1: "#a3937d"
      springRimStone2: "#8b7b66"
      hanWall: "#b8a07a"
      hanBattlement: "#9a835f"
      hanSeam: "rgba(80, 60, 40, 0.45)"
      hanCourtyard: "#e1cfa6"
      hanArchPortal: "#3e2f22"
      hanOutline: "#6f5a40"
      hanFlag: "#a63f27"
      villageGrove: "rgba(105, 140, 62, 0.32)"
      villageHouseWall: "#f5ede0"
      villageRoofLit: "#c25b35"
      villageRoofShade: "#8f3d22"
      villageDoor: "#6b4a2e"
      villageTreeCanopy: "#6f8f43"
      villageTreeTrunk: "#5c4630"
      villageSolvedAura: "rgba(255, 214, 120, 0.55)"
    badges:
      neutralSurface: "rgba(250, 244, 230, 0.92)"
      riverActiveFill: "#2f86c4"
      riverActiveBorder: "#fff6e2"
      roadActiveFill: "#b9843f"
      roadActiveBorder: "#fff6e2"
      roadInactiveIcon: "#9a6a2c"
    modals:
      panelPaper: "#f3e7cc"
      panelShadow: "0 18px 50px rgba(0, 0, 0, 0.45)"
      panelBorderInset: "inset 0 0 0 2px #d9c596"
      btnAltBg: "#e6d3a8"
      btnAltBorder: "inset 0 0 0 1px #b8935a"
      btnAltHover: "#ecdcb6"
      sharePrevBg: "#e9dab6"
    marketingStyleE:
      paperBg: "#f3efe6"
      gridDot: "#d5cebf"
      streakGold: "rgba(242, 192, 68, 0.12)"
      inkBlack: "#0d0d0d"
      goldDark: "#6b4a12"
      goldMid: "#b8860b"
      goldLight: "#f2c044"
      whitePure: "#ffffff"
      cardBorder: "#e4dcce"
      captionBandBg: "rgba(13, 13, 13, 0.88)"
      handleMuted: "#5e5649"
  typography:
    fontFamilies:
      display: "'Palatino Linotype', Palatino, Georgia, serif"
      ui: "'Segoe UI', system-ui, -apple-system, Roboto, sans-serif"
      mono: "ui-monospace, Consolas, monospace"
      marketingDisplay: "'Inter Tight', sans-serif"
      marketingMono: "'JetBrains Mono', monospace"
      marketingBody: "'Inter', sans-serif"
    fontSizes:
      statLabel: "12px"
      toolbarLabel: "12px"
      botTag: "13px"
      brandSub: "14px"
      note: "14px"
      body: "15px"
      sharePrev: "15px"
      btnSub: "14px"
      btnPrimary: "17px"
      resLine: "17px"
      brandTitle: "22px"
      statValue: "22px"
      modalH2: "26px"
      modalH1: "34px"
    fontWeights:
      regular: "400"
      medium: "500"
      semibold: "600"
      bold: "700"
      heavyBlack: "900"
    lineHeights:
      tight: "1.05"
      heading: "1.10"
      body: "1.40"
      mono: "1.30"
  spacing:
    xs: "2px"
    sm: "4px"
    md: "8px"
    lg: "12px"
    xl: "16px"
    xxl: "20px"
    hudPadding: "10px 16px 4px"
    hudMaxWidth: "620px"
    panelPadding: "22px 20px"
    panelMaxWidth: "380px"
    barPadding: "6px 12px calc(10px + env(safe-area-inset-bottom))"
    gridGutterUnits: "0.62"
  shapes:
    radii:
      legendSquare: "4px"
      debugBox: "6px"
      miniBtn: "10px"
      toastBox: "10px"
      sharePrevBox: "10px"
      toolbarBtn: "12px"
      primaryBtn: "12px"
      panelModal: "18px"
      quakeDot: "50%"
      botPill: "999px"
      tileBevelRatio: "0.14"
      boardCornerRatio: "0.90"
      marketingCard: "24px"
      marketingCaption: "16px"
      marketingBadge: "9999px"
    touchTargets:
      toolbarMin: "58px × 48px"
      miniBtnMin: "100% × 44px"
      primaryBtnMin: "100% × 52px"
      statBoxMin: "44px"
  motion:
    durations:
      slideNormalMs: "190ms"
      slideReducedMs: "110ms"
      quakeDelayNormalMs: "160ms"
      quakeDelayReducedMs: "60ms"
      quakeShiftNormalMs: "340ms"
      quakeShiftReducedMs: "140ms"
      starPopMs: "450ms"
      starPopDelay2Ms: "120ms"
      starPopDelay3Ms: "240ms"
      modalPopMs: "220ms"
      toastFadeMs: "200ms"
      pulseCycleMs: "1400ms"
      shakeDecayMs: "70ms"
    easings:
      playerSlide: "cubic-bezier(0.18, 1.25, 0.4, 1.0)"
      seismicShift: "damped-oscillation"
      reducedMotion: "cubic-bezier(0.0, 0.0, 0.2, 1.0)"
      starReveal: "cubic-bezier(0.3, 1.6, 0.5, 1.0)"
      modalEntrance: "cubic-bezier(0.0, 0.0, 0.2, 1.0)"
---

# Fay Hattı — Design System Specification

> [!IMPORTANT]
> **DOCUMENT STATUS: DRAFT (v0.1.0)**  
> This specification codifies the authentic visual design tokens, component architecture, and motion kinetics of **Fay Hattı** (*Fault Line*), an Anatolian sliding-tile daily puzzle built for browser environments and mobile touchscreens. All tokens in this document are strictly extracted from production source code ([index.html](file:///D:/01_AKTIF_PROJELER/oyunlar-git/fay-hatti/index.html)) and verified against the Google Labs `DESIGN.md` specification and Impeccable craft guidelines.

---

## 1. Overview

**Creative North Star: "The Anatolian Cartographer's Workbench"**

Fay Hattı rejects the interchangeable tropes of generic mobile puzzlers—hyper-saturated candy palettes, synthetic blue-purple AI gradients, and hollow flat vectors. Instead, the game grounds the player at the tactile workbench of a 16th-century Ottoman surveyor and geographer, drawing direct cultural inspiration from **Matrakçı Nasuh's topographical manuscript miniatures**, historical Seljuk caravan waystations, and authentic Iznik tile ceramic traditions.

The visual experience balances two distinct, harmonious realms:
1. **The In-Game Tactical Realm:** A deep slate-teal atmospheric surround (`#1b2830`) that cradles an elevated parchment map board (`#f0dfb3` to `#d8bf8b`), etched with faint topographical contour lines and populated by bevelled steppeland tiles, meandering water channels, packed-earth silk roads, stone caravanserais, and terracotta village settlements.
2. **The Marketing & Video Realm (Style E Light 'İki Renk'):** An editorial, high-prestige broadcast presentation for devlogs and short-form video (YouTube Shorts, Reels, TikTok) utilizing warm archival paper (`#f3efe6`), a subtle engineering dot grid, dense black typography, and an antique-to-luminous gold gradient (`#6b4a12` → `#f2c044`).

```
+-----------------------------------------------------------------------+
|  CANVAS BASE: Deep Slate Teal (#1b2830) with Radial Gradient Light   |
|  +-----------------------------------------------------------------+  |
|  | HUD: Palatino Linotype + Tabular Moves/Par + Gold Star SVGs     |  |
|  +-----------------------------------------------------------------+  |
|  | QUAKE TICKER: Terracotta Red Indicator / Sage Green Calm State  |  |
|  +-----------------------------------------------------------------+  |
|  | MAP STAGE (5x5 Sliding Parchment Board, cs: 24px - 112px):      |  |
|  |  [Spring Pool] ==== (River Network #3d95cf) ====> [Villages]    |  |
|  |  [Caravanserai] --- (Caravan Road #c79a5e) ---> [Villages]    |  |
|  |  (Movable steppe plates slide under fixed mountain/spring tiles)|  |
|  |  < Active Seismic Fault Red Band: rgba(214, 70, 40, 0.16) >    |  |
|  +-----------------------------------------------------------------+  |
|  | FOOTER TOOLBAR: Min 48px tactile buttons (Undo, Restart, Menu)  |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

### Key Characteristics:
* **Organic Materiality:** Canvas surfaces reflect weathered calfskin parchment, hand-cut stone masonry, terracotta roof tiles, and mineral glazes.
* **Tectonic Clarity:** Impending earthquakes are never a surprise; the fault line row is visibly charged with an animated seismic crimson warning band and directional gutter marker before the quake strikes.
* **Fluid Feedback:** Once connected, waters visibly ripple through the irrigation channels and caravans march down the Silk Road via phase-offset dash animations rooted in real BFS network distance.
* **Extreme Performance Budget:** Tailored for 60 FPS execution on low-spec integrated graphics (Intel UHD 620 baseline). Zero CSS layout thrashing, pre-rendered offscreen canvas tile caches, and dynamic device pixel ratio clamping.

---

## 2. Colors

Every color token is directly mapped from the normative stylesheet and Canvas rendering pipeline in [index.html](file:///D:/01_AKTIF_PROJELER/oyunlar-git/fay-hatti/index.html).

### 2.1. Environment & Frame (DOM Canvas)
- **Canvas Slate Base** (`#1b2830`): The primary application canvas backdrop, defined in `:root { --bg }`.
- **Canvas Slate Horizon** (`#2a3f49`): Subtle radial gradient spotlight emanating from `50% 0%` down into the canvas base.
- **Toolbar Slate Surface** (`#23343d`): Elevates navigation and control buttons (`:root { --bg2 }`).
- **Toolbar Surface Hover** (`#2c434e`): Tactile hover response for desktop pointers.
- **Overlay Backdrop** (`rgba(14, 22, 27, 0.74)`): Deep dimming scrim behind pause, help, and victory panels.
- **Toast Background** (`#0e171c`): High-contrast dark charcoal pill for temporary notifications.

### 2.2. Map Board & Movable Plates (HTML5 Canvas)
- **Board Parchment Gradient**: Smooth linear diagonal from top-left (`#f0dfb3`) to bottom-right (`#d8bf8b`), simulating aged animal vellum.
- **Board Outer Border** (`#9f7742`, 2px): Leather-bound perimeter framing the Anatolian territory.
- **Board Inner Border** (`rgba(120, 85, 45, 0.50)`, 1px): Fine etched inner margin.
- **Plate Base Gradient**: Vertical linear gradient from `#f1e0b3` to `#d6bb83` on each movable tile.
- **Plate Top Bevel Highlight** (`rgba(255, 251, 236, 0.70)`, 1.2px): Simulates light catching the chamfered upper edge of physical game pieces.
- **Plate Contact Shadow** (`rgba(70, 42, 18, 0.38)`): Deep warm cast shadow giving tiles tactile height above the map vellum.
- **Contour Survey Lines** (`rgba(150, 108, 58, 0.20)`): Subtle wavy sine-wave lines drawn across the board, referencing Ottoman cartographic surveys.

### 2.3. Networks & Waterways
- **River Meadow Fringe** (`rgba(105, 140, 62, 0.40)`): Lush green fertile silt deposited along riverbanks (`s * 0.44` width).
- **River Bed Deep** (`#2a6c99`): Outer riverbed foundation channel (`s * 0.30` width).
- **River Stream Main** (`#3d95cf`): Vibrant azure fresh mountain runoff (`s * 0.22` width).
- **River Specular Line** (`rgba(255, 255, 255, 0.22)`): Offset glint running along the water surface (`s * 0.05` width).
- **River Kinetic Flow** (`rgba(226, 247, 255, 0.90)`): Moving dash rhythm (`[s * 0.1, s * 0.14]`) showing active downstream current.
- **Caravan Road Trench** (`rgba(122, 82, 48, 0.32)`): Compacted depression along trade routes (`s * 0.30` width).
- **Caravan Road Packed Earth** (`#c79a5e`): Ochre sandstone roadbed (`s * 0.21` width).
- **Caravan Cart Rut** (`rgba(248, 234, 200, 0.90)`): Centered dashed line (`[s * 0.07, s * 0.07]`) depicting wagon wheel tracks.
- **Caravan Kinetic Flow** (`rgba(255, 243, 206, 0.95)`): High-contrast golden pulses (`[0.1, s * 0.24]`) indicating active camel caravan passage.

### 2.4. Geographic Structures & Architecture
- **Mountain Lit Slopes** (`#8c7660` / `#7a6551`): Rugged Anatolian mountain ranges catching afternoon sun.
- **Mountain Shaded Slopes** (`#6a5644` / `#5e4c3c`): Deep shadows behind mountain peaks.
- **Mountain Snow Cap** (`#f6f2ea`): Crystalline snow crowns topping jagged ridgelines.
- **Spring Oasis Pool** (Radial gradient from `#9fe3ea` to `#2fa3b6`): Crystalline subterranean spring rising into a deep teal basin (`#1d6f7e`), rimmed by natural stone boulders (`#a3937d`, `#8b7b66`).
- **Seljuk Caravanserai (Han)**: Sun-baked stone fortress walls (`#b8a07a`), crenellated parapets (`#9a835f`), shaded inner courtyard (`#e1cfa6`), arched gateway portal (`#3e2f22`), and a terracotta entrance banner (`#a63f27`).
- **Anatolian Village**: Plastered stone dwellings (`#f5ede0`), terracotta-tiled gable roofs (`#c25b35` lit, `#8f3d22` shaded), walnut wood doors (`#6b4a2e`), clustered within a shaded orchard canopy (`#6f8f43`).

### 2.5. Seismic States, Feedback & HUD
- **Seismic Rupture Crimson** (`#e0553a`): Used for the active pulsating quake dot, fault direction arrows, and fault perimeter borders.
- **Active Fault Warning Band** (`rgba(214, 70, 40, 0.16)`): Full-width row tint that warns the player which row will shift next.
- **Calm Earth Green** (`#6f8f6a`): Indicated when the fault is settled or after a game-winning move.
- **Terracotta Action Red** (`#a63f27`): Primary CTA button fill and badge accents. Hover state: `#b9472c`.
- **Harvest Gold** (`#f2b33d`): Star rating fill and solved connection sparkles. Active stroke: `#9c6a12`.
- **Keyboard Cursor Cyan** (`#7cc4f0`): Accessible focus ring outline (3px) and board navigation cursor.

### 2.6. Marketing Style E Light Palette ('İki Renk')
- **Archival Paper Canvas** (`#f3efe6`): Organic, tactile video card background.
- **Technical Dot Grid** (`#d5cebf`): 24px square dot grid overlay (65% opacity).
- **Antique Gold Gradient**: Multi-stop metallic text gradient for secondary headlines (`#6b4a12` 0% → `#b8860b` 50% → `#f2c044` 100%).
- **Primary Ink Black** (`#0d0d0d`): Dense typographic ink for punchy hooks.

### Named Color Rules:
* **The Tectonic Warning Rule.** Red (`#e0553a` / `rgba(214, 70, 40, 0.16)`) is reserved exclusively for seismic hazards, active fault lines, and imminent quakes. It must never be used as a generic decorative tint.
* **The Parchment Ground Rule.** Pure white (`#ffffff`) is strictly forbidden for map and modal backgrounds. Natural paper and stone tones (`#f0dfb3`, `#f3e7cc`, `#f3efe6`) carry the historical artifact feel.
* **The Network Distinction Rule.** River water (`#3d95cf`) and caravan road (`#c79a5e`) must never share luminance thresholds; water remains crisp cerulean while trade routes remain dry packed earth.

---

## 3. Typography

Fay Hattı pairs classical literary serif typography for prestige headers with ultra-clean system sans-serif for responsive, legible game HUD instrumentation.

```
Header / Titles:      "Palatino Linotype", Palatino, Georgia, serif
HUD Numbers & Moves:  "Segoe UI", system-ui, -apple-system (font-variant-numeric: tabular-nums)
Share Code & Debug:   ui-monospace, Consolas, monospace
Marketing Hooks:      "Inter Tight" (Weight 900) + "JetBrains Mono"
```

### 3.1. In-Game Typographic Hierarchy

| Role | Selector | Family | Size / Leading | Weight | Color | Purpose |
|---|---|---|---|---|---|---|
| **Modal Title** | `.panel h1` | Palatino Linotype | `34px / 1.05` | Bold (700) | `#5a2a18` | Main menu and modal dialog titles |
| **Modal Section** | `.panel h2` | Palatino Linotype | `26px / 1.10` | Bold (700) | `#5a2a18` | How-to-play and victory headers |
| **Brand Title** | `.brand b` | Palatino Linotype | `22px / 1.10` | Bold (700) | `#f3ead8` | Top header game title (`letter-spacing: .02em`) |
| **HUD Value** | `.stat b` | Segoe UI / System | `22px / 1.10` | Bold (700) | `#f3ead8` | Moves and Par counters (`tabular-nums`) |
| **Primary CTA** | `.btn` | Segoe UI / System | `17px / 1.20` | Bold (700) | `#fff8ec` | Modal action buttons |
| **Result Line** | `.res-line` | Segoe UI / System | `17px / 1.30` | Regular (400) | `#2b2118` | End-game move and par summary |
| **Quake Ticker** | `#quake` | Segoe UI / System | `15px / 1.40` | Regular (400) | `#ffd9cf` | Upcoming quake notification |
| **Body / Dialog** | `.sub, .help li` | Segoe UI / System | `15px / 1.40` | Regular (400) | `#5b4a36` | Explanatory modal text |
| **Share Monospace**| `.share-prev` | ui-monospace | `15px / 1.30` | Regular (400) | `#2b2118` | Spoiler-free emoji score block |
| **HUD Label** | `.stat span` | Segoe UI / System | `12px / 1.20` | Regular (400) | `#c9bda4` | Uppercase HUD labels (`letter-spacing: .06em`) |
| **Toolbar Label** | `.tb span` | Segoe UI / System | `12px / 1.20` | Regular (400) | `#f3ead8` | Button text under icons |
| **Bot Badge** | `#bot` | Segoe UI / System | `13px / 1.20` | Bold (700) | `#e7f4fb` | Bot strategy pill (`letter-spacing: .05em`) |
| **Engine Debug** | `#debug` | ui-monospace | `12px / 1.30` | Regular (400) | `#99ff99` | FPS, seed, nodes, solver benchmark overlay |

### 3.2. Marketing Typographic Hierarchy (Style E Light)
- **Hook Line 1:** `Inter Tight Black` (Weight `900`, `64px`, Line Height `1.05`, Tracking `-0.03em`, Dense Ink `#0d0d0d`).
- **Hook Line 2:** `Inter Tight Black` (Weight `900`, `60px`, Line Height `1.10`, Tracking `-0.02em`, Antique Gold Gradient `#6b4a12` → `#f2c044`).
- **Badge & Watermark:** `JetBrains Mono Bold` (`24px`) for puzzle day indicators, `JetBrains Mono Medium` (`22px`, `#5e5649`) for the `@furkiozkan` signature.
- **Captions:** `Inter Bold` (`36px / 1.25`) centered within floating dark capsule.

### Named Typography Rules:
* **The Tabular Numbers Rule.** All game scores, move tallies, par metrics, and level numbers must declare `font-variant-numeric: tabular-nums` to eliminate jitter during rapid moves or automated bot solver runs.
* **The Classical Header Rule.** The game title and modal headings must remain in `Palatino Linotype` (or serif fallback); sans-serif is strictly forbidden for brand titles to preserve the historical map identity.

---

## 4. Layout & Spacing

Fay Hattı utilizes a robust, viewport-locked layout with zero scrollbars, accommodating mobile portrait screens, desktop displays, and ultra-compact landscape mobile viewports.

### 4.1. DOM App Grid Geometry
The viewport is governed by a CSS Grid structure pinned to `position: fixed; inset: 0;`:

```css
/* Portrait Layout (Standard Mobile & Desktop) */
#app {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto auto 1fr auto;
  grid-template-areas:
    "hud"
    "quake"
    "stage"
    "bar";
  padding: env(safe-area-inset-top) env(safe-area-inset-right) 0 env(safe-area-inset-left);
}

/* Compact Landscape Layout (max-height: 540px) */
@media (orientation: landscape) and (max-height: 540px) {
  #app {
    grid-template-columns: minmax(170px, 230px) 1fr auto;
    grid-template-rows: auto 1fr;
    grid-template-areas:
      "hud   stage bar"
      "quake stage bar";
  }
}
```

### 4.2. Map Stage & Cell Sizing Algorithm
The canvas board is computed dynamically inside the `layout()` cycle to maximize board presence while maintaining a 5×5 cell geometry:
- **Grid Dimension:** `N = 5`, total cells `NN = 25`.
- **Gutter Factor:** `GUT = 0.62` cell widths on each side, reserving interactive hit target margins for the directional shift arrows.
- **Cell Size Formula:**
  $$\text{cs} = \max\left(24, \left\lfloor \min\left(\frac{W}{N + 2 \times 0.62}, \frac{H}{N + 2 \times 0.62}, 112\right) \right\rfloor\right)$$
- **Board Outer Padding:** `pad = Math.round(cs * 0.2)`.
- **Centering Offsets:**
  $$\text{ox} = \text{round}\left(\frac{W - 5 \times \text{cs}}{2}\right), \quad \text{oy} = \text{round}\left(\frac{H - 5 \times \text{cs}}{2}\right)$$

### 4.3. Touch Target Compliance
- **Toolbar Buttons (`.tb`):** Minimum dimension `58px` width × `48px` height (exceeds WCAG 44×44px threshold).
- **Modal Action Buttons (`.btn`):** Minimum height `52px` with full container width.
- **Mini Buttons (`.mini button`):** Minimum height `44px` with flexible flex-grow columns.
- **Gutter Arrow Shift Targets:** Sized at `(cs * 0.62 + pad) / 2` with sensitive hit-testing bounding boxes extending `cs * 0.40`.

---

## 5. Elevation & Depth

Surfaces follow a deliberate tactile stacking hierarchy, evoking physical wooden puzzle plates resting upon a recessed map frame.

```
Z-INDEX LAYER MAP:
Level 0:  Canvas Element (#cv)
Level 1:  HUD Header (#hud) & Quake Ticker (#quake)
Level 2:  Bottom Navigation Toolbar (#bar)
Level 10: Modal Overlays & Panels (.ov, .panel)
Level 20: Floating Status Toast (#toast)
Level 30: Developer & Benchmark HUD (#debug)
```

### 5.1. Plate Chamfer & Lighting Model
- **Light Angle:** Virtual sunlight strikes from top-left (`-45°`).
- **Board Recess:** Inner shadow `rgba(0, 0, 0, 0.30)` cast downward `9px` onto canvas.
- **Tile Plate Thickness:** 
  - Base shadow: `rgba(70, 42, 18, 0.38)` offset downward by `cs * 0.035`.
  - Top highlight stroke: `rgba(255, 251, 236, 0.70)` (1.2px) creating a crisp hand-carved chamfer.
  - Cell depressions: Ground vellum features recessed pockets `rgba(105, 72, 34, 0.13)` beneath each movable cell.

### 5.2. Modal Dialog Elevation
- **Panel Shadow:** `0 18px 50px rgba(0, 0, 0, 0.45)`.
- **Panel Inset Lip:** `inset 0 0 0 2px #d9c596`, providing a double-grooved parchment rim.

### Named Elevation Rules:
* **The Slide-Under Invariant Rule.** Fixed geographic structures (springs, caravanserais, villages, mountains) are permanent anchors. When a player shifts a row or column, movable steppe tiles physically slide *underneath* the fixed structures without clipping or overlapping them.

---

## 6. Shapes & Geometry

- **Tile Plate Radii:** `r = cs * 0.14` with margin inset `ins = max(1.5, cs * 0.04)`.
- **Board Outer Corners:** `pad * 0.90` (smooth rounded leather boundary).
- **Toolbar Buttons:** `border-radius: 12px` with `1px solid #3d5561` stroke.
- **Modal Dialog Cards:** `border-radius: 18px` (`max-width: 380px`).
- **Action Buttons (`.btn`):** `border-radius: 12px`.
- **Village Need Badges:** Circular indicator badges with `radius = cs * 0.13`, positioned at tile offset `cs * 0.20` (water drop on left) and `cs * 0.80` (road sign on right).
- **Water Ripple Geometry:** Smooth quadratic bezier curves (`quadraticCurveTo(X + s/2, Y + s/2, X + q[0], Y + q[1])`) connecting orthogonal tile ports without sharp geometric breaks.

---

## 7. Components

### 7.1. In-Game HUD Header (`#hud`)
- **Brand Title:** `Fay Hattı` in Palatino Linotype 22px paired with daily date tag or endless level indicator (`#tMode`).
- **Stats Counter:** Dual indicators for `Moves` and `Par` displaying tabular numbers.
- **Star Cluster (`.stars`):** Three inline SVG stars transitioning from hollow bronze outlines (`#8d7f69`) to radiant gold fills (`#f2b33d`, active stroke `#9c6a12`).

### 7.2. Seismic Quake Ticker (`#quake`)
- **Quake Pulse Dot:** 10×10px crimson dot pulsing via a 1.4s keyframe expanding box-shadow ring (`rgba(224, 85, 58, 0.6) → rgba(224, 85, 58, 0)`).
- **Ticker Copy:** Announces exact upcoming tremor target, e.g., `Next quake: row 3 →` (`Sıradaki deprem: 3. satır →`).
- **Calm State (`#quake.calm`):** Transitions dot to muted sage green (`#6f8f6a`) without animation when the fault is settled.

### 7.3. Interactive Board Stage (`#stage` & `#cv`)
- **Directional Chevrons:** Gutter arrows indicating shift capabilities; dynamically light up on mouse hover (`rgba(243, 234, 216, 0.95)`) or turn fiery red (`rgba(255, 140, 110, 0.95)`) on the row designated for the next earthquake.
- **Quake Row Marker:** Dashed rectangular bounding box (`rgba(224, 85, 58, 0.85)`) framing the threatened row, accompanied by an exterior pointer triangle.
- **Keyboard Cursor:** 3px cyan focus box (`#7cc4f0`) controlled via WASD navigation.

### 7.4. Bottom Action Toolbar (`#bar`)
- **Control Strip:** Houses 5 touch-friendly controls (`Undo`, `Restart`, `Menu`, `Sound`, `Language`).
- **Icons:** Minimalist 22×22px monoline SVG icons with `stroke-width: 2`, `stroke-linecap: round`, `stroke-linejoin: round`.
- **Disabled State:** Opacity drops to `0.40` with `cursor: default`.

### 7.5. Parchment Modal System (`.panel`)
- **Menu Dialog (`#menu`):** Provides instant navigation to Daily Puzzle, Endless Mode, and How to Play instructions.
- **Help Dialog (`#help`):** 5-step numbered guide with color swatches explaining rivers, roads, villages, quakes, and par scoring.
- **Victory Dialog (`#result`):** Celebratory dialog featuring animated popping gold stars (46×46px), result metrics, spoiler-safe emoji share preview, and Next Level CTA.

---

## 8. Interactions & Motion

All animations in Fay Hattı are strictly physical, deterministic, and engineered to respect user motion preferences and hardware limitations.

### 8.1. Motion Timings & Curves

```yaml
motion:
  durations:
    playerSlide: 190ms (Speed factor: 1.0; Reduced motion: 110ms)
    quakeDelay: 160ms (Delay before seismic shift begins; Reduced motion: 60ms)
    quakeShift: 340ms (Rumbling fault displacement; Reduced motion: 140ms)
    starPop: 450ms (Spring overshoot with staggered 120ms delays)
    modalPop: 220ms (Scale 0.94 -> 1.0 with ease-out)
    toastFade: 200ms
```

### 8.2. Mathematical Easing Formulas
Implemented directly in the animation loop:

```javascript
// 1. Player Move Overshoot (Tactile snap-back)
const easeBack = (x) => {
  const s = 1.25;
  x -= 1;
  return x * x * ((s + 1) * x + s) + 1;
};

// 2. Earthquake Seismic Rumble (Damped harmonic oscillator)
const easeQuake = (x) => 1 - Math.exp(-6 * x) * Math.cos(2.5 * Math.PI * x);

// 3. Accessible Reduced Motion Easing (Smooth cubic deceleration)
const easeCubic = (x) => 1 - Math.pow(1 - x, 3);
```

### 8.3. Physical Seismic Screen Shake & Particles
- **Seismic Impact:** When a quake hits (`t >= delay`), the screen executes an authentic screen shake: `shake = cs * 0.07`.
- **Damping Decay:** Exponential decay calculated per frame: `shake *= Math.exp(-dt / 70)`.
- **Celebration Confetti:** Solved villages burst with 22 mineral-tinted paper particles (`#d6453d`, `#f6efe1`, `#f2b33d`, `#c4573a`, `#3d95cf`) with individual angular velocity and gravity.
- **Wave Propagation:** Solved water and road networks animate with a bright luminous wave propagating outward from source to village via BFS distance step `(now - G.celebrateAt) / 110`.

### 8.4. Hardware Performance Budget (Intel UHD 620 Target)
- **Target Frame Rate:** Rock-solid 60 FPS under battery power.
- **Pre-rendered Plate Caching:** Tile backgrounds and static decorations are rendered once into offscreen memory canvases (`mkCanvas(cs, cs)`). The main animation loop only blits pre-rasterized plates via `ctx.drawImage()`.
- **DPR Clamping:** Device pixel ratio is strictly capped at `min(2, window.devicePixelRatio)` to avoid 4K GPU fill-rate exhaustion on mobile integrated chipsets.
- **Zero DOM Churn:** The game board runs entirely within a single `<canvas id="cv">`. DOM updates occur exclusively on turn conclusion or state transitions.

---

## 9. Marketing Style E Light ('İki Renk') Specification

For devlog episodes, YouTube Shorts, and promotional teasers, Fay Hattı adopts the **Style E Light 'İki Renk'** design system detailed in `DESIGN-video-sablonlari.md`.

```
============================================================
STYLE E LIGHT VIDEO LAYOUT (1080px × 1920px, 9:16)
============================================================
y: 0px    Top of Canvas (Dead Zone: Status bar / Camera)
y: 240px  +----------------------------------------------+ Safe Area TOP
          |  [Circle Badge: #42 or Day] (68px circle)    |
          |  HOOK LINE 1: Inter Tight Black 900 (64px)   |
          |  HOOK LINE 2: Gold Gradient 900 (60px)       |
          |  -- Gold Underline Accent Bar (128x4px) --   |
          |                                              |
          |  +----------------------------------------+  |
          |  | FLOATING GAMEPLAY CARD                 |  |
          |  | (Rounded-3xl: 24px, subtle drop shadow)|  |
          |  | Filter: sepia(0.08) contrast(1.04)     |  |
          |  |         brightness(1.02) saturate(1.06)|  |
          |  | [Live Canvas Puzzle Recording]        |  |
          |  +----------------------------------------+  |
          |                                              |
          |  [Captions Band: Dark Charcoal Capsule]      |
          |  @furkiozkan (JetBrains Mono 22px, #5e5649)  |
y: 1680px +----------------------------------------------+ Safe Area BOTTOM
y: 1920px Bottom of Canvas (Dead Zone: Reels / TikTok UI)
============================================================
```

### 9.1. Marketing Rules
- **Color Grading:** Raw game footage must always be filtered through `sepia(0.08) contrast(1.04) brightness(1.02) saturate(1.06)` to harmonize cold computer monitors with the warm archival paper canvas (`#f3efe6`).
- **Safe Area Guarantee:** All gameplay cards, text hooks, and captions must reside strictly between `y: 240px` and `y: 1680px` (Instagram 3:4 aspect ratio safe zone).
- **Two-Step Text Reveal:** Stagger Line 1 (`#0d0d0d`, reveal at 0.05s) and Line 2 (`#6b4a12` → `#f2c044`, reveal at 0.20s) to create editorial rhythm.

---

## 10. Do's and Don'ts

### DO:
- **DO** maintain the 5×5 grid mechanics, move calculation rules, and optimal solver parity.
- **DO** use the exact hex tokens and canvas RGBA color formulas documented in this specification.
- **DO** clamp all touch targets to at least 44×44px (and toolbar buttons to at least 58×48px).
- **DO** respect `prefers-reduced-motion: reduce` by disabling screen shake, pulse animations, and star bounce effects.
- **DO** pre-render tile graphics into offscreen canvases to maintain the 60 FPS Intel UHD 620 performance budget.
- **DO** preserve all existing URL query parameters (`?seed=`, `?level=`, `?demo=`, `?auto=`, `?debug=`, `?lang=`, `?nosave`).
- **DO** preserve full bilingual localization (Turkish `tr` and English `en`).

### DON'T:
- **DON'T** introduce AI design cliches: purple/blue linear gradients, unstyled default Inter sans-serif for headers, or floating neon card glows.
- **DON'T** use pure white (`#ffffff`) as a surface or background color; rely strictly on warm parchment (`#f0dfb3`, `#f3e7cc`, `#f3efe6`).
- **DON'T** change the puzzle solver algorithms (Strategy A iterative-deepening or Strategy B greedy beam search) or alter par scoring logic.
- **DON'T** create layout thrashing by reading and writing DOM layout coordinates inside `requestAnimationFrame`.
- **DON'T** remove or bypass localStorage keys (`fayhatti.*`) or alter state reporting on `window.fayHatti`.
- **DON'T** add generic external web font downloads that compromise offline independence; use system fonts and standard serif fallbacks.
