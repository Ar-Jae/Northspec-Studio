"use client";

import { useState, useEffect } from "react";

export default function TargetsPage() {
  const [targets, setTargets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTargets() {
      try {
        const res = await fetch("http://localhost:4000/api/dashboard/targets");
        if (res.ok) {
          const data = await res.json();
          setTargets(data);
        }
      } catch (error) {
        console.error("Failed to fetch targets:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTargets();
  }, []);

  return (
    <div className="flex-1 overflow-auto rounded-tl-3xl bg-brand-gray p-6">
      <h1 className="mb-6 text-2xl font-semibold text-white">Targets</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {targets.map((target) => (
          <div key={target._id} className="rounded-2xl border border-white/5 p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full bg-brand-gold/20 px-3 py-1 text-xs font-medium text-brand-gold">
                {target.category}
              </span>
              <span className="text-xs text-gray-500">
                Due: {new Date(target.deadline).toLocaleDateString()}
              </span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">{target.title}</h3>
            <div className="mb-4">
              <div className="mb-1 flex justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-white">
                  {Math.round((target.current / target.goal) * 100)}%
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-brand-gold"
                  style={{ width: `${(target.current / target.goal) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Current: ${target.current.toLocaleString()}</span>
              <span className="font-medium text-white">Goal: ${target.goal.toLocaleString()}</span>
            </div>
          </div>
        ))}
        {targets.length === 0 && !loading && (
          <p className="text-gray-500">No targets found.</p>
        )}
      </div>
    </div>
  );
}
