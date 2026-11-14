import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Style Guide & Design Tokens — Shakumbhari Automobile",
  description:
    "Internal design system documentation, colour contrast audit, typography and tokens.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function StyleGuidePage() {
  return (
    <div className="min-h-screen bg-surface-white px-4 py-8 sm:px-8 sm:py-12 max-w-6xl mx-auto">
      {/* Header */}
      <header className="border-b border-border-subtle pb-8 mb-10">
        <div className="inline-block px-3 py-1 mb-3 rounded-full bg-brand-tint text-brand-primary text-xs font-semibold uppercase tracking-wider">
          Design System v1.0
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-text-heading mb-3">
          Shakumbhari Automobile — Style Guide
        </h1>
        <p className="text-text-muted text-base max-w-2xl">
          Tokens and specifications derived directly from showroom branding. Built mobile-first
          (designed for 360px+), colour pairs tested for AA contrast, and optimized for performance
          with self-hosted variable fonts.
        </p>
      </header>

      {/* 1. Colour Palette & Contrast */}
      <section className="mb-14">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-text-heading mb-1">
            1. Colour Palette & Contrast
          </h2>
          <p className="text-sm text-text-muted">
            All text and background combinations are tested for AA contrast (&ge; 4.5:1 for normal
            text).
          </p>
        </div>

        {/* Brand Colors */}
        <h3 className="text-lg font-semibold text-text-heading mb-3">Brand Red (from Signboard)</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-lg border border-border-subtle bg-surface-white">
            <div className="h-16 rounded-md bg-brand-primary mb-3 flex items-center justify-center text-white text-xs font-bold shadow-xs">
              #C8102E
            </div>
            <div className="font-semibold text-text-heading text-sm">Primary Brand Red</div>
            <div className="text-xs text-text-muted font-mono mt-1">#C8102E</div>
            <div className="mt-2 text-xs text-brand-primary font-medium">
              Contrast: 5.88:1 on white (PASS)
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border-subtle bg-surface-white">
            <div className="h-16 rounded-md bg-brand-hover mb-3 flex items-center justify-center text-white text-xs font-bold shadow-xs">
              #A50D22
            </div>
            <div className="font-semibold text-text-heading text-sm">Red Hover / Active</div>
            <div className="text-xs text-text-muted font-mono mt-1">#A50D22</div>
            <div className="mt-2 text-xs text-text-muted font-medium">
              Contrast: 7.83:1 on white (PASS)
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border-subtle bg-surface-white">
            <div className="h-16 rounded-md bg-brand-tint border border-brand-border mb-3 flex items-center justify-center text-brand-primary text-xs font-bold shadow-xs">
              #FFF1F2
            </div>
            <div className="font-semibold text-text-heading text-sm">Light Brand Tint</div>
            <div className="text-xs text-text-muted font-mono mt-1">#FFF1F2</div>
            <div className="mt-2 text-xs text-brand-primary font-medium">
              Red text: 5.36:1 (PASS)
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border-subtle bg-surface-white">
            <div className="h-16 rounded-md bg-brand-border mb-3 flex items-center justify-center text-text-heading text-xs font-bold shadow-xs">
              #FCA5A5
            </div>
            <div className="font-semibold text-text-heading text-sm">Brand Accent Border</div>
            <div className="text-xs text-text-muted font-mono mt-1">#FCA5A5</div>
            <div className="mt-2 text-xs text-text-muted font-medium">
              For badges & subtle borders
            </div>
          </div>
        </div>

        {/* Text & Neutral Colors */}
        <h3 className="text-lg font-semibold text-text-heading mb-3">
          Neutrals & Accessible Typography
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-lg border border-border-subtle bg-surface-white">
            <div className="h-16 rounded-md bg-text-heading mb-3 flex items-center justify-center text-white text-xs font-bold shadow-xs">
              #1C1C1C
            </div>
            <div className="font-semibold text-text-heading text-sm">Headings (Near-Black)</div>
            <div className="text-xs text-text-muted font-mono mt-1">#1C1C1C</div>
            <div className="mt-2 text-xs text-text-muted font-medium">
              Contrast: 17.04:1 on white (PASS)
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border-subtle bg-surface-white">
            <div className="h-16 rounded-md bg-text-body mb-3 flex items-center justify-center text-white text-xs font-bold shadow-xs">
              #3D3D3D
            </div>
            <div className="font-semibold text-text-heading text-sm">Body Text (Charcoal)</div>
            <div className="text-xs text-text-muted font-mono mt-1">#3D3D3D</div>
            <div className="mt-2 text-xs text-text-muted font-medium">
              Contrast: 10.86:1 on white (PASS)
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border-subtle bg-surface-white">
            <div className="h-16 rounded-md bg-text-muted mb-3 flex items-center justify-center text-white text-xs font-bold shadow-xs">
              #525252
            </div>
            <div className="font-semibold text-text-heading text-sm">Muted Secondary Text</div>
            <div className="text-xs text-text-muted font-mono mt-1">#525252 (Avoids #9CA3AF)</div>
            <div className="mt-2 text-xs text-text-muted font-medium">
              Contrast: 7.81:1 on white (PASS)
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border-subtle bg-surface-white">
            <div className="h-16 rounded-md bg-surface-grey border border-border-subtle mb-3 flex items-center justify-center text-text-heading text-xs font-bold shadow-xs">
              #F3F4F6
            </div>
            <div className="font-semibold text-text-heading text-sm">Surface Grey</div>
            <div className="text-xs text-text-muted font-mono mt-1">#F3F4F6</div>
            <div className="mt-2 text-xs text-text-muted font-medium">Subtle card / section bg</div>
          </div>
        </div>

        {/* WhatsApp & Feedback Colors */}
        <h3 className="text-lg font-semibold text-text-heading mb-3">
          WhatsApp & Status Colours (Accessible)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg border border-border-subtle bg-surface-white">
            <div className="h-16 rounded-md bg-whatsapp mb-3 flex items-center justify-center text-whatsapp-text text-xs font-bold shadow-xs">
              Dark text on #25D366
            </div>
            <div className="font-semibold text-text-heading text-sm">WhatsApp CTA Button</div>
            <div className="text-xs text-text-muted font-mono mt-1">
              BG: #25D366 | Text: #121212
            </div>
            <div className="mt-2 text-xs text-success-text font-medium">
              Contrast: 9.45:1 (Never white text)
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border-subtle bg-surface-white">
            <div className="h-16 rounded-md bg-success-bg border border-success-text/20 mb-3 flex items-center justify-center text-success-text text-xs font-bold shadow-xs">
              Success Status
            </div>
            <div className="font-semibold text-text-heading text-sm">Success Feedback</div>
            <div className="text-xs text-text-muted font-mono mt-1">
              BG: #DCFCE7 | Text: #166534
            </div>
            <div className="mt-2 text-xs text-success-text font-medium">
              Contrast: 6.49:1 (PASS)
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border-subtle bg-surface-white">
            <div className="h-16 rounded-md bg-warning-bg border border-warning-text/20 mb-3 flex items-center justify-center text-warning-text text-xs font-bold shadow-xs">
              Warning Status
            </div>
            <div className="font-semibold text-text-heading text-sm">Warning Feedback</div>
            <div className="text-xs text-text-muted font-mono mt-1">
              BG: #FEF3C7 | Text: #854D0E
            </div>
            <div className="mt-2 text-xs text-warning-text font-medium">
              Contrast: 6.15:1 (PASS)
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border-subtle bg-surface-white">
            <div className="h-16 rounded-md bg-danger-bg border border-danger-text/20 mb-3 flex items-center justify-center text-danger-text text-xs font-bold shadow-xs">
              Danger Status
            </div>
            <div className="font-semibold text-text-heading text-sm">Danger / Error Feedback</div>
            <div className="text-xs text-text-muted font-mono mt-1">
              BG: #FEE2E2 | Text: #991B1B
            </div>
            <div className="mt-2 text-xs text-danger-text font-medium">Contrast: 6.80:1 (PASS)</div>
          </div>
        </div>
      </section>

      {/* 2. Fluid Typography Scale */}
      <section className="mb-14">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-text-heading mb-1">2. Typography & Fluid Scale</h2>
          <p className="text-sm text-text-muted">
            Self-hosted fonts: <strong>Plus Jakarta Sans</strong> for headings & display,{" "}
            <strong>Inter</strong> for body and UI. Sizes scale smoothly via CSS{" "}
            <code>clamp()</code> from 360px mobile viewports up to desktop.
          </p>
        </div>

        <div className="space-y-6 border border-border-subtle rounded-xl p-6 bg-surface-white">
          <div className="border-b border-border-subtle pb-4">
            <div className="text-xs font-mono text-text-muted mb-1">
              text-5xl (clamp: 44px &rarr; 60px, font-display, bold 700)
            </div>
            <div className="text-5xl font-bold text-text-heading font-display">Shakumbhari EV</div>
          </div>

          <div className="border-b border-border-subtle pb-4">
            <div className="text-xs font-mono text-text-muted mb-1">
              text-4xl (clamp: 36px &rarr; 48px, font-display, bold 700)
            </div>
            <div className="text-4xl font-bold text-text-heading font-display">
              Smart Electric Mobility
            </div>
          </div>

          <div className="border-b border-border-subtle pb-4">
            <div className="text-xs font-mono text-text-muted mb-1">
              text-3xl (clamp: 30px &rarr; 38px, font-display, bold 700)
            </div>
            <div className="text-3xl font-bold text-text-heading font-display">
              Showroom & Service Centre
            </div>
          </div>

          <div className="border-b border-border-subtle pb-4">
            <div className="text-xs font-mono text-text-muted mb-1">
              text-2xl (clamp: 24px &rarr; 30px, font-display, semibold 600)
            </div>
            <div className="text-2xl font-semibold text-text-heading font-display">
              Explore Models & Features
            </div>
          </div>

          <div className="border-b border-border-subtle pb-4">
            <div className="text-xs font-mono text-text-muted mb-1">
              text-xl (clamp: 20px &rarr; 24px, font-display, semibold 600)
            </div>
            <div className="text-xl font-semibold text-text-heading font-display">
              Long Battery Range and Fast Charging
            </div>
          </div>

          <div className="border-b border-border-subtle pb-4">
            <div className="text-xs font-mono text-text-muted mb-1">
              text-lg (clamp: 18px &rarr; 20px, font-sans, medium 500)
            </div>
            <div className="text-lg font-medium text-text-body font-sans">
              Reliable, quiet, and eco-friendly scooters designed for daily commuting.
            </div>
          </div>

          <div className="border-b border-border-subtle pb-4">
            <div className="text-xs font-mono text-text-muted mb-1">
              text-base (clamp: 16px &rarr; 17px, font-sans, regular 400)
            </div>
            <p className="text-base text-text-body font-sans leading-relaxed">
              Standard body text with generous 1.6 line height for comfortable reading on small
              smartphone screens. Contrast ratio with white is 10.86:1, well above the 4.5:1
              minimum.
            </p>
          </div>

          <div className="border-b border-border-subtle pb-4">
            <div className="text-xs font-mono text-text-muted mb-1">
              text-sm (clamp: 14px &rarr; 15px, font-sans, regular 400)
            </div>
            <p className="text-sm text-text-muted font-sans">
              Secondary details, captions, and specifications. Contrast ratio is 7.81:1 for clear
              legibility.
            </p>
          </div>

          <div>
            <div className="text-xs font-mono text-text-muted mb-1">
              text-xs (clamp: 12px &rarr; 13px, font-sans, medium 500 uppercase)
            </div>
            <p className="text-xs font-medium text-text-muted font-sans uppercase tracking-wider">
              Badge, Metadata, Timestamps &middot; Chhachrauli Road, Ledi
            </p>
          </div>
        </div>
      </section>

      {/* 3. Spacing Scale */}
      <section className="mb-14">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-text-heading mb-1">3. Spacing Scale</h2>
          <p className="text-sm text-text-muted">
            Strict 4px grid system for layout rhythm and consistent touch targets.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-3 border border-border-subtle rounded-lg bg-surface-white">
            <div className="text-xs font-mono text-text-muted mb-2">p-2 (8px)</div>
            <div className="h-6 bg-brand-tint border border-brand-border rounded flex items-center justify-center text-[10px] text-brand-primary font-mono">
              8px
            </div>
          </div>

          <div className="p-3 border border-border-subtle rounded-lg bg-surface-white">
            <div className="text-xs font-mono text-text-muted mb-2">p-4 (16px)</div>
            <div className="h-8 bg-brand-tint border border-brand-border rounded flex items-center justify-center text-[10px] text-brand-primary font-mono">
              16px
            </div>
          </div>

          <div className="p-3 border border-border-subtle rounded-lg bg-surface-white">
            <div className="text-xs font-mono text-text-muted mb-2">p-6 (24px)</div>
            <div className="h-10 bg-brand-tint border border-brand-border rounded flex items-center justify-center text-[10px] text-brand-primary font-mono">
              24px
            </div>
          </div>

          <div className="p-3 border border-border-subtle rounded-lg bg-surface-white">
            <div className="text-xs font-mono text-text-muted mb-2">p-8 (32px)</div>
            <div className="h-12 bg-brand-tint border border-brand-border rounded flex items-center justify-center text-[10px] text-brand-primary font-mono">
              32px
            </div>
          </div>
        </div>
      </section>

      {/* 4. Radius & Elevation */}
      <section className="mb-14">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-text-heading mb-1">
            4. Border Radius & Elevation Shadows
          </h2>
          <p className="text-sm text-text-muted">
            Clean corner radii paired with subtle layered shadows.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          <div className="h-20 bg-surface-grey border border-border-subtle rounded-xs flex items-center justify-center text-xs font-mono text-text-body">
            xs (2px)
          </div>
          <div className="h-20 bg-surface-grey border border-border-subtle rounded-sm flex items-center justify-center text-xs font-mono text-text-body">
            sm (4px)
          </div>
          <div className="h-20 bg-surface-grey border border-border-subtle rounded-md flex items-center justify-center text-xs font-mono text-text-body">
            md (8px)
          </div>
          <div className="h-20 bg-surface-grey border border-border-subtle rounded-lg flex items-center justify-center text-xs font-mono text-text-body">
            lg (12px)
          </div>
          <div className="h-20 bg-surface-grey border border-border-subtle rounded-xl flex items-center justify-center text-xs font-mono text-text-body">
            xl (16px)
          </div>
          <div className="h-20 bg-surface-grey border border-border-subtle rounded-full flex items-center justify-center text-xs font-mono text-text-body">
            full
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl bg-surface-white shadow-sm border border-border-subtle">
            <div className="font-semibold text-text-heading text-sm mb-1">shadow-sm</div>
            <p className="text-xs text-text-muted">
              Subtle elevation for cards, inputs, and small tiles.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-surface-white shadow-md border border-border-subtle">
            <div className="font-semibold text-text-heading text-sm mb-1">shadow-md</div>
            <p className="text-xs text-text-muted">
              Medium elevation for interactive cards and floating headers.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-surface-white shadow-lg border border-border-subtle">
            <div className="font-semibold text-text-heading text-sm mb-1">shadow-lg</div>
            <p className="text-xs text-text-muted">
              High elevation for dialogs, bottom sheets, and dropdowns.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Interactive States & Focus Rings */}
      <section className="mb-14">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-text-heading mb-1">
            5. Interactive Controls & Focus Rings
          </h2>
          <p className="text-sm text-text-muted">
            All focusable elements feature a dual-ring focus style visible on both light and dark
            backgrounds. Press <strong>Tab</strong> on your keyboard to test focus states.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Light Background States */}
          <div className="p-6 rounded-xl border border-border-subtle bg-surface-white">
            <h3 className="text-base font-semibold text-text-heading mb-4">
              Light Surface Controls
            </h3>
            <div className="flex flex-wrap gap-4 items-center mb-6">
              {/* Primary Red Button */}
              <button
                type="button"
                className="px-5 py-2.5 rounded-lg bg-brand-primary text-white font-medium text-sm transition-colors hover:bg-brand-hover active:scale-[0.98]"
              >
                Primary Red Button
              </button>

              {/* WhatsApp Button (Accessible dark text) */}
              <button
                type="button"
                className="px-5 py-2.5 rounded-lg bg-whatsapp text-whatsapp-text font-medium text-sm transition-colors hover:bg-whatsapp-hover active:scale-[0.98]"
              >
                WhatsApp Button
              </button>

              {/* Outline Button */}
              <button
                type="button"
                className="px-5 py-2.5 rounded-lg border border-border-default text-text-heading font-medium text-sm transition-colors hover:bg-surface-grey active:scale-[0.98]"
              >
                Outline Button
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="sample-input"
                  className="block text-xs font-medium text-text-heading mb-1"
                >
                  Sample Form Input
                </label>
                <input
                  id="sample-input"
                  type="text"
                  placeholder="Enter phone number..."
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-border-default bg-white text-text-body placeholder:text-text-muted focus:border-brand-primary"
                />
              </div>

              <div>
                <a
                  href="#test"
                  className="text-sm font-medium text-brand-primary underline underline-offset-4 hover:text-brand-hover inline-block"
                >
                  Sample Accessible Link with Focus Ring &rarr;
                </a>
              </div>
            </div>
          </div>

          {/* Dark Background States */}
          <div className="p-6 rounded-xl bg-surface-dark text-white">
            <h3 className="text-base font-semibold text-white mb-4">Dark Surface Controls</h3>
            <div className="flex flex-wrap gap-4 items-center mb-6">
              <button
                type="button"
                className="px-5 py-2.5 rounded-lg bg-brand-primary text-white font-medium text-sm transition-colors hover:bg-brand-hover"
              >
                Primary Button
              </button>

              <button
                type="button"
                className="px-5 py-2.5 rounded-lg bg-whatsapp text-whatsapp-text font-medium text-sm transition-colors hover:bg-whatsapp-hover"
              >
                WhatsApp Button
              </button>

              <button
                type="button"
                className="px-5 py-2.5 rounded-lg border border-zinc-700 text-white font-medium text-sm transition-colors hover:bg-zinc-800"
              >
                Dark Outline Button
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="dark-input"
                  className="block text-xs font-medium text-zinc-300 mb-1"
                >
                  Sample Input on Dark
                </label>
                <input
                  id="dark-input"
                  type="text"
                  placeholder="Dark input placeholder..."
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-400 focus:border-white"
                />
              </div>

              <div>
                <a
                  href="#test-dark"
                  className="text-sm font-medium text-brand-tint underline underline-offset-4 hover:text-white inline-block"
                >
                  Sample Link on Dark with Focus Ring &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <footer className="pt-8 border-t border-border-subtle text-xs text-text-muted flex flex-col sm:flex-row justify-between gap-4">
        <div>Shakumbhari Automobile &middot; Design System & Tokens</div>
        <div>Colour pairs tested for AA contrast &middot; Mobile-First 360px</div>
      </footer>
    </div>
  );
}
