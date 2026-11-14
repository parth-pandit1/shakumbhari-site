/**
 * WhatsApp link builder.
 *
 * Validates the phone number (10 Indian digits) and constructs
 * a wa.me link with pre-filled message. Uses +91 country code.
 */

const PHONE_REGEX = /^\d{10}$/;

/**
 * Build a WhatsApp click-to-chat link.
 * @param phone - 10-digit Indian phone number
 * @param message - Pre-filled message text
 * @throws Error if phone is not 10 digits
 */
export function buildWhatsAppLink(phone: string, message: string): string {
  if (!PHONE_REGEX.test(phone)) {
    throw new Error(
      `Invalid phone number "${phone}": must be exactly 10 digits`,
    );
  }
  const encoded = encodeURIComponent(message);
  return `https://wa.me/91${phone}?text=${encoded}`;
}

// ─── Pre-built message helpers ─────────────────────────────

export function enquiryMessage(modelName?: string): string {
  if (modelName) {
    return `Hi, I'm interested in the ${modelName}. Could you share more details?`;
  }
  return "Hi, I'd like to know more about the electric scooters available at your showroom.";
}

export function testRideMessage(modelName?: string): string {
  if (modelName) {
    return `Hi, I'd like to book a test ride for the ${modelName}. Please let me know the available slots.`;
  }
  return "Hi, I'd like to book a test ride. Please let me know the available slots.";
}

export function serviceMessage(): string {
  return "Hi, I'd like to enquire about servicing my electric scooter. Please share the details.";
}
