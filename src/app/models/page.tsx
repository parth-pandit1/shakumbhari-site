import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { ModelsFilterGrid } from "@/components/features/models/ModelsFilterGrid";
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
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-heading">
            Electric Scooter Models
          </h1>
        </div>

        <ModelsFilterGrid models={models} phone={site.phone} />
      </Container>
    </div>
  );
}
