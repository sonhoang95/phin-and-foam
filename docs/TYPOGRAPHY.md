# Brand typography

- Display: Fraunces variable roman and true italic for headings.
- Body and interface: DM Sans variable roman for descriptions, navigation and links.
- The header/footer use the original supplied logo artwork, not recreated lettering.
- Fonts are local in `public/fonts`, loaded by `next/font/local`. Both families include their SIL Open Font License files. No Google Fonts request is needed.
- Font loading is in `app/layout.tsx`; size, hierarchy and responsive styles are in `app/globals.css`.

Sources: [Fraunces](https://github.com/google/fonts/tree/main/ofl/fraunces) and [DM Sans](https://github.com/google/fonts/tree/main/ofl/dmsans).
