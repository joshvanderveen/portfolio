import { defineConfig } from 'astro/config';

const site = new URL(process.env.SITE_URL || 'https://joshvdv.com');
if (site.protocol !== 'https:' || site.pathname !== '/' || site.search || site.hash) {
  throw new Error('SITE_URL must be an HTTPS origin, for example https://joshvdv.com');
}

export default defineConfig({
  output: 'static',
  site: site.href,
  trailingSlash: 'never',
  // Built CSS, scripts, fonts and images go in /assets/ rather than Astro's default /_astro/.
  build: { format: 'file', assets: 'assets' },
  // Keep executable scripts external so the CSP can disallow inline code.
  vite: { build: { assetsInlineLimit: 0 } },
  devToolbar: { enabled: false },
});
