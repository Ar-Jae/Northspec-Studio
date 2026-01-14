"use client"
import PageHeader from "@/components/PageHeader";

const LinkAccountPage = () => {

    const banks = [
        { name: "Chase", logo: "/images/banks/chase.svg" },
        { name: "Bank of America", logo: "/images/banks/boa.svg" },
        { name: "Wells Fargo", logo: "/images/banks/wells-fargo.svg" },
        { name: "Citi", logo: "/images/banks/citi.svg" },
        { name: "PNC", logo: "/images/banks/pnc.svg" },
        { name: "US Bank", logo: "/images/banks/us-bank.svg" },
    ]

    return (
        <div>
            <PageHeader title="Link New Account" breadcrumbs={["Finance", "Accounts", "Link"]} />
            <div className="p-6">
                <div className="bg-brand-gray/50 border border-white/5 rounded-2xl p-8 max-w-2xl mx-auto">
                    <h2 className="text-xl font-bold text-white mb-6 text-center">Select Your Bank</h2>
                    <p className="text-gray-400 text-center mb-8">
                        By linking your bank account, you agree to our terms and conditions.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {banks.map(bank => (
                            <div key={bank.name} className="flex flex-col items-center justify-center bg-white/5 p-6 rounded-lg cursor-pointer hover:bg-white/10">
                                <img src={bank.logo} alt={bank.name} className="h-12 mb-4" />
                                <p className="text-white text-sm font-bold">{bank.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 text-center">
                        <button className="px-6 py-2.5 rounded-xl text-black bg-brand-gold font-bold hover:bg-brand-gold/80">
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LinkAccountPage;
