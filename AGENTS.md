# AGENTS.md — Permanent Project Rules

## STACK
1. Next.js (App Router, static export with `output: 'export'`), TypeScript strict mode, Tailwind CSS, Framer Motion, React Hook Form + Zod. No other UI or state libraries unless I approve them first.
2. Keep dependencies minimal and pin versions. Tell me about every new package and why it is needed.

## CONTENT AND DATA
3. All business content (site info, products, prices, offers, customers, reviews) lives in `/content` as JSON or MDX, validated with Zod schemas. Never hardcode it in components.
4. Never invent prices, specs, reviews, phone numbers, addresses or customer names. Use clearly marked placeholders like `[PLACEHOLDER]`.
5. Customer photos or names may be shown only when a `"consent": true` field exists for that entry.

## QUALITY
6. Mobile-first (design at 360px first). Accessible: semantic HTML, keyboard navigation, alt text, WCAG AA contrast. Respect `prefers-reduced-motion`.
7. Performance: no heavy libraries, lazy-load images, WebP, avoid layout shift.
8. Premium, trustworthy visual design with consistent spacing, type scale and colour tokens. No generic template look.

## SECURITY AND PRIVACY
9. No third-party trackers, external fonts or CDNs. Self-host fonts. Only the Google Maps iframe may load externally.
10. Validate all form input with Zod. Never use `dangerouslySetInnerHTML`. Never put secrets in the repo.
11. No personal names, emails or real identities in code, comments, commit messages or metadata. Use the project name only.

## WORKFLOW
12. Before editing, give a short plan. Do one task at a time and do not touch unrelated files.
13. After each task, end with a REPORT containing: (a) files created or changed, (b) how to run and preview it, (c) what I should check manually, (d) open questions or assumptions you made.
14. Run lint and typecheck when available and report the result.
15. If a requirement is ambiguous, ask me instead of guessing.
