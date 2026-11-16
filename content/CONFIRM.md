# Items to Confirm Before Launch

> This file tracks content that needs to be confirmed with the business owner.
> Each item is checked off once confirmed and updated in the content files.

## EKOTEJAS Two-Wheeler Models (Imported Specs)

- [ ] **Stocked battery variants per model** — Confirm which battery configurations (48V / 60V, Lead-acid / Li-ion, 28Ah / 30Ah / 32Ah / 34Ah) are stocked in the showroom for Axel, Axel Pro, Era, Era Pro, Reco, Prive, and EVXTRO. Currently all manufacturer variants are listed with `offered: true`.
- [ ] **Available colours per model (to confirm with owner)** — Confirm which colour options are actually stocked in the showroom. Only colours with confirmed photos are shown on the website for now:
  - **Axel**: Company page lists Red, White, Blue. (Site shows Red, White).
  - **Axel Pro**: Company page lists Blue, White, Red. (Site shows Red, White).
  - **Era**: Company page lists Red, Blue. (Site shows Red).
  - **Era Pro**: Company page lists Blue. (Site shows Blue).
  - **Reco**: Company page lists Red. (Site shows Red).
  - **Prive**: Company page lists Black, White. (Site shows White).
  - **EVXTRO**: Company page lists White. (Site shows White).
- [ ] **Prive top speed** — Manufacturer source contains conflicting statements (75 km/h in specification table vs 85 km/h in overview text). Top speed is stored as `null` pending showroom verification.
- [ ] **Retail ex-showroom prices** — Confirm ex-showroom prices for all 7 models. Prices are currently `null` ("Call for price").
- [ ] **Warranty terms** — Confirm warranty duration and terms for vehicle and battery pack. Warranty fields are currently `null`.
- [ ] **Photo permission from EKOTEJAS** — Confirm commercial permission/assets for EKOTEJAS vehicle photography. Models currently show "Photo coming soon" pending real showroom photography or authorized asset packs.
- [ ] **Authorised dealer status** — Confirm official EKOTEJAS authorised dealership status before any dealership claims are published.

## General Business Information

- [ ] **Original logo file** — currently using a cropped sign photo as temp logo
- [ ] **Manager/owner name, role, photo and message** — `person.json` has `consent: false`. Need owner's confirmed name, role, portrait photo (`.jpg`/`.png` to process to WebP), and short personal message, accompanied by explicit written consent.
- [ ] **Customer delivery photos & consent** — `customers.json` is currently empty (`[]`). Need real customer delivery photos placed in `content/incoming-images/customers/`, along with written consent from each customer for their photo, first name, vehicle model, and any testimonial quote (`consent: true`, `quoteConsent: true`).
- [ ] **Google Reviews URL** — `site.json` has `"googleReviewsUrl": null`. Confirm official Google Business Profile review link (e.g., `https://g.page/r/.../review`) to activate "Read reviews on Google" links.
- [ ] **City, district, state, pincode** — address fields are null
- [ ] **Google Maps embed src** — mapsEmbedSrc is null (address link exists)
- [ ] **Business hours** — hours field is null
- [ ] **GSTIN: ask owner for registration certificate**
- [ ] **Service phone number** — serviceNumber is null (falls back to main phone)
- [ ] **Instagram or social media links** — all null
- [ ] **Offers** — one inactive sample offer
- [ ] **Favicon** — not using temp logo as favicon, need proper icon

## Do Not Claim (Amendment 10)

These phrases must NOT appear anywhere until explicitly confirmed:
- "Authorized Dealer" / "Authorised Dealer"
- Warranty claims
- Roadside assistance
- AMC (Annual Maintenance Contract)
- Any subsidy or finance claim
