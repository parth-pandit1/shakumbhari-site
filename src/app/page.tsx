import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { HeroSection } from "@/components/features/home/HeroSection";
import { FeaturedModelsCarousel } from "@/components/features/home/FeaturedModelsCarousel";
import { WhyUsBento } from "@/components/features/home/WhyUsBento";
import { WorkshopCareSection } from "@/components/features/home/WorkshopCareSection";
import { LeadershipSection } from "@/components/features/home/LeadershipSection";
import { FaqSection } from "@/components/features/home/FaqSection";
import { LocationMap } from "@/components/features/location/LocationMap";
import {
  getSite,
  getFeaturedModels,
  getServices,
  getFaqs,
  getCustomers,
  getPerson,
} from "@/lib/content";
import { buildWhatsAppLink, enquiryMessage } from "@/lib/whatsapp";
import { ROUTES } from "@/lib/constants";

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

  const generalWhatsappUrl = buildWhatsAppLink(site.whatsappNumber ?? site.phone, enquiryMessage());

  return (
    <div>
      {/* 1. Hero */}
      <HeroSection site={site} />

      {/* 2. Featured Models Carousel */}
      <Section variant="grey">
        <Container>
          <FeaturedModelsCarousel models={featuredModels} phone={site.phone} />
          <div className="mt-8 text-center">
            <Link
              href={ROUTES.MODELS}
              className="inline-flex items-center text-sm font-semibold text-brand-primary hover:text-brand-hover underline underline-offset-4 transition-colors"
            >
              View all models and specifications &rarr;
            </Link>
          </div>
        </Container>
      </Section>

      {/* 3. Why Choose Us Bento */}
      <WhyUsBento whatsappUrl={generalWhatsappUrl} />

      {/* 4. Service & Spares */}
      <WorkshopCareSection services={services} phone={site.phone} />

      {/* 5. Showroom Leadership */}
      <LeadershipSection person={person} phone={site.phone} />

      {/* 6. Recent Deliveries (consent-gated per Rule 5) */}
      {customers.length > 0 && (
        <Section variant="grey">
          <Container>
            <h2 className="text-2xl sm:text-3xl font-bold text-text-heading mb-6">
              Recent Showroom Deliveries
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {customers.map((c) => (
                <div
                  key={c.id}
                  className="p-6 rounded-xl bg-surface-white border border-border-subtle"
                >
                  <p className="text-sm text-text-body mb-3 font-medium">
                    &ldquo;{c.review.en}&rdquo;
                  </p>
                  <p className="text-xs font-bold text-text-heading">{c.name}</p>
                  {c.model && <p className="text-xs text-text-muted">{c.model}</p>}
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* 7. FAQ */}
      <FaqSection faqs={faqs} whatsappUrl={generalWhatsappUrl} />

      {/* 8. Location */}
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
