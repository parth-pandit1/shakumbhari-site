/**
 * Formatting utilities for prices and specs.
 */

import type { Model } from "@/content/schemas";

/**
 * Format a price in Indian Rupees with proper grouping (e.g. ₹99,999).
 * Returns "Call for price" when price is null.
 */
export function formatPrice(price: number | null): string {
  if (price === null) {
    return "Call for price";
  }
  return `₹${price.toLocaleString("en-IN")}`;
}

/**
 * Format claimed range with unit.
 * Supports single number or min to max range.
 * Returns null when range is null (UI should hide/soften it).
 */
export function formatRange(minOrSingle: number | null, max?: number | null): string | null {
  if (minOrSingle === null) {
    return null;
  }
  if (max !== undefined && max !== null && max !== minOrSingle) {
    return `Claimed range: ${minOrSingle} to ${max} km`;
  }
  return `Claimed range: ${minOrSingle} km`;
}

/**
 * Extract the minimum and maximum claimed range across offered variants.
 */
export function getModelRange(model: Pick<Model, "variants" | "claimedRangeKm">): {
  min: number | null;
  max: number | null;
} {
  const offered = model.variants?.filter((v) => v.offered) ?? [];
  if (offered.length > 0) {
    const mins = offered.map((v) => v.claimedRangeKmMin);
    const maxs = offered.map((v) => v.claimedRangeKmMax);
    return {
      min: Math.min(...mins),
      max: Math.max(...maxs),
    };
  }
  if (model.claimedRangeKm !== null && model.claimedRangeKm !== undefined) {
    return { min: model.claimedRangeKm, max: model.claimedRangeKm };
  }
  return { min: null, max: null };
}

/**
 * Formats model claimed range as "Claimed range: X to Y km" across offered variants.
 */
export function formatModelRange(model: Pick<Model, "variants" | "claimedRangeKm">): string | null {
  const { min, max } = getModelRange(model);
  return formatRange(min, max);
}

/**
 * Format top speed with unit.
 * Accepts optional text override (e.g. "25 km/h, 3 speed modes").
 * Returns null when speed is null.
 */
export function formatTopSpeed(speedKmh: number | null, speedText?: string | null): string | null {
  if (speedText) {
    return `Top speed: ${speedText}`;
  }
  if (speedKmh === null) {
    return null;
  }
  return `Top speed: ${speedKmh} km/h`;
}
