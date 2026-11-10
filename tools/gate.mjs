// Regression gate for fay-hatti: does the candidate still generate and solve the same puzzles, keep the daily mode
// card-free, load with 0 errors, and can a phone reach its buttons?
//
// Adapted from kale-savunmasi's tools/gate.mjs (same output format and options). fay-hatti's engine runs in Node, so
// the sim part runs the game's own Node tools instead of a browser fast-forward:
//   1. sim:     tools/sim.mjs (generator + optimal solver + the in-game beam bot, every solution replayed with the real
//               rules) on BASE and CANDIDATE; the candidate runs twice and must give identical output (timings
//               excluded). Metrics are compared with per-metric tolerances.
//   2. cards:   tools/cardcheck.mjs on the candidate: the daily puzzles, par, moves and stars must not change with
//               cards none vs all (exit 0).
//   3. browser: headless Chromium opens the candidate from file:// (as players with a saved copy do): 0 page errors,
//               0 console errors, 0 failed requests; then on phone viewports (isMobile + hasTouch) every visible
//               button in GAME.layout.selectors must lie inside the viewport and be what elementFromPoint returns at
//               its centre. Known offenders (GAME.layout.known) print as KNOWN; any other offender fails.
//
// Usage: node tools/gate.mjs [options]
//   --base <ref>        base = `git show <ref>:index.html` (default origin/main)
//   --baseline          compare with tools/gate-baseline.json instead of a git base
//   --record            run the candidate and write tools/gate-baseline.json (then exit)
//   --candidate <file>  candidate HTML (default: the working-tree index.html)
//   --only sim|browser  run one part (sim includes cards)
//   --strict-layout     KNOWN layout offenders fail too
// Env: GATE_JSON=<file> writes a JSON report.
// Output: "ok"/"FAIL"/"KNOWN"/"note" lines, then RESULT OK|FAIL. Exit 1 on FAIL.
// The tools (sim.mjs, cardcheck.mjs) always come from the working tree; only index.html differs between builds.

// ======================================================================= per-game config
const GAME = {
  name: 'fay-hatti',
  entry: 'index.html',
  sim: {
    // 28 daily seeds from 2026-11-08 (fixed dates, not "today") + endless levels 1-20
    args: ['20261108', '28', '20'],
    ignore: ['avgGenMs', 'maxGenMs'], // wall-clock timings: not compared, not part of the determinism check
    // abs/rel = allowed drop; rise = allowed increase (lower is better); band = allowed change either way;
    // max = absolute ceiling; info = shown, not gated
    tolerance: {
      solvedBoth: { abs: 0 },    // puzzles where the optimal solver AND the beam bot solve it, replayed with the real rules
      puzzles: { info: true },
      avgPar: { band: 0.5 },     // generator difficulty: a change is a design change, re-record on purpose
      avgA: { info: true },      // optimal moves (equals par when the solver is exact)
      avgB: { rise: 0.25 },      // the in-game beam bot (?demo=b) moves: it must not get worse
      rows: { info: true },      // sha of the per-puzzle table without timings: in the determinism check, shown here
    },
    timeoutMs: 180000,
  },
  cards: { timeoutMs: 120000 },
  browser: {
    query: '?seed=20261108&nosave', // a fixed daily board, nothing written to storage; first visit (tutorial up)
    viewports: [[390, 844], [360, 740], [412, 915]],
    selectors: ['#bar button'], // the bottom toolbar: undo, restart, hint, menu, sound, language
    ready: () => !!document.querySelector('#bar button') && document.getElementById('cv').width > 0,
    known: { ids: [], reason: '' },
    mode: 'enforce',
    timeoutMs: 180000,
  },
};
// ======================================================================= core
import { readFileSync, writeFileSync, existsSync, mkdtempSync, mkdirSync, copyFileSync, rmSync } from 'node:fs';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { tmpdir, loadavg } from 'node:os';
import { createHash } from 'node:crypto';

const t0 = Date.now();
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const baselinePath = join(root, 'tools', 'gate-baseline.json');
const argv = process.argv.slice(2);
const flag = (n) => argv.includes(n);
const opt = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : undefined; };
const only = opt('--only');
const report = { game: GAME.name, sim: null, cards: null, browser: { console: [], layout: [] }, notes: [], result: null };
let failed = false;
const log = (s) => console.log(s);
const fail = (s) => { failed = true; log('FAIL ' + s); };
const note = (s) => { report.notes.push(s); log('note ' + s); };
const sha = (s) => createHash('sha256').update(s).digest('hex').slice(0, 12);
const git = (...a) => execFileSync('git', a, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 << 20 });
const tryGit = (...a) => { try { return git(...a).trim(); } catch { return null; } };
const watchdog = setTimeout(() => { log('FAIL gate: whole run exceeded 15 min'); log('RESULT FAIL'); process.exit(1); }, 15 * 60000);

