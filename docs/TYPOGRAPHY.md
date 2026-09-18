# Brand typography

- **Display:** Fraunces, variable roman and true italic. Headings use 550–650 weight, a softness setting of 65, and expressive alternate forms. Hero italics use softness 85.
- **Body and interface:** DM Sans, variable roman. Used for navigation, recipes, order details, labels, and buttons.
- Preserve the compact existing wordmark as the visual connection to the packaging.
- Fonts are stored locally in `public/fonts` and loaded through `next/font/local`; visitors do not need a Google Fonts request. Both families include their SIL Open Font License files alongside the font files.
- Sources: https://github.com/google/fonts/tree/main/ofl/fraunces and https://github.com/google/fonts/tree/main/ofl/dmsans
- Type configuration is in `app/layout.tsx`; the brand typography block at the end of `app/globals.css` controls hierarchy, weight, tracking, and mobile sizing.

Verified brew and checkout headline wrapping at 390px and desktop brew layout. ESLint and the webpack production build passed.
