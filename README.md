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

The homepage is statically rendered. No environment variables, database, email service, or accounts are required. Deploy with the standard Next.js configuration on Vercel.

## Editing the website

- `app/page.tsx`: homepage copy and sections
- `lib/content.ts`: next pickup announcement, contact links, and prefilled event inquiry email
- `app/components/brand.tsx`: shared header, footer, and phin illustration
- `app/globals.css`: colors, typography, layout, and responsive styles
- `public/images/`: original logo and two optimized founder photos

Keep the original playful English brand voice: “Slow drip. Big mood.” Do not add Vietnamese phrases. Avoid invented family stories or claims about ingredients.

Ordering, payments, pickup reservations, customer accounts, admin tools, APIs, cron jobs, and service integrations have been removed. Previously provisioned external service resources are not managed by this website.

## Updating announcements

Edit `nextDrop` in `lib/content.ts` when announcing a pickup. Keep the date, year, hours, and public area current; never publish a home address. Pop-up dates are unannounced until confirmed. Event inquiries use a prefilled email, not a booking form or confirmed reservation. Photo exports are WebP with metadata removed; originals remain outside the repository.
