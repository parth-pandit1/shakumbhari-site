"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type KeyboardEvent,
  type TouchEvent,
} from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Modal } from "@/components/ui/Modal";
import { Spin360 } from "@/components/features/models/Spin360";
import type { Model } from "@/content/schemas";

export interface ModelDetailViewerProps {
  model: Model;
}

export function ModelDetailViewer({ model }: ModelDetailViewerProps) {
  const shouldReduceMotion = useReducedMotion();
  const hasPhotos = model.photos.length > 0;

  // Build a map from colour name → photo
  const photosByColour: Record<string, (typeof model.photos)[0]> = {};
  for (const p of model.photos) {
    photosByColour[p.colour] = p;
  }

  const [selectedColour, setSelectedColour] = useState<string>(
    hasPhotos ? (model.photos[0]?.colour ?? "") : (model.colours[0]?.name ?? "")
  );

  // Active view: photo gallery or spin view
  const [activeView, setActiveView] = useState<"photo" | "spin">("photo");

  // Zoom Modal state
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [zoomPhotoIndex, setZoomPhotoIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  const currentPhoto = photosByColour[selectedColour] ?? (hasPhotos ? model.photos[0] : null);
  const hasMultipleColourPhotos = model.photos.length >= 2;
  const coloursWithPhotos = new Set(model.photos.map((p) => p.colour));

  const openZoom = useCallback(() => {
    const idx = model.photos.findIndex((p) => p.colour === selectedColour);
    setZoomPhotoIndex(idx >= 0 ? idx : 0);
    setIsZoomOpen(true);
  }, [model.photos, selectedColour]);

  const handleNextZoomPhoto = useCallback(() => {
    if (model.photos.length <= 1) return;
    setZoomPhotoIndex((prev) => (prev + 1) % model.photos.length);
  }, [model.photos.length]);

  const handlePrevZoomPhoto = useCallback(() => {
    if (model.photos.length <= 1) return;
    setZoomPhotoIndex((prev) => (prev - 1 + model.photos.length) % model.photos.length);
  }, [model.photos.length]);

  // Keyboard navigation inside zoom modal
  const handleZoomKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextZoomPhoto();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevZoomPhoto();
      }
    },
    [handleNextZoomPhoto, handlePrevZoomPhoto]
  );

  // Global key listener when zoom modal is open
  useEffect(() => {
    if (!isZoomOpen) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNextZoomPhoto();
      if (e.key === "ArrowLeft") handlePrevZoomPhoto();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isZoomOpen, handleNextZoomPhoto, handlePrevZoomPhoto]);

  const onZoomTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const onZoomTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    if (deltaX > 40) {
      handlePrevZoomPhoto();
    } else if (deltaX < -40) {
      handleNextZoomPhoto();
    }
    touchStartXRef.current = null;
  };

  return (
    <div className="flex flex-col gap-4 text-left">
      {/* Optional Mode Switcher: Photo vs 360 Spin (rendered only if spinFrames exist) */}
      {model.spinFrames && (
        <div className="flex items-center gap-2 mb-1" role="tablist" aria-label="Viewer modes">
          <button
            type="button"
            role="tab"
            aria-selected={activeView === "photo"}
            onClick={() => setActiveView("photo")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${
              activeView === "photo"
                ? "bg-brand-primary text-white border-brand-primary"
                : "bg-surface-white text-text-body border-border-default hover:bg-surface-grey"
            }`}
          >
            Photos
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeView === "spin"}
            onClick={() => setActiveView("spin")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${
              activeView === "spin"
                ? "bg-brand-primary text-white border-brand-primary"
                : "bg-surface-white text-text-body border-border-default hover:bg-surface-grey"
            }`}
          >
            360&deg; Spin
          </button>
        </div>
      )}

      {/* Main Visual Display */}
      {activeView === "spin" && model.spinFrames && currentPhoto ? (
        <Spin360 spinFrames={model.spinFrames} fallbackPhoto={currentPhoto} alt={model.name.en} />
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={openZoom}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openZoom();
            }
          }}
          aria-label={`Open enlarged view of ${model.name.en}`}
          className="relative aspect-[16/10] w-full rounded-lg bg-surface-grey border border-border-subtle overflow-hidden shadow-sm flex items-center justify-center p-4 cursor-zoom-in group focus-visible:outline-2 focus-visible:outline-brand-primary"
        >
          <AnimatePresence mode="wait">
            {currentPhoto ? (
              <motion.div
                key={currentPhoto.src}
                initial={shouldReduceMotion ? false : { opacity: 0.6 }}
                animate={{ opacity: 1 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0.6 }}
                transition={{ duration: 0.15 }}
                className="relative w-full h-full"
              >
                <Image
                  src={currentPhoto.src}
                  alt={currentPhoto.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 700px"
                  className="object-contain group-hover:scale-[1.02] transition-transform duration-fast"
                />
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-8 text-text-muted">
                <span className="text-sm font-semibold text-text-muted">Photo coming soon</span>
              </div>
            )}
          </AnimatePresence>

          {/* Click to zoom indicator */}
          <div className="absolute top-3 right-3 z-10 px-2 py-1 rounded bg-black/60 text-white/90 text-[11px] font-medium backdrop-blur-xs flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            <span>Zoom</span>
          </div>

          {selectedColour && currentPhoto && (
            <div className="absolute bottom-3 right-3 z-10">
              <span className="px-2.5 py-1 rounded bg-black/75 backdrop-blur-xs text-xs font-semibold text-white">
                {selectedColour}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Thumbnail strip: only shown when ≥2 colour photos */}
      {hasMultipleColourPhotos && activeView === "photo" && (
        <div
          className="flex items-center gap-3 overflow-x-auto pb-1"
          role="group"
          aria-label="Colour photo options"
        >
          {model.photos.map((p) => (
            <button
              key={p.colour}
              type="button"
              onClick={() => setSelectedColour(p.colour)}
              aria-label={`View ${p.colour} colour`}
              aria-pressed={selectedColour === p.colour}
              className={`relative h-16 w-24 shrink-0 rounded-md overflow-hidden border-2 transition-all bg-surface-grey focus-visible:outline-2 focus-visible:outline-brand-primary ${
                selectedColour === p.colour
                  ? "border-brand-primary ring-2 ring-brand-primary/20"
                  : "border-border-subtle opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={p.src} alt={p.alt} fill className="object-contain" sizes="96px" />
            </button>
          ))}
        </div>
      )}

      {/* Colour selection buttons / swatches */}
      {model.colours.length > 0 && activeView === "photo" && (
        <div className="p-4 rounded-lg bg-surface-white border border-border-subtle">
          {hasMultipleColourPhotos ? (
            <>
              <span className="block text-xs font-semibold text-text-heading mb-2">
                Available colours:{" "}
                <span className="text-brand-primary font-semibold">{selectedColour}</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {model.colours.map((col) => {
                  const hasPhoto = coloursWithPhotos.has(col.name);
                  const isSelected = selectedColour === col.name;
                  return (
                    <button
                      key={col.name}
                      type="button"
                      onClick={() => hasPhoto && setSelectedColour(col.name)}
                      aria-pressed={isSelected}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold border transition-all focus-visible:outline-2 focus-visible:outline-brand-primary ${
                        isSelected
                          ? "border-brand-primary bg-brand-tint text-brand-primary ring-1 ring-brand-primary"
                          : "border-border-default bg-surface-grey text-text-body hover:bg-white"
                      } ${!hasPhoto ? "opacity-50 cursor-default" : ""}`}
                    >
                      <span
                        className="h-3 w-3 rounded-full border border-black/20 shrink-0"
                        style={{ backgroundColor: col.hex }}
                        aria-hidden="true"
                      />
                      <span>{col.name}</span>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <span className="block text-xs font-semibold text-text-heading mb-2">
                Available colour
              </span>
              <div className="flex flex-wrap gap-2">
                {model.colours.map((col) => (
                  <span
                    key={col.name}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-semibold border border-border-default bg-surface-grey text-text-body"
                  >
                    <span
                      className="h-3 w-3 rounded-full border border-black/20 shrink-0"
                      style={{ backgroundColor: col.hex }}
                      aria-hidden="true"
                    />
                    <span>{col.name}</span>
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Full-Screen Zoom Modal */}
      {isZoomOpen && model.photos[zoomPhotoIndex] && (
        <Modal
          isOpen={isZoomOpen}
          onClose={() => setIsZoomOpen(false)}
          title={`${model.name.en} - ${model.photos[zoomPhotoIndex].colour}`}
          maxWidth="full"
        >
          <div
            onKeyDown={handleZoomKeyDown}
            onTouchStart={onZoomTouchStart}
            onTouchEnd={onZoomTouchEnd}
            tabIndex={0}
            className="flex flex-col items-center justify-center p-2 sm:p-4 select-none focus:outline-none"
          >
            <div className="relative w-full aspect-[16/10] max-h-[70vh] bg-surface-grey rounded-lg overflow-hidden flex items-center justify-center">
              <Image
                src={model.photos[zoomPhotoIndex].src}
                alt={model.photos[zoomPhotoIndex].alt}
                fill
                priority
                className="object-contain p-4"
                sizes="(max-width: 1280px) 90vw, 1200px"
              />
            </div>

            {/* Modal Controls & Caption */}
            <div className="mt-4 flex items-center justify-between w-full text-xs text-text-muted">
              <span>
                Photo {zoomPhotoIndex + 1} of {model.photos.length} &middot;{" "}
                {model.photos[zoomPhotoIndex].colour}
              </span>

              {model.photos.length > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrevZoomPhoto}
                    aria-label="Previous photo"
                    className="px-3 py-1.5 rounded-md border border-border-default hover:bg-surface-grey font-semibold text-text-heading"
                  >
                    &larr; Prev
                  </button>
                  <button
                    type="button"
                    onClick={handleNextZoomPhoto}
                    aria-label="Next photo"
                    className="px-3 py-1.5 rounded-md border border-border-default hover:bg-surface-grey font-semibold text-text-heading"
                  >
                    Next &rarr;
                  </button>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
