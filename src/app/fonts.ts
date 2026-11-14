import localFont from "next/font/local";

export const fontSans = localFont({
  src: "../../public/fonts/inter-latin-wght-normal.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
  preload: true,
});

export const fontDisplay = localFont({
  src: "../../public/fonts/plus-jakarta-sans-latin-wght-normal.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "500 800",
  preload: false,
});
