const fallbackData = {
  stats: [
    { label: "Total Revenue", value: "$4.2M", change: 12 },
    { label: "New Leads", value: 24, change: 12 },
    { label: "Contacted", value: 18, change: 12 },
    { label: "Negotiation", value: 7, change: -9 },
    { label: "Closed Deals", value: 12, change: 12 },
  ],
  news: [
    {
      title: "Follow up with Mr. Johnson",
      detail: "Interested 3BHK Flat at Banani",
      author: "Lisa Wong",
      time: "12:30 pm",
    },
    {
      title: "New lead added",
      detail: "Lisa Wong",
      author: "System",
      time: "12:32 pm",
    },
    {
      title: "New lead added",
      detail: "Lisa Wong",
      author: "System",
      time: "12:35 pm",
    },
  ],
  leads: [
    {
      name: "Mr. Johnson",
      property: "Downtown Apartment",
      stage: "Negotiation",
      stageTone: "amber",
      value: "$320,000",
      activity: "Aug 22 - Sent Brochure",
    },
    {
      name: "Jonathan Weak",
      property: "Lakeside Villa",
      stage: "Contacted",
      stageTone: "green",
      value: "$560,000",
      activity: "Aug 20 - Call",
    },
    {
      name: "Mr. Johnson",
      property: "Suburban House",
      stage: "New",
      stageTone: "sky",
      value: "$250,000",
      activity: "Aug 19 - Added Lead",
    },
  ],
  chartPoints: [
    { month: "Jan", value: 25 },
    { month: "Feb", value: 32 },
    { month: "Mar", value: 42 },
    { month: "Apr", value: 38 },
    { month: "May", value: 50 },
    { month: "Jun", value: 62 },
    { month: "Jul", value: 58 },
    { month: "Aug", value: 72 },
    { month: "Sep", value: 65 },
    { month: "Oct", value: 78 },
    { month: "Nov", value: 70 },
    { month: "Dec", value: 74 },
  ],
};

function stageClasses(tone) {
  const tones = {
    amber: "bg-amber-100 text-amber-800",
    green: "bg-emerald-100 text-emerald-800",
    sky: "bg-sky-100 text-sky-800",
  };
  return tones[tone] || "bg-slate-100 text-slate-700";
}

async function loadDashboardData() {
  const url = process.env.N8N_DASHBOARD_URL;
  if (!url) return fallbackData;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load dashboard data: ${res.status}`);
    const json = await res.json();

    return {
      stats: json.stats || fallbackData.stats,
      news: json.news || fallbackData.news,
      leads: json.leads || fallbackData.leads,
      chartPoints: json.chartPoints || fallbackData.chartPoints,
    };
  } catch (error) {
    console.error("Dashboard data fetch error", error);
    return fallbackData;
  }
}

function Badge({ change }) {
  const isPositive = change >= 0;
  const color = isPositive ? "text-emerald-600" : "text-rose-600";
  const bg = isPositive ? "bg-emerald-50" : "bg-rose-50";
  const arrow = isPositive ? "▲" : "▼";
  return (
    <span className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${bg} ${color}`}>
      {arrow}
      {Math.abs(change)}%
    </span>
  );
}

