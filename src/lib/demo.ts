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

function parseFeatures(features: string): string[] {
  if (!features.trim()) return [];
  return features
    .split(/[,\n]+/)
    .map((f) => f.trim())
    .filter(Boolean);
}

function generateKeywords(name: string, category: string, features: string[]): string[] {
  const keywords: string[] = [];
  const nameLower = name.toLowerCase();
  keywords.push(nameLower);
  if (category) {
    keywords.push(category.toLowerCase());
    keywords.push(`${nameLower} ${category.toLowerCase()}`);
  }
  for (const f of features.slice(0, 3)) {
    keywords.push(f.toLowerCase());
  }
  keywords.push(`buy ${nameLower}`);
  keywords.push(`best ${nameLower}`);
  keywords.push(`${nameLower} for sale`);
  return keywords;
}

function buildDemoListing(
  input: ProductInput,
  style: {
    titleTemplate: (name: string, features: string[]) => string;
    descriptionTemplate: (name: string, category: string, features: string[], audience: string) => string;
    bulletTemplate: (name: string, features: string[]) => string[];
  }
): GeneratedListing {
  const name = input.name || "Product";
  const category = input.category || "";
  const features = parseFeatures(input.features || "");
  const audience = input.targetAudience || "discerning customers";
  const mp = input.marketplace;

  const featureSummary = features.length > 0 ? features.join(", ") : "premium quality";

  return {
    title: style.titleTemplate(name, features),
    description: style.descriptionTemplate(name, category, features, audience),
    bulletPoints: style.bulletTemplate(name, features),
    metaTitle: `${name} | ${category || "Shop Now"}`.slice(0, 60),
    metaDescription: `Shop ${name}${category ? ` in ${category}` : ""}. Features: ${featureSummary}. Order now with fast shipping.`.slice(0, 160),
    seoKeywords: generateKeywords(name, category, features),
    imageAltText: `${name}${category ? ` - ${category}` : ""} product photo`,
    marketplace: mp,
  };
}

