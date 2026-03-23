import { NextResponse } from "next/server";
import { generateListing } from "@/lib/ai";
import type { ProductInput, Marketplace } from "@/types";

const VALID_MARKETPLACES: Marketplace[] = [
  "amazon",
  "etsy",
  "shopify",
  "ebay",
  "generic",
];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, category, features, marketplace, targetAudience, priceRange } =
      body as Partial<ProductInput>;

    if (!name || !category || !features || !marketplace) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, category, features, marketplace",
        },
        { status: 400 }
      );
    }

    if (!VALID_MARKETPLACES.includes(marketplace)) {
      return NextResponse.json(
        {
          error: `Invalid marketplace. Must be one of: ${VALID_MARKETPLACES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const input: ProductInput = {
      name: name.trim(),
      category: category.trim(),
      features: features.trim(),
      marketplace,
      targetAudience: targetAudience?.trim(),
      priceRange: priceRange?.trim(),
    };

    const listing = await generateListing(input);

    return NextResponse.json(listing);
  } catch (error) {
    console.error("Generation error:", error);

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
