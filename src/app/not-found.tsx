import { Container, Button } from "@/components/ui";
import { ROUTES } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-surface-white py-16 px-4">
      <Container size="sm" className="text-center">
        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-brand-tint text-brand-primary text-xs font-bold uppercase tracking-wider">
          404 &middot; Page Not Found
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-text-heading mb-4">
          This Page Doesn&apos;t Exist
        </h1>

        <p className="text-base text-text-muted mb-8 max-w-md mx-auto leading-relaxed">
          The link you followed may be broken or the page may have been moved. Return to the
          showroom home or explore our scooter line-up.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href={ROUTES.HOME} variant="primary" size="md">
            Return to Home
          </Button>
          <Button href={ROUTES.MODELS} variant="outline" size="md">
            View All Models
          </Button>
          <Button href={ROUTES.TEST_RIDE} variant="ghost" size="md">
            Book Test Ride &rarr;
          </Button>
        </div>
      </Container>
    </div>
  );
}
