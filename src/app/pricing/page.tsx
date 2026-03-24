"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { isStripeConfigured } from "@/lib/config";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "",
    planKey: null,
    description: "Try it out — no account needed.",
    features: [
      "3 AI-generated listings/day",
      "All 4 marketplaces (Amazon, Etsy, Shopify, eBay)",
      "SEO optimization included",
      "Copy-to-clipboard",
      "CSV export",
    ],
    cta: "Start Generating",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$29",
    period: "/mo",
    planKey: "starter",
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
    highlighted: true,
  },
  {
    name: "Business",
    price: "$79",
    period: "/mo",
    planKey: "pro",
    description: "For teams and agencies managing multiple brands.",
    features: [
      "Everything in Pro",
      "Team access (up to 5 members)",
      "Custom brand voice profiles",
      "API access",
      "Bulk processing (1000+/day)",
      "Dedicated account manager",
    ],
    cta: "Upgrade to Business",
    highlighted: false,
  },
];

export default function PricingPage() {
  const { user } = useAuth();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const stripeReady = isStripeConfigured();

  const handleCheckout = async (planKey: string) => {
    setError(null);
    setLoadingPlan(planKey);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planKey }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoadingPlan(null);
        return;
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setError("Failed to start checkout. Please try again.");
      setLoadingPlan(null);
    }
  };

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

        {error && (
          <div className="mx-auto mt-8 max-w-md rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
            {error}
          </div>
        )}

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
              {plan.planKey === null ? (
                <Link
                  href="/generate"
                  className="block w-full rounded-xl py-3 text-center text-sm font-semibold border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 transition-all duration-200"
                >
                  {plan.cta}
                </Link>
              ) : stripeReady ? (
                <button
                  onClick={() => handleCheckout(plan.planKey!)}
                  disabled={loadingPlan === plan.planKey}
                  className={`block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                    plan.highlighted
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/25"
                      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {loadingPlan === plan.planKey ? "Redirecting..." : plan.cta}
                </button>
              ) : user ? (
                <button
                  disabled
                  className="block w-full rounded-xl py-3 text-center text-sm font-semibold border border-slate-300 bg-slate-50 text-slate-400 cursor-not-allowed"
                >
                  Coming Soon
                </button>
              ) : (
                <Link
                  href="/#waitlist"
                  className={`block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all duration-200 ${
                    plan.highlighted
                      ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/25"
                      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Join Waitlist
                </Link>
              )}
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-slate-400">
          {stripeReady
            ? "All plans include a 7-day free trial. Cancel anytime."
            : "Pro and Business plans coming soon. Free tier available now — start generating!"}
        </p>
      </main>
    </div>
  );
}
