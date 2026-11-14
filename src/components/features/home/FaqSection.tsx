import { Container, Section, Accordion } from "@/components/ui";
import type { Faq } from "@/content/schemas";

export interface FaqSectionProps {
  faqs: Faq[];
  whatsappUrl: string;
}

export function FaqSection({ faqs, whatsappUrl }: FaqSectionProps) {
  const faqAccordionItems = faqs.map((faq) => ({
    id: faq.id,
    title: faq.question.en,
    content: faq.answer.en,
  }));

  return (
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
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-brand-primary hover:underline"
          >
            Ask us on WhatsApp &rarr;
          </a>
        </div>
      </Container>
    </Section>
  );
}
