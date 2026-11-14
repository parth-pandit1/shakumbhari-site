"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";

interface LocationMapProps {
  mapsLink: string | null;
  mapsEmbedSrc: string | null;
  addressText: string;
}

export function LocationMap({
  mapsLink,
  mapsEmbedSrc,
  addressText,
}: LocationMapProps) {
  const [loadMap, setLoadMap] = useState(false);

  return (
    <div className="rounded-2xl border border-border-subtle bg-surface-white overflow-hidden shadow-sm">
      <div className="p-6 sm:p-8">
        <div className="inline-block px-3 py-1 mb-3 rounded-full bg-brand-tint text-brand-primary text-xs font-semibold uppercase tracking-wider">
          Visit Showroom
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-text-heading mb-2">
          Find Us in Ledi
        </h3>
        <p className="text-base text-text-muted mb-6 max-w-xl">
          {addressText}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          {mapsLink && (
            <Button
              href={mapsLink}
              isExternal
              variant="primary"
              size="md"
            >
              <svg
                className="mr-2 h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              Get Directions
            </Button>
          )}

          <Button href="/test-ride" variant="outline" size="md">
            Schedule Showroom Visit
          </Button>
        </div>
      </div>

      {/* Embedded Map Section: Click-to-load (Amendment 11 & 16) */}
      {mapsEmbedSrc ? (
        <div className="border-t border-border-subtle bg-surface-grey relative min-h-[340px] flex items-center justify-center">
          {loadMap ? (
            <iframe
              src={mapsEmbedSrc}
              title="Shakumbhari Automobile showroom location map"
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[380px]"
            />
          ) : (
            <div className="p-8 text-center max-w-md mx-auto">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-tint text-brand-primary">
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <p className="text-sm text-text-body font-medium mb-1">
                Interactive Google Map
              </p>
              <p className="text-xs text-text-muted mb-4">
                To protect your privacy, map tiles load only when requested.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLoadMap(true)}
              >
                Show Map
              </Button>
            </div>
          )}
        </div>
      ) : (
        /* If mapsEmbedSrc is null, soften gracefully (Amendment 16) */
        <div className="px-6 sm:px-8 py-4 bg-surface-grey border-t border-border-subtle text-xs text-text-muted flex items-center justify-between">
          <span>Map coordinates available on Google Maps.</span>
          {mapsLink && (
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-primary hover:underline"
            >
              Open in Maps App &rarr;
            </a>
          )}
        </div>
      )}
    </div>
  );
}
