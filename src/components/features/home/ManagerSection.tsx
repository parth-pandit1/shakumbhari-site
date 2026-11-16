"use client";

import { useState, useRef, type MouseEvent } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Container, Section, Button } from "@/components/ui";
import type { Person, Site } from "@/content/schemas";
import { previewManager } from "@/dev/previewData";
import { buildWhatsAppLink, enquiryMessage } from "@/lib/whatsapp";

export interface ManagerSectionProps {
  person: Person | null;
  site: Site;
}

export function ManagerSection({ person, site }: ManagerSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const isPreview = process.env.NEXT_PUBLIC_PREVIEW_SECTIONS === "true";
  const activePerson = isPreview ? previewManager : person;
  const showManager = Boolean(activePerson && activePerson.consent && activePerson.name);

  const phone = site.phone;
  const whatsappNumber = site.whatsappNumber ?? site.phone;
  const whatsappUrl = buildWhatsAppLink(
    whatsappNumber,
    enquiryMessage("Hi, I want to speak with the showroom manager.")
  );

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

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Mild 3D tilt: max ~6 degrees
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;
    setTilt({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <Section variant="white" id="manager" className="relative overflow-hidden py-16 sm:py-20">
      <Container size="lg">
        {isPreview && (
          <div className="mb-6 flex justify-start">
            <span className="inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
              Preview data
            </span>
          </div>
        )}

        {showManager && activePerson ? (
          /* Scenario A: Consented manager portrait and direct contact */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left: Portrait in framed container with offset red diagonal shape */}
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={prefersReducedMotion ? false : { opacity: 0, x: -30 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                perspective: 1000,
                transform: prefersReducedMotion
                  ? "none"
                  : `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                transition: "transform 0.15s ease-out",
              }}
              className="relative w-full max-w-md mx-auto lg:max-w-none lg:col-span-5 aspect-4/5 sm:aspect-square lg:aspect-4/5 select-none"
            >
              {/* Offset red diagonal decorative shape behind frame */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 rounded-2xl bg-brand-primary sign-stripe-subtle opacity-90"
                style={{
                  clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
                }}
              />

              {/* Portrait frame */}
              <div className="relative h-full w-full rounded-2xl bg-surface-dark border border-border-strong overflow-hidden shadow-xl flex items-center justify-center">
                {activePerson.photo ? (
                  <Image
                    src={activePerson.photo}
                    alt={activePerson.name ?? "Showroom manager"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-center text-text-light">
                    <div className="w-20 h-20 rounded-full bg-brand-primary/20 border-2 border-brand-primary flex items-center justify-center mb-4">
                      <span className="text-2xl font-black text-brand-primary">SA</span>
                    </div>
                    <p className="text-base font-bold text-white">Shakumbhari Automobile</p>
                    <p className="text-xs text-text-light/70 mt-1">Ledi Showroom</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Right: Role, name, message pull-quote, facts, contact */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col justify-center text-left"
            >
              {activePerson.role && (
                <p className="text-xs sm:text-sm font-bold tracking-wider uppercase text-brand-primary mb-1">
                  {activePerson.role}
                </p>
              )}

              <h2 className="text-3xl sm:text-4xl font-extrabold text-text-heading tracking-tight mb-4">
                {activePerson.name}
              </h2>

              {activePerson.message?.en && (
                <blockquote className="border-l-4 border-brand-primary pl-4 py-1.5 my-3 text-base sm:text-lg text-text-body italic bg-surface-grey/50 rounded-r-lg">
                  &ldquo;{activePerson.message.en}&rdquo;
                </blockquote>
              )}

              {activePerson.facts && activePerson.facts.length > 0 && (
                <div className="my-5 grid grid-cols-2 sm:grid-cols-3 gap-3 border-y border-border-subtle py-4">
                  {activePerson.facts.map((fact, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-xs font-medium text-text-muted">{fact.label}</span>
                      <span className="text-sm font-bold text-text-heading mt-0.5">
                        {fact.value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 pt-2">
                <p className="text-sm font-medium text-text-muted mb-3">Call or message directly</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant="primary"
                    size="md"
                    href={`tel:${phone}`}
                    className="min-w-[130px]"
                  >
                    Call {phone}
                  </Button>
                  <Button
                    variant="whatsapp"
                    size="md"
                    href={whatsappUrl}
                    isExternal
                    className="min-w-[140px]"
                  >
                    WhatsApp
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          /* Scenario B: Fallback "Talk to us" when consent is false or person is null */
          <div className="relative max-w-3xl mx-auto">
            {/* Offset red diagonal decorative shape behind container */}
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 rounded-2xl bg-brand-primary sign-stripe-subtle opacity-90"
              style={{
                clipPath: "polygon(6% 0%, 100% 0%, 94% 100%, 0% 100%)",
              }}
            />

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative rounded-2xl bg-surface-white border border-border-default shadow-xl p-6 sm:p-10"
            >
              <div className="text-left mb-6 pb-4 border-b border-border-subtle">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-text-heading tracking-tight">
                  Talk to us
                </h2>
                <p className="text-sm text-text-muted mt-1">
                  Visit our showroom or reach us directly with any questions about electric
                  two-wheelers.
                </p>
              </div>

              <div className="space-y-3">
                {/* Phone row */}
                <a
                  href={`tel:${phone}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-border-subtle bg-surface-grey hover:border-brand-primary hover:bg-white transition-colors duration-fast group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                        Phone
                      </p>
                      <p className="text-base font-bold text-text-heading group-hover:text-brand-primary transition-colors">
                        {phone}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-brand-primary">&rarr;</span>
                </a>

                {/* WhatsApp row */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-xl border border-border-subtle bg-surface-grey hover:border-whatsapp hover:bg-white transition-colors duration-fast group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-whatsapp/20 text-whatsapp-text flex items-center justify-center shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                        WhatsApp
                      </p>
                      <p className="text-base font-bold text-text-heading group-hover:text-[#128C7E] transition-colors">
                        Message us on WhatsApp
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-whatsapp-text">&rarr;</span>
                </a>

                {/* Shop address row */}
                <div className="flex items-center justify-between p-4 rounded-xl border border-border-subtle bg-surface-grey">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-surface-white border border-border-subtle text-text-heading flex items-center justify-center shrink-0">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                        Address
                      </p>
                      <p className="text-sm font-bold text-text-heading">{addressText}</p>
                    </div>
                  </div>
                </div>

                {/* Get directions row */}
                {site.mapsLink && (
                  <a
                    href={site.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl border border-border-subtle bg-surface-grey hover:border-brand-primary hover:bg-white transition-colors duration-fast group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="3 11 22 2 13 21 11 13 3 11" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                          Navigation
                        </p>
                        <p className="text-base font-bold text-text-heading group-hover:text-brand-primary transition-colors">
                          Get directions on Google Maps
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-brand-primary">&rarr;</span>
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </Container>
    </Section>
  );
}
