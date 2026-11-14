import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice, formatRange, formatTopSpeed } from "@/lib/format";
import { buildWhatsAppLink, enquiryMessage } from "@/lib/whatsapp";
import type { Model } from "@/content/schemas";

interface ModelCardProps {
  model: Model;
  phone: string;
}

export function ModelCard({ model, phone }: ModelCardProps) {
  const photo = model.photos[0] || "/images/models/sample-model-a.webp";
  const whatsappUrl = buildWhatsAppLink(
    phone,
    enquiryMessage(model.name.en)
  );

  return (
    <div className="flex flex-col h-full rounded-2xl border border-border-subtle bg-surface-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-normal group">
      {/* Image container */}
      <div className="relative aspect-[16/10] w-full bg-surface-grey overflow-hidden">
        <Image
          src={photo}
          alt={model.name.en}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-[1.03] transition-transform duration-slow"
          loading="lazy"
        />

        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {model.isSample && (
            <Badge variant="warning" size="sm">
              Sample Model
            </Badge>
          )}
          <Badge variant="brand" size="sm">
            {model.type}
          </Badge>
        </div>

        {model.batteryType && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[11px] font-medium text-white">
              {model.batteryType}
            </span>
          </div>
        )}
      </div>

      {/* Content body */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-text-heading group-hover:text-brand-primary transition-colors">
            <Link href={`/models/${model.slug}`}>{model.name.en}</Link>
          </h3>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 gap-2 mt-4 py-3 border-y border-border-subtle text-xs text-text-muted">
            {model.claimedRangeKm !== null && (
              <div className="flex items-center gap-1.5">
                <svg
                  className="h-4 w-4 text-brand-primary shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                <span>{formatRange(model.claimedRangeKm)}</span>
              </div>
            )}
            {model.topSpeedKmh !== null && (
              <div className="flex items-center gap-1.5">
                <svg
                  className="h-4 w-4 text-brand-primary shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span>{formatTopSpeed(model.topSpeedKmh)}</span>
              </div>
            )}
            {model.chargingTime && (
              <div className="flex items-center gap-1.5 col-span-2">
                <svg
                  className="h-4 w-4 text-brand-primary shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="7" width="16" height="10" rx="2" ry="2" />
                  <line x1="22" y1="11" x2="22" y2="13" />
                </svg>
                <span>Charge: {model.chargingTime}</span>
              </div>
            )}
          </div>

          {/* Price display */}
          <div className="mt-4">
            <div className="text-xl sm:text-2xl font-bold text-text-heading">
              {formatPrice(model.priceExShowroom)}
            </div>
            <p className="text-[11px] text-text-muted mt-0.5">
              Ex-showroom, call for latest price
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-2.5 mt-6 pt-4 border-t border-border-subtle">
          <Button
            href={`/models/${model.slug}`}
            variant="outline"
            size="sm"
            fullWidth
          >
            Specs
          </Button>

          <Button
            href={whatsappUrl}
            isExternal
            variant="whatsapp"
            size="sm"
            fullWidth
          >
            Enquire
          </Button>
        </div>
      </div>
    </div>
  );
}
