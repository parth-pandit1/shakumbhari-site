"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

interface HeaderProps {
  phone: string;
  shopName: string;
}

export function Header({ phone, shopName }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/models", label: "Models" },
    { href: "/compare", label: "Compare" },
    { href: "/emi", label: "EMI" },
    { href: "/running-cost", label: "Running Cost" },
    { href: "/service", label: "Service" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-surface-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <Link
          href="/"
          className="flex items-center gap-3 focus-visible:outline-offset-4 rounded-lg group"
        >
          <div className="relative h-10 w-16 sm:h-12 sm:w-20 flex items-center justify-center overflow-hidden">
            <Image
              src="/images/logo-temp.webp"
              alt={`${shopName} logo`}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 640px) 64px, 80px"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm sm:text-base tracking-tight text-text-heading group-hover:text-brand-primary transition-colors leading-tight">
              Shakumbhari
            </span>
            <span className="text-[11px] font-semibold tracking-wider text-text-muted uppercase leading-tight">
              Automobile
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-text-body hover:text-brand-primary transition-colors py-1"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA actions */}
        <div className="hidden sm:flex items-center gap-3">
          <Button
            href={`tel:${phone}`}
            variant="outline"
            size="sm"
            className="hidden md:inline-flex"
          >
            <svg
              className="mr-1.5 h-4 w-4 text-brand-primary"
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
            Call {phone}
          </Button>

          <Button href="/test-ride" variant="primary" size="sm">
            Book Test Ride
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button
            href={`tel:${phone}`}
            variant="outline"
            size="sm"
            className="sm:hidden px-2.5 py-1 text-xs"
            aria-label={`Call ${phone}`}
          >
            <svg
              className="h-4 w-4 text-brand-primary"
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
            <span className="sr-only sm:not-sr-only ml-1">Call</span>
          </Button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg text-text-heading hover:bg-surface-grey transition-colors"
          >
            {mobileMenuOpen ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border-subtle bg-surface-white px-4 py-6 shadow-xl animate-in slide-in-from-top-2 duration-fast">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-semibold text-text-heading hover:bg-surface-grey transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-border-subtle flex flex-col gap-2.5">
              <Button
                href="/test-ride"
                variant="primary"
                fullWidth
                onClick={() => setMobileMenuOpen(false)}
              >
                Book Test Ride
              </Button>
              <Button
                href="/exchange"
                variant="outline"
                fullWidth
                onClick={() => setMobileMenuOpen(false)}
              >
                Old Scooter Exchange
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
