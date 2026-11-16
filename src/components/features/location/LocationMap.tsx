"use client";

import { useState } from "react";
import { Button } from "@/components/ui";
import { ROUTES } from "@/lib/constants";

export interface LocationMapProps {
  mapsLink: string | null;
  mapsEmbedSrc: string | null;
  addressText: string;
  hours?: Array<{ day: string; open: string; close: string; closed?: boolean }> | null;
}

export function LocationMap({ mapsLink, mapsEmbedSrc, addressText, hours }: LocationMapProps) {
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  return (
    <div className="rounded-lg border border-border-subtle bg-surface-white overflow-hidden shadow-sm">
      <div className="p-6 sm:p-8 text-left">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-text-heading tracking-tight mb-4">
          Visit us
        </h2>
        <p className="text-base text-text-body mb-6 max-w-xl">{addressText}</p>

        {hours && hours.length > 0 && (
          <div className="mb-6 border-t border-border-subtle pt-4">
            <h3 className="text-xs font-bold text-text-heading mb-2">Showroom hours</h3>
            <ul className="text-xs text-text-muted space-y-1">
              {hours.map((h, i) => (
                <li key={i} className="flex justify-between max-w-xs">
                  <span>{h.day}</span>
                  <span>{h.closed ? "Closed" : `${h.open} - ${h.close}`}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          {mapsLink && (
            <Button href={mapsLink} isExternal variant="primary" size="md">
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
              Get directions
            </Button>
          )}

          <Button href={ROUTES.TEST_RIDE} variant="outline" size="md">
            Book a test ride
          </Button>
        </div>
      </div>

      {/* Embedded Map Section: Click-to-load */}
      {mapsEmbedSrc ? (
        <div className="border-t border-border-subtle bg-surface-grey relative min-h-[320px] flex items-center justify-center">
          {isMapLoaded ? (
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
              <p className="text-sm text-text-body font-medium mb-1">Google Maps</p>
              <p className="text-xs text-text-muted mb-4">Map tiles load only when requested.</p>
              <Button variant="outline" size="sm" onClick={() => setIsMapLoaded(true)}>
                Show Map
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="px-6 sm:px-8 py-4 bg-surface-grey border-t border-border-subtle text-xs text-text-muted flex items-center justify-between">
          <span>Location coordinates on Google Maps.</span>
          {mapsLink && (
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-primary hover:underline"
            >
              Open in Maps &rarr;
            </a>
          )}
        </div>
      )}
    </div>
  );
}
