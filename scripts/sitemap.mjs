// Builds dist/sitemap.xml from the prerendered pages, after `astro build`.
// Every page with a canonical URL and no noindex is listed with the photos in its main content.
// <lastmod> only moves when a page's main content, title or description changes. Dates live in
// content/sitemap-lastmod.json, which the build updates and which should be committed with the change.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';

const dist = 'dist';
const manifestPath = 'content/sitemap-lastmod.json';
const today = new Date().toLocaleDateString('en-CA', { timeZone: 'Australia/Melbourne' });

const files = (await readdir(dist, { recursive: true })).filter(file => file.endsWith('.html')).sort();
let manifest = {};
try { manifest = JSON.parse(await readFile(manifestPath, 'utf8')); } catch {}

const match = (html, pattern) => html.match(pattern)?.[1];
const escape = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const pages = [];
const nextManifest = {};

for (const file of files) {
  const html = await readFile(path.join(dist, file), 'utf8');
  const canonical = match(html, /<link rel="canonical" href="([^"]+)"/);
  if (!canonical || /<meta name="robots" content="[^"]*noindex/.test(html)) continue;
  const main = match(html, /<main\b[^>]*>([\s\S]*)<\/main>/) ?? '';
  // Bundled asset names change with any site-wide CSS or script edit, so leave them out of the hash.
  const fingerprint = [
    match(html, /<title>([^<]*)<\/title>/),
    match(html, /<meta name="description" content="([^"]*)"/),
    main.replace(/\/assets\/[^"' )]+/g, ''),
  ].join('\n');
  const hash = createHash('sha256').update(fingerprint).digest('hex').slice(0, 16);
  const previous = manifest[canonical];
  const lastmod = previous?.hash === hash ? previous.lastmod : today;
  nextManifest[canonical] = { lastmod, hash };
  const site = new URL(canonical).origin;
  const images = [...new Set([...main.matchAll(/<img\b[^>]*\bsrc="(\/[^"]+)"/g)].map(([, src]) => new URL(src, site).href))];
  pages.push({ canonical, lastmod, images });
}

pages.sort((a, b) => a.canonical.localeCompare(b.canonical));
if (!pages.length) throw new Error('No indexable pages found in dist/. Run astro build first.');
const urls = pages.map(page => [
  '<url>',
  `<loc>${escape(page.canonical)}</loc>`,
  `<lastmod>${page.lastmod}</lastmod>`,
  ...page.images.map(image => `<image:image><image:loc>${escape(image)}</image:loc></image:image>`),
  '</url>',
].join(''));
await writeFile(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>\n`);
await writeFile(manifestPath, `${JSON.stringify(nextManifest, null, 2)}\n`);
console.log(`sitemap.xml: ${pages.length} pages, ${pages.reduce((sum, page) => sum + page.images.length, 0)} images`);
