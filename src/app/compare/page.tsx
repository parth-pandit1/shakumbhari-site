import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CompareView } from "@/components/compare/CompareView";
import { getSite, getModels } from "@/lib/content";

export const metadata: Metadata = {
  title: "Compare Electric Scooter Models",
  description:
    "Compare specifications, claimed ranges, top speed, battery types, and prices of electric scooters side-by-side at Shakumbhari Automobile.",
};

export default function ComparePage() {
  const site = getSite();
  const models = getModels();

  return (
    <div className="bg-surface-grey min-h-screen py-10 sm:py-14">
      <Container>
        <div className="mb-8">
          <div className="inline-block px-3 py-1 mb-2 rounded-full bg-brand-tint text-brand-primary text-xs font-semibold uppercase tracking-wider">
            Side-by-Side Comparison
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-heading">
            Compare Scooter Models
          </h1>
          <p className="mt-2 text-base text-text-muted max-w-2xl">
            Select up to three electric scooters to compare battery capacities, claimed ranges, charging times, and estimated ex-showroom pricing side by side.
          </p>
        </div>

        {/* Suspense boundary required for static export with useSearchParams (Amendment 6) */}
        <Suspense
          fallback={
            <div className="p-12 text-center text-text-muted bg-surface-white rounded-2xl border border-border-subtle">
              Loading comparison tool...
            </div>
          }
        >
          <CompareView models={models} phone={site.phone} />
        </Suspense>
      </Container>
    </div>
  );
}
