"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUserEmail(user?.email ?? null);
      setLoading(false);
    };
    getUser();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUserEmail(null);
    router.push("/");
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-200/60 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white text-sm font-bold">Q</div>
          <span className="text-lg font-semibold">QuickList AI</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link href="/generate" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Generate</Link>
          <Link href="/bulk" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Bulk Upload</Link>
          <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">Dashboard</Link>

          {!loading && (
            <>
              {userEmail ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm text-slate-500">{userEmail}</span>
                  <button
                    onClick={handleSignOut}
                    className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/auth/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Login</Link>
                  <Link href="/auth/signup" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 transition-colors">Sign Up</Link>
                </div>
              )}
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            <Link href="/generate" className="text-sm text-slate-600 hover:text-slate-900" onClick={() => setMenuOpen(false)}>Generate</Link>
            <Link href="/bulk" className="text-sm text-slate-600 hover:text-slate-900" onClick={() => setMenuOpen(false)}>Bulk Upload</Link>
            <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900" onClick={() => setMenuOpen(false)}>Dashboard</Link>
            <div className="my-2 h-px bg-slate-200" />
            {!loading && (
              <>
                {userEmail ? (
                  <>
                    <span className="text-sm text-slate-500">{userEmail}</span>
                    <button onClick={handleSignOut} className="text-left text-sm font-medium text-red-600 hover:text-red-700">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login" className="text-sm font-medium text-slate-600 hover:text-slate-900" onClick={() => setMenuOpen(false)}>Login</Link>
                    <Link href="/auth/signup" className="text-sm font-medium text-indigo-600 hover:text-indigo-700" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
