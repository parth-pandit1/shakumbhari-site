import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { CompareView } from "@/components/features/compare/CompareView";
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
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-heading">
            Compare Scooter Models
          </h1>
        </div>

        {/* Suspense boundary required for static export with useSearchParams (Amendment 6) */}
        <Suspense
          fallback={
            <div className="p-12 text-center text-text-muted bg-surface-white rounded-lg border border-border-subtle">
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
