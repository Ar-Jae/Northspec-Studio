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
    { id: 2, text: "Released a new version.", time: "59 minutes ago", color: "bg-green-500" },
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
    <aside className="flex h-screen w-72 flex-col gap-6 bg-gradient-to-b from-[#f0f4e8] to-[#d8e4c8] p-4 rounded-3xl m-3">
      {/* Notifications */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">Notifications</h3>
        <div className="space-y-3">
          {notifications.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <span className="text-lg">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm text-gray-700">{item.text}</p>
                <p className="text-xs text-gray-500">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activities */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">Activities</h3>
        <div className="space-y-3">
          {activities.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <div className={`mt-1 h-2 w-2 rounded-full ${item.color}`}></div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">{item.text}</p>
                <p className="text-xs text-gray-500">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contacts */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-gray-700">Contacts</h3>
        <div className="space-y-2">
          {contacts.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  {contact.online && (
                    <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#e8f0dc] bg-green-500"></div>
                  )}
                </div>
                <span className="text-sm text-gray-700">{contact.name}</span>
              </div>
              <button className="rounded-full bg-green-100 p-1.5 text-green-600 hover:bg-green-200">
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
