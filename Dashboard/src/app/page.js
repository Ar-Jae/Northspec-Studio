"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [activities, setActivities] = useState([]);
  const [files, setFiles] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const tabs = ["Overview", "Targets", "Budget", "Users", "Files", "Activity", "Settings"];
  
  const weekDays = [
    { day: "Su", date: 22 },
    { day: "Mo", date: 23, active: true },
    { day: "Tu", date: 24 },
    { day: "We", date: 25 },
    { day: "Th", date: 26 },
    { day: "Fr", date: 27 },
    { day: "Sa", date: 28 },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        const [activitiesRes, filesRes, leadsRes] = await Promise.all([
          fetch("http://localhost:4000/api/dashboard/activities"),
          fetch("http://localhost:4000/api/dashboard/files"),
          fetch("http://localhost:4000/api/dashboard/leads")
        ]);

        if (activitiesRes.ok) {
          const data = await activitiesRes.json();
          setActivities(Array.isArray(data) ? data : (data.activities || []));
        }

        if (filesRes.ok) {
          const data = await filesRes.json();
          setFiles(Array.isArray(data) ? data : (data.files || []));
        }

        if (leadsRes.ok) {
          const data = await leadsRes.json();
          setLeads(Array.isArray(data) ? data : (data.leads || []));
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4 text-sm text-gray-300">
          <button className="hover:text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button className="hover:text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          </button>
          <span className="text-gray-400">Dashboards</span>
          <span className="text-gray-500">/</span>
          <span className="text-white font-medium">Overview</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 rounded-lg bg-brand-gray/10 px-4 py-2 pl-10 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
            />
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button className="text-gray-400 hover:text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <button className="text-gray-400 hover:text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto rounded-tl-3xl bg-brand-gray p-6">
        {/* Secondary Nav */}
        <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm font-medium transition ${
                  activeTab === tab
                    ? "border-b-2 border-gray-900 text-white"
                    : "text-gray-500 hover:text-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-white">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add User
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-white">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Target
            </button>
            <button className="text-gray-400 hover:text-gray-600">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Project Header */}
        <div className="mb-6">
          <h1 className="mb-4 text-2xl font-semibold text-white">UI Redesign</h1>
          <div className="flex items-center gap-8">
            <div>
              <p className="text-xs text-gray-500 mb-1">Status</p>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-gold/20 px-3 py-1 text-sm font-medium text-brand-gold">
                <span className="h-2 w-2 rounded-full bg-brand-gold"></span>
                In Progress 51%
              </span>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Total Tasks</p>
              <p className="text-lg font-semibold text-white">15 / 48</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Due Date</p>
              <p className="text-lg font-semibold text-white">29 Jan, 2025</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Budget Spent</p>
              <p className="text-lg font-semibold text-white">$15,000</p>
            </div>
            <div className="ml-auto flex items-center">
              <div className="flex -space-x-2">
                <img src="https://i.pravatar.cc/150?u=1" className="h-8 w-8 rounded-full border-2 border-white" alt="" />
                <img src="https://i.pravatar.cc/150?u=2" className="h-8 w-8 rounded-full border-2 border-white" alt="" />
              </div>
              <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600">+3</span>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* What's on the road */}
          <div className="rounded-2xl border border-white/5 p-5">
            <h2 className="mb-4 text-lg font-semibold text-white">What&apos;s on the road?</h2>
            
            {/* Week Calendar */}
            <div className="mb-4 flex gap-2">
              {weekDays.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center rounded-xl px-3 py-2 ${
                    item.active ? "bg-brand-gold text-white" : "text-gray-600"
                  }`}
                >
                  <span className="text-xs">{item.day}</span>
                  <span className="text-lg font-semibold">{item.date}</span>
                </div>
              ))}
            </div>

            {/* Activity List */}
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity._id} className="flex items-start gap-3">
                  <span className="text-xl">{activity.icon}</span>
                  <div>
                    <p className="text-sm text-gray-300">{activity.text}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
              {activities.length === 0 && !loading && (
                <p className="text-sm text-gray-400 text-center py-4">No recent activity</p>
              )}
            </div>
          </div>

          {/* Latest Files */}
          <div className="rounded-2xl border border-white/5 p-5">
            <h2 className="mb-4 text-lg font-semibold text-white">Latest Files</h2>
            <div className="space-y-3">
              {files.map((file) => (
                <div key={file._id} className="flex items-center justify-between rounded-lg p-2 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                      <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{file.name}</p>
                      <p className="text-xs text-gray-400">{file.size} / {file.author}</p>
                    </div>
                  </div>
                  <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
              ))}
              {files.length === 0 && !loading && (
                <p className="text-sm text-gray-400 text-center py-4">No files uploaded</p>
              )}
            </div>
            <div className="mt-4 rounded-xl border-2 border-dashed border-white/5 p-4 text-center">
              <p className="text-sm text-gray-400">Drop files here or upload files</p>
              <button className="mt-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-200">
                Upload
              </button>
            </div>
          </div>
        </div>

        {/* Recent Leads */}
        <div className="mt-6 rounded-2xl border border-white/5 p-5">
          <h2 className="mb-4 text-lg font-semibold text-white">Recent Leads</h2>
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-3 font-medium">Lead Name</th>
                <th className="pb-3 font-medium">Property/Project</th>
                <th className="pb-3 font-medium">Value</th>
                <th className="pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {leads.map((item) => (
                <tr key={item._id} className="border-t border-gray-100">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                        {(item.name || "?").charAt(0)}
                      </div>
                      <span className="font-medium text-white">{item.name || "Unknown"}</span>
                    </div>
                  </td>
                  <td className="py-3 text-gray-600">{item.property}</td>
                  <td className="py-3 font-medium text-white">${item.value.toLocaleString()}</td>
                  <td className="py-3">
                    <span className={`font-medium text-${item.stageTone}-500`}>• {item.stage}</span>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && !loading && (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-400">No leads found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
