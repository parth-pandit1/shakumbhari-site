/**
 * Analytics wrapper.
 *
 * For v1, third-party analytics are skipped per privacy guidelines (Rule 9).
 * This no-op wrapper provides a stable call site for future privacy-preserving analytics.
 */

export type AnalyticsEventData = Record<string, string | number | boolean | null | undefined>;

export function trackEvent(_name: string, _data?: AnalyticsEventData): void {
  void _name;
  void _data;
}
