import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { services } from '../src/data/services';

const pages = [
  { path: '/', h1: 'Software that earns its keep.' },
  { path: '/work', h1: 'Built, launched and still looked after.' },
  { path: '/work/find-cards', h1: 'FIND Cards' },
  { path: '/work/foxwood-media', h1: 'Foxwood Media' },
  { path: '/work/homeward', h1: 'Homeward' },
  { path: '/services', h1: 'Everything your business needs online.' },
  ...services.map(service => ({ path: `/services/${service.slug}`, h1: service.page.h1 })),
  { path: '/about', h1: 'A studio that sticks around after launch.' },
  { path: '/contact', h1: 'Let’s talk about your project.' },
  { path: '/privacy', h1: 'Privacy policy' },
];

function watchErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  return errors;
}

for (const width of [1440, 390]) {
  test(`every page renders cleanly and accessibly at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = watchErrors(page);
    for (const { path, h1 } of pages) {
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(200);
      await expect(page.locator('h1'), path).toHaveText(h1);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${path} scrolls sideways`).toBe(true);
      const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
      expect(violations.map(violation => `${path}: ${violation.id}`)).toEqual([]);
    }
    expect(errors).toEqual([]);
  });
}

test('navigation marks the current page and reaches every section', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main' });
  await nav.getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(nav.getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page');
  await nav.getByRole('link', { name: 'Work' }).click();
  await page.locator('main a[href="/work/foxwood-media"]').click();
  await expect(page).toHaveURL(/\/work\/foxwood-media$/);
  // Case studies sit under Work in the menu.
  await expect(nav.getByRole('link', { name: 'Work' })).toHaveAttribute('aria-current', 'page');
  await page.locator('main a[href="/work/homeward"]').filter({ hasText: 'Next case study' }).click();
  await expect(page).toHaveURL(/\/work\/homeward$/);
  await page.locator('main a[href="/work/find-cards"]').filter({ hasText: 'Next case study' }).click();
  await expect(page).toHaveURL(/\/work\/find-cards$/);
  await page.getByRole('banner').getByRole('link', { name: 'Book a call' }).click();
  await expect(page).toHaveURL(/\/contact$/);
});

test('work filters show only matching projects', async ({ page }) => {
  await page.goto('/work');
  const cards = page.locator('.work-grid .card');
  await expect(cards).toHaveCount(4);
  await page.getByRole('button', { name: 'Mobile apps' }).click();
  await expect(page.getByRole('button', { name: 'Mobile apps' })).toHaveAttribute('aria-pressed', 'true');
  await expect(cards.filter({ visible: true })).toHaveCount(1);
  await expect(cards.filter({ visible: true })).toContainText('FIND Cards');
  await page.getByRole('button', { name: 'Websites' }).click();
  await expect(cards.filter({ visible: true })).toHaveCount(2);
  await page.getByRole('button', { name: 'Web apps' }).click();
  await expect(cards.filter({ visible: true })).toHaveCount(3);
  await page.getByRole('button', { name: 'All work' }).click();
  await expect(cards.filter({ visible: true })).toHaveCount(4);
});

test('home enquiry form sends to the enquiry endpoint', async ({ page }) => {
  let payload: Record<string, string> = {};
  await page.route('**/api/enquiry', async route => {
    payload = route.request().postDataJSON();
    await route.fulfill({ json: { ok: true } });
  });
  await page.goto('/');
  const form = page.locator('#enquiry-short');
  await form.getByRole('button', { name: 'Send enquiry' }).click();
  // Required fields stop an empty form before anything is sent.
  expect(payload).toEqual({});
  await form.getByLabel('Your name').fill('Sam Taylor');
  await form.getByLabel('Email').fill('sam@example.com');
  await form.getByLabel('Business').fill('Taylor Plumbing');
  await form.getByLabel('What do you need?').selectOption('E-Commerce store');
  await form.getByLabel('About the project').fill('We need a new site.');
  await form.getByRole('button', { name: 'Send enquiry' }).click();
  await expect(form.getByRole('heading', { name: 'Enquiry sent.' })).toBeVisible();
  await expect(form.getByLabel('Your name')).toBeHidden();
  expect(payload).toMatchObject({ name: 'Sam Taylor', email: 'sam@example.com', business: 'Taylor Plumbing', services: 'E-Commerce store', message: 'We need a new site.', website: '' });
});

