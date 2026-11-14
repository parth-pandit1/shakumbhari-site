"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui";
import { formatPrice, formatRange, formatTopSpeed } from "@/lib/format";
import { buildWhatsAppLink, enquiryMessage } from "@/lib/whatsapp";
import { DISCLAIMERS } from "@/lib/constants";
import type { Model } from "@/content/schemas";

interface CompareViewProps {
  models: Model[];
  phone: string;
}

export function CompareView({ models, phone }: CompareViewProps) {
  const searchParams = useSearchParams();

  const initialSlugs = useMemo(() => {
    const s1 = searchParams.get("model1");
    const s2 = searchParams.get("model2");
    const s3 = searchParams.get("model3");

    const initial = [s1, s2, s3].filter(
      (s): s is string => Boolean(s) && models.some((m) => m.slug === s)
    );

    if (initial.length > 0) {
      return initial.slice(0, 3);
    }
    return models.slice(0, 2).map((m) => m.slug);
  }, [searchParams, models]);

  const [selectedSlugs, setSelectedSlugs] = useState<string[]>(initialSlugs);

  const selectedModels = selectedSlugs
    .map((slug) => models.find((m) => m.slug === slug))
    .filter((m): m is Model => Boolean(m));

  const handleSelectSlot = (slotIndex: number, newSlug: string) => {
    const updated = [...selectedSlugs];
    if (newSlug === "none") {
      updated.splice(slotIndex, 1);
    } else {
      updated[slotIndex] = newSlug;
    }
    setSelectedSlugs(updated);
  };

  const addSlot = () => {
    if (selectedSlugs.length < 3) {
      const unused = models.find((m) => !selectedSlugs.includes(m.slug));
      if (unused) {
        setSelectedSlugs([...selectedSlugs, unused.slug]);
      }
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[0, 1, 2].map((slotIndex) => {
          const currentSlug = selectedSlugs[slotIndex] ?? "none";
          return (
            <div
              key={slotIndex}
              className="p-4 rounded-xl bg-surface-white border border-border-subtle shadow-xs"
            >
              <label
                htmlFor={`select-model-${slotIndex}`}
                className="block text-xs font-bold text-text-heading uppercase tracking-wider mb-2"
              >
                Model Slot {slotIndex + 1}
              </label>
              <select
                id={`select-model-${slotIndex}`}
                value={currentSlug}
                onChange={(e) => handleSelectSlot(slotIndex, e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-border-default bg-surface-white text-text-heading focus:border-brand-primary"
              >
                {slotIndex >= selectedSlugs.length && (
                  <option value="none">-- Select Model --</option>
                )}
                {models.map((m) => (
                  <option key={m.id} value={m.slug}>
                    {m.name.en}
                  </option>
                ))}
                {selectedSlugs.length > 1 && slotIndex < selectedSlugs.length && (
                  <option value="none">&times; Remove this slot</option>
                )}
              </select>
            </div>
          );
        })}
      </div>

      {selectedSlugs.length < 3 && (
        <div className="mb-8 text-center sm:text-left">
          <Button variant="outline" size="sm" onClick={addSlot}>
            + Add Another Model to Compare (Up to 3)
          </Button>
        </div>
      )}

      {selectedModels.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-border-subtle bg-surface-white shadow-sm">
          <table className="w-full border-collapse text-left text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-border-subtle bg-surface-grey">
                <th className="p-4 sm:p-5 w-44 font-bold text-text-heading">Feature / Spec</th>
                {selectedModels.map((m) => (
                  <th key={m.id} className="p-4 sm:p-5 font-bold text-text-heading">
                    <div className="text-base sm:text-lg mb-1">{m.name.en}</div>
                    <div className="text-xs text-text-muted font-normal">
                      {m.type} {m.isSample ? "&middot; Sample" : ""}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              <tr>
                <td className="p-4 sm:p-5 font-semibold text-text-muted bg-surface-grey/30">
                  Preview
                </td>
                {selectedModels.map((m) => (
                  <td key={m.id} className="p-4 sm:p-5">
                    <div className="relative aspect-[16/10] w-full max-w-[220px] rounded-lg overflow-hidden bg-surface-grey">
                      <Image
                        src={m.photos[0] ?? "/images/models/sample-model-a.webp"}
                        alt={m.name.en}
                        fill
                        className="object-cover"
                        sizes="220px"
                      />
                    </div>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 sm:p-5 font-semibold text-text-muted bg-surface-grey/30">
                  Ex-Showroom Price
                </td>
                {selectedModels.map((m) => (
                  <td key={m.id} className="p-4 sm:p-5">
                    <div className="text-xl font-extrabold text-text-heading">
                      {formatPrice(m.priceExShowroom)}
                    </div>
                    <div className="text-[11px] text-text-muted mt-0.5">
                      {DISCLAIMERS.EX_SHOWROOM}
                    </div>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 sm:p-5 font-semibold text-text-muted bg-surface-grey/30">
                  Claimed Range
                </td>
                {selectedModels.map((m) => (
                  <td key={m.id} className="p-4 sm:p-5 font-bold text-brand-primary">
                    {formatRange(m.claimedRangeKm) ?? "Call showroom"}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 sm:p-5 font-semibold text-text-muted bg-surface-grey/30">
                  Top Speed
                </td>
                {selectedModels.map((m) => (
                  <td key={m.id} className="p-4 sm:p-5 text-text-body font-medium">
                    {formatTopSpeed(m.topSpeedKmh) ?? "Call showroom"}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 sm:p-5 font-semibold text-text-muted bg-surface-grey/30">
                  Battery Type
                </td>
                {selectedModels.map((m) => (
                  <td key={m.id} className="p-4 sm:p-5 text-text-body">
                    {m.batteryType ?? "Call showroom"}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 sm:p-5 font-semibold text-text-muted bg-surface-grey/30">
                  Capacity
                </td>
                {selectedModels.map((m) => (
                  <td key={m.id} className="p-4 sm:p-5 text-text-body">
                    {m.batteryCapacity ?? "Call showroom"}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 sm:p-5 font-semibold text-text-muted bg-surface-grey/30">
                  Charging Duration
                </td>
                {selectedModels.map((m) => (
                  <td key={m.id} className="p-4 sm:p-5 text-text-body">
                    {m.chargingTime ?? "Standard socket"}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 sm:p-5 font-semibold text-text-muted bg-surface-grey/30">
                  Colours
                </td>
                {selectedModels.map((m) => (
                  <td key={m.id} className="p-4 sm:p-5 text-text-body">
                    {m.colours.join(", ") || "Standard shades"}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 sm:p-5 font-semibold text-text-muted bg-surface-grey/30">
                  Action
                </td>
                {selectedModels.map((m) => (
                  <td key={m.id} className="p-4 sm:p-5">
                    <Button
                      href={buildWhatsAppLink(phone, enquiryMessage(m.name.en))}
                      isExternal
                      variant="whatsapp"
                      size="sm"
                      fullWidth
                    >
                      Enquire on WA
                    </Button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-12 text-center bg-surface-white rounded-2xl border border-border-subtle">
          <p className="text-base text-text-heading font-semibold">
            Please select at least one model to compare.
          </p>
        </div>
      )}
    </div>
  );
}
