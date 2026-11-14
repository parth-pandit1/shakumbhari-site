import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ROUTES } from "@/lib/constants";

export interface WhyUsBentoProps {
  whatsappUrl: string;
}

export function WhyUsBento({ whatsappUrl }: WhyUsBentoProps) {
  return (
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
            We provide straightforward advice, dependable service, and convenient local support for
            two-wheeler owners in Ledi.
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
                  Situated on Chhachhrauli Road in Ledi. Come by in person to sit on the vehicles,
                  examine build quality, inspect battery configurations, and talk directly to our
                  showroom staff.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border-subtle text-xs text-text-muted flex items-center gap-2">
                <span>Chhachhrauli Road, Ledi</span>
                <span>&middot;</span>
                <Link
                  href={ROUTES.TEST_RIDE}
                  className="text-brand-primary font-semibold hover:underline"
                >
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
                <h3 className="text-xl font-bold text-text-heading mb-2">Direct WhatsApp</h3>
                <p className="text-sm text-text-body leading-relaxed">
                  No complicated booking forms or automated robots. Message us on WhatsApp to check
                  model availability, request quotations, or book test rides.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border-subtle">
                <a
                  href={whatsappUrl}
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
                <h3 className="text-xl font-bold text-text-heading mb-2">Scheduled Servicing</h3>
                <p className="text-sm text-text-body leading-relaxed">
                  Full service support for electric scooters. Regular brake checks, electrical
                  diagnostics, and routine adjustments to ensure safe daily riding.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-border-subtle">
                <Link
                  href={ROUTES.SERVICE}
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
                  We maintain replacement components, tyres, switches, lights, and standard parts so
                  your scooter doesn&apos;t sit idle waiting weeks for repairs.
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
  );
}
