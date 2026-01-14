"use client"
import PageHeader from "@/components/PageHeader";

const AddProspectPage = () => {

    return (
        <div>
            <PageHeader title="Add New Prospect" breadcrumbs={["Prospects", "Add"]} />
            <div className="p-6">
                <div className="bg-brand-gray/50 border border-white/5 rounded-2xl p-8 max-w-2xl mx-auto">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input type="text" placeholder="First Name" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" />
                            <input type="text" placeholder="Last Name" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" />
                        </div>
                        <input type="text" placeholder="Company" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" />
                        <input type="email" placeholder="Email Address" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" />
                        <input type="tel" placeholder="Phone Number" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" />
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
                            <select className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold">
                                <option>New</option>
                                <option>Contacted</option>
                                <option>Qualified</option>
                                <option>Unqualified</option>
                            </select>
                        </div>

                    </div>
                    <div className="mt-8 flex justify-end">
                        <button className="px-6 py-2.5 rounded-xl text-black bg-brand-gold font-bold hover:bg-brand-gold/80">
                            Add Prospect
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProspectPage;
