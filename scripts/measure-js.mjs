import fs from "node:fs";
import path from "node:path";

const html = fs.readFileSync("out/index.html", "utf8");
const matches = [...html.matchAll(/src="(\/_next\/static\/chunks\/[^"]+\.js)"/g)].map((m) => m[1]);
const unique = [...new Set(matches)];
let total = 0;
for (const s of unique) {
  const p = path.join("out", s.replace(/^\//, ""));
  if (fs.existsSync(p)) {
    const sz = fs.statSync(p).size;
    total += sz;
    console.log(`${s}: ${(sz / 1024).toFixed(1)} KB`);
  }
}
console.log(`BASELINE Total First Load JS for /: ${(total / 1024).toFixed(1)} KB (${total} bytes)`);
