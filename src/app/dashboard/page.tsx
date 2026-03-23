"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface UserInfo {
  email: string;
}

const mockGenerations = [
  { id: "1", product_name: "Bamboo Wireless Charger", marketplace: "Amazon", created_at: "2026-03-22T10:30:00Z" },
  { id: "2", product_name: "Handmade Leather Wallet", marketplace: "Etsy", created_at: "2026-03-21T14:15:00Z" },
  { id: "3", product_name: "Organic Cotton T-Shirt", marketplace: "Shopify", created_at: "2026-03-20T09:45:00Z" },
  { id: "4", product_name: "Vintage Camera Strap", marketplace: "eBay", created_at: "2026-03-19T16:20:00Z" },
  { id: "5", product_name: "Ceramic Plant Pot Set", marketplace: "Amazon", created_at: "2026-03-18T11:00:00Z" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser({ email: user.email ?? "" });
      }
      setLoading(false);
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
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

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-7xl px-6 py-10 pt-26">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="mt-1 text-slate-500">{user?.email}</p>
          </div>
          <button onClick={handleSignOut} className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">Sign Out</button>
        </div>
        <div className="mb-8 grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Generations Used</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">3 <span className="text-lg font-normal text-slate-400">/ 5</span></p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full w-3/5 rounded-full bg-indigo-600" /></div>
            <p className="mt-2 text-xs text-slate-400">Free plan</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Current Plan</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">Free</p>
            <Link href="/#pricing" className="mt-3 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-700">Upgrade Plan</Link>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Marketplaces</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">5</p>
            <p className="mt-2 text-xs text-slate-400">Amazon, Etsy, Shopify, eBay, Generic</p>
          </div>
        </div>
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <Link href="/generate" className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" /></svg></div>
            <div><h3 className="font-semibold text-slate-900">Generate Listing</h3><p className="text-sm text-slate-500">Create an AI-optimized product listing</p></div>
          </Link>
          <Link href="/bulk" className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600"><svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" /></svg></div>
            <div><h3 className="font-semibold text-slate-900">Bulk Upload</h3><p className="text-sm text-slate-500">Process multiple products via CSV</p></div>
          </Link>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4"><h2 className="text-lg font-semibold text-slate-900">Recent Generations</h2></div>
          <div className="divide-y divide-slate-100">
            {mockGenerations.map((gen) => (
              <div key={gen.id} className="flex items-center justify-between px-6 py-4">
                <div><p className="font-medium text-slate-900">{gen.product_name}</p><p className="text-sm text-slate-500">{gen.marketplace}</p></div>
                <p className="text-sm text-slate-400">{new Date(gen.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
