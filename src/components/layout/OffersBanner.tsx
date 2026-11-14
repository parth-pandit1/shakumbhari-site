"use client";

import { useState } from "react";
import type { Offer } from "@/content/schemas";

export interface OffersBannerProps {
  offers: Offer[];
}

export function OffersBanner({ offers }: OffersBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  // Gated: renders ONLY when an active offer exists
  if (offers.length === 0 || isDismissed) {
    return null;
  }

  const currentOffer = offers[0];

  return (
    <div
      role="region"
      aria-label="Promotional Announcement"
      className="bg-brand-primary text-white text-xs sm:text-sm px-4 py-2.5 relative z-50 flex items-center justify-between shadow-xs"
    >
      <div className="mx-auto flex items-center gap-2 font-medium text-center">
        <span className="inline-block px-2 py-0.5 rounded bg-white text-brand-primary font-bold text-[10px] uppercase tracking-wider">
          Offer
        </span>
        <span>
          <strong>{currentOffer.title.en}</strong> — {currentOffer.description.en}
        </span>
      </div>

      <button
        type="button"
        onClick={() => setIsDismissed(true)}
        aria-label="Dismiss offer banner"
        className="text-white/80 hover:text-white p-1 rounded transition-colors shrink-0 ml-2"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
