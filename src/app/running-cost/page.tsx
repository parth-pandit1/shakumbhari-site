import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { RunningCostEstimator } from "@/components/tools/RunningCostEstimator";
import { getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Petrol vs EV Running Cost & Savings Estimator",
  description:
    "Calculate fuel savings when switching from a petrol scooter to an electric scooter in Ledi, Haryana with Shakumbhari Automobile.",
};

export default function RunningCostPage() {
  const site = getSite();

  return (
    <div className="bg-surface-grey min-h-screen py-10 sm:py-14">
      <Container>
        <div className="mb-8">
          <div className="inline-block px-3 py-1 mb-2 rounded-full bg-brand-tint text-brand-primary text-xs font-semibold uppercase tracking-wider">
            Cost & Savings Calculator
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-heading">
            Petrol vs EV Running Cost Estimator
          </h1>
          <p className="mt-2 text-base text-text-muted max-w-2xl">
            See how much you could save on fuel by switching to an electric two-wheeler. All assumptions are fully editable to reflect your real daily commute.
          </p>
        </div>

        <RunningCostEstimator phone={site.phone} />
      </Container>
    </div>
  );
}
