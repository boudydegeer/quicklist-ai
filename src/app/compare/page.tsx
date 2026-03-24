import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "QuickList AI vs Helium 10, Jungle Scout & More — Best Listing Optimizer 2026",
  description:
    "Compare QuickList AI with Helium 10, Jungle Scout, and ListifyAI. See why sellers choose QuickList AI: 78% cheaper, 4 marketplaces, AI-powered listing optimization.",
  keywords: [
    "helium 10 alternative",
    "jungle scout alternative",
    "best listing optimizer 2026",
    "helium 10 cheaper alternative",
    "amazon listing tool comparison",
    "multi-marketplace listing optimizer",
    "AI product listing generator",
  ],
  openGraph: {
    title: "QuickList AI vs Helium 10 — Compare Listing Optimizers",
    description:
      "QuickList AI is 78% cheaper than Helium 10 and supports 4 marketplaces. See the full comparison.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickList AI vs Helium 10 — Compare Listing Optimizers",
    description:
      "QuickList AI is 78% cheaper than Helium 10 and supports 4 marketplaces. See the full comparison.",
  },
};

const competitors = [
  {
    name: "QuickList AI",
    highlight: true,
    price: "$29/mo",
    freePrice: "Free tier",
    marketplaces: "4 (Amazon, Etsy, Shopify, eBay)",
    marketplaceCount: 4,
    aiGeneration: true,
    freeTier: true,
    bulkProcessing: true,
    seoOptimization: true,
    apiAccess: true,
    teamAccess: true,
  },
  {
    name: "Helium 10",
    highlight: false,
    price: "$129/mo",
    freePrice: "Limited free",
    marketplaces: "1 (Amazon only)",
    marketplaceCount: 1,
    aiGeneration: true,
    freeTier: false,
    bulkProcessing: true,
    seoOptimization: true,
    apiAccess: true,
    teamAccess: true,
  },
  {
    name: "Jungle Scout",
    highlight: false,
    price: "$49/mo",
    freePrice: "No free tier",
    marketplaces: "1 (Amazon only)",
    marketplaceCount: 1,
    aiGeneration: false,
    freeTier: false,
    bulkProcessing: false,
    seoOptimization: true,
    apiAccess: false,
    teamAccess: true,
  },
  {
    name: "ListifyAI",
    highlight: false,
    price: "$39/mo",
    freePrice: "No free tier",
    marketplaces: "2 (Amazon, Shopify)",
    marketplaceCount: 2,
    aiGeneration: true,
    freeTier: false,
    bulkProcessing: false,
    seoOptimization: false,
    apiAccess: false,
    teamAccess: false,
  },
];

const features = [
  { key: "price" as const, label: "Starting Price" },
  { key: "marketplaces" as const, label: "Marketplaces Supported" },
  { key: "aiGeneration" as const, label: "AI Listing Generation" },
  { key: "freeTier" as const, label: "Free Tier Available" },
  { key: "bulkProcessing" as const, label: "Bulk Processing" },
  { key: "seoOptimization" as const, label: "SEO Optimization" },
  { key: "apiAccess" as const, label: "API Access" },
  { key: "teamAccess" as const, label: "Team Collaboration" },
];

