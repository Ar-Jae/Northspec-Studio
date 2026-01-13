"use client";

import { useEffect, useState } from "react";

export default function ProjectRequestPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredRequests = requests.filter((req) =>
    req.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (req.projectType && req.projectType.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col gap-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between rounded-2xl bg-[#2b2b2b] p-4 shadow-lg ring-1 ring-white/5">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-white">Project Requests</h1>
          <span className="rounded-full bg-brand-gray/10 px-2 py-1 text-xs text-gray-400">
            {requests.length}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search requests..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 rounded-lg bg-[#1e1e1e] py-2 pl-10 pr-4 text-sm text-white placeholder-gray-600 outline-none ring-1 ring-white/5 focus:ring-brand-gold/50"
            />
          </div>
          <button className="rounded-lg bg-brand-gray/5 p-2 text-gray-400 hover:bg-brand-gray/10 hover:text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm" onClick={() => setSelectedRequest(null)}>
          <div className="w-full max-w-2xl rounded-2xl bg-[#2b2b2b] p-6 shadow-2xl ring-1 ring-white/10" onClick={e => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Request Details</h2>
              <button onClick={() => setSelectedRequest(null)} className="rounded-full p-1 text-gray-400 hover:bg-brand-gray/10 hover:text-white">
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

      {/* Table */}
      <div className="flex-1 overflow-hidden rounded-2xl bg-[#2b2b2b] shadow-lg ring-1 ring-white/5">
        {loading ? (
          <div className="flex h-full items-center justify-center text-gray-500">Loading requests...</div>
        ) : filteredRequests.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-500">No project requests found.</div>
        ) : (
          <div className="h-full overflow-auto">
            <table className="w-full text-left text-sm text-gray-400">
              <thead className="sticky top-0 bg-[#1e1e1e] text-xs uppercase text-gray-500">
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
                {filteredRequests.map((req) => (
                  <tr key={req._id} className="cursor-pointer transition hover:bg-brand-gray/5" onClick={() => setSelectedRequest(req)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-700">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(req.name)}&background=random`}
                            alt={req.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-medium text-white">{req.name}</span>
                          <p className="text-xs text-gray-500">{req.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white">{req.projectType || "N/A"}</td>
                    <td className="px-6 py-4 text-brand-gold font-medium">{req.budget || "N/A"}</td>
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
    </div>
  );
}