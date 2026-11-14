import { describe, it } from "node:test";
import assert from "node:assert";
import { formatPrice, formatRange, formatTopSpeed } from "../src/lib/format.ts";

describe("formatPrice", () => {
  it("formats positive price with Indian number grouping and Rupee symbol", () => {
    assert.strictEqual(formatPrice(99999), "₹99,999");
    assert.strictEqual(formatPrice(125000), "₹1,25,000");
    assert.strictEqual(formatPrice(1000000), "₹10,00,000");
  });

  it("formats zero as ₹0", () => {
    assert.strictEqual(formatPrice(0), "₹0");
  });

  it("returns 'Call for price' when price is null (Amendment 3)", () => {
    assert.strictEqual(formatPrice(null), "Call for price");
  });
});

describe("formatRange", () => {
  it("formats claimed range with km unit", () => {
    assert.strictEqual(formatRange(100), "Claimed range: 100 km");
    assert.strictEqual(formatRange(75), "Claimed range: 75 km");
  });

  it("returns null when range is null so UI softens/hides it", () => {
    assert.strictEqual(formatRange(null), null);
  });
});

describe("formatTopSpeed", () => {
  it("formats top speed with km/h unit", () => {
    assert.strictEqual(formatTopSpeed(60), "Top speed: 60 km/h");
  });

  it("returns null when top speed is null", () => {
    assert.strictEqual(formatTopSpeed(null), null);
  });
});
