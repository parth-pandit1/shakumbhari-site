import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ModelsFilterGrid } from "@/components/models/ModelsFilterGrid";
import { getSite, getModels } from "@/lib/content";

export const metadata: Metadata = {
  title: "Electric Scooter Models & Specifications",
  description:
    "Explore our full line-up of electric scooters at Shakumbhari Automobile in Ledi. Compare claimed range, battery capacity, top speeds, and prices.",
};

export default function ModelsPage() {
  const site = getSite();
  const models = getModels();

  return (
    <div className="bg-surface-grey min-h-screen py-10 sm:py-14">
      <Container>
        <div className="mb-8">
          <div className="inline-block px-3 py-1 mb-2 rounded-full bg-brand-tint text-brand-primary text-xs font-semibold uppercase tracking-wider">
            Showroom Inventory
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-heading">
            Electric Scooter Models
          </h1>
          <p className="mt-2 text-base text-text-muted max-w-2xl">
            Compare prices, claimed battery range, and key specifications. Prices shown are ex-showroom indicative figures; please call or message us on WhatsApp for exact on-road quotations.
          </p>
        </div>

        <ModelsFilterGrid models={models} phone={site.phone} />
      </Container>
    </div>
  );
}
