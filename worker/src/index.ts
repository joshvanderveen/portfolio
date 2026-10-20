// Receives enquiries from the website forms and emails them via Resend.
// Routed at joshvdv.com/api/enquiry, so the forms post same-origin.

interface Env {
  RESEND_API_KEY: string;
  ENQUIRY_TO: string;
  ENQUIRY_BCC: string;
  ENQUIRY_FROM: string;
  ALLOWED_ORIGINS: string;
}

const limits = {
  name: 150,
  email: 200,
  phone: 50,
  business: 200,
  url: 300,
  services: 300,
  budget: 60,
  timeline: 60,
  message: 4000,
} as const;
type Field = keyof typeof limits;
const required: Field[] = ['name', 'email', 'message'];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const list = (value: string) => value.split(',').map(item => item.trim()).filter(Boolean);

const json = (status: number, body: object) => new Response(JSON.stringify(body), {
  status,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
});

export function parse(input: unknown): Record<Field, string> | null {
  if (!input || typeof input !== 'object') return null;
  const source = input as Record<string, unknown>;
  const fields = {} as Record<Field, string>;
  for (const field of Object.keys(limits) as Field[]) {
    const value = source[field] ?? '';
    if (typeof value !== 'string') return null;
    // Collapse control characters so nothing can break out of the subject line.
    const clean = (field === 'message' ? value.replace(/\r\n?/g, '\n') : value.replace(/[\r\n\t]+/g, ' ')).trim();
    if (clean.length > limits[field] || (required.includes(field) && !clean)) return null;
    fields[field] = clean;
  }
  if (!emailPattern.test(fields.email)) return null;
  return fields;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (new URL(request.url).pathname !== '/api/enquiry') return json(404, { error: 'Not found' });
    if (request.method !== 'POST') return json(405, { error: 'Method not allowed' });
    const origin = request.headers.get('Origin') ?? '';
    if (!list(env.ALLOWED_ORIGINS).includes(origin)) return json(403, { error: 'Forbidden' });
    if (!request.headers.get('Content-Type')?.includes('application/json')) return json(415, { error: 'Expected JSON' });

    let body: unknown;
    try { body = await request.json(); } catch { return json(400, { error: 'Invalid JSON' }); }
    // Hidden "website" field: people never see it, form-filling bots often do.
    if ((body as Record<string, unknown> | null)?.website) return json(200, { ok: true });
    const fields = parse(body);
    if (!fields) return json(422, { error: 'Please check the form and try again.' });

    const text = [
      `Name: ${fields.name}`,
      `Email: ${fields.email}`,
      `Phone: ${fields.phone || 'Not given'}`,
      `Business: ${fields.business || 'Not given'}`,
      `Current website: ${fields.url || 'Not given'}`,
      `Needs: ${fields.services || 'Not sure yet'}`,
      `Budget: ${fields.budget || 'Not given'}`,
      `Timeline: ${fields.timeline || 'Not given'}`,
      '',
      fields.message,
      '',
      '—',
      'Sent from the enquiry form at joshvdv.com. Reply to this email to answer them directly.',
    ].join('\n');

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.ENQUIRY_FROM,
        to: list(env.ENQUIRY_TO),
        ...(env.ENQUIRY_BCC ? { bcc: list(env.ENQUIRY_BCC) } : {}),
        reply_to: fields.email,
        subject: `Website enquiry - ${fields.name}${fields.business ? ` (${fields.business})` : ''}`,
        text,
      }),
    });
    if (!response.ok) {
      console.error('Resend failed', response.status, await response.text());
      return json(502, { error: 'We couldn’t send your enquiry just now.' });
    }
    return json(200, { ok: true });
  },
};