function Chart({ points }) {
  const maxVal = Math.max(...points.map((p) => p.value));
  const minVal = Math.min(...points.map((p) => p.value));
  const spread = maxVal - minVal || 1;
  const pointList = points
    .map((point, idx) => {
      const x = (idx / (points.length - 1)) * 100;
      const y = 100 - ((point.value - minVal) / spread) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  const lastPoint = points[points.length - 1];
  const lastX = 100;
  const lastY = 100 - ((lastPoint.value - minVal) / spread) * 100;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Performance Analytics</p>
          <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-500" /> Revenue
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Leads
            </span>
          </div>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          This Month
        </div>
      </div>
      <div className="mt-6 h-56 w-full">
        <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none">
          <polyline
            fill="none"
            strokeWidth="2.5"
            stroke="#fbbf24"
            points={pointList}
            strokeLinejoin="round"
          />
          <circle cx={lastX} cy={lastY} r={2} fill="#f59e0b" />
        </svg>
      </div>
      <div className="mt-2 grid grid-cols-12 text-xs text-slate-500">
        {points.map((point) => (
          <span key={point.month} className="text-center">
            {point.month}
          </span>
        ))}
      </div>
    </div>
  );
}

export default async function Home() {
  const data = await loadDashboardData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f1e6] via-[#fbf7ef] to-[#f1ebe1] text-slate-900">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="overflow-hidden rounded-3xl bg-white/80 shadow-2xl ring-1 ring-black/5 backdrop-blur">
          <div className="grid grid-cols-[240px_1fr]">
            <aside className="flex min-h-full flex-col gap-8 bg-white/60 p-8 ring-1 ring-black/5">
              <div className="flex items-center gap-3 text-lg font-semibold text-slate-800">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400 text-white shadow-sm">
                  ◆
                </div>
                <span>Northspec Studio</span>
              </div>
              <nav className="space-y-2 text-sm font-medium text-slate-600">
                <div className="rounded-2xl bg-amber-100 px-4 py-3 text-amber-800 shadow-sm">Dashboard</div>
                {[
                  "Pipeline",
                  "Leads",
                  "Properties",
                  "Calendar",
                  "Reports",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl px-4 py-3 transition hover:bg-slate-100"
                  >
                    {item}
                  </div>
                ))}
              </nav>
              <div className="mt-auto space-y-2 text-sm font-medium text-slate-600">
                <div className="rounded-2xl px-4 py-3 transition hover:bg-slate-100">Settings</div>
                <div className="rounded-2xl px-4 py-3 text-rose-600 transition hover:bg-rose-50">
                  Log Out
                </div>
              </div>
            </aside>

            <main className="flex flex-col gap-8 bg-white/30 p-8">
              <header className="flex items-center justify-between gap-4">
                <div className="text-xl font-semibold text-slate-800">Dashboard Overview</div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-slate-500 shadow-sm ring-1 ring-black/5">
                    <span>🔍</span>
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-44 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                    />
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg shadow-sm ring-1 ring-black/5">
                    🛎️
                  </div>
                  <div className="flex items-center gap-3 rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-black/5">
                    <div className="h-8 w-8 rounded-full bg-amber-500" />
                    <span className="text-sm font-semibold text-slate-800">Martin Furry</span>
                  </div>
                  <button className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-amber-600">
                    Add New Lead
                  </button>
                </div>
              </header>

              <section className="grid grid-cols-5 gap-4">
                {data.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                      <span>{stat.label}</span>
                      <Badge change={stat.change} />
                    </div>
                    <div className="text-2xl font-semibold text-slate-900">{stat.value}</div>
                  </div>
                ))}
              </section>

              <section className="grid grid-cols-3 gap-6">
                <div className="col-span-2">
                  <Chart points={data.chartPoints} />
                </div>
                <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-700">Important News</p>
                    <div className="text-xs text-slate-400">•••</div>
                  </div>
                  <div className="mt-4 space-y-4">
                    {data.news.map((item, idx) => (
                      <div
                        key={`${item.title}-${idx}`}
                        className="flex items-start gap-3 rounded-xl bg-slate-50 p-3"
                      >
                        <div className="h-10 w-10 rounded-full bg-slate-200" />
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                          <p className="text-xs text-slate-500">{item.detail}</p>
                        </div>
                        <div className="text-[11px] text-slate-400">{item.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-800">Recent Leads</p>
                  <button className="text-xs font-semibold text-amber-700">View all</button>
                </div>
                <div className="mt-4 overflow-hidden rounded-xl ring-1 ring-slate-200">
                  <div className="grid grid-cols-5 bg-amber-50 px-4 py-3 text-xs font-semibold text-amber-900">
                    <span>Lead Name</span>
                    <span>Property</span>
                    <span>Stage</span>
                    <span>Value</span>
                    <span>Last Activity</span>
                  </div>
                  {data.leads.map((lead, idx) => (
                    <div
                      key={lead.name + lead.property + idx}
                      className="grid grid-cols-5 items-center px-4 py-3 text-sm text-slate-700 odd:bg-white even:bg-slate-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-200" />
                        <span className="font-semibold text-slate-900">{lead.name}</span>
                      </div>
                      <span>{lead.property}</span>
                      <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${stageClasses(lead.stageTone)}`}>
                        {lead.stage}
                      </span>
                      <span className="font-semibold text-slate-900">{lead.value}</span>
                      <span className="text-xs text-slate-500">{lead.activity}</span>
                    </div>
                  ))}
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
