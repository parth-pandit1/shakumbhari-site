# Architecture Documentation

## Overview

Shakumbhari Automobile is a high-performance, mobile-first static website built with Next.js (App Router), TypeScript, and Tailwind CSS v4. The application outputs pure static HTML/CSS/JS (`output: 'export'`) for zero-cold-start hosting on Cloudflare Pages.

## Data Flow

```text
/content/*.json  ───>  Zod Schemas (src/content/schemas.ts)
                             │
                             ▼
                    Typed Content Loaders (src/lib/content.ts)
                             │
                             ▼
                    App Router Server Pages (src/app/**/page.tsx)
                             │
                             ▼
             ┌───────────────┴───────────────┐
             ▼                               ▼
    Feature Components               UI Primitives
 (src/components/features/*)      (src/components/ui/*)
```

1. **Content Layer (`/content`)**: All showroom data (site information, EV scooter models, services, FAQs, reviews, offers, leadership bio) resides in version-controlled JSON files.
2. **Schema & Validation (`src/content/schemas.ts`)**: Every content file is strictly validated against Zod schemas. Unknown or unconfirmed fields are nullable; localized text is structured as `{ en: string, hi?: string }`.
   - **Model Schema (`ModelSchema`)**: Models support real manufacturer configurations including `variants` (array of battery configurations with `batteryType`, `voltageV`, `capacityAh`, `claimedRangeKmMin`, `claimedRangeKmMax`, `offered`), `specs` (array of key-value technical specs), `colours` (with 6-digit hex swatches and names), `description` (`LocalizedText`), `topSpeedText`, and optional `claimedRangeKmMin`/`claimedRangeKmMax`. Prices and warranties remain strictly nullable until confirmed by the business owner.
3. **Typed Loaders (`src/lib/content.ts`)**: Server-side helper functions read and validate JSON files at build time, returning fully typed domain entities.
4. **App Router Pages (`src/app/`)**: Thin server components handle route metadata, JSON-LD structured data, Suspense boundaries (for `useSearchParams`), and compose feature sections.
5. **Component Architecture**:
   - `src/components/ui/`: Dumb, reusable primitive components (Button, Card, Container, Badge, Modal, Accordion, Tabs, Section) exported through a single barrel `index.ts`.
   - `src/components/features/`: Domain-specific components organized by feature slice (`home`, `models`, `compare`, `emi`, `running-cost`, `forms`, `location`).
   - `src/components/layout/`: Global layout components (`Header`, `Footer`, `MobileStickyBar`, `OffersBanner`).
   - `src/components/motion/`: Framer Motion wrappers with built-in `prefers-reduced-motion` fallbacks.

## Key Decisions & Constraints

- **Static HTML Export**: `output: 'export'` in `next.config.ts`. No Node.js server runtime at request time; zero server-side vulnerabilities and near-instant load speeds.
- **Privacy & Security**: Zero third-party tracking scripts, zero advertising cookies, and self-hosted fonts (`@fontsource-variable`). The only external resource is an optional Google Maps embed, strictly governed by a click-to-load consent mechanism.
- **Form Architecture**: All customer contact forms (Test Ride, Exchange, Service) validate input with Zod and format pre-filled WhatsApp URL messages (`wa.me`), eliminating server-side databases or third-party form SaaS dependencies.
- **Search Engine Indexing Control**: Controlled via `NEXT_PUBLIC_ALLOW_INDEXING`. When `false` (default), robots meta is `noindex, nofollow`, `robots.txt` disallows all routes, and `sitemap.xml` returns empty. Build fails if `true` and any `[PLACEHOLDER]` remains.
- **Design Tokens**: Defined natively in CSS via Tailwind v4 `@theme` in `src/app/globals.css`. Contrast audited at build time using `scripts/check-contrast.mjs` against WCAG AA standards.
