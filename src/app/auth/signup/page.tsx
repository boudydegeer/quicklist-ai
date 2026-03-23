"use client";

import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white text-lg font-bold">Q</div>
            <span className="text-2xl font-bold text-slate-900">QuickList AI</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
            <svg className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM3 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 019.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-bold text-slate-900">Full Version Coming Soon</h2>
          <p className="mb-6 text-sm text-slate-500">
            Account creation will be available when we launch. In the meantime, try our interactive demo!
          </p>
          <Link
            href="/generate"
            className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all hover:bg-indigo-700"
          >
            Try the Demo
          </Link>
        </div>

        <p className="mt-6 text-sm text-slate-400">
          Want early access?{" "}
          <a href="mailto:hello@quicklistai.com" className="font-medium text-indigo-600 hover:text-indigo-700">
            Join the waitlist
          </a>
        </p>
      </div>
    </div>
  );
}
