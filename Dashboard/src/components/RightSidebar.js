"use client";

export default function RightSidebar() {
  const notifications = [
    { id: 1, text: "You fixed a bug.", time: "Just now", icon: "🐛" },
    { id: 2, text: "New user registered.", time: "59 minutes ago", icon: "👤" },
    { id: 3, text: "You fixed a bug.", time: "12 hours ago", icon: "🐛" },
    { id: 4, text: "Andi Lane subscribed to...", time: "Today, 11:59 AM", icon: "⭐" },
  ];

  const activities = [
    { id: 1, text: "Changed the style.", time: "Just now", color: "bg-blue-500" },
    { id: 2, text: "Released a new version.", time: "59 minutes ago", color: "bg-brand-gold" },
    { id: 3, text: "Submitted a bug.", time: "12 hours ago", color: "bg-red-500" },
    { id: 4, text: "Modified A data in Page...", time: "Today, 11:59 AM", color: "bg-yellow-500" },
    { id: 5, text: "Deleted a page in Projec...", time: "Feb 2, 2024", color: "bg-gray-500" },
  ];

  const contacts = [
    { id: 1, name: "Natali Craig", avatar: "https://i.pravatar.cc/150?u=natali", online: true },
    { id: 2, name: "Drew Cano", avatar: "https://i.pravatar.cc/150?u=drew", online: true },
    { id: 3, name: "Andi Lane", avatar: "https://i.pravatar.cc/150?u=andi", online: false },
    { id: 4, name: "Koray Okumus", avatar: "https://i.pravatar.cc/150?u=koray", online: true },
    { id: 5, name: "Kate Morrison", avatar: "https://i.pravatar.cc/150?u=kate", online: false },
    { id: 6, name: "Melody Macy", avatar: "https://i.pravatar.cc/150?u=melody", online: true },
  ];

  return (
    <aside className="flex h-screen w-72 flex-col gap-6 bg-brand-gray p-6 rounded-3xl m-3 border border-white/5 text-gray-400">
      {/* Notifications */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white">Notifications</h3>
        <div className="space-y-4">
          {notifications.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <span className="text-base">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm text-gray-200">{item.text}</p>
                <p className="text-xs text-slate-500">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white">Activities</h3>
        <div className="space-y-4">
          {activities.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <div className={`mt-1.5 h-1.5 w-1.5 rounded-full ${item.color}`} />
              <div className="flex-1">
                <p className="text-sm text-gray-200">{item.text}</p>
                <p className="text-xs text-slate-500">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contacts */}
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white">Contacts</h3>
        <div className="space-y-3">
          {contacts.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="h-8 w-8 rounded-full border border-white/10 object-cover"
                  />
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-brand-gray bg-brand-gold"></div>
                  )}
                </div>
                <span className="text-sm text-gray-200">{contact.name}</span>
              </div>
              <button className="rounded-full bg-brand-gray/5 p-1.5 text-brand-gold hover:bg-brand-gray/10 transition-colors">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
