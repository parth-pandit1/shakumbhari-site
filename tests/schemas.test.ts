import { describe, it } from "node:test";
import assert from "node:assert";
import {
  SiteSchema,
  ModelSchema,
  CustomerSchema,
  LocalizedTextSchema,
} from "../src/content/schemas.ts";

describe("LocalizedTextSchema", () => {
  it("accepts valid English text", () => {
    const res = LocalizedTextSchema.safeParse({ en: "Scooter" });
    assert.strictEqual(res.success, true);
  });

  it("accepts bilingual text", () => {
    const res = LocalizedTextSchema.safeParse({
      en: "Scooter",
      hi: "स्कूटर",
    });
    assert.strictEqual(res.success, true);
  });

  it("rejects empty English string", () => {
    const res = LocalizedTextSchema.safeParse({ en: "" });
    assert.strictEqual(res.success, false);
  });
});

describe("ModelSchema", () => {
  const validModel = {
    id: "sample-model-1",
    slug: "sample-model-1",
    name: { en: "Sample Model 1" },
    brand: null,
    type: "EV",
    priceExShowroom: 89999,
    claimedRangeKm: 85,
    topSpeedKmh: 55,
    batteryType: "Lithium-ion",
    batteryCapacity: "1.8 kWh",
    chargingTime: "4 hours",
    warranty: null,
    colours: ["Red", "Black"],
    highlights: [{ en: "Quick Acceleration" }],
    photos: [],
    isSample: true,
    featured: true,
  };

  it("validates a complete model object", () => {
    const res = ModelSchema.safeParse(validModel);
    assert.strictEqual(res.success, true);
  });

  it("rejects invalid non-kebab-case slug", () => {
    const res = ModelSchema.safeParse({
      ...validModel,
      slug: "Sample_Model_1",
    });
    assert.strictEqual(res.success, false);
  });

  it("rejects negative price", () => {
    const res = ModelSchema.safeParse({
      ...validModel,
      priceExShowroom: -100,
    });
    assert.strictEqual(res.success, false);
  });

  it("allows null price (calls for price)", () => {
    const res = ModelSchema.safeParse({
      ...validModel,
      priceExShowroom: null,
    });
    assert.strictEqual(res.success, true);
  });
});

describe("CustomerSchema & Consent Gating (Rule 5)", () => {
  it("defaults consent to false when omitted", () => {
    const data = {
      id: "cust-1",
      name: "Customer Name",
      photo: null,
      model: "Sample Model",
      review: { en: "Great scooter" },
      rating: 5,
    };
    const parsed = CustomerSchema.parse(data);
    assert.strictEqual(parsed.consent, false);
  });

  it("rejects ratings outside 1-5 range", () => {
    const data = {
      id: "cust-1",
      name: "Customer Name",
      photo: null,
      model: "Sample Model",
      review: { en: "Great scooter" },
      rating: 6,
      consent: true,
    };
    const res = CustomerSchema.safeParse(data);
    assert.strictEqual(res.success, false);
  });
});

describe("SiteSchema embed and GSTIN validation", () => {
  it("rejects non-Google maps embed URLs", () => {
    const siteData = {
      shopName: { en: "Test Shop" },
      tagline: { en: "Test Tagline" },
      phone: "8168241095",
      whatsappNumber: null,
      serviceNumber: null,
      address: {
        line1: "Road",
        area: "Area",
        city: null,
        district: null,
        state: null,
        pincode: null,
      },
      mapsLink: null,
      mapsEmbedSrc: "https://evil.com/fake-map",
      hours: null,
      gstin: null,
      social: { instagram: null },
      logo: { src: "/logo.png", alt: "Logo" },
    };
    const res = SiteSchema.safeParse(siteData);
    assert.strictEqual(res.success, false);
  });

  it("validates GSTIN format when provided", () => {
    const siteData = {
      shopName: { en: "Test Shop" },
      tagline: { en: "Test Tagline" },
      phone: "8168241095",
      whatsappNumber: null,
      serviceNumber: null,
      address: {
        line1: "Road",
        area: "Area",
        city: null,
        district: null,
        state: null,
        pincode: null,
      },
      mapsLink: null,
      mapsEmbedSrc: null,
      hours: null,
      gstin: "07AAAAA0000A1Z5",
      social: { instagram: null },
      logo: { src: "/logo.png", alt: "Logo" },
    };
    const res = SiteSchema.safeParse(siteData);
    assert.strictEqual(res.success, true);
  });

  it("rejects invalid GSTIN format", () => {
    const siteData = {
      shopName: { en: "Test Shop" },
      tagline: { en: "Test Tagline" },
      phone: "8168241095",
      whatsappNumber: null,
      serviceNumber: null,
      address: {
        line1: "Road",
        area: "Area",
        city: null,
        district: null,
        state: null,
        pincode: null,
      },
      mapsLink: null,
      mapsEmbedSrc: null,
      hours: null,
      gstin: "INVALID-GSTIN-123",
      social: { instagram: null },
      logo: { src: "/logo.png", alt: "Logo" },
    };
    const res = SiteSchema.safeParse(siteData);
    assert.strictEqual(res.success, false);
  });
});
