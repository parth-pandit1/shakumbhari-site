import { Container } from "@/components/ui";

export function WhyUsBento() {
  return (
    <section className="py-12 border-y border-border-subtle bg-surface-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-left">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-text-heading mb-2">Scooters</h2>
            <p className="text-sm text-text-body leading-relaxed">
              New electric two-wheelers in stock on Chhachhrauli Road, ready to view and test ride.
            </p>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-text-heading mb-2">Service</h2>
            <p className="text-sm text-text-body leading-relaxed">
              Brake adjustments, electrical checks, and routine maintenance in our Ledi workshop.
            </p>
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-text-heading mb-2">Spare parts</h2>
            <p className="text-sm text-text-body leading-relaxed">
              Tyres, switches, lights, and standard replacement parts stocked on-site.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
