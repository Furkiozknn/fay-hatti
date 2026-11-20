// Records docs/gameplay.gif from the game itself: its own demo bot (?demo=1) plays an endless level and the daily map.
// Usage: PW_CORE=<path to playwright-core> BROWSER_EXE=<chromium/edge exe> node tools/record-gameplay.cjs [outDir]
// Needs ffmpeg on PATH. Frames come from a CDP screencast, so no Playwright video encoder is required.
// The 960x540 frames are scaled to 540x304 at 10 fps, the format of the other Claude Game Arena GIFs.
const { chromium } = require(process.env.PW_CORE || 'playwright-core');
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const root = path.resolve(__dirname, '..');
const out = path.resolve(process.argv[2] || path.join(root, '.rec'));
const SEGS = ['?demo=1&level=2', '?demo=1'];
(async () => {
  fs.rmSync(out, { recursive: true, force: true }); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(process.env.BROWSER_EXE ? { executablePath: process.env.BROWSER_EXE } : {});
  const c = await b.newContext({ viewport: { width: 960, height: 540 } });
  await c.route(/^https?:/, (r) => r.abort());
  const p = await c.newPage();
  await p.addInitScript(() => { try { localStorage.setItem('fayhatti.lang', '"en"'); localStorage.setItem('fayhatti.tutDone', 'true'); } catch (e) {} });
  const cdp = await c.newCDPSession(p), frames = [];
  cdp.on('Page.screencastFrame', (f) => { frames.push({ t: f.metadata.timestamp, d: f.data }); cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {}); });
  await cdp.send('Page.startScreencast', { format: 'png', everyNthFrame: 1 });
  for (const q of SEGS) {
    await p.goto('file://' + root.replace(/\\/g, '/').replace(/^([A-Za-z]):/, '/$1:') + '/index.html' + q);
    await p.waitForTimeout(500);
    await p.waitForFunction(() => document.getElementById('result') && document.getElementById('result').classList.contains('on'), null, { timeout: 30000 });
    await p.waitForTimeout(500);
  }
  await cdp.send('Page.stopScreencast');
  let list = '';
  frames.forEach((f, i) => {
    const n = 'f' + String(i).padStart(5, '0') + '.png';
    fs.writeFileSync(path.join(out, n), Buffer.from(f.d, 'base64'));
    list += `file '${n}'\nduration ${(i < frames.length - 1 ? frames[i + 1].t - f.t : 0.1).toFixed(4)}\n`;
  });
  list += `file 'f${String(frames.length - 1).padStart(5, '0')}.png'\n`;
  fs.writeFileSync(path.join(out, 'list.txt'), list);
  await c.close(); await b.close();
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', 'list.txt', '-ss', '0.5',
    '-vf', 'fps=10,scale=540:304:flags=lanczos,split[a][b];[a]palettegen=max_colors=128:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle',
    '-loop', '0', path.join(root, 'docs', 'gameplay.gif')], { cwd: out, stdio: 'inherit' });
  fs.rmSync(out, { recursive: true, force: true });
  console.log('wrote docs/gameplay.gif from', frames.length, 'frames');
})();
