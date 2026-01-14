"use client";

import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Dashboard() {
  const pathname = usePathname();
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
      <PageHeader 
        breadcrumbs={["Overview"]} 
        actions={[
          { label: "New Project", primary: true, icon: (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          )} 
        ]}
      />

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-6">
        {/* Secondary Nav */}
        <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex gap-6">
            {tabs.map((tab) => {
              const href = tab === "Overview" ? "/" : `/${tab.toLowerCase()}`;
              const isActive = pathname === href;
              return (
                <Link
                  href={href}
                  key={tab}
                  className={`pb-2 text-sm font-medium transition ${
                    isActive
                      ? "border-b-2 border-gray-900 text-white"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {tab}
                </Link>
              );
            })}
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
