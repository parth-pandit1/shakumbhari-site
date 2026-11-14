/**
 * scripts/check-contrast.mjs
 * Computes WCAG 2.1 contrast ratios for design system colour pairs.
 * Fails (exit code 1) if normal text is below 4.5:1 or large text below 3.0:1.
 * Pure ESM, no external dependencies.
 */

function parseHex(hex) {
  let clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    clean = clean
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(clean, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function channelLuminance(channel) {
  const s = channel / 255;
  return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

function relativeLuminance([r, g, b]) {
  return (
    0.2126 * channelLuminance(r) +
    0.7152 * channelLuminance(g) +
    0.0722 * channelLuminance(b)
  );
}

export function getContrastRatio(fgHex, bgHex) {
  const l1 = relativeLuminance(parseHex(fgHex));
  const l2 = relativeLuminance(parseHex(bgHex));
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

export const colorPairs = [
  // Primary brand red pairs
  {
    role: "Brand Red on White",
    fg: "#C8102E",
    bg: "#FFFFFF",
    type: "normal",
  },
  {
    role: "Brand Red on Light Tint",
    fg: "#C8102E",
    bg: "#FFF1F2",
    type: "normal",
  },
  {
    role: "Brand Red on Surface Grey",
    fg: "#C8102E",
    bg: "#F3F4F6",
    type: "normal",
  },
  {
    role: "White on Brand Red (Button/Badge)",
    fg: "#FFFFFF",
    bg: "#C8102E",
    type: "normal",
  },
  {
    role: "White on Red Hover",
    fg: "#FFFFFF",
    bg: "#A50D22",
    type: "normal",
  },

  // Near-black headings and body text
  {
    role: "Near-Black (Headings) on White",
    fg: "#1C1C1C",
    bg: "#FFFFFF",
    type: "normal",
  },
  {
    role: "Near-Black on Surface Grey",
    fg: "#1C1C1C",
    bg: "#F3F4F6",
    type: "normal",
  },
  {
    role: "Near-Black on Light Tint",
    fg: "#1C1C1C",
    bg: "#FFF1F2",
    type: "normal",
  },
  {
    role: "Body Text on White",
    fg: "#3D3D3D",
    bg: "#FFFFFF",
    type: "normal",
  },
  {
    role: "Body Text on Surface Grey",
    fg: "#3D3D3D",
    bg: "#F3F4F6",
    type: "normal",
  },
  {
    role: "Body Text on Light Tint",
    fg: "#3D3D3D",
    bg: "#FFF1F2",
    type: "normal",
  },

  // Accessible Muted Text (using #525252, NOT #9CA3AF)
  {
    role: "Muted Secondary Text on White",
    fg: "#525252",
    bg: "#FFFFFF",
    type: "normal",
  },
  {
    role: "Muted Secondary Text on Surface Grey",
    fg: "#525252",
    bg: "#F3F4F6",
    type: "normal",
  },

  // Dark surface pairs
  {
    role: "White on Dark Surface",
    fg: "#FFFFFF",
    bg: "#1C1C1C",
    type: "normal",
  },
  {
    role: "Muted Light Text on Dark Surface",
    fg: "#D1D5DB",
    bg: "#1C1C1C",
    type: "normal",
  },

  // WhatsApp accessible pairs (Dark text on #25D366, NOT white)
  {
    role: "WhatsApp CTA Dark Text on Green",
    fg: "#121212",
    bg: "#25D366",
    type: "normal",
  },
  {
    role: "WhatsApp CTA Deep Forest on Green",
    fg: "#0A331A",
    bg: "#25D366",
    type: "normal",
  },

  // Semantic feedback colors
  {
    role: "Success Text on Success Light",
    fg: "#166534",
    bg: "#DCFCE7",
    type: "normal",
  },
  {
    role: "Success Text on White",
    fg: "#166534",
    bg: "#FFFFFF",
    type: "normal",
  },
  {
    role: "White on Solid Success",
    fg: "#FFFFFF",
    bg: "#15803D",
    type: "normal",
  },
  {
    role: "Warning Text on Warning Light",
    fg: "#854D0E",
    bg: "#FEF3C7",
    type: "normal",
  },
  {
    role: "Warning Text on White",
    fg: "#854D0E",
    bg: "#FFFFFF",
    type: "normal",
  },
  {
    role: "Danger Text on Danger Light",
    fg: "#991B1B",
    bg: "#FEE2E2",
    type: "normal",
  },
  {
    role: "Danger Text on White",
    fg: "#991B1B",
    bg: "#FFFFFF",
    type: "normal",
  },
  {
    role: "White on Solid Danger",
    fg: "#FFFFFF",
    bg: "#DC2626",
    type: "normal",
  },
];

function run() {
  console.log("==========================================================================================");
  console.log("                          DESIGN SYSTEM WCAG CONTRAST AUDIT                               ");
  console.log("==========================================================================================");
  console.log(
    "| Role / Intended Usage                  | FG      | BG      | Ratio   | Min Req | Result |"
  );
  console.log(
    "|----------------------------------------|---------|---------|---------|---------|--------|"
  );

  let failedCount = 0;

  for (const pair of colorPairs) {
    const ratio = getContrastRatio(pair.fg, pair.bg);
    const minRequired = pair.type === "large" ? 3.0 : 4.5;
    const passed = ratio >= minRequired;

    if (!passed) {
      failedCount++;
    }

    const roleCol = pair.role.padEnd(38);
    const fgCol = pair.fg.padEnd(7);
    const bgCol = pair.bg.padEnd(7);
    const ratioCol = `${ratio.toFixed(2)}:1`.padEnd(7);
    const minCol = `${minRequired.toFixed(1)}:1`.padEnd(7);
    const resultCol = passed ? "PASS" : "FAIL";

    console.log(
      `| ${roleCol} | ${fgCol} | ${bgCol} | ${ratioCol} | ${minCol} | ${resultCol}   |`
    );
  }

  console.log("==========================================================================================");

  if (failedCount > 0) {
    console.error(`\n❌ Contrast audit FAILED: ${failedCount} pair(s) did not meet WCAG AA requirements.`);
    process.exit(1);
  } else {
    console.log(`\n✅ All ${colorPairs.length} colour pairs PASSED WCAG AA contrast standards.`);
  }
}

if (process.argv[1]?.endsWith("check-contrast.mjs")) {
  run();
}
