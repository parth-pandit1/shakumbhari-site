"use client";

import React, { useState } from "react";

export interface AccordionItemData {
  id: string;
  title: string;
  content: string | React.ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  defaultOpenIndex?: number;
  className?: string;
  allowMultiple?: boolean;
}

export function Accordion({
  items,
  defaultOpenIndex = -1,
  className = "",
  allowMultiple = false,
}: AccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>(
    defaultOpenIndex >= 0 ? [defaultOpenIndex] : []
  );

  const toggle = (index: number) => {
    if (allowMultiple) {
      if (openIndices.includes(index)) {
        setOpenIndices(openIndices.filter((i) => i !== index));
      } else {
        setOpenIndices([...openIndices, index]);
      }
    } else {
      if (openIndices.includes(index)) {
        setOpenIndices([]);
      } else {
        setOpenIndices([index]);
      }
    }
  };

  return (
    <div className={`divide-y divide-border-subtle border-y border-border-subtle ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        return (
          <div key={item.id} className="py-4">
            <h3>
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={`accordion-content-${item.id}`}
                id={`accordion-heading-${item.id}`}
                className="flex w-full items-center justify-between text-left font-semibold text-text-heading hover:text-brand-primary transition-colors py-1 focus-visible:rounded"
              >
                <span className="text-base sm:text-lg pr-4">{item.title}</span>
                <span
                  className={`ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-grey text-text-muted transition-transform duration-normal ${
                    isOpen ? "rotate-180 bg-brand-tint text-brand-primary" : ""
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>
            </h3>
            {isOpen && (
              <div
                id={`accordion-content-${item.id}`}
                role="region"
                aria-labelledby={`accordion-heading-${item.id}`}
                className="pt-3 pb-2 text-sm sm:text-base text-text-body leading-relaxed animate-in fade-in duration-normal"
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
