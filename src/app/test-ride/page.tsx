import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { TestRideForm } from "@/components/features/forms/TestRideForm";
import { getSite, getModels } from "@/lib/content";

export const metadata: Metadata = {
  title: "Book a Test Ride in Ledi",
  description:
    "Schedule an electric scooter test ride at Shakumbhari Automobile showroom in Chhachhrauli Road, Ledi, Haryana.",
};

export default function TestRidePage() {
  const site = getSite();
  const models = getModels();

  return (
    <div className="bg-surface-grey min-h-screen py-12 sm:py-16">
      <Container size="sm">
        <div className="max-w-[560px] mx-auto">
          {/* Centred heading standing alone */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-text-heading">
              Book a test ride
            </h1>
          </div>

          <Suspense
            fallback={
              <div className="p-12 text-center text-text-muted bg-surface-white rounded-lg border border-border-subtle">
                Loading test ride form...
              </div>
            }
          >
            <TestRideForm models={models} phone={site.phone} />
          </Suspense>
        </div>
      </Container>
    </div>
  );
}
