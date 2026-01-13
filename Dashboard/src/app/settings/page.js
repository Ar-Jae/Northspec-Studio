"use client";

export default function SettingsPage() {
  return (
    <div className="flex-1 overflow-auto rounded-tl-3xl bg-brand-gray p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Settings</h1>
        <p className="text-sm text-gray-500">Manage your account and application preferences</p>
      </div>
      
      <div className="max-w-2xl space-y-8">
        <section>
          <h2 className="mb-4 text-lg font-medium text-white">Profile Information</h2>
          <div className="grid gap-4 rounded-2xl border border-gray-100 p-6">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-gray-300">Full Name</label>
              <input type="text" defaultValue="Admin User" className="rounded-lg border border-white/5 px-4 py-2 text-sm focus:border-brand-gold focus:outline-none" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-gray-300">Email Address</label>
              <input type="email" defaultValue="admin@northspec.studio" className="rounded-lg border border-white/5 px-4 py-2 text-sm focus:border-brand-gold focus:outline-none" />
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-lg font-medium text-white">Notifications</h2>
          <div className="space-y-4 rounded-2xl border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">Email Notifications</p>
                <p className="text-xs text-gray-500">Receive updates about new leads and payments</p>
              </div>
              <div className="h-6 w-11 rounded-full bg-brand-gold p-1">
                <div className="h-4 w-4 translate-x-5 rounded-full bg-brand-gray"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white">System Alerts</p>
                <p className="text-xs text-gray-500">Get notified about system maintenance and updates</p>
              </div>
              <div className="h-6 w-11 rounded-full bg-gray-200 p-1">
                <div className="h-4 w-4 rounded-full bg-brand-gray"></div>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-4">
          <button className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
          <button className="rounded-lg bg-brand-gold px-4 py-2 text-sm font-medium text-white hover:bg-green-700">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
