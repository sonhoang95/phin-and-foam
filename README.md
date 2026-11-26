# Phin & Foam

A small marketing website for Son and Tina’s Vietnamese coffee in North Austin. It includes the next coffee pickup, pop-up announcements, event/catering inquiries, and an introduction to the founders.

## Local development

```sh
npm install
npm run dev
```

Open http://localhost:3000.

## Check and build

```sh
npm run lint
npm run build
npm start
```

The homepage is statically rendered. The marketing page needs no database or accounts. Event inquiries use one server-side API route and Resend. Deploy with the standard Next.js configuration on Vercel.

## Editing the website

- `app/page.tsx`: homepage copy and sections
- `lib/content.ts`: next pickup announcement and contact links
- `app/components/brand.tsx`: shared header, footer, and phin illustration
- `app/globals.css`: colors, typography, layout, and responsive styles
- `public/images/`: original logo and two optimized founder photos

Keep the original playful English brand voice: “Slow drip. Big mood.” Do not add Vietnamese phrases. Avoid invented family stories or claims about ingredients.

Ordering, payments, pickup reservations, customer accounts, admin tools, and cron jobs are not part of this website. The only API is `/api/inquiries`, which emails event inquiries through Resend.

## Updating announcements

Edit `nextDrop` in `lib/content.ts` when announcing a pickup. Keep the date, year, hours, and public area current; never publish a home address. Pop-up dates are unannounced until confirmed. Event inquiries use the dedicated `/inquire` page, linked from the homepage; they are not confirmed reservations. Photo exports are WebP with metadata removed; originals remain outside the repository.

## Enable event inquiry delivery

The form is implemented, but email delivery is **disabled** until a sending domain is owned and verified. `phinandfoamcoffee.com` is only a placeholder; it has not been registered or verified by this project.

1. Purchase your chosen domain and add it in Resend. Publish the DNS records Resend supplies, then wait for its verified status.
2. Set `RESEND_API_KEY` and `EMAIL_FROM` (for example, `Phin & Foam <events@phinandfoamcoffee.com>`) in your local `.env` and Vercel environment settings. Never use Gmail as the sender domain. The recipient is fixed to `phinandfoam@gmail.com`; replying reaches the guest's submitted address.
3. Set `INQUIRY_EMAIL_ENABLED=true` only after verification. Rebuild/redeploy: the inquiry page's form availability is determined at build time.
4. Submit one clearly labeled test inquiry and confirm it reaches the inbox before announcing the form.

The form provides server-side validation, a honeypot, request size/origin checks, per-instance throttling, and Resend idempotency keys for retries. Per-instance throttling is best-effort on serverless hosting; configure a Vercel WAF rate-limit rule on `/api/inquiries` for a shared production limit. No inquiry database or marketing subscription is created. Guest details are transmitted to Resend and retained in the receiving mailbox; application logs do not record them. Provider acceptance is not proof of inbox delivery—monitor Resend delivery status and your spam folder.

Run `npm test` for validation and email-handler tests. Tests use a mocked email provider and do not send email. `app/components/inquiry-form.tsx` contains the form, `lib/inquiry.ts` defines its fields and validation, and `lib/server/inquiry-handler.ts` handles email submission using native fetch (no email SDK).