test('contact form sends every detail and offers an email draft when sending fails', async ({ page }) => {
  let payload: Record<string, string> = {};
  await page.route('**/api/enquiry', async route => {
    payload = route.request().postDataJSON();
    await route.fulfill({ status: 502, json: { error: 'down' } });
  });
  await page.goto('/contact');
  const form = page.locator('#enquiry-full');
  await form.getByLabel('Your name').fill('Sam Taylor');
  await form.getByLabel('Email').fill('sam@example.com');
  await form.getByLabel('Phone (optional)').fill('0400 000 000');
  await form.getByText('Website', { exact: true }).click();
  await form.getByText('SEO', { exact: true }).click();
  await form.getByLabel('Budget').selectOption('$5k to $15k');
  await form.getByLabel('About the project').fill('A site and some SEO help.');
  await form.getByRole('button', { name: 'Send enquiry' }).click();
  const draft = form.getByRole('link', { name: 'Open your email draft' });
  await expect(draft).toBeVisible();
  expect(payload).toMatchObject({ name: 'Sam Taylor', phone: '0400 000 000', services: 'Website, SEO', budget: '$5k to $15k' });
  const href = decodeURIComponent((await draft.getAttribute('href'))!);
  expect(href).toMatch(/^mailto:[^?]+\?subject=Website enquiry - Sam Taylor&body=/);
  expect(href).toContain('Needs: Website, SEO');
  expect(href).toContain('A site and some SEO help.');
  // The form stays filled in so the visitor can try again.
  await expect(form.getByLabel('Your name')).toHaveValue('Sam Taylor');
});

test('without JavaScript the forms point people to email instead', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/contact');
  await expect(page.locator('#enquiry-full').getByLabel('Your name')).toBeDisabled();
  // Chromium's script-disabled mode still parses <noscript> as raw text, so check the markup.
  expect(await page.content()).toMatch(/<noscript><p[^>]*>Please email your project details to <a[^>]*href="mailto:/);
  await context.close();
});

test('the Worker serves headers, metadata, sitemap and real 404s', async ({ request }) => {
  const home = await request.get('/');
  expect(home.headers()['x-content-type-options']).toBe('nosniff');
  expect(home.headers()['content-security-policy']).toContain("script-src 'self'");
  const html = await home.text();
  expect(new URL(html.match(/rel="canonical" href="([^"]+)"/)![1]).pathname).toBe('/');
  expect(html).toContain('"@type":"ProfessionalService"');
  expect(html).toContain('"founder":{"@type":"Person","name":"Josh Van Der Veen"');
  expect(await (await request.get('/services')).text()).toContain('"@type":"FAQPage"');

  // Every indexable page has a unique, studio-named title, a social image that exists,
  // and pages below the top level carry breadcrumb data.
  const titles = new Set<string>();
  for (const { path } of pages) {
    const page = await (await request.get(path)).text();
    const title = page.match(/<title>([^<]*)<\/title>/)![1];
    expect(title, path).toContain('JVDV Studio');
    expect(titles.has(title), `duplicate title ${title}`).toBe(false);
    titles.add(title);
    const image = new URL(page.match(/property="og:image" content="([^"]+)"/)![1]);
    expect((await request.get(image.pathname)).status(), `${path} og:image`).toBe(200);
    if (path.split('/').length > 2) expect(page, path).toContain('"@type":"BreadcrumbList"');
  }
  const service = await (await request.get(`/services/${services[0].slug}`)).text();
  expect(service).toContain('"@type":"Service"');
  expect(await (await request.get('/work/homeward')).text()).toContain('"@type":"CreativeWork"');

  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap.match(/<loc>/g)).toHaveLength(pages.length);
  expect(sitemap).not.toContain('/404');
  expect(await (await request.get('/robots.txt')).text()).toContain('Sitemap: ');

  const missing = await request.get('/no-such-page');
  expect(missing.status()).toBe(404);
  expect(await missing.text()).toContain('We can’t find that page.');
  expect(await missing.text()).toContain('noindex');
});
