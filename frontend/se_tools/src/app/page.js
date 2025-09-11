
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-slate-900 text-slate-100">
      <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-sm">
        <h1 className="text-xl font-semibold text-white">Configure Meraki MX</h1>
        <p className="mt-1 text-sm text-slate-300">Open the SD‑WAN setup and browse starter templates.</p>

        <Link
          href="/sdwan-config"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          View Templates
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