function CheckIcon() {
  return (
    <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function CellValue({ competitor, featureKey }: { competitor: typeof competitors[0]; featureKey: string }) {
  if (featureKey === "price") {
    return (
      <div>
        <span className={`text-sm font-semibold ${competitor.highlight ? "text-indigo-600" : "text-slate-900"}`}>
          {competitor.price}
        </span>
        {competitor.freePrice && (
          <span className="ml-1 text-xs text-slate-400">({competitor.freePrice})</span>
        )}
      </div>
    );
  }
  if (featureKey === "marketplaces") {
    return (
      <span className={`text-sm ${competitor.highlight ? "font-semibold text-indigo-600" : "text-slate-600"}`}>
        {competitor.marketplaces}
      </span>
    );
  }
  const value = competitor[featureKey as keyof typeof competitor];
  if (typeof value === "boolean") {
    return value ? <CheckIcon /> : <XIcon />;
  }
  return <span className="text-sm text-slate-600">{String(value)}</span>;
}

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />
          <div className="absolute bottom-10 right-1/4 h-64 w-64 rounded-full bg-purple-200/30 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm text-indigo-700">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            Honest Comparison
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            QuickList AI vs{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              The Competition
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-500">
            See how QuickList AI stacks up against Helium 10, Jungle Scout, and ListifyAI.
            More marketplaces, AI-powered generation, and up to 78% cheaper.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 transition-all duration-200"
            >
              Try Free
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-all duration-200"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Desktop Comparison Table */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-slate-900">
            Feature-by-feature comparison
          </h2>

          {/* Desktop table */}
          <div className="hidden lg:block overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-left text-sm font-medium text-slate-500">Feature</th>
                  {competitors.map((c) => (
                    <th
                      key={c.name}
                      className={`px-6 py-4 text-center text-sm font-semibold ${
                        c.highlight
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-slate-700"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        {c.highlight && (
                          <span className="rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-semibold text-white">
                            Best Value
                          </span>
                        )}
                        {c.name}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, idx) => (
                  <tr
                    key={feature.key}
                    className={`border-b border-slate-100 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-slate-700">{feature.label}</td>
                    {competitors.map((c) => (
                      <td
                        key={c.name}
                        className={`px-6 py-4 text-center ${
                          c.highlight ? "bg-indigo-50/50" : ""
                        }`}
                      >
                        <div className="flex items-center justify-center">
                          <CellValue competitor={c} featureKey={feature.key} />
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:hidden">
            {competitors.map((c) => (
              <div
                key={c.name}
                className={`rounded-2xl border p-6 ${
                  c.highlight
                    ? "border-indigo-600 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-600"
                    : "border-slate-200 shadow-sm"
                }`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className={`text-lg font-bold ${c.highlight ? "text-indigo-600" : "text-slate-900"}`}>
                    {c.name}
                  </h3>
                  {c.highlight && (
                    <span className="rounded-full bg-indigo-600 px-3 py-0.5 text-xs font-semibold text-white">
                      Best Value
                    </span>
                  )}
                </div>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-slate-900">{c.price}</span>
                  {c.freePrice && (
                    <span className="ml-2 text-sm text-slate-400">({c.freePrice})</span>
                  )}
                </div>
                <p className="mb-4 text-sm text-slate-500">{c.marketplaces}</p>
                <ul className="space-y-2.5">
                  {features.slice(2).map((feature) => {
                    const value = c[feature.key as keyof typeof c];
                    if (typeof value !== "boolean") return null;
                    return (
                      <li key={feature.key} className="flex items-center gap-2.5 text-sm text-slate-600">
                        {value ? <CheckIcon /> : <XIcon />}
                        {feature.label}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why QuickList AI */}
      <section className="border-y border-slate-100 bg-slate-50 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-slate-900">
            Why sellers switch to QuickList AI
          </h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                stat: "78%",
                label: "Cheaper than Helium 10",
                desc: "$29/mo vs $129/mo — get more features for a fraction of the cost.",
              },
              {
                stat: "4x",
                label: "More marketplaces",
                desc: "Amazon, Etsy, Shopify, and eBay. Others lock you into Amazon only.",
              },
              {
                stat: "5 min",
                label: "Average listing time",
                desc: "What used to take 2 hours now takes minutes with AI generation.",
              },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl bg-white border border-slate-200 p-8 text-center shadow-sm">
                <div className="mb-2 text-4xl font-bold text-indigo-600">{item.stat}</div>
                <div className="mb-2 text-sm font-semibold text-slate-900">{item.label}</div>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-slate-900">
            What sellers are saying
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote:
                  "QuickList AI cut my listing time from 2 hours to 5 minutes. The Amazon-optimized titles alone boosted my click-through rate by 35%.",
                name: "Sarah M.",
                role: "Etsy & Amazon Seller",
              },
              {
                quote:
                  "I run a Shopify store with 200+ products. Bulk processing all my listings at once was a game-changer. The SEO keywords are spot-on.",
                name: "James K.",
                role: "Shopify Store Owner",
              },
              {
                quote:
                  "Finally a tool that understands each marketplace is different. My eBay listings read differently from my Etsy ones, and that's exactly what I needed.",
                name: "Maria L.",
                role: "Multi-Platform Seller",
              },
            ].map((t) => (
              <div key={t.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to optimize your listings?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-100">
            Join hundreds of sellers who switched from expensive, single-marketplace tools to QuickList AI.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-base font-semibold text-indigo-600 shadow-lg hover:bg-indigo-50 transition-all duration-200"
            >
              Try Free — No Account Needed
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/10 transition-all duration-200"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
