"use client";

import { useEffect, useState } from "react";

export default function LeadsPage() {
  const [activeTab, setActiveTab] = useState("prospects"); // "contacts" or "prospects"
  const [contacts, setContacts] = useState([]);
  const [prospects, setProspects] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const [contactsRes, prospectsRes, statsRes] = await Promise.all([
          fetch("http://localhost:4000/api/contacts"),
          fetch("http://localhost:4000/api/prospects"),
          fetch("http://localhost:4000/api/prospects/stats")
        ]);

        if (contactsRes.ok) {
          const data = await contactsRes.json();
          setContacts(data);
        }

        if (prospectsRes.ok) {
          const data = await prospectsRes.json();
          setProspects(data.prospects || []);
        }

        if (statsRes.ok) {
          const data = await statsRes.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Select first item when data loads or tab changes
  useEffect(() => {
    const items = activeTab === "contacts" ? contacts : prospects;
    if (items.length > 0 && !selectedItem) {
      setSelectedItem(items[0]);
    }
  }, [contacts, prospects, activeTab]);

  const filteredContacts = contacts.filter((lead) =>
    lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredProspects = prospects.filter((prospect) =>
    prospect.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prospect.domain?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prospect.decisionMakers?.some(dm => 
      dm.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dm.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const currentItems = activeTab === "contacts" ? filteredContacts : filteredProspects;

  const getStatusColor = (status) => {
    switch (status) {
      case "emails_found": return "bg-green-500/20 text-green-400";
      case "domain_found": return "bg-blue-500/20 text-blue-400";
      case "domain_not_found": return "bg-red-500/20 text-red-400";
      case "pending": return "bg-yellow-500/20 text-yellow-400";
      case "completed": return "bg-emerald-500/20 text-emerald-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const getEmailStatusColor = (status) => {
    switch (status) {
      case "valid": return "bg-green-500/20 text-green-400 ring-green-500/30";
      case "risky": return "bg-yellow-500/20 text-yellow-400 ring-yellow-500/30";
      case "invalid": return "bg-red-500/20 text-red-400 ring-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 ring-gray-500/30";
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6 overflow-hidden">
      {/* Left Sidebar - Lead List */}
      <div className="flex w-1/3 flex-col rounded-3xl bg-[#2b2b2b] shadow-lg ring-1 ring-white/5">
        {/* Stats Banner */}
        {stats && activeTab === "prospects" && (
          <div className="border-b border-white/5 bg-gradient-to-r from-brand-gold/10 to-transparent p-3">
            <div className="flex items-center justify-between text-xs">
              <div className="flex gap-4">
                <span className="text-gray-400">
                  <span className="font-semibold text-white">{stats.total}</span> Total
                </span>
                <span className="text-gray-400">
                  <span className="font-semibold text-green-400">{stats.withEmails}</span> With Emails
                </span>
                <span className="text-gray-400">
                  <span className="font-semibold text-blue-400">{stats.withDomain}</span> With Domain
                </span>
              </div>
              <span className="text-gray-500">
                Avg Score: <span className="font-semibold text-brand-gold">{Math.round(stats.averageLeadScore)}</span>
              </span>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-white/5 p-4">
          <div className="mb-4 flex items-center gap-2">
            <button
              onClick={() => { setActiveTab("prospects"); setSelectedItem(null); }}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                activeTab === "prospects"
                  ? "bg-brand-gold text-black"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              Prospects
              <span className="ml-1.5 rounded-full bg-black/20 px-1.5 py-0.5 text-[10px]">
                {prospects.length}
              </span>
            </button>
            <button
              onClick={() => { setActiveTab("contacts"); setSelectedItem(null); }}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
                activeTab === "contacts"
                  ? "bg-brand-gold text-black"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              Contacts
              <span className="ml-1.5 rounded-full bg-black/20 px-1.5 py-0.5 text-[10px]">
                {contacts.length}
              </span>
            </button>
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
              placeholder={activeTab === "prospects" ? "Search companies, domains..." : "Search contacts..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl bg-[#1e1e1e] py-2 pl-10 pr-4 text-sm text-white placeholder-gray-600 outline-none ring-1 ring-white/5 focus:ring-brand-gold/50"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {loading ? (
            <div className="p-4 text-center text-sm text-gray-500">Loading...</div>
          ) : currentItems.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">
              No {activeTab} found
            </div>
          ) : (
            <div className="space-y-2">
              {activeTab === "prospects" ? (
                // Prospects List
                filteredProspects.map((prospect) => (
                  <div
                    key={prospect._id}
                    onClick={() => setSelectedItem(prospect)}
                    className={`cursor-pointer rounded-xl p-3 transition ${
                      selectedItem?._id === prospect._id
                        ? "bg-brand-gold/10 ring-1 ring-brand-gold/50"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-brand-gold/20 to-brand-gold/5 ring-1 ring-white/10">
                        <div className="flex h-full w-full items-center justify-center text-sm font-bold text-brand-gold">
                          {prospect.companyName?.charAt(0) || "?"}
                        </div>
                        {/* Lead Score Badge */}
                        <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#1e1e1e] text-[9px] font-bold text-brand-gold ring-1 ring-brand-gold/30">
                          {prospect.leadScore}
                        </div>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`truncate text-sm font-medium ${
                            selectedItem?._id === prospect._id ? "text-brand-gold" : "text-white"
                          }`}>
                            {prospect.companyName}
                          </h3>
                        </div>
                        <p className="truncate text-xs text-gray-400">
                          {prospect.domain || prospect.location || "No domain"}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1">
                          <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${getStatusColor(prospect.enrichmentStatus)}`}>
                            {prospect.enrichmentStatus?.replace(/_/g, " ")}
                          </span>
                          {prospect.decisionMakers?.length > 0 && (
                            <span className="rounded bg-purple-500/20 px-1.5 py-0.5 text-[10px] font-medium text-purple-400">
                              {prospect.decisionMakers.length} contact{prospect.decisionMakers.length > 1 ? "s" : ""}
                            </span>
                          )}
                          {prospect.companyEmails?.length > 0 && (
                            <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[10px] font-medium text-cyan-400">
                              {prospect.companyEmails.length} email{prospect.companyEmails.length > 1 ? "s" : ""}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // Contacts List
                filteredContacts.map((lead) => (
                  <div
                    key={lead._id}
                    onClick={() => setSelectedItem(lead)}
                    className={`cursor-pointer rounded-xl p-3 transition ${
                      selectedItem?._id === lead._id
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
                            selectedItem?._id === lead._id ? "text-brand-gold" : "text-white"
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
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Details */}
      <div className="flex-1 rounded-3xl bg-[#2b2b2b] shadow-lg ring-1 ring-white/5">
        {selectedItem ? (
          activeTab === "prospects" ? (
            <ProspectDetails prospect={selectedItem} getEmailStatusColor={getEmailStatusColor} getStatusColor={getStatusColor} />
          ) : (
            <ContactDetails contact={selectedItem} />
          )
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            Select a {activeTab === "prospects" ? "prospect" : "contact"} to view details
          </div>
        )}
      </div>
    </div>
  );
}

// Prospect Details Component
function ProspectDetails({ prospect, getEmailStatusColor, getStatusColor }) {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-white/5 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gradient-to-br from-brand-gold/30 to-brand-gold/10 ring-2 ring-white/10">
              <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-brand-gold">
                {prospect.companyName?.charAt(0) || "?"}
              </div>
              {/* Lead Score */}
              <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#1e1e1e] text-xs font-bold text-brand-gold ring-2 ring-brand-gold/50">
                {prospect.leadScore}
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{prospect.companyName}</h1>
              <p className="text-gray-400">{prospect.location || "No location"}</p>
              <div className="mt-2 flex items-center gap-2">
                {prospect.domain && (
                  <a
                    href={prospect.url || `https://${prospect.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300 hover:bg-white/10"
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    {prospect.domain}
                  </a>
                )}
                <span className={`rounded-full px-2 py-0.5 text-xs ${getStatusColor(prospect.enrichmentStatus)}`}>
                  {prospect.enrichmentStatus?.replace(/_/g, " ")}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add to Campaign
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid gap-6">
          {/* Decision Makers Card */}
          <div className="rounded-2xl bg-[#1e1e1e] p-5 ring-1 ring-white/5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase text-gray-500">Decision Makers</h3>
              <span className="rounded-full bg-purple-500/20 px-2 py-0.5 text-xs text-purple-400">
                {prospect.decisionMakers?.length || 0} found
              </span>
            </div>
            {prospect.decisionMakers?.length > 0 ? (
              <div className="space-y-3">
                {prospect.decisionMakers.map((dm, idx) => (
                  <div key={idx} className="flex items-center justify-between rounded-xl bg-white/5 p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-700">
                        <img
                          src={`https://ui-avatars.com/api/?name=${encodeURIComponent(dm.name || "Unknown")}&background=random`}
                          alt={dm.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{dm.name || "Unknown"}</p>
                        <p className="text-xs text-gray-400">{dm.position || dm.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${getEmailStatusColor(dm.emailStatus)}`}>
                        {dm.emailStatus}
                      </span>
                      <a
                        href={`mailto:${dm.email}`}
                        className="rounded-lg bg-brand-gold/20 px-3 py-1.5 text-xs font-medium text-brand-gold hover:bg-brand-gold/30"
                      >
                        {dm.email}
                      </a>
                      {dm.linkedinUrl && (
                        <a
                          href={dm.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-lg bg-blue-500/20 p-1.5 text-blue-400 hover:bg-blue-500/30"
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No decision makers found yet.</p>
            )}
          </div>

          {/* Company Emails Card */}
          {prospect.companyEmails?.length > 0 && (
            <div className="rounded-2xl bg-[#1e1e1e] p-5 ring-1 ring-white/5">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase text-gray-500">Company Emails</h3>
                <span className={`rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${getEmailStatusColor(prospect.companyEmailsStatus)}`}>
                  {prospect.companyEmailsStatus}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {prospect.companyEmails.map((email, idx) => (
                  <a
                    key={idx}
                    href={`mailto:${email}`}
                    className="rounded-lg bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-400 ring-1 ring-cyan-500/20 hover:bg-cyan-500/20"
                  >
                    {email}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Enrichment Info Card */}
          <div className="rounded-2xl bg-[#1e1e1e] p-5 ring-1 ring-white/5">
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-500">Enrichment Details</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs text-gray-500">Source</label>
                <p className="mt-1 text-sm text-white capitalize">{prospect.source || "N/A"}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">External ID</label>
                <p className="mt-1 text-sm text-white">{prospect.externalId || "N/A"}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Last Enriched</label>
                <p className="mt-1 text-sm text-white">
                  {prospect.lastEnrichedAt ? new Date(prospect.lastEnrichedAt).toLocaleString() : "N/A"}
                </p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Created</label>
                <p className="mt-1 text-sm text-white">
                  {prospect.createdAt ? new Date(prospect.createdAt).toLocaleString() : "N/A"}
                </p>
              </div>
            </div>
            {prospect.domainExplanation && (
              <div className="mt-4">
                <label className="text-xs text-gray-500">Domain Detection Notes</label>
                <p className="mt-2 text-sm leading-relaxed text-gray-300">
                  {prospect.domainExplanation}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Contact Details Component (existing functionality)
function ContactDetails({ contact }) {
  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="border-b border-white/5 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-700 ring-2 ring-white/10">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  contact.name
                )}&background=random`}
                alt={contact.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{contact.name}</h1>
              <p className="text-gray-400">{contact.company || "No Company"}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {contact.email}
                </span>
                {contact.phone && (
                  <span className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs text-gray-300">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {contact.phone}
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
                <p className="mt-1 text-sm text-white">{contact.projectType || "N/A"}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Timeline</label>
                <p className="mt-1 text-sm text-white">{contact.timeline || "N/A"}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Budget</label>
                <p className="mt-1 text-sm text-white">{contact.budget || "N/A"}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Budget Approved</label>
                <p className="mt-1 text-sm text-white">{contact.budgetApproved || "N/A"}</p>
              </div>
            </div>
            <div className="mt-6">
              <label className="text-xs text-gray-500">Description</label>
              <p className="mt-2 text-sm leading-relaxed text-gray-300 whitespace-pre-wrap">
                {contact.projectDescription || "No description provided."}
              </p>
            </div>
          </div>

          {/* Additional Info Card */}
          <div className="rounded-2xl bg-[#1e1e1e] p-5 ring-1 ring-white/5">
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-500">Additional Details</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-xs text-gray-500">Automation Interest</label>
                <p className="mt-1 text-sm text-white">{contact.automationInterest || "N/A"}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Decision Maker</label>
                <p className="mt-1 text-sm text-white">{contact.decisionMaker || "N/A"}</p>
              </div>
              <div>
                <label className="text-xs text-gray-500">Status</label>
                <div className="mt-1">
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                    contact.isRejected 
                      ? "bg-red-500/20 text-red-400 ring-red-500/30" 
                      : "bg-blue-500/20 text-blue-400 ring-blue-500/30"
                  }`}>
                    {contact.isRejected ? "Rejected" : contact.status || "New"}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500">Submitted On</label>
                <p className="mt-1 text-sm text-white">
                  {new Date(contact.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
