"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import WaitlistForm from "@/components/WaitlistForm";
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

const API_KEY_STORAGE_KEY = "quicklist-ai-api-key";

function getStoredApiKey(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(API_KEY_STORAGE_KEY) || "";
}

function setStoredApiKey(key: string) {
  if (key) {
    localStorage.setItem(API_KEY_STORAGE_KEY, key);
  } else {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  }
}

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
  const [showWaitlistCta, setShowWaitlistCta] = useState(true);
  const [resultMode, setResultMode] = useState<"demo" | "live" | null>(null);

  // BYOK state
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [keySaved, setKeySaved] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    setApiKey(getStoredApiKey());
  }, []);

  useEffect(() => {
    if (!loading) {
      setLoadingStep(0);
      return;
    }
    const steps = [0, 1, 2, 3, 4];
    let current = 0;
    setLoadingStep(0);
    const interval = setInterval(() => {
      current++;
      if (current < steps.length) {
        setLoadingStep(current);
      } else {
        clearInterval(interval);
      }
    }, 1800);
    return () => clearInterval(interval);
  }, [loading]);

  const handleSaveKey = () => {
    setStoredApiKey(apiKey);
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 2000);
  };

  const handleClearKey = () => {
    setApiKey("");
    setStoredApiKey("");
  };

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
    setResultMode(null);

    try {
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };

      const storedKey = getStoredApiKey();
      if (storedKey) {
        headers["X-API-Key"] = storedKey;
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers,
        body: JSON.stringify({
          name,
          category,
          features,
          targetAudience: targetAudience || undefined,
          priceRange: priceRange || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || `Server error (${response.status})`);
      }

      const data = await response.json();
      setResults(data.listings);
      setResultMode(data.mode);
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
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-all inline-flex items-center gap-1.5"
              title="API Settings"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </button>
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
              <span className="font-medium">{remaining}</span>/{FREE_DAILY_LIMIT} free generations remaining today
            </div>
          </div>
        </div>

        {/* BYOK Settings Panel */}
        {showSettings && (
          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">API Settings (BYOK)</h3>
              <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-slate-500 mb-4">
              Bring your own API key for real AI-powered listings. Supports Anthropic (sk-ant-...) and Google Gemini keys. Your key is stored locally in your browser and never saved on our servers.
            </p>
            <div className="flex gap-3">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key (sk-ant-... or Gemini key)"
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <button
                onClick={handleSaveKey}
                className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 transition-colors"
              >
                {keySaved ? "Saved!" : "Save"}
              </button>
              {apiKey && (
                <button
                  onClick={handleClearKey}
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
            {getStoredApiKey() && (
              <p className="mt-3 text-xs text-green-600 flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                API key configured — real AI generation is active
              </p>
            )}
          </div>
        )}

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
                <div className="mb-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100">
                    <svg className="h-8 w-8 animate-spin text-indigo-600" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">Generating your listings</h3>
                  <p className="mt-1 text-sm text-slate-500">Our AI is crafting optimized content for all 4 marketplaces</p>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Analyzing product details", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" },
                    { label: "Researching marketplace trends", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
                    { label: "Optimizing for Amazon & Etsy", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                    { label: "Generating SEO keywords", icon: "M7 20l4-16m2 16l4-16M6 9h14M4 15h14" },
                    { label: "Finalizing all 4 listings", icon: "M5 13l4 4L19 7" },
                  ].map((step, i) => (
                    <div
                      key={step.label}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-500 ${
                        loadingStep > i
                          ? "bg-green-50 text-green-700"
                          : loadingStep === i
                          ? "bg-indigo-50 text-indigo-700"
                          : "bg-slate-50 text-slate-400"
                      }`}
                    >
                      {loadingStep > i ? (
                        <svg className="h-5 w-5 shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : loadingStep === i ? (
                        <svg className="h-5 w-5 shrink-0 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                      ) : (
                        <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                        </svg>
                      )}
                      <span className="text-sm font-medium">{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results && activeListing && (
              <div className="space-y-4">
                {/* Demo Mode Badge */}
                {resultMode === "demo" && (
                  <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm text-amber-700">
                    <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Demo mode</strong> — showing sample listings. Add your API key in Settings for real AI-generated content.</span>
                  </div>
                )}

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

      {showWaitlistCta && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-indigo-200 bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 shadow-lg">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3 text-white">
              <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              <span className="text-sm font-medium">Like what you see? Join the waitlist for full access!</span>
            </div>
            <div className="flex items-center gap-3">
              <WaitlistForm />
              <button
                onClick={() => setShowWaitlistCta(false)}
                className="shrink-0 rounded-lg p-1.5 text-indigo-200 hover:bg-white/10 hover:text-white transition-colors"
                aria-label="Dismiss"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