// ---- builds: each one is a temp dir with its index.html and the working tree's tools
const candFile = opt('--candidate') || join(root, GAME.entry);
const builds = { cand: readFileSync(candFile, 'utf8') };
let baseLabel = null, baseline = null;
if (flag('--record')) { /* candidate only */ }
else if (flag('--baseline')) baseline = loadBaseline();
else {
  const ref = opt('--base') || 'origin/main';
  try { builds.base = git('show', `${ref}:${GAME.entry}`); baseLabel = `${ref} (${git('rev-parse', '--short', ref).trim()})`; }
  catch (e) {
    if (opt('--base')) fail(`base: git show ${ref}:${GAME.entry} failed: ${String(e.stderr || e.message).trim()}`);
    else { note(`base: ${ref} not available, falling back to tools/gate-baseline.json`); baseline = loadBaseline(); }
  }
}
function loadBaseline() {
  if (!existsSync(baselinePath)) { fail('base: no git base and no tools/gate-baseline.json (run with --record)'); return null; }
  const b = JSON.parse(readFileSync(baselinePath, 'utf8'));
  if (b.game !== GAME.name || JSON.stringify(b.args) !== JSON.stringify(GAME.sim.args)) note('baseline was recorded with different sim arguments; numbers may not be comparable');
  return b;
}
const tmp = mkdtempSync(join(tmpdir(), 'fay-gate-'));
const dirs = {};
for (const [k, html] of Object.entries(builds)) {
  const d = join(tmp, k); mkdirSync(join(d, 'tools'), { recursive: true });
  writeFileSync(join(d, GAME.entry), html);
  for (const f of ['sim.mjs', 'cardcheck.mjs']) copyFileSync(join(root, 'tools', f), join(d, 'tools', f));
  dirs[k] = d;
}
log(`gate ${GAME.name}: node ${process.version}, candidate ${candFile === join(root, GAME.entry) ? GAME.entry + ' (working tree)' : candFile} sha ${sha(builds.cand)}`);

const node = (dir, script, args, ms) => {
  const r = spawnSync(process.execPath, [join(dir, 'tools', script), ...args], { cwd: dir, encoding: 'utf8', timeout: ms, maxBuffer: 64 << 20, env: { ...process.env, FAY_ROOT: dir } });
  if (r.error && r.error.code === 'ETIMEDOUT') throw new Error(`infra: ${script} timed out after ${ms / 1000} s (machine load ${loadavg()[0].toFixed(1)})`);
  return r;
};
const fmt = (m) => Object.entries(m).map(([k, v]) => `${k} ${v}`).join(' · ');

