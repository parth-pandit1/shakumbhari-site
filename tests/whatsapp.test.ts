import { describe, it } from "node:test";
import assert from "node:assert";
import {
  buildWhatsAppLink,
  enquiryMessage,
  testRideMessage,
  serviceMessage,
} from "../src/lib/whatsapp.ts";

describe("buildWhatsAppLink", () => {
  it("builds valid wa.me link with country code 91 and URL-encoded message", () => {
    const link = buildWhatsAppLink("8168241095", "Hello, I am interested");
    assert.strictEqual(
      link,
      "https://wa.me/918168241095?text=Hello%2C%20I%20am%20interested"
    );
  });

  it("handles special characters and spaces cleanly", () => {
    const link = buildWhatsAppLink("8168241095", "Price? ₹99,999 & test ride");
    assert.ok(link.startsWith("https://wa.me/918168241095?text="));
    assert.ok(link.includes(encodeURIComponent("₹99,999")));
  });

  it("throws error for phone with less than 10 digits", () => {
    assert.throws(
      () => buildWhatsAppLink("816824109", "Hello"),
      /Invalid phone number/
    );
  });

  it("throws error for phone with more than 10 digits", () => {
    assert.throws(
      () => buildWhatsAppLink("918168241095", "Hello"),
      /Invalid phone number/
    );
  });

  it("throws error for phone containing non-digit characters", () => {
    assert.throws(
      () => buildWhatsAppLink("816824109a", "Hello"),
      /Invalid phone number/
    );
    assert.throws(
      () => buildWhatsAppLink("+9181682410", "Hello"),
      /Invalid phone number/
    );
  });
});

describe("message helpers", () => {
  it("enquiryMessage returns generic text when model omitted", () => {
    const msg = enquiryMessage();
    assert.ok(msg.includes("electric scooters"));
  });

  it("enquiryMessage includes model name when specified", () => {
    const msg = enquiryMessage("Sample Model A");
    assert.ok(msg.includes("Sample Model A"));
  });

  it("testRideMessage returns generic text when model omitted", () => {
    const msg = testRideMessage();
    assert.ok(msg.includes("book a test ride"));
  });

  it("testRideMessage includes model name when specified", () => {
    const msg = testRideMessage("Sample Model B");
    assert.ok(msg.includes("Sample Model B"));
    assert.ok(msg.includes("book a test ride"));
  });

  it("serviceMessage returns service enquiry text", () => {
    const msg = serviceMessage();
    assert.ok(msg.includes("servicing my electric scooter"));
  });
});
