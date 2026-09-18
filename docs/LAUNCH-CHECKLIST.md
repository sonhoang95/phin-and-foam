# Phin & Foam launch handoff

## Current preview

- `/` and `/brew`: brew guide, future 30–45 second video slot, draft written guide, grind troubleshooting, three expandable draft recipes, Instagram, disabled future refill button.
- `/checkout`: single-page $39 kit presentation, Whole Bean/Ground for Phin controls, proposed kit contents, North Austin pickup placeholders, label information, pending refund policy, and phinandfoam@gmail.com.
- Edit `lib/content.ts` for recipes, video/captions, pickup, email, and availability. Introductory brewing steps are in `app/brew/page.tsx`; policy and label copy are in `app/checkout/page.tsx`.
- Checkout is deliberately disabled. There is no payment processor, order storage, live inventory, or email integration. The 30-kit figure is the intended batch limit, not a live remaining-stock count. Grind choice currently lives only in page state.
- Set `shop.availability` to `sold-out` for the sold-out UI. This does not implement inventory tracking.

## QR issue — do not print this QR

macOS Vision decoded the QR in the supplied back-label PNG to:

`http://samples.spreadsheetconverter.com/magnus/car-loan-amortization-mobile/index.htm#home`

This is unrelated to Phin & Foam. Replace the QR with the final verified HTTPS `/brew` URL after deployment. No label artwork was edited. Generated kit mockup QR-like marks are illustrative and must not be reused for production.

No production approval has been given. Desktop image decoding is not a physical scan test.

| Physical check | Status |
| --- | --- |
| iPhone camera opens correct deployed brew guide | Not tested — physical device needed |
| Android camera opens correct deployed brew guide | Not tested — physical device needed |
| Printed label at actual final dimensions | Not tested — final dimensions and print needed |
| Indoor lighting | Not tested |
| Slight angle | Not tested |

Record device/OS, print size, lighting, angle, URL, and pass/fail for each. Re-test the replacement code on actual-size packaging; a monitor scan is insufficient.

## Before accepting orders

1. Confirm kit inclusions, actual photo, exact pickup address, date, time and timezone.
2. Finalize cancellation cutoff, refund eligibility and timing, and missed-pickup policy. Current copy is an explicit placeholder, not an adopted policy.
3. Verify seller label/disclosure text against current requirements. The supplied disclosure and CFPO ID are transcribed, not independently certified.
4. Connect a real payment provider. Use server-controlled price and grind variants, a shared stock pool of 30, atomic stock reservations, expiry/release for abandoned sessions, and verified idempotent payment webhooks. Do not use browser state as inventory.
5. Persist paid orders, grind choice, and pickup details; configure confirmation emails with the correct instructions. Do not treat a success redirect as proof of payment.
6. In the provider's test environment, place an order and independently confirm payment success, one inventory decrement, received email, recorded grind, and correct pickup instructions. Test cancellation, failed payment, webhook retries, and two simultaneous attempts at the last kit; verify overselling is prevented.
7. Confirm the last purchase transitions to sold-out and prevents additional checkout sessions. Reset only test data after testing.

No test order was placed: user confirmed there is no connected payment provider.

## Verification completed

- ESLint passed.
- Production build and TypeScript passed with `npx next build --webpack`. Default Turbopack initially hit a local worker port-permission error.
- Browser: desktop design checked; 390px mobile brew and checkout layouts inspected; troubleshooting and classic recipe expand; Whole Bean selection updates correctly; contact email matches; checkout remains disabled.
- Temporarily switched to sold-out and verified disabled sold-out button and message, then restored coming-soon. Real stock transitions remain untested/unimplemented.

## Temporary image provenance

`public/images/first-pour-kit.png` was generated with the built-in imagegen tool, using both supplied labels as brand references. Replace with actual product photography before sales. Original labels are preserved in `public/images/front-label.png` and `public/images/back-label.png`.

Prompt: “Use case: product-mockup. Create a photorealistic editorial coffee kit photograph for Phin & Foam Vietnamese coffee website. Reference images supplied are packaging/brand style references. Portrait 4:5 composition on warm light beige plaster tabletop and backdrop with soft natural side lighting. One upright cream coffee pouch bearing dark forest green PHIN& FOAM typography and HOUSE BLEND brown band, a brushed stainless Vietnamese phin filter resting on a small clear glass with layered condensed milk and dark coffee, beside it a small cream folded recipe card. Tasteful sparse arrangement, tactile and warm, subtle shadows, few coffee beans. No additional objects, no floating text or graphic overlays. Match reference packaging feel closely. This is a temporary illustrative product photograph.”
