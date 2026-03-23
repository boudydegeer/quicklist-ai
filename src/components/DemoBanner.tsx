"use client";

export default function DemoBanner() {
  return (
    <div className="fixed top-0 z-[60] w-full bg-amber-500 px-4 py-1.5 text-center text-xs font-semibold text-amber-950">
      Demo Mode — Running without API keys. Data is not saved.
    </div>
  );
}
