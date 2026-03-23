"use client";

import { useState } from "react";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import type { Marketplace, GeneratedListing } from "@/types";

const MARKETPLACES: { value: Marketplace; label: string }[] = [
  { value: "amazon", label: "Amazon" },
  { value: "etsy", label: "Etsy" },
  { value: "shopify", label: "Shopify" },
  { value: "ebay", label: "eBay" },
  { value: "generic", label: "Generic" },
];

export default function GeneratePage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [features, setFeatures] = useState("");
  const [marketplace, setMarketplace] = useState<Marketplace>("amazon");
  const [targetAudience, setTargetAudience] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GeneratedListing | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, category, features, marketplace, targetAudience: targetAudience || undefined, priceRange: priceRange || undefined }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to generate listing");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Generate Listing</h1>
          <p className="mt-2 text-slate-500">Enter your product details and get an AI-optimized listing in seconds.</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
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
                    <label htmlFor="marketplace" className="mb-1.5 block text-sm font-medium text-slate-700">Marketplace *</label>
                    <select id="marketplace" value={marketplace} onChange={(e) => setMarketplace(e.target.value as Marketplace)} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
                      {MARKETPLACES.map((m) => (<option key={m.value} value={m.value}>{m.label}</option>))}
                    </select>
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
                    Generating...
                  </span>
                ) : "Generate Listing"}
              </button>
              {error && <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
            </form>
          </div>

          <div>
            {loading && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 w-24 rounded bg-slate-200" />
                  <div className="h-6 w-full rounded bg-slate-200" />
                  <div className="h-4 w-32 rounded bg-slate-200" />
                  <div className="space-y-2"><div className="h-4 w-full rounded bg-slate-200" /><div className="h-4 w-full rounded bg-slate-200" /><div className="h-4 w-3/4 rounded bg-slate-200" /></div>
                </div>
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-2 flex items-center justify-between"><h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Title</h3><CopyButton text={result.title} /></div>
                  <p className="text-lg font-medium text-slate-900">{result.title}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-2 flex items-center justify-between"><h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Description</h3><CopyButton text={result.description} /></div>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{result.description}</p>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-2 flex items-center justify-between"><h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">Bullet Points</h3><CopyButton text={result.bulletPoints.join("\n")} /></div>
                  <ul className="space-y-2">{result.bulletPoints.map((point, i) => (<li key={i} className="flex items-start gap-2 text-sm text-slate-700"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />{point}</li>))}</ul>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">SEO Metadata</h3>
                  <div className="space-y-4">
                    <div><div className="mb-1 flex items-center justify-between"><span className="text-xs font-medium text-slate-500">Meta Title</span><CopyButton text={result.metaTitle} /></div><p className="text-sm text-slate-700">{result.metaTitle}</p></div>
                    <div><div className="mb-1 flex items-center justify-between"><span className="text-xs font-medium text-slate-500">Meta Description</span><CopyButton text={result.metaDescription} /></div><p className="text-sm text-slate-700">{result.metaDescription}</p></div>
                    <div><div className="mb-1 flex items-center justify-between"><span className="text-xs font-medium text-slate-500">Image Alt Text</span><CopyButton text={result.imageAltText} /></div><p className="text-sm text-slate-700">{result.imageAltText}</p></div>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">SEO Keywords</h3><CopyButton text={result.seoKeywords.join(", ")} /></div>
                  <div className="flex flex-wrap gap-2">{result.seoKeywords.map((keyword, i) => (<span key={i} className="inline-flex rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">{keyword}</span>))}</div>
                </div>
              </div>
            )}

            {!loading && !result && (
              <div className="flex h-full items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white p-12">
                <div className="text-center">
                  <svg className="mx-auto h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg>
                  <p className="mt-4 text-sm text-slate-400">Fill in the form and click Generate to see your optimized listing here.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
