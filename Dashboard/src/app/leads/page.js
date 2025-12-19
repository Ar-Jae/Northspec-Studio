export default function LeadsPage() {
  const leads = [
    {
      id: 1,
      name: "Jane Cooper",
      email: "jane.cooper@example.com",
      status: "New",
      source: "Website",
      date: "Oct 24, 2023",
      avatar: "https://i.pravatar.cc/150?u=1",
    },
    {
      id: 2,
      name: "Cody Fisher",
      email: "cody.fisher@example.com",
      status: "Contacted",
      source: "Referral",
      date: "Oct 22, 2023",
      avatar: "https://i.pravatar.cc/150?u=2",
    },
    {
      id: 3,
      name: "Esther Howard",
      email: "esther.howard@example.com",
      status: "Qualified",
      source: "Social Media",
      date: "Oct 20, 2023",
      avatar: "https://i.pravatar.cc/150?u=3",
    },
    {
      id: 4,
      name: "Jenny Wilson",
      email: "jenny.wilson@example.com",
      status: "Proposal",
      source: "Website",
      date: "Oct 18, 2023",
      avatar: "https://i.pravatar.cc/150?u=4",
    },
    {
      id: 5,
      name: "Guy Hawkins",
      email: "guy.hawkins@example.com",
      status: "New",
      source: "Walk-in",
      date: "Oct 15, 2023",
      avatar: "https://i.pravatar.cc/150?u=5",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "New": return "bg-blue-500/20 text-blue-400 ring-blue-500/30";
      case "Contacted": return "bg-orange-500/20 text-orange-400 ring-orange-500/30";
      case "Qualified": return "bg-green-500/20 text-green-400 ring-green-500/30";
      case "Proposal": return "bg-purple-500/20 text-purple-400 ring-purple-500/30";
      default: return "bg-gray-500/20 text-gray-400 ring-gray-500/30";
    }
  };

  return (
    <>
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Leads</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-xl bg-[#1e1e1e] px-3 py-2 ring-1 ring-white/5">
            <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search leads..."
              className="w-64 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
            />
          </div>
          <button className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
          <button className="rounded-lg bg-[#3b82f6] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-600">
            Add Lead
          </button>
        </div>
      </header>

      <div className="rounded-3xl bg-[#2b2b2b] shadow-lg ring-1 ring-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-[#1e1e1e] text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Source</th>
                <th className="px-6 py-4 font-medium">Date Added</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-white/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img className="h-8 w-8 rounded-full bg-gray-700 object-cover" src={lead.avatar} alt="" />
                      <div>
                        <div className="font-medium text-white">{lead.name}</div>
                        <div className="text-xs text-gray-500">{lead.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{lead.source}</td>
                  <td className="px-6 py-4">{lead.date}</td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-white">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-white/5 px-6 py-4">
          <div className="text-xs text-gray-500">Showing 1 to 5 of 12 results</div>
          <div className="flex gap-2">
            <button className="rounded-lg bg-white/5 px-3 py-1 text-xs text-gray-300 hover:bg-white/10">Previous</button>
            <button className="rounded-lg bg-white/5 px-3 py-1 text-xs text-gray-300 hover:bg-white/10">Next</button>
          </div>
        </div>
      </div>
    </>
  );
}
