"use client";

import { useEffect, useState, useCallback } from "react";
import { usePlaidLink } from "react-plaid-link";

// Plaid Link Button Component
function PlaidLinkButton({ onSuccess, onExit }) {
  const [linkToken, setLinkToken] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function createLinkToken() {
      try {
        const res = await fetch("http://localhost:4000/api/plaid/create-link-token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: "user-1" }),
        });
        if (res.ok) {
          const data = await res.json();
          setLinkToken(data.link_token);
        }
      } catch (error) {
        console.error("Failed to create link token:", error);
      }
    }
    createLinkToken();
  }, []);

  const handleSuccess = useCallback(async (publicToken, metadata) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/plaid/exchange-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_token: publicToken, metadata }),
      });
      if (res.ok) {
        const data = await res.json();
        onSuccess?.(data);
      }
    } catch (error) {
      console.error("Failed to exchange token:", error);
    } finally {
      setLoading(false);
    }
  }, [onSuccess]);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: handleSuccess,
    onExit: onExit,
  });

  return (
    <button
      onClick={() => open()}
      disabled={!ready || loading}
      className="flex items-center gap-2 rounded-lg bg-brand-gold px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
    >
      {loading ? (
        <>
          <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Connecting...
        </>
      ) : (
        <>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Connect Bank Account
        </>
      )}
    </button>
  );
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState([]);
  const [totals, setTotals] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [insights, setInsights] = useState(null);
  const [linkedItems, setLinkedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [activeTab, setActiveTab] = useState("accounts");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    await Promise.all([
      fetchAccounts(),
      fetchLinkedItems(),
      fetchTransactions(),
      fetchInsights(),
    ]);
    setLoading(false);
  }

  async function fetchAccounts() {
    try {
      const res = await fetch("http://localhost:4000/api/plaid/accounts");
      if (res.ok) {
        const data = await res.json();
        setAccounts(data.accounts || []);
        setTotals(data.totals);
      }
    } catch (error) {
      console.error("Failed to fetch accounts:", error);
    }
  }

  async function fetchLinkedItems() {
    try {
      const res = await fetch("http://localhost:4000/api/plaid/items");
      if (res.ok) {
        const data = await res.json();
        setLinkedItems(data);
      }
    } catch (error) {
      console.error("Failed to fetch linked items:", error);
    }
  }

  async function fetchTransactions() {
    try {
      const res = await fetch("http://localhost:4000/api/plaid/transactions");
      if (res.ok) {
        const data = await res.json();
        setTransactions(data.transactions || []);
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  }

  async function fetchInsights() {
    try {
      const res = await fetch("http://localhost:4000/api/plaid/spending-insights");
      if (res.ok) {
        const data = await res.json();
        setInsights(data);
      }
    } catch (error) {
      console.error("Failed to fetch insights:", error);
    }
  }

  async function handleSync() {
    setSyncing(true);
    try {
      await fetch("http://localhost:4000/api/plaid/sync", { method: "POST" });
      await fetchAccounts();
    } catch (error) {
      console.error("Failed to sync:", error);
    } finally {
      setSyncing(false);
    }
  }

  async function handleUnlink(itemId) {
    if (confirm("Are you sure you want to unlink this account?")) {
      try {
        await fetch(`http://localhost:4000/api/plaid/items/${itemId}`, { method: "DELETE" });
        await fetchData();
      } catch (error) {
        console.error("Failed to unlink:", error);
      }
    }
  }

  const handleLinkSuccess = () => {
    fetchData();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount || 0);
  };

  const getAccountIcon = (type, subtype) => {
    if (subtype === 'checking') {
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
    } else if (subtype === 'savings') {
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    } else if (type === 'credit') {
      return (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      );
    }
    return (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-400">Loading accounts...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Bank Accounts</h1>
          <p className="text-sm text-gray-400">Connect and manage your real bank accounts</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSync}
            disabled={syncing}
            className="flex items-center gap-2 rounded-lg bg-brand-gray/10 px-4 py-2 text-sm text-white hover:bg-brand-gray/20 disabled:opacity-50"
          >
            <svg className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {syncing ? "Syncing..." : "Sync"}
          </button>
          <PlaidLinkButton onSuccess={handleLinkSuccess} />
        </div>
      </div>

      {/* Total Balance Card */}
      {totals && (
        <div className="rounded-2xl bg-gradient-to-br from-brand-gold to-emerald-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-brand-gold">Net Worth</p>
              <p className="text-4xl font-bold text-white">{formatCurrency(totals.total)}</p>
              <div className="mt-3 flex gap-4 text-sm">
                <span className="text-brand-gold">
                  Cash: {formatCurrency(totals.checking + totals.savings)}
                </span>
                {totals.credit > 0 && (
                  <span className="text-red-200">
                    Credit: -{formatCurrency(totals.credit)}
                  </span>
                )}
              </div>
            </div>
            <div className="rounded-full bg-brand-gray/20 p-4">
              <svg className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* No Accounts State */}
      {accounts.length === 0 && (
        <div className="rounded-2xl bg-[#2b2b2b] p-12 text-center ring-1 ring-white/5">
          <div className="mx-auto mb-4 w-16 rounded-full bg-brand-gold/20 p-4">
            <svg className="h-8 w-8 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-medium text-white">No accounts connected</h3>
          <p className="mb-6 text-gray-400">Connect your bank accounts to see balances and transactions</p>
          <PlaidLinkButton onSuccess={handleLinkSuccess} />
        </div>
      )}

      {/* Tabs */}
      {accounts.length > 0 && (
        <>
          <div className="flex gap-2">
            {["accounts", "transactions", "insights"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${
                  activeTab === tab
                    ? "bg-brand-gold text-white"
                    : "bg-[#2b2b2b] text-gray-400 hover:bg-brand-gray/10"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Accounts Tab */}
          {activeTab === "accounts" && (
            <div className="space-y-4">
              {linkedItems.map((item) => (
                <div key={item._id} className="rounded-2xl bg-[#2b2b2b] p-6 ring-1 ring-white/5">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {item.institutionLogo ? (
                        <img src={item.institutionLogo} alt="" className="h-8 w-8 rounded" />
                      ) : (
                        <div 
                          className="flex h-8 w-8 items-center justify-center rounded text-white text-sm font-bold"
                          style={{ backgroundColor: item.institutionColor || '#4F46E5' }}
                        >
                          {item.institutionName?.[0] || 'B'}
                        </div>
                      )}
                      <div>
                        <h3 className="font-medium text-white">{item.institutionName || 'Bank'}</h3>
                        <p className="text-xs text-gray-500">
                          {item.accounts?.length || 0} accounts • 
                          Last synced: {item.lastSyncedAt ? new Date(item.lastSyncedAt).toLocaleString() : 'Never'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleUnlink(item._id)}
                      className="text-sm text-red-400 hover:text-red-300"
                    >
                      Unlink
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {accounts
                      .filter(acc => acc.itemId?.toString() === item._id?.toString())
                      .map((account) => (
                        <div
                          key={account.accountId}
                          className="flex items-center justify-between rounded-lg bg-brand-gray/5 p-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`rounded-lg p-2 ${
                              account.type === 'credit' ? 'bg-red-500/20 text-red-400' :
                              account.subtype === 'savings' ? 'bg-brand-gold/20 text-brand-gold' :
                              'bg-blue-500/20 text-blue-400'
                            }`}>
                              {getAccountIcon(account.type, account.subtype)}
                            </div>
                            <div>
                              <p className="font-medium text-white">{account.name}</p>
                              <p className="text-xs text-gray-500">
                                {account.subtype} •••• {account.mask}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`text-lg font-bold ${
                              account.type === 'credit' ? 'text-red-400' : 'text-white'
                            }`}>
                              {account.type === 'credit' ? '-' : ''}{formatCurrency(account.currentBalance)}
                            </p>
                            {account.availableBalance !== account.currentBalance && (
                              <p className="text-xs text-gray-500">
                                Available: {formatCurrency(account.availableBalance)}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === "transactions" && (
            <div className="rounded-2xl bg-[#2b2b2b] ring-1 ring-white/5">
              <div className="border-b border-white/10 p-4">
                <h3 className="font-medium text-white">Recent Transactions</h3>
                <p className="text-sm text-gray-500">Last 30 days</p>
              </div>
              <div className="divide-y divide-white/5">
                {transactions.length > 0 ? (
                  transactions.slice(0, 50).map((txn) => (
                    <div key={txn.id} className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3">
                        {txn.logoUrl ? (
                          <img src={txn.logoUrl} alt="" className="h-10 w-10 rounded-full" />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gray/10 text-gray-400">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-white">{txn.merchantName || txn.name}</p>
                          <p className="text-xs text-gray-500">
                            {txn.category?.[0] || 'Uncategorized'} • {new Date(txn.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${txn.amount < 0 ? 'text-brand-gold' : 'text-white'}`}>
                          {txn.amount < 0 ? '+' : '-'}{formatCurrency(Math.abs(txn.amount))}
                        </p>
                        {txn.pending && (
                          <span className="text-xs text-amber-400">Pending</span>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    No transactions found
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Insights Tab */}
          {activeTab === "insights" && insights && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-[#2b2b2b] p-6 ring-1 ring-white/5">
                  <p className="text-sm text-gray-500">Income (30 days)</p>
                  <p className="text-2xl font-bold text-brand-gold">{formatCurrency(insights.totalIncome)}</p>
                </div>
                <div className="rounded-2xl bg-[#2b2b2b] p-6 ring-1 ring-white/5">
                  <p className="text-sm text-gray-500">Spending (30 days)</p>
                  <p className="text-2xl font-bold text-red-400">{formatCurrency(insights.totalSpending)}</p>
                </div>
                <div className="rounded-2xl bg-[#2b2b2b] p-6 ring-1 ring-white/5">
                  <p className="text-sm text-gray-500">Net Cash Flow</p>
                  <p className={`text-2xl font-bold ${insights.netCashFlow >= 0 ? 'text-brand-gold' : 'text-red-400'}`}>
                    {insights.netCashFlow >= 0 ? '+' : ''}{formatCurrency(insights.netCashFlow)}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-[#2b2b2b] p-6 ring-1 ring-white/5">
                <h3 className="mb-4 text-sm font-semibold uppercase text-gray-500">Spending by Category</h3>
                <div className="space-y-4">
                  {insights.categories?.slice(0, 8).map((cat, index) => {
                    const colors = ['bg-blue-500', 'bg-brand-gold', 'bg-purple-500', 'bg-amber-500', 'bg-red-500', 'bg-pink-500', 'bg-cyan-500', 'bg-indigo-500'];
                    return (
                      <div key={cat.name}>
                        <div className="mb-1 flex justify-between text-sm">
                          <span className="text-gray-400">{cat.name}</span>
                          <span className="text-white">{formatCurrency(cat.amount)} ({cat.percentage}%)</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-brand-gray/10">
                          <div
                            className={`h-full ${colors[index % colors.length]}`}
                            style={{ width: `${cat.percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Plaid Sandbox Info */}
      <div className="rounded-2xl bg-amber-500/10 p-4 ring-1 ring-amber-500/20">
        <div className="flex items-start gap-3">
          <svg className="h-5 w-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="font-medium text-amber-400">Plaid Sandbox Mode</p>
            <p className="text-sm text-amber-300/80">
              For testing, use these credentials: Username: <code className="rounded bg-amber-500/20 px-1">user_good</code>, 
              Password: <code className="rounded bg-amber-500/20 px-1">pass_good</code>. 
              To use production, update your Plaid environment and credentials in the .env file.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
