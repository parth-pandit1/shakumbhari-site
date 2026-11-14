import Image from "next/image";
import { Container, Button } from "@/components/ui";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { buildWhatsAppLink, enquiryMessage } from "@/lib/whatsapp";
import { ROUTES } from "@/lib/constants";
import type { Site } from "@/content/schemas";

export interface HeroSectionProps {
  site: Site;
}

export function HeroSection({ site }: HeroSectionProps) {
  const generalWhatsappUrl = buildWhatsAppLink(site.whatsappNumber ?? site.phone, enquiryMessage());

  return (
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
                <Button href={generalWhatsappUrl} isExternal variant="whatsapp" size="lg">
                  <svg className="mr-2 h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
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
                    <span className="text-xl sm:text-2xl font-extrabold text-white">₹99,999*</span>
                  </div>
                  <p className="text-xs text-zinc-400">
                    *Sample figure. Ex-showroom. Call or WhatsApp for latest verified prices.
                  </p>
                  <div className="pt-2">
                    <Button href={ROUTES.MODELS} variant="primary" fullWidth size="md">
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
  );
}
