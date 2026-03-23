import type { GeneratedListing, Marketplace, ProductInput } from "@/types";

export function isDemoMode(): boolean {
  const provider = (process.env.AI_PROVIDER || "").toLowerCase();

  // Explicit demo mode
  if (provider === "demo") return true;

  // If provider is gemini, check for Gemini key
  if (provider === "gemini") {
    const geminiKey = process.env.GEMINI_API_KEY;
    return !geminiKey || geminiKey === "your-key-here";
  }

  // If provider is anthropic (or unset), check for Anthropic key
  if (provider === "anthropic" || provider === "") {
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    return !anthropicKey || anthropicKey === "demo" || anthropicKey === "your-key-here";
  }

  // Unknown provider — fall back to demo
  return true;
}

export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "your-url-here" &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== "your-key-here"
  );
}

const SAMPLE_LISTINGS: Record<Marketplace, GeneratedListing> = {
  amazon: {
    title:
      "Premium Organic Bamboo Cutting Board Set (3-Pack) - Extra Large Kitchen Chopping Boards with Juice Groove, BPA-Free, Eco-Friendly",
    description:
      "Transform your kitchen prep experience with our Premium Organic Bamboo Cutting Board Set. Crafted from 100% sustainably sourced Moso bamboo, each board features a deep juice groove to keep your countertops clean and a smooth, knife-friendly surface that won't dull your blades.\n\nThis versatile 3-piece set includes Large (18x12\"), Medium (14x10\"), and Small (10x7\") boards, perfect for every task from carving roasts to slicing fruits. The dense bamboo grain naturally resists bacteria, odors, and moisture — making these boards more hygienic than plastic alternatives.\n\nEach board is finished with food-grade mineral oil for a beautiful, long-lasting sheen. The lightweight yet sturdy design includes easy-grip handles for comfortable carrying and convenient hanging storage. Makes an exceptional housewarming or wedding gift.",
    bulletPoints: [
      "PREMIUM 3-PIECE SET — Includes Large (18x12\"), Medium (14x10\"), and Small (10x7\") cutting boards to handle any kitchen task from meal prep to serving",
      "100% ORGANIC MOSO BAMBOO — Sustainably harvested bamboo is 16% harder than maple, naturally antimicrobial, and won't dull your knives",
      "DEEP JUICE GROOVE — Integrated channel catches liquids from meats, fruits, and vegetables to keep your counters spotless",
      "ECO-FRIENDLY & BPA-FREE — Zero plastic, zero chemicals. Food-grade mineral oil finish is safe for your family and the environment",
      "EASY CARE & STORAGE — Hand wash with warm soapy water. Built-in handles double as hanging holes for space-saving storage",
    ],
    metaTitle: "Organic Bamboo Cutting Board Set 3-Pack | Kitchen",
    metaDescription:
      "Premium 3-piece organic bamboo cutting board set with juice grooves. Eco-friendly, BPA-free, antimicrobial. Perfect for meal prep. Free shipping.",
    seoKeywords: [
      "bamboo cutting board",
      "organic cutting board set",
      "kitchen chopping board",
      "eco-friendly cutting board",
      "bamboo chopping block",
      "large cutting board",
      "wood cutting board set",
      "antimicrobial cutting board",
    ],
    imageAltText:
      "Set of three organic bamboo cutting boards in different sizes arranged on a marble countertop with fresh vegetables",
    marketplace: "amazon",
  },

  etsy: {
    title:
      "Hand-Poured Soy Candle | Lavender & Vanilla | All Natural Essential Oil Candle | Cotton Wick | Reusable Glass Jar | Eco Gift",
    description:
      "Bring the calming essence of a lavender field into your home with this lovingly hand-poured soy wax candle. Each candle is crafted in small batches in our Portland, Oregon studio using 100% pure soy wax and a curated blend of lavender and vanilla essential oils — never synthetic fragrances.\n\nThe natural cotton wick provides a clean, even burn with zero soot, while the premium soy wax burns 50% longer than paraffin candles. Housed in a beautiful 8oz reusable glass jar with a minimalist label, this candle transitions perfectly from cozy reading nook to elegant dinner table centerpiece.\n\nOnce your candle has burned through, simply clean the jar with warm water and repurpose it as a succulent planter, makeup brush holder, or storage container. It's the sustainable luxury you deserve.\n\nBurn time: approximately 45-50 hours.\nWeight: 8oz / 227g\nDimensions: 3\" diameter x 3.5\" tall",
    bulletPoints: [
      "Hand-poured in small batches with 100% natural soy wax",
      "Lavender & vanilla essential oil blend — no synthetic fragrances",
      "Clean-burning cotton wick with zero soot",
      "45-50 hour burn time in a reusable 8oz glass jar",
      "Eco-friendly, vegan, and cruelty-free",
    ],
    metaTitle: "Hand-Poured Soy Candle Lavender Vanilla Natural",
    metaDescription:
      "Hand-poured lavender & vanilla soy candle with essential oils. Clean-burning cotton wick, 45-50 hour burn time. Eco-friendly gift in reusable glass jar.",
    seoKeywords: [
      "soy candle",
      "lavender candle",
      "hand poured candle",
      "natural candle",
      "essential oil candle",
      "vanilla candle",
      "eco friendly candle",
      "cotton wick candle",
      "reusable jar candle",
      "aromatherapy candle",
      "vegan candle",
      "housewarming gift",
      "self care gift",
    ],
    imageAltText:
      "Hand-poured lavender and vanilla soy candle in a clear glass jar with a minimalist label, placed on a wooden tray with dried lavender sprigs",
    marketplace: "etsy",
  },

  shopify: {
    title: "SoundWave Pro Wireless Bluetooth Speaker",
    description:
      "Meet your new favorite travel companion. The SoundWave Pro delivers room-filling 360-degree sound in a sleek, waterproof design that goes wherever your adventures take you. Whether you're hosting a backyard barbecue, relaxing at the beach, or unwinding after a long day, this speaker delivers crystal-clear audio that punches well above its size.\n\nPowered by dual 10W drivers and a passive bass radiator, the SoundWave Pro produces rich, balanced sound with deep bass that you can feel. Bluetooth 5.3 ensures a stable connection up to 100 feet away, while the built-in microphone lets you take calls without missing a beat.\n\nWith IPX7 waterproof certification, 24-hour battery life, and a rugged silicone exterior that survives drops, splashes, and everything in between — this is the last portable speaker you'll ever need. Available in Midnight Black, Ocean Blue, and Sage Green.",
    bulletPoints: [
      "360-degree room-filling sound with dual 10W drivers and passive bass radiator",
      "IPX7 waterproof — fully submersible up to 1 meter for 30 minutes",
      "24-hour battery life on a single charge via USB-C",
      "Bluetooth 5.3 with 100ft range and built-in microphone",
      "Rugged, drop-resistant silicone design weighing just 1.2 lbs",
    ],
    metaTitle: "SoundWave Pro Wireless Bluetooth Speaker | 24hr",
    metaDescription:
      "SoundWave Pro wireless Bluetooth speaker with 360-degree sound, 24-hour battery, and IPX7 waterproofing. Free shipping on orders over $50.",
    seoKeywords: [
      "wireless bluetooth speaker",
      "portable speaker",
      "waterproof speaker",
      "outdoor speaker",
      "bluetooth 5.3 speaker",
      "travel speaker",
      "long battery speaker",
      "bass speaker portable",
    ],
    imageAltText:
      "SoundWave Pro wireless Bluetooth speaker in midnight black on a wooden desk next to a smartphone and earbuds",
    marketplace: "shopify",
  },

  ebay: {
    title:
      "Vintage Genuine Leather Journal Notebook A5 Handmade Bound 240 Pages Unlined Cream Paper Brown",
    description:
      "Up for sale is a beautiful handcrafted genuine leather journal, perfect for writers, artists, travelers, and anyone who appreciates the timeless feel of pen on paper.\n\nThis journal features a full-grain buffalo leather cover that develops a unique patina over time, making each journal truly one-of-a-kind. The 240 pages of thick, acid-free cream paper (120gsm) are ideal for fountain pens, ballpoints, and even light watercolor work with minimal bleed-through.\n\nThe journal is bound with a traditional long-stitch technique using waxed linen thread, ensuring durability that lasts for years. A wraparound leather cord keeps your pages secure and adds a rustic, vintage aesthetic.\n\nSpecifications:\n- Size: A5 (5.5\" x 8.5\")\n- Cover: Full-grain buffalo leather, brown\n- Pages: 240 unlined, acid-free cream pages (120gsm)\n- Binding: Hand-stitched with waxed linen thread\n- Closure: Wraparound leather cord\n- Weight: 12 oz\n\nShips within 1 business day from Austin, TX. 30-day hassle-free returns.",
    bulletPoints: [
      "Full-grain buffalo leather cover develops unique patina with use",
      "240 thick acid-free cream pages (120gsm) — minimal bleed-through",
      "Hand-stitched binding with waxed linen thread for lasting durability",
      "A5 size (5.5\" x 8.5\") fits comfortably in bags and backpacks",
      "Wraparound leather cord closure with vintage aesthetic",
    ],
    metaTitle: "Vintage Leather Journal Handmade A5 Notebook",
    metaDescription:
      "Handmade genuine buffalo leather journal with 240 unlined cream pages. A5 size, hand-stitched binding. Perfect for writing, sketching, and travel. Fast shipping.",
    seoKeywords: [
      "leather journal",
      "vintage notebook",
      "handmade journal",
      "leather bound notebook",
      "genuine leather diary",
      "buffalo leather journal",
      "A5 journal",
      "unlined notebook",
    ],
    imageAltText:
      "Brown vintage genuine leather journal with wraparound cord closure lying on a wooden desk next to a fountain pen",
    marketplace: "ebay",
  },

  generic: {
    title: "Premium Organic Bamboo Cutting Board Set (3-Pack)",
    description:
      "Upgrade your kitchen with this premium 3-piece bamboo cutting board set. Made from 100% organic Moso bamboo, these boards are naturally antimicrobial, eco-friendly, and built to last. The set includes three sizes for every kitchen task.\n\nEach board features a deep juice groove and easy-grip handles. The dense bamboo surface is gentle on knives while providing a stable, slip-resistant cutting surface.\n\nFood-grade mineral oil finish. Hand wash recommended.",
    bulletPoints: [
      "3-piece set: Large, Medium, and Small cutting boards",
      "100% organic Moso bamboo — sustainable and eco-friendly",
      "Deep juice grooves keep countertops clean",
      "Naturally antimicrobial and odor-resistant",
      "Easy-grip handles with hanging holes for storage",
    ],
    metaTitle: "Organic Bamboo Cutting Board Set 3-Pack",
    metaDescription:
      "Premium 3-piece organic bamboo cutting board set. Eco-friendly, antimicrobial, with juice grooves. Perfect for any kitchen.",
    seoKeywords: [
      "bamboo cutting board",
      "cutting board set",
      "organic kitchen",
      "eco-friendly",
      "chopping board",
      "wood cutting board",
      "kitchen accessories",
      "meal prep",
    ],
    imageAltText:
      "Three organic bamboo cutting boards in different sizes on a kitchen counter",
    marketplace: "generic",
  },
};

