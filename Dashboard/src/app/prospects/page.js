"use client";

import { useState, useEffect } from "react";

export default function ProspectsPage() {
  const [prospects, setProspects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProspect, setSelectedProspect] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All Businesses");

  // Scan for prospects via Backend API
  const scanProspects = async (query, lat = null, lng = null) => {
    if (!query) return;
    setLoading(true);
    try {
      const body = { query };
      if (lat && lng) {
        body.latitude = lat;
        body.longitude = lng;
      }

      const res = await fetch('http://localhost:4000/api/prospects/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      
      if (data.results) {
        setProspects(data.results);
        if (data.results.length > 0) {
          setSelectedProspect(data.results[0]);
        }
      }
      
      if (data.warning) {
        console.warn(data.warning);
      }
    } catch (error) {
      console.error("Scan failed:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Try to get user's location for a local search
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          scanProspects("Local businesses", latitude, longitude);
        },
        (error) => {
          console.warn("Location access denied or error:", error);
          scanProspects("Businesses in Toronto"); // Fallback default
        }
      );
    } else {
      scanProspects("Businesses in Toronto");
    }
  }, []);

  // Filter Logic
  const getFilteredProspects = () => {
    switch (activeFilter) {
      case "All Businesses": return prospects;
      case "No Website": return prospects.filter(p => p.equity === "Unknown Site");
      case "Low Rating (< 3.5)": return prospects.filter(p => p.rating < 3.5);
      case "New in Area": return prospects.filter(p => p.user_ratings_total === 0 || (p.tags && p.tags.includes("New")));
      case "Restaurants": return prospects.filter(p => p.types && (p.types.includes("restaurant") || p.types.includes("food")));
      case "Contractors": return prospects.filter(p => p.types && p.types.some(t => ["contractor", "plumber", "electrician", "roofing_contractor", "painter", "general_contractor"].includes(t)));
      case "Retail Stores": return prospects.filter(p => p.types && (p.types.includes("store") || p.types.includes("clothing_store") || p.types.includes("shopping_mall")));
      case "Google Maps": return prospects.filter(p => p.submissionSource === "Google Places");
      case "Yelp": return prospects.filter(p => p.submissionSource === "Yelp");
      case "Facebook": return prospects.filter(p => p.submissionSource === "Facebook");
      default: return prospects;
    }
  };

  const filteredProspects = getFilteredProspects();

  // Counts
  const counts = {
    "All Businesses": prospects.length,
    "No Website": prospects.filter(p => p.equity === "Unknown Site").length,
    "Low Rating (< 3.5)": prospects.filter(p => p.rating < 3.5).length,
    "New in Area": prospects.filter(p => p.user_ratings_total === 0 || (p.tags && p.tags.includes("New"))).length,
    "Restaurants": prospects.filter(p => p.types && (p.types.includes("restaurant") || p.types.includes("food"))).length,
    "Contractors": prospects.filter(p => p.types && p.types.some(t => ["contractor", "plumber", "electrician", "roofing_contractor", "painter", "general_contractor"].includes(t))).length,
    "Retail Stores": prospects.filter(p => p.types && (p.types.includes("store") || p.types.includes("clothing_store") || p.types.includes("shopping_mall"))).length,
    "Google Maps": prospects.filter(p => p.submissionSource === "Google Places").length,
    "Yelp": prospects.filter(p => p.submissionSource === "Yelp").length,
    "Facebook": prospects.filter(p => p.submissionSource === "Facebook").length,
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-4 overflow-hidden text-sm">
      {/* Left Sidebar - Segments */}
      <div className="hidden w-60 flex-col gap-6 overflow-y-auto rounded-2xl bg-[#2b2b2b] p-4 shadow-lg ring-1 ring-white/5 xl:flex">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase text-gray-500">Segments</h3>
          </div>
          <div className="space-y-1">
            <SidebarItem label="All Businesses" count={counts["All Businesses"]} active={activeFilter === "All Businesses"} onClick={() => setActiveFilter("All Businesses")} />
            <SidebarItem label="No Website" count={counts["No Website"]} active={activeFilter === "No Website"} onClick={() => setActiveFilter("No Website")} />
            <SidebarItem label="Low Rating (< 3.5)" count={counts["Low Rating (< 3.5)"]} active={activeFilter === "Low Rating (< 3.5)"} onClick={() => setActiveFilter("Low Rating (< 3.5)")} />
            <SidebarItem label="New in Area" count={counts["New in Area"]} active={activeFilter === "New in Area"} onClick={() => setActiveFilter("New in Area")} />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase text-gray-500">Saved Lists</h3>
            <span className="text-xs text-gray-500">0</span>
          </div>
          <div className="space-y-1">
            <SidebarItem label="Restaurants" count={counts["Restaurants"]} active={activeFilter === "Restaurants"} onClick={() => setActiveFilter("Restaurants")} />
            <SidebarItem label="Contractors" count={counts["Contractors"]} active={activeFilter === "Contractors"} onClick={() => setActiveFilter("Contractors")} />
            <SidebarItem label="Retail Stores" count={counts["Retail Stores"]} active={activeFilter === "Retail Stores"} onClick={() => setActiveFilter("Retail Stores")} />
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase text-gray-500">Scan Sources</h3>
            <span className="text-xs text-gray-500">0</span>
          </div>
          <div className="space-y-1">
            <SidebarItem label="Google Maps" count={counts["Google Maps"]} active={activeFilter === "Google Maps"} onClick={() => setActiveFilter("Google Maps")} />
            <SidebarItem label="Yelp" count={counts["Yelp"]} active={activeFilter === "Yelp"} onClick={() => setActiveFilter("Yelp")} />
            <SidebarItem label="Facebook" count={counts["Facebook"]} active={activeFilter === "Facebook"} onClick={() => setActiveFilter("Facebook")} />
          </div>
        </div>
      </div>

      {/* Main Content - List */}
      <div className="flex flex-1 flex-col rounded-2xl bg-[#2b2b2b] shadow-lg ring-1 ring-white/5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 p-4">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-white">Local Business Scanner</h2>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-xs font-medium text-white hover:bg-white/10">
              Import List
            </button>
            <button 
              onClick={() => scanProspects(searchTerm)}
              className="flex items-center gap-2 rounded-lg bg-brand-gold px-4 py-2 text-xs font-bold text-black hover:bg-yellow-500"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              New Scan
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3 border-b border-white/5 p-4">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search Businesses (e.g. Pizza in NY)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && scanProspects(searchTerm)}
              className="w-full rounded-lg bg-[#1e1e1e] py-2 pl-10 pr-4 text-xs text-white placeholder-gray-600 outline-none ring-1 ring-white/5 focus:ring-brand-gold/50"
            />
          </div>
          <button className="rounded-lg bg-white/5 p-2 text-gray-400 hover:bg-white/10">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto bg-[#2b2b2b] p-4">
          {loading ? (
            <div className="flex h-full items-center justify-center text-gray-500">Scanning Area...</div>
          ) : (
            <div className="space-y-4">
              {filteredProspects.map((prospect) => (
                <div
                  key={prospect.id}
                  onClick={() => setSelectedProspect(prospect)}
                  className={`relative flex overflow-hidden rounded-xl border transition ${
                    selectedProspect?.id === prospect.id
                      ? "border-brand-gold/30 bg-[#1e1e1e]"
                      : "border-white/5 bg-[#1e1e1e] hover:border-white/10"
                  }`}
                >
                  {/* Map Background Slice */}
                  <div className="absolute right-0 top-0 bottom-0 w-48 opacity-20">
                     <div className="h-full w-full bg-gray-700" style={{ clipPath: "ellipse(100% 100% at 100% 50%)" }}></div>
                  </div>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500">
                    <svg className="h-8 w-8 drop-shadow-lg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>

                  <div className="relative z-10 flex w-full flex-col gap-4 p-4">
                    {/* Top Row */}
                    <div className="flex items-start gap-4">
                      <div className="pt-1">
                        <input type="checkbox" className="rounded border-gray-600 bg-transparent checked:bg-brand-gold" />
                      </div>
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-gray-700">
                        <img src={prospect.avatar} alt="" className="h-full w-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-white">{prospect.name}</h3>
                          {prospect.verified && (
                            <svg className="h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                            </svg>
                          )}
                          {prospect.warning && (
                            <svg className="h-4 w-4 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                            </svg>
                          )}
                        </div>
                        <p className="text-xs text-gray-400">{prospect.address}</p>
                        <div className="mt-2 flex gap-2">
                          {prospect.tags.map((tag, i) => (
                            <span key={i} className="rounded bg-white/5 px-2 py-1 text-[10px] font-medium text-gray-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button className="mt-2 text-xs font-medium text-gray-500 hover:text-white">Show more ⌄</button>
                      </div>

                      {/* Metrics Columns */}
                      <div className="hidden grid-cols-3 gap-8 lg:grid">
                        <div>
                          <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-500">
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 011.414.586l2.828 2.828a1 1 0 01.586 1.414V19a2 2 0 01-2 2z" />
                            </svg>
                            Found Via
                          </div>
                          <div className="mt-1 text-xs text-white">{prospect.submissionTime}</div>
                          <div className="text-xs text-gray-400">{prospect.submissionSource}</div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-500">
                            <span className="flex h-3 w-3 items-center justify-center rounded-full bg-blue-500/20 text-[8px] text-blue-400">R</span>
                            Rating & Reviews
                          </div>
                          <div className="mt-1 text-xs font-bold text-white">{prospect.priceHistory}</div>
                          <div className="flex justify-between gap-4 text-[10px] text-gray-400">
                            <span>Web Status</span>
                            <span className="text-white">{prospect.equity}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-gray-500">
                            <svg className="h-3 w-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Last Engagement
                          </div>
                          <div className="mt-1 text-[10px] text-gray-400">{prospect.lastEngagement}</div>
                          <div className="mt-1 flex gap-2 text-[10px]">
                            <span className="flex items-center gap-1 text-green-400">
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                              {prospect.lastAction}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                      <div className="flex items-center gap-8">
                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold uppercase text-gray-500">Contact</span>
                          <div className="flex gap-2">
                            <button className="flex items-center gap-1 rounded border border-white/10 px-2 py-1 text-xs text-white hover:bg-white/5">
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                              Call
                            </button>
                            <button className="flex items-center gap-1 rounded border border-white/10 px-2 py-1 text-xs text-white hover:bg-white/5">
                              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                              Email
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="relative h-10 w-10">
                            <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                              <path className="text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                              <path className="text-blue-500" strokeDasharray={`${prospect.salesLikelihood}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-blue-500">
                              {prospect.salesLikelihood}%
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold uppercase text-blue-500">Lead</span>
                            <span className="text-[10px] font-bold uppercase text-gray-500">Score</span>
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-bold uppercase text-gray-500">Assigned To</span>
                          <div className="flex -space-x-2">
                            {prospect.agents.map((agent, i) => (
                              <img key={i} src={agent} className="h-6 w-6 rounded-full border-2 border-[#1e1e1e]" alt="" />
                            ))}
                            {prospect.agents.length === 0 && <span className="text-xs text-gray-500">Unassigned</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="rounded-full bg-white/5 p-2 text-gray-400 hover:bg-white/10 hover:text-white">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - Lead Details Overlay */}
      {selectedProspect && (
        <div className="w-96 flex-col rounded-2xl bg-[#2b2b2b] shadow-2xl ring-1 ring-white/5 xl:flex">
          <div className="flex items-center justify-between border-b border-white/5 p-4">
            <h3 className="font-bold text-white">Business Details</h3>
            <button onClick={() => setSelectedProspect(null)} className="text-gray-500 hover:text-white">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-700">
                <img src={selectedProspect.avatar} alt="" className="h-full w-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-white">{selectedProspect.name}</h2>
                  {selectedProspect.verified && (
                    <svg className="h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  )}
                </div>
                <div className="mt-2 flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="relative h-8 w-8">
                      <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                        <path className="text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                        <path className="text-blue-500" strokeDasharray={`${selectedProspect.salesLikelihood}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-blue-500">
                        {selectedProspect.salesLikelihood}%
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold uppercase text-blue-500">Lead</span>
                      <span className="text-[8px] font-bold uppercase text-gray-500">Score</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-orange-500/20 text-xs font-bold text-orange-400">
                      {selectedProspect.contactHealth}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold uppercase text-orange-400">Digital</span>
                      <span className="text-[8px] font-bold uppercase text-gray-500">Presence</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3 text-sm text-gray-300">
                <svg className="mt-0.5 h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {selectedProspect.address}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {selectedProspect.phone}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                {selectedProspect.email}
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                Website: {selectedProspect.equity}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2">
              <button className="flex items-center justify-center gap-2 rounded-lg bg-[#1e293b] py-2 text-sm font-medium text-white hover:bg-[#334155]">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                Call
              </button>
              <button className="flex items-center justify-center gap-2 rounded-lg bg-white/5 py-2 text-sm font-medium text-white hover:bg-white/10">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Email
              </button>
              <button className="flex items-center justify-center gap-2 rounded-lg bg-white/5 py-2 text-sm font-medium text-white hover:bg-white/10">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                Audit
              </button>
            </div>

            <div className="mt-6">
              <h4 className="mb-2 text-xs font-bold uppercase text-gray-500">Last Action Taken</h4>
              <div className="flex items-center justify-between rounded-lg bg-[#1e1e1e] p-3">
                <span className="inline-flex items-center gap-1 rounded bg-orange-500/20 px-2 py-1 text-xs font-medium text-orange-400">
                  {selectedProspect.lastAction}
                </span>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    May 10, 11:15 AM
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="mb-2 text-xs font-bold uppercase text-gray-500">Tags</h4>
              <div className="flex flex-wrap gap-2">
                {selectedProspect.tags.map((tag, i) => (
                  <span key={i} className="rounded bg-white/5 px-2 py-1 text-xs text-gray-300">{tag}</span>
                ))}
                <button className="flex items-center gap-1 rounded border border-dashed border-gray-600 px-2 py-1 text-xs text-gray-500 hover:border-gray-400 hover:text-gray-400">
                  + Add tag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarItem({ label, count, active, isDropdown }) {
  return (
    <button
      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition ${
        active ? "bg-brand-gold/10 text-brand-gold" : "text-gray-400 hover:bg-white/5 hover:text-white"
      }`}
    >
      <div className="flex items-center gap-2">
        {label}
        {isDropdown && (
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        )}
      </div>
      {count !== undefined && <span className="opacity-60">{count}</span>}
    </button>
  );
}
