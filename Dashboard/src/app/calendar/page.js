"use client";

import { useState, useEffect } from "react";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isConnected, setIsConnected] = useState(false);
  const [view, setView] = useState("week"); // 'month', 'week', 'day'
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: "", start: "09:00", end: "10:00", day: 0, location: "", category: "work" });
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Meeting with Jonson in 15 minutes", time: "2 min ago", read: false },
    { id: 2, message: "Design session reminder", time: "1 hour ago", read: false },
    { id: 3, message: "New event added to your calendar", time: "3 hours ago", read: true },
  ]);
  
  // Calendar filters
  const [calendarFilters, setCalendarFilters] = useState({
    personal: true,
    tasks: false,
    birthdays: false,
  });
  
  // Category filters
  const [categoryFilters, setCategoryFilters] = useState({
    personal: true,
    work: true,
    health: true,
  });
  
  // Collapsed sections
  const [collapsedSections, setCollapsedSections] = useState({
    calendars: false,
    categories: false,
  });
  
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Design onboarding",
      start: "06:00",
      end: "07:10",
      day: 1, // Monday
      color: "bg-green-200 text-green-800",
      category: "work",
      calendarType: "personal",
      attendees: ["https://i.pravatar.cc/150?u=1", "https://i.pravatar.cc/150?u=2"]
    },
    {
      id: 2,
      title: "Design session",
      start: "07:50",
      end: "09:30",
      day: 2, // Tuesday
      color: "bg-yellow-100 text-yellow-800",
      category: "personal",
      calendarType: "personal",
    },
    {
      id: 3,
      title: "Development meet",
      start: "06:00",
      end: "08:00",
      day: 1, // Monday
      color: "bg-purple-200 text-purple-800",
      category: "work",
      calendarType: "personal",
      attendees: ["https://i.pravatar.cc/150?u=3"]
    },
    {
      id: 4,
      title: "Design our website",
      start: "08:30",
      end: "10:50",
      day: 6, // Saturday
      color: "bg-pink-200 text-pink-800",
      category: "personal",
      calendarType: "personal",
      image: "https://images.unsplash.com/photo-1550948537-130a1ce83314?auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 5,
      title: "Meet with Jonson Rider",
      start: "06:00",
      end: "07:00",
      day: 2, // Tuesday
      color: "bg-blue-100 text-blue-800",
      category: "work",
      calendarType: "personal",
      location: "Park Lane Office",
      tags: ["Design", "Personal project", "Developer task"],
      attendees: ["https://i.pravatar.cc/150?u=4", "https://i.pravatar.cc/150?u=5", "https://i.pravatar.cc/150?u=6"]
    },
    {
      id: 6,
      title: "Morning Workout",
      start: "07:00",
      end: "08:00",
      day: 3, // Wednesday
      color: "bg-emerald-200 text-emerald-800",
      category: "health",
      calendarType: "personal",
      location: "Gym"
    },
    {
      id: 7,
      title: "Birthday: Sarah",
      start: "09:00",
      end: "10:00",
      day: 4, // Thursday
      color: "bg-pink-200 text-pink-800",
      category: "personal",
      calendarType: "birthdays",
    },
    {
      id: 8,
      title: "Complete project report",
      start: "10:00",
      end: "11:30",
      day: 5, // Friday
      color: "bg-orange-200 text-orange-800",
      category: "work",
      calendarType: "tasks",
    }
  ]);

  // Helper to get days in current week
  const getDaysInWeek = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay()); // Start on Sunday
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      return d;
    });
  };

  const weekDays = getDaysInWeek(currentDate);
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  // Navigation Handlers
  const handlePrev = () => {
    const newDate = new Date(currentDate);
    if (view === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setDate(newDate.getDate() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (view === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setDate(newDate.getDate() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleAddEvent = () => {
    if (!newEvent.title.trim()) return;
    
    const categoryColors = {
      work: "bg-blue-100 text-blue-800",
      personal: "bg-yellow-100 text-yellow-800",
      health: "bg-emerald-200 text-emerald-800"
    };
    
    const event = {
      id: Date.now(),
      ...newEvent,
      color: categoryColors[newEvent.category] || "bg-blue-100 text-blue-800",
      calendarType: "personal"
    };
    setEvents([...events, event]);
    setShowAddEventModal(false);
    setNewEvent({ title: "", start: "09:00", end: "10:00", day: 0, location: "", category: "work" });
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(e => e.id !== eventId));
    setSelectedEvent(null);
  };

  // Get filtered events based on calendar and category filters
  const getFilteredEvents = () => {
    return events.filter(event => {
      // Check calendar filter
      const calendarMatch = 
        (event.calendarType === 'personal' && calendarFilters.personal) ||
        (event.calendarType === 'tasks' && calendarFilters.tasks) ||
        (event.calendarType === 'birthdays' && calendarFilters.birthdays) ||
        (event.source === 'google'); // Always show Google events if connected
      
      // Check category filter
      const categoryMatch = 
        (event.category === 'personal' && categoryFilters.personal) ||
        (event.category === 'work' && categoryFilters.work) ||
        (event.category === 'health' && categoryFilters.health);
      
      return calendarMatch && categoryMatch;
    });
  };

  // Get next upcoming event
  const getNextEvent = () => {
    const now = new Date();
    const todayDay = now.getDay();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const upcomingEvents = events
      .map(event => {
        const [hours, minutes] = event.start.split(':').map(Number);
        const eventTime = hours * 60 + minutes;
        let daysUntil = event.day - todayDay;
        if (daysUntil < 0) daysUntil += 7;
        if (daysUntil === 0 && eventTime < currentTime) daysUntil = 7;
        return { ...event, daysUntil, eventTime };
      })
      .sort((a, b) => a.daysUntil - b.daysUntil || a.eventTime - b.eventTime);
    
    return upcomingEvents[0];
  };

  const nextEvent = getNextEvent();

  // Calculate minutes until next event
  const getMinutesUntil = (event) => {
    if (!event) return 0;
    const now = new Date();
    const [hours, minutes] = event.start.split(':').map(Number);
    const eventMinutes = hours * 60 + minutes;
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    
    if (event.day === now.getDay() && eventMinutes > currentMinutes) {
      return eventMinutes - currentMinutes;
    }
    return null; // Not today
  };

  // Handle editing an event
  const handleEditEvent = () => {
    if (!editingEvent) return;
    
    const categoryColors = {
      work: "bg-blue-100 text-blue-800",
      personal: "bg-yellow-100 text-yellow-800",
      health: "bg-emerald-200 text-emerald-800"
    };
    
    const updatedEvent = {
      ...editingEvent,
      color: categoryColors[editingEvent.category] || editingEvent.color
    };
    
    setEvents(events.map(e => e.id === updatedEvent.id ? updatedEvent : e));
    setEditingEvent(null);
    setSelectedEvent(null);
  };

  // Mark notification as read
  const markNotificationRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  // Get category stats
  const getCategoryStats = () => {
    const stats = { personal: 0, work: 0, health: 0 };
    events.forEach(e => {
      if (e.category && stats[e.category] !== undefined) {
        stats[e.category]++;
      }
    });
    const total = Object.values(stats).reduce((a, b) => a + b, 0) || 1;
    return {
      personal: (stats.personal / total) * 100,
      work: (stats.work / total) * 100,
      health: (stats.health / total) * 100,
    };
  };

  const categoryStats = getCategoryStats();

  // Click on empty cell to add event
  const handleCellClick = (dayIndex, hour) => {
    const day = weekDays[dayIndex];
    setNewEvent({
      title: "",
      start: `${hour.toString().padStart(2, '0')}:00`,
      end: `${(hour + 1).toString().padStart(2, '0')}:00`,
      day: day.getDay(),
      location: "",
      category: "work"
    });
    setShowAddEventModal(true);
  };

  const handleConnectGoogle = () => {
    // In a real app, this would trigger OAuth2 flow
    // window.location.href = '/api/auth/google';
    
    // Simulating a successful connection and data fetch
    setIsConnected(true);
    const googleEvents = [
      {
        id: 5,
        title: "Google: Team Sync",
        start: "09:00",
        end: "10:00",
        day: 3, // Wednesday
        color: "bg-blue-100 text-blue-800",
        source: "google"
      },
      {
        id: 6,
        title: "Google: Client Call",
        start: "11:00",
        end: "12:00",
        day: 4, // Thursday
        color: "bg-blue-100 text-blue-800",
        source: "google"
      }
    ];
    setEvents(prev => [...prev, ...googleEvents]);
    alert("Successfully connected to Google Calendar! Events synced.");
  };

  return (
    <div className="flex h-[800px] w-full overflow-hidden rounded-3xl bg-[#F5F6FA] shadow-2xl ring-1 ring-black/5 font-sans text-slate-900">
      {/* Left Sidebar (Dark) */}
      <aside className="flex w-80 flex-col bg-[#1E1E24] p-6 text-white">
        {/* Profile Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/20">
              <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="h-full w-full object-cover" />
            </div>
            <div>
              <h3 className="text-sm font-bold">Antonio Larentio</h3>
              <p className="text-xs text-gray-400">Product Designer</p>
            </div>
          </div>
          <button onClick={() => setShowNotifications(!showNotifications)} className="relative rounded-full bg-white/10 p-2 hover:bg-white/20">
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-purple-500"></span>
            )}
            <svg className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          
          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 z-50 w-72 rounded-2xl bg-[#27272E] p-4 shadow-2xl">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">Notifications</h4>
                {notifications.length > 0 && (
                  <button onClick={clearAllNotifications} className="text-xs text-gray-400 hover:text-white">Clear all</button>
                )}
              </div>
              {notifications.length === 0 ? (
                <p className="text-center text-xs text-gray-500 py-4">No notifications</p>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {notifications.map(n => (
                    <div 
                      key={n.id} 
                      onClick={() => markNotificationRead(n.id)}
                      className={`cursor-pointer rounded-lg p-3 transition ${n.read ? 'bg-white/5' : 'bg-purple-500/20'} hover:bg-white/10`}
                    >
                      <p className="text-xs text-gray-300">{n.message}</p>
                      <p className="text-[10px] text-gray-500 mt-1">{n.time}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mini Calendar */}
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-bold">{monthName} {year}</h4>
            <div className="flex gap-1">
              <button onClick={() => { const d = new Date(currentDate); d.setMonth(d.getMonth() - 1); setCurrentDate(d); }} className="rounded p-1 hover:bg-white/10"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
              <button onClick={() => { const d = new Date(currentDate); d.setMonth(d.getMonth() + 1); setCurrentDate(d); }} className="rounded p-1 hover:bg-white/10"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(d => (
              <div key={d} className="py-1 text-gray-500">{d}</div>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              const d = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
              d.setDate(d.getDate() - d.getDay() + i);
              const isToday = d.toDateString() === new Date().toDateString();
              const isCurrentMonth = d.getMonth() === currentDate.getMonth();
              
              return (
                <div 
                  key={i}
                  onClick={() => setCurrentDate(d)}
                  className={`cursor-pointer rounded-full py-1 transition hover:bg-white/10 
                    ${isToday ? 'bg-purple-500 text-white' : isCurrentMonth ? 'text-gray-300' : 'text-gray-600'}`}
                >
                  {d.getDate()}
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Event Card */}
        {nextEvent && (
          <div className="mb-8 rounded-2xl bg-[#27272E] p-4">
            <div className="mb-2 flex items-center justify-between text-xs text-gray-400">
              <span>{nextEvent.start} - {nextEvent.end}</span>
              {getMinutesUntil(nextEvent) !== null && (
                <span className="flex items-center gap-1 text-purple-400">
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {getMinutesUntil(nextEvent)} min
                </span>
              )}
            </div>
            <h4 className="mb-4 text-sm font-bold leading-tight">{nextEvent.title}</h4>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  // Snooze - move to next occurrence
                  const updated = { ...nextEvent, day: (nextEvent.day + 1) % 7 };
                  setEvents(events.map(e => e.id === nextEvent.id ? updated : e));
                }}
                className="flex-1 rounded-lg border border-white/10 py-2 text-xs font-medium hover:bg-white/5"
              >
                Later
              </button>
              <button 
                onClick={() => setSelectedEvent(nextEvent)}
                className="flex-1 rounded-lg bg-purple-500 py-2 text-xs font-medium text-white hover:bg-purple-600"
              >
                Details
              </button>
            </div>
          </div>
        )}

        {/* My Calendars */}
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-bold text-gray-400">My Calendars</h4>
            <button 
              onClick={() => setCollapsedSections({...collapsedSections, calendars: !collapsedSections.calendars})}
              className="text-gray-500 hover:text-white transition-transform"
              style={{ transform: collapsedSections.calendars ? 'rotate(-90deg)' : 'rotate(0deg)' }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>
          {!collapsedSections.calendars && (
            <div className="space-y-3">
              <label className="flex items-center gap-3 text-sm text-gray-300 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={calendarFilters.personal}
                  onChange={(e) => setCalendarFilters({...calendarFilters, personal: e.target.checked})}
                  className="h-4 w-4 rounded border-gray-600 bg-transparent text-purple-500 focus:ring-0 cursor-pointer" 
                />
                Antonio Larentio
                <span className="ml-auto rounded-full bg-purple-500/20 px-1.5 py-0.5 text-[10px] text-purple-400">
                  {events.filter(e => e.calendarType === 'personal').length}
                </span>
              </label>
              <label className="flex items-center gap-3 text-sm text-gray-300 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={calendarFilters.tasks}
                  onChange={(e) => setCalendarFilters({...calendarFilters, tasks: e.target.checked})}
                  className="h-4 w-4 rounded border-gray-600 bg-transparent text-purple-500 focus:ring-0 cursor-pointer" 
                />
                Tasks
                <span className="ml-auto rounded-full bg-orange-500/20 px-1.5 py-0.5 text-[10px] text-orange-400">
                  {events.filter(e => e.calendarType === 'tasks').length}
                </span>
              </label>
              <label className="flex items-center gap-3 text-sm text-gray-300 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={calendarFilters.birthdays}
                  onChange={(e) => setCalendarFilters({...calendarFilters, birthdays: e.target.checked})}
                  className="h-4 w-4 rounded border-gray-600 bg-transparent text-purple-500 focus:ring-0 cursor-pointer" 
                />
                Birthdays
                <span className="ml-auto rounded-full bg-pink-500/20 px-1.5 py-0.5 text-[10px] text-pink-400">
                  {events.filter(e => e.calendarType === 'birthdays').length}
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Categories */}
        <div className="mb-6 flex-1">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-sm font-bold text-gray-400">Categories</h4>
            <button 
              onClick={() => setCollapsedSections({...collapsedSections, categories: !collapsedSections.categories})}
              className="text-gray-500 hover:text-white transition-transform"
              style={{ transform: collapsedSections.categories ? 'rotate(-90deg)' : 'rotate(0deg)' }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
          </div>
          {!collapsedSections.categories && (
            <div className="space-y-4">
              <div 
                onClick={() => setCategoryFilters({...categoryFilters, personal: !categoryFilters.personal})}
                className={`cursor-pointer transition ${!categoryFilters.personal ? 'opacity-40' : ''}`}
              >
                <div className="mb-1 flex items-center gap-2 text-xs text-gray-300">
                  <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                  Personal
                  <span className="ml-auto text-[10px] text-gray-500">{events.filter(e => e.category === 'personal').length} events</span>
                </div>
                <div className="h-1 w-full rounded-full bg-gray-700">
                  <div className="h-1 rounded-full bg-yellow-500 transition-all" style={{ width: `${categoryStats.personal}%` }}></div>
                </div>
              </div>
              <div 
                onClick={() => setCategoryFilters({...categoryFilters, work: !categoryFilters.work})}
                className={`cursor-pointer transition ${!categoryFilters.work ? 'opacity-40' : ''}`}
              >
                <div className="mb-1 flex items-center gap-2 text-xs text-gray-300">
                  <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                  Work
                  <span className="ml-auto text-[10px] text-gray-500">{events.filter(e => e.category === 'work').length} events</span>
                </div>
                <div className="h-1 w-full rounded-full bg-gray-700">
                  <div className="h-1 rounded-full bg-blue-500 transition-all" style={{ width: `${categoryStats.work}%` }}></div>
                </div>
              </div>
              <div 
                onClick={() => setCategoryFilters({...categoryFilters, health: !categoryFilters.health})}
                className={`cursor-pointer transition ${!categoryFilters.health ? 'opacity-40' : ''}`}
              >
                <div className="mb-1 flex items-center gap-2 text-xs text-gray-300">
                  <span className="h-2 w-2 rounded-full bg-pink-500"></span>
                  Health
                  <span className="ml-auto text-[10px] text-gray-500">{events.filter(e => e.category === 'health').length} events</span>
                </div>
                <div className="h-1 w-full rounded-full bg-gray-700">
                  <div className="h-1 rounded-full bg-pink-500 transition-all" style={{ width: `${categoryStats.health}%` }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Google Connect Button */}
        <div className="mt-auto">
           {!isConnected ? (
            <button 
              onClick={handleConnectGoogle}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-bold text-black transition hover:bg-gray-200"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Sync Google Calendar
            </button>
           ) : (
             <div className="flex items-center gap-2 rounded-xl bg-green-500/20 p-3 text-sm font-medium text-green-400">
               <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
               Synced with Google
             </div>
           )}
        </div>
      </aside>

      {/* Main Calendar Area (Light) */}
      <main className="flex flex-1 flex-col bg-[#F5F6FA] p-8 text-slate-900">
        {/* Header */}
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">{monthName}, {year}</h2>
          </div>
          
          <div className="flex items-center gap-4 rounded-2xl bg-white p-1 shadow-sm">
            <button onClick={() => setView('month')} className={`rounded-xl px-4 py-2 text-sm font-medium transition ${view === 'month' ? 'bg-[#F5F6FA] font-bold text-slate-900 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}>Month</button>
            <button onClick={() => setView('week')} className={`rounded-xl px-4 py-2 text-sm font-medium transition ${view === 'week' ? 'bg-[#F5F6FA] font-bold text-slate-900 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}>Week</button>
            <button onClick={() => setView('day')} className={`rounded-xl px-4 py-2 text-sm font-medium transition ${view === 'day' ? 'bg-[#F5F6FA] font-bold text-slate-900 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}>Day</button>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowAddEventModal(true)}
              className="rounded-xl bg-purple-500 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-purple-600"
            >
              + Add Event
            </button>
            <div className="flex gap-2">
              <button onClick={handlePrev} className="rounded-full bg-white p-2 text-gray-600 shadow-sm hover:bg-gray-50">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={handleToday} className="rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900 shadow-sm hover:bg-gray-50">Today</button>
              <button onClick={handleNext} className="rounded-full bg-white p-2 text-gray-600 shadow-sm hover:bg-gray-50">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </header>

        {/* Calendar Grid */}
        <div className="flex flex-1 flex-col overflow-hidden rounded-3xl bg-white shadow-sm">
          
          {/* ==================== WEEK VIEW ==================== */}
          {view === 'week' && (
            <>
              {/* Days Header */}
              <div className="grid grid-cols-[60px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] border-b border-gray-100">
                <div className="p-4"></div>
                {weekDays.map((day, i) => {
                  const isToday = day.toDateString() === new Date().toDateString();
                  return (
                    <div key={i} className={`border-l border-gray-100 p-4 text-center ${isToday ? 'bg-[#1E1E24] text-white' : ''}`}>
                      <div className="text-xs font-medium opacity-60">{day.toLocaleDateString('en-US', { weekday: 'long' })}</div>
                      <div className="text-xl font-bold">{day.getDate()}</div>
                    </div>
                  );
                })}
              </div>

              {/* Time Grid */}
              <div className="flex-1 overflow-y-auto">
                <div className="relative grid grid-cols-[60px_1fr_1fr_1fr_1fr_1fr_1fr_1fr]">
                  {/* Time Labels */}
                  <div className="flex flex-col text-xs font-medium text-gray-400">
                    {["6 am", "7 am", "8 am", "9 am", "10 am", "11 am", "12 pm", "1 pm"].map(time => (
                      <div key={time} className="h-24 border-b border-transparent pr-2 text-right pt-2">{time}</div>
                    ))}
                  </div>

                  {/* Columns */}
                  {weekDays.map((day, dayIndex) => (
                    <div key={dayIndex} className="relative border-l border-gray-100">
                      {/* Grid Lines - Clickable to add events */}
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div 
                          key={i} 
                          onClick={() => handleCellClick(dayIndex, 6 + i)}
                          className="h-24 border-b border-gray-50 cursor-pointer hover:bg-purple-50/50 transition"
                        ></div>
                      ))}

                      {/* Events */}
                      {getFilteredEvents().filter(e => e.day === day.getDay()).map(event => (
                        <div 
                          key={event.id}
                          onClick={() => setSelectedEvent(event)}
                          className={`absolute left-1 right-1 rounded-xl p-3 ${event.color} shadow-sm transition hover:shadow-md cursor-pointer`}
                          style={{ 
                            top: `${(parseInt(event.start.split(':')[0]) - 6) * 96 + (parseInt(event.start.split(':')[1]) / 60) * 96}px`,
                            height: `${((parseInt(event.end.split(':')[0]) * 60 + parseInt(event.end.split(':')[1])) - (parseInt(event.start.split(':')[0]) * 60 + parseInt(event.start.split(':')[1]))) / 60 * 96}px`
                          }}
                        >
                          <div className="text-xs font-bold">{event.title}</div>
                          <div className="text-[10px] opacity-80">{event.start} - {event.end}</div>
                          
                          {event.attendees && (
                            <div className="mt-2 flex -space-x-2">
                              {event.attendees.map((src, i) => (
                                <img key={i} src={src} className="h-6 w-6 rounded-full border-2 border-white" alt="" />
                              ))}
                            </div>
                          )}
                          
                          {event.image && (
                            <div className="mt-2 h-16 w-full overflow-hidden rounded-lg">
                              <img src={event.image} className="h-full w-full object-cover" alt="" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ==================== MONTH VIEW ==================== */}
          {view === 'month' && (
            <div className="flex-1 overflow-y-auto p-4">
              {/* Month Header */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                  <div key={day} className="p-2 text-center text-xs font-bold text-gray-500 uppercase">
                    {day}
                  </div>
                ))}
              </div>
              
              {/* Month Grid */}
              <div className="grid grid-cols-7 gap-1">
                {(() => {
                  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                  const startOffset = firstDay.getDay();
                  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
                  const totalCells = Math.ceil((startOffset + daysInMonth) / 7) * 7;
                  
                  return Array.from({ length: totalCells }, (_, i) => {
                    const dayNum = i - startOffset + 1;
                    const isCurrentMonth = dayNum > 0 && dayNum <= daysInMonth;
                    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dayNum);
                    const isToday = date.toDateString() === new Date().toDateString();
                    const dayOfWeek = date.getDay();
                    const dayEvents = isCurrentMonth ? getFilteredEvents().filter(e => e.day === dayOfWeek) : [];
                    
                    return (
                      <div 
                        key={i}
                        onClick={() => {
                          if (isCurrentMonth) {
                            setCurrentDate(date);
                            setView('day');
                          }
                        }}
                        className={`min-h-[100px] rounded-xl border p-2 cursor-pointer transition hover:bg-gray-50
                          ${isCurrentMonth ? 'bg-white border-gray-100' : 'bg-gray-50/50 border-transparent'}
                          ${isToday ? 'ring-2 ring-purple-500' : ''}`}
                      >
                        <div className={`text-sm font-bold mb-1 ${isToday ? 'text-purple-600' : isCurrentMonth ? 'text-slate-900' : 'text-gray-300'}`}>
                          {isCurrentMonth ? dayNum : ''}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 3).map(event => (
                            <div 
                              key={event.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedEvent(event);
                              }}
                              className={`text-[10px] px-2 py-1 rounded-md truncate ${event.color}`}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="text-[10px] text-gray-500 px-2">+{dayEvents.length - 3} more</div>
                          )}
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            </div>
          )}

          {/* ==================== DAY VIEW ==================== */}
          {view === 'day' && (
            <>
              {/* Day Header */}
              <div className="border-b border-gray-100 p-6 text-center bg-[#1E1E24] text-white">
                <div className="text-sm font-medium opacity-60">{currentDate.toLocaleDateString('en-US', { weekday: 'long' })}</div>
                <div className="text-4xl font-bold">{currentDate.getDate()}</div>
                <div className="text-sm opacity-60">{currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
              </div>

              {/* Day Time Grid */}
              <div className="flex-1 overflow-y-auto">
                <div className="relative grid grid-cols-[80px_1fr]">
                  {/* Time Labels */}
                  <div className="flex flex-col text-xs font-medium text-gray-400">
                    {["6 am", "7 am", "8 am", "9 am", "10 am", "11 am", "12 pm", "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm"].map(time => (
                      <div key={time} className="h-20 border-b border-transparent pr-4 text-right pt-2">{time}</div>
                    ))}
                  </div>

                  {/* Day Column */}
                  <div className="relative border-l border-gray-100">
                    {/* Grid Lines - Clickable to add events */}
                    {Array.from({ length: 13 }).map((_, i) => (
                      <div 
                        key={i} 
                        onClick={() => {
                          setNewEvent({
                            title: "",
                            start: `${(6 + i).toString().padStart(2, '0')}:00`,
                            end: `${(7 + i).toString().padStart(2, '0')}:00`,
                            day: currentDate.getDay(),
                            location: "",
                            category: "work"
                          });
                          setShowAddEventModal(true);
                        }}
                        className="h-20 border-b border-gray-50 cursor-pointer hover:bg-purple-50/50 transition"
                      ></div>
                    ))}

                    {/* Events for this day */}
                    {getFilteredEvents().filter(e => e.day === currentDate.getDay()).map(event => (
                      <div 
                        key={event.id}
                        onClick={() => setSelectedEvent(event)}
                        className={`absolute left-2 right-2 rounded-xl p-4 ${event.color} shadow-sm transition hover:shadow-md cursor-pointer`}
                        style={{ 
                          top: `${(parseInt(event.start.split(':')[0]) - 6) * 80 + (parseInt(event.start.split(':')[1]) / 60) * 80}px`,
                          height: `${((parseInt(event.end.split(':')[0]) * 60 + parseInt(event.end.split(':')[1])) - (parseInt(event.start.split(':')[0]) * 60 + parseInt(event.start.split(':')[1]))) / 60 * 80}px`
                        }}
                      >
                        <div className="text-sm font-bold">{event.title}</div>
                        <div className="text-xs opacity-80">{event.start} - {event.end}</div>
                        {event.location && (
                          <div className="text-xs opacity-60 mt-1 flex items-center gap-1">
                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                            {event.location}
                          </div>
                        )}
                        
                        {event.attendees && (
                          <div className="mt-2 flex -space-x-2">
                            {event.attendees.map((src, i) => (
                              <img key={i} src={src} className="h-6 w-6 rounded-full border-2 border-white" alt="" />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Event Detail Popover - Shared across all views */}
          {selectedEvent && (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/20" onClick={() => setSelectedEvent(null)}>
              <div className="w-80 rounded-3xl bg-white p-6 shadow-2xl ring-1 ring-black/5" onClick={(e) => e.stopPropagation()}>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900">{selectedEvent.title}</h3>
                  <button onClick={() => setSelectedEvent(null)} className="text-gray-400 hover:text-gray-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][selectedEvent.day]}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {selectedEvent.start} - {selectedEvent.end}
                  </div>
                  {selectedEvent.location && (
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {selectedEvent.location}
                    </div>
                  )}
                  
                  {selectedEvent.tags && (
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.tags.map((tag, i) => (
                        <span key={i} className="rounded-lg bg-purple-100 px-3 py-1 text-xs font-medium text-purple-600">{tag}</span>
                      ))}
                    </div>
                  )}

                  {selectedEvent.attendees && (
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex -space-x-2">
                        {selectedEvent.attendees.map((src, i) => (
                          <img key={i} src={src} className="h-8 w-8 rounded-full border-2 border-white" alt="" />
                        ))}
                        <button className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-white text-gray-400 hover:border-gray-400 hover:text-gray-600">+</button>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setEditingEvent({...selectedEvent});
                        setSelectedEvent(null);
                      }}
                      className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-bold text-slate-900 hover:bg-gray-50"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteEvent(selectedEvent.id)}
                      className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-bold text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add Event Modal */}
        {showAddEventModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-96 rounded-2xl bg-white p-6 shadow-2xl">
              <h3 className="mb-4 text-lg font-bold text-slate-900">Add New Event</h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">Event Title</label>
                  <input 
                    type="text" 
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-500"
                    placeholder="Meeting with..."
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">Location</label>
                  <input 
                    type="text" 
                    value={newEvent.location}
                    onChange={(e) => setNewEvent({...newEvent, location: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-500"
                    placeholder="Office, Zoom, etc."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">Start Time</label>
                    <input 
                      type="time" 
                      value={newEvent.start}
                      onChange={(e) => setNewEvent({...newEvent, start: e.target.value})}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">End Time</label>
                    <input 
                      type="time" 
                      value={newEvent.end}
                      onChange={(e) => setNewEvent({...newEvent, end: e.target.value})}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">Day of Week</label>
                  <select 
                    value={newEvent.day}
                    onChange={(e) => setNewEvent({...newEvent, day: parseInt(e.target.value)})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-500"
                  >
                    {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((d, i) => (
                      <option key={i} value={i}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">Category</label>
                  <select 
                    value={newEvent.category}
                    onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-500"
                  >
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="health">Health</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => setShowAddEventModal(false)}
                    className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleAddEvent}
                    className="flex-1 rounded-lg bg-purple-500 py-2 text-sm font-bold text-white hover:bg-purple-600"
                  >
                    Save Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Event Modal */}
        {editingEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-96 rounded-2xl bg-white p-6 shadow-2xl">
              <h3 className="mb-4 text-lg font-bold text-slate-900">Edit Event</h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">Event Title</label>
                  <input 
                    type="text" 
                    value={editingEvent.title}
                    onChange={(e) => setEditingEvent({...editingEvent, title: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-500"
                    placeholder="Meeting with..."
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">Location</label>
                  <input 
                    type="text" 
                    value={editingEvent.location || ''}
                    onChange={(e) => setEditingEvent({...editingEvent, location: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-500"
                    placeholder="Office, Zoom, etc."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">Start Time</label>
                    <input 
                      type="time" 
                      value={editingEvent.start}
                      onChange={(e) => setEditingEvent({...editingEvent, start: e.target.value})}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-500">End Time</label>
                    <input 
                      type="time" 
                      value={editingEvent.end}
                      onChange={(e) => setEditingEvent({...editingEvent, end: e.target.value})}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">Day of Week</label>
                  <select 
                    value={editingEvent.day}
                    onChange={(e) => setEditingEvent({...editingEvent, day: parseInt(e.target.value)})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-500"
                  >
                    {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((d, i) => (
                      <option key={i} value={i}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-gray-500">Category</label>
                  <select 
                    value={editingEvent.category || 'work'}
                    onChange={(e) => setEditingEvent({...editingEvent, category: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-500"
                  >
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="health">Health</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => setEditingEvent(null)}
                    className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleEditEvent}
                    className="flex-1 rounded-lg bg-purple-500 py-2 text-sm font-bold text-white hover:bg-purple-600"
                  >
                    Update Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

