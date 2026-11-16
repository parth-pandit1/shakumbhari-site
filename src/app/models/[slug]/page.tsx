import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container, Button, Badge } from "@/components/ui";
import { ModelDetailViewer } from "@/components/features/models/ModelDetailViewer";
import { VariantRangeTable } from "@/components/features/models/VariantRangeTable";
import { getSite, getModels, getModelBySlug } from "@/lib/content";
import { formatPrice, formatModelRange, formatTopSpeed } from "@/lib/format";
import { buildWhatsAppLink, enquiryMessage } from "@/lib/whatsapp";
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

  const rangeSummary = formatModelRange(model) ?? "Electric";

  return {
    title: `${model.name.en}: Specs and Variants`,
    description: `Specifications, ${rangeSummary}, top speed, and features for ${model.name.en} at Shakumbhari Automobile in Ledi.`,
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

  // Product JSON-LD: emitted ONLY when data is NOT a sample AND indexing is enabled (Rule 3)
  const productLd =
    !model.isSample && allowIndexing
      ? {
          "@context": "https://schema.org",
          "@type": "Product",
          name: `${model.brand} ${model.name.en}`,
          image: model.photos[0]?.src || undefined,
          description:
            model.description?.en ?? `Electric scooter model with ${formatModelRange(model)}.`,
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

  const testRideUrl = `${ROUTES.TEST_RIDE}?model=${model.slug}`;
  const rangeText = formatModelRange(model);
  const speedText = formatTopSpeed(model.topSpeedKmh, model.topSpeedText);

  return (
    <div className="bg-surface-white min-h-screen py-8 sm:py-12">
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

        {/* Two Column Layout: Photo Sticky Left, Details Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Sticky on desktop */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <ModelDetailViewer model={model} />
          </div>

          {/* Right Column: Details, Actions, Tables (No intro paragraphs) */}
          <div className="lg:col-span-5 flex flex-col text-left">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="brand">{model.brand}</Badge>
              <Badge variant="neutral">{model.type}</Badge>
              {model.isSample && <Badge variant="warning">Sample Model</Badge>}
              {model.featured && <Badge variant="dark">Popular</Badge>}
            </div>

            {/* Model Name */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-text-heading mb-1">
              {model.name.en}
            </h1>

            {/* Claimed Range & Price */}
            <div className="my-3 p-4 rounded-lg bg-surface-grey border border-border-subtle">
              <div className="text-xs text-text-muted font-semibold">Ex-showroom price</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-text-heading mt-0.5">
                {formatPrice(model.priceExShowroom)}
              </div>
              {rangeText && (
                <div className="mt-2 text-sm font-bold text-brand-primary">
                  {rangeText}
                  {speedText && (
                    <span className="text-text-muted font-normal"> &middot; {speedText}</span>
                  )}
                </div>
              )}
              <p className="text-xs text-text-muted mt-2 leading-relaxed">
                {DISCLAIMERS.EX_SHOWROOM_LONG}
              </p>
            </div>

            {/* Main Actions: WhatsApp, Book a test ride, Call */}
            <div className="space-y-3 pt-2">
              <Button href={whatsappEnquiryUrl} isExternal variant="whatsapp" size="lg" fullWidth>
                <svg className="mr-2 h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.029-.481-1.611-.666-2.645-2.296-2.726-2.404-.08-.108-.646-.861-.646-1.642 0-.781.405-1.166.549-1.326.144-.16.315-.2.42-.2.106 0 .211.002.304.006.103.004.24-.039.375.285.144.348.49 1.197.533 1.285.043.087.072.19.014.305-.058.114-.087.186-.173.287-.087.1-.183.224-.261.301-.087.087-.178.182-.077.355.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.102-.115.434-.506.549-.68.115-.173.231-.144.39-.086s1.012.477 1.185.564.289.13.332.203c.043.072.043.419-.101.824z" />
                </svg>
                Enquire on WhatsApp
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button href={testRideUrl} variant="outline" size="md" fullWidth>
                  Book a test ride
                </Button>
                <Button href={`tel:${site.phone}`} variant="outline" size="md" fullWidth>
                  Call
                </Button>
              </div>

              <div className="flex items-center justify-between pt-2 text-xs">
                <Link
                  href={`${ROUTES.COMPARE}?model1=${model.slug}`}
                  className="font-semibold text-text-muted hover:text-text-heading hover:underline"
                >
                  Compare with other models
                </Link>
                <Link
                  href={`${ROUTES.EMI}?price=${model.priceExShowroom ?? DEFAULT_EMI.PRICE}`}
                  className="font-semibold text-brand-primary hover:underline"
                >
                  Calculate EMI &rarr;
                </Link>
              </div>
            </div>

            {/* Battery & Range Variants Table */}
            {model.variants.length > 0 && (
              <div className="mt-8 pt-6 border-t border-border-subtle">
                <h2 className="text-xl font-bold text-text-heading mb-3">
                  Battery &amp; Range Variants
                </h2>
                <VariantRangeTable variants={model.variants} />
                <p className="mt-2 text-[11px] text-text-muted leading-relaxed">
                  *Claimed ranges are based on manufacturer testing standards. Stocked battery
                  variant availability in Ledi is confirmed upon enquiry.
                </p>
              </div>
            )}

            {/* Detailed Specification Table */}
            <div className="mt-8 pt-6 border-t border-border-subtle">
              <h2 className="text-xl font-bold text-text-heading mb-3">Specifications</h2>
              <div className="overflow-hidden rounded-lg border border-border-subtle bg-surface-white">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <tbody>
                    <tr className="border-b border-border-subtle bg-surface-grey/50">
                      <th scope="row" className="py-2.5 px-4 font-semibold text-text-heading w-1/3">
                        Model
                      </th>
                      <td className="py-2.5 px-4 text-text-body font-medium">
                        {model.brand} {model.name.en}
                      </td>
                    </tr>
                    {model.specs.map((s, idx) => (
                      <tr
                        key={s.label}
                        className={`border-b border-border-subtle last:border-b-0 ${
                          idx % 2 === 1 ? "bg-surface-grey/50" : ""
                        }`}
                      >
                        <th scope="row" className="py-2.5 px-4 font-semibold text-text-heading">
                          {s.label}
                        </th>
                        <td className="py-2.5 px-4 text-text-body">{s.value}</td>
                      </tr>
                    ))}
                    <tr className="border-b border-border-subtle bg-surface-grey/50">
                      <th scope="row" className="py-2.5 px-4 font-semibold text-text-heading">
                        Available Shades
                      </th>
                      <td className="py-2.5 px-4 text-text-body">
                        {model.colours.map((c) => c.name).join(", ") || "Standard shades"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-[11px] text-text-muted">*{DISCLAIMERS.SPECS}</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
