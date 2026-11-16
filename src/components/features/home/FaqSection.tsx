"use client";

import { useState, useMemo, useRef, type KeyboardEvent } from "react";
import { Container, Section, Button } from "@/components/ui";
import type { Faq } from "@/content/schemas";
import { buildWhatsAppLink, enquiryMessage } from "@/lib/whatsapp";

export interface FaqSectionProps {
  faqs: Faq[];
  phone: string;
  whatsappNumber?: string | null;
}

export function FaqSection({ faqs, phone, whatsappNumber }: FaqSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Collect unique categories in order
  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const f of faqs) {
      if (f.category) set.add(f.category);
    }
    return ["All", ...Array.from(set)];
  }, [faqs]);

  // Filter FAQs by category and live search query
  const filteredFaqs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return faqs.filter((faq) => {
      const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return faq.question.en.toLowerCase().includes(q) || faq.answer.en.toLowerCase().includes(q);
    });
  }, [faqs, selectedCategory, searchQuery]);

  const activeWhatsappNumber = whatsappNumber ?? phone;
  const whatsappUrl = buildWhatsAppLink(
    activeWhatsappNumber,
    enquiryMessage("Hi, I have a question about electric two-wheelers.")
  );

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (index + 1) % filteredFaqs.length;
      buttonRefs.current[nextIndex]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (index - 1 + filteredFaqs.length) % filteredFaqs.length;
      buttonRefs.current[prevIndex]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      buttonRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      buttonRefs.current[filteredFaqs.length - 1]?.focus();
    }
  };

  return (
    <Section variant="white" id="faq" className="py-16 sm:py-20 border-t border-border-subtle">
      {/* With JavaScript disabled, ensure all answers remain fully readable */}
      <noscript>
        <style>{`
          [id^="faq-answer-"] { grid-template-rows: 1fr !important; }
          [id^="faq-answer-"] > div { opacity: 1 !important; padding-top: 0.75rem !important; padding-bottom: 0.75rem !important; }
        `}</style>
      </noscript>

      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start text-left">
          {/* Left Column (Sticky on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text-heading tracking-tight">
                Questions
              </h2>
              <p className="mt-1 text-sm text-text-muted">
                Common questions about scooters, bookings, and our workshop.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative">
              <label htmlFor="faq-search" className="sr-only">
                Search questions
              </label>
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-text-muted">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <input
                id="faq-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-surface-white border border-border-default rounded-lg text-text-heading placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
              />
            </div>

            {/* Category Chips */}
            {categories.length > 1 && (
              <div className="flex flex-wrap gap-2" role="group" aria-label="FAQ categories">
                {categories.map((cat) => {
                  const isActive = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                        isActive
                          ? "bg-brand-primary text-white shadow-xs"
                          : "bg-surface-white border border-border-default text-text-body hover:bg-surface-grey hover:text-text-heading"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Not answered here? card */}
            <div className="rounded-xl bg-surface-grey border border-border-subtle p-5">
              <h3 className="text-sm font-bold text-text-heading">Not answered here?</h3>
              <p className="mt-1 text-xs text-text-muted">
                Contact our showroom team directly on phone or WhatsApp.
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <Button variant="whatsapp" size="sm" href={whatsappUrl} isExternal>
                  WhatsApp
                </Button>
                <Button variant="outline" size="sm" href={`tel:${phone}`}>
                  Call {phone}
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column: Accordion list */}
          <div className="lg:col-span-7">
            {filteredFaqs.length === 0 ? (
              <div className="rounded-xl bg-surface-grey border border-border-subtle p-8 text-center">
                <p className="text-base font-bold text-text-heading">
                  No match. Ask us on WhatsApp.
                </p>
                <p className="mt-1 text-sm text-text-muted">
                  We are available to answer your specific query directly.
                </p>
                <div className="mt-4 flex justify-center">
                  <Button variant="whatsapp" size="sm" href={whatsappUrl} isExternal>
                    Ask on WhatsApp
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFaqs.map((faq, index) => {
                  const isOpen = openId === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className={`rounded-xl border transition-all duration-fast overflow-hidden ${
                        isOpen
                          ? "border-l-4 border-l-brand-primary border-border-default bg-surface-white shadow-xs"
                          : "border-l-4 border-l-transparent border-border-subtle bg-surface-white hover:border-border-default"
                      }`}
                    >
                      <button
                        ref={(el) => {
                          buttonRefs.current[index] = el;
                        }}
                        id={`faq-btn-${faq.id}`}
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${faq.id}`}
                        onClick={() => toggleItem(faq.id)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        type="button"
                        className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                      >
                        <span className="text-sm sm:text-base font-bold text-text-heading">
                          {faq.question.en}
                        </span>

                        {/* Plus rotates into minus: vertical bar scales to 0 when open */}
                        <span
                          aria-hidden="true"
                          className="shrink-0 w-6 h-6 rounded-full bg-surface-grey flex items-center justify-center text-brand-primary"
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
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <line
                              x1="12"
                              y1="5"
                              x2="12"
                              y2="19"
                              className={`transition-all duration-fast ${
                                isOpen ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"
                              }`}
                              style={{ transformOrigin: "center" }}
                            />
                          </svg>
                        </span>
                      </button>

                      {/* Smooth CSS grid expander (0fr -> 1fr plus opacity) */}
                      <div
                        id={`faq-answer-${faq.id}`}
                        role="region"
                        aria-labelledby={`faq-btn-${faq.id}`}
                        className="grid transition-all duration-300 ease-out"
                        style={{
                          gridTemplateRows: isOpen ? "1fr" : "0fr",
                        }}
                      >
                        <div
                          className={`overflow-hidden transition-opacity duration-300 px-4 sm:px-5 ${
                            isOpen ? "opacity-100 pb-5 pt-1" : "opacity-0 py-0"
                          }`}
                        >
                          <p className="text-sm text-text-body leading-relaxed">{faq.answer.en}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
