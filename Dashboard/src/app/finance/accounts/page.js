import PageHeader from "@/components/PageHeader";
import Link from "next/link";

const AccountsPage = () => {
  const accounts = [
    {
      id: "ACC-001",
      name: "Primary Checking",
      type: "Checking",
      balance: "$25,842.55",
      provider: "Chase Bank",
    },
    {
      id: "ACC-002",
      name: "Business Savings",
      type: "Savings",
      balance: "$152,310.12",
      provider: "Bank of America",
    },
    {
      id: "ACC-003",
      name: "PayPal Account",
      type: "Digital Wallet",
      balance: "$8,211.99",
      provider: "PayPal",
    },
  ];

  const actions = [
    {
      label: "Link Account",
      primary: true,
      href: "/finance/accounts/link",
    },
  ];

  return (
    <div>
      <PageHeader title="Accounts" actions={actions.map(action => 
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accounts.map((account) => (
            <div key={account.id} className="bg-white/5 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-white">{account.name}</h3>
              <p className="text-sm text-gray-400 mt-1">{account.provider} - {account.type}</p>
              <p className="text-3xl font-bold text-white mt-4">{account.balance}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountsPage;