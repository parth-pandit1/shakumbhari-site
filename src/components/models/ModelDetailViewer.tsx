"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { Model } from "@/content/schemas";

interface ModelDetailViewerProps {
  model: Model;
}

export function ModelDetailViewer({ model }: ModelDetailViewerProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const [selectedColour, setSelectedColour] = useState(
    model.colours.length > 0 ? model.colours[0] : ""
  );

  const photos =
    model.photos.length > 0
      ? model.photos
      : ["/images/models/sample-model-a.webp"];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image Display */}
      <div className="relative aspect-[16/10] w-full rounded-2xl bg-surface-grey border border-border-subtle overflow-hidden shadow-sm">
        <Image
          src={photos[selectedPhotoIndex] || photos[0]}
          alt={`${model.name.en} - ${selectedColour || "scooter"}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 600px"
          className="object-cover"
        />

        {model.isSample && (
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full bg-warning-bg text-warning-text border border-warning-text/20 text-xs font-bold uppercase tracking-wider">
              Sample Model
            </span>
          </div>
        )}

        {selectedColour && (
          <div className="absolute bottom-4 right-4 z-10">
            <span className="px-3 py-1 rounded-md bg-black/70 backdrop-blur-xs text-xs font-semibold text-white">
              Colour: {selectedColour}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails (if multiple photos exist) */}
      {photos.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {photos.map((p, idx) => (
            <button
              key={p}
              type="button"
              onClick={() => setSelectedPhotoIndex(idx)}
              aria-label={`View photo ${idx + 1}`}
              className={`relative h-16 w-24 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                selectedPhotoIndex === idx
                  ? "border-brand-primary ring-2 ring-brand-primary/20"
                  : "border-border-subtle opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={p} alt="" fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      )}

      {/* Colour Switcher */}
      {model.colours.length > 0 && (
        <div className="p-4 rounded-xl bg-surface-white border border-border-subtle mt-2">
          <label className="block text-xs font-bold text-text-heading uppercase tracking-wider mb-2">
            Available Colours: <span className="text-brand-primary font-semibold">{selectedColour}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {model.colours.map((col) => {
              const isSelected = selectedColour === col;
              return (
                <button
                  key={col}
                  type="button"
                  onClick={() => setSelectedColour(col)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    isSelected
                      ? "border-brand-primary bg-brand-tint text-brand-primary ring-1 ring-brand-primary"
                      : "border-border-default bg-surface-grey text-text-body hover:bg-white"
                  }`}
                >
                  {col}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
