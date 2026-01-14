import PageHeader from "@/components/PageHeader";
import Link from "next/link";

const ProspectsPage = () => {
  const prospects = [
    {
      id: 1,
      name: "John Doe",
      company: "Acme Inc.",
      email: "john.doe@acme.com",
      phone: "555-1234",
      status: "Contacted",
    },
    {
      id: 2,
      name: "Jane Smith",
      company: "Stark Industries",
      email: "jane.smith@stark.com",
      phone: "555-5678",
      status: "New",
    },
    {
      id: 3,
      name: "Peter Jones",
      company: "Wayne Enterprises",
      email: "peter.jones@wayne.com",
      phone: "555-9012",
      status: "Qualified",
    },
    {
        id: 4,
        name: "Mary Jane",
        company: "Daily Bugle",
        email: "mary.jane@dailybugle.com",
        phone: "555-3456",
        status: "New",
    }
  ];

  const actions = [
    {
      label: "Add Prospect",
      primary: true,
      href: "/prospects/add",
    },
  ];

  return (
    <div>
      <PageHeader title="Prospects" actions={actions.map(action => 
        action.href ? (
          <Link href={action.href} key={action.label} passHref>
            <span className={action.primary ? "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all bg-brand-gold text-black" : "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all bg-white/5 text-gray-300 border border-white/5"}>
              {action.label}
            </span>
          </Link>
        ) : (
          <button
            key={action.label}
            className={action.primary ? "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all bg-brand-gold text-black" : "flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-all bg-white/5 text-gray-300 border border-white/5"}
          >
            {action.label}
          </button>
        )
      )} />
      <div className="p-6">
        <div className="overflow-hidden rounded-lg border border-white/5">
          <table className="min-w-full divide-y divide-white/5">
            <thead className="bg-white/5">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400"
                >
                  Company
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400"
                >
                  Contact
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
              {prospects.map((prospect) => (
                <tr key={prospect.id} className="hover:bg-white/5">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">
                    {prospect.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                    {prospect.company}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                    <div>{prospect.email}</div>
                    <div>{prospect.phone}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        prospect.status === "Qualified"
                          ? "bg-green-500/10 text-green-400"
                          : prospect.status === "Contacted"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {prospect.status}
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

export default ProspectsPage;