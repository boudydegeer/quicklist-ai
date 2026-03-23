"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { DEMO_PROFILE, DEMO_GENERATIONS } from "@/lib/demo";

export default function DashboardPage() {
  const router = useRouter();
  const { user, profile, signOut, configured, loading } = useAuth();

  // Use real data if authenticated, demo data otherwise
  const isAuthenticated = configured && user;
  const displayProfile = isAuthenticated && profile
    ? profile
    : DEMO_PROFILE;
  const generations = DEMO_GENERATIONS;

  const usagePercent = Math.min(
    (displayProfile.generations_used / displayProfile.generations_limit) * 100,
    100
  );

  const planLabel =
    displayProfile.plan.charAt(0).toUpperCase() + displayProfile.plan.slice(1);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <svg className="mx-auto h-8 w-8 animate-spin text-indigo-600" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="mt-2 text-sm text-slate-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-6 py-10 pt-26">
        {/* Demo banner when not authenticated */}
        {!isAuthenticated && (
          <div className="mb-6 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>
              <strong>Demo mode</strong> — showing sample data.{" "}
              <Link href="/auth/signup" className="font-medium underline hover:text-amber-800">
                Create an account
              </Link>{" "}
              to track your real usage.
            </span>
          </div>
        )}

        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="mt-1 text-slate-500">
              {isAuthenticated ? user.email : (displayProfile as typeof DEMO_PROFILE).email}
            </p>
          </div>
          {isAuthenticated ? (
            <button
              onClick={handleSignOut}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Sign Out
            </button>
          ) : (
            <Link
              href="/auth/login"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
            >
              Sign In
            </Link>
          )}
        </div>
        <div className="mb-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Generations Used
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {displayProfile.generations_used}{" "}
              <span className="text-lg font-normal text-slate-400">
                / {displayProfile.generations_limit}
              </span>
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-indigo-600"
                style={{ width: `${usagePercent}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-400">{planLabel} plan</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Current Plan</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {planLabel}
            </p>
            <Link
              href="/pricing"
              className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              {displayProfile.plan === "free" ? "Upgrade Plan" : "Manage Plan"}
            </Link>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Marketplaces</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">5</p>
            <p className="mt-2 text-xs text-slate-400">
              Amazon, Etsy, Shopify, eBay, Generic
            </p>
          </div>
        </div>
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <Link
            href="/generate"
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Generate Listing</h3>
              <p className="text-sm text-slate-500">Create an AI-optimized product listing</p>
            </div>
          </Link>
          <Link
            href="/bulk"
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Bulk Upload</h3>
              <p className="text-sm text-slate-500">Process multiple products via CSV</p>
            </div>
          </Link>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Generations
            </h2>
          </div>
          <div className="divide-y divide-slate-100">
            {generations.map((gen) => (
              <div
                key={gen.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div>
                  <p className="font-medium text-slate-900">{gen.product_name}</p>
                  <p className="text-sm text-slate-500">{gen.marketplace}</p>
                </div>
                <p className="text-sm text-slate-400">
                  {new Date(gen.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
