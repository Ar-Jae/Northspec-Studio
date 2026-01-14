"use client"
import PageHeader from "@/components/PageHeader";
import { useState } from 'react';

const CreateProjectPage = () => {
    const [team, setTeam] = useState([]);

    const handleAddTeamMember = (member) => {
        if (team.length < 5) {
            setTeam([...team, member]);
        }
    };

    const handleRemoveTeamMember = (member) => {
        setTeam(team.filter(m => m !== member));
    };

    return (
        <div>
            <PageHeader title="Create New Project" breadcrumbs={["Projects", "Create"]} />
            <div className="p-6">
                <div className="bg-brand-gray/50 border border-white/5 rounded-2xl p-8 max-w-4xl mx-auto">
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Project Name</label>
                            <input type="text" placeholder="e.g., New Website for Acme Inc." className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Client</label>
                            <select className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold">
                                <option>Select a Client</option>
                                <option>Acme Inc.</option>
                                <option>Stark Industries</option>
                                <option>Wayne Enterprises</option>
                                <option>Daily Bugle</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                            <textarea placeholder="Provide a brief description of the project" rows="4" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold"></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Start Date</label>
                                <input type="date" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Due Date</label>
                                <input type="date" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Assign Team</label>
                            <div className="bg-white/5 rounded-lg p-4">
                                <div className="flex -space-x-2 mb-4">
                                    {team.map((avatar, index) => (
                                        <img key={index} src={avatar} alt="team member" className="h-10 w-10 rounded-full ring-2 ring-gray-800" />
                                    ))}
                                </div>
                                <div className="flex items-center gap-2">
                                {['/images/avatars/avatar-1.svg', '/images/avatars/avatar-2.svg', '/images/avatars/avatar-3.svg', '/images/avatars/avatar-4.svg', '/images/avatars/avatar-5.svg', '/images/avatars/avatar-6.svg'].map(avatar => 
                                    !team.includes(avatar) && <img key={avatar} src={avatar} alt="add member" className="h-10 w-10 rounded-full cursor-pointer hover:ring-2 hover:ring-brand-gold" onClick={() => handleAddTeamMember(avatar)} />
                                )}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="mt-8 flex justify-end gap-4">
                        <button className="px-6 py-2.5 rounded-xl text-white bg-white/5 border border-white/10 hover:bg-white/10">
                            Save as Draft
                        </button>
                        <button className="px-6 py-2.5 rounded-xl text-black bg-brand-gold font-bold hover:bg-brand-gold/80">
                            Create Project
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateProjectPage;
