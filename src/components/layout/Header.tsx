"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui";
import { NAV_LINKS, ROUTES } from "@/lib/constants";

export interface HeaderProps {
  phone: string;
  shopName: string;
}

export function Header({ phone, shopName }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-normal ${
        isScrolled
          ? "h-14 sm:h-16 border-b border-border-subtle bg-surface-white/95 backdrop-blur-md shadow-xs"
          : "h-16 sm:h-20 border-b border-transparent bg-surface-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo & Name */}
        <Link
          href={ROUTES.HOME}
          className="flex items-center gap-2.5 focus-visible:outline-offset-4 rounded-md group"
        >
          <div className="relative h-9 w-14 sm:h-11 sm:w-16 flex items-center justify-center overflow-hidden">
            <Image
              src="/images/logo-temp.webp"
              alt={`${shopName} logo`}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 640px) 56px, 64px"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-text-heading group-hover:text-brand-primary transition-colors leading-tight">
              Shakumbhari
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-text-muted uppercase leading-tight">
              Automobile
            </span>
          </div>
        </Link>

        {/* Desktop Navigation with animated link underline */}
        <nav className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative py-1 text-sm font-semibold text-text-body hover:text-text-heading transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-brand-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-normal after:origin-left"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA actions */}
        <div className="hidden sm:flex items-center gap-2.5">
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
            Call
          </Button>

          <Button href={ROUTES.TEST_RIDE} variant="primary" size="sm">
            Book a test ride
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-md text-text-heading hover:bg-surface-grey transition-colors focus-visible:outline-brand-primary"
          >
            {mobileMenuOpen ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
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

      {/* Mobile Drawer with staggered links */}
      {mobileMenuOpen && (
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="lg:hidden border-b border-border-subtle bg-surface-white px-5 py-6 shadow-lg"
        >
          <nav className="flex flex-col space-y-2 text-left">
            {NAV_LINKS.map((link, idx) => (
              <motion.div
                key={link.href}
                initial={shouldReduceMotion ? false : { x: -8 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.04 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-bold text-text-heading hover:bg-surface-grey transition-colors"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div className="pt-4 border-t border-border-subtle flex flex-col gap-2.5">
              <Button
                href={ROUTES.TEST_RIDE}
                variant="primary"
                fullWidth
                size="md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Book a test ride
              </Button>
              <Button
                href={`tel:${phone}`}
                variant="outline"
                fullWidth
                size="md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Call
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
