// Headless engine test: extracts the ENGINE block from index.html and runs generator + both solvers.
// Usage: node tools/sim.mjs [from=20261108] [days=7] [endlessLevels=0]
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const src = readFileSync(path.join(root, process.env.ENGINE_FILE || "index.html"), "utf8");
const block = src.slice(src.indexOf("// ENGINE START"), src.indexOf("// ENGINE END"));
const E = new Function(block + "\nreturn { makePuzzle, dailyConfig, endlessConfig, solveOptimal, solveBeam, toVals, applyPerm, isSolved, hashStr };")();

const [fromArg = "20261108", daysArg = "7", endlessArg = "0"] = process.argv.slice(2);
const replay = (pz, path) => {
  // play the path with the real rules (move, solved? else quake) and confirm it ends solved
  let ids = pz.start;
  for (let k = 0; k < path.length; k++) {
    ids = E.applyPerm(ids, pz.perms[path[k]]);
    if (E.isSolved(pz, E.toVals(pz, ids), 0)) return k === path.length - 1;
    ids = E.applyPerm(ids, pz.perms[pz.quakes[k % pz.quakes.length]]);
    if (E.isSolved(pz, E.toVals(pz, ids), 0)) return k === path.length - 1;
  }
  return false;
};
const rows = [];
const run = (label, seed, cfg) => {
  const t0 = performance.now();
  const pz = E.makePuzzle(seed, cfg);
  const gen = performance.now() - t0;
  if (!pz) { rows.push({ label, ok: false, err: "no puzzle" }); return; }
  const v0 = E.toVals(pz, pz.start);
  const t1 = performance.now();
  const a = E.solveOptimal(pz, v0, 0, pz.K);
  const ta = performance.now() - t1;
  const t2 = performance.now();
  const b = E.solveBeam(pz, v0, 0, 11); // same seed as the in-game ?demo=b bot
  const tb = performance.now() - t2;
  rows.push({
    label, K: pz.K, par: pz.par, A: a ? a.path.length : null, B: b ? b.path.length : null,
    okA: !!a && replay(pz, a.path), okB: !!b && replay(pz, b.path),
    genMs: Math.round(gen), aMs: Math.round(ta), bMs: Math.round(tb), nodes: a ? a.nodes : null, att: pz.attempts,
  });
};
const d0 = new Date(+fromArg.slice(0, 4), +fromArg.slice(4, 6) - 1, +fromArg.slice(6, 8));
for (let i = 0; i < +daysArg; i++) {
  const d = new Date(d0.getTime() + i * 864e5 + 3600e3);
  const s = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  run(String(s), s, E.dailyConfig(s));
}
for (let L = 1; L <= +endlessArg; L++) run("endless " + L, E.hashStr("endless" + L), E.endlessConfig(L));
console.table(rows);
const ok = rows.filter((r) => r.okA && r.okB).length;
const avg = (k) => (rows.reduce((s, r) => s + (r[k] || 0), 0) / rows.length).toFixed(2);
console.log(JSON.stringify({ puzzles: rows.length, solvedBoth: ok, avgPar: avg("par"), avgA: avg("A"), avgB: avg("B"), avgGenMs: avg("genMs"), maxGenMs: Math.max(...rows.map((r) => r.genMs || 0)) }));
process.exitCode = ok === rows.length ? 0 : 1;