export function getDemoListing(input: ProductInput): GeneratedListing {
  const base = SAMPLE_LISTINGS[input.marketplace] || SAMPLE_LISTINGS.generic;

  // If the user typed a custom product name, adapt the title to include it
  if (input.name && input.name.toLowerCase() !== base.title.toLowerCase()) {
    return {
      ...base,
      title: base.title,
      marketplace: input.marketplace,
    };
  }

  return { ...base, marketplace: input.marketplace };
}

const MULTI_MARKETPLACES: Marketplace[] = ["amazon", "etsy", "shopify", "ebay"];

export function getDemoListingsForAll(
  input: Omit<ProductInput, "marketplace">
): Record<Marketplace, GeneratedListing> {
  const result = {} as Record<Marketplace, GeneratedListing>;
  for (const mp of MULTI_MARKETPLACES) {
    result[mp] = getDemoListing({ ...input, marketplace: mp });
  }
  return result;
}

export const DEMO_GENERATIONS = [
  {
    id: "demo-1",
    product_name: "Organic Bamboo Cutting Board",
    marketplace: "amazon",
    created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "demo-2",
    product_name: "Hand-Poured Soy Candle",
    marketplace: "etsy",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "demo-3",
    product_name: "Wireless Bluetooth Speaker",
    marketplace: "shopify",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "demo-4",
    product_name: "Vintage Leather Journal",
    marketplace: "ebay",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];

export const DEMO_PROFILE = {
  email: "demo@quicklistai.com",
  plan: "pro",
  generations_used: 4,
  generations_limit: 250,
};
