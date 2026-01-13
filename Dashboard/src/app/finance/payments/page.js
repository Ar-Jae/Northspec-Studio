"use client";

import { useEffect, useState } from "react";

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    invoice: "",
    amount: 0,
    method: "bank_transfer",
    payerName: "",
    payerEmail: "",
    reference: "",
    notes: "",
  });

  useEffect(() => {
    fetchPayments();
    fetchStats();
    fetchInvoices();
  }, []);

  async function fetchPayments() {
    try {
      const res = await fetch("http://localhost:4000/api/payments");
      if (res.ok) {
        const json = await res.json();
        setPayments(json);
      }
    } catch (error) {
      console.error("Failed to fetch payments:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchStats() {
    try {
      const res = await fetch("http://localhost:4000/api/payments/stats");
      if (res.ok) {
        const json = await res.json();
        setStats(json);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  }

  async function fetchInvoices() {
    try {
      const res = await fetch("http://localhost:4000/api/invoices");
      if (res.ok) {
        const json = await res.json();
        // API may return { invoices, total, ... } or an array directly.
        const list = Array.isArray(json) ? json : (Array.isArray(json.invoices) ? json.invoices : []);
        // Only show unpaid invoices for payment selection
        setInvoices(list.filter(inv => inv.status !== 'paid' && inv.status !== 'cancelled'));
      }
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount || 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "invoice") {
      const selectedInvoice = invoices.find(inv => inv._id === value);
      if (selectedInvoice) {
        const remaining = selectedInvoice.total - (selectedInvoice.amountPaid || 0);
        setFormData(prev => ({
          ...prev,
          invoice: value,
          amount: remaining,
          payerName: selectedInvoice.clientName,
          payerEmail: selectedInvoice.clientEmail,
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData({
      invoice: "",
      amount: 0,
      method: "bank_transfer",
      payerName: "",
      payerEmail: "",
      reference: "",
      notes: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        const payment = await res.json();
        // Auto-process the payment
        await fetch(`http://localhost:4000/api/payments/${payment._id}/process`, { method: "POST" });
        
        setShowModal(false);
        resetForm();
        fetchPayments();
        fetchStats();
        fetchInvoices();
      }
    } catch (error) {
      console.error("Failed to create payment:", error);
    }
  };

  const handleRefund = async (id) => {
    const reason = prompt("Enter refund reason:");
    if (reason) {
      try {
        const res = await fetch(`http://localhost:4000/api/payments/${id}/refund`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reason }),
        });
        if (res.ok) {
          fetchPayments();
          fetchStats();
          fetchInvoices();
        }
      } catch (error) {
        console.error("Failed to refund payment:", error);
      }
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-amber-500/20 text-amber-400",
      completed: "bg-brand-gold/20 text-brand-gold",
      failed: "bg-red-500/20 text-red-400",
      refunded: "bg-purple-500/20 text-purple-400",
    };
    return colors[status] || colors.pending;
  };

  const getMethodIcon = (method) => {
    const icons = {
      credit_card: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      bank_transfer: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      ),
      paypal: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.72a.78.78 0 0 1 .771-.654h6.916c2.293 0 4.107.584 5.087 1.64.952 1.025 1.199 2.425.733 4.163-.053.195-.109.385-.166.575l-.001.005c-.682 2.379-2.097 3.891-4.089 4.362-1.173.277-2.439.3-3.678.3H8.831c-.475 0-.874.342-.95.805l-.805 5.421z"/>
        </svg>
      ),
      stripe: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"/>
        </svg>
      ),
      check: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      cash: (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    };
    return icons[method] || icons.bank_transfer;
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
          <h1 className="text-2xl font-bold text-white">Payments</h1>
          <p className="text-sm text-gray-400">Track and record all payment transactions</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center gap-2 rounded-lg bg-brand-gold px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Record Payment
        </button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-[#2b2b2b] p-4 ring-1 ring-white/5">
            <p className="text-xs text-gray-500">Total Collected</p>
            <p className="text-2xl font-bold text-brand-gold">{formatCurrency(stats.totalCollected)}</p>
          </div>
          <div className="rounded-xl bg-[#2b2b2b] p-4 ring-1 ring-white/5">
            <p className="text-xs text-gray-500">This Month</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(stats.thisMonth?.total)}</p>
          </div>
          <div className="rounded-xl bg-[#2b2b2b] p-4 ring-1 ring-white/5">
            <p className="text-xs text-gray-500">Transactions</p>
            <p className="text-2xl font-bold text-white">{stats.totalPayments || 0}</p>
          </div>
          <div className="rounded-xl bg-[#2b2b2b] p-4 ring-1 ring-white/5">
            <p className="text-xs text-gray-500">Total Refunded</p>
            <p className="text-2xl font-bold text-red-400">{formatCurrency(stats.totalRefunded)}</p>
          </div>
        </div>
      )}

      {/* Payments List */}
      <div className="space-y-3">
        {payments.length > 0 ? (
          payments.map((payment) => (
            <div
              key={payment._id}
              className="flex items-center justify-between rounded-2xl bg-[#2b2b2b] p-5 ring-1 ring-white/5"
            >
              <div className="flex items-center gap-4">
                <div className={`rounded-lg p-3 ${
                  payment.status === 'completed' ? 'bg-brand-gold/20 text-brand-gold' :
                  payment.status === 'refunded' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {getMethodIcon(payment.method)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-white">{payment.payerName}</p>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    {payment.paymentNumber} • {payment.method?.replace('_', ' ')}
                  </p>
                  {payment.invoice && (
                    <p className="text-xs text-gray-500">
                      Invoice: {payment.invoice.invoiceNumber || payment.invoice}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className={`text-lg font-bold ${payment.status === 'refunded' ? 'text-red-400 line-through' : 'text-brand-gold'}`}>
                    {formatCurrency(payment.amount)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(payment.paymentDate).toLocaleDateString()}
                  </p>
                </div>
                
                {payment.status === 'completed' && (
                  <button
                    onClick={() => handleRefund(payment._id)}
                    className="rounded-lg p-2 text-gray-400 hover:bg-brand-gray/10 hover:text-red-400"
                    title="Refund"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-2xl bg-[#2b2b2b] p-12 text-center ring-1 ring-white/5">
            <div className="mx-auto mb-4 w-16 rounded-full bg-gray-500/20 p-4">
              <svg className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <p className="text-gray-400">No payments recorded yet</p>
            <p className="text-sm text-gray-500">Record your first payment to get started</p>
          </div>
        )}
      </div>

      {/* Record Payment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#1e1e1e] p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Record Payment</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Link to Invoice */}
              <div>
                <label className="mb-1 block text-sm text-gray-400">Link to Invoice (Optional)</label>
                <select
                  name="invoice"
                  value={formData.invoice}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-white/10 bg-brand-gray/5 px-4 py-2 text-white focus:border-brand-gold focus:outline-none"
                >
                  <option value="">No invoice (standalone payment)</option>
                  {invoices.map((inv) => (
                    <option key={inv._id} value={inv._id}>
                      {inv.invoiceNumber} - {inv.clientName} ({formatCurrency(inv.total - (inv.amountPaid || 0))} remaining)
                    </option>
                  ))}
                </select>
              </div>

              {/* Payer Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Payer Name *</label>
                  <input
                    type="text"
                    name="payerName"
                    value={formData.payerName}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-white/10 bg-brand-gray/5 px-4 py-2 text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Payer Email</label>
                  <input
                    type="email"
                    name="payerEmail"
                    value={formData.payerEmail}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-white/10 bg-brand-gray/5 px-4 py-2 text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>
              </div>

              {/* Amount and Method */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Amount *</label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    min="0.01"
                    step="0.01"
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-white/10 bg-brand-gray/5 px-4 py-2 text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Payment Method *</label>
                  <select
                    name="method"
                    value={formData.method}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-white/10 bg-brand-gray/5 px-4 py-2 text-white focus:border-brand-gold focus:outline-none"
                  >
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="bank_transfer">Bank Transfer</option>
                    <option value="paypal">PayPal</option>
                    <option value="stripe">Stripe</option>
                    <option value="check">Check</option>
                    <option value="cash">Cash</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Reference */}
              <div>
                <label className="mb-1 block text-sm text-gray-400">Reference / Transaction ID</label>
                <input
                  type="text"
                  name="reference"
                  value={formData.reference}
                  onChange={handleInputChange}
                  placeholder="e.g., Bank transaction ID or check number"
                  className="w-full rounded-lg border border-white/10 bg-brand-gray/5 px-4 py-2 text-white placeholder-gray-500 focus:border-brand-gold focus:outline-none"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="mb-1 block text-sm text-gray-400">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full rounded-lg border border-white/10 bg-brand-gray/5 px-4 py-2 text-white focus:border-brand-gold focus:outline-none"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-brand-gold px-6 py-2 font-medium text-white hover:bg-green-700"
                >
                  Record Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
