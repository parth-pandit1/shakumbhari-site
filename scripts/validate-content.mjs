/**
 * Content validation script.
 *
 * Validates all JSON files in /content against their respective Zod schemas
 * in src/content/schemas.ts.
 * Exits with code 1 if any validation errors are found, code 0 otherwise.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  SiteSchema,
  PersonSchema,
  ModelsFileSchema,
  OffersFileSchema,
  CustomersFileSchema,
  FaqsFileSchema,
  ServicesFileSchema,
} from "../src/content/schemas.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(ROOT_DIR, "content");

const VALIDATION_TARGETS = [
  { file: "site.json", schema: SiteSchema, name: "Site Configuration" },
  { file: "person.json", schema: PersonSchema, name: "Person / Manager" },
  { file: "models.json", schema: ModelsFileSchema, name: "Vehicle Models" },
  { file: "offers.json", schema: OffersFileSchema, name: "Promotional Offers" },
  { file: "customers.json", schema: CustomersFileSchema, name: "Customer Testimonials" },
  { file: "faqs.json", schema: FaqsFileSchema, name: "Frequently Asked Questions" },
  { file: "services.json", schema: ServicesFileSchema, name: "Offered Services" },
];

console.log("=================================================");
console.log("  Validating Content Files with Zod Schemas      ");
console.log("=================================================\n");

let hasError = false;
const results = [];

for (const target of VALIDATION_TARGETS) {
  const filePath = path.join(CONTENT_DIR, target.file);
  if (!fs.existsSync(filePath)) {
    results.push({
      file: target.file,
      name: target.name,
      status: "MISSING",
      errors: ["File does not exist"],
    });
    hasError = true;
    continue;
  }

  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(raw);
    const parseResult = target.schema.safeParse(json);

    if (parseResult.success) {
      results.push({
        file: target.file,
        name: target.name,
        status: "PASS",
        itemCount: Array.isArray(json) ? json.length : 1,
      });
    } else {
      hasError = true;
      const issues = parseResult.error.issues.map(
        (issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`
      );
      results.push({
        file: target.file,
        name: target.name,
        status: "FAIL",
        errors: issues,
      });
    }
  } catch (err) {
    hasError = true;
    results.push({
      file: target.file,
      name: target.name,
      status: "ERROR",
      errors: [err instanceof Error ? err.message : String(err)],
    });
  }
}

// Print results table
console.log("Status | File             | Content Type            | Details");
console.log("-------+------------------+-------------------------+-------------------");

for (const r of results) {
  const statusStr =
    r.status === "PASS" ? "\x1b[32mPASS\x1b[0m  " : `\x1b[31m${r.status.padEnd(6)}\x1b[0m`;
  const fileStr = r.file.padEnd(16);
  const nameStr = r.name.padEnd(23);
  const detailStr =
    r.status === "PASS" ? `${r.itemCount} item(s) valid` : `${r.errors.length} error(s)`;

  console.log(`${statusStr} | ${fileStr} | ${nameStr} | ${detailStr}`);

  if (r.errors && r.errors.length > 0) {
    for (const err of r.errors) {
      console.log(`       \x1b[31m└── ${err}\x1b[0m`);
    }
  }
}

console.log("\n-------------------------------------------------");
if (hasError) {
  console.error("\x1b[31mValidation FAILED: One or more content files are invalid.\x1b[0m\n");
  process.exit(1);
} else {
  console.log("\x1b[32mValidation PASSED: All content files conform to Zod schemas.\x1b[0m\n");
  process.exit(0);
}
