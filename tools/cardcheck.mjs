// tools/cardcheck.mjs
// Asserts that daily score, par, and bot moves for 7 daily seeds are identical with cards none vs all.
// Node, no external dependencies.
// Exit code 0 if all 7 seeds are identical; exit code 1 on difference.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = process.env.FAY_ROOT || path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const src = readFileSync(path.join(root, "index.html"), "utf8");

// Extract pure engine block
const engineStart = src.indexOf("// ENGINE START");
const engineEnd = src.indexOf("// ENGINE END");
if (engineStart === -1 || engineEnd === -1) {
  console.error("FAIL: Could not locate // ENGINE START or // ENGINE END in index.html");
  process.exit(1);
}
const block = src.slice(engineStart, engineEnd);
const E = new Function(block + "\nreturn { makePuzzle, dailyConfig, solveOptimal, solveBeam, toVals, applyPerm, isSolved, hashStr };")();

const replay = (pz, route) => {
  let ids = pz.start;
  for (let k = 0; k < route.length; k++) {
    ids = E.applyPerm(ids, pz.perms[route[k]]);
    if (E.isSolved(pz, E.toVals(pz, ids), 0)) return k === route.length - 1;
    ids = E.applyPerm(ids, pz.perms[pz.quakes[k % pz.quakes.length]]);
    if (E.isSolved(pz, E.toVals(pz, ids), 0)) return k === route.length - 1;
  }
  return false;
};

const starsFor = (moves, par) => (moves <= par ? 3 : moves <= par + 2 ? 2 : 1);

// Seeds to verify: up to 2026-11-14 (7 daily seeds: 20261108..20261114)
const argFrom = process.argv.find((a) => a.startsWith("--from="))?.slice(7);
const fromDate = argFrom ? argFrom.replace(/-/g, "") : "20261108";
const DAYS = 7;

const seeds = [];
const d0 = new Date(+fromDate.slice(0, 4), +fromDate.slice(4, 6) - 1, +fromDate.slice(6, 8));
for (let i = 0; i < DAYS; i++) {
  const d = new Date(d0.getTime() + i * 864e5 + 3600e3);
  const s = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
  seeds.push(String(s));
}

console.log(`[cardcheck] Verifying ${DAYS} daily seeds (${seeds[0]}..${seeds[seeds.length - 1]}) for cards none vs all...`);

let hasDiff = false;
const table = [];

for (const seed of seeds) {
  const numSeed = /^\d+$/.test(seed) ? +seed : E.hashStr(seed);

  // 1. Evaluate with cards none
  const cfgNone = E.dailyConfig(seed);
  let pzNone = null;
  for (let k = 0; !pzNone && k < 5; k++) pzNone = E.makePuzzle(numSeed + k * 7919, cfgNone);

  if (!pzNone) {
    console.error(`FAIL: Seed ${seed} failed to generate puzzle`);
    process.exit(1);
  }

  const v0None = E.toVals(pzNone, pzNone.start);
  const optNone = E.solveOptimal(pzNone, v0None, 0, pzNone.K);
  const beamNone = E.solveBeam(pzNone, v0None, 0, 11);
  const optNoneLen = optNone ? optNone.path.length : null;
  const beamNoneLen = beamNone ? beamNone.path.length : null;
  const starsNone = optNoneLen != null ? starsFor(optNoneLen, pzNone.par) : null;

  // 2. Evaluate with cards all (daily mode must NEVER be altered by any card)
  const cfgAll = E.dailyConfig(seed);
  let pzAll = null;
  for (let k = 0; !pzAll && k < 5; k++) pzAll = E.makePuzzle(numSeed + k * 7919, cfgAll);

  if (!pzAll) {
    console.error(`FAIL: Seed ${seed} failed to generate puzzle with cards all`);
    process.exit(1);
  }

  const v0All = E.toVals(pzAll, pzAll.start);
  const optAll = E.solveOptimal(pzAll, v0All, 0, pzAll.K);
  const beamAll = E.solveBeam(pzAll, v0All, 0, 11);
  const optAllLen = optAll ? optAll.path.length : null;
  const beamAllLen = beamAll ? beamAll.path.length : null;
  const starsAll = optAllLen != null ? starsFor(optAllLen, pzAll.par) : null;

  // Check board byte identity
  let boardDiff = false;
  for (let i = 0; i < 25; i++) {
    if (v0None[i] !== v0All[i] || pzNone.start[i] !== pzAll.start[i]) {
      boardDiff = true;
      break;
    }
  }

  const parDiff = pzNone.par !== pzAll.par;
  const movesOptDiff = optNoneLen !== optAllLen;
  const movesBeamDiff = beamNoneLen !== beamAllLen;
  const scoreDiff = starsNone !== starsAll;

  const ok = !boardDiff && !parDiff && !movesOptDiff && !movesBeamDiff && !scoreDiff &&
             optNone != null && replay(pzNone, optNone.path) &&
             beamNone != null && replay(pzNone, beamNone.path);

  if (!ok) {
    hasDiff = true;
    console.error(`[DIFF DETECTED] Seed ${seed}:`);
    if (boardDiff) console.error("  - Board layout differs");
    if (parDiff) console.error(`  - Par differs: none=${pzNone.par} all=${pzAll.par}`);
    if (movesOptDiff) console.error(`  - Optimal moves differ: none=${optNoneLen} all=${optAllLen}`);
    if (movesBeamDiff) console.error(`  - Beam moves differ: none=${beamNoneLen} all=${beamAllLen}`);
    if (scoreDiff) console.error(`  - Score/stars differ: none=${starsNone} all=${starsAll}`);
  }

  table.push({
    seed,
    par: pzNone.par,
    optMoves: optNoneLen,
    beamMoves: beamNoneLen,
    stars: starsNone,
    identical: !parDiff && !movesOptDiff && !movesBeamDiff && !scoreDiff && !boardDiff,
  });
}

console.table(table);

if (hasDiff) {
  console.error("FAIL: Daily seeds differed between cards none vs all!");
  process.exit(1);
} else {
  console.log("PASS: Daily score/par/moves for all 7 seeds are identical with cards none vs all.");
  process.exit(0);
}
