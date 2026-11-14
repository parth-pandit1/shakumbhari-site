import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Button, Badge } from "@/components/ui";
import { ModelDetailViewer } from "@/components/features/models/ModelDetailViewer";
import { getSite, getModels, getModelBySlug } from "@/lib/content";
import { formatPrice, formatRange, formatTopSpeed } from "@/lib/format";
import { buildWhatsAppLink, enquiryMessage, testRideMessage } from "@/lib/whatsapp";
import { ROUTES, DISCLAIMERS, DEFAULT_EMI } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const models = getModels();
  return models.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = getModelBySlug(slug);

  if (!model) {
    return {
      title: "Model Not Found",
    };
  }

  return {
    title: `${model.name.en} — Specs & Price`,
    description: `Specifications, claimed range (${model.claimedRangeKm || "N/A"} km), top speed, and features for ${model.name.en} at Shakumbhari Automobile in Ledi.`,
  };
}

export default async function ModelDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const model = getModelBySlug(slug);
  const site = getSite();

  if (!model) {
    notFound();
  }

  const allowIndexing = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

  // Product JSON-LD: emitted ONLY when data is NOT a sample AND indexing is enabled (Rule 3 in Phase 3)
  const productLd =
    !model.isSample && allowIndexing
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: model.name.en,
          image: model.photos[0] || undefined,
          description: `Electric scooter model with ${model.claimedRangeKm}km claimed range.`,
          offers: {
            "@type": "Offer",
            price: model.priceExShowroom || undefined,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
          },
        }
      : null;

  const whatsappEnquiryUrl = buildWhatsAppLink(
    site.whatsappNumber ?? site.phone,
    enquiryMessage(model.name.en)
  );

  const whatsappTestRideUrl = buildWhatsAppLink(
    site.whatsappNumber ?? site.phone,
    testRideMessage(model.name.en)
  );

  return (
    <div className="bg-surface-white min-h-screen py-10 sm:py-14">
      {productLd && <script type="application/ld+json">{JSON.stringify(productLd)}</script>}

      <Container>
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs sm:text-sm text-text-muted">
            <li>
              <Link href={ROUTES.HOME} className="hover:text-brand-primary">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={ROUTES.MODELS} className="hover:text-brand-primary">
                Models
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-text-heading" aria-current="page">
              {model.name.en}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Image Viewer & Gallery */}
          <div className="lg:col-span-7">
            <ModelDetailViewer model={model} />
          </div>

          {/* Right Column: Model Overview & CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="brand">{model.type}</Badge>
                {model.isSample && <Badge variant="warning">Sample Model</Badge>}
                {model.featured && <Badge variant="dark">Popular</Badge>}
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-text-heading mb-3">
                {model.name.en}
              </h1>

              {/* Price card */}
              <div className="p-5 rounded-2xl bg-surface-grey border border-border-subtle my-5">
                <div className="text-xs uppercase tracking-wider text-text-muted font-bold">
                  Ex-Showroom Price
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-text-heading mt-1">
                  {formatPrice(model.priceExShowroom)}
                </div>
                <p className="text-xs text-text-muted mt-1 leading-relaxed">
                  {DISCLAIMERS.EX_SHOWROOM_LONG}
                </p>
              </div>

              {/* Highlights */}
              {model.highlights.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-sm font-bold text-text-heading uppercase tracking-wider mb-2">
                    Key Highlights
                  </h2>
                  <ul className="space-y-1.5 text-sm text-text-body">
                    {model.highlights.map((h, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-brand-primary font-bold">&check;</span>
                        <span>{h.en}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-6 border-t border-border-subtle">
              <Button href={whatsappEnquiryUrl} isExternal variant="whatsapp" size="lg" fullWidth>
                <svg className="mr-2 h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.029-.481-1.611-.666-2.645-2.296-2.726-2.404-.08-.108-.646-.861-.646-1.642 0-.781.405-1.166.549-1.326.144-.16.315-.2.42-.2.106 0 .211.002.304.006.103.004.24-.039.375.285.144.348.49 1.197.533 1.285.043.087.072.19.014.305-.058.114-.087.186-.173.287-.087.1-.183.224-.261.301-.087.087-.178.182-.077.355.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.102-.115.434-.506.549-.68.115-.173.231-.144.39-.086s1.012.477 1.185.564.289.13.332.203c.043.072.043.419-.101.824z" />
                </svg>
                Enquire for {model.name.en}
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button href={whatsappTestRideUrl} isExternal variant="outline" size="md">
                  Book Test Ride
                </Button>
                <Button href={`${ROUTES.COMPARE}?model1=${model.slug}`} variant="outline" size="md">
                  Compare Model
                </Button>
              </div>

              <div className="text-center pt-2">
                <Link
                  href={`${ROUTES.EMI}?price=${model.priceExShowroom ?? DEFAULT_EMI.PRICE}`}
                  className="text-xs font-semibold text-brand-primary hover:underline"
                >
                  Calculate EMI for this scooter &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Specification Table */}
        <div className="mt-16 pt-12 border-t border-border-subtle">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-heading mb-6">
            Detailed Specifications
          </h2>

          <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface-white">
            <table className="w-full text-left border-collapse text-sm">
              <tbody>
                <tr className="border-b border-border-subtle bg-surface-grey/50">
                  <th scope="row" className="py-3.5 px-6 font-semibold text-text-heading w-1/3">
                    Model Name
                  </th>
                  <td className="py-3.5 px-6 text-text-body font-medium">{model.name.en}</td>
                </tr>
                <tr className="border-b border-border-subtle">
                  <th scope="row" className="py-3.5 px-6 font-semibold text-text-heading">
                    Vehicle Type
                  </th>
                  <td className="py-3.5 px-6 text-text-body">{model.type}</td>
                </tr>
                <tr className="border-b border-border-subtle bg-surface-grey/50">
                  <th scope="row" className="py-3.5 px-6 font-semibold text-text-heading">
                    Claimed Range
                  </th>
                  <td className="py-3.5 px-6 text-text-body font-medium text-brand-primary">
                    {formatRange(model.claimedRangeKm) || "Call showroom"}
                  </td>
                </tr>
                <tr className="border-b border-border-subtle">
                  <th scope="row" className="py-3.5 px-6 font-semibold text-text-heading">
                    Top Speed
                  </th>
                  <td className="py-3.5 px-6 text-text-body">
                    {formatTopSpeed(model.topSpeedKmh) || "Call showroom"}
                  </td>
                </tr>
                <tr className="border-b border-border-subtle bg-surface-grey/50">
                  <th scope="row" className="py-3.5 px-6 font-semibold text-text-heading">
                    Battery Chemistry
                  </th>
                  <td className="py-3.5 px-6 text-text-body">
                    {model.batteryType || "Call showroom"}
                  </td>
                </tr>
                <tr className="border-b border-border-subtle">
                  <th scope="row" className="py-3.5 px-6 font-semibold text-text-heading">
                    Battery Capacity
                  </th>
                  <td className="py-3.5 px-6 text-text-body">
                    {model.batteryCapacity || "Call showroom"}
                  </td>
                </tr>
                <tr className="border-b border-border-subtle bg-surface-grey/50">
                  <th scope="row" className="py-3.5 px-6 font-semibold text-text-heading">
                    Charging Duration
                  </th>
                  <td className="py-3.5 px-6 text-text-body">
                    {model.chargingTime || "Standard socket support"}
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="py-3.5 px-6 font-semibold text-text-heading">
                    Available Shades
                  </th>
                  <td className="py-3.5 px-6 text-text-body">
                    {model.colours.join(", ") || "Standard shades"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-xs text-text-muted">*{DISCLAIMERS.SPECS}</p>
        </div>
      </Container>
    </div>
  );
}
