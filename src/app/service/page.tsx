import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { ServiceBookingForm } from "@/components/features/forms/ServiceBookingForm";
import { getSite, getServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Electric Scooter Service & Spare Parts",
  description:
    "Professional maintenance, electrical diagnostics, and spare parts for electric scooters at Shakumbhari Automobile in Ledi, Haryana.",
};

export default function ServicePage() {
  const site = getSite();
  const services = getServices();

  return (
    <div className="bg-surface-grey min-h-screen py-10 sm:py-14">
      <Container>
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-block px-3 py-1 mb-2 rounded-full bg-brand-tint text-brand-primary text-xs font-semibold uppercase tracking-wider">
            Workshop &amp; Repairs
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-heading">
            Showroom Service &amp; Spare Parts
          </h1>
          <p className="mt-2 text-base text-text-muted">
            Routine servicing, brake tune-ups, electrical system checks, and replacement spare parts
            for two-wheelers in Ledi.
          </p>
        </div>

        {/* Services Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="p-6 rounded-2xl bg-surface-white border border-border-subtle shadow-xs"
            >
              <div className="inline-block px-2.5 py-1 rounded bg-brand-tint text-brand-primary text-xs font-bold uppercase tracking-wider mb-3">
                Confirmed Service
              </div>
              <h2 className="text-xl font-bold text-text-heading mb-2">{svc.name.en}</h2>
              <p className="text-sm text-text-body leading-relaxed">{svc.description.en}</p>
            </div>
          ))}
        </div>

        {/* Booking Form */}
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-text-heading">Book a Service Appointment</h2>
            <p className="text-xs text-text-muted mt-1">
              Select your service type and date to confirm scheduling directly with our mechanics on
              WhatsApp.
            </p>
          </div>

          <ServiceBookingForm phone={site.phone} />
        </div>
      </Container>
    </div>
  );
}
