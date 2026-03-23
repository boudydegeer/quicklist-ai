"use client";

import { useState } from "react";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import { getDemoListingsForAll } from "@/lib/demo";
import {
  hasReachedLimit,
  incrementUsage,
  getRemainingGenerations,
  FREE_DAILY_LIMIT,
} from "@/lib/usage";
import type { Marketplace, GeneratedListing } from "@/types";

const MARKETPLACE_TABS: { key: Marketplace; label: string; color: string; bg: string; border: string }[] = [
  { key: "amazon", label: "Amazon", color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-300" },
  { key: "etsy", label: "Etsy", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" },
  { key: "shopify", label: "Shopify", color: "text-green-700", bg: "bg-green-50", border: "border-green-300" },
  { key: "ebay", label: "eBay", color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-300" },
];

function exportAsCSV(results: Record<Marketplace, GeneratedListing>, productName: string) {
  const headers = ["Marketplace", "Title", "Description", "Bullet Points", "Meta Title", "Meta Description", "SEO Keywords", "Image Alt Text"];
  const rows = Object.values(results).map((listing) => [
    listing.marketplace,
    listing.title,
    listing.description.replace(/\n/g, " "),
    listing.bulletPoints.join(" | "),
    listing.metaTitle,
    listing.metaDescription,
    listing.seoKeywords.join(", "),
    listing.imageAltText,
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${productName.replace(/\s+/g, "-").toLowerCase()}-listings.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function GeneratePage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [features, setFeatures] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Record<Marketplace, GeneratedListing> | null>(null);
  const [activeTab, setActiveTab] = useState<Marketplace>("amazon");
  const [error, setError] = useState<string | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (hasReachedLimit()) {
      setShowUpgrade(true);
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);
    setShowUpgrade(false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const listings = getDemoListingsForAll({
        name,
        category,
        features,
        targetAudience: targetAudience || undefined,
        priceRange: priceRange || undefined,
      });
      setResults(listings);
      setActiveTab("amazon");
      incrementUsage();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const remaining = getRemainingGenerations();
  const activeListing = results ? results[activeTab] : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-6 py-10 pt-24">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Generate Listings</h1>
            <p className="mt-2 text-slate-500">
              Enter your product details and get optimized listings for all 4 marketplaces at once.
            </p>
          </div>
          <div className="hidden sm:block rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
            <span className="font-medium">{remaining}</span>/{FREE_DAILY_LIMIT} free generations remaining today
          </div>
        </div>

        {showUpgrade && (
          <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-amber-900">Daily limit reached</h3>
                <p className="mt-1 text-sm text-amber-700">
                  You&apos;ve used all {FREE_DAILY_LIMIT} free generations for today. Upgrade to Pro for unlimited listings.
                </p>
              </div>
              <Link
                href="/pricing"
                className="shrink-0 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 transition-all"
              >
                View Plans
              </Link>
            </div>
          </div>
        )}

        <div className="grid gap-10 lg:grid-cols-5">
          {/* Form - 2 columns */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Product Details</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">Product Name *</label>
                    <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Bamboo Wireless Charging Pad" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                  </div>
                  <div>
                    <label htmlFor="category" className="mb-1.5 block text-sm font-medium text-slate-700">Category *</label>
                    <input id="category" type="text" required value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g., Electronics, Home Decor" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                  </div>
                  <div>
                    <label htmlFor="features" className="mb-1.5 block text-sm font-medium text-slate-700">Key Features *</label>
                    <textarea id="features" required rows={4} value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="List the main features, materials, dimensions, colors, etc." className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                  </div>
                  <div>
                    <label htmlFor="targetAudience" className="mb-1.5 block text-sm font-medium text-slate-700">Target Audience <span className="text-slate-400">(optional)</span></label>
                    <input id="targetAudience" type="text" value={targetAudience} onChange={(e) => setTargetAudience(e.target.value)} placeholder="e.g., Tech-savvy professionals" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                  </div>
                  <div>
                    <label htmlFor="priceRange" className="mb-1.5 block text-sm font-medium text-slate-700">Price Range <span className="text-slate-400">(optional)</span></label>
                    <input id="priceRange" type="text" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} placeholder="e.g., $25-$35" className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20" />
                  </div>
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full rounded-xl bg-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                    Generating for all marketplaces...
                  </span>
                ) : "Generate for All Marketplaces"}
              </button>
              {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
            </form>
          </div>

          {/* Results - 3 columns */}
          <div className="lg:col-span-3">
            {loading && (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-6 flex gap-2">
                  {MARKETPLACE_TABS.map((tab) => (
                    <div key={tab.key} className="h-9 w-24 animate-pulse rounded-lg bg-slate-200" />
                  ))}
                </div>
                <div className="animate-pulse space-y-4">
                  <div className="h-4 w-24 rounded bg-slate-200" />
                  <div className="h-6 w-full rounded bg-slate-200" />
                  <div className="h-4 w-32 rounded bg-slate-200" />
                  <div className="space-y-2">
                    <div className="h-4 w-full rounded bg-slate-200" />
                    <div className="h-4 w-full rounded bg-slate-200" />
                    <div className="h-4 w-3/4 rounded bg-slate-200" />
                  </div>
                </div>
              </div>
            )}

            {results && activeListing && (
              <div className="space-y-4">
                {/* Marketplace Tabs */}
                <div className="flex flex-wrap gap-2">
                  {MARKETPLACE_TABS.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                        activeTab === tab.key
                          ? `${tab.bg} ${tab.color} ${tab.border} border-2 shadow-sm`
                          : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                  <button
                    onClick={() => exportAsCSV(results, name)}
                    className="ml-auto rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all inline-flex items-center gap-2"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Export CSV
                  </button>
                </div>

                {/* Active Listing Content */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Title</h3>
                    <CopyButton text={activeListing.title} />
                  </div>
                  <p className="text-lg font-medium text-slate-900">{activeListing.title}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Description</h3>
                    <CopyButton text={activeListing.description} />
                  </div>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{activeListing.description}</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Bullet Points</h3>
                    <CopyButton text={activeListing.bulletPoints.join("\n")} />
                  </div>
                  <ul className="space-y-2">
                    {activeListing.bulletPoints.map((point, i) => (
                      <li key={`${activeTab}-bp-${i}`} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">SEO Metadata</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-500">Meta Title</span>
                        <CopyButton text={activeListing.metaTitle} />
                      </div>
                      <p className="text-sm text-slate-700">{activeListing.metaTitle}</p>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-500">Meta Description</span>
                        <CopyButton text={activeListing.metaDescription} />
                      </div>
                      <p className="text-sm text-slate-700">{activeListing.metaDescription}</p>
                    </div>
                    <div>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-xs font-medium text-slate-500">Image Alt Text</span>
                        <CopyButton text={activeListing.imageAltText} />
                      </div>
                      <p className="text-sm text-slate-700">{activeListing.imageAltText}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">SEO Keywords</h3>
                    <CopyButton text={activeListing.seoKeywords.join(", ")} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeListing.seoKeywords.map((keyword, i) => (
                      <span key={`${activeTab}-kw-${i}`} className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {!loading && !results && (
              <div className="flex h-full min-h-[400px] items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                  <p className="mt-4 text-sm font-medium text-slate-500">All 4 marketplaces at once</p>
                  <p className="mt-1 text-sm text-slate-400">
                    Fill in the form and click Generate to get optimized listings for Amazon, Etsy, Shopify, and eBay simultaneously.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
