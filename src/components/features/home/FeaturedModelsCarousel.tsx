import Link from "next/link";
import { ModelCard } from "@/components/features/models/ModelCard";
import { ROUTES } from "@/lib/constants";
import type { Model } from "@/content/schemas";

export interface FeaturedModelsCarouselProps {
  models: Model[];
  phone: string;
}

export function FeaturedModelsCarousel({ models, phone }: FeaturedModelsCarouselProps) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-8 text-left">
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-text-heading tracking-tight">
            Models in stock
          </h2>
        </div>

        <Link
          href={ROUTES.MODELS}
          className="text-xs sm:text-sm font-semibold text-brand-primary hover:text-brand-hover underline underline-offset-4"
        >
          See models &rarr;
        </Link>
      </div>

      {/* Mobile: scroll-snap strip with visible peek of next card. Desktop: 3-column grid */}
      <div className="flex md:grid md:grid-cols-3 gap-5 sm:gap-6 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0">
        {models.map((model) => (
          <div
            key={model.id}
            className="w-[82vw] sm:w-[340px] md:w-auto shrink-0 md:shrink snap-start"
          >
            <ModelCard model={model} phone={phone} />
          </div>
        ))}
      </div>
    </div>
  );
}
