"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [incomeExpanded, setIncomeExpanded] = useState(true);

  return (
    <aside className="flex min-h-full flex-col gap-6 bg-[#2b2b2b] p-6 text-gray-400">
      <div className="flex items-center gap-3 px-2 text-xl font-semibold text-white">
        <span>CRM Logo</span>
      </div>

      <nav className="flex flex-1 flex-col gap-2 text-sm font-medium">
        <Link
          href="/"
          className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
            pathname === "/" ? "bg-white/10 text-white" : "hover:bg-white/5 hover:text-white"
          }`}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Dashboard
        </Link>

        <Link
          href="/calendar"
          className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
            pathname === "/calendar" ? "bg-white/10 text-white" : "hover:bg-white/5 hover:text-white"
          }`}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Calendar
        </Link>

        <Link
          href="/reports"
          className="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-white/5 hover:text-white"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 011.414.586l2.828 2.828a1 1 0 01.586 1.414V19a2 2 0 01-2 2z" />
          </svg>
          Reports
        </Link>

        <Link
          href="/leads"
          className="flex items-center justify-between rounded-xl px-4 py-3 transition hover:bg-white/5 hover:text-white"
        >
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Leads
          </div>
          <span className="flex h-5 w-5 items-center justify-center rounded bg-[#8b5cf6] text-[10px] font-bold text-white">4</span>
        </Link>

        <Link
          href="/campaigns"
          className="flex items-center justify-between rounded-xl px-4 py-3 transition hover:bg-white/5 hover:text-white"
        >
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Campaigns
          </div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-600 text-[10px] hover:bg-white/10">+</span>
            <span className="flex h-5 w-5 items-center justify-center rounded bg-[#3b82f6] text-[10px] font-bold text-white">8</span>
          </div>
        </Link>

        <div>
          <button
            onClick={() => setIncomeExpanded(!incomeExpanded)}
            className="flex w-full items-center justify-between rounded-xl px-4 py-3 transition hover:bg-white/5 hover:text-white"
          >
            <div className="flex items-center gap-3">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Income
            </div>
            <svg
              className={`h-4 w-4 transition-transform ${incomeExpanded ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {incomeExpanded && (
            <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-gray-700 pl-4">
              <Link href="#" className="rounded-lg px-4 py-2 hover:text-white">Earning</Link>
              <Link href="#" className="rounded-lg bg-white/10 px-4 py-2 text-white">Refunds</Link>
              <Link href="#" className="rounded-lg px-4 py-2 hover:text-white">Declines</Link>
              <Link href="#" className="rounded-lg px-4 py-2 hover:text-white">Payouts</Link>
            </div>
          )}
        </div>

        <Link
          href="/promote"
          className="flex items-center justify-between rounded-xl px-4 py-3 transition hover:bg-white/5 hover:text-white"
        >
          <div className="flex items-center gap-3">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Promote
          </div>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </Link>
      </nav>

      <div className="mt-auto flex flex-col gap-4">
        <div className="relative flex flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-white/10 to-transparent p-6 text-center ring-1 ring-white/10">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3b82f6] text-white shadow-lg shadow-blue-500/30">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="font-semibold text-white">Upload new image</p>
          <p className="text-xs text-gray-500">Drag and drop</p>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-white p-1">
          <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-black shadow-sm">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Light
          </button>
          <button className="flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-gray-500 hover:text-gray-900">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
            Dark
          </button>
        </div>
      </div>
    </aside>
  );
}
