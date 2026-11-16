"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ModelVariant } from "@/content/schemas";

export interface VariantRangeTableProps {
  variants: ModelVariant[];
}

export function VariantRangeTable({ variants }: VariantRangeTableProps) {
  const shouldReduceMotion = useReducedMotion();

  // Find max range among variants to scale bars proportionally (minimum baseline 120km)
  const maxRangeAcrossVariants = Math.max(...variants.map((v) => v.claimedRangeKmMax), 100);

  return (
    <div className="overflow-x-auto rounded-lg border border-border-subtle bg-surface-white">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-border-subtle bg-surface-grey font-bold text-text-heading">
            <th className="py-3 px-4 sm:px-6">Variant</th>
            <th className="py-3 px-4 sm:px-6">Battery</th>
            <th className="py-3 px-4 sm:px-6">Voltage & Capacity</th>
            <th className="py-3 px-4 sm:px-6 min-w-[220px]">Claimed Range</th>
            <th className="py-3 px-4 sm:px-6">Availability</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((v, i) => {
            const ratio = Math.min(Math.max(v.claimedRangeKmMax / maxRangeAcrossVariants, 0.15), 1);

            return (
              <tr
                key={i}
                className="border-b border-border-subtle last:border-b-0 hover:bg-surface-grey/40 transition-colors"
              >
                <td className="py-3.5 px-4 sm:px-6 font-semibold text-text-heading">{v.label}</td>
                <td className="py-3.5 px-4 sm:px-6 text-text-body">{v.batteryType}</td>
                <td className="py-3.5 px-4 sm:px-6 text-text-body">
                  {v.voltageV}V, {v.capacityAh}Ah
                </td>
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-baseline justify-between text-xs sm:text-sm font-bold text-text-heading">
                      <span className="text-brand-primary tabular-nums">
                        {v.claimedRangeKmMin} to {v.claimedRangeKmMax} km
                      </span>
                    </div>
                    {/* Visual range bar that grows via scaleX */}
                    <div
                      className="h-2 w-full max-w-[180px] bg-border-subtle/60 rounded-sm overflow-hidden"
                      aria-hidden="true"
                    >
                      <motion.div
                        className="h-full bg-brand-primary rounded-sm origin-left"
                        initial={shouldReduceMotion ? { scaleX: ratio } : { scaleX: 0 }}
                        whileInView={{ scaleX: ratio }}
                        viewport={{ once: true }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 0.6,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        style={{ transformOrigin: "left" }}
                      />
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 sm:px-6 text-xs">
                  {v.offered ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded font-semibold bg-success-bg text-success-text">
                      Offered
                    </span>
                  ) : (
                    <span className="text-text-muted">Optional</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
