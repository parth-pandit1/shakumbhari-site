import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { ExchangeForm } from "@/components/features/forms/ExchangeForm";
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
    <div className="bg-surface-grey min-h-screen py-12 sm:py-16">
      <Container size="sm">
        <div className="max-w-[560px] mx-auto">
          {/* Centred heading standing alone */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-text-heading">
              Exchange your old two-wheeler
            </h1>
          </div>

          <ExchangeForm models={models} phone={site.phone} />
        </div>
      </Container>
    </div>
  );
}
