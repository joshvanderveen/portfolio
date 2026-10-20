// Sends enquiry forms to the enquiry Worker at /api/enquiry.
// If that fails, the visitor gets a ready-made email draft instead.
const labels: Record<string, string> = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  business: 'Business',
  url: 'Current website',
  services: 'Needs',
  budget: 'Budget',
  timeline: 'Timeline',
};

for (const form of document.querySelectorAll<HTMLFormElement>('form[data-enquiry]')) {
  const fields = form.querySelector<HTMLFieldSetElement>('.form__fields')!;
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;
  const sent = form.querySelector<HTMLElement>('[data-status="sent"]')!;
  const failed = form.querySelector<HTMLElement>('[data-status="failed"]')!;
  const draft = form.querySelector<HTMLAnchorElement>('[data-draft]')!;
  fields.disabled = false;

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const formData = new FormData(form);
    const data: Record<string, string> = {};
    for (const key of new Set(formData.keys())) {
      data[key] = formData.getAll(key).map(String).join(', ');
    }

    button.disabled = true;
    button.textContent = 'Sending…';
    failed.hidden = true;
    let ok = false;
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      ok = response.ok;
    } catch {}
    button.disabled = false;
    button.textContent = 'Send enquiry';

    if (ok) {
      form.reset();
      fields.hidden = true;
      sent.hidden = false;
      sent.focus();
      return;
    }
    const body = [
      ...Object.entries(labels).filter(([key]) => data[key]).map(([key, label]) => `${label}: ${data[key]}`),
      '',
      data.message,
    ].join('\n');
    const subject = `Website enquiry - ${data.name}`;
    draft.href = `mailto:${form.dataset.recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    failed.hidden = false;
  });
}
