import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy & Data Notice",
  description:
    "Plain-English privacy policy for Shakumbhari Automobile. How we handle customer privacy, forms, and external map embeds.",
};

export default function PrivacyPage() {
  const site = getSite();

  return (
    <div className="bg-surface-white min-h-screen py-12 sm:py-16">
      <Container size="md">
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-heading">
            Privacy Policy &amp; Data Notice
          </h1>
        </div>

        <div className="space-y-8 text-sm sm:text-base text-text-body leading-relaxed">
          <section className="p-6 rounded-lg bg-surface-grey border border-border-subtle">
            <h2 className="text-lg font-bold text-text-heading mb-2">Our Privacy Commitment</h2>
            <p>
              At <strong>{site.shopName.en}</strong>, we respect your privacy. This website is built
              statically with zero third-party tracking scripts, zero advertising pixels, zero user
              profiling cookies, and self-hosted fonts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-heading mb-3">
              1. How Website Forms Work (WhatsApp Integration)
            </h2>
            <p className="mb-3">
              All interactive forms on this website (including Test Ride bookings, Exchange
              valuations, and Service requests) do <strong>not</strong> transmit or save your
              personal data to any external server or remote database.
            </p>
            <p>
              When you submit a form, the input is converted into a structured message and directly
              opens your <strong>WhatsApp</strong> application on your mobile device or computer.
              Your communication takes place entirely within WhatsApp&apos;s end-to-end encrypted
              messaging service directly with our showroom phone (+91 {site.phone}).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-heading mb-3">
              2. Interactive Google Maps Embed
            </h2>
            <p className="mb-3">
              To help you locate our showroom in Ledi, we provide an interactive Google Maps
              location view.
            </p>
            <p className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm">
              <strong>Notice:</strong> To safeguard your privacy, Google Maps does not load
              automatically when you open our website. It is strictly click-to-load. When you tap{" "}
              <strong>&ldquo;Show Map&rdquo;</strong>, map assets and tiles are requested directly
              from Google servers (google.com), which may log your IP address and set standard
              Google cookies according to Google&apos;s privacy policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-heading mb-3">3. Analytics &amp; Cookies</h2>
            <p>
              We do not use Google Analytics, Facebook Pixel, tracking cookies, or third-party
              behavioral trackers on this website. Session storage and cookies are not used for
              advertising.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-heading mb-3">
              4. Customer Testimonials &amp; Photos
            </h2>
            <p>
              In accordance with our strict privacy guidelines, any customer photo, name, or
              testimonial displayed on our website is shown only after receiving explicit consent
              from the customer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-heading mb-3">
              5. Contact Us Regarding Privacy
            </h2>
            <p>
              If you have any questions about this privacy notice or would like to request
              clarification, you can reach out directly:
            </p>
            <div className="mt-3 p-4 rounded-xl bg-surface-grey border border-border-subtle text-xs sm:text-sm text-text-heading font-medium space-y-1">
              <div>
                <strong>Showroom:</strong> {site.shopName.en}
              </div>
              <div>
                <strong>Address:</strong> {site.address.line1}, {site.address.area}, Haryana
              </div>
              <div>
                <strong>Phone / WhatsApp:</strong> +91 {site.phone}
              </div>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
