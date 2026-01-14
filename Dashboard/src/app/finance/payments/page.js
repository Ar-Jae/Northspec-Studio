import PageHeader from "@/components/PageHeader";

const PaymentsPage = () => {
  const payments = [
    {
      id: "PAY-001",
      invoiceId: "INV-001",
      client: "Acme Inc.",
      date: "2024-01-20",
      amount: "$2,500.00",
      method: "Credit Card",
    },
    {
      id: "PAY-002",
      invoiceId: "INV-002",
      client: "Stark Industries",
      date: "2024-02-05",
      amount: "$5,000.00",
      method: "Bank Transfer",
    },
    {
      id: "PAY-003",
      invoiceId: "INV-004",
      client: "Daily Bugle",
      date: "2024-03-12",
      amount: "$1,800.00",
      method: "PayPal",
    },
  ];

  return (
    <div>
      <PageHeader title="Payments" />
      <div className="p-6">
        <div className="overflow-hidden rounded-lg border border-white/5">
          <table className="min-w-full divide-y divide-white/5">
            <thead className="bg-white/5">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400"
                >
                  Payment ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400"
                >
                  Invoice ID
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
                  Method
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-white/5">
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-white">
                    {payment.id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                    {payment.invoiceId}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                    {payment.client}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                    {payment.date}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                    {payment.amount}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-300">
                    {payment.method}
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

export default PaymentsPage;