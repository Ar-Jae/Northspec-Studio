"use client"
import PageHeader from "@/components/PageHeader";

const InviteUserPage = () => {

    return (
        <div>
            <PageHeader title="Invite New User" breadcrumbs={["Users", "Invite"]} />
            <div className="p-6">
                <div className="bg-brand-gray/50 border border-white/5 rounded-2xl p-8 max-w-2xl mx-auto">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                            <input type="email" placeholder="Enter email address" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
                            <select className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold">
                                <option>Select a Role</option>
                                <option>Admin</option>
                                <option>Editor</option>
                                <option>Viewer</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Add a message (optional)</label>
                            <textarea placeholder="Include a personal message with the invitation" rows="4" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold"></textarea>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button className="px-6 py-2.5 rounded-xl text-black bg-brand-gold font-bold hover:bg-brand-gold/80">
                            Send Invitation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InviteUserPage;
