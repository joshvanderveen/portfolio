# JVDV website

Studio website for JVDV, served at [joshvdv.com](https://joshvdv.com). Built with Astro and TypeScript, prerendered to static HTML and hosted on Cloudflare Workers static assets. Enquiries go through a small separate Worker that emails them via Resend.

## Local development

Use Node 22.12 or newer (`.node-version` selects Node 22).

```sh
npm ci
npm run dev        # http://localhost:4321
```

`npm run build` writes `dist/` and then `sitemap.xml`. `npm run preview` serves `dist/` with Wrangler on port 4322 so `_headers` and the 404 page behave as they do in production, and `npm test` runs the Playwright and accessibility tests against it.

## Editing content

There is no CMS; content lives in code.

| File | Purpose |
| --- | --- |
| `src/data/site.ts` | Business name, email, phone, ABN, social links, menu, client list and contact form options. Empty phone or ABN values are left off the site |
| `src/data/services.ts` | The six services, the project steps and the FAQs |
| `src/data/projects.ts` | Projects shown on the home and Work pages, with their tags and filter categories |
| `src/pages/work/*.astro` | Case studies (`CaseStudy.astro` provides the shared frame) |
| `src/styles/global.css` | Colours, fonts and shared components |

Image slots render as empty panels until screenshots are added: pass `src` (a file in `public/`) and `alt` to the `Shot` component. In `npm run dev` the empty slots are labelled with what belongs there.

## Enquiries

The home and contact forms post JSON to `/api/enquiry`, handled by `worker/` (`jvdv-enquiries`), which validates the fields, drops spam caught by a hidden field and emails the enquiry with Resend, with Reply-To set to the visitor. If sending fails, the form offers a pre-filled email draft instead.

Before it works in production:

1. Add `joshvdv.com` to the Cloudflare account; the Worker is routed at `joshvdv.com/api/enquiry`.
2. Verify the sending domain in Resend and set `ENQUIRY_TO` / `ENQUIRY_FROM` in `worker/wrangler.jsonc`.
3. `npx wrangler secret put RESEND_API_KEY --config worker/wrangler.jsonc`, then `npm run worker:deploy`.

## Deploying

GitHub Actions (`.github/workflows/site.yml`) checks, builds and tests every pull request, and on `main` deploys `dist/` to the `jvdv-website` Worker. `.github/workflows/workers.yml` deploys the enquiry Worker when `worker/` changes. Both need the repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`; set the `SITE_URL` Actions variable to build for a different domain.

To deploy by hand: `npx wrangler login`, then `npm run deploy`.
