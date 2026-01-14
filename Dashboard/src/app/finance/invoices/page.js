import PageHeader from "@/components/PageHeader";
import Link from "next/link";

const InvoicesPage = () => {
  const actions = [
    {
      label: "New Invoice",
      primary: true,
      href: "/finance/invoices/create",
    },
  ];

  const invoices = [
    {
      id: "INV-001",
      client: "Acme Inc.",
      date: "2024-01-15",
      amount: "$2,500.00",
      status: "Paid",
    },
    {
      id: "INV-002",
      client: "Stark Industries",
      date: "2024-02-01",
      amount: "$5,000.00",
      status: "Pending",
    },
    {
      id: "INV-003",
      client: "Wayne Enterprises",
      date: "2024-02-10",
      amount: ",200.00",
      status: "Overdue",
    },
  ];

  return (
    <div>
      <PageHeader title="Invoices" actions={actions.map(action => 
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
                  Invoice #
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
                  Amount
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
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-white/5">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">
                    {invoice.id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                    {invoice.client}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                    {invoice.date}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                    {invoice.amount}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        invoice.status === "Paid"
                          ? "bg-green-500/10 text-green-400"
                          : invoice.status === "Pending"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {invoice.status}
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

export default InvoicesPage;