// ---- 1. sim
function simRun(build, label) {
  const S = GAME.sim, ts = Date.now();
  const r = node(dirs[build], 'sim.mjs', S.args, S.timeoutMs);
  const line = (r.stdout || '').trim().split('\n').reverse().find((l) => l.startsWith('{'));
  if (!line) throw new Error(`sim ${label}: no summary line (exit ${r.status}): ${(r.stderr || '').trim().split('\n')[0]}`);
  const raw = JSON.parse(line), m = {};
  for (const [k, v] of Object.entries(raw)) if (!S.ignore.includes(k)) m[k] = typeof v === 'string' && v !== '' && !isNaN(+v) ? +v : v;
  m.exit = r.status;
  // per-puzzle fingerprint: every console.table row (label, K, par, A, B, okA, okB, nodes, att), timing columns dropped
  const cells = (l) => l.split('│').slice(1, -1).map((c) => c.trim());
  const head = (r.stdout || '').split('\n').find((l) => l.includes('│') && l.includes('label'));
  if (head) {
    const cols = cells(head), keep = cols.map((c, i) => (c && !/Ms$/.test(c) && c !== '(index)' ? i : -1)).filter((i) => i >= 0);
    const rows = (r.stdout || '').split('\n').filter((l) => l.startsWith('│') && l !== head).map((l) => keep.map((i) => cells(l)[i]).join(','));
    m.rows = sha(rows.join('\n'));
  } else m.rows = 'no table';
  log(`     sim ${label}: ${fmt(m)} (${((Date.now() - ts) / 1000).toFixed(1)} s)`);
  return m;
}
function compare(base, cand) {
  const rows = [];
  for (const [k, tol] of Object.entries(GAME.sim.tolerance)) {
    const b = base?.[k], c = cand[k];
    let ok = true, why = '';
    if (tol.info) why = 'info';
    else if (tol.max !== undefined) { ok = c <= tol.max; why = `max ${tol.max}`; }
    else if (typeof b !== 'number' || typeof c !== 'number') { ok = false; why = 'no number'; }
    else if (tol.rise !== undefined) { ok = c <= b + tol.rise + 1e-9; why = `allowed rise ${tol.rise}`; }
    else if (tol.band !== undefined) { ok = Math.abs(c - b) <= tol.band + 1e-9; why = `allowed change ±${tol.band}`; }
    else { const allowed = tol.abs !== undefined ? tol.abs : Math.abs(b) * tol.rel; ok = c >= b - allowed - 1e-9; why = tol.abs !== undefined ? `allowed drop ${tol.abs}` : `allowed drop ${Math.round(tol.rel * 100)}% = ${allowed.toFixed(2)}`; }
    const d = typeof b === 'number' && typeof c === 'number' ? ` (${c - b >= 0 ? '+' : ''}${+(c - b).toFixed(2)})` : '';
    rows.push({ metric: k, base: b, cand: c, ok, rule: why });
    const line = `sim ${k}: base ${b} → candidate ${c}${d}, ${why}`;
    if (tol.info) log('     ' + line); else if (ok) log('ok   ' + line); else fail(line);
  }
  return rows;
}
if (only !== 'browser' && !failed) {
  try {
    const c1 = simRun('cand', 'candidate #1'), c2 = simRun('cand', 'candidate #2');
    const det = JSON.stringify(c1) === JSON.stringify(c2);
    if (det) log('ok   sim determinism: candidate run twice, identical output (timings excluded)');
    else fail(`sim determinism: candidate gave different output on two runs (${fmt(c1)} vs ${fmt(c2)})`);
    if (c1.exit !== 0) fail(`sim candidate: tools/sim.mjs exit ${c1.exit} (a puzzle was not solved by both solvers)`);
    report.sim = { candidate: c1, candidate2: c2, deterministic: det };
    if (flag('--record')) {
      const rec = { game: GAME.name, recorded: new Date().toISOString(), commit: tryGit('rev-parse', '--short', 'HEAD'), entrySha: sha(builds.cand), args: GAME.sim.args, metrics: c1 };
      if (det && c1.exit === 0) { writeFileSync(baselinePath, JSON.stringify(rec, null, 2) + '\n'); log(`ok   record: wrote tools/gate-baseline.json ${fmt(c1)}`); }
      else fail('record: not written (not deterministic or sim failed)');
    } else if (det) {
      let base;
      if (builds.base !== undefined && builds.base === builds.cand) { base = c1; note(`base ${baseLabel} is byte-identical to the candidate (sha ${sha(builds.cand)}); base metrics = candidate run #1`); }
      else if (builds.base !== undefined) base = simRun('base', `base ${baseLabel}`);
      else if (baseline) { base = baseline.metrics; baseLabel = 'baseline ' + baseline.commit; log(`     base = tools/gate-baseline.json (commit ${baseline.commit}, recorded ${baseline.recorded})`); }
      if (base) report.sim = { ...report.sim, baseLabel, base, rows: compare(base, c1) };
    }
  } catch (e) { fail(`sim: ${e.message.split('\n')[0]}`); }
  // ---- 2. cards
  if (!flag('--record')) {
    try {
      const r = node(dirs.cand, 'cardcheck.mjs', [], GAME.cards.timeoutMs);
      const out = ((r.stdout || '') + (r.stderr || '')).trim().split('\n');
      report.cards = { exit: r.status, last: out[out.length - 1] };
      if (r.status === 0) log(`ok   cards: ${out[out.length - 1]}`);
      else fail(`cards: tools/cardcheck.mjs exit ${r.status}: ${out.filter((l) => /FAIL|DIFF|  - /.test(l)).slice(0, 6).join(' | ')}`);
    } catch (e) { fail(`cards: ${e.message}`); }
  }
}

