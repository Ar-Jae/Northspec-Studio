"use client"
import PageHeader from "@/components/PageHeader";
import { useState } from "react";

const CreateInvoicePage = () => {
  const [lineItems, setLineItems] = useState([{ description: "", quantity: 1, price: 0 }]);

  const handleAddItem = () => {
    setLineItems([...lineItems, { description: "", quantity: 1, price: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const list = [...lineItems];
    list.splice(index, 1);
    setLineItems(list);
  };

  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...lineItems];
    list[index][name] = value;
    setLineItems(list);
  };

  const calculateSubtotal = () => {
    return lineItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);
  };

  const calculateTotal = () => {
    const subtotal = parseFloat(calculateSubtotal());
    // Assuming a tax rate of 10% for this example
    const tax = subtotal * 0.10;
    return (subtotal + tax).toFixed(2);
  };

  return (
    <div>
      <PageHeader title="Create Invoice" breadcrumbs={["Finance", "Invoices", "Create"]} />
      <div className="p-6">
        <div className="bg-brand-gray/50 border border-white/5 rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Bill From</h2>
              <div className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" defaultValue="Northspec Studio" />
                <input type="email" placeholder="Your Email" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" defaultValue="contact@northspec.com" />
                <textarea placeholder="Your Address" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" rows="3" defaultValue="123 Innovation Drive, Tech City, 12345"></textarea>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Bill To</h2>
              <div className="space-y-4">
                <input type="text" placeholder="Client's Name" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" />
                <input type="email" placeholder="Client's Email" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" />
                <textarea placeholder="Client's Address" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" rows="3"></textarea>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-400">Invoice Number</label>
              <input type="text" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" />
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-400">Date of Issue</label>
              <input type="date" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-4">Items</h3>
            <div className="space-y-4">
              {lineItems.map((item, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <input
                    type="text"
                    name="description"
                    placeholder="Item Description"
                    className="flex-grow bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold"
                    value={item.description}
                    onChange={(e) => handleItemChange(e, index)}
                  />
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Qty"
                    className="w-20 bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(e, index)}
                  />
                  <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="w-28 bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold"
                    value={item.price}
                    onChange={(e) => handleItemChange(e, index)}
                  />
                  <div className="w-28 text-right text-white">
                    ${(item.quantity * item.price).toFixed(2)}
                  </div>
                  <button onClick={() => handleRemoveItem(index)} className="text-red-500 hover:text-red-400 p-2 rounded-full bg-white/5">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              ))}
            </div>
            <button onClick={handleAddItem} className="mt-4 flex items-center gap-2 text-sm text-brand-gold hover:text-brand-gold/80">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
              Add Item
            </button>
          </div>

          <div className="mt-8 flex justify-end">
            <div className="w-64 space-y-4">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>${calculateSubtotal()}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Tax (10%)</span>
                <span>${(parseFloat(calculateSubtotal()) * 0.10).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white font-bold text-lg border-t border-white/20 pt-2">
                <span>Total</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end gap-4">
            <button className="px-6 py-2.5 rounded-xl text-white bg-white/5 border border-white/10 hover:bg-white/10">
              Save Draft
            </button>
            <button className="px-6 py-2.5 rounded-xl text-black bg-brand-gold font-bold hover:bg-brand-gold/80">
              Create Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateInvoicePage;
