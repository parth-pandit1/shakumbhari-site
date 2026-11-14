/**
 * Formatting utilities for prices and specs.
 */

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
 * Returns null when range is null (UI should hide it).
 */
export function formatRange(rangeKm: number | null): string | null {
  if (rangeKm === null) {
    return null;
  }
  return `Claimed range: ${rangeKm} km`;
}

/**
 * Format top speed with unit.
 * Returns null when speed is null.
 */
export function formatTopSpeed(speedKmh: number | null): string | null {
  if (speedKmh === null) {
    return null;
  }
  return `Top speed: ${speedKmh} km/h`;
}
