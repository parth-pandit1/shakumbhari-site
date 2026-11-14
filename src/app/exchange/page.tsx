import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ExchangeForm } from "@/components/forms/ExchangeForm";
import { getSite, getModels } from "@/lib/content";

export const metadata: Metadata = {
  title: "Exchange Old Two-Wheeler for an EV Scooter",
  description:
    "Upgrade your petrol scooter to a modern electric scooter. Request an exchange appraisal with Shakumbhari Automobile in Ledi.",
};

export default function ExchangePage() {
  const site = getSite();
  const models = getModels();

  return (
    <div className="bg-surface-grey min-h-screen py-10 sm:py-14">
      <Container>
        <div className="text-center max-w-xl mx-auto mb-8">
          <div className="inline-block px-3 py-1 mb-2 rounded-full bg-brand-tint text-brand-primary text-xs font-semibold uppercase tracking-wider">
            Vehicle Upgrade
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-heading">
            Exchange Your Old Two-Wheeler
          </h1>
          <p className="mt-2 text-base text-text-muted">
            Trade in your petrol motorcycle or scooter towards a brand-new electric scooter. Share your vehicle details to start a valuation on WhatsApp.
          </p>
        </div>

        <ExchangeForm models={models} phone={site.phone} />
      </Container>
    </div>
  );
}
