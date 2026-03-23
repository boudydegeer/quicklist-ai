import { NextResponse } from "next/server";
import { generateListing } from "@/lib/ai";
import type { ProductInput, Marketplace, GeneratedListing } from "@/types";

const VALID_MARKETPLACES: Marketplace[] = [
  "amazon",
  "etsy",
  "shopify",
  "ebay",
  "generic",
];

interface BulkResult {
  index: number;
  input: ProductInput;
  listing?: GeneratedListing;
  error?: string;
}

function parseCSV(csv: string): string[][] {
  const lines = csv.trim().split("\n");
  return lines.map((line) => {
    const result: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { csv } = body as { csv: string };

    if (!csv || typeof csv !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid csv field in request body" },
        { status: 400 }
      );
    }

    const rows = parseCSV(csv);

    if (rows.length < 2) {
      return NextResponse.json(
        { error: "CSV must have a header row and at least one data row" },
        { status: 400 }
      );
    }

    const header = rows[0].map((h) => h.toLowerCase().replace(/\s+/g, "_"));
    const nameIdx = header.indexOf("product_name");
    const catIdx = header.indexOf("category");
    const featIdx = header.indexOf("features");
    const mktIdx = header.indexOf("marketplace");

    if (nameIdx === -1 || catIdx === -1 || featIdx === -1 || mktIdx === -1) {
      return NextResponse.json(
        {
          error:
            "CSV must have columns: product_name, category, features, marketplace",
        },
        { status: 400 }
      );
    }

    const dataRows = rows.slice(1).filter((row) => row.some((cell) => cell));
    const results: BulkResult[] = [];

    for (let i = 0; i < dataRows.length; i++) {
      const row = dataRows[i];
      const marketplace = (row[mktIdx] || "generic").toLowerCase() as Marketplace;

      if (!VALID_MARKETPLACES.includes(marketplace)) {
        results.push({
          index: i,
          input: {
            name: row[nameIdx] || "",
            category: row[catIdx] || "",
            features: row[featIdx] || "",
            marketplace: "generic",
          },
          error: `Invalid marketplace "${row[mktIdx]}". Skipped.`,
        });
        continue;
      }

      const input: ProductInput = {
        name: (row[nameIdx] || "").trim(),
        category: (row[catIdx] || "").trim(),
        features: (row[featIdx] || "").trim(),
        marketplace,
      };

      if (!input.name || !input.category || !input.features) {
        results.push({
          index: i,
          input,
          error: "Missing required fields (name, category, or features). Skipped.",
        });
        continue;
      }

      try {
        const listing = await generateListing(input);
        results.push({ index: i, input, listing });
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Generation failed";
        results.push({ index: i, input, error: message });
      }
    }

    return NextResponse.json({ results, total: dataRows.length });
  } catch (error) {
    console.error("Bulk generation error:", error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
