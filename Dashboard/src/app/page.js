"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const res = await fetch("http://localhost:4000/api/contacts");
        if (res.ok) {
          const data = await res.json();
          setLeads(data.slice(0, 5)); // Get top 5 recent leads
        }
      } catch (error) {
        console.error("Failed to fetch leads:", error);
      }
    }

    fetchLeads();
  }, []);

  return (
    <>
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">CRM Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Profile Settings</span>
            <span>View Profile</span>
          </div>
          <button className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          <button className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-600 ring-2 ring-white/20">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="h-full w-full object-cover" />
          </div>
        </div>
      </header>

      {/* Revenue Chart */}
      <section className="rounded-3xl bg-[#2b2b2b] p-6 shadow-lg ring-1 ring-white/5">
        <div className="mb-6 flex items-center gap-6">
          <h2 className="text-lg font-semibold text-white">Revenue</h2>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#3b82f6]"></span>
              <span className="text-gray-400">Gross Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#0ea5e9]"></span>
              <span className="text-gray-400">Nett Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#f97316]"></span>
              <span className="text-gray-400">Expenses</span>
            </div>
          </div>
        </div>
        <div className="relative h-64 w-full">
          {/* Simple SVG Line Chart Mockup */}
          <svg viewBox="0 0 800 300" className="h-full w-full overflow-visible">
            {/* Grid Lines */}
            <line x1="0" y1="250" x2="800" y2="250" stroke="#404040" strokeWidth="1" />
            <line x1="0" y1="200" x2="800" y2="200" stroke="#404040" strokeWidth="1" />
            <line x1="0" y1="150" x2="800" y2="150" stroke="#404040" strokeWidth="1" />
            <line x1="0" y1="100" x2="800" y2="100" stroke="#404040" strokeWidth="1" />
            <line x1="0" y1="50" x2="800" y2="50" stroke="#404040" strokeWidth="1" />

            {/* Y Axis Labels */}
            <text x="-10" y="255" fill="#6b7280" fontSize="10" textAnchor="end">0K</text>
            <text x="-10" y="205" fill="#6b7280" fontSize="10" textAnchor="end">50K</text>
            <text x="-10" y="155" fill="#6b7280" fontSize="10" textAnchor="end">100K</text>
            <text x="-10" y="105" fill="#6b7280" fontSize="10" textAnchor="end">150K</text>
            <text x="-10" y="55" fill="#6b7280" fontSize="10" textAnchor="end">200K</text>

            {/* X Axis Labels */}
            <text x="20" y="270" fill="#6b7280" fontSize="10">Jan</text>
            <text x="120" y="270" fill="#6b7280" fontSize="10">Feb</text>
            <text x="220" y="270" fill="#6b7280" fontSize="10">March</text>
            <text x="320" y="270" fill="#6b7280" fontSize="10">April</text>
            <text x="420" y="270" fill="#6b7280" fontSize="10">May</text>
            <text x="520" y="270" fill="#6b7280" fontSize="10">June</text>
            <text x="620" y="270" fill="#6b7280" fontSize="10">July</text>
            <text x="720" y="270" fill="#6b7280" fontSize="10">Aug</text>

            {/* Lines */}
            <path
              d="M20,200 C100,180 200,120 300,130 S500,110 620,100 S750,80 780,70"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <path
              d="M20,220 C100,200 200,150 300,160 S500,140 620,130 S750,110 780,100"
              fill="none"
              stroke="#0ea5e9"
              strokeWidth="2"
            />
            <path
              d="M20,230 C100,220 200,180 300,190 S500,210 620,200 S750,180 780,170"
              fill="none"
              stroke="#f97316"
              strokeWidth="2"
            />

            {/* Tooltip Mockup */}
            <circle cx="620" cy="100" r="4" fill="#3b82f6" stroke="white" strokeWidth="2" />
            <circle cx="620" cy="130" r="4" fill="#0ea5e9" stroke="white" strokeWidth="2" />
            <circle cx="620" cy="200" r="4" fill="#f97316" stroke="white" strokeWidth="2" />
            <line x1="620" y1="50" x2="620" y2="250" stroke="#ffffff" strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
          </svg>

          {/* Floating Tooltip Card */}
          <div className="absolute right-20 top-10 rounded-xl bg-white/10 p-4 text-sm backdrop-blur-md ring-1 ring-white/20">
            <div className="mb-2 flex items-center justify-between border-b border-white/10 pb-2">
              <span className="font-semibold text-white">March 2025</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#3b82f6]"></span>
                  <span className="text-gray-300">Gross Revenue</span>
                </div>
                <span className="font-mono text-white">₹146,000</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#0ea5e9]"></span>
                  <span className="text-gray-300">Nett Revenue</span>
                </div>
                <span className="font-mono text-white">₹115,893</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#f97316]"></span>
                  <span className="text-gray-300">Expenses</span>
                </div>
                <span className="font-mono text-white">₹40,198</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent Leads */}
        <section className="rounded-3xl bg-[#2b2b2b] p-6 shadow-lg ring-1 ring-white/5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-white">Recent Leads</h3>
            <button className="rounded-lg bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20">Add +</button>
          </div>
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-[#1e1e1e] px-3 py-2 ring-1 ring-white/5">
            <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search" className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600" />
          </div>
          <div className="space-y-3">
            {leads.length === 0 ? (
              <div className="text-center text-sm text-gray-500 py-4">No recent leads found</div>
            ) : (
              leads.map((lead, i) => (
                <div key={lead._id || i} className="rounded-xl bg-[#1e1e1e] p-3 ring-1 ring-white/5">
                  <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                    <button className="text-gray-400 hover:text-white">•••</button>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-700 ring-1 ring-white/10">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(lead.name)}&background=random`} 
                        alt={lead.name} 
                        className="h-full w-full object-cover" 
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{lead.name}</p>
                      <p className="text-xs text-gray-500">{lead.company || lead.projectType || "New Lead"}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
            <Link href="/leads" className="block w-full text-center text-xs text-gray-500 hover:text-white mt-2">View All</Link>
          </div>
        </section>

        {/* Lead Source */}
        <section className="rounded-3xl bg-[#2b2b2b] p-6 shadow-lg ring-1 ring-white/5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-white">Lead Source</h3>
            <button className="text-gray-400 hover:text-white">•••</button>
          </div>
          <div className="flex items-center gap-4">
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xl font-bold text-white">60%</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="h-2 w-2 rounded-full bg-[#3b82f6]"></span> Linkedin
                </div>
              </div>
              <div>
                <p className="text-xl font-bold text-white">24%</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="h-2 w-2 rounded-full bg-[#f97316]"></span> Campaigns
                </div>
              </div>
              <div>
                <p className="text-xl font-bold text-white">10%</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="h-2 w-2 rounded-full bg-[#0ea5e9]"></span> Websites
                </div>
              </div>
              <div>
                <p className="text-xl font-bold text-white">6%</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="h-2 w-2 rounded-full bg-gray-500"></span> Miscellaneous
                </div>
              </div>
            </div>
            <div className="relative h-32 w-32 flex-1">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="20" strokeDasharray="150 251" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f97316" strokeWidth="20" strokeDasharray="60 251" strokeDashoffset="-150" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#0ea5e9" strokeWidth="20" strokeDasharray="25 251" strokeDashoffset="-210" />
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#6b7280" strokeWidth="20" strokeDasharray="16 251" strokeDashoffset="-235" />
              </svg>
            </div>
          </div>
        </section>

        {/* Schedule */}
        <section className="rounded-3xl bg-[#2b2b2b] p-6 shadow-lg ring-1 ring-white/5">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-white">Schedule</h3>
            <button className="rounded-lg bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20">Add +</button>
          </div>
          <div className="mb-4 flex items-center justify-between text-sm text-white">
            <button className="text-gray-400 hover:text-white">‹</button>
            <span className="font-medium">March 2025</span>
            <button className="text-gray-400 hover:text-white">›</button>
          </div>
          <div className="mb-4 grid grid-cols-7 text-center text-xs text-gray-500">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            <span className="py-2 text-white">10</span>
            <span className="py-2 text-white">11</span>
            <span className="py-2 text-white">12</span>
            <span className="rounded-lg bg-[#3b82f6] py-2 text-white">13</span>
            <span className="py-2 text-white">14</span>
            <span className="py-2 text-white">15</span>
            <span className="py-2 text-white">16</span>
          </div>
          <div className="rounded-xl bg-[#1e1e1e] p-3 ring-1 ring-white/5">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-[#3b82f6]">Meeting with Rahul Saldana</span>
              <span className="text-gray-400">🔔</span>
            </div>
            <p className="text-xs text-gray-400">Product Demo</p>
            <p className="text-xs text-gray-400">4:00 PM - 5:00 PM (IST)</p>
            <div className="mt-2 flex items-center gap-1 text-xs text-[#3b82f6] underline">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Join with Google Meet
            </div>
          </div>
          <button className="mt-2 w-full text-center text-xs text-gray-500 hover:text-white">View All</button>
        </section>
      </div>

      {/* To Do */}
      <section className="rounded-3xl bg-[#2b2b2b] p-6 shadow-lg ring-1 ring-white/5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-white">To Do</h3>
          <button className="rounded-lg bg-white/10 px-3 py-1 text-xs text-white hover:bg-white/20">Add +</button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { title: "Internal Sales Meeting with team", time: "4:00 PM - 5:00 PM (IST)" },
            { title: "Follow up with Frederick Kunath", time: "4:00 PM - 5:00 PM (IST)" },
            { title: "Meeting with Rahul Saldana", time: "4:00 PM - 5:00 PM (IST)" },
          ].map((todo, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl bg-[#1e1e1e] p-4 ring-1 ring-white/5">
              <div>
                <p className="text-sm font-semibold text-white">{todo.title}</p>
                <p className="text-xs text-gray-500">{todo.time}</p>
              </div>
              <span className="text-gray-400">🔔</span>
            </div>
          ))}
          <button className="flex items-center justify-center rounded-xl bg-[#1e1e1e] p-4 text-gray-400 ring-1 ring-white/5 hover:bg-white/5 hover:text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>
    </>
  );
}
