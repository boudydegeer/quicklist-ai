"use client";

import Link from "next/link";

export default function LoginPage() {
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
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-bold text-slate-900">Full Version Coming Soon</h2>
          <p className="mb-6 text-sm text-slate-500">
            Authentication will be available when we launch. In the meantime, try our interactive demo!
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
