// Records looping demo clips of the live Flyism / BizeVizeYok sites.
// Usage: npm run record:demos   (needs ffmpeg on PATH; run `npx playwright install chromium` once)
// Read-only browsing: no forms submitted, consent banners declined.
import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const OUT = new URL('../public/videos/', import.meta.url).pathname;
const VIEWPORTS = { desktop: { width: 1280, height: 720 }, mobile: { width: 390, height: 844 } };
const pause = (page, ms) => page.waitForTimeout(ms);
// Flows call mark(page) when the frame worth using as the poster is on screen.
const marks = new WeakMap();
const mark = (page) => marks.set(page, Date.now());

async function declineConsent(page) {
  const btn = page.getByRole('button', { name: /^(Decline|Reddet)$/ });
  if (await btn.first().isVisible().catch(() => false)) await btn.first().click();
}

async function scrollBy(page, px, steps = 6, gap = 140) {
  for (let i = 0; i < steps; i++) {
    await page.mouse.wheel(0, px / steps);
    await pause(page, gap);
  }
}

// Moves the mouse onto a fully visible Explore card (the rail auto-scrolls, so avoid
// actionability waits) and clicks it.
async function openVisibleCard(page) {
  const cards = page.locator('.explore-card-link');
  // The rail auto-scrolls; pause it so the card stays under the pointer.
  const pauseBtn = page.getByRole('button', { name: /pause|duraklat/i }).first();
  if (await pauseBtn.isVisible().catch(() => false)) await pauseBtn.click({ timeout: 2000 }).catch(() => {});
  await pause(page, 300);
  await cards.first().waitFor({ state: 'attached', timeout: 10000 });
  const vw = page.viewportSize().width;
  const box = await page.evaluate((vw) => {
    const all = [...document.querySelectorAll('.explore-card-link')];
    for (let i = 0; i < all.length; i++) {
      const r = all[i].getBoundingClientRect();
      if (r.width > 0 && r.left >= 8 && r.right <= vw - 8 && r.top > 0 && r.bottom < innerHeight) return { i, x: r.x + r.width / 2, y: r.y + r.height / 2 };
    }
    return null;
  }, vw);
  if (!box) throw new Error('no fully visible explore card');
  await page.mouse.move(box.x, box.y, { steps: 12 });
  await pause(page, 600);
  // Explore cards are target=_blank links; open them in this tab so the clip follows the click.
  await cards.nth(box.i).evaluate((a) => a.setAttribute('target', '_self'));
  await cards.nth(box.i).click({ force: true });
  // Results load asynchronously; wait for the fare list before carrying on.
  await page.getByText(/View flight|Uçuşu görüntüle/).first().waitFor({ timeout: 15000 });
  if (process.env.DEBUG_FLOW) console.log('clicked card at', box, page.url());
}

// Each flow gets a fresh page; total target 8-15 s.
const SITES = {
  flyism: {
    url: 'https://flyism.net',
    async flow(page, device) {
      await pause(page, 900);
      // Pick a passport (first-visit dialog), English-language one.
      await page.locator('.global-passport-option', { hasText: 'India' }).hover();
      await pause(page, 500);
      await page.locator('.global-passport-option', { hasText: 'India' }).click();
      await pause(page, 1000);
      await declineConsent(page);
      await pause(page, 600);
      // Visa-free destinations rail with cheapest fares.
      await page.mouse.wheel(0, 120);
      await pause(page, 800);
      await openVisibleCard(page);
      await page.waitForLoadState('networkidle').catch(() => {});
      await pause(page, 1500);
      mark(page);
      if (process.env.DEBUG_FLOW) console.log('after click', page.url());
      await scrollBy(page, device === 'mobile' ? 700 : 500);
      await pause(page, 1500);
    },
  },
  bizevizeyok: {
    url: 'https://bizevizeyok.com',
    async flow(page, device) {
      await pause(page, 900);
      await declineConsent(page);
      await pause(page, 600);
      await page.mouse.wheel(0, 120);
      await pause(page, 800);
      await openVisibleCard(page);
      await page.waitForLoadState('networkidle').catch(() => {});
      await pause(page, 1500);
      mark(page);
      if (process.env.DEBUG_FLOW) console.log('after click', page.url());
      await scrollBy(page, device === 'mobile' ? 700 : 500);
      await pause(page, 1500);
    },
  },
  ard: {
    url: 'https://hilfe.ard.de',
    dark: true,
    async flow(page, device) {
      await pause(page, 1200);
      const no = page.getByRole('button', { name: 'Ablehnen' });
      if (await no.first().isVisible().catch(() => false)) await no.first().click();
      await pause(page, 900);
      await scrollBy(page, device === 'mobile' ? 360 : 260, 5, 160);
      await pause(page, 900);
      // Open one help area (read-only navigation, same tab).
      const tile = page.getByRole('link', { name: 'Fernsehen' }).first();
      await tile.scrollIntoViewIfNeeded();
      const b = await tile.boundingBox();
      await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 14 });
      await pause(page, 600);
      await tile.click();
      await page.waitForLoadState('networkidle').catch(() => {});
      await pause(page, 1200);
      mark(page);
      await scrollBy(page, device === 'mobile' ? 500 : 420, 6, 170);
      await pause(page, 1500);
    },
  },
  ulviye: {
    url: 'https://ulviyeyucelsigorta.com',
    async flow(page, device) {
      // Browse only: no form fields are touched.
      await pause(page, 1800);
      const step = device === 'mobile' ? 620 : 560;
      for (let i = 0; i < 5; i++) {
        await scrollBy(page, step, 6, 150);
        await pause(page, 900);
        if (i === 1) mark(page);
      }
      await pause(page, 800);
    },
  },
};

