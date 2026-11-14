import { Container, Section, Button } from "@/components/ui";
import type { Person } from "@/content/schemas";

export interface LeadershipSectionProps {
  person: Person;
  phone: string;
}

export function LeadershipSection({ person, phone }: LeadershipSectionProps) {
  return (
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
              Management profile and owner greeting will be published here once finalized. In the
              meantime, our showroom staff welcomes your visit on Chhachhrauli Road, Ledi.
            </p>
          )}

          <div className="mt-6">
            <Button href={`tel:${phone}`} variant="outline" size="sm">
              Speak to Manager &middot; {phone}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
