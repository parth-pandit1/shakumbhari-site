import Link from "next/link";
import { Container, Section, Button } from "@/components/ui";
import { buildWhatsAppLink, serviceMessage } from "@/lib/whatsapp";
import { ROUTES } from "@/lib/constants";
import type { Service } from "@/content/schemas";

export interface WorkshopCareSectionProps {
  services: Service[];
  phone: string;
}

export function WorkshopCareSection({ services, phone }: WorkshopCareSectionProps) {
  return (
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
            Keeping your electric two-wheeler in top condition with professional care right here in
            Ledi.
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
                <h3 className="text-2xl font-bold text-text-heading mb-2">{svc.name.en}</h3>
                <p className="text-sm sm:text-base text-text-body leading-relaxed mb-6">
                  {svc.description.en}
                </p>
              </div>

              <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                <Button
                  href={buildWhatsAppLink(phone, serviceMessage())}
                  isExternal
                  variant="whatsapp"
                  size="sm"
                >
                  Enquire for {svc.name.en}
                </Button>
                <Link
                  href={ROUTES.SERVICE}
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
  );
}
