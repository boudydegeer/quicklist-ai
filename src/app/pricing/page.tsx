"use client";

import Link from "next/link";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    description: "Try it out — no account needed.",
    features: [
      "3 AI-generated listings/day",
      "All 4 marketplaces (Amazon, Etsy, Shopify, eBay)",
      "SEO optimization included",
      "Copy-to-clipboard",
      "CSV export",
    ],
    cta: "Start Generating",
    href: "/generate",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    description: "For sellers scaling across marketplaces.",
    features: [
      "Unlimited AI-generated listings",
      "All 4 marketplaces",
      "SEO optimization included",
      "Bulk CSV processing",
      "CSV export",
      "Generation history",
      "Priority support",
    ],
    cta: "Upgrade to Pro",
    href: "#",
    highlighted: true,
  },
  {
    name: "Business",
    price: "$79",
    period: "/mo",
    description: "For teams and agencies managing multiple brands.",
    features: [
      "Everything in Pro",
      "Team access (up to 5 members)",
      "Custom brand voice profiles",
      "API access",
      "Bulk processing (1000+/day)",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    href: "#",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-7xl px-6 pt-32 pb-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-lg text-slate-500">
            Start free. Upgrade when you need more. No hidden fees.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 transition-all duration-200 ${
                plan.highlighted
                  ? "border-indigo-600 bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-600"
                  : "border-slate-200 bg-white shadow-sm hover:shadow-md"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold text-white">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{plan.description}</p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                  {plan.period && <span className="text-sm text-slate-500">{plan.period}</span>}
                </div>
              </div>
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all duration-200 ${
                  plan.highlighted
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/25"
                    : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-slate-400">
          Pro and Business plans coming soon. Free tier available now — start generating!
        </p>
      </main>
    </div>
  );
}
