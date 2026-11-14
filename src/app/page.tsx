import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { LocationMap } from "@/components/common/LocationMap";
import { FeaturedModelsCarousel } from "@/components/home/FeaturedModelsCarousel";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import {
  getSite,
  getFeaturedModels,
  getServices,
  getFaqs,
  getCustomers,
  getPerson,
} from "@/lib/content";
import { buildWhatsAppLink, enquiryMessage, serviceMessage } from "@/lib/whatsapp";

export default function HomePage() {
  const site = getSite();
  const featuredModels = getFeaturedModels();
  const services = getServices();
  const faqs = getFaqs();
  const customers = getCustomers();
  const person = getPerson();

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

  const generalWhatsappUrl = buildWhatsAppLink(
    site.whatsappNumber || site.phone,
    enquiryMessage()
  );

  const faqAccordionItems = faqs.map((faq) => ({
    id: faq.id,
    title: faq.question.en,
    content: faq.answer.en,
  }));

  return (
    <div>
      {/* 1. Hero Section: Dark Premium */}
      <section className="relative bg-surface-dark text-white overflow-hidden pt-16 pb-20 md:pt-24 md:pb-32 border-b border-white/10">
        {/* Subtle radial glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-primary/15 blur-[120px] rounded-full pointer-events-none" />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <ScrollReveal direction="up">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold uppercase tracking-wider text-brand-border mb-6">
                  <span className="h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
                  Showroom &middot; Chhachhrauli Road, Ledi
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
                  {site.shopName.en}
                </h1>

                <p className="text-lg sm:text-xl text-zinc-300 mb-8 max-w-xl font-normal leading-relaxed">
                  Electric scooters, service and spare parts at Chhachhrauli Road, Ledi.
                </p>

                {/* Primary CTAs */}
                <div className="flex flex-wrap items-center gap-3.5 mb-10">
                  <Button
                    href={generalWhatsappUrl}
                    isExternal
                    variant="whatsapp"
                    size="lg"
                  >
                    <svg
                      className="mr-2 h-5 w-5 fill-current"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.029-.481-1.611-.666-2.645-2.296-2.726-2.404-.08-.108-.646-.861-.646-1.642 0-.781.405-1.166.549-1.326.144-.16.315-.2.42-.2.106 0 .211.002.304.006.103.004.24-.039.375.285.144.348.49 1.197.533 1.285.043.087.072.19.014.305-.058.114-.087.186-.173.287-.087.1-.183.224-.261.301-.087.087-.178.182-.077.355.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.102-.115.434-.506.549-.68.115-.173.231-.144.39-.086s1.012.477 1.185.564.289.13.332.203c.043.072.043.419-.101.824z" />
                    </svg>
                    Enquire on WhatsApp
                  </Button>

                  {/* Hidden on mobile below 768px to prevent redundant buttons with sticky bottom bar */}
                  <Button
                    href={`tel:${site.phone}`}
                    variant="outline"
                    size="lg"
                    className="border-white/20 text-white hover:bg-white/10 hidden md:inline-flex"
                  >
                    <svg
                      className="mr-2 h-4 w-4 text-brand-border"
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
                    Call Now
                  </Button>

                  {site.mapsLink && (
                    <Button
                      href={site.mapsLink}
                      isExternal
                      variant="ghost"
                      size="lg"
                      className="text-zinc-300 hover:text-white hover:bg-white/5"
                    >
                      Get Directions &rarr;
                    </Button>
                  )}
                </div>

                {/* Quick Trust Highlights */}
                <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10 text-xs sm:text-sm text-zinc-300">
                  <div>
                    <div className="font-bold text-white text-base sm:text-lg">EV Only</div>
                    <div className="text-zinc-400 text-xs mt-0.5">Zero tailpipe emissions</div>
                  </div>
                  <div>
                    <div className="font-bold text-white text-base sm:text-lg">Full Service</div>
                    <div className="text-zinc-400 text-xs mt-0.5">On-site maintenance</div>
                  </div>
                  <div>
                    <div className="font-bold text-white text-base sm:text-lg">Spare Parts</div>
                    <div className="text-zinc-400 text-xs mt-0.5">Replacement components</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Hero Visual */}
            <div className="lg:col-span-5">
              <ScrollReveal direction="left" delay={0.15}>
                <div className="relative rounded-2xl bg-surface-dark-card border border-white/10 p-6 sm:p-8 shadow-2xl">
                  <div className="aspect-[16/11] relative rounded-xl overflow-hidden bg-zinc-900 mb-6">
                    <Image
                      src="/images/models/sample-model-a.webp"
                      alt="Sample EV scooter showcase"
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 450px"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-xs text-[11px] font-semibold text-white uppercase tracking-wider">
                        Sample Model A
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold">
                        Starting from
                      </span>
                      <span className="text-xl sm:text-2xl font-extrabold text-white">
                        ₹99,999*
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      *Sample figure. Ex-showroom. Call or WhatsApp for latest verified prices.
                    </p>
                    <div className="pt-2">
                      <Button
                        href="/models"
                        variant="primary"
                        fullWidth
                        size="md"
                      >
                        Browse All Models
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Featured Models Carousel Section */}
      <Section variant="grey">
        <Container>
          <FeaturedModelsCarousel
            models={featuredModels}
            phone={site.phone}
          />

          <div className="mt-8 text-center">
            <Link
              href="/models"
              className="inline-flex items-center text-sm font-semibold text-brand-primary hover:text-brand-hover underline underline-offset-4 transition-colors"
            >
              View all models and specifications &rarr;
            </Link>
          </div>
        </Container>
      </Section>

      {/* 3. Why Choose Us — Bento Grid (Generic Verified Facts Only) */}
      <Section variant="white">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">
              Local Reliability
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-text-heading mt-2 mb-4">
              Why Visit Shakumbhari Automobile
            </h2>
            <p className="text-base text-text-muted">
              We provide straightforward advice, dependable service, and convenient local support for two-wheeler owners in Ledi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Tile 1: Local Presence */}
            <ScrollReveal delay={0.05} className="md:col-span-2">
              <div className="h-full p-6 sm:p-8 rounded-2xl border border-border-subtle bg-surface-grey flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded-xl bg-brand-tint text-brand-primary flex items-center justify-center font-bold mb-4">
                    📍
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-text-heading mb-2">
                    Convenient Local Showroom
                  </h3>
                  <p className="text-sm sm:text-base text-text-body leading-relaxed max-w-lg">
                    Situated on Chhachhrauli Road in Ledi. Come by in person to sit on the vehicles, examine build quality, inspect battery configurations, and talk directly to our showroom staff.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border-subtle text-xs text-text-muted flex items-center gap-2">
                  <span>Chhachhrauli Road, Ledi</span>
                  <span>&middot;</span>
                  <Link href="/test-ride" className="text-brand-primary font-semibold hover:underline">
                    Book visit
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Bento Tile 2: Easy WhatsApp */}
            <ScrollReveal delay={0.1}>
              <div className="h-full p-6 sm:p-8 rounded-2xl border border-border-subtle bg-surface-white flex flex-col justify-between shadow-xs">
                <div>
                  <div className="h-10 w-10 rounded-xl bg-whatsapp text-whatsapp-text flex items-center justify-center font-bold mb-4">
                    💬
                  </div>
                  <h3 className="text-xl font-bold text-text-heading mb-2">
                    Direct WhatsApp
                  </h3>
                  <p className="text-sm text-text-body leading-relaxed">
                    No complicated booking forms or automated robots. Message us on WhatsApp to check model availability, request quotations, or book test rides.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border-subtle">
                  <a
                    href={generalWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-success-solid hover:underline"
                  >
                    Chat with us &rarr;
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Bento Tile 3: Service */}
            <ScrollReveal delay={0.15}>
              <div className="h-full p-6 sm:p-8 rounded-2xl border border-border-subtle bg-surface-white flex flex-col justify-between shadow-xs">
                <div>
                  <div className="h-10 w-10 rounded-xl bg-brand-tint text-brand-primary flex items-center justify-center font-bold mb-4">
                    🛠️
                  </div>
                  <h3 className="text-xl font-bold text-text-heading mb-2">
                    Scheduled Servicing
                  </h3>
                  <p className="text-sm text-text-body leading-relaxed">
                    Full service support for electric scooters. Regular brake checks, electrical diagnostics, and routine adjustments to ensure safe daily riding.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border-subtle">
                  <Link
                    href="/service"
                    className="text-xs font-semibold text-brand-primary hover:underline"
                  >
                    Service info &rarr;
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Bento Tile 4: Spare Parts */}
            <ScrollReveal delay={0.2} className="md:col-span-2">
              <div className="h-full p-6 sm:p-8 rounded-2xl border border-border-subtle bg-surface-grey flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded-xl bg-brand-tint text-brand-primary flex items-center justify-center font-bold mb-4">
                    🔩
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-text-heading mb-2">
                    Spare Parts Available
                  </h3>
                  <p className="text-sm sm:text-base text-text-body leading-relaxed max-w-lg">
                    We maintain replacement components, tyres, switches, lights, and standard parts so your scooter doesn&apos;t sit idle waiting weeks for repairs.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border-subtle text-xs text-text-muted">
                  Support available during showroom operating hours.
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </Section>

      {/* 4. Service & Spares Section */}
      <Section variant="tint">
        <Container>
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">
              Workshop & Care
            </span>
            <h2 className="text-3xl font-bold text-text-heading mt-2 mb-3">
              Service & Spare Parts Support
            </h2>
            <p className="text-base text-text-body">
              Keeping your electric two-wheeler in top condition with professional care right here in Ledi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="p-6 sm:p-8 rounded-2xl bg-surface-white border border-brand-border shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block px-2.5 py-1 rounded bg-brand-tint text-brand-primary text-xs font-bold uppercase tracking-wider mb-4">
                    Verified Service
                  </div>
                  <h3 className="text-2xl font-bold text-text-heading mb-2">
                    {svc.name.en}
                  </h3>
                  <p className="text-sm sm:text-base text-text-body leading-relaxed mb-6">
                    {svc.description.en}
                  </p>
                </div>

                <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                  <Button
                    href={buildWhatsAppLink(site.phone, serviceMessage())}
                    isExternal
                    variant="whatsapp"
                    size="sm"
                  >
                    Enquire for {svc.name.en}
                  </Button>
                  <Link
                    href="/service"
                    className="text-xs font-semibold text-text-muted hover:text-brand-primary"
                  >
                    Read details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* 5. About / Management Section (Placeholder Gated per Rule 5) */}
      <Section variant="white">
        <Container size="md">
          <div className="rounded-2xl border border-dashed border-border-default bg-surface-grey p-8 sm:p-12 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-surface-white border border-border-subtle text-text-muted">
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-text-heading mb-2">
              About Showroom Leadership
            </h3>

            {person.consent ? (
              <div className="mt-4">
                <p className="font-semibold text-text-heading">{person.name}</p>
                <p className="text-xs text-text-muted">{person.role}</p>
                <p className="text-sm text-text-body mt-2">{person.message.en}</p>
              </div>
            ) : (
              <p className="text-sm text-text-muted max-w-md mx-auto leading-relaxed">
                Management profile and owner greeting will be published here once finalized. In the meantime, our showroom staff welcomes your visit on Chhachhrauli Road, Ledi.
              </p>
            )}

            <div className="mt-6">
              <Button href={`tel:${site.phone}`} variant="outline" size="sm">
                Speak to Manager &middot; {site.phone}
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* 6. Recent Deliveries Section: Rendered ONLY if customers array has consent: true */}
      {customers.length > 0 && (
        <Section variant="grey">
          <Container>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-heading mb-6">
              Recent Showroom Deliveries
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {customers.map((c) => (
                <div key={c.id} className="p-6 rounded-xl bg-surface-white border border-border-subtle">
                  <p className="text-sm text-text-body mb-3 font-medium">&ldquo;{c.review.en}&rdquo;</p>
                  <p className="text-xs font-bold text-text-heading">{c.name}</p>
                  {c.model && <p className="text-xs text-text-muted">{c.model}</p>}
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* 7. FAQ Accordion Section */}
      <Section variant="white">
        <Container size="md">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-brand-primary uppercase tracking-wider">
              Answers & Help
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-heading mt-2 mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-text-muted">
              Common questions about electric scooters, charging, and showroom visits.
            </p>
          </div>

          <Accordion items={faqAccordionItems} defaultOpenIndex={0} />

          <div className="mt-10 p-6 rounded-xl bg-surface-grey border border-border-subtle text-center">
            <p className="text-sm text-text-heading font-medium mb-2">
              Have another question not answered here?
            </p>
            <a
              href={generalWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-brand-primary hover:underline"
            >
              Ask us on WhatsApp &rarr;
            </a>
          </div>
        </Container>
      </Section>

      {/* 8. Location & Map Section */}
      <Section variant="grey" id="location">
        <Container size="md">
          <LocationMap
            mapsLink={site.mapsLink}
            mapsEmbedSrc={site.mapsEmbedSrc}
            addressText={addressText}
          />
        </Container>
      </Section>
    </div>
  );
}
