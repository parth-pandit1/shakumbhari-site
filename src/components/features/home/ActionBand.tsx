import { Container, Button } from "@/components/ui";
import { buildWhatsAppLink, enquiryMessage } from "@/lib/whatsapp";

export interface ActionBandProps {
  phone: string;
  whatsappNumber?: string | null;
}

export function ActionBand({ phone, whatsappNumber }: ActionBandProps) {
  const waNumber = whatsappNumber ?? phone;
  const whatsappUrl = buildWhatsAppLink(waNumber, enquiryMessage());

  return (
    <section className="relative bg-brand-primary text-white py-10 md:py-14 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-15 sign-stripe-subtle"
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Visit our showroom on Chhachhrauli Road.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button href={whatsappUrl} isExternal variant="whatsapp" size="lg">
              WhatsApp
            </Button>
            <Button
              href={`tel:${phone}`}
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10"
            >
              Call
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
