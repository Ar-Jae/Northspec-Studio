"use client";

import { usePathname } from "next/navigation";

export default function PageHeader({ title, breadcrumbs = [], actions = [] }) {
  const displayTitle = title || (breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1] : "Dashboard");

  return (
    <header className="flex flex-col gap-4 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-3">
            <button className="p-1.5 hover:text-white transition-colors rounded-lg hover:bg-white/5">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Dashboard</span>
            {breadcrumbs.map((crumb, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-gray-600">/</span>
                <span className={idx === breadcrumbs.length - 1 ? "text-white font-medium" : "text-gray-500"}>
                  {crumb}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 rounded-xl bg-white/5 border border-white/5 px-4 py-2 pl-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-brand-gold/50 transition-all"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <h1 className="text-3xl font-bold text-white font-serif tracking-tight">{displayTitle}</h1>
        <div className="flex items-center gap-3">
          {actions.map((action, idx) => (
            <button
              key={idx}
              className={action.primary ? "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all bg-brand-gold text-black" : "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all bg-white/5 text-gray-300 border border-white/5"}
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}