/**
 * Frame-accurate recording via the CDP screencast (Playwright's own recordVideo drops
 * idle time and start frames on static pages). Returns a cfr-ready concat list.
 */
async function startCapture(ctx, page, dir) {
  const cdp = await ctx.newCDPSession(page);
  const frames = [];
  cdp.on('Page.screencastFrame', async (f) => {
    const file = join(dir, `f${String(frames.length).padStart(5, '0')}.jpg`);
    writeFileSync(file, Buffer.from(f.data, 'base64'));
    frames.push({ file, ts: f.metadata.timestamp });
    await cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {});
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 85, everyNthFrame: 1 });
  return async () => {
    await cdp.send('Page.stopScreencast').catch(() => {});
    return frames;
  };
}

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
for (const [site, cfg] of Object.entries(SITES)) {
  // Sites that support dark mode are also recorded in light, as `<site>-<device>-light`, for the site's light theme.
  for (const [scheme, device, viewport] of Object.entries(VIEWPORTS).flatMap(([d, v]) => (cfg.dark ? [['dark', d, v], ['light', d, v]] : [[cfg.dark ? 'dark' : 'light', d, v]]))) {
    const name = `${site}-${device}${cfg.dark && scheme === 'light' ? '-light' : ''}`;
    if (process.env.ONLY && !name.includes(process.env.ONLY)) continue;
    const tmp = mkdtempSync(join(tmpdir(), 'rec-'));
    const ctx = await browser.newContext({
      viewport,
      deviceScaleFactor: 1,
      isMobile: device === 'mobile',
      hasTouch: device === 'mobile',
      // The site is dark; record sources in dark mode too where they support it.
      colorScheme: scheme,
    });
    const page = await ctx.newPage();
    page.setDefaultTimeout(10000);
    await page.goto(cfg.url, { waitUntil: 'networkidle' });
    const stop = await startCapture(ctx, page, tmp);
    const t0 = Date.now();
    try {
      await cfg.flow(page, device);
    } catch (e) {
      console.error(`flow failed for ${name}:`, e.message.split('\n')[0]);
    }
    const frames = await stop();
    const wall = (Date.now() - t0) / 1000;
    await ctx.close();
    if (frames.length < 2) {
      console.error(`${name}: no frames captured`);
      continue;
    }
    const end = frames[frames.length - 1].ts + Math.max(0.4, wall - (frames[frames.length - 1].ts - frames[0].ts));
    const total = Math.min(15, end - frames[0].ts);
    const list = frames
      .map((f, i) => `file '${f.file}'\nduration ${((frames[i + 1]?.ts ?? end) - f.ts).toFixed(4)}`)
      .join('\n');
    const listFile = join(tmp, 'list.txt');
    writeFileSync(listFile, list + `\nfile '${frames[frames.length - 1].file}'\n`);
    console.log(`${name}: ${frames.length} frames, ${total.toFixed(1)}s`);

    const scale = device === 'mobile' ? 'scale=390:-2' : 'scale=960:-2';
    const common = ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', listFile, '-t', total.toFixed(2), '-an', '-vf', `fps=24,${scale}`];
    execFileSync('ffmpeg', [...common, '-c:v', 'libx264', '-profile:v', 'main', '-pix_fmt', 'yuv420p', '-crf', '30', '-preset', 'slow', '-movflags', '+faststart', join(OUT, `${name}.mp4`)]);
    execFileSync('ffmpeg', [...common, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '38', '-row-mt', '1', join(OUT, `${name}.webm`)]);
    // Poster: the JPG frame closest to ~3 s in (after the passport/consent steps settle).
    const markedAt = marks.has(page) ? (marks.get(page) - t0) / 1000 : 3.5;
    const pf = frames.find((f) => f.ts - frames[0].ts >= markedAt) ?? frames[frames.length - 1];
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', pf.file, '-vf', scale, '-q:v', '4', join(OUT, `${name}-poster.jpg`)]);
    if (process.env.KEEP_RAW) console.log('frames kept in', tmp);
    else rmSync(tmp, { recursive: true, force: true });
  }
}
await browser.close();
