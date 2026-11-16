"use client";

import {
  useState,
  useRef,
  useCallback,
  type KeyboardEvent,
  type MouseEvent,
  type TouchEvent,
} from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import type { ModelSpinFrames, ModelPhoto } from "@/content/schemas";

export interface Spin360Props {
  spinFrames: ModelSpinFrames;
  fallbackPhoto: ModelPhoto;
  alt: string;
}

export function Spin360({ spinFrames, fallbackPhoto, alt }: Spin360Props) {
  const shouldReduceMotion = useReducedMotion();
  const [frameIndex, setFrameIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const startXRef = useRef<number | null>(null);
  const startFrameRef = useRef<number>(0);

  const { count, pathPattern } = spinFrames;

  const getFrameUrl = useCallback(
    (index: number) => {
      const frameNum = (index + 1).toString().padStart(2, "0");
      if (pathPattern.includes("{index}")) {
        return pathPattern.replace("{index}", frameNum);
      }
      return pathPattern.replace(/\d+(?=\.\w+$)/, frameNum);
    },
    [pathPattern]
  );

  const handleNext = useCallback(() => {
    setFrameIndex((prev) => (prev + 1) % count);
    setHasInteracted(true);
  }, [count]);

  const handlePrev = useCallback(() => {
    setFrameIndex((prev) => (prev - 1 + count) % count);
    setHasInteracted(true);
  }, [count]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    }
  };

  const onPointerDown = (clientX: number) => {
    setIsInteracting(true);
    setHasInteracted(true);
    startXRef.current = clientX;
    startFrameRef.current = frameIndex;
  };

  const onPointerMove = (clientX: number) => {
    if (!isInteracting || startXRef.current === null) return;
    const deltaX = clientX - startXRef.current;
    // Step one frame every 12 pixels
    const frameDelta = Math.floor(deltaX / 12);
    const newIndex = (((startFrameRef.current - frameDelta) % count) + count) % count;
    setFrameIndex(newIndex);
  };

  const onPointerUp = () => {
    setIsInteracting(false);
    startXRef.current = null;
  };

  // If user prefers reduced motion, show static main photo fallback
  if (shouldReduceMotion) {
    return (
      <div className="relative w-full aspect-[16/10] bg-surface-grey rounded-lg overflow-hidden">
        <Image
          src={fallbackPhoto.src}
          alt={fallbackPhoto.alt || alt}
          fill
          className="object-contain p-4"
          sizes="(max-width: 1024px) 100vw, 700px"
          priority
        />
      </div>
    );
  }

  return (
    <div
      role="region"
      aria-label={`${alt} 360-degree interactive view`}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseDown={(e: MouseEvent<HTMLDivElement>) => onPointerDown(e.clientX)}
      onMouseMove={(e: MouseEvent<HTMLDivElement>) => onPointerMove(e.clientX)}
      onMouseUp={onPointerUp}
      onMouseLeave={onPointerUp}
      onTouchStart={(e: TouchEvent<HTMLDivElement>) => onPointerDown(e.touches[0].clientX)}
      onTouchMove={(e: TouchEvent<HTMLDivElement>) => onPointerMove(e.touches[0].clientX)}
      onTouchEnd={onPointerUp}
      className="relative w-full aspect-[16/10] bg-surface-grey rounded-lg overflow-hidden select-none cursor-grab active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-brand-primary"
    >
      <Image
        src={getFrameUrl(frameIndex)}
        alt={`${alt} frame ${frameIndex + 1} of ${count}`}
        fill
        className="object-contain p-4 pointer-events-none"
        sizes="(max-width: 1024px) 100vw, 700px"
        priority
      />

      {/* "Drag to rotate" hint - hides after user interacts */}
      {!hasInteracted && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-surface-dark/80 text-white text-xs font-semibold pointer-events-none transition-opacity"
          aria-hidden="true"
        >
          Drag or press arrow keys to rotate
        </div>
      )}
    </div>
  );
}
