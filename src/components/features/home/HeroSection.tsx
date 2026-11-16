"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useTransition,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { Container, Button } from "@/components/ui";
import { buildWhatsAppLink, enquiryMessage } from "@/lib/whatsapp";
import { formatModelRange, formatPrice } from "@/lib/format";
import { ROUTES } from "@/lib/constants";
import type { Site, Model } from "@/content/schemas";

export interface HeroSectionProps {
  site: Site;
  models: Model[];
}

export function HeroSection({ site, models }: HeroSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const [, startTransition] = useTransition();

  // Active selected model (defaults to first model - Axel)
  const [selectedSlug, setSelectedSlug] = useState<string>(models[0]?.slug ?? "");
  const selectedModel = models.find((m) => m.slug === selectedSlug) ?? models[0];

  // Active selected colour for the selected model
  const [selectedColour, setSelectedColour] = useState<string>(
    selectedModel?.photos?.[0]?.colour ?? ""
  );

  // Track if user has changed model/colour to enable crossfade
  const [isCrossfading, setIsCrossfading] = useState(false);

  // When model changes, reset colour to its first photo's colour
  const handleSelectModel = useCallback((model: Model) => {
    setIsCrossfading(true);
    startTransition(() => {
      setSelectedSlug(model.slug);
      setSelectedColour(model.photos[0]?.colour ?? "");
    });
    setTimeout(() => setIsCrossfading(false), 150);
  }, []);

  const handleSelectColour = useCallback((colour: string) => {
    setIsCrossfading(true);
    startTransition(() => {
      setSelectedColour(colour);
    });
    setTimeout(() => setIsCrossfading(false), 150);
  }, []);

  // Preload non-initial model photos during idle
  useEffect(() => {
    if (typeof window === "undefined") return;
    const preloadPhotos = () => {
      models.slice(1).forEach((m) => {
        m.photos.forEach((p) => {
          const img = new window.Image();
          img.src = p.src;
        });
      });
    };

    if ("requestIdleCallback" in window) {
      const handle = (window as Window).requestIdleCallback(preloadPhotos, { timeout: 2000 });
      return () => (window as Window).cancelIdleCallback(handle);
    } else {
      const timeout = setTimeout(preloadPhotos, 1000);
      return () => clearTimeout(timeout);
    }
  }, [models]);

  // Current active photo
  const activePhoto =
    selectedModel?.photos.find((p) => p.colour === selectedColour) ??
    selectedModel?.photos[0] ??
    null;

  // Range and price text
  const rangeText = selectedModel ? formatModelRange(selectedModel) : null;
  const priceText = formatPrice(selectedModel?.priceExShowroom ?? null);

  // Dynamic WhatsApp link for selected model
  const whatsappUrl = buildWhatsAppLink(
    site.whatsappNumber ?? site.phone,
    enquiryMessage(selectedModel?.name.en)
  );

  // ─── 3D Pointer Tracking Depth Effect ──────────────────────
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for natural responsive tilt
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Scooter 3D tilt: max 8 degrees
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const scooterX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const scooterY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  // Background red shape and ground shadow move in the opposite direction
  const shapeX = useTransform(smoothX, [-0.5, 0.5], [16, -16]);
  const shapeY = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const shadowX = useTransform(smoothX, [-0.5, 0.5], [10, -10]);
  const shadowY = useTransform(smoothY, [-0.5, 0.5], [8, -8]);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || e.pointerType === "touch") return;
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const onPointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Keyboard navigation for model switcher tablist
  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const onChipKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    let nextIndex = currentIndex;
    if (e.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % models.length;
    } else if (e.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + models.length) % models.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = models.length - 1;
    } else {
      return;
    }

    e.preventDefault();
    const nextModel = models[nextIndex];
    if (nextModel) {
      handleSelectModel(nextModel);
      chipRefs.current[nextIndex]?.focus();
    }
  };

  // Check if current model has 2 or more colour photos
  const hasMultipleColourPhotos = (selectedModel?.photos?.length ?? 0) >= 2;

  return (
    <section
      ref={heroRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative bg-surface-dark text-white overflow-hidden py-12 sm:py-16 lg:py-0 lg:min-h-[85vh] lg:flex lg:items-center border-b border-border-subtle/20"
      aria-label="Showroom Hero"
    >
      {/* Bleeding diagonal red shape running behind visual (Signboard style) */}
      <motion.div
        style={shouldReduceMotion ? undefined : { x: shapeX, y: shapeY }}
        className="absolute -right-8 sm:-right-16 lg:-right-24 top-0 bottom-0 w-[65%] sm:w-[55%] lg:w-[48%] pointer-events-none -z-0"
        aria-hidden="true"
      >
        <div
          className="w-full h-full bg-brand-primary sign-stripe-subtle opacity-95"
          style={{
            clipPath: "polygon(22% 0%, 100% 0%, 100% 100%, 0% 100%)",
          }}
        />
      </motion.div>

      <Container className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* ─── Left Column: Shop Name, 1 Line, 3 Buttons. Nothing else. ─── */}
          <div className="lg:col-span-5 text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 leading-[1.05]">
              {site.shopName.en}
            </h1>

            <p className="text-base sm:text-lg text-zinc-300 mb-8 max-w-md font-normal leading-relaxed">
              Electric scooters, service and spare parts. Chhachhrauli Road, Ledi.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button href={whatsappUrl} isExternal variant="whatsapp" size="lg">
                <svg className="mr-2 h-5 w-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.029-.481-1.611-.666-2.645-2.296-2.726-2.404-.08-.108-.646-.861-.646-1.642 0-.781.405-1.166.549-1.326.144-.16.315-.2.42-.2.106 0 .211.002.304.006.103.004.24-.039.375.285.144.348.49 1.197.533 1.285.043.087.072.19.014.305-.058.114-.087.186-.173.287-.087.1-.183.224-.261.301-.087.087-.178.182-.077.355.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.102-.115.434-.506.549-.68.115-.173.231-.144.39-.086s1.012.477 1.185.564.289.13.332.203c.043.072.043.419-.101.824z" />
                </svg>
                WhatsApp
              </Button>

              <Button
                href={`tel:${site.phone}`}
                variant="outline"
                size="lg"
                className="border-white/25 text-white hover:bg-white/10 hidden md:inline-flex"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call
              </Button>

              {site.mapsLink && (
                <Button
                  href={site.mapsLink}
                  isExternal
                  variant="ghost"
                  size="lg"
                  className="text-zinc-300 hover:text-white hover:bg-white/10"
                >
                  Get directions
                </Button>
              )}
            </div>
          </div>

          {/* ─── Right Column: Depth Scooter Visual & Model Showcase (~60% Desktop) ─── */}
          <div className="lg:col-span-7 relative flex flex-col items-center lg:items-end">
            <div
              className="relative w-full max-w-[680px] aspect-[16/10] select-none"
              style={{ perspective: 1000 }}
            >
              {/* Separate ground contact shadow moving in opposite direction */}
              <motion.div
                style={shouldReduceMotion ? undefined : { x: shadowX, y: shadowY }}
                className="absolute -bottom-3 left-[15%] right-[15%] h-8 bg-black/60 rounded-full blur-md pointer-events-none -z-0"
                aria-hidden="true"
              />

              {/* Scooter 3D Tilt Wrapper with spring & touch sway */}
              <motion.div
                style={
                  shouldReduceMotion
                    ? undefined
                    : {
                        rotateX,
                        rotateY,
                        x: scooterX,
                        y: scooterY,
                        transformStyle: "preserve-3d",
                      }
                }
                className={`relative w-full h-full ${shouldReduceMotion ? "" : "hero-sway"}`}
              >
                {/* Clickable Scooter linking to /models/<slug> */}
                <Link
                  href={`${ROUTES.MODELS}/${selectedModel.slug}`}
                  className="group block relative w-full h-full cursor-pointer focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 rounded-lg"
                  aria-label={`View ${selectedModel.name.en} specifications`}
                >
                  {activePhoto && (
                    <div
                      className={`relative w-full h-full transition-opacity duration-150 ${
                        isCrossfading ? "opacity-40" : "opacity-100"
                      }`}
                    >
                      <Image
                        src={activePhoto.src}
                        alt={activePhoto.alt}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 680px"
                        className="object-contain contact-shadow group-hover:scale-[1.02] transition-transform duration-fast"
                      />
                    </div>
                  )}
                </Link>
              </motion.div>
            </div>

            {/* Model Info: Name, Range, Price */}
            <div className="w-full max-w-[680px] mt-2 flex flex-wrap items-center justify-between gap-2 px-1">
              <div className="text-xs sm:text-sm text-zinc-300 font-medium">
                <span className="font-bold text-white">{selectedModel.name.en}</span>
                {rangeText && (
                  <>
                    <span className="mx-2 text-zinc-500">&middot;</span>
                    <span>{rangeText}</span>
                  </>
                )}
                <span className="mx-2 text-zinc-500">&middot;</span>
                <span className="font-semibold text-brand-border">{priceText}</span>
              </div>

              {/* Colour Dots (only rendered when model has 2 or more colour photos) */}
              {hasMultipleColourPhotos && (
                <div
                  className="flex items-center gap-1.5"
                  role="group"
                  aria-label="Available scooter colours"
                >
                  {selectedModel.photos.map((p) => {
                    const isSelected = selectedColour === p.colour;
                    const hexColor =
                      selectedModel.colours.find(
                        (c) => c.name.toLowerCase() === p.colour.toLowerCase()
                      )?.hex ?? (p.colour.toLowerCase() === "white" ? "#FFFFFF" : "#DC2626");

                    return (
                      <button
                        key={p.colour}
                        type="button"
                        onClick={() => handleSelectColour(p.colour)}
                        aria-label={`Show ${p.colour}`}
                        aria-pressed={isSelected}
                        className={`h-5 w-5 rounded-full border-2 transition-transform ${
                          isSelected
                            ? "border-white scale-110 shadow-xs"
                            : "border-white/30 opacity-70 hover:opacity-100"
                        }`}
                        style={{ backgroundColor: hexColor }}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            {/* Model Switcher Chips: Keyboard Accessible Tablist */}
            <div
              role="tablist"
              aria-label="Select scooter model"
              className="w-full max-w-[680px] mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar select-none"
            >
              {models.map((m, idx) => {
                const isSelected = selectedSlug === m.slug;
                return (
                  <button
                    key={m.id}
                    ref={(el) => {
                      chipRefs.current[idx] = el;
                    }}
                    role="tab"
                    id={`hero-tab-${m.slug}`}
                    aria-selected={isSelected}
                    aria-controls={`hero-panel-${m.slug}`}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => handleSelectModel(m)}
                    onKeyDown={(e) => onChipKeyDown(e, idx)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-brand-primary ${
                      isSelected
                        ? "bg-white text-surface-dark font-bold shadow-xs"
                        : "bg-white/10 text-zinc-300 hover:bg-white/20 hover:text-white"
                    }`}
                  >
                    {m.name.en}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
