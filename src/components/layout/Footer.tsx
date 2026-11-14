import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { Site } from "@/content/schemas";

interface FooterProps {
  site: Site;
}

export function Footer({ site }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const addressText = [
    site.address.line1,
    site.address.area,
    site.address.city,
    site.address.district,
    site.address.state,
    site.address.pincode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <footer className="border-t border-border-subtle bg-surface-dark text-white pt-14 pb-24 sm:pb-14">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-display font-bold text-xl sm:text-2xl text-white">
                {site.shopName.en}
              </span>
            </div>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed mb-4">
              {site.tagline.en} Specializing in electric two-wheelers, scheduled
              maintenance, and spare parts in Ledi, Haryana.
            </p>
            <div className="flex flex-col gap-1 text-sm text-zinc-300">
              <div className="flex items-start gap-2">
                <svg
                  className="h-4 w-4 text-brand-border shrink-0 mt-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{addressText}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <svg
                  className="h-4 w-4 text-brand-border shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <a
                  href={`tel:${site.phone}`}
                  className="hover:text-white transition-colors"
                >
                  +91 {site.phone}
                </a>
              </div>
            </div>

            {/* GSTIN: Rendered ONLY when present */}
            {site.gstin && (
              <div className="mt-4 inline-block text-xs text-zinc-400 border border-white/10 px-2.5 py-1 rounded">
                GSTIN: <span className="font-mono text-zinc-200">{site.gstin}</span>
              </div>
            )}
          </div>

          {/* Col 2: Showroom & Models */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <Link href="/models" className="hover:text-white transition-colors">
                  All EV Models
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white transition-colors">
                  Compare Models
                </Link>
              </li>
              <li>
                <Link href="/test-ride" className="hover:text-white transition-colors">
                  Book a Test Ride
                </Link>
              </li>
              <li>
                <Link href="/exchange" className="hover:text-white transition-colors">
                  Old Vehicle Exchange
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Tools & Services */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">
              Tools & Support
            </h3>
            <ul className="space-y-2.5 text-sm text-zinc-400">
              <li>
                <Link href="/emi" className="hover:text-white transition-colors">
                  EMI Calculator
                </Link>
              </li>
              <li>
                <Link href="/running-cost" className="hover:text-white transition-colors">
                  Petrol vs EV Savings
                </Link>
              </li>
              <li>
                <Link href="/service" className="hover:text-white transition-colors">
                  Service & Maintenance
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            &copy; {currentYear} {site.shopName.en}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-300 transition-colors">
              Privacy Notice
            </Link>
            <Link href="/style-guide" className="hover:text-zinc-300 transition-colors">
              Design System
            </Link>
            {site.mapsLink && (
              <a
                href={site.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-300 transition-colors"
              >
                Google Maps &rarr;
              </a>
            )}
          </div>
        </div>
      </Container>
    </footer>
  );
}
