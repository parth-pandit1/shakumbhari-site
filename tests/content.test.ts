import { describe, it } from "node:test";
import assert from "node:assert";
import {
  getSite,
  getPerson,
  getModels,
  getFeaturedModels,
  getModelBySlug,
  getOffers,
  getCustomers,
  getFaqs,
  getServices,
  getLocalized,
} from "../src/lib/content.ts";

describe("getLocalized", () => {
  it("returns English string by default", () => {
    const text = { en: "Electric Scooter", hi: "इलेक्ट्रिक स्कूटर" };
    assert.strictEqual(getLocalized(text), "Electric Scooter");
    assert.strictEqual(getLocalized(text, "en"), "Electric Scooter");
  });

  it("returns Hindi string when requested and present", () => {
    const text = { en: "Electric Scooter", hi: "इलेक्ट्रिक स्कूटर" };
    assert.strictEqual(getLocalized(text, "hi"), "इलेक्ट्रिक स्कूटर");
  });

  it("falls back to English when Hindi translation is not provided", () => {
    const text = { en: "Only English" };
    assert.strictEqual(getLocalized(text, "hi"), "Only English");
  });
});

describe("Content Loaders", () => {
  it("getSite returns validated site data", () => {
    const site = getSite();
    assert.strictEqual(site.shopName.en, "Shakumbhari Automobile");
    assert.strictEqual(site.phone, "8168241095");
    assert.strictEqual(site.address.line1, "Chhachhrauli Road");
    assert.strictEqual(site.address.area, "Ledi");
    assert.strictEqual(site.whatsappNumber, null); // falls back in UI
    assert.strictEqual(site.hours, null);
    assert.strictEqual(site.gstin, null);
  });

  it("getPerson returns manager details with consent: false by default", () => {
    const person = getPerson();
    assert.ok(person.name.includes("PLACEHOLDER"));
    assert.strictEqual(person.role, "Manager");
    assert.strictEqual(person.consent, false, "Must default to consent: false");
    assert.strictEqual(person.photo, null);
  });

  it("getModels loads all 5 sample models, all flagged with isSample: true", () => {
    const models = getModels();
    assert.strictEqual(models.length, 5);
    for (const model of models) {
      assert.strictEqual(model.isSample, true, `${model.id} must have isSample: true`);
      assert.strictEqual(model.brand, null, "Brand must be null until confirmed");
      assert.strictEqual(model.type, "EV");
      assert.ok(model.priceExShowroom! > 0);
    }
  });

  it("getFeaturedModels filters only models with featured: true", () => {
    const featured = getFeaturedModels();
    assert.ok(featured.length > 0);
    for (const m of featured) {
      assert.strictEqual(m.featured, true);
    }
  });

  it("getModelBySlug finds a model by its kebab-case slug", () => {
    const model = getModelBySlug("sample-model-a");
    assert.ok(model);
    assert.strictEqual(model.slug, "sample-model-a");
  });

  it("getModelBySlug returns undefined for non-existent slug", () => {
    const model = getModelBySlug("non-existent-model");
    assert.strictEqual(model, undefined);
  });

  it("getOffers filters only active offers (inactive samples are hidden)", () => {
    const offers = getOffers();
    // In our sample data, sample offer has active: false
    assert.strictEqual(offers.length, 0);
  });

  it("getCustomers filters strictly by consent: true (Rule 5)", () => {
    const customers = getCustomers();
    // In our sample data, customers.json is empty []
    assert.strictEqual(customers.length, 0);
  });

  it("getFaqs returns FAQs sorted by display order", () => {
    const faqs = getFaqs();
    assert.strictEqual(faqs.length, 5);
    for (let i = 0; i < faqs.length - 1; i++) {
      assert.ok(faqs[i].order <= faqs[i + 1].order);
    }
  });

  it("getServices filters strictly by confirmed: true", () => {
    const services = getServices();
    assert.strictEqual(services.length, 2);
    for (const s of services) {
      assert.strictEqual(s.confirmed, true);
    }
  });
});
