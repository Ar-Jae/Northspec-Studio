"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FinancePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:4000/api/finance/overview");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error("Failed to fetch finance overview:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Financial Overview</h1>
          <p className="text-sm text-gray-400">Track revenue, invoices, and payments</p>
        </div>
        <Link
          href="/finance/invoices/new"
          className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Invoice
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-[#2b2b2b] p-5 ring-1 ring-white/5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-500/20 p-2">
              <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Revenue</p>
              <p className="text-xl font-bold text-white">{formatCurrency(data?.invoices?.totalRevenue)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#2b2b2b] p-5 ring-1 ring-white/5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-500/20 p-2">
              <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Invoices</p>
              <p className="text-xl font-bold text-white">{data?.invoices?.totalInvoices || 0}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#2b2b2b] p-5 ring-1 ring-white/5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-500/20 p-2">
              <svg className="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Collected</p>
              <p className="text-xl font-bold text-white">{formatCurrency(data?.invoices?.totalCollected)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-[#2b2b2b] p-5 ring-1 ring-white/5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-amber-500/20 p-2">
              <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-500">Outstanding</p>
              <p className="text-xl font-bold text-white">{formatCurrency(data?.invoices?.totalOutstanding)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* This Month Stats */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl bg-[#2b2b2b] p-6 ring-1 ring-white/5">
          <h3 className="mb-4 text-sm font-semibold uppercase text-gray-500">This Month</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Payments Received</span>
              <span className="text-xl font-bold text-green-400">{formatCurrency(data?.thisMonth?.total)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Transactions</span>
              <span className="text-lg font-medium text-white">{data?.thisMonth?.count || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Overdue Invoices</span>
              <span className={`text-lg font-medium ${data?.overdueCount > 0 ? 'text-red-400' : 'text-white'}`}>
                {data?.overdueCount || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="rounded-2xl bg-[#2b2b2b] p-6 ring-1 ring-white/5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase text-gray-500">Recent Invoices</h3>
            <Link href="/finance/invoices" className="text-xs text-green-400 hover:text-green-300">View All</Link>
          </div>
          <div className="space-y-3">
            {data?.recentInvoices?.length > 0 ? (
              data.recentInvoices.map((inv) => (
                <div key={inv._id} className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                  <div>
                    <p className="text-sm font-medium text-white">{inv.invoiceNumber}</p>
                    <p className="text-xs text-gray-400">{inv.clientName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">{formatCurrency(inv.total)}</p>
                    <span className={`text-xs ${
                      inv.status === 'paid' ? 'text-green-400' :
                      inv.status === 'overdue' ? 'text-red-400' :
                      inv.status === 'sent' ? 'text-blue-400' : 'text-gray-400'
                    }`}>{inv.status}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No invoices yet</p>
            )}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="rounded-2xl bg-[#2b2b2b] p-6 ring-1 ring-white/5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold uppercase text-gray-500">Recent Payments</h3>
            <Link href="/finance/payments" className="text-xs text-green-400 hover:text-green-300">View All</Link>
          </div>
          <div className="space-y-3">
            {data?.recentPayments?.length > 0 ? (
              data.recentPayments.map((pay) => (
                <div key={pay._id} className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                  <div>
                    <p className="text-sm font-medium text-white">{pay.payerName}</p>
                    <p className="text-xs text-gray-400">{pay.method?.replace('_', ' ')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-400">+{formatCurrency(pay.amount)}</p>
                    <p className="text-xs text-gray-500">{new Date(pay.paymentDate).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No payments yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Link
          href="/finance/invoices"
          className="flex items-center gap-4 rounded-2xl bg-[#2b2b2b] p-5 ring-1 ring-white/5 transition hover:bg-white/5"
        >
          <div className="rounded-lg bg-blue-500/20 p-3">
            <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-white">Manage Invoices</h3>
            <p className="text-sm text-gray-400">Create, edit, and send invoices</p>
          </div>
        </Link>

        <Link
          href="/finance/payments"
          className="flex items-center gap-4 rounded-2xl bg-[#2b2b2b] p-5 ring-1 ring-white/5 transition hover:bg-white/5"
        >
          <div className="rounded-lg bg-green-500/20 p-3">
            <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-white">Record Payments</h3>
            <p className="text-sm text-gray-400">Track incoming payments</p>
          </div>
        </Link>

        <Link
          href="/finance/accounts"
          className="flex items-center gap-4 rounded-2xl bg-[#2b2b2b] p-5 ring-1 ring-white/5 transition hover:bg-white/5"
        >
          <div className="rounded-lg bg-purple-500/20 p-3">
            <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-white">Financial Accounts</h3>
            <p className="text-sm text-gray-400">View account balances</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
