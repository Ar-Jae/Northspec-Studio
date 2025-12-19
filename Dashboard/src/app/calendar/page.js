export default function CalendarPage() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // Simple mock for calendar grid (just numbers for now)
  const dates = Array.from({ length: 35 }, (_, i) => {
    const day = i - 1; // Start from previous month or empty
    return day > 0 && day <= 31 ? day : "";
  });

  return (
    <>
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-white">Calendar</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-xl bg-[#1e1e1e] px-3 py-2 ring-1 ring-white/5">
            <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              className="w-44 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
            />
          </div>
          <button className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div className="h-8 w-8 overflow-hidden rounded-full bg-gray-600 ring-2 ring-white/20">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="h-full w-full object-cover" />
          </div>
          <button className="rounded-lg bg-[#3b82f6] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-600">
            Add Event
          </button>
        </div>
      </header>

      <div className="flex h-full flex-col rounded-3xl bg-[#2b2b2b] p-6 shadow-lg ring-1 ring-white/5">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">October 2023</h2>
          <div className="flex gap-2">
            <button className="rounded-lg bg-white/5 px-3 py-1 text-sm text-gray-300 hover:bg-white/10">Previous</button>
            <button className="rounded-lg bg-white/5 px-3 py-1 text-sm text-gray-300 hover:bg-white/10">Next</button>
          </div>
        </div>
        
        <div className="grid flex-1 grid-cols-7 gap-px overflow-hidden rounded-xl bg-[#1e1e1e] ring-1 ring-white/5">
          {days.map((day) => (
            <div key={day} className="bg-[#2b2b2b] p-3 text-center text-sm font-semibold text-gray-400">
              {day}
            </div>
          ))}
          {dates.map((date, i) => (
            <div key={i} className="min-h-[100px] bg-[#2b2b2b] p-2 transition-colors hover:bg-[#323232]">
              <span className={`flex h-7 w-7 items-center justify-center rounded-full text-sm ${date === 15 ? 'bg-[#3b82f6] font-bold text-white' : 'text-gray-300'}`}>
                {date}
              </span>
              {date === 15 && (
                <div className="mt-2 rounded bg-[#3b82f6]/20 px-2 py-1 text-xs font-medium text-[#3b82f6]">
                  Meeting with Client
                </div>
              )}
              {date === 22 && (
                <div className="mt-2 rounded bg-[#0ea5e9]/20 px-2 py-1 text-xs font-medium text-[#0ea5e9]">
                  Property Viewing
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
