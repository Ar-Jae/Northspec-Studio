"use client";

import { useEffect, useState } from "react";

export default function AccountsPage() {
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
        console.error("Failed to fetch data:", error);
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

  // Calculate simulated account balances based on real data
  const totalRevenue = data?.invoices?.totalRevenue || 0;
  const totalCollected = data?.invoices?.totalCollected || 0;
  const accounts = [
    {
      id: 1,
      name: "Operating Account",
      type: "Checking",
      balance: totalCollected * 0.7,
      institution: "Chase Bank",
      lastTransaction: new Date().toISOString(),
      status: "active",
    },
    {
      id: 2,
      name: "Savings Reserve",
      type: "Savings",
      balance: totalCollected * 0.25,
      institution: "Chase Bank",
      lastTransaction: new Date().toISOString(),
      status: "active",
    },
    {
      id: 3,
      name: "Stripe Balance",
      type: "Payment Processor",
      balance: totalRevenue - totalCollected,
      institution: "Stripe",
      lastTransaction: new Date().toISOString(),
      status: "active",
    },
    {
      id: 4,
      name: "PayPal Business",
      type: "Payment Processor",
      balance: totalCollected * 0.05,
      institution: "PayPal",
      lastTransaction: new Date().toISOString(),
      status: "active",
    },
  ];

  const totalBalance = accounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Financial Accounts</h1>
        <p className="text-sm text-gray-400">Overview of all connected financial accounts</p>
      </div>

      {/* Total Balance Card */}
      <div className="rounded-2xl bg-gradient-to-br from-green-600 to-emerald-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-green-100">Total Balance</p>
            <p className="text-4xl font-bold text-white">{formatCurrency(totalBalance)}</p>
            <p className="mt-2 text-sm text-green-200">
              Across {accounts.filter(a => a.status === 'active').length} active accounts
            </p>
          </div>
          <div className="rounded-full bg-white/20 p-4">
            <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="rounded-2xl bg-[#2b2b2b] p-6 ring-1 ring-white/5"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-2 ${
                  account.type === 'Checking' ? 'bg-blue-500/20' :
                  account.type === 'Savings' ? 'bg-green-500/20' :
                  'bg-purple-500/20'
                }`}>
                  {account.type === 'Checking' ? (
                    <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  ) : account.type === 'Savings' ? (
                    <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-white">{account.name}</h3>
                  <p className="text-xs text-gray-500">{account.institution}</p>
                </div>
              </div>
              <span className={`rounded-full px-2 py-1 text-xs ${
                account.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
              }`}>
                {account.status}
              </span>
            </div>

            <div className="mb-4">
              <p className="text-2xl font-bold text-white">{formatCurrency(account.balance)}</p>
              <p className="text-xs text-gray-500">{account.type} Account</p>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <p className="text-xs text-gray-500">
                Last updated: {new Date(account.lastTransaction).toLocaleDateString()}
              </p>
              <button className="text-sm text-green-400 hover:text-green-300">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl bg-[#2b2b2b] p-6 ring-1 ring-white/5">
        <h3 className="mb-4 text-sm font-semibold uppercase text-gray-500">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <button className="flex flex-col items-center gap-2 rounded-xl bg-white/5 p-4 hover:bg-white/10">
            <div className="rounded-lg bg-blue-500/20 p-2">
              <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className="text-sm text-gray-400">Add Account</span>
          </button>
          
          <button className="flex flex-col items-center gap-2 rounded-xl bg-white/5 p-4 hover:bg-white/10">
            <div className="rounded-lg bg-green-500/20 p-2">
              <svg className="h-5 w-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <span className="text-sm text-gray-400">Sync Accounts</span>
          </button>
          
          <button className="flex flex-col items-center gap-2 rounded-xl bg-white/5 p-4 hover:bg-white/10">
            <div className="rounded-lg bg-purple-500/20 p-2">
              <svg className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <span className="text-sm text-gray-400">Transfer Funds</span>
          </button>
          
          <button className="flex flex-col items-center gap-2 rounded-xl bg-white/5 p-4 hover:bg-white/10">
            <div className="rounded-lg bg-amber-500/20 p-2">
              <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-sm text-gray-400">Export Report</span>
          </button>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl bg-[#2b2b2b] p-6 ring-1 ring-white/5">
          <h3 className="mb-4 text-sm font-semibold uppercase text-gray-500">Account Distribution</h3>
          <div className="space-y-4">
            {accounts.map((account) => {
              const percentage = totalBalance > 0 ? (account.balance / totalBalance) * 100 : 0;
              return (
                <div key={account.id}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-gray-400">{account.name}</span>
                    <span className="text-white">{percentage.toFixed(1)}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full ${
                        account.type === 'Checking' ? 'bg-blue-500' :
                        account.type === 'Savings' ? 'bg-green-500' :
                        'bg-purple-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-[#2b2b2b] p-6 ring-1 ring-white/5">
          <h3 className="mb-4 text-sm font-semibold uppercase text-gray-500">This Month Summary</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-gray-400">Income</span>
              </div>
              <span className="text-green-400">+{formatCurrency(data?.thisMonth?.total || 0)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-red-500" />
                <span className="text-gray-400">Expenses</span>
              </div>
              <span className="text-red-400">-{formatCurrency(0)}</span>
            </div>
            <div className="border-t border-white/10 pt-4">
              <div className="flex items-center justify-between">
                <span className="font-medium text-white">Net</span>
                <span className="text-lg font-bold text-green-400">
                  +{formatCurrency(data?.thisMonth?.total || 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
