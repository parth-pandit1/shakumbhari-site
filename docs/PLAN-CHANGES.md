# Plan Amendments

Applied on top of the original plan (see artifact). These override any conflicting item.

## 1. Next.js version
Use the current stable Next.js (16.x), not "14". The installed version will be pinned exactly. Use `next.config.ts` (TypeScript config is supported in Next.js 16).

## 2. Search-engine blocking until launch
- Add `<meta name="robots" content="noindex, nofollow">` to every page via the root layout metadata.
- `app/robots.ts` returns `Disallow: /` for all user agents.
- Gated by `NEXT_PUBLIC_ALLOW_INDEXING` (env var, default `false`). When set to `true`, the noindex meta and robots disallow are removed.

## 3. Nullable/optional unknowns in Zod schemas
Content fields that are currently unknown (hours, mapsLink, mapsEmbedSrc, pincode, serviceNumber, prices, etc.) must be `.nullable()` or `.optional()` in the Zod schemas. The UI must gracefully handle `null`:
- Price is null → show "Call for price".
- Hours are null → hide the Open Now badge entirely.
- mapsEmbedSrc is null → hide the map section.

## 4. Build-time placeholder guard
Add a script (`scripts/check-placeholders.ts`) that:
- Scans all `.json` files in `/content/` for the string `[PLACEHOLDER]`.
- If `NEXT_PUBLIC_ALLOW_INDEXING=true` and any placeholder is found, exits with code 1 and fails the build.
- Wired into `npm run build` via a `prebuild` script.

## 5. Built-in sitemap and robots
Use `app/sitemap.ts` and `app/robots.ts` (with `export const dynamic = 'force-static'`) instead of the `next-sitemap` package. One fewer dependency.

## 6. Suspense for useSearchParams
Any page or component that calls `useSearchParams()` must be wrapped in a `<Suspense>` boundary so static export (`output: 'export'`) builds without error.

## 7. Build whatsapp.ts early
Build `lib/whatsapp.ts` before the UI primitives that depend on it (WhatsAppButton, forms). Moved ahead of Task 4 in the build order.

## 8. Image optimisation script
Add `sharp` as a devDependency. Create `scripts/optimize-images.ts` that:
- Converts images in `public/images/` to WebP.
- Strips EXIF metadata (privacy).
- Run manually before deployment: `npm run optimize-images`.

## 9. Cloudflare Pages security headers
Near the end of the build, create `public/_headers` with:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Content-Security-Policy` — allow Next's inline scripts (`unsafe-inline` or nonce), Google Maps iframe (`frame-src https://www.google.com`), self for everything else. Test that it does not break the static export.

## 10. No unconfirmed claims
Do not use the following phrases in any content, component, or placeholder until explicitly confirmed in `content/CONFIRM.md`:
- "Authorized Dealer"
- Warranty claims
- Roadside assistance
- AMC (Annual Maintenance Contract)
- Any subsidy or finance claim

## 11. Click-to-load Google Maps
The Google Maps iframe must NOT load automatically. Show a "Show Map" button; only load the iframe after the user taps it. The privacy page must mention that tapping "Show Map" loads content from Google.

## 12. Logo: use cropped sign photo
Use a cropped version of the uploaded sign photo as the logo for now. Do not trace, redraw, or recreate the logo.

## 13. Scripts format
Scripts are plain Node ESM (.mjs), with no tsx or ts-node, unless a runner is justified and pinned.

## 14. Placeholder checking script
`check-placeholders.mjs` must load env files with `loadEnvConfig` from `@next/env` so values in `.env.local` are seen. It scans `/content` and `/src` for the text `"[PLACEHOLDER]"`. It fails the build when `NEXT_PUBLIC_ALLOW_INDEXING` is `"true"` and any are found. When the flag is not `"true"`, it only prints a visible warning.

## 15. Sitemap indexing guard
`app/sitemap.ts` returns an empty list unless `NEXT_PUBLIC_ALLOW_INDEXING` is `"true"`.

## 16. Map embed fallback
If `mapsEmbedSrc` is null, hide only the embedded map. Still show the address text and a "Get directions" link when `mapsLink` exists.

## 17. Security headers and pre-launch robots header
While pre-launch, `public/_headers` also sets `X-Robots-Tag: noindex`. Note in the file that this line must be removed at launch. Note in the file that noindex is not privacy and preview links should only go to the owner.

## 18. Temporary logo cropping
Logo: crop ONLY the SA mark and the "SHAKUMBHARI AUTOMOBILE" wordmark from the sign photo. Exclude the top line (registration text) and the phone number. Save as a temporary logo and do not use it as the favicon. List "get original logo file" in `CONFIRM.md`.

## 19. Unconfirmed brand and sample models
The brand name "Tejas" is unconfirmed. Do not use it or invent any brand, model name, price or spec. Sample models are named "Sample Model A", "Sample Model B", etc., with obviously fake values, and must pass through the placeholder guard.


## 20. LocalizedText structure for future Hindi support
Content is English only for v1, but every user-facing text field is stored as an object `{en: string, hi?: string}` so Hindi can be added later without changing schemas. Components read the `en` value for now.

## 21. No invented content
No real brand, model name, price, spec, hours, address or review is invented. Anything unknown is `null` or a clearly marked sample (e.g. "Sample Model A" with `isSample: true`).
