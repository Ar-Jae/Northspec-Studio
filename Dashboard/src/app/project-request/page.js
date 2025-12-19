"use client";

import { useEffect, useState } from "react";

export default function ProjectRequestPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const res = await fetch("http://localhost:4000/api/contacts");
        if (res.ok) {
          const data = await res.json();
          setRequests(data);
        }
      } catch (error) {
        console.error("Failed to fetch requests:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, []);

  return (
    <>
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Project Requests</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-xl bg-[#1e1e1e] px-3 py-2 ring-1 ring-white/5">
            <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search requests..."
              className="w-64 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
            />
          </div>
          <button className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>
      </header>

      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setSelectedRequest(null)}>
          <div className="w-full max-w-2xl rounded-2xl bg-[#2b2b2b] p-6 shadow-2xl ring-1 ring-white/10" onClick={e => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Request Details</h2>
              <button onClick={() => setSelectedRequest(null)} className="rounded-full p-1 text-gray-400 hover:bg-white/10 hover:text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-6 overflow-y-auto max-h-[70vh] pr-2">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium uppercase text-gray-500">Client Name</label>
                  <p className="mt-1 text-white">{selectedRequest.name}</p>
                </div>
                <div>
                  <label className="text-xs font-medium uppercase text-gray-500">Company</label>
                  <p className="mt-1 text-white">{selectedRequest.company || "N/A"}</p>
                </div>
                <div>
                  <label className="text-xs font-medium uppercase text-gray-500">Email</label>
                  <p className="mt-1 text-white">{selectedRequest.email}</p>
                </div>
                <div>
                  <label className="text-xs font-medium uppercase text-gray-500">Phone</label>
                  <p className="mt-1 text-white">{selectedRequest.phone || "N/A"}</p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-6">
                <h3 className="mb-4 text-sm font-semibold text-brand-gold">Project Details</h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium uppercase text-gray-500">Type</label>
                    <p className="mt-1 text-white">{selectedRequest.projectType}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase text-gray-500">Timeline</label>
                    <p className="mt-1 text-white">{selectedRequest.timeline}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase text-gray-500">Budget</label>
                    <p className="mt-1 text-white">{selectedRequest.budget}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase text-gray-500">Budget Approved</label>
                    <p className="mt-1 text-white">{selectedRequest.budgetApproved || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium uppercase text-gray-500">Description</label>
                <p className="mt-1 whitespace-pre-wrap text-gray-300">{selectedRequest.projectDescription}</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium uppercase text-gray-500">Automation Interest</label>
                  <p className="mt-1 text-white">{selectedRequest.automationInterest || "N/A"}</p>
                </div>
                <div>
                  <label className="text-xs font-medium uppercase text-gray-500">Decision Maker</label>
                  <p className="mt-1 text-white">{selectedRequest.decisionMaker || "N/A"}</p>
                </div>
                <div>
                  <label className="text-xs font-medium uppercase text-gray-500">Status</label>
                  <p className="mt-1">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                      selectedRequest.isRejected 
                        ? "bg-red-500/20 text-red-400 ring-red-500/30" 
                        : "bg-blue-500/20 text-blue-400 ring-blue-500/30"
                    }`}>
                      {selectedRequest.isRejected ? "Rejected" : selectedRequest.status || "New"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="rounded-3xl bg-[#2b2b2b] shadow-lg ring-1 ring-white/5">
        {loading ? (
          <div className="p-8 text-center text-gray-400">Loading requests...</div>
        ) : requests.length === 0 ? (
          <div className="p-8 text-center text-gray-400">No project requests found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="bg-[#1e1e1e] text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Client</th>
                  <th className="px-6 py-4 font-medium">Project Type</th>
                  <th className="px-6 py-4 font-medium">Budget</th>
                  <th className="px-6 py-4 font-medium">Timeline</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {requests.map((req) => (
                  <tr key={req._id} className="hover:bg-white/5 cursor-pointer" onClick={() => setSelectedRequest(req)}>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-white">{req.name}</span>
                        <span className="text-xs text-gray-500">{req.company}</span>
                        <span className="text-xs text-gray-500">{req.email}</span>
                        {req.phone && <span className="text-xs text-gray-500">{req.phone}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">{req.projectType || "N/A"}</td>
                    <td className="px-6 py-4">{req.budget || "N/A"}</td>
                    <td className="px-6 py-4">{req.timeline || "N/A"}</td>
                    <td className="px-6 py-4">{new Date(req.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                        req.isRejected 
                          ? "bg-red-500/20 text-red-400 ring-red-500/30" 
                          : "bg-blue-500/20 text-blue-400 ring-blue-500/30"
                      }`}>
                        {req.isRejected ? "Rejected" : req.status || "New"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}