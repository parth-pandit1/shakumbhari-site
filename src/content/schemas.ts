/**
 * Content Zod schemas and TypeScript types.
 *
 * Every user-facing text field uses LocalizedText so Hindi
 * can be added later without schema changes (Amendment 20).
 *
 * Nullable fields are used for unknown/unconfirmed content (Amendment 3).
 * Sample models are marked with isSample: true (Amendment 19/21).
 */

import { z } from "zod";

// ─── Primitives ────────────────────────────────────────────

/** Localised text: English required, Hindi optional (Amendment 20) */
export const LocalizedTextSchema = z.object({
  en: z.string().min(1),
  hi: z.string().optional(),
});
export type LocalizedText = z.infer<typeof LocalizedTextSchema>;

/** Indian phone: exactly 10 digits */
const PhoneSchema = z.string().regex(/^\d{10}$/, "Must be exactly 10 digits");

/** URL that starts with https:// */
const HttpsUrlSchema = z
  .string()
  .url()
  .refine((u) => u.startsWith("https://"), { message: "URL must start with https://" });

/** Google Maps embed src */
const MapsEmbedSrcSchema = z
  .string()
  .url()
  .refine((u) => u.startsWith("https://www.google.com/maps/embed"), {
    message: "Must be a Google Maps embed URL",
  });

// ─── Site ──────────────────────────────────────────────────

export const AddressSchema = z.object({
  line1: z.string().min(1),
  area: z.string().min(1),
  city: z.string().nullable(),
  district: z.string().nullable(),
  state: z.string().nullable(),
  pincode: z
    .string()
    .regex(/^\d{6}$/)
    .nullable(),
});
export type Address = z.infer<typeof AddressSchema>;

const HoursEntrySchema = z.object({
  day: z.string().min(1),
  open: z.string().min(1),
  close: z.string().min(1),
  closed: z.boolean().default(false),
});

export const SiteSchema = z.object({
  shopName: LocalizedTextSchema,
  tagline: LocalizedTextSchema,
  phone: PhoneSchema,
  whatsappNumber: PhoneSchema.nullable(),
  serviceNumber: PhoneSchema.nullable(),
  address: AddressSchema,
  mapsLink: HttpsUrlSchema.nullable(),
  mapsEmbedSrc: MapsEmbedSrcSchema.nullable(),
  hours: z.array(HoursEntrySchema).nullable(),
  gstin: z
    .string()
    .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GSTIN format")
    .nullable(),
  social: z.object({
    instagram: HttpsUrlSchema.nullable(),
  }),
  logo: z.object({
    src: z.string().min(1),
    alt: z.string().min(1),
  }),
});
export type Site = z.infer<typeof SiteSchema>;

// ─── Person ────────────────────────────────────────────────

export const PersonSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  photo: z.string().nullable(),
  message: LocalizedTextSchema,
  consent: z.boolean().default(false),
});
export type Person = z.infer<typeof PersonSchema>;

// ─── Model ─────────────────────────────────────────────────

export const ModelSchema = z.object({
  id: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Must be kebab-case"),
  name: LocalizedTextSchema,
  brand: z.string().nullable(),
  type: z.enum(["EV", "Petrol"]),
  priceExShowroom: z.number().positive().nullable(),
  claimedRangeKm: z.number().positive().nullable(),
  topSpeedKmh: z.number().positive().nullable(),
  batteryType: z.string().nullable(),
  batteryCapacity: z.string().nullable(),
  chargingTime: z.string().nullable(),
  warranty: z.string().nullable(),
  colours: z.array(z.string()).default([]),
  highlights: z.array(LocalizedTextSchema).default([]),
  photos: z.array(z.string()).default([]),
  isSample: z.boolean().default(false),
  featured: z.boolean().default(false),
});
export type Model = z.infer<typeof ModelSchema>;

// ─── Offer ─────────────────────────────────────────────────

export const OfferSchema = z.object({
  id: z.string().min(1),
  title: LocalizedTextSchema,
  description: LocalizedTextSchema,
  validFrom: z.string().nullable(),
  validUntil: z.string().nullable(),
  active: z.boolean().default(false),
  isSample: z.boolean().default(false),
});
export type Offer = z.infer<typeof OfferSchema>;

// ─── Customer ──────────────────────────────────────────────

export const CustomerSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  photo: z.string().nullable(),
  model: z.string().nullable(),
  review: LocalizedTextSchema,
  rating: z.number().min(1).max(5),
  consent: z.boolean().default(false),
});
export type Customer = z.infer<typeof CustomerSchema>;

// ─── FAQ ───────────────────────────────────────────────────

export const FaqSchema = z.object({
  id: z.string().min(1),
  question: LocalizedTextSchema,
  answer: LocalizedTextSchema,
  order: z.number().int().default(0),
});
export type Faq = z.infer<typeof FaqSchema>;

// ─── Service ───────────────────────────────────────────────

export const ServiceSchema = z.object({
  id: z.string().min(1),
  name: LocalizedTextSchema,
  description: LocalizedTextSchema,
  icon: z.string().nullable(),
  confirmed: z.boolean().default(false),
});
export type Service = z.infer<typeof ServiceSchema>;

// ─── Content root schemas (arrays/wrappers for each file) ──

export const ModelsFileSchema = z.array(ModelSchema);
export const OffersFileSchema = z.array(OfferSchema);
export const CustomersFileSchema = z.array(CustomerSchema);
export const FaqsFileSchema = z.array(FaqSchema);
export const ServicesFileSchema = z.array(ServiceSchema);
