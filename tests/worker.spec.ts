import { expect, test } from '@playwright/test';
import worker from '../worker/src/index';

const env = {
  RESEND_API_KEY: 'test-key',
  ENQUIRY_TO: 'studio@example.com',
  ENQUIRY_BCC: '',
  ENQUIRY_FROM: 'Website <enquiries@example.com>',
  ALLOWED_ORIGINS: 'https://joshvdv.com,https://www.joshvdv.com',
};

const valid = { name: 'Sam Taylor', email: 'sam@example.com', message: 'Hello', services: 'Website, SEO', website: '' };

function enquiry(body: unknown, init: { origin?: string; contentType?: string; method?: string; path?: string } = {}) {
  return new Request(`https://joshvdv.com${init.path ?? '/api/enquiry'}`, {
    method: init.method ?? 'POST',
    headers: { Origin: init.origin ?? 'https://joshvdv.com', 'Content-Type': init.contentType ?? 'application/json' },
    body: init.method === 'GET' ? undefined : JSON.stringify(body),
  });
}

test.describe('enquiry Worker', () => {
  let sent: { url: string; body: Record<string, unknown> }[] = [];
  let resendStatus = 200;
  const realFetch = globalThis.fetch;

  test.beforeEach(() => {
    sent = [];
    resendStatus = 200;
    globalThis.fetch = (async (url: string, init: RequestInit) => {
      sent.push({ url, body: JSON.parse(String(init.body)) });
      return new Response('{}', { status: resendStatus });
    }) as typeof fetch;
  });
  test.afterEach(() => { globalThis.fetch = realFetch; });

  test('emails a valid enquiry with the visitor as the reply-to address', async () => {
    const response = await worker.fetch(enquiry(valid), env);
    expect(response.status).toBe(200);
    expect(sent).toHaveLength(1);
    expect(sent[0].url).toBe('https://api.resend.com/emails');
    expect(sent[0].body).toMatchObject({ to: ['studio@example.com'], reply_to: 'sam@example.com', subject: 'Website enquiry - Sam Taylor' });
    expect(sent[0].body.text).toContain('Needs: Website, SEO');
    expect(sent[0].body).not.toHaveProperty('bcc');
  });

  test('rejects requests that are not genuine form posts', async () => {
    expect((await worker.fetch(enquiry(valid, { path: '/api/other' }), env)).status).toBe(404);
    expect((await worker.fetch(enquiry(valid, { method: 'GET' }), env)).status).toBe(405);
    expect((await worker.fetch(enquiry(valid, { origin: 'https://evil.example' }), env)).status).toBe(403);
    expect((await worker.fetch(enquiry(valid, { contentType: 'text/plain' }), env)).status).toBe(415);
    expect(sent).toHaveLength(0);
  });

  test('rejects missing, oversized or malformed fields', async () => {
    for (const body of [
      { ...valid, name: '' },
      { ...valid, email: 'not-an-email' },
      { ...valid, message: 'x'.repeat(4001) },
      { ...valid, phone: 42 },
      null,
    ]) {
      expect((await worker.fetch(enquiry(body), env)).status).toBe(422);
    }
    expect(sent).toHaveLength(0);
  });

  test('quietly drops spam that fills the hidden field', async () => {
    const response = await worker.fetch(enquiry({ ...valid, website: 'http://spam.example' }), env);
    expect(response.status).toBe(200);
    expect(sent).toHaveLength(0);
  });

  test('keeps line breaks out of the subject line', async () => {
    await worker.fetch(enquiry({ ...valid, name: 'Sam\r\nBcc: someone@example.com' }), env);
    expect(sent[0].body.subject).toBe('Website enquiry - Sam Bcc: someone@example.com');
  });

  test('reports a failure when the email provider is down', async () => {
    resendStatus = 500;
    const response = await worker.fetch(enquiry(valid), env);
    expect(response.status).toBe(502);
  });
});