// ---- 3. browser (load + phone layout), candidate only
const withTimeout = (p, ms, what) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error(`infra: ${what} timed out after ${ms / 1000} s (machine load ${loadavg()[0].toFixed(1)})`)), ms))]);
if (only !== 'sim' && !flag('--record')) {
  const { chromium } = await import('playwright');
  const browser = await chromium.launch({ headless: true });
  const L = GAME.browser, url = pathToFileURL(join(dirs.cand, GAME.entry)).href + L.query;
  log(`     browser: chromium ${browser.version()}, ${url.replace(tmp, '<tmp>')}`);
  const known = new Set(L.known?.ids || []), strict = flag('--strict-layout'), knownHit = new Set();
  const frames = (page, n, ms = 20000) => page.evaluate(([n, ms]) => new Promise((done) => { let i = 0; const end = performance.now() + ms; const f = () => (++i >= n || performance.now() > end ? done(i) : requestAnimationFrame(f)); requestAnimationFrame(f); }), [n, ms]);
  async function layoutRun([w, h]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
    try {
      const page = await ctx.newPage(), errors = [];
      page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
      page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
      page.on('requestfailed', (r) => errors.push('requestfailed: ' + r.url()));
      await page.goto(url, { waitUntil: 'load', timeout: 120000 });
      await page.waitForFunction(L.ready, null, { timeout: 60000, polling: 250 });
      await page.evaluate(() => document.fonts.ready);
      await frames(page, 30);
      const res = await page.evaluate((sels) => {
        const name = (el) => el.id ? '#' + el.id : el.tagName.toLowerCase() + (el.textContent.trim() ? ` "${el.textContent.trim().slice(0, 20)}"` : '');
        const seen = new Set(), out = { checked: 0, offenders: [] };
        for (const el of sels.flatMap((s) => [...document.querySelectorAll(s)])) {
          if (seen.has(el)) continue; seen.add(el);
          const cs = getComputedStyle(el), r = el.getBoundingClientRect();
          if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0 || r.width * r.height === 0 || !el.getClientRects().length) continue;
          out.checked++;
          const box = `x ${Math.round(r.left)}-${Math.round(r.right)}, y ${Math.round(r.top)}-${Math.round(r.bottom)}`;
          const inside = r.left >= -0.5 && r.top >= -0.5 && r.right <= innerWidth + 0.5 && r.bottom <= innerHeight + 0.5;
          const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
          const covered = !hit ? 'nothing (centre off-screen)' : (hit === el || el.contains(hit)) ? null : name(hit.closest('[id]') || hit);
          if (!inside || covered) out.offenders.push({ el: name(el), box, why: [!inside && `outside ${innerWidth}x${innerHeight}`, covered && `elementFromPoint = ${covered}`].filter(Boolean).join('; ') });
        }
        return out;
      }, L.selectors);
      return { ...res, errors };
    } finally { await ctx.close(); }
  }
  for (const vp of L.viewports) {
    const tag = `layout ${vp[0]}x${vp[1]}`;
    try {
      const r = await withTimeout(layoutRun(vp), L.timeoutMs, tag);
      report.browser.layout.push({ viewport: vp, checked: r.checked, offenders: r.offenders });
      report.browser.console.push({ run: tag, errors: r.errors });
      if (r.errors.length) fail(`console ${tag}: ${r.errors.length} error(s)\n  ` + r.errors.slice(0, 5).join('\n  '));
      else log(`ok   console ${tag}: file:// load, 0 page errors, 0 console errors, 0 failed requests`);
      if (!r.checked) { fail(`${tag}: no visible element matched ${L.selectors.join(', ')}`); continue; }
      let nKnown = 0;
      for (const o of r.offenders) {
        const id = o.el.split(' ')[0], isKnown = known.has(id);
        if (isKnown) { knownHit.add(id); nKnown++; }
        const line = `${tag} ${o.el}: ${o.why} (${o.box})`;
        if (isKnown && !strict) log('KNOWN ' + line); else if (L.mode === 'report') log('REPORT ' + line); else fail(line + (isKnown ? ' [known, --strict-layout]' : ''));
      }
      if (!r.offenders.length) log(`ok   ${tag}: ${r.checked} buttons inside the viewport and on top`);
      else log(`     ${tag}: ${r.checked} buttons checked, ${r.offenders.length} offender(s), ${nKnown} known`);
    } catch (e) { fail(`${tag}: ${e.message.split('\n')[0]}`); }
  }
  if (knownHit.size) log(`KNOWN: ${[...knownHit].join(' ')} — ${L.known.reason}`);
  for (const id of known) if (!knownHit.has(id) && report.browser.layout.length) note(`known layout offender ${id} now passes everywhere; remove it from GAME.browser.known`);
  await browser.close();
}

rmSync(tmp, { recursive: true, force: true });
clearTimeout(watchdog);
report.result = failed ? 'FAIL' : 'OK';
report.seconds = Math.round((Date.now() - t0) / 1000);
if (process.env.GATE_JSON) writeFileSync(process.env.GATE_JSON, JSON.stringify(report, null, 2) + '\n');
log(`     ${report.seconds} s`);
log(`RESULT ${report.result}`);
process.exit(failed ? 1 : 0);
