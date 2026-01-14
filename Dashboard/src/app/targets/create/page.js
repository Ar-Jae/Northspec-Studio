"use client"
import PageHeader from "@/components/PageHeader";

const CreateTargetPage = () => {

    return (
        <div>
            <PageHeader title="Create New Target" breadcrumbs={["Targets", "Create"]} />
            <div className="p-6">
                <div className="bg-brand-gray/50 border border-white/5 rounded-2xl p-8 max-w-2xl mx-auto">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Target Title</label>
                            <input type="text" placeholder="e.g., Q2 New Client Acquisition" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Target Value</label>
                                <input type="number" placeholder="100" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Unit</label>
                                <input type="text" placeholder="e.g., Clients, USD, %" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Current Value</label>
                            <input type="number" placeholder="0" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Time Frame</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <input type="date" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" />
                                <input type="date" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" />
                            </div>
                        </div>

                    </div>
                    <div className="mt-8 flex justify-end">
                        <button className="px-6 py-2.5 rounded-xl text-black bg-brand-gold font-bold hover:bg-brand-gold/80">
                            Create Target
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateTargetPage;
