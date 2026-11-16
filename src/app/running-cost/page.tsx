import type { Metadata } from "next";
import { Container } from "@/components/ui";
import { RunningCostEstimator } from "@/components/features/running-cost/RunningCostEstimator";
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
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text-heading">
            Petrol vs EV Running Cost Estimator
          </h1>
        </div>

        <RunningCostEstimator phone={site.phone} />
      </Container>
    </div>
  );
}
