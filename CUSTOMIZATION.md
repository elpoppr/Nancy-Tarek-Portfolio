# Portfolio quick guide

## Content
Edit `src/config/siteContent.ts` to change the name, title, location, intro, services, project titles/categories/descriptions, years, contact details, and developer credit.

## Logo
Replace `public/media/nancy-tarek/logo.svg` with your own SVG logo (or update `logo.src` in the config).

## Project media
All 15 supplied media files are already copied into `public/media/nancy-tarek/` and mapped in `src/config/siteContent.ts`. The `originals/` folder keeps the uploaded filenames for reference.

## Contact details to verify before publishing
- `hello@nancytarek.com` is retained from the supplied project template; confirm it is the correct inbox.
- Instagram, Facebook, TikTok, phone, and WhatsApp account details were not included in the supplied files, so no made-up social URLs or numbers have been added.
- The contact form opens a pre-filled email draft in the visitor’s email app; it does not send through a website backend.

## Dates
Project year labels are based on date-like information in the original media filenames where available. The `Nova` video did not contain a date, so its year is shown as `—`. Verify project dates if the filename reflects export date rather than project date.

## Run locally
Install dependencies with `pnpm install`, then run `pnpm dev`. Build with `pnpm build`.
