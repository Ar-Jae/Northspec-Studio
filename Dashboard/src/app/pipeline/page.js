export default function PipelinePage() {
  const stages = [
    { name: "New", tone: "blue", count: 2 },
    { name: "Contacted", tone: "orange", count: 2 },
    { name: "Negotiation", tone: "purple", count: 2 },
    { name: "Closed", tone: "green", count: 1 },
  ];

  const leads = [
    {
      id: 1,
      name: "Mr. Johnson",
      property: "Downtown Apartment",
      stage: "Negotiation",
      value: "$320,000",
      date: "Aug 22",
      avatar: "https://i.pravatar.cc/150?u=1",
    },
    {
      id: 2,
      name: "Jonathan Weak",
      property: "Lakeside Villa",
      stage: "Contacted",
      value: "$560,000",
      date: "Aug 20",
      avatar: "https://i.pravatar.cc/150?u=2",
    },
    {
      id: 3,
      name: "Sarah Miller",
      property: "Suburban House",
      stage: "New",
      value: "$250,000",
      date: "Aug 19",
      avatar: "https://i.pravatar.cc/150?u=3",
    },
    {
      id: 4,
      name: "Michael Chen",
      property: "City Loft",
      stage: "New",
      value: "$450,000",
      date: "Aug 18",
      avatar: "https://i.pravatar.cc/150?u=4",
    },
    {
      id: 5,
      name: "Emma Wilson",
      property: "Beachfront Condo",
      stage: "Negotiation",
      value: "$780,000",
      date: "Aug 17",
      avatar: "https://i.pravatar.cc/150?u=5",
    },
    {
      id: 6,
      name: "David Brown",
      property: "Mountain Cabin",
      stage: "Contacted",
      value: "$320,000",
      date: "Aug 16",
      avatar: "https://i.pravatar.cc/150?u=6",
    },
    {
      id: 7,
      name: "Alice Cooper",
      property: "Studio Flat",
      stage: "Closed",
      value: "$180,000",
      date: "Aug 10",
      avatar: "https://i.pravatar.cc/150?u=7",
    },
  ];

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col gap-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between rounded-2xl bg-[#2b2b2b] p-4 shadow-lg ring-1 ring-white/5">
        <h1 className="text-xl font-bold text-white">Pipeline</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search pipeline..."
              className="w-64 rounded-lg bg-[#1e1e1e] py-2 pl-10 pr-4 text-sm text-white placeholder-gray-600 outline-none ring-1 ring-white/5 focus:ring-brand-gold/50"
            />
          </div>
          <button className="rounded-lg bg-brand-gray/5 p-2 text-gray-400 hover:bg-brand-gray/10 hover:text-white">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
          <button className="rounded-lg bg-brand-gold px-4 py-2 text-sm font-bold text-black hover:bg-yellow-500">
            Add Deal
          </button>
        </div>
      </div>

      {/* Pipeline Board */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex h-full min-w-max gap-4">
          {stages.map((stage) => (
            <div key={stage.name} className="flex w-80 flex-col gap-3">
              <div className="flex items-center justify-between rounded-xl bg-[#2b2b2b] p-3 shadow-lg ring-1 ring-white/5">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${
                    stage.tone === 'blue' ? 'bg-blue-500' : 
                    stage.tone === 'green' ? 'bg-brand-gold' : 
                    stage.tone === 'orange' ? 'bg-orange-500' : 
                    'bg-purple-500'
                  }`} />
                  <span className="font-semibold text-white">{stage.name}</span>
                  <span className="rounded-full bg-brand-gray/10 px-2 py-0.5 text-xs font-medium text-gray-400">
                    {leads.filter((l) => l.stage === stage.name).length}
                  </span>
                </div>
                <button className="text-gray-400 hover:text-white">+</button>
              </div>

              <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
                {leads
                  .filter((lead) => lead.stage === stage.name)
                  .map((lead) => (
                    <div
                      key={lead.id}
                      className="flex cursor-pointer flex-col gap-3 rounded-xl bg-[#2b2b2b] p-4 shadow-lg ring-1 ring-white/5 transition hover:ring-white/10"
                    >
                      <div className="flex items-start justify-between">
                        <span className="rounded bg-brand-gray/10 px-2 py-1 text-[10px] font-medium text-gray-300">
                          {lead.property}
                        </span>
                        <button className="text-gray-500 hover:text-white">•••</button>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{lead.name}</h4>
                        <p className="text-sm font-medium text-brand-gold">{lead.value}</p>
                      </div>
                      <div className="flex items-center justify-between border-t border-white/5 pt-3">
                        <div className="flex -space-x-2">
                          <img className="h-6 w-6 rounded-full bg-gray-700 ring-2 ring-[#2b2b2b]" src={lead.avatar} alt="" />
                        </div>
                        <span className="text-xs text-gray-500">{lead.date}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
