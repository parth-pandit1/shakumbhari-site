import { Container, Button } from "@/components/ui";
import { ROUTES } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-surface-white py-16 px-4">
      <Container size="sm" className="text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-text-heading mb-8">
          Page not found
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href={ROUTES.HOME} variant="primary" size="md">
            Home
          </Button>
          <Button href={ROUTES.MODELS} variant="outline" size="md">
            See models
          </Button>
          <Button href={ROUTES.TEST_RIDE} variant="ghost" size="md">
            Book a test ride &rarr;
          </Button>
        </div>
      </Container>
    </div>
  );
}
