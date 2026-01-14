import PageHeader from "@/components/PageHeader";

const ProjectRequestsPage = () => {
  const projectRequests = [
    {
      id: "PR-001",
      title: "New Website Design",
      client: "Acme Inc.",
      date: "2024-03-01",
      budget: "$10,000",
      status: "Pending Review",
    },
    {
      id: "PR-002",
      title: "Mobile App Development",
      client: "Stark Industries",
      date: "2024-03-05",
      budget: "$25,000",
      status: "Approved",
    },
    {
      id: "PR-003",
      title: "Marketing Campaign",
      client: "Wayne Enterprises",
      date: "2024-03-10",
      budget: "$5,000",
      status: "Rejected",
    },
  ];

  return (
    <div>
      <PageHeader title="Project Requests" />
      <div className="p-6">
        <div className="overflow-hidden rounded-lg border border-white/5">
          <table className="min-w-full divide-y divide-white/5">
            <thead className="bg-white/5">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400"
                >
                  Request ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400"
                >
                  Title
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400"
                >
                  Client
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400"
                >
                  Budget
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400"
                >
                  Status
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projectRequests.map((request) => (
                <tr key={request.id} className="hover:bg-white/5">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">
                    {request.id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                    {request.title}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                    {request.client}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                    {request.date}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                    {request.budget}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        request.status === "Approved"
                          ? "bg-green-500/10 text-green-400"
                          : request.status === "Pending Review"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <a href="#" className="text-brand-gold hover:text-brand-gold/70">
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectRequestsPage;
