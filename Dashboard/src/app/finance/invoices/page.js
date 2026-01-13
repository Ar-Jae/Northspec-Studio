"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    items: [{ description: "", quantity: 1, unitPrice: 0 }],
    taxRate: 0,
    discount: 0,
    discountType: "fixed",
    dueDate: "",
    notes: "",
  });

  useEffect(() => {
    fetchInvoices();
    fetchStats();
  }, []);

  async function fetchInvoices() {
    try {
      const res = await fetch("http://localhost:4000/api/invoices");
      if (res.ok) {
        const json = await res.json();
        // API returns { invoices, total, ... } — normalize to array
        const list = Array.isArray(json) ? json : (Array.isArray(json.invoices) ? json.invoices : []);
        setInvoices(list);
      }
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchStats() {
    try {
      const res = await fetch("http://localhost:4000/api/invoices/stats");
      if (res.ok) {
        const json = await res.json();
        setStats(json);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount || 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = field === "description" ? value : Number(value);
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: 1, unitPrice: 0 }]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter((_, i) => i !== index)
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      clientName: "",
      clientEmail: "",
      clientAddress: "",
      items: [{ description: "", quantity: 1, unitPrice: 0 }],
      taxRate: 0,
      discount: 0,
      discountType: "fixed",
      dueDate: "",
      notes: "",
    });
    setEditingInvoice(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingInvoice 
        ? `http://localhost:4000/api/invoices/${editingInvoice._id}`
        : "http://localhost:4000/api/invoices";
      const method = editingInvoice ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (res.ok) {
        setShowModal(false);
        resetForm();
        fetchInvoices();
        fetchStats();
      }
    } catch (error) {
      console.error("Failed to save invoice:", error);
    }
  };

  const handleEdit = (invoice) => {
    setFormData({
      clientName: invoice.clientName,
      clientEmail: invoice.clientEmail,
      clientAddress: invoice.clientAddress || "",
      items: invoice.items,
      taxRate: invoice.taxRate || 0,
      discount: invoice.discount || 0,
      discountType: invoice.discountType || "fixed",
      dueDate: invoice.dueDate ? new Date(invoice.dueDate).toISOString().split('T')[0] : "",
      notes: invoice.notes || "",
    });
    setEditingInvoice(invoice);
    setShowModal(true);
  };

  const handleSendInvoice = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/api/invoices/${id}/send`, { method: "POST" });
      if (res.ok) {
        fetchInvoices();
      }
    } catch (error) {
      console.error("Failed to send invoice:", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this invoice?")) {
      try {
        const res = await fetch(`http://localhost:4000/api/invoices/${id}`, { method: "DELETE" });
        if (res.ok) {
          fetchInvoices();
          fetchStats();
        }
      } catch (error) {
        console.error("Failed to delete invoice:", error);
      }
    }
  };

  const filteredInvoices = filter === "all" 
    ? invoices 
    : invoices.filter(inv => inv.status === filter);

  const getStatusColor = (status) => {
    const colors = {
      draft: "bg-gray-500/20 text-gray-400",
      sent: "bg-blue-500/20 text-blue-400",
      viewed: "bg-purple-500/20 text-purple-400",
      paid: "bg-brand-gold/20 text-brand-gold",
      partial: "bg-amber-500/20 text-amber-400",
      overdue: "bg-red-500/20 text-red-400",
      cancelled: "bg-gray-500/20 text-gray-500",
    };
    return colors[status] || colors.draft;
  };

  const calculateSubtotal = () => {
    return formData.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
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
          <h1 className="text-2xl font-bold text-white">Invoices</h1>
          <p className="text-sm text-gray-400">Manage and track all your invoices</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="flex items-center gap-2 rounded-lg bg-brand-gold px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Invoice
        </button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-xl bg-[#2b2b2b] p-4 ring-1 ring-white/5">
            <p className="text-xs text-gray-500">Total Invoices</p>
            <p className="text-2xl font-bold text-white">{stats.totalInvoices}</p>
          </div>
          <div className="rounded-xl bg-[#2b2b2b] p-4 ring-1 ring-white/5">
            <p className="text-xs text-gray-500">Collected</p>
            <p className="text-2xl font-bold text-brand-gold">{formatCurrency(stats.totalCollected)}</p>
          </div>
          <div className="rounded-xl bg-[#2b2b2b] p-4 ring-1 ring-white/5">
            <p className="text-xs text-gray-500">Outstanding</p>
            <p className="text-2xl font-bold text-amber-400">{formatCurrency(stats.totalOutstanding)}</p>
          </div>
          <div className="rounded-xl bg-[#2b2b2b] p-4 ring-1 ring-white/5">
            <p className="text-xs text-gray-500">Overdue</p>
            <p className="text-2xl font-bold text-red-400">{stats.byStatus?.overdue || 0}</p>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto">
        {["all", "draft", "sent", "paid", "overdue", "cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
              filter === status
                ? "bg-brand-gold text-white"
                : "bg-[#2b2b2b] text-gray-400 hover:bg-brand-gray/10"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Invoices Table */}
      <div className="overflow-hidden rounded-2xl bg-[#2b2b2b] ring-1 ring-white/5">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-6 py-4 text-left text-xs font-medium uppercase text-gray-500">Invoice</th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase text-gray-500">Client</th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase text-gray-500">Amount</th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase text-gray-500">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium uppercase text-gray-500">Due Date</th>
              <th className="px-6 py-4 text-right text-xs font-medium uppercase text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((inv) => (
                <tr key={inv._id} className="hover:bg-brand-gray/5">
                  <td className="px-6 py-4">
                    <span className="font-medium text-white">{inv.invoiceNumber}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-white">{inv.clientName}</p>
                      <p className="text-xs text-gray-500">{inv.clientEmail}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-white">{formatCurrency(inv.total)}</span>
                    {inv.amountPaid > 0 && inv.amountPaid < inv.total && (
                      <p className="text-xs text-brand-gold">Paid: {formatCurrency(inv.amountPaid)}</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(inv.status)}`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {inv.status === "draft" && (
                        <button
                          onClick={() => handleSendInvoice(inv._id)}
                          className="rounded p-1 text-blue-400 hover:bg-blue-500/20"
                          title="Send Invoice"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={() => handleEdit(inv)}
                        className="rounded p-1 text-gray-400 hover:bg-brand-gray/10"
                        title="Edit"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(inv._id)}
                        className="rounded p-1 text-red-400 hover:bg-red-500/20"
                        title="Delete"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                  No invoices found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Invoice Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-[#1e1e1e] p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                {editingInvoice ? "Edit Invoice" : "Create New Invoice"}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Client Info */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Client Name *</label>
                  <input
                    type="text"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-white/10 bg-brand-gray/5 px-4 py-2 text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Client Email *</label>
                  <input
                    type="email"
                    name="clientEmail"
                    value={formData.clientEmail}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-white/10 bg-brand-gray/5 px-4 py-2 text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm text-gray-400">Client Address</label>
                <input
                  type="text"
                  name="clientAddress"
                  value={formData.clientAddress}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-white/10 bg-brand-gray/5 px-4 py-2 text-white focus:border-brand-gold focus:outline-none"
                />
              </div>

              {/* Line Items */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-sm text-gray-400">Items</label>
                  <button
                    type="button"
                    onClick={addItem}
                    className="text-sm text-brand-gold hover:text-brand-gold"
                  >
                    + Add Item
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.items.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Description"
                        value={item.description}
                        onChange={(e) => handleItemChange(index, "description", e.target.value)}
                        className="flex-1 rounded-lg border border-white/10 bg-brand-gray/5 px-4 py-2 text-white focus:border-brand-gold focus:outline-none"
                      />
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                        className="w-20 rounded-lg border border-white/10 bg-brand-gray/5 px-4 py-2 text-white focus:border-brand-gold focus:outline-none"
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        value={item.unitPrice}
                        min="0"
                        step="0.01"
                        onChange={(e) => handleItemChange(index, "unitPrice", e.target.value)}
                        className="w-28 rounded-lg border border-white/10 bg-brand-gray/5 px-4 py-2 text-white focus:border-brand-gold focus:outline-none"
                      />
                      {formData.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index)}
                          className="rounded-lg p-2 text-red-400 hover:bg-red-500/20"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Tax and Discount */}
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Tax Rate (%)</label>
                  <input
                    type="number"
                    name="taxRate"
                    value={formData.taxRate}
                    min="0"
                    max="100"
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-white/10 bg-brand-gray/5 px-4 py-2 text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Discount</label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    min="0"
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-white/10 bg-brand-gray/5 px-4 py-2 text-white focus:border-brand-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-400">Discount Type</label>
                  <select
                    name="discountType"
                    value={formData.discountType}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-white/10 bg-brand-gray/5 px-4 py-2 text-white focus:border-brand-gold focus:outline-none"
                  >
                    <option value="fixed">Fixed ($)</option>
                    <option value="percentage">Percentage (%)</option>
                  </select>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="mb-1 block text-sm text-gray-400">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-white/10 bg-brand-gray/5 px-4 py-2 text-white focus:border-brand-gold focus:outline-none"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="mb-1 block text-sm text-gray-400">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-brand-gray/5 px-4 py-2 text-white focus:border-brand-gold focus:outline-none"
                />
              </div>

              {/* Subtotal Preview */}
              <div className="rounded-lg bg-brand-gray/5 p-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal:</span>
                  <span className="text-white">{formatCurrency(calculateSubtotal())}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3">
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
                  {editingInvoice ? "Update Invoice" : "Create Invoice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
