"use client";

import { useEffect, useState } from "react";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch("http://localhost:4000/api/contacts");
        if (res.ok) {
          const data = await res.json();
          setLeads(data);
          // Select the first lead by default if available
          if (data.length > 0) {
            setSelectedLead(data[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch leads:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, []);

  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6 overflow-hidden">
      {/* Left Sidebar - Lead List */}
      <div className="flex w-1/3 flex-col rounded-3xl bg-[#2b2b2b] shadow-lg ring-1 ring-white/5">
        <div className="border-b border-white/5 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">All Contacts</h2>
            <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-gray-400">
              {leads.length}
            </span>
          </div>
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search Contacts"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl bg-[#1e1e1e] py-2 pl-10 pr-4 text-sm text-white placeholder-gray-600 outline-none ring-1 ring-white/5 focus:ring-brand-gold/50"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {loading ? (
            <div className="p-4 text-center text-sm text-gray-500">Loading...</div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">No contacts found</div>
          ) : (
            <div className="space-y-2">
              {filteredLeads.map((lead) => (
                <div
                  key={lead._id}
                  onClick={() => setSelectedLead(lead)}
                  className={`cursor-pointer rounded-xl p-3 transition ${
                    selectedLead?._id === lead._id
                      ? "bg-brand-gold/10 ring-1 ring-brand-gold/50"
                      : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-700">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                          lead.name
                        )}&background=random`}
                        alt={lead.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className={`truncate text-sm font-medium ${
                          selectedLead?._id === lead._id ? "text-brand-gold" : "text-white"
                        }`}>
                          {lead.name}
                        </h3>
                        <span className="text-[10px] text-gray-500">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="truncate text-xs text-gray-400">
                        {lead.company || lead.projectType}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {lead.status === "New" && (
                          <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-[10px] font-medium text-blue-400">
                            New
                          </span>
                        )}
                        {lead.isRejected && (
                          <span className="rounded bg-red-500/20 px-1.5 py-0.5 text-[10px] font-medium text-red-400">
                            Rejected
                          </span>
                        )}
                        {lead.budgetApproved === "Yes" && (
                          <span className="rounded bg-green-500/20 px-1.5 py-0.5 text-[10px] font-medium text-green-400">
                            Pre-Approved
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Lead Details */}
      <div className="flex-1 rounded-3xl bg-[#2b2b2b] shadow-lg ring-1 ring-white/5">
        {selectedLead ? (
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="border-b border-white/5 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-700 ring-2 ring-white/10">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        selectedLead.name
                      )}&background=random`}
                      alt={selectedLead.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">{selectedLead.name}</h1>
                    <p className="text-gray-400">{selectedLead.company || "No Company"}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300">
                        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {selectedLead.email}
                      </span>
                      {selectedLead.phone && (
                        <span className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300">
                          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {selectedLead.phone}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </button>
                  <button className="flex items-center gap-2 rounded-lg bg-brand-gold px-4 py-2 text-sm font-medium text-black hover:bg-brand-gold/90">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Call
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid gap-6">
                {/* Project Info Card */}
                <div className="rounded-2xl bg-[#1e1e1e] p-5 ring-1 ring-white/5">
                  <h3 className="mb-4 text-sm font-semibold uppercase text-gray-500">Project Information</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs text-gray-500">Project Type</label>
                      <p className="mt-1 text-sm text-white">{selectedLead.projectType || "N/A"}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Timeline</label>
                      <p className="mt-1 text-sm text-white">{selectedLead.timeline || "N/A"}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Budget</label>
                      <p className="mt-1 text-sm text-white">{selectedLead.budget || "N/A"}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Budget Approved</label>
                      <p className="mt-1 text-sm text-white">{selectedLead.budgetApproved || "N/A"}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="text-xs text-gray-500">Description</label>
                    <p className="mt-2 text-sm leading-relaxed text-gray-300 whitespace-pre-wrap">
                      {selectedLead.projectDescription || "No description provided."}
                    </p>
                  </div>
                </div>

                {/* Additional Info Card */}
                <div className="rounded-2xl bg-[#1e1e1e] p-5 ring-1 ring-white/5">
                  <h3 className="mb-4 text-sm font-semibold uppercase text-gray-500">Additional Details</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs text-gray-500">Automation Interest</label>
                      <p className="mt-1 text-sm text-white">{selectedLead.automationInterest || "N/A"}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Decision Maker</label>
                      <p className="mt-1 text-sm text-white">{selectedLead.decisionMaker || "N/A"}</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Status</label>
                      <div className="mt-1">
                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                          selectedLead.isRejected 
                            ? "bg-red-500/20 text-red-400 ring-red-500/30" 
                            : "bg-blue-500/20 text-blue-400 ring-blue-500/30"
                        }`}>
                          {selectedLead.isRejected ? "Rejected" : selectedLead.status || "New"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Submitted On</label>
                      <p className="mt-1 text-sm text-white">
                        {new Date(selectedLead.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            Select a contact to view details
          </div>
        )}
      </div>
    </div>
  );
}
