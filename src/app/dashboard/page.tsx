"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface UserProfile {
  email: string;
  plan: string;
  generations_used: number;
  generations_limit: number;
}

interface Generation {
  id: string;
  product_name: string;
  marketplace: string;
  created_at: string;
}

const DEMO_PROFILE: UserProfile = {
  email: "demo@quicklistai.com",
  plan: "pro",
  generations_used: 4,
  generations_limit: 250,
};

const DEMO_GENERATIONS: Generation[] = [
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

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return !!(url && url !== "your-url-here" && key && key !== "your-key-here");
}

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [generations, setGenerations] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setDemoMode(true);
      setProfile(DEMO_PROFILE);
      setGenerations(DEMO_GENERATIONS);
      setLoading(false);
      return;
    }

    const loadDashboard = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data: profileData } = await supabase
        .from("profiles")
        .select("email, plan, generations_used, generations_limit")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      } else {
        setProfile({
          email: user.email ?? "",
          plan: "free",
          generations_used: 0,
          generations_limit: 5,
        });
      }

      const { data: genData } = await supabase
        .from("generations")
        .select("id, product_name, marketplace, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);

      if (genData) {
        setGenerations(genData);
      }

      setLoading(false);
    };
    loadDashboard();
  }, []);

  const handleSignOut = async () => {
    if (demoMode) {
      router.push("/");
      return;
    }
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />
      </div>
    );
  }

  const usagePercent = profile
    ? Math.min((profile.generations_used / profile.generations_limit) * 100, 100)
    : 0;

  const planLabel =
    profile?.plan === "free"
      ? "Free"
      : profile?.plan
        ? profile.plan.charAt(0).toUpperCase() + profile.plan.slice(1)
        : "Free";

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-6 py-10 pt-26">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="mt-1 text-slate-500">{profile?.email}</p>
          </div>
          <button
            onClick={handleSignOut}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Sign Out
          </button>
        </div>
        <div className="mb-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Generations Used
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {profile?.generations_used ?? 0}{" "}
              <span className="text-lg font-normal text-slate-400">
                / {profile?.generations_limit ?? 5}
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
              href="/#pricing"
              className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700"
            >
              Upgrade Plan
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
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">
                Generate Listing
              </h3>
              <p className="text-sm text-slate-500">
                Create an AI-optimized product listing
              </p>
            </div>
          </Link>
          <Link
            href="/bulk"
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Bulk Upload</h3>
              <p className="text-sm text-slate-500">
                Process multiple products via CSV
              </p>
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
            {generations.length === 0 ? (
              <div className="px-6 py-8 text-center text-slate-400">
                No generations yet. Create your first listing!
              </div>
            ) : (
              generations.map((gen) => (
                <div
                  key={gen.id}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div>
                    <p className="font-medium text-slate-900">
                      {gen.product_name}
                    </p>
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
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