const marketplaceStyles: Record<Marketplace, {
  titleTemplate: (name: string, features: string[]) => string;
  descriptionTemplate: (name: string, category: string, features: string[], audience: string) => string;
  bulletTemplate: (name: string, features: string[]) => string[];
}> = {
  amazon: {
    titleTemplate: (name, features) => {
      const featureHighlights = features.slice(0, 3).join(", ");
      return featureHighlights
        ? `${name} - ${featureHighlights} | Premium Quality`
        : `${name} - Premium Quality, Top Rated`;
    },
    descriptionTemplate: (name, category, features, audience) => {
      const featureList = features.length > 0
        ? features.map((f) => `• ${f}`).join("\n")
        : "• Premium materials\n• Exceptional quality\n• Built to last";
      return `Discover the ${name}${category ? `, perfect for ${category}` : ""}. Designed for ${audience} who demand the best.\n\n${featureList}\n\nOur ${name} is crafted with attention to detail and backed by our satisfaction guarantee. Whether you're upgrading your collection or looking for the perfect gift, this is the choice you'll be glad you made.\n\nOrder now and experience the difference quality makes.`;
    },
    bulletTemplate: (name, features) => {
      const bullets = features.slice(0, 4).map((f) => `${f.toUpperCase()} — Premium ${f.toLowerCase()} that sets the ${name} apart from the competition`);
      if (bullets.length === 0) {
        bullets.push(`PREMIUM QUALITY — ${name} built with the finest materials for lasting performance`);
        bullets.push(`VERSATILE DESIGN — Perfect for everyday use and special occasions alike`);
      }
      bullets.push(`SATISFACTION GUARANTEED — Love your ${name} or your money back, no questions asked`);
      return bullets;
    },
  },
  etsy: {
    titleTemplate: (name, features) => {
      const tags = features.slice(0, 2).map((f) => f.trim());
      const tagPart = tags.length > 0 ? ` | ${tags.join(" | ")}` : " | Handcrafted | Unique Gift";
      return `${name}${tagPart}`;
    },
    descriptionTemplate: (name, category, features, audience) => {
      const featureDesc = features.length > 0
        ? `\n\nWhat makes it special:\n${features.map((f) => `✦ ${f}`).join("\n")}`
        : "";
      return `Meet your new favorite ${name.toLowerCase()}${category ? ` — lovingly crafted for ${category} enthusiasts` : ""}. Each piece is made with care and attention to detail, ensuring you receive something truly special.${featureDesc}\n\nPerfect as a gift for ${audience} or a well-deserved treat for yourself. Every order is carefully packaged and shipped with love.\n\nThank you for supporting small business! 💛`;
    },
    bulletTemplate: (name, features) => {
      const bullets = features.slice(0, 4).map((f) => `${f} — crafted with care and attention to detail`);
      if (bullets.length === 0) {
        bullets.push(`Handcrafted ${name} made with premium materials`);
        bullets.push("Unique design you won't find in big box stores");
      }
      bullets.push("Ships within 1-3 business days with tracking");
      return bullets;
    },
  },
  shopify: {
    titleTemplate: (name, features) => {
      return features.length > 0
        ? `${name} — ${features[0]}`
        : name;
    },
    descriptionTemplate: (name, category, features, audience) => {
      const featureParagraph = features.length > 0
        ? `\n\nKey features:\n${features.map((f) => `- ${f}`).join("\n")}`
        : "";
      return `Introducing the ${name}${category ? ` — designed for ${category}` : ""}. Built for ${audience} who expect nothing but the best.${featureParagraph}\n\nWith a focus on quality and performance, the ${name} delivers on every front. Clean design meets practical functionality in a package you'll love.\n\nFree shipping on orders over $50. 30-day hassle-free returns.`;
    },
    bulletTemplate: (name, features) => {
      const bullets = features.slice(0, 4).map((f) => `${f} for premium performance`);
      if (bullets.length === 0) {
        bullets.push(`Premium ${name} designed for daily use`);
        bullets.push("Modern design with practical functionality");
      }
      bullets.push("Free shipping and 30-day returns");
      return bullets;
    },
  },
  ebay: {
    titleTemplate: (name, features) => {
      const featurePart = features.slice(0, 2).join(" ");
      return featurePart
        ? `${name} ${featurePart} - Brand New - Fast Shipping`
        : `${name} - Brand New - Premium Quality - Fast Shipping`;
    },
    descriptionTemplate: (name, category, features, audience) => {
      const specs = features.length > 0
        ? `\n\nSpecifications:\n${features.map((f) => `- ${f}`).join("\n")}`
        : "";
      return `Up for sale: ${name}${category ? ` (${category})` : ""}. Perfect for ${audience}.${specs}\n\nCondition: Brand new\nShips within 1 business day. 30-day hassle-free returns.\n\nBuy with confidence — 100% satisfaction guaranteed.`;
    },
    bulletTemplate: (name, features) => {
      const bullets = features.slice(0, 4).map((f) => f);
      if (bullets.length === 0) {
        bullets.push(`Brand new ${name} in original packaging`);
        bullets.push("Premium quality materials and construction");
      }
      bullets.push("Fast shipping within 1 business day");
      bullets.push("30-day hassle-free return policy");
      return bullets;
    },
  },
  generic: {
    titleTemplate: (name, features) => {
      return features.length > 0 ? `${name} - ${features[0]}` : name;
    },
    descriptionTemplate: (name, category, features, audience) => {
      const featureList = features.length > 0
        ? `\n\nFeatures:\n${features.map((f) => `- ${f}`).join("\n")}`
        : "";
      return `${name}${category ? ` for ${category}` : ""}. Designed for ${audience}.${featureList}\n\nQuality you can trust, backed by our satisfaction guarantee.`;
    },
    bulletTemplate: (name, features) => {
      const bullets = features.slice(0, 4).map((f) => f);
      if (bullets.length === 0) {
        bullets.push(`Premium ${name}`);
        bullets.push("High-quality materials");
      }
      bullets.push("Satisfaction guaranteed");
      return bullets;
    },
  },
};

export function getDemoListing(input: ProductInput): GeneratedListing {
  const style = marketplaceStyles[input.marketplace] || marketplaceStyles.generic;
  return buildDemoListing(input, style);
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
