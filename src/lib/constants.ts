/**
 * Application constants, routes, navigation, and disclaimers.
 * Centralized single source of truth for magic strings and numbers.
 */

export const ROUTES = {
  HOME: "/",
  MODELS: "/models",
  COMPARE: "/compare",
  EMI: "/emi",
  RUNNING_COST: "/running-cost",
  SERVICE: "/service",
  TEST_RIDE: "/test-ride",
  EXCHANGE: "/exchange",
  PRIVACY: "/privacy",
  STYLE_GUIDE: "/style-guide",
} as const;

export const NAV_LINKS = [
  { href: ROUTES.HOME, label: "Home" },
  { href: ROUTES.MODELS, label: "Models" },
  { href: ROUTES.COMPARE, label: "Compare" },
  { href: ROUTES.EMI, label: "EMI" },
  { href: ROUTES.RUNNING_COST, label: "Running Cost" },
  { href: ROUTES.SERVICE, label: "Service" },
] as const;

export const DISCLAIMERS = {
  EX_SHOWROOM: "Ex-showroom, call for latest price",
  EX_SHOWROOM_LONG:
    "Call or WhatsApp for on-road pricing, regional registration estimates, and current availability in Ledi.",
  FINANCE:
    "Indicative only; actual terms depend on the financier. Loan approval, interest rates, down payment, and processing fees are determined by participating financial institutions.",
  RUNNING_COST:
    "These figures are indicative estimates based on typical driving patterns and electricity tariffs in Haryana. Actual costs depend on your driving style, battery health, and domestic power rates.",
  SPECS:
    "Specifications and ranges are based on manufacturer claimed figures under standard testing conditions. Real-world performance depends on riding conditions, load, and battery maintenance.",
} as const;

export const DEFAULT_EMI = {
  PRICE: 80000,
  DOWN_PAYMENT_RATIO: 0.25,
  INTEREST_RATE: 11.5,
  TENURE_MONTHS: 24,
  MIN_PRICE: 40000,
  MAX_PRICE: 150000,
  PRICE_STEP: 2000,
  MIN_DOWN_PAYMENT: 5000,
  DOWN_PAYMENT_STEP: 1000,
  MIN_RATE: 8,
  MAX_RATE: 18,
  RATE_STEP: 0.5,
  TENURES: [12, 24, 36, 48] as const,
} as const;

export const DEFAULT_RUNNING_COST = {
  DAILY_KM: 30,
  PETROL_PRICE: 96,
  PETROL_MILEAGE: 45,
  ELECTRICITY_RATE: 7.5,
  EV_UNITS_PER_100KM: 3.0,
} as const;
