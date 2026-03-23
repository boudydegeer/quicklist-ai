import { NextResponse } from "next/server";
import { generateListing } from "@/lib/ai";
import { isDemoMode, isSupabaseConfigured } from "@/lib/demo";
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
    const demo = isDemoMode();
    let dbUser: { id: string } | null = null;
    let dbClient: Awaited<ReturnType<typeof import("@/lib/supabase/server").createClient>> | null = null;

    if (!demo && isSupabaseConfigured()) {
      const { createClient } = await import("@/lib/supabase/server");
      dbClient = await createClient();
      const {
        data: { user },
      } = await dbClient.auth.getUser();

      if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      dbUser = user;
    }

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

    // Save generation to database (skip in demo mode)
    if (dbUser && dbClient) {
      await dbClient.from("generations").insert({
        user_id: dbUser.id,
        product_name: input.name,
        category: input.category,
        marketplace: input.marketplace,
        input_data: input,
        output_data: listing,
      });

      await dbClient.rpc("increment_generations_used", { uid: dbUser.id });
    }

    return NextResponse.json(listing);
  } catch (error) {
    console.error("Generation error:", error);

    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
