"use client";

import { useState, useRef, useEffect, type TouchEvent, type KeyboardEvent } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container, Section, Button, Modal } from "@/components/ui";
import type { Customer } from "@/content/schemas";
import { previewCustomers } from "@/dev/previewData";
import { buildWhatsAppLink } from "@/lib/whatsapp";

export interface CustomersSectionProps {
  customers: Customer[];
  googleReviewsUrl?: string | null;
  whatsappNumber: string;
}

function formatMonthYear(dateStr: string): string {
  const parts = dateStr.split("-");
  if (parts.length < 2) return dateStr;
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIdx = parseInt(parts[1], 10) - 1;
  const year = parts[0];
  if (monthIdx >= 0 && monthIdx < 12) {
    return `${monthNames[monthIdx]} ${year}`;
  }
  return dateStr;
}

export function CustomersSection({
  customers,
  googleReviewsUrl,
  whatsappNumber,
}: CustomersSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const isPreview = process.env.NEXT_PUBLIC_PREVIEW_SECTIONS === "true";

  // When preview mode is on, use preview data. Otherwise filter only consented customers.
  const sourceList = isPreview ? previewCustomers : customers;
  const activeCustomers = sourceList.filter((c) => c.consent);

  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setLightboxIndex((idx) => (idx !== null && idx > 0 ? idx - 1 : activeCustomers.length - 1));
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((idx) => (idx !== null && idx < activeCustomers.length - 1 ? idx + 1 : 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, activeCustomers.length]);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null || lightboxIndex === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      // Swiped left -> next
      setLightboxIndex((idx) => (idx !== null && idx < activeCustomers.length - 1 ? idx + 1 : 0));
    } else if (diff < -50) {
      // Swiped right -> prev
      setLightboxIndex((idx) => (idx !== null && idx > 0 ? idx - 1 : activeCustomers.length - 1));
    }
    touchStartX.current = null;
  };

  const scrollStrip = (direction: "left" | "right") => {
    if (!stripRef.current) return;
    const offset = direction === "left" ? -320 : 320;
    stripRef.current.scrollBy({ left: offset, behavior: prefersReducedMotion ? "auto" : "smooth" });
  };

  const currentLightboxItem = lightboxIndex !== null ? activeCustomers[lightboxIndex] : null;

  const emptyStateConsentMessage =
    "Hi, I bought a scooter from Shakumbhari Automobile. I am happy for my photo and first name to be shown on your website.";
  const emptyStateWhatsappUrl = buildWhatsAppLink(whatsappNumber, emptyStateConsentMessage);

  return (
    <Section variant="grey" id="customers" className="py-16 sm:py-20">
      <Container size="lg">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 text-left">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text-heading tracking-tight">
                Happy Customers
              </h2>
              {isPreview && (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                  Preview data
                </span>
              )}
            </div>
            <p className="text-sm text-text-muted">
              Recent deliveries from our showroom on Chhachhrauli Road.
            </p>
          </div>

          {googleReviewsUrl && (
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-xs sm:text-sm font-bold text-brand-primary hover:underline self-start sm:self-end"
            >
              Read reviews on Google &rarr;
            </a>
          )}
        </div>

        {/* Condition 1: EMPTY STATE (no consented entries) */}
        {activeCustomers.length === 0 ? (
          <div className="max-w-xl mx-auto rounded-2xl bg-surface-white border border-border-default p-8 sm:p-10 text-center shadow-xs">
            <div className="w-14 h-14 rounded-full bg-brand-primary/10 text-brand-primary mx-auto flex items-center justify-center mb-4">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-text-heading">
              Bought a scooter from us?
            </h3>
            <p className="mt-2 text-sm sm:text-base text-text-muted">
              Send us your delivery photo on WhatsApp
            </p>
            <div className="mt-6 flex justify-center">
              <Button
                variant="whatsapp"
                size="md"
                href={emptyStateWhatsappUrl}
                isExternal
                className="font-bold"
              >
                Send photo on WhatsApp
              </Button>
            </div>
          </div>
        ) : activeCustomers.length <= 2 ? (
          /* Condition 2: 1 or 2 entries: simple centred grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {activeCustomers.map((cust, idx) => (
              <motion.div
                key={cust.id}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
                whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                tabIndex={0}
                role="button"
                aria-label={`View photo of ${cust.firstName} with ${cust.vehicleModel}`}
                onClick={() => setLightboxIndex(idx)}
                onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLightboxIndex(idx);
                  }
                }}
                className="group cursor-pointer rounded-xl bg-surface-white border border-border-default overflow-hidden shadow-xs hover:border-brand-primary transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-brand-primary"
                style={{
                  transform: prefersReducedMotion ? "none" : undefined,
                }}
              >
                <div className="relative aspect-4/3 w-full bg-surface-dark overflow-hidden">
                  <Image
                    src={cust.image.src}
                    alt={cust.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 400px"
                    className={`object-cover transition-transform duration-fast ${
                      prefersReducedMotion ? "" : "group-hover:scale-[1.03]"
                    }`}
                  />
                </div>
                <div className="p-4 text-left">
                  <h4 className="font-bold text-text-heading text-base group-hover:text-brand-primary transition-colors">
                    {cust.firstName} with {cust.vehicleModel}
                  </h4>
                  <p className="text-xs text-text-muted mt-1">{formatMonthYear(cust.date)}</p>
                  {cust.quoteConsent && cust.quote && (
                    <p className="mt-2 text-xs italic text-text-body line-clamp-2">
                      &ldquo;{cust.quote}&rdquo;
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Condition 3: > 2 entries: first entry large featured card, rest in scroll-snap strip */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Featured Card (First Entry) */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              tabIndex={0}
              role="button"
              aria-label={`View photo of ${activeCustomers[0].firstName} with ${activeCustomers[0].vehicleModel}`}
              onClick={() => setLightboxIndex(0)}
              onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setLightboxIndex(0);
                }
              }}
              className="lg:col-span-5 group cursor-pointer rounded-2xl bg-surface-white border border-border-default overflow-hidden shadow-xs hover:border-brand-primary hover:-translate-y-1 transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-brand-primary text-left"
            >
              <div className="relative aspect-4/3 sm:aspect-16/10 lg:aspect-4/3 w-full bg-surface-dark overflow-hidden">
                <Image
                  src={activeCustomers[0].image.src}
                  alt={activeCustomers[0].image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className={`object-cover transition-transform duration-fast ${
                    prefersReducedMotion ? "" : "group-hover:scale-[1.03]"
                  }`}
                />
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary mb-1">
                  Recent Delivery
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-text-heading group-hover:text-brand-primary transition-colors">
                  {activeCustomers[0].firstName} with {activeCustomers[0].vehicleModel}
                </h3>
                <p className="text-xs text-text-muted mt-1">
                  {formatMonthYear(activeCustomers[0].date)}
                </p>
                {activeCustomers[0].quoteConsent && activeCustomers[0].quote && (
                  <blockquote className="mt-3 text-sm italic text-text-body border-l-2 border-brand-primary pl-3 py-0.5">
                    &ldquo;{activeCustomers[0].quote}&rdquo;
                  </blockquote>
                )}
              </div>
            </motion.div>

            {/* Remaining entries in horizontal scroll-snap strip */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              {/* Previous / Next Controls Header */}
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  More Deliveries ({activeCustomers.length - 1})
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollStrip("left")}
                    aria-label="Scroll deliveries left"
                    className="p-2 rounded-lg border border-border-default bg-surface-white hover:bg-surface-grey text-text-heading transition-colors"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollStrip("right")}
                    aria-label="Scroll deliveries right"
                    className="p-2 rounded-lg border border-border-default bg-surface-white hover:bg-surface-grey text-text-heading transition-colors"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Scroll Strip */}
              <div
                ref={stripRef}
                tabIndex={0}
                aria-label="Deliveries scroll strip"
                className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 pt-1 focus:outline-none focus:ring-1 focus:ring-brand-primary rounded-xl"
              >
                {activeCustomers.slice(1).map((cust, sliceIdx) => {
                  const actualIdx = sliceIdx + 1;
                  return (
                    <motion.div
                      key={cust.id}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 15 }}
                      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: actualIdx * 0.08 }}
                      tabIndex={0}
                      role="button"
                      aria-label={`View photo of ${cust.firstName} with ${cust.vehicleModel}`}
                      onClick={() => setLightboxIndex(actualIdx)}
                      onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setLightboxIndex(actualIdx);
                        }
                      }}
                      className="snap-start shrink-0 w-[260px] sm:w-[280px] group cursor-pointer rounded-xl bg-surface-white border border-border-default overflow-hidden shadow-xs hover:border-brand-primary hover:-translate-y-1 transition-all duration-fast focus:outline-none focus:ring-2 focus:ring-brand-primary text-left"
                    >
                      <div className="relative aspect-4/3 w-full bg-surface-dark overflow-hidden">
                        <Image
                          src={cust.image.src}
                          alt={cust.image.alt}
                          fill
                          sizes="280px"
                          className={`object-cover transition-transform duration-fast ${
                            prefersReducedMotion ? "" : "group-hover:scale-[1.03]"
                          }`}
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-text-heading text-sm sm:text-base group-hover:text-brand-primary transition-colors line-clamp-1">
                          {cust.firstName} with {cust.vehicleModel}
                        </h4>
                        <p className="text-xs text-text-muted mt-0.5">
                          {formatMonthYear(cust.date)}
                        </p>
                        {cust.quoteConsent && cust.quote && (
                          <p className="mt-2 text-xs italic text-text-body line-clamp-2">
                            &ldquo;{cust.quote}&rdquo;
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        {currentLightboxItem && (
          <Modal
            isOpen={lightboxIndex !== null}
            onClose={() => setLightboxIndex(null)}
            title={`${currentLightboxItem.firstName} with ${currentLightboxItem.vehicleModel}`}
            maxWidth="lg"
          >
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="flex flex-col text-left"
            >
              {/* Photo */}
              <div className="relative w-full aspect-4/3 sm:aspect-16/10 rounded-lg overflow-hidden bg-surface-dark mb-4">
                <Image
                  src={currentLightboxItem.image.src}
                  alt={currentLightboxItem.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  className="object-contain"
                />
              </div>

              {/* Caption and Date */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle pb-3">
                <p className="text-sm font-semibold text-text-heading">
                  {currentLightboxItem.firstName} with {currentLightboxItem.vehicleModel}
                </p>
                <p className="text-xs text-text-muted">
                  Delivered {formatMonthYear(currentLightboxItem.date)}
                </p>
              </div>

              {/* Quote if consented */}
              {currentLightboxItem.quoteConsent && currentLightboxItem.quote && (
                <blockquote className="mt-4 p-3 rounded-lg bg-surface-grey border-l-4 border-brand-primary text-sm text-text-body italic">
                  &ldquo;{currentLightboxItem.quote}&rdquo;
                </blockquote>
              )}

              {/* Previous / Next buttons inside lightbox */}
              {activeCustomers.length > 1 && (
                <div className="mt-5 pt-3 border-t border-border-subtle flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((idx) =>
                        idx !== null && idx > 0 ? idx - 1 : activeCustomers.length - 1
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-border-default hover:bg-surface-grey text-text-heading transition-colors"
                  >
                    &larr; Previous photo
                  </button>
                  <span className="text-xs text-text-muted">
                    {(lightboxIndex ?? 0) + 1} of {activeCustomers.length}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((idx) =>
                        idx !== null && idx < activeCustomers.length - 1 ? idx + 1 : 0
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md border border-border-default hover:bg-surface-grey text-text-heading transition-colors"
                  >
                    Next photo &rarr;
                  </button>
                </div>
              )}
            </div>
          </Modal>
        )}
      </Container>
    </Section>
  );
}
