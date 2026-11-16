import { Container, Section } from "@/components/ui";
import { HeroSection } from "@/components/features/home/HeroSection";
import { FeaturedModelsCarousel } from "@/components/features/home/FeaturedModelsCarousel";
import { WhyUsBento } from "@/components/features/home/WhyUsBento";
import { ActionBand } from "@/components/features/home/ActionBand";
import { CustomersSection } from "@/components/features/home/CustomersSection";
import { ManagerSection } from "@/components/features/home/ManagerSection";
import { FaqSection } from "@/components/features/home/FaqSection";
import { LocationMap } from "@/components/features/location/LocationMap";
import {
  getSite,
  getModels,
  getFeaturedModels,
  getFaqs,
  getPerson,
  getCustomers,
} from "@/lib/content";

export default function HomePage() {
  const site = getSite();
  const allModels = getModels();
  const featuredModels = getFeaturedModels();
  const faqs = getFaqs();
  const person = getPerson();
  const customers = getCustomers();

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

  const activeWhatsappNumber = site.whatsappNumber ?? site.phone;

  return (
    <div>
      {/* 1. Full-width dark hero with depth and model switcher */}
      <HeroSection site={site} models={allModels} />

      {/* 2. Featured Models (large cards, scroll-snap strip on mobile) */}
      <Section variant="grey">
        <Container>
          <FeaturedModelsCarousel models={featuredModels} phone={site.phone} />
        </Container>
      </Section>

      {/* 3. Plain three-column strip (Scooters, Service, Spare parts) */}
      <WhyUsBento />

      {/* 4. Full-width red action band with Call and WhatsApp buttons */}
      <ActionBand phone={site.phone} whatsappNumber={site.whatsappNumber} />

      {/* 5. Visit us section (address text, Get directions, map when exists, hours if not null) */}
      <Section variant="grey" id="location">
        <Container size="md">
          <LocationMap
            mapsLink={site.mapsLink}
            mapsEmbedSrc={site.mapsEmbedSrc}
            addressText={addressText}
            hours={site.hours}
          />
        </Container>
      </Section>

      {/* 6. Happy Customers */}
      <CustomersSection
        customers={customers}
        googleReviewsUrl={site.googleReviewsUrl}
        whatsappNumber={activeWhatsappNumber}
      />

      {/* 7. Manager */}
      <ManagerSection person={person} site={site} />

      {/* 8. FAQ */}
      <FaqSection faqs={faqs} phone={site.phone} whatsappNumber={site.whatsappNumber} />
    </div>
  );
}
