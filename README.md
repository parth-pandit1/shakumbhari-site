# Shakumbhari Automobile

Static showroom website for **Shakumbhari Automobile**, an electric scooter dealership, service workshop, and spare parts center located on Chhachhrauli Road, Ledi, Haryana.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, static export with `output: 'export'`)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (CSS `@theme` design tokens, zero runtime CSS)
- **Motion**: [Framer Motion](https://www.framer.com/motion/) (with `prefers-reduced-motion` support)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Typography**: Self-hosted variable fonts (`@fontsource-variable/inter` and `@fontsource-variable/plus-jakarta-sans`)
- **Testing**: Built-in Node.js test runner (`node --test`)
- **Image Processing**: Sharp (WebP conversion and optimization)

## Available Scripts

| Script               | Command                               | Purpose                                                                  |
| -------------------- | ------------------------------------- | ------------------------------------------------------------------------ |
| `dev`                | `next dev`                            | Start local development server                                           |
| `build`              | `next build`                          | Production static build with pre-build checks (exports to `/out`)        |
| `lint`               | `eslint`                              | Run ESLint static code analysis                                          |
| `typecheck`          | `tsc --noEmit`                        | Strict TypeScript typechecking                                           |
| `format`             | `prettier --write .`                  | Format all source files with Prettier                                    |
| `format:check`       | `prettier --check .`                  | Verify code formatting with Prettier                                     |
| `test`               | `node --test tests/*.test.ts`         | Run unit and schema validation tests                                     |
| `validate-content`   | `node scripts/validate-content.mjs`   | Validate all `/content/*.json` files against Zod schemas                 |
| `check-contrast`     | `node scripts/check-contrast.mjs`     | Audit WCAG AA colour contrast ratios (normal >= 4.5:1, large >= 3:1)     |
| `check-placeholders` | `node scripts/check-placeholders.mjs` | Pre-build guard: fails build if indexing is true and placeholders remain |
| `optimize-images`    | `node scripts/optimize-images.mjs`    | Optimize and convert source images into WebP                             |

## Content Management

All business data is separated from presentation and lives in the `/content` directory as JSON files:

- `content/site.json`: Showroom profile, contact numbers, address, and Google Maps embed configuration.
- `content/models.json`: Electric scooter models, technical specifications, colours, and pricing.
- `content/offers.json`: Active promotional offers and seasonal discounts.
- `content/services.json`: Workshop capabilities and repair services.
- `content/faqs.json`: Frequently asked questions and answers.
- `content/customers.json`: Verified customer reviews (displayed only when `consent: true`).
- `content/person.json`: Showroom leadership greeting (displayed only when `consent: true`).
- `content/CONFIRM.md`: Audit tracking for pending real-world showroom details.

### How to Replace Sample Models with Real Inventory

1. Open `content/models.json`.
2. Update the model entries with real specs, setting `"isSample": false` and `"featured": true/false`.
3. Place model photos (`.webp`) in `public/images/models/`.
4. Run `npm run validate-content` to ensure all fields adhere to the schema in `src/content/schemas.ts`.

### 360-Degree Interactive Spin Viewer

The model detail page supports an optional 360-degree product spinner via the `Spin360` component. To add a spin view for a model:

1. **Capture frames**: Shoot 24 to 36 sequential turntable frames covering a full 360-degree rotation.
2. **Format and dimensions**: Convert frames to WebP, max 1200 px wide without upscaling.
3. **File naming**: Use zero-padded sequential names, e.g. `public/images/spin/<model-slug>/<model-slug>-01.webp` through `...-36.webp`.
4. **Register in schema**: In `content/models.json`, add the `spinFrames` object to that model:
   ```json
   "spinFrames": {
     "count": 36,
     "pathPattern": "/images/spin/<model-slug>/<model-slug>-{index}.webp"
   }
   ```
5. If `spinFrames` is omitted or null, the model page displays the standard gallery view. Visitors with `prefers-reduced-motion` enabled are automatically served the static main photo.

## Search Engine Indexing & Pre-Launch Protection

To prevent unfinished placeholder content from being indexed, search engine indexing is strictly disabled by default:

- **Environment Flag**: `NEXT_PUBLIC_ALLOW_INDEXING=false`
- **Robots Meta Tag**: `noindex, nofollow` emitted on all pages.
- **`robots.txt`**: Emits `Disallow: /` for all user agents.
- **`sitemap.xml`**: Returns an empty sitemap when indexing is disabled.
- **Pre-build Guard**: `scripts/check-placeholders.mjs` will fail the build if `NEXT_PUBLIC_ALLOW_INDEXING=true` while any content or code still contains the string `[PLACEHOLDER]`.

To enable indexing for production launch:

1. Ensure all placeholders in `/content` have been replaced with real facts and removed from `content/CONFIRM.md`.
2. Set `NEXT_PUBLIC_ALLOW_INDEXING=true` in your deployment environment variables.

## Deployment (Cloudflare Pages)

This project produces a completely static export inside the `/out` directory, optimized for deployment on Cloudflare Pages or any static host.

### Build Configuration

- **Framework preset**: None / Next.js (Static HTML Export)
- **Build command**: `npm run build`
- **Build output directory**: `out`
- **Node version**: `>= 20.0.0` (v24 recommended)
- **Environment variables**:
  - `NEXT_PUBLIC_ALLOW_INDEXING`: `false` (until official launch)

### Pre-Launch Headers

A `public/_headers` file is included to send `X-Robots-Tag: noindex, nofollow` on Cloudflare Pages preview deployments. This line must be removed upon official domain launch.

## Launch Checklist

Follow these steps before making the showroom website public to customers and search engines:

1. **Confirm Business Facts**: Complete and verify every item listed in `content/CONFIRM.md` with the business owner (prices, warranty, manager greeting, hours, GSTIN, and stocked variants).
2. **Verify Placeholder Guard**: Run `npm run build` with `NEXT_PUBLIC_ALLOW_INDEXING=true` in your local environment to ensure zero `[PLACEHOLDER]` tokens remain in `/content` or `/src`. The build must succeed with zero warnings.
3. **Remove Pre-launch Robot Header**: Open `public/_headers` and delete the `X-Robots-Tag: noindex, nofollow` line.
4. **Configure Cloudflare Environment**: In the Cloudflare Pages project settings, add the following production environment variables:
   - `NEXT_PUBLIC_ALLOW_INDEXING`: `true`
   - `NEXT_PUBLIC_SITE_URL`: `https://your-custom-domain.com` (no trailing slash)
5. **Cloudflare Pages Build Settings**:
   - **Framework preset**: None / Next.js (Static HTML Export)
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Node.js version**: Matches `.nvmrc` (v24)
6. **Connect Custom Domain**: In Cloudflare Pages, navigate to Custom Domains and connect your showroom apex and `www` domains with automatic SSL.
7. **Search Console & Business Profile**: Submit `https://your-custom-domain.com/sitemap.xml` to Google Search Console and update your Google Business Profile with the live showroom website URL.
