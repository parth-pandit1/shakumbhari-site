/**
 * Typed content loaders.
 *
 * Each loader reads a JSON file from /content, parses it with the
 * matching Zod schema, and returns a strongly-typed result.
 * Throws a clear error if validation fails.
 */

import fs from "node:fs";
import path from "node:path";

import {
  SiteSchema,
  PersonSchema,
  ModelsFileSchema,
  OffersFileSchema,
  CustomersFileSchema,
  FaqsFileSchema,
  ServicesFileSchema,
} from "../content/schemas.ts";

import type {
  Site,
  Person,
  Model,
  Offer,
  Customer,
  Faq,
  Service,
  LocalizedText,
} from "../content/schemas.ts";

// ─── Helpers ───────────────────────────────────────────────

const CONTENT_DIR = path.join(process.cwd(), "content");

function readContentFile<T>(filename: string, schema: { parse: (data: unknown) => T }): T {
  const filePath = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf-8");
  const data: unknown = JSON.parse(raw);
  try {
    return schema.parse(data);
  } catch (error) {
    throw new Error(
      `Content validation failed for ${filename}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Extract text for a given locale from a LocalizedText object.
 * Falls back to "en" if the requested locale is missing.
 */
export function getLocalized(text: LocalizedText, locale: "en" | "hi" = "en"): string {
  if (locale === "hi" && text.hi) {
    return text.hi;
  }
  return text.en;
}

// ─── Loaders ───────────────────────────────────────────────

export function getSite(): Site {
  return readContentFile("site.json", SiteSchema);
}

export function getPerson(): Person {
  return readContentFile("person.json", PersonSchema);
}

export function getModels(): Model[] {
  return readContentFile("models.json", ModelsFileSchema);
}

/** Models with featured: true, for the homepage */
export function getFeaturedModels(): Model[] {
  return getModels().filter((m) => m.featured);
}

/** Find a model by its slug, or undefined */
export function getModelBySlug(slug: string): Model | undefined {
  return getModels().find((m) => m.slug === slug);
}

/** Only active offers */
export function getOffers(): Offer[] {
  return readContentFile("offers.json", OffersFileSchema).filter((o) => o.active);
}

/** Only customers with consent: true (Amendment 5 / Rule 5) */
export function getCustomers(): Customer[] {
  return readContentFile("customers.json", CustomersFileSchema).filter((c) => c.consent);
}

export function getFaqs(): Faq[] {
  const faqs = readContentFile("faqs.json", FaqsFileSchema);
  return faqs.sort((a, b) => a.order - b.order);
}

/** Only confirmed services */
export function getServices(): Service[] {
  return readContentFile("services.json", ServicesFileSchema).filter((s) => s.confirmed);
}
