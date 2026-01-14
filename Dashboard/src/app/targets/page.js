import PageHeader from "@/components/PageHeader";
import Link from "next/link";

const TargetsPage = () => {
  const targets = [
    {
      id: "TGT-001",
      title: "Q1 New Client Acquisition",
      value: "50",
      target: "100",
      unit: "Clients",
      progress: 50,
    },
    {
      id: "TGT-002",
      title: "Q1 Revenue",
      value: "$150,000",
      target: "$250,000",
      unit: "USD",
      progress: 60,
    },
    {
      id: "TGT-003",
      title: "Website Conversion Rate",
      value: "3.5%",
      target: "5%",
      unit: "Percentage",
      progress: 70,
    },
    {
        id: "TGT-004",
        title: "Social Media Engagement",
        value: "2500",
        target: "5000",
        unit: "Interactions",
        progress: 50,
      },
  ];

  const actions = [
    {
      label: "New Target",
      primary: true,
      href: "/targets/create",
    },
  ];

  return (
    <div>
      <PageHeader title="Targets" actions={actions.map(action => 
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
          {targets.map((target) => (
            <div key={target.id} className="bg-white/5 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-white">{target.title}</h3>
              <p className="text-sm text-gray-400 mt-1">{target.unit}</p>
              <div className="mt-4">
                <div className="flex justify-between items-end">
                    <span className="text-3xl font-bold text-white">{target.value}</span>
                    <span className="text-gray-400">/ {target.target}</span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-600 rounded-full h-2.5">
                    <div
                      className="bg-brand-gold h-2.5 rounded-full"
                      style={{ width: `${target.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TargetsPage;