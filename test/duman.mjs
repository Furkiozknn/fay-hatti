// Duman testi (fay-hatti): sayfa aciliyor, konsol hatasi yok, oyun basliyor, etkilesim durumu degistiriyor,
// telefon gorunumunde tasma yok. Depoya bagimlilik eklenmez: playwright-core disaridan verilir.
//   PW_CORE=<playwright-core yolu>  BROWSER_EXE=<chrome/msedge yolu>  node test/duman.mjs [index.html] [--yeni]
// --yeni: v1.4 ile gelen ozellikleri de dener (surum etiketi, yenilikler, defter). Eski surumde kullanma.
import { createRequire } from 'node:module';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, resolve } from 'node:path';
const require = createRequire(import.meta.url);
const args = process.argv.slice(2);
const YENI = args.includes('--yeni');
const file = resolve(args.find((a) => !a.startsWith('--')) || join(dirname(fileURLToPath(import.meta.url)), '..', 'index.html'));
let pw;
for (const m of [process.env.PW_CORE, 'playwright-core', 'playwright'].filter(Boolean)) { try { pw = require(m); break; } catch (e) {} }
if (!pw) { console.error('playwright-core bulunamadi (PW_CORE ayarla)'); process.exit(2); }
const launchOpts = { headless: true };
if (process.env.BROWSER_EXE) launchOpts.executablePath = process.env.BROWSER_EXE;
let fails = 0;
const ok = (c, m, extra = '') => { console.log((c ? 'ok   ' : 'FAIL ') + m + (extra ? '  [' + extra + ']' : '')); if (!c) fails++; };
const browser = await pw.chromium.launch(launchOpts);
const url = pathToFileURL(file).href + '?seed=20261108&nosave';
async function open(opts) {
  const ctx = await browser.newContext(opts);
  const page = await ctx.newPage();
  const errs = [], bad = [];
  page.on('pageerror', (e) => errs.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
  page.on('requestfailed', (r) => bad.push(r.url().slice(0, 90)));
  await ctx.route(/gc\.zgo\.at/, (r) => r.fulfill({ status: 200, body: '' }));
  const t0 = Date.now();
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForFunction(() => window.fayHatti && window.fayHatti.state !== undefined, null, { timeout: 15000 });
  return { ctx, page, errs, bad, ms: Date.now() - t0 };
}
// --- masaustu 1366x768
{
  const { ctx, page, errs, bad, ms } = await open({ viewport: { width: 1366, height: 768 } });
  ok(errs.length === 0, 'masaustu: sayfa/konsol hatasi yok', errs.join(' | ').slice(0, 200));
  ok(bad.length === 0, 'masaustu: basarisiz istek yok', bad.join(' | '));
  ok(ms < 5000, 'masaustu: yuklenme < 5 sn', ms + ' ms');
  const meta = await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    return { title: document.title, desc: !!q('meta[name=description]'), og: !!q('meta[property="og:image"]'), ogt: !!q('meta[property="og:title"]'),
      tw: !!q('meta[name="twitter:card"]'), icon: !!q('link[rel~=icon]'), theme: !!q('meta[name=theme-color]'), lang: document.documentElement.lang };
  });
  ok(meta.title && meta.desc && meta.theme && !!meta.lang, 'sayfa: title, description, theme-color, lang var', meta.title + ' / lang=' + meta.lang);
  ok(meta.og && meta.ogt && meta.tw, 'sayfa: Open Graph + Twitter karti var');
  ok(meta.icon, 'sayfa: favicon baglantisi var');
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  const before = await page.evaluate(() => ({ m: window.fayHatti.moves, s: window.fayHatti.state }));
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(900);
  const after = await page.evaluate(() => ({ m: window.fayHatti.moves, s: window.fayHatti.state }));
  ok(after.m === before.m + 1, 'oyun: ok tusu hamle sayisini artirir', JSON.stringify(before) + ' -> ' + JSON.stringify(after));
  await page.click('#bMenu');
  await page.waitForTimeout(400);
  ok(await page.evaluate(() => document.getElementById('menu').classList.contains('on')), 'menu acilir');
  if (YENI) {
    const v = await page.evaluate(() => (document.getElementById('verTag') || {}).textContent || '');
    ok(/v1\.4/.test(v) && /2026/.test(v), 'yeni: surum etiketi menude gorunur', v);
    await page.click('#bNews'); await page.waitForTimeout(300);
    ok(await page.evaluate(() => document.getElementById('news').classList.contains('on') && document.querySelectorAll('#newsList li').length >= 3), 'yeni: Yenilikler penceresi acilir (>=3 madde)');
    await page.keyboard.press('Escape'); await page.waitForTimeout(300);
    await page.click('#bLedger'); await page.waitForTimeout(300);
    ok(await page.evaluate(() => document.getElementById('ledger').classList.contains('on') && document.querySelectorAll('#ledGrid .ld').length >= 14), 'yeni: Defter penceresi acilir (14+ gun)');
    await page.keyboard.press('Escape'); await page.waitForTimeout(300);
    ok(await page.evaluate(() => document.getElementById('menu').classList.contains('on')), 'yeni: Esc ile menuye donulur');
    const link = await page.evaluate(() => { const a = document.getElementById('lAllGames'); return a ? a.href : ''; });
    ok(link === 'https://furkiozknn.github.io/', 'yeni: Tum oyunlar baglantisi merkez sayfaya gider', link);
  }
  await ctx.close();
}
// --- telefon 390x844 dokunmatik
{
  const { ctx, page, errs } = await open({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  ok(errs.length === 0, 'telefon: sayfa/konsol hatasi yok', errs.join(' | ').slice(0, 200));
  const ov = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth }));
  ok(ov.sw <= ov.iw, 'telefon: yatay tasma yok', ov.sw + ' <= ' + ov.iw);
  const btn = await page.evaluate(() => [...document.querySelectorAll('#bar button')].filter((b) => b.offsetParent).map((b) => {
    const r = b.getBoundingClientRect(); const e = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
    return { id: b.id, inside: r.left >= 0 && r.right <= innerWidth && r.top >= 0 && r.bottom <= innerHeight, hit: b.contains(e), w: Math.round(r.width), h: Math.round(r.height) };
  }));
  ok(btn.length >= 4 && btn.every((b) => b.inside && b.hit), 'telefon: alt cubuk dugmeleri gorunur ve tiklanir', JSON.stringify(btn.map((b) => b.id + ':' + b.w + 'x' + b.h)));
  ok(btn.every((b) => b.w >= 40 && b.h >= 40), 'telefon: dokunma hedefleri >= 40 px');
  await page.tap('#bMenu'); await page.waitForTimeout(400);
  const pan = await page.evaluate(() => { const p = document.querySelector('#menu .panel'); const r = p.getBoundingClientRect(); return { l: r.left, rr: r.right, sw: p.scrollWidth, cw: p.clientWidth }; });
  ok(pan.l >= 0 && pan.rr <= 390 && pan.sw <= pan.cw + 1, 'telefon: menu paneli tasmaz', JSON.stringify(pan));
  if (YENI) {
    for (const id of ['news', 'ledger']) {
      await page.evaluate((i) => document.getElementById(i === 'news' ? 'bNews' : 'bLedger').click(), id); await page.waitForTimeout(300);
      const p2 = await page.evaluate((i) => { const p = document.querySelector('#' + i + ' .panel'); const r = p.getBoundingClientRect(); return { l: r.left, rr: r.right, sw: p.scrollWidth, cw: p.clientWidth, b: r.bottom }; }, id);
      ok(p2.l >= 0 && p2.rr <= 390 && p2.sw <= p2.cw + 1 && p2.b <= 844, 'yeni telefon: ' + id + ' paneli tasmaz', JSON.stringify(p2));
      await page.keyboard.press('Escape'); await page.waitForTimeout(300);
    }
  }
  await ctx.close();
}
await browser.close();
console.log(fails ? 'SONUC: ' + fails + ' basarisiz' : 'SONUC: hepsi gecti');
process.exit(fails ? 1 : 0);
