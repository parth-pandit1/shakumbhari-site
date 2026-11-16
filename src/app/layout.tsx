import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontSans, fontDisplay } from "./fonts";
import "./globals.css";
import { getSite, getOffers } from "@/lib/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { OffersBanner } from "@/components/layout/OffersBanner";

const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://shakumbhariauto.in";

export const metadata: Metadata = {
  title: {
    default: "Shakumbhari Automobile: Electric Scooters & Service in Ledi",
    template: "%s | Shakumbhari Automobile",
  },
  description:
    "Shakumbhari Automobile: Electric scooter showroom, service and spare parts in Chhachhrauli Road, Ledi, Haryana.",
  robots: allowIndexing ? { index: true, follow: true } : { index: false, follow: false },
  ...(allowIndexing && {
    metadataBase: new URL(siteUrl),
  }),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const site = getSite();
  const offers = getOffers();

  // LocalBusiness JSON-LD: emitted ONLY when indexing is allowed.
  // Null fields (city, district, state, pincode, mapsLink) are omitted intentionally.
  const jsonLd = allowIndexing
    ? {
        "@context": "https://schema.org",
        "@type": "AutoDealer",
        name: site.shopName.en,
        description: site.tagline.en,
        telephone: `+91${site.phone}`,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.line1,
          addressLocality: site.address.area,
          addressRegion: site.address.state ?? "Haryana",
          addressCountry: "IN",
          ...(site.address.pincode && { postalCode: site.address.pincode }),
        },
        ...(site.mapsLink && { hasMap: site.mapsLink }),
      }
    : null;

  return (
    <html lang="en" className={`${fontSans.variable} ${fontDisplay.variable}`}>
      <body className="min-h-screen bg-surface-white text-text-body antialiased flex flex-col">
        {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
        <OffersBanner offers={offers} />
        <Header phone={site.phone} shopName={site.shopName.en} />
        <main className="flex-1 pb-16 sm:pb-0">{children}</main>
        <Footer site={site} />
        <MobileStickyBar phone={site.phone} whatsappNumber={site.whatsappNumber} />
      </body>
    </html>
  );
}
