"use client";
import PageHeader from "@/components/PageHeader";
import { useState } from 'react';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div>
            <h2 className="text-xl font-bold text-white mb-6">Profile Settings</h2>
            <div className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-brand-gold">
                  <img src="https://i.pravatar.cc/150?u=arlene" alt="Profile" className="h-full w-full object-cover" />
                </div>
                <div>
                  <button className="px-4 py-2 rounded-lg text-sm font-bold bg-white/10 text-white hover:bg-white/20">Change Photo</button>
                  <p className="text-xs text-gray-400 mt-2">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="First Name" defaultValue="Arlene" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" />
                <input type="text" placeholder="Last Name" defaultValue="McCoy" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" />
              </div>
              <input type="email" placeholder="Email Address" defaultValue="arlene@northspec.com" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold" />
              <textarea placeholder="Your Bio" rows="3" className="w-full bg-white/5 rounded-lg border-white/10 px-4 py-2 text-white focus:ring-brand-gold"></textarea>
            </div>
            <div className="mt-8 flex justify-end">
                <button className="px-6 py-2.5 rounded-xl text-black bg-brand-gold font-bold hover:bg-brand-gold/80">
                    Save Changes
                </button>
            </div>
          </div>
        );
      case 'notifications':
        return (
            <div>
              <h2 className="text-xl font-bold text-white mb-6">Notification Settings</h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                        <p className="text-white">Email Notifications</p>
                        <p className="text-sm text-gray-400">Receive an email for important events.</p>
                    </div>
                    <label className="switch">
                        <input type="checkbox" defaultChecked />
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                    <div>
                        <p className="text-white">Push Notifications</p>
                        <p className="text-sm text-gray-400">Get push notifications on your devices.</p>
                    </div>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button className="px-6 py-2.5 rounded-xl text-black bg-brand-gold font-bold hover:bg-brand-gold/80">
                    Save Changes
                </button>
              </div>
            </div>
          );
      case 'billing':
        return (
            <div>
            <h2 className="text-xl font-bold text-white mb-6">Billing Settings</h2>
            <div className="bg-white/5 p-6 rounded-lg">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-white font-bold">Current Plan</p>
                        <p className="text-2xl text-white font-bold mt-1">Pro Plan</p>
                        <p className="text-sm text-gray-400">$99/month</p>
                    </div>
                    <button className="px-4 py-2 rounded-lg text-sm font-bold bg-brand-gold text-black hover:bg-brand-gold/80">Change Plan</button>
                </div>
                <div className="mt-6 border-t border-white/10 pt-6">
                    <h3 className="text-white font-bold mb-4">Payment Method</h3>
                    <div className="flex items-center gap-4">
                        <img src="/images/visa_logo.svg" alt="Visa" className="h-8"/>
                        <p className="text-white">Visa ending in 1234</p>
                        <p className="text-gray-400">Expires 12/2025</p>
                        <button className="ml-auto text-sm text-brand-gold hover:text-brand-gold/80">Update</button>
                    </div>
                </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <PageHeader title="Settings" />
      <div className="p-6">
        <div className="flex space-x-8 border-b border-white/10 mb-8">
          <button onClick={() => setActiveTab('profile')} className={`pb-3 text-sm ${activeTab === 'profile' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-400'}`}>Profile</button>
          <button onClick={() => setActiveTab('notifications')} className={`pb-3 text-sm ${activeTab === 'notifications' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-400'}`}>Notifications</button>
          <button onClick={() => setActiveTab('billing')} className={`pb-3 text-sm ${activeTab === 'billing' ? 'text-brand-gold border-b-2 border-brand-gold' : 'text-gray-400'}`}>Billing</button>
        </div>
        <div className="bg-white/5 border border-white/5 rounded-2xl p-8">
            {renderContent()}
        </div>
      </div>
      <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 60px;
          height: 34px;
        }
        .switch input { 
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #ccc;
          transition: .4s;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 26px;
          width: 26px;
          left: 4px;
          bottom: 4px;
          background-color: white;
          transition: .4s;
        }
        input:checked + .slider {
          background-color: #D4AF37;
        }
        input:checked + .slider:before {
          transform: translateX(26px);
        }
        .slider.round {
          border-radius: 34px;
        }
        .slider.round:before {
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;