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
    <div className="bg-surface-grey min-h-screen py-12 sm:py-16">
      <Container size="sm">
        <div className="max-w-[560px] mx-auto">
          {/* Centred heading standing alone */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-text-heading">
              Showroom service and spare parts
            </h1>
          </div>

          {/* Services Overview Cards */}
          <div className="space-y-4 mb-10">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="p-5 rounded-lg bg-surface-white border border-border-subtle text-left"
              >
                <h2 className="text-base font-bold text-text-heading mb-1">{svc.name.en}</h2>
                <p className="text-xs sm:text-sm text-text-body leading-relaxed">
                  {svc.description.en}
                </p>
              </div>
            ))}
          </div>

          {/* Form heading standing alone */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-text-heading">Book a service appointment</h2>
          </div>

          <ServiceBookingForm phone={site.phone} />
        </div>
      </Container>
    </div>
  );
}
