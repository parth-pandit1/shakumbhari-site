import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { TestRideForm } from "@/components/forms/TestRideForm";
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
    <div className="bg-surface-grey min-h-screen py-10 sm:py-14">
      <Container>
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-block px-3 py-1 mb-2 rounded-full bg-brand-tint text-brand-primary text-xs font-semibold uppercase tracking-wider">
            Showroom Experience
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-heading">
            Book an EV Scooter Test Ride
          </h1>
          <p className="mt-2 text-base text-text-muted">
            Experience smooth electric acceleration and quiet riding firsthand. Pick your model and preferred date to book directly on WhatsApp.
          </p>
        </div>

        <TestRideForm models={models} phone={site.phone} />
      </Container>
    </div>
  );
}
