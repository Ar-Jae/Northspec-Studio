"use client";

import { useState, useEffect } from "react";

const API_URL = "http://localhost:4000/api";

const placeholders = [
  { key: "{name}", description: "Contact's first name" },
  { key: "{company}", description: "Company name" },
  { key: "{email}", description: "Contact's email" },
  { key: "{website}", description: "Company website" },
  { key: "{industry}", description: "Company industry" },
];

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showSequenceModal, setShowSequenceModal] = useState(false);
  const [editingSequence, setEditingSequence] = useState(null);
  const [activeTab, setActiveTab] = useState("sequences"); // sequences, recipients, analytics
  const [analytics, setAnalytics] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // New campaign form
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    senderName: "",
    senderEmail: "",
  });

  // Sequence form
  const [sequenceForm, setSequenceForm] = useState({
    dayOffset: 0,
    subject: "",
    message: "",
  });

  // Fetch campaigns on mount
  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Fetch analytics when campaign is selected and analytics tab is active
  useEffect(() => {
    if (selectedCampaign && activeTab === "analytics") {
      fetchAnalytics(selectedCampaign._id);
    }
  }, [selectedCampaign, activeTab]);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/campaigns`);
      if (res.ok) {
        const data = await res.json();
        setCampaigns(data);
      }
    } catch (error) {
      console.error("Failed to fetch campaigns:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async (campaignId) => {
    try {
      const res = await fetch(`${API_URL}/campaigns/${campaignId}/analytics`);
      if (res.ok) {
        const data = await res.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
    }
  };

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400";
      case "paused":
        return "bg-yellow-500/20 text-yellow-400";
      case "draft":
        return "bg-gray-500/20 text-gray-400";
      case "completed":
        return "bg-blue-500/20 text-blue-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const handleCreateCampaign = async () => {
    if (!newCampaign.name || !newCampaign.senderEmail) return;

    try {
      setActionLoading(true);
      const res = await fetch(`${API_URL}/campaigns`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCampaign),
      });

      if (res.ok) {
        const campaign = await res.json();
        setCampaigns([campaign, ...campaigns]);
        setSelectedCampaign(campaign);
        setShowCreateModal(false);
        setNewCampaign({ name: "", senderName: "", senderEmail: "" });
      }
    } catch (error) {
      console.error("Failed to create campaign:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddSequence = async () => {
    if (!selectedCampaign || !sequenceForm.subject || !sequenceForm.message) return;

    try {
      setActionLoading(true);
      const res = await fetch(`${API_URL}/campaigns/${selectedCampaign._id}/sequences`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sequenceForm),
      });

      if (res.ok) {
        const updatedCampaign = await res.json();
        setCampaigns(campaigns.map(c => c._id === updatedCampaign._id ? updatedCampaign : c));
        setSelectedCampaign(updatedCampaign);
        setShowSequenceModal(false);
        setSequenceForm({ dayOffset: 0, subject: "", message: "" });
      }
    } catch (error) {
      console.error("Failed to add sequence:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateSequence = async () => {
    if (!selectedCampaign || !editingSequence) return;

    try {
      setActionLoading(true);
      const res = await fetch(
        `${API_URL}/campaigns/${selectedCampaign._id}/sequences/${editingSequence._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sequenceForm),
        }
      );

      if (res.ok) {
        const updatedCampaign = await res.json();
        setCampaigns(campaigns.map(c => c._id === updatedCampaign._id ? updatedCampaign : c));
        setSelectedCampaign(updatedCampaign);
        setShowSequenceModal(false);
        setEditingSequence(null);
        setSequenceForm({ dayOffset: 0, subject: "", message: "" });
      }
    } catch (error) {
      console.error("Failed to update sequence:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteSequence = async (sequenceId) => {
    try {
      const res = await fetch(
        `${API_URL}/campaigns/${selectedCampaign._id}/sequences/${sequenceId}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        const updatedCampaign = await res.json();
        setCampaigns(campaigns.map(c => c._id === updatedCampaign._id ? updatedCampaign : c));
        setSelectedCampaign(updatedCampaign);
      }
    } catch (error) {
      console.error("Failed to delete sequence:", error);
    }
  };

  const toggleCampaignStatus = async (campaignId) => {
    const campaign = campaigns.find(c => c._id === campaignId);
    const endpoint = campaign.status === "active" ? "pause" : "activate";

    try {
      setActionLoading(true);
      const res = await fetch(`${API_URL}/campaigns/${campaignId}/${endpoint}`, {
        method: "POST",
      });

      if (res.ok) {
        const result = await res.json();
        const updatedCampaign = result.campaign;
        setCampaigns(campaigns.map(c => c._id === updatedCampaign._id ? updatedCampaign : c));
        if (selectedCampaign?._id === campaignId) {
          setSelectedCampaign(updatedCampaign);
        }
      }
    } catch (error) {
      console.error("Failed to toggle campaign status:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleImportContacts = async () => {
    if (!selectedCampaign) return;

    try {
      setActionLoading(true);
      const res = await fetch(`${API_URL}/campaigns/${selectedCampaign._id}/import-contacts`, {
        method: "POST",
      });

      if (res.ok) {
        const result = await res.json();
        const updatedCampaign = result.campaign;
        setCampaigns(campaigns.map(c => c._id === updatedCampaign._id ? updatedCampaign : c));
        setSelectedCampaign(updatedCampaign);
        alert(`Imported ${result.message}`);
      }
    } catch (error) {
      console.error("Failed to import contacts:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const openEditSequence = (sequence) => {
    setEditingSequence(sequence);
    setSequenceForm({
      dayOffset: sequence.dayOffset,
      subject: sequence.subject,
      message: sequence.message,
    });
    setShowSequenceModal(true);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6 overflow-hidden">
      {/* Left Sidebar - Campaign List */}
      <div className="flex w-1/3 flex-col rounded-3xl bg-[#2b2b2b] shadow-lg ring-1 ring-white/5">
        <div className="border-b border-white/5 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Email Campaigns</h2>
            <button
              onClick={() => setShowCreateModal(true)}
              className="rounded-lg bg-brand-gold px-3 py-1.5 text-xs font-medium text-black transition hover:bg-yellow-500"
            >
              + New
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
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl bg-[#1e1e1e] py-2 pl-10 pr-4 text-sm text-white placeholder-gray-600 outline-none ring-1 ring-white/5 focus:ring-brand-gold/50"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {loading ? (
            <div className="p-4 text-center text-sm text-gray-500">Loading...</div>
          ) : filteredCampaigns.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">No campaigns found</div>
          ) : (
            <div className="space-y-2">
              {filteredCampaigns.map((campaign) => (
                <div
                  key={campaign._id}
                  onClick={() => setSelectedCampaign(campaign)}
                  className={`cursor-pointer rounded-xl p-4 transition ${
                    selectedCampaign?._id === campaign._id
                      ? "bg-brand-gold/10 ring-1 ring-brand-gold/50"
                      : "hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-white">{campaign.name}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs capitalize ${getStatusColor(
                            campaign.status
                          )}`}
                        >
                          {campaign.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {campaign.sequences?.length || 0} emails
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                    <div>
                      <div className="text-sm font-medium text-white">{campaign.stats?.totalRecipients || 0}</div>
                      <div className="text-xs text-gray-500">Recipients</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-blue-400">{campaign.stats?.totalSent || 0}</div>
                      <div className="text-xs text-gray-500">Sent</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-green-400">{campaign.stats?.totalOpened || 0}</div>
                      <div className="text-xs text-gray-500">Opened</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-brand-gold">{campaign.stats?.totalReplied || 0}</div>
                      <div className="text-xs text-gray-500">Replied</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Campaign Details */}
      <div className="flex flex-1 flex-col rounded-3xl bg-[#2b2b2b] shadow-lg ring-1 ring-white/5">
        {selectedCampaign ? (
          <>
            {/* Campaign Header */}
            <div className="flex items-center justify-between border-b border-white/5 p-6">
              <div>
                <h1 className="text-xl font-bold text-white">{selectedCampaign.name}</h1>
                <p className="mt-1 text-sm text-gray-400">
                  Created on {new Date(selectedCampaign.createdAt).toLocaleDateString()} • {selectedCampaign.sequences?.length || 0} email
                  {(selectedCampaign.sequences?.length || 0) !== 1 ? "s" : ""} in sequence
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleCampaignStatus(selectedCampaign._id)}
                  disabled={actionLoading}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition disabled:opacity-50 ${
                    selectedCampaign.status === "active"
                      ? "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30"
                      : "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                  }`}
                >
                  {selectedCampaign.status === "active" ? "Pause" : "Activate"}
                </button>
                <button className="rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 transition hover:bg-white/10">
                  Settings
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 border-b border-white/5 px-6">
              <button
                onClick={() => setActiveTab("sequences")}
                className={`px-4 py-3 text-sm font-medium transition ${
                  activeTab === "sequences"
                    ? "border-b-2 border-brand-gold text-brand-gold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Email Sequence
              </button>
              <button
                onClick={() => setActiveTab("recipients")}
                className={`px-4 py-3 text-sm font-medium transition ${
                  activeTab === "recipients"
                    ? "border-b-2 border-brand-gold text-brand-gold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Recipients
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`px-4 py-3 text-sm font-medium transition ${
                  activeTab === "analytics"
                    ? "border-b-2 border-brand-gold text-brand-gold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Analytics
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === "sequences" && (
                <div className="space-y-4">
                  {/* Add Sequence Button */}
                  <button
                    onClick={() => {
                      setEditingSequence(null);
                      setSequenceForm({ dayOffset: 0, subject: "", message: "" });
                      setShowSequenceModal(true);
                    }}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-white/10 py-4 text-sm text-gray-400 transition hover:border-brand-gold/50 hover:text-brand-gold"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Add Email to Sequence
                  </button>

                  {/* Sequence Timeline */}
                  {(selectedCampaign.sequences || []).map((sequence, index) => (
                    <div key={sequence._id} className="relative">
                      {/* Timeline connector */}
                      {index < selectedCampaign.sequences.length - 1 && (
                        <div className="absolute left-6 top-16 h-[calc(100%-2rem)] w-0.5 bg-white/10" />
                      )}

                      <div className="flex gap-4">
                        {/* Day indicator */}
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-gold/20 text-brand-gold">
                          <div className="text-center">
                            <div className="text-xs">Day</div>
                            <div className="text-sm font-bold">{sequence.dayOffset}</div>
                          </div>
                        </div>

                        {/* Email Card */}
                        <div className="flex-1 rounded-xl bg-[#1e1e1e] p-4 ring-1 ring-white/5">
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="rounded bg-blue-500/20 px-2 py-0.5 text-xs text-blue-400">
                                  Email {index + 1}
                                </span>
                                {index === 0 && (
                                  <span className="rounded bg-green-500/20 px-2 py-0.5 text-xs text-green-400">
                                    Initial
                                  </span>
                                )}
                                {index > 0 && (
                                  <span className="text-xs text-gray-500">
                                    {sequence.dayOffset - (selectedCampaign.sequences[index - 1]?.dayOffset || 0)} days after previous
                                  </span>
                                )}
                              </div>
                              <h4 className="mt-2 font-medium text-white">{sequence.subject}</h4>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => openEditSequence(sequence)}
                                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
                              >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleDeleteSequence(sequence._id)}
                                className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
                              >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                          <p className="mt-3 whitespace-pre-wrap text-sm text-gray-400">
                            {sequence.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {(selectedCampaign.sequences || []).length === 0 && (
                    <div className="rounded-xl bg-[#1e1e1e] p-8 text-center ring-1 ring-white/5">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <h3 className="mt-4 font-medium text-white">No emails in sequence</h3>
                      <p className="mt-2 text-sm text-gray-500">
                        Add your first email to start building your outreach sequence.
                      </p>
                    </div>
                  )}

                  {/* Placeholders Reference */}
                  <div className="mt-6 rounded-xl bg-[#1e1e1e] p-4 ring-1 ring-white/5">
                    <h4 className="mb-3 text-sm font-medium text-white">Available Placeholders</h4>
                    <div className="flex flex-wrap gap-2">
                      {placeholders.map((p) => (
                        <div
                          key={p.key}
                          className="group relative rounded-lg bg-white/5 px-3 py-1.5 text-sm text-brand-gold"
                        >
                          {p.key}
                          <div className="absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 rounded-lg bg-black px-3 py-1.5 text-xs text-white shadow-lg group-hover:block">
                            {p.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "recipients" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-white">
                      Campaign Recipients ({selectedCampaign.recipients?.length || 0})
                    </h3>
                    <button 
                      onClick={handleImportContacts}
                      disabled={actionLoading}
                      className="rounded-lg bg-brand-gold px-4 py-2 text-sm font-medium text-black transition hover:bg-yellow-500 disabled:opacity-50"
                    >
                      {actionLoading ? "Importing..." : "Import from Contacts"}
                    </button>
                  </div>
                  
                  {(selectedCampaign.recipients?.length || 0) > 0 ? (
                    <div className="rounded-xl bg-[#1e1e1e] ring-1 ring-white/5 overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-white/5">
                          <tr className="text-left text-xs text-gray-400">
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Company</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Progress</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {selectedCampaign.recipients.slice(0, 50).map((recipient) => (
                            <tr key={recipient._id} className="text-sm">
                              <td className="px-4 py-3 text-white">{recipient.name || '-'}</td>
                              <td className="px-4 py-3 text-gray-400">{recipient.email}</td>
                              <td className="px-4 py-3 text-gray-400">{recipient.company || '-'}</td>
                              <td className="px-4 py-3">
                                <span className={`rounded-full px-2 py-0.5 text-xs capitalize ${
                                  recipient.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                  recipient.status === 'active' ? 'bg-blue-500/20 text-blue-400' :
                                  recipient.status === 'replied' ? 'bg-brand-gold/20 text-brand-gold' :
                                  'bg-gray-500/20 text-gray-400'
                                }`}>
                                  {recipient.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-gray-400">
                                {recipient.currentSequenceIndex + 1}/{selectedCampaign.sequences?.length || 1}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {selectedCampaign.recipients.length > 50 && (
                        <div className="px-4 py-3 text-center text-sm text-gray-500">
                          Showing first 50 of {selectedCampaign.recipients.length} recipients
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-xl bg-[#1e1e1e] p-8 text-center ring-1 ring-white/5">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      <h3 className="mt-4 font-medium text-white">No recipients added</h3>
                      <p className="mt-2 text-sm text-gray-500">
                        Import contacts from your contacts list or add them manually.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "analytics" && (
                <div className="space-y-6">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="rounded-xl bg-[#1e1e1e] p-4 ring-1 ring-white/5">
                      <div className="text-2xl font-bold text-white">{selectedCampaign.stats?.totalRecipients || 0}</div>
                      <div className="mt-1 text-sm text-gray-400">Total Recipients</div>
                    </div>
                    <div className="rounded-xl bg-[#1e1e1e] p-4 ring-1 ring-white/5">
                      <div className="text-2xl font-bold text-blue-400">{selectedCampaign.stats?.totalSent || 0}</div>
                      <div className="mt-1 text-sm text-gray-400">Emails Sent</div>
                      <div className="mt-2 text-xs text-gray-500">
                        {(selectedCampaign.stats?.totalRecipients || 0) > 0
                          ? (((selectedCampaign.stats?.totalSent || 0) / selectedCampaign.stats.totalRecipients) * 100).toFixed(1)
                          : 0}
                        % of recipients
                      </div>
                    </div>
                    <div className="rounded-xl bg-[#1e1e1e] p-4 ring-1 ring-white/5">
                      <div className="text-2xl font-bold text-green-400">{selectedCampaign.stats?.totalOpened || 0}</div>
                      <div className="mt-1 text-sm text-gray-400">Opened</div>
                      <div className="mt-2 text-xs text-gray-500">
                        {(selectedCampaign.stats?.totalSent || 0) > 0
                          ? (((selectedCampaign.stats?.totalOpened || 0) / selectedCampaign.stats.totalSent) * 100).toFixed(1)
                          : 0}
                        % open rate
                      </div>
                    </div>
                    <div className="rounded-xl bg-[#1e1e1e] p-4 ring-1 ring-white/5">
                      <div className="text-2xl font-bold text-brand-gold">{selectedCampaign.stats?.totalReplied || 0}</div>
                      <div className="mt-1 text-sm text-gray-400">Replied</div>
                      <div className="mt-2 text-xs text-gray-500">
                        {(selectedCampaign.stats?.totalSent || 0) > 0
                          ? (((selectedCampaign.stats?.totalReplied || 0) / selectedCampaign.stats.totalSent) * 100).toFixed(1)
                          : 0}
                        % reply rate
                      </div>
                    </div>
                  </div>

                  {/* Conversion Funnel */}
                  <div className="rounded-xl bg-[#1e1e1e] p-6 ring-1 ring-white/5">
                    <h3 className="mb-4 font-medium text-white">Conversion Funnel</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="mb-1 flex justify-between text-sm">
                          <span className="text-gray-400">Recipients</span>
                          <span className="text-white">{selectedCampaign.stats?.totalRecipients || 0}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/5">
                          <div className="h-full w-full bg-white/20" />
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between text-sm">
                          <span className="text-gray-400">Sent</span>
                          <span className="text-blue-400">{selectedCampaign.stats?.totalSent || 0}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/5">
                          <div
                            className="h-full bg-blue-500"
                            style={{
                              width: `${
                                (selectedCampaign.stats?.totalRecipients || 0) > 0
                                  ? ((selectedCampaign.stats?.totalSent || 0) / selectedCampaign.stats.totalRecipients) * 100
                                  : 0
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between text-sm">
                          <span className="text-gray-400">Opened</span>
                          <span className="text-green-400">{selectedCampaign.stats?.totalOpened || 0}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/5">
                          <div
                            className="h-full bg-green-500"
                            style={{
                              width: `${
                                (selectedCampaign.stats?.totalRecipients || 0) > 0
                                  ? ((selectedCampaign.stats?.totalOpened || 0) / selectedCampaign.stats.totalRecipients) * 100
                                  : 0
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="mb-1 flex justify-between text-sm">
                          <span className="text-gray-400">Replied</span>
                          <span className="text-brand-gold">{selectedCampaign.stats?.totalReplied || 0}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/5">
                          <div
                            className="h-full bg-brand-gold"
                            style={{
                              width: `${
                                (selectedCampaign.stats?.totalRecipients || 0) > 0
                                  ? ((selectedCampaign.stats?.totalReplied || 0) / selectedCampaign.stats.totalRecipients) * 100
                                  : 0
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Per-Email Stats */}
                  <div className="rounded-xl bg-[#1e1e1e] p-6 ring-1 ring-white/5">
                    <h3 className="mb-4 font-medium text-white">Email Performance</h3>
                    <div className="space-y-3">
                      {(selectedCampaign.sequences || []).length > 0 ? (
                        selectedCampaign.sequences.map((seq, index) => (
                          <div key={seq._id} className="flex items-center justify-between rounded-lg bg-white/5 p-3">
                            <div className="flex items-center gap-3">
                              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gold/20 text-sm font-medium text-brand-gold">
                                {index + 1}
                              </span>
                              <div>
                                <div className="text-sm text-white">{seq.subject}</div>
                                <div className="text-xs text-gray-500">Day {seq.dayOffset}</div>
                              </div>
                            </div>
                            <div className="flex gap-4 text-sm">
                              <span className="text-blue-400">
                                {seq.stats?.sent || Math.floor((selectedCampaign.stats?.totalSent || 0) / (index + 1))} sent
                              </span>
                              <span className="text-green-400">
                                {seq.stats?.opened || Math.floor((selectedCampaign.stats?.totalOpened || 0) / (index + 1))} opened
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">Add sequences to see performance stats.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <svg
                className="mx-auto h-16 w-16 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-white">No campaign selected</h3>
              <p className="mt-2 text-sm text-gray-500">
                Select a campaign from the list or create a new one.
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="mt-4 rounded-lg bg-brand-gold px-4 py-2 text-sm font-medium text-black transition hover:bg-yellow-500"
              >
                Create Campaign
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-[#2b2b2b] p-6 shadow-xl ring-1 ring-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">Create New Campaign</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm text-gray-400">Campaign Name</label>
                <input
                  type="text"
                  value={newCampaign.name}
                  onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                  placeholder="e.g., Cold Outreach - Q1 2025"
                  className="w-full rounded-xl bg-[#1e1e1e] px-4 py-3 text-white placeholder-gray-600 outline-none ring-1 ring-white/5 focus:ring-brand-gold/50"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-gray-400">Sender Name</label>
                <input
                  type="text"
                  value={newCampaign.senderName}
                  onChange={(e) => setNewCampaign({ ...newCampaign, senderName: e.target.value })}
                  placeholder="e.g., Nathan from Northspec"
                  className="w-full rounded-xl bg-[#1e1e1e] px-4 py-3 text-white placeholder-gray-600 outline-none ring-1 ring-white/5 focus:ring-brand-gold/50"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm text-gray-400">Sender Email *</label>
                <input
                  type="email"
                  value={newCampaign.senderEmail}
                  onChange={(e) => setNewCampaign({ ...newCampaign, senderEmail: e.target.value })}
                  placeholder="e.g., hello@northspec.com"
                  className="w-full rounded-xl bg-[#1e1e1e] px-4 py-3 text-white placeholder-gray-600 outline-none ring-1 ring-white/5 focus:ring-brand-gold/50"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 transition hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCampaign}
                disabled={!newCampaign.name || !newCampaign.senderEmail || actionLoading}
                className="rounded-lg bg-brand-gold px-4 py-2 text-sm font-medium text-black transition hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {actionLoading ? "Creating..." : "Create Campaign"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Sequence Modal */}
      {showSequenceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-[#2b2b2b] p-6 shadow-xl ring-1 ring-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">
                {editingSequence ? "Edit Email" : "Add Email to Sequence"}
              </h2>
              <button
                onClick={() => {
                  setShowSequenceModal(false);
                  setEditingSequence(null);
                }}
                className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex gap-4">
                <div className="w-32">
                  <label className="mb-2 block text-sm text-gray-400">Send on Day</label>
                  <input
                    type="number"
                    min="0"
                    value={sequenceForm.dayOffset}
                    onChange={(e) => setSequenceForm({ ...sequenceForm, dayOffset: parseInt(e.target.value) || 0 })}
                    className="w-full rounded-xl bg-[#1e1e1e] px-4 py-3 text-white outline-none ring-1 ring-white/5 focus:ring-brand-gold/50"
                  />
                </div>
                <div className="flex-1">
                  <label className="mb-2 block text-sm text-gray-400">Subject Line</label>
                  <input
                    type="text"
                    value={sequenceForm.subject}
                    onChange={(e) => setSequenceForm({ ...sequenceForm, subject: e.target.value })}
                    placeholder="e.g., Quick question about {company}"
                    className="w-full rounded-xl bg-[#1e1e1e] px-4 py-3 text-white placeholder-gray-600 outline-none ring-1 ring-white/5 focus:ring-brand-gold/50"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm text-gray-400">Email Message</label>
                <textarea
                  value={sequenceForm.message}
                  onChange={(e) => setSequenceForm({ ...sequenceForm, message: e.target.value })}
                  placeholder="Write your email message here. Use placeholders like {name} and {company}..."
                  rows={8}
                  className="w-full rounded-xl bg-[#1e1e1e] px-4 py-3 text-white placeholder-gray-600 outline-none ring-1 ring-white/5 focus:ring-brand-gold/50"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs text-gray-500">Insert placeholder:</span>
                {placeholders.map((p) => (
                  <button
                    key={p.key}
                    onClick={() =>
                      setSequenceForm({ ...sequenceForm, message: sequenceForm.message + p.key })
                    }
                    className="rounded-lg bg-white/5 px-2 py-1 text-xs text-brand-gold transition hover:bg-white/10"
                  >
                    {p.key}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowSequenceModal(false);
                  setEditingSequence(null);
                }}
                className="rounded-lg bg-white/5 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 transition hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={editingSequence ? handleUpdateSequence : handleAddSequence}
                className="rounded-lg bg-brand-gold px-4 py-2 text-sm font-medium text-black transition hover:bg-yellow-500"
              >
                {editingSequence ? "Update Email" : "Add Email"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
