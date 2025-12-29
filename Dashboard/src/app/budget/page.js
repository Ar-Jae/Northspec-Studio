"use client";

import { useState, useEffect } from "react";

export default function BudgetPage() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBudgets() {
      try {
        const res = await fetch("http://localhost:4000/api/dashboard/budgets");
        if (res.ok) {
          const data = await res.json();
          setBudgets(data);
        }
      } catch (error) {
        console.error("Failed to fetch budgets:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBudgets();
  }, []);

  return (
    <div className="flex-1 overflow-auto rounded-tl-3xl bg-white p-6">
      <h1 className="mb-6 text-2xl font-semibold text-gray-900">Budget Overview</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {budgets.map((budget) => (
          <div key={budget._id} className="rounded-2xl border border-gray-200 p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">{budget.category}</h3>
              <span className="text-xs font-medium text-gray-500 uppercase">{budget.period}</span>
            </div>
            <div className="mb-4">
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-gray-600">Spent</span>
                <span className="font-medium text-gray-900">
                  {Math.round((budget.spent / budget.allocated) * 100)}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full ${
                    (budget.spent / budget.allocated) > 0.9 ? "bg-red-500" : "bg-blue-500"
                  }`}
                  style={{ width: `${Math.min((budget.spent / budget.allocated) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Allocated:</span>
                <span className="font-medium text-gray-900">${budget.allocated.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Spent:</span>
                <span className="font-medium text-gray-900">${budget.spent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-1 mt-1">
                <span className="text-gray-500 font-medium">Remaining:</span>
                <span className="font-bold text-green-600">${(budget.allocated - budget.spent).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
        {budgets.length === 0 && !loading && (
          <p className="text-gray-500">No budget data found.</p>
        )}
      </div>
    </div>
  );
}
