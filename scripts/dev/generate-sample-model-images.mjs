// One-off development generator. Can be deleted once real model photography is provided.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const models = [
  { id: "sample-model-a", name: "Sample Model A", color: "#C8102E", bg: "#F8FAFC" },
  { id: "sample-model-b", name: "Sample Model B", color: "#475569", bg: "#F1F5F9" },
  { id: "sample-model-c", name: "Sample Model C", color: "#18181B", bg: "#FAFAFA" },
  { id: "sample-model-d", name: "Sample Model D", color: "#0284C7", bg: "#F0F9FF" },
  { id: "sample-model-e", name: "Sample Model E", color: "#16A34A", bg: "#F0FDF4" },
];

const outDir = path.resolve("public/images/models");
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

for (const m of models) {
  const svg = `
<svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${m.bg}" />
      <stop offset="100%" stop-color="#E2E8F0" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.15" />
    </filter>
  </defs>

  <!-- Studio Floor & Background -->
  <rect width="800" height="500" rx="16" fill="url(#bgGrad)" />
  <ellipse cx="400" cy="420" rx="280" ry="32" fill="#000000" opacity="0.08" />

  <!-- Scooter Graphic (Modern Unbranded EV Silhouette) -->
  <g filter="url(#shadow)" transform="translate(100, 70)">
    <!-- Rear Wheel -->
    <circle cx="150" cy="280" r="60" fill="#1E293B" />
    <circle cx="150" cy="280" r="42" fill="#94A3B8" />
    <circle cx="150" cy="280" r="20" fill="#1E293B" />

    <!-- Front Wheel -->
    <circle cx="480" cy="280" r="60" fill="#1E293B" />
    <circle cx="480" cy="280" r="42" fill="#94A3B8" />
    <circle cx="480" cy="280" r="20" fill="#1E293B" />

    <!-- Chassis Base & Floorboard -->
    <path d="M 150 280 L 260 280 L 370 280 L 400 240 L 460 210" fill="none" stroke="#334155" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
    
    <!-- Floorboard -->
    <path d="M 230 270 L 360 270" stroke="#0F172A" stroke-width="18" stroke-linecap="round" />

    <!-- Main Body & Fairing (Accented Color) -->
    <path d="M 120 250 C 130 180, 180 170, 240 180 L 280 230 L 220 270 Z" fill="${m.color}" />
    
    <!-- Seat -->
    <path d="M 140 170 C 180 160, 260 160, 290 190 L 220 195 Z" fill="#0F172A" />

    <!-- Front Fork & Apron -->
    <path d="M 480 280 L 440 120" stroke="#475569" stroke-width="12" stroke-linecap="round" />
    <path d="M 430 110 L 460 180 L 430 250 L 390 230 L 400 130 Z" fill="${m.color}" />

    <!-- Handlebar & Headlamp -->
    <path d="M 435 110 L 405 100 L 465 100" stroke="#0F172A" stroke-width="10" stroke-linecap="round" />
    <circle cx="445" cy="115" r="12" fill="#E2E8F0" />
    <path d="M 445 115 L 455 115" stroke="#38BDF8" stroke-width="4" stroke-linecap="round" />
  </g>

  <!-- Watermark: Sample & Unbranded -->
  <text x="400" y="465" font-family="system-ui, sans-serif" font-size="14" font-weight="600" fill="#64748B" text-anchor="middle" letter-spacing="1">
    SAMPLE UNBRANDED EV SCOOTER ILLUSTRATION
  </text>
</svg>
  `;

  const webpBuffer = await sharp(Buffer.from(svg)).webp({ quality: 90 }).toBuffer();

  const outPath = path.join(outDir, `${m.id}.webp`);
  fs.writeFileSync(outPath, webpBuffer);
  console.log(`Generated: ${outPath}`);
}
