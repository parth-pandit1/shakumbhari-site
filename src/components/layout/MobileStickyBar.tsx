"use client";

import React from "react";
import { buildWhatsAppLink, enquiryMessage } from "@/lib/whatsapp";

interface MobileStickyBarProps {
  phone: string;
  whatsappNumber: string | null;
}

export function MobileStickyBar({
  phone,
  whatsappNumber,
}: MobileStickyBarProps) {
  const activeWaNumber = whatsappNumber || phone;
  const whatsappUrl = buildWhatsAppLink(activeWaNumber, enquiryMessage());

  return (
    <aside
      aria-label="Quick Actions"
      className="fixed bottom-0 left-0 right-0 z-40 block sm:hidden border-t border-border-subtle bg-surface-white/95 backdrop-blur-md px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-lg"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Call Button */}
        <a
          href={`tel:${phone}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 h-12 rounded-xl border border-border-default bg-surface-white text-text-heading font-bold text-sm shadow-xs active:scale-[0.98] transition-transform"
        >
          <svg
            className="h-4 w-4 text-brand-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span>Call Now</span>
        </a>

        {/* WhatsApp Button (Accessible Dark text on #25D366) */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 h-12 rounded-xl bg-whatsapp text-whatsapp-text font-bold text-sm shadow-xs active:scale-[0.98] transition-transform"
        >
          <svg
            className="h-5 w-5 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.029-.481-1.611-.666-2.645-2.296-2.726-2.404-.08-.108-.646-.861-.646-1.642 0-.781.405-1.166.549-1.326.144-.16.315-.2.42-.2.106 0 .211.002.304.006.103.004.24-.039.375.285.144.348.49 1.197.533 1.285.043.087.072.19.014.305-.058.114-.087.186-.173.287-.087.1-.183.224-.261.301-.087.087-.178.182-.077.355.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.174.086.275.072.376-.044.102-.115.434-.506.549-.68.115-.173.231-.144.39-.086s1.012.477 1.185.564.289.13.332.203c.043.072.043.419-.101.824z" />
          </svg>
          <span>WhatsApp</span>
        </a>
      </div>
    </aside>
  );
}
