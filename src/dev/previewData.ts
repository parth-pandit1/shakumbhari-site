import type { Person, Customer } from "@/content/schemas";

/**
 * Preview data for design review only (Part 4).
 * Used ONLY when NEXT_PUBLIC_PREVIEW_SECTIONS === "true".
 * Every string contains "[PLACEHOLDER]" or "Sample".
 */
export const previewManager: Person = {
  name: "Sample Person [PLACEHOLDER]",
  role: "Showroom manager",
  photo: null,
  message: {
    en: "Welcome to our Ledi showroom. Inspect our electric scooters and discuss your daily commute requirements in person [PLACEHOLDER].",
  },
  consent: true,
  facts: [
    { label: "Showroom", value: "Chhachhrauli Road, Ledi" },
    { label: "Vehicles", value: "Electric two-wheelers" },
    { label: "Workshop", value: "Service & spare parts" },
  ],
};

export const previewCustomers: Customer[] = [
  {
    id: "sample-cust-1",
    firstName: "Sample Customer 1 [PLACEHOLDER]",
    vehicleModel: "EKOTEJAS Axel",
    image: {
      src: "/images/models/axel/axel-red.webp",
      alt: "Sample delivery photo with EKOTEJAS Axel [PLACEHOLDER]",
    },
    date: "2026-10",
    consent: true,
    quote: "Smooth riding on village roads and easy daily home charging [PLACEHOLDER].",
    quoteConsent: true,
  },
  {
    id: "sample-cust-2",
    firstName: "Sample Customer 2 [PLACEHOLDER]",
    vehicleModel: "EKOTEJAS Axel Pro",
    image: {
      src: "/images/models/axel-pro/axel-pro-red.webp",
      alt: "Sample delivery photo with EKOTEJAS Axel Pro [PLACEHOLDER]",
    },
    date: "2026-10",
    consent: true,
    quote: "Good ground clearance and quiet electric motor performance [PLACEHOLDER].",
    quoteConsent: true,
  },
  {
    id: "sample-cust-3",
    firstName: "Sample Customer 3 [PLACEHOLDER]",
    vehicleModel: "EKOTEJAS Era",
    image: {
      src: "/images/models/era/era-red.webp",
      alt: "Sample delivery photo with EKOTEJAS Era [PLACEHOLDER]",
    },
    date: "2026-11",
    consent: true,
    quote: "Comfortable seat and dependable daily commute [PLACEHOLDER].",
    quoteConsent: true,
  },
  {
    id: "sample-cust-4",
    firstName: "Sample Customer 4 [PLACEHOLDER]",
    vehicleModel: "EKOTEJAS EVXTRO",
    image: {
      src: "/images/models/evxtro/evxtro-white.webp",
      alt: "Sample delivery photo with EKOTEJAS EVXTRO [PLACEHOLDER]",
    },
    date: "2026-11",
    consent: true,
    quote: "Clear information at the showroom and quick delivery [PLACEHOLDER].",
    quoteConsent: true,
  },
];
