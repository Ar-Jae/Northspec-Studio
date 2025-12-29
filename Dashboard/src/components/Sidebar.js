"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [dashboardsOpen, setDashboardsOpen] = useState(true);
  const [financeOpen, setFinanceOpen] = useState(false);
  const [managementOpen, setManagementOpen] = useState(true);
  const [pagesOpen, setPagesOpen] = useState(true);

  return (
    <aside className="flex h-screen w-64 flex-col bg-[#1a2e1a] text-gray-300 rounded-3xl m-3">
      {/* User Profile */}
      <div className="flex items-center gap-3 p-5">
        <div className="h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-amber-400 to-orange-500">
          <img
            src="https://i.pravatar.cc/150?u=arlene"
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
        <span className="font-medium text-white">Arlene McCoy</span>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-white/10 px-5 text-sm">
        <button className="border-b-2 border-green-500 pb-2 text-green-400">Favorites</button>
        <button className="pb-2 text-gray-500 hover:text-gray-300">Recently</button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        <Link
          href="/"
          className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
            pathname === "/" ? "text-white" : "hover:text-white"
          }`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Overview
        </Link>

        <Link
          href="/projects"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
          Projects
        </Link>

        {/* Dashboards Section */}
        <div className="mt-4">
          <button
            onClick={() => setDashboardsOpen(!dashboardsOpen)}
            className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            <svg
              className={`h-3 w-3 transition-transform ${dashboardsOpen ? "rotate-90" : ""}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            Dashboards
          </button>
          {dashboardsOpen && (
            <div className="ml-2 space-y-1">
              <Link
                href="/"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  pathname === "/" ? "bg-green-600/20 text-green-400" : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Overview
              </Link>
              <Link
                href="/pipeline"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  pathname === "/pipeline" ? "bg-green-600/20 text-green-400" : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Pipeline
              </Link>
              <Link
                href="/calendar"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  pathname === "/calendar" ? "bg-green-600/20 text-green-400" : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Calendar
              </Link>
              <Link
                href="/project-request"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  pathname === "/project-request" ? "bg-green-600/20 text-green-400" : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Project Requests
              </Link>
              <Link
                href="/projects"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  pathname === "/projects" ? "bg-green-600/20 text-green-400" : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Projects
              </Link>
            </div>
          )}
        </div>

        {/* Management Section */}
        <div className="mt-4">
          <button
            onClick={() => setManagementOpen(!managementOpen)}
            className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            <svg
              className={`h-3 w-3 transition-transform ${managementOpen ? "rotate-90" : ""}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            Management
          </button>
          {managementOpen && (
            <div className="ml-2 space-y-1">
              <Link
                href="/targets"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  pathname === "/targets" ? "bg-green-600/20 text-green-400" : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Targets
              </Link>
              <Link
                href="/budget"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  pathname === "/budget" ? "bg-green-600/20 text-green-400" : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Budget
              </Link>
              <Link
                href="/users"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  pathname === "/users" ? "bg-green-600/20 text-green-400" : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Users
              </Link>
            </div>
          )}
        </div>

        {/* Finance Section */}
        <div className="mt-4">
          <button
            onClick={() => setFinanceOpen(!financeOpen)}
            className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            <svg
              className={`h-3 w-3 transition-transform ${financeOpen ? "rotate-90" : ""}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            Finance
          </button>
          {financeOpen && (
            <div className="ml-2 space-y-1">
              <Link
                href="/finance"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  pathname === "/finance" ? "bg-green-600/20 text-green-400" : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Overview
              </Link>
              <Link
                href="/finance/invoices"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  pathname === "/finance/invoices" || pathname.startsWith("/finance/invoices/") ? "bg-green-600/20 text-green-400" : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Invoices
              </Link>
              <Link
                href="/finance/payments"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  pathname === "/finance/payments" ? "bg-green-600/20 text-green-400" : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Payments
              </Link>
              <Link
                href="/finance/accounts"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  pathname === "/finance/accounts" ? "bg-green-600/20 text-green-400" : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Accounts
              </Link>
            </div>
          )}
        </div>

        {/* Pages Section */}
        <div className="mt-4">
          <button
            onClick={() => setPagesOpen(!pagesOpen)}
            className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium uppercase tracking-wider text-gray-500"
          >
            <svg
              className={`h-3 w-3 transition-transform ${pagesOpen ? "rotate-90" : ""}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            Pages
          </button>
          {pagesOpen && (
            <div className="ml-2 space-y-1">
              <Link 
                href="/leads" 
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  pathname === "/leads" ? "bg-green-600/20 text-green-400" : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Contact Leads
              </Link>
              <Link 
                href="/prospects" 
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  pathname === "/prospects" ? "bg-green-600/20 text-green-400" : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                Find Prospects
              </Link>
              <Link 
                href="/campaigns" 
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  pathname === "/campaigns" ? "bg-green-600/20 text-green-400" : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Campaigns
              </Link>
              <Link 
                href="/files" 
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  pathname === "/files" ? "bg-green-600/20 text-green-400" : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Files
              </Link>
              <Link href="/documents" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-white/5 hover:text-white">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Documents
              </Link>
              <Link href="/followers" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition hover:bg-white/5 hover:text-white">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Followers
              </Link>
            </div>
          )}
        </div>

        {/* Bottom Links */}
        <div className="mt-6 space-y-1">
          <Link 
            href="/activity" 
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
              pathname === "/activity" ? "text-white" : "hover:text-white"
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Activity
          </Link>
          <Link 
            href="/settings" 
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
              pathname === "/settings" ? "text-white" : "hover:text-white"
            }`}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </Link>
          <Link href="/account" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Account
          </Link>
          <Link href="/corporate" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Corporate
          </Link>
          <Link href="/blog" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            Blog
          </Link>
          <Link href="/social" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
            </svg>
            Social
          </Link>
        </div>
      </nav>
    </aside>
  );
}
