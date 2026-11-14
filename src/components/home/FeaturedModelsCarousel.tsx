"use client";

import React, { useRef } from "react";
import { ModelCard } from "@/components/common/ModelCard";
import type { Model } from "@/content/schemas";

interface FeaturedModelsCarouselProps {
  models: Model[];
  phone: string;
}

export function FeaturedModelsCarousel({
  models,
  phone,
}: FeaturedModelsCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = scrollContainerRef.current.clientWidth * 0.85;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -offset : offset,
        behavior: "smooth",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scroll("left");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scroll("right");
    }
  };

  return (
    <div className="relative" onKeyDown={handleKeyDown} tabIndex={0} aria-label="Featured Models Carousel">
      {/* Scroll controls */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">
            Explore Range
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-heading mt-1">
            Featured Electric Scooters
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-default bg-surface-white text-text-heading hover:bg-surface-grey hover:border-border-strong transition-colors shadow-xs"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-default bg-surface-white text-text-heading hover:bg-surface-grey hover:border-border-strong transition-colors shadow-xs"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Snap Scrollable list */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {models.map((model) => (
          <div
            key={model.id}
            className="w-[85vw] max-w-[340px] sm:w-[320px] md:w-[360px] shrink-0 snap-start"
          >
            <ModelCard model={model} phone={phone} />
          </div>
        ))}
      </div>
    </div>
  );
}
