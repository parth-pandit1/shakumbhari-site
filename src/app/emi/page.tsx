import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { EmiCalculator } from "@/components/tools/EmiCalculator";
import { getSite } from "@/lib/content";

export const metadata: Metadata = {
  title: "Electric Scooter EMI Calculator",
  description:
    "Calculate estimated monthly EMI payments for your new electric scooter with reducing balance formula at Shakumbhari Automobile in Ledi.",
};

export default function EmiPage() {
  const site = getSite();

  return (
    <div className="bg-surface-grey min-h-screen py-10 sm:py-14">
      <Container>
        <div className="mb-8">
          <div className="inline-block px-3 py-1 mb-2 rounded-full bg-brand-tint text-brand-primary text-xs font-semibold uppercase tracking-wider">
            Finance Estimator
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-heading">
            Electric Scooter EMI Calculator
          </h1>
          <p className="mt-2 text-base text-text-muted max-w-2xl">
            Estimate your monthly payments using standard reducing balance calculation. Adjust your scooter price, down payment, loan duration, and estimated interest rate.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="p-12 text-center text-text-muted bg-surface-white rounded-2xl border border-border-subtle">
              Loading EMI calculator...
            </div>
          }
        >
          <EmiCalculator phone={site.phone} />
        </Suspense>
      </Container>
    </div>
  );
}
