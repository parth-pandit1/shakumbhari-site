import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { EmiCalculator } from "@/components/features/emi/EmiCalculator";
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
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-heading">
            Electric Scooter EMI Calculator
          </h1>
        </div>

        <Suspense
          fallback={
            <div className="p-12 text-center text-text-muted bg-surface-white rounded-lg border border-border-subtle">
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
