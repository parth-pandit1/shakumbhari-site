import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui";
import { formatPrice, formatModelRange, formatTopSpeed } from "@/lib/format";
import { buildWhatsAppLink, enquiryMessage } from "@/lib/whatsapp";
import { DISCLAIMERS, ROUTES } from "@/lib/constants";
import type { Model } from "@/content/schemas";

export interface ModelCardProps {
  model: Model;
  phone: string;
}

export function ModelCard({ model, phone }: ModelCardProps) {
  const photo = model.photos.length > 0 ? model.photos[0] : null;
  const whatsappUrl = buildWhatsAppLink(phone, enquiryMessage(model.name.en));
  const testRideUrl = `${ROUTES.TEST_RIDE}?model=${model.slug}`;
  const rangeText = formatModelRange(model);
  const speedText = formatTopSpeed(model.topSpeedKmh, model.topSpeedText);

  return (
    <div className="relative flex flex-col h-full rounded-lg border border-border-subtle bg-surface-white overflow-hidden shadow-sm hover:shadow-md hover:border-border-strong transition-all duration-normal group cursor-pointer focus-within:ring-2 focus-within:ring-brand-primary">
      {/* Image container: on hover the image transforms (lifts 4px, scales 1.03) */}
      <div className="relative aspect-[16/10] w-full bg-surface-grey overflow-hidden flex items-center justify-center p-4">
        {photo ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain transition-transform duration-slow group-hover:-translate-y-1 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-6 text-text-muted">
            <span className="text-xs font-semibold text-text-muted">Photo coming soon</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <div className="flex-1">
          <div className="text-xs font-semibold text-text-muted mb-1">{model.brand}</div>

          {/* Heading with stretched link over entire card */}
          <h3 className="text-xl font-bold text-text-heading group-hover:text-brand-primary transition-colors">
            <Link
              href={`${ROUTES.MODELS}/${model.slug}`}
              className="focus:outline-none after:absolute after:inset-0 after:z-10"
            >
              {model.name.en}
            </Link>
          </h3>

          {/* Specs: prices and range text never move */}
          <div className="grid grid-cols-2 gap-2 mt-4 py-3 border-y border-border-subtle text-xs text-text-muted tabular-nums">
            {rangeText && (
              <div>
                <span className="block text-[11px] text-text-muted">Claimed range</span>
                <span className="font-semibold text-brand-primary text-sm">
                  {rangeText.replace("Claimed range: ", "")}
                </span>
              </div>
            )}
            {speedText && (
              <div>
                <span className="block text-[11px] text-text-muted">Top speed</span>
                <span className="font-semibold text-text-heading text-sm">
                  {speedText.replace("Top speed: ", "")}
                </span>
              </div>
            )}
          </div>

          <div className="mt-4">
            <div className="text-xl sm:text-2xl font-bold text-text-heading tabular-nums">
              {formatPrice(model.priceExShowroom)}
            </div>
            <p className="text-[11px] text-text-muted mt-0.5">{DISCLAIMERS.EX_SHOWROOM}</p>
          </div>
        </div>

        {/* Action buttons sit above stretched link (z-20) */}
        <div className="relative z-20 grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-border-subtle">
          <Button href={whatsappUrl} isExternal variant="whatsapp" size="sm" fullWidth>
            WhatsApp
          </Button>
          <Button href={testRideUrl} variant="outline" size="sm" fullWidth>
            Test ride
          </Button>
        </div>
      </div>
    </div>
  );
}
