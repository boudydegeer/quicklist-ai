"use client";

import Link from "next/link";
import WaitlistForm from "@/components/WaitlistForm";

const features = [
  {
    title: "Multi-Marketplace",
    description: "Optimized listings for Amazon, Etsy, Shopify, eBay, and more. Each platform gets tailored content following its specific algorithm requirements.",
    icon: (<svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A88.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>),
  },
  {
    title: "AI-Optimized",
    description: "Powered by AI to generate compelling, conversion-focused copy that speaks to your target audience and drives sales.",
    icon: (<svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>),
  },
  {
    title: "Bulk Processing",
    description: "Upload a CSV with hundreds of products and generate optimized listings for all of them at once. Save hours of manual work.",
    icon: (<svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" /></svg>),
  },
  {
    title: "SEO Ready",
    description: "Every listing includes meta titles, descriptions, keywords, and image alt text. Rank higher in marketplace search results.",
    icon: (<svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" /></svg>),
  },
];

const plans = [
  { name: "Free", price: "$0", period: "", listings: "3/day", description: "Try it out — no account needed.", features: ["3 AI-generated listings/day", "All 4 marketplaces", "SEO optimization", "Copy-to-clipboard", "CSV export"], cta: "Start Generating", highlighted: false },
  { name: "Pro", price: "$29", period: "/mo", listings: "Unlimited", description: "For sellers scaling across marketplaces.", features: ["Unlimited listings", "All 4 marketplaces", "Bulk CSV processing", "Generation history", "Priority support"], cta: "Upgrade to Pro", highlighted: true },
  { name: "Business", price: "$79", period: "/mo", listings: "Unlimited+", description: "For teams and agencies.", features: ["Everything in Pro", "Team access (5 members)", "Custom brand voice", "API access", "Dedicated support"], cta: "Contact Sales", highlighted: false },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">

      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-purple-50" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />
          <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm text-indigo-700">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
              Powered by AI
            </div>
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">QuickList AI</span>
            </h1>
            <p className="mb-4 text-xl text-slate-600 sm:text-2xl">AI-powered product listings for every marketplace</p>
            <p className="mx-auto mb-10 max-w-2xl text-base text-slate-500">Generate optimized, conversion-focused product listings for Amazon, Etsy, Shopify, eBay, and more in seconds.</p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/generate" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 transition-all duration-200">Try It Now<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg></Link>
              <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-all duration-200">View Dashboard</Link>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Everything you need to sell more</h2>
            <p className="mt-4 text-lg text-slate-500">Powerful AI-driven tools to create listings that convert browsers into buyers.</p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-200 hover:border-indigo-200 hover:shadow-md">
                <div className="mb-4 inline-flex rounded-xl bg-indigo-50 p-3 text-indigo-600 group-hover:bg-indigo-100 transition-colors">{feature.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50/50 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-slate-400">Works with all major marketplaces</p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {[
              { name: "Amazon", color: "text-orange-500", letter: "a" },
              { name: "Etsy", color: "text-orange-600", letter: "E" },
              { name: "Shopify", color: "text-green-600", letter: "S" },
              { name: "eBay", color: "text-blue-600", letter: "e" },
            ].map((mp) => (
              <div key={mp.name} className="flex items-center gap-2">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm border border-slate-200 text-lg font-bold ${mp.color}`}>{mp.letter}</div>
                <span className="text-lg font-semibold text-slate-700">{mp.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Loved by e-commerce sellers</h2>
            <p className="mt-4 text-lg text-slate-500">Join hundreds of sellers already saving hours on listing creation.</p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote: "QuickList AI cut my listing time from 2 hours to 5 minutes. The Amazon-optimized titles alone boosted my click-through rate by 35%.",
                name: "Sarah M.",
                role: "Etsy & Amazon Seller",
                stars: 5,
              },
              {
                quote: "I run a Shopify store with 200+ products. Bulk processing all my listings at once was a game-changer. The SEO keywords are spot-on.",
                name: "James K.",
                role: "Shopify Store Owner",
                stars: 5,
              },
              {
                quote: "Finally a tool that understands each marketplace is different. My eBay listings read differently from my Etsy ones, and that's exactly what I needed.",
                name: "Maria L.",
                role: "Multi-Platform Seller",
                stars: 5,
              },
            ].map((testimonial) => (
              <div key={testimonial.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 flex gap-0.5">
                  {Array.from({ length: testimonial.stars }).map((_, i) => (
                    <svg key={i} className="h-4 w-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="mb-4 text-sm leading-relaxed text-slate-600">&ldquo;{testimonial.quote}&rdquo;</p>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{testimonial.name}</p>
                  <p className="text-xs text-slate-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Simple, transparent pricing</h2>
            <p className="mt-4 text-lg text-slate-500">Start free. Upgrade when you need more.</p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.name} className={`relative rounded-2xl border p-8 transition-all duration-200 ${plan.highlighted ? "border-indigo-600 bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-600" : "border-slate-200 bg-white shadow-sm hover:shadow-md"}`}>
                {plan.highlighted && (<div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold text-white">Most Popular</div>)}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{plan.description}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                    <span className="text-sm text-slate-500">{plan.period}</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-indigo-600">{plan.listings}</p>
                </div>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-slate-600">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/generate"
                  className={`block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all duration-200 ${plan.highlighted ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/25" : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/pricing" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
              View full pricing details &rarr;
            </Link>
          </div>
        </div>
      </section>

      <section id="waitlist" className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Get early access to QuickList AI
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-100">
            Join the waitlist and be the first to know when we launch Pro features, bulk processing, and more.
          </p>
          <div className="mt-10 mx-auto max-w-lg">
            <WaitlistForm />
          </div>
          <p className="mt-4 text-sm text-indigo-200">
            No spam, ever. Unsubscribe anytime.
          </p>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-white text-xs font-bold">Q</div>
              <span className="text-sm font-semibold">QuickList AI</span>
            </div>
            <div className="flex gap-8">
              <a href="#features" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">Features</a>
              <Link href="/pricing" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">Pricing</Link>
              <Link href="/generate" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">Generate</Link>
              <Link href="/bulk" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">Bulk</Link>
            </div>
            <p className="text-sm text-slate-400">&copy; 2026 QuickList AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
