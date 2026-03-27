"use client";

import { useState } from "react";
import Link from "next/link";
import WaitlistForm from "@/components/WaitlistForm";

const outcomes = [
  {
    title: "35% Higher Click-Through Rate",
    description: "AI-optimized titles and descriptions that match each marketplace's algorithm, driving more eyes to your products.",
    icon: (<svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>),
  },
  {
    title: "Save 2+ Hours Per Listing",
    description: "Stop writing the same product 4 different ways. Generate all marketplace versions in under 30 seconds.",
    icon: (<svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>),
  },
  {
    title: "4 Marketplaces, 1 Click",
    description: "Amazon, Etsy, Shopify, and eBay listings tailored to each platform's SEO requirements simultaneously.",
    icon: (<svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>),
  },
  {
    title: "Built-In SEO That Ranks",
    description: "Every listing includes meta titles, descriptions, keywords, and image alt text optimized for marketplace search.",
    icon: (<svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" /></svg>),
  },
];

const plans = [
  { name: "Free", price: "$0", period: "", perListing: "", listings: "3/day", description: "Try it out — no account needed.", features: ["3 AI-generated listings/day", "All 4 marketplaces", "Standard quality output", "SEO optimization", "Copy-to-clipboard"], cta: "Start Free", highlighted: false },
  { name: "Pro", price: "$29", period: "/mo", perListing: "$0.29/listing", listings: "Unlimited", description: "For sellers scaling across marketplaces.", features: ["Unlimited listings", "Enhanced quality prompts", "All 4 marketplaces", "Bulk CSV processing", "Generation history", "Priority support"], cta: "Start Pro Trial", highlighted: true },
  { name: "Business", price: "$79", period: "/mo", perListing: "$0.08/listing", listings: "Unlimited+", description: "For teams and agencies.", features: ["Everything in Pro", "Team access (5 members)", "Custom brand voice", "API access", "Dedicated support"], cta: "Contact Sales", highlighted: false },
];

const SPOTS_TOTAL = 500;
const SPOTS_CLAIMED = 347;

function ROICalculator() {
  const [listingsPerMonth, setListingsPerMonth] = useState(20);
  const manualMinutes = 45;
  const quicklistMinutes = 2;
  const hoursSaved = Math.round((listingsPerMonth * (manualMinutes - quicklistMinutes)) / 60);
  const moneySavedFiverr = listingsPerMonth * 4; // avg $4/listing on Fiverr
  const proMonthlyCost = 29;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
      <h3 className="text-lg font-semibold text-slate-900 mb-2">How much could you save?</h3>
      <p className="text-sm text-slate-500 mb-6">Drag the slider to see your estimated savings with QuickList AI Pro.</p>
      <div className="mb-6">
        <label className="flex items-center justify-between text-sm font-medium text-slate-700 mb-3">
          <span>Listings per month</span>
          <span className="text-indigo-600 font-bold text-lg">{listingsPerMonth}</span>
        </label>
        <input
          type="range"
          min={5}
          max={200}
          value={listingsPerMonth}
          onChange={(e) => setListingsPerMonth(Number(e.target.value))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>5</span>
          <span>200</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-indigo-50 p-4 text-center">
          <p className="text-2xl font-bold text-indigo-600">{hoursSaved}h</p>
          <p className="text-xs text-slate-500 mt-1">Hours saved/mo</p>
        </div>
        <div className="rounded-xl bg-green-50 p-4 text-center">
          <p className="text-2xl font-bold text-green-600">${moneySavedFiverr}</p>
          <p className="text-xs text-slate-500 mt-1">vs. Fiverr/mo</p>
        </div>
        <div className="rounded-xl bg-purple-50 p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">{Math.round(moneySavedFiverr / proMonthlyCost)}x</p>
          <p className="text-xs text-slate-500 mt-1">ROI vs Pro cost</p>
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-4 text-center">Based on avg. 45 min manual listing time and $4/listing on freelancer platforms</p>
    </div>
  );
}

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
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm text-amber-700 font-medium">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Launch pricing — only {SPOTS_TOTAL - SPOTS_CLAIMED} of {SPOTS_TOTAL} Pro spots left
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Sellers report <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">35% higher CTR</span> and save <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">2+ hours</span> per listing
            </h1>
            <p className="mb-4 text-xl text-slate-600 sm:text-2xl">QuickList AI creates optimized product listings for Amazon, Etsy, Shopify, and eBay — all at once.</p>
            <p className="mx-auto mb-10 max-w-2xl text-base text-slate-500">Stop rewriting the same product 4 different ways. Enter your details once, get conversion-focused listings tailored to each marketplace in seconds.</p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/generate" className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 transition-all duration-200">Generate Your First Listing Free<svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg></Link>
              <Link href="/pricing" className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 hover:bg-slate-50 transition-all duration-200">See Pricing</Link>
            </div>
            <div className="mt-6 flex items-center justify-center gap-6 text-sm text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                No credit card required
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                3 free listings/day
              </span>
              <span className="inline-flex items-center gap-1.5">
                <svg className="h-4 w-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                Results in 30 seconds
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Before / After Comparison */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">See the difference AI makes</h2>
            <p className="mt-4 text-lg text-slate-500">Same product. Dramatically different results.</p>
          </div>
          <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-2">
            {/* Before */}
            <div className="rounded-2xl border-2 border-red-200 bg-white p-8 relative">
              <div className="absolute -top-3 left-6 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">Before — Manual Listing</div>
              <div className="mt-2">
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Amazon Title</h4>
                <p className="text-sm text-slate-600 mb-4">Bamboo Wireless Charger - Fast Charging Pad for iPhone and Samsung</p>
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
                <p className="text-sm text-slate-500 mb-4">This is a wireless charger made of bamboo. Works with iPhone and Samsung phones. Fast charging supported. Eco-friendly material.</p>
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Bullet Points</h4>
                <ul className="space-y-1 text-sm text-slate-500">
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-300" />Fast charging</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-300" />Made of bamboo</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-300" />Works with most phones</li>
                </ul>
                <div className="mt-6 flex items-center gap-4 text-xs text-red-600">
                  <span>~45 min to write</span>
                  <span>Generic copy</span>
                  <span>No SEO keywords</span>
                </div>
              </div>
            </div>
            {/* After */}
            <div className="rounded-2xl border-2 border-green-200 bg-white p-8 relative shadow-lg">
              <div className="absolute -top-3 left-6 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">After — QuickList AI</div>
              <div className="mt-2">
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Amazon Title</h4>
                <p className="text-sm text-slate-900 font-medium mb-4">Premium Bamboo Wireless Charging Pad — 15W Fast Charge, Qi-Certified, Eco-Friendly Design for iPhone 15/14/13 & Samsung Galaxy S24/S23</p>
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
                <p className="text-sm text-slate-700 mb-4">Transform your desk with the perfect blend of sustainability and technology. Our premium bamboo wireless charging pad delivers 15W fast charging while making a statement about your commitment to eco-conscious living. Qi-certified for universal compatibility.</p>
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Bullet Points</h4>
                <ul className="space-y-1 text-sm text-slate-700">
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />15W FAST CHARGING — Charge up to 50% faster than standard 5W pads</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />SUSTAINABLY SOURCED BAMBOO — FSC-certified natural bamboo construction</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />UNIVERSAL QI COMPATIBILITY — Works with all Qi-enabled devices</li>
                </ul>
                <div className="mt-6 flex items-center gap-4 text-xs text-green-600">
                  <span>~30 sec to generate</span>
                  <span>Conversion-optimized</span>
                  <span>Full SEO metadata</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Results that matter for your business</h2>
            <p className="mt-4 text-lg text-slate-500">Not just features — real outcomes that drive revenue and save time.</p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((outcome) => (
              <div key={outcome.title} className="group rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-200 hover:border-indigo-200 hover:shadow-md">
                <div className="mb-4 inline-flex rounded-xl bg-indigo-50 p-3 text-indigo-600 group-hover:bg-indigo-100 transition-colors">{outcome.icon}</div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">{outcome.title}</h3>
                <p className="text-sm leading-relaxed text-slate-500">{outcome.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace Logos */}
      <section className="border-y border-slate-100 bg-slate-50/50 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-slate-400">Optimized for all major marketplaces</p>
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

      {/* ROI Calculator */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Stop overpaying for listings</h2>
              <p className="mt-4 text-lg text-slate-500">Whether you write them yourself or hire freelancers, manual listings cost more than you think.</p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">Fiverr/Upwork: $2-$5 per listing</p>
                    <p className="text-sm text-slate-500">Plus back-and-forth revisions, inconsistent quality</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">DIY: 45+ minutes per listing</p>
                    <p className="text-sm text-slate-500">Researching keywords, writing copy, formatting for each marketplace</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">QuickList AI Pro: $0.29/listing</p>
                    <p className="text-sm text-slate-500">Instant results, all 4 marketplaces, SEO-optimized, consistent quality</p>
                  </div>
                </div>
              </div>
            </div>
            <ROICalculator />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50">
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

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Invest less than a single Fiverr listing</h2>
            <p className="mt-4 text-lg text-slate-500">Pro pays for itself with your first 8 listings. Start free, upgrade when you&apos;re ready.</p>
          </div>
          {/* Urgency bar */}
          <div className="mx-auto mt-8 max-w-md">
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center">
              <p className="text-sm font-medium text-amber-800">
                Launch pricing — <span className="font-bold">{SPOTS_TOTAL - SPOTS_CLAIMED}</span> of {SPOTS_TOTAL} Pro spots remaining at $29/mo
              </p>
              <div className="mt-2 h-2 rounded-full bg-amber-200 overflow-hidden">
                <div className="h-full rounded-full bg-amber-500 transition-all" style={{ width: `${(SPOTS_CLAIMED / SPOTS_TOTAL) * 100}%` }} />
              </div>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div key={plan.name} className={`relative rounded-2xl border p-8 transition-all duration-200 ${plan.highlighted ? "border-indigo-600 bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-600 scale-105" : "border-slate-200 bg-white shadow-sm hover:shadow-md"}`}>
                {plan.highlighted && (<div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 px-4 py-1 text-xs font-semibold text-white">Most Popular</div>)}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
                  <p className="mt-1 text-sm text-slate-500">{plan.description}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                    <span className="text-sm text-slate-500">{plan.period}</span>
                  </div>
                  {plan.perListing && <p className="mt-1 text-sm font-medium text-green-600">{plan.perListing} avg.</p>}
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
                  href={plan.highlighted ? "/pricing" : "/generate"}
                  className={`block w-full rounded-xl py-3 text-center text-sm font-semibold transition-all duration-200 ${plan.highlighted ? "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-600/25" : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/pricing" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
              View full pricing comparison &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Waitlist CTA */}
      <section id="waitlist" className="relative overflow-hidden py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-purple-300/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Get early access to QuickList AI Pro
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-indigo-100">
            Join the waitlist and lock in launch pricing before rates increase. Only {SPOTS_TOTAL - SPOTS_CLAIMED} spots left.
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
            <div className="flex flex-wrap gap-x-8 gap-y-2 justify-center">
              <a href="#features" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">Features</a>
              <Link href="/pricing" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">Pricing</Link>
              <Link href="/generate" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">Generate</Link>
              <Link href="/tools/amazon-listing-generator" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">Amazon Tool</Link>
              <Link href="/tools/etsy-title-optimizer" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">Etsy Tool</Link>
              <Link href="/bulk" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">Bulk</Link>
              <Link href="/compare" className="text-sm text-slate-500 hover:text-slate-700 transition-colors">Compare</Link>
            </div>
            <p className="text-sm text-slate-400">&copy; 2026 QuickList AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
